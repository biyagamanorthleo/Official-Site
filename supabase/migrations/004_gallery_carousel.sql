-- Add featured_in_carousel flag to gallery_photos
alter table gallery_photos
  add column if not exists featured_in_carousel boolean default false;
