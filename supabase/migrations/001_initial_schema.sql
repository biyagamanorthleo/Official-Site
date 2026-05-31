-- ============================================================
-- Migration 001 — Initial Schema
-- Creates all tables + Row Level Security policies
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

-- RLS
alter table projects enable row level security;
alter table team_members enable row level security;
alter table achievements enable row level security;
alter table gallery_photos enable row level security;
alter table presidents enable row level security;
alter table club_stats enable row level security;

create policy "Public read projects"     on projects      for select using (true);
create policy "Public read team"         on team_members  for select using (true);
create policy "Public read achievements" on achievements  for select using (true);
create policy "Public read gallery"      on gallery_photos for select using (true);
create policy "Public read presidents"   on presidents    for select using (true);
create policy "Public read stats"        on club_stats    for select using (true);

create policy "Auth write projects"      on projects      for all using (auth.role() = 'authenticated');
create policy "Auth write team"          on team_members  for all using (auth.role() = 'authenticated');
create policy "Auth write achievements"  on achievements  for all using (auth.role() = 'authenticated');
create policy "Auth write gallery"       on gallery_photos for all using (auth.role() = 'authenticated');
create policy "Auth write presidents"    on presidents    for all using (auth.role() = 'authenticated');
create policy "Auth write stats"         on club_stats    for all using (auth.role() = 'authenticated');
