/**
 * Domain vocabulary for the module finder.
 *
 * The catalog copy already carries a lot of text, but end users rarely type the
 * words a product page uses: someone looking for `mes-pharma` types "GMP
 * 배치기록", not "제약 특화 MES". These lists close that gap, and they are the
 * highest-weighted signal in `lib/moduleSearch` for exactly that reason.
 *
 * Every entry is written in normalized form — lowercase, punctuation stripped —
 * because the matcher compares them against a normalized query with plain
 * substring containment. That is what lets a single list mix Korean, English
 * and Japanese without a per-language tokenizer.
 */

/** Keywords per catalog entry, keyed by app id or sub-module id. */
export const MODULE_KEYWORDS: Record<string, readonly string[]> = {
  smartfactory: [
    'mes', '제조실행', '생산관리', '생산실행', '공정관리', '작업지시', '실적집계', '라인관리',
    '로트', 'lot', '가동률', 'oee', '스마트공장', '스마트 팩토리', '현장관리', '제조운영',
    'manufacturing execution', 'production management', 'shop floor', 'work order', 'traceability',
    '生産管理', '製造実行', '工程管理', '稼働率', 'スマート工場', '作業指示'
  ],
  'mes-pharma': [
    '제약', '바이오', '의약품', '원료의약품', 'gmp', '밸리데이션', '배치', '배치기록', '일탈',
    '무균', '주사제', '완제의약품', '의료기기', 'deviation', 'validation', 'pharma',
    'pharmaceutical', 'biotech', 'batch record', 'sterile',
    '製薬', 'バイオ', '医薬品', '逸脱', 'バリデーション', '無菌', 'バッチ記録', '製造指図'
  ],
  'mes-food': [
    '식품', '음료', '화장품', '건강기능식품', 'haccp', 'ccp', '위생', '유통기한', '소비기한',
    '원료', '역추적', '이력추적', '배합', '충진', 'food', 'beverage', 'cosmetics', 'hygiene',
    'shelf life', 'expiry', 'recall', 'lot tracing',
    '食品', '化粧品', '衛生', '賞味期限', 'トレーサビリティ', '原料', '自動記録'
  ],
  'mes-general': [
    '일반제조', '표준', '기계', '부품', '가공', '조립', '금속', '열처리', '자동차', '항공',
    '정밀가공', '뿌리산업', '중소기업', '처음', '첫 도입', '최소', '기본',
    'general manufacturing', 'discrete', 'assembly', 'machining', 'metal', 'automotive',
    'aerospace', 'starter', 'entry level', 'small factory',
    '一般製造', '組立', '加工', '金属', '自動車', '初導入'
  ],
  ebrs: [
    '전자기록', '전자제조기록', '제조기록', '제조기록서', '기록관리', '감사추적', '감사',
    '전자서명', '규제대응', '증적', '무서류', '페이퍼리스', 'part 11', '21 cfr', 'cfr',
    'audit trail', 'e signature', 'electronic record', 'compliance', 'paperless', 'fda',
    '電子記録', '監査証跡', '電子署名', '記録管理', 'ペーパーレス'
  ],
  rems: [
    '청정실', '클린룸', '환경모니터링', '차압', '온습도', '온도', '습도', '미립자', '부유균',
    '파티클', '계측점', '센서', '경보', '알람', 'cleanroom', 'environmental monitoring',
    'differential pressure', 'humidity', 'temperature', 'particle', 'sensor', 'alarm',
    'クリーンルーム', '環境モニタリング', '温湿度', '微粒子', '差圧'
  ],
  scm: [
    '공급망', '협력사', '외주', '발주', '구매', '자재', '납기', '입고', '수급', '벤더',
    '파트너', '포털', '2차 협력', 'scm', 'supply chain', 'procurement', 'purchase order',
    'supplier', 'vendor', 'delivery', 'lead time', 'subcontract',
    '供給網', 'サプライチェーン', '協力会社', '発注', '納期', '調達'
  ],
  a2lab: [
    'ai', '인공지능', '머신러닝', '딥러닝', '학습', '모델', '예측', '예지보전', '예지',
    '불량', '불량률', '불량예측', '품질예측', '고장', '이상감지', '이상탐지', '수율',
    '검사', '결함', 'automl',
    '노코드 ai', 'mlops', '추론', 'artificial intelligence', 'machine learning',
    'deep learning', 'predictive maintenance', 'anomaly detection', 'defect', 'yield',
    'inference', 'model training', 'downtime', 'machine failure', 'breakdown',
    'failure prediction', 'scrap rate',
    '人工知能', '機械学習', '予知保全', '異常検知', '品質予測', '推論',
    '不良', '不良率', '歩留', '歩留まり', '故障', '故障予知', '設備保全', '品質改善'
  ],
  orch: [
    '에이전트', '멀티 에이전트', '다중 ai', '오케스트레이션', '슈퍼바이저', '조율', '교차검증',
    '자율제조', '자율', '등대공장', '지휘', '충돌', 'agent', 'multi agent', 'orchestration',
    'supervisor', 'autonomous', 'lighthouse factory', 'coordination',
    'エージェント', '自律製造', 'オーケストレーション', 'スーパーバイザー'
  ],
  consensbot: [
    '챗봇', '챗봇 도입', 'llm', 'slm', '언어모델', '생성형', '생성형 ai', 'sop', '기준서',
    '규정', '지침서', '문서', '문서검색', '질의응답', '질문', '보고서', '초안', '작성',
    '감사대응', '일탈원인', '원인분석', '폐쇄망', '온프레미스 ai', '보안', 'rag', '검색증강',
    'chatbot', 'language model', 'document search', 'knowledge', 'question answering',
    'audit report', 'draft', 'on premise ai', 'air gapped',
    'チャットボット', '言語モデル', '社内文書', '規程', '質問応答', '監査対応',
    '報告書', 'ドラフト', '原因分析'
  ],
  aesg: [
    '에너지', '전력', '전기요금', '전기세', '피크', '피크전력', '절감', '탄소', '탄소중립',
    '온실가스', '배출', '배출량', 'esg', 'scope 1', 'scope 2', '가스', '스팀', '유틸리티',
    '변전', '수요관리', 'energy', 'power', 'electricity', 'peak shaving', 'carbon',
    'emission', 'greenhouse gas', 'utility', 'sustainability',
    'エネルギー', '電力', '脱炭素', '排出量', 'ピーク', '省エネ'
  ],
  twin: [
    '디지털트윈', '트윈', '3d', '3차원', '시각화', '가시화', '관제', '관제실', '모니터링 화면',
    '공장 배치', '레이아웃', '병목', 'agv', '물류', '가상공장', '순찰', 'digital twin',
    'visualization', 'layout', 'bottleneck', 'control room', 'virtual factory', 'webgl',
    'デジタルツイン', '可視化', '3次元', 'レイアウト', 'ボトルネック'
  ],
  arcmind: [
    '노코드', '로우코드', '자체구축', '자체개발', '직접 개발', '직접 구축', '내재화', '커스텀',
    '맞춤', '빌더', '사내 it', '전산팀', '개발팀', '화면 제작', '대시보드 제작', '자유롭게',
    'no code', 'low code', 'builder', 'custom', 'in house', 'diy', 'self build', 'dashboard builder',
    'ノーコード', 'ローコード', '内製', '自社開発', 'カスタム'
  ],
  b2lab: [
    '데이터레이크', '데이터 레이크', '온톨로지', '표준화', '데이터 통합', '연동', '인터페이스',
    '스키마', '메타데이터', 'erp 연동', '레거시', '기반', '공통', 'aas', 'opc ua', 'ks x 9101',
    'data lake', 'ontology', 'integration', 'schema', 'legacy', 'foundation', 'data platform',
    'データレイク', 'オントロジー', '連携', '標準化', 'データ統合'
  ]
};

