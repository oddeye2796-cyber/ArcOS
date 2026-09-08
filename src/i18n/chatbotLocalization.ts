/**
 * Copy for the module finder chat.
 *
 * It lives beside the other per-feature localization files rather than in
 * `translations.ts`: the panel is loaded on demand, and keeping its strings in
 * the same chunk means the 2,000-line shared translation table does not grow
 * for a surface most visitors never open.
 */
import { GoalId, IndustryId } from '../data/chatbotKeywords';
import { Language } from './translations';

export interface ChatbotCopy {
  launcher: string;
  launcherHint: string;
  title: string;
  subtitle: string;
  close: string;
  restart: string;
  placeholder: string;
  send: string;
  youLabel: string;
  botLabel: string;

  greeting: string;
  greetingHint: string;
  examplesTitle: string;
  examples: string[];

  chipIndustry: string;
  chipGoal: string;
  chipAll: string;
  askIndustry: string;
  askGoal: string;
  industryLabels: Record<IndustryId, string>;
  goalLabels: Record<GoalId, string>;

  resultsIntro: string;
  singleResultIntro: string;
  industryIntro: string;
  goalIntro: string;
  allIntro: string;
  noResult: string;
  noResultHint: string;
  followUp: string;

  matchReason: string;
  suiteMember: string;
  prereq: string;
  onprem: string;
  subscribed: string;
  landing: string;

  detail: string;
  add: string;
  added: string;
  poc: string;
  pocActive: string;
  presetIntro: string;
  presetModules: string;
  applyPreset: string;
  goToQuote: string;

  addedToast: string;
  removedToast: string;
  presetAppliedToast: string;
  cartStatus: string;
  privacyNote: string;
}

