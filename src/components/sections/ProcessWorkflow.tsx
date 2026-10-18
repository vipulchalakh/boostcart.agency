import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Check, ShoppingCart } from "lucide-react";
import type { ProcessStep } from "@content/data";
import { ProcessVisual } from "./ProcessVisuals";

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

const grid = "[background:linear-gradient(var(--ink-05)_1px,transparent_1px)_0_0/32px_32px,linear-gradient(90deg,var(--ink-05)_1px,transparent_1px)_0_0/32px_32px]";
const dots = "[background:radial-gradient(var(--ink-10)_1px,transparent_1.2px)_0_0/10px_10px]";
const card = "rounded-2xl bg-white shadow-sm ring-1 ring-ink-10";

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

const wrap = "flex w-full max-w-[430px] flex-1 flex-col justify-center gap-3";

/* 1 · Audit: a crawl sweeps the URL list and every row gets a verdict. */
const auditRows: [string, string, Tone][] = [
  ["/collections/running-shoes", "Indexed", "ok"],
  ["/products/trail-pro", "Indexed", "ok"],
  ["/collections/running-shoes?sort=new", "Duplicate", "warn"],
  ["/products/summit-jacket", "Noindex", "bad"],
  ["/blog/sizing-guide", "Thin", "warn"],
];

