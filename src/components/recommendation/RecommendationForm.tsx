import React, { useState, useEffect } from 'react';
import type {
  Language,
  Framework,
  DataStorage,
  ProjectRequirementsRequest
} from '../../api/types';

import {
    AppType,
    TeamSize,
    ProjectType,
    Scale,
    TimeToShow,
    EntryThreshold,
    ExecutionModel,
    Popularity,
    Purpose,
    TasksType,
    StorageType,
    StorageLocation,
    DataBaseType,
} from '../../api/types'
import axios from 'axios';

interface RecommendationFormProps {
  onSubmit: (data: ProjectRequirementsRequest) => void;
}

const RecommendationForm: React.FC<RecommendationFormProps> = ({ onSubmit }) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [dataStorages, setDataStorages] = useState<DataStorage[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [formData, setFormData] = useState<ProjectRequirementsRequest>({
    app_type: AppType.WEB,
    team_size: TeamSize.SMALL,
    project_type: ProjectType.PET,
    scale: Scale.EASY,
    time_to_show: TimeToShow.MEDIUM,
    languages: [],
    frameworks: [],
    data_storages: [],
    language_requirements: {},
    framework_requirements: {},
    data_storage_requirements: {},
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [langs, fws, dss] = await Promise.all([
          (await axios.get('/api/language')).data,
          (await axios.get('/api/framework')).data,
          (await axios.get('/api/datastorage')).data
        ]);
        setLanguages(langs);
        setFrameworks(fws);
        setDataStorages(dss);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const path = name.split('.');
    
    if (path.length === 1) {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else if (path.length === 2) {
      const [section, field] = path;
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: value
        }
      }));
    }
  };

  const handleArrayChange = (type: 'languages' | 'frameworks' | 'data_storages', id: number, checked: boolean) => {
    setFormData(prev => {
      const current = prev[type] || [];
      const newArray = checked
        ? [...current, id]
        : current.filter(itemId => itemId !== id);
      return { ...prev, [type]: newArray };
    });
  };

  return (
    <form className="recommendation-form" onSubmit={handleSubmit}>
      <h2>Основные параметры проекта</h2>
      
      <div className="form-section">
        <div className="form-group">
          <label htmlFor="appType">Тип приложения:</label>
          <select
            id="app_type"
            name="app_type"
            value={formData.appType}
            onChange={handleChange}
            className="form-select"
          >
            {Object.values(AppType).map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="team_size">Размер команды:</label>
          <select
            id="team_size"
            name="team_size"
            value={formData.team_size}
            onChange={handleChange}
            className="form-select"
          >
            {Object.values(TeamSize).map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="project_type">Тип проекта:</label>
          <select
            id="project_type"
            name="project_type"
            value={formData.project_type}
            onChange={handleChange}
            className="form-select"
          >
            {Object.values(ProjectType).map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="scale">Масштаб проекта:</label>
          <select
            id="scale"
            name="scale"
            value={formData.scale}
            onChange={handleChange}
            className="form-select"
          >
            {Object.values(Scale).map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="time_to_show">Сроки выхода:</label>
          <select
            id="time_to_show"
            name="time_to_show"
            value={formData.time_to_show}
            onChange={handleChange}
            className="form-select"
          >
            {Object.values(TimeToShow).map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h3>Предпочтения по технологиям</h3>
      <div className="form-section">
        <div className="form-group">
          <label>Предпочтительные языки:</label>
          <div className="checkbox-group">
            {languages.map(lang => (
              <div key={lang.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`lang-${lang.id}`}
                  checked={formData.languages?.includes(lang.id)}
                  onChange={(e) => handleArrayChange('languages', lang.id, e.target.checked)}
                />
                <label htmlFor={`lang-${lang.id}`}>{lang.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Предпочтительные фреймворки:</label>
          <div className="checkbox-group">
            {frameworks.map(fw => (
              <div key={fw.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`fw-${fw.id}`}
                  checked={formData.frameworks?.includes(fw.id)}
                  onChange={(e) => handleArrayChange('frameworks', fw.id, e.target.checked)}
                />
                <label htmlFor={`fw-${fw.id}`}>{fw.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Предпочтительные хранилища:</label>
          <div className="checkbox-group">
            {dataStorages.map(ds => (
              <div key={ds.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`ds-${ds.id}`}
                  checked={formData.data_storages?.includes(ds.id)}
                  onChange={(e) => handleArrayChange('data_storages', ds.id, e.target.checked)}
                />
                <label htmlFor={`ds-${ds.id}`}>{ds.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="advanced-section">
        <button
          type="button"
          className="advanced-toggle"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Скрыть' : 'Показать'} расширенные настройки
        </button>

        {showAdvanced && (
          <div className="advanced-options">
            <h4>Требования к языкам</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="language_requirements.entry_threshold">Порог входа:</label>
                <select
                  id="language_requirements.entry_threshold"
                  name="language_requirements.entry_threshold"
                  value={formData.language_requirements?.entry_threshold || ''}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Не важно</option>
                  {Object.values(EntryThreshold).map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="language_requirements.execution_model">Модель исполнения:</label>
                <select
                  id="language_requirements.execution_model"
                  name="language_requirements.execution_model"
                  value={formData.language_requirements?.execution_model || ''}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Не важно</option>
                  {Object.values(ExecutionModel).map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="language_requirements.popularity">Популярность:</label>
                <select
                  id="language_requirements.popularity"
                  name="language_requirements.popularity"
                  value={formData.language_requirements?.popularity || ''}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Не важно</option>
                  {Object.values(Popularity).map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="language_requirements.purpose">Назначение:</label>
                <select
                  id="language_requirements.purpose"
                  name="language_requirements.purpose"
                  value={formData.language_requirements?.purpose || ''}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Не важно</option>
                  {Object.values(Purpose).map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            </div>

            <h4>Требования к фреймворкам</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="framework_requirements.is_reactive" className="checkbox-label">
                  <input
                    type="checkbox"
                    id="framework_requirements.is_reactive"
                    name="framework_requirements.is_reactive"
                    checked={formData.framework_requirements?.is_reactive || false}
                    onChange={(e) => {
                      const { name, checked } = e.target;
                      const path = name.split('.');
                      setFormData(prev => ({
                        ...prev,
                        [path[0]]: {
                          ...prev[path[0] as keyof typeof prev],
                          [path[1]]: checked
                        }
                      }));
                    }}
                  />
                  Реактивный
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="framework_requirements.is_actual" className="checkbox-label">
                  <input
                    type="checkbox"
                    id="framework_requirements.is_actual"
                    name="framework_requirements.is_actual"
                    checked={formData.framework_requirements?.is_actual || false}
                    onChange={(e) => {
                      const { name, checked } = e.target;
                      const path = name.split('.');
                      setFormData(prev => ({
                        ...prev,
                        [path[0]]: {
                          ...prev[path[0] as keyof typeof prev],
                          [path[1]]: checked
                        }
                      }));
                    }}
                  />
                  Актуальный
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="framework_requirements.tasks_type">Тип задач:</label>
                <select
                  id="framework_requirements.tasks_type"
                  name="framework_requirements.tasks_type"
                  value={formData.framework_requirements?.tasks_type || ''}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Не важно</option>
                  {Object.values(TasksType).map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            </div>

            <h4>Требования к хранилищам</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="data_storage_requirements.storage_type">Тип хранилища:</label>
                <select
                  id="data_storage_requirements.storage_type"
                  name="data_storage_requirements.storage_type"
                  value={formData.data_storage_requirements?.storage_type || ''}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Не важно</option>
                  {Object.values(StorageType).map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="data_storage_requirements.storage_location">Локация:</label>
                <select
                  id="data_storage_requirements.storage_location"
                  name="data_storage_requirements.storage_location"
                  value={formData.data_storage_requirements?.storage_location || ''}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Не важно</option>
                  {Object.values(StorageLocation).map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="data_storage_requirements.data_base_type">Тип БД:</label>
                <select
                  id="data_storage_requirements.data_base_type"
                  name="data_storage_requirements.data_base_type"
                  value={formData.data_storage_requirements?.data_base_type || ''}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Не важно</option>
                  {Object.values(DataBaseType).map(value => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary btn-large">
          Получить рекомендации
        </button>
      </div>
    </form>
  );
};

export default RecommendationForm;