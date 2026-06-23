import { createClient } from '@/lib/supabase/server';
import { createPublicClient } from '@/lib/supabase/public';

export async function getProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getTeamMembers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('priority', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getAchievements() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getGalleryPhotos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('gallery_photos')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedGalleryPhotos() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('gallery_photos')
    .select('id, url, caption')
    .eq('featured_in_carousel', true)
    .order('sort_order', { ascending: true })
    .limit(7);
  if (error) throw error;
  return data ?? [];
}

export async function getPresidents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('presidents')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getBlogPosts() {
  // Cookieless client so the public blog can be statically generated / revalidated.
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getBlogPostBySlug(slug: string) {
  // Cookieless client so individual posts can be statically generated / revalidated.
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getAllBlogPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getPendingBlogPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getMemberBlogPosts(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('submitted_by', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getClubStats() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('club_stats')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}
