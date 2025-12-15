export const formatScore = (score: number): string => {
  return score.toFixed(2);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const getScoreColor = (score: number): string => {
  if (score >= 8) return 'bg-green-100 text-green-800';
  if (score >= 5) return 'bg-yellow-100 text-yellow-800';
  if (score >= 3) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};

export const getTypeIcon = (type: string): string => {
  switch (type) {
    case 'LANGUAGE':
      return '💻';
    case 'FRAMEWORK':
      return '⚙️';
    case 'DATA_STORAGE':
      return '💾';
    default:
      return '📄';
  }
};

export const getTypeColor = (type: string): string => {
  switch (type) {
    case 'LANGUAGE':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'FRAMEWORK':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'DATA_STORAGE':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const parseExplanations = (explanationsJson: string): string[] => {
  try {
    return JSON.parse(explanationsJson);
  } catch (error) {
    return ['Не удалось прочитать объяснения'];
  }
};