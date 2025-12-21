/import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { 
  ProjectFormData, 
  ExpertSystemResponse, 
  RuleExecutionLog, 
  TechnologyRecommendation,
  Technology,
  ApiError
} from './types';

const API_BASE_URL = '/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 секунд таймаут
    });

    // Перехватчик ошибок
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        if (error.response) {
          const apiError = error.response.data;
          throw new Error(apiError.message || 'Произошла ошибка на сервере');
        } else if (error.request) {
          throw new Error('Нет ответа от сервера. Проверьте подключение.');
        } else {
          throw new Error('Ошибка при настройке запроса');
        }
      }
    );
  }

async analyzeProject(projectData: ProjectFormData): Promise<ExpertSystemResponse> {
  const response: AxiosResponse<ExpertSystemResponse> = await this.api.post(
    '/stack-advisor/analyze', 
    projectData
  );
  
  // Гарантируем что recommendations всегда будет массивом
  const data = response.data;
  if (data.recommendations && !Array.isArray(data.recommendations)) {
    data.recommendations = [];
  }
  
  return data;
}

  async getExplanation(sessionId: string): Promise<RuleExecutionLog[]> {
    const response: AxiosResponse<RuleExecutionLog[]> = await this.api.get(
      `/stack-advisor/explanation/${sessionId}`
    );
    return response.data;
  }

  async getRecommendations(sessionId: string): Promise<TechnologyRecommendation[]> {
    const response: AxiosResponse<TechnologyRecommendation[]> = await this.api.get(
      `/stack-advisor/recommendations/${sessionId}`
    );
    return response.data;
  }

  async getAllTechnologies(): Promise<Technology[]> {
    const response: AxiosResponse<Technology[]> = await this.api.get('/stack-advisor/technologies');
    return response.data;
  }
}

export const apiService = new ApiService();