-- Exhibition edition: who downloaded which document, and the consent they gave.
--
-- RLS is enabled with no policies, so the browser (anon key) can neither read
-- nor write this table. Only the `expo-download` Edge Function, which uses the
-- service role, inserts rows.
create table if not exists public.expo_downloads (
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

alter table public.expo_downloads enable row level security;

create index if not exists expo_downloads_created_at_idx on public.expo_downloads (created_at desc);
create index if not exists expo_downloads_email_idx on public.expo_downloads (email);

-- Private bucket: files are only reachable through short-lived signed URLs.
insert into storage.buckets (id, name, public)
values ('expo-docs', 'expo-docs', false)
on conflict (id) do nothing;
