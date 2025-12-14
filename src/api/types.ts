// Enums
export enum AppType {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP',
  EMBEDDED = 'EMBEDDED',
  MICROSERVICES = 'MICROSERVICES'
};

export enum TimeToShow {
  URGENT = 'URGENT',
  QUICK = 'QUICK',
  NORMAL = 'NORMAL',
  NO_LIMIT = 'NO_LIMIT'
};

export enum ProjectType {
  MVP = 'MVP',
  ENTERPRISE = 'ENTERPRISE',
  STARTUP = 'STARTUP',
  PERSONAL = 'PERSONAL',
  RESEARCH = 'RESEARCH'
};

export enum TeamSize {
  SOLO = 'SOLO',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  ENTERPRISE = 'ENTERPRISE'
};

export enum Scale {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  MASSIVE = 'MASSIVE'
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
  CRUD = 'CRUD',
  REAL_TIME = 'REAL_TIME',
  HIGH_LOAD = 'HIGH_LOAD',
  IO_INTENSIVE = 'IO_INTENSIVE',
  COMPUTATION_INTENSIVE = 'COMPUTATION_INTENSIVE',
  MACHINE_LEARNING = 'MACHINE_LEARNING'
};

export enum StorageType {
  RELATIONAL = 'RELATIONAL',
  DOCUMENT = 'DOCUMENT',
  KEY_VALUE = 'KEY_VALUE',
  COLUMNAR = 'COLUMNAR',
  GRAPH = 'GRAPH',
  TIME_SERIES = 'TIME_SERIES'
};

export enum StorageLocation {
  LOCAL = 'LOCAL',
  CLOUD = 'CLOUD',
  HYBRID = 'HYBRID',
  EDGE = 'EDGE'
};

export enum DataBaseType {
  SQL = 'SQL',
  NO_SQL = 'NO_SQL',
  NEW_SQL = 'NEW_SQL',
  IN_MEMORY = 'IN_MEMORY'
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
  dataStorage_recommended_list: DataStorage[];
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
  tasksType?: TasksType;
}

export type DataStorageRequirementsRequest = {
  storage_type?: StorageType;
  storage_location?: StorageLocation;
  dataBase_type?: DataBaseType;
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