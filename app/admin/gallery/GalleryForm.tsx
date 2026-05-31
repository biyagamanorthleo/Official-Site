'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function GalleryForm() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    await supabase.from('gallery_photos').insert({ url, caption });
    setUrl(''); setCaption('');
    setSaving(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4">
      <input type="url" placeholder="Image URL" value={url} onChange={e => setUrl(e.target.value)} required
        className="flex-1 bg-black border border-white/10 rounded-xl px-5 py-3 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
      <input type="text" placeholder="Caption (optional)" value={caption} onChange={e => setCaption(e.target.value)}
        className="flex-1 bg-black border border-white/10 rounded-xl px-5 py-3 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
      <button type="submit" disabled={saving}
        className="px-6 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest disabled:opacity-50 whitespace-nowrap"
        style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
        {saving ? 'Adding...' : 'Add Photo'}
      </button>
    </form>
  );
}
