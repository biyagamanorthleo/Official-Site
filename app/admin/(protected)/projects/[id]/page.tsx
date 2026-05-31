import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ProjectForm from '../ProjectForm';

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase.from('projects').select('*').eq('id', id).single();
  if (!project) notFound();
  return (
    <div>
      <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight mb-10">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
