import { User } from '../models/User';
import { PasswordResetToken } from '../models/PasswordResetToken';
import { RefreshSession } from '../models/RefreshSession';
import { AppError } from '../utils/errors';
import {
  compareSecret,
  createJti,
  generateOpaqueToken,
  hashOpaqueToken,
  hashSecret,
  signAccessToken,
  signRefreshToken,
  safeCompare,
  verifyRefreshToken,
  type AuthUser
} from '../utils/auth';
import { env } from '../config/env';
import { sendEmail } from './email.service';

const LOCK_DURATION_MS = 15 * 60 * 1000;

function userToAuth(user: { id: string; email: string; role: 'admin'; name?: string }): AuthUser {
  return { id: user.id, email: user.email, role: user.role, ...(user.name ? { name: user.name } : {}) };
}

function expiryFromToken(token: string): Date {
  const payload = verifyRefreshToken(token);
  return new Date((payload.exp ?? Math.floor(Date.now() / 1000) + 604800) * 1000);
}

export async function ensureAdmin(): Promise<void> {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) return;
  const existing = await User.findOne({ email: env.ADMIN_EMAIL.toLowerCase(), isDeleted: false }).select('+passwordHash');
  if (!existing) {
    await User.create({ name: env.ADMIN_EMAIL.split('@')[0], email: env.ADMIN_EMAIL.toLowerCase(), passwordHash: await hashSecret(env.ADMIN_PASSWORD), role: 'admin' });
  }
}

export async function register(name: string, email: string, password: string): Promise<AuthUser> {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) throw new AppError(409, 'EMAIL_ALREADY_EXISTS', 'An account with that email already exists');
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: await hashSecret(password),
    role: 'admin'
  });
  return userToAuth(user);
}

export async function login(email: string, password: string, metadata: { userAgent?: string; ip?: string }) {
  const user = await User.findOne({ email: email.toLowerCase(), isDeleted: false }).select('+passwordHash');
  if (!user) throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  if (user.lockedUntil && user.lockedUntil > new Date()) throw new AppError(423, 'ACCOUNT_LOCKED', 'Account temporarily locked');

  const valid = await compareSecret(password, user.passwordHash);
  if (!valid) {
    const failures = user.failedLoginAttempts + 1;
    user.failedLoginAttempts = failures >= 5 ? 0 : failures;
    if (failures >= 5) user.lockedUntil = new Date(Date.now() + LOCK_DURATION_MS);
    await user.save();
    throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
  }

  user.failedLoginAttempts = 0;
  user.lockedUntil = undefined;
  user.lastLoginAt = new Date();
  await user.save();
  return issueSession(userToAuth(user), metadata);
}

export async function issueSession(user: AuthUser, metadata: { userAgent?: string; ip?: string }) {
  const jti = createJti();
  const refreshToken = signRefreshToken(user.id, jti);
  await RefreshSession.create({
    userId: user.id,
    jti,
    tokenHash: hashOpaqueToken(refreshToken),
    expiresAt: expiryFromToken(refreshToken),
    userAgent: metadata.userAgent?.slice(0, 300),
    ip: metadata.ip?.slice(0, 64)
  });
  return { accessToken: signAccessToken(user), refreshToken, user };
}

export async function refresh(rawToken: string, metadata: { userAgent?: string; ip?: string }) {
  const payload = verifyRefreshToken(rawToken);
  const session = await RefreshSession.findOne({ jti: payload.jti, userId: payload.sub });
  if (!session || session.revokedAt || session.expiresAt <= new Date()) {
    await RefreshSession.updateMany({ userId: payload.sub, revokedAt: { $exists: false } }, { $set: { revokedAt: new Date() } });
    throw new AppError(401, 'REFRESH_TOKEN_INVALID', 'Invalid refresh token');
  }
  if (!safeCompare(session.tokenHash, hashOpaqueToken(rawToken))) {
    await RefreshSession.updateMany({ userId: payload.sub, revokedAt: { $exists: false } }, { $set: { revokedAt: new Date() } });
    throw new AppError(401, 'REFRESH_TOKEN_REUSED', 'Refresh token reuse detected');
  }
  const user = await User.findOne({ _id: payload.sub, isDeleted: false });
  if (!user) throw new AppError(401, 'REFRESH_TOKEN_INVALID', 'Invalid refresh token');
  const next = await issueSession(userToAuth(user), metadata);
  session.revokedAt = new Date();
  session.replacedByJti = verifyRefreshToken(next.refreshToken).jti;
  await session.save();
  return next;
}

export async function logout(rawToken: string | undefined): Promise<void> {
  if (!rawToken) return;
  try {
    const payload = verifyRefreshToken(rawToken);
    await RefreshSession.updateOne({ jti: payload.jti }, { $set: { revokedAt: new Date() } });
  } catch {
    // Logout is intentionally idempotent.
  }
}

export async function requestPasswordReset(email: string): Promise<void> {
  const user = await User.findOne({ email: email.toLowerCase(), isDeleted: false });
  if (!user) return;
  const token = generateOpaqueToken();
  await PasswordResetToken.create({ userId: user.id, tokenHash: hashOpaqueToken(token), expiresAt: new Date(Date.now() + 60 * 60 * 1000) });
  await sendEmail({
    to: user.email,
    subject: 'Reset your Ktux password',
    text: `Use this password reset token within one hour: ${token}`
  });
}

export async function resetPassword(token: string, password: string): Promise<void> {
  const record = await PasswordResetToken.findOne({ tokenHash: hashOpaqueToken(token), usedAt: { $exists: false }, expiresAt: { $gt: new Date() } });
  if (!record) throw new AppError(400, 'RESET_TOKEN_INVALID', 'Invalid or expired reset token');
  await User.updateOne({ _id: record.userId }, { $set: { passwordHash: await hashSecret(password), failedLoginAttempts: 0, lockedUntil: undefined } });
  record.usedAt = new Date();
  await record.save();
  await RefreshSession.updateMany({ userId: record.userId, revokedAt: { $exists: false } }, { $set: { revokedAt: new Date() } });
}
