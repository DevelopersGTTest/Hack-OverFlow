const hapi = require('hapi');


const server = hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost'                     //Escribiendo el core
});


async function init() {
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h)=>{
            return 'Has entrado al get'
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
    INFO  -> ${server.info.uri}
   
   `);
}

//Init del servidor
init();