/** Keywords per recommendation preset, keyed by preset id. */
export const PRESET_KEYWORDS: Record<string, readonly string[]> = {
  'preset-pharma': [
    '제약', '바이오', 'gmp', '의약품', '규제', '밸리데이션', 'cfr', '청정실',
    'pharma', 'biotech', 'regulated', 'gmp compliance',
    '製薬', 'バイオ', '医薬品', '規制対応'
  ],
  'preset-food': [
    '식품', '화장품', 'haccp', '위생', '이력추적', '유통기한', '원료',
    'food', 'cosmetics', 'hygiene', 'traceability',
    '食品', '化粧品', '衛生', 'トレーサビリティ'
  ],
  'preset-precision': [
    '정밀', '기계', '자동차', '부품', '가공', '항공', '예지보전', '불량', '품질', '전자', '반도체',
    'precision', 'machinery', 'automotive', 'parts', 'quality', 'predictive', 'electronics',
    'semiconductor',
    '精密', '機械', '自動車', '部品', '品質', '電子'
  ],
  'preset-esg': [
    '화학', '철강', '열처리', '에너지', '전력', '탄소', 'esg', '안전', '위험',
    'chemical', 'steel', 'energy', 'carbon', 'esg', 'safety',
    '化学', '鉄鋼', 'エネルギー', '脱炭素', '安全'
  ],
  'preset-starter': [
    '처음', '첫 도입', '시작', '최소', '저렴', '빠르게', '2주', '중소', '스타터', '기본',
    'first', 'start', 'starter', 'minimum', 'cheap', 'quick', 'lean', 'small business',
    '初導入', '最小', 'スターター', '短期'
  ],
  'preset-inhouse-diy': [
    '자체', '자체구축', '노코드', '로우코드', '사내 it', '전산팀', '직접', '내재화',
    'in house', 'no code', 'low code', 'diy', 'self build',
    '内製', 'ノーコード', '自社開発'
  ],
  'preset-autonomous': [
    '자율제조', '에이전트', '고도화', '등대공장', 'ai 전면', '무인',
    'autonomous', 'agent', 'advanced', 'lighthouse', 'full ai',
    '自律製造', 'エージェント', '高度化'
  ],
  'preset-scm-audit': [
    '공급망', '협력사', '외주', '발주', '납기', '감사', '증적', '구매',
    'supply chain', 'supplier', 'subcontract', 'audit', 'procurement',
    'サプライチェーン', '協力会社', '監査', '発注'
  ]
};

