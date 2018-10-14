const hapi = require('hapi');


const server = hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'                     //Escribiendo el core
});

//Configuraciones basicass de las rutas
async function init() {
    
    //Devolviedo el GET Principal
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h)=>{
            return h.response('Success').status(200);
        }
    });

    //Ruta #2
    server.route({
        method: 'GET',
        path: '/mi-github',
        handler : (req, h)=>{
            return h.redirect('https://github.com/p-jacobo2012240'); //Renderizando las vistas
        }
    });
    
    //Controlando posibles fallos no definidos
   try{
        await server.start();
   }catch(err){
        console.error('Error' + err);
        process.exit(1);
   }
   
   console.log(`
    INFO-SERVER  -> ${server.info.uri}
   `);
}

//Init del servidor
init();