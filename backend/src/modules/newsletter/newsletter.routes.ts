import { Router } from 'express';
import { publicLimiter } from '../../middleware/limiter';
import { validate } from '../../middleware/validate';
import { subscribeSchema, tokenQuerySchema } from './newsletter.schemas';
import { confirm, subscribe, unsubscribe } from './newsletter.controller';

export const newsletterRouter = Router();
newsletterRouter.post('/subscribe', publicLimiter, validate({ body: subscribeSchema }), subscribe);
newsletterRouter.get('/confirm', publicLimiter, validate({ query: tokenQuerySchema }), confirm);
newsletterRouter.get('/unsubscribe', publicLimiter, validate({ query: tokenQuerySchema }), unsubscribe);
