const { registerCommand } = require('../../application/services/auth/login/commands/registerCommand')
const { loginCommand } = require('../../application/services/auth/login/commands/loginCommand')
const { getCurrentUserQuery } = require('../../application/services/auth/currentUser/queries/getCurrentUserQuery')
const { domainError } = require('../../domain/errors/domainError')

class authController {
  /**
   * Nhận Handler đã được "ráp" sẵn (đủ repository/hasher/tokenService) từ composition root.
   * Controller không tự tạo Handler, không biết Mongo/bcrypt là gì.
   */
  constructor(registerHandler, loginHandler, getCurrentUserHandler) {
    this.registerHandler = registerHandler
    this.loginHandler = loginHandler
    this.getCurrentUserHandler = getCurrentUserHandler

    // bind để dùng trực tiếp làm route handler (this không bị mất khi Express gọi)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.me = this.me.bind(this)
  }

  async register(req, res, next) {
    try {
      const { fullName, email, password } = req.body
      const command = new registerCommand({ fullName, email, password })
      const result = await this.registerHandler.execute(command)
      return res.status(201).json(result)
    } catch (err) {
      return next(err) // đẩy qua errorHandler middleware
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const command = new loginCommand({ email, password })
      const result = await this.loginHandler.execute(command)
      return res.status(200).json(result)
    } catch (err) {
      return next(err)
    }
  }

  async me(req, res, next) {
    try {
      // req.userId được gán bởi authMiddleware (verify JWT) ở dưới
      const query = new getCurrentUserQuery({ userId: req.userId })
      const user = await this.getCurrentUserHandler.execute(query)
      return res.status(200).json(user)
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = authController