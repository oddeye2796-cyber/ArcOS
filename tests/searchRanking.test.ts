/**
 * What the module finder must keep answering correctly.
 *
 * The finder's accuracy rests on a hand-maintained keyword lexicon
 * (`data/chatbotKeywords`), which is exactly the kind of data that degrades
 * silently: an edit that helps one question can quietly demote another, and
 * nothing in a type check or a build would notice.
 *
 * These cases assert the contract a user cares about — which module comes
 * first, and which ones are in the answer at all — rather than the scores
 * behind it, so the lexicon stays free to be tuned.
 */
import {
  detectGoal,
  detectIndustry,
  searchModules
} from '../src/lib/moduleSearch';
import { assert, assertEqual, assertIncludes, suite, test } from './harness';

interface Expectation {
  query: string;
  /** The module that must rank first. */
  top: string;
  /** Modules that must appear somewhere in the answer. */
  includes?: string[];
  industry?: string;
  goal?: string;
}

const EXPECTATIONS: Expectation[] = [
  { query: '제약 공장인데 GMP 배치기록 관리가 필요해요', top: 'mes-pharma', industry: 'pharma', goal: 'compliance' },
  { query: 'HACCP 자동 기록', top: 'mes-food', includes: ['ebrs'], industry: 'food', goal: 'compliance' },
  { query: '전기요금 피크 줄이고 탄소배출 관리하고 싶어요', top: 'aesg', goal: 'energy' },
  { query: '불량률 줄이는 AI 있나요', top: 'a2lab', goal: 'quality' },
  { query: '사내 규정 문서 검색되는 챗봇 찾아요', top: 'consensbot', goal: 'knowledge' },
  { query: '3D로 공장 현황 보고 싶어', top: 'twin', goal: 'visibility' },
  { query: '우리 전산팀이 직접 노코드로 만들고 싶어요', top: 'arcmind', goal: 'buildOwn' },
  { query: '협력사 발주랑 납기 관리', top: 'scm', goal: 'supply' },
  { query: '데이터 통합 온톨로지', top: 'b2lab', goal: 'data' },
  { query: '청정실 차압 온습도 미립자 모니터링', top: 'rems' },
  { query: '에이전트 여러 개를 조율하고 싶어요', top: 'orch', goal: 'autonomous' },
  { query: '처음 도입하는 중소기업인데 뭐부터 하죠', top: 'mes-general', industry: 'firstTime' },

  // Cross-language recall: the catalog is indexed in all three languages, so a
  // question does not have to be asked in the language the UI is set to.
  { query: 'predictive maintenance for machining lines', top: 'a2lab', industry: 'precision' },
  { query: 'cleanroom particle monitoring', top: 'rems' },
  { query: 'audit trail and electronic signature', top: 'ebrs' },
  { query: 'no code builder for our own IT team', top: 'arcmind', goal: 'buildOwn' },
  { query: '不良を減らすAI', top: 'a2lab' },
  { query: 'クリーンルームの温湿度モニタリング', top: 'rems' },
  { query: 'ピーク電力と脱炭素', top: 'aesg', goal: 'energy' }
];

suite('module finder ranking', () => {
  for (const expectation of EXPECTATIONS) {
    test(`"${expectation.query}"`, () => {
      const results = searchModules(expectation.query);
      const keys = results.map((result) => result.key);

      assert(results.length > 0, 'expected at least one match, got none');
      assertEqual(keys[0], expectation.top, 'wrong top match');

      for (const required of expectation.includes ?? []) {
        assertIncludes(keys, required, 'missing an expected module');
      }
      if (expectation.industry) {
        assertEqual(detectIndustry(expectation.query)?.id, expectation.industry, 'wrong industry intent');
      }
      if (expectation.goal) {
        assertEqual(detectGoal(expectation.query)?.id, expectation.goal, 'wrong goal intent');
      }
    });
  }
});

/**
 * The phrasings a native speaker actually types, one per module and language.
 *
 * This set is what caught the finder returning nothing at all for "不良を
 * 減らしたい" — the most obvious Japanese way to ask for defect reduction —
 * because Japanese is written without spaces and the scoring discounted a
 * fragment of a run-on phrase.
 */
const NATURAL_PHRASINGS: [query: string, expectedTop: string][] = [
  ['不良を減らしたい', 'a2lab'],
  ['歩留まりを上げたい', 'a2lab'],
  ['設備の故障予知', 'a2lab'],
  ['バッチ記録とGMP', 'mes-pharma'],
  ['逸脱管理', 'mes-pharma'],
  ['HACCPの自動記録', 'mes-food'],
  ['原料のトレーサビリティ', 'mes-food'],
  ['監査証跡と電子署名', 'ebrs'],
  ['ペーパーレスの製造記録', 'ebrs'],
  ['クリーンルームの微粒子監視', 'rems'],
  ['差圧と温湿度の警報', 'rems'],
  ['協力会社の発注と納期', 'scm'],
  ['調達と在庫', 'scm'],
  ['社内規程の質問応答', 'consensbot'],
  ['監査報告書のドラフト', 'consensbot'],
  ['ピーク電力の削減', 'aesg'],
  ['CO2排出量の管理', 'aesg'],
  ['3Dで工場を可視化', 'twin'],
  ['ボトルネックの把握', 'twin'],
  ['ノーコードで内製したい', 'arcmind'],
  ['自社開発したい', 'arcmind'],
  ['データ統合とオントロジー', 'b2lab'],
  ['既存システムとの連携', 'b2lab'],
  ['複数エージェントの調整', 'orch'],
  ['reduce defect rate with AI', 'a2lab'],
  ['machine downtime prediction', 'a2lab'],
  ['batch records for GMP', 'mes-pharma'],
  ['HACCP automatic records', 'mes-food'],
  ['cleanroom differential pressure alarms', 'rems'],
  ['supplier lead time tracking', 'scm'],
  ['ask questions about internal SOPs', 'consensbot'],
  ['cut peak power cost', 'aesg'],
  ['3d factory visualization', 'twin'],
  ['build our own dashboards', 'arcmind'],
  ['connect legacy ERP data', 'b2lab']
];

suite('module finder natural phrasings', () => {
  for (const [query, expectedTop] of NATURAL_PHRASINGS) {
    test(`"${query}"`, () => {
      const results = searchModules(query);
      assert(results.length > 0, 'expected a match, got none');
      assertEqual(results[0].key, expectedTop, 'wrong top match');
    });
  }
});

suite('module finder guard rails', () => {
  test('a question with no product meaning returns nothing', () => {
    // Better to fall through to the guided industry/goal chips than to answer
    // a question the catalog cannot actually address.
    for (const query of ['아무거나', '안녕하세요', 'hello there', '?????']) {
      assertEqual(searchModules(query).length, 0, `expected no match for "${query}"`);
    }
  });

  test('an answer stays short enough to read', () => {
    for (const { query } of EXPECTATIONS) {
      assert(
        searchModules(query).length <= 4,
        `"${query}" returned more than four modules`
      );
    }
  });

  test('every match explains itself', () => {
    for (const { query } of EXPECTATIONS) {
      for (const result of searchModules(query)) {
        assert(
          result.reasons.length > 0,
          `"${query}" → ${result.key} was returned with no matched terms to show`
        );
      }
    }
  });
});
