import { configDotenv } from 'dotenv';
import pool from "../config/connect_SQL.ts"

configDotenv();

/*Crear Usuario */
   
interface Usuario {

    nombre:string,
    apellidos:string,
    correo:string,
    edad:number,
    contrasena: string,
    ciudad:string,
    pais:string,
    enfermedad:string,
    tiempo_enfermedad: string,
    medicamentos : string
}


async function Crear_Usuario(nombre:string, apellidos:string, correo:string, edad:number, contrasena: string, ciudad:string, pais:string, enfermedad:string,
tiempo_enfermedad: string, medicamentos:string){

    try{

        if(nombre && apellidos && correo && edad && contrasena && ciudad && pais && enfermedad && tiempo_enfermedad && medicamentos){

            let usuario: Usuario ={
                nombre: nombre,
                apellidos: apellidos,
                correo: correo,
                edad: edad,
                contrasena : contrasena,
                ciudad: ciudad,
                pais : pais,
                enfermedad: enfermedad,
                tiempo_enfermedad : tiempo_enfermedad,
                medicamentos: medicamentos
            }

            console.log("🥳Tu interfaz se creo de manera correcta");
            console.log("Mostrando ...");
            console.log(usuario);

            if(usuario !== null){

                console.log("Creando el usuario ...");

                const resultado = await pool.query('INSERT INTO usuarios(nombre, apellidos, correo, edad, contrasena, ciudad, pais, enfermedad, tiempo_enfermedad, medicamentos) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', 
                    [usuario.nombre, usuario.apellidos, usuario.correo, usuario.edad, usuario.contrasena, usuario.ciudad, usuario.pais, usuario.enfermedad, usuario.tiempo_enfermedad, medicamentos]);

                    console.log("🥳¡Se creo el usuario de manera correcta!");

                    console.log(resultado.rows[0]);

            } else {

                console.error("❌ No se pudo crear al usuario.");

            } 

        }
    }catch(e){

        console.error("❌ Hubo un error al agregar los datos a la interfaz: ", e);
    }
}

export {Crear_Usuario}

/*INICIO SESION / BUSCAR USUARIO */

async function Buscar_Usuario(nombre:string, contraseña:string) {
    
}