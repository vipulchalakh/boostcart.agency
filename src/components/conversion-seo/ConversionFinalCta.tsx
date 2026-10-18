import { auditHref, bookCallHref } from "@content/data";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CtaVisual } from "./CtaVisual";

/** Closing call to action: roughly 60% copy, 40% visual on desktop, stacked on mobile. */
export function ConversionFinalCta() {
  return (
    <section aria-labelledby="cta-title" className="px-2 pb-2 pt-[var(--section-y)]">
      <div className="on-dark relative isolate overflow-hidden rounded-panel bg-panel-navy px-5 py-14 text-white md:px-10 lg:px-16 lg:py-20">
        {/* Premium dark backdrop: dot grid, soft pink colour drops and a faint top sheen */}
        <div aria-hidden className="absolute inset-0 -z-10 [background:radial-gradient(rgb(255_255_255/.14)_1px,transparent_1.3px)_0_0/22px_22px] [mask-image:radial-gradient(ellipse_80%_90%_at_60%_50%,#000_25%,transparent_85%)]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(255_255_255/.04),transparent_35%)]" />
        <div aria-hidden className="pointer-events-none absolute -right-20 top-1/2 -z-10 h-[560px] w-[620px] -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(223_55_167/.38),transparent)] blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-32 -z-10 h-[420px] w-[520px] bg-[radial-gradient(closest-side,rgb(223_55_167/.2),transparent)] blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute bottom-[-180px] left-[30%] -z-10 h-[360px] w-[520px] bg-[radial-gradient(closest-side,rgb(223_55_167/.16),transparent)] blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute right-[22%] top-[-120px] -z-10 size-[300px] rounded-full bg-[radial-gradient(closest-side,rgb(249_249_6/.07),transparent)] blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-panel ring-1 ring-inset ring-white/10" />

        <div className="mx-auto grid max-w-[var(--container)] grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
          <Reveal className="max-w-[640px]">
            <Eyebrow>Start with where visitors drop</Eyebrow>
            <h2 id="cta-title" className="h2 mt-4 !text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] text-white">Turn organic visits into orders</h2>
            <p className="lead mt-5 max-w-[560px] !text-[clamp(1.125rem,1.05rem+0.4vw,1.375rem)] [color:rgb(255_255_255/.7)]">
              Tell us your platform and your top landing pages. We&rsquo;ll point out where organic visitors are likely leaving before they buy.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={auditHref} size="lg" arrow>Get a conversion review</Button>
              <Button href={bookCallHref} variant="ghost-dark" size="lg">Book a conversion SEO call</Button>
            </div>
          </Reveal>

          <div aria-hidden className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
            <CtaVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
