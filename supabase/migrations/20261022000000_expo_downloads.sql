-- Exhibition edition: who downloaded which document, and the consent they gave.
--
-- Built to share a database with an unrelated app without touching it:
--   * its own schema, `expo`, which is not exposed through the REST API;
--   * every privilege revoked from anon/authenticated, and RLS on with no
--     policies, so nothing but the Edge Function can read or write it;
--   * its own private PDF-only bucket. Other buckets' storage policies are
--     scoped by bucket_id and do not apply here.
-- Removing it later is `drop schema expo cascade` plus deleting the bucket.
create schema if not exists expo;
comment on schema expo is 'ArcOS exhibition downloads. Written only by the expo-download Edge Function.';

revoke all on schema expo from public, anon, authenticated;

create table if not exists expo.downloads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  product_id text not null,
  kind text not null check (kind in ('brochure', 'manual')),
  lang text not null check (lang in ('ja', 'en', 'ko')),
  file_path text not null,
  consent boolean not null check (consent),
  consent_version text not null,
  created_at timestamptz not null default now()
);

alter table expo.downloads enable row level security;
revoke all on table expo.downloads from public, anon, authenticated;

create index if not exists downloads_created_at_idx on expo.downloads (created_at desc);
create index if not exists downloads_email_idx on expo.downloads (email);

-- Private, PDF only, 50 MB per file. Reachable only through signed URLs.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('expo-docs', 'expo-docs', false, 52428800, array['application/pdf'])
on conflict (id) do nothing;
