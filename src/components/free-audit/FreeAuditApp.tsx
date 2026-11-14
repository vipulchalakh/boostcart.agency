"use client";

import { ArrowRight, Check, ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { industries } from "@content/data";
import { BlogIndexBackdrop } from "@/components/blog-index/BlogIndexBackdrop";
import { PLATFORM_OPTIONS, type AuditRequest, type AuditResponse, type AuditResult } from "@/lib/audit-types";
import { cn } from "@/lib/cn";
import { AuditResults, ScoreRing, scoreLabel } from "./AuditResults";

type Phase = "idle" | "loading" | "done";
type Errors = Partial<Record<keyof AuditRequest, string>>;

const INDUSTRY_OPTIONS = [...industries.map((i) => i.label), "Other"];
const STEPS = ["Fetching your homepage", "Checking technical SEO", "Reviewing titles, content and links", "Scoring AI search readiness", "Writing your fix list"];
/** Keep the preparing state on screen long enough to read, even when the API answers fast. */
const MIN_PREPARING_MS = 2600;

const field =
  "w-full rounded-lg bg-white px-4 py-3 text-base text-ink shadow-xs ring-1 ring-ink-10 transition-[box-shadow] duration-200 placeholder:text-ink-32 hover:ring-ink-20 focus:outline-none focus:ring-2 focus:ring-accent aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-danger-dot";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-[13px] text-danger-fg">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({ id, name, value, onChange, placeholder, options, error }: { id: string; name: string; value: string; onChange: (v: string) => void; placeholder: string; options: readonly string[]; error?: string }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(field, "cursor-pointer appearance-none pr-10", !value && "text-ink-50")}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-50" />
    </div>
  );
}

