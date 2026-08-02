import { defineStore } from 'pinia'
import AuthService from '../services/AuthService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isReady: false, // becomes true once we've checked for an existing session
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    role: (state) => state.user?.role || null,
    isAdmin: (state) => state.user?.role === 'admmin',
    currentUserId: (state) => state.user?.id || null,
  },

  actions: {
    /** Call once on app startup to restore a session from localStorage. */
    async init() {
      this.isLoading = true
      try {
        const session = await AuthService.getSession()
        if (session) {
          this.user = session.user
          this.token = session.token
        }
      } finally {
        this.isLoading = false
        this.isReady = true
      }
    },

    async register(payload) {
      this.isLoading = true
      this.error = null
      try {
        const { user, token } = await AuthService.register(payload)
        this.user = user
        this.token = token
        return true
      } catch (err) {
        this.error = err.message || 'Đăng ký thất bại.'
        return false
      } finally {
        this.isLoading = false
      }
    },

    async login(payload) {
      this.isLoading = true
      this.error = null
      try {
        const { user, token } = await AuthService.login(payload)
        this.user = user
        this.token = token
        return true
      } catch (err) {
        this.error = err.message || 'Đăng nhập thất bại.'
        return false
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      await AuthService.logout()
      this.user = null
      this.token = null
    },

    clearError() {
      this.error = null
    },
  },
})

export default useAuthStore