
const users = require('../models/index').users

const createUser = async (req, h)=>{
    let result
    try {
        result = await users.create(req.payload)
    } catch (error) {
        console.error(error)
        return h.response(`Error Sucedio ${result}`).code(500)
    }

    return h.response(`Usuario creado ${result}`)
}

const logout = (req, h)=>{
    return h.redirect('/login').unstate('user')
}

const validateUser = async (req, h)=>{
    let result
    try {
        result = await users.validateUser(req.payload)
        if(!result){
            return h.response(`Usuario o contraseña incorrecta`).code(400)
        }
    } catch (error) {
        console.error(error)
        return h.response(`Error al validar el usuario ${result}`).code(500)
    }

    return h.redirect('/').state('user', {
        name: result.name,
        email: result.email
    })
    //return result
}

module.exports = {
    createUser: createUser,
    validateUser: validateUser,
    logout: logout
}