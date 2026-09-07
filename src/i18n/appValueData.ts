import { Language } from './translations';

/**
 * "Why adopt this" content for the app detail modal.
 *
 * The modal's existing four-point check answers whether a module *can* be
 * installed; nothing answered whether it *should* be. This fills that gap at the
 * moment the decision is actually made, rather than in a document the person
 * building a quote would never navigate away to read.
 *
 * Authored per language rather than translated from Korean at render time: this
 * is marketing-adjacent copy where a literal translation reads wrong.
 */

interface Outcome {
  /** Headline figure, kept short enough to render as a tile. */
  value: string;
  label: string;
}

interface ValueProp {
  headline: string;
  outcomes: Outcome[];
  useCases: string[];
}

type LocalizedValueProp = Record<Language, ValueProp>;

const APP_VALUE_PROPS: Record<string, LocalizedValueProp> = {
  smartfactory: {
    ko: {
      headline: '업종 규제에 맞는 MES를 골라 얹고, 기존 설비 교체 없이 공정 기록을 표준화합니다.',
      outcomes: [
        { value: '24종', label: '업종별 조합 구성' },
        { value: '0건', label: '레거시 DB 직접 연결' },
        { value: '주 단위', label: '라인 확장 반영 주기' }
      ],
      useCases: [
        '제약·바이오: GMP 밸리데이션과 배치 기록을 전자화하고 실사 대응 자료를 즉시 추출',
        '식품·화장품: HACCP 중요관리점(CCP) 계측을 자동 기록해 위생 점검 준비 시간을 단축',
        '일반 제조: 라인별 생산 실적과 불량 사유를 한 화면에서 집계'
      ]
    },
    en: {
      headline:
        'Pick the MES edition your regulator expects and standardise process records without replacing a single machine.',
      outcomes: [
        { value: '24', label: 'industry combinations' },
        { value: 'Zero', label: 'direct legacy DB coupling' },
        { value: 'Weekly', label: 'line expansion turnaround' }
      ],
      useCases: [
        'Pharma/bio: digitise GMP validation and batch records, and pull inspection evidence on demand',
        'Food/cosmetics: log HACCP critical control points automatically and cut audit preparation time',
        'General manufacturing: consolidate per-line output and defect causes on one screen'
      ]
    },
    ja: {
      headline:
        '業種の規制に合ったMESを選んで載せ、既存設備を入れ替えずに工程記録を標準化します。',
      outcomes: [
        { value: '24種', label: '業種別の組合せ構成' },
        { value: '0件', label: 'レガシーDBへの直接接続' },
        { value: '週単位', label: 'ライン拡張の反映周期' }
      ],
      useCases: [
        '製薬・バイオ: GMPバリデーションとバッチ記録を電子化し、査察対応資料を即座に抽出',
        '食品・化粧品: HACCP重要管理点(CCP)の計測を自動記録し、衛生点検の準備時間を短縮',
        '一般製造: ラインごとの生産実績と不良要因を一画面で集計'
      ]
    }
  },

  a2lab: {
    ko: {
      headline: '현장 엔지니어가 파이썬 없이 품질·설비 예측 모델을 직접 만들어 배포합니다.',
      outcomes: [
        { value: '노코드', label: '모델 제작 방식' },
        { value: '사내', label: '학습 데이터 처리 위치' },
        { value: '분 단위', label: '모델 재학습 주기' }
      ],
      useCases: [
        '압출·사출 공정의 두께 불량을 사전 예측해 폐기 물량을 줄임',
        '설비 진동·전류 패턴으로 고장 시점을 예측해 계획 정비로 전환',
        '데이터 사이언스 인력 없이 도메인 엔지니어가 모델을 유지보수'
      ]
    },
    en: {
      headline:
        'Let process engineers build and ship quality and maintenance models themselves, without writing Python.',
      outcomes: [
        { value: 'No-code', label: 'model authoring' },
        { value: 'On-prem', label: 'training data stays put' },
        { value: 'Minutes', label: 'retraining cycle' }
      ],
      useCases: [
        'Predict thickness defects in extrusion and injection lines before scrap is produced',
        'Turn unplanned failures into scheduled maintenance using vibration and current patterns',
        'Keep models maintained by domain engineers, with no data science headcount'
      ]
    },
    ja: {
      headline: '現場エンジニアがPythonなしで品質・設備予測モデルを自ら作成し展開できます。',
      outcomes: [
        { value: 'ノーコード', label: 'モデル作成方式' },
        { value: '社内', label: '学習データの処理場所' },
        { value: '分単位', label: 'モデル再学習の周期' }
      ],
      useCases: [
        '押出・射出工程の厚み不良を事前予測し廃棄量を削減',
        '設備の振動・電流パターンから故障時期を予測し計画保全へ移行',
        'データサイエンス要員なしでドメインエンジニアがモデルを保守'
      ]
    }
  },

  orch: {
    ko: {
      headline: '여러 AI 에이전트의 상충하는 제어 판단을 교차 검증하고 안전 게이트로 중재합니다.',
      outcomes: [
        { value: '3개+', label: '동시 조율 에이전트' },
        { value: '승인 게이트', label: '안전 임계치 초과 명령' },
        { value: '전량 기록', label: '판단 근거 감사 추적' }
      ],
      useCases: [
        '품질 에이전트의 속도 저하 요구와 생산 에이전트의 증산 요구를 중재',
        '에너지 절감 제어가 공정 품질을 해치지 않도록 상호 검증',
        '자동 제어 결정의 근거를 사후에 추적해 사고 원인을 규명'
      ]
    },
    en: {
      headline:
        'Cross-check conflicting decisions from multiple AI agents and arbitrate them behind a safety gate.',
      outcomes: [
        { value: '3+', label: 'agents orchestrated' },
        { value: 'Approval gate', label: 'for over-threshold commands' },
        { value: 'Full trail', label: 'of decision rationale' }
      ],
      useCases: [
        'Arbitrate between a quality agent asking to slow down and a throughput agent asking to speed up',
        'Verify that energy-saving control does not degrade process quality',
        'Trace the rationale behind an automated decision when investigating an incident'
      ]
    },
    ja: {
      headline: '複数のAIエージェントの相反する制御判断を相互検証し、安全ゲートで調停します。',
      outcomes: [
        { value: '3個以上', label: '同時調整エージェント' },
        { value: '承認ゲート', label: '安全閾値超過コマンド' },
        { value: '全件記録', label: '判断根拠の監査証跡' }
      ],
      useCases: [
        '品質エージェントの減速要求と生産エージェントの増産要求を調停',
        '省エネ制御が工程品質を損なわないよう相互検証',
        '自動制御判断の根拠を事後追跡し、事故原因を究明'
      ]
    }
  },

  consensbot: {
    ko: {
      headline: '사내 기준서와 제조 지침을 학습한 sLM이 폐쇄망 안에서 일탈 원인 분석과 감사 답변을 작성합니다.',
      outcomes: [
        { value: '0바이트', label: '외부 클라우드 전송량' },
        { value: '0.9초', label: '질의 응답 지연' },
        { value: '근거 링크', label: '모든 답변에 출처 첨부' }
      ],
      useCases: [
        '식약처·FDA 실사 질의에 사내 SOP 근거를 붙여 즉시 답변 초안 작성',
        '배치 일탈 발생 시 관련 기준서 조항을 자동 대조해 원인 후보 제시',
        '신입 작업자가 표준 작업 절차를 자연어로 질의'
      ]
    },
    en: {
      headline:
        'An sLM trained on your own SOPs drafts deviation analyses and audit answers, entirely inside the firewall.',
      outcomes: [
        { value: '0 bytes', label: 'sent to external clouds' },
        { value: '0.9s', label: 'question-answer latency' },
        { value: 'Cited', label: 'sources on every answer' }
      ],
      useCases: [
        'Draft answers to MFDS and FDA inspection queries with the governing SOP clause attached',
        'Surface likely root causes for a batch deviation by matching it against the relevant standards',
        'Let new operators ask about standard work procedures in plain language'
      ]
    },
    ja: {
      headline:
        '社内規程と製造指針を学習したsLMが、閉域網の中で逸脱の原因分析と監査回答を作成します。',
      outcomes: [
        { value: '0バイト', label: '外部クラウドへの送信量' },
        { value: '0.9秒', label: '質疑応答のレイテンシ' },
        { value: '根拠リンク', label: '全回答に出典を添付' }
      ],
      useCases: [
        '食薬処・FDA査察の質問に社内SOPの根拠を添えて即座に回答案を作成',
        'バッチ逸脱の発生時、関連規程条項を自動照合して原因候補を提示',
        '新人作業者が標準作業手順を自然言語で照会'
      ]
    }
  },

  aesg: {
    ko: {
      headline: '실시간 전력·유틸리티 계측으로 피크 부하를 억제하고 온실가스 배출량 산정을 자동화합니다.',
      outcomes: [
        { value: '8%', label: '월 에너지 비용 절감' },
        { value: '실시간', label: '계측점 수집 주기' },
        { value: '자동', label: '배출량 인벤토리 산정' }
      ],
      useCases: [
        '열처리·주조 등 에너지 다소비 설비의 피크 부하를 동적 차단해 기본요금 절감',
        '공장 유해가스·누출 위험을 비전 AI로 상시 감시',
        'ESG 공시용 온실가스 인벤토리를 계측 데이터에서 직접 산출'
      ]
    },
    en: {
      headline:
        'Shave peak demand from live power and utility metering, and produce your emissions inventory automatically.',
      outcomes: [
        { value: '8%', label: 'monthly energy cost saved' },
        { value: 'Real-time', label: 'metering point ingestion' },
        { value: 'Automatic', label: 'emissions inventory' }
      ],
      useCases: [
        'Cut demand charges by dynamically curtailing peak load on heat treatment and casting equipment',
        'Monitor hazardous gas and leak risk continuously with vision AI',
        'Derive the greenhouse gas inventory for ESG disclosure straight from metering data'
      ]
    },
    ja: {
      headline:
        'リアルタイムの電力・ユーティリティ計測でピーク負荷を抑制し、温室効果ガス排出量の算定を自動化します。',
      outcomes: [
        { value: '8%', label: '月間エネルギーコスト削減' },
        { value: 'リアルタイム', label: '計測点の収集周期' },
        { value: '自動', label: '排出量インベントリ算定' }
      ],
      useCases: [
        '熱処理・鋳造などエネルギー多消費設備のピーク負荷を動的に抑制し基本料金を削減',
        '工場の有害ガス・漏洩リスクをビジョンAIで常時監視',
        'ESG開示用の温室効果ガスインベントリを計測データから直接算出'
      ]
    }
  },

  twin: {
    ko: {
      headline: '현장 설비 상태를 3D로 재현해 원격에서 라인 가동 상황을 한눈에 파악합니다.',
      outcomes: [
        { value: '60 FPS', label: '텔레메트리 렌더링' },
        { value: '4.1ms', label: '온톨로지 스트림 지연' },
        { value: '원격', label: '다중 사업장 관제' }
      ],
      useCases: [
        '지리적으로 흩어진 사업장의 라인 가동률을 본사에서 통합 관제',
        '설비 배치 변경을 실제 시공 전에 시뮬레이션',
        '현장에 가지 않고 이상 발생 지점을 시각적으로 특정'
      ]
    },
    en: {
      headline:
        'Mirror equipment state in 3D so line status across sites is legible from anywhere.',
      outcomes: [
        { value: '60 FPS', label: 'telemetry rendering' },
        { value: '4.1ms', label: 'ontology stream latency' },
        { value: 'Remote', label: 'multi-site supervision' }
      ],
      useCases: [
        'Supervise utilisation across geographically scattered plants from head office',
        'Simulate an equipment layout change before anything is physically moved',
        'Pinpoint where an anomaly occurred without travelling to the floor'
      ]
    },
    ja: {
      headline: '現場設備の状態を3Dで再現し、遠隔からライン稼働状況を一目で把握します。',
      outcomes: [
        { value: '60 FPS', label: 'テレメトリ描画' },
        { value: '4.1ms', label: 'オントロジーストリーム遅延' },
        { value: '遠隔', label: '複数事業所の管制' }
      ],
      useCases: [
        '地理的に分散した事業所のライン稼働率を本社で統合管制',
        '設備レイアウト変更を実際の施工前にシミュレーション',
        '現場に行かずに異常発生箇所を視覚的に特定'
      ]
    }
  },

  arcmind: {
    ko: {
      headline: '사내 IT 인력이 기성 MES에 종속되지 않고 공정 화면을 직접 만들어 운영합니다.',
      outcomes: [
        { value: '드래그앤드롭', label: '화면 제작 방식' },
        { value: '24종', label: '기본 제공 템플릿' },
        { value: '구독료 0', label: '기성 MES 라이선스' }
      ],
      useCases: [
        '표준 MES로 표현이 안 되는 고유 공정을 사내에서 직접 화면화',
        '현장 요구 변경을 외주 개발 대기 없이 당일 반영',
        '모바일 태블릿과 대형 현황판을 같은 컴포넌트로 구성'
      ]
    },
    en: {
      headline:
        'Let your own IT team build and run process screens instead of being locked into a packaged MES.',
      outcomes: [
        { value: 'Drag & drop', label: 'screen authoring' },
        { value: '24', label: 'built-in templates' },
        { value: 'No', label: 'packaged MES licence' }
      ],
      useCases: [
        'Model a proprietary process that a standard MES cannot express, in house',
        'Ship a shopfloor change the same day instead of queueing for an outside vendor',
        'Build tablet views and large status boards from the same components'
      ]
    },
    ja: {
      headline: '社内IT要員が既製MESに縛られず、工程画面を自ら作成・運用できます。',
      outcomes: [
        { value: 'ドラッグ&ドロップ', label: '画面作成方式' },
        { value: '24種', label: '標準提供テンプレート' },
        { value: '購読料 0', label: '既製MESライセンス' }
      ],
      useCases: [
        '標準MESでは表現できない独自工程を社内で直接画面化',
        '現場要求の変更を外注開発の待ちなしに当日反映',
        'モバイルタブレットと大型状況ボードを同じコンポーネントで構成'
      ]
    }
  },

  b2lab: {
    ko: {
      headline: '앱이 레거시 DB를 직접 보지 않도록 온톨로지 계층을 두어, 새 모듈 추가에 기존 코드를 건드리지 않습니다.',
      outcomes: [
        { value: 'AAS/OPC-UA', label: '표준 스키마 준수' },
        { value: '50,000/s', label: '센서 태그 수집 처리량' },
        { value: '무수정', label: '모듈 추가 시 기존 코드' }
      ],
      useCases: [
        '고객사마다 다른 DB 구조를 앱이 알 필요 없게 추상화',
        '설비 교체나 벤더 변경 시 앱이 아닌 매핑 계층만 수정',
        '전 사업장 계측 데이터를 하나의 표준 어휘로 질의'
      ]
    },
    en: {
      headline:
        'An ontology layer keeps apps off your legacy databases, so adding a module never means editing existing code.',
      outcomes: [
        { value: 'AAS/OPC-UA', label: 'standard schema compliance' },
        { value: '50,000/s', label: 'sensor tag ingestion' },
        { value: 'Untouched', label: 'existing code on module add' }
      ],
      useCases: [
        'Abstract away the fact that every customer has a differently shaped database',
        'Absorb an equipment or vendor change in the mapping layer instead of in every app',
        'Query metering data from every site through one standard vocabulary'
      ]
    },
    ja: {
      headline:
        'アプリがレガシーDBを直接参照しないようオントロジー層を置き、新規モジュール追加時に既存コードを触りません。',
      outcomes: [
        { value: 'AAS/OPC-UA', label: '標準スキーマ準拠' },
        { value: '50,000/s', label: 'センサータグ収集処理量' },
        { value: '無修正', label: 'モジュール追加時の既存コード' }
      ],
      useCases: [
        '顧客ごとに異なるDB構造をアプリが知る必要のない形に抽象化',
        '設備交換やベンダー変更時にアプリではなくマッピング層のみを修正',
        '全事業所の計測データを単一の標準語彙で照会'
      ]
    }
  }
};

export function getAppValueProp(appId: string, lang?: Language | string): ValueProp | null {
  const l: Language = lang === 'ja' || lang === 'en' ? lang : 'ko';
  return APP_VALUE_PROPS[appId]?.[l] ?? null;
}
