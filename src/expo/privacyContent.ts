import { Language } from '../i18n/translations';

/**
 * Privacy policy for the exhibition edition, drafted against Japan's Act on the
 * Protection of Personal Information (APPI) disclosure items. A draft: it needs
 * review by someone qualified in Japanese privacy law before it is relied on.
 *
 * Facts that must stay true of the implementation, since the text states them:
 *   - only the email address, product/kind/language and the consent record are
 *     collected (expo.downloads);
 *   - records are deleted after RETENTION_YEARS (expo.purge_expired());
 *   - the data sits in Supabase's Seoul region (ap-northeast-2).
 */
export const PRIVACY_UPDATED_AT = '2026-10-22';
export const RETENTION_YEARS = 1;

export const OPERATOR = {
  name: 'IMPIX',
  representative: '이상호',
  address: '서울시 동대문구 천호대로375 학인빌딩 3F',
  tel: '+82-02-745-8324',
  fax: '+82-02-745-8327',
  email: 'pmo@impix.co.kr'
} as const;

export interface PrivacySection {
  heading: string;
  body?: string;
  items?: string[];
}

export interface PrivacyContent {
  title: string;
  updated: string;
  intro: string;
  sections: PrivacySection[];
  contactLabels: { operator: string; representative: string; address: string; tel: string; fax: string; email: string };
}

