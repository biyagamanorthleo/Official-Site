import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { FileText, Eye, PenSquare } from 'lucide-react';

export default async function BlogAdminDashboard() {
  const supabase = await createClient();

  const [{ count: total }, { count: published }, { count: pending }] = await Promise.all([
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);

  const stats = [
    { label: 'Total Posts', value: total ?? 0,     icon: FileText,  href: '/blog/admin/posts' },
    { label: 'Published',   value: published ?? 0, icon: Eye,       href: '/blog/admin/posts' },
    { label: 'Pending',     value: pending ?? 0,   icon: PenSquare, href: '/blog/admin/posts' },
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-12">
        <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">Dashboard</h1>
        <p className="text-ink-muted text-xs font-bold uppercase tracking-widest mt-2">Blog Content Overview</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-12">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href}
            className="bg-[#050505] border border-white/5 rounded-2xl p-6 hover:border-red-900/30 transition-all group">
            <Icon size={20} className="text-red-800 mb-4 group-hover:text-red-600 transition-colors" />
            <p className="text-3xl font-heading font-black text-white">{value}</p>
            <p className="text-ink-muted text-[10px] font-black uppercase tracking-widest mt-1">{label}</p>
          </Link>
        ))}
      </div>

      <Link href="/blog/admin/posts/new"
        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white text-xs font-black uppercase tracking-widest transition-all hover:opacity-90"
        style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
        <PenSquare size={16} />
        Write New Post
      </Link>
    </div>
  );
}
