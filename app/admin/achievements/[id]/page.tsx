import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AchievementForm from '../AchievementForm';

export default async function EditAchievement({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('achievements').select('*').eq('id', id).single();
  if (!data) notFound();
  return <div><h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight mb-10">Edit Achievement</h1><AchievementForm achievement={data} /></div>;
}
