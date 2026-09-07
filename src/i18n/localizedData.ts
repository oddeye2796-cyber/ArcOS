import { Language } from './translations';
import { AppItem, RecommendationPreset, FacilityLocation } from '../types';

interface LocalizedString {
  ko: string;
  en: string;
  ja: string;
}

interface AppLocalization {
  name?: LocalizedString;
  categoryLabel?: LocalizedString;
  desc?: LocalizedString;
  detail?: LocalizedString;
  unit?: LocalizedString;
}

const APP_LOCALIZATIONS: Record<string, AppLocalization> = {
  smartfactory: {
    name: { ko: 'Smart Factory', en: 'Smart Factory Suite', ja: 'Smart Factory スイート' },
    categoryLabel: { ko: '제조 운영 스위트', en: 'Manufacturing Operation Suite', ja: '製造運用スイート' },
    desc: {
      ko: '업종에 맞는 MES와 품질·기록 모듈을 골라 구성하는 제조 운영 스위트',
      en: 'Modular MES suite customized with industry-specific quality and record modules',
      ja: '業種に合わせたMESと品質・記録モジュールを選択して構成する製造運用スイート'
    },
    detail: {
      ko: '일반 제조, 식품·화장품, 제약 바이오 등 산업군별 규제 표준을 준수하는 모듈형 MES 스위트입니다. 생산 현장의 도메인 DB와 직접 연결되지 않고, B²LAB 온톨로지 계층을 경유하여 무중단 플러그앤플레이 연동을 지원합니다.',
      en: 'Modular MES suite compliant with industry standards across general manufacturing, food/cosmetics, and pharma/biotech. Interacts strictly via the B²LAB ontology layer rather than direct legacy DB connections, enabling zero-downtime plug-and-play integration.',
      ja: '一般製造、食品・化粧品、製薬・バイオ等の産業別規制標準に準拠するモジュール型MESスイートです。製造現場のドメインDBと直接結合せず、B²LABオントロジー層を経由することで無停止プラグ＆プレイ連係を実現します。'
    },
    unit: { ko: '모듈별 개별 과금', en: 'Per-module pricing', ja: 'モジュール別従量課金' }
  },
  a2lab: {
    name: { ko: 'A²LAB (AI 모듈 생성기)', en: 'A²LAB (AI Model Generator)', ja: 'A²LAB (AIモデル生成)' },
    categoryLabel: { ko: 'AI 모듈 생성', en: 'AI Module Generation', ja: 'AIモデル生成' },
    desc: {
      ko: '노코드로 품질 예측, 설비 예지보전 같은 산업용 AI 에이전트 모듈을 제작·학습합니다',
      en: 'Build and train industrial AI agent modules like predictive quality and maintenance with no-code',
      ja: 'ノーコードで品質予測や設備予知保全などの産業用AIエージェントモジュールを作成・学習'
    },
    detail: {
      ko: '도메인 엔지니어가 파이썬 코딩 없이 웹 화면에서 직관적으로 고유 데이터셋을 업로드하고 오토ML 파이프라인을 구동합니다. 생성된 경량 모델은 온프레미스 노드에 패키징되어 실시간 추론을 수행합니다.',
      en: 'Empowers domain engineers to upload datasets and run automated AutoML pipelines directly in a web UI without Python code. Generated lightweight models are packaged to on-premise nodes for sub-millisecond real-time inference.',
      ja: 'ドメインエンジニアがPythonコーディングなしでWeb画面から直感的にデータセットをアップロードし、AutoMLパイプラインを実行。生成された軽量モデルはオンプレミスノードにパッケージ化されリアルタイム推論を実行します。'
    },
    unit: { ko: '기본료 + 추론 종량', en: 'Base fee + Inference usage', ja: '基本料＋推論従量' }
  },
  orch: {
    name: { ko: '다중 AI Agent 슈퍼바이저', en: 'Multi-AI Agent Supervisor', ja: 'マルチAI Agent スーパーバイザー' },
    categoryLabel: { ko: 'AI 오케스트레이션', en: 'AI Orchestration', ja: 'AIオーケストレーション' },
    desc: {
      ko: 'A²LAB에서 생성된 여러 도메인 특화 에이전트의 판단을 교차검증하고 공정 제어를 조율합니다',
      en: 'Cross-verifies decisions of domain-specific agents from A²LAB and orchestrates process control',
      ja: 'A²LABで生成された各ドメイン特化エージェントの判断を相互検証し、工程制御を調整'
    },
    detail: {
      ko: '품질 진단 에이전트, 에너지 절감 에이전트, 물류 디스패치 에이전트 간의 상충되는 제어 결정을 감시하고 중재합니다. 안전 임계치를 초과하는 명령은 사내 안전 관리자 승인 게이트를 통해서만 발령됩니다.',
      en: 'Monitors and arbitrates conflicting decisions between quality inspection, energy saving, and AGV dispatch agents. Control commands exceeding safety thresholds strictly require on-site operator approval gates.',
      ja: '品質診断、省エネ、物流ディスパッチエージェント間の相反する制御判断を監視・調停。安全閾値を超えるコマンドは現場の安全管理者承認ゲートを経由してのみ実行されます。'
    },
    unit: { ko: '활성 에이전트 모듈 수', en: 'Per active agent module', ja: '稼働エージェント数' }
  },
  consensbot: {
    name: { ko: '컨센스봇 (ConsensBot)', en: 'ConsensBot (Regulatory sLM)', ja: 'コンセンスボット (ConsensBot)' },
    categoryLabel: { ko: '온프레미스 sLM', en: 'On-premise sLM', ja: 'オンプレミス sLM' },
    desc: {
      ko: '사내 규정 및 제조 지침서를 완벽 학습해 공정 일탈 원인 분석 및 감사 보고서 초안을 작성합니다',
      en: 'Learns in-house SOPs and GMP guidelines to analyze deviations and draft audit reports',
      ja: '社内規程および製造指針書を完全学習し、工程逸脱原因の分析や監査報告書ドラフトを作成'
    },
    detail: {
      ko: '외부 클라우드로 내부 문서를 단 1바이트도 전송하지 않는 온프레미스 전용 도메인 특화 경량 언어모델(sLM)입니다. 제약·식품 분야의 까다로운 감사(Audit) 대응 질의응답 및 제조기록서 자동 초안 작성을 근거 문서 링크와 함께 제공합니다.',
      en: 'On-premises specialized small language model (sLM) that guarantees zero bytes of internal SOPs/GMP documents leave the corporate firewall. Rapidly answers audit queries and drafts regulatory compliance reports with source document citations.',
      ja: '社内文書を外部クラウドへ1バイトも送信しないオンプレミス専用の製造特化型小規模言語モデル(sLM)です。製薬・食品の厳格な監査(Audit)対応の質疑応答や製造記録書の自動起案を引用根拠リンク付きで提供します。'
    },
    unit: { ko: '사내 동시 사용자 라이선스', en: 'Concurrent user license', ja: '社内同時ユーザーライセンス' }
  },
  aesg: {
    name: { ko: 'A.ESG / A.Station', en: 'A.ESG / A.Station', ja: 'A.ESG / A.Station' },
    categoryLabel: { ko: '에너지 & ESG', en: 'Energy & ESG', ja: 'エネルギー＆ESG' },
    desc: {
      ko: '공장 내 전력·가스 계측 데이터를 실시간 수집해 탄소 배출량을 감축하고 최대 전력을 제어합니다',
      en: 'Collects real-time electricity and gas metrics to reduce carbon emissions and cap peak power',
      ja: '工場内の電力・ガス計測データをリアルタイム収集し、CO2排出量削減と最大電力を制御'
    },
    detail: {
      ko: '전력 피크 제어와 온실가스 스코프 1·2 인벤토리를 자동 산출합니다. B²LAB 온톨로지의 설비 에너지 프로파일과 연계하여 생산 계획 대비 최적의 에너지 소비 스케줄을 수립합니다.',
      en: 'Automates electrical peak shaving and greenhouse gas Scope 1 & 2 inventory reporting. Correlates with B²LAB ontology machine profiles to balance daily production schedules against energy peak tariffs.',
      ja: 'ピーク電力制御と温室効果ガスScope 1・2インベントリを自動算出。B²LABオントロジーの設備エネルギープロファイルと連係し、生産計画に対する最適なエネルギー消費スケジュールを策定します。'
    },
    unit: { ko: '공장 계측점(Tag) 수', en: 'Per sensor tag', ja: '工場計測点（タグ）数' }
  },
  twin: {
    name: { ko: '디지털 트윈 (Digital Twin)', en: 'Digital Twin (3D Process)', ja: 'デジタルツイン (Digital Twin)' },
    categoryLabel: { ko: '3D 공정 시각화', en: '3D Process Visualization', ja: '3D工程可視化' },
    desc: {
      ko: '공장 설비 배치와 실시간 가동 상태, 병목 구간을 3차원 입체 공간에서 즉각 파악합니다',
      en: 'Visualizes factory layout, real-time machine status, and bottlenecks in an interactive 3D canvas',
      ja: '工場設備レイアウト、リアルタイム稼働状況、ボトルネックを3次元空間で直感的に把握'
    },
    detail: {
      ko: '생산 라인의 센서 값, 불량 알람, 물류 AGV 위치를 3D 웹 캔버스에 실시간 렌더링합니다. 별도의 고가 클라이언트 설치 없이 웹 브라우저에서 직관적인 현장 가상 순찰이 가능합니다.',
      en: 'Renders telemetry, alarm states, and AGV locations on a WebGL 3D canvas in real time. Enables intuitive virtual facility walk-throughs in standard modern browsers without proprietary thick clients.',
      ja: '生産ラインのセンサー計測値、異常アラーム、AGV位置を3D Webキャンバスにリアルタイム描画。高価な専用クライアントを導入することなく、ブラウザ上で直感的な現場の仮想巡回点検が可能です。'
    },
    unit: { ko: '등록 사업장 및 라인 수', en: 'Per facility and line', ja: '登録事業所・ライン数' }
  },
  arcmind: {
    name: { ko: 'ArcMind (노코드/로우코드 플랫폼 빌더)', en: 'ArcMind (No-Code Platform Builder)', ja: 'ArcMind (ノーコード/ローコード開発)' },
    categoryLabel: { ko: '자체 IT 플랫폼 빌더', en: 'In-House IT Platform Builder', ja: '社内ITプラットフォーム開発' },
    desc: {
      ko: '자체 IT 인력을 보유한 기업이 기성 MES 도입 없이 No-Code / Low-Code로 기업 고유의 Smart Factory 플랫폼을 직접 구축하는 전용 빌더',
      en: 'Dedicated builder for enterprises with in-house IT to build proprietary Smart Factory systems via No-Code/Low-Code without off-the-shelf MES',
      ja: '社内IT人材を保有する企業が、既成MESを導入せずNo-Code / Low-Codeで自社独自のSmart Factoryを直接構築する専用ビルダー'
    },
    detail: {
      ko: '자체 IT/전산 인력을 보유한 엔터프라이즈를 위한 전용 빌더입니다. 기성 제조 운영 스위트(MES)를 도입하는 대신, B²LAB 온톨로지 데이터를 기반으로 노코드/로우코드를 통해 작업 지시서, 생산 공정 뷰, 일별 현황판, 로직을 사내 IT 인력이 100% 맞춤 제작합니다. 기성 Smart Factory 스위트와 중복 도입되지 않도록 독립된 자체 구축 경로로 제공됩니다.',
      en: 'A dedicated builder for enterprises with in-house IT engineering teams. Instead of purchasing off-the-shelf MES suites, internal IT teams build 100% tailored work order dispatchers, shopfloor views, daily KPI dashboards, and business logic using No-Code/Low-Code on top of standardized B²LAB ontology data.',
      ja: '自社IT・システム人材を保有するエンタープライズ向けの専用ビルダーです。既製品の製造運用スイート(MES)を導入する代わりに、B²LABオントロジーデータをベースにノーコード/ローコードを活用し、作業指示書、生産工程ビュー、日別ダッシュボード、業務ロジックを社内ITチームが100%独自構築します。既製Smart Factoryスイートとの重複導入を防ぐ独立構築パスとして提供されます。'
    },
    unit: { ko: '엔터프라이즈 빌더 라이선스 (시트 및 작성 권한)', en: 'Enterprise builder license (Seats & authoring)', ja: 'エンタープライズ開発ライセンス (シート及び作成権限)' }
  },
  b2lab: {
    name: { ko: 'B²LAB 온톨로지 데이터레이크', en: 'B²LAB Ontology Datalake', ja: 'B²LAB オントロジーデータレイク' },
    categoryLabel: { ko: '공통 필수 기반', en: 'Mandatory Core Foundation', ja: '共通必須基盤' },
    desc: {
      ko: '다양한 사내 도메인 DB를 표준 온톨로지 스키마로 가상화하여 앱에 제공하는 데이터 척추',
      en: 'Data backbone that virtualizes diverse in-house domain DBs into standard ontology schemas',
      ja: '多様な社内ドメインDBを標準オントロジースキーマに仮想化して提供するデータバックボーン'
    },
    detail: {
      ko: '플랫폼 기본료(월 300만원)에 영구 포함되어 있습니다. AAS, OPC-UA, KS X 9101 표준을 기반으로 사내 이종 DB(MES, ERP, 설비 PLC)를 중계하여, 새 모듈 설치 시에도 기존 시스템 코드를 변경할 필요가 없습니다.',
      en: 'Permanently bundled in the base platform subscription (3.0M KRW/mo). Based on AAS, OPC-UA, and KS X 9101, it mediates heterogeneous legacy DBs (MES, ERP, PLC) so adding new modules requires zero modifications to existing production codes.',
      ja: 'プラットフォーム基本料(月額300万円)に恒久的に付属しています。AAS、OPC-UA、KS X 9101標準に準拠して社内の異機種DB(MES, ERP, PLC)を仲介し、新規モジュール導入時にも既存システムのコード改修が一切不要です。'
    },
    unit: { ko: '플랫폼 기본료에 포함 (해지 불가)', en: 'Included in Base Fee (Permanent)', ja: 'プラットフォーム基本料に付属（解除不可）' }
  }
};

