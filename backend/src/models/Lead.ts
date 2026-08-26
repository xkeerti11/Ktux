import { Schema, model, type HydratedDocument, Types } from 'mongoose';

export const leadStatuses = ['new', 'contacted', 'interested', 'consultation_booked', 'proposal_sent', 'won', 'lost'] as const;
export type LeadStatus = typeof leadStatuses[number];

export interface ILead {
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  serviceInterested: string[];
  budgetRange?: string;
  timeline?: string;
  message?: string;
  leadScore: number;
  scoreFactors: Record<string, number>;
  status: LeadStatus;
  assignedTo?: Types.ObjectId;
  source: string;
  utm?: Record<string, string>;
  consultationBooked: boolean;
  consultationId?: Types.ObjectId;
  consultationDate?: Date;
  lastContacted?: Date;
  conversionDetails?: {
    consultationBooked: boolean;
    bookingDate?: Date;
    projectWon?: boolean;
    projectValue?: number;
  };
  isDeleted: boolean;
  deletedAt?: Date;
  deletedBy?: Types.ObjectId;
}

const schema = new Schema<ILead>({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, lowercase: true, trim: true, index: true },
  phone: { type: String, trim: true, maxlength: 40 },
  company: { type: String, trim: true, maxlength: 160 },
  industry: { type: String, trim: true, maxlength: 100 },
  serviceInterested: { type: [String], default: [] },
  budgetRange: { type: String, trim: true },
  timeline: { type: String, trim: true },
  message: { type: String, trim: true, maxlength: 5000 },
  leadScore: { type: Number, min: 0, max: 100, default: 0, index: true },
  scoreFactors: { type: Schema.Types.Mixed, default: {} },
  status: { type: String, enum: leadStatuses, default: 'new', index: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  source: { type: String, default: 'website', index: true },
  utm: { type: Schema.Types.Mixed },
  consultationBooked: { type: Boolean, default: false, index: true },
  consultationId: { type: Schema.Types.ObjectId, ref: 'Consultation', index: true },
  consultationDate: Date,
  lastContacted: Date,
  conversionDetails: {
    consultationBooked: { type: Boolean, default: false },
    bookingDate: Date,
    projectWon: Boolean,
    projectValue: Number
  },
  isDeleted: { type: Boolean, default: false, index: true },
  deletedAt: Date,
  deletedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

schema.index({ status: 1, createdAt: -1 });
schema.index({ serviceInterested: 1, createdAt: -1 });
schema.index({ isDeleted: 1, createdAt: -1 });
export type LeadDocument = HydratedDocument<ILead>;
export const Lead = model<ILead>('Lead', schema);
