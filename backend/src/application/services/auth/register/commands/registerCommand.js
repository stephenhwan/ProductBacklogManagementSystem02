const User = require('../../../../domain/entities/User')
const { EmailAlreadyExistsError } = require('../../../../domain/errors/domainError')

/**
 * RegisterCommand - chỉ chứa dữ liệu đầu vào, không có logic.
 */
class RegisterCommand {
  constructor({ fullName, email, password }) {
    this.fullName = fullName
    this.email = email
    this.password = password
  }
}

/**
 * RegisterHandler - logic đăng ký thật.
 * Phụ thuộc vào 3 interface (không phụ thuộc Mongoose, bcrypt, jsonwebtoken trực tiếp).
 */
class registerHandler {
  /**
   * @param {import('../../../interfaces/IUserRepository')} userRepository
   * @param {import('../../../interfaces/IPasswordHasher')} passwordHasher
   * @param {import('../../../interfaces/ITokenService')} tokenService
   */
  constructor(userRepository, passwordHasher, tokenService) {
    this.userRepository = userRepository
    this.passwordHasher = passwordHasher
    this.tokenService = tokenService
  }

  /** @param {RegisterCommand} command */
  async execute(command) {
    const existing = await this.userRepository.findByEmail(command.email)
    if (existing) {
      throw new EmailAlreadyExistsError(command.email)
    }

    const passwordHash = await this.passwordHasher.hash(command.password)

    const newUser = new User({
      id: null, // repository sẽ gán id thật sau khi lưu vào DB
      fullName: command.fullName,
      email: command.email,
      passwordHash,
    })

    const savedUser = await this.userRepository.create(newUser)
    const token = this.tokenService.generate(savedUser)

    // Không bao giờ trả passwordHash ra ngoài
    return {
      user: { id: savedUser.id, fullName: savedUser.fullName, email: savedUser.email },
      token,
    }
  }
}

module.exports = { RegisterCommand, RegisterHandler }