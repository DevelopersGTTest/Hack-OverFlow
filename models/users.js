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

    //Validando login
    async validateUser (data){
        const userQuery = await this.collection.orderByChild('email').equalTo(data.email).once('value')
        const userFound = userQuery.val()
        if(userFound){
            const userId = Object.keys(userFound)[0]
            const passwdRight = await bcrypt.compare(data.password, userFound[userId].password)
            const result = (passwdRight) ? userFound[userId] : false

            return result
        }
        return false
    }

    
    //Encriptando la data
    static async encript(password){
        const saltRounds = 10
        const hashedPass = await bcrypt.hash(password, saltRounds)

        return hashedPass;
    }
}

module.exports = Users