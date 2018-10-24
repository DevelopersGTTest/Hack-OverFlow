
const users = require('../models/index').users

const createUser = async (req, h)=>{
    let result
    try {
        result = await users.create(req.payload)
    } catch (error) {
        console.error(error)
        return h.view('register', {
            title: 'Registrar',
            error: 'No se pudo crear el usuario' 
        })
    }

    return h.redirect('/login')
}

const logout = (req, h)=>{
    return h.redirect('/login').unstate('user')
}

const validateUser = async (req, h)=>{
    let result
    try {
        result = await users.validateUser(req.payload)
        if(!result){
            return h.view('login', {
                title: 'login',
                error: 'Usuario o contraseña incorrecta'
            })
        }
    } catch (error) {
        console.error(error)
        return h.view('login', {
              title: 'login',
              error: 'Error al validar el usuario' 
        })  
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