import { caseStudies as sampleCaseStudies } from "@content/data";
import { PlatformLogo } from "@/components/case-study/PlatformLogo";
import { SanityImage, type SanityImg } from "@/components/blog-post/SanityImage";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import { MarqueeLoop } from "@/components/ui/MarqueeLoop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { sanityFetch } from "@/sanity/lib/client";
import { CASE_STUDIES_QUERY } from "@/sanity/lib/queries";

type Card = { slug: string; client: string; platform: string; industry: string; result: string | null; traffic: string | null; months: string | null; backdrop: string; image: SanityImg | null };

/** Soft card backdrops behind each browser frame, cycled by position. */
const backdrops = ["#2b2118", "#e8742c", "#d9dce3", "#3b4a6b", "#1f6f5c", "#b8456b", "#c9a227"];

/** Published case studies from the CMS; falls back to the sample cards until the first one is published. */
async function getCards(): Promise<Card[]> {
  const studies = (await sanityFetch({ query: CASE_STUDIES_QUERY, tags: ["caseStudy"] })).filter((s) => s.slug && s.title);
  if (!studies.length) return sampleCaseStudies.map((c) => ({ slug: c.slug, client: c.client, platform: c.platform, industry: c.industry, result: c.result, traffic: null, months: null, backdrop: c.backdrop, image: null }));
  return studies.map((s, i) => ({
    slug: s.slug as string,
    client: s.clientName ?? (s.title as string),
    platform: s.platform ?? "",
    industry: s.industry ?? "",
    result: s.organicRevenueGrowth != null ? `+${Math.round(s.organicRevenueGrowth)}%` : null,
    traffic: s.organicTrafficGrowth != null ? `+${Math.round(s.organicTrafficGrowth)}%` : null,
    months: s.timelineMonths != null ? `${s.timelineMonths} ${s.timelineMonths === 1 ? "Month" : "Months"}` : null,
    backdrop: backdrops[i % backdrops.length],
    image: s.coverImage,
  }));
}

/** Generic browser mock (HTML only) until real store screenshots are supplied. */
function BrowserMock({ backdrop, image }: { backdrop: string; image: SanityImg | null }) {
  const real = Boolean(image?.asset);
  return (
    <div className={`relative overflow-hidden rounded-lg ${real ? "px-6 pt-6" : "aspect-[4/3]"}`} style={{ background: backdrop }}>
      <div className={`flex flex-col overflow-hidden rounded-t-md bg-white shadow-lg transition-transform ${real ? "relative" : "absolute inset-x-6 top-6 bottom-0"} duration-[var(--dur-med)] ease-[var(--ease-out-quart)] group-hover:scale-[1.03]`}>
        <div className="flex h-6 shrink-0 items-center gap-1 border-b border-ink-05 px-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1.5 rounded-full bg-ink-10" />
          ))}
          <span className="ml-2 h-2.5 w-24 rounded-full bg-ink-05" />
        </div>
        {real ? (
          /* Shown at its natural proportions, never cropped. The frame grows to fit. */
          <SanityImage image={image} width={1000} sizes="(min-width: 1024px) 400px, 340px" className="block h-auto w-full" />
        ) : (
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
        )}
      </div>
    </div>
  );
}

function CaseCard({ c }: { c: Card }) {
  return (
    <article className="group spotlight relative flex h-full flex-col rounded-[24px] border border-ink-05 bg-ink-02 p-2 shadow-[0_0_0_4px_var(--ink-02)] transition-transform duration-[var(--dur-med)] ease-[var(--ease-out-quart)] hover:-translate-y-1.5">
      <BrowserMock backdrop={c.backdrop} image={c.image} />
      <div className="relative mt-2 flex flex-1 flex-col rounded-lg bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="flex min-w-0 items-center gap-2.5 font-display text-lg font-bold tracking-[-0.03em]">
            <PlatformLogo platform={c.platform} size={18} />
            <span className="truncate">{c.client}</span>
          </h3>
          {c.industry && <p className="shrink-0 font-mono text-[11px] uppercase leading-[18px] tracking-[0.04em] text-ink-68">{c.industry}</p>}
        </div>
        {(c.traffic || c.result || c.months) && (
          <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-ink-05 pt-3">
            {[
              { label: "Organic Traffic", value: c.traffic, growth: true },
              { label: "Organic Revenue", value: c.result, growth: true },
              { label: "Duration", value: c.months, growth: false },
            ].map(({ label, value, growth }) => (
              <div key={label} className="min-w-0">
                <dt className="font-mono text-[10px] uppercase leading-4 tracking-[0.04em] text-ink-50">{label}</dt>
                <dd className={`mt-0.5 font-display text-[15px] font-bold leading-5 tracking-[-0.02em] ${growth ? "text-success-fg" : "text-ink"}`}>{value ?? "—"}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <AppLink href={`/case-studies/${c.slug}`} aria-label={`Read the ${c.client} case study`} className="absolute inset-0 rounded-[24px]" />
    </article>
  );
}

export async function ResultsShowcase() {
  const cards = await getCards();
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
          {cards.map((c) => (
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
