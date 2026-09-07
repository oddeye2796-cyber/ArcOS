import { Language } from './translations';
import { AppItem, RecommendationPreset, FacilityLocation, PatchNoteItem } from '../types';

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
,
  'A²LAB (선행 모듈)': {
    name: { ko: 'A²LAB (선행 모듈)', en: 'A²LAB (Prerequisite Module)', ja: 'A²LAB (前提モジュール)' },
    desc: {
      ko: '선행 에이전트 제작 도구 필요 (함께 담기 권장)',
      en: 'Requires the prerequisite agent authoring tool (bundling recommended)',
      ja: '前提となるエージェント作成ツールが必要 (同時追加を推奨)'
    }
  },
  '등록된 에이전트 모듈 3개 이상': {
    name: { ko: '등록된 에이전트 모듈 3개 이상', en: 'At Least 3 Registered Agent Modules', ja: '登録済みエージェントモジュール3個以上' },
    desc: {
      ko: '현재 사업장에 1개 등록됨 (A²LAB 설치 후 생성 가능)',
      en: '1 registered at this facility (more can be created after installing A²LAB)',
      ja: '当事業所に1個登録済み (A²LABインストール後に作成可能)'
    }
  },
  'MLOps 실행엔진': {
    name: { ko: 'MLOps 실행엔진', en: 'MLOps Execution Engine', ja: 'MLOps 実行エンジン' },
    desc: {
      ko: '온프레미스 도커 런타임 기본 탑재',
      en: 'Bundled with the on-premise Docker runtime',
      ja: 'オンプレミスDockerランタイムに標準搭載'
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
,
  'ArcOS 공통 이벤트 버스 (Pub/Sub)': {
    ko: 'ArcOS 공통 이벤트 버스 (Pub/Sub)',
    en: 'ArcOS Shared Event Bus (Pub/Sub)',
    ja: 'ArcOS 共通イベントバス (Pub/Sub)'
  },
  'OPC-UA / Parquet Lakehouse': {
    ko: 'OPC-UA / Parquet Lakehouse',
    en: 'OPC-UA / Parquet Lakehouse',
    ja: 'OPC-UA / Parquet Lakehouse'
  },
  '학습 데이터는 사내 로컬 GPU 클러스터 내부에서만 순환': {
    ko: '학습 데이터는 사내 로컬 GPU 클러스터 내부에서만 순환',
    en: 'Training data circulates only inside the in-house local GPU cluster',
    ja: '学習データは社内ローカルGPUクラスタ内部でのみ循環'
  },
  '에이전트 판단 신뢰도 벡터 및 결정 로그 (사내)': {
    ko: '에이전트 판단 신뢰도 벡터 및 결정 로그 (사내)',
    en: 'Agent confidence vectors and decision logs (on-premises)',
    ja: 'エージェント判断信頼度ベクトルおよび決定ログ (社内)'
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
,
  '생산 라인 설비 PLC 읽기': {
    ko: '생산 라인 설비 PLC 읽기',
    en: 'Production line equipment PLC read',
    ja: '生産ライン設備PLCの読み取り'
  },
  '배치 완료 승인 및 전자 서명': {
    ko: '배치 완료 승인 및 전자 서명',
    en: 'Batch completion approval and e-signature',
    ja: 'バッチ完了承認および電子署名'
  },
  '공정 레시피 제어 명령(Write)': {
    ko: '공정 레시피 제어 명령(Write)',
    en: 'Process recipe control command (Write)',
    ja: '工程レシピ制御コマンド(Write)'
  },
  '센서 시계열 데이터 학습용 Read': {
    ko: '센서 시계열 데이터 학습용 Read',
    en: 'Sensor time-series data read for training',
    ja: 'センサー時系列データの学習用Read'
  },
  '새 에이전트 컨테이너 기동': {
    ko: '새 에이전트 컨테이너 기동',
    en: 'Launch new agent container',
    ja: '新規エージェントコンテナの起動'
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
  },
  '[충북/오송] 제약·바이오 GMP 사업장 온프레미스': {
    ko: '[충북/오송] 제약·바이오 GMP 사업장 온프레미스',
    en: '[Osong] Pharma/Bio GMP Plant On-Premises',
    ja: '[忠北/五松] 製薬・バイオ GMP事業所 オンプレミス'
  },
  '[충북/오송] 제약·바이오 GMP 사업장 (라인 #1~#4)': {
    ko: '[충북/오송] 제약·바이오 GMP 사업장 (라인 #1~#4)',
    en: '[Osong] Pharma/Bio GMP Plant (Lines #1-#4)',
    ja: '[忠北/五松] 製薬・バイオ GMP事業所 (ライン #1〜#4)'
  },
  '[경남/사천] 항공·정밀가공 사업장 AI 노드': {
    ko: '[경남/사천] 항공·정밀가공 사업장 AI 노드',
    en: '[Sacheon] Aerospace Plant AI Node',
    ja: '[慶南/泗川] 航空・精密加工事業所 AIノード'
  },
  '[경남/창원] 기계·특수제조 사업장 AI 노드': {
    ko: '[경남/창원] 기계·특수제조 사업장 AI 노드',
    en: '[Changwon] Machinery Plant AI Node',
    ja: '[慶南/昌原] 機械・特殊製造事業所 AIノード'
  },
  '[충북/오송] 제약·바이오 GMP 사업장 AI 노드': {
    ko: '[충북/오송] 제약·바이오 GMP 사업장 AI 노드',
    en: '[Osong] Pharma/Bio GMP Plant AI Node',
    ja: '[忠北/五松] 製薬・バイオ GMP事業所 AIノード'
  },
  '[경남/사천] 항공·정밀가공 사업장 엣지 노드': {
    ko: '[경남/사천] 항공·정밀가공 사업장 엣지 노드',
    en: '[Sacheon] Aerospace Plant Edge Node',
    ja: '[慶南/泗川] 航空・精密加工事業所 エッジノード'
  },
  '[경기/화성] 전자·반도체 부품 사업장 엣지 노드': {
    ko: '[경기/화성] 전자·반도체 부품 사업장 엣지 노드',
    en: '[Hwaseong] Electronics Plant Edge Node',
    ja: '[京畿/華城] 電子・半導体部品事業所 エッジノード'
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
  'preset-autonomous': {
    title: { ko: 'AI 자율제조 고도화 (Full Agent Architecture)', en: 'Autonomous AI Manufacturing (Full Agent Architecture)', ja: 'AI自律製造の高度化 (Full Agent Architecture)' },
    subtitle: { ko: 'AI 에이전트 생성 · 슈퍼바이저 지휘 · sLM 규정 분석', en: 'AI agent generation · Supervisor orchestration · sLM regulatory analysis', ja: 'AIエージェント生成・スーパーバイザー指揮・sLM規程分析' },
    badge: { ko: 'AI 자율제조', en: 'Autonomous AI', ja: 'AI自律製造' },
    desc: {
      ko: 'A²LAB에서 생성된 품질/설비/에너지 에이전트들을 다중 AI Agent 슈퍼바이저가 오케스트레이션하고, 폐쇄망 sLM 컨센스봇과 3D 트윈을 결합합니다.',
      en: 'The Multi-AI Agent Supervisor orchestrates the quality, equipment and energy agents generated in A²LAB, combined with the air-gapped ConsensBot sLM and a 3D digital twin.',
      ja: 'A²LABで生成された品質・設備・エネルギーの各エージェントをマルチAI Agentスーパーバイザーがオーケストレーションし、閉域網sLMコンセンスボットと3Dツインを組み合わせます。'
    },
    targetAudience: { ko: '지능형 등대공장 추진 / 대형 복합 생산 사업장', en: 'Lighthouse factory programs / large multi-process production sites', ja: 'インテリジェント・ライトハウス工場推進 / 大規模複合生産事業所' }
  },
  'preset-inhouse-diy': {
    title: { ko: '자체 IT 인력 노코드 플랫폼 구축형 (In-House IT DIY)', en: 'In-House IT No-Code Platform Build (DIY)', ja: '自社IT要員によるノーコード基盤構築型 (In-House IT DIY)' },
    subtitle: { ko: 'ArcMind 노코드·로우코드 빌더 · B²LAB 온톨로지 · A²LAB · 3D 트윈', en: 'ArcMind no-code/low-code builder · B²LAB ontology · A²LAB · 3D twin', ja: 'ArcMind ノーコード・ローコードビルダー・B²LAB オントロジー・A²LAB・3Dツイン' },
    badge: { ko: '자체 IT 전용', en: 'In-House IT', ja: '自社IT専用' },
    desc: {
      ko: '기성 제조 운영 스위트(MES)를 도입하지 않고, 사내 IT 인력이 ArcMind(No-Code/Low-Code)로 공정 화면·작업 지시서·모바일 뷰를 직접 개발합니다. 기성 MES 구독료 없이 B²LAB 온톨로지 위에서 100% 사내 맞춤형 플랫폼을 내재화합니다.',
      en: 'Instead of adopting an off-the-shelf MES suite, in-house IT staff build process screens, work instructions and mobile views themselves with ArcMind (No-Code/Low-Code) — a 100% custom platform on top of the B²LAB ontology, with no MES subscription fee.',
      ja: '既製の製造運用スイート(MES)を導入せず、社内IT要員がArcMind(No-Code/Low-Code)で工程画面・作業指示書・モバイルビューを直接開発します。既製MESの購読料なしにB²LABオントロジー上で100%自社カスタムのプラットフォームを内製化します。'
    },
    targetAudience: { ko: '자체 IT/전산 인력을 보유하여 기성 MES 대신 사내 스마트팩토리를 직접 개발하는 제조기업', en: 'Manufacturers with in-house IT staff who build their own smart factory instead of buying an off-the-shelf MES', ja: '自社IT/情報システム要員を擁し、既製MESの代わりに社内スマートファクトリーを自ら開発する製造企業' }
  },
  'preset-scm-audit': {
    title: { ko: '공급망 & 협력사 품질 통합 연계 (SCM & Audit)', en: 'Supply Chain & Supplier Quality Integration (SCM & Audit)', ja: 'サプライチェーン & 協力会社品質の統合連係 (SCM & Audit)' },
    subtitle: { ko: '협력사 발주 · 실시간 납기 트래킹 · 전자기록 증적', en: 'Supplier purchase orders · Real-time delivery tracking · Electronic record evidence', ja: '協力会社発注・リアルタイム納期トラッキング・電子記録証跡' },
    badge: { ko: '공급망 연계', en: 'Supply Chain', ja: 'サプライチェーン連係' },
    desc: {
      ko: '사내 공정과 1·2차 외주 협력사 포털을 실시간 연계하고, 납품 품질 및 발주 검수 이력을 전자 기록으로 보존하여 고객사 실사에 즉각 대응합니다.',
      en: 'Links in-house processes with tier-1 and tier-2 supplier portals in real time and preserves delivery quality and PO inspection history as electronic records, so customer audits can be answered immediately.',
      ja: '社内工程と1次・2次外注協力会社ポータルをリアルタイムで連係し、納品品質および発注検収履歴を電子記録として保存することで、顧客の実地監査に即応します。'
    },
    targetAudience: { ko: '외주 가공 비중이 높고 협력사 감사가 필수인 제조사', en: 'Manufacturers with heavy outsourced machining and mandatory supplier audits', ja: '外注加工の比率が高く、協力会社監査が必須の製造業' }
  }
};

const FACILITY_LOCALIZATIONS: Record<string, { fullName: LocalizedString; subTitle: LocalizedString }> = {
  'aerospace-precision': {
    fullName: { ko: '[경남/사천] 항공·정밀가공 사업장', en: '[Sacheon] Aerospace & Precision Plant', ja: '[慶南/泗川] 航空・精密加工事業所' },
    subTitle: { ko: '기체 구조물 가공 및 복합재 조립 1·2공장', en: 'Aerospace Machining & Composite Assembly 1 & 2', ja: '機体構造物加工および複合材組立1・2工場' }
  },
  'machinery-specialty': {
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
  // Preset cart items reuse app ids that only exist in the app catalog. Korean keeps
  // the caller's own wording; other languages fall back to the catalog translation.
  const app = APP_LOCALIZATIONS[subId];
  if (l !== 'ko' && app && app.name && app.name[l]) {
    return app.name[l];
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
  const app = APP_LOCALIZATIONS[subId];
  if (l !== 'ko' && app && app.unit && app.unit[l]) {
    return app.unit[l];
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

const DEP_DESC_LOCALIZATIONS: Record<string, LocalizedString> = {
  '온톨로지 스키마 정합성 검증 완료': {
    ko: '온톨로지 스키마 정합성 검증 완료',
    en: 'Ontology schema consistency verified',
    ja: 'オントロジースキーマ整合性の検証完了'
  },
  '플랫폼 기본료 포함 (GraphQL / REST 온톨로지 연동)': {
    ko: '플랫폼 기본료 포함 (GraphQL / REST 온톨로지 연동)',
    en: 'Included in the platform base fee (GraphQL / REST ontology integration)',
    ja: 'プラットフォーム基本料に付属 (GraphQL / REST オントロジー連係)'
  }
};

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
  const extra = DEP_DESC_LOCALIZATIONS[desc];
  if (extra) {
    return extra[l];
  }
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

interface LocalizedStringList {
  ko: string[];
  en: string[];
  ja: string[];
}

interface PatchNoteLocalization {
  typeLabel: LocalizedString;
  title: LocalizedString;
  summary: LocalizedString;
  affectedModules: LocalizedStringList;
  migrationMechanism: LocalizedString;
  rollbackSafety: LocalizedString;
  detailTitles: LocalizedStringList;
  detailItems: LocalizedStringList[];
}

const PATCH_NOTE_LOCALIZATIONS: Record<string, PatchNoteLocalization> = {
  'patch-4-2-3': {
    typeLabel: { ko: '보안 핫픽스', en: 'Security Hotfix', ja: 'セキュリティ緊急修正' },
    title: {
      ko: 'ArcTunnel mTLS 암호화 키 무중단 롤링 갱신 및 터널 유지보수',
      en: 'Zero-downtime rolling rotation of ArcTunnel mTLS encryption keys and tunnel maintenance',
      ja: 'ArcTunnel mTLS 暗号鍵の無停止ローリング更新およびトンネル保守'
    },
    summary: {
      ko: '운영 중인 PLC 및 MES 데이터 스트림 연결을 끊지 않고 TLS 1.3 암호화 세션 키를 무중단 교체했습니다.',
      en: 'TLS 1.3 session keys were rotated without dropping a single live PLC or MES data stream connection.',
      ja: '稼働中のPLCおよびMESデータストリーム接続を切断せずに、TLS 1.3暗号セッション鍵を無停止で交換しました。'
    },
    affectedModules: {
      ko: ['ArcTunnel 게이트웨이', 'B²LAB 온톨로지', '컨센스봇 sLM'],
      en: ['ArcTunnel Gateway', 'B²LAB Ontology', 'ConsensBot sLM'],
      ja: ['ArcTunnel ゲートウェイ', 'B²LAB オントロジー', 'コンセンスボット sLM']
    },
    migrationMechanism: {
      ko: 'Twin-Session Mutual TLS Handover (0.00초 단절)',
      en: 'Twin-Session Mutual TLS Handover (0.00s interruption)',
      ja: 'Twin-Session Mutual TLS Handover (0.00秒の断絶)'
    },
    rollbackSafety: {
      ko: '키 교환 실패 시 이전 유효 인증서로 1초 내 무중단 복귀 검증 완료',
      en: 'Verified sub-second zero-downtime fallback to the previously valid certificate if key exchange fails',
      ja: '鍵交換に失敗した場合、1秒以内に以前の有効な証明書へ無停止で復帰することを検証済み'
    },
    detailTitles: {
      ko: ['보안 강화 내역', '현장 영향도'],
      en: ['Security hardening', 'Shopfloor impact'],
      ja: ['セキュリティ強化内容', '現場への影響度']
    },
    detailItems: [
      {
        ko: [
          '온프레미스 사내 노드와 ArcOS SaaS 간 mTLS 1.3 암호화 키 자동 로테이션 주기 90일 적용',
          '구형 암호화 스위트(TLS 1.2 CBC 계열) 폐기 및 ChaCha20-Poly1305 / AES-256-GCM 표준 강제',
          '공정 데이터 전송 중 터널 재연결 없이 백그라운드 세션 승계로 패킷 누락 0건 달성'
        ],
        en: [
          'Automatic 90-day rotation cycle for mTLS 1.3 keys between on-premise nodes and ArcOS SaaS',
          'Retired legacy cipher suites (TLS 1.2 CBC family) and enforced ChaCha20-Poly1305 / AES-256-GCM',
          'Zero dropped packets via background session handover, with no tunnel reconnect during process data transfer'
        ],
        ja: [
          'オンプレミス社内ノードとArcOS SaaS間のmTLS 1.3暗号鍵の自動ローテーション周期を90日に設定',
          '旧暗号スイート(TLS 1.2 CBC系)を廃止し、ChaCha20-Poly1305 / AES-256-GCM標準を強制',
          '工程データ転送中もトンネル再接続なしのバックグラウンドセッション継承でパケット欠落0件を達成'
        ]
      },
      {
        ko: [
          '가동 중인 사천·창원·오송 사업장 생산 라인 통신 영향 없음 (Downtime: 0ms)',
          'NVIDIA GPU 추론 서버 및 온톨로지 스트리밍 큐 정상 유지'
        ],
        en: [
          'No communication impact on running production lines at the Sacheon, Changwon and Osong sites (Downtime: 0ms)',
          'NVIDIA GPU inference servers and ontology streaming queues remained healthy'
        ],
        ja: [
          '稼働中の泗川・昌原・梧倉事業所の生産ライン通信に影響なし (Downtime: 0ms)',
          'NVIDIA GPU推論サーバーおよびオントロジーストリーミングキューは正常維持'
        ]
      }
    ]
  },
  'patch-4-2-2': {
    typeLabel: { ko: '규정 준수 패치', en: 'Compliance Patch', ja: '規制準拠パッチ' },
    title: {
      ko: '제약·바이오 FDA 21 CFR Part 11 전자 제조기록(EBRS) 감사추적 스키마 고도화',
      en: 'Enhanced audit-trail schema for pharma/bio FDA 21 CFR Part 11 electronic batch records (EBRS)',
      ja: '製薬・バイオ FDA 21 CFR Part 11 電子製造記録(EBRS)の監査証跡スキーマ高度化'
    },
    summary: {
      ko: '식약처 및 FDA 실사 대비 감사추적(Audit Trail) 블록체인 해시 무결성 검증 필드가 무중단 반영되었습니다.',
      en: 'Blockchain hash integrity verification fields for audit trails shipped with zero downtime ahead of MFDS and FDA inspections.',
      ja: '食薬処およびFDA査察に備え、監査証跡(Audit Trail)のブロックチェーンハッシュ完全性検証フィールドを無停止で反映しました。'
    },
    affectedModules: {
      ko: ['제약 특화 MES', 'EBRS (전자 제조기록)', '컨센스봇'],
      en: ['Pharma-Specific MES', 'EBRS (Electronic Batch Records)', 'ConsensBot'],
      ja: ['製薬特化MES', 'EBRS (電子製造記録)', 'コンセンスボット']
    },
    migrationMechanism: {
      ko: 'Non-blocking Schema Evolution (N, N-1 필드 동시 허용)',
      en: 'Non-blocking Schema Evolution (N and N-1 fields accepted simultaneously)',
      ja: 'Non-blocking Schema Evolution (N, N-1 フィールドの同時許容)'
    },
    rollbackSafety: {
      ko: '구버전 EBRS 클라이언트 하위 호환성 100% 보장',
      en: '100% backward compatibility guaranteed for legacy EBRS clients',
      ja: '旧バージョンEBRSクライアントとの下位互換性を100%保証'
    },
    detailTitles: {
      ko: ['규제 대응 패치 내역', '무중단 검증 로그'],
      en: ['Regulatory patch details', 'Zero-downtime verification log'],
      ja: ['規制対応パッチ内容', '無停止検証ログ']
    },
    detailItems: [
      {
        ko: [
          '작업자 전자서명 위변조 방지 SHA-256 증적 블록 체이닝 필드 자동 추가',
          '배치(Batch) 일탈 발생 시 온프레미스 sLM 컨센스봇에 실시간 감사 레퍼런스 자동 전달',
          '감사관 모드 읽기 전용 뷰어 권한 세분화 (테넌트 SSO 감사 프로파일 연동)'
        ],
        en: [
          'Automatic SHA-256 evidence block chaining fields added to prevent operator e-signature tampering',
          'Batch deviations are forwarded to the on-premise ConsensBot sLM as real-time audit references',
          'Finer-grained auditor read-only viewer permissions (linked to the tenant SSO audit profile)'
        ],
        ja: [
          '作業員の電子署名の改ざん防止のためSHA-256証跡ブロックチェーンフィールドを自動追加',
          'バッチ逸脱の発生時にオンプレミスsLMコンセンスボットへ監査リファレンスをリアルタイム自動連携',
          '監査官モードの読み取り専用ビューア権限を細分化 (テナントSSO監査プロファイル連係)'
        ]
      },
      {
        ko: [
          '오송 GMP 클린룸 4개 라인 연속 주사제 생산 중 롤링 배포 완료',
          '생산 데이터 유실: 0건, 스키마 마이그레이션 락 발생 시간: 0.00ms'
        ],
        en: [
          'Rolling deployment completed during continuous injectable production across 4 Osong GMP cleanroom lines',
          'Production data loss: 0 records; schema migration lock time: 0.00ms'
        ],
        ja: [
          '梧倉GMPクリーンルーム4ラインの注射剤連続生産中にローリング展開を完了',
          '生産データ損失: 0件、スキーマ移行ロック発生時間: 0.00ms'
        ]
      }
    ]
  },
  'patch-4-2-1': {
    typeLabel: { ko: '성능 최적화', en: 'Performance Optimization', ja: '性能最適化' },
    title: {
      ko: 'B²LAB 온톨로지 스트리밍 엔진 버퍼 최적화 및 OPC-UA 수집 지연 40% 단축',
      en: 'B²LAB ontology streaming engine buffer optimization, cutting OPC-UA ingestion latency by 40%',
      ja: 'B²LAB オントロジーストリーミングエンジンのバッファ最適化およびOPC-UA収集遅延の40%短縮'
    },
    summary: {
      ko: '초당 50,000건 이상의 고속 센서 태그 유입 환경에서 메모리 캐시 파이프라인을 개선했습니다.',
      en: 'Improved the memory cache pipeline for environments ingesting more than 50,000 high-speed sensor tags per second.',
      ja: '毎秒50,000件以上の高速センサータグが流入する環境向けにメモリキャッシュパイプラインを改善しました。'
    },
    affectedModules: {
      ko: ['B²LAB 온톨로지 데이터레이크', 'A²LAB MLOps', '디지털 트윈'],
      en: ['B²LAB Ontology Datalake', 'A²LAB MLOps', 'Digital Twin'],
      ja: ['B²LAB オントロジーデータレイク', 'A²LAB MLOps', 'デジタルツイン']
    },
    migrationMechanism: {
      ko: 'Canary Rolling Buffer Swap (Ring-buffer 버퍼 무손실 이양)',
      en: 'Canary Rolling Buffer Swap (lossless ring-buffer handover)',
      ja: 'Canary Rolling Buffer Swap (Ring-buffer の無損失移譲)'
    },
    rollbackSafety: {
      ko: '메모리 점유율 임계치 초과 시 이전 링버퍼 엔진 자동 롤백',
      en: 'Automatic rollback to the previous ring-buffer engine when memory utilization exceeds the threshold',
      ja: 'メモリ占有率が閾値を超過した場合、以前のリングバッファエンジンへ自動ロールバック'
    },
    detailTitles: {
      ko: ['성능 개선 내역'],
      en: ['Performance improvements'],
      ja: ['性能改善内容']
    },
    detailItems: [
      {
        ko: [
          'AAS(Asset Administration Shell) 메타데이터 질의 응답 시간 18ms -> 4.2ms 단축',
          '3D 디지털 트윈 텔레메트리 렌더링 프레임 60 FPS 안정화 (지연율 40% 개선)',
          '온프레미스 사내 노드 메모리 상주 용량 35% 절감 (Garbage Collection 주기 최적화)'
        ],
        en: [
          'AAS (Asset Administration Shell) metadata query response time reduced from 18ms to 4.2ms',
          '3D digital twin telemetry rendering stabilized at 60 FPS (40% latency improvement)',
          'On-premise node resident memory reduced by 35% (garbage collection cycle tuning)'
        ],
        ja: [
          'AAS(Asset Administration Shell)メタデータの照会応答時間を18ms → 4.2msに短縮',
          '3Dデジタルツインのテレメトリ描画を60 FPSで安定化 (遅延率40%改善)',
          'オンプレミス社内ノードの常駐メモリ容量を35%削減 (Garbage Collection周期の最適化)'
        ]
      }
    ]
  },
  'patch-4-2-0': {
    typeLabel: { ko: '기능 개선', en: 'Feature Update', ja: '機能改善' },
    title: {
      ko: 'ArcMind 노코드/로우코드 플랫폼 빌더 분리 출시 및 자체 IT 구축형 지원',
      en: 'ArcMind no-code/low-code platform builder released as a separate SKU with self-build IT support',
      ja: 'ArcMind ノーコード/ローコード プラットフォームビルダーの分離リリースおよび自社IT構築型サポート'
    },
    summary: {
      ko: '자체 IT 인력을 보유한 제조기업이 기성 MES 도입 없이 사내 맞춤형 스마트팩토리를 노코드로 제작할 수 있도록 지원합니다.',
      en: 'Manufacturers with in-house IT staff can now build a plant-specific smart factory with no code, without adopting an off-the-shelf MES.',
      ja: '自社IT要員を抱える製造企業が、既製MESを導入せずに社内カスタムのスマートファクトリーをノーコードで制作できるよう支援します。'
    },
    affectedModules: {
      ko: ['ArcMind (노코드/로우코드 빌더)', 'B²LAB 온톨로지', 'A²LAB'],
      en: ['ArcMind (No-Code/Low-Code Builder)', 'B²LAB Ontology', 'A²LAB'],
      ja: ['ArcMind (ノーコード/ローコードビルダー)', 'B²LAB オントロジー', 'A²LAB']
    },
    migrationMechanism: {
      ko: 'Dynamic Component Plugin Load (무중단 런타임 탑재)',
      en: 'Dynamic Component Plugin Load (zero-downtime runtime injection)',
      ja: 'Dynamic Component Plugin Load (無停止ランタイム搭載)'
    },
    rollbackSafety: {
      ko: '플러그인 로드 격리 샌드박스로 기존 운영 스위트 간섭 원천 차단',
      en: 'Isolated plugin-load sandbox fully prevents interference with existing operating suites',
      ja: 'プラグインロード隔離サンドボックスにより既存運用スイートへの干渉を根本から遮断'
    },
    detailTitles: {
      ko: ['기능 추가 내역'],
      en: ['New features'],
      ja: ['追加機能']
    },
    detailItems: [
      {
        ko: [
          '자체 IT 인력 전용 No-Code / Low-Code 드래그앤드롭 화면 빌더 캔버스 탑재',
          '기성 제조 운영 스위트(MES)와 중복 없이 B²LAB 온톨로지 스키마 직접 바인딩 지원',
          '모바일 현장 태블릿 화면 및 대형 생산 현황판 템플릿 24종 기본 제공'
        ],
        en: [
          'No-Code / Low-Code drag-and-drop screen builder canvas for dedicated in-house IT teams',
          'Direct B²LAB ontology schema binding without duplicating the off-the-shelf MES suite',
          '24 built-in templates for mobile shopfloor tablets and large production status boards'
        ],
        ja: [
          '自社IT要員専用のNo-Code / Low-Codeドラッグ&ドロップ画面ビルダーキャンバスを搭載',
          '既製の製造運用スイート(MES)と重複せずB²LABオントロジースキーマへ直接バインディング可能',
          'モバイル現場タブレット画面および大型生産状況ボードのテンプレート24種を標準提供'
        ]
      }
    ]
  },
  'patch-4-1-8': {
    typeLabel: { ko: '보안 패치', en: 'Security Patch', ja: 'セキュリティパッチ' },
    title: {
      ko: '온프레미스 sLM 컨센스봇 사내 문서 색인 격리 및 메모리 누수 방지 패치',
      en: 'On-premise sLM ConsensBot internal document index isolation and memory leak fix',
      ja: 'オンプレミスsLMコンセンスボットの社内文書インデックス隔離およびメモリリーク防止パッチ'
    },
    summary: {
      ko: '폐쇄망 GPU 노드에서 PDF 및 제조 매뉴얼 색인 시 발생하던 Milvus 벡터 캐시 누수를 해결했습니다.',
      en: 'Resolved a Milvus vector cache leak that occurred while indexing PDFs and manufacturing manuals on air-gapped GPU nodes.',
      ja: '閉域網GPUノードでPDFおよび製造マニュアルをインデックスする際に発生していたMilvusベクターキャッシュのリークを解消しました。'
    },
    affectedModules: {
      ko: ['컨센스봇 (ConsensBot)', '온프레미스 GPU 추론 런타임'],
      en: ['ConsensBot', 'On-Premise GPU Inference Runtime'],
      ja: ['コンセンスボット (ConsensBot)', 'オンプレミスGPU推論ランタイム']
    },
    migrationMechanism: {
      ko: 'Model Worker Rolling Restart (GPU VRAM 무단절 교체)',
      en: 'Model Worker Rolling Restart (uninterrupted GPU VRAM swap)',
      ja: 'Model Worker Rolling Restart (GPU VRAMの無断絶交換)'
    },
    rollbackSafety: {
      ko: '초기화 실패 시 예비 GPU 워커로 즉각 스탠바이 복귀',
      en: 'Immediate standby failover to a spare GPU worker if initialization fails',
      ja: '初期化に失敗した場合、予備GPUワーカーへ即座にスタンバイ復帰'
    },
    detailTitles: {
      ko: ['패치 내역'],
      en: ['Patch details'],
      ja: ['パッチ内容']
    },
    detailItems: [
      {
        ko: [
          '사내 SOP 문서 342건 벡터 임베딩 중 외부 아웃바운드 차단 감시 강화',
          'GPU VRAM 48GB 메모리 캐시 정리 스케줄러 내장',
          'sLM 질의응답 레이턴시 1.8초 -> 0.9초로 50% 향상'
        ],
        en: [
          'Strengthened outbound blocking supervision while vector-embedding 342 internal SOP documents',
          'Built-in scheduler that reclaims the 48GB GPU VRAM memory cache',
          'sLM question-answering latency improved 50%, from 1.8s to 0.9s'
        ],
        ja: [
          '社内SOP文書342件のベクター埋め込み中の外部アウトバウンド遮断監視を強化',
          'GPU VRAM 48GBのメモリキャッシュ整理スケジューラを内蔵',
          'sLM質疑応答レイテンシを1.8秒 → 0.9秒へ50%向上'
        ]
      }
    ]
  }
};

const PRINCIPLE_LOCALIZATIONS: Record<string, { title: LocalizedString; desc: LocalizedString; benefit: LocalizedString }> = {
  'canary-rolling': {
    title: {
      ko: 'Blue-Green & 카나리 무중단 롤링 교체',
      en: 'Blue-Green & canary zero-downtime rolling swap',
      ja: 'Blue-Green & カナリア無停止ローリング交換'
    },
    desc: {
      ko: '기존 버전의 컨테이너를 절대 미리 종료하지 않습니다. 신버전 컨테이너를 병렬 가동 후 헬스체크 및 온톨로지 바인딩 통과 시 10% -> 50% -> 100% 순차 승계합니다.',
      en: 'The existing version’s container is never shut down in advance. The new container runs in parallel and, once health checks and ontology binding pass, traffic is handed over 10% → 50% → 100%.',
      ja: '既存バージョンのコンテナを事前に終了させることは一切ありません。新バージョンのコンテナを並列稼働させ、ヘルスチェックとオントロジーバインディングを通過した時点で10% → 50% → 100%と順次引き継ぎます。'
    },
    benefit: {
      ko: '생산 라인 가동률 100% 보장 (다운타임 0.00초)',
      en: '100% production line uptime guaranteed (0.00s downtime)',
      ja: '生産ライン稼働率100%を保証 (ダウンタイム0.00秒)'
    }
  },
  'tunnel-buffer': {
    title: {
      ko: 'ArcTunnel 세션 유지 & PLC 제로-로스 메모리 버퍼링',
      en: 'ArcTunnel session continuity & PLC zero-loss memory buffering',
      ja: 'ArcTunnelセッション維持 & PLCゼロロス・メモリバッファリング'
    },
    desc: {
      ko: '스위치오버가 일어나는 0.2초 순간에도 현장 PLC/SCADA 센서 계측 데이터는 온프레미스 로컬 Ring-Buffer에 저장되어 단 1개의 시계열 패킷도 유실되지 않습니다.',
      en: 'Even during the 0.2-second switchover, shopfloor PLC/SCADA sensor readings are stored in an on-premise local ring buffer, so not a single time-series packet is lost.',
      ja: 'スイッチオーバーが起こる0.2秒の瞬間でも、現場のPLC/SCADAセンサー計測データはオンプレミスのローカルRing-Bufferに保存され、時系列パケットを1件も失いません。'
    },
    benefit: {
      ko: '고속 50,000 tag/s 환경에서도 데이터 유실률 0%',
      en: '0% data loss even at 50,000 tag/s throughput',
      ja: '高速50,000 tag/s環境でもデータ損失率0%'
    }
  },
  'schema-compatibility': {
    title: {
      ko: 'B²LAB 온톨로지 스키마 N / N-1 하위 호환성',
      en: 'B²LAB ontology schema N / N-1 backward compatibility',
      ja: 'B²LAB オントロジースキーマの N / N-1 下位互換性'
    },
    desc: {
      ko: '스키마 변경 시 필드 삭제나 타입 강제 변환을 금지하고, 필드 추가 및 하위 호환 매핑 정책을 강제하여 구버전 모듈과 신버전 모듈이 동시에 정상 동작합니다.',
      en: 'Schema changes may never delete fields or force type conversions; only additive fields and backward-compatible mapping policies are allowed, so old and new module versions run correctly side by side.',
      ja: 'スキーマ変更時のフィールド削除や型の強制変換を禁止し、フィールド追加および下位互換マッピングポリシーを強制することで、旧バージョンと新バージョンのモジュールが同時に正常動作します。'
    },
    benefit: {
      ko: '공장 내 이종 버전 모듈 간 충돌 없는 점진적 업그레이드',
      en: 'Gradual upgrades with no conflicts between mixed module versions in a plant',
      ja: '工場内の異バージョンモジュール間で衝突のない段階的アップグレード'
    }
  },
  'auto-rollback': {
    title: {
      ko: '3초 이내 무중단 자동 롤백 가드레일',
      en: 'Zero-downtime automatic rollback guardrail within 3 seconds',
      ja: '3秒以内の無停止自動ロールバック・ガードレール'
    },
    desc: {
      ko: '신버전 배포 직후 헬스체크 응답 지연(>200ms)이나 비정상 예외가 감지되면 즉시 트래픽을 구버전으로 원상복귀시키며 작업자 개입 없이 안전을 유지합니다.',
      en: 'If health check latency (>200ms) or an abnormal exception is detected right after a new version is deployed, traffic instantly reverts to the previous version, keeping the line safe with no operator intervention.',
      ja: '新バージョン展開直後にヘルスチェック応答遅延(>200ms)や異常例外が検知された場合、直ちにトラフィックを旧バージョンへ原状復帰させ、作業員の介入なしに安全を維持します。'
    },
    benefit: {
      ko: '패치 실패 리스크 제로화 및 휴먼 에러 원천 차단',
      en: 'Patch failure risk eliminated and human error blocked at the source',
      ja: 'パッチ失敗リスクのゼロ化およびヒューマンエラーの根本遮断'
    }
  }
};

export function getLocalizedPatchNote(patch: PatchNoteItem, lang?: Language | string): PatchNoteItem {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  const loc = PATCH_NOTE_LOCALIZATIONS[patch.id];
  if (!loc) {
    return patch;
  }
  return {
    ...patch,
    typeLabel: loc.typeLabel[l] || patch.typeLabel,
    title: loc.title[l] || patch.title,
    summary: loc.summary[l] || patch.summary,
    affectedModules: loc.affectedModules[l] || patch.affectedModules,
    migrationMechanism: loc.migrationMechanism[l] || patch.migrationMechanism,
    rollbackSafety: loc.rollbackSafety[l] || patch.rollbackSafety,
    details: patch.details.map((section, idx) => ({
      title: loc.detailTitles[l]?.[idx] || section.title,
      items: loc.detailItems[idx]?.[l] || section.items
    }))
  };
}

export function getLocalizedPrincipleTitle(id: string, fallback: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  return PRINCIPLE_LOCALIZATIONS[id]?.title[l] || fallback;
}

export function getLocalizedPrincipleDesc(id: string, fallback: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  return PRINCIPLE_LOCALIZATIONS[id]?.desc[l] || fallback;
}

export function getLocalizedPrincipleBenefit(id: string, fallback: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  return PRINCIPLE_LOCALIZATIONS[id]?.benefit[l] || fallback;
}

/**
 * Workspace-facing strings are stored on the runtime state objects (installed
 * modules, decommissioned modules, PoC trials) as their Korean canonical form,
 * including the ones App/PoCApplyModal generate at runtime. They are keyed here
 * by that canonical text and translated at render time.
 */
const WORKSPACE_LOCALIZATIONS: Record<string, LocalizedString> = {
  // Module names
  'B²LAB 온톨로지 데이터레이크': { ko: 'B²LAB 온톨로지 데이터레이크', en: 'B²LAB Ontology Datalake', ja: 'B²LAB オントロジーデータレイク' },
  '제약 특화 MES (Smart Factory)': { ko: '제약 특화 MES (Smart Factory)', en: 'Pharma-Specific MES (Smart Factory)', ja: '製薬特化MES (Smart Factory)' },
  'EBRS (전자 제조기록)': { ko: 'EBRS (전자 제조기록)', en: 'EBRS (Electronic Batch Records)', ja: 'EBRS (電子製造記録)' },
  'SCM (공급망 협업 연계)': { ko: 'SCM (공급망 협업 연계)', en: 'SCM (Supply Chain Collaboration)', ja: 'SCM (サプライチェーン協業連係)' },
  'AI Vision 결함 탐지 (ArcVision)': { ko: 'AI Vision 결함 탐지 (ArcVision)', en: 'AI Vision Defect Detection (ArcVision)', ja: 'AI Vision 欠陥検知 (ArcVision)' },
  'A²LAB (AI 모듈 생성기)': { ko: 'A²LAB (AI 모듈 생성기)', en: 'A²LAB (AI Model Generator)', ja: 'A²LAB (AIモデル生成)' },
  '다중 AI Agent 슈퍼바이저': { ko: '다중 AI Agent 슈퍼바이저', en: 'Multi-AI Agent Supervisor', ja: 'マルチAI Agent スーパーバイザー' },
  '컨센스봇 (ConsensBot)': { ko: '컨센스봇 (ConsensBot)', en: 'ConsensBot (Regulatory sLM)', ja: 'コンセンスボット (ConsensBot)' },
  '디지털 트윈 (Digital Twin)': { ko: '디지털 트윈 (Digital Twin)', en: 'Digital Twin', ja: 'デジタルツイン (Digital Twin)' },
  'ArcMind (노코드/로우코드 플랫폼 빌더)': { ko: 'ArcMind (노코드/로우코드 플랫폼 빌더)', en: 'ArcMind (No-Code/Low-Code Platform Builder)', ja: 'ArcMind (ノーコード/ローコード プラットフォームビルダー)' },

  // Module categories
  '공통 기반': { ko: '공통 기반', en: 'Shared Core', ja: '共通基盤' },
  '스위트 코어': { ko: '스위트 코어', en: 'Suite Core', ja: 'スイートコア' },
  '스위트 확장': { ko: '스위트 확장', en: 'Suite Extension', ja: 'スイート拡張' },
  '에너지': { ko: '에너지', en: 'Energy', ja: 'エネルギー' },
  '시각화': { ko: '시각화', en: 'Visualization', ja: '可視化' },
  '기반': { ko: '기반', en: 'Core', ja: '基盤' },
  '빌더': { ko: '빌더', en: 'Builder', ja: 'ビルダー' },

  // Runtime health / binding status
  '방금 전 (정상 수신)': { ko: '방금 전 (정상 수신)', en: 'just now (healthy)', ja: 'たった今 (正常受信)' },
  '3초 전 (정상 수신)': { ko: '3초 전 (정상 수신)', en: '3s ago (healthy)', ja: '3秒前 (正常受信)' },
  '5초 전 (정상 수신)': { ko: '5초 전 (정상 수신)', en: '5s ago (healthy)', ja: '5秒前 (正常受信)' },
  '12초 전 (정상 수신)': { ko: '12초 전 (정상 수신)', en: '12s ago (healthy)', ja: '12秒前 (正常受信)' },
  'B²LAB 온톨로지 바인딩 완료': { ko: 'B²LAB 온톨로지 바인딩 완료', en: 'B²LAB ontology binding complete', ja: 'B²LAB オントロジーバインディング完了' },
  '표준 스키마 48개 태그 매핑 완료 (AAS/OPC-UA)': {
    ko: '표준 스키마 48개 태그 매핑 완료 (AAS/OPC-UA)',
    en: 'Standard schema: 48 tags mapped (AAS/OPC-UA)',
    ja: '標準スキーマ48タグのマッピング完了 (AAS/OPC-UA)'
  },
  '생산 LOT 및 GMP 전자서명 로컬 기록 중': {
    ko: '생산 LOT 및 GMP 전자서명 로컬 기록 중',
    en: 'Recording production LOTs and GMP e-signatures locally',
    ja: '生産LOTおよびGMP電子署名をローカル記録中'
  },
  'CFR Part 11 감사추적 DB 동기화 중': {
    ko: 'CFR Part 11 감사추적 DB 동기화 중',
    en: 'Syncing the CFR Part 11 audit trail DB',
    ja: 'CFR Part 11 監査証跡DBを同期中'
  },

  // Read-only retention
  '협력사 발주 및 납기 검수 이력 12,480건 (암호화 압축)': {
    ko: '협력사 발주 및 납기 검수 이력 12,480건 (암호화 압축)',
    en: 'Supplier PO & delivery inspection history: 12,480 records (encrypted, compressed)',
    ja: '協力会社の発注および納期検収履歴12,480件 (暗号化圧縮)'
  },
  '2029년 03월 31일 (의무 보존 5년)': {
    ko: '2029년 03월 31일 (의무 보존 5년)',
    en: 'March 31, 2029 (5-year mandatory retention)',
    ja: '2029年03月31日 (義務保存5年)'
  },
  '사내 구매팀 ERP 직접 이관에 따른 구독 해지 후 감사용 읽기전용 보존 전환': {
    ko: '사내 구매팀 ERP 직접 이관에 따른 구독 해지 후 감사용 읽기전용 보존 전환',
    en: 'Subscription cancelled after migrating to the in-house purchasing ERP; converted to read-only retention for audit',
    ja: '社内購買チームERPへの直接移管に伴う解約後、監査用の読み取り専用保存へ移行'
  },

  // PoC trial fields
  '가공 표면 미세 스크래치 실시간 AI 검출률 99.2% 실증 및 오탐 최소화': {
    ko: '가공 표면 미세 스크래치 실시간 AI 검출률 99.2% 실증 및 오탐 최소화',
    en: 'Demonstrate 99.2% real-time AI detection of micro-scratches on machined surfaces while minimizing false positives',
    ja: '加工表面の微細スクラッチのリアルタイムAI検出率99.2%の実証および誤検知の最小化'
  },
  '제조기술팀 / 김선임': { ko: '제조기술팀 / 김선임', en: 'Manufacturing Engineering / Senior Engineer Kim', ja: '製造技術チーム / キム主任' },
  '사내 공정 적합성 실증': { ko: '사내 공정 적합성 실증', en: 'In-house process suitability validation', ja: '社内工程適合性の実証' },
  '제조기술팀': { ko: '제조기술팀', en: 'Manufacturing Engineering', ja: '製造技術チーム' }
};

export function getLocalizedWorkspaceText(text: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  return WORKSPACE_LOCALIZATIONS[text]?.[l] || text;
}

const GROWTH_METRIC_LOCALIZATIONS: Record<string, LocalizedString> = {
  '생산 라인 수 / 배치 건수': {
    ko: '생산 라인 수 / 배치 건수',
    en: 'Production lines / batch records',
    ja: '生産ライン数 / バッチ件数'
  },
  '월간 추론 호출 수 (단위: 만 건)': {
    ko: '월간 추론 호출 수 (단위: 만 건)',
    en: 'Monthly inference calls (unit: 10K calls)',
    ja: '月間推論コール数 (単位: 万件)'
  },
  '연계 에이전트 수': { ko: '연계 에이전트 수', en: 'Connected agents', ja: '連係エージェント数' },
  '운영 라이선스 사용자 수': { ko: '운영 라이선스 사용자 수', en: 'Licensed operating users', ja: '運用ライセンスユーザー数' },
  '실시간 전력·유틸리티 계측점 수': {
    ko: '실시간 전력·유틸리티 계측점 수',
    en: 'Real-time power & utility measurement points',
    ja: 'リアルタイム電力・ユーティリティ計測点数'
  },
  '디지털화 대상 사업장 면적 및 라인': {
    ko: '디지털화 대상 사업장 면적 및 라인',
    en: 'Digitized facility floor area and lines',
    ja: 'デジタル化対象事業所の面積およびライン'
  },
  '제작 대시보드 시트 수': { ko: '제작 대시보드 시트 수', en: 'Authored dashboard sheets', ja: '作成ダッシュボードシート数' },
  '데이터 용량 구간 (기본 1TB 포함)': {
    ko: '데이터 용량 구간 (기본 1TB 포함)',
    en: 'Data storage tier (1TB included)',
    ja: 'データ容量区間 (基本1TB込み)'
  }
};

export function getLocalizedGrowthMetric(metric: string, lang?: Language | string): string {
  const l: Language = (lang === 'ja' || lang === 'en') ? lang : 'ko';
  return GROWTH_METRIC_LOCALIZATIONS[metric]?.[l] || metric;
}
