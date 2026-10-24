import { industryPages } from "@content/data";

const page = (title: string, body: string, status: number, back: string) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} | BoostCart</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;font:16px/1.6 system-ui,sans-serif;color:#020617;background:#fff}main{max-width:420px;text-align:center}h1{font-size:28px;letter-spacing:-.02em;margin:0 0 8px}p{color:rgb(2 6 23/.68);margin:0 0 24px}a{display:inline-block;padding:12px 20px;border-radius:8px;background:#df37a7;color:#fff;font-weight:600;text-decoration:none}</style></head><body><main><h1>${title}</h1><p>${body}</p><a href="${back}">Back to the page</a></main></body></html>`,
    { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } },
  );

/** Form post for visitors without JavaScript. Applies the same rules as the script check in IndustryLeadForm. */
export async function POST(request: Request) {
  const f = await request.formData().catch(() => null);
  const field = (k: string) => String(f?.get(k) ?? "").trim();
  /** Only known industry slugs are linked back to, so the form field can't point the link elsewhere. */
  const slug = field("industry");
  const back = industryPages.some((p) => p.slug === slug) ? `/industries/${slug}#audit` : "/free-audit";
  const ok = field("name") && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field("email")) && /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(field("url"));
  if (!ok) return page("Check your details", "We need your name, a valid work email and your store address, like yourstore.com.", 400, back);

  // TODO-REAL: send { industry, name, email, url, sells, platform } to the CRM or form endpoint, same as IndustryLeadForm. Nothing is sent yet.
  return page("Request received", "Thanks. We&rsquo;ll review your store and reply by email with what we find.", 200, back);
}
