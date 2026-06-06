import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { UserPlus, Mail, Phone, Briefcase } from 'lucide-react';
import { ResendButton, DeleteMemberButton } from './MemberActions';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function MembersPage() {
  const supabase = await createClient();
  const { data: members } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">Members</h1>
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">{members?.length ?? 0} registered</p>
        </div>
        <Link href="/admin/members/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-widest"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          <UserPlus size={13} /> Add Member
        </Link>
      </div>

      {!members?.length ? (
        <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl">
          <p className="text-gray-600 text-xs font-black uppercase tracking-widest mb-6">No members yet</p>
          <Link href="/admin/members/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-widest"
            style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
            <UserPlus size={13} /> Add First Member
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {members.map(member => (
            <div key={member.id}
              className="flex items-center gap-5 bg-[#050505] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-950/20 border border-red-900/20 flex items-center justify-center flex-shrink-0">
                <span className="text-red-700 text-sm font-black">{member.name.charAt(0).toUpperCase()}</span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-black uppercase tracking-tight">{member.name}</p>
                <div className="flex items-center gap-4 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-gray-600 text-[10px] font-bold uppercase tracking-wider">
                    <Mail size={10} /> {member.email}
                  </span>
                  {member.position && (
                    <span className="flex items-center gap-1 text-gray-600 text-[10px] font-bold uppercase tracking-wider">
                      <Briefcase size={10} /> {member.position}
                    </span>
                  )}
                  {member.phone && (
                    <span className="flex items-center gap-1 text-gray-600 text-[10px] font-bold uppercase tracking-wider">
                      <Phone size={10} /> {member.phone}
                    </span>
                  )}
                </div>
              </div>

              <span className="text-gray-700 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
                {formatDate(member.created_at)}
              </span>

              <div className="flex items-center gap-2 flex-shrink-0">
                <ResendButton email={member.email} />
                <DeleteMemberButton id={member.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-5 bg-[#050505] border border-white/5 rounded-2xl">
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest mb-1">Member Portal</p>
        <p className="text-gray-500 text-xs">Members log in at <span className="text-white">/member/login</span>. Use &ldquo;Resend&rdquo; to send another setup email if they missed it.</p>
      </div>
    </div>
  );
}
