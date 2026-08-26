# Ktux API

## Base URLs

- Development: `http://localhost:5000/api/v1`
- Production: `https://api.example.com/api/v1`
- Health checks are outside the API prefix: `/health` and `/ready`.

All successful responses use `{ "success": true, "data": {} }`. Errors use:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "fields": { "email": ["Invalid input"] },
    "requestId": "request-id"
  }
}
```

Rate-limit errors always use:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later."
  }
}
```

## Authentication and CSRF

`POST /auth/login` returns a short-lived access token and sets an HttpOnly refresh-token cookie. Send the access token as `Authorization: Bearer <token>`.

Refresh and logout use the refresh cookie and require the double-submit CSRF token:

1. `GET /auth/csrf`
2. Read `data.csrfToken` and send it as `X-CSRF-Token`.
3. Keep the `ktux_csrf` cookie from the response.

There is no public registration route. `POST /auth/register` requires an existing admin access token and creates another admin account.

## Rate limits

| Limiter | Limit | Applies to |
|---|---:|---|
| Global API | 100/minute | `/api/*` |
| Auth | 10/minute per normalized email | Login and admin registration; successful requests are skipped |
| Form | 5/hour per client IP | `POST /leads` |
| Public | 30/hour per client IP | Public content, newsletter, Cal.com webhook and AI routes |
| Authenticated API | 1000/hour per user ID, otherwise IP | Protected admin routes |

`/health` and `/ready` are not throttled. Rate-limit counters are in memory for the current single-process deployment.

## Public endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/leads` | Create a lead |
| GET | `/blog/posts` | Published blog posts |
| GET | `/blog/posts/:slug` | Published blog post |
| GET | `/blog/categories` | Blog categories |
| GET | `/case-studies` | Published case studies |
| GET | `/case-studies/:slug` | Published case study |
| POST | `/newsletter/subscribe` | Start newsletter double opt-in |
| GET | `/newsletter/confirm?token=...` | Confirm subscription |
| GET | `/newsletter/unsubscribe?token=...` | Unsubscribe |
| POST | `/ai/chat` | AI assistant |
| POST | `/ai/audit` | Website audit |
| GET | `/ai/estimate` | Pricing estimate |
| POST | `/consultations/webhook` | Verified Cal.com/Zapier booking webhook |

### Create lead

`POST /leads` accepts the existing frontend-compatible structure:

```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "+91 9876543210",
  "company": "Example Co",
  "serviceInterested": ["Website Development"],
  "budgetRange": "₹1L-₹3L",
  "timeline": "1-2 months",
  "message": "Please contact me.",
  "source": "website"
}
```

## Authentication endpoints

- `POST /auth/login`
- `POST /auth/register` (admin access token required)
- `GET /auth/csrf`
- `POST /auth/refresh` (CSRF required)
- `POST /auth/logout` (CSRF required)
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /auth/me` (access token required)

### Login (PowerShell)

```powershell
$base = 'http://localhost:5000/api/v1'
$login = Invoke-RestMethod -Method Post -Uri "$base/auth/login" -ContentType 'application/json' -Body (@{
  email = 'admin@example.com'
  password = 'ReplaceWithYourPassword!1'
} | ConvertTo-Json)
$accessToken = $login.data.accessToken
```

### Login (curl)

```bash
curl -i -c cookies.txt -X POST http://localhost:5000/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"ReplaceWithYourPassword!1"}'
```

### Admin-only registration

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"name":"Second Admin","email":"second@example.com","password":"StrongPassword!123"}'
```

## Authenticated admin endpoints

Send `Authorization: Bearer <access-token>` with each request.

- `GET /leads`
- `GET /leads/:id`
- `PATCH /leads/:id`
- `PATCH /leads/:id/status`
- `DELETE /leads/:id`
- `GET /leads/analytics/summary`
- `GET /leads/export`
- `GET /consultations`
- `DELETE /consultations/:id`
- Blog and case-study create/update/delete endpoints.
- `GET /analytics/summary`
- `GET /analytics/report.pdf`
- `POST /media/presign`

### List leads

```powershell
Invoke-RestMethod -Headers @{ Authorization = "Bearer $accessToken" } `
  -Uri "$base/leads?page=1&limit=20"
```

## Cal.com webhook

Zapier must send `POST /consultations/webhook` with `x-zapier-webhook-secret`. The backend accepts the canonical payload below and common nested Cal.com/Zapier variants:

```json
{
  "calComId": "cal_booking_id",
  "clientName": "Client Name",
  "clientEmail": "client@example.com",
  "clientPhone": "+91 9876543210",
  "serviceType": "Website Development",
  "bookingDateTime": "2026-08-10T10:00:00.000Z",
  "meetingLink": "https://meet.google.com/example",
  "status": "scheduled",
  "notes": "Optional notes"
}
```

The endpoint verifies the secret with a timing-safe comparison, upserts by `calComId`, creates or finds a lead by normalized email, updates the lead consultation fields, and sends the admin notification. Replaying the same booking is safe.

```bash
curl -X POST http://localhost:5000/api/v1/consultations/webhook \
  -H 'Content-Type: application/json' \
  -H 'x-zapier-webhook-secret: replace-with-your-secret' \
  -d '{"calComId":"cal_test_001","clientName":"Client Name","clientEmail":"client@example.com","serviceType":"Website Development","bookingDateTime":"2026-08-10T10:00:00.000Z","status":"scheduled"}'
```

Cal.com remains responsible for calendar events, confirmation emails and reminders. Configure Google Calendar inside Cal.com, then configure Zapier to POST this webhook and append the booking to the Google Sheets `Consultations` tab. Lead form synchronization continues to use `GOOGLE_SHEETS_TAB=Leads`.

## Environment

```dotenv
JWT_ACCESS_SECRET=<64-or-more-random-characters>
JWT_REFRESH_SECRET=<64-or-more-random-characters>
COOKIE_SECURE=false
TRUST_PROXY=false
LOG_LEVEL=info
GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON=
GOOGLE_SHEETS_ID=
GOOGLE_SHEETS_TAB=Leads
ZAPIER_WEBHOOK_SECRET=
```

Production requires 64-character JWT secrets, admin credentials, and configured CORS origins. Rotating a JWT secret invalidates existing access and refresh tokens.

## Rate-limit and log checks

The following sends 101 requests to an API endpoint. The response after the limit is reached should be HTTP 429 with `RATE_LIMIT_EXCEEDED`:

```powershell
1..101 | ForEach-Object {
  try {
    $response = Invoke-WebRequest -Uri 'http://localhost:5000/api/v1/auth/csrf' -Method Get -UseBasicParsing
    $response.StatusCode
  } catch {
    $_.Exception.Response.StatusCode.value__
  }
}
```

On PowerShell, inspect logs with:

```powershell
Get-Content .\logs\combined.log -Tail 50
Get-Content .\logs\error.log -Tail 50
```

On macOS/Linux:

```bash
tail -n 50 logs/combined.log
tail -n 50 logs/error.log
```
