import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
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

/* 1 · Analyze: organic entry pages are sorted by where visitors go next. */
const entries: [string, string, Tone][] = [
  ["/collections/trail", "Continues", "ok"],
  ["/products/ridge-runner", "Leaves", "bad"],
  ["/guides/sizing", "Partly", "warn"],
  ["/collections/sale", "Leaves", "bad"],
];

function AnalyzeCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 flex-col justify-center gap-3">
      <div className={`${card} relative overflow-hidden p-2`}>
        <ul className="relative grid gap-1.5">
          {entries.map(([u, label, tone], i) => (
            <li key={u} className="flex items-center justify-between gap-2 rounded-lg bg-ink-02 px-2.5 py-2 ring-1 ring-ink-05">
              <span className="truncate font-mono text-[11px] text-ink-68">{u}</span>
              <Chip tone={tone} delay={i * 0.8 - 0.4}>{label}</Chip>
            </li>
          ))}
        </ul>
        <span aria-hidden className="wf-scan pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(to_bottom,transparent,rgb(223_55_167/.12))] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent" />
      </div>
      <p className="px-1 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68">Organic landing pages, illustrative</p>
    </div>
  );
}

/* 2 · Diagnose: a product page is reviewed one element at a time. */
const elements: [string, string, Tone][] = [
  ["Product photos", "Clear", "ok"],
  ["Size guide", "Weak", "warn"],
  ["Reviews", "Missing", "bad"],
  ["Delivery and returns", "Weak", "warn"],
];

function DiagnoseCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 items-center">
      <div className={`${card} w-full p-3`}>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68">/products/linen-shirt</p>
        <ul className="grid gap-1.5">
          {elements.map(([t, s, tone], i) => (
            <li key={t} className="flex items-center justify-between gap-2 rounded-lg bg-ink-02 px-2.5 py-2 ring-1 ring-ink-05">
              <span className="text-[13px] font-medium text-ink">{t}</span>
              <Chip tone={tone} delay={0.4 + i * 0.7}>{s}</Chip>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* 3 · Recommend: changes ranked by value and effort. */
const changes = [
  { n: 1, label: "Add reviews", x: "14%", y: "14%", hot: true },
  { n: 2, label: "Size guide", x: "58%", y: "16%" },
  { n: 3, label: "Returns note", x: "18%", y: "62%" },
  { n: 4, label: "New layout", x: "62%", y: "64%" },
];

function RecommendCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 items-center">
      <div className={`${card} relative h-[250px] w-full overflow-hidden`}>
        <span className="absolute left-1/2 top-0 h-full border-l border-dashed border-ink-10" />
        <span className="absolute left-0 top-1/2 w-full border-t border-dashed border-ink-10" />
        <span className="absolute left-0 top-0 h-1/2 w-1/2 bg-accent-soft/60" />
        <span className="absolute left-2.5 top-2 font-mono text-[10px] uppercase tracking-[0.04em] text-accent-strong">Do first</span>
        <span className="absolute right-2.5 top-2 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-50">↑ Value</span>
        <span className="absolute bottom-1.5 left-2.5 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-50">Low effort</span>
        <span className="absolute bottom-1.5 right-2.5 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-50">High effort →</span>
        {changes.map((m, i) => (
          <span key={m.n} className="pr-a pr-pop absolute flex items-center gap-1.5" style={{ left: m.x, top: m.y, ...d(0.5 + i * 0.6) }}>
            <span className={`relative grid size-7 place-items-center rounded-full font-display text-[13px] font-bold ${m.hot ? "bg-accent text-white shadow-md" : "bg-white text-ink ring-1 ring-ink-10 shadow-sm"}`}>
              {m.hot && <span className="pr-pulse absolute inset-0 rounded-full bg-accent/40" />}
              <span className="relative">{m.n}</span>
            </span>
            <span className="hidden whitespace-nowrap rounded-md bg-white px-1.5 py-0.5 text-[11px] font-medium text-ink ring-1 ring-ink-10 sm:inline">{m.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* 4 · Measure: behaviour on changed pages is compared, and rankings are checked. */
const compared: [string, string, string, Tone, Tone][] = [
  ["Trail collection", "Before", "Improved", "idle", "ok"],
  ["Ridge Runner page", "Before", "Improved", "idle", "ok"],
  ["Sale collection", "Before", "No change", "idle", "warn"],
  ["Rankings", "Watch", "Held", "warn", "ok"],
];

function MeasureCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 flex-col justify-center gap-3">
      <ul className={`${card} grid gap-1.5 p-2`}>
        {compared.map(([name, from, to, a, b], i) => (
          <li key={name} className="flex items-center justify-between gap-2 rounded-lg bg-ink-02 px-2.5 py-2 ring-1 ring-ink-05">
            <span className="truncate text-[13px] font-medium text-ink">{name}</span>
            <span className="flex shrink-0 items-center gap-1.5"><Chip tone={a}>{from}</Chip><ArrowRight aria-hidden className="size-3 text-ink-50" /><Chip tone={b} delay={0.6 + i * 0.6}>{to}</Chip></span>
          </li>
        ))}
      </ul>
      <p className="px-1 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68">Illustrative</p>
    </div>
  );
}

const canvases: Record<string, () => ReactNode> = {
  analyze: AnalyzeCanvas,
  diagnose: DiagnoseCanvas,
  recommend: RecommendCanvas,
  measure: MeasureCanvas,
};

/** Unique workflow panel per process step: shared frame, a different animated format inside. */
export function ConversionWorkflow({ step }: { step: ProcessStep }) {
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
