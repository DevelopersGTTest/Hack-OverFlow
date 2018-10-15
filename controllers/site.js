
//Ruta de home
const home = (req, h)=>{
    return h.view('index', {
        title: 'home'
      })
}

//Definiendo ruta del register
const register = (req, h)=>{
    return h.view('register', {
        title: 'registro'
    })
}

module.exports = {
    home: home,
    register: register
  }
