// routes/citaRoutes.ts
import express from 'express';
import { obtenerCitas, crearCita, actualizarCita, eliminarCita } from '../controllers/citaController';

const router = express.Router();

router.get('/', obtenerCitas);
router.post('/', crearCita);
router.put('/:id', actualizarCita);
router.delete('/:id', eliminarCita);

export { router as citaRouter };
