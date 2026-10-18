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

/* 1 · Connect: data sources are linked one by one, gaps are flagged. */
const sources: [string, string, Tone][] = [
  ["Search Console", "Connected", "ok"],
  ["Analytics", "Connected", "ok"],
  ["Order tracking", "Gaps found", "warn"],
  ["Revenue by page", "Missing", "bad"],
];

function ConnectCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 flex-col justify-center gap-3">
      <div className={`${card} relative overflow-hidden p-2`}>
        <ul className="relative grid gap-1.5">
          {sources.map(([u, label, tone], i) => (
            <li key={u} className="flex items-center justify-between gap-2 rounded-lg bg-ink-02 px-2.5 py-2 ring-1 ring-ink-05">
              <span className="truncate text-[13px] font-medium text-ink">{u}</span>
              <Chip tone={tone} delay={i * 0.8 - 0.4}>{label}</Chip>
            </li>
          ))}
        </ul>
        <span aria-hidden className="wf-scan pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(to_bottom,transparent,rgb(223_55_167/.12))] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent" />
      </div>
      <p className="px-1 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68">Tracking audit, illustrative</p>
    </div>
  );
}

/* 2 · Baseline: page groups are drawn as a starting point, with no real values. */
const groups = [["Collections", 78], ["Products", 56], ["Guides", 32], ["Brand pages", 22]] as const;

function BaselineCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 items-center">
      <div className={`${card} w-full p-4`}>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68">Starting point by page group, illustrative</p>
        <ul className="grid gap-3">
          {groups.map(([t, w], i) => (
            <li key={t} className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3 text-[13px]">
              <span className="text-ink-68">{t}</span>
              <span aria-hidden className="h-3 overflow-hidden rounded-full bg-ink-05"><span className="pr-a pr-grow block h-full rounded-full bg-accent" style={{ width: `${w}%`, ...d(0.3 + i * 0.4) }} /></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* 3 · Report: wins and drops are explained in plain language. */
const moves: [string, string, Tone][] = [
  ["Collections", "Up", "ok"],
  ["Buying guides", "Flat", "idle"],
  ["Sale pages", "Down", "bad"],
];

function ReportCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 flex-col justify-center gap-3">
      <div className={`${card} p-3`}>
        <div className="flex items-center gap-2"><Chip tone="brand">Summary</Chip><p className="truncate text-[13px] font-semibold text-ink">What changed this month</p></div>
        <ul className="mt-3 grid gap-1.5">
          {moves.map(([t, s, tone], i) => (
            <li key={t} className="flex items-center justify-between gap-2 rounded-lg bg-ink-02 px-2.5 py-2 ring-1 ring-ink-05">
              <span className="text-[13px] font-medium text-ink">{t}</span>
              <Chip tone={tone} delay={0.4 + i * 0.7}>{s}</Chip>
            </li>
          ))}
        </ul>
      </div>
      <div className={`${card} overflow-hidden text-[12px] leading-[1.5]`}>
        <p className="border-b border-ink-05 bg-ink-02 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68">Our read</p>
        <p className="pr-a pr-slide px-3 py-2 text-ink-68" style={d(1.6)}>Sale pages slipped after the promotion ended. Collections gained from the new copy.</p>
      </div>
    </div>
  );
}

/* 4 · Act: next month's actions are listed and last month's are checked off. */
const actions = ["Fix order tracking gap", "Refresh the sale collection", "Add two buying guides"];

function ActCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 flex-col justify-center gap-3">
      <div className={`${card} p-3`}>
        <div className="flex items-center gap-2"><Chip tone="brand">Next 30 days</Chip><p className="truncate text-[13px] font-semibold text-ink">Action list</p></div>
        <ul className="mt-3 grid gap-2">
          {actions.map((t, i) => (
            <li key={t} className="flex items-center gap-2.5 text-[13px] text-ink">
              <span className="relative grid size-[18px] shrink-0 place-items-center rounded-md bg-white ring-1 ring-ink-10">
                <span className="pr-a pr-pop absolute inset-0 grid place-items-center rounded-md bg-accent text-white" style={d(0.4 + i * 0.9)}><Check className="size-3" strokeWidth={3.5} /></span>
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${card} flex items-center justify-between px-3 py-2`}>
        <span className="text-[13px] text-ink">Review call</span>
        <ArrowRight aria-hidden className="size-4 text-ink-50" />
      </div>
    </div>
  );
}

const canvases: Record<string, () => ReactNode> = {
  connect: ConnectCanvas,
  baseline: BaselineCanvas,
  report: ReportCanvas,
  act: ActCanvas,
};

/** Unique workflow panel per process step: shared frame, a different animated format inside. */
export function ReportingWorkflow({ step }: { step: ProcessStep }) {
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
