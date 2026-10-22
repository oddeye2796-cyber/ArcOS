import { Language } from '../i18n/translations';
import { AppItem } from '../types';
import { getLocalizedAppDesc, getLocalizedAppDetail } from '../i18n/localizedData';

/**
 * The catalog was written for a buyer building a quote, so a few sentences in
 * otherwise neutral product copy talk about billing ("priced separately from
 * the platform base fee"). The exhibition edition shows no pricing, so those
 * are removed here instead of editing the shared tables the marketplace reads.
 */
const PRICING_SENTENCE = /基本料|購読料|料金|価格|課金|기본료|구독료|과금|가격|책정|base fee|priced|subscription fee|billing/i;

/** Outcome tiles that quote a licence or subscription saving are pricing claims too. */
const PRICING_OUTCOME = /ライセンス|購読|라이선스|구독|licen[cs]e|subscription/i;

export function isPricingOutcome(value: string, label: string): boolean {
  return PRICING_OUTCOME.test(`${value} ${label}`);
}

function dropPricingSentences(text: string, lang: Language): string {
  const sentences = text.split(/(?<=[。.!?])\s*/).filter((s) => s.length > 0);
  const kept = sentences.filter((s) => !PRICING_SENTENCE.test(s));
  return kept.join(lang === 'ja' ? '' : ' ');
}

/**
 * Single-sentence descriptions cannot lose a sentence without losing
 * everything, so the ones that mention a fee are restated here.
 */
const DESC_OVERRIDES: Record<string, Record<Language, string>> = {
  arcforge: {
    ja: '既製のMESスイートを導入せず、社内IT要員がARCFORGE(ノーコード/ローコード)で工程画面・作業指示書・モバイルビューを自ら作成する、B²LABオントロジー基盤上の100%カスタムプラットフォームです。',
    en: 'Instead of adopting an off-the-shelf MES suite, in-house IT staff build process screens, work instructions and mobile views themselves with ARCFORGE (No-Code/Low-Code) — a 100% custom platform on top of the B²LAB ontology.',
    ko: '기성 제조 운영 스위트(MES)를 도입하지 않고, 사내 IT 인력이 ARCFORGE(No-Code/Low-Code)로 공정 화면·작업 지시서·모바일 뷰를 직접 개발하는 B²LAB 온톨로지 기반 100% 맞춤형 플랫폼입니다.'
  }
};

export function expoAppDesc(app: AppItem, lang: Language): string {
  const override = DESC_OVERRIDES[app.id]?.[lang];
  if (override) return override;
  const desc = getLocalizedAppDesc(app, lang);
  return dropPricingSentences(desc, lang) || desc;
}

export function expoAppDetail(app: AppItem, lang: Language): string {
  const detail = getLocalizedAppDetail(app, lang);
  return dropPricingSentences(detail, lang) || detail;
}
