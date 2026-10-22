import { Language } from '../i18n/translations';

/**
 * Chrome copy for the exhibition build. Product and manual text comes from the
 * shared catalog and resource tables; only the frame around it lives here.
 */
export interface ExpoCopy {
  brandSub: string;
  navProducts: string;
  navManuals: string;
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  heroCtaProducts: string;
  heroCtaManuals: string;
  productsTitle: string;
  productsSubtitle: string;
  back: string;
  overview: string;
  outcomes: string;
  useCases: string;
  includedModules: string;
  openManual: string;
  viewDetails: string;
  footer: string;
  privacyLink: string;
  downloadsTitle: string;
  downloadBrochure: string;
  downloadManual: string;
  dlModalTitle: string;
  dlModalIntro: string;
  dlEmailLabel: string;
  dlEmailPlaceholder: string;
  dlEmailInvalid: string;
  /** Consent wording. Changing it means bumping CONSENT_VERSION. */
  dlConsent: string;
  dlPrivacyLink: string;
  dlSubmit: string;
  dlSending: string;
  dlCancel: string;
  dlDone: string;
  dlDoneBody: string;
  dlNotAvailable: string;
  dlFailed: string;
  dlNotConfigured: string;
}

export const EXPO_COPY: Record<Language, ExpoCopy> = {
  ja: {
    brandSub: '製造運用ハイブリッドクラウドプラットフォーム',
    navProducts: '製品紹介',
    navManuals: 'マニュアル',
    heroEyebrow: 'Product Guide',
    heroTitle: '既存設備を入れ替えずに、製造現場をつなぐ。',
    heroBody:
      'ArcOS は、現場のデータを社外に出さないハイブリッド構成で、MES・AI・エネルギー管理などの業務モジュールを追加できる製造運用プラットフォームです。',
    heroCtaProducts: '製品を見る',
    heroCtaManuals: 'マニュアルを見る',
    productsTitle: '製品ラインナップ',
    productsSubtitle: '各製品を選ぶと、概要・導入効果・活用例をご覧いただけます。',
    back: '一覧へ戻る',
    overview: '製品概要',
    outcomes: '導入効果',
    useCases: '活用例',
    includedModules: '構成モジュール',
    openManual: '関連マニュアルを開く',
    viewDetails: '詳しく見る',
    footer: 'ArcOS by IMPIX',
    privacyLink: 'プライバシーポリシー',
    downloadsTitle: '資料ダウンロード',
    downloadBrochure: '製品紹介書',
    downloadManual: 'マニュアル',
    dlModalTitle: '資料のダウンロード',
    dlModalIntro: 'メールアドレスをご入力のうえ、同意にチェックしてください。ダウンロードが始まります。',
    dlEmailLabel: 'メールアドレス',
    dlEmailPlaceholder: 'name@example.com',
    dlEmailInvalid: 'メールアドレスの形式をご確認ください。',
    dlConsent:
      '製品情報のご案内およびお問い合わせ対応のため、入力したメールアドレスをIMPIXが取得し、取得から1年間保管・利用することに同意します。同意いただけない場合、資料をダウンロードすることはできません。',
    dlPrivacyLink: 'プライバシーポリシーを確認する',
    dlSubmit: 'ダウンロード',
    dlSending: '確認中…',
    dlCancel: 'キャンセル',
    dlDone: '閉じる',
    dlDoneBody: 'ダウンロードを開始しました。始まらない場合は下のボタンをご利用ください。',
    dlNotAvailable: 'この資料は現在準備中です。',
    dlFailed: '処理に失敗しました。しばらくしてからもう一度お試しください。',
    dlNotConfigured: 'ダウンロードは現在準備中です。'
  },
  en: {
    brandSub: 'Hybrid cloud platform for manufacturing operations',
    navProducts: 'Products',
    navManuals: 'Manuals',
    heroEyebrow: 'Product Guide',
    heroTitle: 'Connect the shop floor without replacing a single machine.',
    heroBody:
      'ArcOS is a manufacturing operations platform with a hybrid design that keeps plant data on site, while letting you add MES, AI and energy-management modules as you need them.',
    heroCtaProducts: 'Browse products',
    heroCtaManuals: 'Read the manuals',
    productsTitle: 'Product lineup',
    productsSubtitle: 'Select a product to see its overview, outcomes and use cases.',
    back: 'Back to list',
    overview: 'Overview',
    outcomes: 'Outcomes',
    useCases: 'Use cases',
    includedModules: 'Included modules',
    openManual: 'Open the related manual',
    viewDetails: 'View details',
    footer: 'ArcOS by IMPIX',
    privacyLink: 'Privacy Policy',
    downloadsTitle: 'Downloads',
    downloadBrochure: 'Product brochure',
    downloadManual: 'Manual',
    dlModalTitle: 'Download',
    dlModalIntro: 'Enter your email address and tick the consent box. The download will start.',
    dlEmailLabel: 'Email address',
    dlEmailPlaceholder: 'name@example.com',
    dlEmailInvalid: 'Please check the email address format.',
    dlConsent:
      'I agree that IMPIX may collect the email address I enter, and keep and use it for 1 year from collection, to send product information and respond to inquiries. Without this consent the document cannot be downloaded.',
    dlPrivacyLink: 'Read the Privacy Policy',
    dlSubmit: 'Download',
    dlSending: 'Checking…',
    dlCancel: 'Cancel',
    dlDone: 'Close',
    dlDoneBody: 'Your download has started. If it did not, use the button below.',
    dlNotAvailable: 'This document is not available yet.',
    dlFailed: 'Something went wrong. Please try again in a moment.',
    dlNotConfigured: 'Downloads are not available yet.'
  },
  ko: {
    brandSub: '제조 운영 하이브리드 클라우드 플랫폼',
    navProducts: '제품 소개',
    navManuals: '매뉴얼',
    heroEyebrow: 'Product Guide',
    heroTitle: '기존 설비를 바꾸지 않고, 제조 현장을 연결합니다.',
    heroBody:
      'ArcOS는 현장 데이터를 사외로 내보내지 않는 하이브리드 구성으로 MES, AI, 에너지 관리 등 업무 모듈을 필요한 만큼 추가하는 제조 운영 플랫폼입니다.',
    heroCtaProducts: '제품 보기',
    heroCtaManuals: '매뉴얼 보기',
    productsTitle: '제품 라인업',
    productsSubtitle: '제품을 선택하면 개요, 도입 효과, 활용 사례를 확인할 수 있습니다.',
    back: '목록으로',
    overview: '제품 개요',
    outcomes: '도입 효과',
    useCases: '활용 사례',
    includedModules: '구성 모듈',
    openManual: '관련 매뉴얼 열기',
    viewDetails: '자세히 보기',
    footer: 'ArcOS by IMPIX',
    privacyLink: '개인정보 처리방침',
    downloadsTitle: '자료 다운로드',
    downloadBrochure: '제품소개서',
    downloadManual: '매뉴얼',
    dlModalTitle: '자료 다운로드',
    dlModalIntro: '이메일 주소를 입력하고 동의에 체크하면 다운로드가 시작됩니다.',
    dlEmailLabel: '이메일 주소',
    dlEmailPlaceholder: 'name@example.com',
    dlEmailInvalid: '이메일 주소 형식을 확인해 주세요.',
    dlConsent:
      '제품 정보 안내 및 문의 대응을 위해 입력한 이메일 주소를 IMPIX가 수집하고, 수집일로부터 1년간 보관·이용하는 데 동의합니다. 동의하지 않으면 자료를 다운로드할 수 없습니다.',
    dlPrivacyLink: '개인정보 처리방침 보기',
    dlSubmit: '다운로드',
    dlSending: '확인 중…',
    dlCancel: '취소',
    dlDone: '닫기',
    dlDoneBody: '다운로드를 시작했습니다. 시작되지 않으면 아래 버튼을 눌러 주세요.',
    dlNotAvailable: '이 자료는 현재 준비 중입니다.',
    dlFailed: '처리에 실패했습니다. 잠시 후 다시 시도해 주세요.',
    dlNotConfigured: '다운로드는 현재 준비 중입니다.'
  }
};

/**
 * The library minus anything that talks about quotes or trials: the adoption
 * guide recommends running a PoC, and the whitepaper's pricing and policy tabs
 * are hidden by the reader.
 */
export const EXPO_DOC_IDS = [
  'arch-whitepaper',
  'smartfactory-manual',
  'a2lab-manual',
  'consensebot-manual',
  'b2lab-spec'
] as const;

/** The whitepaper's catalog summary advertises its pricing section. */
export const EXPO_SUMMARY_OVERRIDES: Record<Language, Record<string, string>> = {
  ja: {
    'arch-whitepaper':
      'ハイブリッド展開の境界、Plug & Play 5大規約、無停止パッチ原則をインタラクティブに解説します。'
  },
  en: {
    'arch-whitepaper':
      'An interactive walkthrough of the hybrid deployment boundary, the five Plug & Play contracts and the zero-downtime patch principles.'
  },
  ko: {
    'arch-whitepaper':
      '하이브리드 배포 경계, Plug & Play 5대 규약, 무중단 패치 원칙을 인터랙티브하게 설명합니다.'
  }
};
