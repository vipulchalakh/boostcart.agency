import type { ReactNode } from "react";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { auditHref } from "@content/data";
import { reviewSummary } from "@content/data";
import { Stars } from "./ProofBand";
import { AvatarStack } from "@/components/ui/Avatar";
import { Annotation } from "@/components/ui/Annotation";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { Reveal } from "@/components/ui/Reveal";

type HeroProps = {
  eyebrow?: string;
  /** Replaces the eyebrow with a breadcrumb trail; the last item is the current page. */
  breadcrumb?: { name: string; href: string }[];
  lines?: [string, string];
  /** Make the large two-line headline the page's h1 (the eyebrow becomes a plain paragraph). */
  bigIsH1?: boolean;
  lead?: ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  note?: string;
  /** Split layout: text and buttons on the left, `visual` on the right. */
  visual?: ReactNode;
  /** Replaces the logo marquee and annotations under the call to action. */
  below?: ReactNode;
};

const homeLead = (
  <>
    Everything you need to rank, from{" "}
    <AppLink href="/services/technical-seo" className="u-em">technical SEO</AppLink> and{" "}
    <AppLink href="/services/category-product-pages" className="u-em">category pages</AppLink> to{" "}
    <AppLink href="/services/content" className="u-em">content</AppLink> and{" "}
    <AppLink href="/services/link-building" className="u-em">links</AppLink>.
  </>
);

const homeBelow = (
  <>
    <div className="hero-fade mt-16" style={{ ["--d" as string]: "560ms" }}>
      <LogoMarquee />
    </div>
    <Reveal bare className="relative mx-auto mt-4 hidden h-28 max-w-[1100px] md:block">
      <Annotation arrow="down" rotate={-6} className="absolute left-[2%] top-2">see what we&rsquo;ve grown</Annotation>
      <Annotation arrow="down-left" arrowSide="before" rotate={5} className="absolute right-[2%] top-2">real stores, real revenue</Annotation>
    </Reveal>
  </>
);

export function Hero({
  eyebrow = "E-commerce SEO agency",
  breadcrumb,
  lines = ["Grow Your Store\u2019s", "Organic Revenue"],
  bigIsH1 = false,
  lead = homeLead,
  primaryLabel = "Get a free audit",
  secondaryLabel = "Is BoostCart for me?",
  secondaryHref = "#fit",
  note = "No long contracts \u00b7 Monthly reporting \u00b7 North America focus",
  visual,
  below = visual ? null : homeBelow,
}: HeroProps = {}) {
  const split = Boolean(visual);
  const BigTag = bigIsH1 ? "h1" : "p";
  return (
    <section aria-labelledby="hero-title" className="pb-8 pt-28 md:pt-32 lg:pt-[128px]">
      <div className={cn("container-x", split ? "grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10 xl:gap-16" : "text-center")}>
        <div className={split ? "max-w-[620px]" : "mx-auto max-w-[960px]"}>
          <div className="hero-fade" style={{ ["--d" as string]: "0ms" }}>
            {breadcrumb ? (
              <nav aria-label="Breadcrumb">
                <ol className="eyebrow flex flex-wrap items-center gap-x-1.5 gap-y-1">
                  {breadcrumb.map((c, i) => {
                    const last = i === breadcrumb.length - 1;
                    return (
                      <li key={c.href} className="flex items-center gap-1.5">
                        {i > 0 && <ChevronRight aria-hidden className="size-3.5 text-ink-32" />}
                        {last ? (
                          <span aria-current="page" className="text-ink">{c.name}</span>
                        ) : (
                          <AppLink href={c.href} className="transition-colors hover:text-ink">{c.name}</AppLink>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            ) : (
            <Eyebrow
              as={bigIsH1 ? "p" : "h1"}
              id={bigIsH1 ? undefined : "hero-title"}
              icon={
                <span aria-hidden className="grid size-5 place-items-center rounded-full bg-ink text-white">
                  <ShoppingCart className="size-3" />
                </span>
              }
            >
              {eyebrow}
            </Eyebrow>
            )}
          </div>

          <BigTag id={bigIsH1 ? "hero-title" : undefined} className={cn("h1 mt-6", split && "!text-[clamp(2.5rem,1.4rem+3vw,3.5rem)]")}>
            <span className="hero-line">
              <span style={{ ["--d" as string]: "90ms" }}>{lines[0]}</span>
            </span>
            <span className="hero-line">
              <span style={{ ["--d" as string]: "180ms" }}>{lines[1]}</span>
            </span>
          </BigTag>

          <p className={cn("lead hero-fade mt-6", split ? "max-w-[600px] !text-[clamp(1.125rem,1rem+0.55vw,1.375rem)] [text-wrap:pretty]" : "mx-auto max-w-[820px]")} style={{ ["--d" as string]: "300ms" }}>
            {lead}
          </p>

          <div className={cn("hero-fade mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center", !split && "justify-center")} style={{ ["--d" as string]: "420ms" }}>
            <Button href={auditHref} size="lg" arrow sheen>
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="secondary" size="lg">
              {secondaryLabel}
            </Button>
          </div>

          {split && (
            <div className="hero-fade mt-8 flex flex-wrap items-center gap-x-4 gap-y-3" style={{ ["--d" as string]: "460ms" }}>
              {/* TODO-REAL: swap initials for approved client logos or photos. */}
              <AvatarStack people={["A", "B", "C", "D", "E"]} size={36} />
              <span aria-hidden className="hidden h-9 w-px bg-ink-10 sm:block" />
              <div className="flex flex-col gap-1">
                <Stars rating={reviewSummary.rating} size={16} />
                <p className="text-sm leading-[21px] text-ink-68">
                  <strong className="font-display font-bold tracking-[-0.02em] text-ink">{reviewSummary.rating.toFixed(1)}/5</strong> · from {reviewSummary.count} store owners and growth teams
                </p>
              </div>
            </div>
          )}

          {/* TODO-REAL: owner must confirm each claim in this line before launch. */}
          <p className="hero-fade mt-6 font-mono text-xs uppercase tracking-[0.04em] text-ink-50" style={{ ["--d" as string]: "500ms" }}>
            {note}
          </p>
        </div>

        {visual}
        {below}
      </div>
    </section>
  );
}
