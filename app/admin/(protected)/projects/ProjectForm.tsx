'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import ImageUpload from '../_components/ImageUpload';

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
  featured: boolean;
};

export default function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [form, setForm] = useState<Project>(project ?? {
    title: '', description: '', long_description: '', status: 'Completed',
    image: '', date: '', impact: '', sort_order: 0, featured: false,
  });
  const [saving, setSaving] = useState(false);

  function set(field: keyof Project, value: string | number | boolean) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    if (form.id) {
      const { id, ...data } = form;
      const { error } = await supabase.from('projects').update(data).eq('id', id);
      if (error) { alert(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from('projects').insert(form);
      if (error) { alert(error.message); setSaving(false); return; }
    }
    window.location.href = '/admin/projects';
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Title</label>
        <input value={form.title} onChange={e => set('title', e.target.value)} required
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-3">Image</label>
        <ImageUpload value={form.image} onChange={url => set('image', url)} folder="projects" />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Status</label>
        <select value={form.status} onChange={e => set('status', e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors">
          <option>Completed</option>
          <option>Ongoing</option>
          <option>Coming Soon</option>
        </select>
      </div>

      {[
        { label: 'Date (e.g. March 2024)', field: 'date' as const },
        { label: 'Impact (e.g. 200 people helped)', field: 'impact' as const },
      ].map(({ label, field }) => (
        <div key={field}>
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">{label}</label>
          <input value={form[field] as string} onChange={e => set(field, e.target.value)}
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
        </div>
      ))}

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

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Display Order</label>
        <input type="number" value={form.sort_order} onChange={e => set('sort_order', +e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
      </div>

      <div className="flex items-center justify-between p-5 bg-black border border-white/10 rounded-xl">
        <div>
          <p className="text-white text-sm font-black uppercase tracking-widest">Feature on Homepage</p>
          <p className="text-gray-600 text-[11px] mt-1">Show this project in the landing page carousel</p>
        </div>
        <button
          type="button"
          onClick={() => set('featured', !form.featured)}
          className={`relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${form.featured ? '' : 'bg-white/10'}`}
          style={form.featured ? { background: 'linear-gradient(to right, #980016, #e8001d)' } : {}}
          aria-label="Toggle homepage feature"
        >
          <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${form.featured ? 'left-6' : 'left-0.5'}`} />
        </button>
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={saving}
          className="px-8 py-4 rounded-xl text-white text-xs font-black uppercase tracking-widest disabled:opacity-50"
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
