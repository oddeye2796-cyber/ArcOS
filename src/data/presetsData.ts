import { FacilityLocation, RecommendationPreset } from '../types';

export const FACILITIES_LIST: FacilityLocation[] = [
  {
    id: 'aerospace-precision',
    region: '경남/사천',
    industry: '항공·정밀가공',
    fullName: '[경남/사천] 항공·정밀가공 사업장',
    subTitle: '항공기 정밀 부품 및 5축 가공 공정',
    runtimeVersion: 'v4.2',
    tunnelStatus: 'connected',
    latencyMs: 4
  },
  {
    id: 'machinery-specialty',
    region: '경남/창원',
    industry: '기계·특수제조',
    fullName: '[경남/창원] 기계·특수제조 사업장',
    subTitle: '대형 산업기계 및 열처리 가공 공정',
    runtimeVersion: 'v4.2',
    tunnelStatus: 'connected',
    latencyMs: 5
  },
  {
    id: 'bio-pharma',
    region: '충북/오송',
    industry: '제약·바이오 GMP',
    fullName: '[충북/오송] 제약·바이오 GMP 사업장',
    subTitle: '무균 주사제 및 완제의약품 청정실(Cleanroom)',
    runtimeVersion: 'v4.2',
    tunnelStatus: 'connected',
    latencyMs: 6
  },
  {
    id: 'food-cosmetics',
    region: '전북/익산',
    industry: '식품·화장품 HACCP',
    fullName: '[전북/익산] 식품·화장품 HACCP 사업장',
    subTitle: '배합·충진 및 HACCP 중요관리점(CCP) 공정',
    runtimeVersion: 'v4.1',
    tunnelStatus: 'connected',
    latencyMs: 7
  },
  {
    id: 'electronics-semi',
    region: '경기/화성',
    industry: '전자·반도체 조립',
    fullName: '[경기/화성] 전자·반도체 부품 사업장',
    subTitle: '고속 SMT 및 전장 모듈 조립 라인',
    runtimeVersion: 'v4.2',
    tunnelStatus: 'connected',
    latencyMs: 3
  }
];

