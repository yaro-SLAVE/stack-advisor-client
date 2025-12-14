import React from 'react';
import { StorageType, StorageLocation, DataBaseType } from '../../api/types';
import type { DataStorage } from '../../api/types';
import '../styles/ListStyles.css';

interface DataStorageListProps {
  dataStorages: DataStorage[];
  onEdit?: (dataStorage: DataStorage) => void;
  onDelete?: (id: number) => void;
}

const DataStorageList: React.FC<DataStorageListProps> = ({ dataStorages, onEdit, onDelete }) => {
  const getStorageTypeBadge = (type: StorageType) => {
    const colors: Record<StorageType, string> = {
      [StorageType.RELATIONAL]: 'primary',
      [StorageType.DOCUMENT]: 'info',
      [StorageType.KEY_VALUE]: 'warning'
    };
    
    const labels: Record<StorageType, string> = {
      [StorageType.RELATIONAL]: 'Реляционное',
      [StorageType.DOCUMENT]: 'Документное',
      [StorageType.KEY_VALUE]: 'Ключ-значение'
    };
    
    return (
      <span className={`badge badge-${colors[type]}`}>
        {labels[type]}
      </span>
    );
  };

  const getStorageLocationBadge = (location: StorageLocation) => {
    const colors: Record<StorageLocation, string> = {
      [StorageLocation.LOCAL]: 'secondary',
      [StorageLocation.REMOTE]: 'info'
    };
    
    const labels: Record<StorageLocation, string> = {
      [StorageLocation.LOCAL]: 'Локальное',
      [StorageLocation.REMOTE]: 'Удаленое'
    };
    
    return (
      <span className={`badge badge-${colors[location]}`}>
        {labels[location]}
      </span>
    );
  };

  const getDatabaseTypeBadge = (type: DataBaseType) => {
    const colors: Record<DataBaseType, string> = {
      [DataBaseType.SQL]: 'primary',
      [DataBaseType.NO_SQL]: 'warning'
    };
    
    const labels: Record<DataBaseType, string> = {
      [DataBaseType.SQL]: 'SQL',
      [DataBaseType.NO_SQL]: 'NoSQL'
    };
    
    return (
      <span className={`badge badge-${colors[type]}`}>
        {labels[type]}
      </span>
    );
  };

  if (dataStorages.length === 0) {
    return (
      <div className="empty-state">
        <p>Нет добавленных хранилищ данных</p>
        <p>Добавьте первое хранилище с помощью кнопки выше</p>
      </div>
    );
  }

  return (
    <div className="datastorage-list">
      <div className="list-header">
        <div className="header-item">Название</div>
        <div className="header-item">Тип хранилища</div>
        <div className="header-item">Локация</div>
        <div className="header-item">Тип БД</div>
        {onEdit || onDelete ? <div className="header-item">Действия</div> : null}
      </div>

      <div className="list-body">
        {dataStorages.map(storage => (
          <div key={storage.id} className="list-row">
            <div className="row-item">
              <strong>{storage.name}</strong>
            </div>
            <div className="row-item">
              {getStorageTypeBadge(storage.storage_type)}
            </div>
            <div className="row-item">
              {getStorageLocationBadge(storage.storage_location)}
            </div>
            <div className="row-item">
              {getDatabaseTypeBadge(storage.data_base_type)}
            </div>
            
            {(onEdit || onDelete) && (
              <div className="row-item actions">
                {onEdit && (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(storage)}
                    title="Редактировать"
                  >
                    <i className="edit-icon">✏️</i>
                  </button>
                )}
                {onDelete && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(storage.id)}
                    title="Удалить"
                  >
                    <i className="delete-icon">🗑️</i>
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataStorageList;