'use client';

import { useEffect, useState, Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { KeyRound } from 'lucide-react';

function UpdatePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const code = searchParams.get('code');

    const markReady = () => setReady(true);
    const markError = (msg: string) => setError(msg);

    if (code) {
      // PKCE flow — code in query param
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) markError('This link has expired or already been used. Please request a new one.');
        else markReady();
      });
      return;
    }

    // Reset emails are sent by the server-side client (implicit flow), so the token arrives as
    // #access_token=...; the browser client is PKCE-only and rejects that, so set the session by hand.
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const hashError = hash.get('error_code') || hash.get('error');
    if (hashError) {
      markError(hashError === 'otp_expired'
        ? 'This link has expired or already been used. Please request a new one.'
        : 'Invalid or missing reset link. Please request a new one.');
      return;
    }
    const accessToken = hash.get('access_token');
    const refreshToken = hash.get('refresh_token');
    if (accessToken && refreshToken) {
      supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }).then(({ error }) => {
        if (error) {
          markError('This link has expired or already been used. Please request a new one.');
          return;
        }
        window.history.replaceState(null, '', window.location.pathname);
        markReady();
      });
      return;
    }

    // No link token: allow it only if the member is already signed in.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) markReady();
      else markError('Invalid or missing reset link. Please request a new one.');
    });
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) { setError(error.message); setLoading(false); }
    else setDone(true);
  }

  if (done) {
    return (
      <div className="text-center py-4 space-y-4">
        <p className="text-green-500 text-sm font-black uppercase tracking-widest">Password Updated!</p>
        <p className="text-ink-muted text-xs">You can now log in with your new password.</p>
        <button onClick={() => router.push('/member/login')}
          className="mt-4 px-8 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          Go to Login
        </button>
      </div>
    );
  }

  if (error && !ready) {
    return (
      <div className="text-center py-4 space-y-4">
        <p className="text-red-500 text-xs font-bold leading-relaxed">{error}</p>
        <a href="/member/forgot-password"
          className="block text-ink-muted text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors mt-2">
          Request new link →
        </a>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="text-center py-8">
        <div className="w-5 h-5 border-2 border-red-800 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-ink-muted text-[10px] font-black uppercase tracking-widest">Verifying link...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted block mb-2">New Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
      </div>
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted block mb-2">Confirm Password</label>
        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={6}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors" />
      </div>
      {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
      <button type="submit" disabled={loading}
        className="w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-widest text-white disabled:opacity-50"
        style={{ background: 'linear-gradient(to bottom, #980016 0%, #3d0009 100%)' }}>
        {loading ? 'Saving...' : 'Set New Password'}
      </button>
    </form>
  );
}

export default function UpdatePasswordPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl border border-white/10 bg-white/5 mb-6">
            <KeyRound size={24} className="text-red-600" />
          </div>
          <span className="block text-xl font-heading font-black text-white tracking-widest">Set Password</span>
          <p className="text-ink-muted text-[10px] font-black uppercase tracking-[0.4em] mt-2">BN Leos Member Portal</p>
        </div>
        <div className="bg-[#050505] border border-white/10 rounded-[2rem] p-10">
          <Suspense fallback={
            <div className="text-center py-8">
              <div className="w-5 h-5 border-2 border-red-800 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          }>
            <UpdatePasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
