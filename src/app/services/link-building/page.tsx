import type { Metadata } from "next";
import { bookCallHref, linksFaqs, linksGoodFit, linksNotFit, linksPlatforms, linksSteps, linksUsps } from "@content/data";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { PlatformsSection } from "@/components/sections/PlatformsSection";
import { ProofBand } from "@/components/sections/ProofBand";
import { ResultsShowcase } from "@/components/sections/ResultsShowcase";
import { ServicesBento, type Tile } from "@/components/sections/ServicesBento";
import { UspSection } from "@/components/sections/UspSection";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { HeroVisual } from "@/components/link-building/HeroVisual";
import { AiOrbit } from "@/components/link-building/AiOrbit";
import { ProcessStack } from "@/components/link-building/ProcessStack";
import { LinksFinalCta } from "@/components/link-building/LinksFinalCta";
import { LinksLeadSection } from "@/components/link-building/LinksLeadSection";
import { LinksCompare } from "@/components/link-building/LinksCompare";
import { LinksWorkflow } from "@/components/link-building/LinksWorkflow";
import { ProfileMock, GapMock, AngleMock, PitchMock, PrMock, PlacementMock } from "@/components/link-building/Mocks";

const siteUrl = "https://boostcart.agency";
const path = "/services/link-building";

/** Drives both the visible breadcrumb and its BreadcrumbList schema. /services has no page yet, so it points at the homepage services section. */
const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Link Building", href: path },
];
const title = "Ecommerce Link Building and Digital PR";
const description =
  "Ecommerce link building and digital PR: link profile review, competitor gaps, editorial outreach to relevant sites and clear reporting on every placement.";

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
    name: "Ecommerce Link Building and Digital PR",
    serviceType: "Ecommerce Link Building and Digital PR",
    url: `${siteUrl}${path}`,
    description,
    provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "BoostCart", url: siteUrl },
  },
];

const row1: Tile[] = [
  { title: "Link profile review", text: "Your current links sorted by relevance and risk.", href: path, mock: <ProfileMock />, glow: { hue: "yellow", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
  { title: "Competitor gaps", text: "Sites that link to rivals but not to you.", href: path, mock: <GapMock />, glow: { hue: "pink", pos: "-right-16 -top-20" } },
  { title: "Link angles", text: "A reason for publishers to cover your brand.", href: path, mock: <AngleMock />, glow: { hue: "yellow", pos: "-right-14 -top-20" } },
];
const row2: Tile[] = [
  { title: "Personal outreach", text: "Pitches written for each site, approved by you.", href: path, mock: <PitchMock />, glow: { hue: "pink", pos: "-left-14 -top-20" } },
  { title: "Digital PR", text: "Data and stories that earn coverage and links.", href: path, mock: <PrMock />, glow: { hue: "yellow", pos: "-right-16 -top-20" } },
  { title: "Placement reporting", text: "Every link listed, checked and tied to a target page.", href: path, mock: <PlacementMock />, glow: { hue: "pink", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
];

export default function LinkBuildingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="relative isolate -mt-12">
        <HeroBackdrop />
        <Hero
          bigIsH1
          breadcrumb={breadcrumb}
          lines={["Links Earned From", "Sites Shoppers Read"]}
          lead="Editorial links to your key collections and guides, earned through real outreach to relevant sites."
          primaryLabel="Get a link review"
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
        title={<>Who needs ecommerce link building?</>}
        lead="Links help when the pages are already worth linking to. Here's who benefits, and who should look elsewhere first."
        good={linksGoodFit}
        notFit={linksNotFit}
        prompt="Not sure which side you're on? We'll tell you honestly."
        ctaLabel="Check if we're a fit"
      />
      <AiOrbit />
      <PlatformsSection
        items={linksPlatforms}
        eyebrow="Platforms we cover"
        title={<>Link building that respects your platform</>}
        lead="Clean URLs, redirects and canonicals decide whether earned links count. We check them on Shopify, WooCommerce and headless builds first."
      />
      <UspSection
        items={linksUsps}
        eyebrow="Why BoostCart"
        title="Why stores choose us for link building"
        lead="Four things you can expect from every link building engagement."
      />
      <div id="services">
        <ServicesBento
          rows={[row1, row2]}
          eyebrow="What the work covers"
          title={<>Everything behind a link worth earning</>}
          lead="Six workstreams, one clear outreach plan."
        />
      </div>
      <ProcessStack
        steps={linksSteps}
        visual={(step) => <LinksWorkflow step={step} />}
        eyebrow="How we work"
        title="From link review to live placements"
        lead="Four steps from research to a report on every link. Content assets and ongoing outreach are scoped separately."
      />
      <LinksCompare />
      <ProofBand />
      <LinksLeadSection />
      <Faq items={linksFaqs} eyebrow="Link building FAQ" title="Ecommerce link building questions" lead="Straight answers, including what we won't promise." ctaLabel="Ask us something else" />
      <LinksFinalCta />
    </>
  );
}
