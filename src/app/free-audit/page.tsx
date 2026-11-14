import type { Metadata } from "next";
import { ChevronRight, ShieldCheck, Timer, Zap } from "lucide-react";
import { FreeAuditApp } from "@/components/free-audit/FreeAuditApp";
import { AppLink } from "@/components/ui/AppLink";

const siteUrl = "https://boostcart.agency";
const path = "/free-audit";
const title = "Free E-commerce SEO Audit: Check Your Store in 10 Seconds";
const description = "Enter your store address and get an instant SEO audit: score, prioritized fixes, technical and AI search readiness. Free, no credit card.";

export const metadata: Metadata = {
  title: { absolute: `${title} | BoostCart` },
  description,
  alternates: { canonical: path },
  openGraph: { type: "website", siteName: "BoostCart", url: `${siteUrl}${path}`, title: `${title} | BoostCart`, description },
  twitter: { card: "summary_large_image", title: `${title} | BoostCart`, description },
};

export default function FreeAuditPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "Home", item: siteUrl },
        { name: "Free SEO Audit", item: `${siteUrl}${path}` },
      ].map((c, i) => ({ "@type": "ListItem", position: i + 1, ...c })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: `${siteUrl}${path}`,
      isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "BoostCart" },
      publisher: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "BoostCart", url: siteUrl },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <FreeAuditApp
        intro={
          <>
            <nav aria-label="Breadcrumb">
              <ol className="eyebrow flex flex-wrap items-center gap-x-1.5 gap-y-1">
                <li className="flex items-center gap-1.5">
                  <AppLink href="/" className="transition-colors hover:text-ink">
                    Home
                  </AppLink>
                  <ChevronRight aria-hidden className="size-3.5 text-ink-32" />
                </li>
                <li>
                  <span aria-current="page" className="text-ink">
                    Free SEO audit
                  </span>
                </li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[3.25rem] xl:text-[3.75rem]">See what&rsquo;s holding your store back in search</h1>
            <p className="lead mt-6 max-w-[36rem]">Get an instant audit of your store: an overall score, the issues costing you traffic, and a prioritized list of what to fix first, including how ready you are for AI search.</p>
            <ul className="mt-8 grid gap-3 text-[0.9375rem] text-ink-68">
              {[
                [Timer, "Results in about 10 seconds"],
                [Zap, "Technical, on-page and AI search checks"],
                [ShieldCheck, "Free, no credit card, no obligation"],
              ].map(([Icon, text]) => {
                const I = Icon as typeof Timer;
                return (
                  <li key={String(text)} className="flex items-center gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong">
                      <I aria-hidden className="size-4" />
                    </span>
                    {String(text)}
                  </li>
                );
              })}
            </ul>
          </>
        }
      />
    </>
  );
}
