const questions = require('../models/index').questions

//Ruta de home
const home = async (req, h)=>{
    let data
    try {
        data = await questions.getLast(10)
    } catch (error) {
        console.error(`
            Existe un error y es ${error}
        `)
    }
    return h.view('index', {
        title: 'home',
        user: req.state.user,
        questions: data
      })
}

//Definiendo ruta del register
const register = (req, h)=>{
    if(req.state.user){
        return h.redirect('/')
    }
    return h.view('register', {
        title: 'registro',
        user: req.state.user
    })
}

//Definiendo la ruta del Login
const login = (req, h)=>{
    if(req.state.user){
        return h.redirect('/')
    }
    return h.view('login', {
        title: 'Login',
        user: req.state.user
    })
}


const ask = (req, h)=> {
    if (!req.state.user) {
      return h.redirect('/login')
    }
  
    return h.view('ask', {
      title: 'Crear pregunta',
      user: req.state.user
    })
  }

  const viewQuestion = async (req, h)=>{
    let data
    try {
        data = await questions.getOne(req.params.id)
        if(!data){
            return h.view('index', {
                title: 'home',
                user: req.state.user,
                questions: data
            })    
        }
        //alert(`No se encontro nada ${data}`)
    } catch (error) {
        console.error(error)
    }

    return h.view('question', {
      title: 'Detalles de pregunta',
      user: req.state.user,
      question: data,         //La data ya obtenida
      key: req.params.id      //El id que viene como parametros
    })
  }
  

module.exports = {
    ask: ask,
    home: home,
    login: login,
    register: register,
    viewQuestion: viewQuestion
  }
