export const formatPercent = (n: number) => `+${Math.round(n).toLocaleString("en-US")}%`;

export const formatCount = (n: number) => Math.round(n).toLocaleString("en-US");

export const formatMoney = (n: number, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, notation: "compact", maximumFractionDigits: 1 }).format(n);

/** Percent change from `before` to `after`; null when there is no baseline to compare against. */
export function percentChange(before: number, after: number) {
  if (!before) return null;
  return ((after - before) / before) * 100;
}

export function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
