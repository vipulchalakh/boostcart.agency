import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Check, ShoppingCart } from "lucide-react";
import type { ProcessStep } from "@content/data";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const grid = "[background:linear-gradient(var(--ink-05)_1px,transparent_1px)_0_0/32px_32px,linear-gradient(90deg,var(--ink-05)_1px,transparent_1px)_0_0/32px_32px]";
const dots = "[background:radial-gradient(var(--ink-10)_1px,transparent_1.2px)_0_0/10px_10px]";

const chip = {
  ok: "bg-success-bg text-success-fg",
  warn: "bg-[var(--yellow)]/50 text-ink",
  bad: "bg-danger-bg text-danger-fg",
  brand: "bg-accent-soft text-accent-strong",
  idle: "bg-ink-05 text-ink-68",
} as const;
type Tone = keyof typeof chip;

function Chip({ tone, children, delay, className = "" }: { tone: Tone; children: ReactNode; delay?: number; className?: string }) {
  return (
    <span className={`${delay === undefined ? "" : "pr-a pr-pop"} inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.04em] ${chip[tone]} ${className}`} style={delay === undefined ? undefined : d(delay)}>
      {children}
    </span>
  );
}

const card = "rounded-2xl bg-white shadow-sm ring-1 ring-ink-10";

/* 1 · Research: shopper questions are collected and tagged by buying stage. */
const qs: [string, string, Tone][] = [
  ["Which shoes suit wide feet?", "Buying", "ok"],
  ["Linen vs cotton shirt", "Compare", "brand"],
  ["How to wash a leather tote", "Care", "idle"],
  ["Is serum worth it?", "Early", "warn"],
];

function ResearchCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 flex-col justify-center gap-3">
      <div className={`${card} relative overflow-hidden p-2`}>
        <ul className="relative grid gap-1.5">
          {qs.map(([q, label, tone], i) => (
            <li key={q} className="flex items-center justify-between gap-2 rounded-lg bg-ink-02 px-2.5 py-2 ring-1 ring-ink-05">
              <span className="truncate text-[13px] font-medium text-ink">{q}</span>
              <Chip tone={tone} delay={i * 0.8 - 0.4}>{label}</Chip>
            </li>
          ))}
        </ul>
        <span aria-hidden className="wf-scan pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(to_bottom,transparent,rgb(223_55_167/.12))] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent" />
      </div>
      <p className="px-1 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68">Questions from search and support</p>
    </div>
  );
}

/* 2 · Plan: topics land on a weekly calendar. */
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const plan = [["Buying guide", 0], ["Comparison", 2], ["Sizing guide", 3]] as const;

function PlanCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 items-center">
      <div className={`${card} w-full p-3`}>
        <div className="grid grid-cols-5 gap-1.5">
          {days.map((day, i) => {
            const hit = plan.find((p) => p[1] === i);
            return (
              <div key={day} className="flex min-h-[110px] flex-col gap-1.5 rounded-lg bg-ink-02 p-1.5 ring-1 ring-ink-05">
                <p className="font-mono text-[10px] uppercase text-ink-68">{day}</p>
                {hit && <span className="pr-a pr-pop rounded-md bg-accent px-1.5 py-1 text-[11px] font-medium leading-4 text-white" style={d(0.4 + i * 0.5)}>{hit[0]}</span>}
              </div>
            );
          })}
        </div>
        <p className="mt-3 flex items-center gap-2 text-[12px] text-ink-68"><Chip tone="brand">Brief</Chip>Each guide names the collection it leads to</p>
      </div>
    </div>
  );
}

/* 3 · Create: a guide outline fills in with facts checked. */
const outline = ["Intro: who this guide is for", "What to look for", "Comparison table", "Our picks and where to buy"];

function CreateCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 flex-col justify-center gap-3">
      <div className={`${card} p-3`}>
        <p className="font-display text-base font-bold tracking-[-0.02em]">How to choose a trail shoe</p>
        <ul className="mt-3 grid gap-2">
          {outline.map((t, i) => (
            <li key={t} className="pr-a pr-slide flex items-center gap-2.5 rounded-lg bg-ink-02 px-2.5 py-2 text-[13px] text-ink ring-1 ring-ink-05" style={d(0.3 + i * 0.7)}>
              <span className="font-mono text-[10px] text-ink-50">0{i + 1}</span>{t}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${card} flex items-center gap-2 px-3 py-2`}>
        <span className="relative grid size-[18px] shrink-0 place-items-center rounded-md bg-white ring-1 ring-ink-10">
          <span className="pr-a pr-pop absolute inset-0 grid place-items-center rounded-md bg-accent text-white" style={d(3.4)}><Check className="size-3" strokeWidth={3.5} /></span>
        </span>
        <span className="text-[13px] text-ink">Product facts checked with your team</span>
      </div>
    </div>
  );
}

/* 4 · Refresh: guides are reviewed and given a next step. */
const reviews: [string, string, string, Tone, Tone][] = [
  ["Trail shoe guide", "Ranking", "Keep", "ok", "ok"],
  ["Linen vs cotton", "Slipping", "Update", "warn", "brand"],
  ["Gift guide 2023", "Outdated", "Rewrite", "bad", "brand"],
  ["Old sale post", "No value", "Remove", "bad", "idle"],
];

function RefreshCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 flex-col justify-center gap-3">
      <ul className={`${card} grid gap-1.5 p-2`}>
        {reviews.map(([name, from, to, a, b], i) => (
          <li key={name} className="flex items-center justify-between gap-2 rounded-lg bg-ink-02 px-2.5 py-2 ring-1 ring-ink-05">
            <span className="truncate text-[13px] font-medium text-ink">{name}</span>
            <span className="flex shrink-0 items-center gap-1.5">
              <Chip tone={a}>{from}</Chip>
              <ArrowRight aria-hidden className="size-3 text-ink-50" />
              <Chip tone={b} delay={0.8 + i * 0.6}>{to}</Chip>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const canvases: Record<string, () => ReactNode> = {
  research: ResearchCanvas,
  plan: PlanCanvas,
  create: CreateCanvas,
  review: RefreshCanvas,
};

/** Unique workflow panel per process step: shared frame, a different animated format inside. */
export function ContentWorkflow({ step }: { step: ProcessStep }) {
  const Canvas = canvases[step.id] ?? Object.values(canvases)[0];
  return (
    <div aria-hidden className={`relative flex h-full flex-col overflow-hidden rounded-xl border border-ink-05 bg-white p-3 sm:p-4 ${grid}`}>
      <span className="absolute right-0 top-[96px] size-8 bg-ink-05" />
      <span className="absolute bottom-[64px] left-0 size-8 bg-ink-05" />
      <span className="absolute bottom-0 right-[96px] size-8 bg-ink-05" />

      <div className="relative flex min-h-0 flex-1 flex-col gap-3 rounded-2xl bg-white/80 p-2 ring-1 ring-ink-05 backdrop-blur-[1px] sm:p-3">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-ink-10">
          <span className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink text-white"><ShoppingCart className="size-[18px]" /></span>
            <span className="truncate font-display text-lg font-bold tracking-[-0.02em] text-ink">{step.title}<span className="hidden sm:inline"> workflow</span></span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-ink shadow-sm ring-1 ring-ink-10">
            <span className="pr-pulse size-2 rounded-full bg-success-dot" />Illustrative
          </span>
        </div>

        <div className={`relative flex min-h-0 flex-1 flex-col items-center overflow-hidden rounded-2xl bg-ink-02 p-3 ring-1 ring-ink-05 ${dots}`}>
          <Canvas />
        </div>
      </div>
    </div>
  );
}
