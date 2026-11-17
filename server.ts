import pool from "./src/config/connect_SQL.ts";


const conexion = pool;

conexion.connect().then( (client) => {

    const consulta = client.query('SELECT NOW()');

   consulta.then( (resultado) =>{

    console.log("Resultado de la operacion: ", resultado.rows[0]);

    client.release();
    
   }).catch((e) =>{

    console.log("Hubo un error: ", e);
   })

})