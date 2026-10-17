import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { Guides } from "@/components/sections/Guides";
import { Industries } from "@/components/sections/Industries";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { MetricsStrip } from "@/components/sections/MetricsStrip";
import { UspSection } from "@/components/sections/UspSection";
import { PlatformsSection } from "@/components/sections/PlatformsSection";
import { Compare } from "@/components/sections/Compare";
import { Process } from "@/components/sections/Process";
import { ProofBand } from "@/components/sections/ProofBand";
import { ResultsShowcase } from "@/components/sections/ResultsShowcase";
import { ServicesBento } from "@/components/sections/ServicesBento";

const siteUrl = "https://boostcart.agency";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "BoostCart",
    url: siteUrl,
    logo: `${siteUrl}/boostcart-logo.png`,
    description: "E-commerce SEO agency for Shopify, WooCommerce and BigCommerce stores.",
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
    description: "E-commerce SEO agency for Shopify, WooCommerce and BigCommerce stores.",
    areaServed: ["US", "CA"],
    serviceType: "E-commerce SEO",
  },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      {/* Hero, showcase and proof share one gradient backdrop that sits behind the floating navbar. */}
      <div className="relative isolate -mt-12">
        <HeroBackdrop />
        <Hero />
        <ResultsShowcase />
      </div>
      <WhoItsFor />
      <PlatformsSection />
      <UspSection />
      <ServicesBento />
      <MetricsStrip />
      <Industries />
      <Process />
      <ProofBand />
      <Compare />
      <Guides />
      <Faq />
      <FinalCta />
    </>
  );
}
