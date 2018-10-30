const site = require('./controllers/site');
const user = require('./controllers/user');
const question = require('./controllers/question');

//Especialmente para validar Ambos Extremos
const joi = require('joi');

module.exports = [
{    
    method: 'GET',
    path: '/',
    handler: site.home
},
{
    method: 'GET',
    path: '/login',
    handler: site.login
},
{
    method: 'GET',
    path: '/logout',
    handler: user.logout
}, 
{
    method: 'POST',
    options: {
        validate: {
            payload: {
                email: joi.string().email().required(),
                password: joi.string().required().min(6)
            }
        }
    },
    path: '/validate-user',
    handler: user.validateUser
},
{
    method: 'GET',
    path: '/register',
    handler: site.register
},
{
    method: 'POST',
    options: {
        validate: {
            payload: {
                name: joi.string().required().min(3) ,
                email: joi.string().email().required(),
                password: joi.string().required().min(6)
            }
        }
    },
    path: '/create-user',
    handler: user.createUser
},
{
    method: 'GET',
    path: '/ask',
    handler: site.ask
},
{
    method: 'POST',
    path: '/create-question',
    handler: question.createQuestion,
    options: {
        validate: {
            payload: {
                title: joi.string().required(),
                description: joi.string().required()  
            }
        }
    }
},
{
    path: '/answer-question',
    method: 'POST',
    options: {
      validate: {
        payload: {
          answer: joi.string().required(),
          id: joi.string().required()
        },
        failAction: user.failValidation
      }
    },
    handler: question.answerQuestion
},
{
    method: 'GET',
    path :  '/question/{id}',
    handler: site.viewQuestion
},
{
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
        path: '.',
        index: ['index.html']
        }
    }
  }
]