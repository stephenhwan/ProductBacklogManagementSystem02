const jwt = require('jsonwebtoken')
const ITokenService = require('../../application/interfaces/ITokenService')

class JwtTokenService extends ITokenService {
  
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
      { sub: user.id, email: user.email, fullName: user.fullName, role: user.role },
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