
const question = require('../models/index').questions

const setAnswerRight = async (questionId, answerId, user )=>{
    let result
    try {
        result = await question.setAnswerRight(questionId, answerId, user)
        console.log(`El resultado des esta operacion es ${result}`)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    setAnswerRight: setAnswerRight    
}