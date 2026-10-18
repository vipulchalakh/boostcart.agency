import { Lightbulb } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Trend = "Growing" | "Flat" | "Falling";
type Row = { group: string; trend: Trend; bar: number };

const rows: Row[] = [
  { group: "Collection pages", trend: "Growing", bar: 82 },
  { group: "Product pages", trend: "Growing", bar: 64 },
  { group: "Buying guides", trend: "Flat", bar: 38 },
  { group: "Brand pages", trend: "Flat", bar: 30 },
  { group: "Sale pages", trend: "Falling", bar: 22 },
];
const total = rows.length;
const up = rows.filter((r) => r.trend === "Growing").length;
const watch = total - up;

const chip: Record<Trend, string> = { Growing: "bg-success-bg text-success-fg", Flat: "bg-ink-05 text-ink-68", Falling: "bg-danger-bg text-danger-fg" };
const card = "rounded-xl bg-white shadow-md ring-1 ring-ink-10";

function Metric({ label, value, tag, bar, tone }: { label: string; value: number; tag: string; bar: string; tone: string }) {
  return (
    <div className={cn(card, "si p-3")}>
      <p className="text-[11px] font-medium leading-4 text-ink-68">{label}</p>
      <div className="mt-1.5 flex items-end justify-between gap-2">
        <p className="font-display text-3xl font-bold leading-none tracking-[-0.04em]">{value}<span className="text-base font-semibold text-ink-50"> of {total}</span></p>
        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium leading-4", tone)}>{tag}</span>
      </div>
      <div aria-hidden className="mt-2.5 h-2 overflow-hidden rounded-full bg-ink-05"><div className={cn("grow-x h-full rounded-full", bar)} style={{ width: `${(value / total) * 100}%` }} /></div>
    </div>
  );
}

function Chart() {
  return (
    <div className={cn(card, "si hidden flex-col p-3 sm:flex")} style={{ ["--d" as string]: "120ms" }}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium leading-4 text-ink-68">Organic revenue and clicks</p>
        <span className="rounded-full bg-ink-05 px-2 py-0.5 text-[10px] font-medium text-ink-68">Illustrative</span>
      </div>
      <ul className="mt-2 flex gap-3 text-[10px] text-ink-68">
        <li className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-ink" />Clicks</li>
        <li className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-accent" />Revenue</li>
      </ul>
      <svg role="img" aria-label="Illustrative line chart: clicks and revenue from organic search" viewBox="0 0 300 120" className="mt-2 min-h-20 w-full flex-1" preserveAspectRatio="none" fill="none">
        {[30, 60, 90].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="var(--ink-05)" />)}
        <path pathLength={1} className="draw-path" d="M0 70C30 64 50 74 80 58S130 48 160 52 210 34 240 40 280 24 300 20" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path pathLength={1} className="draw-path [animation-delay:250ms]" d="M0 94C30 92 60 96 90 84S140 74 170 70 220 56 250 52 285 40 300 34" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

function Report() {
  return (
    <div className="si overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-ink-10" style={{ ["--d" as string]: "240ms" }}>
      <div className="flex items-center justify-between gap-3 border-b border-ink-05 px-3 py-1.5">
        <span className="font-display text-[12px] font-bold tracking-[-0.02em]">Monthly SEO report</span>
        <span className="font-mono text-[9px] uppercase text-ink-50">Example</span>
      </div>
      <ul className="grid gap-2 p-3">
        {rows.map((r) => (
          <li key={r.group} className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] items-center gap-2">
            <span className="truncate text-[11px] font-medium leading-4">{r.group}</span>
            <span aria-hidden className="h-2 overflow-hidden rounded-full bg-ink-05"><span className="grow-x block h-full rounded-full bg-accent" style={{ width: `${r.bar}%` }} /></span>
            <span className={cn("rounded-xs px-1.5 py-px text-[9px] font-medium leading-3", chip[r.trend])}>{r.trend}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Hero visual: a fictional monthly report. Metric cards are counted from the five fictional page groups; bars are illustrative, not real revenue. */
export function HeroVisual() {
  return (
    <Reveal bare className="relative mx-auto w-full max-w-[480px] lg:mr-0">
      <figure aria-label="Illustration: a fictional monthly SEO report with example page groups and their trend" className="relative">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[5fr_6fr] sm:gap-3">
          <div className="col-span-2 grid grid-cols-2 gap-2.5 sm:col-span-1 sm:grid-cols-1 sm:gap-3">
            <Metric label="Page groups to watch" value={watch} tag="Review" bar="bg-yellow" tone="bg-warn-bg text-warn-fg" />
            <Metric label="Page groups growing" value={up} tag="Keep going" bar="bg-success-dot" tone="bg-success-bg text-success-fg" />
          </div>
          <Chart />
        </div>
        <div className="relative z-10 -mt-1"><Report /></div>
        <div className="si ind-float absolute -bottom-3 right-0 z-20 flex items-center gap-2 rounded-lg bg-yellow px-3 py-2 shadow-md ring-1 ring-ink/10" style={{ ["--d" as string]: "420ms" }}>
          <Lightbulb aria-hidden className="size-4 text-ink" />
          <span className="font-display text-sm font-bold tracking-[-0.02em]">Pages tied to revenue</span>
        </div>
        <figcaption className="sr-only">Example only: counts come from the five fictional page groups. Bars and lines are illustrative, not real results.</figcaption>
      </figure>
    </Reveal>
  );
}
