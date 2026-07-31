const { VocabNotFoundError } = require('../../../../domain/errors/domainError')

class getVocabBySlugQuery {
    constructor ({userId, slug}) {
        this.userId = userId
        this.slug = slug
    }
}

class getVocabBySlugHandler {
    constructor(vocabRepository) {
        this.vocabRepository = vocabRepository
    }

    async execute(query) {
        const vocab = await this.vocabRepository.findByUserAndSlug(query.userId, query.slug)
        if(!vocab) {
            throw new VocabNotFoundError()
        }
        return vocab
    }
}

module.exports = { getVocabBySlugQuery, getVocabBySlugHandler}