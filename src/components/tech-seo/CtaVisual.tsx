import { Tag } from "@/components/ui/Tag";

const rows: Array<[string, string, "success" | "warn" | "danger" | "neutral"]> = [
  ["/collections/trail-shoes", "Indexable", "success"],
  ["/products/ridge-runner-gtx", "Indexable", "success"],
  ["/collections/trail?color=red", "Duplicate", "warn"],
  ["/products/summit-jacket", "Noindex", "danger"],
  ["/search?q=trail", "Blocked", "neutral"],
];

/** Fictional URL verdicts for the closing call to action (no numbers, no results). */
export function CtaVisual() {
  return (
    <div className="rounded-2xl bg-white p-5 text-ink shadow-lg ring-1 ring-white/10 sm:p-6" role="img" aria-label="Illustration of an ecommerce URL inspection report with example verdicts">
      <div className="flex items-center justify-between"><span className="text-sm font-medium">URL inspection</span><span className="font-mono text-[10px] uppercase text-ink-68">Example</span></div>
      <p className="mt-1 font-display text-2xl font-bold tracking-[-0.03em] sm:text-[28px]">What search engines see</p>
      <ul className="mt-4 divide-y divide-ink-05 text-sm">
        {rows.map(([u, v, t]) => (
          <li key={u} className="flex items-center justify-between gap-3 py-2.5"><span className="truncate font-mono text-[12px] text-ink-68">{u}</span><Tag tone={t}>{v}</Tag></li>
        ))}
      </ul>
    </div>
  );
}
