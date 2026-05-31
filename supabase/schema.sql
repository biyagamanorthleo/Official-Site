-- ============================================================
-- LCBN Website — Supabase Database Schema
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- Projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  long_description text,
  status text not null check (status in ('Completed', 'Ongoing', 'Coming Soon')),
  image text,
  date text,
  impact text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Team Members
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  photo text,
  category text not null check (category in ('Advisory Panel', 'Executive Committee', 'Director')),
  avenue text,
  priority int default 99,
  instagram text,
  linkedin text,
  facebook text,
  twitter text,
  created_at timestamptz default now()
);

-- Achievements
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  year text,
  category text check (category in ('District Award', 'Regional Recognition', 'Club Milestone')),
  image text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Gallery Photos
create table if not exists gallery_photos (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  caption text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Presidents (Hall of Honor)
create table if not exists presidents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  year text not null,
  photo text,
  description text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Club Stats
create table if not exists club_stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value int not null,
  suffix text,
  icon text,
  sort_order int default 0
);

-- ============================================================
-- Row Level Security — public read, auth write
-- ============================================================

alter table projects enable row level security;
alter table team_members enable row level security;
alter table achievements enable row level security;
alter table gallery_photos enable row level security;
alter table presidents enable row level security;
alter table club_stats enable row level security;

-- Public can read everything
create policy "Public read projects" on projects for select using (true);
create policy "Public read team" on team_members for select using (true);
create policy "Public read achievements" on achievements for select using (true);
create policy "Public read gallery" on gallery_photos for select using (true);
create policy "Public read presidents" on presidents for select using (true);
create policy "Public read stats" on club_stats for select using (true);

-- Only authenticated users (admins) can write
create policy "Auth write projects" on projects for all using (auth.role() = 'authenticated');
create policy "Auth write team" on team_members for all using (auth.role() = 'authenticated');
create policy "Auth write achievements" on achievements for all using (auth.role() = 'authenticated');
create policy "Auth write gallery" on gallery_photos for all using (auth.role() = 'authenticated');
create policy "Auth write presidents" on presidents for all using (auth.role() = 'authenticated');
create policy "Auth write stats" on club_stats for all using (auth.role() = 'authenticated');

-- ============================================================
-- Seed Data (matches current constants.tsx)
-- ============================================================

insert into projects (title, description, long_description, status, image, date, impact, sort_order) values
  ('Vision For All 2024', 'Free eye screening and cataract surgery for 200+ seniors.', 'Our flagship project focused on providing essential eye care to underserved elderly citizens. We partnered with local hospitals to perform 15 successful cataract surgeries and distributed over 150 prescription glasses.', 'Completed', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', 'March 2024', '215 seniors screened', 1),
  ('Green Earth Initiative', 'Reforestation drive and waste management workshops.', 'A continuous effort to combat climate change. We have planted over 500 indigenous trees across urban parks and schools, while educating children on waste segregation.', 'Ongoing', 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800', 'Launched Jan 2024', '500+ trees planted', 2),
  ('Youth Leadership Summit', 'A 3-day workshop for aspiring young leaders.', 'An upcoming mega-event featuring international speakers and workshops on public speaking, project management, and ethical leadership.', 'Coming Soon', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800', 'August 2024', null, 3),
  ('Winter Warmth', 'Distributing blankets and warm clothing to the homeless.', 'During the harsh winter months, our leos spent nights on the streets distributing 300+ heavy blankets and hot meals.', 'Completed', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800', 'Dec 2023', '300 blankets distributed', 4);

insert into team_members (name, position, photo, category, avenue, priority, linkedin) values
  ('Lion Dr. Upul Ranasinghe', 'Guiding Lion', 'https://i.pravatar.cc/400?u=upul', 'Advisory Panel', null, 1, '#'),
  ('Lion Sunil Perera', 'Club Advisor', 'https://i.pravatar.cc/400?u=sunil', 'Advisory Panel', null, 2, '#');

insert into team_members (name, position, photo, category, priority, instagram, linkedin) values
  ('Kasun Perera', 'President', 'https://i.pravatar.cc/400?u=kasun', 'Executive Committee', 1, '#', '#'),
  ('Nethmi Wijesinghe', 'Vice President', 'https://i.pravatar.cc/400?u=nethmi', 'Executive Committee', 2, '#', null);

insert into team_members (name, position, photo, category, avenue, priority, instagram, linkedin) values
  ('Amila Rathnayake', 'Director', 'https://i.pravatar.cc/400?u=amila', 'Director', 'Information Technology', 1, '#', '#'),
  ('Imesha Silva', 'Director', 'https://i.pravatar.cc/400?u=imesha', 'Director', 'Community Service', 1, null, null),
  ('Thisara Perera', 'Director', 'https://i.pravatar.cc/400?u=thisara', 'Director', 'Professional Development', 1, null, '#'),
  ('Nuwan Perera', 'Director', 'https://i.pravatar.cc/400?u=nuwanp', 'Director', 'Environmental Service', 1, '#', null);

insert into achievements (title, description, year, category, image, sort_order) values
  ('Most Outstanding Leo Club', 'Awarded for overall excellence in service and administration.', '2023/24', 'District Award', 'https://images.unsplash.com/photo-1578574515323-c3c8ef01456e?auto=format&fit=crop&q=80&w=800', 1),
  ('Top Environmental Impact Award', 'Recognition for outstanding contributions to ecological conservation.', '2022/23', 'Regional Recognition', 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800', 2),
  ('Leadership Excellence Gold', 'Awarded to the leadership team for strategic club management.', '2023/24', 'District Award', 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800', 3),
  ('Service Growth Milestone', 'Celebrating significant increase in community impact and service hours.', '2023', 'Club Milestone', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800', 4),
  ('Best Youth Project Finalist', 'Finalist for the most innovative youth-led community initiative.', '2024', 'Regional Recognition', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800', 5);

insert into gallery_photos (url, sort_order) values
  ('https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800', 1),
  ('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', 2),
  ('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800', 3),
  ('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800', 4),
  ('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', 5),
  ('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800', 6),
  ('https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800', 7),
  ('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800', 8),
  ('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', 9),
  ('https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=800', 10),
  ('https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800', 11);

insert into presidents (name, year, photo, description, sort_order) values
  ('Kasun Perera', '2023-2024', 'https://i.pravatar.cc/300?u=kasun', 'Instrumental in advancing the club''s regional presence and scaling service output through strategic leadership and community mobilization.', 1),
  ('Hasitha Perera', '2022-2023', 'https://i.pravatar.cc/300?u=hasitha', 'Focused on member engagement and district-wide collaborations, significantly expanding our project reach.', 2),
  ('Binura Fonseka', '2021-2022', 'https://i.pravatar.cc/300?u=binura', 'Lead the club through digital transformation, establishing our online presence and virtual service initiatives.', 3),
  ('Nuwan Gamage', '2020-2021', 'https://i.pravatar.cc/300?u=nuwan', 'Laid the groundwork for our flagship community projects and strengthened our local partnerships.', 4);

insert into club_stats (label, value, suffix, icon, sort_order) values
  ('Completed Projects', 52, '+', 'CheckCircle', 1),
  ('Lives Impacted', 15000, '+', 'Users', 2),
  ('Service Hours', 4500, ' hrs', 'Clock', 3),
  ('Service Budget', 8000, ' USD', 'DollarSign', 4);
