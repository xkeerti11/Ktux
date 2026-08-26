# Ktux Frontend

## Setup

1. Copy env file: `cp .env.example .env`
2. Fill in the values in `.env`
3. Install deps: `npm install`
4. Run dev server: `npm run dev`

## Environment Variables

See `.env.example` for all required variables.

| Variable | Description |
|---|---|
| VITE_API_BASE_URL | Backend API base URL (e.g. http://localhost:5000) |
| VITE_SITE_URL | Frontend site URL |
| VITE_RECAPTCHA_SITE_KEY | Google reCAPTCHA v3 site key |
| VITE_SENTRY_DSN | Sentry DSN for error monitoring |
| VITE_CALCOM_BOOKING_URL | Cal.com consultation event URL |

## Tech Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS v4
- React Router v7
- TanStack Query v5
- React Hook Form + Zod
- Framer Motion
- Recharts
- DOMPurify

## Architecture

```
src/
├── auth/          # AuthProvider, tokenStore (memory-only tokens)
├── components/    # Shared: Navbar, Footer, ErrorBoundary, RequireAuth
├── layouts/       # RootLayout (Navbar+Footer), DashboardLayout
├── lib/           # env.ts (Zod), api/client.ts, api/refreshClient.ts
└── pages/         # All 13+ pages, lazy-loaded for code splitting
```

## Security Notes

- Access tokens are stored in memory only (never localStorage)
- Refresh tokens are HttpOnly cookies (set by backend)
- Single-flight refresh on 401 TOKEN_EXPIRED
- All HTML content sanitized with DOMPurify
- All forms validated with React Hook Form + Zod

## Cal.com booking

Set `VITE_CALCOM_BOOKING_URL` to the Cal.com event URL, for example `https://cal.com/yourname/consultation`. The booking page embeds Cal.com directly; availability, Google Calendar events, confirmations and reminders are managed by Cal.com.

## Scripts

```bash
npm run dev         # Start dev server
npm run build       # Production build
npm run typecheck   # TypeScript check
npm run lint        # ESLint
```
