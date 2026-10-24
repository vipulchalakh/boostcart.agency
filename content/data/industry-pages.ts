/* Copy for /industries/[slug] (every industry in the mega menu except pet supplies, which has its own page and data file).
   Positioning and scope statements only: no client results, logos or statistics. Mock searches, URLs and statuses are fictional examples.
   Owner to review the engagement terms and confirm pricing (shown as "quoted after audit" until real prices are set) before launch. */
import type { Faq } from "./types";
import type { Platform } from "./platforms";
import type { PetStep, PetProblem, PetWhy } from "./pet-industry";

export type IconKey =
  | "shirt" | "footprints" | "watch" | "sparkles" | "droplets" | "palette" | "heart-pulse" | "pill" | "dumbbell" | "leaf"
  | "sofa" | "bed" | "lamp" | "utensils" | "smartphone" | "laptop" | "headphones" | "gem" | "gift" | "coffee" | "wine"
  | "cookie" | "mountain" | "bike" | "tent" | "baby" | "blocks" | "shield-check";

export type MapStatus = "Mapped" | "Gap" | "Overlap";
export type SceneTone = "ok" | "warn" | "bad" | "dim";

export type IndustryPage = {
  slug: string;
  /** Page title, e.g. "Fashion Ecommerce SEO". */
  title: string;
  description: string;
  /** Schema.org audience, e.g. "Fashion and apparel ecommerce brands". */
  audience: string;
  /** Singular noun phrase used in running copy, e.g. "fashion brand". */
  noun: string;
  /** What these shoppers are called, e.g. "fashion shoppers". */
  shoppers: string;
  icon: IconKey;
  hero: { lines: [string, string]; lead: string; primary: string };
  map: { title: string; chip: string; groups: Array<{ icon: IconKey; label: string; rows: Array<[string, MapStatus]> }> };
  problems: { title: string; lead: string; items: PetProblem[] };
  platformLines: [string, string, string, string, string];
  platformChecks: [[string, string, string], [string, string, string], [string, string, string], [string, string, string], [string, string, string]];
  visibilityLead: string;
  stepText: [string, string, string, string, string, string];
  scenes: {
    audit: Array<[string, string, SceneTone]>;
    map: Array<[string, string]>;
    fix: { urls: [string, string, string]; target: string };
    page: { crumb: string; title: string; desc: string };
    guides: [string, string, string, string];
    reviewLabel: string;
    report: [string, string, string, string];
  };
  mocks: {
    audit: [string, string, string, string];
    serp: { domain: string; beforeTitle: string; beforeDesc: string; path: string; title: string; desc: string };
    calendar: [string, string, string, string];
    outreach: [string, string, string];
    serviceText: [string, string, string, string, string, string];
  };
  compareBoost: [string, string, string, string, string, string];
  planNote: string;
  planCategory: string;
  faqs: [Faq, Faq, Faq, Faq];
  lead: { sells: string[]; gets: [string, string, string]; headline: string };
  cta: { title: string; lead: string; heading: string; rows: [[string, string], [string, string], [string, string], [string, string]] };
};

const f = (q: string, a: string): Faq => ({ q, a, sample: false });

/* ---------- Shared blocks, worded for the industry ---------- */

export const industryCommon = {
  compare: ["Same template for every industry", "Variants left to create duplicates", "Broad head terms, no niche plan", "Claims added without checks", "Traffic charts, no order data", "Long reports with no next steps"],
};

export const industryWhy = (noun: string, shoppers: string): PetWhy[] => [
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
    text: `${shoppers[0].toUpperCase()}${shoppers.slice(1)} search beyond Google. We work to get your store found on Bing, YouTube, ChatGPT, Gemini, Perplexity and Reddit too.`,
    cards: [
      { title: "Google and Bing", text: "Strong rankings in both search engines, the foundation everything else builds on.", chip: "Google and Bing" },
      { title: "AI answers", text: "We check whether ChatGPT, Gemini and Perplexity mention your store, and shape pages so they are easy to cite.", chip: "ChatGPT, Gemini, Perplexity" },
      { title: "Video and communities", text: `We map the questions ${noun} customers ask on YouTube and Reddit and answer them in your guides and pages.`, chip: "YouTube and Reddit" },
    ],
  },
];

const stepSkeleton = (noun: string): Array<Omit<PetStep, "description">> => [
  { id: "audit", title: "Audit", short: `We find what holds your ${noun} store back.`, outputs: ["Crawl and index report", "Variant review", "Quick-win list"] },
  { id: "map", title: "Search map", short: "Shopper searches matched to pages.", outputs: ["Keyword-to-page map", "Gaps and overlaps", "Intent groups"] },
  { id: "fix", title: "Technical fixes", short: "Variants, filters and speed fixed at the root.", outputs: ["Variant rules", "Filter control", "Product markup"] },
  { id: "pages", title: "Collection and product pages", short: "Pages rebuilt to rank and to sell.", outputs: ["Rewritten titles", "Collection copy", "Internal links"] },
  { id: "guides", title: "Buying guides", short: "Helpful guides, with claims we can stand behind.", outputs: ["Buying guides", "Claims review", "Content calendar"] },
  { id: "report", title: "Report and refine", short: "One monthly report tied to revenue.", outputs: ["Monthly report", "Page-group trends", "Next-step list"] },
];

export const industrySteps = (p: IndustryPage): PetStep[] =>
  stepSkeleton(p.noun).map((s, i) => ({ ...s, description: p.stepText[i], outputs: s.outputs as [string, string, string] }));

export const industryPlan = (p: IndustryPage) => ({
  note: p.planNote,
  factors: [
    { title: "Store size", text: "How big the store and its range are." },
    { title: "Category", text: p.planCategory },
    { title: "Competition", text: "Who already holds the searches you want." },
  ],
  included: [
    "Unlimited pages, optimized and rewritten as needed",
    "Unlimited content and buying guides",
    "Everything else required to deliver results",
    "Minor SEO fixes with no development charges",
    "Monthly report tied to organic revenue",
  ],
  priceFrom: "$1,000",
  priceTo: "$1,500",
  cadence: "/month",
});

export const industryFaqs = (p: IndustryPage): Faq[] => [
  ...p.faqs,
  f("Which platforms do you work with?", "Shopify, WooCommerce, BigCommerce, Magento and headless storefronts. Apps for subscriptions, reviews and filters vary, so we check yours as part of the audit."),
  f("Do you handle out-of-stock and discontinued products?", "Yes. Options include keeping the page with alternatives, redirecting to the closest replacement or removing it. We set one rule for your store and apply it consistently."),
  f("How long until we see results?", "It depends on your starting point, competition and how quickly changes are published. We agree a plan and timing after the audit, and we report progress every month rather than promising a date."),
  f("Can you guarantee rankings or sales?", "No. Search engines decide rankings, and competition and authority matter. We can improve your pages and structure, report honestly and adjust the plan as results come in."),
  f("Do you work only on organic search?", "Yes. Organic search is the only channel we work on, so the whole retainer goes into it. We do not sell paid ads, social or email add-ons."),
  f(`How much does ${p.noun} SEO cost?`, "One plan, $1,000 to $1,500 per month, depending on your store size, category and competition. It covers unlimited pages, content and optimization required to deliver results, and there are no development charges for minor SEO fixes. We confirm your exact price after a free audit."),
];

/** Per-platform lines are industry-specific; brand and links are shared. */
export const industryPlatforms = (p: IndustryPage): Array<Platform & { checks: string[] }> => {
  const base: Array<[string, string, Platform["icon"], string]> = [
    ["shopify", "Shopify", "bag", "var(--brand-shopify)"],
    ["woocommerce", "WooCommerce", "chat", "var(--brand-woocommerce)"],
    ["bigcommerce", "BigCommerce", "hex", "var(--brand-bigcommerce)"],
    ["magento", "Magento", "box", "var(--brand-magento)"],
    ["headless", "Headless and custom", "code", "var(--brand-headless)"],
  ];
  return base.map(([slug, title, icon, brand], i) => ({ slug, title, icon, brand, line: p.platformLines[i], href: `/platforms/${slug}`, checks: p.platformChecks[i] }));
};

/* ---------- Industries ---------- */

