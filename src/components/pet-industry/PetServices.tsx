import { ArrowRight } from "lucide-react";
import { AppLink } from "@/components/ui/AppLink";
import { ServicesBento, type Tile } from "@/components/sections/ServicesBento";
import { PetAuditMock, PetCalendarMock, PetFunnelMock, PetOutreachMock, PetRevenueMock, PetSerpMock } from "./PetServiceMocks";

const row1: Tile[] = [
  { title: "Technical SEO", text: "Variant URLs, crawl, speed and structured data fixed at the root so every pet page can rank.", href: "/services/technical-seo", mock: <PetAuditMock />, glow: { hue: "yellow", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
  { title: "Category & Product Pages", text: "Collections by pet type, breed and life stage that turn searches into carts.", href: "/services/category-product-pages", mock: <PetSerpMock />, glow: { hue: "pink", pos: "-right-16 -top-20" } },
  { title: "Content & Buying Guides", text: "Care and buying guides that answer owners' questions and build trust.", href: "/services/content", mock: <PetCalendarMock />, glow: { hue: "yellow", pos: "-right-14 -top-20" } },
];
const row2: Tile[] = [
  { title: "Link Building & Digital PR", text: "Editorial links from pet publications and blogs your customers read.", href: "/services/link-building", mock: <PetOutreachMock />, glow: { hue: "pink", pos: "-left-14 -top-20" } },
  { title: "Conversion-focused SEO", text: "Traffic is only useful if it buys, or reorders.", href: "/services/conversion-seo", mock: <PetFunnelMock />, glow: { hue: "yellow", pos: "-right-16 -top-20" } },
  { title: "Reporting", text: "Know exactly which pages bring revenue and why.", href: "/services/reporting", mock: <PetRevenueMock />, glow: { hue: "pink", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
];

/** The homepage services bento with pet-store tile copy and mocks. */
export function PetServices() {
  return (
    <div id="services">
      <ServicesBento
        rows={[row1, row2]}
        eyebrow="What we do for pet stores"
        title={<>Everything that moves your pet store&rsquo;s revenue</>}
        lead="One team, one roadmap and one report, built around pet catalogues."
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