export const PRIVACY_CONTENT: Record<Language, PrivacyContent> = {
  ja: {
    title: 'プライバシーポリシー',
    updated: `制定日: ${PRIVACY_UPDATED_AT}`,
    intro:
      `${OPERATOR.name}(以下「当社」)は、ArcOS 製品紹介サイトで資料をダウンロードされる方の個人情報を、個人情報の保護に関する法律(個人情報保護法)に従って取り扱います。`,
    contactLabels: {
      operator: '事業者名',
      representative: '代表者',
      address: '所在地',
      tel: '電話',
      fax: 'FAX',
      email: 'メール'
    },
    sections: [
      {
        heading: '1. 事業者情報',
        body: '事業者名・所在地・代表者・お問い合わせ窓口は、下記「お問い合わせ窓口」に記載のとおりです。'
      },
      {
        heading: '2. 取得する情報',
        items: [
          '資料のダウンロード時に入力されたメールアドレス',
          'ダウンロードされた資料(製品・種類・言語)と日時',
          '個人情報の取扱いに同意された記録(同意文言の版を含む)'
        ]
      },
      {
        heading: '3. 利用目的',
        items: ['当社製品に関する情報のご案内', 'お問い合わせへの対応', '資料の提供状況の記録・管理']
      },
      {
        heading: '4. 保管期間',
        body: `取得したメールアドレスは、取得日から${RETENTION_YEARS}年間保管します。利用目的を達成した場合は、この期間内であっても遅滞なく削除するよう努めます。保管期間を過ぎたデータは削除します。`
      },
      {
        heading: '5. 第三者提供',
        body: '法令に基づく場合を除き、ご本人の同意なく個人データを第三者に提供しません。'
      },
      {
        heading: '6. 保管場所と委託',
        body: '取得した情報は、当社が利用するクラウドサービス(Supabase、保管地域: 大韓民国・ソウル)上で管理します。当社の所在地も大韓民国であり、情報は日本国外で取り扱われます。'
      },
      {
        heading: '7. 安全管理措置',
        items: [
          '通信の暗号化(HTTPS)',
          'データベースへのアクセスを権限のある担当者に限定',
          'ブラウザから直接データを読み書きできない構成',
          '資料は期限付きの専用リンクでのみ提供'
        ]
      },
      {
        heading: '8. 開示・訂正・利用停止等のご請求',
        body: 'ご本人からの保有個人データの開示、訂正、追加、削除、利用停止等のご請求は、下記窓口へメールでご連絡ください。ご本人確認のうえ、法令に従い対応します。'
      },
      {
        heading: '9. Cookie等について',
        body: '本サイトは、表示言語の設定をお使いのブラウザに保存しますが、個人を特定する情報は含まれません。広告・解析目的の Cookie は使用していません。'
      },
      {
        heading: '10. 改定',
        body: '本ポリシーは、必要に応じて改定します。改定後は本ページに掲載します。'
      },
      {
        heading: 'お問い合わせ窓口',
        body: '個人情報の取扱いに関するお問い合わせ・苦情は、下記までご連絡ください。'
      }
    ]
  },
  en: {
    title: 'Privacy Policy',
    updated: `Established: ${PRIVACY_UPDATED_AT}`,
    intro:
      `${OPERATOR.name} ("we") handles the personal information of people who download documents from the ArcOS product site in accordance with Japan's Act on the Protection of Personal Information.`,
    contactLabels: {
      operator: 'Operator',
      representative: 'Representative',
      address: 'Address',
      tel: 'Tel',
      fax: 'Fax',
      email: 'Email'
    },
    sections: [
      {
        heading: '1. Operator',
        body: 'The operator, address, representative and contact point are listed under "Contact" below.'
      },
      {
        heading: '2. Information we collect',
        items: [
          'The email address you enter when downloading a document',
          'Which document you downloaded (product, type, language) and when',
          'A record of your consent to this handling, including the version of the consent wording'
        ]
      },
      {
        heading: '3. Purposes of use',
        items: [
          'Sending information about our products',
          'Responding to inquiries',
          'Recording and managing the provision of documents'
        ]
      },
      {
        heading: '4. Retention period',
        body: `We keep your email address for ${RETENTION_YEARS} year from the date we collect it. If the purposes of use are achieved sooner, we will make an effort to delete it without delay. Data past the retention period is deleted.`
      },
      {
        heading: '5. Disclosure to third parties',
        body: 'We do not provide personal data to third parties without your consent, except where required by law.'
      },
      {
        heading: '6. Where data is kept, and processors',
        body: 'The information is managed on a cloud service we use (Supabase, region: Seoul, Republic of Korea). We are also located in the Republic of Korea, so the information is handled outside Japan.'
      },
      {
        heading: '7. Security measures',
        items: [
          'Encrypted communication (HTTPS)',
          'Database access limited to authorized staff',
          'A design in which the data cannot be read or written directly from a browser',
          'Documents are delivered only through short-lived dedicated links'
        ]
      },
      {
        heading: '8. Requests for disclosure, correction, suspension of use, etc.',
        body: 'To request disclosure, correction, addition, deletion or suspension of use of your retained personal data, email the contact point below. We will respond in accordance with the law after verifying your identity.'
      },
      {
        heading: '9. Cookies',
        body: 'This site stores your display-language setting in your browser; it contains nothing that identifies you. We do not use advertising or analytics cookies.'
      },
      {
        heading: '10. Changes',
        body: 'We may revise this policy as needed. Revisions will be posted on this page.'
      },
      {
        heading: 'Contact',
        body: 'For inquiries or complaints about the handling of personal information, contact us as follows.'
      }
    ]
  },
  ko: {
    title: '개인정보 처리방침',
    updated: `제정일: ${PRIVACY_UPDATED_AT}`,
    intro:
      `${OPERATOR.name}(이하 "당사")는 ArcOS 제품 소개 사이트에서 자료를 다운로드하는 분의 개인정보를 일본 개인정보보호법(APPI)에 따라 취급합니다.`,
    contactLabels: {
      operator: '사업자명',
      representative: '대표자',
      address: '소재지',
      tel: '전화',
      fax: '팩스',
      email: '이메일'
    },
    sections: [
      {
        heading: '1. 사업자 정보',
        body: '사업자명, 소재지, 대표자, 문의 창구는 아래 "문의 창구"에 기재한 대로입니다.'
      },
      {
        heading: '2. 수집하는 정보',
        items: [
          '자료를 다운로드할 때 입력한 이메일 주소',
          '다운로드한 자료(제품·종류·언어)와 일시',
          '개인정보 취급에 동의한 기록(동의 문구의 버전 포함)'
        ]
      },
      {
        heading: '3. 이용 목적',
        items: ['당사 제품 정보 안내', '문의 대응', '자료 제공 현황의 기록·관리']
      },
      {
        heading: '4. 보관 기간',
        body: `수집한 이메일 주소는 수집일로부터 ${RETENTION_YEARS}년간 보관합니다. 이용 목적을 달성한 경우에는 이 기간 내라도 지체 없이 삭제하도록 노력합니다. 보관 기간이 지난 데이터는 삭제합니다.`
      },
      {
        heading: '5. 제3자 제공',
        body: '법령에 근거한 경우를 제외하고, 본인의 동의 없이 개인 데이터를 제3자에게 제공하지 않습니다.'
      },
      {
        heading: '6. 보관 장소와 위탁',
        body: '수집한 정보는 당사가 이용하는 클라우드 서비스(Supabase, 보관 지역: 대한민국 서울)에서 관리합니다. 당사의 소재지도 대한민국이며, 정보는 일본 국외에서 취급됩니다.'
      },
      {
        heading: '7. 안전관리 조치',
        items: [
          '통신 암호화(HTTPS)',
          '데이터베이스 접근을 권한 있는 담당자로 한정',
          '브라우저에서 데이터를 직접 읽거나 쓸 수 없는 구조',
          '자료는 기한이 있는 전용 링크로만 제공'
        ]
      },
      {
        heading: '8. 열람·정정·이용정지 등의 청구',
        body: '보유 개인데이터의 열람, 정정, 추가, 삭제, 이용정지 등을 청구하시려면 아래 창구로 이메일을 보내 주세요. 본인 확인 후 법령에 따라 대응합니다.'
      },
      {
        heading: '9. 쿠키 등',
        body: '본 사이트는 표시 언어 설정을 사용 중인 브라우저에 저장하지만, 개인을 식별하는 정보는 포함되지 않습니다. 광고·분석 목적의 쿠키는 사용하지 않습니다.'
      },
      {
        heading: '10. 개정',
        body: '본 방침은 필요에 따라 개정할 수 있으며, 개정 후에는 이 페이지에 게시합니다.'
      },
      {
        heading: '문의 창구',
        body: '개인정보 취급에 관한 문의·불만은 아래로 연락해 주세요.'
      }
    ]
  }
};
