const { InvalidCredentialsError } = require('../../../../../domain/errors/domainError')

class LoginCommand {
  constructor({ email, password }) {
    this.email = email
    this.password = password
  }
}

class loginHandler {
  /**
   * @param {import('../../../../interfaces/IUserRepository')} userRepository
   * @param {import('../../../../interfaces/IPasswordHasher')} passwordHasher
   * @param {import('../../../../interfaces/ITokenService')} tokenService
   */
  constructor(userRepository, passwordHasher, tokenService) {
    this.userRepository = userRepository
    this.passwordHasher = passwordHasher
    this.tokenService = tokenService
  }

  /** @param {LoginCommand} command */
  async execute(command) {
    const user = await this.userRepository.findByEmail(command.email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isMatch = await this.passwordHasher.compare(command.password, user.passwordHash)
    if (!isMatch) {
      throw new InvalidCredentialsError()
    }

    const token = this.tokenService.generate(user)

    return {
      user: { id: user.id, fullName: user.fullName, email: user.email },
      token,
    }
  }
}

module.exports = { LoginCommand, LoginHandler }