import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import DeleteButton from '../_components/DeleteButton';

export default async function AdminPresidents() {
  const supabase = await createClient();
  const { data: presidents } = await supabase.from('presidents').select('*').order('sort_order');

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">Hall of Honor</h1>
          <p className="text-gray-600 text-xs uppercase tracking-widest font-bold mt-1">{presidents?.length ?? 0} past presidents</p>
        </div>
        <Link href="/admin/presidents/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          <Plus size={16} /> Add President
        </Link>
      </div>

      <div className="space-y-3">
        {presidents?.map((p) => (
          <div key={p.id} className="flex items-center justify-between bg-[#050505] border border-white/5 rounded-2xl px-8 py-5 hover:border-white/10 transition-all">
            <div className="flex items-center gap-5">
              <img src={p.photo} alt={p.name} className="w-10 h-10 rounded-full object-cover grayscale opacity-60" />
              <div>
                <p className="text-white font-black text-sm uppercase tracking-tight">{p.name}</p>
                <span className="text-[9px] font-black uppercase tracking-widest text-red-800">{p.year}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/admin/presidents/${p.id}`} className="p-2 text-gray-500 hover:text-white transition-colors"><Pencil size={16} /></Link>
              <DeleteButton id={p.id} table="presidents" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

