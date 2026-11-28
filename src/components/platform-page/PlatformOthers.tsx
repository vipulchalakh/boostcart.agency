import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { platformPages, platforms, type PlatformPage } from "@content/data";
import { AppLink } from "@/components/ui/AppLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { icons } from "./icons";

/** Links to the other platform pages, for stores comparing or moving platforms. */
export function PlatformOthers({ page }: { page: PlatformPage }) {
  const others = platformPages.filter((p) => p.slug !== page.slug);
  return (
    <section aria-labelledby="others-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[960px] text-center">
          <Eyebrow>Other platforms</Eyebrow>
          <h2 id="others-title" className="h2 mt-4">Moving platforms, or running more than one?</h2>
          <p className="lead mx-auto mt-4 max-w-[760px]">We work across every major ecommerce platform, and we plan migrations between them so rankings carry over.</p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {others.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <Reveal as="li" key={p.slug} delay={i * 60}>
                <article className="group spotlight lift relative isolate flex h-full flex-col overflow-hidden rounded-xl border border-ink-05 bg-white p-6 shadow-xs" style={{ ["--brand" as string]: p.brand } as CSSProperties}>
                  <span aria-hidden className="pointer-events-none absolute -right-14 -top-16 -z-10 size-44 rounded-full opacity-40 blur-3xl transition-opacity duration-[var(--dur-med)] group-hover:opacity-80" style={{ background: "color-mix(in srgb, var(--brand) 32%, transparent)" }} />
                  <span className="grid size-14 place-items-center rounded-xl bg-white shadow-md ring-1 ring-ink-05">
                    {p.logo ? (
                      <Image src={p.logo.src} alt="" width={p.logo.w} height={p.logo.h} unoptimized className={p.logo.w > 100 ? "h-auto w-[44px] object-contain" : "h-8 w-10 object-contain"} />
                    ) : (
                      <Icon aria-hidden className="size-7 text-ink" />
                    )}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-[-0.03em]">{p.name === "Headless" ? "Headless SEO" : `${p.name} SEO`}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-[1.6] text-ink-68">{platforms.find((x) => x.slug === p.slug)?.line}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong">
                    Explore <ArrowRight aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
                  </span>
                  <AppLink href={`/platforms/${p.slug}`} aria-label={`${p.title}: learn more`} className="absolute inset-0 rounded-xl" />
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
