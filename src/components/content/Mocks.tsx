import { ArrowRight, Check } from "lucide-react";
import { Tag } from "@/components/ui/Tag";

const shell = "rounded-t-lg border border-b-0 border-ink-05 bg-ink-02 p-4 shadow-xs";
const note = "font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68";
const box = "shadow-[inset_0_0_0_1px_var(--ink-05)]";

/** 1 — Topic research: shopper questions by intent. */
export function QuestionMock() {
  const rows: Array<[string, string, "success" | "warn" | "neutral"]> = [
    ["Which shoes suit wide feet?", "Buying", "success"],
    ["Linen vs cotton shirt", "Compare", "warn"],
    ["How to wash a leather tote", "Care", "neutral"],
  ];
  return (
    <div className={shell}>
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-2">
        {rows.map(([q, t, tone], i) => (
          <li key={q} className={`si flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 ${box}`} style={{ ["--d" as string]: `${i * 120}ms` }}>
            <span className="truncate text-[12px] font-medium text-ink">{q}</span>
            <Tag tone={tone}>{t}</Tag>
          </li>
        ))}
      </ul>
      <p className={`${note} mt-3`}>Illustrative</p>
    </div>
  );
}

/** 2 — Buying guides: article outline. */
export function GuideMock() {
  return (
    <div className={shell}>
      <div className={`rounded-md bg-white p-3 ${box}`}>
        <p className="font-display text-[14px] font-bold leading-tight tracking-[-0.02em]">How to choose a trail shoe</p>
        <ol className="mt-2 grid gap-1 text-[12px] text-ink-68">
          {["What terrain will you run?", "Cushioning and grip", "Fit and sizing", "Our picks"].map((t, i) => <li key={t} className="flex gap-2"><span className="font-mono text-ink-50">0{i + 1}</span>{t}</li>)}
        </ol>
        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-medium text-white">Shop trail shoes<ArrowRight aria-hidden className="size-3" /></span>
      </div>
    </div>
  );
}

/** 3 — Comparison pages: side-by-side table. */
export function CompareMock() {
  const rows = [["Weight", "Light", "Heavier"], ["Breathable", "Yes", "Some"], ["Care", "Machine", "Hand"]];
  return (
    <div className={shell}>
      <table className={`w-full overflow-hidden rounded-md bg-white text-left text-[12px] ${box}`}>
        <thead><tr className="bg-ink-05 text-ink-68"><th className="px-2.5 py-1.5 font-medium" /><th className="px-2.5 py-1.5 font-medium">Linen</th><th className="px-2.5 py-1.5 font-medium">Cotton</th></tr></thead>
        <tbody>{rows.map(([a, b, c]) => <tr key={a} className="border-t border-ink-05"><th className="px-2.5 py-1.5 font-medium text-ink-68">{a}</th><td className="px-2.5 py-1.5">{b}</td><td className="px-2.5 py-1.5">{c}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

/** 4 — Content calendar. */
export function CalendarMock() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const on = [0, 2, 3];
  return (
    <div className={shell}>
      <ul className="grid grid-cols-5 gap-1.5">
        {days.map((d, i) => (
          <li key={d} className={`rounded-md px-1.5 py-2 text-center text-[11px] ${on.includes(i) ? "bg-accent text-white" : `bg-white text-ink-50 ${box}`}`}>
            {d}<span className="mt-1 block text-[9px] opacity-80">{on.includes(i) ? "Publish" : "Rest"}</span>
          </li>
        ))}
      </ul>
      <p className={`${note} mt-3`}>Schedule agreed with you</p>
    </div>
  );
}

/** 5 — Internal links: guide to collection. */
export function GuideLinkMock() {
  return (
    <div className={`${shell} grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3`}>
      <div className={`rounded-md bg-white px-2.5 py-2 text-[12px] leading-4 ${box}`}><p className="font-medium">Buying guide</p><p className="text-ink-50">Trail shoes</p></div>
      <ArrowRight aria-hidden className="size-5 text-accent" />
      <div className="rounded-md bg-accent px-3 py-2.5 text-center text-white"><p className="text-[12px] font-medium leading-4">Collection</p><p className="text-[11px] opacity-80">Trail shoes</p></div>
    </div>
  );
}

/** 6 — Refresh: out-of-date guide checklist. */
export function RefreshMock() {
  const rows: Array<[string, string, "success" | "warn" | "danger"]> = [["Sizing guide", "Current", "success"], ["Gift guide 2023", "Update", "warn"], ["Old sale post", "Remove", "danger"]];
  return (
    <div className={shell}>
      <ul className="grid gap-2">
        {rows.map(([t, s, tone]) => (
          <li key={t} className={`flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 ${box}`}>
            <span className="flex items-center gap-2 text-[12px]"><Check aria-hidden className="size-3.5 text-ink-50" />{t}</span>
            <Tag tone={tone}>{s}</Tag>
          </li>
        ))}
      </ul>
    </div>
  );
}
