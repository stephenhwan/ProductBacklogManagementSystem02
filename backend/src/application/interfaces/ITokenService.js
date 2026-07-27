class ITokenService {
  /** @param {User} user @returns {string} token */
  generate(user) {
    throw new Error('ITokenService.generate() chưa được implement.')
  }

  /** @param {string} token @returns {{ sub: string }} payload đã giải mã */
  verify(token) {
    throw new Error('ITokenService.verify() chưa được implement.')
  }
}

module.exports = ITokenService