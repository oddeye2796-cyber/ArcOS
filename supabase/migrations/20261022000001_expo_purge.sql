-- Retention: the privacy policy promises deletion after one year.
-- Run `select expo.purge_expired();` (e.g. monthly) or schedule it with pg_cron
-- where that extension is enabled. Returns the number of rows deleted.
create or replace function expo.purge_expired(retention interval default interval '1 year')
returns bigint
language plpgsql
as $$
declare
  deleted bigint;
begin
  delete from expo.downloads where created_at < now() - retention;
  get diagnostics deleted = row_count;
  return deleted;
end;
$$;

revoke all on function expo.purge_expired(interval) from public, anon, authenticated;
