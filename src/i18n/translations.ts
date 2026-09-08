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

/**
 * UI strings for the languages that have been loaded.
 *
 * Every language used to be in this module, so all three shipped in the
 * initial bundle and a visitor downloaded two they could not read. They are
 * now separate chunks, fetched by `loadLanguage` before the language is shown.
 *
 * The type says all three are present because that is what every call site
 * needs — `TRANSLATIONS[lang]` in a render, with no null check. The invariant
 * that makes it true: a language is never displayed before it is loaded.
 * `loadLanguage` is awaited at startup and before any language switch, which
 * are the only two places the active language is set.
 */
export const TRANSLATIONS = {} as Record<Language, Translations>;

export function isTranslationLoaded(lang: Language): boolean {
  return TRANSLATIONS[lang] !== undefined;
}

export function installTranslations(lang: Language, strings: Translations): void {
  TRANSLATIONS[lang] = strings;
}