export const CHATBOT_COPY: Record<Language, ChatbotCopy> = {
  ko: {
    launcher: '모듈 찾기 도우미 열기',
    launcherHint: '어떤 모듈이 필요한지 물어보세요',
    title: '모듈 파인더',
    subtitle: '필요한 기능을 말하면 맞는 모듈을 찾아드립니다',
    close: '닫기',
    restart: '처음부터',
    placeholder: '예) 제약 공장인데 배치기록 관리가 필요해요',
    send: '보내기',
    youLabel: '나',
    botLabel: '도우미',

    greeting: '안녕하세요. 어떤 문제를 해결하고 싶으신가요? 업종이나 목적을 알려주시면 맞는 모듈을 바로 찾아드릴게요.',
    greetingHint: '아래 버튼을 고르거나, 하고 싶은 일을 그대로 적어주셔도 됩니다.',
    examplesTitle: '이렇게 물어보세요',
    examples: [
      '불량률 줄이는 AI 있나요',
      'GMP 배치기록과 전자서명이 필요해요',
      '전기요금 피크를 줄이고 싶어요',
      '협력사 발주·납기를 관리하고 싶어요'
    ],

    chipIndustry: '업종으로 찾기',
    chipGoal: '목적으로 찾기',
    chipAll: '전체 모듈 보기',
    askIndustry: '어떤 업종의 사업장인가요?',
    askGoal: '가장 먼저 해결하고 싶은 것은 무엇인가요?',
    industryLabels: {
      pharma: '제약·바이오 GMP',
      food: '식품·화장품 HACCP',
      precision: '정밀가공·기계·자동차',
      electronics: '전자·반도체',
      chemical: '화학·철강·열처리',
      firstTime: '처음 도입이라 잘 모르겠어요'
    },
    goalLabels: {
      quality: '불량 감소·품질 개선',
      compliance: '규제 대응·감사 기록',
      energy: '에너지·탄소 절감',
      visibility: '현장 현황 가시화',
      supply: '공급망·협력사 관리',
      knowledge: '사내 문서·규정 질의',
      buildOwn: '자체 IT로 직접 구축',
      autonomous: 'AI 자율제조 고도화',
      data: '데이터 통합·표준화'
    },

    resultsIntro: '가장 가까운 모듈 {count}개를 찾았어요.',
    singleResultIntro: '이 모듈이 가장 가깝습니다.',
    industryIntro: '{name} 사업장이라면 보통 이렇게 시작합니다.',
    goalIntro: '{name}에는 이 조합이 잘 맞습니다.',
    allIntro: '카탈로그의 전체 모듈입니다.',
    noResult: '딱 맞는 모듈을 찾지 못했어요.',
    noResultHint: '업종이나 목적을 골라주시면 다시 추천해드릴게요.',
    followUp: '더 찾아볼까요?',

    matchReason: '매칭 근거',
    suiteMember: '{suite} 스위트 모듈',
    prereq: '선행 조건 {count}건 확인 필요',
    onprem: '온프레미스 전용',
    subscribed: '구독 중인 공통 기반',
    landing: '첫 도입 추천',

    detail: '상세',
    add: '견적 담기',
    added: '담김',
    poc: 'PoC 14일',
    pocActive: 'PoC 진행 중',
    presetIntro: '[{title}] 조합을 그대로 견적에 담을 수 있어요.',
    presetModules: '모듈 {count}개 구성',
    applyPreset: '이 조합 적용',
    goToQuote: '견적서 열기',

    addedToast: '[{name}] 견적에 담았습니다.',
    removedToast: '[{name}] 견적에서 뺐습니다.',
    presetAppliedToast: '[{title}] 조합을 견적에 적용했습니다.',
    cartStatus: '현재 견적 {count}개',
    privacyNote: '이 대화는 외부로 전송되지 않고 브라우저 안에서만 처리됩니다.'
  },

  en: {
    launcher: 'Open the module finder',
    launcherHint: 'Ask which module you need',
    title: 'Module Finder',
    subtitle: 'Describe what you need and get the matching modules',
    close: 'Close',
    restart: 'Start over',
    placeholder: 'e.g. We run a pharma plant and need batch records',
    send: 'Send',
    youLabel: 'You',
    botLabel: 'Finder',

    greeting: 'Hello. What are you trying to solve? Tell me your industry or your goal and I will point you at the right modules.',
    greetingHint: 'Pick an option below, or just describe the job in your own words.',
    examplesTitle: 'Try asking',
    examples: [
      'Any AI for reducing defects?',
      'We need GMP batch records and e-signatures',
      'I want to cut our peak electricity cost',
      'Manage supplier purchase orders and lead times'
    ],

    chipIndustry: 'Find by industry',
    chipGoal: 'Find by goal',
    chipAll: 'See all modules',
    askIndustry: 'What does your site manufacture?',
    askGoal: 'What would you like to fix first?',
    industryLabels: {
      pharma: 'Pharma & biotech (GMP)',
      food: 'Food & cosmetics (HACCP)',
      precision: 'Precision, machinery & automotive',
      electronics: 'Electronics & semiconductor',
      chemical: 'Chemical, steel & heat treatment',
      firstTime: 'First deployment — not sure yet'
    },
    goalLabels: {
      quality: 'Cut defects, raise quality',
      compliance: 'Regulatory compliance & audit records',
      energy: 'Energy & carbon reduction',
      visibility: 'Shop-floor visibility',
      supply: 'Supply chain & suppliers',
      knowledge: 'Q&A over internal SOPs',
      buildOwn: 'Build it with our own IT team',
      autonomous: 'Move toward autonomous AI operations',
      data: 'Data integration & standardization'
    },

    resultsIntro: 'Here are the {count} closest modules.',
    singleResultIntro: 'This module is the closest match.',
    industryIntro: 'Sites like {name} usually start here.',
    goalIntro: 'For {name}, this combination fits well.',
    allIntro: 'Every module in the catalog.',
    noResult: 'I could not find a module that fits.',
    noResultHint: 'Pick an industry or a goal and I will try again.',
    followUp: 'Anything else to look for?',

    matchReason: 'Matched on',
    suiteMember: 'Module of the {suite} suite',
    prereq: '{count} prerequisite(s) to confirm',
    onprem: 'On-premise only',
    subscribed: 'Subscribed shared foundation',
    landing: 'Recommended start',

    detail: 'Details',
    add: 'Add to quote',
    added: 'Added',
    poc: '14-day PoC',
    pocActive: 'PoC running',
    presetIntro: 'You can drop the [{title}] bundle straight into the quote.',
    presetModules: '{count} modules',
    applyPreset: 'Apply this bundle',
    goToQuote: 'Open the quote',

    addedToast: 'Added [{name}] to the quote.',
    removedToast: 'Removed [{name}] from the quote.',
    presetAppliedToast: 'Applied the [{title}] bundle to the quote.',
    cartStatus: '{count} in the quote',
    privacyNote: 'This conversation stays in your browser and is never sent anywhere.'
  },

  ja: {
    launcher: 'モジュールファインダーを開く',
    launcherHint: '必要なモジュールを聞いてください',
    title: 'モジュールファインダー',
    subtitle: '必要な機能を入力すると最適なモジュールを探します',
    close: '閉じる',
    restart: '最初から',
    placeholder: '例）製薬工場でバッチ記録の管理が必要です',
    send: '送信',
    youLabel: 'あなた',
    botLabel: 'ファインダー',

    greeting: 'こんにちは。どの課題を解決したいですか。業種や目的を教えていただければ、最適なモジュールをすぐにご案内します。',
    greetingHint: '下のボタンを選ぶか、やりたいことをそのまま入力してください。',
    examplesTitle: 'こんな質問ができます',
    examples: [
      '不良率を下げるAIはありますか',
      'GMPのバッチ記録と電子署名が必要です',
      'ピーク電力を下げたいです',
      '協力会社の発注・納期を管理したい'
    ],

    chipIndustry: '業種から探す',
    chipGoal: '目的から探す',
    chipAll: '全モジュールを見る',
    askIndustry: 'どの業種の事業所ですか。',
    askGoal: '最初に解決したいことは何ですか。',
    industryLabels: {
      pharma: '製薬・バイオ（GMP）',
      food: '食品・化粧品（HACCP）',
      precision: '精密加工・機械・自動車',
      electronics: '電子・半導体',
      chemical: '化学・鉄鋼・熱処理',
      firstTime: '初導入でまだ分からない'
    },
    goalLabels: {
      quality: '不良削減・品質改善',
      compliance: '規制対応・監査記録',
      energy: 'エネルギー・脱炭素',
      visibility: '現場の見える化',
      supply: 'サプライチェーン・協力会社',
      knowledge: '社内文書・規程の照会',
      buildOwn: '自社ITで内製する',
      autonomous: 'AI自律製造の高度化',
      data: 'データ統合・標準化'
    },

    resultsIntro: '最も近いモジュールを{count}件見つけました。',
    singleResultIntro: 'このモジュールが最も近いです。',
    industryIntro: '{name}の事業所では、通常ここから始めます。',
    goalIntro: '{name}には、この組み合わせが適しています。',
    allIntro: 'カタログの全モジュールです。',
    noResult: '条件に合うモジュールが見つかりませんでした。',
    noResultHint: '業種または目的をお選びいただければ、もう一度ご提案します。',
    followUp: '他にもお探ししますか。',

    matchReason: '一致した語',
    suiteMember: '{suite} スイートのモジュール',
    prereq: '前提条件{count}件の確認が必要',
    onprem: 'オンプレミス専用',
    subscribed: '購読中の共通基盤',
    landing: '初導入におすすめ',

    detail: '詳細',
    add: '見積に追加',
    added: '追加済み',
    poc: 'PoC 14日',
    pocActive: 'PoC 実施中',
    presetIntro: '［{title}］の組み合わせをそのまま見積に追加できます。',
    presetModules: 'モジュール{count}件',
    applyPreset: 'この構成を適用',
    goToQuote: '見積書を開く',

    addedToast: '［{name}］を見積に追加しました。',
    removedToast: '［{name}］を見積から削除しました。',
    presetAppliedToast: '［{title}］の構成を見積に適用しました。',
    cartStatus: '現在の見積{count}件',
    privacyNote: 'この会話は外部に送信されず、ブラウザー内でのみ処理されます。'
  }
};

/** Fills `{token}` placeholders in the copy above. */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template
  );
}
