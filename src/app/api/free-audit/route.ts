import { industries } from "@content/data";
import { insertLead, requestMeta } from "@/lib/leads";
import { PLATFORM_OPTIONS, type AiCategory, type AuditCategory, type AuditCheck, type AuditIssue, type AuditRequest, type AuditResponse, type AuditResult, type CheckStatus, type Severity } from "@/lib/audit-types";

export const runtime = "nodejs";
export const maxDuration = 60;

const UPSTREAM = "https://seoscoreapi.com/audit";
const INDUSTRY_OPTIONS = [...industries.map((i) => i.label), "Other"];

/* ---------- Abuse and quota protection (per server instance) ---------- */
// The audit provider enforces a small monthly allowance and 2 requests a minute, so repeat audits are served from a short cache
// and each visitor is limited to a few fresh audits per window.
const CACHE_TTL = 6 * 60 * 60 * 1000;
const cache = new Map<string, { at: number; result: AuditResult }>();
const WINDOW = 10 * 60 * 1000;
const MAX_PER_WINDOW = 4;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW)) hits.delete(k);
  return false;
}

const json = (body: AuditResponse, status = 200) => Response.json(body, { status, headers: { "cache-control": "no-store" } });
const fail = (code: Extract<AuditResponse, { ok: false }>["code"], error: string, status: number, field?: keyof AuditRequest) => json({ ok: false, code, error, field }, status);

/* ---------- Input ---------- */
/** Accepts "store.com", "www.store.com/path" or a full URL. Rejects anything that is not a public web address. */
function normalizeUrl(input: string): URL | null {
  const raw = input.trim();
  if (!raw || raw.length > 300) return null;
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    const h = u.hostname.toLowerCase();
    if (!/^https?:$/.test(u.protocol) || u.username || u.password) return null;
    if (!/^([a-z0-9-]+\.)+[a-z]{2,}$/.test(h)) return null; // needs a real domain: no IPs, no "localhost"
    if (/\.(local|localhost|internal|test|invalid|example)$/.test(h)) return null;
    u.hash = "";
    return u;
  } catch {
    return null;
  }
}

/* ---------- Upstream response -> trimmed result ---------- */
type Obj = Record<string, unknown>;
const obj = (v: unknown): Obj => (v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : {});
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const num = (v: unknown, d = 0) => (typeof v === "number" && Number.isFinite(v) ? v : d);
const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);

const CATEGORY_LABELS: Record<string, string> = { meta: "Meta & content", technical: "Technical", social: "Social sharing", performance: "Performance", accessibility: "Accessibility" };
const AI_LABELS: Record<string, string> = {
  crawl_accessibility: "Crawl access",
  structural_markup: "Structured markup",
  content_extractability: "Content clarity",
  ai_discoverability: "Discoverability",
};
const STATUSES: CheckStatus[] = ["pass", "warning", "fail", "info"];
const SEVERITIES: Severity[] = ["high", "medium", "low"];

function checkValue(v: unknown): string | null {
  if (typeof v === "string") return v.length > 140 ? `${v.slice(0, 137)}...` : v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return null;
}

function issues(list: unknown[]): AuditIssue[] {
  return list.flatMap((raw) => {
    const o = obj(raw);
    const issue = str(o.issue);
    if (!issue) return [];
    const sev = SEVERITIES.includes(o.severity as Severity) ? (o.severity as Severity) : "low";
    const owner = ["developer", "content", "marketing"].includes(String(o.who_fixes_it)) ? (o.who_fixes_it as AuditIssue["owner"]) : null;
    return [{ severity: sev, category: str(o.category) ?? "general", issue, fix: str(o.fix) ?? "", plain: str(o.plain_english) ?? "", owner }];
  });
}

