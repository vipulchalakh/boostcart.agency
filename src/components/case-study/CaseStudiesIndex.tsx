"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { CaseStudyCard, type CaseStudyCardData } from "./CaseStudyCard";

const PAGE_SIZE = 9;

/** Platform filter and case study grid. Filtering is instant (all case studies are already on the page). */
export function CaseStudiesIndex({ studies }: { studies: CaseStudyCardData[] }) {
  const [platform, setPlatform] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  /* Grouped case-insensitively so "shopify" and "Shopify" share one chip. */
  const platforms = useMemo(() => {
    const groups = new Map<string, { key: string; label: string; count: number }>();
    for (const s of studies) {
      if (!s.platform) continue;
      const key = s.platform.toLowerCase();
      const g = groups.get(key);
      if (g) {
        g.count += 1;
        if (/^[A-Z]/.test(s.platform) && !/^[A-Z]/.test(g.label)) g.label = s.platform;
      }
      else groups.set(key, { key, label: s.platform, count: 1 });
    }
    return [...groups.values()].sort((a, b) => a.label.localeCompare(b.label));
  }, [studies]);

  const filtered = platform === "all" ? studies : studies.filter((s) => s.platform?.toLowerCase() === platform);
  const shown = filtered.slice(0, visible);

  function pick(key: string) {
    setPlatform(key);
    setVisible(PAGE_SIZE);
  }

  if (!studies.length) {
    return (
      <div className="rounded-2xl border border-dashed border-ink-20 bg-ink-02 px-6 py-20 text-center">
        <p className="font-display text-2xl font-bold text-ink">Case studies are on the way</p>
        <p className="mt-2 text-ink-68">We&rsquo;re putting together our first client results. Check back soon.</p>
      </div>
    );
  }

  return (
    <div>
      {platforms.length > 1 && (
        <div role="group" aria-label="Filter by platform" className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {[{ key: "all", label: "All", count: studies.length }, ...platforms].map((p) => {
            const active = p.key === platform;
            return (
              <button
                key={p.key}
                type="button"
                aria-pressed={active}
                onClick={() => pick(p.key)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,color,border-color] duration-200 ease-[var(--ease-ui)]",
                  active ? "border-ink bg-ink text-white" : "border-ink-10 bg-white text-ink-68 hover:border-ink-32 hover:text-ink",
                )}
              >
                {p.label}
                <span className={cn("font-mono text-xs", active ? "text-white/60" : "text-ink-32")}>{p.count}</span>
              </button>
            );
          })}
        </div>
      )}

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <li key={s._id}>
            <CaseStudyCard study={s} />
          </li>
        ))}
      </ul>

      {filtered.length > visible && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <Button variant="secondary" size="lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more case studies
          </Button>
          <p className="text-sm text-ink-50" aria-live="polite">
            Showing {shown.length} of {filtered.length}
          </p>
        </div>
      )}
    </div>
  );
}
