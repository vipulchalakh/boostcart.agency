"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Hand, Search, Wrench, X } from "lucide-react";
import type { ChecklistCategory, ChecklistItem, Impact } from "@content/data/types";
import { BlogIndexBackdrop } from "@/components/blog-index/BlogIndexBackdrop";
import { cn } from "@/lib/cn";
import { useStored } from "@/lib/use-stored";

const STORE_KEY = "bc-seo-checklist-v1";
const IMPACT_W: Record<Impact, number> = { high: 3, medium: 2, low: 1 };
const PRIORITY_W = { P1: 3, P2: 2, P3: 1 } as const;
/** Higher-impact, higher-priority items move the score more. */
const weight = (i: ChecklistItem) => IMPACT_W[i.impact] + PRIORITY_W[i.priority];
/** Score shown to one decimal. Only a true 100% reads as 100 (99.96 shows 99.9). */
const fmtScore = (n: number) => (n >= 100 - 1e-9 ? "100" : Math.min(99.9, Math.round(n * 10) / 10).toFixed(1));

/** Per-check score gain: its weight as a share of the total, so every check's points sum to exactly 100. */
function ImpactMeter({ pts, weight: w, checked, className }: { pts: number; weight: number; checked: boolean; className?: string }) {
  const filled = w - 1; // weight 2..6 maps to 1..5 bars
  return (
    <span className={cn("flex-col items-end gap-1.5 text-right", className)} title={`Worth ${pts.toFixed(2)} of the 100 score points`}>
      <span className={cn("font-display text-xl font-bold leading-none tracking-[-0.02em] tabular-nums transition-colors", checked ? "text-success-fg" : "text-ink")}>+{pts.toFixed(2)}</span>
      <span className="eyebrow text-[0.625rem] leading-none">{checked ? "pts earned" : "score pts"}</span>
      <span aria-hidden className="mt-0.5 flex gap-[3px]">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={cn("h-1.5 w-3 rounded-full transition-colors", n <= filled ? (checked ? "bg-success-dot" : "bg-accent") : "bg-ink-10")} />
        ))}
      </span>
    </span>
  );
}

const IMPACT_STYLE: Record<Impact, string> = {
  high: "bg-accent-soft text-accent-strong",
  medium: "bg-warn-bg text-warn-fg",
  low: "bg-ink-05 text-ink-68",
};
const PRIORITY_STYLE = { P1: "bg-ink text-white", P2: "bg-ink-10 text-ink", P3: "bg-ink-05 text-ink-68" } as const;

function band(score: number) {
  if (score >= 90) return { label: "Search-ready", note: "Elite. Keep monitoring and refreshing.", color: "var(--success-dot)" };
  if (score >= 70) return { label: "Strong performer", note: "Most of the fundamentals are in place.", color: "var(--success-dot)" };
  if (score >= 45) return { label: "Building momentum", note: "Solid base. The high-impact gaps are next.", color: "#eab308" };
  if (score >= 15) return { label: "Early progress", note: "Start with the P1 items for the biggest lift.", color: "var(--accent)" };
  return { label: "Just getting started", note: "Work through the checks below and mark each one done as you implement it.", color: "var(--danger-dot)" };
}

function parse(raw: string | null | undefined): Set<string> {
  if (!raw) return new Set();
  try {
    const v = JSON.parse(raw);
    return new Set(Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
  } catch {
    return new Set();
  }
}

function Ring({ score, size = 220, stroke = 16, color, children }: { score: number; size?: number; stroke?: number; color: string; children?: React.ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`SEO score ${fmtScore(score)} out of 100`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--ink-10)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
          style={{ transition: "stroke-dashoffset 700ms var(--ease-out-quart), stroke 400ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options, className }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][]; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-11 w-full cursor-pointer appearance-none rounded-lg border bg-white pl-3.5 pr-9 text-sm font-medium outline-none transition-colors focus:border-accent",
          value === "all" ? "border-ink-10 text-ink-68 hover:border-ink-32" : "border-ink bg-ink-02 text-ink",
        )}
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink-50" />
    </div>
  );
}

