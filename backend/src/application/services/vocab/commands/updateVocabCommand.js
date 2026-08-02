const { VocabNotFoundError , VocabSlugAlreadyExistsError } = require('../../../../domain/errors/domainError')


const slugify = require ('../../../../shared/slugify')


class updateVocabCommand {
    constructor ({
        userId,
        currentSlug,
        firstLanguage,
        secondLanguage,
        definition
    }) {
        this.userId = userId
        this.currentSlug = currentSlug
        this.firstLanguage = firstLanguage
        this.secondLanguage = secondLanguage
        this.definition = definition

    }
}

class updateVocabHandler {
    constructor(vocabRepository) {
        this.vocabRepository = vocabRepository
    }

    async execute(command) {
        const vocab = await this.vocabRepository.findByUserAndSlug(command.userId, command.currentSlug)
        if (!vocab) {
            throw new VocabNotFoundError()
        }
        const newSlug = slugify(command.firstLanguage)

        if (newSlug !== vocab.slug) {
            const clash = await this.vocabRepository.findByUserAndSlug(vocab.userId, newSlug)
            if (clash) {
            throw new VocabSlugAlreadyExistsError(newSlug)
            }
        }
        vocab.firstLanguage = command.firstLanguage
        vocab.secondLanguage = command.secondLanguage
        vocab.definition = command.definition
        vocab.slug = newSlug

        return await this.vocabRepository.update(vocab)
    }   
}

module.exports = { updateVocabCommand, updateVocabHandler}