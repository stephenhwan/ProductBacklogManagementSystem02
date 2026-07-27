const mongoose = require('mongoose')

// Chỉ định nghĩa CẤU TRÚC lưu trong MongoDB. Không có business logic ở đây,
// business logic nằm ở application/services/auth (Handler).
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }, // tự thêm createdAt, updatedAt
)

module.exports = mongoose.model('User', userSchema)