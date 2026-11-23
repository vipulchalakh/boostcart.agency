/* Homepage "How we work" funnel. Eight steps, top of the funnel first. */
export type FunnelStep = {
  name: string;
  tagline: string;
  body: string;
  /** "The difference": the usual approach (struck through) and ours. */
  old: string;
  ours: string;
  outputs: [string, string, string];
};

export const funnelSteps: FunnelStep[] = [
  {
    name: "Leak Audit",
    tagline: "We crawl your store and find exactly where rankings are leaking.",
    body: "A full technical and content audit across collections, products, templates and filtered URLs, plus a check on how AI tools describe your brand today.",
    old: "A 300-line error dump",
    ours: "Every leak ranked by the revenue it costs you",
    outputs: ["Crawl & index report", "Template issue log", "Quick-win list"],
  },
  {
    name: "Demand Mapping",
    tagline: "We give every keyword a page, and every page a buying moment.",
    body: "Search terms are sorted by shopper intent (browsing, comparing, ready to buy) and mapped to the one collection, product or guide that should win them. No orphan keywords, no two pages fighting for the same term.",
    old: "A keyword list",
    ours: "A page-by-page ownership map",
    outputs: ["Keyword-to-page map", "Cannibalisation log", "Intent ladder"],
  },
  {
    name: "Revenue Roadmap",
    tagline: "We sequence the work by what pays back first.",
    body: "Every fix, page and link is scored on revenue impact, effort and risk, then locked into a 90-day plan with one clear owner for each task.",
    old: "A never-ending backlog",
    ours: "A 90-day plan ordered by payback",
    outputs: ["90-day roadmap", "Impact scorecard", "Owner map"],
  },
  {
    name: "Seal the Leaks",
    tagline: "We fix the template-level issues that bleed rankings.",
    body: "Duplicate filtered URLs, faceted navigation, stray noindex tags, thin templates, structured data and speed. We fix at the template, so one change repairs thousands of URLs.",
    old: "Patching URLs one by one",
    ours: "One template fix that repairs thousands of pages",
    outputs: ["Template fixes", "Schema markup", "Index-clean sitemap"],
  },
  {
    name: "Money Pages",
    tagline: "We rebuild the pages that actually take the order.",
    body: "Category and product pages rewritten around the intent map: titles, copy, internal links, FAQs and schema. Written for shoppers first, search engines and AI answers second.",
    old: "Copy written for crawlers",
    ours: "Pages built around how shoppers decide",
    outputs: ["Category page rewrites", "Product page templates", "Internal link grid"],
  },
  {
    name: "Decision Content",
    tagline: "We publish the guides shoppers read right before they buy.",
    body: "Comparison and how-to-choose guides that answer questions at the point of decision, and link straight to the money pages they support.",
    old: "Blog filler",
    ours: "Guides that feed a specific collection page",
    outputs: ["Buying guide briefs", "Comparison pages", "Guide-to-product links"],
  },
  {
    name: "Authority Stack",
    tagline: "We earn the links and citations that make rankings stick.",
    body: "Editorial links, digital PR and brand mentions aimed at your money pages, plus the citations that get your store named in AI answers.",
    old: "Link volume for its own sake",
    ours: "Links and citations aimed at the pages that sell",
    outputs: ["Link target list", "Outreach & PR", "AI citation tracker"],
  },
  {
    name: "Compounding Loop",
    tagline: "We report in plain language and feed every result back in.",
    body: "A monthly report you'll actually read: what moved, what it earned, what we do next. Each result resets the roadmap, so every cycle starts smarter than the last.",
    old: "A dashboard of vanity metrics",
    ours: "A plain report that resets the roadmap",
    outputs: ["Monthly growth report", "Next-cycle roadmap", "Win / loss review"],
  },
];
