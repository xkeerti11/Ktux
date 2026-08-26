# Full-Stack Project Prompts — Copy-Paste Ready
**Kisi bhi industry ke liye reusable prompts**

---

## 🔴 CRITICAL — Pehle padhо
Every prompt mein ye rule follow karo:

1. **Package versions hamesha verify karo** — copy-paste mat kro docs se
   - Google: `"<package-name> npm latest version"`
   - Terminal: `npm show <package-name> version`
   - Security: `"<package-name> CVE"` ya `"<package-name> npm advisory"`

2. **Kuch bhi hallucinate mat karne do AI ko** — dependencies real hone chahiye
3. **Lockfile commit karo** — reproducibility ke liye
4. **.env files NEVER commit karo** — `.env.example` only

---

## PROMPT 1: Full-Stack Bootstrap (Sabke Liye)

```
Build a production-ready MERN + TypeScript app.

STEP 1: Before any coding
- Web search करो: "Node.js LTS current release" — Active LTS version find karo
- Search करो हर dependency के लिए:
  * "express npm latest version"
  * "mongoose npm latest version"  
  * "react npm latest version"
  * "zod npm latest version"
  * "jsonwebtoken npm security advisory"
  * सभी dependencies के लिए यही pattern करो

- Terminal में confirm करो: `npm show <pkg> version` (हर एक के लिए)

STEP 2: Project structure — यही copy-paste करो

```
ProjectRoot/
├── backend/
│   ├── src/
│   │   ├── server.ts                  # Entry point
│   │   ├── app.ts                     # Express middleware stack
│   │   ├── config/
│   │   │   ├── env.ts                 # Zod validation — crash if bad config
│   │   │   ├── db.ts                  # MongoDB connect
│   │   │   └── passport.ts            # OAuth (only if env vars exist)
│   │   ├── middleware/
│   │   │   ├── requireAuth.ts         # JWT verify
│   │   │   ├── validate.ts            # Zod schemas
│   │   │   ├── roleGuard.ts           # Role enforcement
│   │   │   └── errorHandler.ts        # Central error handler
│   │   ├── modules/                   # Domain resources
│   │   │   ├── auth/
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── auth.schema.ts
│   │   │   ├── users/
│   │   │   │   ├── user.routes.ts
│   │   │   │   ├── user.controller.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   ├── user.model.ts
│   │   │   │   └── user.schema.ts
│   │   │   └── [OTHER RESOURCES]
│   │   ├── services/
│   │   │   ├── email.service.ts
│   │   │   └── cron.service.ts
│   │   ├── sockets/
│   │   │   └── index.ts               # Socket.io with JWT guard
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   ├── encryption.ts
│   │   │   ├── ownershipCheck.ts
│   │   │   └── tokenCompare.ts
│   │   └── types/
│   │       └── express.d.ts           # Augment Request
│   ├── postman/
│   │   ├── collection.json
│   │   └── environment.json
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── lib/
│   │   │   ├── env.ts                 # VITE_* validation
│   │   │   └── api/
│   │   │       ├── client.ts          # Axios + interceptors
│   │   │       └── refreshClient.ts   # No interceptors (prevent loop)
│   │   ├── auth/
│   │   │   ├── AuthProvider.tsx
│   │   │   └── tokenStore.ts          # Memory only
│   │   ├── components/
│   │   │   ├── RequireAuth.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── features/
│   │   │   └── [DOMAIN RESOURCES]
│   │   │       ├── api.ts             # TanStack Query hooks
│   │   │       ├── components/
│   │   │       └── types.ts
│   │   └── pages/
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── docs/
    ├── API_DOCS.md                    # Endpoint documentation
    └── SETUP.md                       # Development setup
```

STEP 3: Environment Variables

Backend `.env.example`:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/app_name
JWT_ACCESS_SECRET=replace_with_64_char_hex_string
JWT_REFRESH_SECRET=replace_with_different_64_char_hex_string
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173
ENCRYPTION_KEY=replace_with_64_char_hex_string
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USER=resend
SMTP_PASS=your_api_key
EMAIL_FROM=noreply@yourdomain.com
SENTRY_DSN=https://your_sentry_dsn_here
GOOGLE_CLIENT_ID=optional_google_id
GOOGLE_CLIENT_SECRET=optional_google_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback
```

