const IVocabRepository = require('../../application/interfaces/IVocabRepository')
const vocabModel =require('../database/mongoose/vocabModel')
const vocabMapper = require('../mappers/vocabMapper')

class mongoVocabRepository extends IVocabRepository {
    async findAll({ page = 1, limit = 5 } = {}) {
        const skip = (page - 1) * limit
        const [docs, total] = await Promise.all([
            vocabModel.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
            vocabModel.countDocuments({}),
        ])
        return { items: docs.map(vocabMapper.toDomain), total, page, limit }
    }
    async findAllByUser(userId) {
        const docs = await vocabModel.find({ userId }).sort({ createdAt: -1 })
        return docs.map(vocabMapper.toDomain)
    }
    async findByUserAndSlug(userId, slug) {
        const doc = await vocabModel.findOne({ userId, slug })
        return vocabMapper.toDomain(doc)
    }
    async findBySlug(slug) {
        const doc = await vocabModel.findOne({ slug })
        return vocabMapper.toDomain(doc)
    }
    async create(vocab) {
        const doc = await vocabModel.create(vocabMapper.toPersistence(vocab))
        return vocabMapper.toDomain(doc)
    }
    async update(vocab) {
        const doc = await vocabModel.findByIdAndUpdate(vocab.id, vocabMapper.toPersistence(vocab), { new: true })
        return vocabMapper.toDomain(doc)
    }
    async delete(id) {
            await vocabModel.findByIdAndDelete(id)
    }
}

module.exports = mongoVocabRepository