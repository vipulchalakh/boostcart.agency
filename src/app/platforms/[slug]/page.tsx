import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { platformFaqs, platformPageBySlug, platformPages } from "@content/data";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { ProofBand } from "@/components/sections/ProofBand";
import { ResultsShowcase } from "@/components/sections/ResultsShowcase";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { PlatformAreas } from "@/components/platform-page/PlatformAreas";
import { PlatformCompare } from "@/components/platform-page/PlatformCompare";
import { PlatformFinalCta } from "@/components/platform-page/PlatformFinalCta";
import { PlatformHeroVisual } from "@/components/platform-page/PlatformHeroVisual";
import { PlatformLeadSection } from "@/components/platform-page/PlatformLeadSection";
import { PlatformOthers } from "@/components/platform-page/PlatformOthers";
import { PlatformPricing } from "@/components/platform-page/PlatformPricing";
import { PlatformProblems } from "@/components/platform-page/PlatformProblems";
import { PlatformProcess } from "@/components/platform-page/PlatformProcess";
import { PlatformServices } from "@/components/platform-page/PlatformServices";
import { PlatformVisibility } from "@/components/platform-page/PlatformVisibility";
import { PlatformWhy } from "@/components/platform-page/PlatformWhy";

const siteUrl = "https://boostcart.agency";

export const dynamicParams = false;

export function generateStaticParams() {
  return platformPages.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = platformPageBySlug((await params).slug);
  if (!page) return {};
  const path = `/platforms/${page.slug}`;
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

export default async function PlatformPage({ params }: Props) {
  const page = platformPageBySlug((await params).slug);
  if (!page) notFound();
  const path = `/platforms/${page.slug}`;
  const label = page.slug === "headless" ? "Headless SEO" : `${page.name} SEO`;
  /** Drives both the visible breadcrumb and its BreadcrumbList schema. /platforms has no page yet, so it points at the homepage platforms section (a distinct href also keeps the crumb keys unique). */
  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Platforms", href: "/#platforms-title" },
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
      serviceType: page.slug === "headless" ? "Headless ecommerce SEO" : `${page.name} SEO`,
      url: `${siteUrl}${path}`,
      description: page.description,
      provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "BoostCart", url: siteUrl },
    },
  ];
  const storeWord = page.slug === "headless" ? "headless storefront" : `${page.name} store`;

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
          note={page.hero.note}
          visual={<PlatformHeroVisual page={page} />}
        />
        {/* The shared section pulls its heading up 5rem for the homepage hero; this wrapper cancels that. */}
        <div className="-mb-8 md:pt-28 lg:-mb-10"><ResultsShowcase /></div>
      </div>
      {/* One tighter, consistent section rhythm for the whole page. Shared sections read the same variable, so they follow. */}
      <div className="[--section-y:40px] md:[--section-y:56px] lg:[--section-y:64px]">
        <PlatformProblems page={page} />
        <WhoItsFor
          eyebrow="Honest fit check"
          title={<>Who {label} is for</>}
          lead={`${label} works best when there's a live ${storeWord} to build on. Here's who benefits most, and who should look elsewhere first.`}
          good={page.fit.good}
          notFit={page.fit.notFit}
          prompt="Not sure which side you're on? We'll tell you honestly."
          ctaLabel="Check if we're a fit"
        />
        <PlatformAreas page={page} />
        <PlatformServices page={page} />
        <PlatformVisibility page={page} />
        <PlatformWhy page={page} />
        <PlatformProcess page={page} />
        <PlatformCompare page={page} />
        <PlatformPricing page={page} />
        <ProofBand />
        <PlatformLeadSection page={page} />
        <PlatformOthers page={page} />
        <Faq items={platformFaqs(page)} eyebrow={`${label} FAQ`} title={`${label} questions`} lead="Straight answers, including what we won't promise." ctaLabel="Ask us something else" />
        <PlatformFinalCta page={page} />
      </div>
    </>
  );
}
