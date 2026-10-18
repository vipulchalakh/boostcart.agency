import Image from "next/image";
import { reviewSummary, testimonials, type Testimonial } from "@content/data";
import { Avatar } from "@/components/ui/Avatar";
import { MarqueeLoop } from "@/components/ui/MarqueeLoop";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** Real logo when supplied, otherwise a neutral placeholder mark (initial + company name). */
function BrandLogo({ t }: { t: Testimonial }) {
  if (t.logo) return <Image src={t.logo} alt={t.company} width={96} height={28} className="h-6 w-auto max-w-[96px] object-contain" />;
  return (
    <span role="img" aria-label={t.company} className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-ink-50">
      <span aria-hidden className="grid size-6 place-items-center rounded-md bg-ink-05 font-display text-xs font-bold text-ink-68">
        {t.company.replace("Sample Brand ", "").slice(0, 1) || t.company[0]}
      </span>
      <span aria-hidden className="font-display text-sm font-bold tracking-[-0.03em]">{t.company.replace("Sample ", "")}</span>
    </span>
  );
}

function Card({ t, i }: { t: Testimonial; i: number }) {
  return (
    <figure className="spotlight flex h-full flex-col rounded-xl border border-ink-05 bg-white p-6 shadow-xs">
      <blockquote className="flex-1 space-y-3 text-base leading-6">
        {t.lead && <p className="font-semibold">{t.lead}</p>}
        {t.quote.map((p) => (
          <p key={p} className="text-ink-68">
            {p}
          </p>
        ))}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar initials={t.name.split(" ").map((w) => w[0]).join("")} index={i} />
        <span className="min-w-0">
          <span className="block text-sm font-medium leading-[21px]">{t.name}</span>
          <span className="block truncate text-xs leading-[18px] text-ink-68">
            {t.role}
          </span>
        </span>
        <span className="ml-auto shrink-0 pl-2">
          <BrandLogo t={t} />
        </span>
      </figcaption>
    </figure>
  );
}

const starPath = "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z";

/** Five stars, filled to `rating / 5` (supports fractions like 4.9). */
export function Stars({ rating, size = 18 }: { rating: number; size?: number }) {
  const row = (fill: string) => (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={fill} aria-hidden>
          <path d={starPath} />
        </svg>
      ))}
    </span>
  );
  return (
    <span className="relative inline-flex" role="img" aria-label={`${rating} out of 5 stars`}>
      {row("var(--ink-10)")}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(rating / 5) * 100}%` }}>
        <span className="flex w-max">{row("var(--accent)")}</span>
      </span>
    </span>
  );
}

/** One slow auto-sliding row; pauses on hover/focus, scrollable (no motion) under reduced motion. */
function Row({ items }: { items: Testimonial[] }) {
  return (
    <MarqueeLoop className="px-1 py-2" duration="120s" label="Client testimonials">
      <ul className="flex shrink-0 gap-6 pr-6">
        {items.map((t, i) => (
          <li key={i} className="w-[300px] shrink-0 sm:w-[380px]">
            <Card t={t} i={i} />
          </li>
        ))}
      </ul>
    </MarqueeLoop>
  );
}

export function ProofBand() {
  return (
    <section aria-labelledby="proof-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Eyebrow>What clients say</Eyebrow>
          <h2 id="proof-title" className="h2 mt-4">Trusted by store owners and growth teams</h2>
          <p className="lead mt-4">Hear how e-commerce brands describe working with BoostCart, from the first audit to monthly results.</p>
        </Reveal>
      </div>

      <div className="mt-12">
        <Row items={testimonials} />
      </div>

      <Reveal className="container-x mt-10 flex justify-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-ink-05 bg-white py-2.5 pl-5 pr-6 shadow-xs">
          <Stars rating={reviewSummary.rating} />
          <span className="flex items-baseline gap-2 text-sm leading-[21px]">
            <strong className="font-display text-lg font-bold tracking-[-0.03em]">{reviewSummary.rating.toFixed(1)}</strong>
            <span className="text-ink-68">
              out of 5 · <span className="font-medium text-ink">{reviewSummary.count} client reviews</span>
            </span>
          </span>
        </div>
      </Reveal>
    </section>
  );
}
