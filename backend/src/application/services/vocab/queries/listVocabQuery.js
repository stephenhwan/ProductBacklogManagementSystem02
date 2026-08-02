class listVocabQuery {
    constructor({userId}) {
        this.userId = userId
    }
}


class listVocabHandler {
    constructor(vocabRepository) {
        this.vocabRepository = vocabRepository
    }

    async execute(query) {
        return await this.vocabRepository.findAll()
    }
}

module.exports = {listVocabQuery, listVocabHandler}