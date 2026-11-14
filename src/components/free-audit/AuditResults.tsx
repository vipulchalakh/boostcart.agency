"use client";

import { ArrowRight, CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react";
import { bookCallHref } from "@content/data";
import type { AuditCheck, AuditIssue, AuditResult, CheckStatus, Severity } from "@/lib/audit-types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const scoreColor = (n: number) => (n >= 80 ? "var(--success-dot)" : n >= 60 ? "#eab308" : "var(--danger-dot)");
export const scoreLabel = (n: number) => (n >= 80 ? "Strong" : n >= 60 ? "Needs work" : "Needs attention");

export function ScoreRing({ score, size = 160, stroke = 14, children }: { score: number; size?: number; stroke?: number; children?: React.ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Score ${score} out of 100`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--ink-10)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={scoreColor(score)}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.min(100, Math.max(0, score)) / 100)}
          style={{ transition: "stroke-dashoffset 900ms var(--ease-out-quart)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

const SEVERITY: Record<Severity, { label: string; cls: string }> = {
  high: { label: "High", cls: "bg-danger-bg text-danger-fg" },
  medium: { label: "Medium", cls: "bg-warn-bg text-warn-fg" },
  low: { label: "Low", cls: "bg-ink-05 text-ink-68" },
};
const OWNER: Record<NonNullable<AuditIssue["owner"]>, string> = { developer: "Developer", content: "Content team", marketing: "Marketing" };

const STATUS: Record<CheckStatus, { Icon: typeof Info; cls: string; label: string }> = {
  pass: { Icon: CircleCheck, cls: "text-success-dot", label: "Passed" },
  warning: { Icon: TriangleAlert, cls: "text-[#ca8a04]", label: "Warning" },
  fail: { Icon: CircleX, cls: "text-danger-dot", label: "Failed" },
  info: { Icon: Info, cls: "text-ink-50", label: "Info" },
};

const pretty = (s: string) => {
  const t = s.replace(/[_-]+/g, " ").trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
};

function CheckRow({ c }: { c: AuditCheck }) {
  const { Icon, cls, label } = STATUS[c.status];
  return (
    <li className="flex gap-3 py-3">
      <Icon aria-hidden className={cn("mt-0.5 size-5 shrink-0", cls)} />
      <span className="sr-only">{label}:</span>
      <div className="min-w-0">
        <p className="font-medium text-ink">{pretty(c.name)}</p>
        {c.value && <p className="mt-0.5 break-words text-sm text-ink-50">{c.value}</p>}
        {c.note && <p className="mt-1 text-[0.9375rem] leading-6 text-ink-68">{c.note}</p>}
      </div>
    </li>
  );
}

function ScoreBar({ label, score, max = 100 }: { label: string; score: number; max?: number }) {
  const pct = max ? Math.round((score / max) * 100) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-ink-68">{label}</span>
        <span className="font-mono text-ink-50 tabular-nums">
          {score}/{max}
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink-10">
        <div className="h-full rounded-full transition-[width] duration-700 ease-[var(--ease-out-quart)]" style={{ width: `${pct}%`, background: scoreColor(pct) }} />
      </div>
    </div>
  );
}

export function AuditResults({ result, name }: { result: AuditResult; name: string }) {
  const first = name.trim().split(" ")[0];
  const counts = { high: 0, medium: 0, low: 0 };
  for (const i of result.issues) counts[i.severity]++;
  const when = new Date(result.checkedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <section id="audit-results" aria-labelledby="audit-results-title" className="scroll-mt-28 pb-20 md:pb-28">
      <div className="container-x space-y-10 md:space-y-14">
        {/* Summary */}
        <div className="rounded-[var(--r-panel)] border border-ink-10 bg-white p-6 shadow-md md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12">
            <div className="mx-auto">
              <ScoreRing score={result.score} size={200} stroke={16}>
                <div className="text-center">
                  <div className="font-display text-[3.5rem] font-bold leading-none tracking-[-0.04em] text-ink tabular-nums">{result.score}</div>
                  <div className="eyebrow mt-1 text-[0.75rem]">out of 100</div>
                </div>
              </ScoreRing>
            </div>
            <div className="min-w-0">
              <p className="eyebrow">Free audit · {when}</p>
              <h2 id="audit-results-title" className="mt-2 text-balance font-display text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[2.5rem]">
                {first ? `${first}, here's your audit for ` : "Your audit for "}
                <span className="break-words text-accent-strong">{result.host}</span>
              </h2>
              <p className="mt-3 max-w-[40rem] text-ink-68">
                Overall grade <strong className="text-ink">{result.grade || "n/a"}</strong>. {scoreLabel(result.score)}.{" "}
                {result.issues.length ? `We found ${result.issues.length} ${result.issues.length === 1 ? "issue" : "issues"} worth fixing, listed by priority below.` : "No major issues found on this page."}
              </p>
              <dl className="mt-6 grid max-w-[34rem] grid-cols-3 gap-3 text-center sm:text-left">
                {[
                  ["High", counts.high, "bg-danger-bg/70 text-danger-fg"],
                  ["Medium", counts.medium, "bg-warn-bg/80 text-warn-fg"],
                  ["Low", counts.low, "bg-success-bg/70 text-success-fg"],
                ].map(([k, v, tone]) => (
                  <div key={String(k)} className={cn("rounded-xl px-3 py-3 sm:px-4", String(tone))}>
                    <dt className="eyebrow text-[0.6875rem] !text-current opacity-80">{k} priority</dt>
                    <dd className="font-display text-2xl font-bold tabular-nums text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Category scores */}
        <div>
          <h2 className="font-display text-[1.75rem] font-bold tracking-[-0.02em] text-ink md:text-[2.25rem]">Score by area</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.categories.map((c) => (
              <li key={c.key} className="rounded-2xl border border-ink-10 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-ink">{c.label}</h3>
                  <span className="font-display text-2xl font-bold tabular-nums" style={{ color: scoreColor(c.score) }}>
                    {c.score}
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-10">
                  <div className="h-full rounded-full transition-[width] duration-700 ease-[var(--ease-out-quart)]" style={{ width: `${c.score}%`, background: scoreColor(c.score) }} />
                </div>
                <p className="mt-2 text-sm text-ink-50">{scoreLabel(c.score)}</p>
              </li>
            ))}
            {result.ai && (
              <li className="rounded-2xl border border-accent/30 bg-accent-soft/40 p-5 shadow-xs sm:col-span-2 lg:col-span-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-ink">AI search readiness</h3>
                  <span className="font-display text-2xl font-bold tabular-nums" style={{ color: scoreColor(result.ai.score) }}>
                    {result.ai.score}
                  </span>
                </div>
                <div className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                  {result.ai.categories.map((a) => (
                    <ScoreBar key={a.key} label={a.label} score={a.score} max={a.max} />
                  ))}
                </div>
              </li>
            )}
          </ul>
        </div>

        {/* Issues */}
        {result.issues.length > 0 && (
          <div>
            <h2 className="font-display text-[1.75rem] font-bold tracking-[-0.02em] text-ink md:text-[2.25rem]">Fix these first</h2>
            <p className="mt-2 text-ink-68">Ordered by how much they hold your page back.</p>
            <ol className="mt-6 space-y-3">
              {result.issues.map((i, n) => (
                <li key={`${i.issue}-${n}`} className="flex gap-4 rounded-2xl border border-ink-10 bg-white p-5 shadow-xs md:p-6">
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-semibold text-white">
                    {n + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-bold leading-snug text-ink">{i.issue}</h3>
                      <span className={cn("rounded-xs px-2 py-0.5 font-mono text-[11px] font-medium uppercase leading-[18px] tracking-[0.04em]", SEVERITY[i.severity].cls)}>{SEVERITY[i.severity].label}</span>
                      {i.owner && <span className="rounded-xs bg-[var(--yellow)] px-2 py-0.5 font-mono text-[11px] font-medium uppercase leading-[18px] tracking-[0.04em] text-ink">Fix by: {OWNER[i.owner]}</span>}
                    </div>
                    {i.plain && <p className="mt-2 text-[0.9375rem] leading-6 text-ink-68">{i.plain}</p>}
                    {i.fix && (
                      <p className="mt-2 text-[0.9375rem] leading-6 text-ink">
                        <span className="font-semibold">How to fix: </span>
                        {i.fix}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Checks */}
        <div>
          <h2 className="font-display text-[1.75rem] font-bold tracking-[-0.02em] text-ink md:text-[2.25rem]">What we checked</h2>
          <div className="mt-6 space-y-3">
            {result.categories.map((c, idx) => (
              <details key={c.key} open={idx === 0} className="group rounded-2xl border border-ink-10 bg-white shadow-xs">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-lg font-bold text-ink">{c.label}</span>
                  <span className="flex items-center gap-3 text-sm text-ink-50">
                    <span className="tabular-nums">{c.checks.length} checks</span>
                    <ArrowRight aria-hidden className="size-4 rotate-90 transition-transform duration-200 group-open:-rotate-90" />
                  </span>
                </summary>
                <ul className="divide-y divide-ink-05 border-t border-ink-05 px-5 md:px-6">
                  {c.checks.map((k) => (
                    <CheckRow key={k.name} c={k} />
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="on-dark rounded-[var(--r-panel)] bg-panel-navy px-6 py-12 text-center text-white md:px-12 md:py-16">
          <p className="eyebrow">This is a one-page scan</p>
          <h2 className="mx-auto mt-3 max-w-[34rem] text-balance font-display text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] md:text-[2.75rem]">Want us to audit the whole store and fix it?</h2>
          <p className="lead mx-auto mt-4 max-w-[38rem]">We crawl every collection and product, size each fix by revenue impact and give you a plan your team can ship.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={bookCallHref} variant="primary" size="lg" arrow>
              Book a strategy call
            </Button>
            <Button href="/e-commerce-seo-checklists" variant="ghost-dark" size="lg">
              Use the SEO checklist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