Frontend `.env.example`:
```
VITE_API_BASE_URL=http://localhost:5000
VITE_VAPID_PUBLIC_KEY=optional_vapid_key
```

STEP 4: Backend Setup

`.env.ts` (Zod validation — crash if bad):
```typescript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number).default('5000'),
  MONGODB_URI: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  CLIENT_URL: z.string().url(),
  CORS_ORIGINS: z.string(),
  ENCRYPTION_KEY: z.string().length(64),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ Bad env config:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
```

`app.ts` (Middleware order matters):
```typescript
import * as Sentry from '@sentry/node';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

const app = express();

// 1. Sentry (first)
app.use(Sentry.Handlers.requestHandler());

// 2. Security headers
app.use(helmet());

// 3. CORS — explicit origins only
app.use(cors({
  origin: env.CORS_ORIGINS.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// 4. Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// 5. NoSQL injection prevention
app.use(mongoSanitize());

// 6. Logging
if (env.NODE_ENV === 'development') app.use(morgan('dev'));

// 7. Global rate limit
const globalLimiter = rateLimit({
  windowMs: 60_000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

// 8. Auth route strict limit
const authLimiter = rateLimit({
  windowMs: 60_000,
  max: 10,
  skipSuccessfulRequests: true,
});
app.use('/api/v1/auth', authLimiter);

// 9. Health checks (fast, no DB)
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/ready', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.json({ status: 'ready' });
  } else {
    res.status(503).json({ status: 'not ready' });
  }
});

// 10. Routes
app.use('/api/v1', router);

// 11. Sentry error handler
app.use(Sentry.Handlers.errorHandler());

// 12. Central error handler (last)
app.use(errorHandler);

export default app;
```

STEP 5: Frontend Setup

`src/lib/api/client.ts`:
```typescript
import axios from 'axios';
import { tokenStore } from '../../auth/tokenStore';
import { refreshClient } from './refreshClient';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api/v1',
  withCredentials: true,
  timeout: 10_000,
});

// Attach token to requests
client.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Single-flight refresh on 401
let isRefreshing = false;
let refreshQueue: Array<{ resolve: Function; reject: Function }> = [];

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 &&
        error.response?.data?.error?.code === 'TOKEN_EXPIRED' &&
        !original._retry) {
      original._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then(token => {
          original.headers.Authorization = `Bearer ${token}`;
          return client(original);
        });
      }
      isRefreshing = true;
      try {
        const { data } = await refreshClient.post('/auth/refresh');
        tokenStore.set(data.data.accessToken);
        refreshQueue.forEach(p => p.resolve(data.data.accessToken));
        refreshQueue = [];
        original.headers.Authorization = `Bearer ${data.data.accessToken}`;
        return client(original);
      } catch {
        refreshQueue.forEach(p => p.reject());
        refreshQueue = [];
        tokenStore.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);
```

`src/lib/api/refreshClient.ts` (no interceptors):
```typescript
import axios from 'axios';
export const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api/v1',
  withCredentials: true,
});
```

`src/auth/tokenStore.ts` (memory only):
```typescript
let _token: string | null = null;
export const tokenStore = {
  get: () => _token,
  set: (t: string) => { _token = t; },
  clear: () => { _token = null; },
};
```

STEP 6: Key Files

`src/utils/ownershipCheck.ts`:
```typescript
import { Model, Types } from 'mongoose';

export async function assertOwnership<T>(
  ModelClass: Model<T>,
  resourceId: string,
  userId: string
): Promise<T> {
  const doc = await ModelClass.findOne({
    _id: new Types.ObjectId(resourceId),
    userId: new Types.ObjectId(userId),
  });
  if (!doc) {
    const err = new Error('Resource not found') as any;
    err.statusCode = 404;
    err.code = 'NOT_FOUND';
    throw err;
  }
  return doc;
}
```

`src/utils/tokenCompare.ts`:
```typescript
import crypto from 'crypto';
export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
```

STEP 7: Error Response Shape (सभी endpoints में use करो)

```typescript
// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human readable message",
    "fields": { "email": ["Invalid format"] }
  }
}

// Success
{
  "success": true,
  "data": { ...resource }
}

// Paginated
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

STEP 8: .gitignore (root + backend + frontend में same)

```
# Dependencies
node_modules/

# Environment & secrets — NEVER commit
.env
.env.*
!.env.example

# Keys
*.pem
*.key
id_rsa
id_ed25519
*.p12
*.pfx

# Build output
dist/
build/
out/
*.tsbuildinfo

# Logs
*.log
npm-debug.log*
coverage/
.nyc_output/

# OS
.DS_Store
Thumbs.db
```

STEP 9: .cursorignore (AI indexing से बचाने के लिए)

```
.env
.env.*
!.env.example
node_modules/
dist/
build/
coverage/
*.pem
*.key
*.p12
*.pfx
```

STEP 10: package.json Dependencies (verified versions के साथ)

[यहाँ अपने verified versions डालो]

- express: [latest search करके डालो]
- mongoose: [latest search करके डालो]
- zod: [latest search करके डालो]
- jsonwebtoken: [latest + advisory check]
- bcryptjs: [latest]
- helmet: [latest]
- cors: [latest]
- express-rate-limit: [latest]
- express-mongo-sanitize: [latest]
- socket.io: [latest]
- node-cron: [latest]
- nodemailer: [latest]
- winston: [latest]
- @sentry/node: [latest]
- react: [latest]
- axios: [latest]
- react-router-dom: [latest]
- @tanstack/react-query: [latest]
- react-hook-form: [latest]
- dompurify: [latest]

STEP 11: Deliverables

✅ .env.example (backend + frontend)
✅ .gitignore (root)
✅ .cursorignore (root)
✅ tsconfig.json (strict mode)
✅ Postman collection + environment
✅ README with setup instructions
✅ API documentation for each endpoint
✅ Full CI workflow (.github/workflows/ci.yml)

STEP 12: CI Setup

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 'lts/*'
      
      - name: Install backend
        run: cd backend && npm ci
      
      - name: Install frontend
        run: cd frontend && npm ci
      
      - name: Typecheck backend
        run: cd backend && npx tsc --noEmit
      
      - name: Typecheck frontend
        run: cd frontend && npx tsc --noEmit
      
      - name: Lint (if configured)
        run: cd backend && npm run lint
      
      - name: Audit dependencies
        run: npm audit --audit-level=high
```

---

Ab ready ho gaya? Jab भी new project शुरु करो, यही steps follow करो।
```

---

## PROMPT 2: Backend-Only (Sirf API चाहिए)

```
Build a production-ready Express 5 + TypeScript backend.

Domain: [YOUR DOMAIN — e.g., "scheduling", "e-commerce", "project management"]
Primary resources: [e.g., "events, appointments, teams"]

BEFORE CODING:
1. Web search करो: "Node.js LTS current" → Active LTS version
2. Har dependency के लिए search करो:
   - "express latest version npm"
   - "mongoose latest version npm"
   - "jsonwebtoken security advisory npm"
   - "bcryptjs latest npm"
   - "zod latest npm"
   - सभी dependencies के लिए

3. Terminal confirm: `npm show <pkg> version`

REQUIREMENTS:

✅ Environment & Config
  - Zod-validated env.ts → crash on bad config
  - .env.example with all placeholders
  - .gitignore: .env*, keys, node_modules, dist/
  - .cursorignore: .env*, node_modules, keys

✅ Database
  - MongoDB Atlas (cloud) या local MongoDB
  - Mongoose models with TypeScript
  - Connection management in config/db.ts
  - TTL indexes for ephemeral data (sessions, invites)
  - Soft-delete pattern: isDeleted + deletedAt

✅ Authentication
  - Email/password + optional Google OAuth (only if env vars)
  - JWT access token: 15 minutes (JSON response)
  - JWT refresh token: 7 days (HttpOnly; Secure; SameSite=Strict cookie)
  - Refresh token rotation + hashing with bcrypt (cost ≥10)
  - Logout: clear cookie + remove DB entry
  - Token reuse → full revocation (breach detection)
  - crypto.timingSafeEqual() for all comparisons
  - Account lockout after 5 failed attempts (15 min lock)

