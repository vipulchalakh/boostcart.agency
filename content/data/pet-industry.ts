/* Copy for /industries/pet-supplies. Positioning and scope statements only: no client results, logos or statistics.
   Owner to review the engagement tiers and confirm pricing (shown as "quoted after audit" until real prices are set) before launch. */
import type { Faq } from "./types";
import type { Platform } from "./platforms";

export type PetProblem = { id: string; title: string; text: string; cost: string };

export const petProblems: PetProblem[] = [
  { id: "variants", title: "\u201cEvery flavour and bag size has its own page.\u201d", text: "One food comes in several flavours, sizes and life stages. Each combination can spawn a near-identical URL, and they end up competing with each other.", cost: "Rankings split across duplicate pages" },
  { id: "segments", title: "\u201cOwners search by breed and life stage, not by category.\u201d", text: "\"Senior cat food\" and \"large breed puppy food\" are different searches. A generic collection rarely answers either one well.", cost: "Missing the searches closest to a purchase" },
  { id: "claims", title: "\u201cWe\u2019re not sure what we can say about health.\u201d", text: "Grain-free, limited ingredient and \"vet recommended\" copy draws scrutiny from shoppers and search engines. Unsupported claims erode trust fast.", cost: "Weak trust, or claims you can\u2019t defend" },
  { id: "repeat", title: "\u201cSEO reports ignore our repeat customers.\u201d", text: "Pet owners reorder food, litter and treats. A report that only counts first orders undervalues the searches that start that habit.", cost: "Good pages judged by the wrong numbers" },
  { id: "marketplace", title: "\u201cThe big retailers own every broad search.\u201d", text: "National chains and marketplaces dominate terms like \"dog food\". Competing head-on is expensive and rarely works for a focused store.", cost: "Spend on searches you can\u2019t win" },
  { id: "season", title: "\u201cOur best pages are out of season or out of stock.\u201d", text: "Flea and tick, cooling mats, holiday gifts and discontinued formulas all change what should be live. Dead ends frustrate shoppers and crawlers.", cost: "Traffic landing on pages that can\u2019t sell" },
];

export const petPlatforms: Array<Platform & { checks: string[] }> = [
  { slug: "shopify", title: "Shopify", line: "Variant-heavy food and supply catalogues, collection filters and subscription apps handled without duplicate URLs.", href: "/platforms/shopify", brand: "var(--brand-shopify)", icon: "bag", checks: ["Variant URLs", "Collection filters", "Subscription app pages"] },
  { slug: "woocommerce", title: "WooCommerce", line: "Product attributes, plugin bloat and category archives cleaned up so pet pages load and index properly.", href: "/platforms/woocommerce", brand: "var(--brand-woocommerce)", icon: "chat", checks: ["Attribute pages", "Plugin weight", "Category archives"] },
  { slug: "bigcommerce", title: "BigCommerce", line: "Faceted navigation for pet type, brand and size kept crawlable where it helps and blocked where it doesn't.", href: "/platforms/bigcommerce", brand: "var(--brand-bigcommerce)", icon: "hex", checks: ["Faceted navigation", "URL structure", "Brand pages"] },
  { slug: "magento", title: "Magento", line: "Large pet catalogues with thousands of SKUs, grouped and prioritised by template instead of one URL at a time.", href: "/platforms/magento", brand: "var(--brand-magento)", icon: "box", checks: ["Crawl control", "Layered navigation", "Catalogue scale"] },
  { slug: "headless", title: "Headless and custom", line: "Rendering, routing and structured data checked on custom storefronts, including product and review markup.", href: "/platforms/headless", brand: "var(--brand-headless)", icon: "code", checks: ["Rendering", "Routing", "Structured data"] },
];

export type PetWhyCard = { title: string; text: string; chip: string };
export type PetWhy = { id: string; tab: string; /** Illustration shown on every card in the group. */ image: string; title: string; text: string; cards: [PetWhyCard, PetWhyCard, PetWhyCard] };

