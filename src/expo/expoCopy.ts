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
    footer: 'ArcOS by IMPIX'
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
    footer: 'ArcOS by IMPIX'
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
    footer: 'ArcOS by IMPIX'
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
