// src/utils/helpers.ts
import { 
  TechnologyCategory, 
  RecommendationStatus,
  Technology 
} from '../api/types';

export const getCategoryLabel = (category: TechnologyCategory): string => {
  const labels: Record<TechnologyCategory, string> = {
    [TechnologyCategory.BACKEND]: 'Бэкенд',
    [TechnologyCategory.FRONTEND]: 'Фронтенд',
    [TechnologyCategory.DATABASE]: 'Базы данных',
    [TechnologyCategory.MOBILE_HYBRID]: 'Кроссплатформерная мобильная разработка',
    [TechnologyCategory.IOS]: 'IOS',
    [TechnologyCategory.ANDROID]: 'Android',
    [TechnologyCategory.UNKNOWN]: 'Неизвестно',
  };
  return labels[category] || category;
};

export const getStatusLabel = (status: RecommendationStatus): string => {
  const labels: Record<RecommendationStatus, string> = {
    [RecommendationStatus.PRIMARY]: 'Основная',
    [RecommendationStatus.ALTERNATIVE]: 'Альтернатива',
    [RecommendationStatus.NOT_RECOMMENDED]: 'Не рекомендовано'
  };
  return labels[status];
};

export const getStatusColor = (status: RecommendationStatus): 'primary' | 'default' | 'error' => {
  switch (status) {
    case RecommendationStatus.PRIMARY: return 'primary';
    case RecommendationStatus.ALTERNATIVE: return 'default';
    case RecommendationStatus.NOT_RECOMMENDED: return 'error';
    default: return 'default';
  }
};

export const getConfidenceColor = (confidence: number): 'success' | 'warning' | 'error' => {
  if (confidence >= 0.8) return 'success';
  if (confidence >= 0.6) return 'warning';
  return 'error';
};

export const formatConfidence = (confidence: number): string => {
  return `${Math.round(confidence * 100)}%`;
};

export const getTechnologyScore = (tech: Technology): number => {
  const scores = [
    tech.complexity || 0,
    tech.scalability || 0,
    tech.communitySize || 0,
    tech.maturity || 0,
    tech.performance || 0
  ];
  return scores.reduce((a, b) => a + b, 0) / scores.length;
};