✅ Security Middleware (in order)
  - Sentry request handler
  - helmet() — secure headers
  - cors() — explicit origins, never '*' with credentials
  - express.json({ limit: '10kb' })
  - express-mongo-sanitize() — NoSQL injection prevention
  - morgan() — logging (dev only)
  - express-rate-limit — global (100/min) + auth (10/min)

✅ API Layer
  - All errors: { success: false, error: { code, message, fields? } }
  - All success: { success: true, data: {...} }
  - Paginated: { success: true, data: [...], pagination: {...} }
  - Zod validation on ALL routes (body, query, params)
  - assertOwnership() in EVERY controller — 404 never 403
  - No IDOR vulnerabilities
  - Generic error messages on auth routes (no email enumeration)

✅ Logging & Monitoring
  - Winston structured logging (production)
  - NO passwords, tokens, API keys, raw PII in logs
  - Sentry error monitoring + scrubbing config
  - Meaningful error codes (VALIDATION_ERROR, TOKEN_EXPIRED, etc.)

✅ Health & Readiness
  - GET /health (fast, no DB call)
  - GET /ready (check MongoDB connection)
  - Exclude from strict rate limits if host polls frequently

✅ Background Jobs (if needed)
  - node-cron for scheduled tasks
  - Email sending via Nodemailer
  - Reminder notifications, cleanup jobs

✅ Real-Time (if needed)
  - Socket.io with JWT auth guard
  - Room-based events
  - No unauthenticated connections

✅ Data Security
  - Passwords hashed with bcryptjs (cost 10+)
  - Sensitive tokens encrypted AES-256-GCM
  - Invite tokens: crypto.randomBytes(32) (not sequential)

✅ Deliverables
  - .env.example with comments
  - API documentation (Postman collection + markdown)
  - README with setup instructions
  - CI workflow (.github/workflows/ci.yml)
```

---

## PROMPT 3: Frontend-Only (Sirf React चाहिए)

```
Build a production-ready React + TypeScript frontend.

API Domain: [e.g., "http://localhost:5000"]
Features: [e.g., "calendar, scheduling, bookings"]

BEFORE CODING:
1. Web search: "React latest version npm"
2. Dependencies:
   - "axios latest npm"
   - "react-router-dom latest npm"
   - "@tanstack/react-query latest npm"
   - "react-hook-form latest npm"
   - "zod latest npm"
   - "dompurify latest npm"
   - सभी के लिए latest + security check

3. Terminal: `npm show <pkg> version`

REQUIREMENTS:

✅ Environment & Validation
  - VITE_API_BASE_URL validated with Zod
  - All VITE_* vars validated in src/lib/env.ts
  - Crash at build if missing

✅ API Client Setup
  - Axios with withCredentials: true
  - Single-flight refresh interceptor on 401
  - Separate refreshClient (no interceptors) to prevent loops
  - Access token in memory only (tokenStore.ts)
  - Refresh token in HttpOnly cookie (handled by server)
  - Retry logic for failed requests

✅ Authentication
  - AuthProvider bootstrap: try refresh → fetch user
  - RequireAuth wrapper for protected routes
  - Login: store access token in memory
  - Logout: clear memory token + API call
  - OAuth callback clears token from URL immediately

✅ Forms & Validation
  - React Hook Form on all forms
  - Zod validation before submission
  - Error messages displayed to user
  - Loading states during submission

✅ Server State Management
  - TanStack Query for all API calls
  - useQuery for reads
  - useMutation for writes
  - Automatic cache invalidation on mutations
  - Error boundaries + loading states
  - Pagination support

✅ Security
  - DOMPurify on all dangerouslySetInnerHTML
  - URL validation before href/src (http: only)
  - No sensitive data in localStorage
  - Error boundary at root level
  - Content Security Policy header (set by backend)

✅ UI/UX
  - Error states handled everywhere
  - Loading spinners on async operations
  - Empty states for lists
  - Paginated lists (not unbounded)
  - File uploads with type + size validation

✅ Deliverables
  - .env.example
  - README
  - Error boundary component
  - RequireAuth wrapper
