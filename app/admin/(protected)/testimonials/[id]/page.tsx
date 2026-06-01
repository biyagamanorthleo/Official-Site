import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import TestimonialForm from '../TestimonialForm';

export default async function EditTestimonial({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: testimonial } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single();
  if (!testimonial) notFound();
  return (
    <div>
      <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight mb-10">
        Edit Testimonial
      </h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
