import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import TeamForm from '../TeamForm';

export default async function EditMember({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('team_members').select('*').eq('id', id).single();
  if (!data) notFound();
  return (
    <div>
      <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight mb-10">Edit Member</h1>
      <TeamForm member={data} />
    </div>
  );
}
