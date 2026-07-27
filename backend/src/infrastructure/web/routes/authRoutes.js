const { Router } = require('express')

/**
 * @param {import('../../../adapters/controllers/authController')} authController
 * @param {Function} authMiddlewareInstance - middleware verify JWT đã được tạo sẵn (có tokenService bên trong)
 */
function createAuthRoutes(authController, authMiddlewareInstance) {
  const router = Router()

  router.post('/register', authController.register)
  router.post('/login', authController.login)
  router.get('/me', authMiddlewareInstance, authController.me)

  return router
}

module.exports = createAuthRoutes