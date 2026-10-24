import { petProblems } from "@content/data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** Six problem cards in a 3 x 2 grid: owner-voice headline, explanation, then what the problem costs. */
export function PetProblems() {
  return (
    <section aria-labelledby="problems-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[960px] text-center">
          <Eyebrow>Problems we solve</Eyebrow>
          <h2 id="problems-title" className="h2 mt-4">Why pet stores stall in organic search</h2>
          <p className="lead mx-auto mt-4 max-w-[760px]">Six problems we see in pet catalogues, and what each one costs.</p>
        </Reveal>

        <ol className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {petProblems.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 80}>
              <article className="group spotlight lift relative isolate flex h-full flex-col overflow-hidden rounded-xl border border-ink-05 bg-white p-6 shadow-xs sm:p-7">
                <span aria-hidden className="pointer-events-none absolute -right-14 -top-20 -z-10 size-64 opacity-60 transition-opacity duration-[var(--dur-med)] group-hover:opacity-100" style={{ background: `radial-gradient(closest-side, color-mix(in srgb, var(${i % 2 ? "--accent" : "--yellow"}) ${i % 2 ? 16 : 30}%, transparent), transparent)` }} />
                <span aria-hidden className="pointer-events-none absolute -right-1 -top-3 -z-10 select-none font-display text-[96px] font-bold leading-none tracking-[-0.06em] text-ink-05 sm:text-[112px]">0{i + 1}</span>
                <h3 className="max-w-[16ch] font-display text-xl font-bold leading-[1.2] tracking-[-0.03em] sm:text-2xl">{p.title}</h3>
                <p className="mt-4 flex-1 text-[15px] leading-[1.6] text-ink-68">{p.text}</p>
                <p className="mt-6 border-t border-dashed border-ink-10 pt-5 font-mono text-xs uppercase leading-5 tracking-[0.04em] text-ink-68">
                  <span className="font-medium text-danger-fg">What it costs: </span>{p.cost}
                </p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
