import type { CSSProperties } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { goodFit, notFit, type FitItem } from "@content/data";
import { AppLink } from "@/components/ui/AppLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/** A soft round colour wash, placed with the utility classes passed in. */
function Glow({ token, strength, className }: { token: string; strength: number; className: string }) {
  return <span aria-hidden className={cn("pointer-events-none absolute -z-10", className)} style={{ background: `radial-gradient(closest-side, color-mix(in srgb, var(${token}) ${strength}%, transparent), transparent)` }} />;
}

const rows = Math.max(goodFit.length, notFit.length);

function Column({ kind, items }: { kind: "good" | "bad"; items: FitItem[] }) {
  const good = kind === "good";
  return (
    // From tablet up both columns share the parent's rows, so each pair of items lines up.
    <div className={cn("relative isolate overflow-hidden md:grid md:grid-rows-subgrid md:[grid-row:span_var(--span)]", good ? "md:order-2" : "border-t border-ink-10 bg-ink-02 md:order-1 md:border-r md:border-t-0")}>
      {good ? (
        <>
          <span aria-hidden className="dots pointer-events-none absolute inset-0 -z-10 opacity-60" />
          <Glow token="--yellow" strength={32} className="-left-24 -top-24 size-[420px]" />
          <Glow token="--accent" strength={16} className="-bottom-28 -right-20 size-[420px]" />
          <Glow token="--accent" strength={16} className="-right-16 -top-24 size-64" />
        </>
      ) : (
        <Glow token="--ink" strength={7} className="-right-16 -top-24 size-64" />
      )}
      <h3 className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-ink-10 px-5 py-5 md:px-8", good && "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--yellow)_16%,transparent),transparent)]")}>
        <span aria-hidden className={cn("size-2.5 flex-none rounded-full", good ? "bg-success-dot shadow-[0_0_0_4px_var(--success-bg)]" : "bg-danger-dot shadow-[0_0_0_4px_var(--danger-bg)]")} />
        <span className={cn("font-display text-lg font-bold tracking-[-0.02em]", !good && "text-ink-68")}>{good ? "Who it’s for" : "Who it’s not for"}</span>
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium leading-none", good ? "bg-success-bg text-success-fg" : "bg-danger-bg text-danger-fg")}>
          {good ? "A great fit" : "Probably not a fit"}
        </span>
      </h3>
      <ul className="divide-y divide-ink-10 md:grid md:grid-rows-subgrid md:[grid-row:span_var(--rows)]">
        {items.map((it) => (
          <li key={it.title} className="flex items-start gap-4 px-5 py-5 md:px-8">
            <span aria-hidden className={cn("grid size-6 flex-none place-items-center rounded-full text-white", good ? "bg-success-dot" : "bg-danger-dot")}>
              {good ? <Check className="size-3.5" strokeWidth={3} /> : <X className="size-3.5" strokeWidth={3} />}
            </span>
            <div>
              <p className={cn("text-base leading-6 tracking-[-0.01em]", good ? "font-semibold text-ink" : "font-medium text-ink-68")}>{it.title}</p>
              <p className={cn("mt-1 text-sm leading-[21px]", good ? "text-ink-68" : "text-ink-50")}>{it.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Homepage fit check: one comparison table, "not for" on the left and "for" on the right. */
export function HomeWhoItsFor() {
  return (
    <section id="fit" aria-labelledby="fit-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Eyebrow>Built for online stores</Eyebrow>
          <h2 id="fit-title" className="h2 mt-4">Who is e&#8209;commerce SEO and AI SEO for?</h2>
          <p className="lead mt-4">We work with online stores that already sell and want organic revenue and AI visibility. Here is who we help most, and who is better served elsewhere.</p>
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-[24px] border border-ink-10 bg-white shadow-[var(--shadow-md)]">
          {/* The fit column comes first in the source, so phones show it first. */}
          <div className="md:grid md:grid-cols-2" style={{ "--rows": rows, "--span": rows + 1 } as CSSProperties}>
            <Column kind="good" items={goodFit} />
            <Column kind="bad" items={notFit} />
          </div>
          <div className="flex flex-col items-start justify-between gap-3 border-t border-ink-10 px-5 py-5 sm:flex-row sm:items-center md:px-8">
            <p className="text-sm text-ink-68">Not sure which side you&rsquo;re on? We&rsquo;ll tell you honestly.</p>
            <AppLink href="/free-audit" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong underline-offset-4 hover:underline">
              Check if we&rsquo;re a fit <ArrowRight aria-hidden className="size-4" />
            </AppLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
