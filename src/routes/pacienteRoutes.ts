// routes/pacienteRoutes.ts
import express from 'express';
import { obtenerPacientes, crearPaciente, actualizarPaciente, eliminarPaciente, obtenerPacientePorId } from '../controllers/pacienteController';

const router = express.Router();

router.get('/', obtenerPacientes);
router.get('/:id', obtenerPacientePorId);
router.post('/', crearPaciente);
router.put('/:id', actualizarPaciente);
router.delete('/:id', eliminarPaciente);

export { router as pacienteRouter };