export type IndustryId =
  | 'pharma'
  | 'food'
  | 'precision'
  | 'electronics'
  | 'chemical'
  | 'firstTime';

export type GoalId =
  | 'quality'
  | 'compliance'
  | 'energy'
  | 'visibility'
  | 'supply'
  | 'knowledge'
  | 'buildOwn'
  | 'autonomous'
  | 'data';

export interface IntentDefinition<Id extends string> {
  id: Id;
  keywords: readonly string[];
  /** Preset offered as the one-click answer for this intent. */
  presetId: string;
  /** Modules shown alongside the preset, in the order they should be read. */
  moduleIds: readonly string[];
}

/**
 * "What do you make?" — the fastest disambiguation available, because the
 * industry pins the MES core and most of the compliance modules with it.
 */
export const INDUSTRY_INTENTS: readonly IntentDefinition<IndustryId>[] = [
  {
    id: 'pharma',
    keywords: [
      '제약', '바이오', '의약품', '의료기기', 'gmp', '무균', '주사제', '병원',
      'pharma', 'pharmaceutical', 'biotech', 'medical device', 'gmp',
      '製薬', 'バイオ', '医薬品', '医療機器'
    ],
    presetId: 'preset-pharma',
    moduleIds: ['mes-pharma', 'ebrs', 'rems', 'consensbot']
  },
  {
    id: 'food',
    keywords: [
      '식품', '음료', '화장품', '건강기능', '제과', '유가공', 'haccp', '급식',
      'food', 'beverage', 'cosmetics', 'dairy', 'haccp',
      '食品', '飲料', '化粧品'
    ],
    presetId: 'preset-food',
    moduleIds: ['mes-food', 'ebrs', 'scm', 'aesg']
  },
  {
    id: 'precision',
    keywords: [
      '정밀', '기계', '가공', '항공', '자동차', '부품', '금형', '5축', '조선', '방산',
      'precision', 'machining', 'aerospace', 'automotive', 'parts', 'mold', 'machinery',
      '精密', '機械', '加工', '航空', '自動車', '部品'
    ],
    presetId: 'preset-precision',
    moduleIds: ['mes-general', 'a2lab', 'twin', 'rems']
  },
  {
    id: 'electronics',
    keywords: [
      '전자', '반도체', '디스플레이', 'smt', '전장', '배터리', '이차전지', 'pcb',
      'electronics', 'semiconductor', 'display', 'battery', 'pcb',
      '電子', '半導体', 'ディスプレイ', '電池'
    ],
    presetId: 'preset-precision',
    moduleIds: ['mes-general', 'a2lab', 'twin', 'rems']
  },
  {
    id: 'chemical',
    keywords: [
      '화학', '석유', '철강', '금속', '열처리', '도금', '주조', '뿌리', '시멘트', '섬유',
      'chemical', 'petrochemical', 'steel', 'metal', 'heat treatment', 'plating', 'foundry',
      '化学', '鉄鋼', '金属', '熱処理', '鋳造'
    ],
    presetId: 'preset-esg',
    moduleIds: ['mes-general', 'aesg', 'rems', 'a2lab']
  },
  {
    id: 'firstTime',
    keywords: [
      '처음', '첫', '중소', '소규모', '작은', '시작', '잘 모르', '모르겠',
      'first time', 'small', 'starting', 'not sure', 'beginner',
      '初めて', '中小', '小規模', 'わからない'
    ],
    presetId: 'preset-starter',
    moduleIds: ['mes-general', 'ebrs', 'b2lab']
  }
];

