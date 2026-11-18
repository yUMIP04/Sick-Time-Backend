import { Router, type Request, type Response } from "express"
import express from 'express'
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/registro", (req, res) =>{

    res.send("Holaaaa");
})

export const servidor = app.listen(process.env.Puerto_Express || 3000, () =>{

    console.log(`Servidor en http://localhost:${process.env.Puerto_Express || 3000}`);

})