import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface SessionSelectorProps {
  onSessionSelect: (sessionId: string) => void;
  currentSessionId?: string;
}

export const SessionSelector: React.FC<SessionSelectorProps> = ({
  onSessionSelect,
  currentSessionId
}) => {
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualSessionId, setManualSessionId] = useState('');

  useEffect(() => {
    loadRecentSessions();
  }, []);

  const loadRecentSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await axios.get('/api/explanations/recent-sessions');
      setRecentSessions(r.data || []);
    } catch (err) {
      setError('Не удалось загрузить последние сессии');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualSessionId.trim()) {
      onSessionSelect(manualSessionId.trim());
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Выбор сессии</h3>
        
        <form onSubmit={handleManualSubmit} className="mb-4">
          <label htmlFor="sessionId" className="block text-sm font-medium text-gray-700 mb-1">
            Введите ID сессии
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="sessionId"
              value={manualSessionId}
              onChange={(e) => setManualSessionId(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Например: 12345"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Загрузить
            </button>
          </div>
        </form>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Недавние сессии</h4>
          {loading ? (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-600 text-sm">{error}</div>
          ) : recentSessions.length > 0 ? (
            <div className="space-y-2">
              {recentSessions.map((session) => (
                <button
                  key={session.sessionId}
                  onClick={() => onSessionSelect(session.sessionId)}
                  className={`w-full text-left px-3 py-2 rounded border transition-colors ${
                    currentSessionId === session.sessionId
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Сессия {session.sessionId}</span>
                    {/* <span className="text-xs text-gray-500">
                      {session.explanationCount} объяснений
                    </span> */}
                  </div>
                  {/* <div className="text-xs text-gray-500 mt-1">
                    {new Date(session.timestamp).toLocaleDateString()}
                  </div> */}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm text-center py-2">
              Нет данных о сессиях
            </div>
          )}
        </div>
      </div>
    </div>
  );
};