export function ChecklistApp({ categories, intro }: { categories: ChecklistCategory[]; intro: React.ReactNode }) {
  const [raw, setRaw] = useStored("local", STORE_KEY);
  const done = useMemo(() => parse(raw), [raw]);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [impact, setImpact] = useState<Impact | "all">("all");
  const [priority, setPriority] = useState<"all" | "P1" | "P2" | "P3">("all");
  const [type, setType] = useState<"all" | "manual" | "tool">("all");
  const [status, setStatus] = useState<"all" | "open" | "done">("all");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [showPill, setShowPill] = useState(false);
  const scoreRef = useRef<HTMLDivElement>(null);

  const all = useMemo(() => categories.flatMap((c) => c.items), [categories]);
  const totalW = useMemo(() => all.reduce((n, i) => n + weight(i), 0), [all]);
  const doneItems = all.filter((i) => done.has(i.id));
  const doneW = doneItems.reduce((n, i) => n + weight(i), 0);
  const score = (doneW / totalW) * 100;
  const pts = (i: ChecklistItem) => (weight(i) / totalW) * 100;
  const b = band(score);

  useEffect(() => {
    const el = scoreRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowPill(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function toggle(id: string) {
    const n = new Set(done);
    if (n.has(id)) n.delete(id);
    else n.add(id);
    setRaw(JSON.stringify([...n]));
  }
  const q = query.trim().toLowerCase();
  const filtering = q !== "" || impact !== "all" || priority !== "all" || type !== "all" || status !== "all";
  const visible = categories
    .filter((c) => cat === "all" || c.slug === cat)
    .map((c) => ({
      ...c,
      shown: c.items.filter(
        (i) =>
          (impact === "all" || i.impact === impact) &&
          (priority === "all" || i.priority === priority) &&
          (type === "all" || (type === "manual") === i.manual) &&
          (status === "all" || (status === "done") === done.has(i.id)) &&
          (q === "" || `${i.title} ${i.detail} ${i.tools.join(" ")}`.toLowerCase().includes(q)),
      ),
    }))
    .filter((c) => c.shown.length);
  const shownCount = visible.reduce((n, c) => n + c.shown.length, 0);

  return (
    <div>
      {/* Hero: intro copy on the left, live score card on the right */}
      <header className="relative isolate -mt-12 pb-12 pt-[10rem] md:pb-16 md:pt-[11rem] lg:pt-[12rem]">
        <BlogIndexBackdrop />
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-14 xl:gap-20">
            <div className="hero-fade min-w-0">{intro}</div>

      {/* Score card */}
      <div ref={scoreRef} className="hero-fade min-w-0 rounded-[var(--r-panel)] border border-ink-10 bg-white/90 p-6 shadow-md backdrop-blur md:p-8" style={{ "--d": "120ms" } as React.CSSProperties}>
        <div className="grid gap-6">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-7">
            <Ring score={score} size={168} stroke={14} color={b.color}>
              <div className="text-center">
                <div className="font-display text-[3.25rem] font-bold leading-none tracking-[-0.04em] text-ink tabular-nums" aria-live="polite">
                  {fmtScore(score)}
                </div>
                <div className="eyebrow mt-1 text-[0.6875rem]">out of 100</div>
              </div>
            </Ring>
            <div className="min-w-0 text-center sm:text-left">
              <p className="eyebrow">Your store&rsquo;s SEO score</p>
              <p className="mt-2 font-display text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-ink">{b.label}</p>
              <p className="mt-2 text-[0.9375rem] leading-6 text-ink-68">{b.note}</p>
            </div>
          </div>

          <div className="min-w-0">
            <dl className="grid grid-cols-3 gap-3 text-center sm:text-left">
              {[
                ["Done", `${doneItems.length}`, "bg-success-bg/70 text-success-fg"],
                ["Remaining", `${all.length - doneItems.length}`, "bg-warn-bg/80 text-warn-fg"],
                ["Total checks", `${all.length}`, "bg-danger-bg/70 text-danger-fg"],
              ].map(([k, v, tone]) => (
                <div key={k} className={cn("rounded-xl px-3 py-3 sm:px-4", tone)}>
                  <dt className="eyebrow text-[0.6875rem] !text-current opacity-80">{k}</dt>
                  <dd className="font-display text-2xl font-bold text-ink tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {categories.map((c) => {
                const d = c.items.filter((i) => done.has(i.id)).length;
                return (
                  <div key={c.slug}>
                    <div className="flex items-baseline justify-between gap-3 text-[0.8125rem]">
                      <span className="truncate text-ink-68">{c.title}</span>
                      <span className="font-mono text-ink-50 tabular-nums">
                        {d}/{c.items.length}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink-10">
                      <div className="h-full rounded-full bg-accent transition-[width] duration-700 ease-[var(--ease-out-quart)]" style={{ width: `${(d / c.items.length) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
          </div>
        </div>
      </header>

      {/* Filters: search on the left, dropdowns on the right */}
      <div className="container-x pb-2">
        <div>
          <div className="flex flex-wrap items-center gap-3 xl:flex-nowrap">
            <div className="relative min-w-[220px] flex-1 basis-[220px]">
              <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-50" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search checks, e.g. canonical, schema"
                aria-label="Search checklist"
                className="h-11 w-full rounded-lg border border-ink-10 bg-white pl-10 pr-9 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-ink-50 focus:border-accent [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2.5 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-ink-50 hover:bg-ink-05">
                  <X className="size-4" />
                </button>
              )}
            </div>

            <div className="flex w-full flex-wrap items-center gap-3 xl:w-auto xl:flex-nowrap">
              <FilterSelect label="Category" value={cat} onChange={setCat} options={[["all", "All categories"], ...categories.map((c) => [c.slug, c.title] as [string, string])]} className="w-full sm:w-[11.5rem]" />
              <FilterSelect label="Impact" className="w-[calc(50%-0.375rem)] sm:w-[8.5rem]" value={impact} onChange={(v) => setImpact(v as typeof impact)} options={[["all", "Any impact"], ["high", "High"], ["medium", "Medium"], ["low", "Low"]]} />
              <FilterSelect label="Priority" className="w-[calc(50%-0.375rem)] sm:w-[8.5rem]" value={priority} onChange={(v) => setPriority(v as typeof priority)} options={[["all", "Any priority"], ["P1", "P1"], ["P2", "P2"], ["P3", "P3"]]} />
              <FilterSelect label="Type" className="w-[calc(50%-0.375rem)] sm:w-[8.5rem]" value={type} onChange={(v) => setType(v as typeof type)} options={[["all", "Any type"], ["manual", "Manual"], ["tool", "Tool-checkable"]]} />
              <FilterSelect label="Status" className="w-[calc(50%-0.375rem)] sm:w-[8.5rem]" value={status} onChange={(v) => setStatus(v as typeof status)} options={[["all", "All"], ["open", "Not done"], ["done", "Completed"]]} />
            </div>
          </div>
          <p className="mt-3 text-sm text-ink-50" aria-live="polite">
            {filtering || cat !== "all" ? `Showing ${shownCount} of ${all.length} checks` : `${all.length} checks`}
          </p>
        </div>
      </div>

      {/* Lists */}
      <div className="container-x mt-10 space-y-8 pb-16 md:pb-20">
        {visible.length === 0 && (
          <div className="rounded-2xl border border-dashed border-ink-20 bg-ink-02 px-6 py-16 text-center">
            <p className="font-display text-2xl font-bold text-ink">No checks match those filters</p>
            <p className="mt-2 text-ink-68">Try clearing the search or relaxing a filter.</p>
          </div>
        )}
        {visible.map((c) => {
          const d = c.items.filter((i) => done.has(i.id)).length;
          const open = filtering || !collapsed.has(c.slug);
          return (
            <section key={c.slug} aria-labelledby={`cat-${c.slug}`} id={c.slug} className="scroll-mt-28">
              <div className="relative flex w-full items-center justify-between gap-4 rounded-2xl border border-ink-10 bg-white px-5 py-4 text-left shadow-xs transition-colors hover:border-ink-32 md:px-6">
                <div className="min-w-0">
                  <h2 id={`cat-${c.slug}`} className="font-display text-xl font-bold tracking-[-0.015em] text-ink md:text-2xl">
                    {c.title}
                  </h2>
                  <p className="mt-0.5 text-sm text-ink-68">{c.blurb}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-right font-mono text-sm text-ink-50 tabular-nums">
                    {d}/{c.items.length}
                    <span className="hidden text-xs text-ink-32 sm:block">
                      {c.items.filter((i) => done.has(i.id)).reduce((n, i) => n + pts(i), 0).toFixed(1)} / {c.items.reduce((n, i) => n + pts(i), 0).toFixed(1)} pts
                    </span>
                  </span>
                  <ChevronDown aria-hidden className={cn("size-5 text-ink-50 transition-transform duration-200", open && "rotate-180")} />
                </div>
                {/* Whole card toggles the list; the button is named by the H2 above */}
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`list-${c.slug}`}
                  aria-labelledby={`cat-${c.slug}`}
                  onClick={() =>
                    setCollapsed((s) => {
                      const n = new Set(s);
                      if (n.has(c.slug)) n.delete(c.slug);
                      else n.add(c.slug);
                      return n;
                    })
                  }
                  className="absolute inset-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                />
              </div>

              <ul id={`list-${c.slug}`} hidden={!open} className="mt-3 space-y-2.5">
                {c.shown.map((i) => {
                  const checked = done.has(i.id);
                  return (
                    <li key={i.id}>
                      <label
                        className={cn(
                          "group flex cursor-pointer gap-4 rounded-2xl border bg-white p-4 transition-[border-color,background-color,box-shadow] duration-200 md:p-5",
                          checked ? "border-success-dot/40 bg-success-bg/30" : "border-ink-10 hover:border-ink-32 hover:shadow-xs",
                          "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
                        )}
                      >
                        <input type="checkbox" checked={checked} onChange={() => toggle(i.id)} className="peer sr-only" />
                        <span
                          aria-hidden
                          className={cn(
                            "mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 transition-[background-color,border-color,transform] duration-200",
                            checked ? "scale-105 border-success-dot bg-success-dot text-white" : "border-ink-20 bg-white text-transparent group-hover:border-ink-50",
                          )}
                        >
                          <Check className="size-4" strokeWidth={3} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={cn("block font-medium leading-snug text-ink transition-colors", checked && "text-ink-50 line-through decoration-ink-20")}>{i.title}</span>
                          <span className="mt-1 block text-[0.9375rem] leading-6 text-ink-68">{i.detail}</span>
                          <span className="mt-3 flex flex-wrap items-center gap-1.5">
                            <span className={cn("rounded-xs px-2 py-0.5 font-mono text-[11px] font-medium uppercase leading-[18px] tracking-[0.04em]", IMPACT_STYLE[i.impact])}>{i.impact} impact</span>
                            <span className={cn("rounded-xs px-2 py-0.5 font-mono text-[11px] font-medium uppercase leading-[18px] tracking-[0.04em]", PRIORITY_STYLE[i.priority])}>{i.priority}</span>
                            <span className="inline-flex items-center gap-1 rounded-xs bg-ink-05 px-2 py-0.5 font-mono text-[11px] font-medium uppercase leading-[18px] tracking-[0.04em] text-ink-68">
                              {i.manual ? <Hand aria-hidden className="size-3" /> : <Wrench aria-hidden className="size-3" />}
                              {i.manual ? "Manual" : "Tool-checkable"}
                            </span>
                            <span className={cn("rounded-xs px-2 py-0.5 font-mono text-[11px] font-medium leading-[18px] tracking-[0.04em] sm:hidden", checked ? "bg-success-bg text-success-fg" : "bg-ink-05 text-ink")}>+{pts(i).toFixed(2)} pts</span>
                            {i.tools.map((t) => (
                              <span key={t} className="rounded-full bg-[var(--yellow)] px-2.5 py-0.5 text-xs font-medium text-ink">
                                {t}
                              </span>
                            ))}
                          </span>
                        </span>
                        <ImpactMeter pts={pts(i)} weight={weight(i)} checked={checked} className="hidden shrink-0 sm:flex sm:w-[5.5rem]" />
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Floating score pill once the main card scrolls away */}
      <div
        aria-hidden={!showPill}
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 transition-[opacity,transform] duration-300",
          showPill ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        <button
          type="button"
          tabIndex={showPill ? 0 : -1}
          onClick={() => scoreRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
          className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-ink-10 bg-white/95 py-2 pl-2 pr-5 shadow-lg backdrop-blur"
        >
          <Ring score={score} size={44} stroke={6} color={b.color}>
            <span className="font-display text-sm font-bold tabular-nums text-ink">{fmtScore(score)}</span>
          </Ring>
          <span className="text-left text-sm leading-tight">
            <span className="block font-medium text-ink">{b.label}</span>
            <span className="block text-ink-50 tabular-nums">
              {doneItems.length} of {all.length} done
            </span>
          </span>
          <ArrowRight aria-hidden className="size-4 -rotate-90 text-ink-50" />
        </button>
      </div>
    </div>
  );
}
