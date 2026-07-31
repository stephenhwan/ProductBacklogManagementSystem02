class Vocab {
    constructor({
        id,
        userId,
        firstLanguage,
        secondLanguage,
        definition,
        slug,
        createdAt,
        updatedAt

    }){
        this.id = id
        this.userId = userId
        this.firstLanguage = firstLanguage
        this.secondLanguage = secondLanguage
        this.definition = definition
        this.slug = slug 
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

module.exports = Vocab