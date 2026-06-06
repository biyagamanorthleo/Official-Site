import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, PenSquare, LogOut, ExternalLink, LayoutDashboard } from 'lucide-react';

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/member/login');
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Member';

  return (
    <div className="min-h-screen bg-black flex">
      <aside className="w-60 bg-[#030303] border-r border-white/[0.04] flex flex-col">
        <div className="p-7 border-b border-white/[0.04]">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-red-950/40 border border-red-900/30 flex items-center justify-center flex-shrink-0">
              <Users size={14} className="text-red-600" />
            </div>
            <span className="text-sm font-heading font-black text-white tracking-widest truncate">{displayName}</span>
          </div>
          <p className="text-red-900 text-[9px] font-black uppercase tracking-[0.3em] ml-11">Member</p>
          <Link href="/blog" target="_blank" rel="noopener noreferrer"
            className="mt-5 flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-600 hover:text-white text-[9px] font-black uppercase tracking-widest border border-white/[0.04] hover:border-white/10 transition-all">
            <ExternalLink size={10} /> View Blog
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          <Link href="/member"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/[0.04] transition-all text-[11px] font-black uppercase tracking-widest group">
            <LayoutDashboard size={15} className="group-hover:text-red-500 transition-colors" />
            My Posts
          </Link>
          <Link href="/member/blog/new"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/[0.04] transition-all text-[11px] font-black uppercase tracking-widest group">
            <PenSquare size={15} className="group-hover:text-red-500 transition-colors" />
            Write a Post
          </Link>
        </nav>

        <form action="/api/member/signout" method="POST" className="p-3 border-t border-white/[0.04]">
          <button type="submit"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-red-500 transition-all text-[11px] font-black uppercase tracking-widest w-full">
            <LogOut size={15} /> Sign Out
          </button>
        </form>
      </aside>

      <main className="flex-1 overflow-auto p-10">{children}</main>
    </div>
  );
}
