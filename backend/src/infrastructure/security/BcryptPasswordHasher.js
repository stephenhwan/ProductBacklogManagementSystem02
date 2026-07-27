const bcrypt = require('bcrypt')
const IPasswordHasher = require('../../application/interfaces/IPasswordHasher')

const SALT_ROUNDS = 10

class BcryptPasswordHasher extends IPasswordHasher {
  async hash(plainPassword) {
    return bcrypt.hash(plainPassword, SALT_ROUNDS)
  }

  async compare(plainPassword, hash) {
    return bcrypt.compare(plainPassword, hash)
  }
}

module.exports = BcryptPasswordHasher