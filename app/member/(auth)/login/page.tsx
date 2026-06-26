'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';
import Link from 'next/link';

export default function MemberLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Invalid email or password.');
      setLoading(false);
    } else {
      router.push('/member');
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl border border-white/10 bg-white/5 mb-6">
            <Users size={24} className="text-red-600" />
          </div>
          <span className="block text-2xl font-heading font-black text-white tracking-widest">BN Leos</span>
          <p className="text-ink-muted text-[10px] font-black uppercase tracking-[0.4em] mt-2">Member Portal</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#050505] border border-white/10 rounded-[2rem] p-10 space-y-5">
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
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
            />
          </div>
          {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-xl font-black text-[11px] uppercase tracking-widest text-white transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(to bottom, #980016 0%, #3d0009 100%)' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div className="text-center pt-1">
            <Link href="/member/forgot-password"
              className="text-ink-muted text-[10px] font-black uppercase tracking-widest hover:text-ink-muted transition-colors">
              Forgot Password?
            </Link>
          </div>
        </form>

        <p className="text-center text-ink-muted text-[10px] font-black uppercase tracking-widest mt-8">
          No account? Contact your club admin.
        </p>
      </div>
    </div>
  );
}
