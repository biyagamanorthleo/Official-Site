'use client';

import { useTransition } from 'react';
import { resendSetupEmail, deleteMember } from './actions';
import { Trash2, RefreshCw } from 'lucide-react';

export function ResendButton({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();

  function handleResend() {
    startTransition(async () => {
      try {
        await resendSetupEmail(email);
        alert('Setup email resent.');
      } catch {
        alert('Failed to resend email.');
      }
    });
  }

  return (
    <button onClick={handleResend} disabled={isPending}
      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-gray-500 text-[10px] font-black uppercase tracking-widest border border-white/5 hover:text-white hover:border-white/15 transition-all disabled:opacity-50">
      <RefreshCw size={11} className={isPending ? 'animate-spin' : ''} />
      Resend
    </button>
  );
}

export function DeleteMemberButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm('Remove this member? They will lose access immediately.')) return;
    startTransition(async () => {
      try {
        await deleteMember(id);
      } catch {
        alert('Failed to delete member.');
      }
    });
  }

  return (
    <button onClick={handleDelete} disabled={isPending}
      className="px-4 py-2 rounded-xl text-gray-700 text-[10px] font-black uppercase tracking-widest hover:text-red-500 border border-white/5 hover:border-red-900/30 transition-all disabled:opacity-50">
      <Trash2 size={12} />
    </button>
  );
}
