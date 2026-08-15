export const ENV = {
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA !== 'false', // default true
  DEMO_BYPASS_AUTH: import.meta.env.VITE_DEMO_BYPASS_AUTH !== 'false', // default true for demo presentation
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws',
};
