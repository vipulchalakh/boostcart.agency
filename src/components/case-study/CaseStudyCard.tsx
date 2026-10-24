import { ArrowUpRight } from "lucide-react";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import { SanityImage, type SanityImg } from "@/components/blog-post/SanityImage";
import { formatPercent } from "./format";
import { PlatformLogo } from "./PlatformLogo";

export type CaseStudyCardData = {
  _id: string;
  title: string | null;
  slug: string | null;
  clientName: string | null;
  platform: string | null;
  industry: string | null;
  summary: string | null;
  organicRevenueGrowth: number | null;
  organicTrafficGrowth: number | null;
  timelineMonths: number | null;
  coverImage: SanityImg | null;
};

export function CaseStudyCard({ study }: { study: CaseStudyCardData }) {
  return (
    <AppLink
      href={`/case-studies/${study.slug}`}
      className="group spotlight lift relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-10 bg-white shadow-xs transition-colors duration-200 hover:border-accent/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-ink-05 bg-ink-05">
        <SanityImage
          image={study.coverImage}
          width={900}
          ratio={16 / 10}
          sizes="(min-width: 1024px) 420px, (min-width: 768px) 33vw, 100vw"
          className="size-full object-cover object-top transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-quart)] group-hover:scale-[1.04]"
        />
        {study.platform && <span className="absolute left-4 top-4 inline-flex h-8 items-center rounded-full bg-white/95 px-3 text-[0.6875rem] text-ink shadow-xs backdrop-blur"><PlatformLogo platform={study.platform} size={16} /></span>}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-xs">
          {study.clientName}
          {study.industry ? <span className="text-ink-32"> / </span> : null}
          {study.industry}
        </p>
        <h3 className="mt-3 text-balance font-display text-[1.25rem] font-bold leading-[1.2] tracking-[-0.015em] text-ink transition-colors duration-200 group-hover:text-accent-strong">{study.title}</h3>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          {study.organicRevenueGrowth != null && (
            <p>
              <span className="block font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">{formatPercent(study.organicRevenueGrowth)}</span>
              <span className="mt-1 block text-sm text-ink-50">organic revenue</span>
            </p>
          )}
          <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full border border-ink-10 bg-white text-ink-50 transition-[background-color,color,border-color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </AppLink>
  );
}

/** Three related case studies in a clean grid. */
export function RelatedCaseStudies({ studies }: { studies: CaseStudyCardData[] }) {
  const items = studies.filter((s) => s.slug && s.title).slice(0, 3);
  if (!items.length) return null;
  return (
    <section aria-labelledby="related-cases-title" className="border-t border-ink-10 pt-14 md:pt-16">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <p className="eyebrow">More results</p>
          <h2 id="related-cases-title" className="mt-3 text-balance font-display text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[2.25rem]">
            More stores we&rsquo;ve grown
          </h2>
        </div>
        <Button href="/case-studies" variant="secondary" arrow className="max-sm:hidden">
          View all case studies
        </Button>
      </div>
      <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
        {items.map((s) => (
          <li key={s._id}>
            <CaseStudyCard study={s} />
          </li>
        ))}
      </ul>
      <div className="mt-8 sm:hidden">
        <Button href="/case-studies" variant="secondary" arrow className="w-full">
          View all case studies
        </Button>
      </div>
    </section>
  );
}
