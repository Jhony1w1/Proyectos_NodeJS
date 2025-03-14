// Calling the express module
//const express = require('express'); // CJS CommonJS Module
import express from 'express'; // ESM EcmaScript Module
import cors from 'cors'
import 'dotenv/config'; // Importamos la configuración de dotenv
import router from './router'; // Importamos el router de express
import { connectDB } from './config/db'; // Importamos la función connectDB de db.ts
import { corsConfig } from './config/cors';

connectDB(); // Conectamos a la base de datos
// Instanciate express
const app = express();

// Cors
app.use(cors(corsConfig))
// Leer datos de formularios
app.use(express.json()); // Middleware para leer datos de formularios

app.use('/', router); // Usamos el router de express

export default app; // Exportamos el servidor de express