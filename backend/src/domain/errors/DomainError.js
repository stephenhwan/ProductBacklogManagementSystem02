class DomainError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

class EmailAlreadyExistsError extends DomainError {
  constructor(email) {
    super(`Email "${email}" đã được sử dụng.`)
  }
}

class InvalidCredentialsError extends DomainError {
  constructor() {
    super('Email hoặc mật khẩu không đúng.')
  }
}

module.exports = { DomainError, EmailAlreadyExistsError, InvalidCredentialsError }