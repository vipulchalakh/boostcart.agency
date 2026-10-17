import { metrics, showMetrics } from "@content/data";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

/** Hidden entirely when `showMetrics` is false (owner has no verifiable numbers). */
export function MetricsStrip() {
  if (!showMetrics) return null;
  return (
    <section aria-label="BoostCart in numbers" className="section-y-compact">
      <div className="container-x">
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <div key={m.label} className={`px-4 text-center lg:px-8 ${i > 0 ? "lg:border-l lg:border-ink-05" : ""} ${i % 2 === 1 ? "max-lg:border-l max-lg:border-ink-05" : ""}`}>
                <dd className="font-display text-[clamp(2.25rem,1.6rem+2.6vw,3.5rem)] font-semibold leading-none tracking-[-0.03em]">
                  <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </dd>
                <dt className="mt-3 font-mono text-xs uppercase tracking-[0.04em] text-ink-68">{m.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
