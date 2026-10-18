import type { ReactNode } from "react";
import { Heart, Lightbulb, Search, ShoppingBag } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Verdict = "Indexable" | "Duplicate" | "Noindex";
type Item = { name: string; path: string; verdict: Verdict; tint: string; icon: ReactNode };

const I = "var(--ink)";
const Y = "var(--yellow)";

/* Niche-neutral products: apparel, beauty, home, electronics, accessories. Icons are simple flat drawings. */
const items: Item[] = [
  { name: "Linen shirt", path: "/products/linen-shirt", verdict: "Indexable", tint: "#f1f5f9", icon: <path d="M16 8 6 14l4 8 4-2v22h20V20l4 2 4-8-10-6c-1 4-4 6-8 6s-7-2-8-6z" fill={I} /> },
  { name: "Glow serum", path: "/products/glow-serum", verdict: "Indexable", tint: "#fefec7", icon: <><rect x="17" y="16" width="14" height="26" rx="4" fill={I} /><rect x="21" y="7" width="6" height="9" rx="2" fill={I} /><rect x="17" y="26" width="14" height="8" fill={Y} /></> },
  { name: "Glow serum", path: "/products/glow-serum?size=30ml", verdict: "Duplicate", tint: "#fefec7", icon: <><rect x="17" y="16" width="14" height="26" rx="4" fill={I} /><rect x="21" y="7" width="6" height="9" rx="2" fill={I} /><rect x="17" y="26" width="14" height="8" fill={Y} /></> },
  { name: "Oak side table", path: "/products/oak-side-table", verdict: "Indexable", tint: "#f1f5f9", icon: <><rect x="6" y="17" width="36" height="6" rx="2" fill={I} /><rect x="10" y="23" width="4" height="19" fill={I} /><rect x="34" y="23" width="4" height="19" fill={I} /></> },
  { name: "Wireless buds", path: "/products/wireless-buds", verdict: "Noindex", tint: "#fefec7", icon: <><path d="M11 30v-6a13 13 0 0 1 26 0v6" fill="none" stroke={I} strokeWidth="4" strokeLinecap="round" /><rect x="7" y="28" width="9" height="14" rx="4" fill={I} /><rect x="32" y="28" width="9" height="14" rx="4" fill={I} /></> },
  { name: "Leather tote", path: "/products/leather-tote", verdict: "Indexable", tint: "#f1f5f9", icon: <><path d="M16 18v-3a8 8 0 0 1 16 0v3" fill="none" stroke={I} strokeWidth="3" /><path d="M9 18h30l3 24H6z" fill={I} /></> },
];
const total = items.length;
const dup = items.filter((i) => i.verdict === "Duplicate").length;
const ok = items.filter((i) => i.verdict === "Indexable").length;

const chip: Record<Verdict, string> = { Indexable: "bg-success-bg text-success-fg", Duplicate: "bg-warn-bg text-warn-fg", Noindex: "bg-danger-bg text-danger-fg" };
const card = "rounded-xl bg-white shadow-md ring-1 ring-ink-10";

function Metric({ label, value, tag, fill, bar, tone }: { label: string; value: number; tag: string; fill: number; bar: string; tone: string }) {
  return (
    <div className={cn(card, "si p-3")}>
      <p className="text-[11px] font-medium leading-4 text-ink-68">{label}</p>
      <div className="mt-1.5 flex items-end justify-between gap-2">
        <p className="font-display text-3xl font-bold leading-none tracking-[-0.04em]">{value}<span className="text-base font-semibold text-ink-50"> of {total}</span></p>
        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium leading-4", tone)}>{tag}</span>
      </div>
      <div aria-hidden className="mt-2.5 h-2 overflow-hidden rounded-full bg-ink-05"><div className={cn("grow-x h-full rounded-full", bar)} style={{ width: `${(fill / total) * 100}%` }} /></div>
    </div>
  );
}