/** Commitments and ways of working only: no client results or statistics. The first three are owner-supplied; the fourth is pet-specific. */
export const petWhy: PetWhy[] = [
  {
    id: "one-price", image: "/images/pet-why/one-price.jpg", tab: "One price", title: "One price. Unlimited deliverables.",
    text: "One monthly retainer instead of separate packages with page limits, keyword limits or task quotas.",
    cards: [
      { title: "One monthly retainer", text: "A single monthly price, instead of separate packages you have to piece together.", chip: "One price" },
      { title: "No page or keyword limits", text: "No caps on pages, keywords or tasks, so the work isn't rationed by a quota.", chip: "No quotas" },
      { title: "Work by impact", text: "We spend the retainer on what moves organic revenue first, not on filling a deliverables list.", chip: "Impact first" },
    ],
  },
  {
    id: "catalogue", image: "/images/pet-why/catalogue.jpg", tab: "Catalogue growth", title: "No paying extra as your catalogue grows.",
    text: "SEO pricing does not rise just because the store adds more products or collections.",
    cards: [
      { title: "Add products freely", text: "New products and variants don't change what you pay for SEO.", chip: "Price stays put" },
      { title: "New collections included", text: "Launching a new range or a seasonal collection doesn't add a fee.", chip: "No extra fee" },
      { title: "Grow without surprises", text: "Your price isn't tied to how many products or collections you carry.", chip: "No per-product pricing" },
    ],
  },
  {
    id: "organic", image: "/images/pet-why/organic.jpg", tab: "Organic only", title: "No other channel. Organic only.",
    text: "We focus on one job: making organic search the most profitable channel in your business.",
    cards: [
      { title: "One job", text: "Every hour goes into organic search, not spread across channels we'd rather sell you.", chip: "Organic search only" },
      { title: "No channel upsells", text: "No paid ads, social or email add-ons competing for attention or budget.", chip: "No distractions" },
      { title: "Profit, not vanity traffic", text: "We judge organic by the orders and revenue it brings in, and report it that way.", chip: "Revenue first" },
    ],
  },
  {
    id: "multi-platform", image: "/images/pet-why/multi-platform.jpg", tab: "Multi-platform SEO", title: "Multi-platform SEO: not just Google.",
    text: "Pet owners search beyond Google. We work to get your store found on Bing, YouTube, ChatGPT, Gemini, Perplexity and Reddit too.",
    cards: [
      { title: "Google and Bing", text: "Strong rankings in both search engines, the foundation everything else builds on.", chip: "Google and Bing" },
      { title: "AI answers", text: "We check whether ChatGPT, Gemini and Perplexity mention your store, and shape pages so they are easy to cite.", chip: "ChatGPT, Gemini, Perplexity" },
      { title: "Video and communities", text: "We map the questions owners ask on YouTube and Reddit and answer them in your guides and pages.", chip: "YouTube and Reddit" },
    ],
  },
];

export type PetStep = { id: string; title: string; short: string; description: string; outputs: [string, string, string] };

export const petSteps: PetStep[] = [
  { id: "audit", title: "Audit", short: "We find what holds your pet store back.", description: "We crawl your store and check variants, filters, speed and indexation, so we know where duplicate pages and wasted crawling are costing you.", outputs: ["Crawl and index report", "Variant review", "Quick-win list"] },
  { id: "map", title: "Search map", short: "Pet-owner searches matched to pages.", description: "We group searches by pet type, breed, life stage and need, then match each group to one page so your pages stop competing with each other.", outputs: ["Keyword-to-page map", "Gaps and overlaps", "Intent groups"] },
  { id: "fix", title: "Technical fixes", short: "Variants, filters and speed fixed at the root.", description: "We consolidate variant URLs, control filtered pages, clean up redirects and fix structured data, with dev-ready tickets or direct changes.", outputs: ["Variant rules", "Filter control", "Product markup"] },
  { id: "pages", title: "Collection and product pages", short: "Pages rebuilt to rank and to sell.", description: "Titles, headings, copy and internal links are rewritten for the collections and products that matter most, starting with your best-selling pet types.", outputs: ["Rewritten titles", "Collection copy", "Internal links"] },
  { id: "guides", title: "Care and buying guides", short: "Helpful guides, with claims we can stand behind.", description: "We publish buying and care guides that answer owners' questions and lead into your collections. Health and diet claims are flagged and agreed with you first.", outputs: ["Buying guides", "Claims review", "Content calendar"] },
  { id: "report", title: "Report and refine", short: "One monthly report tied to revenue.", description: "Each month you see which page groups grew, what they were worth and what we do next. Then we adjust the plan and repeat.", outputs: ["Monthly report", "Page-group trends", "Next-step list"] },
];

