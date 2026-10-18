"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { processSteps as homeSteps, type ProcessStep } from "@content/data";
import { ProcessWorkflow } from "./ProcessWorkflow";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const subscribeNoop = () => () => {};

type Props = { steps?: ProcessStep[]; eyebrow?: string; title?: string; lead?: string };

export function Process({
  steps = homeSteps,
  eyebrow = "How we work",
  title = "From audit to compounding growth",
  lead = "Eight steps built for online stores, one clear owner for each, and a report you’ll actually read.",
}: Props = {}) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      if (span <= 0) return;
      const p = Math.min(Math.max(-r.top / span, 0), 0.9999);
      setActive(Math.floor(p * steps.length));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [steps.length]);

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + (span * (i + 0.5)) / steps.length });
  };

  const [open, setOpen] = useState(0);

  const scene = (i: number, h: string) => (
    <div className={h}>
      <ProcessWorkflow step={steps[i]} />
    </div>
  );

  return (
    <section aria-labelledby="process-title" className="bg-ink-02 py-[var(--section-y)]">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="process-title" className="h2 mt-4">{title}</h2>
          <p className="lead mt-4">{lead}</p>
        </Reveal>

        {/* Mobile / tablet: tap-to-open accordion */}
        <ol className="mt-10 grid gap-2 lg:hidden">
          {steps.map((s, i) => {
            const on = open === i;
            return (
              <li key={s.id} className="rounded-xl border border-ink-05 bg-white">
                <h3>
                  <button type="button" aria-expanded={on} onClick={() => setOpen(i)} className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left">
                    <span className={cn("font-mono text-xs uppercase tracking-[0.04em]", on ? "text-accent-strong" : "text-ink-68")}>0{i + 1}</span>
                    <span className={cn("font-display text-lg font-bold tracking-[-0.02em]", on ? "text-ink" : "text-ink-68")}>{s.title}</span>
                  </button>
                </h3>
                <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4" inert={!on}>
                      <p className="font-medium text-ink">{s.short}</p>
                      <div className="mt-4">{on && scene(i, "h-[440px]")}</div>
                      <p className="mt-4 text-ink-68">{s.description}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {s.outputs.map((o) => (
                          <li key={o} className="rounded-full bg-accent-soft px-3 py-1 text-[13px] font-medium text-accent-strong">{o}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Desktop: pinned, scroll-driven. One progress rail plus one stage card, so the height never changes. */}
        <div ref={track} className="relative mt-12 hidden lg:block" style={{ height: `${steps.length * 45}vh` }}>
          <div className={cn("sticky top-28 flex flex-col gap-6", !hydrated && "proc-nojs")} style={{ height: "min(560px, calc(100vh - 8rem))" }}>
            <ol className="proc-rail relative grid shrink-0" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
              <span aria-hidden className="absolute top-[15px] h-0.5 rounded-full bg-ink-10" style={{ left: `${50 / steps.length}%`, right: `${50 / steps.length}%` }}>
                <span className="block h-full origin-left rounded-full bg-accent transition-transform duration-500 ease-[var(--ease-out-quart)]" style={{ transform: `scaleX(${active / (steps.length - 1)})` }} />
              </span>
              {steps.map((s, i) => {
                const on = active === i;
                const done = active > i;
                return (
                  <li key={s.id} className="relative">
                    {hydrated ? (
                      <button type="button" onClick={() => goTo(i)} aria-current={on ? "step" : undefined} className="group flex w-full flex-col items-center gap-2 rounded-md px-1 text-center">
                      <span className={cn("relative grid size-8 place-items-center rounded-full border-2 font-mono text-xs font-medium transition-[background-color,border-color,color,box-shadow] duration-300", on ? "border-accent bg-accent text-white shadow-[0_0_0_6px_rgb(223_55_167/.18)]" : done ? "border-accent bg-white text-accent-strong" : "border-ink-10 bg-white text-ink-50 group-hover:border-ink-32")}>
                        {done ? <Check aria-hidden className="size-4" /> : i + 1}
                      </span>
                      <span className={cn("text-[13px] font-medium leading-[1.25] transition-colors duration-300", on ? "text-ink" : "text-ink-68 group-hover:text-ink")}>{s.title}</span>
                    </button>
                    ) : (
                      // No-JS: focusable step that swaps the stage card via CSS.
                      <a href={`#step-${s.id}`} aria-current={on ? "step" : undefined} className="group flex w-full flex-col items-center gap-2 rounded-md px-1 text-center">
                      <span className={cn("relative grid size-8 place-items-center rounded-full border-2 font-mono text-xs font-medium transition-[background-color,border-color,color,box-shadow] duration-300", on ? "border-accent bg-accent text-white shadow-[0_0_0_6px_rgb(223_55_167/.18)]" : done ? "border-accent bg-white text-accent-strong" : "border-ink-10 bg-white text-ink-50 group-hover:border-ink-32")}>
                        {done ? <Check aria-hidden className="size-4" /> : i + 1}
                      </span>
                      <span className={cn("text-[13px] font-medium leading-[1.25] transition-colors duration-300", on ? "text-ink" : "text-ink-68 group-hover:text-ink")}>{s.title}</span>
                    </a>
                    )}
                  </li>
                );
              })}
            </ol>

            <div aria-live="polite" className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-ink-05 bg-white shadow-lg">
              {(hydrated ? [active] : steps.map((_, i) => i)).map((i) => (
                <div key={steps[i].id} className="proc-pane ind-swap grid h-full grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                  <div className="relative flex flex-col justify-center overflow-hidden p-10 pr-8">
                    <span aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-[var(--yellow)] opacity-45 blur-3xl" />
                    <span aria-hidden className="dots pointer-events-none absolute bottom-0 left-0 h-52 w-80 opacity-80 [mask-image:radial-gradient(ellipse_at_bottom_left,#000_15%,transparent_70%)]" />
                    <span aria-hidden className="pointer-events-none absolute right-8 top-6 select-none font-display text-[120px] font-bold leading-none tracking-[-0.06em] text-ink-05">0{i + 1}</span>
                    <p className="relative font-mono text-xs uppercase tracking-[0.04em] text-accent-strong">Step {i + 1} of {steps.length}</p>
                    <h3 className="relative mt-3 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em]">{steps[i].title}</h3>
                    <p className="lead relative mt-3 text-xl">{steps[i].short}</p>
                    <p className="relative mt-4 text-base leading-[1.6] text-ink-68">{steps[i].description}</p>
                    <p className="relative mt-5 font-mono text-[11px] uppercase tracking-[0.04em] text-ink-68">You get</p>
                    <ul className="relative mt-2 flex flex-wrap gap-2">
                      {steps[i].outputs.map((o) => (
                        <li key={o} className="rounded-full bg-accent-soft px-3 py-1 text-[13px] font-medium text-accent-strong">{o}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative m-3 ml-0"><ProcessWorkflow step={steps[i]} /></div>
                </div>
              ))}
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-ink-05">
                <span className="block h-full origin-left bg-accent transition-transform duration-500 ease-[var(--ease-out-quart)]" style={{ transform: `scaleX(${(active + 1) / steps.length})` }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
