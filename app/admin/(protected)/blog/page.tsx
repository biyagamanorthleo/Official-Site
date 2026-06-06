import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';
import ApprovalActions from './ApprovalActions';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function BlogApprovalsPage() {
  const supabase = await createClient();

  const { data: pending } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  const { data: recent } = await supabase
    .from('blog_posts')
    .select('id, title, author, status, published_at, rejection_note')
    .in('status', ['published', 'rejected'])
    .order('created_at', { ascending: false })
    .limit(10);

  const statusStyle: Record<string, string> = {
    published: 'bg-green-950/40 text-green-500 border-green-900/30',
    rejected:  'bg-red-950/20 text-red-600 border-red-900/20',
    pending:   'bg-amber-950/20 text-amber-500 border-amber-800/30',
    draft:     'bg-white/5 text-gray-500 border-white/5',
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">Blog Approvals</h1>
        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">Review member-submitted posts</p>
      </div>

      {/* Pending queue */}
      <section className="mb-14">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-4">
          Awaiting Review — {pending?.length ?? 0}
        </h2>

        {!pending?.length ? (
          <div className="py-12 text-center border border-dashed border-white/5 rounded-2xl">
            <p className="text-gray-600 text-xs font-black uppercase tracking-widest">All clear — no pending posts</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map(post => (
              <div key={post.id} className="bg-[#050505] border border-amber-900/20 rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-black uppercase tracking-tight text-base mb-2">{post.title}</h3>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="flex items-center gap-1 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                        <User size={10} /> {post.author}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                        <Calendar size={10} /> {formatDate(post.published_at)}
                      </span>
                    </div>
                    {post.excerpt && (
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                    )}
                    {post.content && (
                      <p className="text-gray-600 text-xs leading-relaxed mt-2 line-clamp-3">{post.content}</p>
                    )}
                  </div>
                  {post.cover_image && (
                    <img src={post.cover_image} alt="" className="w-24 h-16 rounded-xl object-cover flex-shrink-0 grayscale" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                  <Link href={`/blog/admin/posts/${post.id}`} target="_blank"
                    className="text-gray-600 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
                    Preview in editor →
                  </Link>
                  <ApprovalActions id={post.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recently reviewed */}
      {!!recent?.length && (
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4">Recently Reviewed</h2>
          <div className="space-y-2">
            {recent.map(post => (
              <div key={post.id} className="flex items-center gap-4 bg-[#050505] border border-white/5 rounded-xl px-5 py-4">
                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${statusStyle[post.status]}`}>
                  {post.status}
                </span>
                <span className="text-white text-sm font-bold flex-1 truncate">{post.title}</span>
                <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{post.author}</span>
                {post.rejection_note && (
                  <span className="text-red-800 text-[10px] truncate max-w-[180px]" title={post.rejection_note}>
                    Note: {post.rejection_note}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
