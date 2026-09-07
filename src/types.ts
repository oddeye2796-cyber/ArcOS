export type AppStatus = 'sub' | 'ready' | 'need' | 'onprem';

export interface AppDependency {
  name: string;
  ok: boolean;
  desc: string;
  requiredFor?: string;
}

export interface SubModuleItem {
  id: string;
  name: string;
  desc: string;
  price: number; // in 만원 (10,000 KRW)
  per: 'flat' | 'line' | 'batch' | 'point' | 'user';
  unitLabel: string;
  tagMappingPercent?: number;
  requiresArcTunnel?: boolean;
}

export interface ModuleGroup {
  label: string;
  type: 'radio' | 'check';
  items: SubModuleItem[];
}

export interface AppItem {
  id: string;
  name: string;
  category: 'Smart Factory' | 'AI' | 'LLM' | '에너지' | '시각화' | '기반' | '빌더';
  categoryLabel: string;
  status: AppStatus;
  statusLabel: string;
  desc: string;
  detail: string;
  unit: string;
  growthMetric: string; // e.g., "생산 라인 수", "배치 기록 건수", "계측점 수"
  growthUnit: string;
  price?: number;
  per?: 'flat' | 'line' | 'batch' | 'point' | 'user';
  suite?: boolean;
  groups?: ModuleGroup[];
  deps: AppDependency[];
  dataScope: {
    domainDb: string;
    schemaStd: string; // AAS, OPC-UA, KS X 9101
    outboundAllowed: boolean;
    mappingProgress: number; // percentage
  };
  deploymentLocations: {
    location: string;
    tunnelStatus: 'connected' | 'warning' | 'disconnected';
    runtimeVersion: string;
  }[];
  permissions: {
    scope: string;
    isWriteCmd: boolean;
    granted: boolean;
  }[];
}

export interface CartItem {
  id: string;
  appId: string;
  name: string;
  category: string;
  price: number;
  per: 'flat' | 'line' | 'batch' | 'point' | 'user';
  unitLabel: string;
}

export interface WorkspaceInstalledModule {
  id: string;
  name: string;
  category: string;
  location: string;
  runtimeVersion: string;
  status: 'active' | 'update_required' | 'deploying';
  lastPing: string;
  dataLakeBinding: string;
  localResource: string;
}

export interface DecommissionedModule {
  id: string;
  name: string;
  retainedData: string;
  retentionExpiry: string;
  retentionFee: number;
  status: 'read_only_retained';
  reason: string;
}

export interface PoCTrial {
  id: string;
  appId: string;
  name: string;
  category: string;
  startedAt: string;
  expiresAt: string;
  daysRemaining: number;
  location: string;
  pocGoal: string;
  leadDepartment: string;
  status: 'active' | 'evaluating' | 'converted' | 'expired';
  dataIsolationMode: 'sandbox_mirror' | 'synthetic_sample';
  healthScore: number; // in percentage e.g. 97
  tagsProcessed: number;
  runtimeVersion: string;
  sampleLoaded: boolean;
  /** Number of times the trial period has been extended (see POC_MAX_EXTENSIONS). */
  extensionsUsed?: number;
  /** Set once a support engineer has been requested for this trial. */
  engineerRequested?: boolean;
}

export interface FacilityLocation {
  id: string;
  region: string; // e.g. "경남/사천", "충북/오송"
  industry: string; // e.g. "항공·정밀가공", "제약·바이오 GMP"
  fullName: string; // e.g. "[경남/사천] 항공·정밀가공 사업장"
  subTitle: string;
  runtimeVersion: string;
  tunnelStatus: 'connected' | 'warning' | 'disconnected';
  latencyMs: number;
}

export interface RecommendationPreset {
  id: string;
  title: string;
  subtitle: string;
  type: 'industry' | 'requirement';
  targetAudience: string;
  badge: string;
  desc: string;
  highlights: string[];
  recommendedLines: number;
  recommendedModules: CartItem[];
}

export type NavRoute = 'catalog' | 'quote' | 'workspace' | 'patches' | 'resources';

export interface PatchNoteItem {
  id: string;
  version: string;
  releaseDate: string;
  type: 'security' | 'compliance' | 'performance' | 'feature';
  typeLabel: string;
  title: string;
  summary: string;
  zeroDowntimeVerified: boolean;
  affectedModules: string[];
  targetRuntimes: string[]; // e.g. ["v4.2", "v4.1"]
  details: {
    title: string;
    items: string[];
  }[];
  rollbackSafety: string;
  migrationMechanism: string; // e.g., "Canary Rolling Pod Switchover"
}

