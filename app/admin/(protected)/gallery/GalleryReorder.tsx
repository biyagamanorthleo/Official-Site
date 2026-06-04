'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { GripVertical, Trash2, Star } from 'lucide-react';

type Photo = {
  id: string;
  url: string;
  caption: string | null;
  sort_order: number;
  featured_in_carousel: boolean;
};

export default function GalleryReorder({ initialPhotos }: { initialPhotos: Photo[] }) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const dragId = useRef<string | null>(null);
  const router = useRouter();

  const featuredCount = photos.filter(p => p.featured_in_carousel).length;

  function onDragStart(id: string) {
    dragId.current = id;
  }

  function onDrop(targetId: string) {
    const from = dragId.current;
    if (!from || from === targetId) { setDragOver(null); return; }
    const fromIdx = photos.findIndex(p => p.id === from);
    const toIdx = photos.findIndex(p => p.id === targetId);
    if (fromIdx === -1 || toIdx === -1) return;
    const updated = [...photos];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setPhotos(updated);
    setDragOver(null);
    dragId.current = null;
  }

  async function saveOrder() {
    setSaving(true);
    const supabase = createClient();
    await Promise.all(
      photos.map((p, i) =>
        supabase.from('gallery_photos').update({ sort_order: i }).eq('id', p.id)
      )
    );
    setSaving(false);
    router.refresh();
  }

  async function toggleFeatured(id: string, current: boolean) {
    if (!current && featuredCount >= 7) return;
    setTogglingId(id);
    const supabase = createClient();
    await supabase.from('gallery_photos').update({ featured_in_carousel: !current }).eq('id', id);
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, featured_in_carousel: !current } : p));
    setTogglingId(null);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this photo?')) return;
    const supabase = createClient();
    await supabase.from('gallery_photos').delete().eq('id', id);
    setPhotos(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
          Drag to reorder &mdash; {photos.length} photos
        </p>
        <button
          onClick={saveOrder}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl text-white text-xs font-black uppercase tracking-widest disabled:opacity-40 transition-all"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}
        >
          {saving ? 'Saving...' : 'Save Order'}
        </button>
      </div>

      {/* Carousel featured indicator */}
      <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl bg-[#0a0a0a] border border-white/5">
        <Star size={14} className={featuredCount > 0 ? 'text-yellow-500' : 'text-gray-600'} fill={featuredCount > 0 ? 'currentColor' : 'none'} />
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
          Home carousel:
        </span>
        <span className={`text-[10px] font-black uppercase tracking-widest ${featuredCount >= 7 ? 'text-red-500' : 'text-white'}`}>
          {featuredCount} / 7 featured
        </span>
        {featuredCount >= 7 && (
          <span className="text-[9px] text-red-500/70 font-black uppercase tracking-widest ml-1">— remove one to add another</span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((p, i) => (
          <div
            key={p.id}
            draggable
            onDragStart={() => onDragStart(p.id)}
            onDragOver={e => { e.preventDefault(); setDragOver(p.id); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={() => onDrop(p.id)}
            onDragEnd={() => { setDragOver(null); dragId.current = null; }}
            className={`group relative aspect-[4/5] rounded-2xl overflow-hidden border cursor-grab active:cursor-grabbing transition-all duration-150 select-none ${
              dragOver === p.id
                ? 'border-red-600 ring-2 ring-red-600/40 scale-[1.03]'
                : p.featured_in_carousel
                  ? 'border-yellow-600/50'
                  : 'border-white/5'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.url}
              alt={p.caption ?? ''}
              className="w-full h-full object-cover grayscale opacity-60 pointer-events-none"
              draggable={false}
            />

            {/* Position badge */}
            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/70">
              <GripVertical size={12} className="text-white/50" />
              <span className="text-[10px] font-black text-white/50">{i + 1}</span>
            </div>

            {/* Featured star badge */}
            {p.featured_in_carousel && (
              <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-yellow-600/80 flex items-center gap-1">
                <Star size={10} className="text-white" fill="currentColor" />
                <span className="text-[8px] font-black text-white uppercase tracking-widest">Carousel</span>
              </div>
            )}

            {/* Hover actions */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3">
              <button
                onClick={() => toggleFeatured(p.id, p.featured_in_carousel)}
                disabled={togglingId === p.id || (!p.featured_in_carousel && featuredCount >= 7)}
                title={
                  !p.featured_in_carousel && featuredCount >= 7
                    ? 'Max 7 featured — remove one first'
                    : p.featured_in_carousel
                      ? 'Remove from carousel'
                      : 'Feature in home carousel'
                }
                className={`px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all disabled:opacity-40 ${
                  p.featured_in_carousel
                    ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                    : 'bg-white/10 text-white hover:bg-yellow-600 border border-white/10'
                }`}
              >
                <Star size={11} fill={p.featured_in_carousel ? 'currentColor' : 'none'} />
                {p.featured_in_carousel ? 'Unfeature' : 'Feature'}
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="p-2.5 rounded-full bg-red-900/80 hover:bg-red-600 text-white transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {p.caption && (
              <p className="absolute bottom-2 left-2 right-2 text-[8px] text-white font-bold truncate pointer-events-none">
                {p.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