export const petCompare = {
  common: {
    title: "Typical SEO agencies",
    sub: "Generalist playbook",
    items: ["Same template for every industry", "Variants left to create duplicates", "Broad head terms, no niche plan", "Health copy added without checks", "Traffic charts, no order data", "Long reports with no next steps"],
  },
  boost: {
    title: "BoostCart",
    sub: "Ecommerce SEO for pet brands",
    items: ["Plans built around pet catalogues", "Variants consolidated deliberately", "Niche, breed and life-stage targets", "Claims reviewed with you", "Organic orders by page group", "A short action list each month"],
  },
};

/** One plan, owner-supplied: $1,000 to $1,500 per month depending on store size, category and competition. */
export const petPlan = {
  name: "One plan, everything included",
  priceFrom: "$1,000",
  priceTo: "$1,500",
  cadence: "/month",
  note: "Your exact price depends on your store size, category and competition. We confirm it after a free audit.",
  factors: [
    { title: "Store size", text: "How big the store and its range are." },
    { title: "Category", text: "The pet category you sell in." },
    { title: "Competition", text: "Who already holds the searches you want." },
  ],
  /** What you won't be charged for or limited by. Shown struck through. */
  notSold: ["Page limits", "Keyword limits", "Task quotas", "Dev fees for minor fixes"],
  included: [
    "Unlimited pages, optimized and rewritten as needed",
    "Unlimited content and buying guides",
    "Everything else required to deliver results",
    "Minor SEO fixes with no development charges",
    "Monthly report tied to organic revenue",
  ],
};

export const petFaqs: Faq[] = [
  { q: "Why does pet ecommerce need its own SEO approach?", a: "Pet catalogues combine heavy variants (flavour, size, life stage), repeat purchases and health-related copy. Those create duplicate pages, thin collections and trust questions that generic playbooks don't cover.", sample: false },
  { q: "Can a small pet store compete with the big retailers?", a: "Not on the broadest searches, usually. We aim at niches the big names serve poorly: specific diets, breeds, life stages, brands and care questions. Results depend on your competition and how fast changes are published.", sample: false },
  { q: "How do you handle product variants?", a: "We decide which variants deserve their own page, point the rest to a main version and make sure filters don't create endless duplicate URLs. The right answer depends on your platform and how people search.", sample: false },
  { q: "Do you write content about pet health or nutrition?", a: "We write buying and care guides, but we avoid medical claims we can't support. Where a claim needs a vet, manufacturer or published source, we flag it and agree wording with you first.", sample: false },
  { q: "Can you help with subscription and autoship pages?", a: "Yes. We check that subscription offers are crawlable, explained clearly and not creating duplicate pages. Subscription apps differ by platform, so we review yours first.", sample: false },
  { q: "How do you deal with seasonal demand?", a: "We plan seasonal pages and guides ahead of the period, keep them live year-round where it makes sense, and handle out-of-stock or discontinued products so shoppers and search engines aren't left at dead ends.", sample: false },
  { q: "What do you do about out-of-stock and discontinued food?", a: "It depends on the product. Options include keeping the page with alternatives, redirecting to the closest replacement or removing it. We set a rule for your store and apply it consistently.", sample: false },
  { q: "Which platforms do you work with?", a: "Shopify, WooCommerce, BigCommerce, Magento and headless storefronts. Subscription and review apps vary, so we check yours as part of the audit.", sample: false },
  { q: "Can you guarantee rankings or sales?", a: "No. Search engines decide rankings, and competition and authority matter. We can improve your pages and structure, report honestly and adjust the plan as results come in.", sample: false },
  { q: "How much does pet ecommerce SEO cost?", a: "One plan, $1,000 to $1,500 per month, depending on your store size, category and competition. It covers unlimited pages, content and optimization required to deliver results, and there are no development charges for minor SEO fixes. We confirm your exact price after a free audit.", sample: false },
];

/** Client logo files live in /public/logos/clients. Shown as images only: no links to the brands' sites. Owner to confirm each brand has approved its logo. */
export type PetClient = { name: string; src: string; width: number; height: number };

export const petClients: PetClient[] = [
  { name: "Victor Pet Food", src: "/logos/clients/victor.png", width: 464, height: 136 },
  { name: "WholesalePet", src: "/logos/clients/wholesalepet.png", width: 360, height: 69 },
  { name: "Phillips Pet Food & Supplies", src: "/logos/clients/phillips.png", width: 520, height: 165 },
  { name: "Petsense", src: "/logos/clients/petsense.png", width: 520, height: 148 },
  { name: "Care-A-Lot Pet Supply", src: "/logos/clients/carealot.png", width: 202, height: 80 },
  { name: "Redbarn Pet Products", src: "/logos/clients/redbarn.png", width: 240, height: 181 },
];
