import { Check } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";

const sampleCls = "font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68";

/* Pet-store copies of the shared homepage bento mocks, so the shared file stays untouched. */

/** 1 — Technical SEO: checklist + score gauge. Sample values. */
export function PetAuditMock() {
  const items = ["Variant URLs", "Core Web Vitals", "Product schema", "Filter pages"];
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-6 rounded-t-lg border border-b-0 border-ink-05 bg-ink-02 p-5 shadow-xs">
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-2.5">
        {items.map((t, i) => (
          <li key={t} className="si flex items-center gap-2.5 text-sm" style={{ ["--d" as string]: `${i * 150}ms` }}>
            <span className="grid size-5 place-items-center rounded-full bg-success-bg text-success-fg">
              <Check aria-hidden className="size-3" strokeWidth={3} />
            </span>
            {t}
          </li>
        ))}
      </ul>
      <div role="img" aria-label="Sample site health score rising from 54 to 96" className="relative size-28">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--ink-05)" strokeWidth="9" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--accent)" strokeWidth="9" strokeLinecap="round" pathLength={1} strokeDasharray="0.96 1" className="gauge" />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-center">
          <span>
            <span className="block font-display text-3xl font-bold leading-none"><CountUp value={96} /></span>
            <span className={sampleCls}>Sample</span>
          </span>
        </span>
      </div>
    </div>
  );
}

/** 2 — Category & product pages: SERP snippet before/after. */
export function PetSerpMock() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-3 rounded-t-lg border border-b-0 border-ink-05 bg-ink-02 p-4 shadow-xs">
      <div className="opacity-50">
        <p className="text-[11px] text-ink-50">example-petshop.com › collections › dog-food</p>
        <p className="text-[15px] font-medium leading-5 text-ink-68">Dog Food | Example Pet Shop</p>
        <p className="text-xs leading-[18px] text-ink-50">Shop our dog food. Free shipping.</p>
      </div>
      <div className="rounded-md bg-white p-3 shadow-[0_0_0_1px_var(--accent)]">
        <p className="text-[11px] text-ink-50">example-petshop.com › collections › large-breed-puppy-food</p>
        <p className="type text-[15px] font-medium leading-5 text-accent-strong">Large Breed Puppy Food | Example Pet Shop</p>
        <p className="type text-xs leading-[18px] text-ink-68" style={{ ["--d" as string]: "900ms" }}>Compare formulas, protein and bag sizes. Free shipping over a set spend.</p>
        <div className="mt-2 flex items-center gap-2">
          <Tag tone="accent">Product schema</Tag>
          <span className={sampleCls}>Sample</span>
        </div>
      </div>
    </div>
  );
}

/** 3 — Content: editorial calendar. */
export function PetCalendarMock() {
  const rows: Array<[string, string, "neutral" | "warn" | "success", string]> = [
    ["How to choose puppy food", "DRAFT", "neutral", "AK"],
    ["Wet vs dry cat food: a guide", "REVIEW", "warn", "MR"],
    ["Litter types, compared", "LIVE", "success", "JT"],
    ["Feeding a senior dog", "LIVE", "success", "SL"],
  ];
  return (
    <div className="rounded-t-lg border border-b-0 border-ink-05 bg-ink-02 p-3 shadow-xs">
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-2">
        {rows.map(([t, s, tone, a], i) => (
          <li key={t} className="si flex items-center gap-2.5 rounded-md bg-white p-2 pr-3 shadow-[0_0_0_1px_var(--ink-05)]" style={{ ["--d" as string]: `${i * 120}ms` }}>
            <Avatar initials={a} size={24} index={i} className="ring-0" />
            <span className="min-w-0 flex-1 truncate text-[13px]">{t}</span>
            <Tag tone={tone}>{s}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 4 — Link building: outreach list + sparkline. */
export function PetOutreachMock() {
  const rows: Array<[string, string, "neutral" | "warn" | "success"]> = [
    ["editor@sample-petmag.com", "SENT", "neutral"],
    ["team@sample-vetblog.com", "REPLIED", "warn"],
    ["news@sample-petblog.com", "LIVE", "success"],
  ];
  return (
    <div className="rounded-t-lg border border-b-0 border-ink-05 bg-ink-02 p-3 shadow-xs">
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-2">
        {rows.map(([t, s, tone], i) => (
          <li key={t} className="si flex items-center justify-between gap-2 rounded-md bg-white px-3 py-2 shadow-[0_0_0_1px_var(--ink-05)]" style={{ ["--d" as string]: `${i * 120}ms` }}>
            <span className="min-w-0 truncate text-[13px]">{t}</span>
            <Tag tone={tone}>{s}</Tag>
          </li>
        ))}
      </ul>
      <div role="img" aria-label="Sample chart of referring links growing over time" className="mt-3 flex items-end justify-between gap-3">
        <span className={sampleCls}>Links · sample</span>
        <svg viewBox="0 0 120 30" className="h-8 w-28" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path pathLength={1} className="draw-path" d="M2 26l18-4 16 2 18-10 18 4 20-12 26-4" />
        </svg>
      </div>
    </div>
  );
}

/** 5 — Conversion SEO: funnel bars. */
export function PetFunnelMock() {
  const bars: Array<[string, string, string]> = [
    ["Sessions", "100%", "var(--ink)"],
    ["Add to cart", "46%", "var(--accent-strong)"],
    ["Orders", "21%", "var(--accent)"],
  ];
  return (
    <div className="rounded-t-lg border border-b-0 border-ink-05 bg-ink-02 p-4 shadow-xs">
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-3">
        {bars.map(([l, w, c], i) => (
          <li key={l}>
            <div className="mb-1 flex justify-between text-xs text-ink-68"><span>{l}</span></div>
            <div className="h-5 rounded-xs bg-ink-05">
              <div className="grow-x h-full rounded-xs" style={{ width: w, background: c, ["--d" as string]: `${i * 180}ms` }} />
            </div>
          </li>
        ))}
      </ul>
      <p className={`${sampleCls} mt-3`}>Sample funnel</p>
    </div>
  );
}

/** 6 — Reporting: big number + self-drawing area chart. */
export function PetRevenueMock() {
  const line = "M0 92 C30 88 45 80 70 74 S115 66 140 52 S190 46 215 30 S260 18 280 8";
  return (
    <div className="rounded-t-lg border border-b-0 border-ink-05 bg-ink-02 p-4 shadow-xs">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-ink-68">Organic revenue</p>
          <p className="font-display text-3xl font-bold leading-tight tracking-[-0.03em]">$—</p>
        </div>
        <span className="rounded-sm bg-white px-2 py-1 text-xs font-medium shadow-[0_0_0_1px_var(--ink-05)]">Share ▾</span>
      </div>
      <div role="img" aria-label="Sample chart of organic revenue trending upward" className="mt-2">
        <svg viewBox="0 0 280 100" className="h-24 w-full overflow-visible">
          <defs>
            <linearGradient id="pet-rev-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--accent)" stopOpacity=".25" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${line} L280 100 L0 100 Z`} fill="url(#pet-rev-fill)" className="si" style={{ ["--d" as string]: "500ms" }} />
          <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" pathLength={1} className="draw-path" />
        </svg>
      </div>
      <p className={sampleCls}>Sample data</p>
    </div>
  );
}
