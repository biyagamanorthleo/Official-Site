import { createClient } from '@supabase/supabase-js';

/**
 * Cookieless anon client for reading public content (e.g. published blog posts).
 *
 * Unlike the cookie-based server client, this does NOT read request cookies, so
 * pages using it can be statically generated / incrementally regenerated. Use it
 * for public reads only — it has no authenticated session.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
