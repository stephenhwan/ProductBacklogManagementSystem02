class Vocab {
    constructor({
        id,
        userId,
        firstLanguage,
        secondLanguage,
        definition,
        slug,
        createAt,
        updateAt

    }){
        this.id = id
        this.userId = userId
        this.firstLanguage = firstLanguage
        this.secondLanguage = secondLanguage
        this.definition = definition
        this.slug = slug 
        this.createAt = createAt
        this.updateAt = updateAt
    }
}

module.export = Vocab