export const industryPages: IndustryPage[] = [
  {
    slug: "fashion-apparel",
    title: "Fashion & Apparel Ecommerce SEO",
    description: "Ecommerce SEO for fashion and apparel stores: size and colour variant control, seasonal collections that stay indexable, lookbook content and revenue-tied reporting.",
    audience: "Fashion and apparel ecommerce brands",
    noun: "fashion brand",
    shoppers: "fashion shoppers",
    icon: "shirt",
    hero: { lines: ["Ecommerce SEO for", "Fashion Brands"], lead: "Grow organic revenue from shoppers searching for the right dress, jacket, shoes or fit, all year round.", primary: "Get a free fashion store audit" },
    map: {
      title: "Search map by category", chip: "Fashion searches, mapped",
      groups: [
        { icon: "shirt", label: "Womenswear", rows: [["Linen midi dress", "Mapped"], ["Wedding guest dresses", "Gap"], ["Black blazer, oversized", "Overlap"]] },
        { icon: "footprints", label: "Footwear", rows: [["Wide fit leather boots", "Mapped"], ["White trainers, women", "Mapped"]] },
        { icon: "watch", label: "Accessories", rows: [["Canvas tote bag", "Gap"]] },
      ],
    },
    problems: {
      title: "Why fashion stores stall in organic search",
      lead: "Six problems we see in apparel catalogues, and what each one costs.",
      items: [
        { id: "variants", title: "“Every size and colour has its own page.”", text: "One dress in six colours and eight sizes can spawn dozens of near-identical URLs. They end up competing with each other.", cost: "Rankings split across duplicate pages" },
        { id: "seasonal", title: "“Our collections disappear every season.”", text: "Pages built for a drop get deleted or left empty when the season ends, and the links and history they earned go with them.", cost: "Authority lost every season" },
        { id: "intent", title: "“Shoppers search by occasion and style, not by category.”", text: "\"Wedding guest dress\" and \"capsule work wardrobe\" are different searches from \"dresses\". A generic collection rarely answers either.", cost: "Missing searches close to a purchase" },
        { id: "filters", title: "“Our filters create thousands of URLs.”", text: "Size, colour, price and brand filters can multiply into pages that waste crawling and dilute the ones that matter.", cost: "Crawl budget spent on the wrong pages" },
        { id: "marketplace", title: "“Marketplaces and big labels own every broad search.”", text: "Terms like \"women's jeans\" are dominated by large retailers. Competing head-on is expensive for a focused label.", cost: "Spend on searches you can’t win" },
        { id: "images", title: "“Our imagery is great, but search can’t read it.”", text: "Lookbooks and product photos often lack descriptive alt text, clear file names and structured data, so visual search misses them.", cost: "Image and visual search traffic left unclaimed" },
      ],
    },
    platformLines: [
      "Size and colour variants, collection filters and drop-based launches handled without duplicate URLs.",
      "Product attributes, plugin bloat and category archives cleaned up so fashion pages load and index properly.",
      "Faceted navigation for size, colour and brand kept crawlable where it helps and blocked where it doesn't.",
      "Large apparel catalogues with thousands of SKUs, grouped and prioritised by template instead of one URL at a time.",
      "Rendering, routing and structured data checked on custom storefronts, including product and image markup.",
    ],
    platformChecks: [["Variant URLs", "Collection filters", "Drop launches"], ["Attribute pages", "Plugin weight", "Category archives"], ["Faceted navigation", "URL structure", "Brand pages"], ["Crawl control", "Layered navigation", "Catalogue scale"], ["Rendering", "Routing", "Image markup"]],
    visibilityLead: "Shoppers get outfit ideas from search results, AI answers, videos and communities before they buy. We check where your store shows up in each, and what to fix.",
    stepText: [
      "We crawl your store and check variants, filters, speed and indexation, so we know where duplicate pages and wasted crawling are costing you.",
      "We group searches by category, occasion, fit and style, then match each group to one page so your pages stop competing with each other.",
      "We consolidate size and colour variant URLs, control filtered pages, clean up redirects and fix structured data, with dev-ready tickets or direct changes.",
      "Titles, headings, copy and internal links are rewritten for the collections and products that matter most, starting with your best sellers.",
      "We publish size, fit and styling guides that answer shoppers' questions and lead into your collections. Material and sustainability claims are checked with you first.",
      "Each month you see which page groups grew, what they were worth and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Variant URLs", "Review", "warn"], ["Filter pages", "Too many crawled", "bad"], ["Image alt text", "Missing on many", "warn"], ["Product markup", "Checked", "ok"]],
      map: [["linen midi dress", "Collection"], ["wide fit boots", "Collection"], ["what to wear to a wedding", "Guide"], ["oversized blazer", "Needs a decision"]],
      fix: { urls: ["/linen-dress?size=m", "/linen-dress?size=l", "/linen-dress?colour=sage"], target: "/linen-dress" },
      page: { crumb: "example-label.com › collections › linen-midi-dresses", title: "Linen Midi Dresses | Example Label", desc: "Compare cuts, lengths and colours in breathable linen." },
      guides: ["How to find your size", "Capsule wardrobe: a guide", "Linen vs cotton, compared", "Styling a midi dress"],
      reviewLabel: "Claims check",
      report: ["Collection pages", "Product pages", "Style guides", "Seasonal pages"],
    },
    mocks: {
      audit: ["Variant URLs", "Core Web Vitals", "Product schema", "Filter pages"],
      serp: { domain: "example-label.com", beforeTitle: "Dresses | Example Label", beforeDesc: "Shop our dresses. Free shipping.", path: "collections › linen-midi-dresses", title: "Linen Midi Dresses | Example Label", desc: "Compare cuts, lengths and colours. Free returns over a set spend." },
      calendar: ["How to find your size", "Capsule wardrobe: a guide", "Styling a midi dress", "Linen vs cotton, compared"],
      outreach: ["editor@sample-stylemag.com", "team@sample-fashionblog.com", "news@sample-lookbook.com"],
      serviceText: [
        "Variant URLs, crawl, speed and structured data fixed at the root so every product page can rank.",
        "Collections by category, occasion and style that turn searches into carts.",
        "Fit, sizing and styling guides that answer shoppers' questions and build trust.",
        "Editorial links from fashion publications and blogs your customers read.",
        "Traffic is only useful if it buys, or comes back for the next drop.",
        "Know exactly which pages bring revenue and why.",
      ],
    },
    compareBoost: ["Plans built around apparel catalogues", "Variants consolidated deliberately", "Occasion, fit and style targets", "Seasonal pages kept live and earning", "Organic orders by page group", "A short action list each month"],
    planNote: "Your exact price depends on your store size, category and competition. We confirm it after a free audit.",
    planCategory: "The fashion category you sell in.",
    faqs: [
      f("Why does fashion ecommerce need its own SEO approach?", "Apparel catalogues combine heavy size and colour variants, seasonal drops and style-led searches. Those create duplicate pages, empty seasonal collections and missed intent that generic playbooks don't cover."),
      f("How do you handle size and colour variants?", "We decide which variants deserve their own page, point the rest to a main version and make sure filters don't create endless duplicate URLs. The right answer depends on your platform and how people search."),
      f("What happens to seasonal collection pages?", "We keep evergreen collection URLs live year-round and update their contents each season, so links and history carry over instead of resetting. Where a page does end, we redirect it deliberately."),
      f("Can a small label compete with the big retailers?", "Not on the broadest searches, usually. We aim at niches the big names serve poorly: specific fits, occasions, materials and styles. Results depend on your competition and how fast changes are published."),
    ],
    lead: { sells: ["Womenswear", "Menswear", "Kidswear", "Footwear", "Accessories", "Several categories"], gets: ["Crawl and variant check", "Style and occasion search gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your fashion store back" },
    cta: { title: "Give your fashion store a clearer path to organic sales", lead: "Get a free audit of your variants, collections and content, with the fixes ranked by impact.", heading: "Fashion store review", rows: [["Variant URLs", "Review"], ["Seasonal collections", "Gaps"], ["Style guides", "Missing"], ["Product markup", "Checked"]] },
  },
  {
    slug: "beauty-skincare",
    title: "Beauty & Skincare Ecommerce SEO",
    description: "Ecommerce SEO for beauty and skincare stores: ingredient and concern collections, routine guides, review markup and careful claims handling.",
    audience: "Beauty and skincare ecommerce brands",
    noun: "beauty brand",
    shoppers: "beauty shoppers",
    icon: "sparkles",
    hero: { lines: ["Ecommerce SEO for", "Beauty Brands"], lead: "Grow organic revenue from shoppers researching ingredients, routines and shades before they buy.", primary: "Get a free beauty store audit" },
    map: {
      title: "Search map by concern", chip: "Beauty searches, mapped",
      groups: [
        { icon: "droplets", label: "Skincare", rows: [["Niacinamide serum for oily skin", "Mapped"], ["Fragrance-free moisturiser", "Gap"], ["Retinol vs retinal", "Overlap"]] },
        { icon: "palette", label: "Makeup", rows: [["Foundation for olive skin", "Mapped"], ["Cream blush, sheer", "Mapped"]] },
        { icon: "sparkles", label: "Hair and body", rows: [["Scalp serum, dry flaky", "Gap"]] },
      ],
    },
    problems: {
      title: "Why beauty stores stall in organic search",
      lead: "Six problems we see in beauty and skincare catalogues, and what each one costs.",
      items: [
        { id: "ingredients", title: "“Shoppers research ingredients, and we don’t answer them.”", text: "People search \"niacinamide for oily skin\" long before they search for a product. Without ingredient pages and guides, that research goes elsewhere.", cost: "Research traffic that never reaches you" },
        { id: "shades", title: "“Every shade and size is its own page.”", text: "One foundation in thirty shades and three sizes can spawn near-identical URLs that compete with each other.", cost: "Rankings split across duplicate pages" },
        { id: "claims", title: "“We’re not sure what we can claim.”", text: "Words like \"clinically proven\" or \"anti-ageing\" draw scrutiny from shoppers, regulators and search engines when unsupported.", cost: "Weak trust, or claims you can’t defend" },
        { id: "reviews", title: "“Our reviews aren’t doing anything for search.”", text: "Reviews that aren't marked up, or are hidden in a widget, miss the rich results and trust signals that lift clicks.", cost: "Social proof search engines can’t see" },
        { id: "marketplace", title: "“Big retailers own every broad search.”", text: "Terms like \"moisturiser\" or \"lipstick\" are dominated by large beauty retailers and marketplaces.", cost: "Spend on searches you can’t win" },
        { id: "repeat", title: "“Reports ignore replenishment.”", text: "Beauty customers reorder. A report that only counts first orders undervalues the searches that start the habit.", cost: "Good pages judged by the wrong numbers" },
      ],
    },
    platformLines: [
      "Shade and size variants, bundles and subscription apps handled without duplicate URLs.",
      "Product attributes, review plugins and category archives cleaned up so beauty pages load and index properly.",
      "Faceted navigation for concern, skin type and ingredient kept crawlable where it helps and blocked where it doesn't.",
      "Large beauty catalogues with thousands of SKUs, grouped and prioritised by template instead of one URL at a time.",
      "Rendering, routing and structured data checked on custom storefronts, including product and review markup.",
    ],
    platformChecks: [["Shade variants", "Review markup", "Subscription pages"], ["Attribute pages", "Plugin weight", "Review plugins"], ["Faceted navigation", "URL structure", "Brand pages"], ["Crawl control", "Layered navigation", "Catalogue scale"], ["Rendering", "Routing", "Review markup"]],
    visibilityLead: "Shoppers compare ingredients and routines in search results, AI answers, videos and communities. We check where your store shows up in each, and what to fix.",
    stepText: [
      "We crawl your store and check shade variants, filters, speed and indexation, so we know where duplicate pages and wasted crawling are costing you.",
      "We group searches by concern, skin type, ingredient and routine step, then match each group to one page so your pages stop competing with each other.",
      "We consolidate shade and size URLs, control filtered pages, clean up redirects and fix product and review markup, with dev-ready tickets or direct changes.",
      "Titles, headings, copy and internal links are rewritten for the collections and products that matter most, starting with your best sellers.",
      "We publish ingredient and routine guides that answer shoppers' questions and lead into your collections. Skin and ingredient claims are flagged and agreed with you first.",
      "Each month you see which page groups grew, what they were worth and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Shade variants", "Review", "warn"], ["Filter pages", "Too many crawled", "bad"], ["Review markup", "Missing", "warn"], ["Product markup", "Checked", "ok"]],
      map: [["niacinamide serum oily skin", "Collection"], ["fragrance-free moisturiser", "Collection"], ["retinol vs retinal", "Guide"], ["clean skincare", "Needs a decision"]],
      fix: { urls: ["/foundation?shade=120", "/foundation?shade=240", "/foundation?size=30ml"], target: "/foundation" },
      page: { crumb: "example-glow.com › collections › niacinamide-serums", title: "Niacinamide Serums | Example Glow", desc: "Compare strengths, textures and skin types for niacinamide serums." },
      guides: ["Build a simple routine", "Retinol vs retinal, compared", "How to find your shade", "Ingredients for oily skin"],
      reviewLabel: "Claims check",
      report: ["Collection pages", "Product pages", "Ingredient guides", "Seasonal pages"],
    },
    mocks: {
      audit: ["Shade variants", "Core Web Vitals", "Review schema", "Filter pages"],
      serp: { domain: "example-glow.com", beforeTitle: "Serums | Example Glow", beforeDesc: "Shop our serums. Free shipping.", path: "collections › niacinamide-serums", title: "Niacinamide Serums | Example Glow", desc: "Compare strengths and skin types. Free samples with orders over a set spend." },
      calendar: ["Build a simple routine", "Retinol vs retinal, compared", "How to find your shade", "Ingredients for oily skin"],
      outreach: ["editor@sample-beautymag.com", "team@sample-skinblog.com", "news@sample-glowguide.com"],
      serviceText: [
        "Shade variants, crawl, speed and structured data fixed at the root so every product page can rank.",
        "Collections by concern, ingredient and skin type that turn searches into carts.",
        "Ingredient and routine guides that answer shoppers' questions and build trust.",
        "Editorial links from beauty publications and blogs your customers read.",
        "Traffic is only useful if it buys, or reorders.",
        "Know exactly which pages bring revenue and why.",
      ],
    },
    compareBoost: ["Plans built around beauty catalogues", "Shade variants consolidated deliberately", "Ingredient, concern and routine targets", "Claims reviewed with you", "Organic orders by page group", "A short action list each month"],
    planNote: "Your exact price depends on your store size, category and competition. We confirm it after a free audit.",
    planCategory: "The beauty category you sell in.",
    faqs: [
      f("Why does beauty ecommerce need its own SEO approach?", "Beauty catalogues combine heavy shade and size variants, ingredient-led research and claim-sensitive copy. Those create duplicate pages, missed research traffic and trust questions that generic playbooks don't cover."),
      f("Do you write content about ingredients and skin concerns?", "We write ingredient and routine guides, but we avoid medical or results claims we can't support. Where a claim needs a dermatologist, manufacturer or published source, we flag it and agree wording with you first."),
      f("How do you handle shade and size variants?", "We decide which variants deserve their own page, point the rest to a main version and make sure filters don't create endless duplicate URLs. The right answer depends on your platform and how people search."),
      f("Can you help with review markup?", "Yes. We check that reviews are crawlable, marked up correctly and honest about what they show. Review apps differ by platform, so we review yours first."),
    ],
    lead: { sells: ["Skincare", "Makeup", "Hair care", "Body care", "Fragrance", "Several categories"], gets: ["Crawl and variant check", "Ingredient and concern search gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your beauty store back" },
    cta: { title: "Give your beauty store a clearer path to organic sales", lead: "Get a free audit of your variants, collections and content, with the fixes ranked by impact.", heading: "Beauty store review", rows: [["Shade variant URLs", "Review"], ["Concern collections", "Gaps"], ["Ingredient guides", "Missing"], ["Review markup", "Checked"]] },
  },
  {
    slug: "health-supplements",
    title: "Health & Supplements Ecommerce SEO",
    description: "Ecommerce SEO for health and supplement stores: credible, compliant content, benefit and ingredient pages, E-E-A-T signals and revenue-tied reporting.",
    audience: "Health and supplement ecommerce brands",
    noun: "supplement brand",
    shoppers: "health shoppers",
    icon: "heart-pulse",
    hero: { lines: ["Ecommerce SEO for", "Health & Supplement Brands"], lead: "Grow organic revenue with content that is credible, clear and safe to scale, aimed at shoppers researching what to take and why.", primary: "Get a free supplement store audit" },
    map: {
      title: "Search map by need", chip: "Health searches, mapped",
      groups: [
        { icon: "pill", label: "Vitamins and minerals", rows: [["Magnesium glycinate for sleep", "Mapped"], ["Vitamin D3 and K2", "Gap"], ["Iron supplement, gentle", "Overlap"]] },
        { icon: "dumbbell", label: "Sports nutrition", rows: [["Plant protein powder, unflavoured", "Mapped"], ["Creatine monohydrate", "Mapped"]] },
        { icon: "leaf", label: "Herbal and wellness", rows: [["Ashwagandha, KSM-66", "Gap"]] },
      ],
    },
    problems: {
      title: "Why supplement stores stall in organic search",
      lead: "Six problems we see in health and supplement catalogues, and what each one costs.",
      items: [
        { id: "trust", title: "“Search engines hold health content to a higher standard.”", text: "Pages that give health advice need clear authorship, sources and honest limits. Thin or anonymous copy struggles to rank and to convince.", cost: "Weak trust signals on pages that need them" },
        { id: "claims", title: "“We’re not sure what we can say about benefits.”", text: "Benefit and \"supports\" wording is regulated and draws scrutiny. Unsupported claims put the store and its rankings at risk.", cost: "Claims you can’t defend" },
        { id: "variants", title: "“Every strength, flavour and pack size has its own page.”", text: "One product in several strengths, flavours and counts can spawn near-identical URLs that compete with each other.", cost: "Rankings split across duplicate pages" },
        { id: "intent", title: "“Shoppers search by need, not by product name.”", text: "\"Magnesium for sleep\" and \"gentle iron\" are research searches that start well before a brand is chosen.", cost: "Missing the searches closest to a purchase" },
        { id: "marketplace", title: "“Marketplaces and big retailers own the broad terms.”", text: "Terms like \"vitamin C\" are dominated by large retailers and publishers. Head-on competition is expensive.", cost: "Spend on searches you can’t win" },
        { id: "repeat", title: "“Reports ignore subscriptions and reorders.”", text: "Supplement customers reorder. A report that only counts first orders undervalues the searches that start the habit.", cost: "Good pages judged by the wrong numbers" },
      ],
    },
    platformLines: [
      "Strength, flavour and count variants, bundles and subscription apps handled without duplicate URLs.",
      "Product attributes, plugin bloat and category archives cleaned up so supplement pages load and index properly.",
      "Faceted navigation for need, ingredient and brand kept crawlable where it helps and blocked where it doesn't.",
      "Large supplement catalogues with thousands of SKUs, grouped and prioritised by template instead of one URL at a time.",
      "Rendering, routing and structured data checked on custom storefronts, including product and author markup.",
    ],
    platformChecks: [["Variant URLs", "Subscription pages", "Bundle pages"], ["Attribute pages", "Plugin weight", "Category archives"], ["Faceted navigation", "URL structure", "Brand pages"], ["Crawl control", "Layered navigation", "Catalogue scale"], ["Rendering", "Routing", "Author markup"]],
    visibilityLead: "Shoppers research supplements in search results, AI answers, videos and communities before they buy. We check where your store shows up in each, and what to fix.",
    stepText: [
      "We crawl your store and check variants, filters, speed and indexation, and review how health pages show authorship and sources.",
      "We group searches by health need, ingredient and product type, then match each group to one page so your pages stop competing with each other.",
      "We consolidate variant URLs, control filtered pages, clean up redirects and fix structured data, with dev-ready tickets or direct changes.",
      "Titles, headings, copy and internal links are rewritten for the collections and products that matter most, with benefit wording agreed with you.",
      "We publish ingredient and benefit guides with named authors and sources. Every health claim is flagged and agreed with you, or your reviewer, before it goes live.",
      "Each month you see which page groups grew, what they were worth and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Variant URLs", "Review", "warn"], ["Filter pages", "Too many crawled", "bad"], ["Author and source info", "Missing on guides", "warn"], ["Product markup", "Checked", "ok"]],
      map: [["magnesium glycinate for sleep", "Collection"], ["plant protein powder", "Collection"], ["how much vitamin d to take", "Guide"], ["immune support", "Needs a decision"]],
      fix: { urls: ["/magnesium?count=60", "/magnesium?count=120", "/magnesium?form=powder"], target: "/magnesium" },
      page: { crumb: "example-vita.com › collections › magnesium", title: "Magnesium Supplements | Example Vita", desc: "Compare forms, strengths and pack sizes, with ingredients listed clearly." },
      guides: ["Choosing a magnesium form", "Creatine: what to know", "Protein powder, compared", "Vitamin D basics"],
      reviewLabel: "Claims check",
      report: ["Collection pages", "Product pages", "Ingredient guides", "Seasonal pages"],
    },
    mocks: {
      audit: ["Variant URLs", "Core Web Vitals", "Product schema", "Filter pages"],
      serp: { domain: "example-vita.com", beforeTitle: "Magnesium | Example Vita", beforeDesc: "Shop our supplements. Free shipping.", path: "collections › magnesium", title: "Magnesium Supplements | Example Vita", desc: "Compare forms, strengths and pack sizes. Ingredients listed clearly." },
      calendar: ["Choosing a magnesium form", "Creatine: what to know", "Protein powder, compared", "Vitamin D basics"],
      outreach: ["editor@sample-wellnessmag.com", "team@sample-fitnessblog.com", "news@sample-nutritionguide.com"],
      serviceText: [
        "Variant URLs, crawl, speed and structured data fixed at the root so every product page can rank.",
        "Collections by health need and ingredient that turn searches into carts.",
        "Credible ingredient and benefit guides, with claims you can stand behind.",
        "Editorial links from health and fitness publications your customers read.",
        "Traffic is only useful if it buys, or reorders.",
        "Know exactly which pages bring revenue and why.",
      ],
    },
    compareBoost: ["Plans built around supplement catalogues", "Variants consolidated deliberately", "Need and ingredient targets", "Claims reviewed with you first", "Organic orders by page group", "A short action list each month"],
    planNote: "Your exact price depends on your store size, category and competition. We confirm it after a free audit.",
    planCategory: "The health category you sell in.",
    faqs: [
      f("Why does supplement ecommerce need its own SEO approach?", "Supplement catalogues combine heavy variants, need-led research and regulated claims. Those create duplicate pages, trust questions and compliance risks that generic playbooks don't cover."),
      f("Do you write content about health and benefits?", "We write ingredient and buying guides, but we avoid medical claims we can't support. Where a claim needs a clinician, manufacturer or published source, we flag it and agree wording with you first. We don't give medical advice."),
      f("How do you handle compliance?", "We don't replace your legal or regulatory review. We flag wording that needs checking, keep claims modest and sourced, and apply your approved rules consistently across pages."),
      f("Can you help with subscription pages?", "Yes. We check that subscription offers are crawlable, explained clearly and not creating duplicate pages. Subscription apps differ by platform, so we review yours first."),
    ],
    lead: { sells: ["Vitamins and minerals", "Sports nutrition", "Herbal and botanical", "Wellness and sleep", "Several categories"], gets: ["Crawl and variant check", "Need and ingredient search gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your supplement store back" },
    cta: { title: "Give your supplement store a clearer path to organic sales", lead: "Get a free audit of your variants, collections and content, with the fixes ranked by impact.", heading: "Supplement store review", rows: [["Variant URLs", "Review"], ["Need-based collections", "Gaps"], ["Sourced guides", "Missing"], ["Product markup", "Checked"]] },
  },
  {
    slug: "home-furniture",
    title: "Home & Furniture Ecommerce SEO",
    description: "Ecommerce SEO for home and furniture stores: room and style hubs, buying guides for big-ticket purchases, finish and size variant control and product schema.",
    audience: "Home and furniture ecommerce brands",
    noun: "furniture brand",
    shoppers: "home shoppers",
    icon: "sofa",
    hero: { lines: ["Ecommerce SEO for", "Home & Furniture Brands"], lead: "Grow organic revenue from shoppers researching sofas, beds, tables and decor across a long buying journey.", primary: "Get a free furniture store audit" },
    map: {
      title: "Search map by room", chip: "Home searches, mapped",
      groups: [
        { icon: "sofa", label: "Living room", rows: [["Small sectional sofa", "Mapped"], ["Boucle accent chair", "Gap"], ["Sofa vs loveseat size", "Overlap"]] },
        { icon: "bed", label: "Bedroom", rows: [["Storage bed, king", "Mapped"], ["Linen duvet cover", "Mapped"]] },
        { icon: "lamp", label: "Lighting and decor", rows: [["Arc floor lamp", "Gap"]] },
      ],
    },
    problems: {
      title: "Why furniture stores stall in organic search",
      lead: "Six problems we see in home and furniture catalogues, and what each one costs.",
      items: [
        { id: "variants", title: "“Every fabric, finish and size has its own page.”", text: "One sofa in twelve fabrics and three sizes can spawn dozens of near-identical URLs that compete with each other.", cost: "Rankings split across duplicate pages" },
        { id: "journey", title: "“Shoppers research for weeks before they buy.”", text: "Big-ticket purchases involve comparisons, measurements and inspiration. Stores that only target product terms miss most of that journey.", cost: "Missing the early and middle of the journey" },
        { id: "rooms", title: "“People search by room and style, not by product.”", text: "\"Small living room ideas\" and \"mid-century dining\" are searches a generic category page rarely answers.", cost: "Missing searches close to a purchase" },
        { id: "specs", title: "“Our specs are buried or missing.”", text: "Dimensions, materials and delivery details are what shoppers compare, and what search engines read to match a page to a query.", cost: "Pages that don’t answer the question asked" },
        { id: "marketplace", title: "“Big retailers and marketplaces own the broad terms.”", text: "Terms like \"sofa\" or \"dining table\" are dominated by national chains. Head-on competition is expensive.", cost: "Spend on searches you can’t win" },
        { id: "stock", title: "“Our range changes and pages go stale.”", text: "Discontinued lines, made-to-order items and long lead times leave dead-end pages for shoppers and crawlers.", cost: "Traffic landing on pages that can’t sell" },
      ],
    },
    platformLines: [
      "Fabric, finish and size variants, made-to-order options and collection filters handled without duplicate URLs.",
      "Product attributes, plugin bloat and category archives cleaned up so furniture pages load and index properly.",
      "Faceted navigation for room, material and style kept crawlable where it helps and blocked where it doesn't.",
      "Large home catalogues with thousands of SKUs, grouped and prioritised by template instead of one URL at a time.",
      "Rendering, routing and structured data checked on custom storefronts, including product, dimension and availability markup.",
    ],
    platformChecks: [["Variant URLs", "Collection filters", "Made-to-order pages"], ["Attribute pages", "Plugin weight", "Category archives"], ["Faceted navigation", "URL structure", "Brand pages"], ["Crawl control", "Layered navigation", "Catalogue scale"], ["Rendering", "Routing", "Product markup"]],
    visibilityLead: "Shoppers plan rooms in search results, AI answers, videos and communities before they buy. We check where your store shows up in each, and what to fix.",
    stepText: [
      "We crawl your store and check variants, filters, speed and indexation, so we know where duplicate pages and wasted crawling are costing you.",
      "We group searches by room, style, size and product type, then match each group to one page so your pages stop competing with each other.",
      "We consolidate fabric, finish and size URLs, control filtered pages, clean up redirects and fix product and dimension markup, with dev-ready tickets or direct changes.",
      "Titles, headings, copy and internal links are rewritten for the room hubs, collections and products that matter most, starting with your best sellers.",
      "We publish buying, measuring and styling guides that answer shoppers' questions and lead into your collections.",
      "Each month you see which page groups grew, what they were worth and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Variant URLs", "Review", "warn"], ["Filter pages", "Too many crawled", "bad"], ["Dimension details", "Missing on many", "warn"], ["Product markup", "Checked", "ok"]],
      map: [["small sectional sofa", "Collection"], ["storage bed king", "Collection"], ["how to measure for a sofa", "Guide"], ["boucle chair", "Needs a decision"]],
      fix: { urls: ["/sofa?fabric=linen", "/sofa?fabric=velvet", "/sofa?size=3-seat"], target: "/sofa" },
      page: { crumb: "example-home.com › collections › small-sectional-sofas", title: "Small Sectional Sofas | Example Home", desc: "Compare sizes, fabrics and layouts for smaller living rooms." },
      guides: ["How to measure for a sofa", "Choosing a rug size", "Fabrics, compared", "Small living room ideas"],
      reviewLabel: "Spec check",
      report: ["Collection pages", "Product pages", "Room hubs", "Seasonal pages"],
    },
    mocks: {
      audit: ["Variant URLs", "Core Web Vitals", "Product schema", "Filter pages"],
      serp: { domain: "example-home.com", beforeTitle: "Sofas | Example Home", beforeDesc: "Shop our sofas. Free delivery.", path: "collections › small-sectional-sofas", title: "Small Sectional Sofas | Example Home", desc: "Compare sizes, fabrics and layouts. Delivery details on every page." },
      calendar: ["How to measure for a sofa", "Choosing a rug size", "Fabrics, compared", "Small living room ideas"],
      outreach: ["editor@sample-homemag.com", "team@sample-interiorblog.com", "news@sample-decorguide.com"],
      serviceText: [
        "Variant URLs, crawl, speed and structured data fixed at the root so every product page can rank.",
        "Room hubs and collections by style and size that turn searches into carts.",
        "Buying, measuring and styling guides that carry shoppers through a long decision.",
        "Editorial links from home and interiors publications your customers read.",
        "Traffic is only useful if it buys, even after weeks of research.",
        "Know exactly which pages bring revenue and why.",
      ],
    },
    compareBoost: ["Plans built around furniture catalogues", "Fabric and size variants consolidated deliberately", "Room, style and size targets", "Guides for the whole buying journey", "Organic orders by page group", "A short action list each month"],
    planNote: "Your exact price depends on your store size, category and competition. We confirm it after a free audit.",
    planCategory: "The home category you sell in.",
    faqs: [
      f("Why does furniture ecommerce need its own SEO approach?", "Furniture catalogues combine heavy variants, long research cycles and spec-led comparisons. Those create duplicate pages, thin room hubs and missed journey searches that generic playbooks don't cover."),
      f("How do you handle fabric, finish and size variants?", "We decide which variants deserve their own page, point the rest to a main version and make sure filters don't create endless duplicate URLs. The right answer depends on your platform and how people search."),
      f("Can you help with made-to-order and long lead times?", "Yes. We make sure delivery and lead-time details are clear and consistent on the page and in structured data, so shoppers and search engines know what to expect."),
      f("Can a small furniture brand compete with the big retailers?", "Not on the broadest searches, usually. We aim at niches the big names serve poorly: specific styles, sizes, materials and rooms. Results depend on your competition and how fast changes are published."),
    ],
    lead: { sells: ["Living room", "Bedroom", "Dining and kitchen", "Outdoor", "Decor and lighting", "Several rooms"], gets: ["Crawl and variant check", "Room and style search gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your furniture store back" },
    cta: { title: "Give your furniture store a clearer path to organic sales", lead: "Get a free audit of your variants, room hubs and content, with the fixes ranked by impact.", heading: "Furniture store review", rows: [["Variant URLs", "Review"], ["Room hubs", "Gaps"], ["Buying guides", "Missing"], ["Product markup", "Checked"]] },
  },
  {
    slug: "electronics-gadgets",
    title: "Electronics & Gadgets Ecommerce SEO",
    description: "Ecommerce SEO for electronics and gadget stores: spec-heavy product pages, model and comparison queries, duplicate manufacturer content and discontinued SKU handling.",
    audience: "Electronics and gadget ecommerce brands",
    noun: "electronics brand",
    shoppers: "tech shoppers",
    icon: "smartphone",
    hero: { lines: ["Ecommerce SEO for", "Electronics Brands"], lead: "Grow organic revenue from shoppers comparing models, specs and compatibility before they choose.", primary: "Get a free electronics store audit" },
    map: {
      title: "Search map by product type", chip: "Tech searches, mapped",
      groups: [
        { icon: "smartphone", label: "Phones and tablets", rows: [["Rugged phone case, 15", "Mapped"], ["Wireless charger, fast", "Gap"], ["Tablet stand, adjustable", "Overlap"]] },
        { icon: "headphones", label: "Audio", rows: [["Noise cancelling earbuds", "Mapped"], ["Soundbar for small tv", "Mapped"]] },
        { icon: "laptop", label: "Computing", rows: [["USB-C hub, 7 in 1", "Gap"]] },
      ],
    },
    problems: {
      title: "Why electronics stores stall in organic search",
      lead: "Six problems we see in electronics catalogues, and what each one costs.",
      items: [
        { id: "duplicates", title: "“Our product copy is the manufacturer’s copy.”", text: "Feeds and spec sheets reused across hundreds of stores leave pages that look identical to search engines.", cost: "Pages with nothing that sets them apart" },
        { id: "models", title: "“Shoppers search by model number and compatibility.”", text: "\"Case for model X\" and \"charger compatible with Y\" are exact searches that a generic category rarely answers.", cost: "Missing the searches closest to a purchase" },
        { id: "comparisons", title: "“We don’t have the comparison pages shoppers want.”", text: "\"Model A vs model B\" and \"best for\" searches are central to how tech is bought, and often go unanswered.", cost: "Comparison traffic going to review sites" },
        { id: "discontinued", title: "“Products are replaced every few months.”", text: "Fast model turnover leaves discontinued pages, broken redirects and stale specs behind.", cost: "Traffic landing on pages that can’t sell" },
        { id: "marketplace", title: "“Marketplaces and big retailers own the head terms.”", text: "Terms like \"wireless earbuds\" are dominated by national chains and marketplaces. Head-on competition is expensive.", cost: "Spend on searches you can’t win" },
        { id: "filters", title: "“Spec filters create endless URLs.”", text: "Filtering by brand, spec and price can produce thousands of pages that waste crawling and dilute the ones that matter.", cost: "Crawl budget spent on the wrong pages" },
      ],
    },
    platformLines: [
      "Model and colour variants, spec filters and bundles handled without duplicate URLs.",
      "Product attributes, plugin bloat and category archives cleaned up so electronics pages load and index properly.",
      "Faceted navigation for brand, spec and compatibility kept crawlable where it helps and blocked where it doesn't.",
      "Large electronics catalogues with thousands of SKUs, grouped and prioritised by template instead of one URL at a time.",
      "Rendering, routing and structured data checked on custom storefronts, including product, spec and availability markup.",
    ],
    platformChecks: [["Variant URLs", "Spec filters", "Bundle pages"], ["Attribute pages", "Plugin weight", "Category archives"], ["Faceted navigation", "URL structure", "Brand pages"], ["Crawl control", "Layered navigation", "Catalogue scale"], ["Rendering", "Routing", "Spec markup"]],
    visibilityLead: "Shoppers compare gadgets in search results, AI answers, videos and communities before they buy. We check where your store shows up in each, and what to fix.",
    stepText: [
      "We crawl your store and check variants, spec filters, speed and indexation, and flag pages that mirror manufacturer copy.",
      "We group searches by product type, model, compatibility and comparison, then match each group to one page so your pages stop competing with each other.",
      "We consolidate variant URLs, control spec-filter pages, set rules for discontinued models and fix structured data, with dev-ready tickets or direct changes.",
      "Titles, headings, specs and internal links are rewritten for the collections and products that matter most, starting with your best sellers.",
      "We publish buying, compatibility and comparison guides that answer shoppers' questions and lead into your collections.",
      "Each month you see which page groups grew, what they were worth and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Variant URLs", "Review", "warn"], ["Spec filter pages", "Too many crawled", "bad"], ["Product copy", "Matches the feed", "warn"], ["Product markup", "Checked", "ok"]],
      map: [["noise cancelling earbuds", "Collection"], ["usb-c hub 7 in 1", "Collection"], ["earbuds vs headphones", "Guide"], ["rugged phone case", "Needs a decision"]],
      fix: { urls: ["/earbuds?colour=black", "/earbuds?colour=white", "/earbuds?bundle=case"], target: "/earbuds" },
      page: { crumb: "example-tech.com › collections › noise-cancelling-earbuds", title: "Noise Cancelling Earbuds | Example Tech", desc: "Compare battery life, fit and codecs across popular models." },
      guides: ["How to choose earbuds", "USB-C hubs, compared", "Soundbar buying guide", "Fast chargers explained"],
      reviewLabel: "Spec check",
      report: ["Collection pages", "Product pages", "Comparison guides", "Model pages"],
    },
    mocks: {
      audit: ["Variant URLs", "Core Web Vitals", "Product schema", "Spec filters"],
      serp: { domain: "example-tech.com", beforeTitle: "Earbuds | Example Tech", beforeDesc: "Shop our earbuds. Free shipping.", path: "collections › noise-cancelling-earbuds", title: "Noise Cancelling Earbuds | Example Tech", desc: "Compare battery life, fit and codecs. Specs listed on every page." },
      calendar: ["How to choose earbuds", "USB-C hubs, compared", "Soundbar buying guide", "Fast chargers explained"],
      outreach: ["editor@sample-techmag.com", "team@sample-gadgetblog.com", "news@sample-reviewhub.com"],
      serviceText: [
        "Variant URLs, crawl, speed and structured data fixed at the root so every product page can rank.",
        "Collections by product type, model and compatibility that turn searches into carts.",
        "Comparison and buying guides that answer the questions shoppers ask before they buy.",
        "Editorial links from tech publications and blogs your customers read.",
        "Traffic is only useful if it buys, not just compares.",
        "Know exactly which pages bring revenue and why.",
      ],
    },
    compareBoost: ["Plans built around electronics catalogues", "Variants and spec filters controlled", "Model, spec and comparison targets", "Discontinued models handled by rule", "Organic orders by page group", "A short action list each month"],
    planNote: "Your exact price depends on your store size, category and competition. We confirm it after a free audit.",
    planCategory: "The electronics category you sell in.",
    faqs: [
      f("Why does electronics ecommerce need its own SEO approach?", "Electronics catalogues combine spec-heavy pages, fast model turnover and duplicate manufacturer content. Those create thin pages, dead ends and crawl waste that generic playbooks don't cover."),
      f("How do you deal with manufacturer product descriptions?", "We prioritise the products and categories that matter most and rewrite or extend their copy with details that help shoppers decide: compatibility, use cases and clear specs. Not every page needs a rewrite on day one."),
      f("What do you do about discontinued models?", "It depends on the product. Options include keeping the page with alternatives, redirecting to the closest replacement or removing it. We set a rule for your store and apply it consistently."),
      f("Can you build comparison pages?", "Yes. We plan comparison and buying pages around the searches shoppers actually make, and keep them accurate and honest about trade-offs."),
    ],
    lead: { sells: ["Phones and accessories", "Audio", "Computing", "Smart home", "Cameras and gaming", "Several categories"], gets: ["Crawl and variant check", "Model and comparison search gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your electronics store back" },
    cta: { title: "Give your electronics store a clearer path to organic sales", lead: "Get a free audit of your variants, spec pages and content, with the fixes ranked by impact.", heading: "Electronics store review", rows: [["Variant URLs", "Review"], ["Model collections", "Gaps"], ["Comparison guides", "Missing"], ["Product markup", "Checked"]] },
  },
  {
    slug: "jewelry-accessories",
    title: "Jewelry & Accessories Ecommerce SEO",
    description: "Ecommerce SEO for jewelry and accessories stores: gift-intent collections, image search, material and size variant control and brand-sensitive content.",
    audience: "Jewelry and accessories ecommerce brands",
    noun: "jewelry brand",
    shoppers: "jewelry shoppers",
    icon: "gem",
    hero: { lines: ["Ecommerce SEO for", "Jewelry Brands"], lead: "Grow organic revenue from shoppers searching for the right ring, necklace or gift, with pages as polished as the product.", primary: "Get a free jewelry store audit" },
    map: {
      title: "Search map by piece", chip: "Jewelry searches, mapped",
      groups: [
        { icon: "gem", label: "Rings", rows: [["Lab grown engagement ring", "Mapped"], ["Stackable gold rings", "Gap"], ["Birthstone ring, October", "Overlap"]] },
        { icon: "sparkles", label: "Necklaces", rows: [["Initial necklace, 14k", "Mapped"], ["Layering chain set", "Mapped"]] },
        { icon: "gift", label: "Gifts", rows: [["Anniversary gift for wife", "Gap"]] },
      ],
    },
    problems: {
      title: "Why jewelry stores stall in organic search",
      lead: "Six problems we see in jewelry and accessories catalogues, and what each one costs.",
      items: [
        { id: "variants", title: "“Every metal, stone and size has its own page.”", text: "One ring in three metals, several stones and a dozen sizes can spawn near-identical URLs that compete with each other.", cost: "Rankings split across duplicate pages" },
        { id: "gifts", title: "“Most of our searches are gift searches.”", text: "\"Anniversary gift for her\" and \"birthstone necklace\" are occasion-led. Category pages rarely answer them.", cost: "Missing the searches closest to a purchase" },
        { id: "images", title: "“Our photography is excellent, but search can’t use it.”", text: "Jewelry is bought with the eyes. Missing alt text, heavy files and no image markup waste the strongest asset you have.", cost: "Image search traffic left unclaimed" },
        { id: "trust", title: "“Shoppers need proof before a high-value purchase.”", text: "Materials, certifications, care and returns details support trust. When they're missing or buried, shoppers and search engines look elsewhere.", cost: "Hesitation on high-value pages" },
        { id: "marketplace", title: "“Marketplaces and big retailers own the broad terms.”", text: "Terms like \"gold necklace\" are dominated by large retailers and marketplaces. Head-on competition is expensive.", cost: "Spend on searches you can’t win" },
        { id: "season", title: "“Demand spikes around a few dates.”", text: "Valentine's Day, holidays and wedding season concentrate demand. Pages built late miss the window.", cost: "Seasonal demand missed" },
      ],
    },
    platformLines: [
      "Metal, stone and size variants, personalisation options and collection filters handled without duplicate URLs.",
      "Product attributes, plugin bloat and category archives cleaned up so jewelry pages load and index properly.",
      "Faceted navigation for material, stone and occasion kept crawlable where it helps and blocked where it doesn't.",
      "Large jewelry catalogues with thousands of SKUs, grouped and prioritised by template instead of one URL at a time.",
      "Rendering, routing and structured data checked on custom storefronts, including product and image markup.",
    ],
    platformChecks: [["Variant URLs", "Personalisation pages", "Collection filters"], ["Attribute pages", "Plugin weight", "Category archives"], ["Faceted navigation", "URL structure", "Brand pages"], ["Crawl control", "Layered navigation", "Catalogue scale"], ["Rendering", "Routing", "Image markup"]],
    visibilityLead: "Shoppers look for ideas in search results, AI answers, videos and image feeds before they buy. We check where your store shows up in each, and what to fix.",
    stepText: [
      "We crawl your store and check variants, filters, image weight and indexation, so we know where duplicate pages and wasted crawling are costing you.",
      "We group searches by piece, material, occasion and gift intent, then match each group to one page so your pages stop competing with each other.",
      "We consolidate metal, stone and size URLs, control filtered pages, clean up redirects and fix product and image markup, with dev-ready tickets or direct changes.",
      "Titles, headings, copy, alt text and internal links are rewritten for the collections and products that matter most, starting with your best sellers.",
      "We publish gift, sizing and care guides that answer shoppers' questions and lead into your collections. Material and origin claims are checked with you first.",
      "Each month you see which page groups grew, what they were worth and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Variant URLs", "Review", "warn"], ["Filter pages", "Too many crawled", "bad"], ["Image alt text", "Missing on many", "warn"], ["Product markup", "Checked", "ok"]],
      map: [["stackable gold rings", "Collection"], ["initial necklace 14k", "Collection"], ["how to find your ring size", "Guide"], ["anniversary gifts for her", "Needs a decision"]],
      fix: { urls: ["/ring?metal=gold", "/ring?metal=silver", "/ring?size=7"], target: "/ring" },
      page: { crumb: "example-jewels.com › collections › stackable-gold-rings", title: "Stackable Gold Rings | Example Jewels", desc: "Compare widths, finishes and karats for rings made to layer." },
      guides: ["How to find your ring size", "Gold karats, explained", "Anniversary gift ideas", "Caring for fine jewelry"],
      reviewLabel: "Claims check",
      report: ["Collection pages", "Product pages", "Gift guides", "Seasonal pages"],
    },
    mocks: {
      audit: ["Variant URLs", "Core Web Vitals", "Product schema", "Image markup"],
      serp: { domain: "example-jewels.com", beforeTitle: "Rings | Example Jewels", beforeDesc: "Shop our rings. Free shipping.", path: "collections › stackable-gold-rings", title: "Stackable Gold Rings | Example Jewels", desc: "Compare widths, finishes and karats. Free returns on every order." },
      calendar: ["How to find your ring size", "Gold karats, explained", "Anniversary gift ideas", "Caring for fine jewelry"],
      outreach: ["editor@sample-bridemag.com", "team@sample-styleblog.com", "news@sample-giftguide.com"],
      serviceText: [
        "Variant URLs, crawl, speed and structured data fixed at the root so every product page can rank.",
        "Collections by piece, material and occasion that turn searches into carts.",
        "Gift, sizing and care guides that answer shoppers' questions and build trust.",
        "Editorial links from style and wedding publications your customers read.",
        "Traffic is only useful if it buys, and comes back for the next occasion.",
        "Know exactly which pages bring revenue and why.",
      ],
    },
    compareBoost: ["Plans built around jewelry catalogues", "Metal and size variants consolidated deliberately", "Gift, occasion and material targets", "Image search treated as a channel", "Organic orders by page group", "A short action list each month"],
    planNote: "Your exact price depends on your store size, category and competition. We confirm it after a free audit.",
    planCategory: "The jewelry category you sell in.",
    faqs: [
      f("Why does jewelry ecommerce need its own SEO approach?", "Jewelry catalogues combine heavy variants, gift-led searches and image-driven shopping. Those create duplicate pages, missed occasion intent and wasted visuals that generic playbooks don't cover."),
      f("How do you handle metal, stone and size variants?", "We decide which variants deserve their own page, point the rest to a main version and make sure filters don't create endless duplicate URLs. The right answer depends on your platform and how people search."),
      f("Can you help with image search?", "Yes. We review image file size, names, alt text and markup so your photography can be found in image and visual search, without slowing your pages."),
      f("Do you handle gift and seasonal pages?", "Yes. We plan gift and seasonal pages ahead of the period, keep them live year-round where it makes sense, and update them instead of rebuilding, so links and history carry over."),
    ],
    lead: { sells: ["Rings", "Necklaces and pendants", "Earrings", "Watches", "Bags and accessories", "Several categories"], gets: ["Crawl and variant check", "Gift and occasion search gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your jewelry store back" },
    cta: { title: "Give your jewelry store a clearer path to organic sales", lead: "Get a free audit of your variants, collections and imagery, with the fixes ranked by impact.", heading: "Jewelry store review", rows: [["Variant URLs", "Review"], ["Gift collections", "Gaps"], ["Image alt text", "Missing"], ["Product markup", "Checked"]] },
  },
  {
    slug: "food-beverage",
    title: "Food & Beverage Ecommerce SEO",
    description: "Ecommerce SEO for food and beverage stores: subscription and repeat-order pages, recipe-led discovery, flavour and pack variant control and local intent.",
    audience: "Food and beverage ecommerce brands",
    noun: "food and beverage brand",
    shoppers: "food and drink shoppers",
    icon: "coffee",
    hero: { lines: ["Ecommerce SEO for", "Food & Beverage Brands"], lead: "Grow organic revenue beyond branded search, from shoppers hunting for the right coffee, snack, sauce or subscription.", primary: "Get a free food store audit" },
    map: {
      title: "Search map by product", chip: "Food searches, mapped",
      groups: [
        { icon: "coffee", label: "Coffee and tea", rows: [["Single origin coffee beans", "Mapped"], ["Decaf coffee subscription", "Gap"], ["Loose leaf green tea", "Overlap"]] },
        { icon: "cookie", label: "Snacks", rows: [["Gluten free snack box", "Mapped"], ["Protein bars, low sugar", "Mapped"]] },
        { icon: "utensils", label: "Pantry", rows: [["Small batch hot sauce", "Gap"]] },
      ],
    },
    problems: {
      title: "Why food and drink stores stall in organic search",
      lead: "Six problems we see in food and beverage catalogues, and what each one costs.",
      items: [
        { id: "brand", title: "“Most of our traffic is people who already know us.”", text: "When nearly all organic visits are branded searches, growth depends on awareness bought elsewhere, not on being found.", cost: "Growth capped by brand awareness" },
        { id: "subscriptions", title: "“Subscription pages are hard for search engines to read.”", text: "Plans, frequencies and apps can hide the offer behind scripts or spawn duplicate URLs.", cost: "Your best-value offer is hard to find" },
        { id: "variants", title: "“Every flavour and pack size has its own page.”", text: "One product in several flavours, sizes and multipacks can spawn near-identical URLs that compete with each other.", cost: "Rankings split across duplicate pages" },
        { id: "recipes", title: "“Shoppers discover products through recipes and ideas.”", text: "\"Easy weeknight dinner sauce\" is a search that ends at a product, but only if the store answers it.", cost: "Missing discovery searches" },
        { id: "diet", title: "“Shoppers search by diet and allergen.”", text: "Vegan, gluten-free and nut-free are high-intent filters. Unclear labelling and claims lose trust fast.", cost: "Weak trust, or claims you can’t defend" },
        { id: "season", title: "“Our range is seasonal or limited.”", text: "Limited batches, holiday boxes and sold-out lines leave dead-end pages for shoppers and crawlers.", cost: "Traffic landing on pages that can’t sell" },
      ],
    },
    platformLines: [
      "Flavour and pack variants, bundles and subscription apps handled without duplicate URLs.",
      "Product attributes, plugin bloat and category archives cleaned up so food pages load and index properly.",
      "Faceted navigation for diet, flavour and brand kept crawlable where it helps and blocked where it doesn't.",
      "Large food catalogues with thousands of SKUs, grouped and prioritised by template instead of one URL at a time.",
      "Rendering, routing and structured data checked on custom storefronts, including product, recipe and availability markup.",
    ],
    platformChecks: [["Variant URLs", "Subscription app pages", "Bundle pages"], ["Attribute pages", "Plugin weight", "Category archives"], ["Faceted navigation", "URL structure", "Brand pages"], ["Crawl control", "Layered navigation", "Catalogue scale"], ["Rendering", "Routing", "Recipe markup"]],
    visibilityLead: "Shoppers find food ideas in search results, AI answers, videos and communities before they buy. We check where your store shows up in each, and what to fix.",
    stepText: [
      "We crawl your store and check variants, subscription pages, speed and indexation, so we know where duplicate pages and wasted crawling are costing you.",
      "We group searches by product type, diet, occasion and recipe, then match each group to one page so your pages stop competing with each other.",
      "We consolidate flavour and pack URLs, control filtered pages, clean up redirects and fix product and recipe markup, with dev-ready tickets or direct changes.",
      "Titles, headings, copy and internal links are rewritten for the collections and products that matter most, starting with your best sellers.",
      "We publish recipe, pairing and buying guides that lead into your products. Dietary and sourcing claims are flagged and agreed with you first.",
      "Each month you see which page groups grew, what they were worth and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Variant URLs", "Review", "warn"], ["Filter pages", "Too many crawled", "bad"], ["Subscription pages", "Hard to crawl", "warn"], ["Product markup", "Checked", "ok"]],
      map: [["single origin coffee beans", "Collection"], ["gluten free snack box", "Collection"], ["how to brew pour over", "Guide"], ["healthy snacks", "Needs a decision"]],
      fix: { urls: ["/coffee?size=250g", "/coffee?size=1kg", "/coffee?grind=whole"], target: "/coffee" },
      page: { crumb: "example-pantry.com › collections › single-origin-coffee", title: "Single Origin Coffee | Example Pantry", desc: "Compare origins, roasts and tasting notes, with subscription options." },
      guides: ["How to brew pour over", "Roast levels, explained", "Easy weeknight sauces", "Building a snack box"],
      reviewLabel: "Claims check",
      report: ["Collection pages", "Product pages", "Recipe guides", "Seasonal pages"],
    },
    mocks: {
      audit: ["Variant URLs", "Core Web Vitals", "Product schema", "Subscription pages"],
      serp: { domain: "example-pantry.com", beforeTitle: "Coffee | Example Pantry", beforeDesc: "Shop our coffee. Free shipping.", path: "collections › single-origin-coffee", title: "Single Origin Coffee | Example Pantry", desc: "Compare origins, roasts and tasting notes. Subscribe and save on repeat orders." },
      calendar: ["How to brew pour over", "Roast levels, explained", "Easy weeknight sauces", "Building a snack box"],
      outreach: ["editor@sample-foodmag.com", "team@sample-recipeblog.com", "news@sample-eatguide.com"],
      serviceText: [
        "Variant URLs, crawl, speed and structured data fixed at the root so every product page can rank.",
        "Collections by product, diet and occasion that turn searches into carts.",
        "Recipe, pairing and buying guides that lead shoppers to your products.",
        "Editorial links from food publications and blogs your customers read.",
        "Traffic is only useful if it buys, or subscribes.",
        "Know exactly which pages bring revenue and why.",
      ],
    },
    compareBoost: ["Plans built around food and drink catalogues", "Flavour and pack variants consolidated", "Diet, occasion and recipe targets", "Subscription pages made crawlable", "Organic orders by page group", "A short action list each month"],
    planNote: "Your exact price depends on your store size, category and competition. We confirm it after a free audit.",
    planCategory: "The food or drink category you sell in.",
    faqs: [
      f("Why does food and beverage ecommerce need its own SEO approach?", "Food catalogues combine heavy flavour and pack variants, subscriptions, recipe-led discovery and dietary claims. Those create duplicate pages, hidden offers and trust questions that generic playbooks don't cover."),
      f("Can you help with subscription and repeat-order pages?", "Yes. We check that subscription offers are crawlable, explained clearly and not creating duplicate pages. Subscription apps differ by platform, so we review yours first."),
      f("Do you create recipe content?", "We plan and publish recipe and pairing content that leads into your products. Where dietary or sourcing claims are involved, we flag them and agree wording with you first."),
      f("How do you deal with limited and seasonal products?", "We plan seasonal pages ahead of the period, keep them live year-round where it makes sense, and handle sold-out lines so shoppers and search engines aren't left at dead ends."),
    ],
    lead: { sells: ["Coffee and tea", "Snacks and sweets", "Pantry and sauces", "Drinks", "Meal kits and boxes", "Several categories"], gets: ["Crawl and variant check", "Product and recipe search gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your food store back" },
    cta: { title: "Give your food and drink store a clearer path to organic sales", lead: "Get a free audit of your variants, subscription pages and content, with the fixes ranked by impact.", heading: "Food store review", rows: [["Variant URLs", "Review"], ["Diet collections", "Gaps"], ["Recipe guides", "Missing"], ["Product markup", "Checked"]] },
  },
  {
    slug: "sports-outdoors",
    title: "Sports & Outdoors Ecommerce SEO",
    description: "Ecommerce SEO for sports and outdoor gear stores: activity hubs, gear guides, seasonal demand planning and size and spec variant control.",
    audience: "Sports and outdoor gear ecommerce brands",
    noun: "outdoor brand",
    shoppers: "outdoor shoppers",
    icon: "mountain",
    hero: { lines: ["Ecommerce SEO for", "Sports & Outdoor Brands"], lead: "Grow organic revenue from shoppers searching for the right gear for their sport, trip or season.", primary: "Get a free outdoor store audit" },
    map: {
      title: "Search map by activity", chip: "Gear searches, mapped",
      groups: [
        { icon: "mountain", label: "Hiking and camping", rows: [["Lightweight 2 person tent", "Mapped"], ["Waterproof hiking boots, wide", "Gap"], ["Sleeping bag temperature rating", "Overlap"]] },
        { icon: "bike", label: "Cycling", rows: [["Gravel bike helmet", "Mapped"], ["Bike light, rechargeable", "Mapped"]] },
        { icon: "dumbbell", label: "Fitness", rows: [["Adjustable dumbbell set", "Gap"]] },
      ],
    },
    problems: {
      title: "Why outdoor stores stall in organic search",
      lead: "Six problems we see in sports and outdoor catalogues, and what each one costs.",
      items: [
        { id: "variants", title: "“Every size, colour and spec has its own page.”", text: "One jacket or tent in several sizes, colours and capacities can spawn near-identical URLs that compete with each other.", cost: "Rankings split across duplicate pages" },
        { id: "activity", title: "“Shoppers search by activity, not by product.”", text: "\"What to pack for a weekend hike\" and \"gear for beginner climbers\" are searches a generic category rarely answers.", cost: "Missing the searches closest to a purchase" },
        { id: "season", title: "“Demand is intensely seasonal.”", text: "Ski, camping and cycling demand peaks fast. Pages built late miss the window, and pages removed after it lose their history.", cost: "Seasonal peaks missed or reset" },
        { id: "specs", title: "“Gear specs decide the sale, and ours are thin.”", text: "Weight, fabric ratings and fit details are what shoppers compare, and what search engines match to queries.", cost: "Pages that don’t answer the question asked" },
        { id: "marketplace", title: "“Big retailers and marketplaces own the head terms.”", text: "Terms like \"hiking boots\" are dominated by national chains and marketplaces. Head-on competition is expensive.", cost: "Spend on searches you can’t win" },
        { id: "stock", title: "“Models change every year.”", text: "Annual model refreshes leave discontinued pages and outdated specs behind.", cost: "Traffic landing on pages that can’t sell" },
      ],
    },
    platformLines: [
      "Size, colour and spec variants, bundles and collection filters handled without duplicate URLs.",
      "Product attributes, plugin bloat and category archives cleaned up so gear pages load and index properly.",
      "Faceted navigation for activity, brand and size kept crawlable where it helps and blocked where it doesn't.",
      "Large gear catalogues with thousands of SKUs, grouped and prioritised by template instead of one URL at a time.",
      "Rendering, routing and structured data checked on custom storefronts, including product and availability markup.",
    ],
    platformChecks: [["Variant URLs", "Collection filters", "Bundle pages"], ["Attribute pages", "Plugin weight", "Category archives"], ["Faceted navigation", "URL structure", "Brand pages"], ["Crawl control", "Layered navigation", "Catalogue scale"], ["Rendering", "Routing", "Product markup"]],
    visibilityLead: "Shoppers research gear in search results, AI answers, videos and communities before they buy. We check where your store shows up in each, and what to fix.",
    stepText: [
      "We crawl your store and check variants, filters, speed and indexation, so we know where duplicate pages and wasted crawling are costing you.",
      "We group searches by activity, gear type, skill level and season, then match each group to one page so your pages stop competing with each other.",
      "We consolidate size and colour URLs, control filtered pages, set rules for last year's models and fix structured data, with dev-ready tickets or direct changes.",
      "Titles, headings, specs and internal links are rewritten for the activity hubs, collections and products that matter most, starting with your best sellers.",
      "We publish gear, fit and trip-planning guides that answer shoppers' questions and lead into your collections. Performance and safety claims are checked with you first.",
      "Each month you see which page groups grew, what they were worth and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Variant URLs", "Review", "warn"], ["Filter pages", "Too many crawled", "bad"], ["Spec details", "Thin on many", "warn"], ["Product markup", "Checked", "ok"]],
      map: [["lightweight 2 person tent", "Collection"], ["gravel bike helmet", "Collection"], ["what to pack for a weekend hike", "Guide"], ["trail running shoes", "Needs a decision"]],
      fix: { urls: ["/tent?size=2p", "/tent?size=3p", "/tent?colour=green"], target: "/tent" },
      page: { crumb: "example-trail.com › collections › lightweight-tents", title: "Lightweight Tents | Example Trail", desc: "Compare weight, capacity and season ratings for backpacking tents." },
      guides: ["How to choose a tent", "Sleeping bag ratings, explained", "Weekend hike packing list", "Sizing a bike helmet"],
      reviewLabel: "Claims check",
      report: ["Collection pages", "Product pages", "Gear guides", "Seasonal pages"],
    },
    mocks: {
      audit: ["Variant URLs", "Core Web Vitals", "Product schema", "Filter pages"],
      serp: { domain: "example-trail.com", beforeTitle: "Tents | Example Trail", beforeDesc: "Shop our tents. Free shipping.", path: "collections › lightweight-tents", title: "Lightweight Tents | Example Trail", desc: "Compare weight, capacity and season ratings. Specs listed on every page." },
      calendar: ["How to choose a tent", "Sleeping bag ratings, explained", "Weekend hike packing list", "Sizing a bike helmet"],
      outreach: ["editor@sample-outdoormag.com", "team@sample-trailblog.com", "news@sample-gearguide.com"],
      serviceText: [
        "Variant URLs, crawl, speed and structured data fixed at the root so every product page can rank.",
        "Activity hubs and collections by gear type that turn searches into carts.",
        "Gear, fit and trip-planning guides that answer shoppers' questions and build trust.",
        "Editorial links from outdoor and sports publications your customers read.",
        "Traffic is only useful if it buys, in season and out.",
        "Know exactly which pages bring revenue and why.",
      ],
    },
    compareBoost: ["Plans built around gear catalogues", "Variants consolidated deliberately", "Activity, gear and skill-level targets", "Seasonal pages planned ahead", "Organic orders by page group", "A short action list each month"],
    planNote: "Your exact price depends on your store size, category and competition. We confirm it after a free audit.",
    planCategory: "The sport or outdoor category you sell in.",
    faqs: [
      f("Why does sports and outdoor ecommerce need its own SEO approach?", "Gear catalogues combine heavy variants, spec-led comparisons and sharp seasonal demand. Those create duplicate pages, thin specs and missed seasonal windows that generic playbooks don't cover."),
      f("How do you plan for seasonal demand?", "We plan seasonal pages and guides ahead of the period, keep evergreen URLs live year-round and update them each season, so links and history carry over instead of resetting."),
      f("How do you handle yearly model changes?", "We decide whether to update the existing page, redirect to the new model or keep the old page with alternatives. We set a rule for your store and apply it consistently."),
      f("Can a smaller outdoor brand compete with the big retailers?", "Not on the broadest searches, usually. We aim at niches the big names serve poorly: specific activities, skill levels, sizes and brands. Results depend on your competition and how fast changes are published."),
    ],
    lead: { sells: ["Hiking and camping", "Cycling", "Running and fitness", "Water sports", "Winter sports", "Several activities"], gets: ["Crawl and variant check", "Activity and gear search gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your outdoor store back" },
    cta: { title: "Give your outdoor store a clearer path to organic sales", lead: "Get a free audit of your variants, activity hubs and content, with the fixes ranked by impact.", heading: "Outdoor store review", rows: [["Variant URLs", "Review"], ["Activity hubs", "Gaps"], ["Gear guides", "Missing"], ["Product markup", "Checked"]] },
  },
  {
    slug: "baby-kids",
    title: "Baby & Kids Ecommerce SEO",
    description: "Ecommerce SEO for baby and kids stores: age and stage hubs, safety-aware content, gift lists, size variant control and revenue-tied reporting.",
    audience: "Baby and kids ecommerce brands",
    noun: "baby and kids brand",
    shoppers: "parents",
    icon: "baby",
    hero: { lines: ["Ecommerce SEO for", "Baby & Kids Brands"], lead: "Grow organic revenue from parents searching for the right gear, clothes and toys for each age and stage.", primary: "Get a free baby store audit" },
    map: {
      title: "Search map by age and stage", chip: "Parent searches, mapped",
      groups: [
        { icon: "baby", label: "Newborn and baby", rows: [["Newborn sleep sack", "Mapped"], ["Convertible car seat, rear facing", "Gap"], ["Baby carrier for newborns", "Overlap"]] },
        { icon: "blocks", label: "Toddler and play", rows: [["Wooden toys for 2 year olds", "Mapped"], ["Toddler bed rail", "Mapped"]] },
        { icon: "gift", label: "Gifts", rows: [["New baby gift set", "Gap"]] },
      ],
    },
    problems: {
      title: "Why baby and kids stores stall in organic search",
      lead: "Six problems we see in baby and kids catalogues, and what each one costs.",
      items: [
        { id: "stage", title: "“Parents search by age and stage, not by category.”", text: "\"Toys for 18 month olds\" and \"newborn essentials\" are different searches from \"toys\" and \"clothes\". Generic collections rarely answer either.", cost: "Missing the searches closest to a purchase" },
        { id: "variants", title: "“Every size and colour has its own page.”", text: "One item in several ages, sizes and colours can spawn near-identical URLs that compete with each other.", cost: "Rankings split across duplicate pages" },
        { id: "safety", title: "“Safety information has to be right.”", text: "Age grades, certifications and safety guidance matter to parents and to search engines. Vague or unsupported claims erode trust fast.", cost: "Weak trust, or claims you can’t defend" },
        { id: "growth", title: "“Customers outgrow what they buy.”", text: "Children move through stages quickly. Pages that don't guide parents to the next stage miss repeat purchases.", cost: "Repeat purchases left to chance" },
        { id: "marketplace", title: "“Big retailers and marketplaces own the head terms.”", text: "Terms like \"baby clothes\" are dominated by national chains and marketplaces. Head-on competition is expensive.", cost: "Spend on searches you can’t win" },
        { id: "gifts", title: "“Much of our demand is gifting.”", text: "Baby showers, birthdays and holidays are occasion-led. Pages built late miss the window.", cost: "Gift demand missed" },
      ],
    },
    platformLines: [
      "Size, age and colour variants, bundles and gift sets handled without duplicate URLs.",
      "Product attributes, plugin bloat and category archives cleaned up so baby and kids pages load and index properly.",
      "Faceted navigation for age, stage and brand kept crawlable where it helps and blocked where it doesn't.",
      "Large baby and kids catalogues with thousands of SKUs, grouped and prioritised by template instead of one URL at a time.",
      "Rendering, routing and structured data checked on custom storefronts, including product and age-range markup.",
    ],
    platformChecks: [["Variant URLs", "Gift set pages", "Collection filters"], ["Attribute pages", "Plugin weight", "Category archives"], ["Faceted navigation", "URL structure", "Brand pages"], ["Crawl control", "Layered navigation", "Catalogue scale"], ["Rendering", "Routing", "Age-range markup"]],
    visibilityLead: "Parents research products in search results, AI answers, videos and communities before they buy. We check where your store shows up in each, and what to fix.",
    stepText: [
      "We crawl your store and check variants, filters, speed and indexation, so we know where duplicate pages and wasted crawling are costing you.",
      "We group searches by age, stage, product type and gift occasion, then match each group to one page so your pages stop competing with each other.",
      "We consolidate size and colour URLs, control filtered pages, clean up redirects and fix product and age-range markup, with dev-ready tickets or direct changes.",
      "Titles, headings, copy and internal links are rewritten for the age hubs, collections and products that matter most, starting with your best sellers.",
      "We publish age, stage and buying guides that answer parents' questions and lead into your collections. Safety claims are flagged and agreed with you first.",
      "Each month you see which page groups grew, what they were worth and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Variant URLs", "Review", "warn"], ["Filter pages", "Too many crawled", "bad"], ["Age-range details", "Missing on many", "warn"], ["Product markup", "Checked", "ok"]],
      map: [["newborn sleep sack", "Collection"], ["wooden toys 2 year olds", "Collection"], ["when to switch car seats", "Guide"], ["baby shower gifts", "Needs a decision"]],
      fix: { urls: ["/sleep-sack?size=0-6m", "/sleep-sack?size=6-12m", "/sleep-sack?colour=sage"], target: "/sleep-sack" },
      page: { crumb: "example-little.com › collections › newborn-sleep-sacks", title: "Newborn Sleep Sacks | Example Little", desc: "Compare sizes, fabrics and tog ratings for newborn sleep sacks." },
      guides: ["Newborn essentials checklist", "Choosing a car seat", "Toys by age", "Baby shower gift ideas"],
      reviewLabel: "Safety check",
      report: ["Collection pages", "Product pages", "Age-stage guides", "Seasonal pages"],
    },
    mocks: {
      audit: ["Variant URLs", "Core Web Vitals", "Product schema", "Filter pages"],
      serp: { domain: "example-little.com", beforeTitle: "Sleep Sacks | Example Little", beforeDesc: "Shop our sleep sacks. Free shipping.", path: "collections › newborn-sleep-sacks", title: "Newborn Sleep Sacks | Example Little", desc: "Compare sizes, fabrics and tog ratings. Age guidance on every page." },
      calendar: ["Newborn essentials checklist", "Choosing a car seat", "Toys by age", "Baby shower gift ideas"],
      outreach: ["editor@sample-parentmag.com", "team@sample-momblog.com", "news@sample-babyguide.com"],
      serviceText: [
        "Variant URLs, crawl, speed and structured data fixed at the root so every product page can rank.",
        "Hubs and collections by age and stage that turn searches into carts.",
        "Age, stage and buying guides that answer parents' questions and build trust.",
        "Editorial links from parenting publications and blogs your customers read.",
        "Traffic is only useful if it buys, and comes back for the next stage.",
        "Know exactly which pages bring revenue and why.",
      ],
    },
    compareBoost: ["Plans built around baby and kids catalogues", "Size and colour variants consolidated", "Age, stage and gift targets", "Safety claims reviewed with you", "Organic orders by page group", "A short action list each month"],
    planNote: "Your exact price depends on your store size, category and competition. We confirm it after a free audit.",
    planCategory: "The baby or kids category you sell in.",
    faqs: [
      f("Why does baby and kids ecommerce need its own SEO approach?", "Baby and kids catalogues combine heavy size variants, age-and-stage searches and safety-sensitive copy. Those create duplicate pages, thin age hubs and trust questions that generic playbooks don't cover."),
      f("Do you write content about safety and development?", "We write age, stage and buying guides, but we avoid safety or medical claims we can't support. Where a claim needs a standard, manufacturer or published source, we flag it and agree wording with you first."),
      f("How do you handle size and colour variants?", "We decide which variants deserve their own page, point the rest to a main version and make sure filters don't create endless duplicate URLs. The right answer depends on your platform and how people search."),
      f("Can you help with gift lists and seasonal pages?", "Yes. We plan gift and seasonal pages ahead of the period, keep them live year-round where it makes sense, and update them instead of rebuilding, so links and history carry over."),
    ],
    lead: { sells: ["Baby gear", "Baby clothing", "Toys and play", "Nursery and furniture", "Kids clothing", "Several categories"], gets: ["Crawl and variant check", "Age and stage search gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your baby store back" },
    cta: { title: "Give your baby and kids store a clearer path to organic sales", lead: "Get a free audit of your variants, age hubs and content, with the fixes ranked by impact.", heading: "Baby store review", rows: [["Variant URLs", "Review"], ["Age and stage hubs", "Gaps"], ["Buying guides", "Missing"], ["Product markup", "Checked"]] },
  },
];

export const industryPageBySlug = (slug: string) => industryPages.find((p) => p.slug === slug);
