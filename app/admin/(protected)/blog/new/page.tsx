import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CLUB_NAME } from '@/constants';
import BlogPostForm from '@/app/blog/admin/(protected)/posts/BlogPostForm';

export default function AdminWritePostPage() {
  return (
    <div className="max-w-2xl">
      <Link href="/admin/blog"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-white text-[10px] font-black uppercase tracking-widest mb-6 transition-colors">
        <ArrowLeft size={12} /> Back to Blog
      </Link>
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">Write Post</h1>
        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-1">
          Publish on behalf of {CLUB_NAME}
        </p>
      </div>
      <BlogPostForm
        defaults={{ author: CLUB_NAME, status: 'published' }}
        redirectTo="/admin/blog"
      />
    </div>
  );
}
