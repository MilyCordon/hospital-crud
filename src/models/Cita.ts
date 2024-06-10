// models/Cita.ts
import { Schema, model, Document } from 'mongoose';
import { IPaciente } from './Paciente';
import { IMedico } from './Medico';

interface ICita extends Document {
  pacienteId: IPaciente['_id'];
  medicoId: IMedico['_id'];
  fecha: Date;
}

const citaSchema = new Schema({
  pacienteId: { type: Schema.Types.ObjectId, ref: 'Paciente', required: true },
  medicoId: { type: Schema.Types.ObjectId, ref: 'Medico', required: true },
  fecha: { type: Date, required: true },
});

export default model<ICita>('Cita', citaSchema);
