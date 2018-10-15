//Core Packages del proyecto
const hapi = require('hapi');
const inert = require('inert'); //Puedo servir archivos o renderizar toda la vista
const path = require('path');
const handlebars = require('handlebars');
const vision = require('vision');

const server = hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public')
        }
    }                     //Escribiendo el core
});


async function init () {
    try {
    
     //Permitiendo el acceso a servir el template   
    await server.register(inert)
    await server.register(vision)

    //Implementando un objeto de configuracion
    server.views({
        engines: {
            hbs: handlebars
          },
          relativeTo: __dirname,
          path: 'views',
          layout: true,
          layoutPath: 'views'
    })

    //Mi home
      server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
          return h.view('index', {
            titulo: 'Lord Hackobo'
          });
        }
      })
  
      server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
          directory: {
            path: '.',
            index: ['index.html']
          }
        }
      })
  
      await server.start()
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
   
   console.log(`
    INFO-SERVER  -> ${server.info.uri}
   `);
}

//Init del servidor
init();