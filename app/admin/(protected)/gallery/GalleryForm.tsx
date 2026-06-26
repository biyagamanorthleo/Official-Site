'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import ImageUpload from '../_components/ImageUpload';

export default function GalleryForm() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from('gallery_photos').insert({ url, caption });
    setUrl('');
    setCaption('');
    setSaving(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleAdd} className="space-y-5">
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted block mb-3">Photo</label>
        <ImageUpload value={url} onChange={setUrl} folder="gallery" />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted block mb-2">Caption (optional)</label>
        <input
          type="text"
          placeholder="e.g. Vision For All 2024"
          value={caption}
          onChange={e => setCaption(e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={saving || !url}
        className="px-8 py-4 rounded-xl text-white text-xs font-black uppercase tracking-widest disabled:opacity-40 transition-all"
        style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}
      >
        {saving ? 'Adding...' : 'Add to Gallery'}
      </button>
    </form>
  );
}