const SUBMODULE_LOCALIZATIONS: Record<string, { name: LocalizedString; desc: LocalizedString; unitLabel: LocalizedString }> = {
  'mes-pharma': {
    name: { ko: '제약 특화 MES', en: 'Pharma-Specific MES', ja: '製薬特化 MES' },
    desc: {
      ko: 'GMP 기준 배치(Batch) 관리, 일탈(Deviation) 처리, 밸리데이션 데이터 추적',
      en: 'GMP batch tracking, deviation handling, and validation data auditing',
      ja: 'GMP基準バッチ(Batch)管理、逸脱(Deviation)処理、バリデーション追跡'
    },
    unitLabel: { ko: '라인당 80만원/월', en: '800k KRW/line/mo', ja: 'ライン毎 80万円/月' }
  },
  'mes-food': {
    name: { ko: '식품·화장품 특화 MES', en: 'Food/Cosmetics MES', ja: '食品・化粧品特化 MES' },
    desc: {
      ko: 'HACCP 중요관리점(CCP) 실시간 자동 기록, 원료 역추적 및 유통기한 관리',
      en: 'HACCP critical control point (CCP) auto-logging, raw material traceability & expiry management',
      ja: 'HACCP重要管理点(CCP)リアルタイム自動記録、原料逆追跡および賞味期限管理'
    },
    unitLabel: { ko: '라인당 60만원/월', en: '600k KRW/line/mo', ja: 'ライン毎 60万円/月' }
  },
  'mes-general': {
    name: { ko: '일반 제조 MES', en: 'General Manufacturing MES', ja: '一般製造 MES' },
    desc: {
      ko: '생산 실행, LOT 실시간 추적, 설비 가동률 분석, N-POP 바코드 연동',
      en: 'Production execution, real-time LOT tracking, OEE utilization analysis, N-POP barcode sync',
      ja: '生産実行、LOTリアルタイム追跡、設備稼働率分析、N-POPバーコード連携'
    },
    unitLabel: { ko: '라인당 40만원/월', en: '400k KRW/line/mo', ja: '라인당 40만원/월' }
  },
  'ebrs': {
    name: { ko: 'EBRS (전자 제조기록)', en: 'EBRS (Electronic Batch Records)', ja: 'EBRS (電子製造記録)' },
    desc: {
      ko: 'FDA 21 CFR Part 11 전자서명 및 감사추적(Audit Trail) 규제 준수 기록 관리',
      en: 'FDA 21 CFR Part 11 electronic signature and audit trail compliance record management',
      ja: 'FDA 21 CFR Part 11 電子署名および監査証跡(Audit Trail)規制準拠記録管理'
    },
    unitLabel: { ko: '기본 120만원/월 (배치량 연동)', en: 'Base 1.2M KRW/mo (Batch scaled)', ja: '基本 120万円/月 (バッチ量連動)' }
  },
  'rems': {
    name: { ko: 'REMS (청정실 환경 모니터링)', en: 'REMS (Cleanroom Environmental Monitoring)', ja: 'REMS (クリーンルーム環境監視)' },
    desc: {
      ko: '차압, 온습도, 미립자 부유 농도 실시간 수집 및 경보 발령',
      en: 'Real-time differential pressure, temperature/humidity, particle count collection & alarms',
      ja: '差圧、温湿度、浮遊微粒子濃度リアルタイム収集および警報発令'
    },
    unitLabel: { ko: '기본 90만원/월 (계측점 연동)', en: 'Base 900k KRW/mo (Sensor point scaled)', ja: '基本 90万円/月 (計測点連動)' }
  },
  'scm': {
    name: { ko: 'SCM (공급망 협업 연계)', en: 'SCM (Supply Chain Collaboration)', ja: 'SCM (サプライチェーン協業連携)' },
    desc: {
      ko: '원자재 발주, 실시간 납기 트래킹, 1·2차 외주 협력사 포털 연동',
      en: 'Raw material procurement, lead time tracking, Tier 1 & 2 subcontractor portal integration',
      ja: '原材料発注、リアルタイム納期追跡、1・2次外注協力会社ポータル連携'
    },
    unitLabel: { ko: '기본 100만원/월 (협력사수 연동)', en: 'Base 1.0M KRW/mo (Partner scaled)', ja: '基本 100万円/月 (協力社数連動)' }
  }
};

