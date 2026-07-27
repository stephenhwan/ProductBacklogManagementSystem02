const jwt = require('jsonwebtoken')
const ITokenService = require('../../application/interfaces/ITokenService')

class JwtTokenService extends ITokenService {
  /**
   * @param {string} secret - đọc từ biến môi trường, KHÔNG hardcode
   * @param {string} expiresIn - vd: '2h'
   */
  constructor(secret, expiresIn = '2h') {
    super()
    if (!secret) {
      throw new Error('JWT secret bị thiếu. Kiểm tra biến môi trường JWT_SECRET.')
    }
    this.secret = secret
    this.expiresIn = expiresIn
  }

  generate(user) {
    // payload gọn nhẹ, không nhét passwordHash vào token
    return jwt.sign(
      { sub: user.id, email: user.email, fullName: user.fullName },
      this.secret,
      { expiresIn: this.expiresIn },
    )
  }

  verify(token) {
    // ném lỗi jwt.JsonWebTokenError / TokenExpiredError nếu token sai/hết hạn
    // -> middleware auth ở bước sau sẽ bắt lỗi này
    return jwt.verify(token, this.secret)
  }
}

module.exports = JwtTokenService