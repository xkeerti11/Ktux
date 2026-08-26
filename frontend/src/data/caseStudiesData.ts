import type { CaseStudy } from '../lib/api/types';

export interface ExtendedCaseStudy extends CaseStudy {
  tagline?: string;
  liveUrl?: string;
  githubUrl?: string;
  socketUrl?: string;
  role?: string;
  projectType?: string;
  problemStatement?: string;
  featureSections?: Array<{
    title: string;
    description: string;
    items?: string[];
  }>;
  techMatrix?: Array<{
    layer: string;
    technologies: string;
  }>;
  architectureFlow?: string;
  resumePoints?: string[];
}

export const CASE_STUDIES_DATA: ExtendedCaseStudy[] = [
  {
    _id: 'aurevia-health',
    slug: 'aurevia-health',
    title: 'Aurevia Health',
    tagline: 'Enterprise Clinical Care & Practice Management Platform',
    industryTag: 'Healthcare',
    role: 'Lead Full-Stack Architect & Developer',
    projectType: 'Production-Grade Healthcare Web Application',
    liveUrl: 'https://aureviahealth.netlify.app',
    githubUrl: 'https://github.com/xkeerti11/Aurevia',
    overview:
      'Aurevia Health is an enterprise-grade full-stack healthcare platform engineered for specialty multi-clinic practices. It integrates an ultra-responsive patient booking wizard with anti-collision atomic slot locks, AES-256-GCM encrypted health records, role-based clinical administration, and automated doctor scheduling backed by PostgreSQL and Express.js.',
    challenge:
      'Multi-clinic practices suffer from double-booking collisions under concurrent traffic, data privacy vulnerabilities in handling sensitive patient medical histories, and slow administrative triage workflows that increase patient wait times and clinician burnout.',
    solution:
      'Architected a high-concurrency clinical ecosystem featuring database-level atomic slot locking, AES-256-GCM cryptography for data-at-rest, a dynamic 4-step triage booking wizard, automated doctor availability generation, and a real-time clinical admin portal.',
    results: [
      { label: 'Booking Conflicts', value: '0 Conflicts' },
      { label: 'Data Encryption', value: 'AES-256-GCM' },
      { label: 'Security Defense', value: '5-Attempt Lockout' },
      { label: 'Infrastructure Uptime', value: '99.9% Uptime' },
    ],
    images: ['/images/projects/aurevia.jpg'],
    techStack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Express.js v5',
      'PostgreSQL (Supabase)',
      'Prisma ORM 7',
      'AES-256-GCM',
      'JWT & Bcrypt',
      'Helmet.js',
      'Framer Motion',
      'Netlify',
      'Render',
    ],
    clientName: 'Aurevia Clinical Network',
    clientReview:
      'Aurevia Health eliminated our double-booking issues overnight while giving our clinical staff enterprise-grade security and a blazing fast patient intake workflow.',
    published: true,
    featureSections: [
      {
        title: '🏥 Patient-Facing Experience',
        description: 'Designed for effortless patient engagement and high conversion across all devices.',
        items: [
          'Dynamic 4-Step Consultation Booking Wizard: Specialty selection, live doctor schedule lookup, patient triage intake, and instant confirmation code (#AU-XXXX) generation.',
          'Specialist & Treatment Directory: Dedicated doctor profiles, patient testimonials, treatment sub-specialties, and clinical health resources with category filtering.',
          'Smart Responsive Design: 100% mobile-first design with sticky quick-action bar, clinical emergency hotline triggers, and WhatsApp consultation integrations.',
        ],
      },
      {
        title: '🔐 Enterprise Security & HIPAA Standards',
        description: 'Multi-layer defense ensuring medical data privacy and attack resistance.',
        items: [
          'AES-256-GCM Data Encryption at Rest: Encrypts sensitive patient health data, symptoms, and medical history with 16-byte random IVs and authentication tags.',
          'Atomic Collision Lock (Anti Double-Booking): Database-level unique constraint (doctorId + date + slot) preventing double booking during high concurrent traffic.',
          'Enterprise Admin Auth & Lockout Defense: Custom JWT authentication with bcrypt (cost factor 12), token-bucket rate limiting (100 req/15min), and automatic 5-attempt account lockout (15-minute freeze).',
          'Secure Password Reset Pipeline: 1-hour time-limited cryptographic SHA-256 password reset tokens with real-time password strength validation.',
          'HTTP Security Headers: Strict Content-Security-Policy, X-Frame-Options clickjacking protection, and X-Content-Type-Options via Helmet.js.',
        ],
      },
      {
        title: '📊 Practice Management & Admin Portal',
        description: 'Comprehensive operational tools for clinic staff, doctors, and practice managers.',
        items: [
          'Real-Time Clinical Queue: Instant appointment triage, status management (CONFIRMED, COMPLETED, CANCELLED, NO_SHOW).',
          'Patient Inquiry & Conversion Pipeline: Kanban-style lead tracker with WhatsApp and direct call action triggers.',
          'Doctor Roster & Availability Engine: Automated slot generation algorithm calculating available slots based on doctor schedules and buffer times.',
        ],
      },
    ],
    techMatrix: [
      { layer: 'Frontend', technologies: 'React 19, TypeScript, Vite, Vanilla CSS Design System, Framer Motion, Lucide Icons, Canvas Confetti' },
      { layer: 'Backend API', technologies: 'Node.js, Express.js (v5), TypeScript, Zod Schema Validation' },
      { layer: 'Database & ORM', technologies: 'Cloud PostgreSQL (Supabase), Prisma ORM 7, Better-SQLite3 (Local)' },
      { layer: 'Security & Auth', technologies: 'JSON Web Tokens (JWT), Bcrypt.js, AES-256-GCM Cryptography, Helmet.js' },
      { layer: 'Deployment & DevOps', technologies: 'Netlify (Frontend CDN with SPA Redirects), Render.com (Backend Web Service), UptimeRobot (24/7 KeepAlive)' },
    ],
    architectureFlow: `[ Patient / Browser ] 
        │
        ├── 🌐 Netlify Edge CDN (React 19 + TypeScript SPA)
        │
        └── 🛡️ Render.com (Express.js REST API with Rate Limiting & Helmet)
                │
                ├── 🔐 Auth Guard (JWT + 5-Fail Lockout + Crypto Token Reset)
                ├── 🛡️ Data Shield (AES-256-GCM Encryption Engine)
                └── 🐘 Supabase PostgreSQL (Prisma 7 Pooler Connection)`,
    resumePoints: [
      'Engineered Aurevia Health, an enterprise clinical platform handling appointment scheduling, patient intake, and doctor roster management.',
      'Implemented AES-256-GCM cryptographic encryption for sensitive medical data and Atomic Collision Locking to eliminate concurrent double-booking conflicts.',
      'Built a secure role-based admin authentication system featuring JWT tokens, bcrypt hashing, automated 5-attempt account lockout, and time-expiring reset tokens.',
      'Architected dual-engine database support (PostgreSQL for production on Supabase, SQLite for offline development) using Prisma ORM.',
      'Deployed a high-availability architecture across Netlify CDN and Render.com with automated 24/7 keep-alive monitoring.',
    ],
  },
  {
    _id: 'fluentai',
    slug: 'fluentai',
    title: 'FluentAI',
    tagline: 'AI-Powered English Speaking Coach for Hindi Speakers',
    industryTag: 'Education',
    role: 'Full-Stack AI Engineer & Architect',
    projectType: 'Full-Stack AI Voice Web Application',
    liveUrl: 'https://fluentai-ten.vercel.app',
    githubUrl: 'https://github.com/xkeerti11/fluentai',
    overview:
      'FluentAI is a full-stack AI web application designed specifically for Hindi-speaking users who struggle with English speaking confidence. The app combines real-time voice AI, a 180-day structured curriculum, spaced repetition vocabulary system, and progress tracking — all in one platform.',
    challenge:
      'Millions of Hindi speakers want to learn English but face three core barriers: lack of affordable speaking practice partners (traditional apps are passive), grammar explanations delivered only in English, and generic one-size-fits-all feedback without personalized correction.',
    solution:
      'Built an interactive AI voice companion named Aria with real-time speech synthesis, 46 bilingual grammar modules (A0 to C2) with Hindi explanations, a 500+ word spaced repetition vocabulary engine, and a Bring Your Own API Key (BYOK) architecture ensuring zero operating costs.',
    results: [
      { label: 'Operating Cost', value: 'Zero Cost (BYOK)' },
      { label: 'Grammar Modules', value: '46 Lessons (A0→C2)' },
      { label: 'Curriculum Depth', value: '180-Day Path' },
      { label: 'Vocab Retention', value: '500+ Words SRS' },
    ],
    images: ['/images/projects/fluentai.jpg'],
    techStack: [
      'Next.js 14 (App Router)',
      'TypeScript',
      'Groq Llama 3.3 70B',
      'OpenAI GPT-4o Mini',
      'Gemini 2.0 Flash',
      'Supabase Auth & PostgreSQL',
      'Web Speech API',
      'Zustand',
      'Recharts',
      'Tailwind CSS',
      'Vercel',
    ],
    clientName: 'FluentAI Community',
    clientReview:
      'FluentAI gives learners the freedom to practice spoken English daily with real-time feedback and Hindi grammar explanations, transforming hesitation into fluency.',
    published: true,
    featureSections: [
      {
        title: '🎤 AI Voice Tutor — Aria',
        description: 'Real-time conversation powered by Groq Llama 3.3 70B and Web Speech Recognition/Synthesis APIs.',
        items: [
          'Live microphone speech recognition with custom interim/final transcript handling to prevent duplicate words.',
          'Natural English conversational responses with organic grammar correction and polite suggestions.',
          'Adaptive follow-up questions tailored to user confidence level and topic context.',
        ],
      },
      {
        title: '📝 Grammar Module (A0 → C2)',
        description: '46 structured lessons covering fundamental to advanced English mechanics with Hindi explanations.',
        items: [
          'Hindi explanation of grammar concepts with color-coded sentence formulas.',
          'Side-by-side correct vs incorrect example comparisons.',
          'AI-powered practice mode focused on specific rules with 5-question quizzes and instant Hindi feedback.',
        ],
      },
      {
        title: '📖 Vocabulary Builder & 3 Conversation Modes',
        description: '500+ topic-wise words with spaced repetition (1, 3, 7, 14, 30 days) and Hinglish memory tricks.',
        items: [
          'Flashcard-style learning with 3D flip animations and mastery score tracking.',
          '3 Modes: Free Talk (open conversation), Daily Lesson (180-day path), and Roleplay (job interviews, client calls, restaurants).',
          'GitHub-style streak heatmap calendar, speaking minutes counter, and level progression tracking.',
        ],
      },
      {
        title: '🤖 Multi-AI Provider Support (BYOK)',
        description: 'Users connect their own free Groq, OpenAI, or Gemini key, making the platform infinitely scalable at zero host cost.',
        items: [
          'Serverless API routes preventing API key leaks to client bundles.',
          'Supabase Row Level Security (RLS) ensuring strict isolation across all user tables.',
          'Google OAuth + Email/Password authentication with 4-step onboarding flow.',
        ],
      },
    ],
    techMatrix: [
      { layer: 'Framework & Language', technologies: 'Next.js 14 (App Router), TypeScript' },
      { layer: 'AI Models (BYOK)', technologies: 'Groq (Llama 3.3 70B), OpenAI (GPT-4o Mini), Google (Gemini 2.0 Flash)' },
      { layer: 'Voice Processing', technologies: 'Web Speech Recognition API, Web Speech Synthesis API' },
      { layer: 'Database & Auth', technologies: 'Supabase (PostgreSQL), Supabase Auth (Email + Google OAuth), Row Level Security (RLS)' },
      { layer: 'State & UI', technologies: 'Zustand, Tailwind CSS, Framer Motion, Recharts, Lucide Icons, Vercel' },
    ],
    architectureFlow: `[ User / Browser Speech API ] 
        │
        ├── 🌐 Vercel Edge (Next.js 14 App Router + Tailwind)
        │
        └── ⚙️ Serverless AI Proxy (Server-side key injection)
                │
                ├── 🤖 Groq Llama 3.3 / OpenAI GPT-4o / Gemini Flash
                └── 🐘 Supabase (PostgreSQL + RLS Isolation)`,
    resumePoints: [
      'Built FluentAI, an AI English speaking tutor designed for Hindi speakers with real-time voice conversations and 46 grammar modules.',
      'Engineered a zero-operating-cost BYOK (Bring Your Own Key) serverless architecture supporting Groq Llama 3.3 70B, OpenAI, and Gemini.',
      'Developed a spaced repetition vocabulary system (1-30 day intervals) and custom Web Speech transcript normalization algorithms.',
      'Secured user progress data using Supabase PostgreSQL with comprehensive Row Level Security (RLS) policies.',
    ],
  },
  {
    _id: 'chatsphere',
    slug: 'chatsphere',
    title: 'ChatSphere',
    tagline: 'Real-Time Communication Platform with WebRTC Audio & 24h Stories',
    industryTag: 'Real-Time & Social',
    role: 'Full-Stack Real-Time Systems Engineer',
    projectType: 'Production-Grade Real-Time Web Application',
    liveUrl: 'https://chatsphere-iota.vercel.app',
    githubUrl: 'https://github.com/xkeerti11/chatsphere',
    socketUrl: 'https://chatsphere-socket.onrender.com',
    overview:
      'ChatSphere is a production-ready real-time communication platform built from scratch. Inspired by WhatsApp and Instagram, it delivers instant messaging via Socket.IO, cross-network peer-to-peer audio calls via WebRTC, 24-hour auto-expiring stories, OTP authentication, and live notifications.',
    challenge:
      'Decoupling real-time socket connections from Next.js serverless runtimes, establishing cross-network WebRTC audio calls through firewalls and mobile networks, and preventing duplicate audio instances on desktop clients.',
    solution:
      'Engineered a dedicated Node.js Socket.IO server on Render paired with STUN/TURN (Metered.ca) WebRTC infrastructure, a unified root layout audio manager with Wake Lock API, and Cloudinary media pipelines.',
    results: [
      { label: 'Socket Latency', value: '<50ms' },
      { label: 'Audio Calling', value: 'P2P WebRTC' },
      { label: 'Story Expiry', value: '24h Auto-Purge' },
      { label: 'API Coverage', value: '20+ Routes' },
    ],
    images: ['/images/projects/chatsphere.jpg'],
    techStack: [
      'Next.js 14 (App Router)',
      'TypeScript',
      'Node.js',
      'Socket.IO',
      'WebRTC (STUN/TURN)',
      'PostgreSQL (Neon)',
      'Prisma ORM',
      'Cloudinary',
      'Zustand',
      'JWT & Bcrypt',
      'Nodemailer',
      'Tailwind CSS',
      'Vercel',
      'Render',
    ],
    clientName: 'ChatSphere Community',
    clientReview:
      'ChatSphere brings snappy real-time messaging, crisp WebRTC audio calls, and rich stories together in an intuitive, high-performance interface.',
    published: true,
    featureSections: [
      {
        title: '💬 Real-Time Messaging & Presence',
        description: 'Sub-50ms message exchange and live activity indicators.',
        items: [
          'Bidirectional real-time message delivery via Socket.IO with double-tick read receipts.',
          'Animated typing dots, online/offline status indicators, and live unread badge counters.',
          'Image and document media sharing with Cloudinary optimization.',
        ],
      },
      {
        title: '📞 Peer-to-Peer WebRTC Audio Calls',
        description: 'Crystal-clear audio calling across cellular and WiFi networks.',
        items: [
          'Cross-network peer connections via STUN and TURN servers (Metered.ca).',
          'Global incoming call popup with waveform visualizer, mute/unmute, and call timer.',
          'Mobile call stability via Wake Lock API and ICE restart mechanisms.',
        ],
      },
      {
        title: '📸 24-Hour Stories & Notifications',
        description: 'Engaging ephemeral content and real-time alerts.',
        items: [
          '24-hour auto-expiring photo and video stories with full-screen progress viewer and swipe navigation.',
          'Live notification bell with unread count badges and instant friend request alerts.',
          'OTP-based email verification, JWT session tokens, and secure password reset flow.',
        ],
      },
    ],
    techMatrix: [
      { layer: 'Frontend Client', technologies: 'Next.js 14, TypeScript, Tailwind CSS, Zustand, Lucide Icons' },
      { layer: 'Real-Time Server', technologies: 'Node.js, Socket.IO, WebRTC (STUN/TURN Metered.ca)' },
      { layer: 'Database & Storage', technologies: 'Serverless PostgreSQL (Neon), Prisma ORM, Cloudinary Media CDN' },
      { layer: 'Auth & Security', technologies: 'JWT, Bcrypt, OTP Email Verification via Nodemailer' },
      { layer: 'Hosting & DevOps', technologies: 'Vercel (Frontend), Render (Socket Server)' },
    ],
    architectureFlow: `[ Next.js 14 Client (Vercel) ] 
        │
        ├── 🔌 Dedicated Socket Server (Render.com / Node.js)
        │       ├── Real-time messaging & typing events
        │       └── WebRTC signaling (STUN / TURN Metered.ca)
        │
        └── 🐘 Serverless PostgreSQL (Neon + Prisma ORM)
                └── 📁 Cloudinary Media Pipeline`,
    resumePoints: [
      'Architected and deployed ChatSphere, a full-stack real-time chat and WebRTC audio calling platform.',
      'Engineered cross-network peer-to-peer audio calls with STUN/TURN server configuration and Wake Lock API support.',
      'Implemented a separate high-throughput Socket.IO server on Render to decouple real-time communication from serverless Next.js.',
      'Developed 24-hour auto-expiring media stories, double-tick read receipts, and OTP-verified authentication pipelines.',
    ],
  },
  {
    _id: 'monarch-residences',
    slug: 'monarch-residences',
    title: 'Monarch Residences',
    tagline: 'Ultra-Luxury Editorial Real Estate Web Application',
    industryTag: 'Real Estate',
    role: 'Frontend Architect & UI/UX Motion Specialist',
    projectType: 'High-End Luxury Web Application',
    liveUrl: 'https://monarch-residences.netlify.app/',
    githubUrl: 'https://github.com/xkeerti11/Monarch-Residence',
    overview:
      'Monarch Residences is an editorial, ultra-luxury real estate platform designed to deliver an immersive digital experience for premium property buyers and investors. Built with React, TypeScript, and GSAP ScrollTrigger, it features interactive floor plans, multi-currency conversion, and dynamic mortgage calculators.',
    challenge:
      'Luxury real estate buyers expect high-performance visual fidelity, seamless responsive interactions, and instant financial estimations without sluggish page reloads or jarring animations.',
    solution:
      'Designed an editorial UI with 60 FPS GSAP ScrollTrigger transitions, an interactive 3D floor plan visualizer, a live multi-currency switcher (INR, USD, EUR, GBP, AED), an EMI mortgage calculator, and automated lead capture modals.',
    results: [
      { label: 'Animation Performance', value: '60 FPS GSAP' },
      { label: 'Currency Support', value: '5 Global Currencies' },
      { label: 'Financial Tools', value: 'Interactive EMI' },
      { label: 'Page Speed', value: '99/100 Lighthouse' },
    ],
    images: ['/images/projects/monarch.jpg'],
    techStack: [
      'React 18',
      'TypeScript',
      'GSAP (ScrollTrigger)',
      'Tailwind CSS',
      'Vite',
      'Lucide Icons',
      'Canvas Animation',
      'Netlify',
    ],
    clientName: 'Monarch Luxury Group',
    clientReview:
      'Monarch Residences redefines the digital showroom with breathtaking motion design, intuitive floor plan tools, and instant financial clarity.',
    published: true,
    featureSections: [
      {
        title: '✨ Immersive Visual Experience & Motion',
        description: 'Editorial luxury design crafted for maximum aesthetic impact and smoothness.',
        items: [
          'High-performance GSAP ScrollTrigger animations, clip-path reveals, and responsive luxury typography.',
          'Interactive Floor Plans & Building Canvas: Dynamic visual exploration tools enabling buyers to inspect layouts, dimensions, and specifications.',
          'Neighborhood Proximity Guide: Curated highlights for airport, fine dining, and elite schools.',
        ],
      },
      {
        title: '🧮 Smart Financial & Comparison Tools',
        description: 'Interactive computational tools built for high-intent property investors.',
        items: [
          'Side-by-side Property Comparison Engine: Compare carpet areas, amenities, and price per sq. ft.',
          'Interactive Mortgage / EMI Calculator: Real-time loan tenure, interest rate, and down payment calculations.',
          'Multi-Currency Switcher: Instant conversion across USD, INR, EUR, GBP, and AED.',
        ],
      },
      {
        title: '📥 Lead Capture & High-Intent Conversion Flow',
        description: 'Frictionless inquiry avenues for prospective luxury homeowners.',
        items: [
          'Integrated digital brochure download modal with contact capture.',
          'Property-specific inquiry dispatch forms.',
          'Direct VIP WhatsApp booking and concierge consultation integration.',
        ],
      },
    ],
    techMatrix: [
      { layer: 'Core Framework', technologies: 'React 18, TypeScript, Vite' },
      { layer: 'Animation & Motion', technologies: 'GSAP 3, ScrollTrigger, CSS Clip-Path Transitions' },
      { layer: 'Styling & Icons', technologies: 'Tailwind CSS, Lucide React, Custom Dark Gold Luxury Tokens' },
      { layer: 'Tools & Utilities', technologies: 'Custom Financial EMI Calculator Engine, Live Currency Conversion Matrix' },
      { layer: 'Deployment', technologies: 'Netlify CDN with Instant Edge Caching' },
    ],
    architectureFlow: `[ Luxury Buyer / Browser ] 
        │
        ├── 🌐 Netlify Edge CDN (React 18 + Vite SPA)
        │
        └── 🎨 GSAP Motion Engine (ScrollTrigger + 60fps canvas)
                ├── 📐 Interactive Floor Plan Visualizer
                ├── 💱 Real-Time Multi-Currency Engine
                └── 💰 Dynamic Mortgage EMI Calculator`,
    resumePoints: [
      'Architected and developed a full-featured luxury real estate web application using React 18, TypeScript, and Tailwind CSS.',
      'Implemented fluid scroll-driven animations, counters, and page transitions using GSAP (ScrollTrigger) for an enhanced editorial user experience.',
      'Designed modular state management for interactive features including an EMI Mortgage Calculator, Property Comparator, and Live Currency Switcher.',
      'Optimized performance, accessible modal dialogs, and responsive layouts across all device viewports with clean, type-safe architecture.',
    ],
  },
];
