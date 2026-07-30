class IMemberProjectRepository {

    async create(memberProject) {
        throw new Error('IMemberProjectRepository.create() chưa được implement.')
    }
    
    /** Tìm bản ghi thành viên của 1 user trong 1 project cụ thể. @returns {Promise<MemberProject|null>} */
    async findByUserAndProject(userId, projectId) {
        throw new Error('IMemberProjectRepository.findByUserAndProject() chưa được implement.')
    }
    
    /** Tất cả project mà user tham gia (owner hoặc member). @returns {Promise<MemberProject[]>} */
    async findByUser(userId) {
        throw new Error('IMemberProjectRepository.findByUser() chưa được implement.')
    }
}

module.exports = IMemberProjectRepository