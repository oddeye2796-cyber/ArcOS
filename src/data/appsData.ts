import { AppItem, WorkspaceInstalledModule, DecommissionedModule, PoCTrial } from '../types';

export const APPS_DATA: AppItem[] = [
  {
    id: 'smartfactory',
    name: 'Smart Factory',
    category: 'Smart Factory',
    categoryLabel: '제조 운영 스위트',
    status: 'ready',
    statusLabel: '설치 가능',
    desc: '업종에 맞는 MES와 품질·기록 모듈을 골라 구성하는 제조 운영 스위트',
    detail: '일반 제조, 식품·화장품, 제약 바이오 등 산업군별 규제 표준을 준수하는 모듈형 MES 스위트입니다. 생산 현장의 도메인 DB와 직접 연결되지 않고, B²LAB 온톨로지 계층을 경유하여 무중단 플러그앤플레이 연동을 지원합니다.',
    unit: '모듈별 개별 과금',
    growthMetric: '생산 라인 수 / 계측점 수 / 협력사 수',
    growthUnit: '라인 · 계측점 · 협력사',
    suite: true,
    deps: [
      { name: 'B²LAB 온톨로지 데이터레이크', ok: true, desc: '별도 구독 중 (공통 기반 모듈)' },
      { name: 'ArcTunnel mTLS 게이트웨이', ok: true, desc: '현장 온프레미스 노드 연결됨 (레이턴시 4ms)' },
      { name: 'KS X 9101 설비 데이터 규격', ok: true, desc: '사업장 생산라인 PLC 매핑 검증 완료' }
    ],
    groups: [
      {
        label: 'MES 코어 (상호 배타적 · 1종 필수 선택)',
        type: 'radio',
        items: [
          {
            id: 'mes-pharma',
            name: '제약 특화 MES',
            desc: 'GMP 기준 배치(Batch) 관리, 일탈(Deviation) 처리, 밸리데이션 데이터 추적',
            price: 80,
            per: 'line',
            unitLabel: '라인당 80만원/월',
            tagMappingPercent: 94
          },
          {
            id: 'mes-food',
            name: '식품·화장품 특화 MES',
            desc: 'HACCP 중요관리점(CCP) 실시간 자동 기록, 원료 역추적 및 유통기한 관리',
            price: 60,
            per: 'line',
            unitLabel: '라인당 60만원/월',
            tagMappingPercent: 89
          },
          {
            id: 'mes-general',
            landing: true,
            name: '일반 제조 MES',
            desc: '생산 실행, LOT 실시간 추적, 설비 가동률 분석, N-POP 바코드 연동',
            price: 40,
            per: 'line',
            unitLabel: '라인당 40만원/월',
            tagMappingPercent: 96
          }
        ]
      },
      {
        label: '품질 · 기록 · 공급망 확장 모듈 (자유 조합)',
        type: 'check',
        items: [
          {
            id: 'ebrs',
            name: 'EBRS (전자 제조기록)',
            desc: 'FDA 21 CFR Part 11 전자서명 및 감사추적(Audit Trail) 규제 준수 기록 관리',
            price: 120,
            per: 'flat',
            unitLabel: '기본 120만원/월 (배치량 연동)',
            tagMappingPercent: 91
          },
          {
            id: 'rems',
            name: 'REMS (청정실 환경 모니터링)',
            desc: '차압, 온습도, 미립자 부유 농도 실시간 수집 및 경보 발령',
            price: 90,
            per: 'point',
            unitLabel: '기본 90만원/월 (계측점 200개 포함, 100개당 15% 증분)',
            tagMappingPercent: 88
          },
          {
            id: 'scm',
            name: 'SCM (공급망 협업 연계)',
            desc: '원자재 발주, 실시간 납기 트래킹, 1·2차 외주 협력사 포털 연동',
            price: 100,
            per: 'partner',
            unitLabel: '기본 100만원/월 (협력사 10개사 포함, 10개사당 20% 증분)',
            tagMappingPercent: 85
          }
        ]
      }
    ],
    dataScope: {
      domainDb: '현장 온프레미스 사내 DB (방화벽 내부 보존)',
      schemaStd: 'AAS / OPC-UA / KS X 9101',
      outboundAllowed: false,
      mappingProgress: 92
    },
    deploymentLocations: [
      { location: '[경남/사천] 항공·정밀가공 사업장', tunnelStatus: 'connected', runtimeVersion: 'v4.2' },
      { location: '[경남/창원] 기계·특수제조 사업장', tunnelStatus: 'connected', runtimeVersion: 'v4.2' },
      { location: '[충북/오송] 제약·바이오 GMP 사업장', tunnelStatus: 'connected', runtimeVersion: 'v4.2' },
      { location: '[전북/익산] 식품·화장품 HACCP 사업장', tunnelStatus: 'connected', runtimeVersion: 'v4.1' }
    ],
    permissions: [
      { scope: '생산 라인 설비 PLC 읽기', isWriteCmd: false, granted: true },
      { scope: '배치 완료 승인 및 전자 서명', isWriteCmd: true, granted: true },
      { scope: '공정 레시피 제어 명령(Write)', isWriteCmd: true, granted: false }
    ]
  },
  {
    id: 'a2lab',
    name: 'A²LAB (AI 모듈 생성기)',
    category: 'AI',
    categoryLabel: 'AI 모듈 생성',
    status: 'ready',
    statusLabel: '설치 가능',
    desc: '노코드로 품질 예측, 설비 예지보전 같은 산업용 AI 에이전트 모듈을 제작·학습합니다',
    detail: '현장 엔지니어가 코딩 없이도 B²LAB 온톨로지 데이터를 기반으로 AI 에이전트를 파이프라인 형태로 빌드합니다. MLOps 실행엔진과 결합하여 컨테이너화된 추론 모듈을 온프레미스 런타임에 즉각 배포합니다.',
    unit: '기본료 + 추론 호출 종량',
    growthMetric: '월간 추론 호출 수 (단위: 만 건)',
    growthUnit: '추론 호출',
    price: 150,
    per: 'flat',
    deps: [
      { name: 'B²LAB 데이터레이크', ok: true, desc: '온톨로지 스키마 정합성 검증 완료' },
      { name: 'MLOps 실행엔진', ok: true, desc: '온프레미스 도커 런타임 기본 탑재' }
    ],
    dataScope: {
      domainDb: '학습 데이터는 사내 로컬 GPU 클러스터 내부에서만 순환',
      schemaStd: 'OPC-UA / Parquet Lakehouse',
      outboundAllowed: false,
      mappingProgress: 95
    },
    deploymentLocations: [
      { location: '[경남/사천] 항공·정밀가공 사업장 AI 노드', tunnelStatus: 'connected', runtimeVersion: 'v4.2' },
      { location: '[경남/창원] 기계·특수제조 사업장 AI 노드', tunnelStatus: 'connected', runtimeVersion: 'v4.2' },
      { location: '[충북/오송] 제약·바이오 GMP 사업장 AI 노드', tunnelStatus: 'connected', runtimeVersion: 'v4.2' }
    ],
    permissions: [
      { scope: '센서 시계열 데이터 학습용 Read', isWriteCmd: false, granted: true },
      { scope: '새 에이전트 컨테이너 기동', isWriteCmd: true, granted: true }
    ]
  },
  {
    id: 'orch',
    name: '다중 AI Agent 슈퍼바이저',
    category: 'AI',
    categoryLabel: 'AI 오케스트레이션',
    status: 'need',
    statusLabel: '선행 조건 확인',
    desc: 'A²LAB에서 생성된 여러 도메인 특화 에이전트의 판단을 교차검증하고 공정 제어를 조율합니다',
    detail: '품질 예측, 설비 예지, 에너지 제어 에이전트의 충돌을 방지하고 상호 의존성을 오케스트레이션하는 상위 런타임입니다. 현업 에이전트가 3개 이상 운영될 때 필수적인 지휘 통제탑 역할을 수행합니다.',
    unit: '활성 에이전트 모듈 수',
    growthMetric: '연계 에이전트 수',
    growthUnit: '에이전트',
    price: 200,
    per: 'flat',
    deps: [
      { name: 'A²LAB (선행 모듈)', ok: false, desc: '선행 에이전트 제작 도구 필요 (함께 담기 권장)' },
      { name: '등록된 에이전트 모듈 3개 이상', ok: false, desc: '현재 사업장에 1개 등록됨 (A²LAB 설치 후 생성 가능)' }
    ],
    dataScope: {
      domainDb: '에이전트 판단 신뢰도 벡터 및 결정 로그 (사내)',
      schemaStd: 'ArcOS 공통 이벤트 버스 (Pub/Sub)',
      outboundAllowed: false,
      mappingProgress: 78
    },
    deploymentLocations: [
      { location: '[경남/사천] 항공·정밀가공 사업장 엣지 노드', tunnelStatus: 'connected', runtimeVersion: 'v4.2' },
      { location: '[경기/화성] 전자·반도체 부품 사업장 엣지 노드', tunnelStatus: 'connected', runtimeVersion: 'v4.2' }
    ],
    permissions: [
      { scope: '에이전트 간 이벤트 버스 라우팅', isWriteCmd: true, granted: true },
      { scope: '설비 자동 비상 정지 트리거', isWriteCmd: true, granted: false }
    ]
  },
  {
    id: 'consensbot',
    landing: true,
    name: '컨센스봇 (ConsensBot)',
    category: 'LLM',
    categoryLabel: '온프레미스 sLM',
    status: 'onprem',
    statusLabel: '온프레미스 전용',
    desc: '사내 규정 및 제조 지침서를 완벽 학습해 공정 일탈 원인 분석 및 감사 보고서 초안을 작성합니다',
    detail: '외부 클라우드로 내부 문서를 단 1바이트도 전송하지 않는 온프레미스 전용 도메인 특화 경량 언어모델(sLM)입니다. 제약·식품 분야의 까다로운 감사(Audit) 대응 질의응답 및 제조기록서 자동 초안 작성을 근거 문서 링크와 함께 제공합니다.',
    unit: '사내 동시 사용자 라이선스',
    growthMetric: '운영 라이선스 사용자 수',
    growthUnit: '사용자',
    price: 180,
    per: 'flat',
    deps: [
      { name: '온프레미스 GPU 추론 서버', ok: true, desc: '현장 사내 NVIDIA L40S 2기 구축 확인됨' },
      { name: '사내 제조 기준서(SOP) 벡터 색인', ok: false, desc: '기준서 342건 중 0건 색인 (설치 후 사내 자동 파싱)' }
    ],
    dataScope: {
      domainDb: '사내 보안 파일서버 (SOP, GMP 규정 문서 342건)',
      schemaStd: 'PDF/Docx 온톨로지 청킹 및 사내 Milvus 벡터DB',
      outboundAllowed: false,
      mappingProgress: 82
    },
    deploymentLocations: [
      { location: '[충북/오송] 제약·바이오 GMP 사업장 GPU 노드', tunnelStatus: 'connected', runtimeVersion: 'v4.2' },
      { location: '[경남/사천] 항공·정밀가공 사업장 폐쇄망 노드', tunnelStatus: 'connected', runtimeVersion: 'v4.2' }
    ],
    permissions: [
      { scope: '사내 문서 저장소 Read', isWriteCmd: false, granted: true },
      { scope: '외부망 아웃바운드 차단 확인', isWriteCmd: false, granted: true }
    ]
  },
  {
    id: 'aesg',
    name: 'A.ESG / A.Station',
    category: '에너지',
    categoryLabel: '에너지 & ESG',
    status: 'need',
    statusLabel: '선행 조건 확인',
    desc: '공장 내 전력·가스 계측 데이터를 실시간 수집해 탄소 배출량을 감축하고 최대 전력을 제어합니다',
    detail: '전력 피크 제어와 온실가스 스코프 1·2 인벤토리를 자동 산출합니다. B²LAB 온톨로지의 설비 에너지 프로파일과 연계하여 생산 계획 대비 최적의 에너지 소비 스케줄을 수립합니다.',
    unit: '공장 계측점(Tag) 수',
    growthMetric: '실시간 전력·유틸리티 계측점 수',
    growthUnit: '계측점',
    price: 130,
    per: 'flat',
    deps: [
      { name: 'B²LAB 데이터레이크', ok: true, desc: '구독 중 (플랫폼 기본료)' },
      { name: '사내 전력량계/유량계 태그 매핑', ok: false, desc: '계측 태그 48개 중 42개 완료 (6개 추가 필요)' }
    ],
    dataScope: {
      domainDb: 'SCADA 및 전력 계측기 시계열 DB (InfluxDB)',
      schemaStd: 'Modbus TCP / KS X 9101',
      outboundAllowed: false,
      mappingProgress: 87
    },
    deploymentLocations: [
      { location: '[경남/창원] 기계·특수제조 사업장 변전실', tunnelStatus: 'connected', runtimeVersion: 'v4.2' },
      { location: '[전북/익산] 식품·화장품 HACCP 사업장 계측반', tunnelStatus: 'connected', runtimeVersion: 'v4.1' }
    ],
    permissions: [
      { scope: '전력 계측점 주기적 폴링', isWriteCmd: false, granted: true },
      { scope: '피크 전력 차단기 릴레이 제어', isWriteCmd: true, granted: false }
    ]
  },
  {
    id: 'twin',
    name: '디지털 트윈 (Digital Twin)',
    category: '시각화',
    categoryLabel: '3D 공정 시각화',
    status: 'ready',
    statusLabel: '설치 가능',
    desc: '공장 설비 배치와 실시간 가동 상태, 병목 구간을 3차원 입체 공간에서 즉각 파악합니다',
    detail: '생산 라인의 센서 값, 불량 알람, 물류 AGV 위치를 3D 웹 캔버스에 실시간 렌더링합니다. 별도의 고가 클라이언트 설치 없이 웹 브라우저에서 직관적인 현장 가상 순찰이 가능합니다.',
    unit: '등록 사업장 및 라인 수',
    growthMetric: '디지털화 대상 사업장 면적 및 라인',
    growthUnit: '사업장',
    price: 110,
    per: 'flat',
    deps: [
      { name: 'Smart Factory MES 또는 A.ESG', ok: true, desc: '사업장 MES 데이터 연동 가능' }
    ],
    dataScope: {
      domainDb: 'B²LAB 온톨로지 스트리밍 버스',
      schemaStd: 'GLTF / glTF 3D + OPC-UA Telemetry',
      outboundAllowed: false,
      mappingProgress: 94
    },
    deploymentLocations: [
      { location: '[경남/사천] 항공·정밀가공 사업장 종합관제실', tunnelStatus: 'connected', runtimeVersion: 'v4.2' },
      { location: '[경기/화성] 전자·반도체 부품 사업장 모니터링룸', tunnelStatus: 'connected', runtimeVersion: 'v4.2' }
    ],
    permissions: [
      { scope: '설비 3D 텔레메트리 구독', isWriteCmd: false, granted: true }
    ]
  },
  {
    id: 'arcmind',
    name: 'ArcMind (노코드/로우코드 플랫폼 빌더)',
    category: '빌더',
    categoryLabel: '자체 IT 플랫폼 빌더',
    status: 'ready',
    statusLabel: '설치 가능',
    desc: '자체 IT 인력을 보유한 기업이 기성 MES 도입 없이 No-Code / Low-Code로 기업 고유의 Smart Factory 플랫폼을 직접 구축하는 전용 빌더',
    detail: '자체 IT/전산 인력을 보유한 엔터프라이즈를 위한 전용 빌더입니다. 기성 제조 운영 스위트(MES)를 도입하는 대신, B²LAB 온톨로지 데이터를 기반으로 노코드/로우코드를 통해 작업 지시서, 생산 공정 뷰, 일별 현황판, 로직을 사내 IT 인력이 100% 맞춤 제작합니다. 기성 Smart Factory 스위트와 중복 도입되지 않도록 독립된 자체 구축 경로로 제공됩니다.',
    unit: '엔터프라이즈 빌더 라이선스 (시트 및 작성 권한)',
    growthMetric: '제작 대시보드 시트 수',
    growthUnit: '시트',
    price: 90,
    per: 'flat',
    deps: [
      { name: 'B²LAB 온톨로지 데이터레이크', ok: true, desc: '별도 구독 중 (GraphQL / REST 온톨로지 연동)' },
      { name: '자체 IT 전산 인력', ok: true, desc: '사내 No-Code/Low-Code 화면 및 비즈니스 로직 작성 주체' }
    ],
    dataScope: {
      domainDb: 'B²LAB 온톨로지 GraphQL & REST API',
      schemaStd: 'ArcMind JSON Schema 컴포넌트 규약 (KS X 9101 매핑)',
      outboundAllowed: false,
      mappingProgress: 100
    },
    deploymentLocations: [
      { location: 'ArcOS 제어 평면 (SaaS) 및 사내 캐시 노드', tunnelStatus: 'connected', runtimeVersion: 'v4.2' }
    ],
    permissions: [
      { scope: '화면 레이아웃 및 컴포넌트 Read/Write', isWriteCmd: true, granted: true }
    ]
  },
  {
    id: 'b2lab',
    name: 'B²LAB 온톨로지 데이터레이크',
    category: '기반',
    categoryLabel: '공통 필수 기반',
    status: 'sub',
    statusLabel: '구독 중 (별도 과금)',
    desc: '다양한 사내 도메인 DB를 표준 온톨로지 스키마로 가상화하여 앱에 제공하는 데이터 척추',
    detail: '플랫폼 기본료와 별도로 책정되는 공통 기반 모듈입니다. AAS, OPC-UA, KS X 9101 표준을 기반으로 사내 이종 DB(MES, ERP, 설비 PLC)를 중계하여, 새 모듈 설치 시에도 기존 시스템 코드를 변경할 필요가 없습니다. 다른 모듈이 도메인 데이터를 조회하려면 이 계층이 먼저 있어야 합니다.',
    unit: '월 80만원 (기본 1TB 포함)',
    price: 80,
    per: 'flat',
    growthMetric: '데이터 용량 구간 (기본 1TB 포함)',
    growthUnit: '용량',
    deps: [],
    dataScope: {
      domainDb: '사업장 레거시 DB 전체 가상화 인터페이스',
      schemaStd: 'AAS / OPC-UA / KS X 9101 표준 온톨로지',
      outboundAllowed: false,
      mappingProgress: 98
    },
    deploymentLocations: [
      { location: '[경남/사천] 항공·정밀가공 사업장 인스턴스', tunnelStatus: 'connected', runtimeVersion: 'v4.2' },
      { location: '[충북/오송] 제약·바이오 GMP 사업장 인스턴스', tunnelStatus: 'connected', runtimeVersion: 'v4.2' },
      { location: '[전북/익산] 식품·화장품 HACCP 사업장 인스턴스', tunnelStatus: 'connected', runtimeVersion: 'v4.1' }
    ],
    permissions: [
      { scope: '사내 온톨로지 메타데이터 카탈로그 관리', isWriteCmd: true, granted: true }
    ]
  }
];

