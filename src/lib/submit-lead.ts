/** Browser helper used by every lead form: posts to /api/leads, which stores the submission in Supabase. */
export type LeadPayload = { form: string; name: string; email: string; url?: string; sells?: string; platform?: string; message?: string; topic?: string; company?: string };

export async function submitLead(payload: LeadPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload, page: window.location.pathname }),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (data?.ok) return { ok: true };
    return { ok: false, error: data?.error || "Something went wrong. Please try again." };
  } catch {
    return { ok: false, error: "We couldn't reach the server. Check your connection and try again." };
  }
}
