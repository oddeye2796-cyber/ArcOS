export type Language = 'ko' | 'en' | 'ja';

export interface Translations {
  // Brand & General
  brandName: string;
  brandTagline: string;
  hybridBadge: string;
  controlPlane: string;
  dataPlane: string;
  controlPlaneDesc: string;
  dataPlaneDesc: string;
  normalStatus: string;
  connectedStatus: string;
  securityNoticeTitle: string;
  securityNoticeDesc: string;
  partnerSupport: string;

  // Nav
  navMarketplace: string;
  navMarketplaceSub: string;
  navQuote: string;
  navQuoteSub: string;
  navWorkspace: string;
  navWorkspaceSub: string;
  navArchitecture: string;
  navArchitectureSub: string;
  navPatchNotes: string;
  navPatchNotesSub: string;
  navItemsCount: string;
  navActiveCount: string;
  navWhitepaperBadge: string;
  navZeroDowntimeBadge: string;

  // Catalog
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  baseFeeLabel: string;
  baseFeeValue: string;
  baseFeeBullets: string[];
  viewCartBtn: string;
  categoryAll: string;
  searchPlaceholder: string;
  filterByStatus: string;
  quickPresetTitle: string;
  quickPresetDesc: string;
  viewAllPresets: string;
  appsCountLabel: string;
  addToCart: string;
  inCart: string;
  viewDetails: string;
  installedBadge: string;
  prereqBadge: string;
  onpremBadge: string;
  categoryLabels: Record<string, string>;
  statusFilterAll: string;
  statusFilterReady: string;
  statusFilterNeed: string;
  statusFilterOnprem: string;
  statusFilterSub: string;
  statusBadgeSub: string;
  statusBadgeReady: string;
  statusBadgeNeed: string;
  statusBadgeOnprem: string;
  pocBadgeActive: string;
  pocBtn14Days: string;
  pocBtnTitle: string;
  duplicateReviewBadge: string;
  suiteBadgeText: string;

  // ArcMind vs Suite Distinction
  arcMindNoticeTitle: string;
  arcMindNoticeDesc: string;
  arcMindDuplicateWarning: string;
  arcMindConflictResolveKeepSuite: string;
  arcMindConflictResolveKeepArcMind: string;

  // Quote
  quoteTitle: string;
  quoteSubtitle: string;
  officialQuotePrint: string;
  batchDeployBtn: string;
  presetsHeading: string;
  presetsSubheading: string;
  tabIndustry: string;
  tabRequirement: string;
  layer1Title: string;
  layer1Desc: string;
  layer2Title: string;
  layer3Title: string;
  linesSliderTitle: string;
  linesSliderDesc: string;
  aiSliderTitle: string;
  aiSliderDesc: string;
  quoteSummaryTitle: string;
  monthlyTotal: string;
  volumeDiscountLabel: string;

  // Patch Notes
  patchNotesTitle: string;
  patchNotesSubtitle: string;
  tabPatchHistory: string;
  tabZeroDowntimeArch: string;
  tabPatchSimulator: string;
  zeroDowntimeVerified: string;
  patchTypeSecurity: string;
  patchTypeCompliance: string;
  patchTypePerformance: string;
  patchTypeFeature: string;
  simulatorTitle: string;
  simulatorDesc: string;
  simulateBtn: string;
  simulatingBtn: string;
  rollbackGuarantee: string;

  // Patch Notes SLA Metrics & Controls
  slaDowntimeLabel: string;
  slaDowntimeVal: string;
  slaDowntimeDesc: string;
  slaSuccessRateLabel: string;
  slaSuccessRateVal: string;
  slaSuccessRateDesc: string;
  slaDataLossLabel: string;
  slaDataLossVal: string;
  slaDataLossDesc: string;
  slaRollbackLabel: string;
  slaRollbackVal: string;
  slaRollbackDesc: string;
  patchSearchPlaceholder: string;
  patchFilterCategoryLabel: string;
  patchAllFilter: string;

  // Sidebar & Tenant
  connectedTenantLabel: string;
  runtimePolicyLabel: string;
  runtimePolicyRule: string;
  runtimePolicyDesc: string;

  // Workspace View
  workspaceTitle: string;
  workspaceSubtitle: string;
  hybridRuntimeControlBadge: string;
  hybridRuntimeControlSub: string;
  deployNewModuleBtn: string;
  activeModulesCardTitle: string;
  activeModulesUnit: string;
  firewallReceivingStatus: string;
  pocTrialsCardTitle: string;
  freeBadge: string;
  pocTestingUnit: string;
  sandboxIsolationLabel: string;
  arcTunnelLinkTitle: string;
  preservedDataCardTitle: string;
  itemsUnit: string;
  pocActiveSectionTitle: string;
  pocActiveSectionSub: string;
  pocNoAutoBillingGuarantee: string;
  pocEmptyTitle: string;
  pocEmptyDesc: string;
  pocExploreCatalogBtn: string;
  pocRemainingDaysBadge: string;
  pocDaysRemainingPrefix: string;
  pocDaysRemainingSuffix: string;
  pocStartedDateLabel: string;
  pocExpiresDateLabel: string;
  pocGoalLabel: string;
  pocDeptLeadLabel: string;
  pocMetricsLabel: string;
  pocSuitabilityScore: string;
  pocIngestedTags: string;
  pocViewReportBtn: string;
  pocConvertSubBtn: string;
  pocTerminateSandboxBtn: string;
  installedModulesTableTitle: string;
  installedModulesTableSub: string;
  runtimePolicyRuleBadge: string;
  colModuleName: string;
  colNodeLocation: string;
  colRuntime: string;
  colDatalakeBinding: string;
  colLocalResource: string;
  colAction: string;
  datalakeNormalStatus: string;
  latestRuntimeBadge: string;
  patchUpgradeBtn: string;
  patchingBtn: string;
  decomTableTitle: string;
  decomTableSub: string;
  cfrPart11Badge: string;
  colDecomModule: string;
  colRetainedData: string;
  colRetentionExpiry: string;
  colMonthlyFee: string;
  colAuditLogDownload: string;
  readOnlyPreservedBadge: string;
  downloadAuditDumpBtn: string;
  decomLegalNotice: string;

  // Catalog Cards
  cardScalingMetric: string;
  cardReadinessSummary: string;
  cardConditionsUnmet: string;
  cardConditionsReady: string;
  cardSchemaMapping: string;
  cardComplete: string;
  cardBilling: string;
  cardInspectSuite: string;
  cardSelectModules: string;
  cardPerModulePricing: string;
  cardIncludedInBase: string;
  arcMindCardBadge: string;
  arcMindCardDesc: string;

  // Quote View Simulator & Presets
  threeTierBillingBadge: string;
  threeTierBillingSub: string;
  quoteSimulatorTitle: string;
  quoteSimulatorSub: string;
  appliedStatusBadge: string;
  recommendedTargetLabel: string;
  linesStandard: string;
  estimatedMonthlyTotal: string;
  tenThousandWon: string;
  monthUnit: string;
  applyPresetBtn: string;
  tier1Title: string;
  monthPrefix: string;
  mandatoryPlatformInclude: string;
  tier1Composition: string;
  tier1CompositionDesc: string;
  vatNotice: string;
  platformBaseFeeLabel: string;
  selectedModulesSubtotal: string;
  itemsCountUnit: string;
  discount6Rule: string;
  discount4Rule: string;
  discountDefaultRule: string;
  finalTotalMonthly: string;
  quoteDisclaimers: string;
  requestNodeDeploy: string;

  // Quotation Print Modal
  quotationTitle: string;
  quotationNo: string;
  officialSubmissionLabel: string;
  customerTenant: string;
  targetFacility: string;
  deploymentModelLabel: string;
  hybridModelDesc: string;
  itemCol: string;
  quantityCriterionCol: string;
  monthlyPriceCol: string;
  basePlatformRowDesc: string;
  basePlatformRowQty: string;
  linesCountUnit: string;
  volumeDiscountRowTitle: string;
  discountAppliedRate: string;
  printSavePdfBtn: string;
  closeBtn: string;

  // AppDetailModal
  suiteCombinationsTitle: string;
  moduleOverviewPrinciples: string;
  suiteSelectorTitle: string;
  suiteSelectedCount: string;
  singleRequiredChoice: string;
  multipleChoice: string;
  standardMapping: string;
  preInstallGatesTitle: string;
  preInstallGatesSub: string;
  allGatesPassed: string;
  gatesBlockedCount: string;
  gate1Title: string;
  gate1DepsCount: string;
  gate1NoDeps: string;
  recommendedWithCart: string;
  gate2Title: string;
  gate2AppliedStd: string;
  gate3Title: string;
  gate3NodeSelect: string;
  gate3TunnelLink: string;
  gate3Latency: string;
  gate3RuntimeTunnelOk: string;
  gate4Title: string;
  gate4SecurityApproved: string;
  gate4WriteControl: string;
  gate4Granted: string;
  gate4Blocked: string;
  suiteModulesSelected: string;
  billingUnitLabel: string;
  deployRequestToLocation: string;
  removeFromQuote: string;
  addToQuote: string;
  pocBtnText: string;

  // PoCApplyModal
  pocModalBadge: string;
  pocZeroCostNotice: string;
  pocModalHeaderDesc: string;
  pocDeployingTitle: string;
  pocDeployingSub: string;
  pocDeployStep1: string;
  pocDeployStep2: string;
  pocDeployStep3: string;
  pocSuccessBadge: string;
  pocSuccessTitle: string;
  pocSuccessDesc: string;
  pocDeployLocation: string;
  pocValidationGoal: string;
  pocDataIsolationMode: string;
  pocValidityPeriod: string;
  pocFreePeriodText: string;
  pocContinueMarketplace: string;
  pocGoToWorkspace: string;
  pocZeroCardNoticeTitle: string;
  pocZeroCardNoticeDesc: string;
  pocStep1FacilityLabel: string;
  pocStep1FacilitySub: string;
  pocStep2GoalLabel: string;
  pocStep2Customizable: string;
  pocStep2GoalPlaceholder: string;
  pocStep3DeptLabel: string;
  pocStep3DeptPlaceholder: string;
  pocStep4IsolationLabel: string;
  pocMirrorTitle: string;
  pocMirrorDesc: string;
  pocSyntheticTitle: string;
  pocSyntheticDesc: string;
  pocPolicyTitle: string;
  pocPolicyItem1: string;
  pocPolicyItem2: string;
  pocPolicyItem3: string;
  pocFooterPeriod: string;
  pocCancelBtn: string;
  pocStartDeployBtn: string;

  // DeployModal
  deployOrchestratorTitle: string;
  deployStep1Title: string;
  deployStep1Desc: string;
  deployStep2Title: string;
  deployStep2Desc: string;
  deployStep3Title: string;
  deployStep3Desc: string;
  deployStep4Title: string;
  deployStep4Desc: string;
  deployingProgress: string;
  deploySuccess: string;
  viewInWorkspace: string;
  runInBackground: string;
  dataPlaneSecureGuarantee: string;

  // PoCReportModal
  reportSubTitle: string;
  reportRunningStatus: string;
  reportFacilityNode: string;
  reportApplicantDept: string;
  reportPeriod: string;
  reportFourteenDays: string;
  reportCoreGoal: string;
  reportRealtimeMetricsTitle: string;
  reportScoreLabel: string;
  reportScoreSub: string;
  reportTagsLabel: string;
  reportTagsSub: string;
  reportInterferenceLabel: string;
  reportInterferenceSub: string;
  reportDropLabel: string;
  reportDropSub: string;
  reportItemResultsTitle: string;
  reportItem1Title: string;
  reportItem1Desc: string;
  reportItem2Title: string;
  reportItem2Desc: string;
  reportItem3Title: string;
  reportItem3Desc: string;
  reportPassLabel: string;
  reportRoiTitle: string;
  reportRoiDesc: string;
  reportPrintPdf: string;
  reportConvertToSub: string;

  // Architecture (Whitepaper)
  archBadge: string;
  archBadgeSub: string;
  archTitle: string;
  archDesc: string;
  archTab1: string;
  archTab2: string;
  archTab3: string;
  archTab4: string;
  archTab5: string;
  archBoundaryNote: string;
  archControlPlaneTitle: string;
  archControlPlaneDesc: string;
  archControlPlaneItem1: string;
  archControlPlaneItem2: string;
  archControlPlaneItem3: string;
  archControlPlaneWarning: string;
  archTunnelEncryption: string;
  archDataPlaneTitle: string;
  archDataPlaneDesc: string;
  archDataPlaneItem1: string;
  archDataPlaneItem2: string;
  archDataPlaneItem3: string;
  archDataPlaneGuarantee: string;
  archDownstreamTitle: string;
  archDownstreamDesc: string;
  archUpstreamTitle: string;
  archUpstreamDesc: string;
  archSuiteSec1Title: string;
  archSuiteSec1Desc: string;
  archSuiteFormula: string;
  archSuiteSec1Note: string;
  archSuiteSec2Title: string;
  archSuiteA2labTitle: string;
  archSuiteA2labDesc: string;
  archSuiteOrchTitle: string;
  archSuiteOrchDesc: string;
  archSuiteSec2Note: string;
  archSuiteSec3Title: string;
  archSuiteSec3Desc: string;
  archSuiteSec3Warning: string;
  archPnpTitle: string;
  archPnpItem1Title: string;
  archPnpItem1Desc: string;
  archPnpItem2Title: string;
  archPnpItem2Desc: string;
  archPnpItem3Title: string;
  archPnpItem3Desc: string;
  archPnpItem4Title: string;
  archPnpItem4Desc: string;
  archPnpManifestTitle: string;
  archPnpManifestTarget: string;
  archPricingTitle: string;
  archPricingDesc: string;
  archPricingColModule: string;
  archPricingColGrowth: string;
  archPricingColBasis: string;
  archPricingColMechanism: string;
  archPricingRows: { module: string; growth: string; basis: string; mechanism: string }[];
  archPolicyTitle: string;
  archPolicy1Title: string;
  archPolicy1Desc: string;
  archPolicy2Title: string;
  archPolicy2Desc: string;
  archPolicy3Title: string;
  archPolicy3Desc: string;
  archPolicy4Title: string;
  archPolicy4Desc: string;

  // Minimum commitment terms
  commitmentTermAnnual: string;
  commitmentTermQuarterly: string;
  commitmentTermMonthly: string;
  commitmentSummaryLabel: string;
  commitmentSummaryNote: string;
  commitmentUsageFloorNote: string;
  commitmentQuotationRow: string;

  // Landing (recommended first) modules
  landingBadge: string;
  landingBadgeWith: string;
  landingCatalogNote: string;

  // Accessibility labels
  ariaSelectFacility: string;
  ariaSelectDeployNode: string;

  // Currency
  currencyLabel: string;
  ariaSelectCurrency: string;

  // Quote scenarios (A/B comparison)
  scenarioSectionTitle: string;
  scenarioSectionSub: string;
  scenarioSaveBtn: string;
  scenarioCompareBtn: string;
  scenarioNamePlaceholder: string;
  scenarioSaveConfirm: string;
  scenarioCancel: string;
  scenarioEmptyHint: string;
  scenarioLimitReached: string;
  scenarioLoadBtn: string;
  scenarioDeleteBtn: string;
  scenarioNeedTwo: string;
  scenarioDefaultName: string;
  scenarioSavedAtLabel: string;
  scenarioCompareTitle: string;
  scenarioCompareSub: string;
  scenarioColItem: string;
  scenarioRowBaseFee: string;
  scenarioRowSubtotal: string;
  scenarioRowDiscount: string;
  scenarioRowTotal: string;
  scenarioRowLines: string;
  scenarioRowModules: string;
  scenarioNotIncluded: string;
  scenarioLowestBadge: string;
  scenarioDiffVsLowest: string;
  scenarioLoadedToast: string;
  scenarioSavedToast: string;

  // PoC follow-up
  pocStageTitle: string;
  pocStageApplied: string;
  pocStageProvisioned: string;
  pocStageCollecting: string;
  pocStageReview: string;
  pocStageDecision: string;
  pocEndingSoonTitle: string;
  pocEndingSoonDesc: string;
  pocExtendBtn: string;
  pocExtendedBadge: string;
  pocExtendUnavailable: string;
  pocExtendToast: string;
  pocContactBtn: string;
  pocContactRequestedBadge: string;
  pocContactToast: string;
  pocNextStepsTitle: string;
  pocNextStep1: string;
  pocNextStep2: string;
  pocNextStep3: string;

  // Quote tiers, cart and report labels referenced by the views
  tier2Title: string;
  tier3Title: string;
  clearCartBtn: string;
  cartEmptyTitle: string;
  browseModules: string;
  callsUnit: string;
  pointsCountUnit: string;
  partnersCountUnit: string;
  growthAxisLinesTitle: string;
  growthAxisLinesDesc: string;
  growthAxisPointsTitle: string;
  growthAxisPointsDesc: string;
  growthAxisPartnersTitle: string;
  growthAxisPartnersDesc: string;
  growthAxisInferenceTitle: string;
  growthAxisInferenceDesc: string;
  meteredBreakdown: string;
  discountAppliedBadge: string;
  reportBadge: string;

  // Exchange rate status
  rateStatusLive: string;
  rateStatusLoading: string;
  rateStatusStale: string;
  rateStatusBundled: string;
  rateRefreshLabel: string;

  // App value / adoption outcomes
  valueSectionTitle: string;
  valueOutcomesTitle: string;
  valueUseCasesTitle: string;
  valueDocsLinkLabel: string;

