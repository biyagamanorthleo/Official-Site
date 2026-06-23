import type { Metadata } from 'next';
import { getBlogPostBySlug } from '@/lib/queries';
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import RichText from '@/components/RichText';

export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published');
  return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt ?? `${post.title} — Leo Club of Biyagama North`,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? '',
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  return (
    <div className="bg-black min-h-screen pt-28 md:pt-36 pb-16 md:pb-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[150px] -z-10 animate-pulse" />

      <div className="container mx-auto px-6 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors mb-10"
        >
          <ArrowLeft size={12} /> Back to Blog
        </Link>

        {post.cover_image && (
          <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-10 border border-white/5">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <div className="flex items-center gap-6 mb-8">
          <span className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest">
            <User size={12} />
            {post.author}
          </span>
          <span className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest">
            <Calendar size={12} />
            {formatDate(post.published_at)}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-tight leading-[0.9] mb-8">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-gray-400 text-lg leading-relaxed mb-10 border-l-2 border-red-800 pl-5">
            {post.excerpt}
          </p>
        )}

        <RichText text={post.content ?? ''} />

        <div className="mt-16 pt-10 border-t border-white/5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-red-600 text-[10px] font-black uppercase tracking-widest hover:text-red-400 transition-colors"
          >
            <ArrowLeft size={12} /> All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
