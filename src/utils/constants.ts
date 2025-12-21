import { 
  ProjectType, 
  TeamExperience, 
  BudgetLevel, 
  TimeToMarket, 
  TeamSize,
  ProjectFormData 
} from '../api/types';

export const PROJECT_TYPES = [
  { value: ProjectType.WEB, label: 'Веб-приложение' },
  { value: ProjectType.MOBILE, label: 'Мобильное приложение' },
  { value: ProjectType.DESKTOP, label: 'Десктоп приложение' },
  { value: ProjectType.AI_ML, label: 'AI/ML проект' },
  { value: ProjectType.DEVOPS, label: 'DevOps инфраструктура' },
  { value: ProjectType.GAME, label: 'Игра' }
];

export const TEAM_EXPERIENCES = [
  { value: TeamExperience.JAVA, label: 'Java' },
  { value: TeamExperience.JAVASCRIPT, label: 'JavaScript' },
  { value: TeamExperience.PYTHON, label: 'Python' },
  { value: TeamExperience.DOTNET, label: '.NET' },
  { value: TeamExperience.GO, label: 'Go' },
  { value: TeamExperience.PHP, label: 'PHP' },
  { value: TeamExperience.MIXED, label: 'Смешанный' },
  { value: TeamExperience.NONE, label: 'Нет опыта' }
];

export const BUDGET_LEVELS = [
  { value: BudgetLevel.LOW, label: 'Низкий' },
  { value: BudgetLevel.MEDIUM, label: 'Средний' },
  { value: BudgetLevel.HIGH, label: 'Высокий' },
  { value: BudgetLevel.ENTERPRISE, label: 'Enterprise' }
];

export const TIME_OPTIONS = [
  { value: TimeToMarket.FAST, label: 'Быстро (3-6 месяцев)' },
  { value: TimeToMarket.NORMAL, label: 'Стандартно (6-12 месяцев)' },
  { value: TimeToMarket.SLOW, label: 'Длительно (12+ месяцев)' }
];

export const TEAM_SIZES = [
  { value: TeamSize.SMALL, label: 'Малая (1-5 человек)' },
  { value: TeamSize.MEDIUM, label: 'Средняя (5-15 человек)' },
  { value: TeamSize.LARGE, label: 'Большая (15-50 человек)' }
];

export const INITIAL_FORM_DATA: ProjectFormData = {
  projectType: ProjectType.WEB,
  teamExperience: TeamExperience.MIXED,
  teamSize: TeamSize.MEDIUM,
  budget: BudgetLevel.MEDIUM,
  timeToMarket: TimeToMarket.NORMAL,
  needHighLoad: false,
  needRealTime: false,
  needHighSecurity: false,
  teamMembers: 5
};