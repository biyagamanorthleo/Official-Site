import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, FileText, LogOut, ExternalLink, LayoutDashboard } from 'lucide-react';

const navItems = [
  { href: '/blog/admin',       label: 'Dashboard', icon: LayoutDashboard },
  { href: '/blog/admin/posts', label: 'Posts',     icon: FileText },
];

export default async function BlogAdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/blog/admin/login');
  }

  const mainAdminEmail = process.env.ADMIN_EMAIL;
  const isMainAdmin = mainAdminEmail && user.email === mainAdminEmail;

  if (!isMainAdmin) {
    const { data: allowed } = await supabase
      .from('blog_admins')
      .select('id')
      .eq('email', user.email)
      .maybeSingle();

    if (!allowed) {
      redirect('/blog/admin/login');
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      <aside className="w-60 bg-[#030303] border-r border-white/[0.04] flex flex-col">
        <div className="p-7 border-b border-white/[0.04]">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-red-950/40 border border-red-900/30 flex items-center justify-center flex-shrink-0">
              <BookOpen size={14} className="text-red-600" />
            </div>
            <span className="text-sm font-heading font-black text-white tracking-widest">LCBN</span>
          </div>
          <p className="text-red-900 text-[9px] font-black uppercase tracking-[0.3em] ml-11">Blog Admin</p>
          <div className="flex gap-2 mt-5">
            <Link href="/blog" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-ink-muted hover:text-white text-[9px] font-black uppercase tracking-widest border border-white/[0.04] hover:border-white/10 transition-all">
              <ExternalLink size={10} /> Blog
            </Link>
            <Link href="/admin" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-ink-muted hover:text-white text-[9px] font-black uppercase tracking-widest border border-white/[0.04] hover:border-white/10 transition-all">
              <ExternalLink size={10} /> Main
            </Link>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-ink-muted hover:text-white hover:bg-white/[0.04] transition-all text-[11px] font-black uppercase tracking-widest group">
              <Icon size={15} className="group-hover:text-red-500 transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        <form action="/api/auth/signout" method="POST" className="p-3 border-t border-white/[0.04]">
          <button type="submit"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-ink-muted hover:text-red-500 transition-all text-[11px] font-black uppercase tracking-widest w-full">
            <LogOut size={15} /> Sign Out
          </button>
        </form>
      </aside>

      <main className="flex-1 overflow-auto p-10">{children}</main>
    </div>
  );
}