const GROUP_LABEL_LOCALIZATIONS: Record<string, LocalizedString> = {
  'MES 코어 (상호 배타적 · 1종 필수 선택)': {
    ko: 'MES 코어 (상호 배타적 · 1종 필수 선택)',
    en: 'MES Core (Mutually Exclusive · 1 Required Selection)',
    ja: 'MESコア (相互排他的・1種必須選択)'
  },
  '품질 · 기록 · 공급망 확장 모듈 (자유 조합)': {
    ko: '품질 · 기록 · 공급망 확장 모듈 (자유 조합)',
    en: 'Quality, Record & SCM Addon Modules (Flexible Combination)',
    ja: '品質・記録・サプライチェーン拡張モジュール (自由構成)'
  }
};

const DEP_LOCALIZATIONS: Record<string, { name: LocalizedString; desc: LocalizedString }> = {
  'B²LAB 온톨로지 데이터레이크': {
    name: { ko: 'B²LAB 온톨로지 데이터레이크', en: 'B²LAB Ontology Datalake', ja: 'B²LAB オントロジーデータレイク' },
    desc: {
      ko: '플랫폼 기본료 포함 (구독 중)',
      en: 'Included in Base Fee (Subscribed)',
      ja: 'プラットフォーム基本料に付属 (契約中)'
    }
  },
  'ArcTunnel mTLS 게이트웨이': {
    name: { ko: 'ArcTunnel mTLS 게이트웨이', en: 'ArcTunnel mTLS Gateway', ja: 'ArcTunnel mTLS ゲートウェイ' },
    desc: {
      ko: '현장 온프레미스 노드 연결됨 (레이턴시 4ms)',
      en: 'On-premises node connected (4ms latency)',
      ja: '現場オンプレミスノード接続済み (レイテンシ 4ms)'
    }
  },
  'KS X 9101 설비 데이터 규격': {
    name: { ko: 'KS X 9101 설비 데이터 규격', en: 'KS X 9101 Equipment Data Standard', ja: 'KS X 9101 設備データ標準規格' },
    desc: {
      ko: '사업장 생산라인 PLC 매핑 검증 완료',
      en: 'Facility production line PLC mapping verified',
      ja: '事業所生産ラインPLCマッピング検証完了'
    }
  },
  'B²LAB 데이터레이크 (AAS 온톨로지)': {
    name: { ko: 'B²LAB 데이터레이크 (AAS 온톨로지)', en: 'B²LAB Datalake (AAS Ontology)', ja: 'B²LAB データレイク (AASオントロジー)' },
    desc: {
      ko: '플랫폼 기본료 포함 (데이터 파이프라인 가동 중)',
      en: 'Included in Base Fee (Active data pipeline)',
      ja: 'プラットフォーム基本料付属 (データパイプライン稼働中)'
    }
  },
  'GPU 가속 추론 노드 (NVIDIA TensorRT)': {
    name: { ko: 'GPU 가속 추론 노드 (NVIDIA TensorRT)', en: 'GPU Acceleration Node (NVIDIA TensorRT)', ja: 'GPUアクセラレーション推論ノード (NVIDIA TensorRT)' },
    desc: {
      ko: '현장 온프레미스 엣지 서버 준비 완료 (L4 GPU)',
      en: 'On-premises edge server ready (L4 GPU)',
      ja: '現場オンプレミスエッジサーバー配備完了 (L4 GPU)'
    }
  },
  'A²LAB (사전 생성된 도메인 모델)': {
    name: { ko: 'A²LAB (사전 생성된 도메인 모델)', en: 'A²LAB (Pre-generated domain models)', ja: 'A²LAB (事前生成済みドメインモデル)' },
    desc: {
      ko: '최소 1개 이상의 특화 AI 모델 생성 필요 (현재 3건 보유)',
      en: 'Requires at least 1 domain model (3 currently deployed)',
      ja: '最低1つ以上の特化AIモデル作成が必要 (現在3件保有)'
    }
  },
  '온프레미스 GPU 추론 서버': {
    name: { ko: '온프레미스 GPU 추론 서버', en: 'On-Premises GPU Inference Server', ja: 'オンプレミスGPU推論サーバー' },
    desc: {
      ko: '현장 사내 NVIDIA L40S 2기 구축 확인됨',
      en: '2x in-house NVIDIA L40S servers verified on-site',
      ja: '現場社内NVIDIA L40S 2基配備確認済み'
    }
  },
  '사내 제조 기준서(SOP) 벡터 색인': {
    name: { ko: '사내 제조 기준서(SOP) 벡터 색인', en: 'In-House SOP Vector Indexing', ja: '社内製造基準書(SOP)ベクトルインデックス' },
    desc: {
      ko: '기준서 342건 중 0건 색인 (설치 후 사내 자동 파싱)',
      en: '0 of 342 SOPs indexed (auto-parsed after local installation)',
      ja: '基準書342件中0件インデックス済み (導入後自動解析)'
    }
  },
  'B²LAB 데이터레이크': {
    name: { ko: 'B²LAB 데이터레이크', en: 'B²LAB Datalake', ja: 'B²LAB データレイク' },
    desc: {
      ko: '구독 중 (플랫폼 기본료)',
      en: 'Subscribed (Base Platform Fee)',
      ja: '契約中 (プラットフォーム基本料)'
    }
  },
  '사내 전력량계/유량계 태그 매핑': {
    name: { ko: '사내 전력량계/유량계 태그 매핑', en: 'In-House Power & Flow Meter Tag Mapping', ja: '社内電力量計/流量計タグマッピング' },
    desc: {
      ko: '계측 태그 48개 중 42개 완료 (6개 추가 필요)',
      en: '42 of 48 measurement tags mapped (6 additional required)',
      ja: '計測タグ48個中42個完了 (6個追加が必要)'
    }
  },
  'Smart Factory MES 또는 A.ESG': {
    name: { ko: 'Smart Factory MES 또는 A.ESG', en: 'Smart Factory MES or A.ESG', ja: 'Smart Factory MES または A.ESG' },
    desc: {
      ko: '사업장 MES 데이터 연동 가능',
      en: 'Facility MES data connection ready',
      ja: '事業所MESデータ連携可能'
    }
  },
  '자체 IT 전산 인력': {
    name: { ko: '자체 IT 전산 인력', en: 'In-House IT Engineering Personnel', ja: '自社IT・システム人材' },
    desc: {
      ko: '사내 No-Code/Low-Code 화면 및 비즈니스 로직 작성 주체',
      en: 'Authors of internal No-Code/Low-Code interfaces & business logic',
      ja: '社内ノーコード/ローコード画面および業務ロジック作成主体'
    }
  }
};

