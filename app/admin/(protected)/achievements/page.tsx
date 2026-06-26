import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ReorderList from '../_components/ReorderList';

export default async function AdminAchievements() {
  const supabase = await createClient();
  const { data: achievements } = await supabase.from('achievements').select('*').order('sort_order');

  const items = (achievements ?? []).map(a => ({
    id: a.id,
    title: a.title,
    subtitle: `${a.category} · ${a.year}`,
    thumbnail: a.image,
    editHref: `/admin/achievements/${a.id}`,
    table: 'achievements',
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">Achievements</h1>
          <p className="text-ink-muted text-xs uppercase tracking-widest font-bold mt-1">{items.length} total</p>
        </div>
        <Link href="/admin/achievements/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          <Plus size={16} /> New Achievement
        </Link>
      </div>

      <ReorderList initialItems={items} orderField="sort_order" />
    </div>
  );
}
