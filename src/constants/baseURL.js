export const BACKEND_BASE_URL = process.env.NODE_ENV === 'production'
  ? process.env.SERVER_HOST
  : 'http://localhost:5001'

console.log('BACKEND_BASE_URL:', BACKEND_BASE_URL)
console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
console.log('process.env.SERVER_HOST:', process.env.SERVER_HOST)
