require('dotenv').config()
const express = require('express')
const cors = require('cors')

// domain/application đều được "ráp" ở đây — đây là nơi duy nhất trong app
// biết tới TẤT CẢ các lớp (Mongo, bcrypt, jwt, Express).
const connectDB = require('../database/db')
const MongoUserRepository = require('../../adapters/repositories/mongoUserRepository')
const BcryptPasswordHasher = require('../security/BcryptPasswordHasher')
const JwtTokenService = require('../security/JwtTokenService')

const { RegisterHandler } = require('../../application/services/auth/commands/registerCommand')
const { LoginHandler } = require('../../application/services/auth/commands/loginCommand')
const { GetCurrentUserHandler } = require('../../application/services/auth/queries/GetCurrentUserQuery')

const authController = require('../../adapters/controllers/authController')
const authMiddleware = require('./middlewares/authMiddleware')
const errorHandler = require('./middlewares/errorHandler')
const createAuthRoutes = require('./routes/authRoutes')

async function createApp() {
  await connectDB(process.env.MONGO_URI)

  // ---- Ráp infrastructure ----
  const userRepository = new MongoUserRepository()
  const passwordHasher = new BcryptPasswordHasher()
  const tokenService = new JwtTokenService(process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN || '2h')

  // ---- Ráp application handlers ----
  const registerHandler = new RegisterHandler(userRepository, passwordHasher, tokenService)
  const loginHandler = new LoginHandler(userRepository, passwordHasher, tokenService)
  const getCurrentUserHandler = new GetCurrentUserHandler(userRepository)

  // ---- Ráp adapters ----
  const authController = new authController(registerHandler, loginHandler, getCurrentUserHandler)
  const authMiddlewareInstance = authMiddleware(tokenService)

  // ---- Express app ----
  const app = express()
  app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }))
  app.use(express.json())

  app.use('/api/auth', createAuthRoutes(authController, authMiddlewareInstance))

  app.use(errorHandler) // luôn đặt cuối cùng

  return app
}

module.exports = createApp