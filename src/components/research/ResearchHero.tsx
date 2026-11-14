import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import { AppLink } from "@/components/ui/AppLink";
import { AuthorPopover } from "@/components/blog-post/AuthorPopover";
import { formatDate } from "@/components/blog-post/headings";
import { PostHeroBackdrop } from "@/components/blog-post/PostHeroBackdrop";

type Props = {
  title: string;
  categoryTitle?: string | null;
  author?: { name: string | null; role: string | null; bio: string | null; photoUrl: string | null } | null;
  /** ISO date of the last meaningful change (falls back to the publish date). */
  modifiedAt?: string | null;
  readTime?: number | null;
};

export function ResearchHero({ title, categoryTitle, author, modifiedAt, readTime }: Props) {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Research", href: "/research" },
  ];
  return (
    <header className="relative isolate -mt-12 z-20 pb-10 pt-[10rem] text-center md:pb-14 md:pt-[11rem] lg:pt-[12rem]">
      <PostHeroBackdrop />
      <div className="container-x">
        <div className="hero-fade mx-auto max-w-[920px]">
          <nav aria-label="Breadcrumb">
            <ol className="eyebrow flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
              {crumbs.map((c) => (
                <li key={c.href} className="flex items-center gap-1.5">
                  <AppLink href={c.href} className="transition-colors hover:text-ink">
                    {c.name}
                  </AppLink>
                  <ChevronRight aria-hidden className="size-3.5 text-ink-32" />
                </li>
              ))}
              {categoryTitle && (
                <li>
                  <span className="text-ink">{categoryTitle}</span>
                </li>
              )}
            </ol>
          </nav>

          <h1 className="mt-6 text-balance font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[2.75rem] md:text-[3.5rem]">{title}</h1>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.9375rem] text-ink-68">
            {author?.name && <AuthorPopover name={author.name} role={author.role} bio={author.bio} photoUrl={author.photoUrl} />}
            {modifiedAt && (
              <span className="inline-flex items-center gap-2">
                <CalendarDays aria-hidden className="size-4 text-ink-50" />
                <span>
                  Updated on: <time dateTime={modifiedAt}>{formatDate(modifiedAt)}</time>
                </span>
              </span>
            )}
            {readTime ? (
              <span className="inline-flex items-center gap-2">
                <Clock aria-hidden className="size-4 text-ink-50" />
                {readTime} min read
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
