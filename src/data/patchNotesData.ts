import { PatchNoteItem } from '../types';

export const PATCH_NOTES_DATA: PatchNoteItem[] = [
  {
    id: 'patch-4-2-3',
    version: 'v4.2.3',
    releaseDate: '2026-03-02',
    type: 'security',
    typeLabel: '보안 핫픽스',
    title: 'ArcTunnel mTLS 암호화 키 무중단 롤링 갱신 및 터널 유지보수',
    summary: '운영 중인 PLC 및 MES 데이터 스트림 연결을 끊지 않고 TLS 1.3 암호화 세션 키를 무중단 교체했습니다.',
    zeroDowntimeVerified: true,
    affectedModules: ['ArcTunnel 게이트웨이', 'B²LAB 온톨로지', '컨센스봇 sLM'],
    targetRuntimes: ['v4.2'],
    migrationMechanism: 'Twin-Session Mutual TLS Handover (0.00초 단절)',
    rollbackSafety: '키 교환 실패 시 이전 유효 인증서로 1초 내 무중단 복귀 검증 완료',
    details: [
      {
        title: '보안 강화 내역',
        items: [
          '온프레미스 사내 노드와 ArcOS SaaS 간 mTLS 1.3 암호화 키 자동 로테이션 주기 90일 적용',
          '구형 암호화 스위트(TLS 1.2 CBC 계열) 폐기 및 ChaCha20-Poly1305 / AES-256-GCM 표준 강제',
          '공정 데이터 전송 중 터널 재연결 없이 백그라운드 세션 승계로 패킷 누락 0건 달성'
        ]
      },
      {
        title: '현장 영향도',
        items: [
          '가동 중인 사천·창원·오송 사업장 생산 라인 통신 영향 없음 (Downtime: 0ms)',
          'NVIDIA GPU 추론 서버 및 온톨로지 스트리밍 큐 정상 유지'
        ]
      }
    ]
  },
  {
    id: 'patch-4-2-2',
    version: 'v4.2.2',
    releaseDate: '2026-02-18',
    type: 'compliance',
    typeLabel: '규정 준수 패치',
    title: '제약·바이오 FDA 21 CFR Part 11 전자 제조기록(EBRS) 감사추적 스키마 고도화',
    summary: '식약처 및 FDA 실사 대비 감사추적(Audit Trail) 블록체인 해시 무결성 검증 필드가 무중단 반영되었습니다.',
    zeroDowntimeVerified: true,
    affectedModules: ['제약 특화 MES', 'EBRS (전자 제조기록)', '컨센스봇'],
    targetRuntimes: ['v4.2', 'v4.1'],
    migrationMechanism: 'Non-blocking Schema Evolution (N, N-1 필드 동시 허용)',
    rollbackSafety: '구버전 EBRS 클라이언트 하위 호환성 100% 보장',
    details: [
      {
        title: '규제 대응 패치 내역',
        items: [
          '작업자 전자서명 위변조 방지 SHA-256 증적 블록 체이닝 필드 자동 추가',
          '배치(Batch) 일탈 발생 시 온프레미스 sLM 컨센스봇에 실시간 감사 레퍼런스 자동 전달',
          '감사관 모드 읽기 전용 뷰어 권한 세분화 (테넌트 SSO 감사 프로파일 연동)'
        ]
      },
      {
        title: '무중단 검증 로그',
        items: [
          '오송 GMP 클린룸 4개 라인 연속 주사제 생산 중 롤링 배포 완료',
          '생산 데이터 유실: 0건, 스키마 마이그레이션 락 발생 시간: 0.00ms'
        ]
      }
    ]
  },
  {
    id: 'patch-4-2-1',
    version: 'v4.2.1',
    releaseDate: '2026-01-25',
    type: 'performance',
    typeLabel: '성능 최적화',
    title: 'B²LAB 온톨로지 스트리밍 엔진 버퍼 최적화 및 OPC-UA 수집 지연 40% 단축',
    summary: '초당 50,000건 이상의 고속 센서 태그 유입 환경에서 메모리 캐시 파이프라인을 개선했습니다.',
    zeroDowntimeVerified: true,
    affectedModules: ['B²LAB 온톨로지 데이터레이크', 'A²LAB MLOps', '디지털 트윈'],
    targetRuntimes: ['v4.2'],
    migrationMechanism: 'Canary Rolling Buffer Swap (Ring-buffer 버퍼 무손실 이양)',
    rollbackSafety: '메모리 점유율 임계치 초과 시 이전 링버퍼 엔진 자동 롤백',
    details: [
      {
        title: '성능 개선 내역',
        items: [
          'AAS(Asset Administration Shell) 메타데이터 질의 응답 시간 18ms -> 4.2ms 단축',
          '3D 디지털 트윈 텔레메트리 렌더링 프레임 60 FPS 안정화 (지연율 40% 개선)',
          '온프레미스 사내 노드 메모리 상주 용량 35% 절감 (Garbage Collection 주기 최적화)'
        ]
      }
    ]
  },
  {
    id: 'patch-4-2-0',
    version: 'v4.2.0',
    releaseDate: '2025-12-10',
    type: 'feature',
    typeLabel: '기능 개선',
    title: 'ArcMind 노코드/로우코드 플랫폼 빌더 분리 출시 및 자체 IT 구축형 지원',
    summary: '자체 IT 인력을 보유한 제조기업이 기성 MES 도입 없이 사내 맞춤형 스마트팩토리를 노코드로 제작할 수 있도록 지원합니다.',
    zeroDowntimeVerified: true,
    affectedModules: ['ArcMind (노코드/로우코드 빌더)', 'B²LAB 온톨로지', 'A²LAB'],
    targetRuntimes: ['v4.2'],
    migrationMechanism: 'Dynamic Component Plugin Load (무중단 런타임 탑재)',
    rollbackSafety: '플러그인 로드 격리 샌드박스로 기존 운영 스위트 간섭 원천 차단',
    details: [
      {
        title: '기능 추가 내역',
        items: [
          '자체 IT 인력 전용 No-Code / Low-Code 드래그앤드롭 화면 빌더 캔버스 탑재',
          '기성 제조 운영 스위트(MES)와 중복 없이 B²LAB 온톨로지 스키마 직접 바인딩 지원',
          '모바일 현장 태블릿 화면 및 대형 생산 현황판 템플릿 24종 기본 제공'
        ]
      }
    ]
  },
  {
    id: 'patch-4-1-8',
    version: 'v4.1.8',
    releaseDate: '2025-11-04',
    type: 'security',
    typeLabel: '보안 패치',
    title: '온프레미스 sLM 컨센스봇 사내 문서 색인 격리 및 메모리 누수 방지 패치',
    summary: '폐쇄망 GPU 노드에서 PDF 및 제조 매뉴얼 색인 시 발생하던 Milvus 벡터 캐시 누수를 해결했습니다.',
    zeroDowntimeVerified: true,
    affectedModules: ['컨센스봇 (ConsensBot)', '온프레미스 GPU 추론 런타임'],
    targetRuntimes: ['v4.1', 'v4.2'],
    migrationMechanism: 'Model Worker Rolling Restart (GPU VRAM 무단절 교체)',
    rollbackSafety: '초기화 실패 시 예비 GPU 워커로 즉각 스탠바이 복귀',
    details: [
      {
        title: '패치 내역',
        items: [
          '사내 SOP 문서 342건 벡터 임베딩 중 외부 아웃바운드 차단 감시 강화',
          'GPU VRAM 48GB 메모리 캐시 정리 스케줄러 내장',
          'sLM 질의응답 레이턴시 1.8초 -> 0.9초로 50% 향상'
        ]
      }
    ]
  }
];

