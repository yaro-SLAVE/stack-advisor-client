import React, { useState, useEffect } from 'react';
import type { Language, LanguageCreatingRequest } from '../api/types';
import LanguageForm from '../components/language/LanguageForm';
import LanguageList from '../components/language/LanguageList';
import axios from 'axios';

const LanguagePage: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/language');
      setLanguages(response.data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить языки');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLanguage = async (data: LanguageCreatingRequest) => {
    try {
      const newLanguage: Language = await axios.post('/api/language', data)
      setLanguages(prev => [...prev, newLanguage]);
      setShowForm(false);
      setError(null);
      await loadLanguages();
    } catch (err) {
      setError('Не удалось создать язык');
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Языки программирования</h1>
        <button
          className="btn btn-primary"
          onClick={() => { setShowForm(true)}}
        >
          Добавить язык
        </button>
      </div>

      <LanguageForm
              onSubmit={handleCreateLanguage}
              onCancel={() => setShowForm(false)}
              isVisible={showForm}
            />

      <LanguageList languages={languages} />
    </div>
  );
};

export default LanguagePage;