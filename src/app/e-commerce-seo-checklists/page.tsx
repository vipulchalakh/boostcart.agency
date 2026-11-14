import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { checklistCategories, checklistTotal } from "@content/data";
import { ChecklistApp } from "@/components/checklist/ChecklistApp";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";

const siteUrl = "https://boostcart.agency";
const path = "/e-commerce-seo-checklists";
const title = `E-commerce SEO Checklist: ${checklistTotal} Interactive Checks (Free)`;
const description = `The interactive e-commerce SEO checklist with ${checklistTotal} checks across technical, on-page, content, links, conversion and AI search. Tick items off and watch your SEO score rise.`;

export const metadata: Metadata = {
  title: { absolute: `${title} | BoostCart` },
  description,
  alternates: { canonical: path },
  openGraph: { type: "website", siteName: "BoostCart", url: `${siteUrl}${path}`, title: `${title} | BoostCart`, description },
  twitter: { card: "summary_large_image", title: `${title} | BoostCart`, description },
};

export default function ChecklistPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "Home", item: siteUrl },
        { name: "E-commerce SEO Checklist", item: `${siteUrl}${path}` },
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
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: checklistTotal,
        itemListElement: checklistCategories.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: `${c.title} (${c.items.length} checks)`, url: `${siteUrl}${path}#${c.slug}` })),
      },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <ChecklistApp
        categories={checklistCategories}
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
                    Checklists
                  </span>
                </li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[3.25rem] xl:text-[3.75rem]">The e-commerce SEO checklist: {checklistTotal} checks, scored live</h1>
            <p className="lead mt-6 max-w-[36rem]">
              Technical, on-page, content, links, conversion and AI search. Each check shows its impact, priority, the tools you need and whether it&rsquo;s manual. Tick items off and watch your score climb.
            </p>
          </>
        }
      />

      <section className="container-x pb-20 md:pb-28">
        <div className="rounded-[var(--r-panel)] bg-panel-navy px-6 py-12 text-center text-white md:px-12 md:py-16 on-dark">
          <p className="eyebrow">Short on time?</p>
          <h2 className="mx-auto mt-3 max-w-[30rem] text-balance font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] md:text-[2.75rem]">Let us work through the list for your store</h2>
          <p className="lead mx-auto mt-4 max-w-[36rem]">Get a free audit with a prioritized plan covering the checks that will move revenue first.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/free-audit" variant="primary" size="lg" arrow>
              Get my free audit
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
