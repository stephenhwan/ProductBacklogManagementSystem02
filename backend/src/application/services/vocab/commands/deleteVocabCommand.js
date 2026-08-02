const { VocabNotFoundError } = require('../../../../domain/errors/domainError')

class deleteVocabCommand {
    constructor({
        userId,
        slug,
        role
    }){
        this.userId = userId
        this.role = role
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
        const isOwner = vocab.userId === command.userId
        const isAdmin = command.role === 'admin'
        if (!isOwner && !isAdmin) {
            throw new ForbiddenVocabAccessError()
        }
        await this.vocabRepository.delete(vocab.id)
    }
}

module.exports = { deleteVocabCommand, deleteVocabHandler}

