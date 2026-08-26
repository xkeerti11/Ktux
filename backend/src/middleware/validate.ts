import type { RequestHandler } from 'express';
import type { z } from 'zod';

type ValidationOptions = {
  body?: z.ZodType;
  query?: z.ZodType;
  params?: z.ZodType;
};

export function validate(schema: z.ZodType): RequestHandler;
export function validate(options: ValidationOptions): RequestHandler;
export function validate(input: z.ZodType | ValidationOptions): RequestHandler {
  const options: ValidationOptions = 'parse' in input ? { body: input } : input;
  return (req, _res, next) => {
    try {
      req.validated = {
        ...(options.body ? { body: options.body.parse(req.body) } : {}),
        ...(options.query ? { query: options.query.parse(req.query) } : {}),
        ...(options.params ? { params: options.params.parse(req.params) } : {})
      };
      if (options.body) req.body = req.validated.body;
      next();
    } catch (error) {
      next(error);
    }
  };
}
