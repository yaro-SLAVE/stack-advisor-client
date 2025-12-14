import React, { useState } from 'react';
import type {
  ProjectRequirementsRequest,
  ProjectRecommendedResponse
} from '../api/types';
import RecommendationForm from '../components/recommendation/RecommendationForm';
import RecommendationResult from '../components/recommendation/RecommendationResult';
import axios from 'axios';

const RecommendationPage: React.FC = () => {
  const [result, setResult] = useState<ProjectRecommendedResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async (data: ProjectRequirementsRequest) => {
    try {
      setLoading(true);
      setError(null);
      const r = await axios.post('/api/recommended/', data);
      setResult(r.data);
    } catch (err) {
      setError('Не удалось получить рекомендации');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Подбор технологического стека</h1>
        {result && (
          <button className="btn btn-secondary" onClick={handleReset}>
            Новый запрос
          </button>
        )}
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Подбираем лучшие технологии...</div>
      ) : result ? (
        <RecommendationResult result={result} />
      ) : (
        <RecommendationForm onSubmit={handleGetRecommendations} />
      )}
    </div>
  );
};

export default RecommendationPage;