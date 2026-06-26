'use client';

import { useState, useTransition } from 'react';
import { requestPasswordReset } from '../actions';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    startTransition(async () => {
      const result = await requestPasswordReset(
        email,
        `${window.location.origin}/member/update-password`
      );
      if (result.error) {
        setError(result.error);
      } else {
        setSent(true);
      }
    });
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link href="/member/login"
          className="inline-flex items-center gap-2 text-ink-muted text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors mb-10">
          <ArrowLeft size={12} /> Back to Login
        </Link>

        <div className="bg-[#050505] border border-white/10 rounded-[2rem] p-10">
          <h2 className="text-white font-heading font-black text-xl uppercase tracking-tighter mb-2">Reset Password</h2>
          <p className="text-ink-muted text-xs uppercase tracking-widest font-bold mb-8">
            Enter your email and we&apos;ll send a reset link
          </p>

          {sent ? (
            <div className="text-center py-4 space-y-3">
              <p className="text-green-500 text-sm font-black uppercase tracking-widest">Email Sent</p>
              <p className="text-ink-muted text-xs leading-relaxed">
                Check your inbox for a password reset link. It expires in 1 hour.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-xl">
                  <p className="text-red-400 text-xs font-bold leading-relaxed">{error}</p>
                </div>
              )}

              <button type="submit" disabled={isPending}
                className="w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-widest text-white disabled:opacity-50"
                style={{ background: 'linear-gradient(to bottom, #980016 0%, #3d0009 100%)' }}>
                {isPending ? 'Checking...' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
