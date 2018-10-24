
//Ruta de home
const home = (req, h)=>{
    return h.view('index', {
        title: 'home',
        user: req.state.user
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

module.exports = {
    home: home,
    login: login,
    register: register
  }
