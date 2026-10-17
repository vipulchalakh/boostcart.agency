export type Platform = {
  slug: string;
  /** Shown as the card title, e.g. "Shopify SEO". */
  title: string;
  line: string;
  href: string;
  /** CSS variable from tokens.css. */
  brand: string;
  icon: "bag" | "chat" | "hex" | "box" | "code";
};

export const platforms: Platform[] = [
  { slug: "shopify", title: "Shopify SEO", line: "Collections, apps and theme-level fixes that help your store rank.", href: "/platforms/shopify", brand: "var(--brand-shopify)", icon: "bag" },
  { slug: "woocommerce", title: "WooCommerce SEO", line: "WordPress speed, plugin cleanup and product pages built to convert.", href: "/platforms/woocommerce", brand: "var(--brand-woocommerce)", icon: "chat" },
  { slug: "bigcommerce", title: "BigCommerce SEO", line: "Clean URLs and faceted navigation that scale with your catalog.", href: "/platforms/bigcommerce", brand: "var(--brand-bigcommerce)", icon: "hex" },
  { slug: "magento", title: "Magento SEO", line: "Crawl control and structure for large, complex catalogs.", href: "/platforms/magento", brand: "var(--brand-magento)", icon: "box" },
  { slug: "headless", title: "Headless SEO", line: "Rendering, routing and structured data for custom storefronts.", href: "/platforms/headless", brand: "var(--brand-headless)", icon: "code" },
];
