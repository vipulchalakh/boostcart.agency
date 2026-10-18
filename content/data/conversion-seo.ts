/* Copy for /services/conversion-seo. Positioning and scope statements only: no client results, logos or statistics.
   Owner to review the engagement scope (review vs recommendations vs testing) before launch. */
import type { Faq, Usp } from "./types";
import type { FitItem } from "./fit";
import type { Platform } from "./platforms";
import type { ProcessStep } from "./process";

export const conversionGoodFit: FitItem[] = [
  { title: "Stores with traffic that doesn't buy", text: "Organic visits are growing, but orders and revenue per visit aren't following." },
  { title: "Teams who rank but don't convert", text: "Pages reach page one, yet shoppers leave without adding to cart." },
  { title: "Stores with high-value landing pages", text: "A handful of collections and products bring most of your organic entries." },
  { title: "Owners unsure why shoppers leave", text: "You need someone to look at the pages as a buyer would." },
  { title: "Brands with mobile traffic that lags", text: "Mobile shoppers browse but rarely check out." },
  { title: "Teams who want SEO and CRO aligned", text: "You don't want one team's changes undoing the other's work." },
];

export const conversionNotFit: FitItem[] = [
  { title: "Stores with very little traffic", text: "With few visitors there's too little data to judge what is losing sales." },
  { title: "Anyone expecting guaranteed lifts", text: "Changes can improve your odds. Conversion rates depend on many things we can't control." },
  { title: "Teams who can't change the site", text: "Recommendations need developer or designer time to ship." },
  { title: "Sites with indexing problems", text: "If pages aren't being found, technical SEO comes first." },
  { title: "Anyone after a full redesign", text: "We improve SEO landing pages. We don't rebuild a store's whole design." },
  { title: "Businesses that don't sell online", text: "Our work is built around products, categories and carts." },
];

export const conversionPlatforms: Platform[] = [
  { slug: "shopify", title: "Shopify", line: "Theme sections, product page apps and checkout settings reviewed for speed, clarity and trust.", href: "/platforms/shopify", brand: "var(--brand-shopify)", icon: "bag" },
  { slug: "woocommerce", title: "WooCommerce", line: "Product templates, plugins and checkout steps reviewed for friction, with fixes that suit WordPress.", href: "/platforms/woocommerce", brand: "var(--brand-woocommerce)", icon: "chat" },
  { slug: "bigcommerce", title: "BigCommerce", line: "Stencil themes and checkout options reviewed for clear product information and a simple path to buy.", href: "/platforms/bigcommerce", brand: "var(--brand-bigcommerce)", icon: "hex" },
  { slug: "magento", title: "Magento", line: "Large category pages and layered navigation reviewed for findability and checkout friction.", href: "/platforms/magento", brand: "var(--brand-magento)", icon: "box" },
  { slug: "headless", title: "Headless and custom", line: "Custom storefronts reviewed for speed, layout stability and clear calls to action.", href: "/platforms/headless", brand: "var(--brand-headless)", icon: "code" },
];

export const conversionUsps: Usp[] = [
  {
    id: "organic-focus", tab: "Organic visitors", title: "Built around the visitors SEO brings",
    description: "We look at the pages organic shoppers land on and ask what is stopping them from buying.",
    points: ["Review by landing page and search intent", "Comparison of entry pages with the rest", "Mobile and desktop behaviour checked", "Priority by traffic and revenue potential"],
    visual: "store", sample: false,
  },
  {
    id: "seo-safe", tab: "SEO-safe", title: "Changes that don't hurt rankings",
    description: "Layout and copy changes are checked against search so improving conversion doesn't cost you visibility.",
    points: ["Headings and copy kept crawlable", "No hidden content on key pages", "Speed and layout stability checked", "Redirect and canonical safeguards"],
    visual: "platforms", sample: false,
  },
  {
    id: "evidence", tab: "Evidence first", title: "Recommendations backed by data",
    description: "Every suggestion points to analytics, recordings or page evidence, then gets ranked by likely value.",
    points: ["Analytics and funnel review", "Session recordings and heatmaps where available", "Page-level examples for each issue", "Priority by impact and effort"],
    visual: "report", sample: false,
  },
  {
    id: "clear-scope", tab: "Clear scope", title: "Review, build and testing kept separate",
    description: "You know whether the engagement covers a review, design guidance or running tests before it starts.",
    points: ["Scope agreed up front", "Deliverables defined in writing", "Implementation support scoped separately", "Testing added only if you want it"],
    visual: "terms", sample: false,
  },
];

