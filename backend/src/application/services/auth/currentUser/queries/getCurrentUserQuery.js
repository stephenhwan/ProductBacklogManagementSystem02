const { InvalidCredentialsError } = require('../../../../../domain/errors/domainError')

class getCurrentUserQuery {
  constructor({ userId }) {
    this.userId = userId
  }
}

class getCurrentUserHandler {
  /** @param {import('../../../../interfaces/IUserRepository')} userRepository */
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  /** @param {getCurrentUserQuery} query */
  async execute(query) {
    const user = await this.userRepository.findById(query.userId)
    if (!user) {
      throw new InvalidCredentialsError() // token hợp lệ nhưng user đã bị xoá
    }

    return { id: user.id, fullName: user.fullName, email: user.email, role: user.role }
  }
}

module.exports = { getCurrentUserQuery, getCurrentUserHandler }