/**
 * Ids of the mutually exclusive MES core modules, derived from the radio groups
 * rather than hand-listed: the quote's conflict check used to carry a stale
 * copy of this list and silently missed two of the three cores.
 */
/**
 * The no-code builder that conflicts with a packaged MES core. Named here for
 * the same reason as above: the quote's conflict check referred to an
 * 'arcmind-builder' id that has never existed in the catalog.
 */
export const ARCMIND_ID = 'arcmind';

export const MES_CORE_IDS: readonly string[] = APPS_DATA.flatMap(
  (app) => app.groups?.filter((g) => g.type === 'radio').flatMap((g) => g.items.map((i) => i.id)) ?? []
);

export const INITIAL_INSTALLED_MODULES: WorkspaceInstalledModule[] = [
  {
    id: 'b2lab',
    name: 'B²LAB 온톨로지 데이터레이크',
    category: '공통 기반',
    location: '[경남/사천] 항공·정밀가공 사업장 온프레미스',
    runtimeVersion: 'v4.2',
    status: 'active',
    lastPing: '3초 전 (정상 수신)',
    dataLakeBinding: '표준 스키마 48개 태그 매핑 완료 (AAS/OPC-UA)',
    localResource: 'CPU 12% | RAM 4.2GB / 16GB'
  },
  {
    id: 'mes-pharma',
    name: '제약 특화 MES (Smart Factory)',
    category: '스위트 코어',
    location: '[충북/오송] 제약·바이오 GMP 사업장 (라인 #1~#4)',
    runtimeVersion: 'v4.2',
    status: 'active',
    lastPing: '5초 전 (정상 수신)',
    dataLakeBinding: '생산 LOT 및 GMP 전자서명 로컬 기록 중',
    localResource: 'CPU 28% | RAM 8.6GB / 32GB'
  },
  {
    id: 'ebrs',
    name: 'EBRS (전자 제조기록)',
    category: '스위트 확장',
    location: '[충북/오송] 제약·바이오 GMP 사업장 온프레미스',
    runtimeVersion: 'v4.1',
    status: 'update_required',
    lastPing: '12초 전 (정상 수신)',
    dataLakeBinding: 'CFR Part 11 감사추적 DB 동기화 중',
    localResource: 'CPU 18% | RAM 3.1GB / 16GB'
  }
];

