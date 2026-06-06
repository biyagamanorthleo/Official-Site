'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Trash2 } from 'lucide-react';

export default function DeletePostButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm('Delete this post?')) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from('blog_posts').delete().eq('id', id);
    window.location.reload();
  }

  return (
    <button onClick={handleDelete} disabled={loading}
      className="px-4 py-2 rounded-xl text-gray-700 text-[10px] font-black uppercase tracking-widest hover:text-red-500 border border-white/5 hover:border-red-900/30 transition-all disabled:opacity-50">
      <Trash2 size={12} />
    </button>
  );
}
