import type { AuthUser } from '../utils/auth';

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      auth?: AuthUser;
      validated?: { body?: unknown; query?: unknown; params?: unknown };
    }
  }
}

export {};
