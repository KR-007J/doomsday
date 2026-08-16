export const env = {
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA !== 'false',
  DEMO_BYPASS_AUTH: import.meta.env.VITE_DEMO_BYPASS_AUTH !== 'false',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
};
