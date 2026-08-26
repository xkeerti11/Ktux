import type { Request } from 'express';

export function validated<T>(req: Request, key: 'body' | 'query' | 'params'): T {
  return (req.validated?.[key] ?? (key === 'body' ? req.body : key === 'query' ? req.query : req.params)) as T;
}
