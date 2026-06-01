'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import ImageUpload from '../_components/ImageUpload';

type Member = {
  id?: string;
  name: string;
  position: string;
  photo: string;
  category: string;
  avenue: string;
  priority: number;
  instagram: string;
  linkedin: string;
  facebook: string;
};

const POSITIONS: Record<string, string[]> = {
  'Advisory Panel': ['Guiding Lion', 'Club Advisor', 'Zone Chairperson'],
  'Executive Committee': ['President', 'Vice President', 'Secretary', 'Joint Secretary', 'Treasurer', 'PRO', 'Sergeant at Arms'],
  'Director': ['Director'],
  'Members': ['Member'],
};

const EXEC_ORDER: Record<string, number> = {
  'President': 1, 'Vice President': 2, 'Secretary': 3,
  'Joint Secretary': 4, 'Treasurer': 5, 'PRO': 6, 'Sergeant at Arms': 7,
};

const ADVISORY_ORDER: Record<string, number> = {
  'Guiding Lion': 1, 'Club Advisor': 2, 'Zone Chairperson': 3,
};

const CATEGORY_DEFAULTS: Record<string, { position: string; priority: number }> = {
  'Advisory Panel':      { position: 'Guiding Lion', priority: ADVISORY_ORDER['Guiding Lion'] },
  'Executive Committee': { position: 'President',    priority: EXEC_ORDER['President'] },
  'Director':            { position: 'Director',     priority: 100 },
  'Members':             { position: 'Member',       priority: 500 },
};

export default function TeamForm({ member }: { member?: Member }) {
  const router = useRouter();
  const [form, setForm] = useState<Member>(member ?? {
    name: '', position: '', photo: '', category: 'Executive Committee',
    avenue: '', priority: 1, instagram: '', linkedin: '', facebook: '',
  });
  const [saving, setSaving] = useState(false);

  function set(field: keyof Member, value: string | number) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function handlePositionChange(position: string) {
    const autoOrder = EXEC_ORDER[position] ?? ADVISORY_ORDER[position] ?? form.priority;
    setForm(f => ({ ...f, position, priority: autoOrder }));
  }

  function handleCategoryChange(category: string) {
    const def = CATEGORY_DEFAULTS[category] ?? { position: '', priority: 99 };
    setForm(f => ({ ...f, category, position: def.position, priority: def.priority, avenue: '' }));
  }

  const showAvenue = form.category === 'Director' || form.category === 'Members';

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const data = {
      ...form,
      avenue: showAvenue ? (form.avenue || null) : null,
    };
    if (form.id) {
      await supabase.from('team_members').update(data).eq('id', form.id);
    } else {
      await supabase.from('team_members').insert(data);
    }
    router.push('/admin/team');
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Name</label>
        <input value={form.name} onChange={e => set('name', e.target.value)} required
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-3">Photo</label>
        <ImageUpload value={form.photo} onChange={url => set('photo', url)} folder="team" />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Category</label>
        <select value={form.category} onChange={e => handleCategoryChange(e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors">
          <option>Advisory Panel</option>
          <option>Executive Committee</option>
          <option>Director</option>
          <option>Members</option>
        </select>
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">
          Position <span className="text-gray-700 font-normal normal-case tracking-normal ml-2">- auto-sets display order</span>
        </label>
        <select value={form.position} onChange={e => handlePositionChange(e.target.value)} required
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors">
          <option value="">- Select position -</option>
          {(POSITIONS[form.category] ?? []).map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      {showAvenue && (
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">
            Avenue / Department <span className="text-gray-700 font-normal normal-case tracking-normal ml-2">- optional</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Information Technology"
            value={form.avenue}
            onChange={e => set('avenue', e.target.value)}
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
          />
        </div>
      )}

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">
          Display Order <span className="text-gray-700 font-normal normal-case tracking-normal ml-2">- auto-filled, adjust if needed</span>
        </label>
        <input type="number" min={1} value={form.priority} onChange={e => set('priority', +e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
        <p className="text-gray-700 text-[9px] mt-1 uppercase tracking-widest">Lower number = shown first</p>
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-3">Social Links</label>
        <div className="space-y-3">
          {(['instagram', 'linkedin', 'facebook'] as const).map(s => (
            <div key={s} className="flex items-center gap-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-600 w-20">{s}</span>
              <input value={form[s]} onChange={e => set(s, e.target.value)} placeholder="https://..."
                className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={saving}
          className="px-8 py-4 rounded-xl text-white text-xs font-black uppercase tracking-widest disabled:opacity-50"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          {saving ? 'Saving...' : form.id ? 'Update Member' : 'Add Member'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-8 py-4 rounded-xl text-gray-400 text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all">
          Cancel
        </button>
      </div>
    </form>
  );
}
