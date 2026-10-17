import { ShoppingCart } from "lucide-react";
import { auditHref } from "@content/data";
import { Annotation } from "@/components/ui/Annotation";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pb-8 pt-28 md:pt-32 lg:pt-[128px]">
      <div className="container-x text-center">
        <div className="mx-auto max-w-[960px]">
          <div className="hero-fade" style={{ ["--d" as string]: "0ms" }}>
            <Eyebrow
              as="h1"
              id="hero-title"
              icon={
                <span aria-hidden className="grid size-5 place-items-center rounded-full bg-ink text-white">
                  <ShoppingCart className="size-3" />
                </span>
              }
            >
              E-commerce SEO agency
            </Eyebrow>
          </div>

          <p className="h1 mt-6">
            <span className="hero-line">
              <span style={{ ["--d" as string]: "90ms" }}>Grow Your Store&rsquo;s</span>
            </span>
            <span className="hero-line">
              <span style={{ ["--d" as string]: "180ms" }}>Organic Revenue</span>
            </span>
          </p>

          <p className="lead hero-fade mx-auto mt-6 max-w-[820px]" style={{ ["--d" as string]: "300ms" }}>
            Everything you need to rank, from{" "}
            <AppLink href="/services/technical-seo" className="u-em">
              technical SEO
            </AppLink>{" "}
            and{" "}
            <AppLink href="/services/category-product-pages" className="u-em">
              category pages
            </AppLink>{" "}
            to{" "}
            <AppLink href="/services/content" className="u-em">
              content
            </AppLink>{" "}
            and{" "}
            <AppLink href="/services/link-building" className="u-em">
              links
            </AppLink>
            .
          </p>

          <div className="hero-fade mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center" style={{ ["--d" as string]: "420ms" }}>
            <Button href={auditHref} size="lg" arrow sheen>
              Get a free audit
            </Button>
            <Button href="#fit" variant="secondary" size="lg">
              Is BoostCart for me?
            </Button>
          </div>

          {/* TODO-REAL: owner must confirm each claim in this line before launch. */}
          <p className="hero-fade mt-6 font-mono text-xs uppercase tracking-[0.04em] text-ink-50" style={{ ["--d" as string]: "500ms" }}>
            No long contracts · Monthly reporting · North America focus
          </p>
        </div>

        <div className="hero-fade mt-16" style={{ ["--d" as string]: "560ms" }}>
          <LogoMarquee />
        </div>

        <Reveal bare className="relative mx-auto mt-4 hidden h-28 max-w-[1100px] md:block">
          <Annotation arrow="down" rotate={-6} className="absolute left-[2%] top-2">
            see what we&rsquo;ve grown
          </Annotation>
          <Annotation arrow="down-left" arrowSide="before" rotate={5} className="absolute right-[2%] top-2">
            real stores, real revenue
          </Annotation>
        </Reveal>
      </div>
    </section>
  );
}
