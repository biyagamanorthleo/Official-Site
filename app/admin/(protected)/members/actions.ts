'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

async function assertAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error('Unauthorized');
  }
}

export async function createMember(data: {
  name: string;
  email: string;
  position: string;
  phone: string;
}) {
  await assertAdmin();

  const admin = createAdminClient();

  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email: data.email,
    email_confirm: true,
    password: crypto.randomUUID(),
    user_metadata: { full_name: data.name },
  });

  if (authError) throw new Error(authError.message);

  const supabase = await createClient();
  const { error: dbError } = await supabase.from('members').insert({
    id: authData.user.id,
    name: data.name,
    email: data.email,
    position: data.position || null,
    phone: data.phone || null,
  });

  if (dbError) {
    await admin.auth.admin.deleteUser(authData.user.id);
    throw new Error(dbError.message);
  }

  await admin.auth.resetPasswordForEmail(data.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lcbn.org'}/member/update-password`,
  });

  revalidatePath('/admin/members');
}

export async function resendSetupEmail(email: string) {
  await assertAdmin();
  const admin = createAdminClient();
  await admin.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lcbn.org'}/member/update-password`,
  });
}

export async function deleteMember(id: string) {
  await assertAdmin();
  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/members');
}
