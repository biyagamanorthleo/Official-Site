'use client';

import { useState, useTransition } from 'react';
import { createMember } from './actions';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

const EMPTY = { name: '', email: '', mylci_number: '', position: '', phone: '' };

export default function MemberForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(EMPTY);

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    startTransition(async () => {
      try {
        await createMember(form);
        setDone(true);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      }
    });
  }

  if (done) {
    return (
      <div className="max-w-md bg-[#050505] border border-white/10 rounded-3xl p-10 text-center space-y-4">
        <CheckCircle size={36} className="text-green-500 mx-auto" />
        <p className="text-white font-black uppercase tracking-widest text-sm">Member Added</p>
        <p className="text-gray-500 text-xs leading-relaxed">
          A password setup email has been sent to <span className="text-white">{form.email}</span>.
          They'll click the link to set their password, then log in at{' '}
          <span className="text-white">/member/login</span>.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <button onClick={() => { setDone(false); setForm(EMPTY); }}
            className="px-5 py-3 rounded-xl text-gray-400 text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all">
            Add Another
          </button>
          <button onClick={() => router.push('/admin/members')}
            className="px-5 py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-widest"
            style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
            Back to Members
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-lg">

      {/* Identity */}
      <div className="space-y-5">
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30">Identity</p>
        {[
          { label: 'Full Name',     field: 'name',         type: 'text',  required: true,  placeholder: 'e.g. Kasun Perera' },
          { label: 'Email Address', field: 'email',        type: 'email', required: true,  placeholder: 'member@example.com' },
          { label: 'MYLCI Number',  field: 'mylci_number', type: 'text',  required: false, placeholder: 'e.g. LK-123456' },
        ].map(({ label, field, type, required, placeholder }) => (
          <div key={field}>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">{label}</label>
            <input
              type={type}
              value={form[field as keyof typeof form]}
              onChange={e => set(field, e.target.value)}
              required={required}
              placeholder={placeholder}
              className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors placeholder:text-gray-700"
            />
          </div>
        ))}
      </div>

      {/* Club Info */}
      <div className="space-y-5">
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30">Club Info</p>
        {[
          { label: 'Position / Role',  field: 'position', type: 'text', required: false, placeholder: 'e.g. IT Director' },
          { label: 'Phone (optional)', field: 'phone',    type: 'text', required: false, placeholder: '+94 77 000 0000' },
        ].map(({ label, field, type, required, placeholder }) => (
          <div key={field}>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">{label}</label>
            <input
              type={type}
              value={form[field as keyof typeof form]}
              onChange={e => set(field, e.target.value)}
              required={required}
              placeholder={placeholder}
              className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors placeholder:text-gray-700"
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

      <div className="bg-black border border-white/5 rounded-xl p-4">
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-1">What happens next</p>
        <p className="text-gray-500 text-xs leading-relaxed">
          The account is created and a password setup email is sent automatically. The member clicks the link to set their own password.
        </p>
      </div>

      <div className="flex gap-4 pt-2">
        <button type="submit" disabled={isPending}
          className="px-8 py-4 rounded-xl text-white text-xs font-black uppercase tracking-widest disabled:opacity-50"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          {isPending ? 'Creating...' : 'Create Member & Send Email'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-8 py-4 rounded-xl text-gray-400 text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all">
          Cancel
        </button>
      </div>
    </form>
  );
}
