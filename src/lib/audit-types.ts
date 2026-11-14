/** Shapes shared by /api/free-audit and the free audit page. Only what the page needs, never the raw API payload. */

export type CheckStatus = "pass" | "warning" | "fail" | "info";
export type Severity = "high" | "medium" | "low";

export type AuditCheck = { name: string; status: CheckStatus; value: string | null; note: string | null };
export type AuditCategory = { key: string; label: string; score: number; checks: AuditCheck[] };
export type AuditIssue = { severity: Severity; category: string; issue: string; fix: string; plain: string; owner: "developer" | "content" | "marketing" | null };
export type AiCategory = { key: string; label: string; score: number; max: number };

export type AuditResult = {
  url: string;
  host: string;
  score: number;
  grade: string;
  responseTime: string | null;
  categories: AuditCategory[];
  ai: { score: number; grade: string; categories: AiCategory[] } | null;
  issues: AuditIssue[];
  checkedAt: string;
};

export type AuditRequest = { name: string; url: string; platform: string; industry: string };

export type AuditResponse = { ok: true; result: AuditResult } | { ok: false; error: string; code: "invalid" | "busy" | "unreachable" | "failed"; field?: keyof AuditRequest };

export const PLATFORM_OPTIONS = ["Shopify", "WooCommerce", "BigCommerce", "Magento", "Headless / custom", "Other"] as const;
