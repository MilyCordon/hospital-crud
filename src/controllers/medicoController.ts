// controllers/medicoController.ts
import { Request, Response } from 'express';
import Medico from '../models/Medico';

const handleError = (res: Response, error: any): void => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
};

export const obtenerMedicos = async (req: Request, res: Response): Promise<void> => {
  try {
    const medicos = await Medico.find();
    res.json(medicos);
  } catch (error) {
    handleError(res, error);
  }
};

export const obtenerMedicoPorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const medico = await Medico.findById(id);
    if (!medico) {
      res.status(404).json({ message: 'Médico no encontrado' });
      return;
    }
    res.json(medico);
  } catch (error: any) {
    console.error('Error al obtener el médico por ID:', error);
    res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
  }
};

export const crearMedico = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, especialidad } = req.body;
    const nuevoMedico = new Medico({ nombre, especialidad });
    await nuevoMedico.save();
    res.status(201).json(nuevoMedico);
  } catch (error) {
    handleError(res, error);
  }
};

export const actualizarMedico = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, especialidad } = req.body;
    const medicoActualizado = await Medico.findByIdAndUpdate(id, { nombre, especialidad }, { new: true });
    res.json(medicoActualizado);
  } catch (error) {
    handleError(res, error);
  }
};

export const eliminarMedico = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Medico.findByIdAndDelete(id);
    res.json({ message: 'Médico eliminado correctamente' });
  } catch (error) {
    handleError(res, error);
  }
};
