import type { Metadata } from "next";
import { bookCallHref, categoryFaqs, categoryGoodFit, categoryNotFit, categoryPlatforms, categorySteps, categoryUsps } from "@content/data";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { PlatformsSection } from "@/components/sections/PlatformsSection";
import { ProofBand } from "@/components/sections/ProofBand";
import { ResultsShowcase } from "@/components/sections/ResultsShowcase";
import { ServicesBento, type Tile } from "@/components/sections/ServicesBento";
import { UspSection } from "@/components/sections/UspSection";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { HeroVisual } from "@/components/category-product-pages/HeroVisual";
import { AiOrbit } from "@/components/category-product-pages/AiOrbit";
import { ProcessStack } from "@/components/category-product-pages/ProcessStack";
import { CategoryFinalCta } from "@/components/category-product-pages/CategoryFinalCta";
import { CategoryLeadSection } from "@/components/category-product-pages/CategoryLeadSection";
import { CategoryCompare } from "@/components/category-product-pages/CategoryCompare";
import { CategoryWorkflow } from "@/components/category-product-pages/CategoryWorkflow";
import { KeywordMock, LayoutMock, LinkMock, ProductMock, SchemaMock, TitleMock } from "@/components/category-product-pages/Mocks";

const siteUrl = "https://boostcart.agency";
const path = "/services/category-product-pages";

/** Drives both the visible breadcrumb and its BreadcrumbList schema. /services has no page yet, so it points at the homepage services section. */
const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Category & Product Pages", href: path },
];
const title = "Ecommerce Category and Product Page SEO";
const description =
  "Category and product page SEO for Shopify, WooCommerce, headless and custom stores: keyword mapping, titles, collection copy, product descriptions, internal links and structured data.";

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
    name: "Ecommerce Category and Product Page SEO",
    serviceType: "Ecommerce category and product page SEO",
    url: `${siteUrl}${path}`,
    description,
    provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "BoostCart", url: siteUrl },
  },
];

const row1: Tile[] = [
  { title: "Keyword-to-page mapping", text: "Each search matched to one collection or product, so pages stop competing.", href: path, mock: <KeywordMock />, glow: { hue: "yellow", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
  { title: "Titles and meta descriptions", text: "Written for the search and the shopper, not copied from a template.", href: path, mock: <TitleMock />, glow: { hue: "pink", pos: "-right-16 -top-20" } },
  { title: "Collection page structure", text: "Headings, intro copy, filters and guides arranged to help people choose.", href: path, mock: <LayoutMock />, glow: { hue: "yellow", pos: "-right-14 -top-20" } },
];
const row2: Tile[] = [
  { title: "Product descriptions", text: "Specs, sizing and buying answers, written for your products.", href: path, mock: <ProductMock />, glow: { hue: "pink", pos: "-left-14 -top-20" } },
  { title: "Internal linking", text: "Links between collections, products and guides that pass the right signals.", href: path, mock: <LinkMock />, glow: { hue: "yellow", pos: "-right-16 -top-20" } },
  { title: "Structured data", text: "Product, offer and review markup matched to what the page shows.", href: path, mock: <SchemaMock />, glow: { hue: "pink", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
];

export default function CategoryProductPagesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="relative isolate -mt-12">
        <HeroBackdrop />
        <Hero
          bigIsH1
          breadcrumb={breadcrumb}
          lines={["Category Pages That", "Rank and Sell"]}
          lead="Turn your collections and product pages into pages that match what shoppers search for and help them buy."
          primaryLabel="Get a page review"
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
        title={<>Who needs category and product page SEO?</>}
        lead="Better pages help most when the store is live and the catalogue is real. Here's who benefits, and who should look elsewhere first."
        good={categoryGoodFit}
        notFit={categoryNotFit}
        prompt="Not sure which side you're on? We'll tell you honestly."
        ctaLabel="Check if we're a fit"
      />
      <AiOrbit />
      <PlatformsSection
        items={categoryPlatforms}
        eyebrow="Platforms we cover"
        title={<>Page optimization built for your platform</>}
        lead="Where copy, titles and links can live differs on Shopify, WooCommerce and a headless build. Recommendations are written for yours."
      />
      <UspSection
        items={categoryUsps}
        eyebrow="Why BoostCart"
        title="Why stores choose us for category and product pages"
        lead="Four things you can expect from every page optimization engagement."
      />
      <div id="services">
        <ServicesBento
          rows={[row1, row2]}
          eyebrow="What the work covers"
          title={<>Everything that makes a page rank and sell</>}
          lead="Six workstreams, one clear plan for your pages."
        />
      </div>
      <ProcessStack
        steps={categorySteps}
        visual={(step) => <CategoryWorkflow step={step} />}
        eyebrow="How we work"
        title="From search research to live pages"
        lead="Four steps from keyword map to a reviewed page. Hands-on publishing and ongoing page updates are scoped separately."
      />
      <CategoryCompare />
      <ProofBand />
      <CategoryLeadSection />
      <Faq items={categoryFaqs} eyebrow="Category and product page FAQ" title="Category and product page SEO questions" lead="Straight answers, including what we won't promise." ctaLabel="Ask us something else" />
      <CategoryFinalCta />
    </>
  );
}
