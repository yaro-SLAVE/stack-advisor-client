import React, { useState, useEffect } from 'react';
import type { DataStorage, DataStorageCreatingRequest } from '../api/types';
import DataStorageList from '../components/datastorage/DataStorageList';
import DataStorageForm from '../components/datastorage/DataStorageForm';
import axios from 'axios';

const DataStoragesPage: React.FC = () => {
  const [dataStorages, setDataStorages] = useState<DataStorage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadDataStorages();
  }, []);

  const loadDataStorages = async () => {
    try {
      setLoading(true);
      const r = await axios.get('/api/datastorage/');
      setDataStorages(r.data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить хранилища данных');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDataStorage = async (data: DataStorageCreatingRequest) => {
    try {
      const newDataStorage: DataStorage = await axios.post('/api/datastorage/', data);
      setDataStorages(prev => [...prev, newDataStorage]);
      setShowForm(false);
      setError(null);
      await loadDataStorages();
    } catch (err) {
      setError('Не удалось создать хранилище данных');
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Хранилища данных</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Добавить хранилище
        </button>

        <DataStorageForm
            onSubmit={handleCreateDataStorage}
            onCancel={() => setShowForm(false)}
            isVisible={showForm}
        />
      </div>

      <DataStorageList dataStorages={dataStorages} />
    </div>
  );
};

export default DataStoragesPage;