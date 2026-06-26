'use client';

import { Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id, table }: { id: string; table: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Delete this item?')) return;
    const supabase = createClient();
    await supabase.from(table).delete().eq('id', id);
    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="p-2 text-ink-muted hover:text-red-500 transition-colors">
      <Trash2 size={16} />
    </button>
  );
}