const DATASCOPE_LOCALIZATIONS: Record<string, LocalizedString> = {
  '현장 온프레미스 사내 DB (방화벽 내부 보존)': {
    ko: '현장 온프레미스 사내 DB (방화벽 내부 보존)',
    en: 'On-premises production DB (Kept behind firewall)',
    ja: '現場オンプレミス社内DB (ファイアウォール内保持)'
  },
  '사내 보안 파일서버 (SOP, GMP 규정 문서 342건)': {
    ko: '사내 보안 파일서버 (SOP, GMP 규정 문서 342건)',
    en: 'Secure in-house file server (342 SOP & GMP regulatory docs)',
    ja: '社内セキュリティファイルサーバー (SOP, GMP規定文書342件)'
  },
  'SCADA 및 전력 계측기 시계열 DB (InfluxDB)': {
    ko: 'SCADA 및 전력 계측기 시계열 DB (InfluxDB)',
    en: 'SCADA & power meter time-series DB (InfluxDB)',
    ja: 'SCADAおよび電力計測器時系列DB (InfluxDB)'
  },
  'B²LAB 온톨로지 스트리밍 버스': {
    ko: 'B²LAB 온톨로지 스트리밍 버스',
    en: 'B²LAB Ontology Streaming Bus',
    ja: 'B²LAB オントロジーストリーミングバス'
  },
  'B²LAB 온톨로지 GraphQL & REST API': {
    ko: 'B²LAB 온톨로지 GraphQL & REST API',
    en: 'B²LAB Ontology GraphQL & REST API',
    ja: 'B²LAB オントロジー GraphQL & REST API'
  },
  '사업장 레거시 DB 전체 가상화 인터페이스': {
    ko: '사업장 레거시 DB 전체 가상화 인터페이스',
    en: 'Enterprise legacy DB virtualization interface',
    ja: '事業所レガシーDB全仮想化インターフェース'
  },
  'ArcMind JSON Schema 컴포넌트 규약 (KS X 9101 매핑)': {
    ko: 'ArcMind JSON Schema 컴포넌트 규약 (KS X 9101 매핑)',
    en: 'ArcMind JSON Schema component spec (KS X 9101 mapped)',
    ja: 'ArcMind JSON Schema コンポーネント規約 (KS X 9101 マッピング)'
  },
  'PDF/Docx 온톨로지 청킹 및 사내 Milvus 벡터DB': {
    ko: 'PDF/Docx 온톨로지 청킹 및 사내 Milvus 벡터DB',
    en: 'PDF/Docx ontology chunking & in-house Milvus vector DB',
    ja: 'PDF/Docx オントロジーチャンキングおよび社内MilvusベクトルDB'
  },
  'AAS / OPC-UA / KS X 9101 표준 온톨로지': {
    ko: 'AAS / OPC-UA / KS X 9101 표준 온톨로지',
    en: 'AAS / OPC-UA / KS X 9101 standard ontology',
    ja: 'AAS / OPC-UA / KS X 9101 標準オントロジー'
  },
  'GLTF / glTF 3D + OPC-UA Telemetry': {
    ko: 'GLTF / glTF 3D + OPC-UA Telemetry',
    en: 'GLTF / glTF 3D + OPC-UA Telemetry',
    ja: 'GLTF / glTF 3D + OPC-UA Telemetry'
  },
  'Modbus TCP / KS X 9101': {
    ko: 'Modbus TCP / KS X 9101',
    en: 'Modbus TCP / KS X 9101',
    ja: 'Modbus TCP / KS X 9101'
  },
  'AAS / OPC-UA / KS X 9101': {
    ko: 'AAS / OPC-UA / KS X 9101',
    en: 'AAS / OPC-UA / KS X 9101',
    ja: 'AAS / OPC-UA / KS X 9101'
  }
};

