import React from 'react';
import type {
  Language,
  Framework,
  DataStorage,
  ProjectRecommendedResponse
} from '../../api/types';

interface RecommendationResultProps {
  result: ProjectRecommendedResponse;
}

const RecommendationResult: React.FC<RecommendationResultProps> = ({ result }) => {
  const { language_recommended_list, framework_recommended_list, dataStorage_recommended_list } = result;

  return (
    <div className="recommendation-result">
      <h2>Рекомендованный стек технологий</h2>
      
      {language_recommended_list.length === 0 &&
       framework_recommended_list.length === 0 &&
       dataStorage_recommended_list.length === 0 ? (
        <div className="no-results">
          <p>Нет подходящих рекомендаций. Попробуйте изменить параметры поиска.</p>
        </div>
      ) : (
        <>
          <div className="recommendation-section">
            <h3>Языки программирования</h3>
            {language_recommended_list.length > 0 ? (
              <div className="cards-grid">
                {language_recommended_list.map((language: Language) => (
                  <div key={language.id} className="card language-card">
                    <h4>{language.name}</h4>
                    <div className="card-content">
                      <p><strong>Порог входа:</strong> {language.entry_threshold}</p>
                      <p><strong>Модель исполнения:</strong> {language.execution_model}</p>
                      <p><strong>Популярность:</strong> {language.popularity}</p>
                      <p><strong>Назначение:</strong> {language.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Нет рекомендаций по языкам</p>
            )}
          </div>

          <div className="recommendation-section">
            <h3>Фреймворки</h3>
            {framework_recommended_list.length > 0 ? (
              <div className="cards-grid">
                {framework_recommended_list.map((framework: Framework) => (
                  <div key={framework.id} className="card framework-card">
                    <h4>{framework.name}</h4>
                    <div className="card-content">
                      <p><strong>Языки:</strong> {framework.languages.map(l => l.name).join(', ')}</p>
                      <p><strong>Реактивный:</strong> {framework.is_reactive ? 'Да' : 'Нет'}</p>
                      <p><strong>Актуальность:</strong> {framework.is_actual ? 'Актуальный' : 'Устарел'}</p>
                      <p><strong>Тип задач:</strong> {framework.tasks_type}</p>
                      <p><strong>Обновлен:</strong> {new Date(framework.last_updated_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Нет рекомендаций по фреймворкам</p>
            )}
          </div>

          <div className="recommendation-section">
            <h3>Хранилища данных</h3>
            {dataStorage_recommended_list.length > 0 ? (
              <div className="cards-grid">
                {dataStorage_recommended_list.map((storage: DataStorage) => (
                  <div key={storage.id} className="card storage-card">
                    <h4>{storage.name}</h4>
                    <div className="card-content">
                      <p><strong>Тип хранилища:</strong> {storage.storage_type}</p>
                      <p><strong>Локация:</strong> {storage.storage_location}</p>
                      <p><strong>Тип БД:</strong> {storage.data_base_type}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Нет рекомендаций по хранилищам</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationResult;