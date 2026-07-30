const mongoose = require('mongoose')

const memberProjectSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
        role: { type: String, enum: ['owner', 'member'], default: 'member' },
        position: { type: Number, default: 0 },
     },
    { timestamps: true },
)

memberProjectSchema.index({userId: 1, projectId: 1}, {unique: true})

module.exports = mongoose.model('MemberProject', memberProjectSchema)