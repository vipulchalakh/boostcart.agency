import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import type { PlatformPage } from "@content/data";
import { AppLink } from "@/components/ui/AppLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PlatformCarousel } from "./PlatformCarousel";
import { areaIcons } from "./icons";

/** Centred header, then a swipeable row of cards: each platform area we work on, what we do there and what we check. */
export function PlatformAreas({ page }: { page: PlatformPage }) {
  return (
    <section aria-labelledby="areas-title" className="section-y overflow-hidden">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[960px] text-center">
          <Eyebrow>{page.name === "Headless" ? "Headless SEO" : `${page.name} SEO`}</Eyebrow>
          <h2 id="areas-title" className="h2 mt-4">{page.areas.title}</h2>
          <p className="lead mx-auto mt-4 max-w-[760px]">{page.areas.lead}</p>
        </Reveal>

        <div className="mt-12">
          <PlatformCarousel label={page.areas.title}>
            {page.areas.items.map((a, i) => {
              const Icon = areaIcons[a.icon];
              return (
                <li key={a.title} className="w-[82%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  <article className="group spotlight lift relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-xl border border-ink-05 bg-white p-6 shadow-xs sm:p-7" style={{ ["--brand" as string]: page.brand } as CSSProperties}>
                    <span aria-hidden className="pointer-events-none absolute -right-16 -top-20 size-60 rounded-full opacity-40 blur-3xl transition-opacity duration-[var(--dur-med)] group-hover:opacity-80" style={{ background: `color-mix(in srgb, var(${i % 2 ? "--accent" : "--brand"}) 30%, transparent)` }} />
                    <span aria-hidden className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-[96px] font-bold leading-none tracking-[-0.06em] text-ink-05">0{i + 1}</span>
                    <span className="relative grid size-16 place-items-center rounded-2xl bg-white shadow-md ring-1 ring-ink-05 transition-transform duration-[var(--dur-med)] ease-[var(--ease-out-quart)] group-hover:-translate-y-1">
                      <Icon aria-hidden className="size-7 text-accent-strong" strokeWidth={1.75} />
                    </span>
                    <h3 className="relative mt-auto pt-8 font-display text-2xl font-bold tracking-[-0.03em]">{a.title}</h3>
                    <p className="relative mt-3 text-[15px] leading-[1.6] text-ink-68">{a.text}</p>
                    <p className="relative mt-6 font-mono text-[11px] uppercase tracking-[0.04em] text-ink-50">What we check</p>
                    <ul className="relative mt-2 flex flex-wrap gap-1.5">
                      {a.checks.map((c) => <li key={c} className="rounded-full bg-ink-02 px-2.5 py-1 text-xs text-ink-68 shadow-[inset_0_0_0_1px_var(--ink-05)]">{c}</li>)}
                    </ul>
                  </article>
                </li>
              );
            })}
          </PlatformCarousel>
        </div>

        <p className="mt-6 text-center">
          <AppLink href="/free-audit" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong underline-offset-4 hover:underline">
            Check my {page.name === "Headless" ? "storefront" : `${page.name} store`} <ArrowRight aria-hidden className="size-3.5" />
          </AppLink>
        </p>
      </div>
    </section>
  );
}
