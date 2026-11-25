import { configDotenv } from 'dotenv';
import pool from "../config/connect_SQL.ts"

configDotenv();

async function Save_Code(id_usuario : number, codigo:number) {

    const consulta = await pool.query('INSERT INTO codigos_recuperacion (id_usuario, codigo, expira_en) VALUES($1, $2, NOW() INTERVALO "15 minutes" RETURNING *)',[id_usuario, codigo]);

    if(consulta){

        console.log("El codigo se guardo de manera correcta.");

        const consulta_updateCodigo = await pool.query('UPDATE codigos_recuperacion SET ');
    }
    
}