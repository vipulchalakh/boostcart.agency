export const formatPercent = (n: number) => `+${Math.round(n).toLocaleString("en-US")}%`;

/** Before/after values are typed by editors as text ("35k", "72.8k", "1.2M", "1,145"). Older entries may still be plain numbers. */
export type Amount = string | number | null;

const MULTIPLIERS: Record<string, number> = { k: 1e3, m: 1e6, b: 1e9 };

/** The number behind a typed amount, used only to work out the percent change. */
export function parseAmount(value: Amount | undefined): number | null {
  if (value == null) return null;
  if (typeof value === "number") return value;
  const m = value.trim().replace(/[$£€,\s]/g, "").match(/^(\d+(?:\.\d+)?)([kmb])?$/i);
  return m ? Number(m[1]) * (m[2] ? MULTIPLIERS[m[2].toLowerCase()] : 1) : null;
}

/** Shows an amount the way it was typed. Plain numbers (older entries) are grouped with commas. */
export function displayAmount(value: Amount | undefined): string {
  if (value == null) return "";
  if (typeof value === "number") return Math.round(value * 100) / 100 === Math.round(value) ? Math.round(value).toLocaleString("en-US") : String(value);
  return value.trim();
}

/** Currency symbol for a code, e.g. USD -> $, CAD -> CA$. */
export function currencySymbol(currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).formatToParts(0).find((p) => p.type === "currency")?.value ?? "$";
}

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
