import React, { useState } from 'react';
import type { LanguageCreatingRequest } from '../../api/types';
import {  EntryThreshold,
  ExecutionModel,
  Popularity,
  Purpose
} from '../../api/types'

interface LanguageFormProps {
  onSubmit: (data: LanguageCreatingRequest) => void;
  onCancel?: () => void;
  initialData?: Partial<LanguageCreatingRequest>;
  isVisible: boolean;
}

const LanguageForm: React.FC<LanguageFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isVisible
}) => {
  const [formData, setFormData] = useState<LanguageCreatingRequest>({
    name: initialData?.name || '',
    entry_threshold: initialData?.entry_threshold || EntryThreshold.MEDIUM,
    execution_model: initialData?.execution_model || ExecutionModel.COMPILED,
    popularity: initialData?.popularity || Popularity.ACTUAL,
    purpose: initialData?.purpose || Purpose.WEB_BACKEND,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <form className="language-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Название языка:</label>
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
        <label htmlFor="entryThreshold">Порог входа:</label>
        <select
          id="entryThreshold"
          name="entryThreshold"
          value={formData.entry_threshold}
          onChange={handleChange}
          className="form-select"
        >
          {Object.values(EntryThreshold).map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="executionModel">Модель исполнения:</label>
        <select
          id="executionModel"
          name="executionModel"
          value={formData.execution_model}
          onChange={handleChange}
          className="form-select"
        >
          {Object.values(ExecutionModel).map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="popularity">Популярность:</label>
        <select
          id="popularity"
          name="popularity"
          value={formData.popularity}
          onChange={handleChange}
          className="form-select"
        >
          {Object.values(Popularity).map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="purpose">Назначение:</label>
        <select
          id="purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          className="form-select"
        >
          {Object.values(Purpose).map(value => (
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

export default LanguageForm;