const User = require('../../domain/entities/User')

class userMapper {
  /** Mongoose document -> domain Entity */
  static toDomain(doc) {
    if (!doc) return null
    return new User({
      id: doc._id.toString(),
      fullName: doc.fullName,
      email: doc.email,
      passwordHash: doc.passwordHash,
    })
  }

  /** domain Entity -> plain object để lưu vào Mongoose */
  static toPersistence(user) {
    return {
      fullName: user.fullName,
      email: user.email,
      passwordHash: user.passwordHash,
    }
  }
}

module.exports = userMapper