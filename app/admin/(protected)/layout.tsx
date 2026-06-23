import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminNav from './_components/AdminNav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const allowedEmail = process.env.ADMIN_EMAIL;
  if (allowedEmail && user.email !== allowedEmail) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-black lg:flex">
      <AdminNav />
      <main className="flex-1 overflow-auto p-5 sm:p-8 lg:p-10 min-w-0">{children}</main>
    </div>
  );
}
