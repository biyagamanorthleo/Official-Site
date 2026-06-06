'use client';

import { useState, useTransition } from 'react';
import { resendSetupEmail, deleteMember } from './actions';
import { Trash2, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

export function ResendButton({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');

  function handleResend() {
    setStatus('idle');
    startTransition(async () => {
      try {
        await resendSetupEmail(email);
        setStatus('ok');
        setTimeout(() => setStatus('idle'), 3000);
      } catch {
        setStatus('err');
        setTimeout(() => setStatus('idle'), 4000);
      }
    });
  }

  return (
    <button onClick={handleResend} disabled={isPending}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all disabled:opacity-50
        ${status === 'ok' ? 'text-green-500 border-green-900/40' : status === 'err' ? 'text-red-500 border-red-900/40' : 'text-gray-500 border-white/5 hover:text-white hover:border-white/15'}`}>
      {status === 'ok' ? <CheckCircle size={11} /> : status === 'err' ? <AlertCircle size={11} /> : <RefreshCw size={11} className={isPending ? 'animate-spin' : ''} />}
      {status === 'ok' ? 'Sent!' : status === 'err' ? 'Failed' : 'Resend'}
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
