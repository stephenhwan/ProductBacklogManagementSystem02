const IUserRepository = require('../../application/interfaces/IUserRepository')
const userModel = require('../../infrastructure/database/mongoose/userModel')
const userMapper = require('../mappers/userMapper')

class mongoUserRepository extends IUserRepository {
  async findByEmail(email) {
    const doc = await userModel.findOne({ email: email.toLowerCase() })
    return userMapper.toDomain(doc)
  }

  async findById(id) {
    // id không hợp lệ (không phải ObjectId) -> coi như không tìm thấy, tránh crash
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) return null

    const doc = await userModel.findById(id)
    return userMapper.toDomain(doc)
  }

  async create(user) {
    const doc = await userModel.create(userMapper.toPersistence(user))
    return userMapper.toDomain(doc)
  }
}

module.exports = mongoUserRepository