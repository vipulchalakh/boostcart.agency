import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { MockImage } from "@/components/mocks/MockImage";
import manifest from "@/lib/mock-manifest.json";
import type { PlatformPage } from "@content/data";
import { AppLink } from "@/components/ui/AppLink";
import { ServicesBento, type Tile } from "@/components/sections/ServicesBento";
import { PlatformAuditMock, PlatformCalendarMock, PlatformFunnelMock, PlatformOutreachMock, PlatformRevenueMock, PlatformSerpMock } from "./PlatformServiceMocks";

/** Recorded WebP once scripts/capture-mocks.mjs has captured this page, the live code mock until then. */
const mockFor = (id: string, alt: string, live: ReactNode) => (id in manifest ? <MockImage id={id} alt={alt} /> : live);

/** The homepage services bento with platform tile copy and live code mocks. */
export function PlatformServices({ page }: { page: PlatformPage }) {
  const t = page.mocks.serviceText;
  const row1: Tile[] = [
    { title: "Technical SEO", text: t[0], href: "/services/technical-seo", mock: mockFor(`platforms/${page.slug}/1`, "Animated preview: Technical SEO", <PlatformAuditMock page={page} />), glow: { hue: "yellow", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
    { title: "Category & Product Pages", text: t[1], href: "/services/category-product-pages", mock: mockFor(`platforms/${page.slug}/2`, "Animated preview: Category & Product Pages", <PlatformSerpMock page={page} />), glow: { hue: "pink", pos: "-right-16 -top-20" } },
    { title: "Content & Buying Guides", text: t[2], href: "/services/content", mock: mockFor(`platforms/${page.slug}/3`, "Animated preview: Content & Buying Guides", <PlatformCalendarMock page={page} />), glow: { hue: "yellow", pos: "-right-14 -top-20" } },
  ];
  const row2: Tile[] = [
    { title: "Link Building & Digital PR", text: t[3], href: "/services/link-building", mock: mockFor(`platforms/${page.slug}/4`, "Animated preview: Link Building & Digital PR", <PlatformOutreachMock page={page} />), glow: { hue: "pink", pos: "-left-14 -top-20" } },
    { title: "Conversion-focused SEO", text: t[4], href: "/services/conversion-seo", mock: mockFor(`platforms/${page.slug}/5`, "Animated preview: Conversion-focused SEO", <PlatformFunnelMock page={page} />), glow: { hue: "yellow", pos: "-right-16 -top-20" } },
    { title: "Reporting", text: t[5], href: "/services/reporting", mock: mockFor(`platforms/${page.slug}/6`, "Animated preview: Reporting", <PlatformRevenueMock page={page} />), glow: { hue: "pink", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
  ];
  return (
    <div id="services">
      <ServicesBento
        rows={[row1, row2]}
        eyebrow={`What we do on ${page.name}`}
        title={<>Everything that moves your store&rsquo;s revenue</>}
        lead={`One team, one roadmap and one report, built around how ${page.name} stores work.`}
      />
      {/* The bento section pads its bottom by --section-y; pull that in so the link sits 2.5rem under the tiles. */}
      <p className="-mt-[calc(var(--section-y)-2.5rem)] text-center">
        <AppLink href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong underline-offset-4 hover:underline">
          View all services <ArrowRight aria-hidden className="size-3.5" />
        </AppLink>
      </p>
    </div>
  );
}
