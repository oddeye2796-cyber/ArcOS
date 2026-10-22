# Exhibition downloads

`expo.html` offers a product brochure and a manual for each product, behind an
email + consent form. Three pieces make that work:

| Piece | Where |
|---|---|
| Table `expo_downloads` and the private bucket `expo-docs` | `migrations/20261022000000_expo_downloads.sql` |
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

`expo_downloads` has row-level security and no policies, so only the dashboard
or the service role can read it: email, product, kind, language, consent flag
and consent wording version (`CONSENT_VERSION` in `downloadRequest.ts`).
