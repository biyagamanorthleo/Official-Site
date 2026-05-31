import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { FolderOpen, Users, Trophy, Image, Star } from 'lucide-react';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: projects },
    { count: team },
    { count: achievements },
    { count: gallery },
    { count: presidents },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('team_members').select('*', { count: 'exact', head: true }),
    supabase.from('achievements').select('*', { count: 'exact', head: true }),
    supabase.from('gallery_photos').select('*', { count: 'exact', head: true }),
    supabase.from('presidents').select('*', { count: 'exact', head: true }),
  ]);

  const cards = [
    { label: 'Projects', count: projects, href: '/admin/projects', icon: FolderOpen },
    { label: 'Team Members', count: team, href: '/admin/team', icon: Users },
    { label: 'Achievements', count: achievements, href: '/admin/achievements', icon: Trophy },
    { label: 'Gallery Photos', count: gallery, href: '/admin/gallery', icon: Image },
    { label: 'Past Presidents', count: presidents, href: '/admin/presidents', icon: Star },
  ];

  return (
    <div>
      <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight mb-2">Dashboard</h1>
      <p className="text-gray-600 text-xs uppercase tracking-widest font-bold mb-12">Leo Club of Biyagama North - Content Management</p>

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
      </div>

      <div className="mt-12 bg-[#050505] border border-white/5 rounded-2xl p-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-3">Quick tip</p>
        <p className="text-gray-400 text-sm">All changes save directly to Supabase and appear on the live site instantly. Use the sidebar to manage each content section.</p>
      </div>
    </div>
  );
}

