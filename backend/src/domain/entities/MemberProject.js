const ROLES = Object.freeze({
    OWNER: 'owner',
    MEMBER: 'member',
})

class MemberProject {
    constructor ({
        id,
        userId,
        projectId,
        role = ROLES.MEMBER,
        position
    })
    {
        this.id = id
        this.userId = userId
        this.projectId = projectId
        this.role = role
        this.position = position
    }
}
MemberProject.ROLES = ROLES
module.exports = MemberProject