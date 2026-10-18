import type { ReactNode } from "react";
import { Check, ShieldCheck, Slash, X } from "lucide-react";
import { goodFit, notFit, type FitItem } from "@content/data";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

function Column({ kind, items, delay }: { kind: "good" | "bad"; items: FitItem[]; delay: number }) {
  const good = kind === "good";
  return (
    <Reveal delay={delay} className="h-full">
      <article className="relative isolate flex h-full flex-col overflow-hidden rounded-[24px] border border-ink-05 bg-white shadow-xs">
        {good && (
          <>
            <span aria-hidden className="dots pointer-events-none absolute inset-0 -z-10 opacity-60" />
            <span aria-hidden className="pointer-events-none absolute -left-24 -top-24 -z-10 size-[420px] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--yellow)_32%,transparent),transparent)]" />
            <span aria-hidden className="pointer-events-none absolute -bottom-28 -right-20 -z-10 size-[420px] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_16%,transparent),transparent)]" />
          </>
        )}
        <header className={cn("relative isolate flex items-center gap-4 border-b border-ink-05 p-6", good ? "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--yellow)_16%,white),white)]" : "bg-ink-02")}>
          <span
            aria-hidden
            className="absolute -z-10 size-64 -right-16 -top-24"
            style={{ background: `radial-gradient(closest-side, color-mix(in srgb, var(${good ? "--accent" : "--ink"}) ${good ? 16 : 7}%, transparent), transparent)` }}
          />
          <span aria-hidden className={cn("grid size-14 shrink-0 place-items-center rounded-lg shadow-md", good ? "bg-white text-success-fg" : "bg-white text-ink-50")}>
            {good ? <ShieldCheck className="size-7" strokeWidth={1.75} /> : <Slash className="size-7" strokeWidth={1.75} />}
          </span>
          <div>
            <p className="eyebrow text-xs">{good ? "A great fit" : "Probably not a fit"}</p>
            <h3 className="font-display text-2xl font-bold tracking-[-0.03em]">{good ? "Who it\u2019s for" : "Who it\u2019s not for"}</h3>
          </div>
        </header>

        <Reveal bare className="flex-1">
          <ul className="divide-y divide-ink-05 px-6">
            {items.map((it, i) => (
              <li key={it.title} className="si flex items-start gap-4 py-5" style={{ ["--d" as string]: `${i * 60}ms` }}>
                <span aria-hidden className={cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-white", good ? "bg-success-dot" : "bg-danger-dot")}>
                  {good ? <Check className="size-3.5" strokeWidth={3} /> : <X className="size-3.5" strokeWidth={3} />}
                </span>
                <div>
                  <p className="text-base font-medium leading-6 tracking-[-0.02em]">
                    <span className="sr-only">{good ? "Good fit: " : "Not a fit: "}</span>
                    {it.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-[21px] text-ink-68">{it.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </article>
    </Reveal>
  );
}

type Props = {
  eyebrow?: string;
  title?: ReactNode;
  lead?: string;
  good?: FitItem[];
  notFit?: FitItem[];
  prompt?: string;
  ctaLabel?: string;
};

export function WhoItsFor({
  eyebrow = "Honest fit check",
  title = <>Who is e&#8209;commerce SEO for?</>,
  lead = "SEO is a long game. Here\u2019s who gets the most from it, and who should wait.",
  good = goodFit,
  notFit: bad = notFit,
  prompt = "Not sure which side you\u2019re on? We\u2019ll tell you honestly.",
  ctaLabel = "Check if we\u2019re a fit",
}: Props = {}) {
  return (
    <section id="fit" aria-labelledby="fit-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="fit-title" className="h2 mt-4">{title}</h2>
          <p className="lead mt-4">{lead}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2">
          <Column kind="good" items={good} delay={0} />
          <Column kind="bad" items={bad} delay={80} />
        </div>

        <Reveal className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-base text-ink-68">{prompt}</p>
          <Button href="/free-audit" arrow>{ctaLabel}</Button>
        </Reveal>
      </div>
    </section>
  );
}