```

---

## PROMPT 4: Security Hardening (Existing Project को secure करो)

```
Audit & harden this Node.js/React app for production.

BACKEND CHECKLIST:

🔒 Secrets & Config
  ☐ All secrets in .env — ZERO hardcoded
  ☐ .env in .gitignore
  ☐ Only .env.example committed
  ☐ Zod validation at startup → crash if bad
  ☐ JWT secrets: different, ≥64 chars each
  ☐ ENCRYPTION_KEY: 64 hex chars (32 bytes)

🔒 Database
  ☐ MongoDB user is restricted (not root)
  ☐ IP allowlist configured
  ☐ Soft-delete pattern (isDeleted)
  ☐ TTL indexes for ephemeral data

🔒 Authentication
  ☐ Access token: 15 min (JSON)
  ☐ Refresh token: 7 days (HttpOnly cookie)
  ☐ Refresh tokens: bcrypt hashed, rotated
  ☐ Token reuse → full revocation
  ☐ crypto.timingSafeEqual() everywhere
  ☐ Account lockout: 5 fails → 15 min
  ☐ Generic auth errors (no enumeration)
  ☐ Google OAuth state parameter validated

🔒 API Security
  ☐ helmet() enabled
  ☐ cors() with explicit origins
  ☐ express-mongo-sanitize()
  ☐ express-rate-limit (global + auth)
  ☐ express.json({ limit: '10kb' })
  ☐ Zod validation: body, query, params
  ☐ assertOwnership() in EVERY controller
  ☐ 404 not 403 on wrong user
  ☐ No IDOR vulnerabilities

🔒 Logging & Monitoring
  ☐ Winston structured logging
  ☐ No passwords/tokens/PII in logs
  ☐ Sentry error tracking + scrubbing
  ☐ Meaningful error codes
  ☐ GET /health + GET /ready

🔒 Infrastructure
  ☐ npm audit — zero high/critical
  ☐ npm ci in CI (not npm install)
  ☐ HTTPS enforced (production)
  ☐ .cursorignore for AI safety
  ☐ Dependabot or Snyk monitoring

FRONTEND CHECKLIST:

🔒 Token Handling
  ☐ Access token in memory only
  ☐ NO localStorage/sessionStorage for tokens
  ☐ Refresh token in HttpOnly cookie
  ☐ Single-flight refresh interceptor
  ☐ Separate refreshClient (no interceptors)

🔒 XSS Prevention
  ☐ NO dangerouslySetInnerHTML without DOMPurify
  ☐ All user content rendered as text nodes
  ☐ URL validation (http: only)
  ☐ Content Security Policy header present
  ☐ No console.log of tokens

🔒 Forms & Validation
  ☐ React Hook Form + Zod on all forms
  ☐ Validation before submission
  ☐ Error boundary at root

🔒 Dependencies
  ☐ npm audit clean
  ☐ npm ci in CI
  ☐ No unrecognized packages

GDPR & Privacy:
  ☐ GET /users/me/export endpoint
  ☐ DELETE /users/me requires confirmation text
  ☐ Soft-delete: no hard deletion

Done? npm audit करो। High/critical को fix करो।
```

---

## PROMPT 5: Domain-Specific Add-Ons

### SCHEDULING / CALENDAR

```
Add scheduling features to your app.

Resources: events, calendars, teams, reminders, time slots

Features:
  ☐ FullCalendar React UI (dayGridMonth, timeGridWeek, timeGridDay)
  ☐ RRule (RFC 5545) for recurring events — rrule.js
  ☐ All dates stored as UTC — date-fns-tz for conversion
  ☐ Event edit modes: "this" / "this_and_following" / "all"
  ☐ Recurrence exceptions handling
  ☐ Team availability (free/busy) with calendarVisibility
  ☐ Slot finder: common free windows between users
  ☐ Reminders: node-cron every 60s → push/email on trigger
  ☐ Web Push Notifications (VAPID keys)
  ☐ Timezone awareness throughout

DB Schema Hints:
  - Event: title, startTime (UTC), endTime (UTC), rrule, exceptions[], calendarId, teamId
  - Calendar: name, timezone, visibility, ownerId
  - Reminder: eventId, type (push|email), triggerMinutes, deliveredAt
  - TimeSlot: date, startTime, endTime, availability (free|busy)
