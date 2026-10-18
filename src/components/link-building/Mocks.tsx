import { ArrowRight, Check, Mail } from "lucide-react";
import { Tag } from "@/components/ui/Tag";

const shell = "rounded-t-lg border border-b-0 border-ink-05 bg-ink-02 p-4 shadow-xs";
const note = "font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68";
const box = "shadow-[inset_0_0_0_1px_var(--ink-05)]";

/** 1 — Link profile review: sources by relevance. */
export function ProfileMock() {
  const rows: Array<[string, string, "success" | "warn" | "danger"]> = [["Gear review site", "Relevant", "success"], ["General directory", "Low value", "warn"], ["Unknown network", "Risky", "danger"]];
  return (
    <div className={shell}>
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-2">
        {rows.map(([u, s, t], i) => (
          <li key={u} className={`si flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 ${box}`} style={{ ["--d" as string]: `${i * 120}ms` }}>
            <span className="truncate text-[12px] font-medium text-ink">{u}</span>
            <Tag tone={t}>{s}</Tag>
          </li>
        ))}
      </ul>
      <p className={`${note} mt-3`}>Illustrative</p>
    </div>
  );
}

/** 2 — Competitor gaps: sites linking to competitors, not you. */
export function GapMock() {
  const rows: Array<[string, boolean, boolean]> = [["Outdoor magazine", true, false], ["Trail blog", true, false], ["Shop directory", true, true]];
  return (
    <div className={shell}>
      <table className={`w-full overflow-hidden rounded-md bg-white text-left text-[12px] ${box}`}>
        <thead><tr className="bg-ink-05 text-ink-68"><th className="px-2.5 py-1.5 font-medium">Site</th><th className="px-2.5 py-1.5 font-medium">Rival</th><th className="px-2.5 py-1.5 font-medium">You</th></tr></thead>
        <tbody>{rows.map(([s, a, b]) => <tr key={s} className="border-t border-ink-05"><th className="px-2.5 py-1.5 font-medium">{s}</th><td className="px-2.5 py-1.5">{a ? <Check aria-label="Links" className="size-3.5 text-success-fg" /> : "–"}</td><td className="px-2.5 py-1.5">{b ? <Check aria-label="Links" className="size-3.5 text-success-fg" /> : <span className="text-warn-fg">Gap</span>}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

/** 3 — Link angles: ideas a publisher would cover. */
export function AngleMock() {
  return (
    <div className={shell}>
      <ul className="grid gap-2">
        {["Original data from your sales", "Expert tips from your founder", "A useful size or care tool"].map((a, i) => (
          <li key={a} className={`si flex items-center gap-2 rounded-md bg-white px-3 py-2 text-[12px] ${box}`} style={{ ["--d" as string]: `${i * 120}ms` }}>
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-[10px] text-accent-strong">{i + 1}</span>{a}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 4 — Outreach: a short pitch email. */
export function PitchMock() {
  return (
    <div className={shell}>
      <div className={`rounded-md bg-white p-3 ${box}`}>
        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-ink-50"><Mail aria-hidden className="size-3" />To: editor</p>
        <p className="mt-1.5 text-[12px] font-medium text-ink">Subject: A fit guide for your readers</p>
        <div aria-hidden className="mt-2 grid gap-1.5"><span className="h-1.5 w-full rounded-full bg-ink-10" /><span className="h-1.5 w-11/12 rounded-full bg-ink-10" /><span className="h-1.5 w-2/3 rounded-full bg-ink-10" /></div>
      </div>
    </div>
  );
}

/** 5 — Digital PR: coverage to a link. */
export function PrMock() {
  return (
    <div className={`${shell} grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3`}>
      <div className={`rounded-md bg-white px-2.5 py-2 text-[12px] leading-4 ${box}`}><p className="font-medium">Your data story</p><p className="text-ink-50">Published</p></div>
      <ArrowRight aria-hidden className="size-5 text-accent" />
      <div className="rounded-md bg-accent px-3 py-2.5 text-center text-white"><p className="text-[12px] font-medium leading-4">Link to</p><p className="text-[11px] opacity-80">your collection</p></div>
    </div>
  );
}

/** 6 — Placement report. */
export function PlacementMock() {
  const rows: Array<[string, string, "success" | "warn" | "neutral"]> = [["Gear review site", "Live", "success"], ["Style blog", "Pending", "warn"], ["News site", "Declined", "neutral"]];
  return (
    <div className={shell}>
      <ul className="grid gap-2">
        {rows.map(([t, s, tone], i) => (
          <li key={t} className={`si flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 ${box}`} style={{ ["--d" as string]: `${i * 120}ms` }}>
            <span className="truncate text-[12px] text-ink">{t}</span>
            <Tag tone={tone}>{s}</Tag>
          </li>
        ))}
      </ul>
      <p className={`${note} mt-3`}>Illustrative</p>
    </div>
  );
}