function Audit() {
  const ok = auditRows.filter((r) => r[2] === "ok").length;
  return (
    <div className={wrap}>
      <div className={`${card} relative overflow-hidden p-2`}>
        <ul className="grid gap-1.5">
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
        {[["Crawled", `${auditRows.length}`], ["Healthy", `${ok}`], ["Quick wins", `${auditRows.length - ok}`]].map(([k, v]) => (
          <div key={k} className={`${card} px-3 py-2`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.04em] text-ink-68">{k}</p>
            <p className="font-display text-xl font-bold leading-tight tracking-[-0.03em] text-ink">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2 · Keyword mapping: shopper searches flow to the one page that should rank for each. */
const kws: [string, number][] = [["buy trail shoes", 0], ["mens trail shoes", 0], ["best trail shoes", 2], ["trail shoe sizing", 2]];
const targets = ["Collection", "Product", "Guide"];

function Keywords() {
  const rowY = (i: number) => 17 + i * 44;
  const tY = (i: number) => 19 + i * 64;
  return (
    <div className={`${wrap} items-center`}>
      <div className={`${card} relative grid w-full grid-cols-[minmax(0,1fr)_56px_96px] items-center p-3`}>
        <ul className="grid gap-2.5">
          {kws.map(([k]) => (
            <li key={k} className="truncate rounded-full bg-ink-02 px-3 py-2 text-[12px] text-ink ring-1 ring-ink-10">{k}</li>
          ))}
        </ul>
        <svg aria-hidden viewBox="0 0 56 166" preserveAspectRatio="none" className="h-[166px] w-full">
          {kws.map(([, to], i) => {
            const p = `M0 ${rowY(i)}C28 ${rowY(i)} 28 ${tY(to)} 56 ${tY(to)}`;
            return (
              <g key={i} fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke">
                <path d={p} stroke="var(--ink-10)" vectorEffect="non-scaling-stroke" />
                <path d={p} stroke="var(--accent)" strokeLinecap="round" className="pr-flow" vectorEffect="non-scaling-stroke" />
              </g>
            );
          })}
        </svg>
        <ul className="grid gap-[26px]">
          {targets.map((t, i) => (
            <li key={t} className={`pr-a pr-pop rounded-xl px-3 py-2.5 text-center text-[12px] font-semibold ${i === 0 ? "bg-accent text-white shadow-md" : "bg-white text-ink ring-1 ring-ink-10"}`} style={d(0.4 + i * 0.5)}>{t}</li>
          ))}
        </ul>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.04em] text-ink-50">One intent per page</p>
    </div>
  );
}

/* 3 · Roadmap: one backlog laid out over 90 days, quick wins first. */
const plan: [string, number, number, string][] = [
  ["Fix canonical tags", 0, 30, "Quick win"],
  ["Rewrite top collections", 10, 55, "Big win"],
  ["Build buying guides", 35, 40, "Steady"],
  ["Rebuild faceted nav", 55, 40, "Planned"],
];

function Roadmap() {
  return (
    <div className={wrap}>
      <div className={`${card} p-3`}>
        <div className="mb-2 grid grid-cols-[96px_minmax(0,1fr)] gap-2 sm:grid-cols-[130px_minmax(0,1fr)]">
          <span />
          <span className="grid grid-cols-3 font-mono text-[10px] uppercase tracking-[0.04em] text-ink-50"><span>30 days</span><span>60</span><span>90</span></span>
        </div>
        <ul className="relative grid gap-2.5">
          <span aria-hidden className="absolute bottom-0 left-[104px] top-0 w-[calc(100%-104px)] sm:left-[138px] sm:w-[calc(100%-138px)] [background:repeating-linear-gradient(90deg,var(--ink-05)_0_1px,transparent_1px_33.333%)]" />
          {plan.map(([t, start, len, tag], i) => (
            <li key={t} className="relative grid grid-cols-[96px_minmax(0,1fr)] items-center gap-2 sm:grid-cols-[130px_minmax(0,1fr)]">
              <span className="truncate text-[12px] font-medium text-ink">{t}</span>
              <span className="relative h-7">
                <span className={`pr-a pr-grow absolute top-0 flex h-7 items-center rounded-lg px-2 font-mono text-[10px] uppercase tracking-[0.04em] ${i < 2 ? "bg-accent text-white" : "bg-ink-10 text-ink-68"}`} style={{ left: `${start}%`, width: `${len}%`, ...d(0.3 + i * 0.5) }}>
                  <span className="truncate">{tag}</span>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-white px-3 py-2 text-[12px] ring-1 ring-ink-10">
        <span className="text-ink-68">Ranked by impact and effort</span><Chip tone="brand">90-day plan</Chip>
      </div>
    </div>
  );
}

/* 4 · Technical fixes: site health climbs while the fixes are ticked off. */
const fixes = ["Crawlable", "Indexable", "Fast templates", "Schema live"];

function Technical() {
  return (
    <div className={wrap}>
      <div className={`${card} grid grid-cols-[120px_minmax(0,1fr)] items-center gap-4 p-4`}>
        <svg aria-hidden viewBox="0 0 120 120" className="size-[112px]">
          <circle cx="60" cy="60" r="46" fill="none" stroke="var(--ink-05)" strokeWidth="10" />
          <circle className="pr-a pr-ring" style={{ ...d(0), transform: "rotate(-90deg)", transformOrigin: "60px 60px", transformBox: "view-box" }} cx="60" cy="60" r="46" fill="none" stroke="var(--accent)" strokeWidth="10" strokeLinecap="round" />
          <text x="60" y="58" textAnchor="middle" fontSize="9" letterSpacing=".6" fill="var(--ink-68)" fontFamily="var(--font-mono), monospace">SEO HEALTH</text>
          <path d="M48 70l9 9 17-20" fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="pr-a pr-draw" pathLength={1} style={d(1.2)} />
        </svg>
        <ul className="grid gap-2">
          {fixes.map((t, i) => (
            <li key={t} className="flex items-center gap-2.5 rounded-lg bg-ink-02 px-2.5 py-2 text-[13px] font-medium text-ink ring-1 ring-ink-05">
              <span className="pr-a pr-pop grid size-[18px] place-items-center rounded-full bg-accent text-white" style={d(0.5 + i * 0.5)}><Check className="size-3" strokeWidth={3.5} /></span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* 5 · Category and product pages: the page is rewritten and its search preview sharpens. */
function Pages() {
  return (
    <div className={wrap}>
      <div className={`${card} p-3`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.04em] text-ink-50">Collection page</p>
        <div className="mt-2 grid grid-cols-[88px_minmax(0,1fr)] gap-3">
          <div className="grid place-items-center rounded-xl bg-[color-mix(in_srgb,var(--yellow)_30%,white)]"><ShoppingCart className="size-7 text-accent" /></div>
          <div className="grid content-center gap-2">
            <span className="pr-a pr-grow block h-4 rounded-full bg-accent" style={d(0.2)} />
            <span className="pr-a pr-grow block h-2.5 w-4/5 rounded-full bg-ink-10" style={d(0.6)} />
            <span className="pr-a pr-grow block h-2.5 w-3/5 rounded-full bg-ink-10" style={d(0.9)} />
          </div>
        </div>
      </div>
      <div className={`${card} p-3`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.04em] text-ink-50">Google preview</p>
        <p className="mt-2 truncate text-[11px] text-ink-50">yourstore.com › collections › running-shoes</p>
        <span className="pr-a pr-grow mt-1 block h-3.5 w-[78%] rounded-full bg-accent" style={d(1.2)} />
        <span className="pr-a pr-grow mt-2 block h-2.5 w-full rounded-full bg-ink-10" style={d(1.6)} />
        <span className="pr-a pr-grow mt-1.5 block h-2.5 w-2/3 rounded-full bg-ink-10" style={d(1.9)} />
      </div>
    </div>
  );
}

/* 6 · Buying guides: a guide is written, ranks, and routes shoppers into a collection. */
function Guides() {
  return (
    <div className={`${wrap}`}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className={`${card} p-3`}>
          <Chip tone="brand">Buying guide</Chip>
          <span className="pr-a pr-grow mt-3 block h-3.5 w-4/5 rounded-full bg-ink" style={d(0.2)} />
          <span className="pr-a pr-pop mt-3 block h-14 rounded-xl bg-[color-mix(in_srgb,var(--yellow)_35%,white)]" style={d(0.8)} />
          {[88, 72, 80].map((w, i) => (
            <span key={i} className="pr-a pr-grow mt-2 block h-2 rounded-full bg-ink-10" style={{ width: `${w}%`, ...d(1.2 + i * 0.35) }} />
          ))}
          <span className="pr-blink mt-2 block h-3 w-[3px] bg-accent" />
        </div>
        <span className="pr-a pr-pop grid size-14 place-items-center rounded-full bg-accent font-display text-[13px] font-bold text-white shadow-md" style={d(2.2)}>Ranks</span>
      </div>
      <div className={`${card} flex items-center justify-between px-3 py-2.5`}>
        <span className="text-[12px] font-medium text-ink">Guide</span>
        <ArrowRight aria-hidden className="size-4 text-accent" />
        <span className="rounded-lg bg-accent px-2.5 py-1 text-[12px] font-semibold text-white">Collection</span>
        <Chip tone="ok">Shoppers routed</Chip>
      </div>
    </div>
  );
}

/* 8 · Report: one monthly view ties page wins to organic revenue. */
function Report() {
  return (
    <div className={wrap}>
      <div className={`${card} p-3`}>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-ink">Organic revenue</span>
          <Chip tone="brand" delay={2.2}>Next 30 days</Chip>
        </div>
        <svg aria-hidden viewBox="0 0 400 110" className="mt-2 h-[110px] w-full" fill="none">
          {[0, 1, 2].map((i) => <path key={i} d={`M0 ${20 + i * 35}H400`} stroke="var(--ink-05)" strokeWidth="1.5" />)}
          <path d="M0 96C50 92 90 78 140 64S230 40 280 28 360 12 400 8V110H0z" fill="var(--accent)" fillOpacity=".1" />
          <path className="pr-a pr-draw" pathLength={1} d="M0 96C50 92 90 78 140 64S230 40 280 28 360 12 400 8" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <ul className="grid gap-1.5">
        {["Top collection", "Best-selling product", "Buying guide"].map((t, i) => (
          <li key={t} className={`${card} flex items-center justify-between px-3 py-2`}>
            <span className="text-[12px] font-medium text-ink">{t}</span>
            <Chip tone="ok" delay={0.8 + i * 0.5}>Page win</Chip>
          </li>
        ))}
      </ul>
    </div>
  );
}

const canvases: Record<string, () => ReactNode> = {
  audit: Audit,
  keywords: Keywords,
  roadmap: Roadmap,
  technical: Technical,
  pages: Pages,
  content: Guides,
  links: () => (
    <div className={wrap}>
      <div className={`${card} h-[250px] overflow-hidden`}><ProcessVisual id="links" /></div>
    </div>
  ),
  report: Report,
};

/** Workflow panel for one "How we work" step: shared frame, a different animated format inside. */
export function ProcessWorkflow({ step }: { step: ProcessStep }) {
  const Canvas = canvases[step.id];
  if (!Canvas) return <ProcessVisual id={step.id} />;
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
