const Vocab = require ('../../../../domain/entities/Vocab')
const { VocabSlugArlreadyExistsError } = require ('../../../../domain/errors/domainError')
const slugify = require ('../../../../shared/slugify')

    class createVocabCommand {
        constructor ({
            userId,
            firstLanguage,
            secondLanguage,
            definition
        }) {
            this.userId = userId
            this.firstLanguage = firstLanguage
            this.secondLanguage = secondLanguage
            this.definition = definition
        }
    }

    class createVocabHandler {
        constructor(vocabRepository) {
            this.vocabRepository = vocabRepository
        }
        async execute(command) {
            const slug = slugify (command.firstLanguage)

            const existing = await this.vocabRepository.findByUserAndSlug(command.userId, slug) 

            if (existing) 
                throw new VocabSlugAlreadyExistsError(slug)

            const newVocab = new Vocab ({
                id: null,
                userId: command.userId,
                firstLanguage: command.firstLanguage,
                secondLanguage: command.secondLanguage,
                definition: command.definition,
                slug,
            })
            return await this.vocabRepository.create(newVocab)
        }
    }

module.exports = { createVocabCommand, createVocabHandler }