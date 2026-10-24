import type { IndustryPage, MapStatus } from "@content/data";
import { icons } from "./icons";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

const tone: Record<MapStatus, "success" | "warn" | "danger"> = { Mapped: "success", Gap: "warn", Overlap: "danger" };

/** Hero visual: a fictional shopper-search map for the industry. Searches and statuses are examples, not data. */
export function IndustryHeroVisual({ page }: { page: IndustryPage }) {
  const Icon = icons[page.icon];
  const { groups } = page.map;
  return (
    <Reveal bare className="relative mx-auto w-full max-w-[480px] lg:mr-0">
      <figure aria-label={`Illustration: a fictional map of ${page.shoppers} searches matched to store pages`} className="relative">
        <div className="si overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-ink-10">
          <div className="flex items-center justify-between gap-3 border-b border-ink-05 px-4 py-2.5">
            <span className="flex items-center gap-2 font-display text-[13px] font-bold tracking-[-0.02em]">
              <Icon aria-hidden className="size-4 text-accent" />
              {page.map.title}
            </span>
            <span className="font-mono text-[9px] uppercase text-ink-50">Example</span>
          </div>
          <div className="grid gap-4 p-4">
            {groups.map((g, gi) => (
              <div key={g.label} className="si" style={{ ["--d" as string]: `${120 + gi * 120}ms` }}>
                <p className="flex items-center gap-2 text-[11px] font-medium text-ink-68">
                  <span aria-hidden className="grid size-6 place-items-center rounded-md bg-accent-soft text-accent-strong">{(() => { const G = icons[g.icon]; return <G className="size-3.5" />; })()}</span>
                  {g.label}
                </p>
                <ul className="mt-2 grid gap-1.5">
                  {g.rows.map(([q, s]) => (
                    <li key={q} className="flex items-center justify-between gap-3 rounded-md bg-ink-02 px-3 py-2 shadow-[inset_0_0_0_1px_var(--ink-05)]">
                      <span className="truncate text-[12px] text-ink">{q}</span>
                      <Tag tone={tone[s]}>{s}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className={cn("si ind-float absolute -bottom-3 right-0 z-20 flex items-center gap-2 rounded-lg bg-yellow px-3 py-2 shadow-md ring-1 ring-ink/10")} style={{ ["--d" as string]: "520ms" }}>
          <Icon aria-hidden className="size-4 text-ink" />
          <span className="font-display text-sm font-bold tracking-[-0.02em]">{page.map.chip}</span>
        </div>
        <figcaption className="sr-only">Example only: the searches and statuses shown are fictional and are not real results.</figcaption>
      </figure>
    </Reveal>
  );
}
