import { caseStudies, type CaseStudy } from "@content/data";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import { MarqueeLoop } from "@/components/ui/MarqueeLoop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** Generic browser mock (HTML only) until real store screenshots are supplied. */
function BrowserMock({ backdrop }: { backdrop: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg" style={{ background: backdrop }}>
      <div className="absolute inset-x-6 top-6 bottom-0 overflow-hidden rounded-t-md bg-white shadow-lg transition-transform duration-[var(--dur-med)] ease-[var(--ease-out-quart)] group-hover:scale-[1.03]">
        <div className="flex h-6 items-center gap-1 border-b border-ink-05 px-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-ink-10" />
          ))}
          <span className="ml-2 h-2.5 w-24 rounded-full bg-ink-05" />
        </div>
        <div className="p-3">
          <div className="h-16 rounded-sm" style={{ background: backdrop, opacity: 0.85 }} />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <div className="aspect-square rounded-sm bg-ink-05" />
                <div className="mt-1.5 h-2 w-4/5 rounded-full bg-ink-10" />
                <div className="mt-1 h-2 w-1/2 rounded-full bg-ink-05" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseCard({ c }: { c: CaseStudy }) {
  return (
    <article className="group spotlight relative flex h-full flex-col rounded-[24px] border border-ink-05 bg-ink-02 p-2 shadow-[0_0_0_4px_var(--ink-02)] transition-transform duration-[var(--dur-med)] ease-[var(--ease-out-quart)] hover:-translate-y-1.5">
      <BrowserMock backdrop={c.backdrop} />
      <div className="relative mt-2 flex-1 rounded-lg bg-white p-4">
        <h3 className="font-display text-lg font-bold tracking-[-0.03em]">{c.client}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
          <p className="font-mono text-[11px] uppercase leading-[18px] tracking-[0.04em] text-ink-68">
            {c.platform} · {c.industry}
          </p>
          <span className="inline-flex items-center rounded-xs bg-accent-soft px-2 py-0.5 font-mono text-[11px] font-medium uppercase leading-[18px] tracking-[0.04em] text-accent-strong">
            {c.result} organic revenue
          </span>
        </div>
      </div>
      <AppLink href={`/case-studies/${c.slug}`} aria-label={`Read the ${c.client} case study`} className="absolute inset-0 rounded-[24px]" />
    </article>
  );
}

export function ResultsShowcase() {
  return (
    <section aria-labelledby="results-title" className="pb-16 pt-4 lg:pb-24">
      <div className="container-x">
        <Reveal>
          <div className="text-center md:-mt-20"><Eyebrow>Case studies</Eyebrow></div>
          <h2 id="results-title" className="h2 mx-auto mt-4 max-w-[720px] text-center">
            Real stores, real organic growth
          </h2>
          <p className="lead mx-auto mb-10 mt-4 max-w-[620px] text-center md:mb-12">
            See how e-commerce brands turned search visibility into measurable revenue.
          </p>
        </Reveal>
      </div>

      {/* One slow auto-sliding row; pauses on hover/focus, static under reduced motion. */}
      <MarqueeLoop className="px-1 py-4" duration="100s" label="Case studies">
        <ul className="flex shrink-0 gap-6 pr-6">
          {caseStudies.map((c) => (
            <li key={c.slug} className="w-[300px] shrink-0 sm:w-[380px] lg:w-[440px]">
              <CaseCard c={c} />
            </li>
          ))}
        </ul>
      </MarqueeLoop>

      <div className="container-x mt-8 flex justify-center">
        <Button href="/case-studies" variant="secondary" size="md" arrow>
          Read more success stories
        </Button>
      </div>
    </section>
  );
}
