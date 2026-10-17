import type { Metric } from "./types";

/** TODO-REAL: four verifiable numbers, or set showMetrics to false. */
export const showMetrics = true;

export const metrics: Metric[] = [
  { value: 120, label: "STORES GROWN", sample: true },
  { value: 18, prefix: "$", suffix: "M", label: "ORGANIC REVENUE INFLUENCED", sample: true },
  { value: 2400, label: "KEYWORDS IN TOP 10", sample: true },
  { value: 45, suffix: " DAYS", label: "AVG. TIME TO FIRST WINS", sample: true },
];
