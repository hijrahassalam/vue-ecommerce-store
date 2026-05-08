import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'https://laravel-ecommerce-api-production.up.railway.app/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const sessionId = localStorage.getItem('cart_session_id')
  if (sessionId) config.headers['X-Session-ID'] = sessionId
  return config
})

export function ensureSession() {
  let sessionId = localStorage.getItem('cart_session_id')
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2) + Date.now()
    localStorage.setItem('cart_session_id', sessionId)
  }
  return sessionId
}

export default api
