import type { ReactNode } from "react";
import { Check } from "lucide-react";
import type { ProcessStep } from "@content/data";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  steps: ProcessStep[];
  eyebrow: string;
  title: string;
  lead: string;
  /** Animated illustration for a step. */
  visual: (step: ProcessStep, index: number) => ReactNode;
};

/**
 * Stacked step cards: each card sticks near the top of the viewport and the next one slides up over it
 * (pure CSS `position: sticky`, so it needs no scroll listeners and every step stays in the server HTML).
 */
export function ProcessStack({
  steps,
  eyebrow,
  title,
  lead,
  visual,
}: Props) {
  return (
    <section aria-labelledby="process-title" className="bg-ink-02 py-[var(--section-y)]">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="process-title" className="h2 mt-4">{title}</h2>
          <p className="lead mt-4">{lead}</p>
        </Reveal>

        <ol className="mt-12 [--stack-top:5.5rem] lg:[--stack-top:7rem]">
          {steps.map((s, i) => {
            const bullets = s.points ?? s.outputs;
            const last = i === steps.length - 1;
            return (
              <li
                key={s.id}
                id={`step-${s.id}`}
                className={cn("lg:sticky lg:top-[var(--top)]", !last && "mb-6 lg:mb-[14vh]")}
                style={{ ["--top" as string]: `calc(var(--stack-top) + ${i * 14}px)`, zIndex: i + 1 }}
              >
                <article className="grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-2xl border border-ink-05 bg-white shadow-lg lg:h-[520px] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-1">
                  <div className="relative flex flex-col justify-center overflow-hidden p-6 sm:p-8 lg:p-10 lg:pr-8">
                    <span aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-[var(--yellow)] opacity-40 blur-3xl" />
                    <span aria-hidden className="pointer-events-none absolute right-6 top-4 select-none font-display text-[88px] font-bold leading-none tracking-[-0.06em] text-ink-05 lg:right-8 lg:top-6 lg:text-[120px]">0{i + 1}</span>
                    <p className="relative font-mono text-xs uppercase tracking-[0.04em] text-accent-strong">Step {i + 1} of {steps.length}</p>
                    <h3 className="relative mt-3 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] lg:text-4xl">{s.title}</h3>
                    <p className="lead relative mt-3 !text-lg lg:!text-xl">{s.short}</p>
                    <p className="relative mt-3 text-[15px] leading-[1.6] text-ink-68">{s.description}</p>
                    <ul className="relative mt-5 grid gap-2">
                      {bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[15px] leading-[1.45] text-ink">
                          <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong">
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative m-3 lg:ml-0">{visual(s, i)}</div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