export interface ZeroDowntimePrinciple {
  id: string;
  step: string;
  title: string;
  desc: string;
  techSpec: string;
  benefit: string;
}

export const ZERO_DOWNTIME_PRINCIPLES: ZeroDowntimePrinciple[] = [
  {
    id: 'canary-rolling',
    step: '01',
    title: 'Blue-Green & 카나리 무중단 롤링 교체',
    desc: '기존 버전의 컨테이너를 절대 미리 종료하지 않습니다. 신버전 컨테이너를 병렬 가동 후 헬스체크 및 온톨로지 바인딩 통과 시 10% -> 50% -> 100% 순차 승계합니다.',
    techSpec: 'Kubernetes RollingUpdate (maxSurge: 1, maxUnavailable: 0) & Envoy Proxy Dynamic Drain',
    benefit: '생산 라인 가동률 100% 보장 (다운타임 0.00초)'
  },
  {
    id: 'tunnel-buffer',
    step: '02',
    title: 'ArcTunnel 세션 유지 & PLC 제로-로스 메모리 버퍼링',
    desc: '스위치오버가 일어나는 0.2초 순간에도 현장 PLC/SCADA 센서 계측 데이터는 온프레미스 로컬 Ring-Buffer에 저장되어 단 1개의 시계열 패킷도 유실되지 않습니다.',
    techSpec: 'Shared-Memory Circular Ring-Buffer (POSIX shm) & Replay Engine',
    benefit: '고속 50,000 tag/s 환경에서도 데이터 유실률 0%'
  },
  {
    id: 'schema-compatibility',
    step: '03',
    title: 'B²LAB 온톨로지 스키마 N / N-1 하위 호환성',
    desc: '스키마 변경 시 필드 삭제나 타입 강제 변환을 금지하고, 필드 추가 및 하위 호환 매핑 정책을 강제하여 구버전 모듈과 신버전 모듈이 동시에 정상 동작합니다.',
    techSpec: 'AAS Submodel Template Semantic Versioning & Schema Registry Guard',
    benefit: '공장 내 이종 버전 모듈 간 충돌 없는 점진적 업그레이드'
  },
  {
    id: 'auto-rollback',
    step: '04',
    title: '3초 이내 무중단 자동 롤백 가드레일',
    desc: '신버전 배포 직후 헬스체크 응답 지연(>200ms)이나 비정상 예외가 감지되면 즉시 트래픽을 구버전으로 원상복귀시키며 작업자 개입 없이 안전을 유지합니다.',
    techSpec: 'Autonomous Circuit Breaker & Instant Traffic Fallback (<3,000ms)',
    benefit: '패치 실패 리스크 제로화 및 휴먼 에러 원천 차단'
  }
];