  // Resource library
  navResources: string;
  navResourcesSub: string;
  navResourcesBadge: string;
  resourcesTitle: string;
  resourcesSubtitle: string;
  resourcesSearchPlaceholder: string;
  resourcesKindAll: string;
  resourcesKindWhitepaper: string;
  resourcesKindManual: string;
  resourcesKindGuide: string;
  resourcesKindSpec: string;
  resourcesAudienceLabel: string;
  resourcesUpdatedLabel: string;
  resourcesReadingTime: string;
  resourcesRelatedModules: string;
  resourcesEmpty: string;
  resourcesResetFilters: string;
  resourcesBackToList: string;
  resourcesOpenManual: string;
  resourcesCountLabel: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ko: {
    brandName: 'ArcOS',
    brandTagline: 'IMPIX 제조 운영 플랫폼',
    hybridBadge: 'Hybrid',
    controlPlane: '제어 평면',
    dataPlane: '데이터 평면',
    controlPlaneDesc: 'ArcOS SaaS (서울 리전)',
    dataPlaneDesc: '온프레미스 연결',
    normalStatus: '정상',
    connectedStatus: '연결됨',
    securityNoticeTitle: '도메인 데이터 사내 격리 원칙:',
    securityNoticeDesc: '공정 원본 DB 및 내부 문서는 외부로 유출되지 않으며 배포 메타데이터만 교환됩니다.',
    partnerSupport: 'IMPIX 기술지원 파트너십 (24/7 SLA)',

    navMarketplace: '앱 마켓플레이스',
    navMarketplaceSub: '모듈 카탈로그 및 사전점검',
    navQuote: '견적 시뮬레이터',
    navQuoteSub: '3층 과금 & 볼륨 할인 산출',
    navWorkspace: '내 워크스페이스',
    navWorkspaceSub: '온프레미스 런타임 & 버전',
    navArchitecture: '하이브리드 & 규약',
    navArchitectureSub: 'AAS · 온톨로지 · 과금 백서',
    navPatchNotes: '패치노트 (무중단)',
    navPatchNotesSub: '24/7 롤링 패치 & 릴리즈 이력',
    navItemsCount: '개',
    navActiveCount: '개 가동',
    navWhitepaperBadge: '백서',
    navZeroDowntimeBadge: '무중단 원칙',

    heroBadge: '하이브리드 배포 & 모듈형 Plug & Play 마켓플레이스',
    heroTitle: '필요한 모듈만 골라 즉시 배포하세요',
    heroDesc: 'IMPIX 제조 솔루션 라인업을 하나의 구독 플랫폼 위에서 자유롭게 조합합니다. 공정 데이터와 내부 문서는 사내 온프레미스에 안전하게 보존되며, 시스템 코드 변경 없이 AAS·OPC-UA 표준 온톨로지로 즉시 연동됩니다.',
    baseFeeLabel: '플랫폼 기본료 (고정 앵커)',
    baseFeeValue: '300만원 / 월',
    baseFeeBullets: [
      '✓ ArcOS 제어 포털 & 테넌트 SSO',
      '✓ 모듈 배포 오케스트레이션 & 무중단 롤링 패치',
      '✓ ArcTunnel mTLS 암호화 보안 채널 제공'
    ],
    viewCartBtn: '담긴 견적 확인하기',
    categoryAll: '전체',
    searchPlaceholder: '모듈명, 기능 키워드, 규제 표준 검색...',
    filterByStatus: '상태 필터',
    quickPresetTitle: '업종별 · 요구사항별 원클릭 맞춤 추천 패키지',
    quickPresetDesc: '표준 검증된 구성을 한 번에 담고 견적을 비교하세요',
    viewAllPresets: '전체 7종 추천 비교',
    appsCountLabel: '개 모듈 등록됨',
    addToCart: '견적 담기',
    inCart: '담김 (클릭시 제외)',
    viewDetails: '상세 검증',
    installedBadge: '구독 중 (포함)',
    prereqBadge: '선행 확인',
    onpremBadge: '온프레미스 전용',
    categoryLabels: {
      '전체': '전체',
      'Smart Factory': 'Smart Factory',
      'AI': 'AI',
      'LLM': 'LLM',
      '에너지': '에너지',
      '시각화': '시각화',
      '기반': '기반',
      '빌더': '빌더'
    },
    statusFilterAll: '모든 상태',
    statusFilterReady: '설치 가능',
    statusFilterNeed: '선행 조건 확인',
    statusFilterOnprem: '온프레미스 전용',
    statusFilterSub: '구독 중',
    statusBadgeSub: '구독 중 (기본 포함)',
    statusBadgeReady: '설치 가능',
    statusBadgeNeed: '선행 조건 확인',
    statusBadgeOnprem: '온프레미스 전용 sLM',
    pocBadgeActive: 'PoC 가동 중',
    pocBtn14Days: '14일 PoC',
    pocBtnTitle: '14일간 온프레미스 격리 샌드박스에서 무상 기술 검증',
    duplicateReviewBadge: '중복 검토 권장',
    suiteBadgeText: '스위트',

    arcMindNoticeTitle: 'ArcMind 안내: 자체 IT 인력 보유 기업 전용 빌더',
    arcMindNoticeDesc: 'ArcMind는 자체 IT 인력이 Smart Factory 플랫폼을 No-Code / Low-Code로 직접 개발하기 위한 도구입니다. 기성 제조 운영 스위트(MES)와 기능이 중복되지 않도록 분리 선택을 권장합니다.',
    arcMindDuplicateWarning: '⚠️ [도입 중복 확인] 기성 제조 운영 스위트(MES)와 ArcMind(자체 IT 노코드 빌더)가 함께 선택되었습니다. ArcMind는 자체 IT팀이 MES를 직접 개발하는 도구이므로 중복 투자가 발생할 수 있습니다.',
    arcMindConflictResolveKeepSuite: '기성 MES 스위트 유지 (ArcMind 제외)',
    arcMindConflictResolveKeepArcMind: '자체 IT 구축형 선택 (MES 제외, ArcMind 유지)',

    quoteTitle: 'ArcOS 월 구독 견적 시뮬레이터',
    quoteSubtitle: '단가는 고정되며 모듈 수 구간에서만 볼륨 할인이 적용됩니다. 생산 라인 수 슬라이더에 따라 MES 요금이 실시간 재계산됩니다.',
    officialQuotePrint: '공식 견적서 인쇄 / PDF',
    batchDeployBtn: '선택 모듈 일괄 배포 신청',
    presetsHeading: '업종별 & 요구사항별 맞춤 추천 조합',
    presetsSubheading: '현장 검증된 표준 모듈 구성을 원클릭으로 장바구니 및 라인 수에 자동 적용합니다.',
    tabIndustry: '업종별 추천',
    tabRequirement: '요구사항 · 도입단계별',
    layer1Title: '1층: 플랫폼 기본료 (Anchor)',
    layer1Desc: 'ArcOS 포털 + ArcTunnel + ArcOS Tools (필수 포함 · B²LAB은 별도 모듈)',
    layer2Title: '2층: 선택한 구독 모듈',
    layer3Title: '3층: 자연 성장 축 시뮬레이터 (라인 수 및 호출량)',
    linesSliderTitle: '생산 라인 수 (MES 코어 연동 성장 축)',
    linesSliderDesc: '공장 내 가동 중인 전체 제조 라인 수에 비례하여 MES 코어 단가가 승산됩니다.',
    aiSliderTitle: 'AI 추론 호출량 (A²LAB MLOps 성장 축)',
    aiSliderDesc: '품질 예측 및 이상 감지 에이전트의 월간 추론 호출 건수입니다 (10만 건 기본 포함).',
    quoteSummaryTitle: '구독 견적 요약',
    monthlyTotal: '최종 월 구독료 합계',
    volumeDiscountLabel: '볼륨 할인',

    patchNotesTitle: '무중단 롤링 패치 & 릴리즈 센터',
    patchNotesSubtitle: 'ArcOS는 24/7 무중단 가동 공장을 위해 서비스 중단 없는 카나리 롤링 패치와 실시간 PLC 버퍼링을 원칙으로 지원합니다.',
    tabPatchHistory: '패치노트 이력',
    tabZeroDowntimeArch: '무중단 패치 원칙',
    tabPatchSimulator: '무중단 패치 시뮬레이터',
    zeroDowntimeVerified: '무중단 검증 완료',
    patchTypeSecurity: '보안 핫픽스',
    patchTypeCompliance: '규정 준수',
    patchTypePerformance: '성능 최적화',
    patchTypeFeature: '기능 개선',
    simulatorTitle: '사업장 무중단 롤링 패치 실시간 시뮬레이터',
    simulatorDesc: '가동 중인 생산 라인을 멈추지 않고, 새 버전의 컨테이너를 카나리로 교체하고 트래픽을 무손실 승계하는 과정을 시뮬레이션합니다.',
    simulateBtn: '무중단 롤링 패치 실행',
    simulatingBtn: '무중단 패치 진행 중...',
    rollbackGuarantee: '롤백 보장: 헬스체크 실패 시 3초 이내 무중단 이전 안정 버전 자동 복원',

    slaDowntimeLabel: '공정 다운타임',
    slaDowntimeVal: '0.00초',
    slaDowntimeDesc: '무중단 원칙',
    slaSuccessRateLabel: '패치 성공률',
    slaSuccessRateVal: '100.0%',
    slaSuccessRateDesc: '카나리 검증',
    slaDataLossLabel: 'PLC 데이터 유실',
    slaDataLossVal: '0 건',
    slaDataLossDesc: '링버퍼 보호',
    slaRollbackLabel: '자동 롤백',
    slaRollbackVal: '< 3초',
    slaRollbackDesc: '비정상 시 즉각',
    patchSearchPlaceholder: '버전, 패치명, 모듈 검색...',
    patchFilterCategoryLabel: '분류:',
    patchAllFilter: '전체',

    connectedTenantLabel: '현재 연결 테넌트',
    runtimePolicyLabel: '런타임 지원 정책',
    runtimePolicyRule: 'N, N-1 버전',
    runtimePolicyDesc: '지원 런타임: v4.2 / v4.1 (v4.0 이하는 배포 전 갱신 필요)',

    // Workspace View
    workspaceTitle: '내 워크스페이스',
    workspaceSubtitle: '사업장 안에 설치된 모듈의 런타임 버전, 14일 PoC 시험 가동, 데이터레이크 바인딩 상태, 규제 자산의 [읽기 전용 보존] 현황을 관리합니다.',
    hybridRuntimeControlBadge: '하이브리드 런타임 제어',
    hybridRuntimeControlSub: '제어 평면에서 원격 배포 · 온프레미스 사내 실행',
    deployNewModuleBtn: '새 모듈 추가 배포',
    activeModulesCardTitle: '정식 가동 모듈',
    activeModulesUnit: '개 모듈',
    firewallReceivingStatus: '사내 방화벽 내 정상 수신',
    pocTrialsCardTitle: '14일 PoC 평가판',
    freeBadge: '무료',
    pocTestingUnit: '건 시험 중',
    sandboxIsolationLabel: '격리 샌드박스 실증',
    arcTunnelLinkTitle: 'ArcTunnel 보안 링크',
    preservedDataCardTitle: '규제 데이터 보존',
    itemsUnit: '건',
    pocActiveSectionTitle: '14일 PoC 평가판 시험 가동 현황',
    pocActiveSectionSub: '도메인 원본 DB에 쓰기 간섭이 없는 사내 격리 샌드박스에서 14일간 실증 데이터를 수집·검증합니다.',
    pocNoAutoBillingGuarantee: '만료 시 자동 결제 전환 없음 (0원 보증)',
    pocEmptyTitle: '현재 가동 중인 14일 PoC 평가판이 없습니다',
    pocEmptyDesc: '앱 마켓플레이스에서 원하는 모듈의 [14일 PoC] 버튼을 클릭해 사내 온프레미스 격리 샌드박스에 즉시 배포해 보세요.',
    pocExploreCatalogBtn: '마켓플레이스에서 PoC 모듈 탐색',
    pocRemainingDaysBadge: 'D-{days} 남음',
    pocDaysRemainingPrefix: '잔여 ',
    pocDaysRemainingSuffix: '일',
    pocStartedDateLabel: '시작일:',
    pocExpiresDateLabel: '만료 예정:',
    pocGoalLabel: '실증 목표:',
    pocDeptLeadLabel: '신청 부서 / 담당:',
    pocMetricsLabel: '실시간 실증 성과 지표',
    pocSuitabilityScore: '적합도 점수',
    pocIngestedTags: '수집 태그',
    pocViewReportBtn: '14일 평가 보고서 조회',
    pocConvertSubBtn: '정식 구독 전환',
    pocTerminateSandboxBtn: '샌드박스 안전 종료',
    installedModulesTableTitle: '온프레미스 노드별 배포 모듈 런타임',
    installedModulesTableSub: '무중단 롤링 패치 원칙에 따라 이전 안정 버전(N-1)과 최신 버전(N)이 공존할 수 있습니다.',
    runtimePolicyRuleBadge: 'N, N-1 버전 지원',
    colModuleName: '설치 모듈명',
    colNodeLocation: '배포 노드 (사업장)',
    colRuntime: '런타임',
    colDatalakeBinding: 'B²LAB 온톨로지 바인딩',
    colLocalResource: '온프레미스 점유 자원',
    colAction: '관리',
    datalakeNormalStatus: '온톨로지 정상',
    latestRuntimeBadge: '최신 버전',
    patchUpgradeBtn: '무중단 패치 갱신',
    patchingBtn: '패치 진행 중...',
    decomTableTitle: '구독 해지 모듈 및 법적 의무 데이터 보존 (규제 준수)',
    decomTableSub: '제약(FDA 21 CFR Part 11), 방산, 자동차 규제에 따라 구독이 종료된 모듈의 데이터는 암호화되어 법정 기한 동안 온프레미스에 읽기 전용으로 안전 보존됩니다.',
    cfrPart11Badge: 'CFR Part 11 준수',
    colDecomModule: '해지 모듈명',
    colRetainedData: '보존 데이터 범위',
    colRetentionExpiry: '법적 의무 보존 만료일',
    colMonthlyFee: '보존료',
    colAuditLogDownload: '감사 덤프',
    readOnlyPreservedBadge: '읽기 전용 보존 중',
    downloadAuditDumpBtn: '감사추적(Audit Trail) 덤프 다운로드',
    decomLegalNotice: '법적 보존 안내: 위 데이터는 공정 원본 DB와 분리된 암호화 볼륨에 보관되며, 법정 의무 기간(통상 5~10년) 만료 시 사내 정보보안위원회의 승인을 거쳐 영구 파기됩니다.',

    // Catalog Cards
    cardScalingMetric: '성장 연동 축:',
    cardReadinessSummary: '설치 전 점검 요약',
    cardConditionsUnmet: '조건 {count}건 미충족',
    cardConditionsReady: '조건 충족',
    cardSchemaMapping: '표준 스키마 매핑:',
    cardComplete: '완료',
    cardBilling: '과금 방식',
    cardInspectSuite: '모듈 구성',
    cardSelectModules: '조합 선택',
    cardPerModulePricing: '모듈별 개별 과금',
    cardIncludedInBase: '기본료 포함',
    arcMindCardBadge: '자체 IT 인력 전용 노코드 빌더',
    arcMindCardDesc: '기성 MES 도입 없이 사내 개발팀이 직접 스마트팩토리 화면과 로직을 제작합니다. (기성 MES와 중복 도입 방지 권장)',

    // Quote View Simulator & Presets
    threeTierBillingBadge: '3개 층위 투명 과금 모델',
    threeTierBillingSub: '기본료 고정 · 모듈 수 구간 할인 · 사용량(라인/호출) 자연 성장',
    quoteSimulatorTitle: 'ArcOS 월 구독 견적 시뮬레이터',
    quoteSimulatorSub: '단가는 고정되며 모듈 수 구간에서만 볼륨 할인이 적용됩니다. 생산 라인 수 슬라이더에 따라 MES 요금이 실시간 재계산됩니다.',
    appliedStatusBadge: '적용 중',
    recommendedTargetLabel: '추천 대상:',
    linesStandard: '라인 기준',
    estimatedMonthlyTotal: '예상 월 총액:',
    tenThousandWon: '만원',
    monthUnit: '월',
    applyPresetBtn: '이 조합으로 견적 적용',
    tier1Title: '1층: 플랫폼 기본료 (고정 앵커)',
    monthPrefix: '월',
    mandatoryPlatformInclude: '테넌트 격리 SaaS 제어 포털 + ArcTunnel 보안 링크 (필수 포함)',
    tier1Composition: 'ArcOS 포털 + ArcTunnel + ArcOS Tools',
    tier1CompositionDesc: '테넌트 SSO, ArcTunnel mTLS 암호화 연결, 모듈 카탈로그·배포 오케스트레이션·무중단 롤링 패치를 제공합니다. 도메인 데이터 온톨로지 계층(B²LAB)과 저장 용량은 별도 모듈로 과금됩니다.',
    vatNotice: 'VAT 별도',
    platformBaseFeeLabel: '플랫폼 기본료',
    selectedModulesSubtotal: '선택 모듈 소계',
    itemsCountUnit: '개',
    discount6Rule: '6개 이상 모듈 일괄 구독: 10% 볼륨 할인 자동 적용',
    discount4Rule: '4개 이상 모듈 일괄 구독: 5% 볼륨 할인 자동 적용',
    discountDefaultRule: '4개 이상 선택 시 5%, 6개 이상 시 10% 볼륨 할인이 적용됩니다.',
    finalTotalMonthly: '최종 월 구독료 합계',
    quoteDisclaimers: '* 단가는 고정이며 모듈 수 구간에서만 투명하게 할인됩니다. 데이터는 온프레미스에 보존됩니다.',
    requestNodeDeploy: '선택 모듈 일괄 배포 신청',

    // Quotation Print Modal
    quotationTitle: 'ArcOS 제조 플랫폼 서비스 이용 견적서',
    quotationNo: '발행번호',
    officialSubmissionLabel: '공식 제출용',
    customerTenant: '고객 테넌트:',
    targetFacility: '대상 사업장:',
    deploymentModelLabel: '배포 모델:',
    hybridModelDesc: '하이브리드 (SaaS 제어 + 온프레미스 데이터)',
    itemCol: '항목',
    quantityCriterionCol: '수량/기준',
    monthlyPriceCol: '월 정가',
    basePlatformRowDesc: '플랫폼 기본료 (ArcOS 제어 포털 + ArcTunnel)',
    basePlatformRowQty: '테넌트 고정',
    linesCountUnit: '라인',
    volumeDiscountRowTitle: '볼륨 할인 ({count}개 모듈 일괄 구독)',
    discountAppliedRate: '-{rate}% 적용',
    printSavePdfBtn: '인쇄 / PDF 저장',
    closeBtn: '닫기',

    // AppDetailModal
    suiteCombinationsTitle: '(24가지 조합 모듈형 스위트)',
    moduleOverviewPrinciples: '모듈 개요 & 하이브리드 운영 원칙',
    suiteSelectorTitle: '스위트 모듈 조합 선택 (3 × 2³ = 24가지 자유 구성)',
    suiteSelectedCount: '선택 모듈',
    singleRequiredChoice: '단일 필수 선택',
    multipleChoice: '복수 선택 가능',
    standardMapping: '표준 매핑',
    preInstallGatesTitle: '설치 직전 4대 항목 자동 점검 (Pre-installation Gates)',
    preInstallGatesSub: '현장 배포 실패를 방지하기 위해 사전에 인프라와 매핑 상태를 검증합니다.',
    allGatesPassed: '자동 점검 통과',
    gatesBlockedCount: '점검 항목 {count}건 확인 요망',
    gate1Title: '선행 모듈 (Dependencies)',
    gate1DepsCount: '{count}개 의존성',
    gate1NoDeps: '선행 필수 모듈 없음 (단독 구동 가능)',
    recommendedWithCart: '함께 담기 권장',
    gate2Title: '데이터 연결 & 표준 온톨로지 매핑',
    gate2AppliedStd: '적용 표준:',
    gate3Title: '배포 대상 사업장 & ArcTunnel 상태',
    gate3NodeSelect: '설치 대상 사업장 노드 선택:',
    gate3TunnelLink: 'ArcTunnel mTLS 암호화 링크',
    gate3Latency: '지연시간: 4ms',
    gate3RuntimeTunnelOk: '런타임 {runtime} · 터널 정상',
    gate4Title: '데이터 권한 및 제어 명령 승인',
    gate4SecurityApproved: '보안 심의 통과',
    gate4WriteControl: 'Write 제어',
    gate4Granted: '승인됨',
    gate4Blocked: '차단됨',
    suiteModulesSelected: 'Smart Factory 모듈 {count}개 선택됨',
    billingUnitLabel: '과금 단위',
    deployRequestToLocation: '{location}에 원격 배포 요청',
    removeFromQuote: '견적에서 제외',
    addToQuote: '견적서에 추가',
    pocBtnText: '14일 무료 PoC 신청',

    // PoCApplyModal
    pocModalBadge: '14일 무료 PoC 평가판',
    pocZeroCostNotice: '비용 0원 · 자동 결제 전환 없음',
    pocModalHeaderDesc: '사내 온프레미스 노드에 완전 격리된 Read-Only 샌드박스로 배포되어, 실제 공정 설비 중단이나 원본 DB 오염 없이 14일간 안전하게 성능을 실증합니다.',
    pocDeployingTitle: '사내 온프레미스에 14일 PoC 샌드박스를 배포 중입니다...',
    pocDeployingSub: 'ArcTunnel mTLS 암호화 링크를 통해 OCI 격리 컨테이너를 안전하게 전송합니다.',
    pocDeployStep1: '1. [제어 평면] ArcTunnel mTLS 암호화 세션 수립',
    pocDeployStep2: '2. [온프레미스] OCI 격리 샌드박스 컨테이너 프로비저닝 (v4.2-sandbox)',
    pocDeployStep3: '3. [온톨로지] B²LAB 읽기 전용 미러링 바인딩 및 14일 유효 타이머 가동',
    pocSuccessBadge: '배포 완료 · 14일 PoC 가동 시작 (D-14)',
    pocSuccessTitle: '14일 평가판이 정상 배치되었습니다!',
    pocSuccessDesc: '온프레미스 샌드박스에서 실시간 가동을 시작했습니다. 사내 원본 DB에 쓰기 간섭 없이 안전하게 실증 데이터를 수집합니다.',
    pocDeployLocation: '배포 위치:',
    pocValidationGoal: '검증 목표:',
    pocDataIsolationMode: '데이터 격리 모드:',
    pocValidityPeriod: '유효 기간:',
    pocFreePeriodText: '14일간 무료 (만료 시 자동 과금 없음)',
    pocContinueMarketplace: '마켓플레이스 계속 탐색',
    pocGoToWorkspace: '내 워크스페이스에서 PoC 현황 확인',
    pocZeroCardNoticeTitle: '14일 완전 무료 보증 (No Credit Card / Zero Disruption)',
    pocZeroCardNoticeDesc: '평가판 신청 시 결제 수단을 요구하지 않으며, 14일 만료 시 유료로 자동 전환되지 않습니다. 현업 엔지니어의 사전 기술 적합성 검토를 위해 100% 무상 제공됩니다.',
    pocStep1FacilityLabel: '1. 설치 대상 사업장 및 온프레미스 노드 선택',
    pocStep1FacilitySub: '선택한 사업장의 ArcTunnel 게이트웨이를 통해 OCI 샌드박스 이미지가 온프레미스로 전송됩니다.',
    pocStep2GoalLabel: '2. PoC 실증 검증 목표',
    pocStep2Customizable: '자유 수정 가능',
    pocStep2GoalPlaceholder: '예: 사천 3라인 미세 표면 스크래치 AI 실시간 검출률 98% 이상 검증',
    pocStep3DeptLabel: '3. 신청 부서 및 담당 엔지니어',
    pocStep3DeptPlaceholder: '예: 제조기술팀 / 김선임 연구원',
    pocStep4IsolationLabel: '4. 도메인 데이터 격리 모드 (보안 및 무간섭 원칙)',
    pocMirrorTitle: '사내 Read-Only 미러링 (권장)',
    pocMirrorDesc: '실제 설비 태그를 읽기 전용으로 실시간 수신하되, 원본 DB 쓰기는 물리적으로 차단되어 기존 생산에 간섭이 전혀 없습니다.',
    pocSyntheticTitle: 'IMPIX 표준 가상 합성 데이터',
    pocSyntheticDesc: '실제 설비 연결 전, 산업 표준 시뮬레이션 합성 데이터셋을 주입하여 알고리즘 및 UI 화면을 선제적으로 검토합니다.',
    pocPolicyTitle: 'PoC 운영 및 기술지원 정책:',
    pocPolicyItem1: '14일 동안 온프레미스 노드 자원(RAM ~4GB 내외)을 점유하며 임의 삭제 가능',
    pocPolicyItem2: 'IMPIX 도메인 엔지니어 원격 기술 온보딩 1회 및 실시간 질의 채널 제공',
    pocPolicyItem3: '14일 만료 시 생성된 임시 샌드박스 데이터는 사내 정책에 따라 영구 파기 또는 원클릭 정식 전환',
    pocFooterPeriod: '실증 기간: 오늘부터 14일간 (D-14)',
    pocCancelBtn: '취소',
    pocStartDeployBtn: '14일 무료 PoC 샌드박스 배포 시작',

    // DeployModal
    deployOrchestratorTitle: '하이브리드 원격 배포 오케스트레이터',
    deployStep1Title: '제어 평면 패키징',
    deployStep1Desc: 'SaaS 매니페스트 서명',
    deployStep2Title: 'ArcTunnel 전송',
    deployStep2Desc: 'mTLS 암호화 파이프',
    deployStep3Title: '온톨로지 바인딩',
    deployStep3Desc: 'B²LAB 태그 자동 매핑',
    deployStep4Title: '온프레미스 기동',
    deployStep4Desc: '컨테이너 헬스체크',
    deployingProgress: '배포 진행 중...',
    deploySuccess: '배포 성공',
    viewInWorkspace: '워크스페이스에서 확인하기',
    runInBackground: '백그라운드로 계속 실행',
    dataPlaneSecureGuarantee: '데이터 평면 보호: 원본 데이터는 온프레미스 경계 밖으로 이동하지 않았습니다.',

    // PoCReportModal
    reportSubTitle: '14일 기술 검증 및 적합성 평가서',
    reportRunningStatus: '실증 진행 중 ({days}일차 / D-{remaining})',
    reportFacilityNode: '실증 사업장 및 노드',
    reportApplicantDept: '신청 부서 / 담당자',
    reportPeriod: '실증 기간',
    reportFourteenDays: '14일',
    reportCoreGoal: '검증 핵심 목표',
    reportRealtimeMetricsTitle: '실시간 검증 성과 지표 (Real-time PoC Metrics)',
    reportScoreLabel: '기술 적합도 점수',
    reportScoreSub: '합격 기준(90%) 초과 달성',
    reportTagsLabel: '온톨로지 수집 태그',
    reportTagsSub: 'AAS/OPC-UA 정상 동기화',
    reportInterferenceLabel: '공정 간섭 및 다운타임',
    reportInterferenceSub: 'Read-Only 격리 무간섭',
    reportDropLabel: '패킷 드롭 / 통신 오류',
    reportDropSub: 'ArcTunnel mTLS 무손실',
    reportItemResultsTitle: '검증 항목별 판정 결과',
    reportItem1Title: '1. 도메인 원본 DB 격리 및 Read-Only 무간섭성',
    reportItem1Desc: '기존 생산 PLC 및 설비 DB에 대한 쓰기(Write) 호출이 100% 차단됨을 확인.',
    reportItem2Title: '2. B²LAB 온톨로지 스트림 표준 매핑 정합도',
    reportItem2Desc: 'AAS 서브모델 및 KS X 9101 설비 메타데이터 태그 48개가 5ms 이하 지연으로 실시간 파싱됨.',
    reportItem3Title: '3. 현업 엔지니어 실증 시나리오 부합도',
    reportItem3Desc: '신청 부서의 검증 목표 기준 실시간 지표 분석 완료.',
    reportPassLabel: '적합 (Pass)',
    reportRoiTitle: '정식 도입 시 기대 효과 및 상용 전환 안내',
    reportRoiDesc: '본 모듈을 정식 구독으로 전환할 경우, 14일 샌드박스에서 구축된 AAS 온톨로지 태그 매핑 설정과 튜닝 모델이 초기화 없이 100% 영구 보존되어 별도의 재설치나 가동 중단 없이 즉시 상용 서비스로 승격됩니다.',
    reportPrintPdf: '보고서 인쇄 / PDF 저장',
    reportConvertToSub: '정식 구독으로 전환하기',

    // Architecture (Whitepaper)
    archBadge: 'IMPIX ArcOS 백서',
    archBadgeSub: '하이브리드 아키텍처 · Plug & Play 표준 규약 · 3층 과금 모델 · 무중단 패치',
    archTitle: 'ArcOS 플랫폼 마켓플레이스 기획 & 아키텍처 명세',
    archDesc: '공정 데이터 사내 격리 원칙, 24종 Smart Factory 조합 구조, AI 에이전트 매니페스트 규약 등 핵심 설계 원칙을 인터랙티브하게 확인합니다.',
    archTab1: '1. 하이브리드 배포 모델',
    archTab2: '2. Smart Factory & AI 2-SKU',
    archTab3: '3. Plug & Play 규약',
    archTab4: '4. 3층 과금 & 성장 축',
    archTab5: '5. 운영 정책 & 읽기전용 보존',
    archBoundaryNote: '제약·식품 고객사 보안 심사 필수 통과 기준',
    archControlPlaneTitle: '제어 평면 (Control Plane - SaaS)',
    archControlPlaneDesc: 'SaaS 상에서 테넌트, 가입, 과금, 카탈로그 및 배포 오케스트레이션을 총괄합니다.',
    archControlPlaneItem1: 'ArcOS 포털 (테넌트 SSO, 사용자 권한)',
    archControlPlaneItem2: '앱 카탈로그 및 4대 조건 사전 점검',
    archControlPlaneItem3: '메타·모델 레지스트리 (컨테이너 이미지, 매니페스트)',
    archControlPlaneWarning: '⚠️ 원본 도메인 데이터는 SaaS에 절대 저장되지 않음',
    archTunnelEncryption: 'mTLS 암호화',
    archDataPlaneTitle: '데이터 평면 (Data Plane - 온프레미스)',
    archDataPlaneDesc: '지역별 온프레미스 사업장 노드 방화벽 내부에서 데이터 원본과 sLM 모델을 보호합니다.',
    archDataPlaneItem1: 'B²LAB 데이터레이크 (AAS/OPC-UA 온톨로지 표준)',
    archDataPlaneItem2: '도메인 DB 원본 (MES, ERP, 설비 PLC, 내부 문서)',
    archDataPlaneItem3: '학습·추론 런타임 (사내 GPU 노드에서 sLM 추론)',
    archDataPlaneGuarantee: '🔒 공정 데이터·사내 문서 원본 외부 유출 원천 차단',
    archDownstreamTitle: '↓ SaaS에서 온프레미스로 내려가는 것:',
    archDownstreamDesc: '앱 컨테이너 이미지, 환경 설정 매니페스트, AI 모델 파라미터 정의, 배포 명령',
    archUpstreamTitle: '↑ 온프레미스에서 SaaS로 올라가는 것:',
    archUpstreamDesc: '실행 상태 하트비트, 가동률 성능 메트릭, 보안 감사 로그, 과금 정산용 사용량 카운터',
    archSuiteSec1Title: '1. Smart Factory 24가지 조합 구조적 근거',
    archSuiteSec1Desc: 'MES 3종(제약 특화, 식품·화장품 특화, 일반 제조)은 공정 규제와 밸리데이션 요구사항이 상이하여 **상호 배타적(하나만 선택)**입니다. 반면 품질·기록·공급망을 담당하는 EBRS, REMS, SCM은 **자유 조합**입니다.',
    archSuiteFormula: '실질 조합 수 = MES (3종 중 1개) × 확장 모듈 (2³ = 8가지) = **총 24가지**',
    archSuiteSec1Note: '업종별 고정 번들 패키지만으로는 이 24가지 고객 수요를 모두 충족할 수 없으므로, **모듈 개별 과금**을 채택하는 구조적 근거가 됩니다.',
    archSuiteSec2Title: '2. AI 계층의 2개 SKU 분리 (A²LAB vs 슈퍼바이저)',
    archSuiteA2labTitle: 'A²LAB (에이전트 모듈 생성기)',
    archSuiteA2labDesc: '품질 예측, 설비 예지, 규정 검토 같은 도메인 에이전트 모듈을 제작·학습시키는 **공장** 역할입니다.',
    archSuiteOrchTitle: '다중 AI Agent 슈퍼바이저 (오케스트레이션)',
    archSuiteOrchDesc: '만들어진 개별 에이전트들의 판단을 교차 검증하고 충돌을 조율하는 **지휘 런타임**입니다.',
    archSuiteSec2Note: '에이전트가 1~2개일 때는 오케스트레이션이 필요 없으므로 초기에는 A²LAB 상위 티어에 포함시키고, 사내 에이전트가 3개 이상 가동되는 대규모 고객부터 별도 SKU로 분리 판매하는 경로를 제공합니다.',
    archSuiteSec3Title: '3. ArcMind (노코드 빌더) vs 기성 스마트팩토리 스위트의 명확한 역할 구분',
    archSuiteSec3Desc: '**ArcMind**는 사내 IT/소프트웨어 전담 인력을 보유한 기업이 기성 MES 제품에 종속되지 않고, 자체적으로 No-Code/Low-Code 컴포넌트를 드래그앤드롭하여 공장별 맞춤형 Smart Factory 플랫폼을 직접 구축할 수 있는 전문 빌더입니다.',
    archSuiteSec3Warning: '**💡 중복 구매 방지 정책:** 기성 MES 스위트를 도입하는 경우 대부분의 공정·배치·설비 화면이 이미 완성되어 공급되므로, ArcMind와의 중복 구성을 방지하기 위해 마켓플레이스와 견적 시뮬레이터에서 상호 배타적 검토 및 분리 가이드를 제공합니다.',
    archPnpTitle: '새 모듈 추가에 기존 코드 수정이 없는 4대 Plug & Play 규약',
    archPnpItem1Title: '① 패키징 규약 (Container + Manifest)',
    archPnpItem1Desc: '모든 앱은 OCI 표준 컨테이너 이미지와 JSON 매니페스트로 등록됩니다. 매니페스트에 요구 데이터 스키마, 노출 API, 의존 앱을 선언합니다.',
    archPnpItem2Title: '② 데이터 규약 (AAS, OPC-UA, KS X 9101)',
    archPnpItem2Desc: '앱은 레거시 DB를 직접 보지 않고 B²LAB 온톨로지 계층만 조회합니다. 고객사마다 상이한 DB 구조를 앱이 알 필요가 없습니다.',
    archPnpItem3Title: '③ 인증·권한 규약 (ArcOS Tenant SSO)',
    archPnpItem3Desc: '테넌트 단위 통합 SSO를 ArcOS가 독점 소유하며, 앱별 권한 매트릭스는 ArcMind 컴포넌트 레벨까지 일관되게 제어됩니다.',
    archPnpItem4Title: '④ 이벤트 규약 (공통 Pub/Sub Event Bus)',
    archPnpItem4Desc: '앱 간 통신은 직접 결합하지 않고 이벤트 버스를 통합니다. 설비 알람 이벤트에 컨센스봇이 구독하는 방식으로 상호 연동됩니다.',
    archPnpManifestTitle: 'A²LAB 생성 에이전트 매니페스트 예시 (JSON Spec):',
    archPnpManifestTarget: '압출 공정 두께 불량 사전 예측',
    archPricingTitle: '3층 과금 모델 & 모듈별 자연 성장 축',
    archPricingDesc: '단가는 고정하고 할인은 볼륨 구간에서만 제공합니다. 고객이 최소 조합으로 시작해도 사업 성장에 따라 청구액이 자연스럽게 연동되는 구조입니다.',
    archPricingColModule: '모듈',
    archPricingColGrowth: '자연 성장 축',
    archPricingColBasis: '과금 기준',
    archPricingColMechanism: '성장 메커니즘',
    archPricingRows: [
      { module: '플랫폼 기본료', growth: '테넌트 고정', basis: '월 300만원', mechanism: '고정 앵커로 기본 진입 장벽 확보' },
      { module: 'B²LAB 온톨로지', growth: '데이터 저장 용량 구간', basis: '월 80만원 (1TB 포함)', mechanism: '수집 태그·이력 축적에 비례' },
      { module: 'MES 3종', growth: '생산 라인 수', basis: '라인당 40~80만원', mechanism: '공장 증설 시 라인 추가 구독' },
      { module: 'EBRS', growth: '배치 기록 건수', basis: '월 120만원 (기본 배치)', mechanism: '생산량 증가 시 종량 초과' },
      { module: 'REMS / A.ESG', growth: '센서 계측점 수', basis: '월 90~130만원', mechanism: '계측 센서 설치 구역 확대' },
      { module: 'A²LAB', growth: '추론 호출 수', basis: '월 150만원 + 호출 종량', mechanism: 'AI 모듈 상시 가동량 비례' },
      { module: '컨센스봇', growth: '사용자 수', basis: '월 180만원 (동시 20유저)', mechanism: 'QA/QC/생산 관리 인원 확대' }
    ],
    archPolicyTitle: '운영 정책: 규제 데이터 [읽기 전용 보존] & 런타임 지원 정책',
    archPolicy1Title: '1. 제3의 상태: [읽기 전용 보존] 상태',
    archPolicy1Desc: 'EBRS나 품질 모듈을 해지했을 때, 이미 생성된 전자 제조기록은 제약·식품 규제상 5~10년간 법적 보존 의무가 있습니다. 따라서 단순 ‘활성’과 ‘해지’ 외에, 저렴한 유지비용으로 데이터 무결성을 보존하는 **[읽기 전용 보존] 상태**와 보존 요금을 운영합니다.',
    archPolicy2Title: '2. N, N-1 버전 이중 지원 원칙',
    archPolicy2Desc: '고객사 온프레미스 런타임 갱신 시점이 저마다 다르므로, SaaS 제어 평면은 **현재 버전(v4.2)과 직전 버전(v4.1) 2개 버전**만을 동시 지원합니다. 이 원칙이 없으면 2~3년 뒤 하위 호환성 유지 비용으로 제품이 붕괴합니다.',
    archPolicy3Title: '3. 24/7 무중단 롤링 패치 원칙',
    archPolicy3Desc: '24시간 가동되는 제조 라인의 특성상 유지보수를 위한 다운타임은 허용되지 않습니다. Blue/Green 및 온프레미스 노드 롤링 업데이트로 **무중단 핫픽스**를 적용하며, 플랫폼 내 ‘무중단 패치노트’ 메뉴에서 변경 이력과 롤백 보증 상태를 즉시 추적합니다.',

    archPolicy4Title: '4. 모듈별 최소 약정 기간',
    archPolicy4Desc: '모듈마다 도입 부담과 이탈 위험이 다르므로 약정 단위를 나눕니다. **MES 코어 3종은 연 단위**, **EBRS·REMS·SCM 등 규제 도메인 확장 모듈은 분기 단위**로 묶고, **A²LAB·오케스트레이션·컨센스봇 등 AI 모듈은 월 단위 해지를 허용하되 월 {floor} 최소 청구액**을 둡니다. 서로 다른 약정이 한 견적에 섞이면 가장 긴 약정이 구독 전체를 구속합니다.',

    commitmentTermAnnual: '연 약정 (12개월)',
    commitmentTermQuarterly: '분기 약정 (3개월)',
    commitmentTermMonthly: '월 약정 (사용량 최소 청구)',
    commitmentSummaryLabel: '최소 약정 기간',
    commitmentSummaryNote: '견적에 포함된 모듈 중 가장 긴 약정이 구독 전체에 적용됩니다.',
    commitmentUsageFloorNote: '월 단위 모듈은 언제든 해지할 수 있으나 월 {floor} 최소 청구액이 적용됩니다.',
    commitmentQuotationRow: '최소 약정 기간',

    landingBadge: '추천 시작 모듈',
    landingBadgeWith: '추천 시작 모듈: {module}',
    landingCatalogNote: '처음 도입하신다면 컨센스봇과 일반 제조 MES부터 시작하는 것을 권장합니다. 두 모듈은 기존 시스템 교체 없이 가장 빠르게 효과를 확인할 수 있는 진입점입니다.',

    ariaSelectFacility: '사업장 선택 (지역 + 업종)',
    ariaSelectDeployNode: '배포 대상 사업장 노드 선택',

    // Currency
    currencyLabel: '통화',
    ariaSelectCurrency: '표시 통화 선택',

    // Quote scenarios
    scenarioSectionTitle: '견적안 저장 & 비교',
    scenarioSectionSub: '구성이 다른 견적을 저장해 두고 월 구독료를 나란히 비교합니다.',
    scenarioSaveBtn: '현재 견적 저장',
    scenarioCompareBtn: '견적안 비교',
    scenarioNamePlaceholder: '견적안 이름 (예: A안 · 최소 구성)',
    scenarioSaveConfirm: '저장',
    scenarioCancel: '취소',
    scenarioEmptyHint: '아직 저장된 견적안이 없습니다. 모듈을 구성한 뒤 저장하면 다른 안과 비교할 수 있습니다.',
    scenarioLimitReached: '견적안은 최대 {max}개까지 저장할 수 있습니다. 기존 안을 삭제한 후 저장하세요.',
    scenarioLoadBtn: '불러오기',
    scenarioDeleteBtn: '삭제',
    scenarioNeedTwo: '비교하려면 견적안을 2개 이상 저장하세요.',
    scenarioDefaultName: '견적안 {label}',
    scenarioSavedAtLabel: '저장',
    scenarioCompareTitle: '견적안 비교',
    scenarioCompareSub: '동일한 과금 기준으로 재계산한 월 구독료입니다.',
    scenarioColItem: '항목',
    scenarioRowBaseFee: '플랫폼 기본료',
    scenarioRowSubtotal: '모듈 소계',
    scenarioRowDiscount: '볼륨 할인',
    scenarioRowTotal: '월 구독료 합계',
    scenarioRowLines: '생산 라인 수',
    scenarioRowModules: '모듈 수',
    scenarioNotIncluded: '미포함',
    scenarioLowestBadge: '최저가',
    scenarioDiffVsLowest: '최저가 대비',
    scenarioLoadedToast: '[{name}] 견적안을 불러왔습니다.',
    scenarioSavedToast: '[{name}] 견적안이 저장되었습니다.',

    // PoC follow-up
    pocStageTitle: '진행 단계',
    pocStageApplied: '신청 접수',
    pocStageProvisioned: '샌드박스 배포',
    pocStageCollecting: '데이터 수집·검증',
    pocStageReview: '중간 평가 리포트',
    pocStageDecision: '전환 결정',
    pocEndingSoonTitle: '평가 종료 임박',
    pocEndingSoonDesc: '{days}일 후 샌드박스와 임시 데이터가 자동 파기됩니다. 정식 전환하거나 평가 기간을 연장하세요.',
    pocExtendBtn: '평가 기간 7일 연장 요청',
    pocExtendedBadge: '7일 연장됨',
    pocExtendUnavailable: '연장은 1회만 가능합니다',
    pocExtendToast: '[{name}] 평가 기간이 7일 연장되었습니다. 샌드박스는 그대로 유지됩니다.',
    pocContactBtn: '담당 엔지니어 연결 요청',
    pocContactRequestedBadge: '엔지니어 배정 요청됨',
    pocContactToast: '[{name}] 담당 엔지니어 배정을 요청했습니다. 영업일 기준 1일 이내 연락드립니다.',
    pocNextStepsTitle: '다음 단계',
    pocNextStep1: '현장 담당자와 평가 지표 결과를 검토합니다.',
    pocNextStep2: '정식 전환 시 샌드박스의 온톨로지 매핑과 튜닝 모델이 그대로 승계됩니다.',
    pocNextStep3: '추가 검증이 필요하면 평가 기간을 1회 연장할 수 있습니다.',

    tier2Title: '2층: 선택한 구독 모듈',
    tier3Title: '3층: 자연 성장 축 시뮬레이터',
    clearCartBtn: '전체 비우기',
    cartEmptyTitle: '선택한 모듈이 없습니다.',
    browseModules: '앱 마켓플레이스에서 모듈 둘러보기',
    callsUnit: '건/월',
    pointsCountUnit: '점',
    partnersCountUnit: '개사',
    growthAxisLinesTitle: '생산 라인 수 (MES 코어 연동 성장 축)',
    growthAxisLinesDesc: '공장 내 가동 중인 전체 제조 라인 수에 비례하여 MES 코어 단가가 승산됩니다.',
    growthAxisPointsTitle: '계측점 수 (REMS 연동 성장 축)',
    growthAxisPointsDesc: '청정실에 설치된 차압·온습도·미립자 센서의 총 계측점 수입니다. 기본 200점이 포함되며 100점 추가마다 기본료의 15%가 가산됩니다.',
    growthAxisPartnersTitle: '협력사 수 (SCM 연동 성장 축)',
    growthAxisPartnersDesc: '협력사 포털에 연결된 1·2차 외주사 계정 수입니다. 기본 10개사가 포함되며 10개사 추가마다 기본료의 20%가 가산됩니다.',
    growthAxisInferenceTitle: 'AI 추론 호출량 (A²LAB MLOps 성장 축)',
    growthAxisInferenceDesc: '품질 예측 및 이상 감지 에이전트의 월간 추론 호출 건수입니다 (10만 건 기본 포함).',
    meteredBreakdown: '{base} 기준 · {qty}{unit} (×{factor})',
    discountAppliedBadge: '할인 적용',
    reportBadge: 'PoC 평가 보고서',

    rateStatusLive: '실시간 환율 적용 중',
    rateStatusLoading: '환율 동기화 중…',
    rateStatusStale: '환율 서버 응답 없음 — 마지막 환율 사용 중',
    rateStatusBundled: '기본 내장 환율 사용 중',
    rateRefreshLabel: '환율 새로고침',

    valueSectionTitle: '도입 효과',
    valueOutcomesTitle: '주요 지표',
    valueUseCasesTitle: '적용 사례',
    valueDocsLinkLabel: '관련 자료 보기',

    navResources: '자료실',
    navResourcesSub: '백서 · 매뉴얼 · 도입 가이드',
    navResourcesBadge: '문서',
    resourcesTitle: '자료실',
    resourcesSubtitle: '아키텍처 백서, 모듈별 운영 매뉴얼, 도입 가이드를 한 곳에서 찾아보세요.',
    resourcesSearchPlaceholder: '문서명, 내용, 대상 모듈 검색...',
    resourcesKindAll: '전체',
    resourcesKindWhitepaper: '백서',
    resourcesKindManual: '운영 매뉴얼',
    resourcesKindGuide: '도입 가이드',
    resourcesKindSpec: '연동 규격',
    resourcesAudienceLabel: '대상 독자',
    resourcesUpdatedLabel: '최종 개정',
    resourcesReadingTime: '약 {min}분',
    resourcesRelatedModules: '관련 모듈',
    resourcesEmpty: '조건에 맞는 문서가 없습니다.',
    resourcesResetFilters: '검색 조건 초기화',
    resourcesBackToList: '목록으로',
    resourcesOpenManual: '매뉴얼 보기',
    resourcesCountLabel: '개 문서'
  },
  en: {
    brandName: 'ArcOS',
    brandTagline: 'IMPIX Manufacturing Operation Platform',
    hybridBadge: 'Hybrid',
    controlPlane: 'Control Plane',
    dataPlane: 'Data Plane',
    controlPlaneDesc: 'ArcOS SaaS (Seoul Region)',
    dataPlaneDesc: 'On-premise Connected',
    normalStatus: 'Healthy',
    connectedStatus: 'Connected',
    securityNoticeTitle: 'Domain Data On-Premise Isolation:',
    securityNoticeDesc: 'Raw production DB and internal documents never leave on-premise; only deployment metadata is exchanged.',
    partnerSupport: 'IMPIX Technical Support Partnership (24/7 SLA)',

    navMarketplace: 'App Marketplace',
    navMarketplaceSub: 'Module Catalog & Readiness Check',
    navQuote: 'Quote Simulator',
    navQuoteSub: '3-Layer Pricing & Volume Discount',
    navWorkspace: 'My Workspace',
    navWorkspaceSub: 'On-premise Runtimes & Versions',
    navArchitecture: 'Hybrid & Protocols',
    navArchitectureSub: 'AAS · Ontology · Whitepaper',
    navPatchNotes: 'Patch Notes (Zero-Downtime)',
    navPatchNotesSub: '24/7 Rolling Patch & Release Notes',
    navItemsCount: ' items',
    navActiveCount: ' active',
    navWhitepaperBadge: 'Spec',
    navZeroDowntimeBadge: 'Zero-Downtime',

    heroBadge: 'Hybrid Deployment & Modular Plug & Play Marketplace',
    heroTitle: 'Select and Deploy Manufacturing Modules Instantly',
    heroDesc: 'Freely assemble the IMPIX manufacturing solution lineup on a unified subscription platform. Production data and internal records remain safe on-premise, instantly bound via AAS/OPC-UA standard ontology without code changes.',
    baseFeeLabel: 'Platform Base Fee (Fixed Anchor)',
    baseFeeValue: '₩3,000,000 / mo',
    baseFeeBullets: [
      '✓ ArcOS Control Portal & Tenant SSO',
      '✓ Module deployment orchestration & zero-downtime rolling patches',
      '✓ ArcTunnel mTLS Encrypted Secure Channel'
    ],
    viewCartBtn: 'View Selected Quote',
    categoryAll: 'All',
    searchPlaceholder: 'Search modules, features, compliance standards...',
    filterByStatus: 'Filter by Status',
    quickPresetTitle: 'Industry & Requirement Recommended Packages',
    quickPresetDesc: 'Apply pre-validated configurations in one click and compare quotes',
    viewAllPresets: 'Compare All 7 Packages',
    appsCountLabel: ' modules registered',
    addToCart: 'Add to Cart',
    inCart: 'In Cart (Click to remove)',
    viewDetails: 'Inspect Specs',
    installedBadge: 'Subscribed (Included)',
    prereqBadge: 'Check Prerequisites',
    onpremBadge: 'On-premise Only',
    categoryLabels: {
      '전체': 'All',
      'Smart Factory': 'Smart Factory',
      'AI': 'AI',
      'LLM': 'LLM',
      '에너지': 'Energy',
      '시각화': 'Visualization',
      '기반': 'Core',
      '빌더': 'Builder'
    },
    statusFilterAll: 'All Statuses',
    statusFilterReady: 'Available',
    statusFilterNeed: 'Prerequisites Required',
    statusFilterOnprem: 'On-premise Only',
    statusFilterSub: 'Subscribed',
    statusBadgeSub: 'Subscribed (Core)',
    statusBadgeReady: 'Ready to Install',
    statusBadgeNeed: 'Prerequisites Required',
    statusBadgeOnprem: 'On-premise sLM Only',
    pocBadgeActive: 'PoC Active',
    pocBtn14Days: '14-Day PoC',
    pocBtnTitle: '14-day free technical verification in an isolated on-premise sandbox',
    duplicateReviewBadge: 'Review Recommended',
    suiteBadgeText: 'Suite',

    arcMindNoticeTitle: 'ArcMind Notice: Custom Platform Builder for In-House IT',
    arcMindNoticeDesc: 'ArcMind is designed for enterprises with in-house IT engineers to build custom Smart Factory platforms via No-Code / Low-Code. It is recommended to avoid duplicate selection with out-of-the-box MES suites.',
    arcMindDuplicateWarning: '⚠️ [Duplicate Adoption Alert] Both ready-made Manufacturing Operation Suite (MES) and ArcMind (In-House IT No-Code Builder) are selected. ArcMind is intended for in-house IT to build MES directly, which may cause overlapping investment.',
    arcMindConflictResolveKeepSuite: 'Keep Ready-Made MES (Exclude ArcMind)',
    arcMindConflictResolveKeepArcMind: 'Adopt In-House DIY (Exclude MES, Keep ArcMind)',

    quoteTitle: 'ArcOS Monthly Subscription Quote Simulator',
    quoteSubtitle: 'Unit prices remain fixed; volume discounts apply only on module quantity tiers. MES costs scale dynamically with production lines.',
    officialQuotePrint: 'Print Official Quotation / PDF',
    batchDeployBtn: 'Request Batch Node Deployment',
    presetsHeading: 'Industry & Requirement Custom Presets',
    presetsSubheading: 'Apply battle-tested configurations directly into your cart and line slider in one click.',
    tabIndustry: 'Industry Presets',
    tabRequirement: 'Requirement & Maturity Stages',
    layer1Title: 'Layer 1: Platform Base Fee (Anchor)',
    layer1Desc: 'ArcOS Portal + ArcTunnel + ArcOS Tools (mandatory; B²LAB is billed separately)',
    layer2Title: 'Layer 2: Selected Subscription Modules',
    layer3Title: 'Layer 3: Natural Growth Metrics (Lines & Inferences)',
    linesSliderTitle: 'Active Production Lines (MES Scaling Axis)',
    linesSliderDesc: 'MES core license multiplies by the number of operational production lines in the facility.',
    aiSliderTitle: 'AI Inference Invocations (A²LAB MLOps Scaling Axis)',
    aiSliderDesc: 'Monthly inference call count for predictive quality & anomaly detection agents (100k included).',
    quoteSummaryTitle: 'Subscription Summary',
    monthlyTotal: 'Total Monthly Subscription',
    volumeDiscountLabel: 'Volume Discount',

    patchNotesTitle: 'Zero-Downtime Rolling Patch & Release Center',
    patchNotesSubtitle: 'ArcOS enforces zero-downtime canary rolling patches and real-time PLC buffering so manufacturing plants run 24/7 without disruptions.',
    tabPatchHistory: 'Patch History',
    tabZeroDowntimeArch: 'Zero-Downtime Principles',
    tabPatchSimulator: 'Patch Simulator',
    zeroDowntimeVerified: 'Zero-Downtime Certified',
    patchTypeSecurity: 'Security Hotfix',
    patchTypeCompliance: 'Regulatory Compliance',
    patchTypePerformance: 'Performance Tuning',
    patchTypeFeature: 'Feature Enhancement',
    simulatorTitle: 'Facility Zero-Downtime Rolling Patch Simulator',
    simulatorDesc: 'Simulate replacing running container pods with new canary instances and handing over traffic with zero data loss while lines remain active.',
    simulateBtn: 'Execute Zero-Downtime Rolling Patch',
    simulatingBtn: 'Applying Zero-Downtime Patch...',
    rollbackGuarantee: 'Rollback Guarantee: If health checks fail, system automatically rolls back within 3 seconds without downtime',

    slaDowntimeLabel: 'Process Downtime',
    slaDowntimeVal: '0.00s',
    slaDowntimeDesc: 'Zero Downtime',
    slaSuccessRateLabel: 'Patch Success Rate',
    slaSuccessRateVal: '100.0%',
    slaSuccessRateDesc: 'Canary Verified',
    slaDataLossLabel: 'PLC Data Loss',
    slaDataLossVal: '0 pkts',
    slaDataLossDesc: 'Ring-Buffer Safe',
    slaRollbackLabel: 'Auto Rollback',
    slaRollbackVal: '< 3s',
    slaRollbackDesc: 'Instant on Anomaly',
    patchSearchPlaceholder: 'Search version, patch name, module...',
    patchFilterCategoryLabel: 'Category:',
    patchAllFilter: 'All',

    connectedTenantLabel: 'Connected Tenant',
    runtimePolicyLabel: 'Runtime Support Policy',
    runtimePolicyRule: 'N, N-1 Versions',
    runtimePolicyDesc: 'Supported Runtimes: v4.2 / v4.1 (v4.0 or below requires upgrade prior to deploy)',

    // Workspace View
    workspaceTitle: 'My Workspace',
    workspaceSubtitle: 'Manage on-premises module runtimes, 14-day PoC sandbox trials, B²LAB datalake bindings, and regulatory read-only preservation.',
    hybridRuntimeControlBadge: 'Hybrid Runtime Control',
    hybridRuntimeControlSub: 'Control plane orchestration · On-premises internal execution',
    deployNewModuleBtn: 'Deploy New Module',
    activeModulesCardTitle: 'Active Modules',
    activeModulesUnit: 'Modules',
    firewallReceivingStatus: 'Receiving inside enterprise firewall',
    pocTrialsCardTitle: '14-Day PoC Trials',
    freeBadge: 'Free',
    pocTestingUnit: 'Active Trials',
    sandboxIsolationLabel: 'Isolated Sandbox Validation',
    arcTunnelLinkTitle: 'ArcTunnel Secure Link',
    preservedDataCardTitle: 'Preserved Audit Data',
    itemsUnit: 'Items',
    pocActiveSectionTitle: '14-Day PoC Active Trials Status',
    pocActiveSectionSub: 'Validate process data for 14 days in an on-premises isolated sandbox with zero write interference to production databases.',
    pocNoAutoBillingGuarantee: 'Zero auto-billing on expiry ($0 guarantee)',
    pocEmptyTitle: 'No 14-day PoC trials currently running',
    pocEmptyDesc: 'Click the [14-Day PoC] button on any app in the Marketplace to instantly provision an on-premises sandbox.',
    pocExploreCatalogBtn: 'Explore PoC Modules in Marketplace',
    pocRemainingDaysBadge: 'D-{days} left',
    pocDaysRemainingPrefix: '',
    pocDaysRemainingSuffix: ' days remaining',
    pocStartedDateLabel: 'Started:',
    pocExpiresDateLabel: 'Expires:',
    pocGoalLabel: 'PoC Goal:',
    pocDeptLeadLabel: 'Lead Dept / Contact:',
    pocMetricsLabel: 'Real-time PoC Metrics',
    pocSuitabilityScore: 'Suitability Score',
    pocIngestedTags: 'Ingested Tags',
    pocViewReportBtn: 'View 14-Day Evaluation Report',
    pocConvertSubBtn: 'Convert to Full Subscription',
    pocTerminateSandboxBtn: 'Safely Terminate Sandbox',
    installedModulesTableTitle: 'On-Premises Node Deployed Module Runtimes',
    installedModulesTableSub: 'Under zero-downtime rolling patch policy, previous stable (N-1) and latest (N) versions may coexist.',
    runtimePolicyRuleBadge: 'Supports N, N-1 Versions',
    colModuleName: 'Module Name',
    colNodeLocation: 'Target Node (Facility)',
    colRuntime: 'Runtime',
    colDatalakeBinding: 'B²LAB Datalake Binding',
    colLocalResource: 'Local Node Footprint',
    colAction: 'Actions',
    datalakeNormalStatus: 'Datalake Synchronized',
    latestRuntimeBadge: 'Latest Version',
    patchUpgradeBtn: 'Zero-Downtime Patch',
    patchingBtn: 'Patching in Progress...',
    decomTableTitle: 'Decommissioned Modules & Mandatory Regulatory Data Retention',
    decomTableSub: 'Under FDA 21 CFR Part 11, aerospace, and automotive standards, terminated module data is encrypted and retained read-only on-premise for statutory compliance periods.',
    cfrPart11Badge: 'CFR Part 11 Compliant',
    colDecomModule: 'Module Name',
    colRetainedData: 'Retained Data Scope',
    colRetentionExpiry: 'Statutory Retention Expiry',
    colMonthlyFee: 'Archive Fee',
    colAuditLogDownload: 'Audit Trail Dump',
    readOnlyPreservedBadge: 'Read-Only Preserved',
    downloadAuditDumpBtn: 'Download Audit Trail Archive',
    decomLegalNotice: 'Regulatory Notice: Archived audit data is stored in dedicated encrypted volumes separated from active production DBs. Upon statutory expiry (5–10 years), data is destroyed only after enterprise security committee review.',

    // Catalog Cards
    cardScalingMetric: 'Scaling metric:',
    cardReadinessSummary: 'Readiness Summary',
    cardConditionsUnmet: '{count} conditions unmet',
    cardConditionsReady: 'Ready',
    cardSchemaMapping: 'Schema mapping: ',
    cardComplete: 'complete',
    cardBilling: 'Billing',
    cardInspectSuite: 'Inspect Suite',
    cardSelectModules: 'Select Modules',
    cardPerModulePricing: 'Per-module pricing',
    cardIncludedInBase: 'Included in Base',
    arcMindCardBadge: 'Dedicated Builder for In-House IT',
    arcMindCardDesc: 'Enables internal dev teams to build bespoke Smart Factory UI & logic without buying off-the-shelf MES (avoids duplicate MES costs).',

    // Quote View Simulator & Presets
    threeTierBillingBadge: '3-Tier Transparent Billing Model',
    threeTierBillingSub: 'Fixed Base · Tiered Volume Discount · Natural Growth (Lines / Calls)',
    quoteSimulatorTitle: 'ArcOS Monthly Subscription Simulator',
    quoteSimulatorSub: 'Unit pricing is fixed; volume discounts apply to module count tiers. Adjust the production line slider to recalculate MES fees in real time.',
    appliedStatusBadge: 'Active Preset',
    recommendedTargetLabel: 'Recommended for:',
    linesStandard: 'Lines Base',
    estimatedMonthlyTotal: 'Est. Monthly Total:',
    tenThousandWon: '0k KRW',
    monthUnit: 'mo',
    applyPresetBtn: 'Apply This Configuration',
    tier1Title: 'Tier 1: Platform Base Fee (Fixed Anchor)',
    monthPrefix: 'Monthly',
    mandatoryPlatformInclude: 'Tenant Isolated SaaS Portal + ArcTunnel Secure Link (Mandatory)',
    tier1Composition: 'ArcOS Portal + ArcTunnel + ArcOS Tools',
    tier1CompositionDesc: 'Covers tenant SSO, the ArcTunnel mTLS encrypted link, and the module catalog, deployment orchestration and zero-downtime rolling patches. The domain ontology layer (B²LAB) and its storage are billed as a separate module.',
    vatNotice: 'Excl. VAT',
    platformBaseFeeLabel: 'Platform Base Fee',
    selectedModulesSubtotal: 'Selected Modules Subtotal',
    itemsCountUnit: 'items',
    discount6Rule: '6+ modules bundle: 10% volume discount applied',
    discount4Rule: '4+ modules bundle: 5% volume discount applied',
    discountDefaultRule: '5% discount for 4+ modules, 10% discount for 6+ modules.',
    finalTotalMonthly: 'Final Monthly Total',
    quoteDisclaimers: '* Unit prices are fixed; tiered discounts apply strictly to module volume. All raw data remains on-premises.',
    requestNodeDeploy: 'Deploy Selected Modules to Node',

    // Quotation Print Modal
    quotationTitle: 'ArcOS Manufacturing Platform Service Quotation',
    quotationNo: 'Quote No.',
    officialSubmissionLabel: 'Official Submission',
    customerTenant: 'Customer Tenant:',
    targetFacility: 'Target Facility:',
    deploymentModelLabel: 'Deployment Model:',
    hybridModelDesc: 'Hybrid (SaaS Control + On-Premises Data Plane)',
    itemCol: 'Item / Module',
    quantityCriterionCol: 'Qty / Metric',
    monthlyPriceCol: 'Monthly Price',
    basePlatformRowDesc: 'Platform Base Fee (ArcOS Portal + ArcTunnel)',
    basePlatformRowQty: 'Fixed per tenant',
    linesCountUnit: 'Lines',
    volumeDiscountRowTitle: 'Volume Discount ({count} modules bundle)',
    discountAppliedRate: '-{rate}% Applied',
    printSavePdfBtn: 'Print / Save as PDF',
    closeBtn: 'Close',

    // AppDetailModal
    suiteCombinationsTitle: '(24 Combinable Modular Suite)',
    moduleOverviewPrinciples: 'Module Overview & Hybrid Operating Principles',
    suiteSelectorTitle: 'Suite Configuration (3 × 2³ = 24 Flexible Combinations)',
    suiteSelectedCount: 'Selected Modules',
    singleRequiredChoice: 'Single Required Selection',
    multipleChoice: 'Multiple Selection Allowed',
    standardMapping: 'Std Mapping',
    preInstallGatesTitle: 'Pre-installation Automated Gates',
    preInstallGatesSub: 'Validates on-premises infrastructure and ontology mapping prior to deployment to prevent failure.',
    allGatesPassed: 'All Gates Passed',
    gatesBlockedCount: '{count} item(s) need review',
    gate1Title: 'Dependencies',
    gate1DepsCount: '{count} Dependencies',
    gate1NoDeps: 'No prerequisites required (Standalone executable)',
    recommendedWithCart: 'Recommended Bundle',
    gate2Title: 'Data Connectivity & Standard Ontology Mapping',
    gate2AppliedStd: 'Standards:',
    gate3Title: 'Target Facility & ArcTunnel Status',
    gate3NodeSelect: 'Select Target Facility Node:',
    gate3TunnelLink: 'ArcTunnel mTLS Encrypted Link',
    gate3Latency: 'Latency: 4ms',
    gate3RuntimeTunnelOk: 'Runtime {runtime} · Tunnel Healthy',
    gate4Title: 'Data Permissions & Command Governance',
    gate4SecurityApproved: 'Security Review Passed',
    gate4WriteControl: 'Write Control',
    gate4Granted: 'Granted',
    gate4Blocked: 'Blocked',
    suiteModulesSelected: '{count} Smart Factory modules selected',
    billingUnitLabel: 'Billing Metric',
    deployRequestToLocation: 'Deploy to {location}',
    removeFromQuote: 'Remove from Quote',
    addToQuote: 'Add to Quotation',
    pocBtnText: 'Start 14-Day Free PoC',

    // PoCApplyModal
    pocModalBadge: '14-Day Free PoC Trial',
    pocZeroCostNotice: '$0 Cost · No Auto-Billing',
    pocModalHeaderDesc: 'Deploys as an isolated read-only sandbox on your local node. Safely evaluate performance for 14 days without production disruption or database writes.',
    pocDeployingTitle: 'Deploying 14-Day PoC Sandbox to On-Premises Node...',
    pocDeployingSub: 'Streaming signed OCI sandbox container over encrypted ArcTunnel mTLS link.',
    pocDeployStep1: '1. [Control Plane] Establishing ArcTunnel mTLS session',
    pocDeployStep2: '2. [On-Premises] Provisioning isolated sandbox container (v4.2-sandbox)',
    pocDeployStep3: '3. [Ontology] Binding B²LAB read-only stream and starting 14-day timer',
    pocSuccessBadge: 'Deployment Complete · PoC Active (D-14)',
    pocSuccessTitle: '14-Day Trial Successfully Provisioned!',
    pocSuccessDesc: 'Running inside on-premises sandbox. Live telemetry is mirrored without write interference to your production DB.',
    pocDeployLocation: 'Deployment Location:',
    pocValidationGoal: 'Validation Objective:',
    pocDataIsolationMode: 'Data Isolation Mode:',
    pocValidityPeriod: 'Trial Validity:',
    pocFreePeriodText: 'Free for 14 Days (Zero auto-charge upon expiry)',
    pocContinueMarketplace: 'Continue Marketplace',
    pocGoToWorkspace: 'View PoC in Workspace',
    pocZeroCardNoticeTitle: '100% Free Guarantee (No Credit Card / Zero Disruption)',
    pocZeroCardNoticeDesc: 'No payment details required. Will never auto-convert to paid subscription upon expiration. Provided free for engineering technical evaluation.',
    pocStep1FacilityLabel: '1. Target Facility & On-Premises Node',
    pocStep1FacilitySub: 'OCI sandbox image is dispatched via the ArcTunnel gateway of the selected facility.',
    pocStep2GoalLabel: '2. PoC Technical Validation Goal',
    pocStep2Customizable: 'Fully customizable',
    pocStep2GoalPlaceholder: 'e.g., Validate AI scratch detection rate >98% on Line #3 with zero false positives',
    pocStep3DeptLabel: '3. Requesting Department & Lead Engineer',
    pocStep3DeptPlaceholder: 'e.g., Manufacturing Eng Team / Lead Engineer John Doe',
    pocStep4IsolationLabel: '4. Domain Data Isolation Mode (Security & Zero-Interference)',
    pocMirrorTitle: 'On-Premises Read-Only Mirror (Recommended)',
    pocMirrorDesc: 'Live PLC telemetry is streamed read-only into sandbox. Write calls to raw DB are blocked, preventing production interference.',
    pocSyntheticTitle: 'IMPIX Standard Synthetic Telemetry',
    pocSyntheticDesc: 'Injects industry-standard simulated telemetry datasets to review UI workflows and inference algorithms before connecting live PLCs.',
    pocPolicyTitle: 'PoC Operational & Technical Support Terms:',
    pocPolicyItem1: 'Occupies ~4GB RAM on target on-premise node during 14-day window; can be deleted anytime.',
    pocPolicyItem2: 'Includes 1 remote technical onboarding session with IMPIX domain engineers.',
    pocPolicyItem3: 'Upon 14-day completion, sandbox data can be purged or seamlessly converted to full production with 1 click.',
    pocFooterPeriod: 'Trial Duration: 14 Days from today (D-14)',
    pocCancelBtn: 'Cancel',
    pocStartDeployBtn: 'Deploy 14-Day Free Sandbox',

    // DeployModal
    deployOrchestratorTitle: 'Hybrid Remote Deployment Orchestrator',
    deployStep1Title: 'Control Plane Packaging',
    deployStep1Desc: 'Signing SaaS manifest',
    deployStep2Title: 'ArcTunnel Dispatch',
    deployStep2Desc: 'mTLS encrypted pipe',
    deployStep3Title: 'Ontology Binding',
    deployStep3Desc: 'B²LAB auto tag mapping',
    deployStep4Title: 'On-Premise Launch',
    deployStep4Desc: 'Container healthcheck',
    deployingProgress: 'Deploying...',
    deploySuccess: 'Deployed Successfully',
    viewInWorkspace: 'View in Workspace',
    runInBackground: 'Run in Background',
    dataPlaneSecureGuarantee: 'Data Plane Security: Raw data never leaves the on-premises perimeter.',

    // PoCReportModal
    reportSubTitle: '14-Day Technical Evaluation & Suitability Report',
    reportRunningStatus: 'Evaluation Active (Day {days} / D-{remaining})',
    reportFacilityNode: 'Target Node',
    reportApplicantDept: 'Requesting Dept / Lead',
    reportPeriod: 'Evaluation Period',
    reportFourteenDays: '14 Days',
    reportCoreGoal: 'Core Validation Goal',
    reportRealtimeMetricsTitle: 'Real-time Validation Metrics',
    reportScoreLabel: 'Suitability Score',
    reportScoreSub: 'Exceeds benchmark (90%)',
    reportTagsLabel: 'Ingested Tags',
    reportTagsSub: 'AAS/OPC-UA Synchronized',
    reportInterferenceLabel: 'Process Downtime',
    reportInterferenceSub: 'Zero write interference',
    reportDropLabel: 'Packet Loss',
    reportDropSub: 'ArcTunnel mTLS Lossless',
    reportItemResultsTitle: 'Detailed Criteria Assessment',
    reportItem1Title: '1. Production DB Isolation & Read-Only Non-Interference',
    reportItem1Desc: 'Verified 100% write blockage against active PLC and operational DBs.',
    reportItem2Title: '2. B²LAB Ontology Standard Stream Compliance',
    reportItem2Desc: '48 AAS submodel tags parsed with under 5ms latency in real time.',
    reportItem3Title: '3. Engineering Validation Scenario Fit',
    reportItem3Desc: 'Fully satisfied applicant department validation criteria.',
    reportPassLabel: 'Pass',
    reportRoiTitle: 'Commercial Transition & ROI Guidance',
    reportRoiDesc: 'Converting to commercial subscription permanently retains all configured AAS tag mappings and tuned model weights with zero re-installation or line downtime.',
    reportPrintPdf: 'Print / Save as PDF',
    reportConvertToSub: 'Convert to Full Subscription',

    // Architecture (Whitepaper)
    archBadge: 'IMPIX ArcOS Whitepaper',
    archBadgeSub: 'Hybrid architecture · Plug & Play standards · 3-tier pricing · Zero-downtime patching',
    archTitle: 'ArcOS Platform Marketplace Blueprint & Architecture Specification',
    archDesc: 'Explore the core design principles interactively: on-premise process data isolation, the 24-variant Smart Factory composition model, and the AI agent manifest contract.',
    archTab1: '1. Hybrid Deployment Model',
    archTab2: '2. Smart Factory & AI 2-SKU',
    archTab3: '3. Plug & Play Contracts',
    archTab4: '4. 3-Tier Pricing & Growth Metrics',
    archTab5: '5. Operating Policy & Read-Only Retention',
    archBoundaryNote: 'Mandatory pass criteria for pharma/food customer security reviews',
    archControlPlaneTitle: 'Control Plane (SaaS)',
    archControlPlaneDesc: 'Governs tenants, subscriptions, billing, the catalog, and deployment orchestration from SaaS.',
    archControlPlaneItem1: 'ArcOS Portal (tenant SSO, user permissions)',
    archControlPlaneItem2: 'App catalog and 4-point pre-installation check',
    archControlPlaneItem3: 'Meta & model registry (container images, manifests)',
    archControlPlaneWarning: '⚠️ Raw domain data is never stored in SaaS',
    archTunnelEncryption: 'mTLS encrypted',
    archDataPlaneTitle: 'Data Plane (On-Premises)',
    archDataPlaneDesc: 'Protects raw data and sLM models inside the firewall of each regional on-premise facility node.',
    archDataPlaneItem1: 'B²LAB datalake (AAS/OPC-UA ontology standard)',
    archDataPlaneItem2: 'Raw domain DBs (MES, ERP, equipment PLC, internal documents)',
    archDataPlaneItem3: 'Training & inference runtime (sLM inference on in-house GPU nodes)',
    archDataPlaneGuarantee: '🔒 Process data and internal documents never leave the premises',
    archDownstreamTitle: '↓ Pushed from SaaS down to on-premises:',
    archDownstreamDesc: 'App container images, environment manifests, AI model parameter definitions, deployment commands',
    archUpstreamTitle: '↑ Reported from on-premises up to SaaS:',
    archUpstreamDesc: 'Runtime heartbeats, uptime performance metrics, security audit logs, metered usage counters for billing',
    archSuiteSec1Title: '1. Structural Rationale for the 24 Smart Factory Combinations',
    archSuiteSec1Desc: 'The three MES editions (pharma-specific, food/cosmetics-specific, general manufacturing) differ in process regulation and validation requirements, which makes them **mutually exclusive (pick exactly one)**. EBRS, REMS and SCM — covering quality, records and supply chain — are **freely combinable**.',
    archSuiteFormula: 'Effective combinations = MES (1 of 3) × extension modules (2³ = 8) = **24 in total**',
    archSuiteSec1Note: 'Fixed industry bundles alone cannot satisfy all 24 demand profiles, which is the structural rationale for adopting **per-module pricing**.',
    archSuiteSec2Title: '2. Splitting the AI Tier into Two SKUs (A²LAB vs Supervisor)',
    archSuiteA2labTitle: 'A²LAB (Agent Module Generator)',
    archSuiteA2labDesc: 'Acts as the **factory** that builds and trains domain agent modules such as quality prediction, equipment prognostics and regulatory review.',
    archSuiteOrchTitle: 'Multi-AI Agent Supervisor (Orchestration)',
    archSuiteOrchDesc: 'The **command runtime** that cross-verifies the decisions of individual agents and arbitrates conflicts between them.',
    archSuiteSec2Note: 'With only one or two agents, orchestration is unnecessary, so it ships inside the A²LAB upper tier at first; customers running three or more in-house agents move onto a separate SKU.',
    archSuiteSec3Title: '3. Clear Role Separation: ArcMind (No-Code Builder) vs Off-the-Shelf Smart Factory Suites',
    archSuiteSec3Desc: '**ArcMind** is a specialist builder for companies with dedicated in-house IT/software staff, letting them drag and drop No-Code/Low-Code components to build a plant-specific Smart Factory platform themselves instead of locking into an off-the-shelf MES product.',
    archSuiteSec3Warning: '**💡 Duplicate-purchase prevention policy:** An off-the-shelf MES suite already ships finished process, batch and equipment screens, so the marketplace and quote simulator review ArcMind as mutually exclusive and provide separation guidance.',
    archPnpTitle: 'Four Plug & Play contracts that let new modules ship without touching existing code',
    archPnpItem1Title: '① Packaging contract (Container + Manifest)',
    archPnpItem1Desc: 'Every app registers as an OCI-standard container image with a JSON manifest that declares required data schemas, exposed APIs and dependent apps.',
    archPnpItem2Title: '② Data contract (AAS, OPC-UA, KS X 9101)',
    archPnpItem2Desc: 'Apps never read legacy DBs directly — they query only the B²LAB ontology layer, so an app never needs to know each customer’s DB structure.',
    archPnpItem3Title: '③ Authentication & authorization contract (ArcOS Tenant SSO)',
    archPnpItem3Desc: 'ArcOS exclusively owns tenant-level unified SSO, and per-app permission matrices are enforced consistently down to the ArcMind component level.',
    archPnpItem4Title: '④ Event contract (shared Pub/Sub event bus)',
    archPnpItem4Desc: 'Apps never couple directly; they communicate over the event bus — ConsensBot, for example, subscribes to equipment alarm events.',
    archPnpManifestTitle: 'A²LAB generated agent manifest example (JSON spec):',
    archPnpManifestTarget: 'Predictive detection of extrusion thickness defects',
    archPricingTitle: '3-Tier Pricing Model & Natural Growth Metric per Module',
    archPricingDesc: 'Unit prices stay fixed and discounts apply only at volume tiers. Even customers starting from a minimal combination see billing scale naturally as their business grows.',
    archPricingColModule: 'Module',
    archPricingColGrowth: 'Natural Growth Metric',
    archPricingColBasis: 'Billing Basis',
    archPricingColMechanism: 'Growth Mechanism',
    archPricingRows: [
      { module: 'Platform base fee', growth: 'Per tenant, fixed', basis: 'KRW 3M/mo', mechanism: 'Fixed anchor securing the baseline entry point' },
      { module: 'B²LAB ontology', growth: 'Data storage tier', basis: 'KRW 800K/mo (1TB included)', mechanism: 'Scales with ingested tags and retained history' },
      { module: 'MES (3 editions)', growth: 'Production lines', basis: 'KRW 400K-800K per line', mechanism: 'Additional line subscriptions as plants expand' },
      { module: 'EBRS', growth: 'Batch record volume', basis: 'KRW 1.2M/mo (base batches)', mechanism: 'Metered overage as output grows' },
      { module: 'REMS / A.ESG', growth: 'Sensor measurement points', basis: 'KRW 900K-1.3M/mo', mechanism: 'Expanding instrumented plant zones' },
      { module: 'A²LAB', growth: 'Inference calls', basis: 'KRW 1.5M/mo + metered calls', mechanism: 'Scales with continuous AI module workload' },
      { module: 'ConsensBot', growth: 'Users', basis: 'KRW 1.8M/mo (20 concurrent users)', mechanism: 'More QA/QC/production staff onboarded' }
    ],
    archPolicyTitle: 'Operating Policy: Regulated Data [Read-Only Retention] & Runtime Support',
    archPolicy1Title: '1. The third state: [Read-Only Retention]',
    archPolicy1Desc: 'When EBRS or a quality module is cancelled, the electronic manufacturing records already produced carry a 5-10 year legal retention obligation under pharma/food regulation. Beyond plain “active” and “cancelled”, ArcOS therefore operates a **[Read-Only Retention] state** with a low-cost retention fee that preserves data integrity.',
    archPolicy2Title: '2. Dual N / N-1 version support principle',
    archPolicy2Desc: 'Because customers refresh their on-premise runtimes at different times, the SaaS control plane simultaneously supports only **the current version (v4.2) and the immediately preceding one (v4.1)**. Without this rule, backward-compatibility costs would collapse the product within two to three years.',
    archPolicy3Title: '3. 24/7 zero-downtime rolling patch principle',
    archPolicy3Desc: 'Production lines running around the clock cannot accept maintenance downtime. **Zero-downtime hotfixes** are applied through Blue/Green and on-premise node rolling updates, and the in-platform “Zero-Downtime Patch Notes” menu tracks change history and rollback guarantees instantly.',

    archPolicy4Title: '4. Minimum commitment term per module',
    archPolicy4Desc: 'Adoption cost and churn risk differ by module, so the commitment unit differs too. **The three MES cores are annual**, **regulated domain extensions such as EBRS, REMS and SCM are quarterly**, and **AI modules such as A²LAB, the orchestrator and ConsensBot may be cancelled monthly, subject to a {floor}/month minimum charge**. When terms are mixed in one quote, the longest one binds the whole subscription.',

    commitmentTermAnnual: 'Annual (12 months)',
    commitmentTermQuarterly: 'Quarterly (3 months)',
    commitmentTermMonthly: 'Monthly (usage minimum)',
    commitmentSummaryLabel: 'Minimum commitment',
    commitmentSummaryNote: 'The longest term among the selected modules applies to the whole subscription.',
    commitmentUsageFloorNote: 'Monthly modules can be cancelled at any time, subject to a {floor}/month minimum charge.',
    commitmentQuotationRow: 'Minimum commitment term',

    landingBadge: 'Recommended first module',
    landingBadgeWith: 'Recommended first module: {module}',
    landingCatalogNote: 'New to the platform? Start with ConsensBot and the General Manufacturing MES. Both are entry points that show results fastest without replacing an existing system.',

    ariaSelectFacility: 'Select facility (region + industry)',
    ariaSelectDeployNode: 'Select target facility node for deployment',

    // Currency
    currencyLabel: 'Currency',
    ariaSelectCurrency: 'Select display currency',

    // Quote scenarios
    scenarioSectionTitle: 'Save & Compare Scenarios',
    scenarioSectionSub: 'Save quotes with different module mixes and compare their monthly subscription side by side.',
    scenarioSaveBtn: 'Save Current Quote',
    scenarioCompareBtn: 'Compare Scenarios',
    scenarioNamePlaceholder: 'Scenario name (e.g. Plan A · minimal set)',
    scenarioSaveConfirm: 'Save',
    scenarioCancel: 'Cancel',
    scenarioEmptyHint: 'No saved scenarios yet. Configure your modules, then save to compare against another plan.',
    scenarioLimitReached: 'You can save up to {max} scenarios. Delete one before saving another.',
    scenarioLoadBtn: 'Load',
    scenarioDeleteBtn: 'Delete',
    scenarioNeedTwo: 'Save at least two scenarios to compare them.',
    scenarioDefaultName: 'Plan {label}',
    scenarioSavedAtLabel: 'Saved',
    scenarioCompareTitle: 'Scenario Comparison',
    scenarioCompareSub: 'Monthly subscription recalculated under identical pricing rules.',
    scenarioColItem: 'Item',
    scenarioRowBaseFee: 'Platform base fee',
    scenarioRowSubtotal: 'Module subtotal',
    scenarioRowDiscount: 'Volume discount',
    scenarioRowTotal: 'Total monthly subscription',
    scenarioRowLines: 'Production lines',
    scenarioRowModules: 'Modules',
    scenarioNotIncluded: 'Not included',
    scenarioLowestBadge: 'Lowest',
    scenarioDiffVsLowest: 'vs lowest',
    scenarioLoadedToast: 'Loaded scenario [{name}].',
    scenarioSavedToast: 'Scenario [{name}] saved.',

    // PoC follow-up
    pocStageTitle: 'Trial Stages',
    pocStageApplied: 'Application received',
    pocStageProvisioned: 'Sandbox deployed',
    pocStageCollecting: 'Data ingestion & validation',
    pocStageReview: 'Interim evaluation report',
    pocStageDecision: 'Conversion decision',
    pocEndingSoonTitle: 'Trial ending soon',
    pocEndingSoonDesc: 'The sandbox and its temporary data are purged automatically in {days} days. Convert to a full subscription or extend the trial.',
    pocExtendBtn: 'Request 7-day extension',
    pocExtendedBadge: 'Extended by 7 days',
    pocExtendUnavailable: 'Only one extension is available',
    pocExtendToast: 'Trial [{name}] extended by 7 days. The sandbox stays as it is.',
    pocContactBtn: 'Request a support engineer',
    pocContactRequestedBadge: 'Engineer requested',
    pocContactToast: 'Requested a support engineer for [{name}]. Expect contact within one business day.',
    pocNextStepsTitle: 'Next steps',
    pocNextStep1: 'Review the evaluation metrics with your on-site process owner.',
    pocNextStep2: 'On conversion, the sandbox ontology mapping and tuned models carry over untouched.',
    pocNextStep3: 'If further validation is needed, the trial can be extended once.',

    tier2Title: 'Tier 2: Selected Subscription Modules',
    tier3Title: 'Tier 3: Natural Growth Metric Simulator',
    clearCartBtn: 'Clear all',
    cartEmptyTitle: 'No modules selected yet.',
    browseModules: 'Browse modules in the app marketplace',
    callsUnit: 'calls/mo',
    pointsCountUnit: ' points',
    partnersCountUnit: ' suppliers',
    growthAxisLinesTitle: 'Production Lines (MES Growth Metric)',
    growthAxisLinesDesc: 'MES core module price scales proportionally with the active plant lines.',
    growthAxisPointsTitle: 'Measurement Points (REMS Growth Metric)',
    growthAxisPointsDesc: 'Total cleanroom sensor points for differential pressure, temperature/humidity and particle counts. 200 points are included; every additional 100 adds 15% of the base fee.',
    growthAxisPartnersTitle: 'Supplier Accounts (SCM Growth Metric)',
    growthAxisPartnersDesc: 'Tier 1 and Tier 2 subcontractor accounts on the partner portal. 10 accounts are included; every additional 10 adds 20% of the base fee.',
    growthAxisInferenceTitle: 'AI Inference Volume (A²LAB MLOps Metric)',
    growthAxisInferenceDesc: 'Monthly agent inference requests for anomaly detection (100k included).',
    meteredBreakdown: '{base} base · {qty}{unit} (×{factor})',
    discountAppliedBadge: 'discount applied',
    reportBadge: 'PoC Evaluation Report',

    rateStatusLive: 'Live rate applied',
    rateStatusLoading: 'Syncing rate…',
    rateStatusStale: 'Rate provider unreachable — using last known rate',
    rateStatusBundled: 'Using the bundled fallback rate',
    rateRefreshLabel: 'Refresh exchange rate',

    valueSectionTitle: 'Why adopt this',
    valueOutcomesTitle: 'Key figures',
    valueUseCasesTitle: 'Where it is used',
    valueDocsLinkLabel: 'View related documents',

    navResources: 'Resources',
    navResourcesSub: 'Whitepaper · Manuals · Guides',
    navResourcesBadge: 'Docs',
    resourcesTitle: 'Resource Library',
    resourcesSubtitle: 'The architecture whitepaper, per-module operating manuals and adoption guides, in one place.',
    resourcesSearchPlaceholder: 'Search titles, content, related modules...',
    resourcesKindAll: 'All',
    resourcesKindWhitepaper: 'Whitepaper',
    resourcesKindManual: 'Operating Manual',
    resourcesKindGuide: 'Adoption Guide',
    resourcesKindSpec: 'Integration Spec',
    resourcesAudienceLabel: 'Written for',
    resourcesUpdatedLabel: 'Last revised',
    resourcesReadingTime: '~{min} min',
    resourcesRelatedModules: 'Related modules',
    resourcesEmpty: 'No documents match these filters.',
    resourcesResetFilters: 'Reset filters',
    resourcesBackToList: 'Back to list',
    resourcesOpenManual: 'Open manual',
    resourcesCountLabel: 'documents'
  },
  ja: {
    brandName: 'ArcOS',
    brandTagline: 'IMPIX 製造運用プラットフォーム',
    hybridBadge: 'Hybrid',
    controlPlane: '制御プレーン',
    dataPlane: 'データプレーン',
    controlPlaneDesc: 'ArcOS SaaS（ソウルリージョン）',
    dataPlaneDesc: 'オンプレミス接続中',
    normalStatus: '正常',
    connectedStatus: '接続中',
    securityNoticeTitle: 'ドメインデータのオンプレミス隔離原則:',
    securityNoticeDesc: '製造ラインの生DBおよび社内文書は外部に流出せず、デプロイ用メタデータのみが交換されます。',
    partnerSupport: 'IMPIX 技術サポートパートナーシップ (24/7 SLA)',

    navMarketplace: 'アプリマーケットプレイス',
    navMarketplaceSub: 'モジュールカタログと事前検証',
    navQuote: '見積シミュレータ',
    navQuoteSub: '3層課金モデル＆ボリューム割引',
    navWorkspace: 'マイワークスペース',
    navWorkspaceSub: 'オンプレミスランタイム＆バージョン',
    navArchitecture: 'ハイブリッド＆標準規約',
    navArchitectureSub: 'AAS・オントロジー・仕様書',
    navPatchNotes: 'パッチノート（無停止）',
    navPatchNotesSub: '24/7 ローリングパッチ＆リリース履歴',
    navItemsCount: '個',
    navActiveCount: '個稼働中',
    navWhitepaperBadge: '仕様書',
    navZeroDowntimeBadge: '無停止原則',

    heroBadge: 'ハイブリッド展開＆モジュール型 Plug & Play マーケットプレイス',
    heroTitle: '必要な製造モジュールを選択して即時デプロイ',
    heroDesc: 'IMPIXの製造ソリューションを統一サブスクリプション上で自由に組み合わせます。工程データと社内文書はオンプレミス内に安全に保護され、コード変更なしでAAS・OPC-UA標準オントロジーに即時連動します。',
    baseFeeLabel: 'プラットフォーム基本料（固定アンカー）',
    baseFeeValue: '月額 300万ウォン',
    baseFeeBullets: [
      '✓ ArcOS 統合制御ポータル＆テナントSSO',
      '✓ モジュール配布オーケストレーション＆無停止ローリングパッチ',
      '✓ ArcTunnel mTLS 暗号化セキュアトンネル'
    ],
    viewCartBtn: '見積を確認する',
    categoryAll: 'すべて',
    searchPlaceholder: 'モジュール名、機能、規制基準を検索...',
    filterByStatus: 'ステータスフィルター',
    quickPresetTitle: '業種別・要件別ワンクリック推奨パッケージ',
    quickPresetDesc: '標準検証済みの構成をワンクリックで反映し、見積を比較できます',
    viewAllPresets: '全7種の推奨パッケージを比較',
    appsCountLabel: '個のモジュール登録中',
    addToCart: '見積に追加',
    inCart: '追加済み（クリックで削除）',
    viewDetails: '詳細スペック',
    installedBadge: '契約中（基本含む）',
    prereqBadge: '前提条件あり',
    onpremBadge: 'オンプレミス専用',
    categoryLabels: {
      '전체': 'すべて',
      'Smart Factory': 'Smart Factory',
      'AI': 'AI',
      'LLM': 'LLM',
      '에너지': 'エネルギー',
      '시각화': '可視化',
      '기반': '基盤',
      '빌더': 'ビルダー'
    },
    statusFilterAll: 'すべてのステータス',
    statusFilterReady: 'インストール可能',
    statusFilterNeed: '前提条件あり',
    statusFilterOnprem: 'オンプレミス専用',
    statusFilterSub: '契約中',
    statusBadgeSub: '契約中（基本含む）',
    statusBadgeReady: 'インストール可能',
    statusBadgeNeed: '前提条件あり',
    statusBadgeOnprem: 'オンプレミス専用 sLM',
    pocBadgeActive: 'PoC 稼働中',
    pocBtn14Days: '14日間 PoC',
    pocBtnTitle: '14日間オンプレミス隔離サンドボックスで無償技術検証',
    duplicateReviewBadge: '重複確認推奨',
    suiteBadgeText: 'スイート',

    arcMindNoticeTitle: 'ArcMindのご案内：社内IT人材保有企業向けビルダー',
    arcMindNoticeDesc: 'ArcMindは社内ITエンジニアがSmart FactoryプラットフォームをNo-Code / Low-Codeで自社構築するためのビルダーです。既製品のMESスイートとの重複導入を避けることを推奨します。',
    arcMindDuplicateWarning: '⚠️ [重複導入確認] 既製品の製造運用スイート（MES）とArcMind（社内IT向けノーコードビルダー）が両方選択されています。ArcMindは社内ITがMES自体を開発するためのツールの為、重複投資となる可能性があります。',
    arcMindConflictResolveKeepSuite: '既製MESスイートを維持（ArcMindを除外）',
    arcMindConflictResolveKeepArcMind: '社内IT自社構築型を選択（MESを除外、ArcMind維持）',

    quoteTitle: 'ArcOS 月額サブスクリプション見積シミュレータ',
    quoteSubtitle: 'モジュール単価は固定で、モジュール数量でのみボリューム割引が適用されます。製造ライン数に応じてMES料金がリアルタイムに再計算されます。',
    officialQuotePrint: '公式見積書印刷 / PDF保存',
    batchDeployBtn: '選択モジュールの一括デプロイ申請',
    presetsHeading: '業種別・要件別推奨パッケージ',
    presetsSubheading: '現場で実証済みの標準構成をワンクリックでカートおよびライン数に反映します。',
    tabIndustry: '業種別パッケージ',
    tabRequirement: '要件・導入段階別',
    layer1Title: '第1層: プラットフォーム基本料 (Anchor)',
    layer1Desc: 'ArcOS ポータル + ArcTunnel + ArcOS Tools (必須付与・B²LABは別モジュール)',
    layer2Title: '第2層: 選択したサブスクモジュール',
    layer3Title: '第3層: 自然成長軸シミュレータ (ライン数および呼出量)',
    linesSliderTitle: '生産ライン数 (MESコア課金連動軸)',
    linesSliderDesc: '工場内で稼働中の全製造ライン数に応じてMES単価が乗算されます。',
    aiSliderTitle: 'AI推論呼出回数 (A²LAB MLOps連動軸)',
    aiSliderDesc: '品質予測および異常検知エージェントの月間推論コール数です (10万回標準付与)。',
    quoteSummaryTitle: '見積サマリー',
    monthlyTotal: '最終月額サブスク合計',
    volumeDiscountLabel: 'ボリューム割引',

    patchNotesTitle: '無停止ローリングパッチ＆リリースセンター',
    patchNotesSubtitle: 'ArcOSは24時間365日稼働する工場向けに、ラインを停止させないカナリアローリングパッチとリアルタイムPLCバッファリングを原則として保証します。',
    tabPatchHistory: 'パッチ履歴',
    tabZeroDowntimeArch: '無停止パッチの原則',
    tabPatchSimulator: '無停止パッチシミュレータ',
    zeroDowntimeVerified: '無停止検証完了',
    patchTypeSecurity: 'セキュリティパッチ',
    patchTypeCompliance: '法規制遵守対応',
    patchTypePerformance: 'パフォーマンス最適化',
    patchTypeFeature: '機能拡張',
    simulatorTitle: '事業場無停止ローリングパッチシミュレータ',
    simulatorDesc: '稼働中の生産ラインを一切停止せず、新規コンテナポッドをカナリア展開し、PLCバッファを同期してトラフィックをゼロデータロスで引き継ぐプロセスを検証します。',
    simulateBtn: '無停止ローリングパッチ実行',
    simulatingBtn: '無停止パッチ進行中...',
    rollbackGuarantee: '自動ロールバック保証: ヘルスチェック失敗時は3秒以内に無停止で前バージョンへ自動復元',

    slaDowntimeLabel: '工程ダウンタイム',
    slaDowntimeVal: '0.00秒',
    slaDowntimeDesc: '無停止原則',
    slaSuccessRateLabel: 'パッチ成功率',
    slaSuccessRateVal: '100.0%',
    slaSuccessRateDesc: 'カナリア検証',
    slaDataLossLabel: 'PLCデータ損失',
    slaDataLossVal: '0 件',
    slaDataLossDesc: 'リングバッファ保護',
    slaRollbackLabel: '自動ロールバック',
    slaRollbackVal: '< 3秒',
    slaRollbackDesc: '異常時即時',
    patchSearchPlaceholder: 'バージョン、パッチ名、モジュールを検索...',
    patchFilterCategoryLabel: '分類:',
    patchAllFilter: 'すべて',

    connectedTenantLabel: '接続中テナント',
    runtimePolicyLabel: 'ランタイムサポートポリシー',
    runtimePolicyRule: 'N, N-1 バージョン',
    runtimePolicyDesc: '対応ランタイム: v4.2 / v4.1 (v4.0以下はデプロイ前に更新が必要)',

    // Workspace View
    workspaceTitle: 'マイワークスペース',
    workspaceSubtitle: '事業所内にインストールされたモジュールのランタイムバージョン、14日間のPoC試運転、データレイクバインディング状態、規制資産の[読み取り専用保存]現況を管理します。',
    hybridRuntimeControlBadge: 'ハイブリッドランタイム制御',
    hybridRuntimeControlSub: 'コントロールプレーンからリモート展開・オンプレミス社内実行',
    deployNewModuleBtn: '新規モジュール追加展開',
    activeModulesCardTitle: '正規稼働モジュール',
    activeModulesUnit: '個',
    firewallReceivingStatus: '社内ファイアウォール内で正常受信',
    pocTrialsCardTitle: '14日間PoC評価版',
    freeBadge: '無料',
    pocTestingUnit: '件 テスト中',
    sandboxIsolationLabel: '隔離サンドボックス実証',
    arcTunnelLinkTitle: 'ArcTunnel セキュアリンク',
    preservedDataCardTitle: '規制データ保存',
    itemsUnit: '件',
    pocActiveSectionTitle: '14日間PoC評価版 試運転状況',
    pocActiveSectionSub: '社内隔離サンドボックス内で14日間、本番DBに影響を与えずに実証データを検証します。',
    pocNoAutoBillingGuarantee: '満了時の自動課金なし (0円保証)',
    pocEmptyTitle: '現在稼働中の14日間PoC評価版はありません',
    pocEmptyDesc: 'アプリマーケットプレイスで希望モジュールの[14日間PoC]ボタンをクリックし、社内オンプレミスの隔離サンドボックスへ即座に展開してください。',
    pocExploreCatalogBtn: 'マーケットプレイスでPoCモジュールを探す',
    pocRemainingDaysBadge: '残り D-{days}',
    pocDaysRemainingPrefix: '残り ',
    pocDaysRemainingSuffix: '日',
    pocStartedDateLabel: '開始日:',
    pocExpiresDateLabel: '満了予定:',
    pocGoalLabel: '実証目標:',
    pocDeptLeadLabel: '申請部署 / 担当:',
    pocMetricsLabel: 'リアルタイム実証指標',
    pocSuitabilityScore: '適合度スコア',
    pocIngestedTags: '収集タグ数',
    pocViewReportBtn: '14日間評価レポート照会',
    pocConvertSubBtn: '正式サブスクリプションへ移行',
    pocTerminateSandboxBtn: 'サンドボックス安全終了',
    installedModulesTableTitle: 'オンプレミスノード別展開モジュールランタイム',
    installedModulesTableSub: '無停止ローリングパッチ原則に基づき、前安定バージョン(N-1)と最新バージョン(N)が共存可能です。',
    runtimePolicyRuleBadge: 'N, N-1 バージョン対応',
    colModuleName: 'インストールモジュール名',
    colNodeLocation: '展開ノード（事業所）',
    colRuntime: 'ランタイム',
    colDatalakeBinding: 'B²LAB オントロジーバインディング',
    colLocalResource: 'オンプレミス占有リソース',
    colAction: '管理',
    datalakeNormalStatus: 'オントロジー正常同期',
    latestRuntimeBadge: '最新バージョン',
    patchUpgradeBtn: '無停止パッチ更新',
    patchingBtn: 'パッチ進行中...',
    decomTableTitle: '解約モジュールおよび法的義務データ保存（規制遵守）',
    decomTableSub: '製薬(FDA 21 CFR Part 11)、防衛、自動車規制に従い、サブスクリプションが終了したモジュールのデータは暗号化され、法定期限までオンプレミスで読み取り専用として安全に保存されます。',
    cfrPart11Badge: 'CFR Part 11 遵守',
    colDecomModule: '解約モジュール名',
    colRetainedData: '保存データ範囲',
    colRetentionExpiry: '法的義務保存満了日',
    colMonthlyFee: '保存料',
    colAuditLogDownload: '監査ダンプ',
    readOnlyPreservedBadge: '読み取り専用保存中',
    downloadAuditDumpBtn: '監査証跡(Audit Trail)ダンプダウンロード',
    decomLegalNotice: '法的保存案内: 上記データは製造本番DBと物理分離された暗号化ボリュームに保管され、法定義務期間（通常5〜10年）満了時に社内情報セキュリティ委員会の承認を経て安全に消去されます。',

    // Catalog Cards
    cardScalingMetric: '成長連動指標:',
    cardReadinessSummary: '事前検証サマリー',
    cardConditionsUnmet: '前提条件 {count}件 未充足',
    cardConditionsReady: '条件充足',
    cardSchemaMapping: '標準スキーママッピング: ',
    cardComplete: '完了',
    cardBilling: '課金方式',
    cardInspectSuite: 'モジュール構成',
    cardSelectModules: '構成を選択',
    cardPerModulePricing: 'モジュール別課金',
    cardIncludedInBase: '基本料に含まれる',
    arcMindCardBadge: '社内IT人材専用ノーコードビルダー',
    arcMindCardDesc: '既製MESを導入せず、社内開発チームが自社スマート工場UIとロジックを直接作成（既成MESとの重複導入防止を推奨）。',

    // Quote View Simulator & Presets
    threeTierBillingBadge: '3層透明課金モデル',
    threeTierBillingSub: '基本料固定 · モジュール数ボリューム割引 · 使用量（ライン/呼出）自然成長',
    quoteSimulatorTitle: 'ArcOS 月額サブスクリプション見積シミュレータ',
    quoteSimulatorSub: '単価は固定され、モジュール数ティアでのみボリューム割引が適用されます。ライン数スライダーに応じてMES料金がリアルタイムに再計算されます。',
    appliedStatusBadge: '適用中',
    recommendedTargetLabel: '推奨対象:',
    linesStandard: 'ライン基準',
    estimatedMonthlyTotal: '予想月額合計:',
    tenThousandWon: '万ウォン',
    monthUnit: '月',
    applyPresetBtn: 'この構成で見積を適用',
    tier1Title: '第1層: プラットフォーム基本料（固定アンカー）',
    monthPrefix: '月額',
    mandatoryPlatformInclude: 'テナント分離SaaS制御ポータル + ArcTunnelセキュアリンク（必須付与）',
    tier1Composition: 'ArcOSポータル + ArcTunnel + ArcOS Tools',
    tier1CompositionDesc: 'テナントSSO、ArcTunnel mTLS暗号化接続、モジュールカタログ・配布オーケストレーション・無停止ローリングパッチを提供します。ドメインデータのオントロジー層 (B²LAB) と保存容量は別モジュールとして課金されます。',
    vatNotice: '税抜',
    platformBaseFeeLabel: 'プラットフォーム基本料',
    selectedModulesSubtotal: '選択モジュール小計',
    itemsCountUnit: '個',
    discount6Rule: '6個以上のモジュール一括導入: 10%ボリューム割引適用',
    discount4Rule: '4個以上のモジュール一括導入: 5%ボリューム割引適用',
    discountDefaultRule: '4個以上選択で5%、6個以上で10%のボリューム割引が適用されます。',
    finalTotalMonthly: '最終月額サブスクリプション合計',
    quoteDisclaimers: '* 単価は固定され、モジュール数でのみ透明に割引されます。生データはオンプレミスに保護されます。',
    requestNodeDeploy: '選択モジュールの一括ノード展開申請',

    // Quotation Print Modal
    quotationTitle: 'ArcOS 製造プラットフォーム サービス利用見積書',
    quotationNo: '発行番号',
    officialSubmissionLabel: '公式提出用',
    customerTenant: '顧客テナント:',
    targetFacility: '対象事業所:',
    deploymentModelLabel: '展開モデル:',
    hybridModelDesc: 'ハイブリッド（SaaS制御 + オンプレミスデータプレーン）',
    itemCol: '項目',
    quantityCriterionCol: '数量 / 基準',
    monthlyPriceCol: '月額定価',
    basePlatformRowDesc: 'プラットフォーム基本料 (ArcOS制御ポータル + ArcTunnel)',
    basePlatformRowQty: 'テナント固定',
    linesCountUnit: 'ライン',
    volumeDiscountRowTitle: 'ボリューム割引 ({count}個モジュール一括導入)',
    discountAppliedRate: '-{rate}% 適用',
    printSavePdfBtn: '印刷 / PDF保存',
    closeBtn: '閉じる',

    // AppDetailModal
    suiteCombinationsTitle: '(24通りの組み合わせ対応 モジュール型スイート)',
    moduleOverviewPrinciples: 'モジュール概要＆ハイブリッド運用原則',
    suiteSelectorTitle: 'スイート構成モジュール選択 (3 × 2³ = 24通りの自由構成)',
    suiteSelectedCount: '選択モジュール',
    singleRequiredChoice: '単一必須選択',
    multipleChoice: '複数選択可能',
    standardMapping: '標準マッピング',
    preInstallGatesTitle: '設置直前4大項目自動検証 (Pre-installation Gates)',
    preInstallGatesSub: '現場展開の失敗を未然に防ぐため、インフラとマッピング状態を事前検証します。',
    allGatesPassed: '自動検証パス',
    gatesBlockedCount: '検証項目 {count}件 要確認',
    gate1Title: '前提モジュール (Dependencies)',
    gate1DepsCount: '{count}件の依存関係',
    gate1NoDeps: '前提モジュールなし (単独稼働可能)',
    recommendedWithCart: '同時導入推奨',
    gate2Title: 'データ接続＆標準オントロジーマッピング',
    gate2AppliedStd: '適用標準:',
    gate3Title: '展開先事業所＆ArcTunnel状態',
    gate3NodeSelect: '設置対象事業所ノード選択:',
    gate3TunnelLink: 'ArcTunnel mTLS 暗号化リンク',
    gate3Latency: 'レイテンシ: 4ms',
    gate3RuntimeTunnelOk: 'ランタイム {runtime} · トンネル正常',
    gate4Title: 'データ権限および制御コマンド承認',
    gate4SecurityApproved: 'セキュリティ審査完了',
    gate4WriteControl: 'Write制御',
    gate4Granted: '承認済み',
    gate4Blocked: '遮断済み',
    suiteModulesSelected: 'Smart Factory モジュール {count}個 選択済み',
    billingUnitLabel: '課金単位',
    deployRequestToLocation: '{location}へのリモート展開を申請',
    removeFromQuote: '見積から除外',
    addToQuote: '見積書に追加',
    pocBtnText: '14日間無料PoCを申請',

    // PoCApplyModal
    pocModalBadge: '14日間無料PoC評価版',
    pocZeroCostNotice: '費用0円 · 自動課金移行なし',
    pocModalHeaderDesc: '社内オンプレミスノードに完全隔離されたRead-Onlyサンドボックスとして展開され、製造設備停止や生DBへの影響なく14日間安全に性能を実証します。',
    pocDeployingTitle: 'オンプレミスへ14日間PoCサンドボックスを展開中...',
    pocDeployingSub: '暗号化されたArcTunnel mTLSリンク経由でOCI隔離コンテナを安全に配信しています。',
    pocDeployStep1: '1. [制御プレーン] ArcTunnel mTLS暗号化セッション確立',
    pocDeployStep2: '2. [オンプレミス] OCI隔離サンドボックスコンテナプロビジョニング (v4.2-sandbox)',
    pocDeployStep3: '3. [オントロジー] B²LAB読み取り専用ミラーリングバインディング＆14日タイマー起動',
    pocSuccessBadge: '展開完了 · 14日間PoC稼働開始 (D-14)',
    pocSuccessTitle: '14日間評価版が正常に配備されました！',
    pocSuccessDesc: 'オンプレミスサンドボックス内でリアルタイム稼働を開始しました。社内本番DBへの書き込み干渉なく安全に実証データを収集します。',
    pocDeployLocation: '展開先ノード:',
    pocValidationGoal: '検証目標:',
    pocDataIsolationMode: 'データ隔離モード:',
    pocValidityPeriod: '有効期間:',
    pocFreePeriodText: '14日間無料（満了時の自動課金なし）',
    pocContinueMarketplace: 'マーケットプレイスを引き続き見る',
    pocGoToWorkspace: 'マイワークスペースでPoC状況を確認',
    pocZeroCardNoticeTitle: '100%無料保証（クレジットカード不要 / 現場無干渉）',
    pocZeroCardNoticeDesc: '評価版申請時に決済情報は不要であり、14日満了時に自動課金されることはありません。エンジニアの技術適合性検証のため100%無償提供されます。',
    pocStep1FacilityLabel: '1. 設置対象事業所およびオンプレミスノード選択',
    pocStep1FacilitySub: '選択した事業所のArcTunnelゲートウェイ経由でOCIサンドボックスイメージがオンプレミスへ配信されます。',
    pocStep2GoalLabel: '2. PoC実証・技術検証目標',
    pocStep2Customizable: '自由編集可能',
    pocStep2GoalPlaceholder: '例: 第3ライン微細傷AIリアルタイム検出率98%以上実証および誤検知低減',
    pocStep3DeptLabel: '3. 申請部署および担当エンジニア',
    pocStep3DeptPlaceholder: '例: 製造技術課 / 田中主任研究員',
    pocStep4IsolationLabel: '4. ドメインデータ隔離モード（セキュリティ＆無干渉原則）',
    pocMirrorTitle: '社内Read-Onlyミラーリング（推奨）',
    pocMirrorDesc: '実設備のPLCタグを読み取り専用で受信し、本番DBへの書き込みは物理的に遮断され既存生産に一切干渉しません。',
    pocSyntheticTitle: 'IMPIX 標準合成シミュレーションデータ',
    pocSyntheticDesc: '実機接続前に産業標準シミュレーションデータセットを注入し、アルゴリズムとUI画面を先行レビューします。',
    pocPolicyTitle: 'PoC運用および技術サポートポリシー:',
    pocPolicyItem1: '14日間オンプレミスリソース（RAM約4GB）を占有し、いつでも即時削除可能',
    pocPolicyItem2: 'IMPIX専任ドメインエンジニアによるリモート技術オンボーディング1回＆問い合わせ対応',
    pocPolicyItem3: '14日満了時、一時データは完全破棄するか、ワンクリックで正式稼働へシームレス昇格可能',
    pocFooterPeriod: '実証期間: 本日より14日間 (D-14)',
    pocCancelBtn: 'キャンセル',
    pocStartDeployBtn: '14日間無料PoCサンドボックス展開開始',

    // DeployModal
    deployOrchestratorTitle: 'ハイブリッドリモート展開オーケストレーター',
    deployStep1Title: '制御プレーンパッケージング',
    deployStep1Desc: 'SaaSマニフェスト署名',
    deployStep2Title: 'ArcTunnel転送',
    deployStep2Desc: 'mTLS暗号化パイプ',
    deployStep3Title: 'オントロジーバインディング',
    deployStep3Desc: 'B²LABタグ自動マッピング',
    deployStep4Title: 'オンプレミス起動',
    deployStep4Desc: 'コンテナヘルスチェック',
    deployingProgress: '展開進行中...',
    deploySuccess: '展開完了',
    viewInWorkspace: 'ワークスペースで確認',
    runInBackground: 'バックグラウンドで続行',
    dataPlaneSecureGuarantee: 'データプレーン保護: 元データはオンプレミスの境界外へ移動していません。',

    // PoCReportModal
    reportSubTitle: '14日間技術検証および適合性評価書',
    reportRunningStatus: '実証進行中 ({days}日目 / 残り D-{remaining})',
    reportFacilityNode: '実証事業所およびノード',
    reportApplicantDept: '申請部署 / 担当者',
    reportPeriod: '実証期間',
    reportFourteenDays: '14日間',
    reportCoreGoal: '検証核心目標',
    reportRealtimeMetricsTitle: 'リアルタイム検証成果指標 (Real-time PoC Metrics)',
    reportScoreLabel: '技術適合度スコア',
    reportScoreSub: '合格基準(90%)を超過達成',
    reportTagsLabel: 'オントロジー収集タグ数',
    reportTagsSub: 'AAS/OPC-UA正常同期中',
    reportInterferenceLabel: '工程干渉＆ダウンタイム',
    reportInterferenceSub: 'Read-Only隔離による無干渉',
    reportDropLabel: 'パケットロス / 通信エラー',
    reportDropSub: 'ArcTunnel mTLS無損失',
    reportItemResultsTitle: '検証項目別判定結果',
    reportItem1Title: '1. 本番DB隔離およびRead-Only無干渉性',
    reportItem1Desc: '既存の生産PLCおよび設備DBに対する書き込み(Write)呼び出しが100%遮断されていることを確認。',
    reportItem2Title: '2. B²LABオントロジーストリーム標準マッピング適合度',
    reportItem2Desc: 'AASサブモデルおよびKS X 9101設備タグ48個が5ms以下の遅延でリアルタイムパース完了。',
    reportItem3Title: '3. 現場エンジニア実証シナリオ適合度',
    reportItem3Desc: '申請部署の検証目標に基づくリアルタイム指標分析を完了。',
    reportPassLabel: '適合 (Pass)',
    reportRoiTitle: '正式導入時の期待効果および商用移行案内',
    reportRoiDesc: '本モジュールを正式サブスクリプションへ移行する場合、14日間のサンドボックスで構築されたAASオントロジータグ設定と学習済みモデルは初期化されず100%永久保持され、再設置やライン停止なしに即座に本番運用へ昇格します。',
    reportPrintPdf: 'レポート印刷 / PDF保存',
    reportConvertToSub: '正式サブスクリプションへ移行',

    // Architecture (Whitepaper)
    archBadge: 'IMPIX ArcOS ホワイトペーパー',
    archBadgeSub: 'ハイブリッドアーキテクチャ · Plug & Play 標準規約 · 3層課金モデル · 無停止パッチ',
    archTitle: 'ArcOS プラットフォームマーケットプレイス企画 & アーキテクチャ仕様',
    archDesc: '工程データの社内隔離原則、24種のSmart Factory組合せ構造、AIエージェントマニフェスト規約など、中核となる設計原則をインタラクティブに確認できます。',
    archTab1: '1. ハイブリッド展開モデル',
    archTab2: '2. Smart Factory & AI 2-SKU',
    archTab3: '3. Plug & Play 規約',
    archTab4: '4. 3層課金 & 成長軸',
    archTab5: '5. 運用ポリシー & 読み取り専用保存',
    archBoundaryNote: '製薬・食品顧客のセキュリティ審査における必須通過基準',
    archControlPlaneTitle: 'コントロールプレーン (Control Plane - SaaS)',
    archControlPlaneDesc: 'SaaS上でテナント、加入、課金、カタログおよび展開オーケストレーションを統括します。',
    archControlPlaneItem1: 'ArcOS ポータル (テナントSSO、ユーザー権限)',
    archControlPlaneItem2: 'アプリカタログおよび4大条件の事前点検',
    archControlPlaneItem3: 'メタ・モデルレジストリ (コンテナイメージ、マニフェスト)',
    archControlPlaneWarning: '⚠️ ドメインデータの原本はSaaSに一切保存されません',
    archTunnelEncryption: 'mTLS 暗号化',
    archDataPlaneTitle: 'データプレーン (Data Plane - オンプレミス)',
    archDataPlaneDesc: '地域ごとのオンプレミス事業所ノードのファイアウォール内部でデータ原本とsLMモデルを保護します。',
    archDataPlaneItem1: 'B²LAB データレイク (AAS/OPC-UA オントロジー標準)',
    archDataPlaneItem2: 'ドメインDB原本 (MES、ERP、設備PLC、社内文書)',
    archDataPlaneItem3: '学習・推論ランタイム (社内GPUノードでのsLM推論)',
    archDataPlaneGuarantee: '🔒 工程データ・社内文書の原本の外部流出を根本から遮断',
    archDownstreamTitle: '↓ SaaSからオンプレミスへ配信されるもの:',
    archDownstreamDesc: 'アプリコンテナイメージ、環境設定マニフェスト、AIモデルパラメータ定義、展開コマンド',
    archUpstreamTitle: '↑ オンプレミスからSaaSへ送信されるもの:',
    archUpstreamDesc: '実行状態ハートビート、稼働率パフォーマンスメトリクス、セキュリティ監査ログ、課金精算用の使用量カウンター',
    archSuiteSec1Title: '1. Smart Factory 24通りの組合せの構造的根拠',
    archSuiteSec1Desc: 'MES3種(製薬特化、食品・化粧品特化、一般製造)は工程規制とバリデーション要件が異なるため**相互排他的(1つのみ選択)**です。一方、品質・記録・サプライチェーンを担うEBRS、REMS、SCMは**自由組合せ**です。',
    archSuiteFormula: '実質組合せ数 = MES (3種中1つ) × 拡張モジュール (2³ = 8通り) = **合計24通り**',
    archSuiteSec1Note: '業種別の固定バンドルパッケージだけではこの24通りの顧客需要をすべて満たせないため、**モジュール個別課金**を採用する構造的根拠となります。',
    archSuiteSec2Title: '2. AI階層の2SKU分離 (A²LAB vs スーパーバイザー)',
    archSuiteA2labTitle: 'A²LAB (エージェントモジュール生成器)',
    archSuiteA2labDesc: '品質予測、設備予知、規程レビューなどのドメインエージェントモジュールを制作・学習させる**工場**の役割です。',
    archSuiteOrchTitle: 'マルチAI Agent スーパーバイザー (オーケストレーション)',
    archSuiteOrchDesc: '生成された個々のエージェントの判断を相互検証し、衝突を調停する**指揮ランタイム**です。',
    archSuiteSec2Note: 'エージェントが1〜2個のうちはオーケストレーションが不要なため、初期はA²LABの上位ティアに含め、社内エージェントが3個以上稼働する大規模顧客から別SKUとして分離販売する経路を提供します。',
    archSuiteSec3Title: '3. ArcMind (ノーコードビルダー) と既製スマートファクトリースイートの明確な役割区分',
    archSuiteSec3Desc: '**ArcMind**は、社内にIT/ソフトウェア専任要員を抱える企業が既製MES製品に縛られず、自らNo-Code/Low-Codeコンポーネントをドラッグ&ドロップして工場別カスタムSmart Factoryプラットフォームを直接構築できる専門ビルダーです。',
    archSuiteSec3Warning: '**💡 重複購入防止ポリシー:** 既製MESスイートを導入する場合、工程・バッチ・設備の画面はほぼ完成した状態で供給されるため、ArcMindとの重複構成を防ぐべく、マーケットプレイスと見積シミュレーターで相互排他的なレビューと分離ガイドを提供します。',
    archPnpTitle: '新規モジュール追加時に既存コードの修正が不要な4大 Plug & Play 規約',
    archPnpItem1Title: '① パッケージング規約 (Container + Manifest)',
    archPnpItem1Desc: 'すべてのアプリはOCI標準コンテナイメージとJSONマニフェストで登録されます。マニフェストに要求データスキーマ、公開API、依存アプリを宣言します。',
    archPnpItem2Title: '② データ規約 (AAS、OPC-UA、KS X 9101)',
    archPnpItem2Desc: 'アプリはレガシーDBを直接参照せず、B²LABオントロジー層のみを照会します。顧客ごとに異なるDB構造をアプリが知る必要はありません。',
    archPnpItem3Title: '③ 認証・権限規約 (ArcOS Tenant SSO)',
    archPnpItem3Desc: 'テナント単位の統合SSOをArcOSが独占的に保有し、アプリ別権限マトリクスはArcMindコンポーネントレベルまで一貫して制御されます。',
    archPnpItem4Title: '④ イベント規約 (共通 Pub/Sub Event Bus)',
    archPnpItem4Desc: 'アプリ間通信は直接結合せずイベントバスを経由します。設備アラームイベントにコンセンスボットが購読する形で相互連係します。',
    archPnpManifestTitle: 'A²LAB生成エージェントのマニフェスト例 (JSON Spec):',
    archPnpManifestTarget: '押出工程の厚み不良の事前予測',
    archPricingTitle: '3層課金モデル & モジュール別の自然成長軸',
    archPricingDesc: '単価は固定し、割引はボリューム区間でのみ提供します。顧客が最小構成で開始しても、事業成長に応じて請求額が自然に連動する構造です。',
    archPricingColModule: 'モジュール',
    archPricingColGrowth: '自然成長軸',
    archPricingColBasis: '課金基準',
    archPricingColMechanism: '成長メカニズム',
    archPricingRows: [
      { module: 'プラットフォーム基本料', growth: 'テナント固定', basis: '月300万ウォン', mechanism: '固定アンカーとして基本的な参入基盤を確保' },
      { module: 'B²LAB オントロジー', growth: 'データ保存容量区間', basis: '月80万ウォン (1TB込み)', mechanism: '収集タグ・履歴の蓄積に比例' },
      { module: 'MES 3種', growth: '生産ライン数', basis: 'ライン当たり40〜80万ウォン', mechanism: '工場増設時にライン追加サブスクリプション' },
      { module: 'EBRS', growth: 'バッチ記録件数', basis: '月120万ウォン (基本バッチ)', mechanism: '生産量増加に伴う従量超過' },
      { module: 'REMS / A.ESG', growth: 'センサー計測点数', basis: '月90〜130万ウォン', mechanism: '計測センサー設置区域の拡大' },
      { module: 'A²LAB', growth: '推論コール数', basis: '月150万ウォン + コール従量', mechanism: 'AIモジュールの常時稼働量に比例' },
      { module: 'コンセンスボット', growth: 'ユーザー数', basis: '月180万ウォン (同時20ユーザー)', mechanism: 'QA/QC/生産管理人員の拡大' }
    ],
    archPolicyTitle: '運用ポリシー: 規制データ [読み取り専用保存] & ランタイムサポート方針',
    archPolicy1Title: '1. 第3の状態: [読み取り専用保存] 状態',
    archPolicy1Desc: 'EBRSや品質モジュールを解約した場合でも、既に生成された電子製造記録は製薬・食品規制上5〜10年間の法的保存義務があります。したがって単純な「稼働」と「解約」のほかに、低廉な維持費用でデータ完全性を保存する**[読み取り専用保存] 状態**と保存料金を運用します。',
    archPolicy2Title: '2. N, N-1 バージョン二重サポート原則',
    archPolicy2Desc: '顧客のオンプレミスランタイムの更新時期はそれぞれ異なるため、SaaSコントロールプレーンは**現行バージョン(v4.2)と直前バージョン(v4.1)の2バージョン**のみを同時サポートします。この原則がなければ2〜3年後には下位互換維持コストで製品が破綻します。',
    archPolicy3Title: '3. 24/7 無停止ローリングパッチ原則',
    archPolicy3Desc: '24時間稼働する製造ラインの特性上、保守のためのダウンタイムは許容されません。Blue/Greenおよびオンプレミスノードのローリングアップデートで**無停止ホットフィックス**を適用し、プラットフォーム内の「無停止パッチノート」メニューで変更履歴とロールバック保証状態を即座に追跡できます。',

    archPolicy4Title: '4. モジュール別の最低契約期間',
    archPolicy4Desc: 'モジュールごとに導入負担と解約リスクが異なるため、契約単位を分けます。**MESコア3種は年単位**、**EBRS・REMS・SCMなど規制ドメイン拡張モジュールは四半期単位**とし、**A²LAB・オーケストレーション・コンセンスボットなどのAIモジュールは月単位の解約を認めつつ、月 {floor} の最低請求額**を設定します。異なる契約が一つの見積に混在する場合、最も長い契約が購読全体を拘束します。',

    commitmentTermAnnual: '年間契約 (12ヶ月)',
    commitmentTermQuarterly: '四半期契約 (3ヶ月)',
    commitmentTermMonthly: '月契約 (使用量の最低請求)',
    commitmentSummaryLabel: '最低契約期間',
    commitmentSummaryNote: '見積に含まれるモジュールのうち、最も長い契約が購読全体に適用されます。',
    commitmentUsageFloorNote: '月単位モジュールはいつでも解約できますが、月 {floor} の最低請求額が適用されます。',
    commitmentQuotationRow: '最低契約期間',

    landingBadge: '推奨スタートモジュール',
    landingBadgeWith: '推奨スタートモジュール: {module}',
    landingCatalogNote: '初めて導入される場合は、コンセンスボットと一般製造MESから始めることをおすすめします。この2つは既存システムを置き換えずに最も早く効果を確認できる入口です。',

    ariaSelectFacility: '事業所選択 (地域 + 業種)',
    ariaSelectDeployNode: '展開対象の事業所ノード選択',

    // Currency
    currencyLabel: '通貨',
    ariaSelectCurrency: '表示通貨の選択',

    // Quote scenarios
    scenarioSectionTitle: '見積案の保存 & 比較',
    scenarioSectionSub: '構成の異なる見積を保存し、月額サブスクリプションを並べて比較します。',
    scenarioSaveBtn: '現在の見積を保存',
    scenarioCompareBtn: '見積案を比較',
    scenarioNamePlaceholder: '見積案の名称 (例: A案 · 最小構成)',
    scenarioSaveConfirm: '保存',
    scenarioCancel: 'キャンセル',
    scenarioEmptyHint: '保存済みの見積案はまだありません。モジュールを構成して保存すると、他の案と比較できます。',
    scenarioLimitReached: '見積案は最大{max}件まで保存できます。既存の案を削除してから保存してください。',
    scenarioLoadBtn: '読み込み',
    scenarioDeleteBtn: '削除',
    scenarioNeedTwo: '比較するには見積案を2件以上保存してください。',
    scenarioDefaultName: '見積案 {label}',
    scenarioSavedAtLabel: '保存',
    scenarioCompareTitle: '見積案の比較',
    scenarioCompareSub: '同一の課金基準で再計算した月額サブスクリプションです。',
    scenarioColItem: '項目',
    scenarioRowBaseFee: 'プラットフォーム基本料',
    scenarioRowSubtotal: 'モジュール小計',
    scenarioRowDiscount: 'ボリューム割引',
    scenarioRowTotal: '月額サブスクリプション合計',
    scenarioRowLines: '生産ライン数',
    scenarioRowModules: 'モジュール数',
    scenarioNotIncluded: '未含有',
    scenarioLowestBadge: '最安',
    scenarioDiffVsLowest: '最安との差',
    scenarioLoadedToast: '見積案 [{name}] を読み込みました。',
    scenarioSavedToast: '見積案 [{name}] を保存しました。',

    // PoC follow-up
    pocStageTitle: '進行ステージ',
    pocStageApplied: '申請受付',
    pocStageProvisioned: 'サンドボックス展開',
    pocStageCollecting: 'データ収集・検証',
    pocStageReview: '中間評価レポート',
    pocStageDecision: '移行判断',
    pocEndingSoonTitle: '評価終了が間近です',
    pocEndingSoonDesc: '{days}日後にサンドボックスと一時データが自動破棄されます。正式移行するか、評価期間を延長してください。',
    pocExtendBtn: '評価期間の7日延長を申請',
    pocExtendedBadge: '7日延長済み',
    pocExtendUnavailable: '延長は1回のみ可能です',
    pocExtendToast: '[{name}] の評価期間を7日延長しました。サンドボックスはそのまま維持されます。',
    pocContactBtn: '担当エンジニアの手配を依頼',
    pocContactRequestedBadge: 'エンジニア手配を依頼済み',
    pocContactToast: '[{name}] の担当エンジニア手配を依頼しました。営業日ベースで1日以内にご連絡します。',
    pocNextStepsTitle: '次のステップ',
    pocNextStep1: '現場の工程責任者と評価指標の結果をレビューします。',
    pocNextStep2: '正式移行時は、サンドボックスのオントロジーマッピングとチューニング済みモデルがそのまま引き継がれます。',
    pocNextStep3: '追加検証が必要な場合、評価期間を1回だけ延長できます。',

    tier2Title: '第2層: 選択したサブスクモジュール',
    tier3Title: '第3層: 自然成長軸シミュレータ',
    clearCartBtn: 'すべて削除',
    cartEmptyTitle: '選択されたモジュールがありません。',
    browseModules: 'アプリマーケットプレイスでモジュールを見る',
    callsUnit: '件/月',
    pointsCountUnit: '点',
    partnersCountUnit: '社',
    growthAxisLinesTitle: '生産ライン数 (MESコア連動成長軸)',
    growthAxisLinesDesc: '工場内で稼働中の全製造ライン数に比例してMESコアの単価が計算されます。',
    growthAxisPointsTitle: '計測点数 (REMS連動成長軸)',
    growthAxisPointsDesc: 'クリーンルームに設置された差圧・温湿度・微粒子センサーの総計測点数です。基本200点が含まれ、100点追加ごとに基本料の15%が加算されます。',
    growthAxisPartnersTitle: '協力会社数 (SCM連動成長軸)',
    growthAxisPartnersDesc: '協力会社ポータルに接続された1・2次外注先のアカウント数です。基本10社が含まれ、10社追加ごとに基本料の20%が加算されます。',
    growthAxisInferenceTitle: 'AI推論コール量 (A²LAB MLOps 成長軸)',
    growthAxisInferenceDesc: '品質予測・異常検知エージェントの月間推論呼び出し回数です (月10万件基本含む)。',
    meteredBreakdown: '{base} 基準 · {qty}{unit} (×{factor})',
    discountAppliedBadge: '割引適用',
    reportBadge: 'PoC 評価レポート',

    rateStatusLive: 'リアルタイム為替レート適用中',
    rateStatusLoading: '為替レート同期中…',
    rateStatusStale: '為替サーバー応答なし — 最後に取得したレートを使用中',
    rateStatusBundled: '内蔵の既定レートを使用中',
    rateRefreshLabel: '為替レートを更新',

    valueSectionTitle: '導入効果',
    valueOutcomesTitle: '主要指標',
    valueUseCasesTitle: '適用事例',
    valueDocsLinkLabel: '関連資料を見る',

    navResources: '資料室',
    navResourcesSub: 'ホワイトペーパー · マニュアル · 導入ガイド',
    navResourcesBadge: '文書',
    resourcesTitle: '資料室',
    resourcesSubtitle: 'アーキテクチャホワイトペーパー、モジュール別運用マニュアル、導入ガイドを一箇所で探せます。',
    resourcesSearchPlaceholder: '文書名、内容、対象モジュールを検索...',
    resourcesKindAll: 'すべて',
    resourcesKindWhitepaper: 'ホワイトペーパー',
    resourcesKindManual: '運用マニュアル',
    resourcesKindGuide: '導入ガイド',
    resourcesKindSpec: '連係規格',
    resourcesAudienceLabel: '対象読者',
    resourcesUpdatedLabel: '最終改訂',
    resourcesReadingTime: '約{min}分',
    resourcesRelatedModules: '関連モジュール',
    resourcesEmpty: '条件に一致する文書がありません。',
    resourcesResetFilters: '検索条件をリセット',
    resourcesBackToList: '一覧へ戻る',
    resourcesOpenManual: 'マニュアルを見る',
    resourcesCountLabel: '件の文書'
  }
};
