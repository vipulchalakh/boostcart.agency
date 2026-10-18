import type { ReactNode } from "react";
import { Check, Minus, X } from "lucide-react";
import { criteria as homeCriteria, type Cell, type Criterion, type Verdict } from "@content/data";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";


const verdictUi: Record<Verdict, { icon: typeof Check; cls: string; sr: string }> = {
  yes: { icon: Check, cls: "bg-success-dot text-white", sr: "Yes: " },
  partial: { icon: Minus, cls: "bg-warn-bg text-warn-fg shadow-[inset_0_0_0_1px_rgb(102_102_10/.25)]", sr: "Partly: " },
  no: { icon: X, cls: "bg-danger-dot text-white", sr: "No: " },
};

function Verdict({ cell, strong }: { cell: Cell; strong?: boolean }) {
  const { icon: Icon, cls, sr } = verdictUi[cell.verdict];
  return (
    <div className="flex items-start gap-3">
      <span aria-hidden className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", cls)}>
        <Icon className="size-3" strokeWidth={3} />
      </span>
      <span className={cn("text-sm leading-[21px]", strong ? "font-medium text-ink" : "text-ink-68")}>
        <span className="sr-only">{sr}</span>
        {cell.text}
      </span>
    </div>
  );
}

type Col = { key: "boost" | "inHouse" | "agency"; title: string; sub: string };
const homeCols: Col[] = [
  { key: "boost", title: "BoostCart", sub: "E-commerce SEO team" },
  { key: "inHouse", title: "In-house team", sub: "Hire and build it yourself" },
  { key: "agency", title: "Other agencies", sub: "Typical generalist SEO agency" },
];

function Column({ col, i, criteria }: { col: Col; i: number; criteria: Criterion[] }) {
  const N = criteria.length;
  const hero = col.key === "boost";
  return (
    <Reveal
      delay={i * 80}
      className={cn("relative isolate grid gap-0 overflow-hidden rounded-[24px] border max-lg:mt-0 lg:row-span-[var(--rows)] lg:grid-rows-subgrid", hero ? "border-accent bg-white shadow-[0_0_0_1px_var(--accent),0_32px_64px_-28px_rgb(223_55_167/.4)]" : "border-ink-05 bg-ink-02")}
      style={{ ["--rows" as string]: N + 1 }}
    >
      {hero && (
        <>
          <span aria-hidden className="dots pointer-events-none absolute inset-0 -z-10 opacity-50" />
          <span aria-hidden className="pointer-events-none absolute -left-24 -top-24 -z-10 size-[380px] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--yellow)_34%,transparent),transparent)]" />
          <span aria-hidden className="pointer-events-none absolute -bottom-28 -right-20 -z-10 size-[380px] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_16%,transparent),transparent)]" />
        </>
      )}
      <header className="flex flex-col justify-center gap-1 px-6 py-6">
        <div className="flex items-center gap-2.5">
          {hero && <LogoMark size={28} />}
          <h3 className="font-display text-xl font-bold tracking-[-0.03em]">{col.title}</h3>
          {hero && <Tag tone="accent" className="ml-auto">Best fit</Tag>}
        </div>
        <p className="text-sm text-ink-68">{col.sub}</p>
      </header>
      {criteria.map((c) => (
        <div key={c.label} className="flex flex-col justify-center border-t border-ink-05 px-6 py-4">
          <p className="mb-2 font-mono text-[11px] uppercase leading-[18px] tracking-[0.04em] text-ink-68 lg:hidden">{c.label}</p>
          <Verdict cell={c[col.key]} strong={hero} />
        </div>
      ))}
    </Reveal>
  );
}

type Props = {
  criteria?: Criterion[];
  cols?: Col[];
  eyebrow?: string;
  title?: ReactNode;
  lead?: string;
  footnote?: string;
  ctaLabel?: string;
};

export function Compare({
  criteria = homeCriteria,
  cols = homeCols,
  eyebrow = "How we compare",
  title = "Why brands choose BoostCart",
  lead = "See how we stack up against building an in\u2011house team or hiring a typical agency.",
  footnote = "Based on typical in-house and agency setups. Every business is different, and your free audit shows what fits yours.",
  ctaLabel = "See how we\u2019d work for your store",
}: Props = {}) {
  const N = criteria.length;
  const rows = `repeat(${N + 1}, auto)`;
  return (
    <section aria-labelledby="compare-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="compare-title" className="h2 mt-4">{title}</h2>
          <p className="lead mt-4">{lead}</p>
        </Reveal>

        <div
          className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-6 lg:mt-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-5 lg:gap-y-0 lg:[grid-template-rows:var(--rows)]"
          style={{ ["--rows" as string]: rows }}
        >
          {/* Criteria labels (desktop only; on mobile each cell carries its own label) */}
          <div className="hidden lg:row-span-[var(--n)] lg:grid lg:grid-rows-subgrid" style={{ ["--n" as string]: N + 1 }} aria-hidden>
            <div />
            {criteria.map((c) => (
              <div key={c.label} className="flex items-center border-t border-ink-05 py-4 pr-2 text-sm font-medium leading-[21px]">
                {c.label}
              </div>
            ))}
          </div>
          {cols.map((col, i) => (
            <Column key={col.key} col={col} i={i} criteria={criteria} />
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-[560px] text-sm text-ink-68">{footnote}</p>
          <Button href="/free-audit" arrow>{ctaLabel}</Button>
        </Reveal>
      </div>
    </section>
  );
}
