import React, { useState, useEffect } from 'react';
import type { RecommendationExplanation } from '../../api/types';
import { formatScore, getTypeIcon, getTypeColor } from '../../utils/formatters';

interface ExplanationCardProps {
  explanation: RecommendationExplanation;
  expanded?: boolean;
  onToggle?: () => void;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  explanation,
  expanded: initiallyExpanded = false,
  onToggle
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const [parsedExplanations, setParsedExplanations] = useState<string[]>([]);

  useEffect(() => {
    const parseExplanations = () => {
      try {
        if (typeof explanation.explanations === 'string') {
          const parsed = JSON.parse(explanation.explanations);
          setParsedExplanations(Array.isArray(parsed) ? parsed : [parsed]);
        } else if (Array.isArray(explanation.explanations)) {
          setParsedExplanations(explanation.explanations);
        } else {
          console.warn('Unexpected explanations format:', explanation.explanations);
          setParsedExplanations([]);
        }
      } catch (error) {
        console.error('Failed to parse explanations:', error);
        setParsedExplanations(['Не удалось загрузить объяснения']);
      }
    };

    parseExplanations();
  }, [explanation.explanations]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) onToggle();
  };

  const scoreColor = getTypeColor(explanation.recommendationType);

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleToggle}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{getTypeIcon(explanation.recommendationType)}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${scoreColor}`}>
                {explanation.recommendationType.replace('_', ' ')}
              </span>
              <span className="ml-auto text-lg font-bold text-gray-900">
                {formatScore(explanation.finalScore)}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {explanation.itemName}
              <span className="text-sm font-normal text-gray-500 ml-2">
                (ID: {explanation.itemId})
              </span>
            </h3>
            
            <div className="text-sm text-gray-600">
              <span className="inline-flex items-center gap-1">
                {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> */}
                {new Date(explanation.createdAt).toLocaleDateString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <span className="mx-2">•</span>
              <span>{parsedExplanations.length} причин</span>
            </div>
          </div>
          
          <button
            onClick={handleToggle}
            className="ml-4 flex-shrink-0"
            aria-label={isExpanded ? "Свернуть" : "Развернуть"}
          >
            <svg
              className={`w-6 h-6 text-gray-500 transition-transform ${
                isExpanded ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
          <h4 className="font-medium text-gray-700 mb-2">Причины выбора:</h4>
          {parsedExplanations.length > 0 ? (
            <ul className="space-y-2">
              {parsedExplanations.map((exp, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-800 text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{exp}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Нет доступных объяснений</p>
          )}
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              <span className="font-medium">Session ID:</span> {explanation.sessionId}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};