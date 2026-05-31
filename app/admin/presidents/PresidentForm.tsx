'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type President = { id?: string; name: string; year: string; photo: string; description: string; sort_order: number };

export default function PresidentForm({ president }: { president?: President }) {
  const router = useRouter();
  const [form, setForm] = useState<President>(president ?? { name: '', year: '', photo: '', description: '', sort_order: 0 });
  const [saving, setSaving] = useState(false);

  function set(field: keyof President, value: string | number) { setForm(f => ({ ...f, [field]: value })); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true);
    const supabase = createClient();
    if (form.id) { await supabase.from('presidents').update(form).eq('id', form.id); }
    else { await supabase.from('presidents').insert(form); }
    router.push('/admin/presidents'); router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      {[{ label: 'Name', field: 'name' as const }, { label: 'Year (e.g. 2023-2024)', field: 'year' as const }, { label: 'Photo URL', field: 'photo' as const }].map(({ label, field }) => (
        <div key={field}>
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">{label}</label>
          <input value={form[field] as string} onChange={e => set(field, e.target.value)} required={field !== 'photo'}
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
        </div>
      ))}
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Description</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4}
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
