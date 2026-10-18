"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowRight, Baby, Coffee, Gem, HeartPulse, Mountain, PawPrint, Shirt, Smartphone, Sofa, Sparkles, type LucideIcon } from "lucide-react";
import { industries, type Industry } from "@content/data";
import { cn } from "@/lib/cn";
import { AppLink } from "@/components/ui/AppLink";
import { IndustryArt } from "./IndustryArt";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<string, LucideIcon> = {
  shirt: Shirt, sparkles: Sparkles, "heart-pulse": HeartPulse, sofa: Sofa, smartphone: Smartphone,
  gem: Gem, coffee: Coffee, mountain: Mountain, "paw-print": PawPrint, baby: Baby,
};

const subscribeNoop = () => () => {};

function Detail({ it, dark }: { it: Industry; dark?: boolean }) {
  return (
    <>
      <p className={cn("text-[15px] leading-[1.6]", dark ? "text-white/80" : "text-ink-68")}>{it.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {it.focus.map((f) => (
          <li key={f} className={cn("rounded-full px-3 py-1 font-mono text-[11px] uppercase leading-[18px] tracking-[0.04em]", dark ? "bg-white/10 text-white/90 ring-1 ring-white/15" : "bg-accent-soft text-accent-strong")}>{f}</li>
        ))}
      </ul>
      <AppLink href={`/industries/${it.slug}`} className={cn("mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline", dark ? "text-white" : "text-accent-strong")}>
        Explore {it.label} SEO <ArrowRight aria-hidden className="size-4" />
      </AppLink>
    </>
  );
}

/** Explorer: pick a niche, the showcase panel swaps. Auto-advances until the visitor interacts. */
export function Industries() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const pick = (i: number, byUser = true) => { setActive(i); if (byUser) setManual(true); };

  return (
    <section aria-labelledby="industries-title" className="section-y-compact">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-[720px] text-center">
            <Eyebrow>Industries</Eyebrow>
            <h2 id="industries-title" className="h2 mt-4">Built for your niche</h2>
            <p className="lead mt-3">Every category searches differently. Pick yours to see how we approach it.</p>
          </div>

          <div
            className={cn("mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]", !hydrated && "ind-nojs")}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <ul className="ind-rows grid gap-1 rounded-xl border border-ink-05 bg-ink-02 p-1.5">
              {industries.map((it, i) => {
                const Icon = icons[it.icon] ?? Sparkles;
                const on = i === active;
                return (
                  <li key={it.slug}>
                    <h3>
                    {(() => {
                      const rowClass = cn("relative flex min-h-11 w-full items-center gap-3 overflow-hidden rounded-lg px-2.5 py-1.5 text-left transition-[background-color,box-shadow] duration-300", on ? "bg-white shadow-sm" : "hover:bg-white/60");
                      const row = (
                        <>
                          <span aria-hidden className={cn("grid size-8 shrink-0 place-items-center rounded-md transition-colors duration-300", on ? "bg-accent text-white" : "bg-white text-ink-68 shadow-[inset_0_0_0_1px_var(--ink-05)]")}>
                            <Icon className="size-4" />
                          </span>
                          <span className={cn("flex-1 font-display text-[15px] font-bold tracking-[-0.02em] transition-colors", on ? "text-ink" : "text-ink-68")}>{it.label}</span>
                          <span aria-hidden className="font-mono text-[11px] text-ink-68">{String(i + 1).padStart(2, "0")}</span>
                          {on && !manual && (
                            <span
                              key={active}
                              aria-hidden
                              className="ind-progress absolute inset-x-0 bottom-0 h-0.5 bg-accent"
                              style={{ animationPlayState: paused ? "paused" : "running" }}
                              onAnimationEnd={() => pick((active + 1) % industries.length, false)}
                            />
                          )}
                        </>
                      );
                      // Server HTML (and no-JS visitors) get focusable rows that swap the panel via CSS; once hydrated, rows become the interactive picker.
                      return hydrated ? (
                        <button type="button" aria-expanded={on} onClick={() => pick(i)} onMouseEnter={() => pick(i, false)} className={rowClass}>{row}</button>
                      ) : (
                        <a href={`#ind-${it.slug}`} className={rowClass}>{row}</a>
                      );
                    })()}
                    </h3>
                    {/* Mobile: detail expands inside the row */}
                    <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out lg:hidden", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                      <div className="overflow-hidden">
                        <div className="px-3 pb-3 pt-2" inert={!on}>
                          <Detail it={it} />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Desktop showcase panel */}
            <div aria-live={manual ? "polite" : "off"} className="relative hidden overflow-hidden rounded-xl bg-[var(--panel-navy)] p-8 text-white shadow-lg lg:block">
              <span aria-hidden className="dots-dark pointer-events-none absolute inset-0" />
              <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-64 rounded-full bg-accent opacity-40 blur-3xl" />
              <span aria-hidden className="pointer-events-none absolute -bottom-16 -left-10 size-56 rounded-full bg-[var(--yellow)] opacity-20 blur-3xl" />
              {(hydrated ? [active] : industries.map((_, i) => i)).map((i) => (
                <div key={i} className="ind-pane relative grid h-full items-center gap-6 xl:grid-cols-[minmax(0,1fr)_260px]">
                  <div key={active} className="ind-swap flex flex-col justify-center">
                    <p className="font-mono text-[11px] uppercase tracking-[0.04em] text-white/60">{String(i + 1).padStart(2, "0")} / {industries.length}</p>
                    <p className="mt-2 font-display text-3xl font-bold tracking-[-0.03em]">{industries[i].label}</p>
                    <div className="mt-4 max-w-[460px]"><Detail it={industries[i]} dark /></div>
                  </div>
                  <div key={`art-${active}`} className="ind-swap hidden xl:block"><div className="size-[260px]"><IndustryArt icon={industries[i].icon} /></div></div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
