require('dotenv').config()
const express = require('express')
const cors = require('cors')

// domain/application đều được "ráp" ở đây — đây là nơi duy nhất trong app
// biết tới TẤT CẢ các lớp (Mongo, bcrypt, jwt, Express).
const connectDB = require('../database/db')
const mongoUserRepository = require('../../adapters/repositories/mongoUserRepository')
const BcryptPasswordHasher = require('../security/BcryptPasswordHasher')
const JwtTokenService = require('../security/JwtTokenService')

const { registerHandler } = require('../../application/services/auth/register/commands/registerCommand')
const { loginHandler } = require('../../application/services/auth/login/commands/loginCommand')
const { getCurrentUserHandler } = require('../../application/services/auth/currentUser/queries/getCurrentUserQuery')

const authController = require('../../adapters/controllers/authController')
const authMiddleware = require('./middlewares/authMiddleware')
const errorHandler = require('./middlewares/errorHandler')
const createAuthRoutes = require('./routes/authRoutes')

async function createApp() {
  await connectDB(process.env.MONGO_URI)

  // ---- Ráp infrastructure ----
  const userRepository = new mongoUserRepository()
  const passwordHasher = new BcryptPasswordHasher()
  const tokenService = new JwtTokenService(process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN || '2h')

  // ---- Ráp application handlers ----
  const RegisterHandler = new registerHandler(userRepository, passwordHasher, tokenService)
  const LoginHandler = new loginHandler(userRepository, passwordHasher, tokenService)
  const GetCurrentUserHandler = new getCurrentUserHandler(userRepository)

  // ---- Ráp adapters ----
  const AuthController = new authController(RegisterHandler, LoginHandler, GetCurrentUserHandler)
  const authMiddlewareInstance = authMiddleware(tokenService)

  // ---- Express app ----
  const app = express()
  app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }))
  app.use(express.json())

  app.use('/api/auth', createAuthRoutes(AuthController, authMiddlewareInstance))

  app.use(errorHandler) // luôn đặt cuối cùng

  return app
}

module.exports = createApp