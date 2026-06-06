'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/member/update-password`,
    });
    if (error) { setError(error.message); setLoading(false); }
    else setSent(true);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link href="/member/login"
          className="inline-flex items-center gap-2 text-gray-600 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors mb-10">
          <ArrowLeft size={12} /> Back to Login
        </Link>

        <div className="bg-[#050505] border border-white/10 rounded-[2rem] p-10">
          <h2 className="text-white font-heading font-black text-xl uppercase tracking-tighter mb-2">Reset Password</h2>
          <p className="text-gray-600 text-xs uppercase tracking-widest font-bold mb-8">
            Enter your email and we&apos;ll send a reset link
          </p>

          {sent ? (
            <div className="text-center py-4">
              <p className="text-green-500 text-sm font-black uppercase tracking-widest mb-3">Email Sent</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Check your inbox for a password reset link. It expires in 1 hour.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
                />
              </div>
              {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-widest text-white disabled:opacity-50"
                style={{ background: 'linear-gradient(to bottom, #980016 0%, #3d0009 100%)' }}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
