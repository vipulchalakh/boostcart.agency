import { metrics, showMetrics } from "@content/data";
import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { KeywordTicker } from "./KeywordTicker";
import { LaunchVisual } from "./LaunchVisual";
import { ReportingLeadForm } from "./ReportingLeadForm";

/** Lead capture after the testimonials. One white card: a soft pink panel (same treatment as the platform cards) with the pitch and rocket, and the audit form beside it. */
export function ReportingLeadSection() {
  return (
    <section id="audit" aria-labelledby="lead-title" className="lead-section py-[var(--section-y)]">
      <div className="container-x">
        <Reveal bare className="grid overflow-hidden rounded-2xl border border-ink-05 bg-white shadow-xs lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <div className="relative overflow-hidden px-6 pb-0 pt-10 sm:px-10 lg:py-12" style={{ background: "color-mix(in srgb, var(--accent) 7%, white)" }}>
            <div aria-hidden className="absolute -right-16 -top-20 size-72 rounded-full opacity-60 blur-3xl" style={{ background: "color-mix(in srgb, var(--accent) 38%, transparent)" }} />
            <div aria-hidden className="dots absolute inset-0 opacity-60" />

            <div className="relative z-10 max-w-[400px]">
              <Eyebrow>Get a free audit</Eyebrow>
              <h2 id="lead-title" className="h2 mt-4 !text-[clamp(2rem,1.5rem+1.6vw,2.75rem)]">Let&rsquo;s connect your SEO to revenue</h2>
              <p className="mt-4 text-base leading-[1.6] text-ink-68">Tell us a little about your store and we&rsquo;ll review what you track and what’s missing.</p>

              {/* TODO-REAL: numbers come from the sample metrics file; confirm before launch. */}
              {showMetrics && (
                <dl className="mt-8 grid grid-cols-3 gap-2.5">
                  {metrics.slice(0, 3).map((m, i) => (
                    <div key={m.label} className="rounded-lg bg-white px-3 py-3 shadow-xs ring-1 ring-ink-05">
                      <dd className="font-display text-xl font-bold tracking-[-0.03em] text-ink">
                        {i === 2 ? <KeywordTicker start={m.value} /> : <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />}
                      </dd>
                      <dt className="mt-1 font-mono text-[10px] uppercase leading-snug tracking-[0.04em] text-ink-50">{m.label}</dt>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className="relative mx-auto mt-4 h-[260px] w-[230px] lg:absolute lg:bottom-4 lg:right-4 lg:mt-0 lg:h-[330px] lg:w-[280px]">
              <LaunchVisual />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full"><ReportingLeadForm /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
