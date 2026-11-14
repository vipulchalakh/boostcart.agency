import { EMAIL_RE, clientIp, insertLead, isKnownForm, normalizeUrl, rateLimited, requestMeta } from "@/lib/leads";

export const runtime = "nodejs";

const json = (body: { ok: true } | { ok: false; error: string }, status = 200) => Response.json(body, { status, headers: { "cache-control": "no-store" } });
const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "");

/** Receives every contact / audit-request form on the site (service pages, industry pages) and stores it in Supabase. */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") return json({ ok: false, error: "Something went wrong. Please try again." }, 400);

  // Honeypot: a field people never see. Pretend success so bots learn nothing.
  if (text(body.company, 100)) return json({ ok: true });

  const form = text(body.form, 80);
  if (!isKnownForm(form)) return json({ ok: false, error: "Something went wrong. Please try again." }, 400);

  const name = text(body.name, 100);
  const email = text(body.email, 254);
  const isContact = form === "contact";
  const rawUrl = typeof body.url === "string" ? body.url.trim() : "";
  const url = rawUrl ? normalizeUrl(rawUrl) : null;
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";
  if (name.length < 2) return json({ ok: false, error: "Enter your name." }, 400);
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: "Enter a valid email." }, 400);
  // Service and industry forms need a store address; the contact form's website is optional but must be valid if given.
  if (!isContact && !url) return json({ ok: false, error: "Enter your store address, like yourstore.com." }, 400);
  if (isContact && rawUrl && !url) return json({ ok: false, error: "Enter a web address like yourstore.com, or leave it blank." }, 400);
  if (isContact && message.length < 10) return json({ ok: false, error: "Tell us a little about what you need." }, 400);

  if (rateLimited("lead", clientIp(req), 8, 10 * 60 * 1000)) return json({ ok: false, error: "Too many requests. Please wait a few minutes and try again." }, 429);

  const page = text(body.page, 300);
  const saved = await insertLead({
    form,
    page_path: page.startsWith("/") ? page : null,
    name,
    email,
    website: url ? url.toString() : null,
    platform: text(body.platform, 200) || null,
    industry: form.startsWith("industry-") ? form.slice("industry-".length) : null,
    sells: text(body.sells, 200) || null,
    message: isContact ? message : null,
    extra: isContact && text(body.topic, 100) ? { topic: text(body.topic, 100) } : {},
    ...requestMeta(req),
  });
  if (!saved) return json({ ok: false, error: "We couldn't save your request just now. Please try again in a moment." }, 500);
  return json({ ok: true });
}
