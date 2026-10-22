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

For example `smartfactory/brochure_ja.pdf`. If the visitor's language is missing
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

## Retention (1 year)

The privacy policy (`src/expo/privacyContent.ts`) states a one-year retention.
Delete expired rows with `select expo.purge_expired();` in the SQL editor, for
example once a month; it returns how many rows it removed. `pg_cron` is not
enabled in the shared `pms` project, so nothing runs it automatically. To
delete everything sooner (the policy asks for deletion once the purpose is
achieved, e.g. after the follow-up campaign), run
`select expo.purge_expired(interval '0');`.

## Sharing a database with another app

The migration only adds the `expo` schema and the `expo-docs` bucket; it does
not touch `public`. To remove everything: `drop schema expo cascade;`, delete
the `expo-docs` bucket and the `expo-download` function.
