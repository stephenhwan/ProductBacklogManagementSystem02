const createApp = require('./src/infrastructure/web/app')

const PORT = process.env.PORT || 5001

createApp()
  .then((app) => {
    app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('❌ Không thể khởi động server:', err)
    process.exit(1)
  })