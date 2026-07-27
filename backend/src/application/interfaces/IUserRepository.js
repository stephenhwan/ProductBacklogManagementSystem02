class IUserRepository {
  /** @returns {Promise<User|null>} */
  async findByEmail(email) {
    throw new Error('IUserRepository.findByEmail() chưa được implement.')
  }

  /** @returns {Promise<User|null>} */
  async findById(id) {
    throw new Error('IUserRepository.findById() chưa được implement.')
  }

  /** @param {User} user @returns {Promise<User>} user đã lưu (có id) */
  async create(user) {
    throw new Error('IUserRepository.create() chưa được implement.')
  }
}

module.exports = IUserRepository