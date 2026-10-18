/* Copy for /services/category-product-pages. Positioning and scope statements only: no client results, logos or statistics.
   Owner to review the engagement scope (audit vs rewrite vs implementation) before launch. */
import type { Faq, Usp } from "./types";
import type { FitItem } from "./fit";
import type { Platform } from "./platforms";
import type { ProcessStep } from "./process";

export const categoryGoodFit: FitItem[] = [
  { title: "Stores with thin collection pages", text: "Category pages are mostly a product grid with no heading, copy or internal links to rank on." },
  { title: "Catalogues with templated product pages", text: "Manufacturer descriptions and copied titles make products look the same as every other seller." },
  { title: "Pages competing with each other", text: "Several collections or products target the same search and none of them ranks well." },
  { title: "Traffic that lands but doesn't buy", text: "Pages get visits, but the layout, copy and product information don't help shoppers decide." },
  { title: "Growing or restructured catalogues", text: "New ranges, merged collections or a new navigation need a page plan before they go live." },
  { title: "Teams who want a clear page brief", text: "You want titles, headings, copy and link guidance written for each template, not general advice." },
];

export const categoryNotFit: FitItem[] = [
  { title: "Stores that haven't launched", text: "With no products or pages yet, build the catalogue first and bring us in before launch." },
  { title: "Anyone expecting guaranteed rankings", text: "Better pages improve your chances. They can't guarantee positions or traffic." },
  { title: "Sites with serious crawl or index problems", text: "If pages aren't being indexed, fix that first. Technical SEO is the better starting point." },
  { title: "Stores with only a few products", text: "A handful of pages rarely needs a dedicated page program. A one-off review may be enough." },
  { title: "Anyone after copy at scale for its own sake", text: "We write for pages that can rank and sell, not to fill every URL with text." },
  { title: "Businesses that don't sell online", text: "Our work is built around products, categories and carts." },
];

export const categoryPlatforms: Platform[] = [
  { slug: "shopify", title: "Shopify", line: "Collection descriptions, metafields, theme templates and filter apps, edited where your theme actually lets you.", href: "/platforms/shopify", brand: "var(--brand-shopify)", icon: "bag" },
  { slug: "woocommerce", title: "WooCommerce", line: "Category archives, product templates and SEO plugin fields, with copy placed where WordPress renders it.", href: "/platforms/woocommerce", brand: "var(--brand-woocommerce)", icon: "chat" },
  { slug: "bigcommerce", title: "BigCommerce", line: "Category and product fields, custom URLs and faceted pages that stay clear as the catalogue grows.", href: "/platforms/bigcommerce", brand: "var(--brand-bigcommerce)", icon: "hex" },
  { slug: "magento", title: "Magento", line: "Layered navigation, CMS blocks and large category trees handled without duplicating thin pages.", href: "/platforms/magento", brand: "var(--brand-magento)", icon: "box" },
  { slug: "headless", title: "Headless and custom", line: "Page content, headings and links delivered in the server response, with templates your team can reuse.", href: "/platforms/headless", brand: "var(--brand-headless)", icon: "code" },
];

export const categoryUsps: Usp[] = [
  {
    id: "intent-first", tab: "Intent first", title: "One clear search intent per page",
    description: "Each category and product page is matched to what shoppers are looking for, so your pages stop competing with each other.",
    points: ["Keyword-to-page mapping", "Cannibalization checks", "Collection versus product intent", "Naming that matches how shoppers search"],
    visual: "store", sample: false,
  },
  {
    id: "templates", tab: "Template-ready", title: "Briefs your team can reuse",
    description: "We write page patterns for your templates, so new collections and products start from a good page instead of a blank one.",
    points: ["Title and heading patterns", "Intro and buying-guide copy blocks", "Internal link rules between pages", "Guidance for your platform and theme"],
    visual: "platforms", sample: false,
  },
  {
    id: "shopper-copy", tab: "Written for shoppers", title: "Copy that helps people choose",
    description: "Search engines read the page, but a shopper decides on it. Copy covers the questions people ask before they add to cart.",
    points: ["Specs, sizing and compatibility answers", "Comparisons between similar products", "Honest descriptions, not keyword stuffing", "Clear paths to related products"],
    visual: "report", sample: false,
  },
  {
    id: "clear-scope", tab: "Clear scope", title: "Briefs, copy and publishing kept separate",
    description: "You know whether an engagement covers briefs only, written copy or hands-on updates before it starts.",
    points: ["Scope agreed up front", "Number of pages defined in writing", "Publishing support scoped separately", "Revisions agreed before work begins"],
    visual: "terms", sample: false,
  },
];

