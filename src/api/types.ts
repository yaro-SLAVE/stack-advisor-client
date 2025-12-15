// Enums
export enum AppType {
    WEB = 'web',
    ANDROID = 'android',
    IOS = 'ios',
    DESKTOP = 'desktop'
};

export enum TimeToShow {
    FAST = 'fast',
    MEDIUM = 'medium',
    SLOW = 'slow'
};

export enum ProjectType {
    PET = 'pet',
    RESEARCH = 'research',
    COMMERCIAL = 'commercial'
};

export enum TeamSize {
    MICRO = 'micro', 
    SMALL = 'small',
    MEDIUM = 'medium',
    BIG = 'big'
};

export enum Scale {
    COMPLEX = 'complex',
    EASY = 'easy',
    HARD = 'hard'
};

export enum EntryThreshold {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
};

export enum ExecutionModel {
    INTERPRETABLE='interpretable',
    COMPILED='compiled',
    HYBRID='hybrid'
};

export enum Popularity {
    POPULAR='popular',
    ACTUAL='actual',
    OUT_OF_GENERAL_USE='out_of_general_use'
};

export enum Purpose {
    UNIVERSAL = 'universal',
    WEB_BACKEND = 'web_backend',
    WEB_FRONTEND = 'web_frontend',
    MOBILE = 'mobile',
    DESKTOP = 'desktop',
    DATA_SCIENCE = 'data_science',
};

export enum TasksType {
    BACKEND = 'backend',
    FRONTEND = 'frontend',
    MOBILE = 'mobile',
    DESKTOP = 'desktop'
};

export enum StorageType {
  RELATIONAL = 'relational',
  DOCUMENT = 'document',
  KEY_VALUE = 'key-value'
};

export enum StorageLocation {
    LOCAL = 'local',
    REMOTE = 'remote'
};

export enum DataBaseType {
  SQL = 'sql',
  NO_SQL = 'no_sql'
};

export type Language = {
  id: number;
  name: string;
  entry_threshold: EntryThreshold;
  execution_model: ExecutionModel;
  popularity: Popularity;
  purpose: Purpose;
};;

export type Framework = {
  id: number;
  name: string;
  languages: Language[];
  is_reactive: boolean;
  last_updated_at: string;
  is_actual: boolean;
  tasks_type: TasksType;
};

export type DataStorage = {
  id: number;
  name: string;
  storage_type: StorageType;
  storage_location: StorageLocation;
  data_base_type: DataBaseType;
};

export type ProjectRecommendedResponse = {
  language_recommended_list: Language[];
  framework_recommended_list: Framework[];
  data_storage_recommended_list: DataStorage[];
};

export type LanguagesListResponse = Language;

export type FrameworksListResponse = Framework;

export type DataStoragesListResponse = DataStorage;

export type LanguageCreatingRequest = {
  name: string;
  entry_threshold: EntryThreshold;
  execution_model: ExecutionModel;
  popularity: Popularity;
  purpose: Purpose;
}

export type FrameworkCreatingRequest = {
  name: string;
  languages: number[];
  is_reactive: boolean;
  last_updated_at: string;
  is_actual?: boolean;
  tasks_type: TasksType;
}

export type DataStorageCreatingRequest = {
  name: string;
  storage_type: StorageType;
  storage_location: StorageLocation;
  data_base_type: DataBaseType;
}

export type LanguageRequirementsRequest = {
  entry_threshold?: EntryThreshold;
  execution_model?: ExecutionModel;
  popularity?: Popularity;
  purpose?: Purpose;
}

export type FrameworkRequirementsRequest = {
  is_reactive?: boolean;
  is_actual?: boolean;
  tasks_type?: TasksType;
}

export type DataStorageRequirementsRequest = {
  storage_type?: StorageType;
  storage_location?: StorageLocation;
  data_base_type?: DataBaseType;
}

export type ProjectRequirementsRequest = {
  app_type?: AppType;
  team_size?: TeamSize;
  project_type?: ProjectType;
  scale?: Scale;
  time_to_show?: TimeToShow;
  languages?: number[];
  frameworks?: number[];
  data_storages?: number[];
  language_requirements?: LanguageRequirementsRequest;
  framework_requirements?: FrameworkRequirementsRequest;
  data_storage_requirements?: DataStorageRequirementsRequest;
}

export type RecommendationExplanation = {
  id: number;
  sessionId: string;
  recommendationType: 'LANGUAGE' | 'FRAMEWORK' | 'DATA_STORAGE';
  itemId: number;
  itemName: string;
  finalScore: number;
  explanations: string[];
  createdAt: string;
}

export type RuleExecutionLog = {
  id: number;
  sessionId: string;
  ruleName: string;
  timestamp: string;
  objectsActivated: string;
  scoreChanges: string;
  executionContext: Record<string, any>;
}

export type SessionSummary = {
  sessionId: string;
  totalExplanations: number;
  totalRulesExecuted: number;
  sessionCreated: string;
  explanationsByType: Record<string, number>;
  rulesExecuted: Record<string, number>;
  averageRecommendationScore: string;
  topRecommendations: TopRecommendation[];
  minScore?: string;
  maxScore?: string;
  medianScore?: string;
}

export type TopRecommendation = {
  type: string;
  name: string;
  score: string;
  id?: number;
  explanationCount?: number;
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

export type SessionExplanationsResponse = {
  success: boolean;
  sessionId: string;
  timestamp: string;
  explanations: RecommendationExplanation[];
  ruleExecutionLogs: RuleExecutionLog[];
  summary: SessionSummary;
  totalItems: number;
}

export type RecentSessionsResponse = {
  success: boolean;
  sessions: Array<{
    sessionId: string;
    timestamp: string;
    explanationCount: number;
    ruleCount: number;
  }>;
  total: number;
}

export type FilterOptions = {
  recommendationType?: string;
  minScore?: number;
  maxScore?: number;
  searchTerm?: string;
}