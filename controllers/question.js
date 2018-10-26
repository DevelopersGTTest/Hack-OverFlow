const questions = require('../models/index').questions

const createQuestion = async (req, h)=> {
  let result
  try {
    result = await questions.create(req.payload, req.state.user)
    console.log(`Pregunta creada con el ID ${result}`)
  } catch (error) {
    console.error(`Ocurrio un error: ${error}`)

    return h.view('ask', {
      title: 'Crear pregunta',
      error: 'Problemas creando la pregunta'
    })
  }

  return h.response(`Pregunta creada con el ID ${result}`)
}

module.exports = {
  createQuestion: createQuestion
}
