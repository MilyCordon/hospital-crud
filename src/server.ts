// src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { medicoRouter } from './routes/medicoRoutes';
import { pacienteRouter } from './routes/pacienteRoutes';
import { citaRouter } from './routes/citaRoutes';
import authRouter from './routes/authRoutes';
import authenticateJWT from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI as string;

app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRouter);

// Rutas protegidas
app.use('/medicos', authenticateJWT, medicoRouter);
app.use('/pacientes', authenticateJWT, pacienteRouter);
app.use('/citas', authenticateJWT, citaRouter);

// Conexión a MongoDB Atlas
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => console.error('Error de conexión a MongoDB:', error.message));