const PERMISSION_LOCALIZATIONS: Record<string, LocalizedString> = {
  '에이전트 간 이벤트 버스 라우팅': {
    ko: '에이전트 간 이벤트 버스 라우팅',
    en: 'Inter-agent event bus routing',
    ja: 'エージェント間イベントバスルーティング'
  },
  '설비 자동 비상 정지 트리거': {
    ko: '설비 자동 비상 정지 트리거',
    en: 'Automated machine emergency stop trigger',
    ja: '設備自動非常停止トリガー'
  },
  '사내 문서 저장소 Read': {
    ko: '사내 문서 저장소 Read',
    en: 'In-house document repository Read',
    ja: '社内ドキュメント保管庫 Read'
  },
  '외부망 아웃바운드 차단 확인': {
    ko: '외부망 아웃바운드 차단 확인',
    en: 'Verify external network outbound egress blocked',
    ja: '外部ネットワークアウトバウンド遮断確認'
  },
  '전력 계측점 주기적 폴링': {
    ko: '전력 계측점 주기적 폴링',
    en: 'Periodic polling of power meters',
    ja: '電力計測点周期的ポーリング'
  },
  '피크 전력 차단기 릴레이 제어': {
    ko: '피크 전력 차단기 릴레이 제어',
    en: 'Peak power breaker relay control',
    ja: 'ピーク電力遮断器リレー制御'
  },
  '설비 3D 텔레메트리 구독': {
    ko: '설비 3D 텔레메트리 구독',
    en: 'Equipment 3D telemetry subscription',
    ja: '設備3Dテレメトリ購読'
  },
  '화면 레이아웃 및 컴포넌트 Read/Write': {
    ko: '화면 레이아웃 및 컴포넌트 Read/Write',
    en: 'Screen layout & component Read/Write',
    ja: '画面レイアウトおよびコンポーネント Read/Write'
  },
  '사내 온톨로지 메타데이터 카탈로그 관리': {
    ko: '사내 온톨로지 메타데이터 카탈로그 관리',
    en: 'Manage in-house ontology metadata catalog',
    ja: '社内オントロジーメタデータカタログ管理'
  }
};

const LOCATION_LOCALIZATIONS: Record<string, LocalizedString> = {
  '[경남/사천] 항공·정밀가공 사업장': {
    ko: '[경남/사천] 항공·정밀가공 사업장',
    en: '[Sacheon] Aerospace & Precision Machining Plant',
    ja: '[慶南/泗川] 航空・精密加工事業所'
  },
  '[경남/창원] 기계·특수제조 사업장': {
    ko: '[경남/창원] 기계·특수제조 사업장',
    en: '[Changwon] Machinery & Special Manufacturing Plant',
    ja: '[慶南/昌原] 機械・特殊製造事業所'
  },
  '[충북/오송] 제약·바이오 GMP 사업장': {
    ko: '[충북/오송] 제약·바이오 GMP 사업장',
    en: '[Osong] Pharma & Bio GMP Plant',
    ja: '[忠北/五松] 製薬・バイオ GMP事業所'
  },
  '[전북/익산] 식품·화장품 HACCP 사업장': {
    ko: '[전북/익산] 식품·화장품 HACCP 사업장',
    en: '[Iksan] Food & Cosmetics HACCP Plant',
    ja: '[全北/益山] 食品・化粧品 HACCP事業所'
  },
  '[경기/화성] 전자·반도체 부품 사업장': {
    ko: '[경기/화성] 전자·반도체 부품 사업장',
    en: '[Hwaseong] Electronics & Semiconductor Plant',
    ja: '[京畿/華城] 電子・半導体部品事業所'
  },
  'ArcOS 제어 평면 (SaaS) 및 사내 캐시 노드': {
    ko: 'ArcOS 제어 평면 (SaaS) 및 사내 캐시 노드',
    en: 'ArcOS Control Plane (SaaS) & In-House Cache Node',
    ja: 'ArcOS 制御プレーン (SaaS) および社内キャッシュノード'
  },
  '[충북/오송] 제약·바이오 GMP 사업장 GPU 노드': {
    ko: '[충북/오송] 제약·바이오 GMP 사업장 GPU 노드',
    en: '[Osong] Pharma/Bio GMP Plant GPU Node',
    ja: '[忠北/五松] 製薬・バイオ GMP事業所 GPUノード'
  },
  '[경남/사천] 항공·정밀가공 사업장 폐쇄망 노드': {
    ko: '[경남/사천] 항공·정밀가공 사업장 폐쇄망 노드',
    en: '[Sacheon] Aerospace Plant Air-Gapped Node',
    ja: '[慶南/泗川] 航空・精密加工事業所 閉域網ノード'
  },
  '[경남/창원] 기계·특수제조 사업장 변전실': {
    ko: '[경남/창원] 기계·특수제조 사업장 변전실',
    en: '[Changwon] Machinery Plant Electrical Substation',
    ja: '[慶南/昌原] 機械・特殊製造事業所 変電室'
  },
  '[전북/익산] 식품·화장품 HACCP 사업장 계측반': {
    ko: '[전북/익산] 식품·화장품 HACCP 사업장 계측반',
    en: '[Iksan] HACCP Plant Metering Board',
    ja: '[全北/益山] 食品・化粧品 HACCP事業所 計測盤'
  },
  '[경남/사천] 항공·정밀가공 사업장 종합관제실': {
    ko: '[경남/사천] 항공·정밀가공 사업장 종합관제실',
    en: '[Sacheon] Aerospace Control Center',
    ja: '[慶南/泗川] 航空・精密加工事業所 総合管制室'
  },
  '[경기/화성] 전자·반도체 부품 사업장 모니터링룸': {
    ko: '[경기/화성] 전자·반도체 부품 사업장 모니터링룸',
    en: '[Hwaseong] Electronics Plant Monitoring Room',
    ja: '[京畿/華城] 電子・半導体部品事業所 モニタリングルーム'
  },
  '[경남/사천] 항공·정밀가공 사업장 인스턴스': {
    ko: '[경남/사천] 항공·정밀가공 사업장 인스턴스',
    en: '[Sacheon] Aerospace Plant Instance',
    ja: '[慶南/泗川] 航空・精密加工事業所 インスタンス'
  },
  '[충북/오송] 제약·바이오 GMP 사업장 인스턴스': {
    ko: '[충북/오송] 제약·바이오 GMP 사업장 인스턴스',
    en: '[Osong] Pharma/Bio GMP Plant Instance',
    ja: '[忠北/五松] 製薬・バイオ GMP事業所 インスタンス'
  },
  '[전북/익산] 식품·화장품 HACCP 사업장 인스턴스': {
    ko: '[전북/익산] 식품·화장품 HACCP 사업장 인스턴스',
    en: '[Iksan] HACCP Plant Instance',
    ja: '[全北/益山] 食品・化粧品 HACCP事業所 インスタンス'
  },
  '[경남/사천] 항공·정밀가공 사업장 온프레미스': {
    ko: '[경남/사천] 항공·정밀가공 사업장 온프레미스',
    en: '[Sacheon] Aerospace Plant On-Premises',
    ja: '[慶南/泗川] 航空・精密加工事業所 オンプレミス'
  }
};

