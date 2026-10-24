"use client";

import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { industryWhy, type IndustryPage } from "@content/data";
import { AppLink } from "@/components/ui/AppLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const subscribe = () => () => {};

const arrow = "grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-[background-color,opacity,transform] duration-200 hover:bg-white/20 disabled:pointer-events-none disabled:opacity-30 active:scale-95 motion-reduce:transform-none";

/** Dark "Why BoostCart" panel: an expanding list of reasons on the left, a centred card carousel for the chosen reason on the right. */
export function IndustryWhy({ page }: { page: IndustryPage }) {
  const petWhy = industryWhy(page.noun, page.shoppers);
  /** False in the server HTML and with scripts off, so every card and answer stays readable and in the accessibility tree there. */
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  /** One continuous row of every card, grouped by reason. `pos` is the centred card; the reason is whichever group it belongs to. */
  const cards = petWhy.flatMap((w) => w.cards.map((c) => ({ ...c, group: w.tab, image: w.image })));
  const per = petWhy[0].cards.length;
  const n = cards.length;
  const [nav, setNav] = useState({ pos: 0, prev: 0 });
  const { pos, prev } = nav;
  const go = (next: number) => setNav((s) => ({ pos: ((next % n) + n) % n, prev: s.pos }));
  const tab = Math.floor(pos / per);
  const slide = pos % per;
  const pick = (i: number) => go(i * per);
  /** Signed distance from the centre, wrapped so the row loops: the last card sits left of the first. */
  const half = n / 2;
  const offset = (ci: number, at: number) => ((((ci - at + half) % n) + n) % n) - half;

  return (
    <section id="why-boostcart" aria-labelledby="why-title" className="px-2 py-2">
      <div className="on-dark relative isolate overflow-hidden rounded-panel bg-panel-dark px-5 py-[calc(var(--section-y)*1.5)] text-white md:px-10 lg:px-16">
        <div aria-hidden className="dots-dark absolute inset-0 -z-10" />
        <div aria-hidden className="absolute left-1/2 top-[60%] -z-10 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(223_55_167/.28),transparent)]" />

        <Reveal className="mx-auto max-w-[960px] text-center">
          <Eyebrow>Why BoostCart</Eyebrow>
          <h2 id="why-title" className="h2 mt-4 text-white">Why {page.noun}s choose a specialist</h2>
          <p className="lead mx-auto mt-4 max-w-[760px]">Four things you can expect from every store we work with.</p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[1240px] grid-cols-[minmax(0,1fr)] items-center gap-y-8 lg:mt-16 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-x-14 lg:gap-y-6">
          {/* Left: expanding list */}
          <ul className="pw-list grid gap-2.5 lg:col-start-1 lg:row-start-1" aria-label="Reasons to choose BoostCart">
            {petWhy.map((w, i) => {
              const on = tab === i;
              return (
                <li key={w.id}>
                  <div className={cn("pw-item rounded-2xl transition-[background-color,box-shadow,border-color] duration-300", on ? "bg-white text-ink shadow-lg" : "border border-white/15 bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.08]")}>
                    <h3>
                      <button type="button" aria-expanded={ready ? on : undefined} onClick={() => pick(i)} className="pw-btn flex min-h-14 w-full items-center gap-3 px-5 py-3 text-left">
                        <span aria-hidden className={cn("pw-plus grid size-6 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-300", on ? "rotate-45 bg-accent text-white" : "bg-white/10 text-white")}>
                          <Plus className="size-3.5" strokeWidth={2.5} />
                        </span>
                        <span className={cn("pw-title font-display text-base font-bold tracking-[-0.02em] sm:text-lg", on ? "text-ink" : "text-white")}>{w.tab}</span>
                      </button>
                    </h3>
                    <div className={cn("pw-body grid transition-[grid-template-rows,opacity] duration-300 ease-out", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <div className="overflow-hidden" inert={ready ? !on : undefined}>
                        <p className="px-5 pb-1 font-display text-xl font-bold leading-[1.2] tracking-[-0.03em]">{w.title}</p>
                        <p className="px-5 pb-5 pt-1.5 text-[15px] leading-[1.55] text-ink-68">{w.text}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Right: one track holding every card, so choosing a reason slides across to its cards */}
          <div className="contents" role="group" aria-roledescription="carousel" aria-label="Why BoostCart highlights">
            <div className="pw-view relative h-[450px] overflow-hidden lg:col-start-2 lg:row-start-1 [mask-image:linear-gradient(90deg,transparent,#000_14%,#000_86%,transparent)] [--cw:min(290px,72vw)] [--gap:20px] sm:h-[430px] sm:[--cw:300px]">
              <ul className="pw-cards absolute inset-0">
                {cards.map((c, ci) => {
                  const off = offset(ci, pos);
                  const on = off === 0;
                  const near = Math.abs(off) === 1;
                  /* A card that wrapped round the loop jumps while it is out of sight, instead of sweeping across. */
                  const wrapped = Math.abs(off - offset(ci, prev)) > half;
                  return (
                    <li
                      key={c.title}
                      aria-hidden={ready ? !on : undefined}
                      aria-label={`${ci + 1} of ${n}`}
                      className={cn("pw-card absolute left-1/2 top-0 h-full w-[var(--cw)] ease-[var(--ease-out-quart)] motion-reduce:transition-none", wrapped ? "transition-none" : "transition-[transform,opacity,filter] duration-[700ms]", !on && !near && "pointer-events-none", near && "cursor-pointer")}
                      style={{
                        transform: `translateX(calc(var(--cw) / -2 + ${off} * (var(--cw) + var(--gap)))) scale(${on ? 1 : 0.93})`,
                        opacity: on ? 1 : near ? 0.4 : 0,
                        filter: on ? "none" : "blur(2px)",
                        zIndex: on ? 2 : 1,
                      }}
                      onClick={() => near && go(ci)}
                    >
                      <article className="flex h-full flex-col rounded-2xl bg-white p-3 text-ink shadow-lg">
                        <div className="relative h-[190px] overflow-hidden rounded-xl bg-panel-dark sm:h-[210px]">
                          {/* Already web-sized (about 58 KB), so served as is. */}
                          <Image src={c.image} alt="" fill sizes="300px" unoptimized className="object-cover" />
                          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
                          <span className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-full bg-white/85 px-3 py-2 text-[12px] font-medium text-ink shadow-md backdrop-blur-md">
                            <span aria-hidden className="size-2 shrink-0 rounded-full bg-success-dot" />
                            <span className="truncate">{c.chip}</span>
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-strong">{c.group}</p>
                          <p className="mt-1 font-display text-xl font-bold tracking-[-0.03em]">{c.title}</p>
                          <p className="mt-1.5 text-sm leading-[21px] text-ink-68">{c.text}</p>
                          <div className="mt-auto pt-4" inert={ready ? !on : undefined}>
                            <AppLink href="/free-audit" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-1 text-sm font-medium leading-[21px] text-ink transition-colors [box-shadow:var(--ring-inset)] hover:bg-ink-05">
                              Get a free audit <ArrowRight aria-hidden className="size-3.5 shrink-0" />
                            </AppLink>
                          </div>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pw-controls flex items-center justify-center gap-4 lg:col-start-2 lg:row-start-2">
              <button type="button" aria-label="Previous card" onClick={() => go(pos - 1)} className={arrow}><ChevronLeft aria-hidden className="size-5" /></button>
              <div className="flex items-center gap-2" role="tablist" aria-label={`${petWhy[tab].tab} cards`}>
                {petWhy[tab].cards.map((c, ci) => (
                  <button key={c.title} type="button" role="tab" aria-selected={slide === ci} aria-label={`Show ${c.title}`} onClick={() => go(tab * per + ci)} className={cn("h-2 rounded-full transition-[width,background-color] duration-300", slide === ci ? "w-6 bg-accent" : "w-2 bg-white/30 hover:bg-white/50")} />
                ))}
              </div>
              <button type="button" aria-label="Next card" onClick={() => go(pos + 1)} className={arrow}><ChevronRight aria-hidden className="size-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
