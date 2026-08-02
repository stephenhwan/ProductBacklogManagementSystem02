const { InvalidCredentialsError } = require('../../../../../domain/errors/domainError')

class loginCommand {
  constructor({ email, password }) {
    this.email = email
    this.password = password
  }
}

class loginHandler {
  constructor(userRepository, passwordHasher, tokenService) {
    this.userRepository = userRepository
    this.passwordHasher = passwordHasher
    this.tokenService = tokenService
  }


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
      user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role   },
      token,
    }
  }
}

module.exports = { loginCommand, loginHandler }