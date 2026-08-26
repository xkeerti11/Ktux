import { Router } from 'express';
import { validate } from '../../middleware/validate';
import { authLimiter } from '../../middleware/limiter';
import { apiLimiter } from '../../middleware/limiter';
import { requireAdmin, requireAuth } from '../../middleware/auth';
import { requireCsrf } from '../../middleware/csrf';
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from './auth.schemas';
import { csrfController, forgotPasswordController, loginController, logoutController, meController, refreshController, registerController, resetPasswordController } from './auth.controller';

export const authRouter = Router();
authRouter.post('/login', authLimiter, validate({ body: loginSchema }), loginController);
authRouter.post('/register', authLimiter, requireAuth, requireAdmin, validate({ body: registerSchema }), registerController);
authRouter.get('/csrf', csrfController);
authRouter.post('/refresh', requireCsrf, refreshController);
authRouter.post('/logout', requireCsrf, logoutController);
authRouter.post('/forgot-password', validate({ body: forgotPasswordSchema }), forgotPasswordController);
authRouter.post('/reset-password', validate({ body: resetPasswordSchema }), resetPasswordController);
authRouter.get('/me', requireAuth, apiLimiter, meController);
