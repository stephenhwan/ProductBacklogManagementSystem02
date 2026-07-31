const { VocabNotFoundError } = require('../../../../domain/errors/domainError')

class deleteVocabCommand {
    constructor({
        userId,
        slug
    }){
        this.userId = userId
        this.slug = slug
    }
}

class deleteVocabHandler {
    constructor(vocabRepository) {
        this.vocabRepository = vocabRepository
    }
    async execute(command) {
        const vocab = await this.vocabRepository.findByUserAndSlug(command.userId, command.slug)
        if(!vocab)
        {
            throw new VocabNotFoundError()
        }
        await this.vocabRepository.delete(vocab.id)
    }
}

module.exports = { deleteVocabCommand, deleteVocabHandler}

