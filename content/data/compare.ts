/* Comparison copy. Owner to review: these are positioning statements about typical alternatives, not proof. */
export type Verdict = "yes" | "partial" | "no";
export type Cell = { verdict: Verdict; text: string };
export type Criterion = { label: string; boost: Cell; inHouse: Cell; agency: Cell };

export const criteria: Criterion[] = [
  { label: "Technical, content and links in one place", boost: { verdict: "yes", text: "One team and one roadmap" }, inHouse: { verdict: "partial", text: "Needs several specialist hires" }, agency: { verdict: "partial", text: "Often split or outsourced" } },
  { label: "E-commerce focus", boost: { verdict: "yes", text: "Built around stores, categories and carts" }, inHouse: { verdict: "partial", text: "Depends on who you hire" }, agency: { verdict: "no", text: "Generalists serving every industry" } },
  { label: "Time to get started", boost: { verdict: "yes", text: "Free audit, then a clear roadmap" }, inHouse: { verdict: "no", text: "Months to recruit and onboard" }, agency: { verdict: "yes", text: "Usually quick to onboard" } },
  { label: "Cost", boost: { verdict: "yes", text: "One clear monthly price" }, inHouse: { verdict: "no", text: "Salaries, tools and overhead" }, agency: { verdict: "partial", text: "Retainers plus add-ons" } },
  { label: "Reporting tied to revenue", boost: { verdict: "yes", text: "Monthly report on organic revenue" }, inHouse: { verdict: "partial", text: "Depends on your tooling" }, agency: { verdict: "no", text: "Often traffic and rankings only" } },
  { label: "Flexibility", boost: { verdict: "yes", text: "Scale the work up or down" }, inHouse: { verdict: "no", text: "Fixed headcount" }, agency: { verdict: "partial", text: "Contract terms vary" } },
  { label: "Specialist coverage", boost: { verdict: "yes", text: "Strategy, writing and development" }, inHouse: { verdict: "partial", text: "Limited to your team's skills" }, agency: { verdict: "partial", text: "Varies by account" } },
  { label: "Accountability", boost: { verdict: "yes", text: "One accountable point of contact" }, inHouse: { verdict: "yes", text: "Your own people" }, agency: { verdict: "partial", text: "Can shift between account managers" } },
];
