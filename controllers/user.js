
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

module.exports = {
    createUser: createUser
}