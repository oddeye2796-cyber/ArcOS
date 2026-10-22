-- Exhibition downloads: retention limit and automatic deletion.
--
-- Japan's APPI Art. 22 asks a business to keep personal data accurate and up to
-- date within what the purpose of use needs, and to delete it without delay
-- once it is no longer needed. The purpose here is following up on an
-- exhibition download, which has a natural end. This migration makes that
-- limit a setting and enforces it daily.
--
-- Same isolation as the table it protects: everything lives in the `expo`
-- schema, nothing is granted to anon/authenticated, and nothing outside `expo`
-- is touched except the pg_cron job that calls the purge.

-- One row of settings. The check keeps a typo from deleting everything
-- tomorrow (minimum 30 days) or keeping everything forever (maximum 3 years).
create table if not exists expo.retention_settings (
  singleton boolean primary key default true check (singleton),
  retention_days integer not null default 365
    check (retention_days between 30 and 1095),
  updated_at timestamptz not null default now()
);
comment on table expo.retention_settings is
  'Single row. Downloads older than retention_days are deleted by expo.purge_expired_downloads().';

insert into expo.retention_settings (singleton) values (true)
on conflict (singleton) do nothing;

alter table expo.retention_settings enable row level security;
revoke all on table expo.retention_settings from public, anon, authenticated;

-- What each run did. Counts only: no emails, so the log itself is not
-- personal data and can be kept as evidence that deletion happens.
create table if not exists expo.purge_log (
  id bigint generated always as identity primary key,
  ran_at timestamptz not null default now(),
  retention_days integer not null,
  deleted_count integer not null
);
alter table expo.purge_log enable row level security;
revoke all on table expo.purge_log from public, anon, authenticated;

-- Deletes every download older than the configured retention. Returns the
-- number of rows removed. Run by pg_cron; can also be called by hand from the
-- SQL editor.
create or replace function expo.purge_expired_downloads()
returns integer
language plpgsql
security definer
set search_path = pg_catalog, expo
as $$
declare
  days integer;
  removed integer;
begin
  select retention_days into days from expo.retention_settings where singleton;

  delete from expo.downloads
  where created_at < now() - make_interval(days => days);
  get diagnostics removed = row_count;

  insert into expo.purge_log (retention_days, deleted_count) values (days, removed);

  -- Keep the log itself bounded: two years of daily runs.
  delete from expo.purge_log where ran_at < now() - interval '2 years';

  return removed;
end;
$$;

revoke all on function expo.purge_expired_downloads() from public, anon, authenticated;

-- Daily at 03:00 JST (18:00 UTC the day before). pg_cron runs in UTC.
-- Skipped with a notice where the extension is unavailable (e.g. local
-- Postgres); the function above can then be called from any scheduler.
do $$
begin
  create extension if not exists pg_cron;
  perform cron.schedule(
    'expo-purge-expired-downloads',
    '0 18 * * *',
    'select expo.purge_expired_downloads()'
  );
exception when others then
  raise notice 'pg_cron not scheduled (%): call expo.purge_expired_downloads() from another scheduler', sqlerrm;
end;
$$;
