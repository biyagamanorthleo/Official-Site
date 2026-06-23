-- Allow "Multiple District Award" as an achievement category.
-- Run this in: Supabase Dashboard > SQL Editor > New Query

alter table achievements
  drop constraint if exists achievements_category_check;

alter table achievements
  add constraint achievements_category_check
  check (category in ('District Award', 'Multiple District Award', 'Regional Recognition', 'Club Milestone'));
