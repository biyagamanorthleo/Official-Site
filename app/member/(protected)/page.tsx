import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { PenSquare, Calendar } from 'lucide-react';

const statusStyle: Record<string, { label: string; cls: string }> = {
  draft:     { label: 'Draft',            cls: 'bg-white/5 text-ink-muted border-white/5' },
  pending:   { label: 'Awaiting Approval', cls: 'bg-amber-950/20 text-amber-500 border-amber-800/30' },
  published: { label: 'Published',         cls: 'bg-green-950/40 text-green-500 border-green-900/30' },
  rejected:  { label: 'Rejected',          cls: 'bg-red-950/20 text-red-600 border-red-900/20' },
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function MemberDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, status, published_at, rejection_note, slug')
    .eq('submitted_by', user!.id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">My Posts</h1>
          <p className="text-ink-muted text-xs font-bold uppercase tracking-widest mt-1">{posts?.length ?? 0} total</p>
        </div>
        <Link href="/member/blog/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-widest"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          <PenSquare size={13} /> Write a Post
        </Link>
      </div>

      {!posts?.length ? (
        <div className="py-24 text-center border border-dashed border-white/5 rounded-3xl">
          <p className="text-ink-muted text-xs font-black uppercase tracking-widest mb-6">No posts yet</p>
          <Link href="/member/blog/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[10px] font-black uppercase tracking-widest"
            style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
            <PenSquare size={13} /> Write your first post
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => {
            const s = statusStyle[post.status] ?? statusStyle.draft;
            return (
              <div key={post.id} className="bg-[#050505] border border-white/5 rounded-2xl px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-black uppercase tracking-tight text-sm truncate mb-2">{post.title}</h3>
                    <span className="flex items-center gap-1.5 text-ink-muted text-[10px] font-bold uppercase tracking-widest">
                      <Calendar size={10} /> {formatDate(post.published_at)}
                    </span>
                    {post.status === 'rejected' && post.rejection_note && (
                      <p className="mt-2 text-red-700 text-xs border-l-2 border-red-900 pl-3">
                        {post.rejection_note}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full border ${s.cls}`}>
                      {s.label}
                    </span>
                    {post.status === 'published' && (
                      <Link href={`/blog/${post.slug}`} target="_blank"
                        className="text-ink-muted text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
                        View →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-10 p-5 bg-[#050505] border border-white/5 rounded-2xl">
        <p className="text-ink-muted text-[10px] font-black uppercase tracking-widest mb-2">How it works</p>
        <p className="text-ink-muted text-xs leading-relaxed">Write a post and submit for review. The admin will approve it and it goes live on the blog. If rejected, you&apos;ll see a note here.</p>
      </div>
    </div>
  );
}
