import pool from "./src/config/connect_SQL.ts";
import { servidor } from "./src/routes/auth.ts";

const conexion = pool;

conexion.connect().then( (client) => {

    const consulta = client.query('SELECT NOW()');

   consulta.then( (resultado) =>{

    console.log("Resultado de la operacion: ", resultado.rows[0]);
    console.log("🥳¡Conexion exitosa!");

   }).catch((e) =>{

    console.log("Hubo un error: ", e);
   }) .finally(() =>{

    client.release();
   })

}).catch( (e) => {

    console.log("Hubo un error al crear la conexion: ", e);
})

console.log(servidor);