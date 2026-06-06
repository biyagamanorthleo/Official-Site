'use server';

import { createAdminClient } from '@/lib/supabase/admin';

export async function requestPasswordReset(email: string, redirectTo: string) {
  const admin = createAdminClient();

  const { data: member } = await admin
    .from('members')
    .select('id')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle();

  if (!member) {
    return {
      error: 'This email is not registered as a member. Please contact the club president.',
    };
  }

  const { error } = await admin.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) return { error: error.message };

  return { success: true };
}
