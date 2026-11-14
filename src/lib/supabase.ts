import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client (ESM version of the Hostinger "db.js" snippet).
 * Only import this from API routes and server code. The key is the publishable key, and row level security on
 * `public.leads` only allows INSERT, so even a leaked key cannot read submissions back.
 *
 * Hostinger adds the Supabase variables to the app automatically. The names below cover both our own names and the
 * common ones, so the site works whichever the host sets.
 */
const url = () => process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = () =>
  process.env.SUPABASE_PUBLISHABLE_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  process.env.SUPABASE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

let cached: SupabaseClient | null = null;

/** The shared client, or null when the environment variables are missing. */
export function getSupabase(): SupabaseClient | null {
  const u = url();
  const k = key();
  if (!u || !k) return null;
  cached ??= createClient(u, k, { auth: { persistSession: false, autoRefreshToken: false } });
  return cached;
}
