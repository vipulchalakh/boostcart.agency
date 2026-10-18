import type { Metadata } from "next";
import { bookCallHref, conversionFaqs, conversionGoodFit, conversionNotFit, conversionPlatforms, conversionSteps, conversionUsps } from "@content/data";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { PlatformsSection } from "@/components/sections/PlatformsSection";
import { ProofBand } from "@/components/sections/ProofBand";
import { ResultsShowcase } from "@/components/sections/ResultsShowcase";
import { ServicesBento, type Tile } from "@/components/sections/ServicesBento";
import { UspSection } from "@/components/sections/UspSection";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { HeroVisual } from "@/components/conversion-seo/HeroVisual";
import { AiOrbit } from "@/components/conversion-seo/AiOrbit";
import { ProcessStack } from "@/components/conversion-seo/ProcessStack";
import { ConversionFinalCta } from "@/components/conversion-seo/ConversionFinalCta";
import { ConversionLeadSection } from "@/components/conversion-seo/ConversionLeadSection";
import { ConversionCompare } from "@/components/conversion-seo/ConversionCompare";
import { ConversionWorkflow } from "@/components/conversion-seo/ConversionWorkflow";
import { EntryMock, InfoMock, TrustMock, MobileMock, PathMock, SpeedMock } from "@/components/conversion-seo/Mocks";

const siteUrl = "https://boostcart.agency";
const path = "/services/conversion-seo";

/** Drives both the visible breadcrumb and its BreadcrumbList schema. /services has no page yet, so it points at the homepage services section. */
const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Conversion SEO", href: path },
];
const title = "Ecommerce Conversion-Focused SEO";
const description =
  "Conversion-focused SEO for ecommerce: review of organic landing pages, product information, trust, mobile experience and checkout friction, with changes checked against search.";

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
    name: "Ecommerce Conversion-Focused SEO",
    serviceType: "Ecommerce Conversion-Focused SEO",
    url: `${siteUrl}${path}`,
    description,
    provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "BoostCart", url: siteUrl },
  },
];

const row1: Tile[] = [
  { title: "Landing page review", text: "Where organic visitors continue and where they leave.", href: path, mock: <EntryMock />, glow: { hue: "yellow", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
  { title: "Product information", text: "Photos, sizing, materials and answers buyers need.", href: path, mock: <InfoMock />, glow: { hue: "pink", pos: "-right-16 -top-20" } },
  { title: "Trust signals", text: "Reviews, policies and proof placed where doubt appears.", href: path, mock: <TrustMock />, glow: { hue: "yellow", pos: "-right-14 -top-20" } },
];
const row2: Tile[] = [
  { title: "Mobile experience", text: "Buttons, layout and speed checked on phones.", href: path, mock: <MobileMock />, glow: { hue: "pink", pos: "-left-14 -top-20" } },
  { title: "Path to purchase", text: "Calls to action and steps from page to payment.", href: path, mock: <PathMock />, glow: { hue: "yellow", pos: "-right-16 -top-20" } },
  { title: "Speed and stability", text: "Load and layout issues that cost sales and rankings.", href: path, mock: <SpeedMock />, glow: { hue: "pink", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
];

export default function ConversionSeoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="relative isolate -mt-12">
        <HeroBackdrop />
        <Hero
          bigIsH1
          breadcrumb={breadcrumb}
          lines={["Turn Organic Visits", "Into Orders"]}
          lead="Find what stops search visitors from buying, and fix it without hurting the rankings that brought them."
          primaryLabel="Get a conversion review"
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
        title={<>Who needs conversion-focused SEO?</>}
        lead="It pays off once traffic exists but orders lag. Here's who benefits, and who should look elsewhere first."
        good={conversionGoodFit}
        notFit={conversionNotFit}
        prompt="Not sure which side you're on? We'll tell you honestly."
        ctaLabel="Check if we're a fit"
      />
      <AiOrbit />
      <PlatformsSection
        items={conversionPlatforms}
        eyebrow="Platforms we cover"
        title={<>Conversion work built for your platform</>}
        lead="Themes, apps and checkouts limit what can change on Shopify, WooCommerce and headless builds. Recommendations respect yours."
      />
      <UspSection
        items={conversionUsps}
        eyebrow="Why BoostCart"
        title="Why stores choose us for conversion SEO"
        lead="Four things you can expect from every conversion engagement."
      />
      <div id="services">
        <ServicesBento
          rows={[row1, row2]}
          eyebrow="What the work covers"
          title={<>Everything between a visit and an order</>}
          lead="Six workstreams, one ranked list of changes."
        />
      </div>
      <ProcessStack
        steps={conversionSteps}
        visual={(step) => <ConversionWorkflow step={step} />}
        eyebrow="How we work"
        title="From drop-off to measured change"
        lead="Four steps from analysis to a before-and-after check. Design, development and A/B testing are scoped separately."
      />
      <ConversionCompare />
      <ProofBand />
      <ConversionLeadSection />
      <Faq items={conversionFaqs} eyebrow="Conversion SEO FAQ" title="Conversion-focused SEO questions" lead="Straight answers, including what we won't promise." ctaLabel="Ask us something else" />
      <ConversionFinalCta />
    </>
  );
}
