import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Box, Code2, Hexagon, MessageSquare, ShoppingBag } from "lucide-react";
import { platforms, type Platform } from "@content/data";
import { AppLink } from "@/components/ui/AppLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const icons = { bag: ShoppingBag, chat: MessageSquare, hex: Hexagon, box: Box, code: Code2 };

/** Original, decorative admin-dashboard mock in the platform's accent color (no third-party marks, no numbers). */
function DashboardMock({ tall }: { tall?: boolean }) {
  return (
    <div aria-hidden className="mx-auto w-[86%] overflow-hidden rounded-t-lg bg-white shadow-lg ring-1 ring-ink-05 transition-transform duration-[var(--dur-med)] ease-[var(--ease-out-quart)] group-hover:-translate-y-2">
      <div className="flex h-7 items-center gap-1.5 border-b border-ink-05 px-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 rounded-full bg-ink-10" />
        ))}
        <span className="ml-2 h-2 w-20 rounded-full" style={{ background: "color-mix(in srgb, var(--brand) 22%, white)" }} />
      </div>
      <div className="grid grid-cols-[44px_1fr] gap-3 p-3">
        <div className="grid content-start gap-2">
          <span className="h-5 rounded-sm" style={{ background: "var(--brand)" }} />
          {[0, 1, 2, tall ? 3 : null].map((i) => i !== null && <span key={i} className="h-2.5 rounded-full bg-ink-05" />)}
        </div>
        <div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md bg-ink-02 p-2 shadow-[inset_0_0_0_1px_var(--ink-05)]">
                <span className="block h-1.5 w-2/3 rounded-full bg-ink-10" />
                <span className="mt-2 block h-3 rounded-sm" style={{ width: `${60 + i * 12}%`, background: "color-mix(in srgb, var(--brand) 35%, white)" }} />
              </div>
            ))}
          </div>
          <svg viewBox="0 0 200 60" className={cn("mt-3 w-full", tall ? "h-20" : "h-14")} fill="none" preserveAspectRatio="none">
            <path d="M0 52C30 50 45 40 70 36S115 30 135 20 175 10 200 4V60H0Z" fill="var(--brand)" fillOpacity=".12" />
            <path d="M0 52C30 50 45 40 70 36S115 30 135 20 175 10 200 4" stroke="var(--brand)" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function PlatformCard({ p, className, tall }: { p: Platform; className?: string; tall?: boolean }) {
  const Icon = icons[p.icon];
  return (
    <article
      className={cn("group spotlight lift relative flex h-full flex-col overflow-hidden rounded-xl border border-ink-05 bg-white shadow-xs", className)}
      style={{ ["--brand" as string]: p.brand } as CSSProperties}
    >
      <div className={cn("relative flex items-end overflow-hidden pt-8", tall ? "h-[260px]" : "h-[220px]")} style={{ background: "color-mix(in srgb, var(--brand) 9%, white)" }}>
        <div aria-hidden className="absolute -right-12 -top-16 size-56 rounded-full opacity-60 blur-3xl transition-opacity duration-[var(--dur-med)] group-hover:opacity-100" style={{ background: "color-mix(in srgb, var(--brand) 40%, transparent)" }} />
        <div aria-hidden className="dots absolute inset-0 opacity-60" />
        <div className="relative w-full">
          <DashboardMock tall={tall} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-md text-white shadow-xs" style={{ background: "var(--brand)" }}>
            <Icon className="size-[18px]" />
          </span>
          <h3 className="font-display text-xl font-bold tracking-[-0.03em]">{p.title}</h3>
        </div>
        <p className="mt-3 text-sm leading-[21px] text-ink-68">{p.line}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent-strong">
          Explore {p.title}
          <ArrowRight aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
        </span>
      </div>
      <AppLink href={p.href} aria-label={`${p.title}: learn more`} className="absolute inset-0 rounded-xl" />
    </article>
  );
}

type Props = { items?: Platform[]; eyebrow?: string; title?: ReactNode; lead?: string; linkLabel?: string };

export function PlatformsSection({
  items = platforms,
  eyebrow = "Platforms we cover",
  title = <>SEO built for your e‑commerce platform</>,
  lead = "Every platform has its own quirks. We know them well, from theme code and plugins to URLs, faceted navigation and rendering.",
  linkLabel = "View all platforms",
}: Props = {}) {
  return (
    <section aria-labelledby="platforms-title" className="section-y">
      <div className="container-x">
        <Reveal className="mx-auto max-w-[720px] text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="platforms-title" className="h2 mt-4">{title}</h2>
          <p className="lead mt-4">{lead}</p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-6">
          {items.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 80} className={cn(i < 2 ? "lg:col-span-3" : "lg:col-span-2", i === items.length - 1 && "md:col-span-2")}>
              <PlatformCard p={p} tall={i < 2} />
            </Reveal>
          ))}
        </ul>

        <p className="mt-10 text-center">
          <AppLink href="/platforms/shopify" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong underline-offset-4 hover:underline">
            {linkLabel} <ArrowRight aria-hidden className="size-3.5" />
          </AppLink>
        </p>
      </div>
    </section>
  );
}
