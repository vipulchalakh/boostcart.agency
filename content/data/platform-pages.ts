/* Copy for /platforms/[slug] (every platform in the mega menu and footer).
   Positioning and scope statements only: no client results, logos or statistics. Mock searches, URLs and statuses are fictional examples.
   Owner to review the engagement terms and pricing before launch. */
import type { Faq } from "./types";
import type { FitItem } from "./fit";
import type { Platform } from "./platforms";
import type { PetProblem, PetStep, PetWhy } from "./pet-industry";

export type PlatformTone = "ok" | "warn" | "bad" | "dim";
export type AreaIcon = "layers" | "puzzle" | "gauge" | "braces" | "globe" | "filter" | "route" | "server" | "repeat" | "database" | "file-code" | "shopping-bag";

export type PlatformPage = {
  slug: string;
  /** Platform name as used in running copy, e.g. "Shopify". */
  name: string;
  /** Page title, e.g. "Shopify SEO Services". */
  title: string;
  description: string;
  icon: Platform["icon"];
  /** CSS variable from tokens.css. */
  brand: string;
  /** Official brand mark in /public/logos. Headless has none, so it gets a neutral code mark. */
  logo?: { src: string; w: number; h: number };
  hero: { lines: [string, string]; lead: string; note: string };
  /** Hero artwork. When set, it replaces the audit card. */
  art?: { src: string; w: number; h: number; alt: string };
  /** Hero visual when there is no artwork: a fictional platform audit. */
  audit: { title: string; score: number; rows: Array<[string, string, PlatformTone]>; chip: string };
  fit: { good: FitItem[]; notFit: FitItem[] };
  problems: { title: string; lead: string; items: PetProblem[] };
  areas: { title: string; lead: string; items: Array<{ icon: AreaIcon; title: string; text: string; checks: [string, string, string] }> };
  stepText: [string, string, string, string, string, string];
  scenes: {
    audit: Array<[string, string, PlatformTone]>;
    map: Array<[string, string]>;
    fix: { title: string; urls: [string, string, string]; target: string };
    page: { crumb: string; title: string; desc: string };
    guides: [string, string, string, string];
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
  faqs: [Faq, Faq, Faq, Faq];
  lead: { gets: [string, string, string]; headline: string };
  cta: { title: string; lead: string; heading: string; rows: [[string, string], [string, string], [string, string], [string, string]] };
};

const f = (q: string, a: string): Faq => ({ q, a, sample: false });

/* ---------- Shared blocks, worded for the platform ---------- */

export const platformCommon = {
  compare: ["One checklist for every platform", "Fixes that ignore how the platform works", "Tickets your developers can't use", "Apps and plugins left unchecked", "Traffic charts, no order data", "Long reports with no next steps"],
  sells: ["Fashion and apparel", "Beauty and skincare", "Health and supplements", "Home and furniture", "Electronics", "Food and drink", "Sports and outdoors", "Something else"],
};

export const platformWhy = (p: PlatformPage): PetWhy[] => [
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
    id: "platform", image: "/images/pet-why/catalogue.jpg", tab: `${p.name} know-how`, title: `Fixes written for ${p.name}.`,
    text: `Recommendations fit how ${p.name} actually works, so your team or developer can ship them without guesswork.`,
    cards: [
      { title: "Platform-aware fixes", text: `Every recommendation names the ${p.name} setting, template or app it touches.`, chip: "No generic advice" },
      { title: "Minor fixes included", text: "Small SEO changes are part of the retainer, with no development charges.", chip: "No dev fees" },
      { title: "Your developers welcome", text: "Bigger changes come as clear tickets with acceptance checks, so nothing stalls in translation.", chip: "Dev-ready tickets" },
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
    id: "multi-platform", image: "/images/pet-why/multi-platform.jpg", tab: "Search and AI", title: "Multi-platform SEO: not just Google.",
    text: "Shoppers search beyond Google. We work to get your store found on Bing, YouTube, ChatGPT, Gemini, Perplexity and Reddit too.",
    cards: [
      { title: "Google and Bing", text: "Strong rankings in both search engines, the foundation everything else builds on.", chip: "Google and Bing" },
      { title: "AI answers", text: "We check whether ChatGPT, Gemini and Perplexity mention your store, and shape pages so they are easy to cite.", chip: "ChatGPT, Gemini, Perplexity" },
      { title: "Video and communities", text: "We map the questions your customers ask on YouTube and Reddit and answer them in your guides and pages.", chip: "YouTube and Reddit" },
    ],
  },
];

const stepSkeleton = (p: PlatformPage): Array<Omit<PetStep, "description">> => [
  { id: "audit", title: "Platform audit", short: `We find what holds your ${p.name} store back.`, outputs: ["Crawl and index report", `${p.name} settings review`, "Quick-win list"] },
  { id: "map", title: "Search map", short: "Shopper searches matched to pages.", outputs: ["Keyword-to-page map", "Gaps and overlaps", "Intent groups"] },
  { id: "fix", title: "Technical fixes", short: `${p.name}-specific issues fixed at the root.`, outputs: ["Duplicate URL rules", "Crawl control", "Structured data"] },
  { id: "pages", title: "Category and product pages", short: "Pages rebuilt to rank and to sell.", outputs: ["Rewritten titles", "Category copy", "Internal links"] },
  { id: "guides", title: "Content and guides", short: "Buying guides that lead into your categories.", outputs: ["Buying guides", "Comparison pages", "Content calendar"] },
  { id: "report", title: "Report and refine", short: "One monthly report tied to revenue.", outputs: ["Monthly report", "Page-group trends", "Next-step list"] },
];

export const platformSteps = (p: PlatformPage): PetStep[] =>
  stepSkeleton(p).map((s, i) => ({ ...s, description: p.stepText[i], outputs: s.outputs as [string, string, string] }));

export const platformPlan = (p: PlatformPage) => ({
  note: "Your exact price depends on your store size, setup and competition. We confirm it after a free audit.",
  factors: [
    { title: "Store size", text: "How many products and categories you carry." },
    { title: `${p.name} setup`, text: "Your theme, apps and any custom development." },
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

export const platformFaqs = (p: PlatformPage): Faq[] => [
  ...p.faqs,
  f(`Do you work with our ${p.name} developer or agency?`, "Yes. Minor SEO fixes are included and we can make them ourselves. Larger changes come as clear tickets with acceptance checks, so your developer or agency can ship them and we re-check once they are live."),
  f("How long until we see results?", "It depends on your starting point, competition and how quickly changes are published. We agree a plan and timing after the audit, and we report progress every month rather than promising a date."),
  f("Can you guarantee rankings or sales?", "No. Search engines decide rankings, and competition and authority matter. We can improve your pages and structure, report honestly and adjust the plan as results come in."),
  f("Do you work only on organic search?", "Yes. Organic search is the only channel we work on, so the whole retainer goes into it. We do not sell paid ads, social or email add-ons."),
  f(`How much does ${p.name} SEO cost?`, "One plan, $1,000 to $1,500 per month, depending on your store size, setup and competition. It covers unlimited pages, content and optimization required to deliver results, and there are no development charges for minor SEO fixes. We confirm your exact price after a free audit."),
];

/* ---------- Platforms ---------- */

export const platformPages: PlatformPage[] = [
  {
    slug: "shopify",
    name: "Shopify",
    title: "Shopify SEO Services",
    description: "Shopify SEO for stores on Shopify and Shopify Plus: duplicate collection URLs, app bloat, theme speed, structured data, Markets and AI search visibility. Get a free Shopify audit.",
    icon: "bag",
    brand: "var(--brand-shopify)",
    logo: { src: "/logos/shopify.svg", w: 56, h: 44 },
    art: { src: "/images/platforms/shopify-engine.png", w: 1536, h: 1024, alt: "A Shopify-branded jet engine with a storefront window showing a t-shirt, a sneaker and headphones" },
    hero: { lines: ["Shopify SEO That", "Grows Organic Sales"], lead: "Fix the duplicate URLs, app bloat and thin collections that hold Shopify stores back, then grow the pages shoppers actually search for.", note: "Shopify · Shopify Plus · Markets · Hydrogen" },
    audit: {
      title: "Shopify store audit", score: 94, chip: "Built for Shopify",
      rows: [["/collections/*/products/* paths", "Duplicate", "bad"], ["Variant ?variant= URLs", "Review", "warn"], ["Unused app scripts", "Slowing pages", "warn"], ["Product schema", "Checked", "ok"], ["robots.txt.liquid", "Checked", "ok"]],
    },
    fit: {
      good: [
        { title: "Shopify and Shopify Plus stores", text: "You have a live catalogue and want organic search to bring in more of your orders." },
        { title: "Stores with lots of apps", text: "Reviews, filters, bundles and subscriptions have piled up, and pages feel slower every month." },
        { title: "Thin or duplicate collections", text: "Collections and tag pages exist, but few of them rank for what shoppers search." },
        { title: "Selling in several markets", text: "Shopify Markets, currencies or languages need the right hreflang and indexing." },
        { title: "Theme changes or redesigns", text: "A new theme or redesign is coming and you want rankings kept safe." },
        { title: "Hydrogen or headless plans", text: "You're moving the storefront off Liquid and need rendering and routing checked." },
      ],
      notFit: [
        { title: "Stores that haven't launched", text: "With no pages to crawl yet, set up the store first and bring us in before launch." },
        { title: "Anyone expecting guaranteed rankings", text: "We improve what Google sees and report honestly. Nobody can promise positions." },
        { title: "Paid ads or social only", text: "We work on organic search only. For ads or social, a channel specialist fits better." },
      ],
    },
    problems: {
      title: "Why Shopify stores stall in organic search",
      lead: "Six problems we see on Shopify, and what each one costs.",
      items: [
        { id: "paths", title: "Every product lives at two or more URLs.", text: "Shopify links products through /collections/name/products/item as well as /products/item. The canonical helps, but internal links still point at the duplicates.", cost: "Link signals split across duplicate URLs" },
        { id: "apps", title: "Our apps keep slowing the store down.", text: "Each review, upsell or chat app adds scripts, and many stay behind in the theme after the app is removed.", cost: "Slower pages and weaker Core Web Vitals" },
        { id: "tags", title: "Tag filters created hundreds of thin pages.", text: "Collection tag URLs like /collections/shirts/blue get crawled and indexed with no unique copy, titles or purpose.", cost: "Crawling spent on pages that can't rank" },
        { id: "collections", title: "Our collections are just product grids.", text: "No intro copy, generic titles and no internal links, so collections rarely rank for the category searches they should own.", cost: "Missing the searches closest to a purchase" },
        { id: "schema", title: "Theme and apps both add product markup.", text: "Duplicate or conflicting Product schema from the theme and a review app confuses rich results and AI tools.", cost: "Rich results and AI citations lost" },
        { id: "markets", title: "International stores show the wrong version.", text: "Markets, subfolders and translated URLs need correct hreflang and canonicals, or Google picks the wrong page for each country.", cost: "Shoppers land on the wrong market" },
      ],
    },
    areas: {
      title: "What we fix on Shopify",
      lead: "Shopify handles a lot for you, and locks some things down. We work within its rules, from Liquid templates to apps and Markets.",
      items: [
        { icon: "route", title: "URLs and duplicates", text: "Internal links pointed at canonical product URLs, tag pages controlled and redirects cleaned up.", checks: ["Collection paths", "Tag pages", "Redirects"] },
        { icon: "puzzle", title: "Apps and scripts", text: "Every app checked for the weight it adds, the markup it injects and the code it left behind.", checks: ["Leftover code", "Script weight", "App markup"] },
        { icon: "file-code", title: "Liquid theme", text: "Titles, headings, pagination and robots.txt.liquid set in the theme so the rules hold for every page.", checks: ["Templates", "robots.txt.liquid", "Pagination"] },
        { icon: "layers", title: "Collections", text: "Collections rebuilt with copy, filters and internal links so they rank for category searches.", checks: ["Collection copy", "Filter control", "Internal links"] },
        { icon: "braces", title: "Structured data", text: "One clean set of Product, Offer, Review and Breadcrumb markup, with theme and app duplicates removed.", checks: ["Product schema", "Reviews", "Breadcrumbs"] },
        { icon: "globe", title: "Markets", text: "Subfolders, languages and currencies set up so every country sees its own page.", checks: ["Hreflang", "Market URLs", "Translations"] },
      ],
    },
    stepText: [
      "We crawl your Shopify store and review the theme, apps, collections and Search Console, so we know where duplicate URLs, slow scripts and wasted crawling are costing you.",
      "We group searches by category, product type and intent, then match each group to one collection, product or guide so pages stop competing with each other.",
      "We point internal links at canonical URLs, control tag and filter pages, remove leftover app code and fix structured data, with direct changes or dev-ready tickets.",
      "Collection and product titles, headings, copy and internal links are rewritten for the pages that matter most, starting with your best sellers.",
      "We publish buying guides and comparison pages that answer shoppers' questions and link into your collections.",
      "Each month you see which page groups grew, what they were worth in Shopify orders and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Duplicate product paths", "Found", "bad"], ["Tag pages indexed", "Too many", "warn"], ["Leftover app code", "Review", "warn"], ["Product schema", "Checked", "ok"]],
      map: [["linen shirts for men", "Collection"], ["best running shoes", "Guide"], ["merino wool socks", "Collection"], ["shoe size guide", "Needs a decision"]],
      fix: { title: "Duplicate URL clean-up", urls: ["/collections/shirts/products/linen", "/collections/sale/products/linen", "/products/linen?variant=4112"], target: "/products/linen" },
      page: { crumb: "example-store.com › collections › linen-shirts", title: "Men's Linen Shirts | Example Store", desc: "Breathable linen shirts in short and long sleeve. Free returns." },
      guides: ["How to choose a linen shirt", "Linen vs cotton, compared", "Shirt size guide", "Caring for linen"],
      report: ["Collections", "Product pages", "Buying guides", "Blog posts"],
    },
    mocks: {
      audit: ["Duplicate paths", "App scripts", "Product schema", "Tag pages"],
      serp: { domain: "example-store.com", beforeTitle: "Shirts – Example Store", beforeDesc: "Shop shirts. Free shipping.", path: "collections › linen-shirts", title: "Men's Linen Shirts | Example Store", desc: "Breathable linen in short and long sleeve. Free returns." },
      calendar: ["How to choose a linen shirt", "Shirt size guide", "Linen vs cotton, compared", "Caring for linen"],
      outreach: ["editor@sample-styleblog.com", "team@sample-reviews.com", "news@sample-giftguide.com"],
      serviceText: [
        "Duplicate URLs, app scripts, theme speed and structured data fixed so every Shopify page can rank.",
        "Collections and product pages with copy, titles and links that turn searches into carts.",
        "Buying guides and comparisons that answer shoppers and earn AI citations.",
        "Editorial links and mentions from sites your customers read.",
        "Traffic is only useful if it buys.",
        "See which Shopify pages bring revenue and why.",
      ],
    },
    compareBoost: ["Fixes written for Shopify and Liquid", "Duplicate paths and tag pages handled", "Every app checked for weight and markup", "Collections built to rank, not just list", "Organic orders by page group", "A short action list each month"],
    faqs: [
      f("Is Shopify good for SEO?", "Yes, Shopify is a solid base: it handles hosting, SSL, sitemaps and canonical tags for you. The problems come from how stores are set up, such as duplicate collection paths, tag pages, app bloat and thin collections. Those are what we fix."),
      f("Can you fix Shopify's duplicate product URLs?", "Shopify always creates /collections/…/products/… paths, and they can't be switched off. We update the theme so internal links point at the canonical /products/ URL, which keeps link signals on one page."),
      f("Will you need access to our Shopify admin?", "Yes, collaborator or staff access lets us review the theme, apps and settings and make minor fixes. We never change live themes without agreeing it first, and we work on a duplicate theme where we can."),
      f("Do you work with Shopify Plus and Hydrogen?", "Yes. Plus adds options like checkout extensibility and expansion stores, and Hydrogen moves the storefront to a headless build. We check rendering, routing and structured data for either."),
    ],
    lead: { gets: ["Duplicate URL and app check", "Collection search gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your Shopify store back" },
    cta: {
      title: "Get a free Shopify SEO audit",
      lead: "Send us your store and we’ll show you where duplicate URLs, apps and thin collections are costing you, and what to fix first.",
      heading: "Shopify store review",
      rows: [["Duplicate product paths", "Review"], ["App scripts and leftover code", "Review"], ["Collection copy and titles", "Gaps"], ["Product structured data", "Checked"]],
    },
  },
  {
    slug: "woocommerce",
    name: "WooCommerce",
    title: "WooCommerce SEO Services",
    description: "WooCommerce SEO for WordPress stores: plugin cleanup, hosting and speed, product and category archives, faceted filters, schema and AI search visibility. Get a free WooCommerce audit.",
    icon: "chat",
    brand: "var(--brand-woocommerce)",
    logo: { src: "/logos/woocommerce.png", w: 554, h: 144 },
    art: { src: "/images/platforms/woocommerce-engine.png", w: 1536, h: 1024, alt: "A WooCommerce-branded jet engine with a storefront window showing a t-shirt, a sneaker and headphones" },
    hero: { lines: ["WooCommerce SEO", "Built for WordPress"], lead: "Speed up your store, tidy the plugins and archives WordPress creates, and grow the product and category pages that bring in orders.", note: "WooCommerce · WordPress · Yoast · Rank Math" },
    audit: {
      title: "WooCommerce store audit", score: 93, chip: "Built for WooCommerce",
      rows: [["Active plugins", "Too many", "bad"], ["?orderby= and ?add-to-cart URLs", "Crawled", "warn"], ["Tag and attribute archives", "Thin", "warn"], ["SEO plugin settings", "Checked", "ok"], ["Product schema", "Checked", "ok"]],
    },
    fit: {
      good: [
        { title: "WooCommerce stores on WordPress", text: "You have a live catalogue and want organic search to bring in more of your orders." },
        { title: "Slow stores", text: "Hosting, page builders and plugins have made product and category pages slow to load." },
        { title: "Plugin overload", text: "SEO, filter, cache and page builder plugins overlap and sometimes conflict." },
        { title: "Blog-heavy stores", text: "You publish content, but it rarely sends shoppers on to products and categories." },
        { title: "Large or variable catalogues", text: "Variations, attributes and filter plugins are multiplying crawlable URLs." },
        { title: "Planning a move", text: "You're moving to or from WooCommerce and need URLs and rankings protected." },
      ],
      notFit: [
        { title: "Stores that haven't launched", text: "With no pages to crawl yet, build the store first and bring us in before launch." },
        { title: "Anyone expecting guaranteed rankings", text: "We improve what Google sees and report honestly. Nobody can promise positions." },
        { title: "General WordPress maintenance", text: "We fix what affects search, not plugin updates, backups or hosting support." },
      ],
    },
    problems: {
      title: "Why WooCommerce stores stall in organic search",
      lead: "Six problems we see on WooCommerce, and what each one costs.",
      items: [
        { id: "speed", title: "Our store is slow, and it keeps getting slower.", text: "Shared hosting, heavy themes, page builders and dozens of plugins all add to every page load, and product pages pay the most.", cost: "Weaker Core Web Vitals and lost sales" },
        { id: "archives", title: "WordPress made pages we never asked for.", text: "Product tags, attribute archives, author and date pages get indexed with no unique content.", cost: "Crawling and authority spread thin" },
        { id: "params", title: "Sorting and cart links get crawled.", text: "URLs with ?orderby=, ?add-to-cart= and filter parameters multiply into thousands of near-identical pages.", cost: "Crawl budget spent on the wrong pages" },
        { id: "plugins", title: "Two plugins both think they handle SEO.", text: "An SEO plugin, the theme and a schema plugin all output titles, canonicals or markup, and they disagree.", cost: "Mixed signals to search engines" },
        { id: "categories", title: "Category pages are just product grids.", text: "No intro copy, default titles and weak internal links, so categories rarely rank for the searches they should own.", cost: "Missing the searches closest to a purchase" },
        { id: "content", title: "The blog gets traffic but no sales.", text: "Posts rank for questions but never link through to the products and categories that answer them.", cost: "Readers leave without seeing a product" },
      ],
    },
    areas: {
      title: "What we fix on WooCommerce",
      lead: "WordPress gives you full control, which also means more can go wrong. We work through the plugins, theme and server that shape every page.",
      items: [
        { icon: "gauge", title: "Speed and hosting", text: "Caching, image handling, theme weight and hosting checked so product pages load fast on mobile.", checks: ["Core Web Vitals", "Caching", "Image weight"] },
        { icon: "puzzle", title: "Plugins", text: "Every plugin checked for overlap, conflicts and what it outputs, with a clear keep or remove list.", checks: ["SEO plugin setup", "Conflicts", "Script weight"] },
        { icon: "filter", title: "Filters and parameters", text: "Sorting, cart and filter URLs kept out of the index, and useful filtered pages made crawlable.", checks: ["?orderby=", "?add-to-cart=", "Filter plugins"] },
        { icon: "layers", title: "Archives and taxonomies", text: "Product categories, tags and attributes reviewed, with thin archives noindexed or merged.", checks: ["Tag archives", "Attributes", "Category base"] },
        { icon: "braces", title: "Structured data", text: "One clean set of Product, Offer, Review and Breadcrumb markup, without plugin duplicates.", checks: ["Product schema", "Reviews", "Breadcrumbs"] },
        { icon: "server", title: "Staging and indexing", text: "Staging sites, duplicate hosts and HTTP versions kept out of Google, with sitemaps that list only real pages.", checks: ["Staging sites", "XML sitemaps", "Redirects"] },
      ],
    },
    stepText: [
      "We crawl your WooCommerce store and review hosting, theme, plugins, archives and Search Console, so we know where slow pages and wasted crawling are costing you.",
      "We group searches by category, product type and intent, then match each group to one category, product or guide so pages stop competing with each other.",
      "We clean up plugins, keep sorting and cart URLs out of the index, noindex thin archives and fix structured data, with direct changes or dev-ready tickets.",
      "Category and product titles, headings, descriptions and internal links are rewritten for the pages that matter most, starting with your best sellers.",
      "We turn your blog into buying guides and comparisons that link straight into categories and products.",
      "Each month you see which page groups grew, what they were worth in WooCommerce orders and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Active plugins", "Overlapping", "bad"], ["Sorting URLs crawled", "Too many", "warn"], ["Tag archives", "Thin", "warn"], ["Product schema", "Checked", "ok"]],
      map: [["organic coffee beans", "Category"], ["best espresso grinder", "Guide"], ["decaf coffee pods", "Category"], ["how to store coffee", "Needs a decision"]],
      fix: { title: "Parameter clean-up", urls: ["/shop/beans/?orderby=price", "/shop/beans/?add-to-cart=812", "/product-tag/organic/"], target: "/shop/coffee-beans/" },
      page: { crumb: "example-roastery.com › shop › coffee-beans", title: "Organic Coffee Beans | Example Roastery", desc: "Single-origin and blends, roasted to order. Free UK delivery." },
      guides: ["Choosing an espresso grinder", "Arabica vs robusta", "How to store coffee beans", "Brewing guide"],
      report: ["Categories", "Product pages", "Buying guides", "Blog posts"],
    },
    mocks: {
      audit: ["Plugin overlap", "Core Web Vitals", "Product schema", "Thin archives"],
      serp: { domain: "example-roastery.com", beforeTitle: "Coffee Beans Archives - Example Roastery", beforeDesc: "Products in Coffee Beans.", path: "shop › coffee-beans", title: "Organic Coffee Beans | Example Roastery", desc: "Single-origin and blends, roasted to order. Free delivery over a set spend." },
      calendar: ["Choosing an espresso grinder", "How to store coffee beans", "Arabica vs robusta", "Brewing guide"],
      outreach: ["editor@sample-foodblog.com", "team@sample-homebarista.com", "news@sample-giftguide.com"],
      serviceText: [
        "Speed, plugins, archives and structured data fixed so every WooCommerce page can rank.",
        "Category and product pages with copy, titles and links that turn searches into carts.",
        "A blog turned into buying guides that answer shoppers and link to products.",
        "Editorial links and mentions from sites your customers read.",
        "Traffic is only useful if it buys.",
        "See which WooCommerce pages bring revenue and why.",
      ],
    },
    compareBoost: ["Fixes written for WooCommerce and WordPress", "Plugins reviewed, not just added", "Sorting and cart URLs kept out", "Categories built to rank, not just list", "Organic orders by page group", "A short action list each month"],
    faqs: [
      f("Is WooCommerce good for SEO?", "Yes. WooCommerce runs on WordPress, which gives you full control over URLs, content and markup. That control is also the risk: plugins, archives and hosting can work against you if nobody checks them. That's what we fix."),
      f("Which SEO plugin should we use?", "Yoast and Rank Math both work well. What matters is that only one plugin outputs titles, canonicals and schema. We configure the one you have and remove overlaps rather than asking you to switch."),
      f("Can you make our WooCommerce store faster?", "Usually, yes. We look at hosting, caching, image handling, theme weight and plugin scripts, and give you a prioritised list. Minor changes are included; larger work like a theme rebuild is scoped separately."),
      f("Do you need admin access to WordPress?", "An editor or administrator account lets us review settings and make minor fixes. We test larger changes on staging first, and we never update plugins or themes without agreeing it with you."),
    ],
    lead: { gets: ["Speed and plugin check", "Category search gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your WooCommerce store back" },
    cta: {
      title: "Get a free WooCommerce SEO audit",
      lead: "Send us your store and we’ll show you where speed, plugins and archives are costing you, and what to fix first.",
      heading: "WooCommerce store review",
      rows: [["Page speed and hosting", "Review"], ["Plugin overlap", "Review"], ["Category copy and titles", "Gaps"], ["Product structured data", "Checked"]],
    },
  },
  {
    slug: "bigcommerce",
    name: "BigCommerce",
    title: "BigCommerce SEO Services",
    description: "BigCommerce SEO for growing catalogues: faceted search, URL structure, Stencil themes, multi-storefront, Catalyst headless and structured data. Get a free BigCommerce audit.",
    icon: "hex",
    brand: "var(--brand-bigcommerce)",
    logo: { src: "/logos/bigcommerce.svg", w: 56, h: 44 },
    art: { src: "/images/platforms/bigcommerce-engine.png", w: 1536, h: 1024, alt: "A BigCommerce-branded jet engine with a storefront window showing a t-shirt, a sneaker and headphones" },
    hero: { lines: ["BigCommerce SEO", "That Scales"], lead: "Clean URLs, controlled faceted search and category pages that rank, built to keep up as your BigCommerce catalogue grows.", note: "BigCommerce · Stencil · Catalyst · Multi-storefront" },
    audit: {
      title: "BigCommerce store audit", score: 95, chip: "Built for BigCommerce",
      rows: [["Faceted search URLs", "Crawled", "bad"], ["?sort= parameters", "Review", "warn"], ["Brand and category overlap", "Review", "warn"], ["301 redirect manager", "Checked", "ok"], ["Product schema", "Checked", "ok"]],
    },
    fit: {
      good: [
        { title: "BigCommerce stores", text: "You have a live catalogue and want organic search to bring in more of your orders." },
        { title: "Large or growing catalogues", text: "Thousands of products, options and brands that need structure as they grow." },
        { title: "Heavy faceted search", text: "Filters by brand, size, price and more create URLs faster than anyone can review them." },
        { title: "B2B and wholesale", text: "Price lists, customer groups and gated catalogues that still need to be found." },
        { title: "Multi-storefront setups", text: "Several brands or regions on one back office, each needing its own search plan." },
        { title: "Catalyst or headless plans", text: "You're moving the storefront to Catalyst or another headless build." },
      ],
      notFit: [
        { title: "Stores that haven't launched", text: "With no pages to crawl yet, set up the store first and bring us in before launch." },
        { title: "Anyone expecting guaranteed rankings", text: "We improve what Google sees and report honestly. Nobody can promise positions." },
        { title: "Paid ads or marketplace feeds only", text: "We work on organic search only, not Shopping ads or marketplace listings." },
      ],
    },
    problems: {
      title: "Why BigCommerce stores stall in organic search",
      lead: "Six problems we see on BigCommerce, and what each one costs.",
      items: [
        { id: "facets", title: "Faceted search creates endless URLs.", text: "Every combination of brand, size, colour and price becomes a crawlable page, and most of them add nothing.", cost: "Crawl budget spent on the wrong pages" },
        { id: "urls", title: "Our URLs changed and nobody added redirects.", text: "Renaming products or categories changes URLs, and without a 301 the links and history they earned are lost.", cost: "Rankings lost after every rename" },
        { id: "overlap", title: "Brand and category pages compete.", text: "A brand page and a category page often list the same products with similar titles, so Google can't tell which to rank.", cost: "Rankings split between near-duplicates" },
        { id: "theme", title: "Our Stencil theme is heavy.", text: "Sliders, scripts and third-party apps add weight to every page, and category pages with many products slow down most.", cost: "Slower pages and weaker Core Web Vitals" },
        { id: "categories", title: "Category pages have no content.", text: "Default titles, no intro copy and few internal links, so categories rarely rank for the searches they should own.", cost: "Missing the searches closest to a purchase" },
        { id: "options", title: "Product options look like separate products.", text: "Variants and option sets set up as separate products create near-identical pages that compete with each other.", cost: "Rankings split across duplicate products" },
      ],
    },
    areas: {
      title: "What we fix on BigCommerce",
      lead: "BigCommerce gives you strong SEO settings out of the box. We set them up for your catalogue and fix what the defaults miss.",
      items: [
        { icon: "filter", title: "Faceted search", text: "Useful filtered pages kept crawlable, and the rest kept out of the index with clear rules.", checks: ["Facet rules", "?sort= URLs", "Crawl control"] },
        { icon: "route", title: "URL structure", text: "Product, category and brand URL formats chosen once, with redirects handled through the 301 manager.", checks: ["URL formats", "301 redirects", "Trailing slashes"] },
        { icon: "file-code", title: "Stencil theme", text: "Titles, headings, pagination and scripts set in the theme so the rules hold for every page.", checks: ["Templates", "Script weight", "Pagination"] },
        { icon: "layers", title: "Categories and brands", text: "Categories and brand pages given distinct roles, copy and internal links so each one ranks.", checks: ["Category copy", "Brand pages", "Internal links"] },
        { icon: "braces", title: "Structured data", text: "Product, Offer, Review and Breadcrumb markup checked against the page, including options and stock.", checks: ["Product schema", "Offers", "Breadcrumbs"] },
        { icon: "globe", title: "Multi-storefront", text: "Each storefront and region given its own domain plan, hreflang and sitemap.", checks: ["Storefronts", "Hreflang", "Sitemaps"] },
      ],
    },
    stepText: [
      "We crawl your BigCommerce store and review the theme, faceted search, URL settings and Search Console, so we know where duplicate pages and wasted crawling are costing you.",
      "We group searches by category, brand and intent, then give each group one page, so brand and category pages stop competing with each other.",
      "We set rules for faceted search and sorting, fix URL formats and redirects, consolidate duplicate products and fix structured data, with direct changes or dev-ready tickets.",
      "Category, brand and product titles, headings, copy and internal links are rewritten for the pages that matter most, starting with your best sellers.",
      "We publish buying guides and comparisons that answer shoppers' questions and link into your categories.",
      "Each month you see which page groups grew, what they were worth in BigCommerce orders and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Faceted search URLs", "Too many crawled", "bad"], ["Renamed URLs", "Missing redirects", "warn"], ["Brand and category overlap", "Review", "warn"], ["Product schema", "Checked", "ok"]],
      map: [["cordless drill set", "Category"], ["best drill for home use", "Guide"], ["example-brand drills", "Brand page"], ["drill bit sizes", "Needs a decision"]],
      fix: { title: "Faceted search clean-up", urls: ["/drills/?brand=12&_bc_fsnf=1", "/drills/?sort=pricedesc", "/drills/?voltage=18v&page=4"], target: "/power-tools/drills/" },
      page: { crumb: "example-tools.com › power-tools › drills", title: "Cordless Drills & Drill Sets | Example Tools", desc: "Compare 12V and 18V cordless drills from leading brands. Free delivery." },
      guides: ["Choosing a cordless drill", "Drill bit size chart", "12V vs 18V, compared", "Drill safety basics"],
      report: ["Categories", "Brand pages", "Product pages", "Buying guides"],
    },
    mocks: {
      audit: ["Faceted URLs", "Core Web Vitals", "Product schema", "301 redirects"],
      serp: { domain: "example-tools.com", beforeTitle: "Drills - Example Tools", beforeDesc: "Shop Drills.", path: "power-tools › drills", title: "Cordless Drills & Drill Sets | Example Tools", desc: "Compare 12V and 18V cordless drills from leading brands." },
      calendar: ["Choosing a cordless drill", "Drill bit size chart", "12V vs 18V, compared", "Drill safety basics"],
      outreach: ["editor@sample-diyblog.com", "team@sample-toolreviews.com", "news@sample-homeimprovement.com"],
      serviceText: [
        "Faceted search, URLs, theme speed and structured data fixed so every BigCommerce page can rank.",
        "Category, brand and product pages with copy and links that turn searches into carts.",
        "Buying guides and comparisons that answer shoppers and earn AI citations.",
        "Editorial links and mentions from sites your customers read.",
        "Traffic is only useful if it buys.",
        "See which BigCommerce pages bring revenue and why.",
      ],
    },
    compareBoost: ["Fixes written for BigCommerce and Stencil", "Faceted search controlled with clear rules", "Redirects handled before URLs change", "Categories and brands with distinct roles", "Organic orders by page group", "A short action list each month"],
    faqs: [
      f("Is BigCommerce good for SEO?", "Yes. BigCommerce gives you editable URLs, a built-in 301 manager, sitemaps and solid defaults. Most problems come from faceted search, renamed URLs and thin category pages, which is where we focus."),
      f("How do you handle BigCommerce faceted search?", "We decide which filtered pages people actually search for and keep those crawlable with their own titles. The rest are kept out of the index, so crawling goes to the pages that matter."),
      f("Can you help with Catalyst or headless BigCommerce?", "Yes. We check that product and category content, links and structured data are in the server response, and that routing, canonicals and sitemaps match your live URLs."),
      f("Do you work with multi-storefront and B2B stores?", "Yes. We plan domains, hreflang and sitemaps per storefront, and make sure gated or wholesale pages don't block the public catalogue from being found."),
    ],
    lead: { gets: ["Faceted search and URL check", "Category and brand gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your BigCommerce store back" },
    cta: {
      title: "Get a free BigCommerce SEO audit",
      lead: "Send us your store and we’ll show you where faceted search, URLs and thin categories are costing you, and what to fix first.",
      heading: "BigCommerce store review",
      rows: [["Faceted search URLs", "Review"], ["Redirects after renames", "Missing"], ["Category and brand copy", "Gaps"], ["Product structured data", "Checked"]],
    },
  },
  {
    slug: "magento",
    name: "Magento",
    title: "Magento SEO Services",
    description: "Magento and Adobe Commerce SEO for large catalogues: layered navigation, URL rewrites, configurable products, store views, Hyvä and Luma speed and structured data. Get a free Magento audit.",
    icon: "box",
    brand: "var(--brand-magento)",
    logo: { src: "/logos/magento.svg", w: 56, h: 44 },
    art: { src: "/images/platforms/magento-engine.png", w: 1536, h: 1024, alt: "A Magento-branded jet engine with a storefront window showing a t-shirt, a sneaker and headphones" },
    hero: { lines: ["Magento SEO for", "Large Catalogues"], lead: "Crawl control, clean URLs and fast templates for Magento and Adobe Commerce stores, so big catalogues get found page by page.", note: "Magento Open Source · Adobe Commerce · Hyvä · Luma" },
    audit: {
      title: "Magento store audit", score: 92, chip: "Built for Magento",
      rows: [["Layered navigation URLs", "Crawled", "bad"], ["Category paths in product URLs", "Duplicate", "warn"], ["URL rewrite table", "Bloated", "warn"], ["Store view hreflang", "Checked", "ok"], ["Product schema", "Checked", "ok"]],
    },
    fit: {
      good: [
        { title: "Magento 2 and Adobe Commerce stores", text: "You run a large catalogue and want organic search to bring in more orders." },
        { title: "Catalogues with thousands of SKUs", text: "Configurable products, attributes and categories that multiply into URLs." },
        { title: "Several store views or regions", text: "Languages, currencies and countries that need the right hreflang and indexing." },
        { title: "Slow templates", text: "Luma or a heavy custom theme is slowing product and category pages." },
        { title: "Upgrades and replatforms", text: "A move to Hyvä, Adobe Commerce, or off Magento is coming and rankings need protecting." },
        { title: "In-house or agency developers", text: "You have developers and need SEO fixes written so they can ship them." },
      ],
      notFit: [
        { title: "Stores that haven't launched", text: "With no pages to crawl yet, build the store first and bring us in before launch." },
        { title: "Anyone expecting guaranteed rankings", text: "We improve what Google sees and report honestly. Nobody can promise positions." },
        { title: "Magento support or hosting", text: "We fix what affects search, not extensions, patches, servers or general support." },
      ],
    },
    problems: {
      title: "Why Magento stores stall in organic search",
      lead: "Six problems we see on Magento and Adobe Commerce, and what each one costs.",
      items: [
        { id: "layered", title: "Layered navigation creates millions of URLs.", text: "Every combination of attribute filters and sort orders becomes a crawlable page, and large catalogues multiply fast.", cost: "Crawl budget spent on the wrong pages" },
        { id: "paths", title: "Products have a URL for every category.", text: "With category paths in product URLs, one product can live at several addresses, each competing with the others.", cost: "Rankings split across duplicate URLs" },
        { id: "rewrites", title: "Our URL rewrite table is out of control.", text: "Years of imports and category changes leave thousands of rewrites and redirect chains behind.", cost: "Slow crawling and lost link signals" },
        { id: "speed", title: "Our Luma theme is slow.", text: "Heavy JavaScript, extensions and uncached pages make product and category templates slow on mobile.", cost: "Weaker Core Web Vitals and lost sales" },
        { id: "configurable", title: "Simple products get indexed on their own.", text: "Child products of configurable items are visible and indexed separately, so near-identical pages compete.", cost: "Thin, duplicate product pages" },
        { id: "views", title: "Store views show the wrong country.", text: "Multiple store views need correct hreflang and canonicals, or Google picks the wrong language or currency.", cost: "Shoppers land on the wrong store" },
      ],
    },
    areas: {
      title: "What we fix on Magento",
      lead: "Magento gives you deep control over URLs, catalogue structure and templates. We use it to keep large catalogues crawlable and fast.",
      items: [
        { icon: "filter", title: "Layered navigation", text: "Clear rules for which filtered pages are crawlable, indexable and linked, and which stay out.", checks: ["Filter rules", "Sort orders", "Crawl control"] },
        { icon: "route", title: "URLs and rewrites", text: "Product URL settings chosen once, rewrite tables cleaned and redirect chains removed.", checks: ["Category paths", "Rewrite table", "Redirect chains"] },
        { icon: "database", title: "Configurable products", text: "Parent and child product visibility set so the right version ranks and variants don't compete.", checks: ["Visibility", "Canonicals", "Variants"] },
        { icon: "gauge", title: "Templates and speed", text: "Luma, Hyvä or custom templates checked for weight, caching and mobile performance.", checks: ["Core Web Vitals", "Full page cache", "JavaScript"] },
        { icon: "globe", title: "Store views", text: "Languages, currencies and regions mapped to the right hreflang, canonicals and sitemaps.", checks: ["Hreflang", "Store views", "Sitemaps"] },
        { icon: "braces", title: "Structured data", text: "Product, Offer, Review and Breadcrumb markup checked against the page, including stock and price.", checks: ["Product schema", "Offers", "Breadcrumbs"] },
      ],
    },
    stepText: [
      "We crawl your Magento store and review layered navigation, URL settings, store views and Search Console, so we know where duplicate pages and wasted crawling are costing you.",
      "We group searches by category, attribute and intent, then match each group to one page so filtered and category pages stop competing with each other.",
      "We set layered navigation rules, clean the URL rewrite table, fix product visibility and canonicals and repair structured data, with dev-ready tickets your team can ship.",
      "Category and product titles, headings, copy and internal links are rewritten for the pages that matter most, starting with your best sellers.",
      "We publish buying guides and comparisons that answer shoppers' questions and link into your categories.",
      "Each month you see which page groups grew, what they were worth in Magento orders and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Layered navigation URLs", "Too many crawled", "bad"], ["Redirect chains", "Found", "warn"], ["Child products indexed", "Review", "warn"], ["Store view hreflang", "Checked", "ok"]],
      map: [["industrial shelving units", "Category"], ["best warehouse shelving", "Guide"], ["boltless shelving 5 tier", "Filtered page"], ["shelving load ratings", "Needs a decision"]],
      fix: { title: "Layered navigation clean-up", urls: ["/shelving.html?color=24&material=7", "/shelving.html?product_list_order=price", "/storage/shelving/unit-5-tier.html"], target: "/shelving/unit-5-tier.html" },
      page: { crumb: "example-supply.com › storage › shelving", title: "Industrial Shelving Units | Example Supply", desc: "Boltless and heavy-duty shelving with load ratings for every bay." },
      guides: ["Choosing warehouse shelving", "Shelving load ratings", "Boltless vs bolted", "Planning a stockroom"],
      report: ["Categories", "Filtered pages", "Product pages", "Buying guides"],
    },
    mocks: {
      audit: ["Layered navigation", "Core Web Vitals", "Product schema", "URL rewrites"],
      serp: { domain: "example-supply.com", beforeTitle: "Shelving", beforeDesc: "Shelving. Default Category.", path: "storage › shelving", title: "Industrial Shelving Units | Example Supply", desc: "Boltless and heavy-duty shelving with load ratings for every bay." },
      calendar: ["Choosing warehouse shelving", "Shelving load ratings", "Boltless vs bolted", "Planning a stockroom"],
      outreach: ["editor@sample-logistics.com", "team@sample-tradeblog.com", "news@sample-industryweekly.com"],
      serviceText: [
        "Layered navigation, URL rewrites, templates and structured data fixed so every Magento page can rank.",
        "Category and product pages with copy and links that turn searches into carts.",
        "Buying guides and comparisons that answer shoppers and earn AI citations.",
        "Editorial links and mentions from sites your customers read.",
        "Traffic is only useful if it buys.",
        "See which Magento pages bring revenue and why.",
      ],
    },
    compareBoost: ["Fixes written for Magento and Adobe Commerce", "Layered navigation controlled at scale", "URL rewrites and redirects cleaned up", "Product visibility set deliberately", "Organic orders by page group", "A short action list each month"],
    faqs: [
      f("Do you work with Magento 2 and Adobe Commerce?", "Yes, both Magento Open Source and Adobe Commerce, including Adobe Commerce Cloud. The SEO settings are largely the same, and we check the extensions and customisations specific to your build."),
      f("How do you handle layered navigation?", "We work out which filtered pages people search for and keep those crawlable with their own titles and copy. Other filter and sort combinations are kept out of the index, so crawling goes to the pages that matter."),
      f("Should product URLs include the category path?", "Usually not. Turning off category paths in product URLs gives each product one address, which avoids duplicates. If your store relies on them, we keep them and set canonicals carefully instead."),
      f("Can you help with a move to Hyvä or off Magento?", "Yes. We map every URL, plan redirects, check the new templates on staging and monitor rankings after launch, so a theme change or replatform doesn't undo your SEO."),
    ],
    lead: { gets: ["Layered navigation and URL check", "Category search gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your Magento store back" },
    cta: {
      title: "Get a free Magento SEO audit",
      lead: "Send us your store and we’ll show you where layered navigation, URLs and templates are costing you, and what to fix first.",
      heading: "Magento store review",
      rows: [["Layered navigation URLs", "Review"], ["Category paths in URLs", "Review"], ["Category copy and titles", "Gaps"], ["Product structured data", "Checked"]],
    },
  },
  {
    slug: "headless",
    name: "Headless",
    title: "Headless Ecommerce SEO Services",
    description: "SEO for headless and custom storefronts: server rendering, routing, canonicals, sitemaps and structured data for Next.js, Hydrogen, Catalyst and custom builds. Get a free headless SEO audit.",
    icon: "code",
    brand: "var(--brand-headless)",
    art: { src: "/images/platforms/headless-engine.png", w: 1536, h: 1024, alt: "A headless commerce jet engine with code and layer icons, device symbols and a storefront window showing a t-shirt, a sneaker and headphones" },
    hero: { lines: ["Headless SEO for", "Custom Storefronts"], lead: "Make sure search engines and AI tools see what shoppers see, with rendering, routing and structured data checked on your headless store.", note: "Next.js · Hydrogen · Catalyst · Nuxt · Custom builds" },
    audit: {
      title: "Headless storefront audit", score: 96, chip: "Built for headless",
      rows: [["Product content in HTML", "Missing", "bad"], ["Canonical tags", "Inconsistent", "warn"], ["Preview URLs indexed", "Review", "warn"], ["XML sitemaps", "Checked", "ok"], ["Product schema", "Checked", "ok"]],
    },
    fit: {
      good: [
        { title: "Headless and composable stores", text: "Your storefront runs on Next.js, Hydrogen, Catalyst, Nuxt or a custom framework." },
        { title: "Planning a headless move", text: "You're moving off a monolith and want rankings protected through the switch." },
        { title: "JavaScript-heavy pages", text: "Product details, prices or reviews load in the browser, after the first HTML." },
        { title: "Traffic dropped after relaunch", text: "Rankings fell after a new storefront went live, and you need to know why." },
        { title: "CMS plus commerce stacks", text: "Content in one system and products in another, with URLs that need to agree." },
        { title: "Teams with in-house developers", text: "You have engineers and need SEO requirements they can build to." },
      ],
      notFit: [
        { title: "Standard themes with no custom code", text: "If you're on a stock Shopify or WooCommerce theme, our platform pages fit better." },
        { title: "Anyone expecting guaranteed rankings", text: "We improve what Google sees and report honestly. Nobody can promise positions." },
        { title: "Teams who can't change the code", text: "Headless fixes need developer time. If nothing can ship, an audit alone won't move results." },
      ],
    },
    problems: {
      title: "Why headless stores stall in organic search",
      lead: "Six problems we see on headless storefronts, and what each one costs.",
      items: [
        { id: "rendering", title: "Search engines see an empty page.", text: "When product details, prices or reviews load only in the browser, crawlers and AI tools may miss them entirely.", cost: "Pages indexed without their content" },
        { id: "routing", title: "Our URLs don't match between systems.", text: "The CMS, commerce engine and front end each build URLs, and small differences create duplicates and broken links.", cost: "Duplicate and broken pages" },
        { id: "relaunch", title: "Rankings dropped after we went headless.", text: "Missing redirects, changed URLs and lost metadata during the switch are common causes of a post-launch drop.", cost: "Traffic lost at launch" },
        { id: "meta", title: "Titles and canonicals are set in code.", text: "Without a clear source for metadata, pages ship with defaults, missing canonicals or the wrong one.", cost: "Mixed signals to search engines" },
        { id: "previews", title: "Preview and staging sites got indexed.", text: "Preview deployments, staging domains and API endpoints show up in Google alongside the real store.", cost: "Duplicate content outside your store" },
        { id: "schema", title: "Structured data never made it across.", text: "The old theme output Product and Breadcrumb markup. The new build doesn't, or only adds it in the browser.", cost: "Rich results and AI citations lost" },
      ],
    },
    areas: {
      title: "What we fix on headless storefronts",
      lead: "Headless gives you speed and freedom, but SEO is no longer built in. We write the requirements and check every template in the server response.",
      items: [
        { icon: "server", title: "Rendering", text: "Product content, prices, links and reviews checked in the server HTML, with SSR or static generation where it matters.", checks: ["SSR and SSG", "Hydration", "Server HTML"] },
        { icon: "route", title: "Routing and URLs", text: "One URL scheme agreed across CMS, commerce and front end, with redirects and trailing slashes consistent.", checks: ["URL scheme", "Redirects", "Trailing slashes"] },
        { icon: "file-code", title: "Metadata", text: "Titles, descriptions, canonicals and robots rules generated from one source for every template.", checks: ["Titles", "Canonicals", "Robots rules"] },
        { icon: "braces", title: "Structured data", text: "Product, Offer, Review and Breadcrumb markup rendered on the server and validated against the page.", checks: ["Product schema", "Offers", "Breadcrumbs"] },
        { icon: "repeat", title: "Migrations", text: "URL inventory, redirect maps and launch checks so moving to headless doesn't cost you rankings.", checks: ["URL inventory", "Redirect map", "Launch checks"] },
        { icon: "gauge", title: "Speed and caching", text: "JavaScript bundles, images and edge caching checked so pages are fast for shoppers and crawlers.", checks: ["Core Web Vitals", "Bundle size", "Edge caching"] },
      ],
    },
    stepText: [
      "We crawl your storefront as search engines do, compare the server HTML with the rendered page and review routing, metadata and Search Console.",
      "We group searches by category, product type and intent, then match each group to one route so pages stop competing with each other.",
      "We write the rendering, routing, metadata and structured data requirements your developers build to, then verify each fix on staging and live.",
      "Category and product titles, headings, copy and internal links are rewritten for the pages that matter most, starting with your best sellers.",
      "We publish buying guides and comparisons through your CMS that answer shoppers' questions and link into your categories.",
      "Each month you see which page groups grew, what they were worth in orders and what we do next. Then we adjust the plan and repeat.",
    ],
    scenes: {
      audit: [["Product content in HTML", "Missing", "bad"], ["Canonical tags", "Inconsistent", "warn"], ["Preview URLs indexed", "Found", "warn"], ["XML sitemaps", "Checked", "ok"]],
      map: [["noise cancelling headphones", "Category"], ["best headphones for travel", "Guide"], ["wireless earbuds sport", "Category"], ["headphone sizing", "Needs a decision"]],
      fix: { title: "Routing clean-up", urls: ["/products/headphones-x1/", "/p/headphones-x1?ref=cms", "preview-a1b2.example.app/products/x1"], target: "/products/headphones-x1" },
      page: { crumb: "example-audio.com › headphones › noise-cancelling", title: "Noise Cancelling Headphones | Example Audio", desc: "Over-ear and in-ear ANC headphones, compared by battery and fit." },
      guides: ["Choosing travel headphones", "ANC explained", "Over-ear vs in-ear", "Headphone care guide"],
      report: ["Category routes", "Product pages", "Buying guides", "CMS pages"],
    },
    mocks: {
      audit: ["Server rendering", "Core Web Vitals", "Product schema", "Canonicals"],
      serp: { domain: "example-audio.com", beforeTitle: "Example Audio", beforeDesc: "Loading…", path: "headphones › noise-cancelling", title: "Noise Cancelling Headphones | Example Audio", desc: "Over-ear and in-ear ANC headphones, compared by battery and fit." },
      calendar: ["Choosing travel headphones", "ANC explained", "Over-ear vs in-ear", "Headphone care guide"],
      outreach: ["editor@sample-techblog.com", "team@sample-audioreviews.com", "news@sample-gadgetnews.com"],
      serviceText: [
        "Rendering, routing, metadata and structured data checked in the server response for every template.",
        "Category and product routes with copy and links that turn searches into carts.",
        "Buying guides published through your CMS that answer shoppers and earn AI citations.",
        "Editorial links and mentions from sites your customers read.",
        "Traffic is only useful if it buys.",
        "See which routes bring revenue and why.",
      ],
    },
    compareBoost: ["Requirements written for your framework", "Rendering checked in the server HTML", "One URL scheme across every system", "Migrations planned before launch", "Organic orders by page group", "A short action list each month"],
    faqs: [
      f("Is headless commerce bad for SEO?", "No. A headless store can be fast and rank very well. The risk is that SEO features a theme used to handle, such as metadata, structured data, sitemaps and redirects, now have to be built deliberately. We make sure they are."),
      f("Which frameworks do you work with?", "Next.js, Hydrogen, Catalyst, Nuxt, Remix and custom builds, on Shopify, BigCommerce, commercetools and other commerce back ends. What matters is what the server sends, so we test that directly."),
      f("Do we need server-side rendering?", "For product and category pages, usually yes, or static generation. Google can render JavaScript, but other search engines and many AI tools rely on the first HTML. We check what each of your templates sends."),
      f("Can you help before we launch a headless store?", "Yes, and that's the best time. We write SEO requirements for the build, review staging, map redirects from your current URLs and check the launch, so rankings carry over."),
    ],
    lead: { gets: ["Rendering and routing check", "Category search gaps", "Top fixes in priority order"], headline: "Let’s find what’s holding your headless store back" },
    cta: {
      title: "Get a free headless SEO audit",
      lead: "Send us your storefront and we’ll show you what search engines actually see, where routing breaks and what to fix first.",
      heading: "Headless storefront review",
      rows: [["Content in server HTML", "Missing"], ["Canonicals and routing", "Review"], ["Category copy and titles", "Gaps"], ["Product structured data", "Checked"]],
    },
  },
];

export const platformPageBySlug = (slug: string) => platformPages.find((p) => p.slug === slug);
