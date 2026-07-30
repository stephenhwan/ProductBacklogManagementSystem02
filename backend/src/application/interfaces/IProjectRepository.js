class IProjectRepository {
    async findById(id) {
        throw new Error('IProjectRepository.findById() chưa được implement.')
    }
    
    /** @param {Project} project @returns {Promise<Project>} project đã lưu (có id) */
    async create(project) {
        throw new Error('IProjectRepository.create() chưa được implement.')
    }
    
    /** @param {string[]} ids @returns {Promise<Project[]>} */
    async findByIds(ids) {
        throw new Error('IProjectRepository.findByIds() chưa được implement.')
    }
}
module.exports = IProjectRepository