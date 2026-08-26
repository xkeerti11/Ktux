import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';

export const BCRYPT_SALT_ROUNDS = 12;

export interface PasswordStrengthResult {
  isStrong: boolean;
  errors: string[];
}

export function validatePasswordStrength(password: string): PasswordStrengthResult {
  const errors: string[] = [];
  if (password.length < 12) errors.push('Password must be at least 12 characters long');
  if (!/[A-Z]/.test(password)) errors.push('Password must contain an uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Password must contain a lowercase letter');
  if (!/\d/.test(password)) errors.push('Password must contain a number');
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('Password must contain a special character');
  return { isStrong: errors.length === 0, errors };
}

export const isStrongPassword = (password: string): boolean => validatePasswordStrength(password).isStrong;
export const validatePassword = validatePasswordStrength;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

export async function comparePassword(password: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

export function generateTemporaryPassword(length = 24): string {
  const required = ['A', 'a', '1', '!'];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
  const bytes = crypto.randomBytes(Math.max(length, required.length));
  const result = [...required];
  for (let index = result.length; index < length; index += 1) result.push(alphabet[bytes[index] % alphabet.length]);
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = bytes[index % bytes.length] % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result.join('');
}
