const mongoose = require ('mongoose')

const vocabSchema = new mongoose.Schema(
     {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        firstLanguage: { type: String, required: true, trim: true },
        secondLanguage: { type: String, required: true, trim: true },
        definition: { type: String, required: true, trim: true },
        slug: { type: String, required: true, trim: true, lowercase: true },
    },
    { timestamps: true },
)

vocabSchema.index({ userId: 1, slug: 1}, {unique:true})

module.exports = mongoose.model('Vocab', vocabSchema)