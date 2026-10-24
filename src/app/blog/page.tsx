import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { BlogIndex } from "@/components/blog-index/BlogIndex";
import { BlogIndexBackdrop } from "@/components/blog-index/BlogIndexBackdrop";
import { AppLink } from "@/components/ui/AppLink";
import { sanityFetch } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";

const siteUrl = "https://boostcart.agency";
const path = "/blog";
const title = "E-commerce SEO Blog";
const description = "Practical guides on technical SEO, category pages, content and link building for Shopify, WooCommerce and BigCommerce stores.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { type: "website", siteName: "BoostCart", url: `${siteUrl}${path}`, title: `${title} | BoostCart`, description },
  twitter: { card: "summary_large_image", title: `${title} | BoostCart`, description },
};

export default async function BlogPage() {
  const posts = (await sanityFetch({ query: POSTS_QUERY, tags: ["post", "author", "category"] })).filter((p) => p.slug && p.title);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "Home", item: siteUrl },
        { name: "Blog", item: `${siteUrl}${path}` },
      ].map((c, i) => ({ "@type": "ListItem", position: i + 1, ...c })),
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: `${siteUrl}${path}`,
      isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "BoostCart" },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.slice(0, 20).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${siteUrl}/blog/${p.slug}`, name: p.title })),
      },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <header className="relative isolate pb-12 pt-28 text-center md:pb-16 md:pt-32 lg:pt-36">
        <BlogIndexBackdrop />
        <div className="container-x">
          <div className="hero-fade mx-auto max-w-[860px]">
            <nav aria-label="Breadcrumb">
              <ol className="eyebrow flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
                <li className="flex items-center gap-1.5">
                  <AppLink href="/" className="transition-colors hover:text-ink">
                    Home
                  </AppLink>
                  <ChevronRight aria-hidden className="size-3.5 text-ink-32" />
                </li>
                <li>
                  <span aria-current="page" className="text-ink">
                    Blog
                  </span>
                </li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[3.25rem] md:text-[4rem]">E-commerce SEO guides for growing stores</h1>
            <p className="lead mx-auto mt-6 max-w-[40rem]">Practical, no-fluff advice on technical SEO, category pages, content and links for Shopify, WooCommerce and BigCommerce stores.</p>
          </div>
        </div>
      </header>

      <div className="container-x pb-20 md:pb-28">
        <BlogIndex posts={posts} />
      </div>
    </>
  );
}
