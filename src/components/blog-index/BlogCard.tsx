import { ArrowUpRight, Clock, User } from "lucide-react";
import { AppLink } from "@/components/ui/AppLink";
import { formatDate } from "@/components/blog-post/headings";
import { SanityImage, type SanityImg } from "@/components/blog-post/SanityImage";

export type IndexPost = {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  publishedAt: string | null;
  readTime: number | null;
  coverImage: SanityImg | null;
  category: { title: string | null; slug: string | null } | null;
  author: { name: string | null; slug: string | null; role: string | null; photo: SanityImg | null } | null;
};

export function AuthorChip({ author }: { author: IndexPost["author"] }) {
  if (!author?.name) return null;
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      {author.photo?.asset ? (
        <SanityImage image={author.photo} width={96} ratio={1} sizes="32px" className="size-8 shrink-0 rounded-full object-cover ring-2 ring-white" />
      ) : (
        <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong">
          <User className="size-4" />
        </span>
      )}
      <span className="truncate text-sm font-medium text-ink">{author.name}</span>
    </span>
  );
}

function CategoryPill({ title, onImage }: { title: string; onImage?: boolean }) {
  return (
    <span className={onImage ? "eyebrow rounded-full bg-white/95 px-3 py-1 text-[0.6875rem] text-ink shadow-xs backdrop-blur" : "eyebrow rounded-full bg-accent-soft px-3 py-1 text-[0.6875rem] text-accent-strong"}>
      {title}
    </span>
  );
}

/** Image-led post card used in the blog grid. */
export function BlogCard({ post, priority }: { post: IndexPost; priority?: boolean }) {
  return (
    <AppLink
      href={`/blog/${post.slug}`}
      className="group spotlight lift relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-10 bg-white shadow-xs transition-colors duration-200 hover:border-accent/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-ink-05 bg-ink-05">
        <SanityImage
          image={post.coverImage}
          width={900}
          ratio={16 / 10}
          priority={priority}
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          className="size-full object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-quart)] group-hover:scale-[1.04]"
        />
        {post.category?.title && (
          <span className="absolute left-4 top-4">
            <CategoryPill title={post.category.title} onImage />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-sm text-ink-50">
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
          {post.publishedAt && post.readTime ? <span aria-hidden className="size-1 rounded-full bg-ink-20" /> : null}
          {post.readTime ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden className="size-3.5" />
              {post.readTime} min read
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 text-balance font-display text-[1.375rem] font-bold leading-[1.2] tracking-[-0.015em] text-ink transition-colors duration-200 group-hover:text-accent-strong">{post.title}</h3>
        {post.excerpt && <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-6 text-ink-68">{post.excerpt}</p>}

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <AuthorChip author={post.author} />
          <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full border border-ink-10 bg-white text-ink-50 transition-[background-color,color,border-color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </AppLink>
  );
}

/** Large card for the newest post. */
export function FeaturedPost({ post }: { post: IndexPost }) {
  return (
    <AppLink
      href={`/blog/${post.slug}`}
      className="group spotlight relative grid overflow-hidden rounded-3xl border border-ink-10 bg-white shadow-md transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-lg lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-05 lg:aspect-auto lg:min-h-[420px]">
        <SanityImage
          image={post.coverImage}
          width={1400}
          ratio={16 / 10}
          priority
          sizes="(min-width: 1024px) 760px, 100vw"
          className="size-full object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-quart)] group-hover:scale-[1.03]"
        />
      </div>

      <div className="relative isolate flex flex-col justify-center overflow-hidden p-7 md:p-10 lg:p-12">
        <span aria-hidden className="absolute -right-16 -top-16 -z-10 size-56 rounded-full bg-accent-soft opacity-80 blur-2xl" />
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow rounded-full bg-ink px-3 py-1 text-[0.6875rem] text-white">Latest</span>
          {post.category?.title && <CategoryPill title={post.category.title} />}
        </div>

        <h2 className="mt-5 text-balance font-display text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-accent-strong md:text-[2.25rem]">{post.title}</h2>
        {post.excerpt && <p className="mt-4 line-clamp-3 text-base leading-7 text-ink-68 md:text-[1.0625rem]">{post.excerpt}</p>}

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-50">
          <AuthorChip author={post.author} />
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
          {post.readTime ? <span>{post.readTime} min read</span> : null}
        </div>

        <span className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-ink">
          Read article
          <ArrowUpRight aria-hidden className="size-5 text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </AppLink>
  );
}
