class domainError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}

class EmailAlreadyExistsError extends domainError {
  constructor(email) {
    super(`Email "${email}" đã được sử dụng.`)
  }
}

class InvalidCredentialsError extends domainError {
  constructor() {
    super('Email hoặc mật khẩu không đúng.')
  }
}

module.exports = { domainError, EmailAlreadyExistsError, InvalidCredentialsError }