const TENANT_LOCALIZATIONS: Record<string, LocalizedString> = {
  '[경남/사천] 항공·정밀기계 제조연합': {
    ko: '[경남/사천] 항공·정밀기계 제조연합',
    en: '[Sacheon] Aerospace & Precision Machinery Alliance',
    ja: '[慶南/泗川] 航空・精密機械製造連合'
  }
};

const PRESET_LOCALIZATIONS: Record<string, {
  title: LocalizedString;
  subtitle: LocalizedString;
  badge: LocalizedString;
  desc: LocalizedString;
  targetAudience: LocalizedString;
}> = {
  'preset-pharma': {
    title: { ko: '제약·바이오 GMP 규제 대응형', en: 'Pharma/Bio GMP Regulatory Compliance', ja: '製薬・バイオ GMP規制準拠型' },
    subtitle: { ko: 'GMP 밸리데이션 · CFR Part 11 전자서명 · 규정 sLM', en: 'GMP Validation · CFR Part 11 E-Signature · SOP sLM', ja: 'GMPバリデーション・CFR Part 11電子署名・規定sLM' },
    badge: { ko: '규제 대응', en: 'Compliance', ja: '規制対応' },
    desc: {
      ko: 'FDA 21 CFR Part 11 전자 제조기록과 청정실 환경 모니터링을 결합하고, 사내 기준서(SOP) 기반 공정 일탈 원인 분석 sLM을 온프레미스로 운영합니다.',
      en: 'Combines FDA 21 CFR Part 11 electronic batch records and cleanroom monitoring with on-premise SOP-grounded deviation analysis sLM.',
      ja: 'FDA 21 CFR Part 11電子製造記録とクリーンルーム環境監視を統合し、社内基準書(SOP)準拠の工程逸脱原因分析sLMをオンプレミスで運用します。'
    },
    targetAudience: { ko: '제약 / 바이오 / 의료기기 제조사', en: 'Pharma / Bio / Medical Device Manufacturers', ja: '製薬 / バイオ / 医療機器メーカー' }
  },
  'preset-food': {
    title: { ko: '식품·화장품 HACCP 위생·이력 추적형', en: 'Food/Cosmetics HACCP Hygiene & Traceability', ja: '食品・化粧品 HACCP衛生・履歴追跡型' },
    subtitle: { ko: 'HACCP 자동기록 · 원료 역추적 · 공급망 연계', en: 'HACCP Auto Logging · Raw Material Traceability · SCM', ja: 'HACCP自動記録・原料逆追跡・サプライチェーン連携' },
    badge: { ko: '위생·추적', en: 'Hygiene & Trace', ja: '衛生・追跡' },
    desc: {
      ko: '배합/충진 공정의 중요관리점(CCP) 데이터를 자동 기록하고, 원료 입고부터 완제품 출하까지 1·2차 협력사를 잇는 역추적 및 안전 검사를 연동합니다.',
      en: 'Automates CCP logging in mixing/filling processes with forward/backward traceability connecting suppliers to finished goods and safety checks.',
      ja: '配合・充填工程の重要管理点(CCP)データを自動記録し、原料入荷から完成品出荷まで協力会社を結ぶ追跡と安全検査を連携します。'
    },
    targetAudience: { ko: '식음료 가공 / 건강기능식품 / 화장품 제조사', en: 'F&B / Nutraceuticals / Cosmetics Manufacturers', ja: '食品・飲料 / 健康機能食品 / 化粧品メーカー' }
  },
  'preset-precision': {
    title: { ko: '정밀기계·자동차 부품 품질·예지보전형', en: 'Precision Machinery & Auto Parts Predictive Quality', ja: '精密機械・自動車部品 品質・予知保全型' },
    subtitle: { ko: '가동률 분석 · AI 불량 예측 · 3D 설비 트윈', en: 'OEE Analysis · AI Defect Prediction · 3D Digital Twin', ja: '稼働率分析・AI不良予測・3D設備ツイン' },
    badge: { ko: '품질·예지', en: 'Quality & Maintenance', ja: '品質・予知' },
    desc: {
      ko: 'CNC/가공 설비의 진동·전류 데이터를 실시간 분석하여 공구 마모 및 불량을 사전 예측하고, 3D 디지털 트윈으로 현장 라인 가동 상태를 원격 통제합니다.',
      en: 'Analyzes vibration and current data from CNC machining lines for tool wear prediction and remote 3D digital twin monitoring.',
      ja: 'CNC加工設備の振動・電流データをリアルタイム解析して工具摩耗・不良を事前予測し、3Dデジタルツインで現場の稼働状況を遠隔監視します。'
    },
    targetAudience: { ko: '항공 부품 / 정밀 기계가공 / 자동차 1차 협력사', en: 'Aerospace / Precision Machining / Tier 1 Auto Suppliers', ja: '航空機部品 / 精密機械加工 / 自動車1次サプライヤー' }
  },
  'preset-esg': {
    title: { ko: '화학·뿌리공정 에너지 최적화 & 안전형', en: 'Chemical & Base Industry Energy Optimization & Safety', ja: '化学・基盤加工 エネルギー最適化＆安全型' },
    subtitle: { ko: '피크 전력 제어 · 온실가스 인벤토리 · 위험환경 감시', en: 'Peak Power Control · GHG Inventory · Hazard Monitoring', ja: 'ピーク電力制御・温室効果ガス算出・危険環境監視' },
    badge: { ko: '에너지·ESG', en: 'Energy & ESG', ja: 'エネルギー・ESG' },
    desc: {
      ko: '열처리/주조/화학 반응기 등 에너지 다소비 설비의 피크 부하를 동적 차단하여 기본요금을 절감하고, 공장 유해가스·누출 위험을 비전 AI로 감시합니다.',
      en: 'Reduces energy utility bills through dynamic peak shaving on heavy machinery and continuously monitors hazardous leaks via vision AI.',
      ja: '熱処理・鋳造・化学反応器などの高電力消費設備のピーク負荷を動的制御して基本料金を削減し、有害ガス漏洩リスクをAI監視します。'
    },
    targetAudience: { ko: '화학소재 / 열처리·도금 / 뿌리제조 기업', en: 'Chemical Materials / Heat Treatment & Plating / Foundries', ja: '化学素材 / 熱処理・めっき / 基盤製造企業' }
  },
  'preset-starter': {
    title: { ko: '스마트공장 첫걸음 필수 코어형', en: 'Smart Factory Starter Essential Core', ja: 'スマート工場 スタート必須コア型' },
    subtitle: { ko: '일반 MES 생산실행 · 바코드 추적 · 설비 모니터링', en: 'Standard MES · Barcode Tracking · Machine Monitoring', ja: '一般MES生産実行・バーコード追跡・設備モニタリング' },
    badge: { ko: '입문 추천', en: 'Starter Pick', ja: 'スターター推奨' },
    desc: {
      ko: '초기 도입 비용 부담을 최소화하여 공정 LOT 바코드 실적 집계와 핵심 설비 가동 상태를 빠르게 디지털화하는 패키지입니다.',
      en: 'Low-barrier foundational package that rapidly digitizes production LOT barcode logs and machine status monitoring.',
      ja: '初期導入コストを最小化し、工程LOTバーコード実績集計と主要設備の稼働状態を迅速にデジタル化するエントリーパッケージです。'
    },
    targetAudience: { ko: '스마트공장 신규 도입 중소·중견 제조사', en: 'SMEs Adopting Smart Manufacturing For First Time', ja: 'スマート工場を新規導入する中小・中堅メーカー' }
  },
  'preset-ai': {
    title: { ko: '자율제조 AI 에이전트 오케스트레이션형', en: 'Autonomous Manufacturing AI Agent Orchestration', ja: '自律製造 AIエージェント オーケストレーション型' },
    subtitle: { ko: 'A²LAB 모델 생성 · 멀티 에이전트 협업 · 이상 탐지', en: 'A²LAB Model Generator · Multi-Agent Collaboration · Anomaly Detection', ja: 'A²LABモデル生成・マルチエージェント協調・異常検知' },
    badge: { ko: 'AI 자율화', en: 'AI Autonomous', ja: 'AI自律化' },
    desc: {
      ko: '생산라인 데이터 수집부터 A²LAB 기반 도메인 특화 경량 AI 모델 파인튜닝, 멀티 에이전트 자동 제어까지 일체형으로 구축합니다.',
      en: 'End-to-end autonomous suite from ingestion to A²LAB lightweight model tuning and multi-agent closed-loop control.',
      ja: '生産ラインデータ収集からA²LAB基盤の特化型AIモデル微調整、マルチエージェント自律制御までを統合構築します。'
    },
    targetAudience: { ko: '자율제조 지능화 공장 전환 추진 기업', en: 'Enterprises Transitioning to Autonomous Smart Plants', ja: '自律製造インテリジェント工場へ移行を推進する企業' }
  },
  'preset-nocode': {
    title: { ko: '엔터프라이즈 자체구축 노코드 플랫폼형', en: 'Enterprise In-House No-Code Platform Builder', ja: 'エンタープライズ 自社構築ノーコード開発型' },
    subtitle: { ko: '기성 MES 미도입 · 온톨로지 직결 · 기업 고유 화면 100% 빌드', en: 'Zero Off-the-Shelf MES · Direct Ontology Binding · 100% Custom Shopfloor Views', ja: '既製MES未導入・オントロジー直結・自社専用画面100%独自開発' },
    badge: { ko: '자체 개발', en: 'Custom Build', ja: '自社開発' },
    desc: {
      ko: '기성 MES를 사용하지 않고 ArcMind 노코드 빌더만으로 현장 작업자 화면, 공정 대시보드, 설비 제어 로직을 사내에서 100% 자유롭게 직접 설계합니다.',
      en: 'Replaces rigid commercial MES by allowing in-house engineers to build 100% custom operator UIs and workflows via ArcMind.',
      ja: '既製品のMESに縛られず、ArcMindノーコードビルダーのみで現場オペレーター画面や工程ダッシュボードを自社で100%自由に開発します。'
    },
    targetAudience: { ko: '특수 공정 보유 기업 / 사내 IT 개발팀', en: 'Proprietary Process Owners / In-House IT Teams', ja: '独自特殊工程を保有する企業 / 社内IT・DXチーム' }
  }
};

