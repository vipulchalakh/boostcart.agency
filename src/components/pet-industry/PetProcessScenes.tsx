import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;
const card = "w-full max-w-[600px] overflow-hidden rounded-xl bg-[#17171b]/95 text-white shadow-[0_32px_64px_-16px_rgb(0_0_0/.7)] ring-1 ring-white/15 backdrop-blur-md";
const label = "font-mono text-[10px] uppercase tracking-[0.12em] text-white/50";
const tone = {
  ok: "bg-[#22c55e]/15 text-[#7ee2a0]",
  warn: "bg-[#f9f906]/15 text-[#f3f36a]",
  bad: "bg-[#ef4444]/15 text-[#ff9a9a]",
  hot: "bg-[#df37a7]/20 text-[#ff8fd5]",
  dim: "bg-white/10 text-white/60",
} as const;
type Tone = keyof typeof tone;

const Pill = ({ t = "dim", children }: { t?: Tone; children: ReactNode }) => (
  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium leading-4 ${tone[t]}`}>{children}</span>
);
/** macOS-style window: traffic-light buttons, a centred title in the title bar, then the content. */
const Win = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className={card}>
    <div className="relative flex h-11 items-center border-b border-white/10 bg-white/[0.04] px-4">
      <span aria-hidden className="flex gap-2">
        <span className="size-3 rounded-full bg-[#ff5f57]" /><span className="size-3 rounded-full bg-[#febc2e]" /><span className="size-3 rounded-full bg-[#28c840]" />
      </span>
      <p className="pointer-events-none absolute inset-x-0 text-center font-display text-[14px] font-bold tracking-[-0.01em] text-white/90">{title}</p>
      <span className={`${label} relative ml-auto`}>Example</span>
    </div>
    <div className="p-5 sm:p-6">{children}</div>
  </div>
);

/** Illustrative scenes for each step. Every name, status and title is fictional: no real results. */
const scenes: Record<string, ReactNode> = {
  audit: (
    <Win title="Pet store audit">
      <ul className="grid gap-2.5">
        {([["Variant URLs", "Review", "warn"], ["Filter pages", "Too many crawled", "bad"], ["Page speed", "Heavy images", "warn"], ["Product markup", "Checked", "ok"]] as [string, string, Tone][]).map(([n, s, t], i) => (
          <li key={n} className="si flex items-center justify-between gap-3 rounded-lg bg-white/[0.06] px-4 py-3.5" style={d(i * 110)}>
            <span className="text-[15px] text-white/90">{n}</span><Pill t={t}>{s}</Pill>
          </li>
        ))}
      </ul>
    </Win>
  ),
  map: (
    <Win title="Search map">
      <ul className="grid gap-2.5">
        {([["large breed puppy food", "Collection"], ["senior cat food", "Collection"], ["how much to feed a puppy", "Guide"], ["grain-free dog food", "Needs a decision"]] as [string, string][]).map(([q, p], i) => (
          <li key={q} className="si flex items-center gap-2 text-[14px]" style={d(i * 110)}>
            <span className="min-w-0 flex-1 truncate rounded-lg bg-white/[0.06] px-4 py-3 text-white/90">{q}</span>
            <ArrowRight aria-hidden className="size-3.5 shrink-0 text-white/40" />
            <Pill t={p === "Needs a decision" ? "warn" : "hot"}>{p}</Pill>
          </li>
        ))}
      </ul>
    </Win>
  ),
  fix: (
    <Win title="Variant clean-up">
      <ul className="grid gap-2 font-mono text-[13px]">
        {["/dog-food?size=5lb", "/dog-food?size=15lb", "/dog-food?flavor=beef"].map((u, i) => (
          <li key={u} className="si flex items-center justify-between gap-3 rounded-lg bg-white/[0.06] px-4 py-3" style={d(i * 110)}>
            <span className="truncate text-white/60 line-through decoration-white/30">{u}</span><Pill t="dim">Duplicate</Pill>
          </li>
        ))}
      </ul>
      <p className="si my-2 flex items-center gap-2 pl-3 text-[11px] text-white/50" style={d(420)}><ArrowRight aria-hidden className="size-3.5 rotate-90" />canonical to the main page</p>
      <div className="si flex items-center justify-between gap-3 rounded-lg bg-[#df37a7]/15 px-4 py-3.5 ring-1 ring-[#df37a7]/40" style={d(540)}>
        <span className="font-mono text-[14px] text-white">/dog-food</span><Pill t="ok">Indexed</Pill>
      </div>
    </Win>
  ),
  pages: (
    <Win title="Collection page">
      <div className="rounded-lg bg-white/[0.06] p-4">
        <p className="text-[12px] text-white/50">example-petshop.com › collections › large-breed-puppy-food</p>
        <p className="mt-1 text-[17px] font-medium leading-6 text-[#ff8fd5]">Large Breed Puppy Food | Example Pet Shop</p>
        <p className="mt-1 text-[14px] leading-[18px] text-white/70">Compare formulas, protein and bag sizes for growing large breeds.</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Title", "Heading", "Intro copy", "Internal links"].map((t, i) => (
          <span key={t} className="si inline-flex items-center gap-1 rounded-full bg-[#22c55e]/15 px-3 py-1.5 text-[12px] font-medium text-[#7ee2a0]" style={d(200 + i * 110)}><Check aria-hidden className="size-3" strokeWidth={3} />{t}</span>
        ))}
      </div>
    </Win>
  ),
  guides: (
    <Win title="Guide calendar">
      <ul className="grid gap-2.5">
        {([["How to choose puppy food", "Draft", "dim"], ["Wet vs dry cat food: a guide", "Claims check", "warn"], ["Litter types, compared", "Live", "ok"], ["Feeding a senior dog", "Live", "ok"]] as [string, string, Tone][]).map(([n, s, t], i) => (
          <li key={n} className="si flex items-center justify-between gap-3 rounded-lg bg-white/[0.06] px-4 py-3.5" style={d(i * 110)}>
            <span className="min-w-0 truncate text-[15px] text-white/90">{n}</span><Pill t={t}>{s}</Pill>
          </li>
        ))}
      </ul>
    </Win>
  ),
  report: (
    <Win title="Monthly report">
      <ul className="grid gap-4">
        {([["Collection pages", 82, "Growing", "ok"], ["Product pages", 62, "Growing", "ok"], ["Care guides", 38, "Flat", "dim"], ["Seasonal pages", 24, "Falling", "bad"]] as [string, number, string, Tone][]).map(([n, w, s, t], i) => (
          <li key={n} className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] items-center gap-3 text-[14px]">
            <span className="truncate text-white/90">{n}</span>
            <span aria-hidden className="h-2.5 overflow-hidden rounded-full bg-white/10"><span className="grow-x block h-full rounded-full bg-[#df37a7]" style={{ width: `${w}%`, ...d(i * 120) }} /></span>
            <Pill t={t}>{s}</Pill>
          </li>
        ))}
      </ul>
    </Win>
  ),
};

/** Sits on the shared gradient panel, so only this card changes between steps. */
export function PetProcessScene({ id }: { id: string }) {
  return (
    <div role="img" aria-label="Illustration of this step with example, not real, data" className="ind-swap is-visible grid size-full place-items-center p-4 sm:p-6">
      {scenes[id]}
    </div>
  );
}