export const conversionSteps: ProcessStep[] = [
  { id: "analyze", title: "Analyze", short: "We find where organic visitors drop off.", description: "We review analytics, landing pages and key journeys to see where organic shoppers leave and which pages carry the most value.", outputs: ["Funnel review", "Landing page list", "Drop-off notes"], points: ["Segment organic traffic by landing page", "Map the path from page to checkout", "Compare mobile and desktop behaviour", "List pages that lose the most potential"] },
  { id: "diagnose", title: "Diagnose", short: "We review pages as a buyer would.", description: "Priority pages are reviewed for clarity, trust, product information, speed and friction, with evidence for every issue.", outputs: ["Page review", "Issue log", "Evidence"], points: ["Check product information and images", "Review trust signals and policies", "Check speed and layout shifts", "Note friction in cart and checkout"] },
  { id: "recommend", title: "Recommend", short: "Changes ranked by likely value.", description: "Findings become a ranked list of changes with reasons, examples and notes on how each affects SEO.", outputs: ["Ranked changes", "Page mockups or notes", "SEO safeguards"], points: ["Rank changes by value and effort", "Show examples for each change", "Note any SEO risks to avoid", "Agree what ships first"] },
  { id: "measure", title: "Measure", short: "We check what changed.", description: "After changes ship we compare behaviour on the affected pages and decide what to keep, adjust or test next.", outputs: ["Before and after review", "Test ideas", "Next steps"], points: ["Compare behaviour on changed pages", "Check rankings were not harmed", "Flag changes worth testing", "Plan the next round of work"] },
];

export const conversionCompare = {
  common: {
    title: "SEO and CRO handled separately",
    sub: "Traffic and conversion with different owners",
    items: ["SEO judged by rankings and traffic", "CRO changes made without search checks", "Generic best-practice checklists", "Mobile treated as an afterthought", "Pages tested in isolation", "No link between visits and revenue"],
  },
  boost: {
    title: "BoostCart",
    sub: "Conversion-focused ecommerce SEO",
    items: ["Judged by orders from organic visits", "Changes checked against search", "Reviews based on your pages and data", "Mobile reviewed alongside desktop", "Focus on high-value landing pages", "Reporting tied to revenue"],
  },
};

export const conversionFaqs: Faq[] = [
  { q: "What is conversion-focused SEO?", a: "It means working on the pages organic visitors land on so they are more likely to buy, as well as on getting them there. We look at product information, layout, trust, speed and the path to checkout.", sample: false },
  { q: "How is this different from a CRO agency?", a: "A conversion rate agency usually works on testing across a whole site. We focus on organic landing pages and make sure improvements don't cost you search visibility.", sample: false },
  { q: "Which pages do you start with?", a: "The collection and product pages that bring the most organic visits or have the most revenue potential. We confirm the list with you before work starts.", sample: false },
  { q: "Will changes affect my rankings?", a: "Layout and copy changes can affect rankings if they remove content or slow the page. We check each recommendation against search so you can improve conversion without avoidable risk.", sample: false },
  { q: "Do you run A/B tests?", a: "Testing can be added where you have enough traffic and the tools to run it. Many stores get more value first from fixing clear issues, so testing is scoped separately.", sample: false },
  { q: "What data do you need?", a: "Access to analytics and Search Console, and ideally session recordings or heatmaps if you have them. We confirm what is needed when we scope the work.", sample: false },
  { q: "Do you make the changes on the site?", a: "We deliver recommendations and examples for your team. Hands-on design or development support can be scoped separately.", sample: false },
  { q: "Can you promise a higher conversion rate?", a: "No. Conversion depends on your product, price, audience and many other things. We can find and prioritize likely blockers, but we can't guarantee a result.", sample: false },
  { q: "Do you review checkout?", a: "Yes, where it affects organic visitors. We look at cart and checkout friction, though platform limits can restrict what is possible, especially on hosted platforms.", sample: false },
  { q: "How long does a conversion review take?", a: "It depends on the number of pages, your platform and how quickly we get access to data. We confirm a timeline when we scope the work.", sample: false },
];