export const INITIAL_DECOMMISSIONED_MODULES: DecommissionedModule[] = [
  {
    id: 'scm-archive',
    name: 'SCM (공급망 협업 연계)',
    retainedData: '협력사 발주 및 납기 검수 이력 12,480건 (암호화 압축)',
    retentionExpiry: '2029년 03월 31일 (의무 보존 5년)',
    retentionFee: 15, // 만원/월
    status: 'read_only_retained',
    reason: '사내 구매팀 ERP 직접 이관에 따른 구독 해지 후 감사용 읽기전용 보존 전환'
  }
];

export const INITIAL_POC_TRIALS: PoCTrial[] = [
  {
    id: 'poc-vision',
    appId: 'vision',
    name: 'AI Vision 결함 탐지 (ArcVision)',
    category: 'AI',
    startedAt: '2026-09-01',
    expiresAt: '2026-09-15',
    daysRemaining: 9,
    location: '[경남/사천] 항공·정밀가공 사업장',
    pocGoal: '가공 표면 미세 스크래치 실시간 AI 검출률 99.2% 실증 및 오탐 최소화',
    leadDepartment: '제조기술팀 / 김선임',
    status: 'active',
    dataIsolationMode: 'sandbox_mirror',
    healthScore: 97,
    tagsProcessed: 184200,
    runtimeVersion: 'v4.2-sandbox',
    sampleLoaded: true
  }
];

