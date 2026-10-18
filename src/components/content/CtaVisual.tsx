import { Tag } from "@/components/ui/Tag";

const rows: Array<[string, string, "success" | "warn" | "danger" | "neutral"]> = [
  ["Buying guide", "Planned", "neutral"],
  ["Product comparison", "Drafting", "warn"],
  ["Sizing guide", "Published", "success"],
  ["Care instructions", "Published", "success"],
  ["Old blog post", "Refresh", "danger"],
];

/** Fictional checklist for the closing call to action (no numbers, no results). */
export function CtaVisual() {
  return (
    <div className="rounded-2xl bg-white p-5 text-ink shadow-lg ring-1 ring-white/10 sm:p-6" role="img" aria-label="Illustration of a content plan with example topics and their status">
      <div className="flex items-center justify-between"><span className="text-sm font-medium">Content plan</span><span className="font-mono text-[10px] uppercase text-ink-68">Example</span></div>
      <p className="mt-1 font-display text-2xl font-bold tracking-[-0.03em] sm:text-[28px]">What shoppers ask first</p>
      <ul className="mt-4 divide-y divide-ink-05 text-sm">
        {rows.map(([u, v, t]) => (
          <li key={u} className="flex items-center justify-between gap-3 py-2.5"><span className="truncate text-[13px] text-ink-68">{u}</span><Tag tone={t}>{v}</Tag></li>
        ))}
      </ul>
    </div>
  );
}
