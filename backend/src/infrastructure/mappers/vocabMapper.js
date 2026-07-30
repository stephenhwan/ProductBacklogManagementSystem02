const Vocab = require ('../../domain/entities/Vocab')

class vocabMapper {
    static toDomain(doc) {
        if (!doc) return null
        return new Vocab ({
            id: doc._id.toString(),
            userId: doc.userId.toString(),
            firstLanguage: doc.firstLanguage,
            secondLanguage: doc.secondLanguage,
            definition: doc.definition,
            slug: doc.slug,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        })
    }

    static toPersistence(vocab) {
        return {
            userId: vocab.userId,
            firstLanguage: vocab.firstLanguage,
            secondLanguage: vocab.secondLanguage,
            definition: vocab.definition,
            slug: vocab.slug,
        }
    }
}
module.exports = vocabMapper