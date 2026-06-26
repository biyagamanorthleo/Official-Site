import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import BlogPostForm from '../BlogPostForm';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from('blog_posts').select('*').eq('id', id).single();
  if (!post) notFound();

  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">Edit Post</h1>
        <p className="text-ink-muted text-xs font-bold uppercase tracking-widest mt-1 truncate">{post.title}</p>
      </div>
      <BlogPostForm post={post} />
    </div>
  );
}
