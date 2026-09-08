/**
 * Test entry point: `npm test`.
 *
 * Suites register themselves on import, so adding one is a matter of adding a
 * line here.
 */
import './searchRanking.test';
import './i18n.test';
import { report } from './harness';

report();
