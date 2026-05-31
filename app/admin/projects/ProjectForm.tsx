'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Project = {
  id?: string;
  title: string;
  description: string;
  long_description: string;
  status: string;
  image: string;
  date: string;
  impact: string;
  sort_order: number;
};

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [form, setForm] = useState<Project>(project ?? {
    title: '', description: '', long_description: '', status: 'Completed',
    image: '', date: '', impact: '', sort_order: 0,
  });
  const [saving, setSaving] = useState(false);

  function set(field: keyof Project, value: string | number) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    if (form.id) {
      await supabase.from('projects').update(form).eq('id', form.id);
    } else {
      await supabase.from('projects').insert(form);
    }
    router.push('/admin/projects');
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      {[
        { label: 'Title', field: 'title' as const, type: 'text' },
        { label: 'Image URL', field: 'image' as const, type: 'text' },
        { label: 'Date', field: 'date' as const, type: 'text' },
        { label: 'Impact', field: 'impact' as const, type: 'text' },
        { label: 'Sort Order', field: 'sort_order' as const, type: 'number' },
      ].map(({ label, field, type }) => (
        <div key={field}>
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">{label}</label>
          <input type={type} value={form[field] as string} onChange={e => set(field, type === 'number' ? +e.target.value : e.target.value)} required={field === 'title'}
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
        </div>
      ))}

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Status</label>
        <select value={form.status} onChange={e => set('status', e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors">
          <option>Completed</option>
          <option>Ongoing</option>
          <option>Coming Soon</option>
        </select>
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Short Description</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={2}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors resize-none" />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Full Description</label>
        <textarea value={form.long_description} onChange={e => set('long_description', e.target.value)} rows={5}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors resize-none" />
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={saving}
          className="px-8 py-4 rounded-xl text-white text-xs font-black uppercase tracking-widest disabled:opacity-50 transition-all"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          {saving ? 'Saving...' : form.id ? 'Update Project' : 'Create Project'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-8 py-4 rounded-xl text-gray-400 text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all">
          Cancel
        </button>
      </div>
    </form>
  );
}
