'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import ImageUpload from '@/app/admin/(protected)/_components/ImageUpload';
import MarkdownEditor from '@/app/admin/(protected)/_components/MarkdownEditor';

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function MemberPostForm({ userId }: { userId: string }) {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    title: '', slug: '', author: '', cover_image: '',
    published_at: today, excerpt: '', content: '',
  });
  const [slugEdited, setSlugEdited] = useState(false);
  const [saving, setSaving] = useState(false);

  function set(field: string, value: string) {
    setForm(f => {
      const updated = { ...f, [field]: value };
      if (field === 'title' && !slugEdited) {
        updated.slug = toSlug(value);
      }
      return updated;
    });
  }

  async function handleSave(status: 'draft' | 'pending') {
    if (!form.title.trim() || !form.author.trim()) {
      alert('Title and author are required.');
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from('blog_posts').insert({
      ...form,
      status,
      submitted_by: userId,
    });
    if (error) { alert(error.message); setSaving(false); return; }
    window.location.href = '/member';
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted block mb-2">Title</label>
        <input
          value={form.title}
          onChange={e => set('title', e.target.value)}
          placeholder="Post title..."
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
        />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted block mb-2">Slug</label>
        <div className="flex items-center bg-black border border-white/10 rounded-xl overflow-hidden focus-within:border-red-700 transition-colors">
          <span className="text-ink-muted text-xs px-4 border-r border-white/10 py-4 select-none">/blog/</span>
          <input
            value={form.slug}
            onChange={e => { setSlugEdited(true); set('slug', e.target.value); }}
            className="flex-1 bg-transparent px-4 py-4 text-white text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted block mb-2">Your Name</label>
          <input
            value={form.author}
            onChange={e => set('author', e.target.value)}
            placeholder="Display name"
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted block mb-2">Date</label>
          <input
            type="date"
            value={form.published_at}
            onChange={e => set('published_at', e.target.value)}
            className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted block mb-3">Cover Image</label>
        <ImageUpload value={form.cover_image} onChange={url => set('cover_image', url)} folder="blog" />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted block mb-2">Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={e => set('excerpt', e.target.value)}
          rows={2}
          placeholder="Short summary shown on the blog listing..."
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:outline-none focus:border-red-700 transition-colors resize-none"
        />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-ink-muted block mb-2">Content</label>
        <p className="text-ink-muted text-[10px] mb-3">Use the toolbar to format. Separate paragraphs with a blank line.</p>
        <MarkdownEditor
          value={form.content}
          onChange={v => set('content', v)}
          rows={14}
          placeholder="Write your post here..."
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSave('pending')}
          className="px-8 py-4 rounded-xl text-white text-xs font-black uppercase tracking-widest disabled:opacity-50"
          style={{ background: 'linear-gradient(to bottom, #980016, #3d0009)' }}
        >
          {saving ? 'Submitting...' : 'Submit for Review'}
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSave('draft')}
          className="px-8 py-4 rounded-xl text-ink-muted text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all disabled:opacity-50"
        >
          Save Draft
        </button>
      </div>
    </div>
  );
}
