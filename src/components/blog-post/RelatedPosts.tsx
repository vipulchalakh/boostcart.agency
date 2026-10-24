import { ArrowUpRight } from "lucide-react";
import { AppLink } from "@/components/ui/AppLink";
import { Button } from "@/components/ui/Button";
import { formatDate } from "./headings";

export type RelatedPost = {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  readTime: number | null;
  publishedAt: string | null;
  category: { title: string | null } | null;
};

/** Three typographic cards (no images) under the article, plus a link to the full blog. */
export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  const items = posts.filter((p) => p.slug && p.title).slice(0, 3);
  if (!items.length) return null;
  return (
    <section aria-labelledby="related-title" className="border-t border-ink-10 pt-14 md:pt-16">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div>
          <p className="eyebrow">Keep reading</p>
          <h2 id="related-title" className="mt-3 text-balance font-display text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[2.25rem]">
            More guides for your store
          </h2>
        </div>
        <Button href="/blog" variant="secondary" arrow className="max-sm:hidden">
          View more blogs
        </Button>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((p, i) => (
          <li key={p._id} className="flex">
            <AppLink
              href={`/blog/${p.slug}`}
              className="group spotlight lift relative isolate flex w-full flex-col overflow-hidden rounded-2xl border border-ink-10 bg-white p-6 shadow-xs transition-colors duration-200 hover:border-accent/40 md:p-7"
            >
              {/* Soft brand glow and oversized index number give the card depth without an image */}
              <span aria-hidden className="absolute -right-12 -top-12 -z-10 size-44 rounded-full bg-accent-soft opacity-70 blur-2xl transition-opacity duration-[var(--dur-med)] group-hover:opacity-100" />
              <span aria-hidden className="pointer-events-none absolute -bottom-6 right-4 -z-10 select-none font-display text-[7.5rem] font-bold leading-none tracking-[-0.04em] text-ink-05">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex items-center justify-between gap-3">
                {p.category?.title ? (
                  <span className="eyebrow rounded-full bg-accent-soft px-3 py-1 text-[0.6875rem] text-accent-strong">{p.category.title}</span>
                ) : (
                  <span />
                )}
                <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full border border-ink-10 bg-white text-ink-50 transition-[background-color,color,border-color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>

              <h3 className="mt-6 text-balance font-display text-[1.375rem] font-bold leading-[1.2] tracking-[-0.015em] text-ink transition-colors duration-200 group-hover:text-accent-strong">{p.title}</h3>
              {p.excerpt && <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-6 text-ink-68">{p.excerpt}</p>}

              <div className="mt-auto flex items-center gap-3 pt-6 text-sm text-ink-50">
                {p.publishedAt && <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>}
                {p.publishedAt && p.readTime ? <span aria-hidden className="size-1 rounded-full bg-ink-20" /> : null}
                {p.readTime ? <span>{p.readTime} min read</span> : null}
              </div>
            </AppLink>
          </li>
        ))}
      </ul>

      <div className="mt-8 sm:hidden">
        <Button href="/blog" variant="secondary" arrow className="w-full">
          View more blogs
        </Button>
      </div>
    </section>
  );
}

