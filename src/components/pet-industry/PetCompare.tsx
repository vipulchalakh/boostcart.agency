import { Check, X } from "lucide-react";
import { petCompare } from "@content/data";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";

const { common, boost } = petCompare;

/** Two-card comparison: typical SEO agencies versus BoostCart for pet brands. */
export function PetCompare() {
  return (
    <section aria-labelledby="compare-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[960px] text-center">
          <Eyebrow>How we compare</Eyebrow>
          <h2 id="compare-title" className="h2 mt-4">Other agencies vs. BoostCart</h2>
          <p className="lead mx-auto mt-4 max-w-[760px]">A generalist playbook treats a pet store like any other. Here is how a specialist approach differs.</p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-[1020px] grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2 lg:mt-20">
          <Reveal className="rounded-[24px] border border-ink-05 bg-ink-02 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold tracking-[-0.03em] text-ink-68">{common.title}</h3>
                <p className="mt-1 text-sm text-ink-50">{common.sub}</p>
              </div>
              <span className="shrink-0 rounded-xs bg-ink-05 px-2 py-0.5 font-mono text-[11px] font-medium uppercase leading-[18px] tracking-[0.04em] text-ink-68">Common</span>
            </div>
            <ul className="mt-6 grid gap-3.5">
              {common.items.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15px] leading-[22px] text-ink-68">
                  <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-danger-bg text-danger-fg"><X className="size-3" strokeWidth={3} /></span>
                  <span className="sr-only">Not included: </span>{t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80} className="relative isolate overflow-hidden rounded-[24px] border border-accent bg-white p-6 shadow-[0_0_0_1px_var(--accent),0_32px_64px_-28px_rgb(223_55_167/.4)] sm:p-8">
            <span aria-hidden className="dots pointer-events-none absolute inset-0 -z-10 opacity-50" />
            <span aria-hidden className="pointer-events-none absolute -left-24 -top-24 -z-10 size-[380px] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--yellow)_34%,transparent),transparent)]" />
            <span aria-hidden className="pointer-events-none absolute -bottom-28 -right-20 -z-10 size-[380px] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_16%,transparent),transparent)]" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <LogoMark size={28} />
                  <h3 className="font-display text-xl font-bold tracking-[-0.03em]">{boost.title}</h3>
                </div>
                <p className="mt-1 text-sm text-ink-68">{boost.sub}</p>
              </div>
              <Tag tone="accent" className="shrink-0">Best fit</Tag>
            </div>
            <ul className="mt-6 grid gap-3.5">
              {boost.items.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15px] font-medium leading-[22px] text-ink">
                  <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-success-dot text-white"><Check className="size-3" strokeWidth={3} /></span>
                  <span className="sr-only">Included: </span>{t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/free-audit" arrow>Get a pet store review</Button>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 text-center">
          <p className="mx-auto max-w-[560px] text-sm text-ink-68">Based on typical generalist SEO agencies. Every business is different, and the review shows what fits yours.</p>
        </Reveal>
      </div>
    </section>
  );
}
