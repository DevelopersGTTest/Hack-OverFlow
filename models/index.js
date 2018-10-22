const firebase = require('firebase-admin')
const serviceAcount = require('../config/hackoverflow.json')


//Config Configuracion
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAcount),
    databaseURL: `https://hackoverflow-1fec8.firebaseio.com/`
})

//Init de la base de datos
const db = firebase.database()

const Users = require('./users')

module.exports = {
    users: new Users(db)
}