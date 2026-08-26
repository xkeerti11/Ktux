import { Schema, model, type HydratedDocument, Types } from 'mongoose';

export type ConsultationStatus = 'scheduled' | 'completed' | 'cancelled';

export interface IConsultation {
  calComId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  serviceType: string;
  bookingDateTime: Date;
  meetingLink?: string;
  status: ConsultationStatus;
  leadId: Types.ObjectId;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IConsultation>({
  calComId: { type: String, required: true, unique: true, sparse: true, trim: true, index: true },
  clientName: { type: String, required: true, trim: true, maxlength: 120 },
  clientEmail: { type: String, required: true, lowercase: true, trim: true, maxlength: 254, index: true },
  clientPhone: { type: String, trim: true, maxlength: 40 },
  serviceType: { type: String, required: true, trim: true, maxlength: 120 },
  bookingDateTime: { type: Date, required: true, index: true },
  meetingLink: { type: String, trim: true, maxlength: 1000 },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled', index: true },
  leadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: true, index: true },
  notes: { type: String, trim: true, maxlength: 5000 }
}, { timestamps: true });

schema.index({ bookingDateTime: -1, status: 1 });
export type ConsultationDocument = HydratedDocument<IConsultation>;
export const Consultation = model<IConsultation>('Consultation', schema);
