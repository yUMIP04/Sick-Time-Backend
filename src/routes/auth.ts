import { Router, type Request, type Response } from "express"
import express from 'express'
import dotenv from "dotenv";
import  jwt  from "jsonwebtoken";
import { Crear_Usuario } from "../models/usuario_models.ts";
import { Buscar_Usuario } from "../models/usuario_models.ts";
import bcrypt from 'bcrypt';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const TOKEN_CLAVE = process.env.TOKEN;

/*🌟 API Registro */

app.post("/api/registro", async (req, res) =>{

    const {nombre, apellidos, correo, edad, contrasena, ciudad, pais, enfermedad, 
        tiempo_enfermedad, medicamentos } = req.body;

        try{

            if(nombre && apellidos && correo && edad && contrasena && ciudad && pais && enfermedad && tiempo_enfermedad && medicamentos){

                const pass_hasheada = await bcrypt.hash(contrasena, 10);

                await Crear_Usuario(nombre, apellidos, correo, edad, pass_hasheada, ciudad, pais, enfermedad, tiempo_enfermedad, medicamentos);

                
                return res.status(201).json({
                    mensaje: "¡Usuario creado con exito!",
                    nombre: nombre
                })

            }
        }catch(e){

            return res.status(500).json({
                mensaje: "No se pudo registrar el usuario",
                error: `${e}`
            });

        }

})

/*🌟 API Inicio Sesion */
app.post("/api/login", async ( req, res) =>{

    const {correo, contrasena} = req.body;

    try{

        const user = await Buscar_Usuario(correo);

        if(!user){

            return res.status(400).json({
                MensajeError: "Faltan datos o son incorrectos"
            })

        } else{

            const pass_formateada = await bcrypt.compare(contrasena, user.contrasena);

            if(!pass_formateada){

                return res.status(400).json({
                    MensajeError:"Contraseña equivocada o fuera de existencia"
                })

            } else{

                console.log("🥳¡La contraseña es correcta!")

                const payload = {
                    id: user.id_usuario,
                    nombre : user.nombre,
                    apellidos : user.apellidos
                }

                const TOKEN = jwt.sign(payload,TOKEN_CLAVE as string);

                return res.status(200).json({
                    MensajeExito : "¡Inicio de Sesion Exitoso!",
                    Token: TOKEN
                })

            }
        }

    }catch(e){

        return res.status(500).json({
            mensajeError:"Error en el correo/contraseña o Usuario no existente",
            error:`${e}`
        })
    }

})

/*🌟 Levantamiento del Servidor */

export const servidor = app.listen(process.env.Puerto_Express || 3000, () =>{

    console.log(`Servidor en http://localhost:${process.env.Puerto_Express || 3000}`);

})