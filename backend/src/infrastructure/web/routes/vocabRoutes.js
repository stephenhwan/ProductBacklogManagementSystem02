const { Router } = require ('express')

function createVocabRoutes( vocabController, authMiddlewareInstance) {
    const router = Router()

    router.use(authMiddlewareInstance)

    router.post('/', vocabController.create)
    router.get('/', vocabController.list)
    router.get('/:slug', vocabController.getBySlug)
    router.put('/:slug', vocabController.update)
    router.delete('/:slug', vocabController.delete)
    return router
}

module.exports = createVocabRoutes