export function FreeAuditApp({ intro }: { intro: ReactNode }) {
  const uid = useId();
  const [phase, setPhase] = useState<Phase>("idle");
  const [values, setValues] = useState<AuditRequest>({ name: "", url: "", platform: "", industry: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const set = (k: keyof AuditRequest) => (v: string) => setValues((s) => ({ ...s, [k]: v }));

  // Walk through the preparing steps while the audit runs.
  useEffect(() => {
    if (phase !== "loading") return;
    const t = window.setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 1500);
    return () => window.clearInterval(t);
  }, [phase]);

  // Bring the results into view once they arrive.
  useEffect(() => {
    if (phase !== "done") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => document.getElementById("audit-results")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }), 150);
    return () => window.clearTimeout(t);
  }, [phase]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const company = String(new FormData(e.currentTarget).get("company") ?? ""); // honeypot
    const v = { name: values.name.trim(), url: values.url.trim(), platform: values.platform, industry: values.industry };
    const next: Errors = {};
    if (v.name.length < 2) next.name = "Enter your full name.";
    if (!/^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(v.url)) next.url = "Enter your store address, like yourstore.com.";
    if (!v.platform) next.platform = "Choose your platform.";
    if (!v.industry) next.industry = "Choose your industry.";
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) {
      (e.currentTarget.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus();
      return;
    }

    setStep(0);
    setPhase("loading");
    try {
      const [res] = await Promise.all([
        fetch("/api/free-audit", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...v, company }) }),
        new Promise((r) => setTimeout(r, MIN_PREPARING_MS)),
      ]);
      const data = (await res.json().catch(() => null)) as AuditResponse | null;
      if (data?.ok) {
        setResult(data.result);
        setPhase("done");
        return;
      }
      if (data && !data.ok && data.field) setErrors({ [data.field]: data.error });
      setFormError(data && !data.ok ? data.error : "Something went wrong. Please try again.");
    } catch {
      setFormError("We couldn't reach the audit service. Check your connection and try again.");
    }
    setPhase("idle");
  }

  function reset() {
    setResult(null);
    setErrors({});
    setFormError("");
    setPhase("idle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <header className="relative isolate -mt-12 pb-12 pt-[10rem] md:pb-16 md:pt-[11rem] lg:pt-[12rem]">
        <BlogIndexBackdrop />
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-14 xl:gap-20">
            <div className="hero-fade min-w-0">{intro}</div>

            <div className="hero-fade min-w-0 rounded-[var(--r-panel)] border border-ink-10 bg-white/90 shadow-md backdrop-blur" style={{ "--d": "120ms" } as React.CSSProperties}>
              {phase === "idle" && (
                <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 p-6 sm:p-8">
                  <div>
                    <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">Get your free audit</h2>
                    <p className="mt-1 text-[0.9375rem] text-ink-68">Takes about 10 seconds. No credit card.</p>
                  </div>
                  {formError && !Object.keys(errors).length && (
                    <p role="alert" className="rounded-lg bg-danger-bg px-4 py-3 text-sm text-danger-fg">
                      {formError}
                    </p>
                  )}
                  {/* Honeypot: hidden from people, tempting to bots */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Company
                      <input name="company" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                  <Field id={`${uid}-name`} label="Full name" error={errors.name}>
                    <input id={`${uid}-name`} name="name" autoComplete="name" placeholder="Jane Smith" value={values.name} onChange={(e) => set("name")(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} className={field} />
                  </Field>
                  <Field id={`${uid}-url`} label="Website URL" error={errors.url}>
                    <input id={`${uid}-url`} name="url" inputMode="url" autoComplete="url" placeholder="https://yourstore.com" value={values.url} onChange={(e) => set("url")(e.target.value)} aria-invalid={!!errors.url} aria-describedby={errors.url ? `${uid}-url-err` : undefined} className={field} />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id={`${uid}-platform`} label="Platform" error={errors.platform}>
                      <Select id={`${uid}-platform`} name="platform" value={values.platform} onChange={set("platform")} placeholder="Select platform" options={PLATFORM_OPTIONS} error={errors.platform} />
                    </Field>
                    <Field id={`${uid}-industry`} label="Industry" error={errors.industry}>
                      <Select id={`${uid}-industry`} name="industry" value={values.industry} onChange={set("industry")} placeholder="Select industry" options={INDUSTRY_OPTIONS} error={errors.industry} />
                    </Field>
                  </div>
                  <button
                    type="submit"
                    className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-accent px-6 py-3.5 text-xl font-semibold tracking-[-0.01em] text-white [box-shadow:var(--shadow-xs),inset_0_0_0_1px_rgb(2_6_23/.15)] transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-px hover:shadow-md hover:brightness-[1.06] active:translate-y-0 motion-reduce:transform-none"
                  >
                    <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent motion-safe:animate-[sheen_6s_ease-in-out_infinite]" />
                    <span className="relative">Get Audit</span>
                    <ArrowRight aria-hidden className="relative size-[1.1em] transition-transform duration-200 group-hover/btn:translate-x-[3px]" />
                  </button>
                </form>
              )}

              {phase === "loading" && (
                <div role="status" aria-live="polite" className="grid gap-6 p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong">
                      <Loader2 aria-hidden className="size-6 motion-safe:animate-spin" />
                    </span>
                    <div>
                      <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">Preparing your audit…</h2>
                      <p className="text-[0.9375rem] text-ink-68">
                        Scanning <span className="font-medium text-ink">{values.url.replace(/^https?:\/\//i, "").replace(/\/$/, "")}</span>. This usually takes a few seconds.
                      </p>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-ink-10">
                    <div className="h-full rounded-full bg-accent transition-[width] duration-[1400ms] ease-out" style={{ width: `${((step + 1) / STEPS.length) * 92}%` }} />
                  </div>
                  <ul className="space-y-2.5">
                    {STEPS.map((s, i) => (
                      <li key={s} className={cn("flex items-center gap-3 text-[0.9375rem] transition-colors duration-300", i < step ? "text-ink-68" : i === step ? "font-medium text-ink" : "text-ink-32")}>
                        <span className={cn("grid size-5 shrink-0 place-items-center rounded-full transition-colors duration-300", i < step ? "bg-success-dot text-white" : i === step ? "bg-accent text-white" : "bg-ink-10")}>
                          {i < step ? <Check aria-hidden className="size-3" strokeWidth={3} /> : i === step ? <span className="size-1.5 rounded-full bg-white motion-safe:animate-pulse-dot" /> : null}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {phase === "done" && result && (
                <div className="grid gap-6 p-6 text-center sm:p-8">
                  <div className="mx-auto">
                    <ScoreRing score={result.score} size={168} stroke={14}>
                      <div className="text-center">
                        <div className="font-display text-[3.25rem] font-bold leading-none tracking-[-0.04em] text-ink tabular-nums">{result.score}</div>
                        <div className="eyebrow mt-1 text-[0.6875rem]">out of 100</div>
                      </div>
                    </ScoreRing>
                  </div>
                  <div role="status">
                    <p className="eyebrow">Audit ready</p>
                    <h2 className="mt-1 break-words font-display text-2xl font-bold tracking-[-0.02em] text-ink">{result.host}</h2>
                    <p className="mt-1 text-ink-68">
                      Grade {result.grade || "n/a"} · {scoreLabel(result.score)} · {result.issues.length} {result.issues.length === 1 ? "issue" : "issues"} found
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <a href="#audit-results" className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-white [box-shadow:var(--shadow-xs),inset_0_0_0_1px_rgb(2_6_23/.15)] transition-[filter] hover:brightness-[1.06]">
                      View results
                      <ArrowRight aria-hidden className="size-4 rotate-90" />
                    </a>
                    <button type="button" onClick={reset} className="inline-flex items-center justify-center rounded-md px-6 py-2.5 text-sm font-medium text-ink [box-shadow:var(--ring-inset)] transition-colors hover:bg-ink-05">
                      Audit another site
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {phase === "done" && result && <AuditResults result={result} name={values.name} />}
    </div>
  );
}
