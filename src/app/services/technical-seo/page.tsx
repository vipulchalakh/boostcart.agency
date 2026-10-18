import type { Metadata } from "next";
import { bookCallHref, techSeoFaqs, techSeoGoodFit, techSeoNotFit, techSeoPlatforms, techSeoSteps, techSeoUsps } from "@content/data";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { PlatformsSection } from "@/components/sections/PlatformsSection";
import { ProofBand } from "@/components/sections/ProofBand";
import { ResultsShowcase } from "@/components/sections/ResultsShowcase";
import { ServicesBento, type Tile } from "@/components/sections/ServicesBento";
import { UspSection } from "@/components/sections/UspSection";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { HeroVisual } from "@/components/tech-seo/HeroVisual";
import { AiOrbit } from "@/components/tech-seo/AiOrbit";
import { ProcessStack } from "@/components/tech-seo/ProcessStack";
import { TechFinalCta } from "@/components/tech-seo/TechFinalCta";
import { TechLeadSection } from "@/components/tech-seo/TechLeadSection";
import { TechCompare } from "@/components/tech-seo/TechCompare";
import { TechWorkflow } from "@/components/tech-seo/TechWorkflow";
import { ArchitectureMock, CanonicalMock, IndexMock, RedirectMock, RenderMock, SchemaMock } from "@/components/tech-seo/TechMocks";

const siteUrl = "https://boostcart.agency";
const path = "/services/technical-seo";

/** Drives both the visible breadcrumb and its BreadcrumbList schema. /services has no page yet, so it points at the homepage services section. */
const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Technical SEO", href: path },
];
const title = "Ecommerce Technical SEO Services";
const description =
  "Ecommerce technical SEO for Shopify, WooCommerce, headless and custom stores: crawlability, indexation, faceted navigation, canonicals, rendering, structured data and migrations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { type: "website", siteName: "BoostCart", url: `${siteUrl}${path}`, title: `${title} | BoostCart`, description },
  twitter: { card: "summary_large_image", title: `${title} | BoostCart`, description },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${siteUrl}${c.href === "/" ? "" : c.href}` })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Ecommerce Technical SEO",
    serviceType: "Ecommerce technical SEO",
    url: `${siteUrl}${path}`,
    description,
    provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "BoostCart", url: siteUrl },
  },
];

const row1: Tile[] = [
  { title: "Crawlability and indexation", text: "Robots, sitemaps and Search Console, so important pages are reachable and indexable.", href: path, mock: <IndexMock />, glow: { hue: "yellow", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
  { title: "Site architecture", text: "Categories, internal links, depth and pagination that surface the right pages.", href: path, mock: <ArchitectureMock />, glow: { hue: "pink", pos: "-right-16 -top-20" } },
  { title: "Canonicals and duplicate URLs", text: "Variants, filters and parameters pointed at one preferred URL.", href: path, mock: <CanonicalMock />, glow: { hue: "yellow", pos: "-right-14 -top-20" } },
];
const row2: Tile[] = [
  { title: "Rendering and speed", text: "JavaScript content, Core Web Vitals and mobile checked on key templates.", href: path, mock: <RenderMock />, glow: { hue: "pink", pos: "-left-14 -top-20" } },
  { title: "Structured data", text: "Product, offer and breadcrumb markup validated against the page.", href: path, mock: <SchemaMock />, glow: { hue: "yellow", pos: "-right-16 -top-20" } },
  { title: "Migrations", text: "URL inventory, redirects and staging safeguards for platform changes.", href: path, mock: <RedirectMock />, glow: { hue: "pink", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
];

export default function TechnicalSeoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="relative isolate -mt-12">
        <HeroBackdrop />
        <Hero
          bigIsH1
          breadcrumb={breadcrumb}
          lines={["Technical SEO That", "Gets Pages Indexed"]}
          lead="Find and fix what keeps your product and category pages from being crawled, indexed and found."
          primaryLabel="Get an audit report"
          secondaryLabel="Book a call"
          secondaryHref={bookCallHref}
          note="Shopify · WooCommerce · BigCommerce · Magento · Headless"
          visual={<HeroVisual />}
        />
        {/* The shared section pulls its heading up 5rem for the homepage hero; this wrapper cancels that. */}
        <div className="md:pt-20"><ResultsShowcase /></div>
      </div>
      <WhoItsFor
        eyebrow="Honest fit check"
        title={<>Who needs ecommerce technical SEO?</>}
        lead="Technical SEO removes blockers. Here's who benefits most, and who should look elsewhere first."
        good={techSeoGoodFit}
        notFit={techSeoNotFit}
        prompt="Not sure which side you're on? We'll tell you honestly."
        ctaLabel="Check if we're a fit"
      />
      <AiOrbit />
      <PlatformsSection
        items={techSeoPlatforms}
        eyebrow="Platforms we cover"
        title={<>Technical SEO built for your platform</>}
        lead="The same issue is fixed differently on Shopify, WooCommerce and a headless build. Recommendations are written for yours."
      />
      <UspSection
        items={techSeoUsps}
        eyebrow="Why BoostCart"
        title="Why stores choose us for technical SEO"
        lead="Four things you can expect from every technical SEO engagement."
      />
      <div id="services">
        <ServicesBento
          rows={[row1, row2]}
          eyebrow="What the work covers"
          title={<>Everything that stands between your pages and search</>}
          lead="Six workstreams, one prioritized list of fixes."
        />
      </div>
      <ProcessStack
        steps={techSeoSteps}
        visual={(step) => <TechWorkflow step={step} />}
        eyebrow="How we work"
        title="From audit to verified fixes"
        lead="Four steps from first crawl to a re-check. Implementation support and ongoing monitoring are scoped separately."
      />
      <TechCompare />
      <ProofBand />
      <TechLeadSection />
      <Faq items={techSeoFaqs} eyebrow="Technical SEO FAQ" title="Ecommerce technical SEO questions" lead="Straight answers, including what we won't promise." ctaLabel="Ask us something else" />
      <TechFinalCta />
    </>
  );
}
