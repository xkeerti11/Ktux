import fs from 'node:fs';
import path from 'node:path';
import winston from 'winston';
import { env } from '../config/env';

const logsDirectory = path.resolve(process.cwd(), 'logs');
fs.mkdirSync(logsDirectory, { recursive: true });

const sensitiveKeys = new Set([
  'password',
  'passwordhash',
  'token',
  'accesstoken',
  'refreshtoken',
  'authorization',
  'cookie',
  'cookies',
  'apikey',
  'api_key',
  'secret',
  'prompt',
  'messagecontent'
]);

function redactValue(value: unknown, key?: string): unknown {
  if (key && sensitiveKeys.has(key.toLowerCase())) return '[REDACTED]';
  if (Array.isArray(value)) return value.map((item) => redactValue(item));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([entryKey, entryValue]) => [
      entryKey,
      redactValue(entryValue, entryKey)
    ]));
  }
  return value;
}

const redact = winston.format((info) => {
  for (const [key, value] of Object.entries(info)) {
    info[key] = redactValue(value, key) as never;
  }
  return info;
});

const baseFormat = winston.format.combine(
  redact(),
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const transports: winston.transport[] = [
  new winston.transports.File({
    filename: path.join(logsDirectory, 'error.log'),
    level: 'error',
    maxsize: 5 * 1024 * 1024,
    maxFiles: 5
  }),
  new winston.transports.File({
    filename: path.join(logsDirectory, 'combined.log'),
    maxsize: 5 * 1024 * 1024,
    maxFiles: 5
  })
];

if (env.NODE_ENV === 'development' || env.NODE_ENV === 'test') {
  transports.push(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: baseFormat,
  defaultMeta: { service: 'ktux-backend' },
  transports
});
