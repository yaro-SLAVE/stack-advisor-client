import React, { useState } from 'react';
import type { RuleExecutionLog } from '../../api/types';
import { formatDate } from '../../utils/formatters';

interface RuleExecutionLogProps {
  log: RuleExecutionLog;
}

export const RuleExecutionLogComponent: React.FC<RuleExecutionLogProps> = ({ log }) => {
  const [showDetails, setShowDetails] = useState(false);

  const parseContext = () => {
    try {
      if (typeof log.executionContext === 'string') {
        return JSON.parse(log.executionContext);
      }
      return log.executionContext || {};
    } catch {
      return {};
    }
  };

  const context = parseContext();

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden mb-3">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-gray-900">{log.ruleName}</h3>
              <span className="ml-auto text-xs text-gray-500">
                {formatDate(log.timestamp)}
              </span>
            </div>
            
            <div className="text-sm text-gray-600 mb-2">
              <div className="truncate">
                <span className="font-medium">Активировано:</span> {log.objectsActivated}
              </div>
              <div className="truncate">
                <span className="font-medium">Изменения:</span> {log.scoreChanges}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="text-xs text-blue-600 hover:text-blue-800">
                {showDetails ? 'Скрыть детали' : 'Показать детали'}
              </button>
              {/* <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  showDetails ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg> */}
            </div>
          </div>
        </div>
      </div>
      
      {showDetails && (
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
          <div className="space-y-2">
            <div>
              <h4 className="font-medium text-gray-700 text-sm mb-1">Контекст выполнения:</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(context, null, 2)}
              </pre>
            </div>
            
            <div className="text-xs text-gray-500 flex justify-between">
              <span>ID: {log.id}</span>
              <span>Сессия: {log.sessionId}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};