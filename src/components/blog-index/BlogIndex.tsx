"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { BlogCard, FeaturedPost, type IndexPost } from "./BlogCard";

const PAGE_SIZE = 9;

/** Category filter, featured newest post and post grid. Filtering is instant (all posts are already on the page). */
export function BlogIndex({ posts }: { posts: IndexPost[] }) {
  const [category, setCategory] = useState("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const categories = useMemo(() => {
    const map = new Map<string, { slug: string; title: string; count: number }>();
    for (const p of posts) {
      const c = p.category;
      if (!c?.slug || !c.title) continue;
      map.set(c.slug, { slug: c.slug, title: c.title, count: (map.get(c.slug)?.count ?? 0) + 1 });
    }
    return [...map.values()].sort((a, b) => a.title.localeCompare(b.title));
  }, [posts]);

  const filtered = category === "all" ? posts : posts.filter((p) => p.category?.slug === category);
  const showFeatured = category === "all" && filtered.length > 1;
  const featured = showFeatured ? filtered[0] : null;
  const grid = showFeatured ? filtered.slice(1) : filtered;
  const shown = grid.slice(0, visible);

  function pick(slug: string) {
    setCategory(slug);
    setVisible(PAGE_SIZE);
  }

  if (!posts.length) {
    return (
      <div className="rounded-2xl border border-dashed border-ink-20 bg-ink-02 px-6 py-20 text-center">
        <p className="font-display text-2xl font-bold text-ink">New guides are on the way</p>
        <p className="mt-2 text-ink-68">We&rsquo;re writing our first e-commerce SEO guides. Check back soon.</p>
      </div>
    );
  }

  return (
    <div>
      {categories.length > 1 && (
        <div role="group" aria-label="Filter by category" className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {[{ slug: "all", title: "All", count: posts.length }, ...categories].map((c) => {
            const active = c.slug === category;
            return (
              <button
                key={c.slug}
                type="button"
                aria-pressed={active}
                onClick={() => pick(c.slug)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,color,border-color] duration-200 ease-[var(--ease-ui)]",
                  active ? "border-ink bg-ink text-white" : "border-ink-10 bg-white text-ink-68 hover:border-ink-32 hover:text-ink",
                )}
              >
                {c.title}
                <span className={cn("font-mono text-xs", active ? "text-white/60" : "text-ink-32")}>{c.count}</span>
              </button>
            );
          })}
        </div>
      )}

      {featured && (
        <div className="mb-8 md:mb-10">
          <FeaturedPost post={featured} />
        </div>
      )}

      {shown.length > 0 && (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p._id}>
              <BlogCard post={p} />
            </li>
          ))}
        </ul>
      )}

      {grid.length > visible && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <Button variant="secondary" size="lg" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more guides
          </Button>
          <p className="text-sm text-ink-50" aria-live="polite">
            Showing {shown.length} of {grid.length}
          </p>
        </div>
      )}
    </div>
  );
}
