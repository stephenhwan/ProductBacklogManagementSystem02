class User {
  constructor({ id, fullName, email, passwordHash }) {
    this.id = id
    this.fullName = fullName
    this.email = email
    this.passwordHash = passwordHash // đã hash rồi, entity không tự hash
  }
}
module.exports = User