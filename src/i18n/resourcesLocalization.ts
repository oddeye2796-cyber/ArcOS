import { Language } from './translations';

/**
 * Resource library prose.
 *
 * Deliberately a small set. Every document here is really three documents once
 * ko/en/ja are counted, so the library is sized to what people will actually
 * read rather than to what could be written.
 *
 * Imported only by the resource reader, so this copy stays out of the initial
 * bundle.
 */

export interface DocSection {
  heading: string;
  /** Optional lead paragraph before the bullets. */
  body?: string;
  items?: string[];
}

export interface DocContent {
  title: string;
  summary: string;
  /** Who this is written for, shown as a chip. */
  audience: string;
  sections: DocSection[];
}

type LocalizedDoc = Record<Language, DocContent>;

const RESOURCE_CONTENT: Record<string, LocalizedDoc> = {
  'arch-whitepaper': {
    ko: {
      title: 'ArcOS 아키텍처 백서',
      summary:
        '하이브리드 배포 경계, Plug & Play 5대 규약, 3층 과금 모델, 무중단 패치 원칙을 인터랙티브하게 설명합니다.',
      audience: 'IT/보안 심사 · 경영 검토',
      sections: []
    },
    en: {
      title: 'ArcOS Architecture Whitepaper',
      summary:
        'An interactive walkthrough of the hybrid deployment boundary, the five Plug & Play contracts, the 3-tier pricing model and the zero-downtime patch principles.',
      audience: 'IT/security review · executive evaluation',
      sections: []
    },
    ja: {
      title: 'ArcOS アーキテクチャ ホワイトペーパー',
      summary:
        'ハイブリッド展開の境界、Plug & Play 5大規約、3層課金モデル、無停止パッチ原則をインタラクティブに解説します。',
      audience: 'IT/セキュリティ審査 · 経営検討',
      sections: []
    }
  },

  'onboarding-guide': {
    ko: {
      title: '도입 가이드 · 사전 점검 체크리스트',
      summary:
        '계약 전 확인해야 할 온프레미스 요건과, 첫 모듈을 배포하기까지의 표준 절차를 정리했습니다.',
      audience: '도입 검토 담당자',
      sections: [
        {
          heading: '1. 계약 전 확인 사항',
          body: '아래 네 가지가 충족되지 않으면 배포 단계에서 일정이 지연됩니다.',
          items: [
            '온프레미스 노드: 사업장별 물리 또는 가상 서버 1대 이상 (권장 CPU 8코어 / RAM 32GB)',
            'ArcTunnel 아웃바운드: 443/TCP 허용. 인바운드 개방은 필요하지 않습니다',
            '도메인 DB 읽기 계정: MES·ERP·설비 이력 DB에 대한 읽기 전용 계정',
            '표준 태그 매핑 담당자: 설비 태그와 AAS/OPC-UA 표준을 대조할 현업 엔지니어 1명'
          ]
        },
        {
          heading: '2. 표준 도입 절차',
          body: '최소 구성 기준으로 영업일 10일이 표준입니다.',
          items: [
            'D+0 온프레미스 노드 설치 및 ArcTunnel mTLS 연결 확인',
            'D+2 B²LAB 온톨로지 계층 배포, 도메인 DB 읽기 연결',
            'D+5 태그 매핑 검증 (표준 스키마 대비 매핑률 90% 이상 권장)',
            'D+8 업무 모듈 배포 및 권한 매트릭스 설정',
            'D+10 현업 인수인계 및 운영 전환'
          ]
        },
        {
          heading: '3. PoC를 먼저 권하는 경우',
          items: [
            '설비 태그 체계가 문서화되어 있지 않아 매핑 공수를 가늠하기 어려운 경우',
            'AI 모듈의 검출 정확도를 자사 데이터로 먼저 확인하고 싶은 경우',
            '사내 보안 정책상 외부 연결 방식을 실물로 검증해야 하는 경우'
          ]
        },
        {
          heading: '4. 자주 막히는 지점',
          items: [
            '읽기 전용 계정 발급이 사내 승인 절차에 걸려 지연되는 사례가 가장 많습니다. 착수와 동시에 신청하세요.',
            '설비 벤더가 다르면 태그 명명 규칙도 다릅니다. 매핑률이 낮게 나오면 벤더별로 나눠서 진행하세요.',
            '방화벽 정책 변경은 보통 별도 승인이 필요합니다. D+0 이전에 완료해 두는 것을 권합니다.'
          ]
        }
      ]
    },
    en: {
      title: 'Adoption Guide & Pre-Installation Checklist',
      summary:
        'The on-premise prerequisites to confirm before contracting, and the standard path to a first deployed module.',
      audience: 'Adoption owners',
      sections: [
        {
          heading: '1. Confirm before contracting',
          body: 'Missing any of these four is what pushes deployment dates.',
          items: [
            'On-premise node: at least one physical or virtual server per site (8 CPU cores / 32GB RAM recommended)',
            'ArcTunnel outbound: allow 443/TCP. No inbound port needs to be opened',
            'Read-only DB account: read access to the MES, ERP and equipment history databases',
            'A tag mapping owner: one process engineer to reconcile equipment tags against AAS/OPC-UA'
          ]
        },
        {
          heading: '2. Standard rollout',
          body: 'Ten business days is standard for a minimal configuration.',
          items: [
            'D+0 install the on-premise node and confirm the ArcTunnel mTLS link',
            'D+2 deploy the B²LAB ontology layer and connect the domain databases read-only',
            'D+5 validate tag mapping (90%+ coverage against the standard schema is recommended)',
            'D+8 deploy the business modules and configure the permission matrix',
            'D+10 hand over to the process owners and switch to operations'
          ]
        },
        {
          heading: '3. When to run a PoC first',
          items: [
            'Equipment tag conventions are undocumented, so mapping effort is hard to estimate',
            'You want to confirm an AI module’s detection accuracy against your own data first',
            'Internal security policy requires the connection model to be demonstrated in practice'
          ]
        },
        {
          heading: '4. Where projects usually stall',
          items: [
            'Issuing the read-only account is the single most common delay — start the internal request on day one.',
            'Different equipment vendors name tags differently. If coverage comes back low, split the work by vendor.',
            'Firewall changes normally need their own approval. Get them done before D+0.'
          ]
        }
      ]
    },
    ja: {
      title: '導入ガイド · 事前点検チェックリスト',
      summary:
        '契約前に確認すべきオンプレミス要件と、最初のモジュール展開までの標準手順をまとめました。',
      audience: '導入検討担当者',
      sections: [
        {
          heading: '1. 契約前の確認事項',
          body: '以下の4点が満たされないと、展開段階でスケジュールが遅延します。',
          items: [
            'オンプレミスノード: 事業所ごとに物理または仮想サーバー1台以上 (推奨 CPU 8コア / RAM 32GB)',
            'ArcTunnel アウトバウンド: 443/TCP を許可。インバウンドの開放は不要です',
            'ドメインDB読み取りアカウント: MES・ERP・設備履歴DBへの読み取り専用アカウント',
            '標準タグマッピング担当者: 設備タグとAAS/OPC-UA標準を照合する現場エンジニア1名'
          ]
        },
        {
          heading: '2. 標準導入手順',
          body: '最小構成で営業日10日が標準です。',
          items: [
            'D+0 オンプレミスノード設置およびArcTunnel mTLS接続の確認',
            'D+2 B²LABオントロジー層の展開、ドメインDBの読み取り接続',
            'D+5 タグマッピング検証 (標準スキーマ比マッピング率90%以上を推奨)',
            'D+8 業務モジュールの展開および権限マトリクスの設定',
            'D+10 現場への引き継ぎおよび運用移行'
          ]
        },
        {
          heading: '3. 先にPoCを推奨する場合',
          items: [
            '設備タグ体系が文書化されておらず、マッピング工数の見積が難しい場合',
            'AIモジュールの検出精度を自社データで先に確認したい場合',
            '社内セキュリティ方針上、外部接続方式を実機で検証する必要がある場合'
          ]
        },
        {
          heading: '4. つまずきやすい箇所',
          items: [
            '読み取り専用アカウントの発行が社内承認手続きで遅れる事例が最も多いです。着手と同時に申請してください。',
            '設備ベンダーが異なればタグ命名規則も異なります。マッピング率が低い場合はベンダー別に分けて進めてください。',
            'ファイアウォール方針の変更は通常、別途承認が必要です。D+0以前に完了しておくことを推奨します。'
          ]
        }
      ]
    }
  },

  'smartfactory-manual': {
    ko: {
      title: 'Smart Factory 스위트 운영 매뉴얼',
      summary: 'MES 코어와 EBRS·REMS·SCM 확장 모듈의 일상 운영 절차와 규제 대응 방법입니다.',
      audience: '생산관리 · QA/QC',
      sections: [
        {
          heading: '모듈 구성 규칙',
          body: 'MES 코어는 상호 배타적이며, 확장 모듈은 자유롭게 조합합니다.',
          items: [
            'MES 코어 3종(제약 특화 / 식품·화장품 특화 / 일반 제조) 중 반드시 1종만 선택합니다',
            'EBRS·REMS·SCM은 필요한 만큼 추가하며, 나중에 개별 해지도 가능합니다',
            '코어를 변경하려면 기존 코어를 해지해야 하므로, 업종 규제 요건을 먼저 확정하세요'
          ]
        },
        {
          heading: '배치(Batch) 운영',
          items: [
            '배치 생성 시 제품 코드·수량·라인을 지정하면 해당 라인의 계측값이 자동으로 배치에 귀속됩니다',
            '일탈이 감지되면 배치 상태가 [검토 필요]로 전환되며, 승인 없이는 다음 공정으로 넘어가지 않습니다',
            '배치 종료 후에는 기록이 읽기 전용으로 잠깁니다. 수정이 필요하면 사유와 함께 정정 기록을 추가합니다'
          ]
        },
        {
          heading: '전자서명 (EBRS)',
          body: 'FDA 21 CFR Part 11 대응 기능입니다.',
          items: [
            '서명은 작업자 계정 + 2차 인증으로만 수행되며, 대리 서명은 차단됩니다',
            '모든 서명에 SHA-256 증적 블록이 체이닝되어 사후 위변조를 검출할 수 있습니다',
            '감사관 계정은 읽기 전용 뷰어 권한만 부여하세요 (테넌트 SSO 감사 프로파일)'
          ]
        },
        {
          heading: '실사 대응 절차',
          items: [
            '감사추적 조회 화면에서 기간·제품·작업자로 필터링해 근거 자료를 추출합니다',
            '추출본은 서명 검증 상태가 함께 표기되므로 별도 무결성 증명이 필요하지 않습니다',
            '해지된 모듈의 기록도 [읽기 전용 보존] 상태에서 동일하게 조회됩니다'
          ]
        }
      ]
    },
    en: {
      title: 'Smart Factory Suite Operating Manual',
      summary:
        'Day-to-day operating procedures for the MES core and the EBRS, REMS and SCM extensions, and how to handle inspections.',
      audience: 'Production management · QA/QC',
      sections: [
        {
          heading: 'Composition rules',
          body: 'MES cores are mutually exclusive; extensions combine freely.',
          items: [
            'Exactly one of the three MES cores (pharma / food & cosmetics / general manufacturing)',
            'Add EBRS, REMS and SCM as needed; each can be cancelled independently later',
            'Changing core means cancelling the current one, so settle the regulatory requirement first'
          ]
        },
        {
          heading: 'Batch operation',
          items: [
            'Creating a batch with product code, quantity and line binds that line’s measurements to the batch automatically',
            'A detected deviation moves the batch to [Review required]; it cannot advance without approval',
            'Records lock read-only when a batch closes. Corrections are added as an amendment with a stated reason'
          ]
        },
        {
          heading: 'Electronic signature (EBRS)',
          body: 'The FDA 21 CFR Part 11 capability.',
          items: [
            'Signing requires the operator account plus second-factor authentication; proxy signing is blocked',
            'Every signature chains a SHA-256 evidence block, so later tampering is detectable',
            'Give auditor accounts read-only viewer rights (tenant SSO audit profile)'
          ]
        },
        {
          heading: 'Handling an inspection',
          items: [
            'Filter the audit-trail view by period, product or operator to extract the supporting evidence',
            'Exports carry their signature verification state, so no separate integrity proof is needed',
            'Records from cancelled modules remain queryable in the [Read-Only Retention] state'
          ]
        }
      ]
    },
    ja: {
      title: 'Smart Factory スイート運用マニュアル',
      summary:
        'MESコアおよびEBRS・REMS・SCM拡張モジュールの日常運用手順と、規制対応の方法です。',
      audience: '生産管理 · QA/QC',
      sections: [
        {
          heading: 'モジュール構成ルール',
          body: 'MESコアは相互排他的で、拡張モジュールは自由に組み合わせます。',
          items: [
            'MESコア3種(製薬特化 / 食品・化粧品特化 / 一般製造)のうち必ず1種のみ選択します',
            'EBRS・REMS・SCMは必要な分だけ追加し、後から個別解約も可能です',
            'コアを変更するには既存コアの解約が必要なため、業種の規制要件を先に確定してください'
          ]
        },
        {
          heading: 'バッチ運用',
          items: [
            'バッチ作成時に製品コード・数量・ラインを指定すると、当該ラインの計測値が自動的にバッチへ帰属します',
            '逸脱が検知されるとバッチ状態が[要レビュー]に遷移し、承認なしには次工程へ進みません',
            'バッチ終了後は記録が読み取り専用でロックされます。修正が必要な場合は理由とともに訂正記録を追加します'
          ]
        },
        {
          heading: '電子署名 (EBRS)',
          body: 'FDA 21 CFR Part 11 対応機能です。',
          items: [
            '署名は作業者アカウント＋二要素認証でのみ実行され、代理署名は遮断されます',
            'すべての署名にSHA-256証跡ブロックが連鎖され、事後の改ざんを検出できます',
            '監査官アカウントには読み取り専用ビューア権限のみを付与してください (テナントSSO監査プロファイル)'
          ]
        },
        {
          heading: '査察対応手順',
          items: [
            '監査証跡の照会画面で期間・製品・作業者により絞り込み、根拠資料を抽出します',
            '抽出結果には署名検証状態が併記されるため、別途の完全性証明は不要です',
            '解約済みモジュールの記録も[読み取り専用保存]状態で同様に照会できます'
          ]
        }
      ]
    }
  },

  'a2lab-manual': {
    ko: {
      title: 'A²LAB 에이전트 제작 가이드',
      summary: '노코드로 예측 모델을 만들고, 슈퍼바이저에 등록해 운영하기까지의 절차입니다.',
      audience: '공정기술 · 품질 엔지니어',
      sections: [
        {
          heading: '모델 제작 순서',
          items: [
            '학습에 사용할 온톨로지 태그를 선택합니다. 태그는 B²LAB 계층에서만 조회되며 원본 DB에 접근하지 않습니다',
            '판단 목표(예: 압출 두께 불량 사전 예측)와 목표 지표를 정의합니다',
            '기간을 지정해 학습 데이터를 구성합니다. 최소 3개월 이상을 권장합니다',
            '오토ML 파이프라인을 실행하고, 후보 모델 중 오탐률 기준으로 선택합니다'
          ]
        },
        {
          heading: '배포와 운영',
          items: [
            '선택한 모델은 온프레미스 노드에 컨테이너로 패키징되어 실시간 추론을 수행합니다',
            '추론 호출량이 과금 기준이므로, 상시 가동 여부를 라인별로 설정하세요',
            '정확도가 목표치 아래로 떨어지면 알림이 발생합니다. 데이터 분포 변화를 먼저 확인하세요'
          ]
        },
        {
          heading: '슈퍼바이저 연계',
          body: '에이전트가 3개 이상이 되면 오케스트레이션을 검토할 시점입니다.',
          items: [
            '단일 에이전트는 슈퍼바이저 없이도 동작합니다',
            '여러 에이전트가 같은 설비를 제어하면 판단 충돌이 생길 수 있어 중재가 필요합니다',
            '안전 임계치를 넘는 제어 명령은 슈퍼바이저의 승인 게이트를 통과해야 발령됩니다'
          ]
        },
        {
          heading: '재학습 기준',
          items: [
            '제품 규격이나 설비가 변경되면 즉시 재학습하세요',
            '계절성이 있는 공정은 분기 단위 재학습을 권장합니다',
            '재학습 중에도 기존 모델이 추론을 계속하므로 공정 중단은 발생하지 않습니다'
          ]
        }
      ]
    },
    en: {
      title: 'A²LAB Agent Authoring Guide',
      summary:
        'Building a predictive model without code, then registering and operating it under the supervisor.',
      audience: 'Process and quality engineers',
      sections: [
        {
          heading: 'Building a model',
          items: [
            'Choose the ontology tags to train on. Tags are read from the B²LAB layer only — never from the source database',
            'Define the decision target (for example, predicting extrusion thickness defects) and the target metric',
            'Select a date range for the training set. Three months or more is recommended',
            'Run the AutoML pipeline and pick among the candidate models on false-positive rate'
          ]
        },
        {
          heading: 'Deployment and operation',
          items: [
            'The chosen model is packaged as a container on the on-premise node and serves real-time inference',
            'Inference call volume is the billing metric, so decide per line whether the agent runs continuously',
            'You are alerted when accuracy drops below target. Check for a shift in data distribution first'
          ]
        },
        {
          heading: 'Working with the supervisor',
          body: 'Three or more agents is the point to consider orchestration.',
          items: [
            'A single agent operates fine without a supervisor',
            'Several agents controlling the same equipment can reach conflicting decisions, which needs arbitration',
            'Control commands beyond a safety threshold only issue after passing the supervisor’s approval gate'
          ]
        },
        {
          heading: 'When to retrain',
          items: [
            'Retrain immediately after a product specification or equipment change',
            'Quarterly retraining is recommended for processes with seasonality',
            'The existing model keeps serving during retraining, so no production stop is involved'
          ]
        }
      ]
    },
    ja: {
      title: 'A²LAB エージェント作成ガイド',
      summary:
        'ノーコードで予測モデルを作成し、スーパーバイザーに登録して運用するまでの手順です。',
      audience: '工程技術 · 品質エンジニア',
      sections: [
        {
          heading: 'モデル作成の手順',
          items: [
            '学習に使用するオントロジータグを選択します。タグはB²LAB層からのみ参照され、元のDBにはアクセスしません',
            '判断目標(例: 押出厚み不良の事前予測)と目標指標を定義します',
            '期間を指定して学習データを構成します。最低3か月以上を推奨します',
            'AutoMLパイプラインを実行し、候補モデルの中から誤検知率を基準に選択します'
          ]
        },
        {
          heading: '展開と運用',
          items: [
            '選択したモデルはオンプレミスノードにコンテナとしてパッケージ化され、リアルタイム推論を実行します',
            '推論コール量が課金基準となるため、常時稼働の可否をラインごとに設定してください',
            '精度が目標値を下回ると通知が発生します。まずデータ分布の変化を確認してください'
          ]
        },
        {
          heading: 'スーパーバイザーとの連係',
          body: 'エージェントが3個以上になったら、オーケストレーションを検討する時期です。',
          items: [
            '単一エージェントはスーパーバイザーなしでも動作します',
            '複数のエージェントが同じ設備を制御すると判断の衝突が起こりうるため、調停が必要です',
            '安全閾値を超える制御コマンドは、スーパーバイザーの承認ゲートを通過してから発令されます'
          ]
        },
        {
          heading: '再学習の基準',
          items: [
            '製品規格や設備が変更された場合は直ちに再学習してください',
            '季節性のある工程は四半期単位の再学習を推奨します',
            '再学習中も既存モデルが推論を継続するため、工程停止は発生しません'
          ]
        }
      ]
    }
  },

  'consensbot-manual': {
    ko: {
      title: '컨센스봇 sLM 운영 매뉴얼',
      summary: '사내 문서를 색인하고, 감사 답변과 일탈 분석에 활용하는 방법입니다.',
      audience: 'QA · 규제 담당',
      sections: [
        {
          heading: '문서 색인',
          items: [
            'SOP·제조 지침서·밸리데이션 문서를 업로드하면 폐쇄망 GPU 노드에서 벡터 색인됩니다',
            '색인 중 외부 아웃바운드는 차단 감시되며, 문서는 단 1바이트도 외부로 나가지 않습니다',
            '개정된 문서는 재업로드하면 이전 버전과 함께 보관되어 시점별 조회가 가능합니다'
          ]
        },
        {
          heading: '질의 방법',
          body: '답변에는 항상 근거 문서와 조항이 함께 표시됩니다.',
          items: [
            '근거가 없는 질의에는 추정 답변 대신 "해당 근거 없음"을 반환합니다',
            '답변을 그대로 제출하지 말고, 표시된 근거 조항을 반드시 대조하세요',
            '규제 문서 외의 일반 지식 질의는 설계 범위가 아닙니다'
          ]
        },
        {
          heading: '일탈 분석 연계',
          items: [
            'EBRS에서 배치 일탈이 발생하면 관련 기준서 조항이 자동으로 전달됩니다',
            '컨센스봇은 원인 후보를 제시할 뿐, 최종 판정은 담당자가 수행합니다',
            '분석 이력은 감사추적에 함께 기록됩니다'
          ]
        },
        {
          heading: '운영 시 주의',
          items: [
            '동시 사용자 수가 라이선스 기준이므로 부서별 계정 배분을 계획하세요',
            'GPU VRAM 사용량이 임계치를 넘으면 캐시 정리 스케줄러가 자동 동작합니다',
            '색인 대상 문서가 늘어나면 응답 지연이 증가할 수 있어 주기적 정리를 권장합니다'
          ]
        }
      ]
    },
    en: {
      title: 'ConsensBot sLM Operating Manual',
      summary: 'Indexing your internal documents and using them for audit answers and deviation analysis.',
      audience: 'QA · regulatory affairs',
      sections: [
        {
          heading: 'Indexing documents',
          items: [
            'Uploaded SOPs, manufacturing instructions and validation documents are vector-indexed on the air-gapped GPU node',
            'Outbound traffic is monitored and blocked during indexing; not a single byte of a document leaves the premises',
            'Re-uploading a revised document keeps the previous version, so point-in-time queries stay possible'
          ]
        },
        {
          heading: 'Asking questions',
          body: 'Every answer displays the source document and clause it rests on.',
          items: [
            'Where no supporting clause exists, it returns "no supporting basis" rather than an inferred answer',
            'Never submit an answer as-is — always check it against the cited clause',
            'General knowledge questions outside the regulatory corpus are out of scope by design'
          ]
        },
        {
          heading: 'Deviation analysis',
          items: [
            'When EBRS records a batch deviation, the relevant standard clauses are forwarded automatically',
            'ConsensBot proposes candidate causes; the final determination stays with the responsible person',
            'The analysis history is written into the audit trail alongside the deviation'
          ]
        },
        {
          heading: 'Operational notes',
          items: [
            'Concurrent users is the licensing metric, so plan account allocation by department',
            'A cache cleanup scheduler runs automatically when GPU VRAM use crosses its threshold',
            'Response latency grows with the indexed corpus, so prune it periodically'
          ]
        }
      ]
    },
    ja: {
      title: 'コンセンスボット sLM 運用マニュアル',
      summary: '社内文書をインデックスし、監査回答や逸脱分析に活用する方法です。',
      audience: 'QA · 規制担当',
      sections: [
        {
          heading: '文書インデックス',
          items: [
            'SOP・製造指針書・バリデーション文書をアップロードすると、閉域網GPUノードでベクターインデックスされます',
            'インデックス中の外部アウトバウンドは遮断監視され、文書は1バイトも外部へ出ません',
            '改訂された文書は再アップロードすると旧版とともに保管され、時点別の照会が可能です'
          ]
        },
        {
          heading: '照会方法',
          body: '回答には常に根拠文書と条項が併記されます。',
          items: [
            '根拠のない照会には推定回答ではなく「該当する根拠なし」を返します',
            '回答をそのまま提出せず、表示された根拠条項を必ず照合してください',
            '規制文書以外の一般知識の照会は設計範囲外です'
          ]
        },
        {
          heading: '逸脱分析との連係',
          items: [
            'EBRSでバッチ逸脱が発生すると、関連規程条項が自動的に連携されます',
            'コンセンスボットは原因候補を提示するのみで、最終判定は担当者が行います',
            '分析履歴は監査証跡にあわせて記録されます'
          ]
        },
        {
          heading: '運用上の注意',
          items: [
            '同時ユーザー数がライセンス基準となるため、部署別のアカウント配分を計画してください',
            'GPU VRAM使用量が閾値を超えると、キャッシュ整理スケジューラが自動で動作します',
            'インデックス対象文書が増えると応答遅延が増加しうるため、定期的な整理を推奨します'
          ]
        }
      ]
    }
  },

  'b2lab-spec': {
    ko: {
      title: 'B²LAB 온톨로지 연동 규격',
      summary: '앱이 레거시 DB를 직접 보지 않도록 하는 표준 스키마와 태그 매핑 규칙입니다.',
      audience: '사내 IT · 시스템 통합',
      sections: [
        {
          heading: '기본 원칙',
          items: [
            '앱은 도메인 DB에 직접 접근하지 않고 온톨로지 계층만 조회합니다',
            '따라서 고객사마다 다른 DB 구조를 앱이 알 필요가 없습니다',
            '설비나 벤더가 바뀌어도 수정 대상은 앱이 아니라 매핑 정의입니다'
          ]
        },
        {
          heading: '지원 표준',
          items: [
            'AAS (Asset Administration Shell) 서브모델 템플릿',
            'OPC-UA 정보 모델 (설비 실시간 계측)',
            'KS X 9101 (국내 제조 설비 메타데이터)'
          ]
        },
        {
          heading: '태그 매핑 절차',
          body: '매핑률 90% 이상을 권장 기준으로 삼습니다.',
          items: [
            '설비 태그 목록을 추출해 표준 어휘와 대조합니다',
            '자동 매칭되지 않은 태그는 현업 엔지니어가 수동으로 지정합니다',
            '매핑 정의는 버전 관리되며, 변경 시 이전 정의도 함께 보존됩니다'
          ]
        },
        {
          heading: '스키마 호환성 원칙',
          body: '무중단 운영을 위해 스키마 변경에 제약을 둡니다.',
          items: [
            '필드 삭제와 타입 강제 변환은 금지됩니다',
            '필드 추가와 하위 호환 매핑만 허용되므로 구·신 버전 모듈이 동시에 동작합니다',
            '현재 버전(N)과 직전 버전(N-1) 2개만 동시 지원됩니다'
          ]
        }
      ]
    },
    en: {
      title: 'B²LAB Ontology Integration Spec',
      summary:
        'The standard schema and tag mapping rules that keep applications off your legacy databases.',
      audience: 'In-house IT · systems integration',
      sections: [
        {
          heading: 'Core principle',
          items: [
            'Applications never touch the domain database directly; they query the ontology layer only',
            'Consequently no application needs to know how a given customer’s database is shaped',
            'When equipment or a vendor changes, what needs editing is the mapping definition, not the application'
          ]
        },
        {
          heading: 'Supported standards',
          items: [
            'AAS (Asset Administration Shell) submodel templates',
            'OPC-UA information model, for real-time equipment measurement',
            'KS X 9101, for Korean manufacturing equipment metadata'
          ]
        },
        {
          heading: 'Tag mapping procedure',
          body: '90% coverage is the recommended bar.',
          items: [
            'Export the equipment tag list and reconcile it against the standard vocabulary',
            'Tags that do not match automatically are assigned by a process engineer',
            'Mapping definitions are versioned, and a change preserves the previous definition'
          ]
        },
        {
          heading: 'Schema compatibility rules',
          body: 'Schema changes are constrained so operation stays uninterrupted.',
          items: [
            'Deleting a field and forcing a type conversion are both prohibited',
            'Only additive fields and backward-compatible mappings are allowed, so old and new modules run side by side',
            'Only the current version (N) and the immediately preceding one (N-1) are supported at once'
          ]
        }
      ]
    },
    ja: {
      title: 'B²LAB オントロジー連係規格',
      summary:
        'アプリがレガシーDBを直接参照しないようにするための標準スキーマとタグマッピング規則です。',
      audience: '社内IT · システム統合',
      sections: [
        {
          heading: '基本原則',
          items: [
            'アプリはドメインDBに直接アクセスせず、オントロジー層のみを照会します',
            'したがって顧客ごとに異なるDB構造をアプリが知る必要はありません',
            '設備やベンダーが変わっても、修正対象はアプリではなくマッピング定義です'
          ]
        },
        {
          heading: '対応標準',
          items: [
            'AAS (Asset Administration Shell) サブモデルテンプレート',
            'OPC-UA 情報モデル (設備のリアルタイム計測)',
            'KS X 9101 (韓国国内の製造設備メタデータ)'
          ]
        },
        {
          heading: 'タグマッピング手順',
          body: 'マッピング率90%以上を推奨基準とします。',
          items: [
            '設備タグ一覧を抽出し、標準語彙と照合します',
            '自動マッチしなかったタグは現場エンジニアが手動で指定します',
            'マッピング定義はバージョン管理され、変更時には従前の定義も保存されます'
          ]
        },
        {
          heading: 'スキーマ互換性の原則',
          body: '無停止運用のため、スキーマ変更に制約を設けます。',
          items: [
            'フィールドの削除と型の強制変換は禁止されます',
            'フィールド追加と下位互換マッピングのみ許可されるため、新旧バージョンのモジュールが同時に動作します',
            '現行バージョン(N)と直前バージョン(N-1)の2つのみが同時サポートされます'
          ]
        }
      ]
    }
  }
};

export function getResourceContent(docId: string, lang?: Language | string): DocContent | null {
  const l: Language = lang === 'ja' || lang === 'en' ? lang : 'ko';
  return RESOURCE_CONTENT[docId]?.[l] ?? null;
}
