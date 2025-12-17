import React, { useState, useEffect } from 'react';
import type { SessionSummary as SessionSummaryType } from '../../api/types';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import axios from 'axios';

interface SessionSummaryProps {
  sessionId: string;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({ sessionId }) => {
  const [summary, setSummary] = useState<SessionSummaryType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      loadSummary();
    }
  }, [sessionId]);

  const loadSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await axios.get(`/api/explanations/session/${sessionId}/summary`);
      setSummary(r.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} onRetry={loadSummary} />;
  if (!summary) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow border border-blue-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Сводка по сессии {sessionId}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{summary.totalExplanations}</div>
          <div className="text-sm text-gray-600">Объяснений</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-green-600">{summary.totalRulesExecuted}</div>
          <div className="text-sm text-gray-600">Правил выполнено</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-purple-600">{summary.averageRecommendationScore}</div>
          <div className="text-sm text-gray-600">Средний балл</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-xl font-bold text-orange-600">{summary.minScore || '0.00'}</div>
          <div className="text-sm text-gray-600">Мин. балл</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-xl font-bold text-red-600">{summary.maxScore || '0.00'}</div>
          <div className="text-sm text-gray-600">Макс. балл</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Распределение по типам</h3>
        <div className="space-y-3">
          {Object.entries(summary.explanationsByType || {}).map(([type, count]) => (
            <div key={type} className="flex items-center">
              <div className="w-32 text-sm text-gray-600">{type.replace('_', ' ')}</div>
              <div className="flex-1 ml-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${(count / summary.totalExplanations) * 100}%`
                    }}
                  />
                </div>
              </div>
              <div className="w-16 text-right font-medium">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {summary.topRecommendations && summary.topRecommendations.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Топ рекомендаций</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {summary.topRecommendations.slice(0, 6).map((rec, index) => (
              <div
                key={`${rec.type}-${rec.id || index}`}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">
                      {rec.type === 'LANGUAGE' ? '' :
                       rec.type === 'FRAMEWORK' ? '' : ''}
                    </span>
                    <span className="font-medium text-gray-900">{rec.name}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{rec.score}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {rec.type.replace('_', ' ')} • {rec.explanationCount || 0} причин
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};