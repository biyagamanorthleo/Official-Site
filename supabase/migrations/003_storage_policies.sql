-- ============================================================
-- Migration 003 — Storage Bucket + Policies
-- ============================================================

-- Create the images bucket (public)
insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

create policy "Public read images"
on storage.objects for select
using (bucket_id = 'images');

create policy "Auth upload images"
on storage.objects for insert
with check (bucket_id = 'images' and auth.role() = 'authenticated');

create policy "Auth update images"
on storage.objects for update
using (bucket_id = 'images' and auth.role() = 'authenticated');

create policy "Auth delete images"
on storage.objects for delete
using (bucket_id = 'images' and auth.role() = 'authenticated');
