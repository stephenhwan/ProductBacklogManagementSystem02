require('dotenv').config()
const express = require('express')
const cors = require('cors')
// const compression = require('compression')
// domain/application đều được "ráp" ở đây — đây là nơi duy nhất trong app
// biết tới TẤT CẢ các lớp (Mongo, bcrypt, jwt, Express).
const connectDB = require('../database/db')
const mongoUserRepository = require('../repositories/mongoUserRepository')
const mongoVocabRepository = require('../repositories/mongoVocabRepository')  
const BcryptPasswordHasher = require('../security/BcryptPasswordHasher')
const JwtTokenService = require('../security/JwtTokenService')

const { registerHandler } = require('../../application/services/auth/register/commands/registerCommand')
const { loginHandler } = require('../../application/services/auth/login/commands/loginCommand')
const { getCurrentUserHandler } = require('../../application/services/auth/currentUser/queries/getCurrentUserQuery')

const { createVocabHandler } = require('../../application/services/vocab/commands/createVocabCommand')     
const { updateVocabHandler } = require('../../application/services/vocab/commands/updateVocabCommand')  
const { deleteVocabHandler } = require('../../application/services/vocab/commands/deleteVocabCommand')    
const { listVocabHandler } = require('../../application/services/vocab/queries/listVocabQuery')            
const { getVocabBySlugHandler } = require('../../application/services/vocab/queries/getVocabBySlugQuery') 

const authController = require('../../adapters/controllers/authController')
const vocabController = require('../../adapters/controllers/vocabController')

const authMiddleware = require('./middlewares/authMiddleware')
const errorHandler = require('./middlewares/errorHandler')

const createAuthRoutes = require('./routes/authRoutes')
const createVocabRoutes = require('./routes/vocabRoutes')   

async function createApp() {
  await connectDB(process.env.MONGO_URI)

  // ---- Ráp infrastructure ----
  const userRepository = new mongoUserRepository()
  const vocabRepository = new mongoVocabRepository()    
  const passwordHasher = new BcryptPasswordHasher()
  const tokenService = new JwtTokenService(process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN || '2h')

  // ---- Ráp application handlers ----
  const RegisterHandler = new registerHandler(userRepository, passwordHasher, tokenService)
  const LoginHandler = new loginHandler(userRepository, passwordHasher, tokenService)
  const GetCurrentUserHandler = new getCurrentUserHandler(userRepository)

  const CreateVocabHandler = new createVocabHandler(vocabRepository)
  const UpdateVocabHandler = new updateVocabHandler(vocabRepository)
  const DeleteVocabHandler = new deleteVocabHandler(vocabRepository)
  const ListVocabHandler = new listVocabHandler(vocabRepository)
  const GetVocabBySlugHandler = new getVocabBySlugHandler(vocabRepository)

  // ---- Ráp adapters ----
  const AuthController = new authController(
    RegisterHandler, 
    LoginHandler, 
    GetCurrentUserHandler)

  const VocabController = new vocabController(                              
    CreateVocabHandler,
    UpdateVocabHandler,
    DeleteVocabHandler,
    ListVocabHandler,
    GetVocabBySlugHandler,
  )
  const authMiddlewareInstance = authMiddleware(tokenService)

  // ---- Express app ----
  const app = express()
  app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }))
  app.use(express.json())
  // app.use(compression())

  app.use('/api/auth', createAuthRoutes(AuthController, authMiddlewareInstance))
  app.use('/api/vocabs', createVocabRoutes(VocabController, authMiddlewareInstance))
  
  app.use(errorHandler) // luôn đặt cuối cùng

  return app
}

module.exports = createApp