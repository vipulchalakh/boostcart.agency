/* Copy for /services/technical-seo. Positioning and scope statements only: no client results, logos or statistics.
   Owner to review the engagement scope (audit vs implementation vs monitoring) before launch. */
import type { Faq, Usp } from "./types";
import type { FitItem } from "./fit";
import type { Platform } from "./platforms";
import type { ProcessStep } from "./process";

export const techSeoGoodFit: FitItem[] = [
  { title: "Shopify and WooCommerce stores", text: "Theme, app and plugin settings are quietly creating duplicate or blocked URLs." },
  { title: "Stores with thousands of URLs", text: "Large catalogues where filters, variants and pagination multiply crawlable pages." },
  { title: "Organic traffic that has dropped", text: "You need to know if technical issues are part of the cause." },
  { title: "Pages that won't index", text: "Products or categories sit in Search Console as excluded, duplicate or not indexed." },
  { title: "Teams planning a migration", text: "A replatform, redesign or URL restructure is coming and the risk needs managing." },
  { title: "Headless and JavaScript storefronts", text: "You want rendering, routing and structured data checked in the server response." },
];

export const techSeoNotFit: FitItem[] = [
  { title: "Stores that haven't launched", text: "With no URLs to crawl yet, build the store first and bring us in before launch." },
  { title: "Anyone expecting guaranteed rankings", text: "Technical SEO removes blockers. It can't guarantee positions or traffic." },
  { title: "Teams who can't change the site", text: "Fixes need developer time. If nothing can ship, an audit alone won't move results." },
  { title: "Purely content-led problems", text: "If pages are indexed but thin, the work is content and links, not technical SEO." },
  { title: "Anyone after a one-off score", text: "We prioritise by impact on your key pages, not by a tool's health score." },
  { title: "Businesses that don't sell online", text: "Our work is built around products, categories and carts." },
];

export const techSeoPlatforms: Platform[] = [
  { slug: "shopify", title: "Shopify", line: "Collection paths, theme canonicals, filter parameters and app markup, checked in what your theme actually outputs.", href: "/platforms/shopify", brand: "var(--brand-shopify)", icon: "bag" },
  { slug: "woocommerce", title: "WooCommerce", line: "Permalinks, filter plugins, SEO plugin conflicts and speed, with fixes written for WordPress.", href: "/platforms/woocommerce", brand: "var(--brand-woocommerce)", icon: "chat" },
  { slug: "bigcommerce", title: "BigCommerce", line: "URL structure and faceted navigation that stay clean as the catalogue grows.", href: "/platforms/bigcommerce", brand: "var(--brand-bigcommerce)", icon: "hex" },
  { slug: "magento", title: "Magento", line: "Crawl control and structure for large, layered-navigation catalogues.", href: "/platforms/magento", brand: "var(--brand-magento)", icon: "box" },
  { slug: "headless", title: "Headless and custom", line: "Rendering mode, routing, status codes and canonicals in the server response.", href: "/platforms/headless", brand: "var(--brand-headless)", icon: "code" },
];

export const techSeoUsps: Usp[] = [
  {
    id: "ecommerce-specific", tab: "Built for stores", title: "Technical SEO built for catalogues",
    description: "Stores generate URLs automatically. We focus on the rules and templates that decide which ones search engines see.",
    points: ["Faceted navigation and crawl control", "Variant and product URL strategy", "Out-of-stock and discontinued handling", "Category and pagination architecture"],
    visual: "store", sample: false,
  },
  {
    id: "developer-ready", tab: "Developer-ready", title: "Fixes your developers can ship",
    description: "Findings come as tickets written for your platform, so the work doesn't stall in translation.",
    points: ["Reproduction steps for every issue", "Acceptance criteria to verify fixes", "Guidance for your platform and theme", "A re-check once changes are live"],
    visual: "platforms", sample: false,
  },
  {
    id: "evidence", tab: "Evidence first", title: "Findings backed by evidence",
    description: "Every recommendation points to affected URLs and the data behind them, then gets ranked by impact on your key pages.",
    points: ["Crawl exports and URL samples", "Search Console indexation data", "Raw versus rendered HTML comparisons", "Priority by impact, not by tool score"],
    visual: "report", sample: false,
  },
  {
    id: "clear-scope", tab: "Clear scope", title: "Audit, fixes and monitoring kept separate",
    description: "You know what each engagement covers before it starts, so there are no surprises on scope or cost.",
    points: ["Scope agreed up front", "Audit deliverables defined in writing", "Implementation support scoped separately", "Monitoring added only if you want it"],
    visual: "terms", sample: false,
  },
];

