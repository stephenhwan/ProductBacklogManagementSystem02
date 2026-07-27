class IPasswordHasher {
  /** @returns {Promise<string>} hash */
  async hash(plainPassword) {
    throw new Error('IPasswordHasher.hash() chưa được implement.')
  }

  /** @returns {Promise<boolean>} */
  async compare(plainPassword, hash) {
    throw new Error('IPasswordHasher.compare() chưa được implement.')
  }
}

module.exports = IPasswordHasher