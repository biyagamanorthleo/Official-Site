'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Achievement = { id?: string; title: string; description: string; year: string; category: string; image: string; sort_order: number };

export default function AchievementForm({ achievement }: { achievement?: Achievement }) {
  const router = useRouter();
  const [form, setForm] = useState<Achievement>(achievement ?? { title: '', description: '', year: '', category: 'District Award', image: '', sort_order: 0 });
  const [saving, setSaving] = useState(false);

  function set(field: keyof Achievement, value: string | number) { setForm(f => ({ ...f, [field]: value })); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const supabase = createClient();
    if (form.id) { await supabase.from('achievements').update(form).eq('id', form.id); }
    else { await supabase.from('achievements').insert(form); }
    router.push('/admin/achievements'); router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      {[{ label: 'Title', field: 'title' as const }, { label: 'Year', field: 'year' as const }, { label: 'Image URL', field: 'image' as const }].map(({ label, field }) => (
        <div key={field}>
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">{label}</label>
          <input value={form[field] as string} onChange={e => set(field, e.target.value)} required={field === 'title'}
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
        </div>
      ))}
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Category</label>
        <select value={form.category} onChange={e => set('category', e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors">
          <option>District Award</option><option>Regional Recognition</option><option>Club Milestone</option>
        </select>
      </div>
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Description</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors resize-none" />
      </div>
      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={saving} className="px-8 py-4 rounded-xl text-white text-xs font-black uppercase tracking-widest disabled:opacity-50"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>{saving ? 'Saving...' : form.id ? 'Update' : 'Create'}</button>
        <button type="button" onClick={() => router.back()} className="px-8 py-4 rounded-xl text-gray-400 text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all">Cancel</button>
      </div>
    </form>
  );
}
