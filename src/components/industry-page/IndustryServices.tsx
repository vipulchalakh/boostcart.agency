import { ArrowRight } from "lucide-react";
import type { IndustryPage } from "@content/data";
import { AppLink } from "@/components/ui/AppLink";
import { ServicesBento, type Tile } from "@/components/sections/ServicesBento";
import { IndustryAuditMock, IndustryCalendarMock, IndustryFunnelMock, IndustryOutreachMock, IndustryRevenueMock, IndustrySerpMock } from "./IndustryServiceMocks";

/** The homepage services bento with industry tile copy and mocks. */
export function IndustryServices({ page }: { page: IndustryPage }) {
  const t = page.mocks.serviceText;
  const row1: Tile[] = [
    { title: "Technical SEO", text: t[0], href: "/services/technical-seo", mock: <IndustryAuditMock page={page} />, glow: { hue: "yellow", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
    { title: "Category & Product Pages", text: t[1], href: "/services/category-product-pages", mock: <IndustrySerpMock page={page} />, glow: { hue: "pink", pos: "-right-16 -top-20" } },
    { title: "Content & Buying Guides", text: t[2], href: "/services/content", mock: <IndustryCalendarMock page={page} />, glow: { hue: "yellow", pos: "-right-14 -top-20" } },
  ];
  const row2: Tile[] = [
    { title: "Link Building & Digital PR", text: t[3], href: "/services/link-building", mock: <IndustryOutreachMock page={page} />, glow: { hue: "pink", pos: "-left-14 -top-20" } },
    { title: "Conversion-focused SEO", text: t[4], href: "/services/conversion-seo", mock: <IndustryFunnelMock />, glow: { hue: "yellow", pos: "-right-16 -top-20" } },
    { title: "Reporting", text: t[5], href: "/services/reporting", mock: <IndustryRevenueMock />, glow: { hue: "pink", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
  ];
  return (
    <div id="services">
      <ServicesBento
        rows={[row1, row2]}
        eyebrow={`What we do for ${page.noun}s`}
        title={<>Everything that moves your store&rsquo;s revenue</>}
        lead={`One team, one roadmap and one report, built around ${page.noun} catalogues.`}
      />
      {/* The bento section pads its bottom by --section-y; pull that in so the link sits 2.5rem under the tiles. */}
      <p className="-mt-[calc(var(--section-y)-2.5rem)] text-center">
        <AppLink href="/#services" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong underline-offset-4 hover:underline">
          View all services <ArrowRight aria-hidden className="size-3.5" />
        </AppLink>
      </p>
    </div>
  );
}
