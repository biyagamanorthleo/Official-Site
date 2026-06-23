'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/app/admin/(protected)/_components/ImageUpload';

type BlogPost = {
  id?: string;
  title: string;
  slug: string;
  author: string;
  cover_image: string;
  published_at: string;
  excerpt: string;
  content: string;
  status: string;
  sort_order: number;
};

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

type Props = {
  post?: BlogPost;
  /** Initial values for a new post (e.g. author/status when posting on behalf of the club). */
  defaults?: Partial<BlogPost>;
  /** Where to go after a successful save. */
  redirectTo?: string;
};

export default function BlogPostForm({ post, defaults, redirectTo = '/blog/admin/posts' }: Props) {
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<BlogPost>(post ?? {
    title: '', slug: '', author: '', cover_image: '',
    published_at: today, excerpt: '', content: '',
    status: 'draft', sort_order: 0,
    ...defaults,
  });
  const [saving, setSaving] = useState(false);
  const [slugEdited, setSlugEdited] = useState(!!post?.slug);

  function set(field: keyof BlogPost, value: string | number | boolean) {
    setForm(f => {
      const updated = { ...f, [field]: value };
      if (field === 'title' && !slugEdited) {
        updated.slug = toSlug(value as string);
      }
      return updated;
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();

    if (form.id) {
      const { id, ...data } = form;
      const { error } = await supabase.from('blog_posts').update(data).eq('id', id);
      if (error) { alert(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from('blog_posts').insert(form);
      if (error) { alert(error.message); setSaving(false); return; }
    }
    window.location.href = redirectTo;
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Title</label>
        <input
          value={form.title}
          onChange={e => set('title', e.target.value)}
          required
          placeholder="Post title..."
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
        />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Slug</label>
        <div className="flex items-center bg-black border border-white/10 rounded-xl overflow-hidden focus-within:border-red-700 transition-colors">
          <span className="text-gray-700 text-xs px-4 border-r border-white/10 py-4 select-none">/blog/</span>
          <input
            value={form.slug}
            onChange={e => { setSlugEdited(true); set('slug', e.target.value); }}
            required
            className="flex-1 bg-transparent px-4 py-4 text-white text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Author</label>
          <input
            value={form.author}
            onChange={e => set('author', e.target.value)}
            required
            placeholder="Full name"
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Date</label>
          <input
            type="date"
            value={form.published_at}
            onChange={e => set('published_at', e.target.value)}
            required
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-3">Cover Image</label>
        <ImageUpload value={form.cover_image} onChange={url => set('cover_image', url)} folder="blog" />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={e => set('excerpt', e.target.value)}
          rows={2}
          placeholder="Short description shown on the blog listing..."
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors resize-none"
        />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Content</label>
        <p className="text-gray-700 text-[10px] mb-3">Separate paragraphs with a blank line.</p>
        <textarea
          value={form.content}
          onChange={e => set('content', e.target.value)}
          rows={14}
          placeholder="Write the full post here..."
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors resize-none font-mono"
        />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-2">Status</label>
        <select value={form.status} onChange={e => set('status', e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors">
          <option value="draft">Draft</option>
          <option value="pending">Pending Review</option>
          <option value="published">Published</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={saving}
          className="px-8 py-4 rounded-xl text-white text-xs font-black uppercase tracking-widest disabled:opacity-50"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}>
          {saving ? 'Saving...' : form.id ? 'Update Post' : 'Create Post'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-8 py-4 rounded-xl text-gray-400 text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all">
          Cancel
        </button>
      </div>
    </form>
  );
}
