/**
 * Middleware xác thực Bearer token.
 * Nhận tokenService (ITokenService) qua factory function -> không hardcode implementation.
 */
function authMiddleware(tokenService) {
  return (req, res, next) => {
    const header = req.headers.authorization // 

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Thiếu hoặc sai định dạng token.' })
    }

    const token = header.slice('Bearer '.length)

    try {
      const payload = tokenService.verify(token)
      req.userId = payload.sub // gán lại cho controller dùng ở req.userId
      return next()
    } catch {
      return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' })
    }
  }
}

module.exports = authMiddleware