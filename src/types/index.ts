// Пример интерфейсов для работы с сервером
export type Item = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateItemDto {
  title: string;
  description: string;
  price: number;
  category: string;
}

export interface UpdateItemDto extends Partial<CreateItemDto> {}