export const RECOMMENDATION_PRESETS: RecommendationPreset[] = [
  // 1. 업종별 추천 조합
  {
    id: 'preset-pharma',
    title: '제약·바이오 GMP 규제 대응형',
    subtitle: 'GMP 밸리데이션 · CFR Part 11 전자서명 · 규정 sLM',
    type: 'industry',
    targetAudience: '제약 / 바이오 / 의료기기 제조사',
    badge: '규제 대응',
    desc: 'FDA 21 CFR Part 11 전자 제조기록과 청정실 환경 모니터링을 결합하고, 사내 기준서(SOP) 기반 공정 일탈 원인 분석 sLM을 온프레미스로 운영합니다.',
    highlights: [
      'GMP 기준 배치 관리 & 일탈 추적',
      '전자 제조기록 감사추적(Audit Trail)',
      '내부 SOP 벡터 색인 기반 컨센스봇 sLM',
      '청정실 차압·온습도·미립자 실시간 모니터링'
    ],
    recommendedLines: 4,
    recommendedModules: [
      {
        id: 'mes-pharma',
        appId: 'smartfactory',
        name: '제약 특화 MES',
        category: 'Smart Factory',
        price: 80,
        per: 'line',
        unitLabel: '라인당 80만원/월'
      },
      {
        id: 'ebrs',
        appId: 'smartfactory',
        name: 'EBRS (전자 제조기록)',
        category: 'Smart Factory',
        price: 120,
        per: 'flat',
        unitLabel: '기본 120만원/월'
      },
      {
        id: 'consensbot',
        appId: 'consensbot',
        name: '컨센스봇 (ConsensBot)',
        category: 'LLM',
        price: 180,
        per: 'flat',
        unitLabel: '사용자 라이선스'
      },
      {
        id: 'rems',
        appId: 'smartfactory',
        name: 'REMS (청정실 환경 모니터링)',
        category: 'Smart Factory',
        price: 90,
        per: 'flat',
        unitLabel: '계측점 연동'
      }
    ]
  },
  {
    id: 'preset-food',
    title: '식품·화장품 HACCP 위생·이력 추적형',
    subtitle: 'HACCP 자동기록 · 원료 역추적 · 공급망 연계',
    type: 'industry',
    targetAudience: '식음료 / 건강기능식품 / 화장품 제조사',
    badge: 'HACCP 위생',
    desc: '중요관리점(CCP) 실시간 자동 계측과 원자재 유통기한 역추적, 외주 협력사 포털 연계 및 공장 에너지 절감을 일괄 달성합니다.',
    highlights: [
      'CCP 온도/금속검출기 자동 기록',
      '원료 입고부터 완제품까지 원스톱 LOT 역추적',
      '1·2차 외주 가공 협력사 발주 및 납기 포털',
      '냉동/가열 설비 전력 피크 감축'
    ],
    recommendedLines: 4,
    recommendedModules: [
      {
        id: 'mes-food',
        appId: 'smartfactory',
        name: '식품·화장품 특화 MES',
        category: 'Smart Factory',
        price: 60,
        per: 'line',
        unitLabel: '라인당 60만원/월'
      },
      {
        id: 'ebrs',
        appId: 'smartfactory',
        name: 'EBRS (전자 제조기록)',
        category: 'Smart Factory',
        price: 120,
        per: 'flat',
        unitLabel: '기본 120만원/월'
      },
      {
        id: 'scm',
        appId: 'smartfactory',
        name: 'SCM (공급망 협업 연계)',
        category: 'Smart Factory',
        price: 100,
        per: 'flat',
        unitLabel: '기본 100만원/월'
      },
      {
        id: 'aesg',
        appId: 'aesg',
        name: 'A.ESG (에너지 & ESG)',
        category: '에너지',
        price: 130,
        per: 'flat',
        unitLabel: '계측점 연동'
      }
    ]
  },
  {
    id: 'preset-precision',
    title: '정밀기계·자동차 부품 품질·예지보전형',
    subtitle: '가동률 분석 · AI 불량 예측 · 3D 설비 트윈',
    type: 'industry',
    targetAudience: '정밀가공 / 기계장비 / 자동차 1·2차 협력사',
    badge: '품질·예지',
    desc: '설비 PLC 시계열 데이터를 실시간 수집해 공구 마모 및 치수 불량을 사전에 예측하고, 3D 웹 캔버스로 공장 전체를 가상 순찰합니다.',
    highlights: [
      '생산 실행 및 설비 종합 효율(OEE) 분석',
      'A²LAB 노코드 AI 에이전트 품질 불량 사전 예측',
      '3차원 입체 공간 실시간 설비 가동 상태 렌더링',
      '현장 맞춤형 대시보드 코딩 없이 드래그앤드롭 제작'
    ],
    recommendedLines: 6,
    recommendedModules: [
      {
        id: 'mes-general',
        appId: 'smartfactory',
        name: '일반 제조 MES',
        category: 'Smart Factory',
        price: 40,
        per: 'line',
        unitLabel: '라인당 40만원/월'
      },
      {
        id: 'a2lab',
        appId: 'a2lab',
        name: 'A²LAB (AI 모듈 생성기)',
        category: 'AI',
        price: 150,
        per: 'flat',
        unitLabel: '기본료 + 추론 종량'
      },
      {
        id: 'twin',
        appId: 'twin',
        name: '디지털 트윈',
        category: '시각화',
        price: 110,
        per: 'flat',
        unitLabel: '사업장당'
      },
      {
        id: 'rems',
        appId: 'smartfactory',
        name: 'REMS (설비·환경 모니터링)',
        category: 'Smart Factory',
        price: 90,
        per: 'flat',
        unitLabel: '계측점 연동'
      }
    ]
  },
  {
    id: 'preset-esg',
    title: '화학·뿌리공정 에너지 최적화 & 안전형',
    subtitle: '피크 전력 제어 · 온실가스 인벤토리 · 위험환경 감시',
    type: 'industry',
    targetAudience: '화학 / 철강 / 금속열처리 / 전력다소비 공장',
    badge: 'ESG & 안전',
    desc: '고전력 유틸리티 피크 컷 제어로 전기료를 대폭 절감하고, 유해가스 누출 및 위험 구역 온습도/환경을 실시간 감시합니다.',
    highlights: [
      '생산 스케줄 연계 피크 전력 자동 제어',
      '스코프 1·2 온실가스 배출량 실시간 산출',
      '위험물/가스 저장 구역 REMS 상시 모니터링',
      'AI 에이전트 기반 에너지 소비 최적화'
    ],
    recommendedLines: 4,
    recommendedModules: [
      {
        id: 'mes-general',
        appId: 'smartfactory',
        name: '일반 제조 MES',
        category: 'Smart Factory',
        price: 40,
        per: 'line',
        unitLabel: '라인당 40만원/월'
      },
      {
        id: 'aesg',
        appId: 'aesg',
        name: 'A.ESG (에너지 & ESG)',
        category: '에너지',
        price: 130,
        per: 'flat',
        unitLabel: '계측점 연동'
      },
      {
        id: 'rems',
        appId: 'smartfactory',
        name: 'REMS (환경 모니터링)',
        category: 'Smart Factory',
        price: 90,
        per: 'flat',
        unitLabel: '계측점 연동'
      },
      {
        id: 'a2lab',
        appId: 'a2lab',
        name: 'A²LAB (AI 모듈 생성기)',
        category: 'AI',
        price: 150,
        per: 'flat',
        unitLabel: '기본료 + 추론 종량'
      }
    ]
  },

  // 2. 요구사항 및 도입 단계별 추천 조합
  {
    id: 'preset-starter',
    title: '스마트 공장 표준 도입 (Lean MES Starter)',
    subtitle: '최소 투자 · 2주 내 가동 · 필수 실적 및 전자제조기록',
    type: 'requirement',
    targetAudience: '스마트공장 첫 도입 / 중소 규모 표준 제조 사업장',
    badge: '초기 도입',
    desc: '복잡한 커스텀 구축 없이 일반 MES와 전자 제조기록(EBRS)을 조합하여, 현장 작업 지시와 일별 실적 집계를 가장 빠르고 합리적인 비용으로 디지털화합니다.',
    highlights: [
      '바코드/N-POP 기반 생산 LOT 추적',
      '전자 제조기록(EBRS)을 통한 수기 작업일지 전산화',
      '2개 라인 기준 월 380만원(기본료 포함)의 최저 도입 비용'
    ],
    recommendedLines: 2,
    recommendedModules: [
      {
        id: 'mes-general',
        appId: 'smartfactory',
        name: '일반 제조 MES',
        category: 'Smart Factory',
        price: 40,
        per: 'line',
        unitLabel: '라인당 40만원/월'
      },
      {
        id: 'ebrs',
        appId: 'smartfactory',
        name: 'EBRS (전자 제조기록)',
        category: 'Smart Factory',
        price: 120,
        per: 'flat',
        unitLabel: '기본 120만원/월'
      }
    ]
  },
  {
    id: 'preset-inhouse-diy',
    title: '자체 IT 인력 노코드 플랫폼 구축형 (In-House IT DIY)',
    subtitle: 'ArcMind 노코드·로우코드 빌더 · B²LAB 온톨로지 · A²LAB · 3D 트윈',
    type: 'requirement',
    targetAudience: '자체 IT/전산 인력을 보유하여 기성 MES 대신 사내 스마트팩토리를 직접 개발하는 제조기업',
    badge: '자체 IT 전용',
    desc: '기성 제조 운영 스위트(MES)를 도입하지 않고, 사내 IT 인력이 ArcMind(No-Code/Low-Code)로 공정 화면·작업 지시서·모바일 뷰를 직접 개발합니다. 기성 MES 구독료 없이 B²LAB 온톨로지 위에서 100% 사내 맞춤형 플랫폼을 내재화합니다.',
    highlights: [
      '기성 제조 운영 스위트(MES)와 기능 중복 없는 100% 자체 IT 맞춤 설계',
      'B²LAB 온톨로지 표준 스키마 드래그앤드롭 화면 바인딩',
      'A²LAB 산업용 AI 에이전트와 3D 디지털 트윈 직접 결합',
      '기성 패키지 종속 탈피 및 사내 플랫폼 개발 역량 내재화'
    ],
    recommendedLines: 1,
    recommendedModules: [
      {
        id: 'arcmind',
        appId: 'arcmind',
        name: 'ArcMind (노코드/로우코드 플랫폼 빌더)',
        category: '빌더',
        price: 90,
        per: 'flat',
        unitLabel: '엔터프라이즈 시트'
      },
      {
        id: 'a2lab',
        appId: 'a2lab',
        name: 'A²LAB (AI 모듈 생성기)',
        category: 'AI',
        price: 150,
        per: 'flat',
        unitLabel: '기본료 + 추론 종량'
      },
      {
        id: 'twin',
        appId: 'twin',
        name: '디지털 트윈',
        category: '시각화',
        price: 110,
        per: 'flat',
        unitLabel: '사업장당'
      },
      {
        id: 'consensbot',
        appId: 'consensbot',
        name: '컨센스봇 (ConsensBot)',
        category: 'LLM',
        price: 180,
        per: 'flat',
        unitLabel: '사내 동시 사용자'
      }
    ]
  },
  {
    id: 'preset-autonomous',
    title: 'AI 자율제조 고도화 (Full Agent Architecture)',
    subtitle: 'AI 에이전트 생성 · 슈퍼바이저 지휘 · sLM 규정 분석',
    type: 'requirement',
    targetAudience: '지능형 등대공장 추진 / 대형 복합 생산 사업장',
    badge: 'AI 자율제조',
    desc: 'A²LAB에서 생성된 품질/설비/에너지 에이전트들을 다중 AI Agent 슈퍼바이저가 오케스트레이션하고, 폐쇄망 sLM 컨센스봇과 3D 트윈을 결합합니다.',
    highlights: [
      '도메인 에이전트 3개 이상 상호 교차 검증',
      '사내 규정서 342건 벡터 검색 기반 온프레미스 sLM',
      '3D 디지털 트윈 연계 무인화 설비 원격 모니터링',
      '볼륨 10% 최고 할인 구간 적용'
    ],
    recommendedLines: 6,
    recommendedModules: [
      {
        id: 'mes-general',
        appId: 'smartfactory',
        name: '일반 제조 MES',
        category: 'Smart Factory',
        price: 40,
        per: 'line',
        unitLabel: '라인당 40만원/월'
      },
      {
        id: 'a2lab',
        appId: 'a2lab',
        name: 'A²LAB (AI 모듈 생성기)',
        category: 'AI',
        price: 150,
        per: 'flat',
        unitLabel: '기본료 + 추론 종량'
      },
      {
        id: 'orch',
        appId: 'orch',
        name: '다중 AI Agent 슈퍼바이저',
        category: 'AI',
        price: 200,
        per: 'flat',
        unitLabel: '활성 에이전트 모듈 수'
      },
      {
        id: 'consensbot',
        appId: 'consensbot',
        name: '컨센스봇 (ConsensBot)',
        category: 'LLM',
        price: 180,
        per: 'flat',
        unitLabel: '사내 동시 사용자'
      },
      {
        id: 'twin',
        appId: 'twin',
        name: '디지털 트윈',
        category: '시각화',
        price: 110,
        per: 'flat',
        unitLabel: '사업장당'
      }
    ]
  },
  {
    id: 'preset-scm-audit',
    title: '공급망 & 협력사 품질 통합 연계 (SCM & Audit)',
    subtitle: '협력사 발주 · 실시간 납기 트래킹 · 전자기록 증적',
    type: 'requirement',
    targetAudience: '외주 가공 비중이 높고 협력사 감사가 필수인 제조사',
    badge: '공급망 연계',
    desc: '사내 공정과 1·2차 외주 협력사 포털을 실시간 연계하고, 납품 품질 및 발주 검수 이력을 전자 기록으로 보존하여 고객사 실사에 즉각 대응합니다.',
    highlights: [
      '원자재 발주부터 협력사 입고 검수 실시간 공유',
      '전자기록 감사추적 체계로 위변조 방지',
      'ERP 연동 없이도 B²LAB 온톨로지를 통한 독립 연계'
    ],
    recommendedLines: 4,
    recommendedModules: [
      {
        id: 'mes-general',
        appId: 'smartfactory',
        name: '일반 제조 MES',
        category: 'Smart Factory',
        price: 40,
        per: 'line',
        unitLabel: '라인당 40만원/월'
      },
      {
        id: 'scm',
        appId: 'smartfactory',
        name: 'SCM (공급망 협업 연계)',
        category: 'Smart Factory',
        price: 100,
        per: 'flat',
        unitLabel: '기본 100만원/월'
      },
      {
        id: 'ebrs',
        appId: 'smartfactory',
        name: 'EBRS (전자 제조기록)',
        category: 'Smart Factory',
        price: 120,
        per: 'flat',
        unitLabel: '기본 120만원/월'
      },
      {
        id: 'consensbot',
        appId: 'consensbot',
        name: '컨센스봇 (ConsensBot)',
        category: 'LLM',
        price: 180,
        per: 'flat',
        unitLabel: '사내 동시 사용자'
      }
    ]
  }
];
