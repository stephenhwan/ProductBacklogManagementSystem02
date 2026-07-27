const mongoose = require('mongoose')

async function connectDB(mongoUri) {
  if (!mongoUri) {
    throw new Error('Thiếu MONGO_URI. Kiểm tra file .env.')
  }
  await mongoose.connect(mongoUri)
  console.log('✅ Đã kết nối MongoDB.')
}

module.exports = connectDB