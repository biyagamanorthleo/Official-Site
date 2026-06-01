import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FolderOpen, Trophy, Image, Users, Star, LogOut, ExternalLink, MessageSquare } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/achievements', label: 'Achievements', icon: Trophy },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/presidents', label: 'Hall of Honor', icon: Star },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
];

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

  return (
    <div className="min-h-screen bg-black flex">
      <aside className="w-64 bg-[#050505] border-r border-white/5 flex flex-col">
        <div className="p-8 border-b border-white/5">
          <span className="text-xl font-heading font-black text-white tracking-widest">LCBN</span>
          <p className="text-red-800 text-[9px] font-black uppercase tracking-[0.3em] mt-1">Admin Panel</p>
          <Link href="/" target="_blank"
            className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest border border-white/5 hover:border-white/15 transition-all">
            <ExternalLink size={12} /> View Site
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest group">
              <Icon size={16} className="group-hover:text-red-500 transition-colors" />
              {label}
            </Link>
          ))}
        </nav>
        <form action="/api/auth/signout" method="POST" className="p-4 border-t border-white/5">
          <button type="submit" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-red-500 transition-all text-xs font-bold uppercase tracking-widest w-full">
            <LogOut size={16} /> Sign Out
          </button>
        </form>
      </aside>
      <main className="flex-1 overflow-auto p-10">{children}</main>
    </div>
  );
}
