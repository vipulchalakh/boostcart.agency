import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorBio } from "@/components/blog-post/AuthorBio";
import { extractHeadings } from "@/components/blog-post/headings";
import { PostBody } from "@/components/blog-post/PostBody";
import { PostFaq } from "@/components/blog-post/PostFaq";
import { PostHero } from "@/components/blog-post/PostHero";
import { ReadingProgress } from "@/components/blog-post/ReadingProgress";
import { RelatedPosts, type RelatedPost } from "@/components/blog-post/RelatedPosts";
import { imageUrl } from "@/components/blog-post/SanityImage";
import { ShareRail } from "@/components/blog-post/ShareRail";
import { SidebarCta } from "@/components/blog-post/SidebarCta";
import { TableOfContents } from "@/components/blog-post/TableOfContents";
import { client, sanityFetch } from "@/sanity/lib/client";
import { POST_QUERY, POST_SLUGS_QUERY, RELATED_POSTS_FALLBACK_QUERY } from "@/sanity/lib/queries";

const siteUrl = "https://boostcart.agency";
const RELATED_COUNT = 3;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const rows = await client.withConfig({ useCdn: false }).fetch(POST_SLUGS_QUERY);
  return rows.flatMap((r) => (r.slug ? [{ slug: r.slug }] : []));
}

/** One fetch shared by generateMetadata and the page. */
const getPost = cache((slug: string) => sanityFetch({ query: POST_QUERY, params: { slug }, tags: ["post", `post:${slug}`, "author", "category"] }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.seo?.metaTitle || post.title || "Blog";
  const description = post.seo?.metaDescription || post.excerpt || undefined;
  const path = `/blog/${slug}`;
  const og = imageUrl(post.seo?.shareImage ?? post.coverImage, 1200, 630);

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: post.seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      siteName: "BoostCart",
      url: `${siteUrl}${path}`,
      title: `${title} | BoostCart`,
      description,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? post.publishedAt ?? undefined,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
    },
    twitter: { card: "summary_large_image", title: `${title} | BoostCart`, description, images: og ? [og] : undefined },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || !post.title) notFound();

  const path = `/blog/${slug}`;
  const url = `${siteUrl}${path}`;
  const modifiedAt = post.updatedAt ?? post.publishedAt;
  const { headings, ids } = extractHeadings(post.body);
  const authorPhoto = imageUrl(post.author?.photo, 160, 160);
  const faqs = (post.faqs ?? []).filter((f) => f.question && f.answer);

  /* Hand-picked related posts first, then top up with the newest in the same category. */
  const picked: RelatedPost[] = (post.relatedPosts ?? []).slice(0, RELATED_COUNT);
  const extra =
    picked.length < RELATED_COUNT
      ? await sanityFetch({
          query: RELATED_POSTS_FALLBACK_QUERY,
          params: { postId: post._id, categoryId: post.category?._id ?? "", excludeIds: picked.map((p) => p._id), limit: RELATED_COUNT - picked.length },
          tags: ["post", "category"],
        })
      : [];
  const related = [...picked, ...extra];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "Home", item: siteUrl },
        { name: "Blog", item: `${siteUrl}/blog` },
        ...(post.category?.title ? [{ name: post.category.title, item: `${siteUrl}/blog` }] : []),
        { name: post.title, item: url },
      ].map((c, i) => ({ "@type": "ListItem", position: i + 1, ...c })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.seo?.metaDescription || post.excerpt || undefined,
      image: imageUrl(post.coverImage, 1200, 630),
      datePublished: post.publishedAt ?? undefined,
      dateModified: modifiedAt ?? undefined,
      mainEntityOfPage: url,
      author: post.author?.name ? { "@type": "Person", name: post.author.name, jobTitle: post.author.role ?? undefined } : undefined,
      publisher: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "BoostCart", url: siteUrl },
    },
    ...(faqs.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
          },
        ]
      : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ReadingProgress targetId="post-article" />

      <PostHero
        title={post.title}
        categoryTitle={post.category?.title}
        author={post.author ? { name: post.author.name, role: post.author.role, bio: post.author.bio, photoUrl: authorPhoto ?? null } : null}
        modifiedAt={modifiedAt}
        readTime={post.readTime}
      />

      <div className="container-x pb-20 md:pb-28">
        <div className="mx-auto grid grid-cols-[minmax(0,1fr)] gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[56px_minmax(0,720px)_320px] xl:justify-center xl:gap-x-14">
          {/* Left rail: sticky share icons (extra-large screens) */}
          <div className="hidden xl:col-start-1 xl:row-start-1 xl:block">
            <div className="sticky top-32">
              <ShareRail url={url} title={post.title} orientation="vertical" />
            </div>
          </div>

          {/* Article */}
          <article id="post-article" className="order-1 min-w-0 lg:col-start-1 lg:row-start-1 xl:col-start-2">
            <ShareRail url={url} title={post.title} orientation="horizontal" className="mb-8 xl:hidden" />
            <TableOfContents headings={headings} variant="inline" className="mb-10 lg:hidden" />

            {post.body && <PostBody value={post.body} headingIds={ids} />}
            <PostFaq faqs={faqs} />
          </article>

          {/* Right rail: sticky table of contents + CTA */}
          <div className="order-3 lg:col-start-2 lg:row-span-2 lg:row-start-1 xl:col-start-3">
            <div className="space-y-8 lg:sticky lg:top-28">
              <TableOfContents headings={headings} variant="sidebar" className="hidden lg:block" />
              <SidebarCta />
            </div>
          </div>

          {/* Below the article: author bio, then the related-post grid across the full width */}
          <div className="order-2 min-w-0 lg:col-start-1 lg:row-start-2 xl:col-start-2">
            {post.author?.name && <AuthorBio name={post.author.name} role={post.author.role} bio={post.author.bio} photoUrl={authorPhoto} linkedinUrl={post.author.linkedinUrl} />}
          </div>
          <div className="order-4 min-w-0 lg:col-span-full lg:row-start-3">
            <RelatedPosts posts={related} />
          </div>
        </div>
      </div>
    </>
  );
}
