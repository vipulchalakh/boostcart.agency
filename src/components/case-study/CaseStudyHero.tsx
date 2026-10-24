import { ChevronRight } from "lucide-react";
import { AppLink } from "@/components/ui/AppLink";
import { CountUp } from "@/components/ui/CountUp";
import { SanityImage, type SanityImg } from "@/components/blog-post/SanityImage";
import { CaseStudyBackdrop } from "./CaseStudyBackdrop";
import { PlatformLogo } from "./PlatformLogo";

type Props = {
  title: string;
  clientName: string;
  platform: string;
  industry: string;
  organicRevenueGrowth: number;
  organicTrafficGrowth: number;
  timelineMonths: number;
  coverImage: SanityImg | null;
};

function Metric({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-ink-10 bg-white p-4 shadow-xs md:p-5">
      <p className="eyebrow text-[0.625rem] leading-4 md:text-xs">{label}</p>
      <p className="mt-2 font-display text-[1.75rem] font-bold leading-none tracking-[-0.03em] text-ink md:mt-3 md:text-[2.5rem]">{children}</p>
    </div>
  );
}

export function CaseStudyHero({ title, clientName, platform, industry, organicRevenueGrowth, organicTrafficGrowth, timelineMonths, coverImage }: Props) {
  return (
    <header className="relative isolate pb-12 pt-28 md:pb-16 md:pt-32 lg:pt-36">
      <CaseStudyBackdrop />
      <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-20">
        <div className="hero-fade min-w-0">
          <nav aria-label="Breadcrumb">
            <ol className="eyebrow flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <li className="flex items-center gap-1.5">
                <AppLink href="/" className="transition-colors hover:text-ink">
                  Home
                </AppLink>
                <ChevronRight aria-hidden className="size-3.5 text-ink-32" />
              </li>
              <li className="flex items-center gap-1.5">
                <AppLink href="/case-studies" className="transition-colors hover:text-ink">
                  Case studies
                </AppLink>
                <ChevronRight aria-hidden className="size-3.5 text-ink-32" />
              </li>
              <li>
                <span aria-current="page" className="text-ink">
                  {clientName}
                </span>
              </li>
            </ol>
          </nav>

          <p className="eyebrow mt-6 inline-flex items-center gap-2 rounded-full border border-ink-10 bg-white/80 px-3 py-1.5 text-xs text-ink backdrop-blur">
            <PlatformLogo platform={platform} size={16} />
            <span aria-hidden className="text-ink-32">/</span>
            {industry}
          </p>

          <h1 className="mt-5 text-pretty font-display text-[2.125rem] font-bold leading-[1.06] tracking-[-0.025em] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">{title}</h1>

          <dl className="mt-8 grid grid-cols-3 gap-2.5 md:gap-3">
            <Metric label="Organic revenue growth">
              <span className="sr-only">Organic revenue growth: </span>
              <CountUp value={organicRevenueGrowth} prefix="+" suffix="%" />
            </Metric>
            <Metric label="Organic traffic growth">
              <span className="sr-only">Organic traffic growth: </span>
              <CountUp value={organicTrafficGrowth} prefix="+" suffix="%" />
            </Metric>
            <Metric label="Timeline">
              <span className="sr-only">Timeline: </span>
              <CountUp value={timelineMonths} />
              <span className="ml-1 text-sm font-semibold tracking-normal text-ink-68 md:text-lg">{timelineMonths === 1 ? "month" : "months"}</span>
            </Metric>
          </dl>
        </div>

        {coverImage?.asset ? (
          <div className="hero-fade relative min-w-0" style={{ ["--d" as string]: "120ms" }}>
            <span aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgb(223_55_167/.18),transparent)]" />
            <figure className="overflow-hidden rounded-2xl border border-ink-10 bg-white shadow-lg">
              <div aria-hidden className="flex items-center gap-1.5 border-b border-ink-05 bg-ink-02 px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-ink-10" />
                <span className="size-2.5 rounded-full bg-ink-10" />
                <span className="size-2.5 rounded-full bg-ink-10" />
                <span className="eyebrow ml-3 truncate text-[0.625rem]">{clientName} / organic performance</span>
              </div>
              <SanityImage image={coverImage} width={1400} priority sizes="(min-width: 1024px) 640px, 100vw" className="h-auto w-full" />
            </figure>
          </div>
        ) : null}
      </div>
    </header>
  );
}
