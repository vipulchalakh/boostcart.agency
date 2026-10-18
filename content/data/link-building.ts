/* Copy for /services/link-building. Positioning and scope statements only: no client results, logos or statistics.
   Owner to review the engagement scope (outreach volume, reporting, approvals) before launch. */
import type { Faq, Usp } from "./types";
import type { FitItem } from "./fit";
import type { Platform } from "./platforms";
import type { ProcessStep } from "./process";

export const linksGoodFit: FitItem[] = [
  { title: "Stores with good pages and few links", text: "Your collections and guides are solid, but competitors have far more sites pointing to theirs." },
  { title: "Brands with something worth covering", text: "A product, data, story or expertise that journalists and bloggers might actually write about." },
  { title: "Stores in competitive categories", text: "Rankings stall behind sites with stronger link profiles." },
  { title: "Teams without outreach capacity", text: "You can't spend hours a week on prospecting, pitching and follow-up." },
  { title: "Owners wary of risky link tactics", text: "You want links earned through outreach, not bought from networks." },
  { title: "Stores ready to invest for months", text: "You understand that links build gradually." },
];

export const linksNotFit: FitItem[] = [
  { title: "Stores that haven't launched", text: "With no pages to point links to, build the store first." },
  { title: "Anyone expecting guaranteed links", text: "Outreach depends on other people saying yes. We can't promise a number or timing." },
  { title: "Anyone wanting paid link packages", text: "We don't buy links or use private networks." },
  { title: "Sites with technical or content problems", text: "Links help most when pages are indexable and worth linking to. Fix those first." },
  { title: "Anyone after links at the lowest price", text: "Relevant editorial placements take research and effort that cheap packages skip." },
  { title: "Businesses that don't sell online", text: "Our work is built around products, categories and carts." },
];

export const linksPlatforms: Platform[] = [
  { slug: "shopify", title: "Shopify", line: "Links pointed at collections and guides, with redirects and canonical URLs checked so link value isn't lost.", href: "/platforms/shopify", brand: "var(--brand-shopify)", icon: "bag" },
  { slug: "woocommerce", title: "WooCommerce", line: "Link targets chosen from category and product URLs, with permalink changes handled safely.", href: "/platforms/woocommerce", brand: "var(--brand-woocommerce)", icon: "chat" },
  { slug: "bigcommerce", title: "BigCommerce", line: "Link targets on clean category URLs, with redirects mapped before any outreach starts.", href: "/platforms/bigcommerce", brand: "var(--brand-bigcommerce)", icon: "hex" },
  { slug: "magento", title: "Magento", line: "Priority categories picked from large catalogues, so link effort goes where it can matter.", href: "/platforms/magento", brand: "var(--brand-magento)", icon: "box" },
  { slug: "headless", title: "Headless and custom", line: "Stable URLs and correct status codes on link targets, so earned links count.", href: "/platforms/headless", brand: "var(--brand-headless)", icon: "code" },
];

export const linksUsps: Usp[] = [
  {
    id: "editorial", tab: "Editorial links", title: "Links earned, not bought",
    description: "We pitch real publishers and bloggers with something worth covering. Links come from people choosing to link.",
    points: ["No paid link packages", "No private blog networks", "Relevant sites your customers read", "Each placement reviewed by a person"],
    visual: "store", sample: false,
  },
  {
    id: "targets", tab: "Right pages", title: "Links aimed at pages that matter",
    description: "Authority is pointed at collections, products and guides where it can help rankings and sales.",
    points: ["Priority pages chosen with you", "Link gap review against competitors", "Redirect and canonical checks", "Anchor text kept natural"],
    visual: "platforms", sample: false,
  },
  {
    id: "transparent", tab: "Transparent", title: "Reports that show every placement",
    description: "You see which sites were approached, which responded and where links landed.",
    points: ["Outreach status you can review", "Live links with their URLs", "Notes on sites that declined", "Approvals before anything is sent"],
    visual: "report", sample: false,
  },
  {
    id: "clear-scope", tab: "Clear scope", title: "Effort and outcomes kept separate",
    description: "We agree outreach effort up front and never promise a number of links, because the outcome isn't ours alone.",
    points: ["Scope agreed up front", "Outreach volume defined in writing", "Content assets scoped separately", "No guaranteed link counts"],
    visual: "terms", sample: false,
  },
];

