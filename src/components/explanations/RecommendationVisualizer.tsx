import React from 'react';
import type { RecommendationExplanation, SessionSummary } from '../../api/types';
import { getTypeColor, formatScore } from '../../utils/formatters';

interface RecommendationVisualizerProps {
  explanations: RecommendationExplanation[];
  summary: SessionSummary;
}

export const RecommendationVisualizer: React.FC<RecommendationVisualizerProps> = ({
  explanations,
  summary
}) => {
  const languages = explanations.filter(e => e.recommendationType === 'LANGUAGE');
  const frameworks = explanations.filter(e => e.recommendationType === 'FRAMEWORK');
  const dataStorages = explanations.filter(e => e.recommendationType === 'DATA_STORAGE');

  const getScoreWidth = (score: number) => {
    const maxScore = Math.max(...explanations.map(e => e.finalScore));
    return maxScore > 0 ? (score / maxScore) * 100 : 0;
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Визуализация рекомендаций</h2>
      
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-600">{languages.length}</div>
            <div className="text-sm text-blue-800">Языки</div>
            <div className="text-xs text-blue-600 mt-1">
              Средний балл: {languages.length > 0 
                ? formatScore(languages.reduce((a, b) => a + b.finalScore, 0) / languages.length)
                : '0.00'}
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-purple-600">{frameworks.length}</div>
            <div className="text-sm text-purple-800">Фреймворки</div>
            <div className="text-xs text-purple-600 mt-1">
              Средний балл: {frameworks.length > 0 
                ? formatScore(frameworks.reduce((a, b) => a + b.finalScore, 0) / frameworks.length)
                : '0.00'}
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-600">{dataStorages.length}</div>
            <div className="text-sm text-green-800">Хранилища данных</div>
            <div className="text-xs text-green-600 mt-1">
              Средний балл: {dataStorages.length > 0 
                ? formatScore(dataStorages.reduce((a, b) => a + b.finalScore, 0) / dataStorages.length)
                : '0.00'}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-4">Топ рекомендаций по баллам</h3>
          <div className="space-y-3">
            {explanations
              .sort((a, b) => b.finalScore - a.finalScore)
              .slice(0, 10)
              .map((exp, index) => (
                <div key={exp.id} className="flex items-center">
                  <div className="w-8 text-center text-sm font-medium text-gray-500">
                    #{index + 1}
                  </div>
                  <div className="flex-1 ml-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{exp.itemName}</span>
                      <span className="text-sm font-bold text-gray-700">
                        {formatScore(exp.finalScore)}
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`absolute top-0 left-0 h-full rounded-full ${
                          exp.recommendationType === 'LANGUAGE' ? 'bg-blue-500' :
                          exp.recommendationType === 'FRAMEWORK' ? 'bg-purple-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${getScoreWidth(exp.finalScore)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex justify-between">
                      <span className={getTypeColor(exp.recommendationType) + ' px-2 py-0.5 rounded'}>
                        {exp.recommendationType.replace('_', ' ')}
                      </span>
                      <span>{exp.explanations.length} причин</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-4">Статистика правил</h3>
          <div className="space-y-2">
            {Object.entries(summary.rulesExecuted || {}).map(([ruleName, count]) => (
              <div key={ruleName} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-900">{ruleName}</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {count} выполнений
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};