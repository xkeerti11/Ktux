import { AppError } from './errors';

export function stringParam(value: string | string[] | undefined, name = 'parameter'): string {
  const result = Array.isArray(value) ? value[0] : value;
  if (!result) throw new AppError(400, 'INVALID_REQUEST', `Missing ${name}`);
  return result;
}
