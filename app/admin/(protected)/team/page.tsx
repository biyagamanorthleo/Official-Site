import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ReorderList from '../_components/ReorderList';

export default async function AdminTeam() {
  const supabase = await createClient();
  const { data: members } = await supabase.from('team_members').select('*').order('priority');

  const items = (members ?? []).map(m => ({
    id: m.id,
    title: m.name,
    subtitle: `${m.position} · ${m.category}`,
    thumbnail: m.photo,
    editHref: `/admin/team/${m.id}`,
    table: 'team_members',
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">Team Members</h1>
          <p className="text-gray-600 text-xs uppercase tracking-widest font-bold mt-1">{items.length} total</p>
        </div>
        <Link href="/admin/team/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          <Plus size={16} /> Add Member
        </Link>
      </div>

      <ReorderList initialItems={items} orderField="priority" />
    </div>
  );
}
