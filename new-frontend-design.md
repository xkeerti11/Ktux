# 🎨 KTUX FRONTEND - COMPLETE PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Product Requirements Document | Premium AI & Web Agency Frontend Specification**

---

## 📋 Document Overview
This document contains the complete frontend specification for building the **Ktux AI Marketing Studio** web application. It includes design system tokens, typography rules, color palettes, micro-animations, global component specifications, full specifications for all 12 pages, interactive widgets, and state management rules.

---

## 🎨 1. Design System & Theme Specification

### 1.1 Color Palette & Tokens
The application supports a dual-surface aesthetic: **Luxury Tech Dark Mode** (`#09090B` / `#1A1A1A`) for primary landing & high-impact pages, and **Minimal Warm Light Mode** (`#F8F7F4` / `#FAFAF8`) for content-heavy views.

| Token Name | Hex Code | Tailwind Equivalent / Usage |
| :--- | :--- | :--- |
| **Primary Surface Dark** | `#09090B` | Near Black background for Hero & Dark theme sections |
| **Card Surface Dark** | `#18181B` | Tailwind `zinc-900` for dark cards & overlays |
| **Primary Surface Light** | `#F8F7F4` | Warm Off-White background for light theme pages |
| **Card Surface Light** | `#FFFFFF` | Pure White for light cards & modal dialogs |
| **Accent Gold (Primary)** | `#C9A227` | Primary CTA buttons, highlight text, active states |
| **Accent Gold (Muted)** | `#A68A64` | Luxury badges, subtle borders, sub-headings |
| **Text Primary (Dark Theme)**| `#FAFAF8` | Warm White for primary headings on dark bg |
| **Text Secondary (Dark Theme)**| `#71717A` | Soft Gray for sub-headings & descriptions |
| **Text Primary (Light Theme)**| `#1A1A1A` | Deep Charcoal for headings on light bg |
| **Text Secondary (Light Theme)**| `#6B7280` | Muted Gray for light theme body text |
| **Border Dark** | `#27272A` | Subtle 1px borders on dark components |
| **Border Light** | `#E5E2DF` | Subtle 1px borders on light components |
| **Success / Verified** | `#22C55E` | Emerald Green for status dots & metrics |

### 1.2 Typography Architecture
- **Headings Font**: `Geist`, sans-serif (Bold / ExtraBold, font-tracking tight)
- **Body Font**: `Manrope`, sans-serif (Regular / SemiBold / Bold)
- **Luxury Accent Font**: `Instrument Serif`, serif (Italics for quotes & luxury tags)
- **Monospace Font**: `JetBrains Mono` (for timestamps & data tags)

### 1.3 Micro-Animations & Motion Design
- **Framework**: `motion/react` (Framer Motion API compatible)
- **Standard Transition**: `transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}`
- **Hover Micro-interactions**: `whileHover={{ scale: 1.02 }}` or `scale: 1.05` for project image zoom
- **Scroll Reveal**: `FadeIn` & `SlideUp` wrappers triggered when 20% in viewport (`viewport={{ once: true, amount: 0.2 }}`)
- **Count-Up Counter**: Animated numeric increase from 0 to final target value over 2 seconds on scroll into view.

---

## 🧱 2. Global Component Specifications

### 2.1 Navbar (`src/components/Navbar.tsx`)
- **Behavior**: Fixed top sticky header with backdrop blur (`backdrop-blur-md bg-[#09090B]/80`).
- **Elements**:
  1. **Brand Logo**: K monogram badge + "KTUX STUDIO" typography with gold accent.
  2. **Navigation Links**: Home, Services, Portfolio, Case Studies, Pricing, About, Blog, Contact.
  3. **Action Button 1**: "AI Audit" (Triggers `AIAuditModal`).
  4. **Action Button 2**: "Book Strategy Call" (Navigates to `/book-consultation`).
  5. **Mobile Drawer**: Slide-out menu for screens `< 1024px` with smooth overlay animation.

