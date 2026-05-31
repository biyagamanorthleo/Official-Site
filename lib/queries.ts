import { createClient } from '@/lib/supabase/server';

export async function getProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
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

export async function getPresidents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('presidents')
    .select('*')
    .order('sort_order', { ascending: true });
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
