import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bookCallHref, industries, industryFaqs, industryPageBySlug, industryPages } from "@content/data";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { ProofBand } from "@/components/sections/ProofBand";
import { ResultsShowcase } from "@/components/sections/ResultsShowcase";
import { IndustryCompare } from "@/components/industry-page/IndustryCompare";
import { IndustryFinalCta } from "@/components/industry-page/IndustryFinalCta";
import { IndustryHeroVisual } from "@/components/industry-page/IndustryHeroVisual";
import { IndustryLeadSection } from "@/components/industry-page/IndustryLeadSection";
import { IndustryPlatforms } from "@/components/industry-page/IndustryPlatforms";
import { IndustryPricing } from "@/components/industry-page/IndustryPricing";
import { IndustryProblems } from "@/components/industry-page/IndustryProblems";
import { IndustryProcess } from "@/components/industry-page/IndustryProcess";
import { IndustryServices } from "@/components/industry-page/IndustryServices";
import { IndustryVisibility } from "@/components/industry-page/IndustryVisibility";
import { IndustryWhy } from "@/components/industry-page/IndustryWhy";

const siteUrl = "https://boostcart.agency";

/** Pet supplies has its own page (and its own components), so it is not generated here. */
const pages = industryPages;

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = industryPageBySlug((await params).slug);
  if (!page) return {};
  const path = `/industries/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "BoostCart", url: `${siteUrl}${path}`, title: `${page.title} | BoostCart`, description: page.description },
    twitter: { card: "summary_large_image", title: `${page.title} | BoostCart`, description: page.description },
  };
}

/* Scripts off: the carousels, pinned steps and accordions below all start from script state, so show their content as plain, readable layouts instead. */
const noScriptCss = `
.pw-view{height:auto!important;overflow-x:auto!important;padding-bottom:16px;-webkit-mask-image:none!important;mask-image:none!important}
.pw-cards{position:static!important;display:flex;gap:20px}
.pw-card{position:relative!important;left:auto!important;top:auto!important;flex:none;height:auto!important;transform:none!important;opacity:1!important;filter:none!important;pointer-events:auto!important}
.pw-controls,.pw-plus,.pc-controls{display:none!important}
.pw-item{background:#fff!important;color:var(--ink)!important;border-color:transparent!important}
.pw-title{color:var(--ink)!important}
.pw-body{grid-template-rows:1fr!important;opacity:1!important}
.pw-btn{pointer-events:none}
.pc-track{flex-wrap:wrap!important;overflow:visible!important}
.pp-desktop{display:none!important}
.pp-mobile{display:grid!important}
@media(min-width:1024px){.pp-mobile{grid-template-columns:repeat(2,minmax(0,1fr))}}
.faq-content{grid-template-rows:1fr!important;visibility:visible!important}
`;

export default async function IndustryPage({ params }: Props) {
  const page = industryPageBySlug((await params).slug);
  if (!page) notFound();
  const path = `/industries/${page.slug}`;
  const label = industries.find((i) => i.slug === page.slug)?.label ?? page.title;
  /** Drives both the visible breadcrumb and its BreadcrumbList schema. /industries has no page yet, so it points at the homepage. */
  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/#industries" },
    { name: label, href: path },
  ];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${siteUrl}${c.href === "/" ? "" : c.href}` })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      serviceType: `Ecommerce SEO for ${page.noun} stores`,
      url: `${siteUrl}${path}`,
      description: page.description,
      audience: { "@type": "Audience", audienceType: page.audience },
      provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "BoostCart", url: siteUrl },
    },
  ];

  return (
    <>
      <noscript><style>{noScriptCss}</style></noscript>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="relative isolate -mt-12">
        <HeroBackdrop />
        <Hero
          bigIsH1
          breadcrumb={breadcrumb}
          lines={page.hero.lines}
          lead={page.hero.lead}
          primaryLabel={page.hero.primary}
          secondaryLabel="Book a call"
          secondaryHref={bookCallHref}
          note="Shopify · WooCommerce · BigCommerce · Magento · Headless"
          visual={<IndustryHeroVisual page={page} />}
        />
        {/* The shared section pulls its heading up 5rem for the homepage hero; this wrapper cancels that. */}
        <div className="-mb-8 md:pt-28 lg:-mb-10"><ResultsShowcase /></div>
      </div>
      {/* One tighter, consistent section rhythm for the whole page. Shared sections read the same variable, so they follow. */}
      <div className="[--section-y:40px] md:[--section-y:56px] lg:[--section-y:64px]">
        <IndustryProblems page={page} />
        <IndustryServices page={page} />
        <IndustryVisibility page={page} />
        <IndustryPlatforms page={page} />
        <IndustryWhy page={page} />
        <IndustryProcess page={page} />
        <IndustryCompare page={page} />
        <IndustryPricing page={page} />
        <ProofBand />
        <IndustryLeadSection page={page} />
        <Faq items={industryFaqs(page)} eyebrow={`${label} FAQ`} title={`${label} SEO questions`} lead="Straight answers, including what we won't promise." ctaLabel="Ask us something else" />
        <IndustryFinalCta page={page} />
      </div>
    </>
  );
}