```

### E-COMMERCE / MARKETPLACE

```
Add shopping & payments to your app.

Resources: products, orders, carts, reviews, categories

Features:
  ☐ Product catalog with images (Cloudinary)
  ☐ Shopping cart (session-based or DB)
  ☐ Stripe payment (server-side intent creation — NO client-side card data)
  ☐ Order state machine: pending → confirmed → shipped → delivered → refunded
  ☐ Inventory tracking with optimistic locking (prevent oversell)
  ☐ Price stored in smallest unit (cents) — never floats
  ☐ Product reviews + ratings
  ☐ Search & filtering
  ☐ Tax & shipping calculation

DB Schema:
  - Product: name, sku, price (cents), inventory, images[], category
  - Order: userId, items[], total (cents), status, stripePaymentId, createdAt
  - Cart: userId, items[], updatedAt
  - Review: productId, userId, rating, text, createdAt
```

### PROJECT MANAGEMENT / KANBAN

```
Add task & project management to your app.

Resources: projects, boards, columns, tasks, comments, files

Features:
  ☐ Kanban board (react-beautiful-dnd or @dnd-kit)
  ☐ Drag-and-drop with fractional indexing (never integer positions)
  ☐ @mentions in comments (notify + email)
  ☐ File attachments (pre-signed S3 URLs)
  ☐ Activity log (who changed what, when)
  ☐ Due dates + reminders
  ☐ Team collaboration + role-based access
  ☐ Webhooks for external integrations

DB Schema:
  - Project: name, ownerId, teamId, description, createdAt
  - Board: projectId, name, columnsOrder[]
  - Column: boardId, name, position (fractional), tasksOrder[]
  - Task: columnId, title, description, assigneeId, dueAt, attachments[], status
  - Comment: taskId, userId, text, mentions[], createdAt, updatedAt
```

### ANALYTICS / DASHBOARD

```
Add analytics & reporting to your app.

Resources: dashboards, widgets, reports, data sources

Features:
  ☐ Chart.js or Recharts for visualizations
  ☐ react-grid-layout for dashboard customization
  ☐ MongoDB aggregation pipelines for metrics
  ☐ Date range filtering (timezone-aware bucketing)
  ☐ Caching: Redis or MongoDB with TTL
  ☐ CSV/Excel export
  ☐ Scheduled report delivery (email)
  ☐ Real-time charts (Socket.io updates)
  ☐ Drill-down capabilities
  ☐ Custom metrics builder

Aggregation Tips:
  - Group by date: $dateToString with timezone
  - Calculate totals: $sum, $avg, $min, $max
  - Compare periods: $facet with different date ranges
  - Cache 1-hour results → recompute on demand
```

### SOCIAL / COMMUNITY

```
Add social features to your app.

Resources: posts, comments, likes, follows, notifications

Features:
  ☐ Infinite scroll (cursor-based pagination)
  ☐ Comment threads (nested replies)
  ☐ Like system
  ☐ Follow/unfollow users
  ☐ Notifications center
  ☐ Fan-out on write vs fan-out on read (choose by scale)
  ☐ Content moderation (soft-delete + report)
  ☐ Full-text search (MongoDB Atlas Search)
  ☐ Mention + tag system
  ☐ Rich text editor (with DOMPurify)

DB Schema:
  - Post: userId, text, images[], createdAt, likesCount, commentsCount, isDeleted
  - Comment: postId, userId, text, parentCommentId, createdAt, likesCount
  - Like: resourceId (post|comment), resourceType, userId, createdAt
  - Follow: followerId, followingId, createdAt
  - Notification: userId, type (like|comment|follow), resourceId, read, createdAt
```

---

## PROMPT 6: API Documentation Template

```
Document EVERY endpoint like this:

### METHOD /api/v1/<resource>/<action>

**Description:** One sentence.
**Auth required:** Yes / No
**Minimum role:** owner / admin / member / public

#### Request

Headers:
  Authorization: Bearer <accessToken>   (if required)
  Content-Type: application/json