### 2.2 Footer (`src/components/Footer.tsx`)
- **Sections**:
  1. **Top CTA Banner**: Luxury architectural CTA with direct link to `/book-consultation`.
  2. **Brand & Mission**: Studio description + "Verified Metric Partner" security badge.
  3. **Architectural Dispatch Newsletter**: Input box + "Subscribe" button posting to `/api/v1/newsletter/subscribe`.
  4. **Navigation Columns**: Quick links for Services, Agency, and Legal links.

### 2.3 Floating AI Concierge Drawer (`src/components/AIChatbotWidget.tsx`)
- **Position**: Floating bottom-right fixed trigger button (`fixed bottom-6 right-6 z-50`).
- **Features**:
  - Animated pulsing green online badge (`Online • Immediate Sync`).
  - Chat window (`360px` mobile / `400px` desktop, height `520px`).
  - Scrollable message stream with timestamps & avatar icons.
  - **Quick Action Chips**: "Calculate Cost", "Book Consultation", "Website Speed", "AI Capabilities".
  - **API Integration**: Sends `{ message, conversationHistory }` to `POST /api/v1/ai/chat`.

### 2.4 Website Audit Engine Modal (`src/components/AIAuditModal.tsx`)
- **Trigger**: Click "AI Audit" from Navbar or Hero CTA.
- **3-Step Flow**:
  1. **Step 1 (Input)**: Input Website URL, Select Industry & Primary Goal, Input Email.
  2. **Step 2 (Analysis)**: Animated progress bar (0% -> 100%) with step status indicator.
  3. **Step 3 (Report Dashboard)**:
     - Circular / Score Cards: Overall Score, Speed Score, SEO Score, UX Score, AI Readiness Score.
     - Executive Summary box.
     - Impact-rated Recommendations List (High / Medium / Low).
     - CTA: "Fix These Issues" -> Navigates to `/book-consultation`.

---

## 📄 3. Page Specifications (12 Page Views)

### 3.1 HomePage (`/`)
- **Hero Section**:
  - Gold pill badge: `"Sub-2s Web Platforms & AI Automations"`.
  - Heading: `"Premium Digital Solutions for Modern Businesses"`.
  - Subheading: Animated typewriter / staggered text `"Design. Develop. Automate. Grow."`.
  - CTA Buttons: Primary Gold `"Book Free Consultation"` + Secondary Outline `"View Portfolio"`.
  - Trust bar: `"100+ Happy Clients | 250+ Projects | 50+ Industries"`.
- **Services Preview Grid**: 5-column grid showing Website Dev, AI Automation, AI UGC Ads, Branding, and AI Agents.
- **Why Choose Us Section**: 2-column layout (Left: 5 benefits with Lucide icons; Right: Interactive dashboard screenshot).
- **Featured Projects**: 3x2 grid of client showcases with hover zoom overlay and metric pills (e.g. `"300+ Leads Generated"`).
- **Process Timeline**: 7-Step vertical timeline (Discovery -> Planning -> Design -> Development -> Testing -> Launch -> Support).
- **Testimonial Carousel**: Auto-play client reviews with video lightbox trigger.
- **FAQ Accordion**: Single-column expandable Q&A items.

### 3.2 Services Overview (`/services`) & Detail (`/services/:serviceSlug`)
- **Hero**: Title, subtitle, service description, "Get Started" CTA.
- **Problems Grid**: 6 cards highlighting industry pain points (e.g. Slow Load Speed, Poor Conversion).
- **Solutions Breakdown**: Feature alternating list with screenshots.
- **Features Comparison Matrix**: Table comparing Starter vs Professional vs Enterprise tiers.
- **Service FAQs**: 5-8 expandable accordion questions.

