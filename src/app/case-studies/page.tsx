import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { CaseStudiesIndex } from "@/components/case-study/CaseStudiesIndex";
import { CaseStudyBackdrop } from "@/components/case-study/CaseStudyBackdrop";
import { CaseStudiesFinalCta } from "@/components/case-study/CaseStudiesFinalCta";
import { AppLink } from "@/components/ui/AppLink";
import { sanityFetch } from "@/sanity/lib/client";
import { CASE_STUDIES_QUERY } from "@/sanity/lib/queries";

const siteUrl = "https://boostcart.agency";
const path = "/case-studies";
const title = "E-commerce SEO Case Studies";
const description = "Real organic revenue, traffic and keyword growth for Shopify, WooCommerce and BigCommerce stores, with the before and after numbers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { type: "website", siteName: "BoostCart", url: `${siteUrl}${path}`, title: `${title} | BoostCart`, description },
  twitter: { card: "summary_large_image", title: `${title} | BoostCart`, description },
};

export default async function CaseStudiesPage() {
  const studies = (await sanityFetch({ query: CASE_STUDIES_QUERY, tags: ["caseStudy"] })).filter((s) => s.slug && s.title);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "Home", item: siteUrl },
        { name: "Case studies", item: `${siteUrl}${path}` },
      ].map((c, i) => ({ "@type": "ListItem", position: i + 1, ...c })),
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: `${siteUrl}${path}`,
      isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "BoostCart" },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: studies.slice(0, 20).map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${siteUrl}${path}/${s.slug}`, name: s.title })),
      },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <header className="relative isolate pb-12 pt-28 text-center md:pb-16 md:pt-32 lg:pt-36">
        <CaseStudyBackdrop />
        <div className="container-x">
          <div className="hero-fade mx-auto max-w-[860px]">
            <nav aria-label="Breadcrumb">
              <ol className="eyebrow flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
                <li className="flex items-center gap-1.5">
                  <AppLink href="/" className="transition-colors hover:text-ink">
                    Home
                  </AppLink>
                  <ChevronRight aria-hidden className="size-3.5 text-ink-32" />
                </li>
                <li>
                  <span aria-current="page" className="text-ink">
                    Case studies
                  </span>
                </li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[3.25rem] md:text-[4rem]">Organic growth, proven store by store</h1>
            <p className="lead mx-auto mt-6 max-w-[40rem]">See how we grew organic revenue, traffic and rankings for e-commerce brands, with the before and after numbers.</p>
          </div>
        </div>
      </header>

      <div className="container-x pb-[var(--section-y)]">
        <CaseStudiesIndex studies={studies} />
      </div>

      <CaseStudiesFinalCta />
    </>
  );
}
