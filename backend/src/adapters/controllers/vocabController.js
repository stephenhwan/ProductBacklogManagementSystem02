const { createVocabCommand } = require('../../application/services/vocab/commands/createVocabCommand')
const { updateVocabCommand } = require('../../application/services/vocab/commands/updateVocabCommand')
const { deleteVocabCommand } = require('../../application/services/vocab/commands/deleteVocabCommand')
const { listVocabQuery } = require('../../application/services/vocab/queries/listVocabQuery')
const { getVocabBySlugQuery } = require('../../application/services/vocab/queries/getVocabBySlugQuery')

class vocabController {

    constructor(
        createVocabHandler,
        updateVocabHandler,
        deleteVocabHandler,
        listVocabHandler,
        getVocabBySlugHandler
    ){
        this.createVocabHandler = createVocabHandler
        this.updateVocabHandler = updateVocabHandler
        this.deleteVocabHandler = deleteVocabHandler
        this.listVocabHandler = listVocabHandler
        this.getVocabBySlugHandler = getVocabBySlugHandler

        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
        this.list = this.list.bind(this)
        this.getBySlug = this.getBySlug.bind(this)
    }

    async create(req, res, next) {
        try {
            const { firstLanguage, secondLanguage, definition } = req.body
            const command = new createVocabCommand({ userId: req.userId, firstLanguage, secondLanguage, definition })
            const result = await this.createVocabHandler.execute(command)
            return res.status(201).json(result)
        } catch(err) {
            return next(err)
        }
    }

    async list(req,res,next) {
        try {
            const query = new listVocabQuery({userId: req.userId})
            const result = await this.listVocabHandler.execute(query)
            return res.status(200).json(result)
        } catch (err) {
            return next(err)
        }
    }
    
    async getBySlug( req, res, next) {
        try {
            const query = new getVocabBySlugQuery({userId: req.userId, slug: req.params.slug})
            const result = await this.getVocabBySlugHandler.execute(query)
            return res.status(200).json(result)
        } catch (err) {
            return next(err)
        }
    }

    async update( req, res, next) {
        try {
            const { firstLanguage, secondLanguage, definition } = req.body
            const command = new updateVocabCommand({
                userId: req.userId,
                role: req.userRole,
                currentSlug: req.params.slug,
                firstLanguage,
                secondLanguage,
                definition,
            })
            const result = await this.updateVocabHandler.execute(command)
            return res.status(200).json(result)
        } catch(err) {
            return next(err)
        }
    }

    async delete( req, res, next) {
        try {
            const command = new deleteVocabCommand({ userId: req.userId, role: req.userRole, slug: req.params.slug})
            await this.deleteVocabHandler.execute(command)
            return res.status(204).send()
        } catch (err) {
            return next (err)
        }
    }
}
module.exports = vocabController