export const linksSteps: ProcessStep[] = [
  { id: "research", title: "Research", short: "We review your links and competitors'.", description: "We review your link profile, compare it with the sites you compete against, and find which pages need links and which sites might link.", outputs: ["Link profile review", "Competitor gaps", "Priority pages"], points: ["Review your current links for risk", "Compare against competing stores", "Pick the pages that most need links", "Spot sites that link to competitors"] },
  { id: "angles", title: "Angles", short: "A reason for someone to link.", description: "We find the story, data, product or expertise that a publisher would want to cover, and build the assets that support it.", outputs: ["Link angles", "Pitch drafts", "Asset ideas"], points: ["Find what is newsworthy about your brand", "Check angles against what sites cover", "Plan supporting data or guides", "Agree angles with you before outreach"] },
  { id: "outreach", title: "Outreach", short: "Personal pitches to relevant sites.", description: "We build lists of relevant sites, send personal pitches, follow up and track every response, with your approval on messaging.", outputs: ["Target lists", "Pitches sent", "Response log"], points: ["Build lists of relevant sites", "Write pitches for each contact", "Follow up without spamming", "Track replies and placements"] },
  { id: "report", title: "Report", short: "You see what landed and what's next.", description: "We report on outreach and the links earned, check they are live and pointing where intended, and plan the next round.", outputs: ["Placement report", "Live link check", "Next-round plan"], points: ["List every link earned", "Check links are live and indexable", "Review effect on target pages", "Plan the next round of outreach"] },
];

export const linksCompare = {
  common: {
    title: "Link packages and directories",
    sub: "Volume without relevance",
    items: ["Bought links or private networks", "Sites chosen for price", "Little relevance to your store", "Risk of a manual penalty", "No say over messaging", "A report listing links only"],
  },
  boost: {
    title: "BoostCart",
    sub: "Editorial link building and digital PR",
    items: ["Earned through real outreach", "Sites your customers read", "Chosen for relevance to your products", "Natural anchors and varied sources", "You approve the message", "Placements tied to target pages"],
  },
};

export const linksFaqs: Faq[] = [
  { q: "What does ecommerce link building include?", a: "A review of your link profile, competitor link gaps, angles and assets worth linking to, outreach to relevant sites, and reporting on every placement. The scope depends on your store, your category and your goals.", sample: false },
  { q: "Do you buy links?", a: "No. We don't buy links or use private blog networks. We pitch relevant sites and earn editorial placements, which takes longer but is safer and holds up better over time.", sample: false },
  { q: "How many links will you get me?", a: "We don't promise a number. Outreach depends on other people choosing to link, so we agree the effort we'll put in and report honestly on what it earns.", sample: false },
  { q: "Which pages will links point to?", a: "We choose priority collections, products and guides with you, based on revenue potential and ranking opportunity. Links to pages that can't rank or convert are rarely worth the effort.", sample: false },
  { q: "How do you find sites to approach?", a: "We look at sites that cover your category, link to competing stores or publish roundups and guides in your space. Each target is checked for relevance and quality.", sample: false },
  { q: "What is digital PR for an online store?", a: "Digital PR means creating something newsworthy, such as data, a study or a useful tool, and pitching it to journalists and publishers. Coverage often includes links back to your site.", sample: false },
  { q: "Will I approve outreach before it is sent?", a: "Yes. You see the angles and pitch messaging before outreach starts, and we agree what we'll say on your behalf.", sample: false },
  { q: "How long does link building take?", a: "Links build gradually and the effect on rankings is not immediate. We set expectations for your store and category when we scope the work.", sample: false },
  { q: "Can links hurt my site?", a: "Poor-quality or paid links can. That is why we focus on relevant editorial links and review your existing profile for risky ones. We can't guarantee any outcome.", sample: false },
  { q: "Do you work with Shopify and WooCommerce?", a: "Yes. We also work with BigCommerce, Magento, headless storefronts and custom platforms. We check that link targets have clean URLs and correct redirects first.", sample: false },
];
