import type { LegalSection } from "@content/data";

/** A long-form legal page: sticky contents on large screens, numbered sections beside it. */
export function LegalDocument({ sections, children }: { sections: LegalSection[]; children?: React.ReactNode }) {
  return (
    <div className="container-x pb-[var(--section-y)]">
      <div className="mx-auto grid max-w-[1040px] gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">On this page</p>
          <ol className="mt-4 grid gap-1.5 border-l border-ink-05 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1 pl-4 leading-5 text-ink-68 transition-colors hover:border-ink hover:text-ink">
                  <span className="mr-1.5 font-mono text-[11px] text-ink-50">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="min-w-0">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28 border-t border-ink-05 py-8 first:border-t-0 first:pt-0">
              <h2 id={`${s.id}-h`} className="font-display text-2xl font-bold leading-tight tracking-[-0.02em]">
                <span className="mr-2 font-mono text-base font-medium text-ink-32">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <div className="mt-4 grid gap-4 text-base leading-[1.7] text-ink-68">
                {s.body.map((b, j) =>
                  typeof b === "string" ? (
                    <p key={j}>{b}</p>
                  ) : (
                    <ul key={j} className="grid gap-2.5 pl-5 [&>li]:list-disc [&>li]:pl-1 [&>li::marker]:text-ink-32">
                      {b.list.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}
          {children}
        </article>
      </div>
    </div>
  );
}
