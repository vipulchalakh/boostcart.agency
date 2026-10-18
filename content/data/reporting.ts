/* Copy for /services/reporting. Positioning and scope statements only: no client results, logos or statistics.
   Owner to review the engagement scope (setup vs monthly reporting vs dashboards) before launch. */
import type { Faq, Usp } from "./types";
import type { FitItem } from "./fit";
import type { Platform } from "./platforms";
import type { ProcessStep } from "./process";

export const reportingGoodFit: FitItem[] = [
  { title: "Stores that can't see what SEO earns", text: "You see traffic and rankings, but not which pages drive orders and revenue." },
  { title: "Teams juggling several tools", text: "Search Console, analytics and the store each tell a different story." },
  { title: "Owners who report to a board or investors", text: "You need clear numbers you can explain and defend." },
  { title: "Agencies' clients who want clarity", text: "You want to understand what you are paying for, in plain language." },
  { title: "Stores starting or changing SEO work", text: "You need a baseline before changes ship, so you can judge their effect." },
  { title: "Brands curious about AI visibility", text: "You want to know whether AI tools mention and link to your store." },
];

export const reportingNotFit: FitItem[] = [
  { title: "Stores without analytics access", text: "If we can't see sessions, orders or Search Console, there's little to report on." },
  { title: "Anyone expecting a vanity dashboard", text: "We report on what helps decisions, not on charts that only look busy." },
  { title: "Stores with very little traffic", text: "With few visits, data is too thin to show trends." },
  { title: "Teams expecting exact attribution", text: "SEO attribution is never perfect. We'll explain what the data can and can't say." },
  { title: "Anyone wanting reporting without any action", text: "Reports are meant to guide decisions, not sit in an inbox." },
  { title: "Businesses that don't sell online", text: "Our work is built around products, categories and carts." },
];

export const reportingPlatforms: Platform[] = [
  { slug: "shopify", title: "Shopify", line: "Orders and revenue connected to organic landing pages, with tracking checked in your theme and apps.", href: "/platforms/shopify", brand: "var(--brand-shopify)", icon: "bag" },
  { slug: "woocommerce", title: "WooCommerce", line: "Ecommerce tracking set up and verified, so orders from organic search show up properly.", href: "/platforms/woocommerce", brand: "var(--brand-woocommerce)", icon: "chat" },
  { slug: "bigcommerce", title: "BigCommerce", line: "Analytics and Search Console connected to store data, with checkout tracking verified.", href: "/platforms/bigcommerce", brand: "var(--brand-bigcommerce)", icon: "hex" },
  { slug: "magento", title: "Magento", line: "Reporting built for large catalogues, grouped by category and template rather than by single URL.", href: "/platforms/magento", brand: "var(--brand-magento)", icon: "box" },
  { slug: "headless", title: "Headless and custom", line: "Events and page data checked on custom storefronts, so reports reflect what happens in the store.", href: "/platforms/headless", brand: "var(--brand-headless)", icon: "code" },
];

export const reportingUsps: Usp[] = [
  {
    id: "revenue", tab: "Tied to revenue", title: "Reports that follow the money",
    description: "We connect organic visits to orders, so you see which pages and searches are worth the most.",
    points: ["Organic orders and revenue by page", "Landing pages grouped by template", "Branded and non-branded search split", "Clear notes on what data can't show"],
    visual: "store", sample: false,
  },
  {
    id: "trustworthy", tab: "Trustworthy data", title: "Tracking checked before you rely on it",
    description: "Before reporting starts we check your tracking, so the numbers are worth trusting.",
    points: ["Analytics and ecommerce tracking audit", "Search Console and store data aligned", "Duplicate or missing events found", "Known gaps documented"],
    visual: "platforms", sample: false,
  },
  {
    id: "plain", tab: "Plain language", title: "Findings you can act on",
    description: "Each report says what happened, why it likely happened and what to do next, without jargon.",
    points: ["Summary on the first page", "Wins and drops explained", "Next-month priorities", "Questions answered in the call"],
    visual: "report", sample: false,
  },
  {
    id: "clear-scope", tab: "Clear scope", title: "Setup, reporting and dashboards kept separate",
    description: "You know what is included each month, and what is scoped separately, before the engagement starts.",
    points: ["Scope agreed up front", "Report contents defined in writing", "Custom dashboards scoped separately", "Call frequency agreed in advance"],
    visual: "terms", sample: false,
  },
];

