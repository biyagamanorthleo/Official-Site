'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { GripVertical, Trash2 } from 'lucide-react';

type Photo = {
  id: string;
  url: string;
  caption: string | null;
  sort_order: number;
};

export default function GalleryReorder({ initialPhotos }: { initialPhotos: Photo[] }) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const dragId = useRef<string | null>(null);
  const router = useRouter();

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

  async function handleDelete(id: string) {
    if (!confirm('Delete this photo?')) return;
    const supabase = createClient();
    await supabase.from('gallery_photos').delete().eq('id', id);
    setPhotos(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
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

            {/* Delete overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
              <button
                onClick={() => handleDelete(p.id)}
                className="p-2.5 rounded-full bg-red-900/80 hover:bg-red-600 text-white transition-colors"
              >
                <Trash2 size={16} />
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