export const categorySteps: ProcessStep[] = [
  { id: "research", title: "Research", short: "We match real searches to your pages.", description: "We review search demand for your collections and products, check how the pages currently rank, and decide which page should answer which search.", outputs: ["Keyword-to-page map", "Intent clusters", "Overlap notes"], points: ["Group searches by shopper intent", "Match each group to one collection or product", "Find pages competing for the same search", "Note gaps where no page exists yet"] },
  { id: "structure", title: "Structure", short: "A page plan for each template.", description: "We set out how each category and product page should be laid out: headings, filters, copy blocks, product information and internal links.", outputs: ["Page templates", "Heading outlines", "Internal link rules"], points: ["Outline sections for each page type", "Decide where copy sits around the product grid", "Plan links to related collections and guides", "Flag template changes your developer must make"] },
  { id: "optimize", title: "Write", short: "Titles, headings and copy for the pages that matter.", description: "We write titles, meta descriptions, headings and on-page copy for your priority pages, starting with the collections and products that matter most to revenue.", outputs: ["Titles and meta tags", "Collection and product copy", "Schema guidance"], points: ["Titles and meta descriptions that match intent", "Intro and supporting copy for collections", "Product descriptions that answer buying questions", "Product and breadcrumb markup guidance"] },
  { id: "review", title: "Review", short: "We check the pages and plan what's next.", description: "After publishing we check that the changes are live and rendering properly, then review performance and decide which pages to work on next.", outputs: ["Live-page check", "Performance review", "Next-pages list"], points: ["Confirm titles, copy and links are live", "Check pages are indexed and rendering", "Review search performance by page", "Pick the next pages to work on"] },
];

export const categoryCompare = {
  common: {
    title: "Templates and generic optimization",
    sub: "Page edits without store context",
    items: ["Same title pattern on every page", "Manufacturer or copied descriptions", "Keywords added without intent", "Copy bolted onto the bottom of the grid", "Pages left to compete with each other", "No review after publishing"],
  },
  boost: {
    title: "BoostCart",
    sub: "Category and product page optimization",
    items: ["Titles matched to search intent", "Descriptions written for your products", "One intent mapped to each page", "Copy placed where shoppers read it", "Internal links between related pages", "A review of pages after publishing"],
  },
};

export const categoryFaqs: Faq[] = [
  { q: "What does category and product page optimization include?", a: "Keyword-to-page mapping, titles and meta descriptions, headings, collection and product copy, internal links, and structured data guidance. The scope for your store depends on its size, platform and where pages currently fall short.", sample: false },
  { q: "How is a category page different from a product page for SEO?", a: "Category pages usually match broader searches such as \"trail running shoes\", while product pages match specific items and models. They need different structure, copy and links, and they shouldn't compete for the same search.", sample: false },
  { q: "Should category pages have text on them?", a: "Often a short, useful block helps both shoppers and search engines understand the page, but only when it adds something. We recommend what to include and where it should sit, rather than adding text to every page by default.", sample: false },
  { q: "How do you stop collections competing with each other?", a: "We map each search to one page, then look for overlapping collections, tags and filters. The fix may be merging pages, changing a title, adjusting internal links or removing a page from search, depending on the case.", sample: false },
  { q: "Can you write product descriptions at scale?", a: "We write descriptions for your priority products and set up patterns your team can reuse. We don't write thin text for every URL, because copy that doesn't help a shopper rarely helps a page.", sample: false },
  { q: "Do you work with Shopify and WooCommerce?", a: "Yes. We also work with BigCommerce, Magento, headless storefronts and custom platforms, and write recommendations for what each platform allows.", sample: false },
  { q: "How do you decide which pages to start with?", a: "We look at revenue, search demand and current visibility to pick the collections and products where better pages are most likely to matter. We confirm the list with you before work starts.", sample: false },
  { q: "What do I receive at the end of the work?", a: "Depending on the engagement: a keyword-to-page map, page templates, written titles and copy for priority pages, internal link guidance and a review of how the pages are performing.", sample: false },
  { q: "Do you publish the changes or only provide the copy?", a: "That depends on the scope we agree. Briefs and copy are delivered for your team, and hands-on publishing support can be added. It is agreed before any work starts.", sample: false },
  { q: "Will better pages guarantee higher rankings?", a: "No. Search engines decide rankings, and competition, authority and technical health all play a part. Stronger pages improve your chances and give shoppers more reason to buy.", sample: false },
  { q: "How long does it take to see results?", a: "It varies with catalogue size, competition and how quickly changes are published. We set expectations for your store when we scope the work.", sample: false },
];
