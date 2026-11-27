/* Homepage "How we work" grid. Six steps, in order. */
export type HomeProcessStep = {
  name: string;
  tagline: string;
  outputs: [string, string, string];
};

export const homeProcessSteps: HomeProcessStep[] = [
  {
    name: "Leak Audit",
    tagline: "We crawl your store and find exactly where rankings are leaking.",
    outputs: ["Crawl & index report", "Template issue log", "Quick-win list"],
  },
  {
    name: "Demand & Roadmap",
    tagline: "We map every keyword to a page, then sequence the work by what pays back first.",
    outputs: ["Keyword-to-page map", "90-day roadmap", "Impact scorecard"],
  },
  {
    name: "Seal the Leaks",
    tagline: "We fix the template-level issues that bleed rankings.",
    outputs: ["Template fixes", "Schema markup", "Index-clean sitemap"],
  },
  {
    name: "Money Pages",
    tagline: "We rebuild the pages that actually take the order.",
    outputs: ["Category page rewrites", "Product page templates", "Internal link grid"],
  },
  {
    name: "Content & Authority",
    tagline: "We publish buying guides and earn the links and citations that make rankings stick.",
    outputs: ["Buying guides & comparisons", "Outreach & PR", "AI citation tracker"],
  },
  {
    name: "Compounding Loop",
    tagline: "We report in plain language and feed every result back in.",
    outputs: ["Monthly growth report", "Next-cycle roadmap", "Win / loss review"],
  },
];
