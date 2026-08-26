# Ktux

Ktux is a premium AI and web-development agency platform. The backend is implemented first as a modular Express + TypeScript API.

## Backend quick start

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run typecheck
npm test
npm run dev
```

Set `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON`, `GOOGLE_SHEETS_ID`, and `ZAPIER_WEBHOOK_SECRET` in `.env` before starting the API. Provider integrations are optional during local development and are enabled through their environment variables.

API health checks:

- `GET http://localhost:5000/health`
- `GET http://localhost:5000/ready`

The API contract is documented in [backend/docs/API.md](backend/docs/API.md) and [backend/docs/openapi.yaml](backend/docs/openapi.yaml).

Never commit `.env`, provider credentials, service-account JSON, or generated build output.

## Cal.com booking setup

1. Create a Cal.com `Consultation` event type and connect the Google Calendar account inside Cal.com.
2. Set the frontend `VITE_CALCOM_BOOKING_URL` to the event URL.
3. Create a Zapier workflow from Cal.com to a webhook POST at `/api/v1/consultations/webhook`.
4. Send the `x-zapier-webhook-secret` header and the normalized Cal.com fields documented in [backend/docs/API.md](backend/docs/API.md).
5. Add a second Zapier action to append the booking to the `Consultations` tab in Google Sheets.
