// controllers/pacienteController.ts
import { Request, Response } from 'express';
import Paciente from '../models/Paciente';

const handleError = (res: Response, error: any): void => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
};

export const obtenerPacientes = async (req: Request, res: Response): Promise<void> => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    handleError(res, error);
  }
};

export const obtenerPacientePorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);
    if (!paciente) {
      res.status(404).json({ message: 'Paciente no encontrado' });
      return;
    }
    res.json(paciente);
  } catch (error: any) {
    console.error('Error al obtener el paciente por ID:', error);
    res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
  }
};

export const crearPaciente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, edad } = req.body;
    const nuevoPaciente = new Paciente({ nombre, edad });
    await nuevoPaciente.save();
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    handleError(res, error);
  }
};

export const actualizarPaciente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { nombre, edad } = req.body;
    const pacienteActualizado = await Paciente.findByIdAndUpdate(id, { nombre, edad }, { new: true });
    res.json(pacienteActualizado);
  } catch (error) {
    handleError(res, error);
  }
};

export const eliminarPaciente = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Paciente.findByIdAndDelete(id);
    res.json({ message: 'Paciente eliminado correctamente' });
  } catch (error) {
    handleError(res, error);
  }
};
