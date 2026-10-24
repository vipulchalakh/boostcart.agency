"use client";

import { useEffect, useRef, useState } from "react";
import { industrySteps, type IndustryPage } from "@content/data";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { IndustryProcessScene } from "./IndustryProcessScenes";

/** Same dark backdrop as the closing call to action: navy, a fading dot grid and a soft pink glow. The panel stays put, only the card on top changes. */
function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("on-dark relative isolate overflow-hidden rounded-2xl bg-panel-navy shadow-lg ring-1 ring-ink-10", className)}>
      <div aria-hidden className="absolute inset-0 -z-10 [background:radial-gradient(rgb(255_255_255/.14)_1px,transparent_1.3px)_0_0/22px_22px] [mask-image:radial-gradient(ellipse_80%_90%_at_60%_50%,#000_25%,transparent_85%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(255_255_255/.04),transparent_35%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-16 top-1/2 -z-10 h-[420px] w-[460px] -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(223_55_167/.38),transparent)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -left-20 -top-24 -z-10 h-[300px] w-[360px] bg-[radial-gradient(closest-side,rgb(223_55_167/.18),transparent)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -top-24 right-[12%] -z-10 size-[380px] rounded-full bg-[radial-gradient(closest-side,rgb(249_249_6/.2),transparent)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 left-[8%] -z-10 size-[380px] rounded-full bg-[radial-gradient(closest-side,rgb(249_249_6/.15),transparent)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 left-[34%] -z-10 h-[300px] w-[420px] bg-[radial-gradient(closest-side,rgb(223_55_167/.34),transparent)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -left-10 top-[42%] -z-10 size-[260px] rounded-full bg-[radial-gradient(closest-side,rgb(223_55_167/.26),transparent)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-white/10" />
      <div className="relative size-full">{children}</div>
    </div>
  );
}

const chips = (outputs: string[]) => (
  <ul className="mt-4 flex flex-wrap gap-2">
    {outputs.map((o) => <li key={o} className="rounded-full bg-accent-soft px-3 py-1 text-[13px] font-medium text-accent-strong">{o}</li>)}
  </ul>
);

/** Six-step process. Desktop: pinned, scroll-driven (visual left, step cards right). Mobile: stacked cards. */
export function IndustryProcess({ page }: { page: IndustryPage }) {
  const steps = industrySteps(page);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      if (span <= 0) return;
      setActive(Math.floor(Math.min(Math.max(-r.top / span, 0), 0.9999) * steps.length));
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
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + (span * (i + 0.5)) / steps.length, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="process-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[960px] text-center">
          <Eyebrow>Our process</Eyebrow>
          <h2 id="process-title" className="h2 mt-4">From first audit to monthly report</h2>
          <p className="lead mx-auto mt-4 max-w-[760px]">Six steps, in order. Timing depends on your catalogue and platform, and we agree it up front.</p>
        </Reveal>

        {/* Mobile and tablet: each step as a card with its visual */}
        <ol className="pp-mobile mt-10 grid gap-5 lg:hidden">
          {steps.map((s, i) => (
            <li key={s.id} className="overflow-hidden rounded-2xl border border-ink-05 bg-white shadow-xs">
              <Panel className="h-[360px] rounded-none ring-0"><IndustryProcessScene page={page} id={s.id} /></Panel>
              <div className="p-5">
                <p className="font-mono text-xs uppercase tracking-[0.04em] text-accent-strong">Step {i + 1} of {steps.length}</p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-2 font-medium text-ink">{s.short}</p>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink-68">{s.description}</p>
                {chips(s.outputs)}
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop: pinned and scroll-driven */}
        <div ref={track} className="pp-desktop relative mt-12 hidden lg:block" style={{ height: `${steps.length * 55}vh` }}>
          <div className="sticky top-28 grid grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-10 xl:gap-16" style={{ height: "min(660px, calc(100vh - 8rem))" }}>
            <Panel className="h-full"><IndustryProcessScene page={page} key={steps[active].id} id={steps[active].id} /></Panel>

            <div className="relative flex min-h-0 items-center">
              <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-ink-10">
                <span className="block w-full origin-top bg-accent transition-transform duration-500 ease-[var(--ease-out-quart)]" style={{ height: "100%", transform: `scaleY(${(active + 1) / steps.length})` }} />
              </span>
              <ol className="grid w-full gap-1 pl-8">
                {steps.map((s, i) => {
                  const on = active === i;
                  return (
                    <li key={s.id}>
                      <div className={cn("rounded-xl px-5 transition-[background-color,box-shadow,padding] duration-300", on ? "bg-white py-5 shadow-md ring-1 ring-ink-05" : "py-2.5")}>
                        {/* A div, not a heading: the mobile cards above already carry each step title as an h3, and both sets are in the page. */}
                        <div>
                          <button type="button" onClick={() => goTo(i)} aria-current={on ? "step" : undefined} className="flex w-full items-center gap-3 text-left">
                            <span className={cn("font-mono text-xs tracking-[0.04em] transition-colors duration-300", on ? "text-accent-strong" : "text-ink-50")}>0{i + 1}</span>
                            <span className={cn("font-display font-bold tracking-[-0.02em] transition-[color,font-size] duration-300", on ? "text-xl text-ink" : "text-lg text-ink-50 hover:text-ink")}>{s.title}</span>
                          </button>
                        </div>
                        <div className={cn("grid transition-[grid-template-rows,opacity] duration-300 ease-out", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                          <div className="overflow-hidden" inert={!on}>
                            <p className="mt-3 font-medium text-ink">{s.short}</p>
                            <p className="mt-2 text-[15px] leading-[1.6] text-ink-68">{s.description}</p>
                            {chips(s.outputs)}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
