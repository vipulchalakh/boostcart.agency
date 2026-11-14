/**
 * Server-side storage for every form submission on the site: one `leads` table in Supabase.
 * Row level security lets the publishable key INSERT only, so visitors can never read leads back.
 * View, filter and export them (CSV/JSON) in the Supabase dashboard, or query the `leads_export` view.
 */

export type LeadRow = {
  form: string;
  page_path?: string | null;
  referrer?: string | null;
  user_agent?: string | null;
  name?: string | null;
  email?: string | null;
  website?: string | null;
  platform?: string | null;
  industry?: string | null;
  sells?: string | null;
  message?: string | null;
  audit_score?: number | null;
  audit_grade?: string | null;
  extra?: Record<string, unknown>;
};

/* ---------- Which forms exist ---------- */
const SERVICE_FORMS = ["technical-seo", "category-product-pages", "content", "link-building", "conversion-seo", "reporting"].map((s) => `service-${s}`);
/** Form ids: "free-audit", "contact", "service-<page>" or "industry-<slug>". */
export const isKnownForm = (form: string) => form === "free-audit" || form === "contact" || SERVICE_FORMS.includes(form) || /^industry-[a-z0-9-]{1,60}$/.test(form);

/* ---------- Validation helpers ---------- */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Accepts "store.com", "www.store.com/path" or a full URL. Rejects anything that is not a public web address. */
export function normalizeUrl(input: string): URL | null {
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

export const clientIp = (req: Request) => (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";

/** Referrer and browser of the submission, trimmed to the column limits. */
export function requestMeta(req: Request) {
  return { referrer: req.headers.get("referer")?.slice(0, 500) ?? null, user_agent: req.headers.get("user-agent")?.slice(0, 500) ?? null };
}

/** Small in-memory limiter (per server instance) to blunt form spam. */
const buckets = new Map<string, number[]>();
export function rateLimited(bucket: string, ip: string, max: number, windowMs: number) {
  const now = Date.now();
  const key = `${bucket}:${ip}`;
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  const over = recent.length >= max;
  if (!over) recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 5000) for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  return over;
}

/* ---------- Storage ---------- */
const cut = (v: string | null | undefined, n: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, n) : null);

/**
 * Inserts one lead. Returns false (and logs) if it could not be stored, and never throws.
 * Callers decide whether a failed save should block the visitor.
 */
export async function insertLead(row: LeadRow): Promise<boolean> {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!base || !key) {
    console.error("[leads] SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY is not set");
    return false;
  }
  const body = {
    form: row.form.slice(0, 80),
    page_path: cut(row.page_path, 300),
    referrer: cut(row.referrer, 500),
    user_agent: cut(row.user_agent, 500),
    name: cut(row.name, 200),
    email: cut(row.email, 254)?.toLowerCase() ?? null,
    website: cut(row.website, 500),
    platform: cut(row.platform, 200),
    industry: cut(row.industry, 200),
    sells: cut(row.sells, 200),
    message: cut(row.message, 5000),
    audit_score: typeof row.audit_score === "number" ? Math.max(0, Math.min(100, Math.round(row.audit_score))) : null,
    audit_grade: cut(row.audit_grade, 10),
    extra: row.extra ?? {},
  };
  try {
    const res = await fetch(`${base}/rest/v1/leads`, {
      method: "POST",
      headers: { apikey: key, "content-type": "application/json", prefer: "return=minimal" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[leads] insert failed", res.status, (await res.text().catch(() => "")).slice(0, 300));
      return false;
    }
    return true;
  } catch (e) {
    console.error("[leads] insert error", e);
    return false;
  }
}
