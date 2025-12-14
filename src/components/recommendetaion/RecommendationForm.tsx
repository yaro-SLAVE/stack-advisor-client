import React, { useState, useEffect } from 'react';
import type {
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
  Language,
  Framework,
  DataStorage,
  ProjectRequirementsRequest
} from '../../api/types';

interface RecommendationFormProps {
  onSubmit: (data: ProjectRequirementsRequest) => void;
}

const RecommendationForm: React.FC<RecommendationFormProps> = ({ onSubmit }) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [dataStorages, setDataStorages] = useState<DataStorage[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [formData, setFormData] = useState<ProjectRequirementsRequest>({
    appType: AppType.WEB,
    teamSize: TeamSize.SMALL,
    projectType: ProjectType.STARTUP,
    scale: Scale.SMALL,
    timeToShow: TimeToShow.NORMAL,
    languages: [],
    frameworks: [],
    dataStorages: [],
    languageRequirements: {},
    frameworkRequirements: {},
    dataStorageRequirements: {},
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [langs, fws, dss] = await Promise.all([
          languageService.getAllLanguages(),
          frameworkService.getAllFrameworks(),
          dataStorageService.getAllDataStorages()
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

  const handleArrayChange = (type: 'languages' | 'frameworks' | 'dataStorages', id: number, checked: boolean) => {
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
            id="appType"
            name="appType"
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
          <label htmlFor="teamSize">Размер команды:</label>
          <select
            id="teamSize"
            name="teamSize"
            value={formData.teamSize}
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
          <label htmlFor="projectType">Тип проекта:</label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
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
          <label htmlFor="timeToShow">Сроки выхода:</label>
          <select
            id="timeToShow"
            name="timeToShow"
            value={formData.timeToShow}
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
                  checked={formData.dataStorages?.includes(ds.id)}
                  onChange={(e) => handleArrayChange('dataStorages', ds.id, e.target.checked)}
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
                <label htmlFor="languageRequirements.entryThreshold">Порог входа:</label>
                <select
                  id="languageRequirements.entryThreshold"
                  name="languageRequirements.entryThreshold"
                  value={formData.languageRequirements?.entryThreshold || ''}
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
                <label htmlFor="languageRequirements.executionModel">Модель исполнения:</label>
                <select
                  id="languageRequirements.executionModel"
                  name="languageRequirements.executionModel"
                  value={formData.languageRequirements?.executionModel || ''}
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
                <label htmlFor="languageRequirements.popularity">Популярность:</label>
                <select
                  id="languageRequirements.popularity"
                  name="languageRequirements.popularity"
                  value={formData.languageRequirements?.popularity || ''}
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
                <label htmlFor="languageRequirements.purpose">Назначение:</label>
                <select
                  id="languageRequirements.purpose"
                  name="languageRequirements.purpose"
                  value={formData.languageRequirements?.purpose || ''}
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
                <label htmlFor="frameworkRequirements.isReactive" className="checkbox-label">
                  <input
                    type="checkbox"
                    id="frameworkRequirements.isReactive"
                    name="frameworkRequirements.isReactive"
                    checked={formData.frameworkRequirements?.isReactive || false}
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
                <label htmlFor="frameworkRequirements.isActual" className="checkbox-label">
                  <input
                    type="checkbox"
                    id="frameworkRequirements.isActual"
                    name="frameworkRequirements.isActual"
                    checked={formData.frameworkRequirements?.isActual || false}
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
                <label htmlFor="frameworkRequirements.tasksType">Тип задач:</label>
                <select
                  id="frameworkRequirements.tasksType"
                  name="frameworkRequirements.tasksType"
                  value={formData.frameworkRequirements?.tasksType || ''}
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
                <label htmlFor="dataStorageRequirements.storageType">Тип хранилища:</label>
                <select
                  id="dataStorageRequirements.storageType"
                  name="dataStorageRequirements.storageType"
                  value={formData.dataStorageRequirements?.storageType || ''}
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
                <label htmlFor="dataStorageRequirements.storageLocation">Локация:</label>
                <select
                  id="dataStorageRequirements.storageLocation"
                  name="dataStorageRequirements.storageLocation"
                  value={formData.dataStorageRequirements?.storageLocation || ''}
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
                <label htmlFor="dataStorageRequirements.dataBaseType">Тип БД:</label>
                <select
                  id="dataStorageRequirements.dataBaseType"
                  name="dataStorageRequirements.dataBaseType"
                  value={formData.dataStorageRequirements?.dataBaseType || ''}
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