/** "What are you trying to fix?" — used when the industry alone is not enough. */
export const GOAL_INTENTS: readonly IntentDefinition<GoalId>[] = [
  {
    id: 'quality',
    keywords: [
      '불량', '품질', '검사', '수율', '예지보전', '고장', '설비', '다운타임', '결함',
      'defect', 'quality', 'inspection', 'yield', 'predictive maintenance', 'downtime', 'breakdown',
      '不良', '品質', '検査', '歩留', '予知保全'
    ],
    presetId: 'preset-precision',
    moduleIds: ['a2lab', 'twin', 'mes-general']
  },
  {
    id: 'compliance',
    keywords: [
      '규제', '감사', '인증', '기록', '전자서명', '증적', '실사', 'gmp', 'haccp', 'cfr',
      'compliance', 'audit', 'certification', 'record', 'signature', 'inspection body',
      '規制', '監査', '記録', '電子署名'
    ],
    presetId: 'preset-pharma',
    moduleIds: ['ebrs', 'consensbot', 'rems']
  },
  {
    id: 'energy',
    keywords: [
      '에너지', '전기', '전력', '요금', '피크', '탄소', '온실가스', 'esg', '절감', '원가',
      'energy', 'electricity', 'cost', 'peak', 'carbon', 'emission', 'saving',
      'エネルギー', '電力', 'コスト', '脱炭素'
    ],
    presetId: 'preset-esg',
    moduleIds: ['aesg', 'a2lab']
  },
  {
    id: 'visibility',
    keywords: [
      '현황', '가시화', '시각화', '모니터링', '관제', '한눈에', '대시보드', '병목', '3d',
      'visibility', 'monitoring', 'dashboard', 'overview', 'bottleneck', 'real time view',
      '可視化', '見える化', 'モニタリング', 'ダッシュボード'
    ],
    presetId: 'preset-precision',
    moduleIds: ['twin', 'mes-general', 'arcmind']
  },
  {
    id: 'supply',
    keywords: [
      '협력사', '공급망', '발주', '납기', '자재', '외주', '구매', '재고',
      'supplier', 'supply chain', 'purchase', 'delivery', 'material', 'inventory', 'outsourcing',
      '協力会社', 'サプライ', '発注', '納期', '在庫'
    ],
    presetId: 'preset-scm-audit',
    moduleIds: ['scm', 'ebrs']
  },
  {
    id: 'knowledge',
    keywords: [
      '문서', '규정', 'sop', '기준서', '질문', '질의', '검색', '보고서', '초안', '챗봇', 'llm',
      'document', 'sop', 'question', 'search', 'report', 'draft', 'chatbot', 'llm',
      '文書', '規程', '質問', '検索', 'レポート'
    ],
    presetId: 'preset-pharma',
    moduleIds: ['consensbot', 'ebrs']
  },
  {
    id: 'buildOwn',
    keywords: [
      '자체', '직접', '노코드', '로우코드', '전산팀', '개발', '커스텀', '내재화',
      'in house', 'no code', 'low code', 'custom', 'develop', 'build ourselves',
      '内製', 'ノーコード', '自社開発'
    ],
    presetId: 'preset-inhouse-diy',
    moduleIds: ['arcmind', 'b2lab', 'a2lab']
  },
  {
    id: 'autonomous',
    keywords: [
      '자율', '무인', '에이전트', '고도화', '자동화', '최적화', 'ai 전면',
      'autonomous', 'agent', 'automation', 'optimization', 'advanced ai',
      '自律', 'エージェント', '自動化', '最適化'
    ],
    presetId: 'preset-autonomous',
    moduleIds: ['orch', 'a2lab', 'consensbot']
  },
  {
    id: 'data',
    keywords: [
      '데이터', '통합', '연동', '표준화', '온톨로지', 'erp', '레거시', '수집',
      'data', 'integration', 'standardize', 'ontology', 'legacy', 'collect',
      'データ', '連携', '標準化', '統合'
    ],
    presetId: 'preset-starter',
    moduleIds: ['b2lab', 'smartfactory']
  }
];

/**
 * Words that carry no product meaning. They are dropped before scoring because
 * "모듈", "추천", "찾아줘" appear in nearly every catalog description and would
 * otherwise make every entry match every question.
 */
export const STOP_WORDS: ReadonlySet<string> = new Set([
  '모듈', '앱', '추천', '추천해', '추천해줘', '찾아', '찾아줘', '찾고', '알려줘', '알려',
  '싶어', '싶은데', '뭐가', '뭔가', '어떤', '어떻게', '있나요', '있어', '해줘', '주세요',
  '우리', '저희', '회사', '공장', '사업장', '필요', '필요해', '도입', '플랫폼', '솔루션',
  'the', 'a', 'an', 'for', 'and', 'or', 'to', 'of', 'in', 'on', 'is', 'are', 'do', 'does',
  'what', 'which', 'how', 'i', 'we', 'my', 'our', 'me', 'you', 'want', 'need', 'find',
  'show', 'looking', 'recommend', 'please', 'module', 'modules', 'app', 'apps', 'platform',
  'solution', 'factory', 'company',
  'モジュール', 'アプリ', 'おすすめ', '教えて', 'ください', '探して', '欲しい', '当社',
  '工場', '導入', 'プラットフォーム'
]);
