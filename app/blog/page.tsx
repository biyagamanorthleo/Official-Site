import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/queries';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'News, stories and updates from Leo Club of Biyagama North (LCBN) — BN Leos. District 306 D4, Sri Lanka.',
};

export const revalidate = 3600;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="bg-black min-h-screen pt-28 md:pt-40 pb-16 md:pb-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-900/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-6">
        <header className="mb-16 md:mb-24 text-center max-w-4xl mx-auto">
          <span className="text-red-500/80 font-black uppercase tracking-[0.5em] text-[10px] block mb-8">
            BN Leos
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-8 tracking-tighter uppercase leading-[0.85]">
            Latest <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-600 via-red-800 to-red-950">
              Updates
            </span>
          </h1>
          <p className="text-ink-muted text-base font-medium leading-relaxed uppercase tracking-wider max-w-xl mx-auto">
            Stories, news & highlights from Leo Club of Biyagama North
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-ink-muted text-sm font-black uppercase tracking-widest">No posts yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-[#050505] border border-white/5 rounded-3xl overflow-hidden hover:border-red-900/40 transition-all duration-300 hover:-translate-y-1"
              >
                {post.cover_image ? (
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                ) : (
                  <div className="h-52 bg-gradient-to-br from-red-950/20 to-black flex items-center justify-center">
                    <span className="text-red-900/40 font-heading font-black text-4xl tracking-widest">LCBN</span>
                  </div>
                )}

                <div className="p-7">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center gap-1.5 text-ink-muted text-[10px] font-black uppercase tracking-widest">
                      <User size={11} />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1.5 text-ink-muted text-[10px] font-black uppercase tracking-widest">
                      <Calendar size={11} />
                      {formatDate(post.published_at)}
                    </span>
                  </div>

                  <h2 className="text-white font-heading font-black text-lg uppercase tracking-tight leading-tight mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="text-ink-muted text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-5 pt-5 border-t border-white/5">
                    <span className="text-red-600 text-[10px] font-black uppercase tracking-widest group-hover:text-red-400 transition-colors">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
