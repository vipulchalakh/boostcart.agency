import type { Metadata } from "next";
import { bookCallHref, reportingFaqs, reportingGoodFit, reportingNotFit, reportingPlatforms, reportingSteps, reportingUsps } from "@content/data";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { PlatformsSection } from "@/components/sections/PlatformsSection";
import { ProofBand } from "@/components/sections/ProofBand";
import { ResultsShowcase } from "@/components/sections/ResultsShowcase";
import { ServicesBento, type Tile } from "@/components/sections/ServicesBento";
import { UspSection } from "@/components/sections/UspSection";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { HeroVisual } from "@/components/reporting/HeroVisual";
import { AiOrbit } from "@/components/reporting/AiOrbit";
import { ProcessStack } from "@/components/reporting/ProcessStack";
import { ReportingFinalCta } from "@/components/reporting/ReportingFinalCta";
import { ReportingLeadSection } from "@/components/reporting/ReportingLeadSection";
import { ReportingCompare } from "@/components/reporting/ReportingCompare";
import { ReportingWorkflow } from "@/components/reporting/ReportingWorkflow";
import { SourceMock, TrendMock, RevenueGroupMock, MoverMock, SummaryMock, AiVisibilityMock } from "@/components/reporting/Mocks";

const siteUrl = "https://boostcart.agency";
const path = "/services/reporting";

/** Drives both the visible breadcrumb and its BreadcrumbList schema. /services has no page yet, so it points at the homepage services section. */
const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Reporting", href: path },
];
const title = "Ecommerce SEO Reporting";
const description =
  "Ecommerce SEO reporting tied to revenue: tracking audit, baseline, monthly reports by page group, plain-language findings and next steps, including AI visibility checks.";

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
    name: "Ecommerce SEO Reporting",
    serviceType: "Ecommerce SEO Reporting",
    url: `${siteUrl}${path}`,
    description,
    provider: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "BoostCart", url: siteUrl },
  },
];

const row1: Tile[] = [
  { title: "Tracking audit", text: "Analytics and ecommerce tracking checked before reporting.", href: path, mock: <SourceMock />, glow: { hue: "yellow", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
  { title: "Organic performance", text: "Clicks, searches and trends from Search Console and analytics.", href: path, mock: <TrendMock />, glow: { hue: "pink", pos: "-right-16 -top-20" } },
  { title: "Revenue by page group", text: "Orders from organic search grouped by page type.", href: path, mock: <RevenueGroupMock />, glow: { hue: "yellow", pos: "-right-14 -top-20" } },
];
const row2: Tile[] = [
  { title: "Winners and decliners", text: "Pages that moved, and why we think they moved.", href: path, mock: <MoverMock />, glow: { hue: "pink", pos: "-left-14 -top-20" } },
  { title: "Plain-language summary", text: "What changed, why and what we do next.", href: path, mock: <SummaryMock />, glow: { hue: "yellow", pos: "-right-16 -top-20" } },
  { title: "AI visibility", text: "Sample questions checked for mentions of your store.", href: path, mock: <AiVisibilityMock />, glow: { hue: "pink", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
];

export default function ReportingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="relative isolate -mt-12">
        <HeroBackdrop />
        <Hero
          bigIsH1
          breadcrumb={breadcrumb}
          lines={["SEO Reporting That", "Follows the Revenue"]}
          lead="See which pages and searches earn orders, what changed this month and what to do next."
          primaryLabel="Get a reporting review"
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
        title={<>Who needs ecommerce SEO reporting?</>}
        lead="Good reporting needs data to work with. Here's who benefits, and who should look elsewhere first."
        good={reportingGoodFit}
        notFit={reportingNotFit}
        prompt="Not sure which side you're on? We'll tell you honestly."
        ctaLabel="Check if we're a fit"
      />
      <AiOrbit />
      <PlatformsSection
        items={reportingPlatforms}
        eyebrow="Platforms we cover"
        title={<>Reporting built for your platform</>}
        lead="Order and event tracking differs on Shopify, WooCommerce and headless builds. We check yours before reporting on it."
      />
      <UspSection
        items={reportingUsps}
        eyebrow="Why BoostCart"
        title="Why stores choose us for reporting"
        lead="Four things you can expect from every reporting engagement."
      />
      <div id="services">
        <ServicesBento
          rows={[row1, row2]}
          eyebrow="What the work covers"
          title={<>Everything that connects SEO to revenue</>}
          lead="Six workstreams, one clear monthly report."
        />
      </div>
      <ProcessStack
        steps={reportingSteps}
        visual={(step) => <ReportingWorkflow step={step} />}
        eyebrow="How we work"
        title="From data sources to next steps"
        lead="Four steps from connected data to an action list. Custom dashboards and extra analysis are scoped separately."
      />
      <ReportingCompare />
      <ProofBand />
      <ReportingLeadSection />
      <Faq items={reportingFaqs} eyebrow="Reporting FAQ" title="Ecommerce SEO reporting questions" lead="Straight answers, including what we won't promise." ctaLabel="Ask us something else" />
      <ReportingFinalCta />
    </>
  );
}