function Chart() {
  return (
    <div className={cn(card, "si hidden flex-col p-3 sm:flex")} style={{ ["--d" as string]: "120ms" }}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium leading-4 text-ink-68">Crawled and indexed URLs</p>
        <span className="rounded-full bg-ink-05 px-2 py-0.5 text-[10px] font-medium text-ink-68">Illustrative</span>
      </div>
      <ul className="mt-2 flex gap-3 text-[10px] text-ink-68">
        <li className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-ink" />Crawled</li>
        <li className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-accent" />Indexed</li>
      </ul>
      <svg role="img" aria-label="Illustrative area chart: crawled URLs above indexed URLs" viewBox="0 0 300 120" className="mt-2 min-h-20 w-full flex-1" preserveAspectRatio="none" fill="none">
        {[30, 60, 90].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="var(--ink-05)" />)}
        <path d="M0 46C20 50 30 38 50 34S80 54 100 48 125 18 150 28 180 44 200 32 235 14 255 30 285 34 300 50V120H0Z" fill="var(--ink)" fillOpacity=".06" />
        <path pathLength={1} className="draw-path" d="M0 46C20 50 30 38 50 34S80 54 100 48 125 18 150 28 180 44 200 32 235 14 255 30 285 34 300 50" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path d="M0 84C20 80 32 66 52 68S82 90 102 82 128 56 152 62 182 82 202 70 238 54 258 66 288 68 300 86V120H0Z" fill="var(--accent)" fillOpacity=".1" />
        <path pathLength={1} className="draw-path [animation-delay:250ms]" d="M0 84C20 80 32 66 52 68S82 90 102 82 128 56 152 62 182 82 202 70 238 54 258 66 288 68 300 86" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

function Store() {
  return (
    <div className="si overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-ink-10" style={{ ["--d" as string]: "240ms" }}>
      <div className="flex items-center justify-between gap-3 border-b border-ink-05 px-3 py-1.5">
        <span className="font-display text-[12px] font-bold tracking-[-0.02em]">YOUR STORE</span>
        <span className="hidden gap-3 text-[10px] text-ink-68 sm:flex"><span>Shop</span><span>Collections</span><span>Sale</span><span>New in</span></span>
        <span aria-hidden className="flex gap-2.5 text-ink-68"><Search className="size-3.5" /><Heart className="size-3.5" /><ShoppingBag className="size-3.5" /></span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 px-3 pt-2.5">
        {["Category", "Price", "Size", "Rating"].map((f) => (
          <span key={f} className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-medium leading-4 ring-1", f === "Price" ? "bg-yellow text-ink ring-ink/10" : "bg-white text-ink-68 ring-ink-10")}>{f} ▾</span>
        ))}
      </div>
      <ul className="grid grid-cols-3 gap-2 p-2">
        {items.map((it) => (
          <li key={it.path} className="min-w-0 rounded-lg bg-white ring-1 ring-ink-05">
            <div className="grid h-6 place-items-center rounded-t-lg" style={{ background: it.tint }}>
              <svg aria-hidden viewBox="0 0 48 48" className="size-8">{it.icon}</svg>
            </div>
            <div className="p-1.5">
              <p className="truncate text-[11px] font-medium leading-4">{it.name}</p>
              <p className="truncate font-mono text-[8px] leading-3 text-ink-50">{it.path}</p>
              <span className={cn("mt-1 inline-block rounded-xs px-1.5 py-px text-[9px] font-medium leading-3", chip[it.verdict])}>{it.verdict}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Hero visual: compact, niche-neutral storefront. Metric cards are counted from the fictional product list below, so nothing is invented. */
export function HeroVisual() {
  return (
    <Reveal bare className="relative mx-auto w-full max-w-[480px] lg:mr-0">
      <figure aria-label="Illustration: a fictional ecommerce store with example crawl and indexation status for each product URL" className="relative">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[5fr_6fr] sm:gap-3">
          <div className="col-span-2 grid grid-cols-2 gap-2.5 sm:col-span-1 sm:grid-cols-1 sm:gap-3">
            <Metric label="Duplicate URLs" value={dup} tag="Consolidate" fill={dup} bar="bg-yellow" tone="bg-warn-bg text-warn-fg" />
            <Metric label="Indexable URLs" value={ok} tag="Goal: key pages" fill={ok} bar="bg-success-dot" tone="bg-success-bg text-success-fg" />
          </div>
          <Chart />
        </div>
        <div className="relative z-10 -mt-1"><Store /></div>
        <div className="si ind-float absolute -bottom-3 right-0 z-20 flex items-center gap-2 rounded-lg bg-yellow px-3 py-2 shadow-md ring-1 ring-ink/10" style={{ ["--d" as string]: "420ms" }}>
          <Lightbulb aria-hidden className="size-4 text-ink" />
          <span className="font-display text-sm font-bold tracking-[-0.02em]">Crawled ≠ indexed</span>
        </div>
        <figcaption className="sr-only">Example only: counts come from the six product URLs in the fictional store, not from a real site.</figcaption>
      </figure>
    </Reveal>
  );
}
