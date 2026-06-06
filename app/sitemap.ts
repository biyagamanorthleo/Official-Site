import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://lcbn.org';
  const now = new Date();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('blog_posts')
    .select('slug, published_at')
    .eq('status', 'published');
  const blogPosts = data ?? [];

  return [
    { url: base,                      lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/projects`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/team`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/achievements`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/gallery`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/blog`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/starter-pack`,    lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
    ...blogPosts.map(post => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
