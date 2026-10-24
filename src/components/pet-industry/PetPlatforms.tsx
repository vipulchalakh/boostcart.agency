import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, Code2 } from "lucide-react";
import { petPlatforms } from "@content/data";
import { AppLink } from "@/components/ui/AppLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PlatformCarousel } from "./PlatformCarousel";

/** Official brand marks live in /public/logos. Headless storefronts have no single brand, so they get a neutral code mark. */
const logos: Record<string, string | undefined> = {
  shopify: "/logos/shopify.svg",
  woocommerce: "/logos/woocommerce.png",
  bigcommerce: "/logos/bigcommerce.svg",
  magento: "/logos/magento.svg",
};

/** Left-aligned header, then a swipeable row of platform cards with the brand logo, what we do and what we check. */
export function PetPlatforms() {
  return (
    <section aria-labelledby="platforms-title" className="section-y overflow-hidden">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[960px] text-center">
          <Eyebrow>Platforms we support</Eyebrow>
          <h2 id="platforms-title" className="h2 mt-4">Your platform, and the apps on it</h2>
          <p className="lead mx-auto mt-4 max-w-[760px]">Pet stores lean on subscription, review and filter apps. We check how each one affects the pages search engines see.</p>
        </Reveal>

        <div className="mt-12">
          <PlatformCarousel label="Platforms we support">
            {petPlatforms.map((p) => {
              const src = logos[p.slug];
              return (
                <li key={p.slug} className="w-[82%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  <article className="group spotlight lift relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-xl border border-ink-05 bg-white p-6 shadow-xs sm:p-7" style={{ ["--brand" as string]: p.brand } as CSSProperties}>
                    <span aria-hidden className="pointer-events-none absolute -right-16 -top-20 size-60 rounded-full opacity-50 blur-3xl transition-opacity duration-[var(--dur-med)] group-hover:opacity-90" style={{ background: "color-mix(in srgb, var(--brand) 30%, transparent)" }} />
                    <span className="relative grid size-20 place-items-center rounded-2xl bg-white shadow-md ring-1 ring-ink-05 transition-transform duration-[var(--dur-med)] ease-[var(--ease-out-quart)] group-hover:-translate-y-1">
                      {src ? <Image src={src} alt="" width={p.slug === "woocommerce" ? 554 : 56} height={p.slug === "woocommerce" ? 144 : 44} unoptimized className={p.slug === "woocommerce" ? "h-auto w-[60px] object-contain" : "h-11 w-14 object-contain"} /> : <Code2 aria-hidden className="size-9 text-ink" />}
                    </span>
                    <h3 className="relative mt-auto pt-12 font-display text-2xl font-bold tracking-[-0.03em]">{p.title}</h3>
                    <p className="relative mt-3 text-[15px] leading-[1.6] text-ink-68">{p.line}</p>
                    <p className="relative mt-6 font-mono text-[11px] uppercase tracking-[0.04em] text-ink-50">What we check</p>
                    <ul className="relative mt-2 flex flex-wrap gap-1.5">
                      {p.checks.map((c) => <li key={c} className="rounded-full bg-ink-02 px-2.5 py-1 text-xs text-ink-68 shadow-[inset_0_0_0_1px_var(--ink-05)]">{c}</li>)}
                    </ul>
                    <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong">
                      {p.slug === "headless" ? "Explore headless SEO" : `Explore ${p.title} SEO`}
                      <ArrowRight aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
                    </span>
                    <AppLink href={p.href} aria-label={`${p.title} SEO: learn more`} className="absolute inset-0 rounded-xl" />
                  </article>
                </li>
              );
            })}
          </PlatformCarousel>
        </div>

        <p className="mt-6 text-center">
          <AppLink href="/free-audit" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong underline-offset-4 hover:underline">
            Check my platform <ArrowRight aria-hidden className="size-3.5" />
          </AppLink>
        </p>
      </div>
    </section>
  );
}
