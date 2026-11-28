import type { CSSProperties } from "react";
import Image from "next/image";
import type { PlatformPage, PlatformTone } from "@content/data";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { icons } from "./icons";

const tone: Record<PlatformTone, "success" | "warn" | "danger" | "neutral"> = { ok: "success", warn: "warn", bad: "danger", dim: "neutral" };

/** Hero visual: the platform artwork if it has one, otherwise a fictional audit of a store with a health score (examples, not data). */
export function PlatformHeroVisual({ page }: { page: PlatformPage }) {
  const Icon = icons[page.icon];
  const { art, audit, logo } = page;
  if (art) {
    return (
      <Reveal bare className="relative mx-auto w-full max-w-[560px] lg:mr-0">
        <span aria-hidden className="pointer-events-none absolute -right-10 -top-12 -z-10 size-64 rounded-full opacity-60 blur-3xl" style={{ background: `color-mix(in srgb, ${page.brand} 35%, transparent)` }} />
        <div className="relative pb-4">
          {/* Ground shadow: a soft wide ellipse with a tighter core, sitting just under the artwork. */}
          <span aria-hidden className="pointer-events-none absolute bottom-0 left-[18%] right-[14%] h-9 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--ink)_28%,transparent),transparent)]" />
          <span aria-hidden className="pointer-events-none absolute bottom-2 left-[30%] right-[26%] h-4 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--ink)_34%,transparent),transparent)]" />
          <Image src={art.src} alt={art.alt} width={art.w} height={art.h} sizes="(min-width: 640px) 560px, 100vw" loading="eager" fetchPriority="high" className="si relative block h-auto w-full" />
        </div>
      </Reveal>
    );
  }
  return (
    <Reveal bare className="relative mx-auto w-full max-w-[480px] lg:mr-0">
      <figure aria-label={`Illustration: a fictional SEO audit of a ${page.name} store`} className="relative" style={{ ["--brand" as string]: page.brand } as CSSProperties}>
        <span aria-hidden className="pointer-events-none absolute -right-10 -top-12 -z-10 size-64 rounded-full opacity-60 blur-3xl" style={{ background: "color-mix(in srgb, var(--brand) 35%, transparent)" }} />
        <div className="si overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-ink-10">
          <div className="flex items-center justify-between gap-3 border-b border-ink-05 px-4 py-2.5">
            <span className="flex items-center gap-2 font-display text-[13px] font-bold tracking-[-0.02em]">
              <Icon aria-hidden className="size-4 text-accent" />
              {audit.title}
            </span>
            <span className="font-mono text-[9px] uppercase text-ink-50">Example</span>
          </div>

          <div className="flex items-center gap-4 border-b border-ink-05 p-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-white shadow-md ring-1 ring-ink-05">
              {logo ? (
                <Image src={logo.src} alt="" width={logo.w} height={logo.h} unoptimized className={logo.w > 100 ? "h-auto w-[44px] object-contain" : "h-8 w-10 object-contain"} />
              ) : (
                <Icon aria-hidden className="size-7 text-ink" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-ink-68">SEO health after fixes</p>
              <div aria-hidden className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-05">
                <div className="grow-x h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--yellow))]" style={{ width: `${audit.score}%`, ["--d" as string]: "300ms" }} />
              </div>
            </div>
            <span className="font-display text-2xl font-bold tracking-[-0.03em]">{audit.score}</span>
          </div>

          <ul className="grid gap-1.5 p-4">
            {audit.rows.map(([check, status, t], i) => (
              <li key={check} className="si flex items-center justify-between gap-3 rounded-md bg-ink-02 px-3 py-2 shadow-[inset_0_0_0_1px_var(--ink-05)]" style={{ ["--d" as string]: `${160 + i * 90}ms` }}>
                <span className="truncate font-mono text-[11.5px] text-ink">{check}</span>
                <Tag tone={tone[t]}>{status}</Tag>
              </li>
            ))}
          </ul>
        </div>
        <div className="si ind-float absolute -bottom-3 right-0 z-20 flex items-center gap-2 rounded-lg bg-yellow px-3 py-2 shadow-md ring-1 ring-ink/10" style={{ ["--d" as string]: "620ms" }}>
          <Icon aria-hidden className="size-4 text-ink" />
          <span className="font-display text-sm font-bold tracking-[-0.02em]">{audit.chip}</span>
        </div>
        <figcaption className="sr-only">Example only: the checks, statuses and score shown are fictional and are not real results.</figcaption>
      </figure>
    </Reveal>
  );
}
