/**
 * Test entry point: `npm test`.
 *
 * Language strings are loaded first, the way `main.tsx` does before the first
 * render: the catalog tables start empty and are filled per language, so a
 * suite that ran before them would be testing an empty catalog. The suites are
 * imported dynamically for the same reason — importing registers their cases,
 * which run immediately.
 */
import { loadAllLanguages } from '../src/i18n/loadLanguage';
import { report } from './harness';

void loadAllLanguages()
  .then(async () => {
    await import('./searchRanking.test');
    await import('./i18n.test');
    report();
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
