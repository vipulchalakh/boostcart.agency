/* Copy for /services/content. Positioning and scope statements only: no client results, logos or statistics.
   Owner to review the engagement scope (strategy vs writing vs publishing) before launch. */
import type { Faq, Usp } from "./types";
import type { FitItem } from "./fit";
import type { Platform } from "./platforms";
import type { ProcessStep } from "./process";

export const contentGoodFit: FitItem[] = [
  { title: "Stores with products that need explaining", text: "Shoppers research sizing, materials, comparisons or compatibility before they buy." },
  { title: "Brands with no blog, or a stale one", text: "Posts exist but aren't tied to products, search demand or what your customers ask." },
  { title: "Competitive category searches", text: "Collection pages alone can't answer every question shoppers type in early on." },
  { title: "Teams short on writing time", text: "You want researched, product-aware guides without hiring an in-house editor." },
  { title: "Stores that want cited, trusted pages", text: "You want content that search engines and AI assistants have a reason to quote." },
  { title: "Owners who want content tied to revenue", text: "Every guide should lead shoppers toward a collection or product." },
];

export const contentNotFit: FitItem[] = [
  { title: "Stores that haven't launched", text: "With no products yet, content has nothing to route shoppers toward. Launch first." },
  { title: "Anyone expecting guaranteed traffic", text: "Good content improves your odds. It can't guarantee rankings or visits." },
  { title: "Sites with unresolved indexing problems", text: "If pages aren't being indexed, fix the technical issue first." },
  { title: "Teams wanting high-volume filler", text: "We don't publish dozens of thin posts to hit a number." },
  { title: "Anyone who can't review drafts", text: "Product knowledge matters. Someone on your side needs to check facts." },
  { title: "Businesses that don't sell online", text: "Our work is built around products, categories and carts." },
];

export const contentPlatforms: Platform[] = [
  { slug: "shopify", title: "Shopify", line: "Blog templates, collection links and metaobjects, with guides published where your theme can show them well.", href: "/platforms/shopify", brand: "var(--brand-shopify)", icon: "bag" },
  { slug: "woocommerce", title: "WooCommerce", line: "WordPress posts linked to product categories, with plugin and editor settings that keep pages clean.", href: "/platforms/woocommerce", brand: "var(--brand-woocommerce)", icon: "chat" },
  { slug: "bigcommerce", title: "BigCommerce", line: "Blog and web page setup, with guides linked into category and product pages.", href: "/platforms/bigcommerce", brand: "var(--brand-bigcommerce)", icon: "hex" },
  { slug: "magento", title: "Magento", line: "CMS pages and blocks for guides, linked into large category trees without clutter.", href: "/platforms/magento", brand: "var(--brand-magento)", icon: "box" },
  { slug: "headless", title: "Headless and custom", line: "Content models, routing and markup for guides delivered from a CMS to your storefront.", href: "/platforms/headless", brand: "var(--brand-headless)", icon: "code" },
];

export const contentUsps: Usp[] = [
  {
    id: "shopper-questions", tab: "Shopper questions", title: "Topics chosen from real searches",
    description: "We start with what your shoppers type in and ask, then plan guides that answer it better than the pages already ranking.",
    points: ["Search demand and question research", "Review of pages that already rank", "Topics tied to products you sell", "Priority by buying intent"],
    visual: "store", sample: false,
  },
  {
    id: "product-aware", tab: "Product-aware", title: "Guides that lead to a collection",
    description: "Each guide has a job: help someone decide, then send them to the right collection or product.",
    points: ["Comparisons between similar products", "Sizing, fit and compatibility guides", "Internal links to relevant pages", "Calls to action matched to intent"],
    visual: "platforms", sample: false,
  },
  {
    id: "trusted", tab: "Trusted writing", title: "Accurate, sourced and reviewed",
    description: "Content is researched against real product facts and checked before it reaches you, so it reads as helpful rather than generic.",
    points: ["Product facts checked with your team", "Named sources for claims", "Clear authorship and update dates", "No filler written only for keywords"],
    visual: "report", sample: false,
  },
  {
    id: "clear-scope", tab: "Clear scope", title: "Strategy, writing and publishing kept separate",
    description: "You know how many guides are included and who publishes them before the engagement starts.",
    points: ["Scope agreed up front", "Guide count defined in writing", "Publishing support scoped separately", "Revisions agreed before work begins"],
    visual: "terms", sample: false,
  },
];

