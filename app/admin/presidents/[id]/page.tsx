import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import PresidentForm from '../PresidentForm';

export default async function EditPresident({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('presidents').select('*').eq('id', id).single();
  if (!data) notFound();
  return <div><h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight mb-10">Edit President</h1><PresidentForm president={data} /></div>;
}
