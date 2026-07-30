class IVocabRepository {
    async findAllByUser(userId) {
        throw new Error('IVocabRepository.findAllByUser() chưa được implement.')
    }

    async findByUserAndSlug(userId, slug) {
        throw new Error('IVocabRepository.findByUserAndSlug() chưa được implement.')
    }

    async create(vocab) {
        throw new Error('IVocabRepository.create() chưa được implement.')
    }
    async update(vocab) {
        throw new Error('IVocabRepository.update() chưa được implement.')
    }
    async delete(id) {
        throw new Error('IVocabRepository.delete() chưa được implement.')
    }
}

module.exports = IVocabRepository