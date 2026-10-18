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

/* 1 · Audit: a crawl sweeps a URL list and every row gets an indexation verdict. */
const auditRows: [string, string, Tone][] = [
  ["/collections/new-in", "Indexed", "ok"],
  ["/products/linen-shirt", "Indexed", "ok"],
  ["/collections/new-in?sort=price", "Duplicate", "warn"],
  ["/products/oak-side-table", "Noindex", "bad"],
  ["/search?q=sale", "Blocked", "bad"],
];

function AuditCanvas() {
  const ok = auditRows.filter((r) => r[2] === "ok").length;
  return (
    <div className="flex w-full max-w-[430px] flex-1 flex-col justify-center gap-3">
      <div className={`${card} relative overflow-hidden p-2`}>
        <ul className="relative grid gap-1.5">
          {auditRows.map(([url, label, tone], i) => (
            <li key={url} className="flex items-center justify-between gap-2 rounded-lg bg-ink-02 px-2.5 py-2 ring-1 ring-ink-05">
              <span className="truncate font-mono text-[11px] text-ink-68">{url}</span>
              <Chip tone={tone} delay={i * 0.8 - 0.4}>{label}</Chip>
            </li>
          ))}
        </ul>
        <span aria-hidden className="wf-scan pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(to_bottom,transparent,rgb(223_55_167/.12))] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-accent" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[["Crawled", `${auditRows.length}`], ["Indexable", `${ok}`], ["To review", `${auditRows.length - ok}`]].map(([k, v]) => (
          <div key={k} className={`${card} px-3 py-2`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68">{k}</p>
            <p className="font-display text-xl font-bold leading-tight tracking-[-0.03em] text-ink">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2 · Prioritize: issues placed on an impact × effort matrix; the quick win lands first. */
const matrix = [
  { n: 1, label: "Duplicates", x: "16%", y: "14%", hot: true },
  { n: 2, label: "Filter pages", x: "58%", y: "16%" },
  { n: 3, label: "Redirects", x: "20%", y: "62%" },
  { n: 4, label: "Schema", x: "62%", y: "64%" },
];

function PriorityCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 items-center">
      <div className={`${card} relative h-[250px] w-full overflow-hidden`}>
        <span className="absolute left-1/2 top-0 h-full border-l border-dashed border-ink-10" />
        <span className="absolute left-0 top-1/2 w-full border-t border-dashed border-ink-10" />
        <span className="absolute left-0 top-0 h-1/2 w-1/2 bg-accent-soft/60" />
        <span className="absolute left-2.5 top-2 font-mono text-[10px] uppercase tracking-[0.04em] text-accent-strong">Do first</span>
        <span className="absolute bottom-1.5 left-2.5 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-50">Low effort</span>
        <span className="absolute bottom-1.5 right-2.5 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-50">High effort →</span>
        <span className="absolute right-2.5 top-2 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-50">↑ Impact</span>
        {matrix.map((m, i) => (
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

/* 3 · Fix: a developer ticket whose checklist ticks off, with the change shown as a diff. */
const todo = ["Reproduce on a filtered URL", "Point the canonical at the clean URL", "Re-test on staging"];

function FixCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 flex-col justify-center gap-3">
      <div className={`${card} p-3`}>
        <div className="flex items-center gap-2">
          <Chip tone="brand">Ticket</Chip>
          <p className="truncate text-[13px] font-semibold text-ink">Canonicalise filtered collections</p>
        </div>
        <ul className="mt-3 grid gap-2">
          {todo.map((t, i) => (
            <li key={t} className="flex items-center gap-2.5 text-[13px] text-ink">
              <span className="relative grid size-[18px] shrink-0 place-items-center rounded-md bg-white ring-1 ring-ink-10">
                <span className="pr-a pr-pop absolute inset-0 grid place-items-center rounded-md bg-accent text-white" style={d(0.4 + i * 0.9)}>
                  <Check className="size-3" strokeWidth={3.5} />
                </span>
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${card} overflow-hidden font-mono text-[11px] leading-[1.5]`}>
        <p className="border-b border-ink-05 bg-ink-02 px-3 py-1.5 text-[10px] uppercase tracking-[0.04em] text-ink-68">product-collection.liquid</p>
        <p className="pr-a pr-slide truncate bg-danger-bg/70 px-3 py-1.5 text-danger-fg" style={d(0.6)}>{"- <link rel=\"canonical\" href=\"…?sort=price\">"}</p>
        <p className="pr-a pr-slide truncate bg-success-bg/80 px-3 py-1.5 text-success-fg" style={d(1.6)}>{"+ <link rel=\"canonical\" href=\"/collections/new-in\">"}</p>
      </div>
    </div>
  );
}

/* 4 · Validate: release → re-crawl → verified, then each fix is checked against its ticket. */
const checks: [string, string, string, Tone, Tone][] = [
  ["Canonicals", "Duplicate", "Resolved", "warn", "ok"],
  ["Redirect chains", "3 hops", "Resolved", "bad", "ok"],
  ["Product schema", "Missing", "Resolved", "bad", "ok"],
  ["Filter pages", "Indexed", "Reopened", "warn", "brand"],
];

function ValidateCanvas() {
  return (
    <div className="flex w-full max-w-[430px] flex-1 flex-col justify-center gap-3">
      <div className={`${card} px-4 py-3`}>
        <div className="relative flex items-center justify-between">
          <span className="absolute inset-x-3 top-[13px] h-0.5 rounded-full bg-ink-10">
            <span className="pr-a pr-grow block h-full rounded-full bg-accent" style={d(0.2)} />
          </span>
          {["Release", "Re-crawl", "Verified"].map((t, i) => (
            <span key={t} className="relative flex flex-col items-center gap-1.5">
              <span className="pr-a pr-pop grid size-7 place-items-center rounded-full bg-accent text-white ring-4 ring-white" style={d(0.4 + i * 1.1)}>
                <Check className="size-3.5" strokeWidth={3.5} />
              </span>
              <span className="text-[12px] font-medium text-ink">{t}</span>
            </span>
          ))}
        </div>
      </div>
      <ul className={`${card} grid gap-1.5 p-2`}>
        {checks.map(([name, from, to, a, b], i) => (
          <li key={name} className="flex items-center justify-between gap-2 rounded-lg bg-ink-02 px-2.5 py-2 ring-1 ring-ink-05">
            <span className="truncate text-[13px] font-medium text-ink">{name}</span>
            <span className="flex shrink-0 items-center gap-1.5">
              <Chip tone={a}>{from}</Chip>
              <ArrowRight aria-hidden className="size-3 text-ink-50" />
              <Chip tone={b} delay={1.2 + i * 0.5}>{to}</Chip>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const canvases: Record<string, () => ReactNode> = {
  audit: AuditCanvas,
  roadmap: PriorityCanvas,
  technical: FixCanvas,
  report: ValidateCanvas,
};

/** Unique workflow panel per process step: shared frame, a different animated format inside. */
export function TechWorkflow({ step }: { step: ProcessStep }) {
  const Canvas = canvases[step.id] ?? AuditCanvas;
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
