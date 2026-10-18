import type { Metadata } from "next";
import { bookCallHref, contentFaqs, contentGoodFit, contentNotFit, contentPlatforms, contentSteps, contentUsps } from "@content/data";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { PlatformsSection } from "@/components/sections/PlatformsSection";
import { ProofBand } from "@/components/sections/ProofBand";
import { ResultsShowcase } from "@/components/sections/ResultsShowcase";
import { ServicesBento, type Tile } from "@/components/sections/ServicesBento";
import { UspSection } from "@/components/sections/UspSection";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { HeroVisual } from "@/components/content/HeroVisual";
import { AiOrbit } from "@/components/content/AiOrbit";
import { ProcessStack } from "@/components/content/ProcessStack";
import { ContentFinalCta } from "@/components/content/ContentFinalCta";
import { ContentLeadSection } from "@/components/content/ContentLeadSection";
import { ContentCompare } from "@/components/content/ContentCompare";
import { ContentWorkflow } from "@/components/content/ContentWorkflow";
import { QuestionMock, GuideMock, CompareMock, CalendarMock, GuideLinkMock, RefreshMock } from "@/components/content/Mocks";

const siteUrl = "https://boostcart.agency";
const path = "/services/content";

/** Drives both the visible breadcrumb and its BreadcrumbList schema. /services has no page yet, so it points at the homepage services section. */
const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Content & Buying Guides", href: path },
];
const title = "Ecommerce Content and Buying Guides";
const description =
  "Ecommerce content for Shopify, WooCommerce, headless and custom stores: topic research, buying guides, comparisons, collection copy and content refreshes tied to your products.";

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
    name: "Ecommerce Content and Buying Guides",
    serviceType: "Ecommerce Content and Buying Guides",
    url: `${siteUrl}${path}`,
    description,
    provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "BoostCart", url: siteUrl },
  },
];

const row1: Tile[] = [
  { title: "Topic research", text: "Shopper questions found, grouped and matched to your products.", href: path, mock: <QuestionMock />, glow: { hue: "yellow", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
  { title: "Buying guides", text: "Researched guides that help people choose and lead to a collection.", href: path, mock: <GuideMock />, glow: { hue: "pink", pos: "-right-16 -top-20" } },
  { title: "Comparison pages", text: "Side-by-side pages for products shoppers weigh against each other.", href: path, mock: <CompareMock />, glow: { hue: "yellow", pos: "-right-14 -top-20" } },
];
const row2: Tile[] = [
  { title: "Content calendar", text: "A realistic schedule ranked by value, agreed with you.", href: path, mock: <CalendarMock />, glow: { hue: "pink", pos: "-left-14 -top-20" } },
  { title: "Internal links", text: "Guides linked to the collections and products they support.", href: path, mock: <GuideLinkMock />, glow: { hue: "yellow", pos: "-right-16 -top-20" } },
  { title: "Refreshes", text: "Older posts updated, merged or removed when they stop helping.", href: path, mock: <RefreshMock />, glow: { hue: "pink", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
];

export default function ContentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="relative isolate -mt-12">
        <HeroBackdrop />
        <Hero
          bigIsH1
          breadcrumb={breadcrumb}
          lines={["Content That Brings", "Shoppers Ready to Buy"]}
          lead="Buying guides and comparisons built around the questions your customers ask, each one leading to a product or collection."
          primaryLabel="Get a content plan"
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
        title={<>Who needs ecommerce content and buying guides?</>}
        lead="Content works best when the catalogue is real and shoppers have questions. Here's who benefits, and who should look elsewhere first."
        good={contentGoodFit}
        notFit={contentNotFit}
        prompt="Not sure which side you're on? We'll tell you honestly."
        ctaLabel="Check if we're a fit"
      />
      <AiOrbit />
      <PlatformsSection
        items={contentPlatforms}
        eyebrow="Platforms we cover"
        title={<>Content built for your platform</>}
        lead="Blogs, metaobjects and CMS blocks work differently on Shopify, WooCommerce and a headless build. Guides are set up for yours."
      />
      <UspSection
        items={contentUsps}
        eyebrow="Why BoostCart"
        title="Why stores choose us for content"
        lead="Four things you can expect from every content engagement."
      />
      <div id="services">
        <ServicesBento
          rows={[row1, row2]}
          eyebrow="What the work covers"
          title={<>Everything that turns questions into customers</>}
          lead="Six workstreams, one clear content plan."
        />
      </div>
      <ProcessStack
        steps={contentSteps}
        visual={(step) => <ContentWorkflow step={step} />}
        eyebrow="How we work"
        title="From questions to published guides"
        lead="Four steps from research to a refreshed library. Publishing support and ongoing production are scoped separately."
      />
      <ContentCompare />
      <ProofBand />
      <ContentLeadSection />
      <Faq items={contentFaqs} eyebrow="Content FAQ" title="Ecommerce content questions" lead="Straight answers, including what we won't promise." ctaLabel="Ask us something else" />
      <ContentFinalCta />
    </>
  );
}
