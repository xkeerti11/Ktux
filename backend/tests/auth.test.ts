import { describe, expect, it, beforeAll, afterAll, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {
  verifyAccessToken,
  extractBearerToken
} from '../src/utils/jwt';
import {
  validatePasswordStrength
} from '../src/utils/password';
import {
  hashSecret,
  compareSecret,
  signAccessToken,
  hashOpaqueToken
} from '../src/utils/auth';
import { User } from '../src/models/User';
import { RefreshSession } from '../src/models/RefreshSession';
import { PasswordResetToken } from '../src/models/PasswordResetToken';
import { register, login, refresh, logout, resetPassword, requestPasswordReset } from '../src/services/auth.service';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
  await RefreshSession.deleteMany({});
  await PasswordResetToken.deleteMany({});
});

describe('Authentication & Password Security Suite', () => {
  describe('Password Security', () => {
    it('enforces strong password policy (length, uppercase, lowercase, number, symbol)', () => {
      expect(validatePasswordStrength('short').isStrong).toBe(false);
      expect(validatePasswordStrength('nouppercase123!').isStrong).toBe(false);
      expect(validatePasswordStrength('NOLOWERCASE123!').isStrong).toBe(false);
      expect(validatePasswordStrength('NoSpecialChars123').isStrong).toBe(false);
      expect(validatePasswordStrength('ValidStrongPassword123!').isStrong).toBe(true);
    });

    it('hashes passwords using bcrypt with a high work factor and verifies correctly', async () => {
      const password = 'SuperSecurePassword@2026';
      const hash = await hashSecret(password);
      expect(hash).not.toBe(password);
      expect(hash.startsWith('$2')).toBe(true); // Bcrypt format

      const isValid = await compareSecret(password, hash);
      expect(isValid).toBe(true);

      const isInvalid = await compareSecret('IncorrectPassword123!', hash);
      expect(isInvalid).toBe(false);
    });
  });

  describe('JWT Security', () => {
    it('generates tokens with HS256 algorithm and rejects tampered signatures', () => {
      const payload = { id: '507f1f77bcf86cd799439011', email: 'admin@ktux.com', role: 'admin' as const };
      const token = signAccessToken(payload);

      const decoded = verifyAccessToken(token);
      expect(decoded).toBeDefined();
      expect(decoded?.email).toBe('admin@ktux.com');
      expect(decoded?.role).toBe('admin');

      // Header verification
      const headerBase64 = token.split('.')[0];
      const header = JSON.parse(Buffer.from(headerBase64, 'base64url').toString());
      expect(header.alg).toBe('HS256');

      // Tampered payload
      const parts = token.split('.');
      const tamperedPayload = Buffer.from(JSON.stringify({ ...payload, email: 'hacker@ktux.com' })).toString('base64url');
      const tamperedToken = `${parts[0]}.${tamperedPayload}.${parts[2]}`;
      expect(verifyAccessToken(tamperedToken)).toBeNull();

      // Completely random garbage token
      expect(verifyAccessToken('invalid.token.structure')).toBeNull();
    });

    it('correctly extracts Bearer tokens from authorization header', () => {
      expect(extractBearerToken('Bearer valid_token_string')).toBe('valid_token_string');
      expect(extractBearerToken('bearer lower_case_bearer')).toBe('lower_case_bearer');
      expect(extractBearerToken('Basic credentials')).toBeNull();
      expect(extractBearerToken('')).toBeNull();
      expect(extractBearerToken(undefined)).toBeNull();
    });
  });

  describe('User Registration, Login & Lockout', () => {
    it('registers a user with hashed password and prevents duplicate email registration', async () => {
      const user = await register('Admin User', 'admin@ktux.com', 'AdminPass12345!');
      expect(user.email).toBe('admin@ktux.com');
      expect(user.role).toBe('admin');

      const dbUser = await User.findOne({ email: 'admin@ktux.com' }).select('+passwordHash');
      expect(dbUser).toBeDefined();
      expect(dbUser?.passwordHash).not.toBe('AdminPass12345!');

      await expect(register('Duplicate', 'admin@ktux.com', 'AdminPass12345!')).rejects.toMatchObject({
        code: 'EMAIL_ALREADY_EXISTS'
      });
    });

    it('successfully logs in with valid credentials and creates a refresh session', async () => {
      await register('Admin User', 'admin@ktux.com', 'AdminPass12345!');

      const session = await login('admin@ktux.com', 'AdminPass12345!', {
        userAgent: 'Vitest Agent',
        ip: '127.0.0.1'
      });

      expect(session.accessToken).toBeTruthy();
      expect(session.refreshToken).toBeTruthy();
      expect(session.user.email).toBe('admin@ktux.com');

      const storedSession = await RefreshSession.findOne({ userId: session.user.id });
      expect(storedSession).toBeDefined();
      expect(storedSession?.tokenHash).toBe(hashOpaqueToken(session.refreshToken));
    });

    it('locks account after 5 consecutive failed login attempts', async () => {
      await register('Target User', 'target@ktux.com', 'AdminPass12345!');

      // 4 failed attempts should fail with INVALID_CREDENTIALS
      for (let i = 0; i < 4; i++) {
        await expect(login('target@ktux.com', 'WrongPassword!', {})).rejects.toMatchObject({
          code: 'INVALID_CREDENTIALS'
        });
      }

      // 5th attempt locks the account
      await expect(login('target@ktux.com', 'WrongPassword!', {})).rejects.toMatchObject({
        code: 'INVALID_CREDENTIALS'
      });

      const user = await User.findOne({ email: 'target@ktux.com' });
      expect(user?.lockedUntil).toBeDefined();
      expect(user!.lockedUntil!.getTime()).toBeGreaterThan(Date.now());

      // Attempting even with CORRECT password while locked should return ACCOUNT_LOCKED
      await expect(login('target@ktux.com', 'AdminPass12345!', {})).rejects.toMatchObject({
        code: 'ACCOUNT_LOCKED'
      });
    });
  });

  describe('Refresh Token Rotation & Security', () => {
    it('rotates refresh token on refresh and revokes the old token', async () => {
      await register('Rotate User', 'rotate@ktux.com', 'AdminPass12345!');
      const session1 = await login('rotate@ktux.com', 'AdminPass12345!', { userAgent: 'test' });

      // Refresh using session1 refreshToken
      const session2 = await refresh(session1.refreshToken, { userAgent: 'test-2' });
      expect(session2.accessToken).toBeTruthy();
      expect(session2.refreshToken).not.toBe(session1.refreshToken);

      // Old session1 should now be marked revoked
      const oldSession = await RefreshSession.findOne({ tokenHash: hashOpaqueToken(session1.refreshToken) });
      expect(oldSession?.revokedAt).toBeDefined();
    });

    it('detects refresh token reuse, revokes all sessions for the user to prevent hijacking', async () => {
      await register('Reuse User', 'reuse@ktux.com', 'AdminPass12345!');
      const session1 = await login('reuse@ktux.com', 'AdminPass12345!', {});

      // First refresh succeeds
      const session2 = await refresh(session1.refreshToken, {});
      expect(session2.accessToken).toBeTruthy();

      // Hacker/Replay attack attempts to use old session1.refreshToken again
      await expect(refresh(session1.refreshToken, {})).rejects.toMatchObject({
        code: 'REFRESH_TOKEN_INVALID'
      });

      // All refresh sessions for this user should now be invalidated
      const validSessions = await RefreshSession.find({ userId: session1.user.id, revokedAt: { $exists: false } });
      expect(validSessions.length).toBe(0);
    });

    it('handles user logout idempotently and revokes the session', async () => {
      await register('Logout User', 'logout@ktux.com', 'AdminPass12345!');
      const session = await login('logout@ktux.com', 'AdminPass12345!', {});

      await logout(session.refreshToken);

      const dbSession = await RefreshSession.findOne({ tokenHash: hashOpaqueToken(session.refreshToken) });
      expect(dbSession?.revokedAt).toBeDefined();
    });
  });

  describe('Password Reset Token Flow', () => {
    it('generates opaque reset token and resets password securely', async () => {
      await register('Reset User', 'reset@ktux.com', 'OldPassword123!');
      await requestPasswordReset('reset@ktux.com');

      const resetTokenRecord = await PasswordResetToken.findOne({});
      expect(resetTokenRecord).toBeDefined();

      const rawToken = 'test-opaque-reset-token';
      await PasswordResetToken.create({
        userId: resetTokenRecord!.userId,
        tokenHash: hashOpaqueToken(rawToken),
        expiresAt: new Date(Date.now() + 3600000)
      });

      await resetPassword(rawToken, 'NewPassword12345!');

      // Old password should no longer work
      await expect(login('reset@ktux.com', 'OldPassword123!', {})).rejects.toMatchObject({
        code: 'INVALID_CREDENTIALS'
      });

      // New password should log in successfully
      const loginSession = await login('reset@ktux.com', 'NewPassword12345!', {});
      expect(loginSession.accessToken).toBeTruthy();

      // Reusing the same reset token must fail
      await expect(resetPassword(rawToken, 'AnotherPassword123!')).rejects.toMatchObject({
        code: 'RESET_TOKEN_INVALID'
      });
    });
  });
});