function toResult(raw: unknown, url: URL): AuditResult {
  const j = obj(raw);
  const audit = obj(j.audit);
  const categories: AuditCategory[] = Object.entries(audit).flatMap(([key, v]) => {
    const c = obj(v);
    if (!Array.isArray(c.checks)) return [];
    const checks: AuditCheck[] = c.checks.flatMap((x) => {
      const o = obj(x);
      const name = str(o.name);
      if (!name) return [];
      return [{ name, status: STATUSES.includes(o.status as CheckStatus) ? (o.status as CheckStatus) : "info", value: checkValue(o.value), note: str(o.recommendation) }];
    });
    return [{ key, label: CATEGORY_LABELS[key] ?? key, score: Math.round(num(c.score)), checks }];
  });

  const aiRaw = obj(j.ai_readability);
  const ai = typeof aiRaw.ai_readability_score === "number"
    ? {
        score: Math.round(num(aiRaw.ai_readability_score)),
        grade: str(aiRaw.ai_readability_grade) ?? "",
        categories: Object.entries(obj(aiRaw.categories)).flatMap(([key, v]): AiCategory[] => {
          const c = obj(v);
          return typeof c.score === "number" && typeof c.max === "number" ? [{ key, label: AI_LABELS[key] ?? key, score: c.score, max: c.max }] : [];
        }),
      }
    : null;

  // Page issues first, then AI-readability fixes; drop repeats and order by severity.
  const seen = new Set<string>();
  const all = [...issues(arr(j.priorities)), ...issues(arr(aiRaw.recommendations))].filter((i) => {
    const k = i.issue.toLowerCase();
    return seen.has(k) ? false : (seen.add(k), true);
  });
  all.sort((a, b) => SEVERITIES.indexOf(a.severity) - SEVERITIES.indexOf(b.severity));

  return {
    url: url.toString(),
    host: url.hostname.replace(/^www\./, ""),
    score: Math.round(num(j.score)),
    grade: str(j.grade) ?? "",
    responseTime: str(j.response_time),
    categories,
    ai,
    issues: all,
    checkedAt: new Date().toISOString(),
  };
}

/* ---------- Handler ---------- */
export async function POST(req: Request) {
  const body = obj(await req.json().catch(() => null));
  // Honeypot: real visitors never see or fill this field.
  if (str(body.company)) return fail("invalid", "Something went wrong. Please try again.", 400);

  const name = (str(body.name) ?? "").replace(/\s+/g, " ");
  const platform = str(body.platform) ?? "";
  const industry = str(body.industry) ?? "";
  const url = normalizeUrl(String(body.url ?? ""));

  if (name.length < 2 || name.length > 100) return fail("invalid", "Enter your full name.", 400, "name");
  if (!url) return fail("invalid", "Enter your store address, like yourstore.com.", 400, "url");
  if (!(PLATFORM_OPTIONS as readonly string[]).includes(platform)) return fail("invalid", "Choose your platform.", 400, "platform");
  if (!INDUSTRY_OPTIONS.includes(industry)) return fail("invalid", "Choose your industry.", 400, "industry");

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const key = process.env.SEOSCORE_API_KEY;
  if (!key) {
    console.error("[free-audit] SEOSCORE_API_KEY is not set");
    return fail("failed", "The audit tool isn't available right now. Please try again later.", 500);
  }

  // One lead per submission, stored once the audit has finished (score and grade included). If the audit fails it is stored without a score.
  const meta = requestMeta(req);
  const save = (r?: AuditResult) =>
    insertLead({ form: "free-audit", page_path: "/free-audit", name, website: url.toString(), platform, industry, audit_score: r?.score ?? null, audit_grade: r?.grade || null, ...meta });
  const cacheKey = `${url.hostname}${url.pathname}`.replace(/\/$/, "");
  const hit = cache.get(cacheKey);
  const cached = hit && Date.now() - hit.at < CACHE_TTL ? hit.result : null;

  if (!cached && limited(ip)) return fail("busy", "You've run a few audits already. Please wait a few minutes and try again.", 429);

  if (cached) {
    await save(cached);
    return json({ ok: true, result: cached });
  }

  let res: Response;
  try {
    res = await fetch(`${UPSTREAM}?${new URLSearchParams({ url: url.toString(), scoreboard: "false" })}`, {
      headers: { "X-API-Key": key, accept: "application/json" },
      signal: AbortSignal.timeout(55_000),
      cache: "no-store",
    });
  } catch {
    await save();
    return fail("unreachable", "The audit took too long. Please try again in a minute.", 504);
  }

  if (!res.ok) await save();
  if (res.status === 429) return fail("busy", "We're running a lot of audits right now. Please try again in a minute.", 429);
  if (res.status === 400 || res.status === 422) return fail("unreachable", "We couldn't read that website. Check the address and try again.", 422, "url");
  if (res.status === 502 || res.status === 504) return fail("unreachable", "We couldn't reach that website. Check it's online and try again.", 502, "url");
  if (!res.ok) {
    console.error("[free-audit] upstream status", res.status);
    return fail("failed", "The audit couldn't be completed. Please try again later.", 502);
  }

  const result = toResult(await res.json().catch(() => null), url);
  if (!result.categories.length && !result.issues.length) {
    await save();
    return fail("failed", "The audit came back empty. Please try again.", 502);
  }

  if (cache.size > 200) cache.delete(cache.keys().next().value as string);
  cache.set(cacheKey, { at: Date.now(), result });
  await save(result);
  return json({ ok: true, result });
}
