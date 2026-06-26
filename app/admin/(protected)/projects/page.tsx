import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ProjectsAdminList from './ProjectsAdminList';

export default async function AdminProjects() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from('projects').select('*').order('sort_order');

  const items = (projects ?? []).map(p => ({
    id: p.id,
    title: p.title,
    status: p.status,
    thumbnail: p.image,
    featured: p.featured ?? false,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">Projects</h1>
          <p className="text-ink-muted text-xs uppercase tracking-widest font-bold mt-1">{items.length} total</p>
        </div>
        <Link href="/admin/projects/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          <Plus size={16} /> New Project
        </Link>
      </div>

      <ProjectsAdminList initialItems={items} />
    </div>
  );
}