export const techSeoSteps: ProcessStep[] = [
  { id: "audit", title: "Audit", short: "We crawl, render and inspect your store's indexation.", description: "A crawl and indexation review across categories, products, filters and templates, using Search Console data and rendered HTML to see what search engines actually see.", outputs: ["Crawl & index report", "Template issue log", "URL samples"], points: ["Crawl categories, products, filters and templates", "Compare raw HTML with the rendered page", "Review Search Console indexation and coverage", "Sample affected URLs for every issue"] },
  { id: "roadmap", title: "Prioritize", short: "Issues ranked by impact on your key pages.", description: "Every finding is ranked by how many valuable URLs it touches, how severe it is and how hard it is to fix, so the biggest blockers go first.", outputs: ["Prioritized register", "Effort estimates", "Dependencies"], points: ["Count the valuable URLs each issue touches", "Rate severity and effort to fix", "Flag dependencies between fixes", "Order the list so blockers go first"] },
  { id: "technical", title: "Fix", short: "Developer-ready tickets for crawl, canonical and render fixes.", description: "Each issue becomes a ticket with reproduction steps and acceptance criteria. Hands-on implementation support can be scoped separately.", outputs: ["Developer tickets", "Canonical & facet rules", "Schema guidance"], points: ["One ticket per issue, with reproduction steps", "Acceptance criteria your developers can test", "Canonical, facet and redirect rules for your platform", "Optional hands-on support, scoped separately"] },
  { id: "report", title: "Validate", short: "We re-check that the fixes worked.", description: "After release we re-crawl affected templates and compare against the ticket, then return anything unresolved to the register.", outputs: ["Validation report", "Open issues", "Next steps"], points: ["Re-crawl the affected templates", "Check each fix against its ticket", "Confirm in Search Console where possible", "Return anything unresolved to the register"] },
];

export const techSeoCompare = {
  common: {
    title: "Generic audits and crawler tools",
    sub: "Reports without store context",
    items: ["Often a template site audit", "Long lists, little order", "Generic, platform-agnostic advice", "Flags issues, not store logic", "You write the tickets", "No re-check after release"],
  },
  boost: {
    title: "BoostCart",
    sub: "Ecommerce technical SEO",
    items: ["Facets, variants, stock and migrations", "Ranked by effect on key URLs", "Written for your platform", "Raw versus rendered HTML checks", "Steps and acceptance criteria", "Re-check against the ticket"],
  },
};

export const techSeoFaqs: Faq[] = [
  { q: "What does ecommerce technical SEO include?", a: "Crawlability and indexation, site architecture and internal linking, duplicate URLs and canonicalization, rendering and performance, structured data, and platform migrations. The scope for your store depends on its size, platform and symptoms.", sample: false },
  { q: "How is technical SEO different for ecommerce websites?", a: "Catalogues generate URLs through variants, filters, sorting and pagination, and products change status constantly. One template or app setting can affect thousands of pages, so the work focuses on templates, rules and product lifecycle handling.", sample: false },
  { q: "How do you handle faceted navigation and crawl budget?", a: "We work out which filter combinations have search demand and which should stay user-only, then choose canonical, noindex, robots.txt, linking and sitemap handling for your platform. We don't block every parameter by default. Crawl budget matters most for very large or fast-changing catalogues.", sample: false },
  { q: "Can you fix product and category page indexation issues?", a: "We investigate why pages aren't indexed using Search Console, crawls and URL inspection, and recommend fixes. Some causes are technical, others involve duplication or quality. Search engines decide what to index, so outcomes aren't guaranteed.", sample: false },
  { q: "Do you work with Shopify and WooCommerce?", a: "Yes. We also work with BigCommerce, Magento, headless storefronts and custom platforms, and write recommendations for what each platform allows.", sample: false },
  { q: "Can you audit a headless ecommerce website?", a: "Yes. We check rendering mode, routing, status codes, canonicals, structured data and sitemaps in the initial server response, and how staging and preview environments stay out of the index.", sample: false },
  { q: "How do you approach JavaScript rendering issues?", a: "We compare raw HTML with the rendered page and use live URL Inspection on sample templates to confirm content, links, canonicals and structured data survive rendering. The right fix depends on your stack.", sample: false },
  { q: "What does an ecommerce technical SEO audit deliver?", a: "Depending on the engagement: a crawl and indexation audit, a prioritized issue register, affected URL samples, implementation guidance, developer-ready tickets, canonical and URL recommendations, schema and rendering findings, and a migration risk checklist where relevant.", sample: false },
  { q: "Can you support an ecommerce platform migration?", a: "Yes: URL inventory, redirect mapping, directive and sitemap checks, staging safeguards and post-launch crawling. A structured process reduces avoidable technical risk, but it can't promise rankings or traffic stay unchanged.", sample: false },
  { q: "How long does an ecommerce technical SEO audit take?", a: "It depends on catalogue size, template count, platform complexity and how quickly we get access to your data. We confirm a timeline when we scope the work.", sample: false },
  { q: "Do you implement fixes or only provide recommendations?", a: "The audit includes implementation guidance and developer-ready tickets for your team. Hands-on implementation support and ongoing monitoring are scoped separately, and agreed before any work starts.", sample: false },
];
