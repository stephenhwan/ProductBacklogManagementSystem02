/**
 * ApiClient - mock API layer backed by localStorage.
 */

const LATENCY_MS = 350

const DB_KEYS = {
  USERS: 'pbms_db_users',
  SESSION: 'pbms_session',
}

function delay(ms = LATENCY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function readCollection(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeCollection(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

class ApiError extends Error {
  constructor(message, status = 400) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export const ApiClient = {
  DB_KEYS,
  delay,
  readCollection,
  writeCollection,
  generateId,
  ApiError,
}

export default ApiClient