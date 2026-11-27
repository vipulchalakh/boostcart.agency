import { Check, FileSearch, TrendingUp } from "lucide-react";
import { homePlan, showMetrics } from "@content/data";
import { HomePricingStats } from "@/components/home/HomePricingStats";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const cardCls = "rounded-[var(--r-xl)] border border-ink-05 bg-ink-02 p-6 sm:p-7";
const titleCls = "font-display text-xl font-bold tracking-[-0.02em]";

/** Homepage pricing: the plan beside the case study totals. Price and terms come from `homePlan`. */
export function HomePricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Eyebrow>Pricing</Eyebrow>
          <h2 id="pricing-title" className="h2 mt-4">One plan. Everything included.</h2>
          <p className="lead mt-4">No tiers, no page limits and no task quotas. One monthly price for SEO and AI SEO.</p>
        </Reveal>

        <div className={`mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 lg:gap-8 ${showMetrics ? "lg:grid-cols-2" : "mx-auto max-w-[640px]"}`}>
          <Reveal className="flex flex-col gap-3">
            {/* The plan */}
            <div className={`${cardCls} flex-1`}>
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <h3 className={titleCls}>SEO + AI SEO program</h3>
                <p className="font-display text-[clamp(1.5rem,1.1rem+1.2vw,2rem)] font-bold leading-none tracking-[-0.03em] text-accent-strong">
                  {homePlan.priceFrom}–{homePlan.priceTo.replace("$", "")}
                  <span className="ml-1 text-sm font-semibold tracking-normal">{homePlan.cadence}</span>
                </p>
              </div>
              <p className="mt-2 max-w-[460px] whitespace-pre-line text-sm leading-[21px] text-ink-68">{homePlan.note}</p>

              <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {homePlan.included.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm leading-[21px] text-ink">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-strong" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="flex items-center gap-2 text-sm text-ink-68">
                  <FileSearch aria-hidden className="size-4 shrink-0" />
                  Price confirmed after a free audit
                </p>
                <Button href="/free-audit" arrow sheen className="max-sm:w-full">Get my price</Button>
              </div>
            </div>
          </Reveal>

          {showMetrics && (
            <Reveal delay={80} className="flex flex-col">
              <HomePricingStats />
            </Reveal>
          )}
        </div>

        <p className="mt-10 flex items-center justify-center gap-2.5 text-center font-display text-lg font-bold tracking-[-0.02em] text-ink [text-wrap:balance] md:text-xl">
          <TrendingUp aria-hidden className="size-5 shrink-0 text-accent-strong max-sm:hidden" />
          We&rsquo;re the most affordable and result-driven agency in the market.
        </p>
      </div>
    </section>
  );
}
