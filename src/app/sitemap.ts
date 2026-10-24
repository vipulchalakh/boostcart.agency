import type { MetadataRoute } from "next";
import { industries } from "@content/data";
import { client } from "@/sanity/lib/client";
import { POST_SLUGS_QUERY } from "@/sanity/lib/queries";

/** Only live pages belong here. Add each route as its page ships. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await client.fetch(POST_SLUGS_QUERY);
  return [
    { url: "https://boostcart.agency/", changeFrequency: "monthly", priority: 1 },
    { url: "https://boostcart.agency/services/technical-seo", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://boostcart.agency/services/category-product-pages", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://boostcart.agency/services/content", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://boostcart.agency/services/link-building", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://boostcart.agency/services/conversion-seo", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://boostcart.agency/services/reporting", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://boostcart.agency/blog", changeFrequency: "weekly", priority: 0.7 },
    ...posts.flatMap((p) => (p.slug ? [{ url: `https://boostcart.agency/blog/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 }] : [])),
    ...industries.map((i) => ({ url: `https://boostcart.agency/industries/${i.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
