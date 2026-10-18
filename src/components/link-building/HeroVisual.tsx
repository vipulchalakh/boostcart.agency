import { Globe, Lightbulb, Link2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Status = "Link live" | "Replied" | "Pitched" | "Declined";
type Site = { name: string; kind: string; status: Status };

const sites: Site[] = [
  { name: "The Weekend Outdoors", kind: "Gear roundup", status: "Link live" },
  { name: "Home Edit Journal", kind: "Design blog", status: "Replied" },
  { name: "Trail Notes", kind: "Hobby site", status: "Link live" },
  { name: "Style Ledger", kind: "Fashion editor", status: "Pitched" },
  { name: "Care and Craft", kind: "Product reviews", status: "Pitched" },
  { name: "The Daily Shopper", kind: "News site", status: "Declined" },
];
const total = sites.length;
const live = sites.filter((s) => s.status === "Link live").length;
const open = sites.filter((s) => s.status === "Pitched" || s.status === "Replied").length;

const chip: Record<Status, string> = { "Link live": "bg-success-bg text-success-fg", Replied: "bg-accent-soft text-accent-strong", Pitched: "bg-warn-bg text-warn-fg", Declined: "bg-ink-05 text-ink-68" };
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
        <p className="text-[11px] font-medium leading-4 text-ink-68">Referring sites over time</p>
        <span className="rounded-full bg-ink-05 px-2 py-0.5 text-[10px] font-medium text-ink-68">Illustrative</span>
      </div>
      <svg role="img" aria-label="Illustrative line chart: referring sites rising gradually" viewBox="0 0 300 120" className="mt-2 min-h-24 w-full flex-1" preserveAspectRatio="none" fill="none">
        {[30, 60, 90].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="var(--ink-05)" />)}
        <path d="M0 100C40 98 60 90 90 84S140 72 170 56 230 40 260 28 290 20 300 16V120H0Z" fill="var(--accent)" fillOpacity=".1" />
        <path pathLength={1} className="draw-path" d="M0 100C40 98 60 90 90 84S140 72 170 56 230 40 260 28 290 20 300 16" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

function Outreach() {
  return (
    <div className="si overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-ink-10" style={{ ["--d" as string]: "240ms" }}>
      <div className="flex items-center justify-between gap-3 border-b border-ink-05 px-3 py-1.5">
        <span className="flex items-center gap-1.5 font-display text-[12px] font-bold tracking-[-0.02em]"><Link2 aria-hidden className="size-3.5" />Outreach tracker</span>
        <span className="font-mono text-[9px] uppercase text-ink-50">Example</span>
      </div>
      <ul className="grid gap-1.5 p-2">
        {sites.map((s) => (
          <li key={s.name} className="flex items-center gap-2 rounded-lg bg-white px-2 py-1.5 ring-1 ring-ink-05">
            <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-md bg-ink-05 text-ink-68"><Globe className="size-3.5" /></span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11px] font-medium leading-4">{s.name}</span>
              <span className="block truncate text-[9px] leading-3 text-ink-50">{s.kind}</span>
            </span>
            <span className={cn("shrink-0 rounded-xs px-1.5 py-px text-[9px] font-medium leading-3", chip[s.status])}>{s.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Hero visual: a fictional outreach tracker. Metric cards are counted from the six fictional sites, so nothing is invented. */
export function HeroVisual() {
  return (
    <Reveal bare className="relative mx-auto w-full max-w-[480px] lg:mr-0">
      <figure aria-label="Illustration: a fictional outreach tracker with example sites and the status of each pitch" className="relative">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[5fr_6fr] sm:gap-3">
          <div className="col-span-2 grid grid-cols-2 gap-2.5 sm:col-span-1 sm:grid-cols-1 sm:gap-3">
            <Metric label="Pitches in progress" value={open} tag="Follow up" bar="bg-yellow" tone="bg-warn-bg text-warn-fg" />
            <Metric label="Links live" value={live} tag="Earned" bar="bg-success-dot" tone="bg-success-bg text-success-fg" />
          </div>
          <Chart />
        </div>
        <div className="relative z-10 -mt-1"><Outreach /></div>
        <div className="si ind-float absolute -bottom-3 right-0 z-20 flex items-center gap-2 rounded-lg bg-yellow px-3 py-2 shadow-md ring-1 ring-ink/10" style={{ ["--d" as string]: "420ms" }}>
          <Lightbulb aria-hidden className="size-4 text-ink" />
          <span className="font-display text-sm font-bold tracking-[-0.02em]">Earned, never bought</span>
        </div>
        <figcaption className="sr-only">Example only: counts come from the six fictional sites, not from a real campaign.</figcaption>
      </figure>
    </Reveal>
  );
}
