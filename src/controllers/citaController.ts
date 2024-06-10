// controllers/citaController.ts
import { Request, Response } from 'express';
import Cita from '../models/Cita';

const handleError = (res: Response, error: any): void => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
};

export const obtenerCitas = async (req: Request, res: Response): Promise<void> => {
  try {
    const citas = await Cita.find().populate('pacienteId', 'nombre').populate('medicoId', 'nombre');
    res.json(citas);
  } catch (error) {
    handleError(res, error);
  }
};

export const crearCita = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pacienteId, medicoId, fecha } = req.body;
    const nuevaCita = new Cita({ pacienteId, medicoId, fecha });
    await nuevaCita.save();
    res.status(201).json(nuevaCita);
  } catch (error) {
    handleError(res, error);
  }
};

export const actualizarCita = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { pacienteId, medicoId, fecha } = req.body;
    const citaActualizada = await Cita.findByIdAndUpdate(id, { pacienteId, medicoId, fecha }, { new: true });
    res.json(citaActualizada);
  } catch (error) {
    handleError(res, error);
  }
};

export const eliminarCita = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Cita.findByIdAndDelete(id);
    res.json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    handleError(res, error);
  }
};
