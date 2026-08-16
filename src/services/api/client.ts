import { env } from '../../config/env';

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${env.API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
