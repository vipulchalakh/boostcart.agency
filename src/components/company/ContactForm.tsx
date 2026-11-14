"use client";

import { ArrowRight, Check } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { contactTopics } from "@content/data";
import { submitLead } from "@/lib/submit-lead";
import { AppLink } from "@/components/ui/AppLink";

type Errors = Partial<Record<"name" | "email" | "url" | "message", string>>;

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

/** Contact form: saved to the leads table (form "contact") through /api/leads. */
export function ContactForm() {
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [formError, setFormError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const url = String(f.get("url") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const next: Errors = {};
    if (!name) next.name = "Tell us who we're talking to.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (url && !/^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(url)) next.url = "Enter a web address like yourstore.com, or leave it blank.";
    if (message.length < 10) next.message = "Tell us a little about what you need (at least a sentence).";
    setErrors(next);
    if (Object.keys(next).length) {
      (e.currentTarget.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus();
      return;
    }
    setState("sending");
    setFormError("");
    const res = await submitLead({ form: "contact", name, email, url, message, topic: String(f.get("topic") ?? ""), company: String(f.get("company") ?? "") });
    if (!res.ok) {
      setFormError(res.error);
      setState("idle");
      return;
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <div role="status" className="grid min-h-[420px] place-content-center justify-items-center gap-3 px-6 py-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-success-bg text-success-fg ring-8 ring-success-bg/40">
          <Check aria-hidden className="size-7" />
        </span>
        <h2 className="font-display text-2xl font-bold tracking-[-0.02em]">Message received</h2>
        <p className="max-w-[340px] text-ink-68">Thanks for getting in touch. We&rsquo;ll read it and reply by email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Your name" error={errors.name}>
          <input id={`${uid}-name`} name="name" autoComplete="name" placeholder="Full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} className={field} />
        </Field>
        <Field id={`${uid}-email`} label="Email" error={errors.email}>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" placeholder="name@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-email-err` : undefined} className={field} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${uid}-url`} label="Website" hint="Optional" error={errors.url}>
          <input id={`${uid}-url`} name="url" inputMode="url" autoComplete="url" placeholder="https://yourstore.com" aria-invalid={!!errors.url} aria-describedby={errors.url ? `${uid}-url-err` : undefined} className={field} />
        </Field>
        <Field id={`${uid}-topic`} label="What do you need?" hint="Optional">
          <select id={`${uid}-topic`} name="topic" defaultValue="" className={field}>
            <option value="" disabled>Choose one</option>
            {contactTopics.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </div>
      <Field id={`${uid}-message`} label="Message" error={errors.message}>
        <textarea id={`${uid}-message`} name="message" rows={5} placeholder="Tell us about your store and what you'd like help with." aria-invalid={!!errors.message} aria-describedby={errors.message ? `${uid}-message-err` : undefined} className={`${field} resize-y`} />
      </Field>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {formError && <p role="alert" className="text-[13px] text-danger-fg">{formError}</p>}
      <button
        type="submit"
        disabled={state === "sending"}
        className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-accent px-6 py-3.5 text-xl font-semibold tracking-[-0.01em] text-white [box-shadow:var(--shadow-xs),inset_0_0_0_1px_rgb(2_6_23/.15)] transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-px hover:shadow-md hover:brightness-[1.06] active:translate-y-0 disabled:opacity-70 motion-reduce:transform-none"
      >
        <span className="relative">{state === "sending" ? "Sending…" : "Send message"}</span>
        <ArrowRight aria-hidden className="relative size-[1.1em] transition-transform duration-200 group-hover/btn:translate-x-[3px]" />
      </button>
      <p className="text-center text-[13px] text-ink-50">By sending this you agree to our <AppLink href="/privacy" className="underline underline-offset-4 hover:text-ink">privacy policy</AppLink>.</p>
    </form>
  );
}
