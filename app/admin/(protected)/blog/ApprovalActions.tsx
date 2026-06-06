'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Check, X } from 'lucide-react';

export default function ApprovalActions({ id }: { id: string }) {
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null);

  async function approve() {
    setLoading('approve');
    const supabase = createClient();
    await supabase.from('blog_posts').update({ status: 'published', rejection_note: null }).eq('id', id);
    window.location.reload();
  }

  async function reject() {
    const note = prompt('Reason for rejection (optional — member will see this):') ?? '';
    setLoading('reject');
    const supabase = createClient();
    await supabase.from('blog_posts').update({ status: 'rejected', rejection_note: note || null }).eq('id', id);
    window.location.reload();
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={approve} disabled={!!loading}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-green-950/40 text-green-500 border border-green-900/30 hover:bg-green-900/30 transition-all disabled:opacity-50">
        <Check size={12} />
        {loading === 'approve' ? '...' : 'Approve'}
      </button>
      <button onClick={reject} disabled={!!loading}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-red-950/20 text-red-600 border border-red-900/20 hover:bg-red-900/20 transition-all disabled:opacity-50">
        <X size={12} />
        {loading === 'reject' ? '...' : 'Reject'}
      </button>
    </div>
  );
}
