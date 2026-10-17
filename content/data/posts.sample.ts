import type { Post } from "./types";

/** TODO-REAL: replace with real published guides (slug must match a page in /blog). */
export const posts: Post[] = [
  { slug: "shopify-seo-checklist", title: "The Shopify SEO checklist for growing stores", category: "SHOPIFY", readTime: 8, cover: "chart", sample: true },
  { slug: "category-page-seo", title: "How to rank category pages that actually sell", category: "CATEGORY PAGES", readTime: 7, cover: "grid", sample: true },
  { slug: "faceted-navigation", title: "Faceted navigation without wrecking your crawl budget", category: "TECHNICAL", readTime: 9, cover: "rings", sample: true },
  { slug: "product-schema", title: "Product schema: what to mark up and what to skip", category: "TECHNICAL", readTime: 6, cover: "doc", sample: true },
  { slug: "buying-guides", title: "Buying guides that win high-intent search traffic", category: "CONTENT", readTime: 7, cover: "bars", sample: true },
  { slug: "ecommerce-link-building", title: "Link building for online stores, without the shortcuts", category: "LINKS", readTime: 8, cover: "link", sample: true },
  { slug: "woocommerce-speed", title: "Speeding up WooCommerce for better rankings", category: "WOOCOMMERCE", readTime: 6, cover: "chart", sample: true },
];
