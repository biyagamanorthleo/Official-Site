'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';

type TestimonialRow = {
  id?: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
  sort_order: number;
};

export default function TestimonialForm({ testimonial }: { testimonial?: TestimonialRow }) {
  const router = useRouter();
  const [form, setForm] = useState<TestimonialRow>(testimonial ?? {
    quote: '', name: '', role: '', initials: '', rating: 5, sort_order: 0,
  });
  const [hovered, setHovered] = useState(0);
  const [saving, setSaving] = useState(false);

  function set(field: keyof TestimonialRow, value: string | number) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    if (form.id) {
      await supabase.from('testimonials').update(form).eq('id', form.id);
    } else {
      await supabase.from('testimonials').insert(form);
    }
    router.push('/admin/testimonials');
    router.refresh();
  }

  const displayRating = hovered || form.rating;

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">

      {/* Star rating picker */}
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-3">Rating</label>
        <div className="flex items-center gap-2 p-5 bg-black border border-white/10 rounded-xl">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => {
              const val = i + 1;
              return (
                <button
                  key={i}
                  type="button"
                  onMouseEnter={() => setHovered(val)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => set('rating', val)}
                  className="transition-transform hover:scale-110"
                  aria-label={`${val} star${val > 1 ? 's' : ''}`}
                >
                  <Star
                    size={28}
                    className={val <= displayRating ? 'text-red-500' : 'text-white/15'}
                    fill={val <= displayRating ? 'currentColor' : 'none'}
                  />
                </button>
              );
            })}
          </div>
          <span className="text-gray-500 text-xs font-black uppercase tracking-widest ml-3">
            {form.rating} / 5
          </span>
        </div>
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Quote</label>
        <textarea
          value={form.quote}
          onChange={e => set('quote', e.target.value)}
          required
          rows={4}
          placeholder="What did they say about the club?"
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Name</label>
          <input
            value={form.name}
            onChange={e => set('name', e.target.value)}
            required
            placeholder="Full name"
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Initials</label>
          <input
            value={form.initials}
            onChange={e => set('initials', e.target.value.toUpperCase().slice(0, 3))}
            required
            placeholder="e.g. TB"
            maxLength={3}
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors uppercase"
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Role / Title</label>
        <input
          value={form.role}
          onChange={e => set('role', e.target.value)}
          required
          placeholder="e.g. Leo Member, 2023–Present"
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
        />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Display Order</label>
        <input
          type="number"
          value={form.sort_order}
          onChange={e => set('sort_order', +e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-4 rounded-xl text-white text-xs font-black uppercase tracking-widest disabled:opacity-50"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}
        >
          {saving ? 'Saving...' : form.id ? 'Update Testimonial' : 'Add Testimonial'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-4 rounded-xl text-gray-400 text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