const FACILITY_LOCALIZATIONS: Record<string, { fullName: LocalizedString; subTitle: LocalizedString }> = {
  'aerospace-sacheon': {
    fullName: { ko: '[경남/사천] 항공·정밀가공 사업장', en: '[Sacheon] Aerospace & Precision Plant', ja: '[慶南/泗川] 航空・精密加工事業所' },
    subTitle: { ko: '기체 구조물 가공 및 복합재 조립 1·2공장', en: 'Aerospace Machining & Composite Assembly 1 & 2', ja: '機体構造物加工および複合材組立1・2工場' }
  },
  'machinery-changwon': {
    fullName: { ko: '[경남/창원] 기계·특수제조 사업장', en: '[Changwon] Machinery & Heavy Industry Plant', ja: '[慶南/昌原] 機械・特殊製造事業所' },
    subTitle: { ko: '대형 회전체 가공 및 고정밀 방산 부품 라인', en: 'Heavy Rotary Machining & Defense Components Line', ja: '大型回転体加工および高精度防衛部品ライン' }
  },
  'bio-pharma': {
    fullName: { ko: '[충북/오송] 제약·바이오 GMP 사업장', en: '[Osong] Pharma & Bio GMP Plant', ja: '[忠北/五松] 製薬・バイオ GMP事業所' },
    subTitle: { ko: '무균 주사제 및 완제의약품 청정실(Cleanroom)', en: 'Sterile Injectables & Finished Drug Cleanrooms', ja: '無菌注射剤および完製品クリーンルーム' }
  },
  'food-cosmetics': {
    fullName: { ko: '[전북/익산] 식품·화장품 HACCP 사업장', en: '[Iksan] Food & Cosmetics HACCP Plant', ja: '[全北/益山] 食品・化粧品 HACCP事業所' },
    subTitle: { ko: '배합·충진 및 HACCP 중요관리점(CCP) 공정', en: 'Blending, Filling & HACCP CCP Tracking', ja: '調合・充填およびHACCP重要管理点(CCP)工程' }
  },
  'electronics-semi': {
    fullName: { ko: '[경기/화성] 전자·반도체 부품 사업장', en: '[Hwaseong] Electronics & Semiconductor Plant', ja: '[京畿/華城] 電子・半導体部品事業所' },
    subTitle: { ko: '고속 SMT 및 전장 모듈 조립 라인', en: 'High-Speed SMT & Automotive Electronics Assembly', ja: '高速SMTおよび車載モジュール組立ライン' }
  }
};

