'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { GripVertical, Pencil, Trash2, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const STATUSES = ['Completed', 'Ongoing', 'Coming Soon'] as const;
type Status = typeof STATUSES[number];

const STATUS_STYLES: Record<Status, string> = {
  'Completed':  'text-emerald-500 border-emerald-900/40 bg-emerald-950/20',
  'Ongoing':    'text-red-400    border-red-900/40    bg-red-950/20',
  'Coming Soon':'text-amber-400  border-amber-900/40  bg-amber-950/20',
};

export type ProjectListItem = {
  id: string;
  title: string;
  status: string;
  thumbnail?: string;
  featured: boolean;
};

type Props = {
  initialItems: ProjectListItem[];
};

export default function ProjectsAdminList({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const [saving, setSaving] = useState(false);
  const [openStatus, setOpenStatus] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const dragId = useRef<string | null>(null);
  const router = useRouter();

  function onDragStart(id: string) { dragId.current = id; }

  function onDrop(targetId: string) {
    const from = dragId.current;
    if (!from || from === targetId) { setDragOver(null); return; }
    const fromIdx = items.findIndex(i => i.id === from);
    const toIdx   = items.findIndex(i => i.id === targetId);
    if (fromIdx === -1 || toIdx === -1) return;
    const updated = [...items];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setItems(updated);
    setDragOver(null);
    dragId.current = null;
  }

  async function saveOrder() {
    setSaving(true);
    const supabase = createClient();
    await Promise.all(
      items.map((item, i) =>
        supabase.from('projects').update({ sort_order: i + 1 }).eq('id', item.id)
      )
    );
    setSaving(false);
    router.refresh();
  }

  async function changeStatus(id: string, status: Status) {
    setOpenStatus(null);
    setItems(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    const supabase = createClient();
    await supabase.from('projects').update({ status }).eq('id', id);
  }

  async function handleDelete(item: ProjectListItem) {
    if (!confirm(`Delete "${item.title}"?`)) return;
    const supabase = createClient();
    await supabase.from('projects').delete().eq('id', item.id);
    setItems(prev => prev.filter(i => i.id !== item.id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
          {items.length} items &mdash; drag to reorder
        </p>
        <button
          onClick={saveOrder}
          disabled={saving || items.length === 0}
          className="px-6 py-2.5 rounded-xl text-white text-xs font-black uppercase tracking-widest disabled:opacity-40 transition-all"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}
        >
          {saving ? 'Saving...' : 'Save Order'}
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, i) => {
          const status = (STATUSES.includes(item.status as Status) ? item.status : 'Completed') as Status;
          return (
            <div
              key={item.id}
              draggable
              onDragStart={() => onDragStart(item.id)}
              onDragOver={e => { e.preventDefault(); setDragOver(item.id); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => onDrop(item.id)}
              onDragEnd={() => { setDragOver(null); dragId.current = null; }}
              className={`flex items-center cursor-grab active:cursor-grabbing rounded-2xl border transition-all duration-150 select-none overflow-visible ${
                dragOver === item.id
                  ? 'border-red-600 ring-1 ring-red-600/30 bg-red-950/10'
                  : 'border-white/5 bg-[#050505] hover:border-white/10'
              }`}
            >
              {/* Drag handle + position */}
              <div className="flex items-center gap-2 px-4 py-5 border-r border-white/5 w-14 flex-shrink-0">
                <GripVertical size={14} className="text-white/20" />
                <span className="text-[10px] font-black text-white/20">{i + 1}</span>
              </div>

              {/* Thumbnail */}
              {item.thumbnail && (
                <div className="pl-4 flex-shrink-0">
                  <img src={item.thumbnail} alt="" className="w-10 h-10 rounded-xl object-cover grayscale opacity-60" />
                </div>
              )}

              {/* Title */}
              <div className="flex-1 px-5 py-4 min-w-0">
                <p className="text-white font-black text-sm uppercase tracking-tight truncate">{item.title}</p>
                {item.featured && (
                  <span className="text-[8px] font-black uppercase tracking-widest text-red-600 mt-0.5 block">
                    Featured on homepage
                  </span>
                )}
              </div>

              {/* Inline status picker */}
              <div className="relative flex-shrink-0 px-3" onClick={e => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setOpenStatus(openStatus === item.id ? null : item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all ${STATUS_STYLES[status]}`}
                >
                  {status}
                  <ChevronDown size={10} className={`transition-transform ${openStatus === item.id ? 'rotate-180' : ''}`} />
                </button>

                {openStatus === item.id && (
                  <div className="absolute right-0 top-full mt-1 z-50 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[130px]">
                    {STATUSES.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => changeStatus(item.id, s)}
                        className={`w-full text-left px-4 py-2.5 text-[9px] font-black uppercase tracking-widest transition-colors hover:bg-white/5 ${
                          s === status ? STATUS_STYLES[s] : 'text-gray-500'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Edit / Delete */}
              <div className="flex items-center gap-1 pr-4 flex-shrink-0">
                <Link
                  href={`/admin/projects/${item.id}`}
                  onClick={e => e.stopPropagation()}
                  className="p-2 text-gray-600 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <Pencil size={15} />
                </Link>
                <button
                  onClick={e => { e.stopPropagation(); handleDelete(item); }}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors rounded-lg hover:bg-white/5"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
