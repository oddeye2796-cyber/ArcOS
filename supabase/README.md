# Exhibition downloads

`expo.html` offers a product brochure and a manual for each product, behind an
email + consent form. Three pieces make that work:

| Piece | Where |
|---|---|
| Schema `expo` (table `expo.downloads`) and the private bucket `expo-docs` | `migrations/20261022000000_expo_downloads.sql` |
| Edge Function `expo-download` (validates, records, returns a 5-minute signed URL) | `functions/expo-download/index.ts` |
| The form | `src/expo/DownloadModal.tsx`, `src/expo/downloadRequest.ts` |

## Putting the PDFs in place

Upload to the `expo-docs` bucket as `<productId>/<kind>_<lang>.pdf`:

- `productId`: `smartfactory`, `a2lab`, `orch`, `consensebot`, `aesg`, `twin`, `arcforge`, `b2lab`
- `kind`: `brochure` or `manual`
- `lang`: `ja`, `en` or `ko`

Smart Factory's modules have their own files, one folder per module:
`smartfactory/<moduleId>/<kind>_<lang>.pdf` with `moduleId` one of `mes-pharma`,
`mes-food`, `mes-general`, `ebrs`, `rems`, `scm`. The suite as a whole stays at
`smartfactory/<kind>_<lang>.pdf`.

For example `smartfactory/brochure_ja.pdf` or `smartfactory/ebrs/manual_ja.pdf`. If the visitor's language is missing
the function falls back to `ja`, then `en`, then `ko`. A product with no file at
all answers "not available yet" and records nothing.

## Configuration

Set `VITE_EXPO_SUPABASE_URL` and `VITE_EXPO_SUPABASE_ANON_KEY` (see
`.env.example`) in the Vercel project, then redeploy. Without them the download
buttons open the form but report that downloads are not available yet.

## Reading the records

In the SQL editor: `select * from expo.downloads order by created_at desc;`

The table is in its own schema, not exposed through the REST API, with every
privilege revoked from `anon` and `authenticated` and RLS on without policies,
so it cannot be reached from a browser. Columns: email, product, kind, language,
consent flag and the consent wording version (`CONSENT_VERSION` in
`downloadRequest.ts`).

## Retention and automatic deletion

Records are deleted automatically once they are older than the retention
period (default 180 days), by `expo.purge_expired_downloads()`, which pg_cron
runs daily at 03:00 JST (`migrations/20261022010000_expo_downloads_retention.sql`).

Change the period (30 to 1095 days; applies to existing records too):

```sql
update expo.retention_settings set retention_days = 365, updated_at = now();
```

Each run writes a row to `expo.purge_log` (time, period, count; no emails), kept
for two years as evidence that deletion happens. To run by hand:
`select expo.purge_expired_downloads();`. If pg_cron is not available the
migration only prints a notice; call the function from another scheduler.

## Sharing a database with another app

The migration only adds the `expo` schema and the `expo-docs` bucket; it does
not touch `public`. To remove everything: `select cron.unschedule('expo-purge-expired-downloads'); drop schema expo cascade;`, delete
the `expo-docs` bucket and the `expo-download` function.
