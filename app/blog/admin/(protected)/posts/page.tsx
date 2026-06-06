import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { PenSquare, Calendar, User } from 'lucide-react';
import DeletePostButton from './DeletePostButton';

const statusStyle: Record<string, string> = {
  published: 'bg-green-950/40 text-green-500 border-green-900/30',
  pending:   'bg-amber-950/20 text-amber-500 border-amber-800/30',
  rejected:  'bg-red-950/20 text-red-600 border-red-900/20',
  draft:     'bg-white/5 text-gray-500 border-white/5',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default async function BlogPostsAdminPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, author, published_at, status, cover_image')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">Posts</h1>
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">{posts?.length ?? 0} total</p>
        </div>
        <Link href="/blog/admin/posts/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-widest"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          <PenSquare size={13} /> New Post
        </Link>
      </div>

      {!posts?.length ? (
        <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl">
          <p className="text-gray-600 text-xs font-black uppercase tracking-widest">No posts yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id}
              className="flex items-center gap-5 bg-[#050505] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
              {post.cover_image ? (
                <img src={post.cover_image} alt="" className="w-16 h-12 rounded-xl object-cover flex-shrink-0 grayscale" />
              ) : (
                <div className="w-16 h-12 rounded-xl bg-red-950/20 flex-shrink-0 flex items-center justify-center">
                  <span className="text-red-900/40 text-[8px] font-black tracking-widest">IMG</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm font-black uppercase tracking-tight truncate">{post.title}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1 text-gray-600 text-[10px] font-bold uppercase tracking-wider">
                    <User size={10} /> {post.author}
                  </span>
                  <span className="flex items-center gap-1 text-gray-600 text-[10px] font-bold uppercase tracking-wider">
                    <Calendar size={10} /> {formatDate(post.published_at)}
                  </span>
                </div>
              </div>

              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${statusStyle[post.status] ?? statusStyle.draft}`}>
                {post.status}
              </span>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/blog/${post.slug}`} target="_blank"
                  className="px-4 py-2 rounded-xl text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-white border border-white/5 hover:border-white/15 transition-all">
                  View
                </Link>
                <Link href={`/blog/admin/posts/${post.id}`}
                  className="px-4 py-2 rounded-xl text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-white border border-white/5 hover:border-white/15 transition-all">
                  Edit
                </Link>
                <DeletePostButton id={post.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
