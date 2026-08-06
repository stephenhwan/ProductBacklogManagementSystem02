class listVocabQuery {
    constructor({userId, page, limit }) {
        this.userId = userId
        this.page = page
        this.limit = limit
    }
}


class listVocabHandler {
    constructor(vocabRepository) {
        this.vocabRepository = vocabRepository
    }

    async execute(query) {
        return await this.vocabRepository.findAll({ page: query.page, limit: query.limit })
    }
}

module.exports = {listVocabQuery, listVocabHandler}