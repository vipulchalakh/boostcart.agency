import { Check } from "lucide-react";
import { industryPlan, type IndustryPage } from "@content/data";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** One plan, shown as a single dark card. Price and terms come from `industryPlan`. */
export function IndustryPricing({ page }: { page: IndustryPage }) {
  const petPlan = industryPlan(page);
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-y">
      <div className="container-x">
        <div className="grid grid-cols-[minmax(0,1fr)] items-stretch gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          {/* Copy */}
          <Reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h2 id="pricing-title" className="h2 mt-4">One plan. Everything included.</h2>
            <p className="lead mt-6 max-w-[520px]">No tiers, no page limits and no task quotas. One monthly price, based on your store size, category and competition.</p>
            <p className="mt-4 max-w-[520px] text-base leading-[1.65] text-ink-68">{petPlan.note}</p>

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.04em] text-ink-50">What shapes your price</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {petPlan.factors.map((f) => (
                <li key={f.title} className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink shadow-xs ring-1 ring-ink-10">{f.title}</li>
              ))}
            </ul>

            <div className="mt-9">
              <Button href="/free-audit" size="lg" arrow sheen className="!py-2.5 !text-base">Get my price</Button>
            </div>
          </Reveal>

          {/* Split card */}
          <Reveal delay={80} className="h-full">
            <div className="relative h-full overflow-hidden rounded-[20px] shadow-[0_40px_80px_-32px_rgb(2_6_23/.35)] ring-1 ring-ink-10">
              <span aria-hidden className="absolute inset-x-0 top-0 z-20 h-[3px] bg-[linear-gradient(90deg,var(--accent),var(--yellow))]" />
              <div className="h-full">
                {/* BoostCart */}
                <div className="on-dark relative isolate flex h-full flex-col overflow-hidden bg-panel-navy p-7 text-white sm:p-10">
                  <span aria-hidden className="absolute inset-0 -z-10 [background:radial-gradient(rgb(255_255_255/.12)_1px,transparent_1.3px)_0_0/22px_22px] [mask-image:radial-gradient(ellipse_90%_80%_at_70%_100%,#000_20%,transparent_80%)]" />
                  <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 -z-10 h-[340px] w-[380px] bg-[radial-gradient(closest-side,rgb(223_55_167/.42),transparent)] blur-2xl" />
                  <span aria-hidden className="pointer-events-none absolute -left-16 -top-24 -z-10 size-[260px] rounded-full bg-[radial-gradient(closest-side,rgb(249_249_6/.1),transparent)] blur-2xl" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">BoostCart · One plan</p>
                  <p className="mt-5 font-display text-2xl font-bold leading-[1.2] tracking-[-0.03em] [text-wrap:balance]">One plan.<br />Nothing capped.</p>
                  <ul className="mb-10 mt-6 grid gap-3">
                    {petPlan.included.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[15px] leading-[22px] text-white/90">
                        <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-white"><Check className="size-3" strokeWidth={3} /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto border-t border-white/15 pt-2">
                    <p className="mt-6 font-display text-[clamp(2rem,1.5rem+1.4vw,2.5rem)] font-bold leading-none tracking-[-0.04em]">
                      {petPlan.priceFrom}<span className="mx-0.5 text-white/40">–</span>{petPlan.priceTo.replace("$", "")}
                      <span className="ml-1 text-base font-semibold tracking-[-0.01em] text-white/55">{petPlan.cadence}</span>
                    </p>
                    <p className="mt-2 text-[13px] leading-[19px] text-white/60">Based on your store size, category and competition.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
