export const BACKEND_BASE_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_SERVER_HOST
  : 'http://localhost:5001'