export const contentSteps: ProcessStep[] = [
  { id: "research", title: "Research", short: "We find the questions shoppers ask.", description: "We review search demand, competing pages and your product range to find the guides and comparisons most likely to bring in ready-to-buy shoppers.", outputs: ["Topic list", "Search intent notes", "Competitor gaps"], points: ["Collect questions from search and your support team", "Review pages already ranking", "Group topics by buying stage", "Match topics to your products"] },
  { id: "plan", title: "Plan", short: "A calendar ranked by value.", description: "Topics are ordered by buying intent, effort and fit with your catalogue, then turned into briefs your writers or ours can follow.", outputs: ["Content calendar", "Briefs", "Link targets"], points: ["Rank topics by value and effort", "Write a brief for each guide", "Pick the collection each guide leads to", "Agree the schedule with you"] },
  { id: "create", title: "Create", short: "Researched guides written for your store.", description: "Guides are written with product facts, clear structure and internal links, then reviewed with you for accuracy before they are published.", outputs: ["Drafted guides", "Comparison pages", "Review notes"], points: ["Draft against the brief and product facts", "Add comparisons, tables and images guidance", "Review facts with your team", "Prepare titles, meta data and links"] },
  { id: "review", title: "Refresh", short: "We check what's working and update it.", description: "After publishing we track how guides are found and used, update what's out of date, and decide which topics to write next.", outputs: ["Performance review", "Refresh list", "Next topics"], points: ["Check guides are indexed and linked", "Review search performance by guide", "Update older guides that slip", "Pick the next topics to write"] },
];

export const contentCompare = {
  common: {
    title: "Generic blog content",
    sub: "Posts without store context",
    items: ["Topics picked for keyword volume", "Written without product knowledge", "No path to a collection", "Thin posts to hit a quota", "No updates after publishing", "Success judged by page views"],
  },
  boost: {
    title: "BoostCart",
    sub: "Ecommerce content and buying guides",
    items: ["Topics from real shopper questions", "Written with your product facts", "Every guide links to a collection", "Fewer, more useful guides", "Refreshed when details change", "Reviewed for effect on key pages"],
  },
};

export const contentFaqs: Faq[] = [
  { q: "What kind of content do you create for ecommerce stores?", a: "Buying guides, product comparisons, how-to articles, sizing and fit guides, and supporting copy for collections. The mix depends on your products, your shoppers and what is already ranking.", sample: false },
  { q: "How do you choose what to write about?", a: "We combine search demand, the questions your customers ask, competing pages and the products you want to sell. Topics are ranked by buying intent and how well they fit your catalogue.", sample: false },
  { q: "Will content help my category pages rank?", a: "It can. Guides can answer questions that collection pages can't, earn links and send shoppers to the right collection through internal links. Rankings aren't guaranteed.", sample: false },
  { q: "Who writes the content?", a: "We write and edit the guides, using product details from your team. You review drafts for accuracy before anything is published.", sample: false },
  { q: "Do you use AI to write content?", a: "We can use AI tools for research and outlines, but guides are written, fact-checked and edited by people. We'll tell you how any tools are used when we scope the work.", sample: false },
  { q: "How many guides do I need?", a: "It depends on your catalogue, competition and goals. We'd rather publish fewer, stronger guides than fill a calendar with thin posts, and we'll recommend a number when we scope the work.", sample: false },
  { q: "Can you update our existing blog posts?", a: "Yes. We review what you have, then update, merge or remove posts depending on whether they still help shoppers and search performance.", sample: false },
  { q: "Do you publish the content for us?", a: "That depends on the scope we agree. We can deliver finished content for your team to publish, or add publishing support. It is agreed before work starts.", sample: false },
  { q: "How does content show up in AI answers?", a: "AI tools pull from pages that are clear, accurate and well structured. Good guides give them something worth quoting, but we can't control or guarantee what any AI tool shows.", sample: false },
  { q: "How long does it take to see results?", a: "Content usually takes time to be found and ranked, and it varies with competition and your site's authority. We set expectations for your store when we scope the work.", sample: false },
];
