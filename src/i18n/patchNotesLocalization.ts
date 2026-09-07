/**
 * Patch-note and zero-downtime-principle copy.
 *
 * Kept out of `localizedData.ts` because only PatchNotesView reads it: bundled
 * together it rode along in the initial chunk, where roughly 20 kB of it is
 * never touched unless the user opens the patch notes route.
 */
import { Language } from './translations';
import { PatchNoteItem } from '../types';

interface LocalizedString {
  ko: string;
  en: string;
  ja: string;
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
