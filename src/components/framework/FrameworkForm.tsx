import React, { useState, useEffect } from 'react';
import type {
  FrameworkCreatingRequest,
  Language
} from '../../api/types';
import {TasksType} from '../../api/types';
import axios from 'axios';

interface FrameworkFormProps {
  onSubmit: (data: FrameworkCreatingRequest) => void;
  onCancel?: () => void;
  initialData?: Partial<FrameworkCreatingRequest>;
  isVisible: boolean;
}

const FrameworkForm: React.FC<FrameworkFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isVisible
}) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [formData, setFormData] = useState<FrameworkCreatingRequest>({
    name: initialData?.name || '',
    languages: initialData?.languages || [],
    is_reactive: initialData?.is_reactive || false,
    last_updated_at: initialData?.last_updated_at || new Date().toISOString().split('T')[0],
    tasks_type: initialData?.tasks_type || TasksType.BACKEND,
  });

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const r = await axios.get('/api/language');
        setLanguages(r.data);
      } catch (error) {
        console.error('Failed to load languages:', error);
      }
    };
    loadLanguages();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLanguageChange = (languageId: number, checked: boolean) => {
    setFormData(prev => {
      const newLanguages = checked
        ? [...prev.languages, languageId]
        : prev.languages.filter(id => id !== languageId);
      return { ...prev, languages: newLanguages };
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <form className="framework-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Название фреймворка:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Поддерживаемые языки:</label>
        <div className="languages-checkbox-group">
          {languages.map(language => (
            <div key={language.id} className="checkbox-item">
              <input
                type="checkbox"
                id={`lang-${language.id}`}
                checked={formData.languages.includes(language.id)}
                onChange={(e) => handleLanguageChange(language.id, e.target.checked)}
              />
              <label htmlFor={`lang-${language.id}`}>
                {language.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="is_reactive" className="checkbox-label">
          <input
            type="checkbox"
            id="is_reactive"
            name="is_reactive"
            checked={formData.is_reactive}
            onChange={handleChange}
          />
          Реактивный
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="last_updated_at">Дата последнего обновления:</label>
        <input
          type="date"
          id="last_updated_at"
          name="last_updated_at"
          value={formData.last_updated_at}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="tasks_type">Тип задач:</label>
        <select
          id="tasks_type"
          name="tasks_type"
          value={formData.tasks_type}
          onChange={handleChange}
          className="form-select"
        >
          {Object.values(TasksType).map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};

export default FrameworkForm;