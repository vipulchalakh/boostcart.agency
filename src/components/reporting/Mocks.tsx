import { ArrowRight, Check, Minus } from "lucide-react";
import { Tag } from "@/components/ui/Tag";

const shell = "rounded-t-lg border border-b-0 border-ink-05 bg-ink-02 p-4 shadow-xs";
const note = "font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68";
const box = "shadow-[inset_0_0_0_1px_var(--ink-05)]";

/** 1 — Tracking audit: sources and their status. */
export function SourceMock() {
  const rows: Array<[string, string, "success" | "warn" | "danger"]> = [["Search Console", "Connected", "success"], ["Analytics", "Connected", "success"], ["Order tracking", "Gaps", "warn"], ["Revenue by page", "Missing", "danger"]];
  return (
    <div className={shell}>
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-2">
        {rows.map(([u, s, t], i) => (
          <li key={u} className={`si flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 ${box}`} style={{ ["--d" as string]: `${i * 120}ms` }}>
            <span className="truncate text-[12px] text-ink">{u}</span><Tag tone={t}>{s}</Tag>
          </li>
        ))}
      </ul>
      <p className={`${note} mt-3`}>Illustrative</p>
    </div>
  );
}

/** 2 — Organic performance: clicks line. */
export function TrendMock() {
  return (
    <div className={shell}>
      <svg role="img" aria-label="Illustrative line chart of organic clicks over time" viewBox="0 0 320 110" className="h-28 w-full" fill="none">
        {[30, 60, 90].map((y) => <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="var(--ink-10)" />)}
        <path d="M0 84C40 80 60 70 100 66S160 52 200 46 270 30 320 22" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <p className={`${note} mt-1`}>Illustrative</p>
    </div>
  );
}

/** 3 — Revenue by page group. */
export function RevenueGroupMock() {
  const rows: Array<[string, number]> = [["Collections", 80], ["Products", 58], ["Guides", 30]];
  return (
    <div className={shell}>
      <ul className="grid gap-2.5">
        {rows.map(([t, w]) => (
          <li key={t} className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-2 text-[12px]">
            <span className="text-ink-68">{t}</span>
            <span aria-hidden className="h-2.5 overflow-hidden rounded-full bg-ink-05"><span className="grow-x block h-full rounded-full bg-accent" style={{ width: `${w}%` }} /></span>
          </li>
        ))}
      </ul>
      <p className={`${note} mt-3`}>Illustrative, not real revenue</p>
    </div>
  );
}

/** 4 — Winners and decliners. */
export function MoverMock() {
  const rows: Array<[string, string, "success" | "danger" | "neutral"]> = [["/collections/trail", "Up", "success"], ["/products/ridge-runner", "Up", "success"], ["/collections/sale", "Down", "danger"], ["/guides/sizing", "Flat", "neutral"]];
  return (
    <div className={shell}>
      <ul className="grid gap-2">
        {rows.map(([u, s, t]) => (
          <li key={u} className={`flex items-center justify-between gap-3 rounded-md bg-white px-3 py-1.5 ${box}`}>
            <span className="truncate font-mono text-[12px] text-ink-68">{u}</span><Tag tone={t}>{s}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 5 — Plain-language summary. */
export function SummaryMock() {
  return (
    <div className={shell}>
      <div className={`rounded-md bg-white p-3 ${box}`}>
        <p className="font-mono text-[10px] uppercase text-ink-50">Summary</p>
        <ul className="mt-1.5 grid gap-1.5 text-[12px] text-ink-68">
          {["What changed this month", "Why we think it changed", "What we do next"].map((t) => <li key={t} className="flex items-center gap-1.5"><ArrowRight aria-hidden className="size-3 text-accent" />{t}</li>)}
        </ul>
      </div>
    </div>
  );
}

/** 6 — AI visibility check. */
export function AiVisibilityMock() {
  const rows: Array<[string, boolean]> = [["Best trail shoes", true], ["Linen shirt care", false], ["Oak side tables", false]];
  return (
    <div className={shell}>
      <ul className="grid gap-2">
        {rows.map(([q, hit]) => (
          <li key={q} className={`flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 text-[12px] ${box}`}>
            <span className="truncate">{q}</span>
            <span className="flex items-center gap-1 text-[11px] text-ink-68">{hit ? <><Check aria-hidden className="size-3.5 text-success-fg" />Mentioned</> : <><Minus aria-hidden className="size-3.5 text-ink-50" />Not seen</>}</span>
          </li>
        ))}
      </ul>
      <p className={`${note} mt-3`}>Sample questions, illustrative</p>
    </div>
  );
}
