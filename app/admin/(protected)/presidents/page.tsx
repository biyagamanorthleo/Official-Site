import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ReorderList from '../_components/ReorderList';

export default async function AdminPresidents() {
  const supabase = await createClient();
  const { data: presidents } = await supabase.from('presidents').select('*').order('sort_order');

  const items = (presidents ?? []).map(p => ({
    id: p.id,
    title: p.name,
    subtitle: p.year,
    thumbnail: p.photo,
    editHref: `/admin/presidents/${p.id}`,
    table: 'presidents',
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">Hall of Honor</h1>
          <p className="text-gray-600 text-xs uppercase tracking-widest font-bold mt-1">{items.length} past presidents</p>
        </div>
        <Link href="/admin/presidents/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          <Plus size={16} /> Add President
        </Link>
      </div>

      <ReorderList initialItems={items} orderField="sort_order" />
    </div>
  );
}
