import { configDotenv } from 'dotenv';
import pool from "../config/connect_SQL.ts"

configDotenv();

/*🌟 Verificar existencia del correo */

async function VerificarExistenciaCodigo(id_usuario:number, codigo:string) {

    try{

        const consulta = await pool.query('SELECT codigo, usado, id_usuario FROM codigos_recuperacion WHERE id_usuario = $1 AND codigo = $2 AND usado = FALSE AND expira_en > NOW()', [id_usuario, codigo]);

        if(consulta.rows.length === 0){

            console.log("El codigo invalido o usado.");

            return false;

        } else{

            return true;
        }

    }catch(e){

        console.log(`❌ Hubo un error al verificar existencia del codigo: ${e}`);

    }finally{

        console.log("Se termino la verificacion del codigo");

    }
}


/*🌟 Guardar el codigo */

async function Save_Code(id_usuario : number, codigo:string) {

    try{

        const consulta = await pool.query("INSERT INTO codigos_recuperacion (id_usuario, codigo, expira_en) VALUES($1, $2, NOW() + INTERVAL '15 minutes' ) RETURNING * ", [id_usuario, codigo]);

        const consulta_eliminarCodigo = await pool.query("UPDATE codigos_recuperacion SET");

    }catch(e){

        console.error(`Hubo un error al Guardar el codigo en la BD: ${e}`);

    }finally {

        console.log("La funcion guardar codigo a terminado");
    }
}

/*🌟 Actualizar el codigo */

async function Actualizar_Codigo(id_usuario:number, codigo:number) {
    
}