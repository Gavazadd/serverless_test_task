class UserService {
    async registration (){
       return 'Registration working'
    }

    async login() {
        return 'Login working'
    }
}

module.exports = new UserService()