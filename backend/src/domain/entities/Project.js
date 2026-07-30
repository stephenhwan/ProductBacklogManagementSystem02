class Project {
    constructor({
        id,
        name,
        description,
        position,
        createdAt,
        updatedAt
    }){
        this.id = id
        this.name = name
        this.description = description
        this.position = position
        this.createdAt = createdAt
        this.updateAt = updatedAt 
    }
}

module.exports = Project