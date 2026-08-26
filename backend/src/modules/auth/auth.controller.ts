import type { Request, Response } from 'express';
import { login, logout, refresh, requestPasswordReset, resetPassword, register } from '../../services/auth.service';
import { clearRefreshCookie, REFRESH_COOKIE, setRefreshCookie } from '../../utils/cookies';
import crypto from 'node:crypto';
import { csrfToken } from '../../middleware/csrf';

function sessionMetadata(req: Request) {
  return { userAgent: req.get('user-agent'), ip: req.ip };
}

export async function loginController(req: Request, res: Response): Promise<void> {
  const session = await login(req.body.email, req.body.password, sessionMetadata(req));
  setRefreshCookie(res, session.refreshToken);
  res.status(200).json({ success: true, data: { accessToken: session.accessToken, user: session.user } });
}

export async function registerController(req: Request, res: Response): Promise<void> {
  const user = await register(req.body.name, req.body.email, req.body.password);
  res.status(201).json({ success: true, data: { user } });
}

export async function refreshController(req: Request, res: Response): Promise<void> {
  const token = req.cookies[REFRESH_COOKIE] as string | undefined;
  if (!token) {
    res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } });
    return;
  }
  const session = await refresh(token, sessionMetadata(req));
  setRefreshCookie(res, session.refreshToken);
  res.json({ success: true, data: { accessToken: session.accessToken, user: session.user } });
}

export async function logoutController(req: Request, res: Response): Promise<void> {
  await logout(req.cookies[REFRESH_COOKIE] as string | undefined);
  clearRefreshCookie(res);
  res.status(204).send();
}

export function csrfController(_req: Request, res: Response): void {
  const token = crypto.randomBytes(32).toString('hex');
  csrfToken(res, token);
  res.json({ success: true, data: { csrfToken: token } });
}

export async function meController(req: Request, res: Response): Promise<void> {
  res.json({ success: true, data: { user: req.auth } });
}

export async function forgotPasswordController(req: Request, res: Response): Promise<void> {
  await requestPasswordReset(req.body.email);
  res.json({ success: true, data: { message: 'If the account exists, reset instructions were sent' } });
}

export async function resetPasswordController(req: Request, res: Response): Promise<void> {
  await resetPassword(req.body.token, req.body.password);
  res.json({ success: true, data: { message: 'Password reset successfully' } });
}
