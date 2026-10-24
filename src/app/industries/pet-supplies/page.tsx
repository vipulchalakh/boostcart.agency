import type { Metadata } from "next";
import { bookCallHref, petFaqs } from "@content/data";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { ProofBand } from "@/components/sections/ProofBand";
import { ResultsShowcase } from "@/components/sections/ResultsShowcase";
import { HeroVisual } from "@/components/pet-industry/HeroVisual";
import { PetClients } from "@/components/pet-industry/PetClients";
import { PetCompare } from "@/components/pet-industry/PetCompare";
import { PetFinalCta } from "@/components/pet-industry/PetFinalCta";
import { PetLeadSection } from "@/components/pet-industry/PetLeadSection";
import { PetPlatforms } from "@/components/pet-industry/PetPlatforms";
import { PetPricing } from "@/components/pet-industry/PetPricing";
import { PetProblems } from "@/components/pet-industry/PetProblems";
import { PetServices } from "@/components/pet-industry/PetServices";
import { PetProcess } from "@/components/pet-industry/PetProcess";
import { PetVisibility } from "@/components/pet-industry/PetVisibility";
import { PetWhy } from "@/components/pet-industry/PetWhy";

const siteUrl = "https://boostcart.agency";
const path = "/industries/pet-supplies";

/** Drives both the visible breadcrumb and its BreadcrumbList schema. /industries has no page yet, so it points at the homepage. */
const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Industries", href: "/#industries" },
  { name: "Pet supplies", href: path },
];
const title = "Pet Store Ecommerce SEO";
const description =
  "Ecommerce SEO for pet supply stores: variant and duplicate-page control, pet-type and life-stage collections, careful care guides and revenue-tied reporting.";

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
    name: "Pet Store Ecommerce SEO",
    serviceType: "Ecommerce SEO for pet supply stores",
    url: `${siteUrl}${path}`,
    description,
    audience: { "@type": "Audience", audienceType: "Pet supply ecommerce brands" },
    provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "BoostCart", url: siteUrl },
  },
];

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

export default function PetSuppliesPage() {
  return (
    <>
      <noscript><style>{noScriptCss}</style></noscript>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="relative isolate -mt-12">
        <HeroBackdrop />
        <Hero
          bigIsH1
          breadcrumb={breadcrumb}
          lines={["Ecommerce SEO for", "Pet Brands"]}
          lead="Grow organic revenue from the owners searching for the right food, litter, treats and gear for their pet."
          primaryLabel="Get a free pet store audit"
          secondaryLabel="Book a call"
          secondaryHref={bookCallHref}
          note="Shopify · WooCommerce · BigCommerce · Magento · Headless"
          visual={<HeroVisual />}
        />
        {/* The shared section pulls its heading up 5rem for the homepage hero; this wrapper cancels that. */}
        <div className="-mb-8 md:pt-28 lg:-mb-10"><ResultsShowcase /></div>
      </div>
      {/* One tighter, consistent section rhythm for the whole page. Shared sections read the same variable, so they follow. */}
      <div className="[--section-y:40px] md:[--section-y:56px] lg:[--section-y:64px]">
      <PetProblems />
      <PetServices />
      <PetVisibility />
      <PetPlatforms />
      <PetWhy />
      <PetProcess />
      <PetClients />
      <PetCompare />
      <PetPricing />
      <ProofBand />
      <PetLeadSection />
      <Faq items={petFaqs} eyebrow="Pet ecommerce FAQ" title="Pet store SEO questions" lead="Straight answers, including what we won't promise." ctaLabel="Ask us something else" />
      <PetFinalCta />
      </div>
    </>
  );
}