export const reportingSteps: ProcessStep[] = [
  { id: "connect", title: "Connect", short: "We link your data sources.", description: "We connect Search Console, analytics and store data, and check that ecommerce tracking records orders from organic search correctly.", outputs: ["Tracking audit", "Connected sources", "Known gaps"], points: ["Audit analytics and ecommerce events", "Connect Search Console and store data", "Check orders match across sources", "Document what can't be measured"] },
  { id: "baseline", title: "Baseline", short: "We record where you start.", description: "We capture your current traffic, rankings and revenue from organic search, so later changes can be judged against something real.", outputs: ["Baseline report", "Page groups", "Goals"], points: ["Record organic traffic and orders", "Group pages by template and type", "Note seasonality and past changes", "Agree what success looks like"] },
  { id: "report", title: "Report", short: "A clear report each month.", description: "Each month you receive a report showing which pages and searches grew or fell, what it was worth, and what we think explains it.", outputs: ["Monthly report", "Page-level notes", "Plain summary"], points: ["Summarize wins and drops", "Show revenue by page group", "Explain likely causes", "Flag issues needing action"] },
  { id: "act", title: "Act", short: "We turn findings into next steps.", description: "We agree the priorities for the next month, update the plan and check on the actions from the last report.", outputs: ["Action list", "Updated priorities", "Review call"], points: ["List actions with owners", "Re-rank priorities with new data", "Check last month's actions", "Hold a short review call"] },
];

export const reportingCompare = {
  common: {
    title: "Standard SEO reports",
    sub: "Charts without a conclusion",
    items: ["Rankings and traffic only", "Data pulled from one tool", "No link to orders or revenue", "Jargon without explanation", "Same template every month", "No clear next steps"],
  },
  boost: {
    title: "BoostCart",
    sub: "Revenue-tied ecommerce SEO reporting",
    items: ["Organic orders and revenue by page", "Search Console, analytics and store data together", "Tracking checked before use", "Plain-language findings", "Built around your goals", "A short list of next steps"],
  },
};

export const reportingFaqs: Faq[] = [
  { q: "What is included in your SEO reporting?", a: "Organic traffic, search performance, orders and revenue from organic search by page group, notes on what changed and why, and a short list of next steps. The exact contents are agreed when we scope the work.", sample: false },
  { q: "Can you show how much revenue SEO brings in?", a: "We can report organic orders and revenue from your analytics and store data. Attribution is never perfect, so we explain what the numbers do and don't show.", sample: false },
  { q: "What data sources do you use?", a: "Usually Google Search Console, your analytics platform and your store's order data. We may also use rank tracking and crawl data where they add something.", sample: false },
  { q: "Do you check our tracking first?", a: "Yes. We audit analytics and ecommerce tracking before reporting starts, because reports built on broken tracking mislead. We document any gaps we can't fix.", sample: false },
  { q: "How often will I receive reports?", a: "Monthly is usual, with a short call to go through it. Frequency and format are agreed when we scope the work.", sample: false },
  { q: "Can you build a live dashboard?", a: "Yes, where it helps. A dashboard is scoped separately from the monthly report, since it needs setup and maintenance.", sample: false },
  { q: "Do you track AI search visibility?", a: "We can review whether AI tools mention or link to your store for sample questions. The tools are new and results vary between runs, so we report it as an indication, not a precise measure.", sample: false },
  { q: "Can you report on work done by another agency?", a: "Yes. Reporting is independent of who does the SEO work, and an outside view can help you see what is working.", sample: false },
  { q: "Will you tell us when results are poor?", a: "Yes. Reports include drops and flat periods, with our best explanation of the cause and what we suggest doing.", sample: false },
  { q: "How long before reports are useful?", a: "A baseline can be ready soon after tracking is connected. Trends take a few months of data to show, and we set expectations when we scope the work.", sample: false },
];
