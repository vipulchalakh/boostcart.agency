import { Check, FileSearch, FileText, LayoutTemplate, Map, RefreshCw, ShieldCheck } from "lucide-react";
import { homeProcessSteps as STEPS } from "@content/data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/** One icon per step, in step order. */
const ICONS = [FileSearch, Map, ShieldCheck, LayoutTemplate, FileText, RefreshCw];

/** Homepage "How we work": six steps in a 3×2 grid, each card carrying an oversized faded number cut off by its corner. */
export function HomeProcess() {
  return (
    <section aria-labelledby="process-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Eyebrow>How we work</Eyebrow>
          <h2 id="process-title" className="h2 mt-4">From audit to compounding growth</h2>
          <p className="lead mt-4">Six steps that turn organic demand into orders, then feed every result back into the next cycle.</p>
        </Reveal>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((st, i) => {
            const Icon = ICONS[i];
            return (
              <li key={st.name}>
                <Reveal delay={(i % 3) * 80} className="flex h-full flex-col">
                  <div className="group relative isolate flex flex-1 flex-col overflow-hidden rounded-[var(--r-xl)] border border-ink-10 bg-white p-6 transition-shadow duration-[var(--dur-med)] hover:shadow-lg motion-reduce:transition-none sm:p-7">
                    {/* Decorative: the ordered list already gives each step its number. */}
                    {/* Colour drop behind the number, alternating pink and yellow like the service cards. */}
                    <span aria-hidden className={cn("pointer-events-none absolute -right-24 -top-28 -z-20 size-[320px] blur-2xl", i % 2 === 0 ? "bg-[radial-gradient(closest-side,rgb(223_55_167/.15),transparent)]" : "bg-[radial-gradient(closest-side,rgb(249_249_6/.16),transparent)]")} />
                    <span aria-hidden className="pointer-events-none absolute -right-4 -top-9 -z-10 select-none bg-[linear-gradient(200deg,rgb(223_55_167/.3)_15%,rgb(223_55_167/.11)_50%,rgb(240_200_20/.06)_85%)] bg-clip-text pl-6 font-display text-[220px] font-bold leading-[0.85] tracking-[-0.08em] text-transparent transition-transform duration-[var(--dur-med)] ease-[var(--ease-out-quart)] group-hover:-translate-x-1.5 group-hover:translate-y-1.5 motion-reduce:transition-none">
                      {i + 1}
                    </span>
                    <span aria-hidden className="grid size-12 place-items-center rounded-[var(--r-lg)] bg-white text-ink-68 shadow-[inset_0_0_0_1px_var(--ink-05),0_1px_3px_rgb(0_0_0/.05)]">
                      <Icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-bold tracking-[-0.02em]">{st.name}</h3>
                    <p className="mt-2 text-sm leading-[21px] text-ink-68">{st.tagline}</p>
                    <ul className="mt-auto flex flex-col gap-2.5 pt-5">
                      {st.outputs.map((o) => (
                        <li key={o} className="flex items-start gap-2.5 text-sm leading-[21px] text-ink">
                          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-strong" strokeWidth={2.5} />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
