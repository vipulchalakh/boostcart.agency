import type { Usp } from "./types";

/** TODO-REAL: owner must confirm each USP claim before launch. */
export const usps: Usp[] = [
  {
    id: "ecommerce-only",
    tab: "E-commerce only",
    title: "We only do e-commerce SEO",
    description: "No generic SEO playbooks. Everything we do is built around catalogs, collections and carts.",
    points: ["Category and product page strategy", "Faceted navigation and crawl control", "Merchandising-aware content", "Seasonal and out-of-stock handling"],
    visual: "store",
    sample: true,
  },
  {
    id: "revenue-reporting",
    tab: "Revenue reporting",
    title: "Reporting tied to revenue, not rankings",
    description: "You see which pages bring orders and why, so decisions rest on revenue instead of vanity metrics.",
    points: ["Organic revenue by page and template", "Monthly performance reports", "Clear next-step priorities", "Access to your own data"],
    visual: "report",
    sample: true,
  },
  {
    id: "platform-specialists",
    tab: "Platform specialists",
    title: "Specialists in your platform",
    description: "Shopify, WooCommerce, BigCommerce, Magento or headless: we work with the quirks of your stack, not around them.",
    points: ["Theme and plugin cleanup", "URL and faceted navigation fixes", "Structured data and rendering checks", "Dev-ready tickets your team can ship"],
    visual: "platforms",
    sample: true,
  },
  {
    id: "flexible-terms",
    tab: "No lock-in",
    title: "No long contracts, no lock-in",
    description: "Work with us month to month. Progress is reported openly, and you stay because it works.",
    points: ["Month-to-month engagement", "Transparent scope up front", "Monthly reporting calls", "You own every asset and account"],
    visual: "terms",
    sample: true,
  },
];
