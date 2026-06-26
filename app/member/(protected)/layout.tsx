import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, PenSquare, LogOut, ExternalLink, Package, FileText, Hash, Briefcase, Phone, Mail } from 'lucide-react';

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/member/login');
  }

  const { data: profile } = await supabase
    .from('members')
    .select('name, position, phone, mylci_number')
    .eq('id', user.id)
    .single();

  const displayName = profile?.name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Member';

  return (
    <div className="min-h-screen bg-black flex">
      <aside className="w-64 bg-[#030303] border-r border-white/[0.04] flex flex-col">

        {/* Member Details */}
        <div className="p-6 border-b border-white/[0.04]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-red-950/40 border border-red-900/30 flex items-center justify-center flex-shrink-0">
              <Users size={15} className="text-red-600" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-heading font-black text-white tracking-widest truncate leading-tight">{displayName}</p>
              <p className="text-red-900 text-[9px] font-black uppercase tracking-[0.3em]">Member</p>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {profile?.mylci_number && (
              <div className="flex items-center gap-2">
                <Hash size={10} className="text-white/20 flex-shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ink-muted">{profile.mylci_number}</span>
              </div>
            )}
            {profile?.position && (
              <div className="flex items-center gap-2">
                <Briefcase size={10} className="text-white/20 flex-shrink-0" />
                <span className="text-[10px] font-bold text-ink-muted truncate">{profile.position}</span>
              </div>
            )}
            {profile?.phone && (
              <div className="flex items-center gap-2">
                <Phone size={10} className="text-white/20 flex-shrink-0" />
                <span className="text-[10px] font-bold text-ink-muted">{profile.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Mail size={10} className="text-white/20 flex-shrink-0" />
              <span className="text-[10px] font-bold text-ink-muted truncate">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto space-y-5">

          {/* Resources */}
          <div>
            <p className="px-4 pt-2 pb-1 text-[9px] font-black uppercase tracking-[0.25em] text-white/20">Resources</p>
            <div className="space-y-0.5">
              <Link href="/member/starter-pack"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-ink-muted hover:text-white hover:bg-white/[0.04] transition-all text-[11px] font-black uppercase tracking-widest group">
                <Package size={13} className="group-hover:text-red-500 transition-colors" />
                Starter Pack
              </Link>
            </div>
          </div>

          {/* Blog */}
          <div>
            <p className="px-4 pt-2 pb-1 text-[9px] font-black uppercase tracking-[0.25em] text-white/20">Blog</p>
            <div className="space-y-0.5">
              <Link href="/member"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-ink-muted hover:text-white hover:bg-white/[0.04] transition-all text-[11px] font-black uppercase tracking-widest group">
                <FileText size={13} className="group-hover:text-red-500 transition-colors" />
                My Posts
              </Link>
              <Link href="/member/blog/new"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-ink-muted hover:text-white hover:bg-white/[0.04] transition-all text-[11px] font-black uppercase tracking-widest group">
                <PenSquare size={13} className="group-hover:text-red-500 transition-colors" />
                Write a Post
              </Link>
              <Link href="/blog" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-ink-muted hover:text-white hover:bg-white/[0.04] transition-all text-[11px] font-black uppercase tracking-widest group">
                <ExternalLink size={13} className="group-hover:text-red-500 transition-colors" />
                View Blog
              </Link>
            </div>
          </div>

        </nav>

        {/* Sign out */}
        <form action="/api/member/signout" method="POST" className="p-3 border-t border-white/[0.04]">
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
