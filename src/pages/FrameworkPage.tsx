import React, { useState, useEffect } from 'react';
import type { Framework, FrameworkCreatingRequest } from '../api/types';
import FrameworkForm from '../components/framework/FrameworkForm';
import FrameworkList from '../components/framework/FrameworkList';
import axios from 'axios';

const FrameworkPage: React.FC = () => {
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadFrameworks();
  }, []);

  const loadFrameworks = async () => {
    try {
      setLoading(true);
      const r = await axios.get('/api/framework');
      setFrameworks(r.data);
      setError(null);
      await loadFrameworks();
    } catch (err) {
      setError('Не удалось загрузить фреймворки');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFramework = async (data: FrameworkCreatingRequest) => {
    try {
      const newFramework: Framework = await axios.post('/api/framework', data);
      setFrameworks(prev => [...prev, newFramework]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Не удалось создать фреймворк');
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Фреймворки</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Добавить фреймворк
        </button>

        <FrameworkForm
            onSubmit={handleCreateFramework}
            onCancel={() => setShowForm(false)}
            isVisible={showForm}
        />
      </div>

      <FrameworkList frameworks={frameworks} />
    </div>
  );
};

export default FrameworkPage;