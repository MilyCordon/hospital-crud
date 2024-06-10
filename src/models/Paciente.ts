// models/Paciente.ts
import { Schema, model, Document } from 'mongoose';

export interface IPaciente extends Document {
  nombre: string;
  edad: number;
}

const pacienteSchema = new Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
});

export default model<IPaciente>('Paciente', pacienteSchema);
