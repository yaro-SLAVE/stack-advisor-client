import React, { useState } from 'react';
import type {  DataStorageCreatingRequest } from '../../api/types';
import {StorageType,
  StorageLocation,
  DataBaseType
} from '../../api/types';

interface DataStorageFormProps {
  onSubmit: (data: DataStorageCreatingRequest) => void;
  onCancel?: () => void;
  initialData?: Partial<DataStorageCreatingRequest>;
  isVisible: boolean;
}

const DataStorageForm: React.FC<DataStorageFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isVisible
}) => {
  const [formData, setFormData] = useState<DataStorageCreatingRequest>({
    name: initialData?.name || '',
    storage_type: initialData?.storage_type || StorageType.RELATIONAL,
    storage_location: initialData?.storage_location || StorageLocation.LOCAL,
    data_base_type: initialData?.data_base_type || DataBaseType.SQL,
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
    <form className="datastorage-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Название хранилища:</label>
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
        <label htmlFor="storageType">Тип хранилища:</label>
        <select
          id="storageType"
          name="storageType"
          value={formData.storage_type}
          onChange={handleChange}
          className="form-select"
        >
          {Object.values(StorageType).map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="storageLocation">Локация хранилища:</label>
        <select
          id="storageLocation"
          name="storageLocation"
          value={formData.storage_location}
          onChange={handleChange}
          className="form-select"
        >
          {Object.values(StorageLocation).map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dataBaseType">Тип базы данных:</label>
        <select
          id="dataBaseType"
          name="dataBaseType"
          value={formData.data_base_type}
          onChange={handleChange}
          className="form-select"
        >
          {Object.values(DataBaseType).map(value => (
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

export default DataStorageForm;