import { Schema, model, type HydratedDocument } from 'mongoose';

export interface IUser {
  name?: string;
  email: string;
  passwordHash: string;
  role: 'admin';
  failedLoginAttempts: number;
  lockedUntil?: Date;
  lastLoginAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, trim: true, maxlength: 120 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin'], default: 'admin', required: true },
  failedLoginAttempts: { type: Number, default: 0 },
  lockedUntil: Date,
  lastLoginAt: Date,
  isDeleted: { type: Boolean, default: false, index: true },
  deletedAt: Date
}, { timestamps: true });

export type UserDocument = HydratedDocument<IUser>;
export const User = model<IUser>('User', userSchema);
