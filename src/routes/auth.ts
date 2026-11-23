import { Router, type Request, type Response } from "express"
import express from 'express'
import dotenv from "dotenv";
import { Crear_Usuario } from "../models/usuario_models.ts";
import bcrypt from 'bcrypt';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


/*🌟 API Registro */

app.post("/api/registro", async (req, res) =>{

    const {nombre, apellidos, correo, edad, contrasena, ciudad, pais, enfermedad, 
        tiempo_enfermedad, medicamentos } = req.body;

        try{

            if(nombre && apellidos && correo && edad && contrasena && ciudad && pais && enfermedad && tiempo_enfermedad && medicamentos){

                const pass_hasheada = await bcrypt.hash(contrasena, 10);

                await Crear_Usuario(nombre, apellidos, correo, edad, pass_hasheada, ciudad, pais, enfermedad, tiempo_enfermedad, medicamentos);

                
                res.status(201).json({
                    mensaje: "¡Usuario creado con exito!",
                    nombre: nombre
                })

            }
        }catch(e){

            res.status(500).json({
                mensaje: "No se pudo registrar el usuario",
                error: `${e}`
            });

        }

})

/*🌟 API Inicio Sesion */
app.post("/api/login", (res, req) =>{

    
})

/*🌟 Levantamiento del Servidor */

export const servidor = app.listen(process.env.Puerto_Express || 3000, () =>{

    console.log(`Servidor en http://localhost:${process.env.Puerto_Express || 3000}`);

})