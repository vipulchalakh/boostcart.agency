import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { AppLink } from "@/components/ui/AppLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AuditMock, CalendarMock, FunnelMock, OutreachMock, RevenueMock, SerpMock } from "@/components/mocks/BentoMocks";
import { cn } from "@/lib/cn";

/** Soft hero-style color drop behind a tile's content: which hue, and which corner it sits in. */
type Glow = { hue: "yellow" | "pink"; pos: string };
export type Tile = { title: string; text: string; href: string; mock: ReactNode; glow: Glow; className?: string };

const row1: Tile[] = [
  { title: "Technical SEO", text: "Crawl, speed, indexation and structured data fixed at the root so every page can rank.", href: "/services/technical-seo", mock: <AuditMock />, glow: { hue: "yellow", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
  { title: "Category & Product Pages", text: "Rankable collections and product pages that turn searches into carts.", href: "/services/category-product-pages", mock: <SerpMock />, glow: { hue: "pink", pos: "-right-16 -top-20" } },
  { title: "Content & Buying Guides", text: "Content that captures high-intent search and builds trust.", href: "/services/content", mock: <CalendarMock />, glow: { hue: "yellow", pos: "-right-14 -top-20" } },
];
const row2: Tile[] = [
  { title: "Link Building & Digital PR", text: "Editorial links from sites your customers read.", href: "/services/link-building", mock: <OutreachMock />, glow: { hue: "pink", pos: "-left-14 -top-20" } },
  { title: "Conversion-focused SEO", text: "Traffic is only useful if it buys.", href: "/services/conversion-seo", mock: <FunnelMock />, glow: { hue: "yellow", pos: "-right-16 -top-20" } },
  { title: "Reporting", text: "Know exactly which pages bring revenue and why.", href: "/services/reporting", mock: <RevenueMock />, glow: { hue: "pink", pos: "-left-16 -top-20" }, className: "md:col-span-2 lg:col-span-1" },
];

function BentoTile({ tile, delay }: { tile: Tile; delay: number }) {
  return (
    <Reveal delay={delay} className={tile.className}>
      <article className="group spotlight lift relative flex h-full flex-col overflow-hidden rounded-xl border border-ink-05 bg-white p-6 pb-0 shadow-xs">
        <span
          aria-hidden
          className={cn("pointer-events-none absolute -z-10 size-72 opacity-70 transition-opacity duration-[var(--dur-med)] group-hover:opacity-100", tile.glow.pos)}
          style={{ background: `radial-gradient(closest-side, color-mix(in srgb, var(${tile.glow.hue === "yellow" ? "--yellow" : "--accent"}) ${tile.glow.hue === "yellow" ? 38 : 22}%, transparent), transparent)` }}
        />
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-medium leading-6 tracking-[-0.02em]">{tile.title}</h3>
          <ArrowUpRight aria-hidden className="size-4 text-ink-50 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100" />
        </div>
        <p className="mt-1 max-w-[46ch] text-sm leading-[21px] text-ink-68">{tile.text}</p>
        <div className="-mx-6 mt-6 px-6 pt-0 lg:mt-auto lg:pt-8">{tile.mock}</div>
        <AppLink href={tile.href} aria-label={`${tile.title}: learn more`} className="absolute inset-0 rounded-xl" />
      </article>
    </Reveal>
  );
}

type Props = { rows?: [Tile[], Tile[]]; eyebrow?: string; title?: ReactNode; lead?: string };

export function ServicesBento({
  rows: [top, bottom] = [row1, row2],
  eyebrow = "All-in-one SEO program",
  title = <>Everything that moves your store&rsquo;s revenue</>,
  lead = "One team. One roadmap. One report.",
}: Props = {}) {
  return (
    <section aria-labelledby="bento-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="bento-title" className="h2 mt-4">{title}</h2>
          <p className="lead mt-4">{lead}</p>
        </Reveal>
        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-4 md:gap-6">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,3.5fr)_minmax(0,3.5fr)]">
            {top.map((t, i) => <BentoTile key={t.title} tile={t} delay={i * 80} />)}
          </div>
          <div className={cn("grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3")}>
            {bottom.map((t, i) => <BentoTile key={t.title} tile={t} delay={i * 80} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
