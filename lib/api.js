
const Joi = require('joi')
const questions = require('../models/index').questions

module.exports = {
  name: 'api-rest',
  version: '1.0.0',
  async register (server, options) {
    const prefix = options.prefix || 'api'

    //Filtrando una sola respuesta
    server.route({
      method: 'GET',
      path: `/${prefix}/question/{key}`,
      options: {
        validate: {
          params: {
            key: Joi.string().required()
          }
        }
      },
      handler: async (req, h) => {
        let result
        try {
          result = await questions.getOne(req.params.key)
          if (!result) {
            return console.log( `Tienes un error ${req.params.key}`)
          }
        } catch (error) {
          return console.error(`Hubo un error buscando ${req.params.key} - ${error}`)
        }

        return result
      }
    })

    //Implementando GET/ALL
    server.route({
      method: 'GET',
      path: `/${prefix}/questions/{amount}`,
      options: {
        validate: {
          params: {
            amount: Joi.number().integer().min(1).max(20).required()
          }
        }
      },
      handler: async (req, h) => {
        let result
        try {
          result = await questions.getLast(req.params.amount)
          if (!result) {
            return console.log( `Tienes un error ${req.params.key}`)
          }
        } catch (error) {
          return console.error(`existe un ${error} dentro del CATCH`)
        }

        return result
      }
    })

    return console.log('Algo ha ido mal')
  }
}