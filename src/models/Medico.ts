// models/Medico.ts
import { Schema, model, Document } from 'mongoose';

export interface IMedico extends Document {
  nombre: string;
  especialidad: string;
}

const medicoSchema = new Schema({
  nombre: { type: String, required: true },
  especialidad: { type: String, required: true },
});

export default model<IMedico>('Medico', medicoSchema);