export function getLocalizedAppName(app: AppItem, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = APP_LOCALIZATIONS[app.id];
  if (loc && loc.name && loc.name[l]) {
    return loc.name[l];
  }
  return app.name;
}

export function getLocalizedAppCategory(app: AppItem, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = APP_LOCALIZATIONS[app.id];
  if (loc && loc.categoryLabel && loc.categoryLabel[l]) {
    return loc.categoryLabel[l];
  }
  return app.categoryLabel;
}

export function getLocalizedAppDesc(app: AppItem, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = APP_LOCALIZATIONS[app.id];
  if (loc && loc.desc && loc.desc[l]) {
    return loc.desc[l];
  }
  return app.desc;
}

export function getLocalizedAppDetail(app: AppItem, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = APP_LOCALIZATIONS[app.id];
  if (loc && loc.detail && loc.detail[l]) {
    return loc.detail[l];
  }
  return app.detail;
}

export function getLocalizedAppUnit(app: AppItem, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = APP_LOCALIZATIONS[app.id];
  if (loc && loc.unit && loc.unit[l]) {
    return loc.unit[l];
  }
  return app.unit;
}

export function getLocalizedSubModuleName(subId: string, fallback: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = SUBMODULE_LOCALIZATIONS[subId];
  if (item && item.name && item.name[l]) {
    return item.name[l];
  }
  return fallback;
}

export function getLocalizedSubModuleDesc(subId: string, fallback: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = SUBMODULE_LOCALIZATIONS[subId];
  if (item && item.desc && item.desc[l]) {
    return item.desc[l];
  }
  return fallback;
}

export function getLocalizedSubModuleUnit(subId: string, fallback: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = SUBMODULE_LOCALIZATIONS[subId];
  if (item && item.unitLabel && item.unitLabel[l]) {
    return item.unitLabel[l];
  }
  return fallback;
}

export function getLocalizedGroupLabel(label: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = GROUP_LABEL_LOCALIZATIONS[label];
  if (item && item[l]) {
    return item[l];
  }
  return label;
}

export function getLocalizedDepName(name: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = DEP_LOCALIZATIONS[name];
  if (item && item.name && item.name[l]) {
    return item.name[l];
  }
  return name;
}

export function getLocalizedDepDesc(desc: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  for (const key of Object.keys(DEP_LOCALIZATIONS)) {
    const entry = DEP_LOCALIZATIONS[key];
    if (entry.desc.ko === desc || entry.desc.en === desc || entry.desc.ja === desc) {
      return entry.desc[l];
    }
  }
  return desc;
}

export function getLocalizedDataScopeDb(db: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = DATASCOPE_LOCALIZATIONS[db];
  if (item && item[l]) {
    return item[l];
  }
  return db;
}

export function getLocalizedDataScopeStd(std: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = DATASCOPE_LOCALIZATIONS[std];
  if (item && item[l]) {
    return item[l];
  }
  return std;
}

export function getLocalizedPermissionScope(scope: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = PERMISSION_LOCALIZATIONS[scope];
  if (item && item[l]) {
    return item[l];
  }
  return scope;
}

export function getLocalizedLocationName(location: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = LOCATION_LOCALIZATIONS[location];
  if (item && item[l]) {
    return item[l];
  }
  return location;
}

export function getLocalizedTenantName(tenant: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const item = TENANT_LOCALIZATIONS[tenant];
  if (item && item[l]) {
    return item[l];
  }
  return tenant;
}

export function getLocalizedPresetTitle(preset: RecommendationPreset, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = PRESET_LOCALIZATIONS[preset.id];
  if (loc && loc.title && loc.title[l]) {
    return loc.title[l];
  }
  return preset.title;
}

export function getLocalizedPresetSubtitle(preset: RecommendationPreset, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = PRESET_LOCALIZATIONS[preset.id];
  if (loc && loc.subtitle && loc.subtitle[l]) {
    return loc.subtitle[l];
  }
  return preset.subtitle;
}

export function getLocalizedPresetBadge(preset: RecommendationPreset, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = PRESET_LOCALIZATIONS[preset.id];
  if (loc && loc.badge && loc.badge[l]) {
    return loc.badge[l];
  }
  return preset.badge;
}

export function getLocalizedPresetDesc(preset: RecommendationPreset, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = PRESET_LOCALIZATIONS[preset.id];
  if (loc && loc.desc && loc.desc[l]) {
    return loc.desc[l];
  }
  return preset.desc;
}

export function getLocalizedPresetTarget(preset: RecommendationPreset, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = PRESET_LOCALIZATIONS[preset.id];
  if (loc && loc.targetAudience && loc.targetAudience[l]) {
    return loc.targetAudience[l];
  }
  return preset.targetAudience;
}

export function getLocalizedFacilityName(facility: FacilityLocation, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = FACILITY_LOCALIZATIONS[facility.id];
  if (loc && loc.fullName && loc.fullName[l]) {
    return loc.fullName[l];
  }
  return facility.fullName;
}