### 3.3 Portfolio Page (`/portfolio`)
- **Hero**: Title `"Our Work Speaks For Itself"`, search bar, category filter pills.
- **Filter Categories**: All, Real Estate, Education, Legal, Healthcare, E-Commerce, Restaurants, Construction, Interior Design, Startups.
- **Search System**: Real-time debounced filtering by project title or client name.
- **Grid Layout**: Responsive masonry grid with project cards showing title, result metric, and tech stack pills.

### 3.4 Case Studies (`/case-studies`) & Detail (`/case-studies/:slug`)
- **Case Study Header**: Title, client name, industry, timeline, team size.
- **Metrics Section**: 4 large stat counters (e.g. `+300% Leads`, `85% Bounce Reduction`, `$500K Revenue`, `99/100 PageSpeed`).
- **Challenge vs Solution Breakdown**: Detailed narrative of client problem and custom engineering solution.
- **Gallery & Lightbox**: High-res screenshots of desktop & mobile views.

### 3.5 Pricing Page (`/pricing`)
- **Billing Toggle**: Monthly vs Annual (10% discount).
- **3 Plan Cards**:
  - **Starter**: ₹25,000/mo (5 Pages, Admin Panel, Basic SEO).
  - **Professional (Popular)**: ₹65,000/mo (Unlimited Pages, CMS, AI Lead Bot, 24/7 Chat).
  - **Enterprise**: ₹150,000+/mo (Bespoke everything, Custom AI Agents, Dedicated Manager).
- **Interactive Price Calculator**: Page count slider + Add-on toggles (Admin, E-Commerce, AI Features) providing real-time estimate.

### 3.6 Book Consultation Page (`/book-consultation`)
- **3-Step Booking Wizard**:
  - **Step 1**: Select Service (Website Dev, AI Automation, AI UGC Ads, Branding, AI Agents).
  - **Step 2**: Select Date & Available 30-min Time Slot.
  - **Step 3**: Contact & Company Info (Name, Email, Phone, Company, Notes, Meeting Type).
- **API Integration**: Posts payload to `POST /api/v1/consultations/book`.

### 3.7 Contact Page (`/contact`)
- **Form Fields**: Full Name, Email, Phone, Company, Budget Range, Services Checklist, Timeline, Message.
- **Contact Sidebar**: Email, Phone (+91 7084499128), WhatsApp link, Office hours badge.
- **Google Maps Embed**: Interactive map marker.

### 3.8 About Page (`/about`)
- **Narrative**: Agency story from origin to 20+ specialists.
- **Founders Showcase**: High-res photos, bios, expertise pills, and social links.
- **Team Grid**: Filterable by department (Founders, Designers, Developers, Operations).
- **Company Values**: 4 cards highlighting Quality First, Innovation Driven, Client Success, Transparency.

### 3.9 Blog Overview (`/blog`) & Article Detail (`/blog/:slug`)
- **Header**: Title, category tags filter, search bar.
- **Article Card**: Thumbnail image, category tag, title, excerpt, read time, publication date.
- **Post View**: Sticky Table of Contents, Markdown rendered body, author bio box, social share buttons, newsletter callout.

---

## 🔌 4. API Endpoints Integration Reference

| Feature | HTTP Method | Endpoint | Payload / Params |
| :--- | :--- | :--- | :--- |
| **AI Assistant Chat** | `POST` | `/api/v1/ai/chat` | `{ message: string, conversationHistory: Array }` |
| **AI Website Audit** | `POST` | `/api/v1/ai/audit` | `{ url: string, industry: string, primaryGoal: string }` |
| **Book Consultation** | `POST` | `/api/v1/consultations/book` | `{ fullName, email, phone, company, service, dateTime, meetingType }` |
| **Submit Lead Form** | `POST` | `/api/v1/leads` | `{ name, email, phone, company, serviceInterested, budgetRange, message }` |
| **Newsletter Subscribe**| `POST` | `/api/v1/newsletter/subscribe` | `{ email: string }` |
| **Get Available Slots** | `GET` | `/api/v1/consultations/availability` | `?date=YYYY-MM-DD` |
