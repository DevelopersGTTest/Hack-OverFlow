const bcrypt = require('bcrypt')

//Revisar porque se perde el valor del post
class Users{

    constructor(db){
        this.db = db
        this.ref = this.db.ref('/')
        this.collection = this.ref.child('users')
    }

    //Resiviendo en Bruto la data de todo el usuario
    async create(data){
        data.password = await this.constructor.encript(data.password)
        const newUser = this.collection.push()
        newUser.set(data)
        
        return newUser.key
    }

    //Encriptando la data
    static async encript(password){
        const saltRounds = 10
        const hashedPass = await bcrypt.hash(password, saltRounds)

        return hashedPass;
    }
}

module.exports = Users