Path params:
  :id — MongoDB ObjectId

Query params:
  ?page=1&limit=20

Body:
  {
    "field": "value",       // Required. Description.
    "optionalField": "val"  // Optional. Default null.
  }

#### Response — 200 OK

  {
    "success": true,
    "data": { ...resource }
  }

#### Response — 201 Created (POST)

  {
    "success": true,
    "data": { "_id": "...", ...fields }
  }

#### Response — 400 Validation Error

  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Validation failed",
      "fields": { "email": ["Invalid format"] }
    }
  }

#### Response — 401 Unauthorized

  { "success": false, "error": { "code": "TOKEN_EXPIRED", "message": "..." } }

#### Response — 403 Forbidden

  { "success": false, "error": { "code": "FORBIDDEN", "message": "..." } }

#### Response — 404 Not Found

  { "success": false, "error": { "code": "NOT_FOUND", "message": "..." } }

#### Postman Example

Method: POST
URL: {{baseUrl}}/api/v1/<resource>
Body (raw JSON):
  { "field": "example" }

#### Use Cases

- User creates X by sending this request
- Admin reviews Y via this endpoint

#### Business Rules

- Only owner can modify
- Field X must be unique per user
```

---

## Error Codes Master Reference

| HTTP | Code | When |
|------|------|------|
| 400 | `VALIDATION_ERROR` | Zod validation failed |
| 400 | `INVALID_REQUEST` | Logically invalid (e.g., end before start) |
| 400 | `CONFIRM_TEXT_MISMATCH` | Destructive action confirmation text wrong |
| 401 | `UNAUTHORIZED` | No token provided |
| 401 | `TOKEN_EXPIRED` | Access token expired → refresh |
| 401 | `TOKEN_INVALID` | Token tampered |
| 401 | `REFRESH_TOKEN_INVALID` | Refresh token not found |
| 403 | `FORBIDDEN` | Wrong role |
| 403 | `CANNOT_SELF_DEMOTE` | User can't remove own role |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Duplicate (unique field exists) |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Unhandled error → check Sentry |

---

## Quick Reference Checklist

### Every Backend Project Must Have:

- [ ] `.env` + `.env.example`
- [ ] `.gitignore` (node_modules, .env, keys, dist, build)
- [ ] `.cursorignore` (sensitive paths)
- [ ] `tsconfig.json` (strict mode)
- [ ] `src/config/env.ts` (Zod validation)
- [ ] `src/app.ts` (middleware stack)
- [ ] `src/server.ts` (entry point)
- [ ] `src/middleware/errorHandler.ts` (central handler)
- [ ] `src/utils/ownershipCheck.ts` (IDOR prevention)
- [ ] `src/utils/tokenCompare.ts` (timing-safe comparison)
- [ ] Postman collection + environment
- [ ] API documentation (markdown or Postman)
- [ ] README with setup steps
- [ ] CI workflow (.github/workflows/ci.yml)

### Every Frontend Project Must Have:

- [ ] `.env.example`
- [ ] `.gitignore`
- [ ] `src/lib/env.ts` (VITE_* validation)
- [ ] `src/lib/api/client.ts` (Axios + interceptor)
- [ ] `src/lib/api/refreshClient.ts` (separate, no interceptors)
- [ ] `src/auth/tokenStore.ts` (memory only)
- [ ] `src/auth/AuthProvider.tsx` (bootstrap session)
- [ ] `src/components/RequireAuth.tsx` (route guard)
- [ ] `src/components/ErrorBoundary.tsx` (error handling)
- [ ] README

---

## Common Pitfalls (isko mat करो)

❌ Version numbers copy-paste करना
❌ localStorage में tokens store करना
❌ .env commit करना
❌ assertOwnership() भूल जाना
❌ CORS को '*' रखना
❌ Passwords को plain text में log करना
❌ IDOR vulnerability (userId filter भूल जाना)
❌ Token comparison के लिए `===` use करना
❌ Single refresh instance को interceptor के साथ use करना
❌ dangerouslySetInnerHTML बिना DOMPurify के

---

**Last Updated:** July 2026
**For questions:** Refer to PROJECT_BLUEPRINT.md Section 11-12