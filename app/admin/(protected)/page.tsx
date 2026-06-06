import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { FolderOpen, Users, Trophy, Image, Star, BookOpen, Clock } from 'lucide-react';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: projects },
    { count: team },
    { count: achievements },
    { count: gallery },
    { count: presidents },
    { count: pending },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('team_members').select('*', { count: 'exact', head: true }),
    supabase.from('achievements').select('*', { count: 'exact', head: true }),
    supabase.from('gallery_photos').select('*', { count: 'exact', head: true }),
    supabase.from('presidents').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);

  const cards = [
    { label: 'Projects',      count: projects,  href: '/admin/projects',     icon: FolderOpen },
    { label: 'Team Members',  count: team,       href: '/admin/team',         icon: Users },
    { label: 'Achievements',  count: achievements, href: '/admin/achievements', icon: Trophy },
    { label: 'Gallery Photos', count: gallery,   href: '/admin/gallery',      icon: Image },
    { label: 'Past Presidents', count: presidents, href: '/admin/presidents', icon: Star },
  ];

  return (
    <div>
      <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight mb-2">Dashboard</h1>
      <p className="text-gray-600 text-xs uppercase tracking-widest font-bold mb-12">Leo Club of Biyagama North - Content Management</p>

      {(pending ?? 0) > 0 && (
        <Link href="/admin/blog"
          className="flex items-center gap-4 mb-8 p-5 bg-amber-950/20 border border-amber-800/40 rounded-2xl hover:border-amber-700/60 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-amber-900/30 flex items-center justify-center flex-shrink-0">
            <Clock size={18} className="text-amber-500" />
          </div>
          <div className="flex-1">
            <p className="text-amber-400 text-sm font-black uppercase tracking-widest">
              {pending} post{pending !== 1 ? 's' : ''} awaiting approval
            </p>
            <p className="text-amber-700 text-[10px] font-bold uppercase tracking-widest mt-0.5">Click to review →</p>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(({ label, count, href, icon: Icon }) => (
          <Link key={href} href={href}
            className="bg-[#050505] border border-white/5 rounded-2xl p-8 hover:border-red-800/40 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <Icon size={22} className="text-red-800 group-hover:text-red-500 transition-colors" />
              <span className="text-3xl font-heading font-black text-white">{count ?? 0}</span>
            </div>
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest">{label}</p>
          </Link>
        ))}

        <Link href="/admin/blog"
          className="bg-[#050505] border border-white/5 rounded-2xl p-8 hover:border-red-800/40 transition-all group">
          <div className="flex items-center justify-between mb-6">
            <BookOpen size={22} className="text-red-800 group-hover:text-red-500 transition-colors" />
            <span className="text-3xl font-heading font-black text-white">{pending ?? 0}</span>
          </div>
          <p className="text-gray-500 text-xs font-black uppercase tracking-widest">Pending Posts</p>
        </Link>
      </div>

      <div className="mt-12 bg-[#050505] border border-white/5 rounded-2xl p-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-3">Quick tip</p>
        <p className="text-gray-400 text-sm">All changes save directly to Supabase and appear on the live site instantly. Use the sidebar to manage each content section.</p>
      </div>
    </div>
  );
}

