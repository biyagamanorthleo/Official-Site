import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import DeleteButton from '../_components/DeleteButton';

export default async function AdminProjects() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from('projects').select('*').order('sort_order');

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">Projects</h1>
          <p className="text-gray-600 text-xs uppercase tracking-widest font-bold mt-1">{projects?.length ?? 0} total</p>
        </div>
        <Link href="/admin/projects/new" className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          <Plus size={16} /> New Project
        </Link>
      </div>

      <div className="space-y-3">
        {projects?.map((p) => (
          <div key={p.id} className="flex items-center justify-between bg-[#050505] border border-white/5 rounded-2xl px-8 py-5 hover:border-white/10 transition-all">
            <div className="flex items-center gap-6">
              {p.image && <img src={p.image} alt={p.title} className="w-12 h-12 rounded-xl object-cover grayscale opacity-60" />}
              <div>
                <p className="text-white font-black text-sm uppercase tracking-tight">{p.title}</p>
                <span className="text-[9px] font-black uppercase tracking-widest text-red-800">{p.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/admin/projects/${p.id}`} className="p-2 text-gray-500 hover:text-white transition-colors"><Pencil size={16} /></Link>
              <DeleteButton id={p.id} table="projects" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

