import type { NavLink } from "./nav";

export const footerColumns: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Services",
    links: [
      { label: "Technical SEO", href: "/services/technical-seo" },
      { label: "Category & Product Pages", href: "/services/category-product-pages" },
      { label: "Content", href: "/services/content" },
      { label: "Link Building", href: "/services/link-building" },
      { label: "Reporting", href: "/services/reporting" },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "Shopify SEO", href: "/platforms/shopify" },
      { label: "WooCommerce SEO", href: "/platforms/woocommerce" },
      { label: "BigCommerce SEO", href: "/platforms/bigcommerce" },
      { label: "Magento SEO", href: "/platforms/magento" },
      { label: "Headless SEO", href: "/platforms/headless" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
  {
    title: "Comparisons",
    links: [
      { label: "vs. In-house SEO", href: "/compare/in-house-seo" },
      { label: "vs. Generic SEO agencies", href: "/compare/generic-agencies" },
      { label: "vs. SEO plugins & tools", href: "/compare/seo-tools" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Free audit", href: "/free-audit" },
      { label: "E-commerce SEO guides", href: "/resources/guides" },
      { label: "Checklists", href: "/resources/checklists" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/** TODO-REAL: only list profiles that actually exist. */
export const socials: Array<{ label: "X" | "LinkedIn" | "YouTube" | "Instagram"; href: string }> = [
  { label: "X", href: "https://x.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
];
