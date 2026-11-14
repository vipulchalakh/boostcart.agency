import type { Metadata } from "next";
import { MockImage } from "@/components/mocks/MockImage";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Guides } from "@/components/sections/Guides";
import { Industries } from "@/components/sections/Industries";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { AppLink } from "@/components/ui/AppLink";
import { SearchShift } from "@/components/home/SearchShift";
import { Hero } from "@/components/sections/Hero";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { MetricsStrip } from "@/components/sections/MetricsStrip";
import { UspSection } from "@/components/sections/UspSection";
import { HomePlatformsSection } from "@/components/home/HomePlatformsSection";
import { Compare } from "@/components/sections/Compare";
import { Process } from "@/components/sections/Process";
import { ProofBand } from "@/components/sections/ProofBand";
import { ResultsShowcase } from "@/components/sections/ResultsShowcase";
import { ServicesBento, type Tile } from "@/components/sections/ServicesBento";

const siteUrl = "https://boostcart.agency";

const title = "E-commerce SEO & AI SEO Agency | BoostCart";
const description = "BoostCart is an SEO and AI SEO agency for Shopify, WooCommerce and BigCommerce stores. Technical SEO, category pages, content and links, so shoppers find you in Google and in AI answers. Get a free audit.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "BoostCart", url: siteUrl, title, description },
  twitter: { card: "summary_large_image", title, description },
};

const homeLead = (
  <>
    One program for classic and AI search, from{" "}
    <AppLink href="/services/technical-seo" className="u-em">technical SEO</AppLink> and{" "}
    <AppLink href="/services/category-product-pages" className="u-em">category pages</AppLink> to{" "}
    <AppLink href="/services/content" className="u-em">content</AppLink> and{" "}
    <AppLink href="/services/link-building" className="u-em">links</AppLink>, so shoppers find you on Google and in AI answers.
  </>
);

const row1: Tile[] = [
  { title: "Technical SEO", text: "Crawl, speed, indexation and structured data fixed at the root so every page can rank and be understood by AI tools.", href: "/services/technical-seo", mock: <MockImage id="home/1" alt="Animated preview: Technical SEO" />, glow: { hue: "yellow", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
  { title: "Category & Product Pages", text: "Rankable collections and product pages that turn searches into carts.", href: "/services/category-product-pages", mock: <MockImage id="home/2" alt="Animated preview: Category & Product Pages" />, glow: { hue: "pink", pos: "-right-16 -top-20" } },
  { title: "Content & Buying Guides", text: "Content that captures high-intent search and earns citations in AI answers.", href: "/services/content", mock: <MockImage id="home/3" alt="Animated preview: Content & Buying Guides" />, glow: { hue: "yellow", pos: "-right-14 -top-20" } },
];
const row2: Tile[] = [
  { title: "Link Building & Digital PR", text: "Editorial links and mentions from sites your customers, and AI tools, trust.", href: "/services/link-building", mock: <MockImage id="home/4" alt="Animated preview: Link Building & Digital PR" />, glow: { hue: "pink", pos: "-left-14 -top-20" } },
  { title: "Conversion-focused SEO", text: "Traffic is only useful if it buys.", href: "/services/conversion-seo", mock: <MockImage id="home/5" alt="Animated preview: Conversion-focused SEO" />, glow: { hue: "yellow", pos: "-right-16 -top-20" } },
  { title: "Reporting", text: "Know which pages bring revenue and where your brand shows up in AI answers.", href: "/services/reporting", mock: <MockImage id="home/6" alt="Animated preview: Reporting" />, glow: { hue: "pink", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "BoostCart",
    url: siteUrl,
    logo: `${siteUrl}/boostcart-logo.png`,
    description,
  },
  { "@context": "https://schema.org", "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "BoostCart", url: siteUrl, publisher: { "@id": `${siteUrl}/#organization` }, inLanguage: "en" },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service`,
    name: "BoostCart",
    image: `${siteUrl}/boostcart-logo.png`,
    parentOrganization: { "@id": `${siteUrl}/#organization` },
    url: siteUrl,
    description,
    areaServed: ["US", "CA"],
    serviceType: ["E-commerce SEO", "AI SEO"],
  },
];

export default function HomePage() {
  return (
    <div className="home-rhythm">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      {/* Hero, showcase and proof share one gradient backdrop that sits behind the floating navbar. */}
      <div className="relative isolate -mt-12">
        <HeroBackdrop />
        <Hero
          eyebrow="E-commerce SEO & AI SEO agency"
          lines={["Get Your Store Found", "in Search and AI"]}
          lead={homeLead}
        />
        <ResultsShowcase />
      </div>
      <SearchShift />
      <WhoItsFor title={<>Who is e&#8209;commerce SEO and AI SEO for?</>} eyebrow="Built for online stores" lead="We work with online stores that already sell and want organic revenue and AI visibility. Here is who we help most, and who is better served elsewhere." />
      <HomePlatformsSection lead="Every platform has its own quirks. We know them well, from theme code and plugins to URLs, faceted navigation, rendering and the structured data that search engines and AI tools read." />
      <UspSection />
      <ServicesBento rows={[row1, row2]} eyebrow="SEO + AI SEO program" />
      <MetricsStrip />
      <Industries />
      <Process />
      <ProofBand />
      <Compare />
      <Guides />
      <Faq />
      <FinalCta />
    </div>
  );
}
