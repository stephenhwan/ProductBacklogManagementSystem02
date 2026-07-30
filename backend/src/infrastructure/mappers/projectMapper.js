const Project = require('../../domain/entities/Project')
 
class projectMapper {
  static toDomain(doc) {
    if (!doc) return null
    return new Project({
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description,
      position: doc.position,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    })
  }
 
  static toPersistence(project) {
    return {
      name: project.name,
      description: project.description,
      position: project.position,
    }
  }
}
 
module.exports = projectMapper