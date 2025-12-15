import React, { useState, useEffect } from 'react';
import { SessionSelector } from '../components/common/SessionSelector';
import { SessionExplanations } from '../components/explanations/SessionExplanations';
import { SessionSummary } from '../components/dashboard/SessionSummary';
import { StatsPanel } from '../components/dashboard/StatsPanel';

export const Dashboard: React.FC = () => {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const savedSessionId = localStorage.getItem('lastSessionId');
    if (savedSessionId) {
      setCurrentSessionId(savedSessionId);
    }
  }, []);

  const handleSessionSelect = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    localStorage.setItem('lastSessionId', sessionId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">
                Система объяснений рекомендаций
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                {showSummary ? 'Скрыть сводку' : 'Показать сводку'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SessionSelector
              onSessionSelect={handleSessionSelect}
              currentSessionId={currentSessionId || undefined}
            />
            
            {currentSessionId && (
              <div className="mt-8">
                <StatsPanel sessionId={currentSessionId} />
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            {showSummary && currentSessionId && (
              <div className="mb-8">
                <SessionSummary sessionId={currentSessionId} />
              </div>
            )}

            {currentSessionId ? (
              <SessionExplanations sessionId={currentSessionId} />
            ) : (
              <div className="bg-white rounded-lg shadow border border-gray-200 p-12 text-center">
                <div className="text-6xl mb-4">👋</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Добро пожаловать в систему объяснений
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Выберите сессию из списка или введите ID сессии вручную, чтобы просмотреть 
                  подробные объяснения рекомендаций системы.
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Выберите сессию для начала работы
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>Система объяснений рекомендаций • Технологический стек • {new Date().getFullYear()}</p>
            <p className="mt-1">Использует Drools для выполнения бизнес-правил и генерации объяснений</p>
          </div>
        </div>
      </footer>
    </div>
  );
};