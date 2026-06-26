import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import BlogPostForm from '@/app/blog/admin/(protected)/posts/BlogPostForm';

export default async function AdminEditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from('blog_posts').select('*').eq('id', id).single();
  if (!post) notFound();

  return (
    <div className="max-w-2xl">
      <Link href="/admin/blog"
        className="inline-flex items-center gap-2 text-ink-muted hover:text-white text-[10px] font-black uppercase tracking-widest mb-6 transition-colors">
        <ArrowLeft size={12} /> Back to Blog
      </Link>
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">Edit Post</h1>
        <p className="text-ink-muted text-xs font-bold uppercase tracking-widest mt-1 truncate">{post.title}</p>
      </div>
      <BlogPostForm post={post} redirectTo="/admin/blog" />
    </div>
  );
}
