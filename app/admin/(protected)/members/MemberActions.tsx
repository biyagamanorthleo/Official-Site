'use client';

import { useState, useTransition } from 'react';
import { resendSetupEmail, deleteMember } from './actions';
import { Trash2, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

export function ResendButton({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [errMsg, setErrMsg] = useState('');

  function handleResend() {
    setStatus('idle');
    setErrMsg('');
    startTransition(async () => {
      try {
        await resendSetupEmail(email);
        setStatus('ok');
        setTimeout(() => setStatus('idle'), 3000);
      } catch (e) {
        setStatus('err');
        setErrMsg(e instanceof Error ? e.message : 'Unknown error');
        setTimeout(() => { setStatus('idle'); setErrMsg(''); }, 6000);
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button onClick={handleResend} disabled={isPending}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all disabled:opacity-50
          ${status === 'ok' ? 'text-green-500 border-green-900/40' : status === 'err' ? 'text-red-500 border-red-900/40' : 'text-ink-muted border-white/5 hover:text-white hover:border-white/15'}`}>
        {status === 'ok' ? <CheckCircle size={11} /> : status === 'err' ? <AlertCircle size={11} /> : <RefreshCw size={11} className={isPending ? 'animate-spin' : ''} />}
        {status === 'ok' ? 'Sent!' : status === 'err' ? 'Failed' : 'Resend'}
      </button>
      {errMsg && (
        <p className="text-red-500 text-[9px] font-bold max-w-[200px] text-right leading-tight">{errMsg}</p>
      )}
    </div>
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
      className="px-4 py-2 rounded-xl text-ink-muted text-[10px] font-black uppercase tracking-widest hover:text-red-500 border border-white/5 hover:border-red-900/30 transition-all disabled:opacity-50">
      <Trash2 size={12} />
    </button>
  );
}
