// routes/medicoRoutes.ts
import express from 'express';
import { obtenerMedicos, crearMedico, actualizarMedico, eliminarMedico, obtenerMedicoPorId } from '../controllers/medicoController';

const router = express.Router();

router.get('/', obtenerMedicos);
router.get('/:id',obtenerMedicoPorId); 
router.post('/', crearMedico);
router.put('/:id', actualizarMedico);
router.delete('/:id', eliminarMedico);


export { router as medicoRouter };
