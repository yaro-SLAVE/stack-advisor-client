import React, { useState, useEffect } from 'react';
import type { SessionExplanationsResponse, FilterOptions } from '../../api/types';
import { ExplanationCard } from './ExplanationCard';
import { RuleExecutionLogComponent } from './RuleExecutionLog';
import { RecommendationVisualizer } from './RecommendationVisualizer';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import axios from 'axios';

interface SessionExplanationsProps {
  sessionId: string;
}

export const SessionExplanations: React.FC<SessionExplanationsProps> = ({ sessionId }) => {
  const [data, setData] = useState<SessionExplanationsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'explanations' | 'rules' | 'visualization'>('explanations');
  const [filters, setFilters] = useState<FilterOptions>({});

  useEffect(() => {
    if (sessionId) {
      loadSessionData();
    }
  }, [sessionId]);

  const loadSessionData = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await axios.get(`/api/explanations/session/${sessionId}`);
      setData(r.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      console.error('Failed to load session data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredExplanations = () => {
    if (!data?.explanations) return [];
    
    return data.explanations.filter(exp => {
      if (filters.recommendationType && exp.recommendationType !== filters.recommendationType) {
        return false;
      }
      if (filters.minScore !== undefined && exp.finalScore < filters.minScore) {
        return false;
      }
      if (filters.maxScore !== undefined && exp.finalScore > filters.maxScore) {
        return false;
      }
      if (filters.searchTerm && !exp.itemName.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} onRetry={loadSessionData} />;
  if (!data) return null;

  const filteredExplanations = getFilteredExplanations();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Сессия рекомендаций: {sessionId}
            </h1>
            <p className="text-gray-600 mt-1">
              {data.timestamp && new Date(data.timestamp).toLocaleString('ru-RU')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {data.explanations.length} объяснений
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              {data.ruleExecutionLogs.length} правил
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Тип</label>
            <select
              value={filters.recommendationType || ''}
              onChange={(e) => setFilters({ ...filters, recommendationType: e.target.value || undefined })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Все типы</option>
              <option value="LANGUAGE">Языки</option>
              <option value="FRAMEWORK">Фреймворки</option>
              <option value="DATA_STORAGE">Хранилища данных</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Мин. балл</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={filters.minScore || ''}
              onChange={(e) => setFilters({ ...filters, minScore: e.target.value ? parseFloat(e.target.value) : undefined })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Макс. балл</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={filters.maxScore || ''}
              onChange={(e) => setFilters({ ...filters, maxScore: e.target.value ? parseFloat(e.target.value) : undefined })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10.0"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Поиск</label>
            <input
              type="text"
              value={filters.searchTerm || ''}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value || undefined })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Название элемента..."
            />
          </div>
        </div>

        {/* Табы */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('explanations')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'explanations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Объяснения ({filteredExplanations.length})
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rules'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Логи правил ({data.ruleExecutionLogs.length})
            </button>
            <button
              onClick={() => setActiveTab('visualization')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'visualization'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Визуализация
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'explanations' && (
        <div className="space-y-4">
          {filteredExplanations.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-200">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ничего не найдено</h3>
              <p className="text-gray-600">Попробуйте изменить параметры фильтрации</p>
            </div>
          ) : (
            filteredExplanations.map((explanation) => (
              <ExplanationCard
                key={explanation.id}
                explanation={explanation}
              />
            ))
          )}
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="space-y-2">
          {data.ruleExecutionLogs.map((log) => (
            <RuleExecutionLogComponent key={log.id} log={log} />
          ))}
        </div>
      )}

      {activeTab === 'visualization' && data.summary && (
        <RecommendationVisualizer
          explanations={data.explanations}
          summary={data.summary}
        />
      )}

      {data.summary && (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Сводка по сессии</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500">Всего элементов</div>
              <div className="text-2xl font-bold text-gray-900">{data.explanations.length}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Правил выполнено</div>
              <div className="text-2xl font-bold text-gray-900">{data.ruleExecutionLogs.length}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Средний балл</div>
              <div className="text-2xl font-bold text-gray-900">{data.summary.averageRecommendationScore}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Дата создания</div>
              <div className="text-lg font-medium text-gray-900">
                {new Date(data.summary.sessionCreated).toLocaleDateString('ru-RU')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};