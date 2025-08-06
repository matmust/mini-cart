const API_BASE_URL = 'https://dummyjson.com';

export const apiRequest = async <T>(endpoint: string): Promise<T> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API Error: ${error.message}`);
    }
    throw new Error('Unknown error occurred');
  }
};
