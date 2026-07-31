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

class VocabNotFoundError extends domainError {
  constructor(){
    super('vocab not found')
  }
}

class VocabSlugAlreadyExistsError extends domainError {
  constructor(slug) {
    super(' word "${slug}" is existed in list ')

  }
}

class ForbiddenVocabAccessError extends domainError {
  constructor() {
    super (' not you thao tác với word this')
  }
}
module.exports = { domainError, EmailAlreadyExistsError, InvalidCredentialsError, VocabSlugAlreadyExistsError, VocabNotFoundError, ForbiddenVocabAccessError }