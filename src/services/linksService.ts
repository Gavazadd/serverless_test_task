class LinksService {
    async getAll (){
        return 'getAll working'
    }

    async getById() {
        return 'getById working'
    }

    async create() {
        return 'create working'
    }

    async delete() {
        return 'delete working'
    }
}

module.exports = new LinksService()