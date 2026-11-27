import type { ReactNode } from "react";
import { DollarSign, MousePointerClick, type LucideIcon } from "lucide-react";
import { metrics } from "@content/data";
import type { Metric } from "@content/data/types";
import { CountUp } from "@/components/ui/CountUp";

const valueCls = "font-display text-[clamp(2.25rem,1.5rem+2.2vw,3.25rem)] font-bold leading-none tracking-[-0.04em]";

function Tile({ metric, className, labelCls, visual }: { metric: Metric; className: string; labelCls: string; visual: ReactNode }) {
  return (
    <div className={`relative isolate flex min-h-[176px] flex-col justify-between gap-5 overflow-hidden rounded-[var(--r-xl)] p-5 sm:p-6 ${className}`}>
      <dt className={`order-2 font-mono text-xs uppercase leading-[18px] tracking-[0.04em] [text-wrap:balance] ${labelCls}`}>{metric.label}</dt>
      <dd className="order-1 flex flex-col gap-4">
        {visual}
        <span className={valueCls}>
          <CountUp value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
        </span>
      </dd>
    </div>
  );
}

function IconBadge({ icon: Icon, className }: { icon: LucideIcon; className: string }) {
  return (
    <span aria-hidden className={`flex size-9 items-center justify-center rounded-full ${className}`}>
      <Icon className="size-[18px]" strokeWidth={2.25} />
    </span>
  );
}

/** Homepage pricing only: the published-case-study totals as a 2×2 grid beside the plan. */
export function HomePricingStats() {
  const [stores, revenue, visits, growth] = metrics;

  return (
    <dl aria-label="BoostCart in numbers" className="grid flex-1 auto-rows-fr grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4">
      <Tile
        metric={revenue}
        className="bg-panel-navy text-white"
        labelCls="text-white/70"
        visual={
          <>
            <span aria-hidden className="pointer-events-none absolute -bottom-28 -right-24 -z-10 size-[320px] bg-[radial-gradient(closest-side,rgb(223_55_167/.55),transparent)] blur-2xl" />
            <IconBadge icon={DollarSign} className="bg-white/10 text-white" />
          </>
        }
      />
      <Tile
        metric={growth}
        className="border border-ink-05 bg-ink-02 text-ink"
        labelCls="text-ink-68"
        visual={
          /* Before and after bars: +214% means 3.14× the starting traffic. */
          <span aria-hidden className="flex h-9 items-end gap-1.5">
            <span className="w-4 rounded-sm bg-ink-10" style={{ height: `${10000 / (100 + growth.value)}%` }} />
            <span className="h-full w-4 rounded-sm bg-accent" />
          </span>
        }
      />
      <Tile
        metric={stores}
        className="border border-ink-05 bg-ink-02 text-ink"
        labelCls="text-ink-68"
        visual={
          /* One dot per store. */
          <span aria-hidden className="flex h-9 max-w-[150px] flex-wrap content-center gap-1.5">
            {Array.from({ length: stores.value }, (_, i) => (
              <span key={i} className="size-2.5 rounded-full bg-accent" />
            ))}
          </span>
        }
      />
      <Tile
        metric={visits}
        className="bg-accent-soft text-accent-strong"
        labelCls="text-ink"
        visual={<IconBadge icon={MousePointerClick} className="bg-white text-accent-strong" />}
      />
    </dl>
  );
}
