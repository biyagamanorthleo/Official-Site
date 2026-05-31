import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import DeleteButton from '../_components/DeleteButton';

export default async function AdminAchievements() {
  const supabase = await createClient();
  const { data: achievements } = await supabase.from('achievements').select('*').order('sort_order');

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">Achievements</h1>
          <p className="text-gray-600 text-xs uppercase tracking-widest font-bold mt-1">{achievements?.length ?? 0} total</p>
        </div>
        <Link href="/admin/achievements/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          <Plus size={16} /> New Achievement
        </Link>
      </div>

      <div className="space-y-3">
        {achievements?.map((a) => (
          <div key={a.id} className="flex items-center justify-between bg-[#050505] border border-white/5 rounded-2xl px-8 py-5 hover:border-white/10 transition-all">
            <div>
              <p className="text-white font-black text-sm uppercase tracking-tight">{a.title}</p>
              <span className="text-[9px] font-black uppercase tracking-widest text-red-800">{a.category} Â· {a.year}</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/admin/achievements/${a.id}`} className="p-2 text-gray-500 hover:text-white transition-colors"><Pencil size={16} /></Link>
              <DeleteButton id={a.id} table="achievements" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

