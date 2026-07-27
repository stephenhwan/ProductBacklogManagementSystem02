import ApiClient from './ApiClient'

const { DB_KEYS, delay, readCollection, writeCollection, generateId, ApiError } = ApiClient

/**
 * AuthService - mock authentication backed by localStorage.
 *
 * Public API is written to mirror what a real REST-backed service would
 * look like, so swapping in real HTTP calls later only requires changing
 * the implementation of each method, not its callers.
 */

function getUsers() {
  return readCollection(DB_KEYS.USERS)
}

function saveUsers(users) {
  writeCollection(DB_KEYS.USERS, users)
}

function sanitizeUser(user) {
  if (!user) return null
  const { password, ...safeUser } = user
  return safeUser
}

function makeFakeToken(userId) {
  return `mock-token.${userId}.${Date.now()}`
}

export const AuthService = {
  /**
   * Registers a new user.
   * @param {{name: string, email: string, password: string}} payload
   * @returns {Promise<{user: object, token: string}>}
   */
  async register({ name, email, password }) {
    await delay()

    const trimmedEmail = (email || '').trim().toLowerCase()
    const trimmedName = (name || '').trim()

    if (!trimmedName || !trimmedEmail || !password) {
      throw new ApiError('Vui lòng điền đầy đủ họ tên, email và mật khẩu.')
    }
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      throw new ApiError('Địa chỉ email không hợp lệ.')
    }
    if (password.length < 6) {
      throw new ApiError('Mật khẩu phải có ít nhất 6 ký tự.')
    }

    const users = getUsers()
    const existing = users.find((u) => u.email === trimmedEmail)
    if (existing) {
      throw new ApiError('Email này đã được đăng ký. Vui lòng đăng nhập.', 409)
    }

    const newUser = {
      id: generateId(),
      name: trimmedName,
      email: trimmedEmail,
      password, // NOTE: mock only - never store plaintext passwords in a real backend
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    saveUsers(users)

    const token = makeFakeToken(newUser.id)
    const session = { token, userId: newUser.id }
    writeCollection(DB_KEYS.SESSION, session)

    return { user: sanitizeUser(newUser), token }
  },

  /**
   * Logs a user in.
   * @param {{email: string, password: string}} payload
   * @returns {Promise<{user: object, token: string}>}
   */
  async login({ email, password }) {
    await delay()

    const trimmedEmail = (email || '').trim().toLowerCase()
    if (!trimmedEmail || !password) {
      throw new ApiError('Vui lòng nhập email và mật khẩu.')
    }

    const users = getUsers()
    const user = users.find((u) => u.email === trimmedEmail)

    if (!user || user.password !== password) {
      throw new ApiError('Email hoặc mật khẩu không đúng.', 401)
    }

    const token = makeFakeToken(user.id)
    const session = { token, userId: user.id }
    writeCollection(DB_KEYS.SESSION, session)

    return { user: sanitizeUser(user), token }
  },

  /** Clears the current session. */
  async logout() {
    await delay(150)
    localStorage.removeItem(DB_KEYS.SESSION)
  },

  /**
   * Restores a session on app load (e.g. after a page refresh).
   * @returns {Promise<{user: object, token: string} | null>}
   */
  async getSession() {
    await delay(150)
    const raw = localStorage.getItem(DB_KEYS.SESSION)
    if (!raw) return null

    let session
    try {
      session = JSON.parse(raw)
    } catch {
      return null
    }

    const users = getUsers()
    const user = users.find((u) => u.id === session.userId)
    if (!user) {
      localStorage.removeItem(DB_KEYS.SESSION)
      return null
    }

    return { user: sanitizeUser(user), token: session.token }
  },
}

export default AuthService
