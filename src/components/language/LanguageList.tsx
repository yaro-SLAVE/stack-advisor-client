import React from 'react';
import type { Language } from '../../api/types';
import {
    EntryThreshold, 
    ExecutionModel, 
    Popularity, 
    Purpose
} from '../../api/types';
import '../styles/ListStyles.css';

interface LanguageListProps {
  languages: Language[];
  onEdit?: (language: Language) => void;
  onDelete?: (id: number) => void;
}

const LanguageList: React.FC<LanguageListProps> = ({ languages, onEdit, onDelete }) => {
  const getEntryThresholdBadge = (threshold: EntryThreshold) => {
    const colors = {
      [EntryThreshold.LOW]: 'success',
      [EntryThreshold.MEDIUM]: 'warning',
      [EntryThreshold.HIGH]: 'danger'
    };
    
    const labels = {
      [EntryThreshold.LOW]: 'Низкий',
      [EntryThreshold.MEDIUM]: 'Средний',
      [EntryThreshold.HIGH]: 'Высокий'
    };
    
    return (
      <span className={`badge badge-${colors[threshold]}`}>
        {labels[threshold]}
      </span>
    );
  };

  const getExecutionModelBadge = (model: ExecutionModel) => {
    const colors = {
      [ExecutionModel.COMPILED]: 'primary',
      [ExecutionModel.INTERPRETABLE]: 'info',
      [ExecutionModel.HYBRID]: 'secondary'
    };
    
    const labels = {
      [ExecutionModel.COMPILED]: 'Компилируемый',
      [ExecutionModel.INTERPRETABLE]: 'Интерпретируемый',
      [ExecutionModel.HYBRID]: 'Гибридный'
    };
    
    return (
      <span className={`badge badge-${colors[model]}`}>
        {labels[model]}
      </span>
    );
  };

  const getPopularityBadge = (popularity: Popularity) => {
    const colors = {
      [Popularity.OUT_OF_GENERAL_USE]: 'secondary',
      [Popularity.ACTUAL]: 'info',
      [Popularity.POPULAR]: 'success'
    };
    
    const labels = {
      [Popularity.OUT_OF_GENERAL_USE]: 'Вне широкого использования',
      [Popularity.ACTUAL]: 'Актуальный',
      [Popularity.POPULAR]: 'Популярный'
    };
    
    return (
      <span className={`badge badge-${colors[popularity]}`}>
        {labels[popularity]}
      </span>
    );
  };

  const getPurposeBadge = (purpose: Purpose) => {
    const colors: Record<Purpose, string> = {
        [Purpose.UNIVERSAL]: 'primary',
      [Purpose.WEB_BACKEND]: 'primary',
      [Purpose.WEB_FRONTEND]: 'info',
      [Purpose.MOBILE]: 'success',
      [Purpose.DESKTOP]: 'warning'
    };
    
    const labels: Record<Purpose, string> = {
        [Purpose.UNIVERSAL]: 'Универсальный',
      [Purpose.WEB_BACKEND]: 'Веб-бэкенд',
      [Purpose.WEB_FRONTEND]: 'Веб-фронтенд',
      [Purpose.MOBILE]: 'Мобильная',
      [Purpose.DESKTOP]: 'Десктопная'
    };
    
    return (
      <span className={`badge badge-${colors[purpose]}`}>
        {labels[purpose]}
      </span>
    );
  };

  if (languages.length === 0) {
    return (
      <div className="empty-state">
        <p>Нет добавленных языков программирования</p>
        <p>Добавьте первый язык с помощью кнопки выше</p>
      </div>
    );
  }

  return (
    <div className="language-list">
      <div className="list-header">
        <div className="header-item">Название</div>
        <div className="header-item">Порог входа</div>
        <div className="header-item">Модель исполнения</div>
        <div className="header-item">Популярность</div>
        <div className="header-item">Назначение</div>
        {onEdit || onDelete ? <div className="header-item">Действия</div> : null}
      </div>

      <div className="list-body">
        {languages.map(language => (
          <div key={language.id} className="list-row">
            <div className="row-item">
              <strong>{language.name}</strong>
            </div>
            <div className="row-item">
              {getEntryThresholdBadge(language.entry_threshold)}
            </div>
            <div className="row-item">
              {getExecutionModelBadge(language.execution_model)}
            </div>
            <div className="row-item">
              {getPopularityBadge(language.popularity)}
            </div>
            <div className="row-item">
              {getPurposeBadge(language.purpose)}
            </div>
            
            {(onEdit || onDelete) && (
              <div className="row-item actions">
                {onEdit && (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(language)}
                    title="Редактировать"
                  >
                    Редактировать
                  </button>
                )}
                {onDelete && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(language.id)}
                    title="Удалить"
                  >
                    Удалить
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

export default LanguageList;