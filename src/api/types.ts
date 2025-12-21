export enum ProjectType {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP',
  GAME = 'GAME',
  UNKNOWN = 'UNKNOWN'
}

export enum TeamExperience {
  JAVA = 'JAVA',
  JAVASCRIPT = 'JAVASCRIPT',
  PYTHON = 'PYTHON',
  DOTNET = 'DOTNET',
  PHP = 'PHP',
  GO = 'GO',
  MIXED = 'MIXED',
  NONE = 'NONE'
}

export enum BudgetLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  ENTERPRISE = 'ENTERPRISE'
}

export enum TimeToMarket {
  FAST = 'FAST',
  NORMAL = 'NORMAL',
  SLOW = 'SLOW'
}

export enum TeamSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

export enum TechnologyCategory {
  BACKEND = 'BACKEND',
  FRONTEND = 'FRONTEND',
  DATABASE = 'DATABASE',
  MOBILE_HYBRID = 'MOBILE_HYBRID',
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  UNKNOWN = 'UNKNOWN',
}

export enum LicenseType {
  OPEN_SOURCE = 'OPEN_SOURCE',
  COMMERCIAL = 'COMMERCIAL',
  FREEMIUM = 'FREEMIUM',
  ENTERPRISE = 'ENTERPRISE'
}

export enum RecommendationStatus {
  PRIMARY = 'PRIMARY',
  ALTERNATIVE = 'ALTERNATIVE',
  NOT_RECOMMENDED = 'NOT_RECOMMENDED'
}

export type Technology = {
  id: number;
  name: string;
  category: TechnologyCategory;
  description?: string;
  complexity?: number;
  scalability?: number;
  communitySize?: number;
  maturity?: number;
  performance?: number;
  license?: LicenseType;
  cloudNative?: boolean;
  microservicesReady?: boolean;
  bestFor?: string;
}

export type TechnologyRecommendation = {
  id: number;
  technology: Technology;
  confidence: number;
  reason: string;
  priority: number;
  status: RecommendationStatus;
}

export type ProjectRequirements = {
  id?: number;
  projectType: ProjectType;
  teamExperience: TeamExperience;
  teamSize: TeamSize;
  budget: BudgetLevel;
  timeToMarket: TimeToMarket;
  needHighLoad: boolean;
  needRealTime: boolean;
  needHighSecurity: boolean;
  teamMembers: number;
  explanationChain?: string;
  createdAt?: string;
  recommendations?: TechnologyRecommendation[];
}

export type RuleExecutionLog = {
  id: number;
  ruleName: string;
  firedRule: string;
  matchedFacts: string;
  result: string;
  fullExplanation: string;
  timestamp: string;
}

export type Session = {
  id: number;
  sessionId: string;
  startedAt: string;
  endedAt: string;
  totalRulesFired: number;
}

export type ExpertSystemResponse = {
  sessionId?: string;
  requirements?: ProjectRequirements;
  recommendations?: TechnologyRecommendation[];
  explanationChain?: string[];
  auditLog?: string[];
  rulesFired?: number;
  error?: string;
  message?: string;
}

export type ProjectFormData = {
  projectType: ProjectType;
  teamExperience: TeamExperience;
  teamSize: TeamSize;
  budget: BudgetLevel;
  timeToMarket: TimeToMarket;
  needHighLoad: boolean;
  needRealTime: boolean;
  needHighSecurity: boolean;
}

export type ApiError = {
  error: string;
  message: string;
  timestamp?: string;
}