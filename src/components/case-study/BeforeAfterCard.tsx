import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatCount, formatMoney, percentChange } from "./format";

type Pair = { before: number | null; after: number | null };
type Props = {
  organicKeywords: Pair | null;
  organicTraffic: Pair | null;
  organicRevenue: Pair | null;
  currency: string | null;
};

function Metric({ label, pair, format }: { label: string; pair: Pair | null; format: (n: number) => string }) {
  if (pair?.before == null || pair.after == null) return null;
  const { before, after } = pair;
  const change = percentChange(before, after);
  const up = after >= before;

  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-ink">{label}</p>
        {change !== null && (
          <span className={cn("inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold", up ? "bg-success-bg text-success-fg" : "bg-danger-bg text-danger-fg")}>
            {up && <ArrowUpRight aria-hidden className="size-3" />}
            {up ? "+" : "-"}
            {Math.abs(Math.round(change)).toLocaleString("en-US")}%
          </span>
        )}
      </div>

      {/* Same layout on every row: start on the left, end on the right, so the eye compares down the card. */}
      <p className="mt-3 flex items-center gap-3" aria-label={`${format(before)} before, ${format(after)} after`}>
        <span aria-hidden className="font-display text-lg font-semibold tracking-[-0.02em] text-ink-32">{format(before)}</span>
        <span aria-hidden className="flex min-w-6 flex-1 items-center">
          <span className="h-px flex-1 bg-gradient-to-r from-ink-10 to-accent" />
          <ArrowRight className="-ml-1 size-3.5 shrink-0 text-accent" />
        </span>
        <span aria-hidden className="font-display text-[1.75rem] font-bold leading-none tracking-[-0.035em] text-ink">{format(after)}</span>
      </p>
    </div>
  );
}

export function BeforeAfterCard({ organicKeywords, organicTraffic, organicRevenue, currency }: Props) {
  const cur = currency ?? "USD";
  return (
    <section aria-labelledby="before-after-title" className="relative isolate overflow-hidden rounded-2xl border border-ink-10 bg-white p-6 shadow-xs">
      <span aria-hidden className="absolute -right-16 -top-20 -z-10 size-52 rounded-full bg-accent-soft opacity-70 blur-3xl" />
      <p className="eyebrow text-[0.6875rem]">The results</p>
      <h2 id="before-after-title" className="mt-2 font-display text-[1.375rem] font-bold leading-tight tracking-[-0.02em] text-ink">
        Before vs. after
      </h2>
      <div className="eyebrow mt-5 flex justify-between border-t border-ink-05 pt-4 text-[0.625rem]" aria-hidden>
        <span>Before</span>
        <span className="text-accent-strong">After</span>
      </div>
      <div className="mt-4 divide-y divide-ink-05">
        <Metric label="Organic keywords" pair={organicKeywords} format={formatCount} />
        <Metric label="Organic traffic" pair={organicTraffic} format={formatCount} />
        <Metric label="Organic revenue" pair={organicRevenue} format={(n) => formatMoney(n, cur)} />
      </div>
    </section>
  );
}
