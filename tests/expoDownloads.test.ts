/**
 * The download gate: what counts as a valid email, and that every product the
 * UI offers is one the Edge Function will accept.
 */
import { readFileSync } from 'node:fs';
import { APPS_DATA } from '../src/data/appsData';
import {
  DOWNLOADABLE_PRODUCT_IDS,
  isValidEmail,
  requestDownload
} from '../src/expo/downloadRequest';
import { assert, suite, test } from './harness';

suite('expo downloads', () => {
  test('accepts ordinary addresses', () => {
    assert(isValidEmail('taro@example.co.jp'), 'plain address');
    assert(isValidEmail('  taro.yamada+expo@impix.jp '), 'surrounding spaces are trimmed');
  });

  test('rejects malformed addresses', () => {
    for (const bad of ['', 'taro', 'taro@', '@example.com', 'taro@example', 'a b@example.com']) {
      assert(!isValidEmail(bad), `should reject "${bad}"`);
    }
    assert(!isValidEmail(`${'a'.repeat(250)}@example.com`), 'over 254 characters');
  });

  test('requestDownload refuses without consent', async () => {
    const result = await requestDownload({
      email: 'taro@example.com',
      consent: false,
      productId: 'smartfactory',
      kind: 'brochure',
      lang: 'ja'
    });
    assert(!result.ok, 'no consent must never produce a URL');
  });

  test('every catalog product is accepted by the Edge Function', () => {
    const source = readFileSync('supabase/functions/expo-download/index.ts', 'utf8');
    for (const app of APPS_DATA) {
      assert(DOWNLOADABLE_PRODUCT_IDS.includes(app.id), `client offers ${app.id}`);
      assert(source.includes(`'${app.id}'`), `Edge Function allowlist is missing ${app.id}`);
    }
  });
});
