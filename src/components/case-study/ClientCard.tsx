import { ArrowUpRight } from "lucide-react";
import { SanityImage, type SanityImg } from "@/components/blog-post/SanityImage";
import { hostname } from "./format";

type Props = {
  name: string;
  logo: SanityImg | null;
  description: string | null;
  industry: string | null;
  website: string | null;
};

export function ClientCard({ name, logo, description, industry, website }: Props) {
  return (
    <section aria-labelledby="client-title" className="rounded-2xl border border-ink-10 bg-white p-6 shadow-xs">
      <h2 id="client-title" className="eyebrow mb-5 text-ink">
        About the client
      </h2>

      <div className="flex items-center gap-3">
        {/* Logos are shown in grey whatever their colours, so every client looks consistent and quiet. */}
        {logo?.asset ? <SanityImage image={{ ...logo, alt: logo.alt || `${name} logo` }} width={240} sizes="88px" className="h-6 w-auto max-w-[5.5rem] shrink-0 object-contain grayscale opacity-60" /> : null}
        <p className="font-display text-xl font-bold leading-tight tracking-[-0.015em] text-ink">{name}</p>
      </div>

      {description && <p className="mt-4 line-clamp-2 text-[0.9375rem] leading-6 text-ink-68">{description}</p>}

      <dl className="mt-5 divide-y divide-ink-05 border-t border-ink-05 text-sm">
        {industry && (
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="text-ink-50">Industry</dt>
            <dd className="text-right font-medium text-ink">{industry}</dd>
          </div>
        )}
        {website && (
          <div className="flex items-center justify-between gap-4 py-3 pb-0">
            <dt className="text-ink-50">Website</dt>
            <dd className="min-w-0 text-right">
              <a href={website} target="_blank" rel="nofollow noopener noreferrer" className="group inline-flex max-w-full items-center gap-1 font-medium text-ink underline decoration-ink-20 underline-offset-4 transition-colors hover:text-accent-strong hover:decoration-accent">
                <span className="truncate">{hostname(website)}</span>
                <ArrowUpRight aria-hidden className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </dd>
          </div>
        )}
      </dl>
    </section>
  );
}
