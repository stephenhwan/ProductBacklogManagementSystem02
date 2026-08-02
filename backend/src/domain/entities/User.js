class User {
  constructor({ id, fullName, email, passwordHash, role = 'user' }) {
    this.id = id
    this.fullName = fullName
    this.email = email
    this.passwordHash = passwordHash // đã hash rồi, entity không tự hash
    this.role = role
  }
}
module.exports = User