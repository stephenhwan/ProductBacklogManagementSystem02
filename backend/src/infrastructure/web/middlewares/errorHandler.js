const { domainError, EmailAlreadyExistsError, InvalidCredentialsError } = require('../../../domain/errors/domainError')

/**
 * Middleware xử lý lỗi tập trung (đặt cuối cùng trong app.js).
 * Map DomainError -> status code phù hợp; lỗi lạ khác -> 500.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err)

  if (err instanceof EmailAlreadyExistsError) {
    return res.status(400).json({ message: err.message })
  }

  if (err instanceof InvalidCredentialsError) {
    return res.status(401).json({ message: err.message })
  }

  if (err instanceof domainError) {
    return res.status(400).json({ message: err.message })
  }

  // lỗi hệ thống thật (bug, DB sập, ...) -> không lộ chi tiết ra client
  return res.status(500).json({ message: 'Đã có lỗi xảy ra ở server. Vui lòng thử lại sau.' })
}

module.exports = errorHandler