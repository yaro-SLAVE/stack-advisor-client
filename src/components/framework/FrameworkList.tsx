import React from 'react';
import type { Framework } from '../../api/types';
import {TasksType} from '../../api/types';
import '../styles/ListStyles.css';

interface FrameworkListProps {
  frameworks: Framework[];
  onEdit?: (framework: Framework) => void;
  onDelete?: (id: number) => void;
}

const FrameworkList: React.FC<FrameworkListProps> = ({ frameworks, onEdit, onDelete }) => {
  const getReactiveBadge = (isReactive: boolean) => {
    return isReactive ? (
      <span className="badge badge-success">Реактивный</span>
    ) : (
      <span className="badge badge-secondary">Нереактивный</span>
    );
  };

  const getActualBadge = (isActual: boolean) => {
    return isActual ? (
      <span className="badge badge-success">Актуальный</span>
    ) : (
      <span className="badge badge-warning">Устарел</span>
    );
  };

  const getTasksTypeBadge = (tasksType: TasksType) => {
    const colors: Record<TasksType, string> = {
      [TasksType.BACKEND]: 'primary',
      [TasksType.FRONTEND]: 'info',
      [TasksType.MOBILE]: 'danger',
      [TasksType.DESKTOP]: 'warning'
    };
    
    const labels: Record<TasksType, string> = {
      [TasksType.BACKEND]: 'Бэкенд',
      [TasksType.FRONTEND]: 'Фронтенд',
      [TasksType.MOBILE]: 'Мобильная разраотка',
      [TasksType.DESKTOP]: 'Десктопные приложения'
    };
    
    return (
      <span className={`badge badge-${colors[tasksType]}`}>
        {labels[tasksType]}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  if (frameworks.length === 0) {
    return (
      <div className="empty-state">
        <p>Нет добавленных фреймворков</p>
        <p>Добавьте первый фреймворк с помощью кнопки выше</p>
      </div>
    );
  }

  return (
    <div className="framework-list">
      <div className="list-header">
        <div className="header-item">Название</div>
        <div className="header-item">Языки</div>
        <div className="header-item">Реактивность</div>
        <div className="header-item">Обновлен</div>
        <div className="header-item">Актуальность</div>
        <div className="header-item">Тип задач</div>
        {onEdit || onDelete ? <div className="header-item">Действия</div> : null}
      </div>

      <div className="list-body">
        {frameworks.map(framework => (
          <div key={framework.id} className="list-row">
            <div className="row-item">
              <strong>{framework.name}</strong>
            </div>
            <div className="row-item">
              <div className="languages-tags">
                {framework.languages.map(language => (
                  <span key={language.id} className="language-tag">
                    {language.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="row-item">
              {getReactiveBadge(framework.is_reactive)}
            </div>
            <div className="row-item">
              {formatDate(framework.last_updated_at)}
            </div>
            <div className="row-item">
              {getActualBadge(framework.is_actual)}
            </div>
            <div className="row-item">
              {getTasksTypeBadge(framework.tasks_type)}
            </div>
            
            {(onEdit || onDelete) && (
              <div className="row-item actions">
                {onEdit && (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(framework)}
                    title="Редактировать"
                  >
                    <i className="edit-icon">✏️</i>
                  </button>
                )}
                {onDelete && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(framework.id)}
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

export default FrameworkList;