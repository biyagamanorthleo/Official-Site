'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Member = { id?: string; name: string; position: string; photo: string; category: string; avenue: string; priority: number; instagram: string; linkedin: string; facebook: string };

export default function TeamForm({ member }: { member?: Member }) {
  const router = useRouter();
  const [form, setForm] = useState<Member>(member ?? { name: '', position: '', photo: '', category: 'Executive Committee', avenue: '', priority: 99, instagram: '', linkedin: '', facebook: '' });
  const [saving, setSaving] = useState(false);

  function set(field: keyof Member, value: string | number) { setForm(f => ({ ...f, [field]: value })); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const supabase = createClient();
    if (form.id) { await supabase.from('team_members').update(form).eq('id', form.id); }
    else { await supabase.from('team_members').insert(form); }
    router.push('/admin/team'); router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      {[{ label: 'Name', field: 'name' as const }, { label: 'Position', field: 'position' as const }, { label: 'Photo URL', field: 'photo' as const }, { label: 'Avenue (Directors only)', field: 'avenue' as const }].map(({ label, field }) => (
        <div key={field}>
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">{label}</label>
          <input value={form[field] as string} onChange={e => set(field, e.target.value)} required={field === 'name' || field === 'position'}
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
        </div>
      ))}
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Category</label>
        <select value={form.category} onChange={e => set('category', e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors">
          <option>Advisory Panel</option><option>Executive Committee</option><option>Director</option>
        </select>
      </div>
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Priority (display order)</label>
        <input type="number" value={form.priority} onChange={e => set('priority', +e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {(['instagram', 'linkedin', 'facebook'] as const).map(s => (
          <div key={s}>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">{s}</label>
            <input value={form[s]} onChange={e => set(s, e.target.value)} placeholder="#"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
          </div>
        ))}
      </div>
      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={saving} className="px-8 py-4 rounded-xl text-white text-xs font-black uppercase tracking-widest disabled:opacity-50"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>{saving ? 'Saving...' : form.id ? 'Update' : 'Create'}</button>
        <button type="button" onClick={() => router.back()} className="px-8 py-4 rounded-xl text-gray-400 text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all">Cancel</button>
      </div>
    </form>
  );
}
