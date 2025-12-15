import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface StatsPanelProps {
  sessionId: string;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ sessionId }) => {
  const [stats, setStats] = useState({
    languages: 0,
    frameworks: 0,
    dataStorages: 0,
    topScore: 0,
    rulesCount: 0
  });

  useEffect(() => {
    loadStats();
  }, [sessionId]);

  const loadStats = async () => {
    try {
      const r = await axios.get(`/api//explanations/session/${sessionId}`);
      const explanations = r.data.explanations || [];
      
      const languages = explanations.filter((e: { recommendationType: string; }) => e.recommendationType === 'LANGUAGE');
      const frameworks = explanations.filter((e: { recommendationType: string; }) => e.recommendationType === 'FRAMEWORK');
      const dataStorages = explanations.filter((e: { recommendationType: string; }) => e.recommendationType === 'DATA_STORAGE');
      
      const topScore = Math.max(...explanations.map((e: { finalScore: any; }) => e.finalScore), 0);
      
      setStats({
        languages: languages.length,
        frameworks: frameworks.length,
        dataStorages: dataStorages.length,
        topScore,
        rulesCount: r.data.ruleExecutionLogs?.length || 0
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
      <h3 className="font-medium text-gray-900 mb-4">📈 Статистика сессии</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Языки</span>
          <span className="font-medium text-blue-600">{stats.languages}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Фреймворки</span>
          <span className="font-medium text-purple-600">{stats.frameworks}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Хранилища</span>
          <span className="font-medium text-green-600">{stats.dataStorages}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Макс. балл</span>
            <span className="font-bold text-gray-900">{stats.topScore.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Всего правил</span>
            <span className="font-medium text-orange-600">{stats.rulesCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};