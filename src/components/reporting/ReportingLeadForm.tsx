"use client";

import { ArrowRight, Check } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";

type Errors = Partial<Record<"name" | "email" | "url", string>>;

const field =
  "w-full rounded-lg bg-white px-4 py-3 text-base text-ink shadow-xs ring-1 ring-ink-10 transition-[box-shadow] duration-200 placeholder:text-ink-32 hover:ring-ink-20 focus:outline-none focus:ring-2 focus:ring-accent aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-danger-dot";

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {hint && <span className="font-mono text-[11px] font-normal uppercase tracking-[0.04em] text-ink-50">{hint}</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-[13px] text-danger-fg">{error}</p>}
    </div>
  );
}

export function ReportingLeadForm() {
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const url = String(f.get("url") ?? "").trim();
    const next: Errors = {};
    if (!name) next.name = "Tell us who we're talking to.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid work email.";
    if (!/^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(url)) next.url = "Enter your store address, like yourstore.com.";
    setErrors(next);
    if (Object.keys(next).length) {
      (e.currentTarget.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus();
      return;
    }
    setState("sending");
    // TODO-REAL: POST { name, email, url } to the CRM or form endpoint. Nothing is sent yet.
    await new Promise((r) => setTimeout(r, 700));
    setState("done");
  }

  if (state === "done") {
    return (
      <div role="status" className="grid min-h-[320px] place-content-center justify-items-center gap-3 px-6 py-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-success-bg text-success-fg ring-8 ring-success-bg/40">
          <Check aria-hidden className="size-7" />
        </span>
        <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">Request received</h3>
        <p className="max-w-[320px] text-ink-68">Thanks. We&rsquo;ll review your store and reply by email with what we find.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 p-6 sm:p-10">
      <div className="grid gap-5">
        <Field id={`${uid}-name`} label="Your Name" error={errors.name}>
          <input id={`${uid}-name`} name="name" autoComplete="name" placeholder="Full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} className={field} />
        </Field>
        <Field id={`${uid}-email`} label="Work Email" error={errors.email}>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" placeholder="name@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-email-err` : undefined} className={field} />
        </Field>
      </div>
      <Field id={`${uid}-url`} label="Website URL" error={errors.url}>
        <input id={`${uid}-url`} name="url" inputMode="url" autoComplete="url" placeholder="https://yourstore.com" aria-invalid={!!errors.url} aria-describedby={errors.url ? `${uid}-url-err` : undefined} className={field} />
      </Field>

      <button
        type="submit"
        disabled={state === "sending"}
        className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-accent px-6 py-3.5 text-xl font-semibold tracking-[-0.01em] text-white [box-shadow:var(--shadow-xs),inset_0_0_0_1px_rgb(2_6_23/.15)] transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-px hover:shadow-md hover:brightness-[1.06] active:translate-y-0 disabled:opacity-70 motion-reduce:transform-none"
      >
        <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent motion-safe:animate-[sheen_6s_ease-in-out_infinite]" />
        <span className="relative">{state === "sending" ? "Sending…" : "Request Free Audit"}</span>
        <ArrowRight aria-hidden className="relative size-[1.1em] transition-transform duration-200 group-hover/btn:translate-x-[3px]" />
      </button>
    </form>
  );
}
