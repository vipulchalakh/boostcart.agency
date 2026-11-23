import type { Metric } from "./types";

export const showMetrics = true;

/**
 * Totals across the 17 published case studies in Sanity (checked 23 Nov 2026).
 * Revenue and visits are monthly: sum of (after − before) across all case studies.
 * Growth is the median organic traffic growth (the mean is skewed by one +7,060% launch).
 * Re-run the numbers when case studies are added or changed.
 */
export const metrics: Metric[] = [
  { value: 17, label: "STORES GROWN", sample: false },
  { value: 944, prefix: "$", suffix: "K", label: "MONTHLY ORGANIC REVENUE ADDED", sample: false },
  { value: 757, suffix: "K", label: "MONTHLY ORGANIC VISITS ADDED", sample: false },
  { value: 214, prefix: "+", suffix: "%", label: "MEDIAN TRAFFIC GROWTH", sample: false },
];
