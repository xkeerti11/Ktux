# 🚀 KTUX WEBSITE - COMPLETE PRD
**Product Requirements Document | Premium AI & Web Development Agency**
 
---
 
## 📋 DOCUMENT METADATA
- **Project Name:** Ktux AI Marketing Studio Website
- **Version:** 1.0
- **Last Updated:** August 2026
- **Status:** Ready for Development
- **Target Audience:** Real estate, schools, law firms, dental clinics, restaurants, construction, startups, local businesses
---
 
## 🎯 EXECUTIVE SUMMARY
 
Ktux is a premium AI-powered digital agency offering websites, AI automation, branding, and AI UGC ads. The website must reflect luxury, innovation, and results-driven approach while establishing trust and generating qualified leads.
 
**Key Goals:**
- Position as premium, trustworthy agency
- Generate qualified leads (consultations + bookings)
- Showcase AI/automation capabilities
- Build authority through case studies
- Automate lead management
---
 
## 🏗️ SITE ARCHITECTURE
 
```
Domain: ktux.com (or assigned domain)
├── / (Home)
├── /services
│   ├── /website-development
│   ├── /ai-automation
│   ├── /ai-ugc-ads
│   ├── /branding
│   ├── /ai-agents (Future)
├── /portfolio
├── /case-studies
├── /about
├── /pricing
├── /blog
├── /contact
├── /book-consultation
├── /ai-assistant
├── /dashboard (Leads Management - Private)
└── /404, /500
```
 
---
 
## 📄 PAGE SPECIFICATIONS
 
### 1️⃣ HOMEPAGE (`/`)
 
#### 1.1 Hero Section
**Purpose:** Immediate impact, establish premium brand perception
 
**Components:**
- **Premium Heading**
  - Text: "Premium Digital Solutions for Modern Businesses"
  - Font: Geist Bold, 56px (desktop) / 36px (mobile)
  - Color: Warm White (#FAFAF8)
  - Animation: Fade in + slide up on load (400ms)
- **Animated Subheading**
  - Text: "Design. Develop. Automate. Grow."
  - Font: Manrope, 20px
  - Color: Soft Gray (#71717A)
  - Animation: Typewriter effect (staggered)
  - Delay: 200ms after heading
- **CTA Buttons**
  - Primary: "Book Free Consultation" → `/book-consultation`
    - Background: Gold (#C9A227)
    - Hover: Glow effect + scale 1.02
    - Font: Manrope Bold, 16px
  - Secondary: "View Portfolio" → `/portfolio`
    - Background: Transparent
    - Border: 1px Luxury Gold
    - Hover: Background fill + text white
- **Dashboard Mockup**
  - Premium screenshot of client dashboard
  - Position: Right side (desktop) / Below CTA (mobile)
  - Animation: Parallax on scroll (20px offset)
  - Border: Minimal 1px Soft Gray
  - Border Radius: 24px
- **Background Animation**
  - Animated gradient mesh (dark tech vibe)
  - Abstract circuit pattern (animated SVG)
  - Opacity: 0.3
  - Animation: Slow drift (8s cycle)
- **Floating Elements**
  - 3-4 floating shapes (circles, squares)
  - Positions: Random, moving smoothly
  - Opacity: 0.15
  - Animation: GSAP Floating
- **Trust Badge**
  - "Trusted by 100+ Businesses Worldwide"
  - Icon: Shield + checkmark
  - Font: Manrope, 14px
  - Color: Gold
  - Position: Below CTA
- **Client Count Counter**
  - "100+ Happy Clients | 250+ Projects | 50+ Industries"
  - Animation: Count up on scroll into view
  - Font: Manrope Bold, 18px
  - Layout: 3-column grid (desktop) / Stacked (mobile)
- **Scroll Indicator**
  - Animated arrow pointing down
  - Animation: Bounce (infinite, 1.5s)
  - Opacity: 0.6
  - Position: Bottom center
  - Disappears after first scroll
**Technical Details:**
- Min Height: 100vh
- Background: Near Black (#09090B) + gradient overlay
- Padding: 160px top (desktop) / 80px top (mobile)
---
 
#### 1.2 Services Preview Section
**Purpose:** Quick overview of offerings, drive to service pages
 
**Layout:** 5-column grid (desktop) / 2-column (tablet) / 1-column (mobile)
 
**Services Cards (Minimal Luxury Style):**
 
| Service | Description | Icon | CTA | Future |
|---------|-------------|------|-----|--------|
| **Website Development** | Premium, SEO-optimized, mobile-first websites with admin panels | Code | Learn More | No |
| **AI Automation** | Custom AI solutions to automate workflows | Zap | Coming Soon | Yes |
| **AI UGC Ads** | AI-generated user-generated content for marketing | Video | Learn More | No |
| **Branding** | Logo, identity, brand guidelines, premium design | Palette | Learn More | No |
| **AI Agents** | Intelligent chatbots, virtual assistants | Bot | Coming Soon | Yes |
 
**Card Design:**
- Background: Transparent → #18181B on hover
- Border: 1px Soft Gray (#71717A)
- Border Radius: 24px
- Padding: 32px
- Transition: All 0.3s ease
- Icon: Lucide, 48px, Gold
- Heading: Geist Bold, 18px, White
- Description: Manrope, 14px, Soft Gray
- CTA: "Learn More →" (Manrope Bold, 14px, Gold)
**Spacing:**
- Gap between cards: 24px
- Section padding: 80px vertical, 40px horizontal
- Max width: 1400px
---
 
#### 1.3 Why Choose Us Section
**Purpose:** Build confidence in Ktux's value proposition
 
**Layout:** 2-column (desktop) / 1-column (mobile)
 
**Left Column - Benefits List:**
 
Each benefit displayed as:
```
[Icon] [Heading]
       [Description]
```
 
**Benefits:**
1. **Fast Delivery**
   - Description: "Projects delivered 2x faster with AI-assisted development"
   - Icon: Zap
2. **Premium Design**
   - Description: "Luxury aesthetic combined with cutting-edge tech"
   - Icon: Sparkles
3. **SEO Optimized**
   - Description: "Rank on Google from day one with built-in SEO"
   - Icon: Target
4. **AI Powered**
   - Description: "Latest AI tools for automation and intelligence"
   - Icon: Brain
5. **Lifetime Support**
   - Description: "Dedicated support even after project launch"
   - Icon: Heart
**Right Column - Visual:**
- Large screenshot or mockup
- Parallax animation
- 3D effect (subtle)
**Technical:**
- Heading: Geist Bold, 28px
- Description: Manrope, 14px, Soft Gray
- Icons: Lucide, 32px, Gold
- Background: Gradient mesh
- Section padding: 80px
---
 
#### 1.4 Featured Projects Section
**Purpose:** Social proof through recent work
 
**Layout:** 3-column grid (desktop) / 2-column (tablet) / 1-column (mobile)
 
**Project Card Structure:**
 
```
┌─────────────────────────┐
│                         │
│     [Project Image]     │
│   (with overlay hover)  │
│                         │
├─────────────────────────┤
│ Industry Tag            │
│ Project Title           │
│ Brief Result            │
│ Tags: tech stack        │
│ "View Case Study →"     │
└─────────────────────────┘
```
 
**Card Specifications:**
- Border Radius: 24px
- Overflow: Hidden
- Hover Effect:
  - Image: Scale 1.05 + opacity darken
  - Overlay appears: "View Case Study →"
  - Background: Rgba(0,0,0,0.7)
  - Button appears: Gold
  - Transition: 0.3s ease
**Content per Card:**
- **Image:** High-quality project screenshot (1200x800px)
- **Tag:** Industry category (Real Estate, Education, Legal)
- **Title:** Project name (Geist Bold, 18px)
- **Result:** "Generated 300+ Leads / $50K Revenue" (Manrope, 14px, Gold)
- **Tech Tags:** React, Next.js, MongoDB, etc. (small pills)
- **CTA:** "View Case Study →" (Manrope Bold, 14px)
**Spacing:**
- Gap: 24px
- Section Padding: 80px
- Show 6 projects initially (3×2 grid)
- "View All Projects" button below → `/portfolio`
---
 
#### 1.5 Process Section
**Purpose:** Transparency, build confidence
 
**Layout:** Vertical timeline (desktop) / Stepped (mobile)
 
**Process Steps:**
 
```
1. Discovery          (Rocket icon)
   ↓
2. Planning          (Lightbulb icon)
   ↓
3. Design            (Palette icon)
   ↓
4. Development       (Code icon)
   ↓
5. Testing           (Bug icon)
   ↓
6. Launch            (Rocket icon)
   ↓
7. Support           (Headset icon)
```
 
**Step Card Design:**
- Number: Geist Bold, 32px, Gold
- Title: Manrope Bold, 18px, White
- Description: Manrope, 14px, Soft Gray
- Icon: Lucide, 48px, Gold
- Background: Transparent → #18181B on hover
- Border: 1px Soft Gray
- Border Radius: 16px
- Padding: 24px
**Timeline Connector:**
- Vertical line (desktop): 2px, Soft Gray, dashed
- Arrow between steps: Gold color
- Animation: Line drawing on scroll
**Spacing:**
- Gap between steps: 32px
- Section padding: 80px
---
 
#### 1.6 Testimonials Section
**Purpose:** Social proof from real clients
 
**Layout:** 3-column carousel (desktop) / 1-column carousel (mobile)
 
**Testimonial Card:**
 
```
┌──────────────────────────┐
│  ⭐⭐⭐⭐⭐            │
│  "Amazing work, truly    │
│   premium quality..."    │
│                          │
│  [Client Image]          │
│  John Doe                │
│  Acme Corp               │
│  [Play Video Icon]       │
└──────────────────────────┘
```
 
**Card Specifications:**
- Background: #18181B
- Border: 1px Soft Gray
- Border Radius: 24px
- Padding: 32px
- Quote: Instrument Serif Italic, 16px
- Author: Manrope Bold, 14px, White
- Company: Manrope, 12px, Soft Gray
- Rating: 5 stars (Gold)
- Image: 48x48px, circular, border-radius: 50%
**Features:**
- Auto-play carousel (4s per slide)
- Pause on hover
- Manual navigation arrows (Gold)
- Dots indicator
- Video testimonial: Lightbox overlay with play button
**Section:**
- Heading: Geist Bold, 36px
- Subheading: Manrope, 16px, Soft Gray
- Show 3 testimonials (6 total available)
- "Load More Testimonials" option
---
 
#### 1.7 FAQ Section
**Purpose:** Answer common questions, reduce friction
 
**Layout:** Single column (max-width: 800px, centered)
 
**FAQ Accordion:**
 
```
Q1: What's your typical project timeline?
├─ Open on click
├─ Close others
└─ Smooth height animation
 
Q2: Do you provide ongoing support?
Q3: Can I modify the website after launch?
Q4: What if I need additional features?
Q5: How much does a website cost?
Q6: Do you offer payment plans?
Q7: What industries do you serve?
Q8: What's your refund policy?
```
 
**Accordion Item:**
- Question: Manrope Bold, 16px, White
- Answer: Manrope, 14px, Soft Gray
- Icon: Chevron (rotates 180° on toggle)
- Background: Transparent → #18181B on hover
- Padding: 20px
- Border: 1px Soft Gray
- Border Radius: 16px
- Margin Bottom: 12px
- Animation: Max-height 0.3s ease
**Styling:**
- Section padding: 80px
- Heading: Geist Bold, 36px
---
 
#### 1.8 CTA Section (Before Footer)
**Purpose:** Last conversion opportunity
 
**Layout:** Center, full width
 
**Components:**
- **Heading:** "Ready to Transform Your Business?"
  - Font: Geist Bold, 36px
  - Color: White
- **Description:** "Get started with a free consultation"
  - Font: Manrope, 16px
  - Color: Soft Gray
- **Buttons:**
  - Primary: "Book Free Consultation" → `/book-consultation`
  - Secondary: "View Pricing" → `/pricing`
**Background:**
- Gradient: Near Black to #18181B
- Accent: Subtle gradient mesh
- Border: 1px Soft Gray top
**Spacing:**
- Padding: 80px (vertical), 40px (horizontal)
- Gap between elements: 24px
---
 
### 2️⃣ SERVICES PAGES (`/services/[service-name]`)
 
**Services:**
1. `/services/website-development`
2. `/services/ai-automation`
3. `/services/ai-ugc-ads`
4. `/services/branding`
5. `/services/ai-agents` (Future - "Coming Soon" overlay)
**Common Structure for All Services:**
 
#### 2.1 Hero Section
- Title: Geist Bold, 48px
- Subtitle: Manrope, 18px
- Description: Manrope, 16px
- CTA: "Get Started" → `/book-consultation`
- Background Image: Service-specific mockup
- Height: 80vh
#### 2.2 Problems Section
**Purpose:** Identify pain points
 
**Layout:** 3-column cards (desktop) / 1-column (mobile)
 
**Problem Cards:**
- Icon: Lucide, 32px
- Title: Manrope Bold, 18px
- Description: Manrope, 14px
**Website Development Problems:**
1. "Slow Loading Websites" - "Your website takes 5+ seconds to load"
2. "Poor User Experience" - "High bounce rates due to confusing navigation"
3. "Mobile Not Optimized" - "Looks terrible on phones"
4. "No Lead Generation" - "Website doesn't convert visitors to customers"
5. "Outdated Technology" - "Built with old frameworks, hard to maintain"
6. "No SEO Presence" - "Invisible on Google search results"
#### 2.3 Solution Section
**Layout:** Text + Image (alternating)
 
**Solution Heading:** Geist Bold, 32px - "Our Premium Solution"
 
**Solutions with Features:**
 
**Website Development:**
- Admin Dashboard (manage content easily)
- CMS Integration (update without coding)
- Payment Gateway (built-in Stripe/Razorpay)
- SEO Optimized (Google-first approach)
- Mobile Responsive (perfect on all devices)
- Fast Loading (< 2 second load time)
- Analytics Dashboard (track performance)
- Security (SSL, data protection)
**AI Automation:**
- Custom AI Workflows (tailored to your needs)
- Task Automation (reduce manual work 80%)
- AI Chatbots (24/7 customer support)
- Data Integration (connect your systems)
- Process Optimization (streamline operations)
- Performance Tracking (real-time insights)
**AI UGC Ads:**
- AI-Generated Content (realistic user-created ads)
- Multi-Platform (Instagram, TikTok, Facebook)
- Cost Effective (90% cheaper than production)
- Fast Turnaround (48 hours)
- A/B Testing Ready (multiple variations)
- High CTR (3-5x better performance)
**Branding:**
- Logo Design (unique monogram/symbol)
- Brand Guidelines (colors, fonts, usage)
- Website Design (premium aesthetic)
- Marketing Collateral (business cards, letterhead)
- Brand Story (compelling narrative)
- Style Guide (comprehensive documentation)
#### 2.4 Benefits Section
**Layout:** Icon + Text, 4-column grid
 
**Benefits (Service-specific):**
- Fast Delivery
- Premium Quality
- SEO Optimized
- AI Powered
- Lifetime Support
- Cost Effective
- Scalable Solution
- Future Proof
**Benefit Card:**
- Icon: Lucide, 32px, Gold
- Title: Manrope Bold, 16px
- Description: Manrope, 12px, Soft Gray
#### 2.5 Features Comparison
**Layout:** Table format
 
**Website Development Features:**
| Feature | Starter | Professional | Enterprise |
|---------|---------|--------------|-----------|
| Pages | 5 | Unlimited | Unlimited |
| Admin Panel | ✓ | ✓ | ✓ |
| CMS | Basic | Advanced | Enterprise |
| Payment Gateway | ✓ | ✓ | ✓ |
| Blog | - | ✓ | ✓ |
| Newsletter | - | ✓ | ✓ |
| Analytics | Basic | Advanced | Custom |
| API Access | - | - | ✓ |
| Support | Email | 24/7 Chat | Dedicated |
 
#### 2.6 Process Section
**Similar to homepage process, but service-specific**
 
#### 2.7 Pricing Section
**With 3 tiers (call-to-action for each)**
 
#### 2.8 FAQ Section
**Service-specific questions (5-8 items)**
 
#### 2.9 CTA Section
**"Ready to get started?" with book consultation button**
 
---
 
### 3️⃣ PORTFOLIO PAGE (`/portfolio`)
 
**Purpose:** Showcase all work, build trust, drive case study views
 
**Layout:**
 
#### 3.1 Hero Section
- Title: "Our Work Speaks For Itself"
- Subtitle: "250+ Projects Across 50+ Industries"
- Search Bar (search by project name)
- Filter Bar (industry categories)
#### 3.2 Portfolio Grid
**Layout:** Masonry/Grid (3-column desktop, 2-column tablet, 1-column mobile)
 
**Project Card Hover Effects:**
- Image: Scale 1.05 + overlay
- Overlay: Dark gradient
- Text appears: "View Case Study →"
- Button: Gold, glow effect
**Project Card Content:**
```
┌────────────────────────────┐
│                            │
│   [Project Image]          │
│   [Tag] Industry Category  │
│                            │
├────────────────────────────┤
│ Project Name               │
│ "300+ Leads Generated"     │
│ React • Node • MongoDB     │
│ View Case Study →          │
└────────────────────────────┘
```
 
**Card Styles:**
- Border Radius: 24px
- Border: 1px Soft Gray
- Padding: 0 (image full)
- Tag: Gold background, dark text
- Heading: Geist Bold, 18px
- Result: Gold, Manrope Bold
- Tech: Gray pills, Manrope, 12px
#### 3.3 Filter System
**Categories:**
- Real Estate (12 projects)
- Education (15 projects)
- Legal Services (8 projects)
- Healthcare (10 projects)
- E-Commerce (18 projects)
- Restaurants (12 projects)
- Construction (9 projects)
- Interior Design (11 projects)
- Startups (20 projects)
- Local Businesses (35 projects)
**Filter UI:**
- Horizontal scroll (mobile) / Grid (desktop)
- Selected: Gold background
- Unselected: Border only
- "All Projects" default
#### 3.4 Search Functionality
- Real-time search (debounced)
- Search by: Project name, company, industry
- Clear button: Visible when searching
- No results state: Custom message + "Browse all projects"
#### 3.5 Pagination/Load More
- Show: 12 projects initially
- "Load More" button: Gold, full width
- Or: Infinite scroll on mobile
- Total count: "Showing 12 of 250 projects"
#### 3.6 View Options
- Grid view (default)
- List view (alternative)
- Layout toggle: Top right
---
 
### 4️⃣ CASE STUDIES PAGE (`/case-studies`)
 
**Layout:** Similar to portfolio, but with detailed cards
 
**Case Study Card:**
 
```
┌──────────────────────────────────┐
│  [Large Project Image]           │
├──────────────────────────────────┤
│ Industry Tag                     │
│ Project: "Premium Real Estate    │
│ Platform for Mumbai Realtors"    │
│                                  │
│ Challenge: High bounce rate      │
│ Solution: AI-powered features    │
│ Result: 300% lead increase       │
│                                  │
│ [View Full Case Study →]         │
└──────────────────────────────────┘
```
 
**Full Case Study Page (`/case-studies/[slug]`):**
 
#### 4.1 Header Section
- Project title: Geist Bold, 48px
- Client name + logo
- Industry tag
- Timeline: "3 months"
- Team size: "5 people"
#### 4.2 Overview Section
- Brief description (2-3 sentences)
- Key metrics: 3-4 columns
  - Timeline
  - Team Size
  - Budget Range
  - Result
#### 4.3 The Challenge
- Problem statement: Instrument Serif, 24px
- Detailed explanation: Manrope, 16px
- 2-3 sub-points with icons
#### 4.4 Research & Discovery
- What we learned
- Client requirements
- Market analysis
- Competitive landscape
#### 4.5 Design & Strategy
- Design approach
- Screenshots/mockups
- User flow diagrams
- Design decisions explained
#### 4.6 Development
- Tech stack used
- Architecture decisions
- Key features built
- Performance optimizations
#### 4.7 Results & Impact
**Large numbers section:**
- Metric 1: "300+" | "Leads Generated"
- Metric 2: "85%" | "Bounce Rate Reduction"
- Metric 3: "$500K" | "Revenue Generated"
- Metric 4: "45%" | "Conversion Improvement"
**Charts/Graphs:**
- Before/After comparison
- Traffic growth chart
- Conversion funnel
#### 4.8 Performance Metrics
- Google PageSpeed Insights score
- SEO ranking improvements
- Time to First Contentful Paint
- Mobile vs Desktop performance
#### 4.9 Gallery
- Grid of project screenshots (masonry layout)
- Lightbox on click
- Captions for each image
#### 4.10 Client Testimonial
- Video testimonial (optional)
- Quote
- Client name + company
- Star rating
#### 4.11 Key Learnings
- Bullet points of insights
- Best practices applied
- Lessons for future projects
#### 4.12 Related Case Studies
- 3-4 similar projects
- Carousel or grid layout
- "View More Case Studies" button
#### 4.13 CTA
- "Ready for similar results?" 
- Book consultation button
---
 
### 5️⃣ ABOUT PAGE (`/about`)
 
#### 5.1 Hero Section
- Title: "We're Ktux"
- Subtitle: "Premium AI & Web Development Agency"
- Mission statement: "Helping businesses grow faster with technology"
#### 5.2 Our Story Section
**Layout:** Image + Text (alternating)
 
**Narrative:**
"Ktux was founded with a simple belief: every business deserves a premium digital presence. We started as a small team of 3 developers passionate about building beautiful, functional websites. Today, we're a team of 20+ specialists delivering premium solutions to 100+ businesses worldwide.
 
Our journey has been about constant innovation. We saw how businesses struggled with outdated websites and slow development processes. So we started leveraging AI to deliver better results, faster.
 
Today, Ktux is known for:
- Premium design aesthetic
- AI-powered automation
- Fast, reliable delivery
- Genuine client relationships
- Measurable business results"
#### 5.3 Founders Section
 
**For each founder:**
 
```
┌──────────────────────────────────┐
│     [Founder Photo]              │
│     (High quality, professional) │
├──────────────────────────────────┤
│ Name                             │
│ Title                            │
│ Email / LinkedIn / Twitter       │
│ Bio: 2-3 lines                   │
│ Expertise: React, Node, AI       │
└──────────────────────────────────┘
```
 
**Information to include:**
- Full name
- Title (Founder/Co-founder)
- Years of experience
- Expertise areas
- Background/education
- Notable achievements
- Social links
- Email
- Fun fact
#### 5.4 Team Section
 
**Grid layout:** 4 columns (desktop) / 2 columns (tablet) / 1 column (mobile)
 
**Team member card:**
- Photo: 300x300px
- Name: Manrope Bold, 16px
- Title: Manrope, 14px
- Expertise tags: Pills format
**Team categories:**
- Founders (2-3 people)
- Designers (3-4 people)
- Developers (5-6 people)
- Operations (2-3 people)
#### 5.5 Company Stats
**Layout:** 4-column cards with animated counters
 
- 100+ Happy Clients
- 250+ Projects Delivered
- 50+ Industries Served
- 5+ Years Experience
**Counter animation:** From 0 to final number (triggered on scroll)
 
#### 5.6 Our Values
**Layout:** 4 cards, 1x4 grid (desktop) / 2x2 (tablet) / 1x4 (mobile)
 
1. **Quality First**
   - Icon: Sparkles
   - "We never compromise on quality"
2. **Innovation Driven**
   - Icon: Lightbulb
   - "Always exploring latest technologies"
3. **Client Success**
   - Icon: Target
   - "Your success is our success"
4. **Transparency**
   - Icon: Eye
   - "Clear communication always"
#### 5.7 Why Choose Us (Comparison)
**Layout:** Comparison table
 
| | Ktux | Typical Agencies |
|---|------|------------------|
| Delivery Speed | 2x faster | Standard |
| Design Quality | Premium | Standard |
| AI Integration | ✓ | ✗ |
| Post-launch Support | Lifetime | Extra cost |
| SEO Focus | Built-in | Manual |
| Communication | Daily updates | Weekly |
| Tech Stack | Latest | Varies |
| Revision Rounds | Unlimited | Limited |
 
#### 5.8 Testimonials
**3-4 client testimonials with video**
 
#### 5.9 Awards & Recognition
**If applicable:**
- Award image + name
- "Best Web Development Agency 2024"
- "Top 10 AI Integration Companies"
- etc.
#### 5.10 CTA
- "Join 100+ Successful Businesses"
- Book consultation button
---
 
### 6️⃣ PRICING PAGE (`/pricing`)
 
**Purpose:** Transparent pricing, reduce inquiry friction
 
#### 6.1 Pricing Intro
- Title: "Simple, Transparent Pricing"
- Description: "No hidden fees. No surprises."
- Toggle: "Pay Monthly" / "Pay Annually" (10% discount on annual)
#### 6.2 Pricing Cards
**Layout:** 3-column (desktop) / 1-column (mobile)
 
**Card Structure:**
 
```
┌─────────────────────────────┐
│ Starter                     │ ← Plan name
│                             │
│ ₹25,000/mo                  │ ← Price
│ or ₹250,000/year            │
│                             │
│ Perfect for small business  │
│                             │
│ [Start Free Trial]          │ ← Primary CTA
│ [View Details]              │ ← Secondary
│                             │
│ ✓ 5 Pages                   │ ← Features
│ ✓ Mobile Responsive         │
│ ✓ Basic SEO                 │
│ ✓ Email Support             │
│ ✗ Advanced Analytics        │
│ ✗ Blog Integration          │
│ ✗ API Access                │
│                             │
└─────────────────────────────┘
```
 
**Three Plans:**
 
**1. STARTER - ₹25,000/month**
- 5 Pages
- Admin Panel (Basic)
- Mobile Responsive
- SSL Certificate
- Basic SEO
- Email Support
- 1 Month Support
- Hosting: 5GB
**2. PROFESSIONAL - ₹65,000/month** ⭐ **POPULAR**
- Unlimited Pages
- Admin Panel (Advanced)
- Mobile Responsive
- SSL Certificate
- Advanced SEO
- CMS Integration
- Blog System
- Newsletter
- Analytics Dashboard
- Email + Chat Support
- 12 Months Support
- Hosting: 50GB
- Monthly Updates
**3. ENTERPRISE - ₹150,000+/month** 
- Custom Everything
- Dedicated Account Manager
- API Access
- Custom Integrations
- AI Features Included
- Performance Optimization
- Security Audit
- Priority Support (24/7)
- 24 Months Support
- Unlimited Hosting
- Bi-weekly Updates
- Custom Features
**Card Styling:**
- Background: Transparent
- Border: 1px Soft Gray (Gold for Popular)
- Border Radius: 24px
- Padding: 32px
- Popular badge: Gold background, top right
- Heading: Geist Bold, 24px
- Price: Instrument Serif, 36px
- Feature list: Manrope, 14px
- CTA: Full width, Gold (primary) / outline (secondary)
#### 6.3 Comparison Table
**All features compared across plans**
 
```
Feature | Starter | Professional | Enterprise
────────────────────────────────────────────
Pages | 5 | Unlimited | Unlimited
Admin Panel | Basic | Advanced | Custom
SEO | Basic | Advanced | Premium
Support | Email | Chat/Email | 24/7 Priority
Analytics | Basic | Advanced | Custom
API Access | ✗ | ✗ | ✓
Revisions | 5 | Unlimited | Unlimited
Timeline | 4-6 weeks | 2-3 weeks | Custom
```
 
#### 6.4 Pricing FAQ
**Accordion with common questions:**
- Can I change plans later?
- What's included in support?
- Do you offer payment plans?
- Is there a setup fee?
- What if I need custom features?
- What about domain and hosting?
- Can I cancel anytime?
- Do you offer discounts for annual?
#### 6.5 Pricing Add-ons
**Optional services:**
 
| Add-on | Price | Description |
|--------|-------|-------------|
| AI Chatbot | ₹10,000/mo | 24/7 automated support |
| Advanced Analytics | ₹5,000/mo | Custom dashboards |
| Blog Module | ₹3,000/mo | Full blogging platform |
| E-Commerce | ₹15,000/mo | Product catalog, payments |
| Mobile App | ₹50,000 (one-time) | iOS + Android version |
| Premium Support | ₹2,000/mo | Priority response |
 
#### 6.6 Pricing Calculator
**Interactive calculator:**
 
1. **How many pages do you need?** (Slider: 1-50)
2. **Do you need an admin panel?** (Yes/No)
3. **Do you need e-commerce?** (Yes/No)
4. **Do you need AI features?** (Yes/No)
5. **Support level?** (Email/Chat/Priority)
Result: **Estimated cost: ₹XX,XXX/month**
 
"Get detailed quote" CTA → Lead form
 
#### 6.7 CTA Section
- "Ready to get started?"
- Book consultation button
- Or "View all services" link
---
 
### 7️⃣ BLOG PAGE (`/blog`)
 
#### 7.1 Blog Home
**Layout:** Grid/List hybrid
 
**Hero:**
- Title: "Latest Articles"
- Subtitle: "Insights on web development, AI, and business growth"
- Search bar
- Category filter
**Categories:**
- Web Development (15 posts)
- AI & Automation (12 posts)
- Case Studies (8 posts)
- Business Growth (10 posts)
- Design Trends (7 posts)
- Technology News (9 posts)
#### 7.2 Article Card
**Layout:** Image + Text
 
```
┌─────────────────────────────┐
│  [Article Image]            │
├─────────────────────────────┤
│ Category Tag                │ ← Top
│ Article Title               │ ← Geist Bold, 18px
│ Brief excerpt (2 lines)     │ ← Manrope, 14px
│ By Author | Date | 5 min    │ ← Soft Gray
│ Read More →                 │ ← Gold link
└─────────────────────────────┘
```
 
**Card Hover:**
- Image: Scale 1.05
- Title: Gold color
- Background: Slight shade
#### 7.3 Article Page (`/blog/[slug]`)
 
**Article Layout:**
 
```
┌─ Header ───────────────────────┐
│ Category Tag                   │
│ Title (Geist Bold, 48px)       │
│ Subtitle/Excerpt               │
│ By Author | Date | Read time   │
│ Social Share buttons           │
└────────────────────────────────┘
 
┌─ Featured Image ───────────────┐
│ (Full width, 4:2 ratio)        │
└────────────────────────────────┘
 
┌─ Table of Contents ────────────┐
│ (Auto-generated from H2/H3)    │
└────────────────────────────────┘
 
┌─ Article Body ─────────────────┐
│ (Markdown/Rich text)           │
│ - Headings: Geist Bold         │
│ - Body: Manrope, 16px          │
│ - Line height: 1.8             │
│ - Code blocks: Dark bg         │
└────────────────────────────────┘
 
┌─ Author Bio ───────────────────┐
│ [Author Photo]                 │
│ Author Name                    │
│ Bio & social links             │
└────────────────────────────────┘
 
┌─ Related Articles ─────────────┐
│ (3 similar posts)              │
└────────────────────────────────┘
 
┌─ Newsletter CTA ───────────────┐
│ Subscribe for updates          │
│ Email input + subscribe        │
└────────────────────────────────┘
```
 
**Article Features:**
- Featured image: 1200x600px
- SEO meta tags: Title, description, keywords
- Open Graph: Image, description
- Twitter Card: Summary with image
- Author: Name, bio, photo, email
- Publication date: Formatted nicely
- Estimated read time: "5 min read"
- Table of contents: Sticky on desktop
- Smooth scroll to headings
- Share buttons: LinkedIn, Twitter, Facebook, WhatsApp
- Comments section (optional): Disqus or custom
- Related articles: 3 similar posts
- Newsletter signup: Convertkit integration
---
 
### 8️⃣ CONTACT PAGE (`/contact`)
 
**Layout:** 2-column (desktop) / 1-column (mobile)
 
#### 8.1 Left Column - Form
 
**Contact Form Fields:**
```
1. Full Name *
2. Email *
3. Company Name
4. Phone Number *
5. Project Type *
   - Website
   - AI Automation
   - Branding
   - Other
 
6. Budget Range *
   - ₹25,000 - ₹50,000
   - ₹50,000 - ₹100,000
   - ₹100,000 - ₹300,000
   - ₹300,000+
 
7. Message *
   (Minimum 20 characters)
 
8. Services Interested In
   - Website Development ☐
   - AI Automation ☐
   - AI UGC Ads ☐
   - Branding ☐
   - AI Agents ☐
 
9. Timeline *
   - ASAP
   - 1-2 months
   - 3-6 months
   - Not decided
 
10. Captcha ☑
```
 
**Form Styling:**
- Input fields: White bg, dark border, focus: gold border
- Placeholder: Soft gray
- Label: Manrope Bold, 14px
- Required asterisk: Gold color
- Error message: Red (#EF4444), Manrope, 12px
- Success message: Green (#22C55E)
- Submit button: Full width, Gold, hover: glow
- Loading state: Spinner + "Sending..."
- Submitted: "Thank you! We'll contact you within 24 hours"
**Validation:**
- Email: Valid format
- Phone: 10-12 digits
- Message: Min 20 chars
- Required fields: Can't submit empty
- Real-time validation: After blur event
- Clear error on input change
**On Submit:**
- Send to: Resend/SendGrid (transactional email)
- Webhook: Send to Zapier → Google Sheets
- Lead creation: Auto-create in lead database
- Notification: Email to team
- Notification: WhatsApp to team
#### 8.2 Right Column - Contact Info
 
**Business Hours:**
- Monday - Friday: 9 AM - 6 PM IST
- Saturday: 10 AM - 4 PM IST
- Sunday: Closed
- Status: "We're online now!" (green) / "We're offline" (gray)
**Contact Methods:**
 
1. **Email**
   - ktuxai@zohomail.in
   - Support: rajkeerti@zohomai.in

   - Icon: Mail
2. **Phone**
   - +91 7084499128
   - WhatsApp available
   - Icon: Phone
3. **WhatsApp**
   - Click to open WhatsApp chat
   - Message template: "Hi, I'm interested in..."
   - Icon: WhatsApp green
4. **Office Address**
   - Ktux Agency
   - [City, State]
   - Google Map embed
   - Directions button
5. **Response Time**
   - Weekdays: Within 2 hours
   - Weekends: Within 24 hours
   - Icon: Clock
#### 8.3 FAQ Integration
**Quick access FAQ below contact info**
 
#### 8.4 Map Section (Full Width Below)
**Google Maps embed:**
- Marker on office location
- Allow directions
- Street view available
---
 
### 9️⃣ BOOK CONSULTATION PAGE (`/book-consultation`)
 
**Purpose:** Calendar booking system for consultations
 
#### 9.1 Booking Flow
 
**Step 1: Select Service**
- Radio buttons or cards
- Services: Website Dev, AI Automation, Branding, Other
- Description for each
- Next button
**Step 2: Available Time Slots**
- Calendar widget (date picker)
- Show available dates (30 days ahead)
- Disabled dates: Weekends, holidays
- Time slots: 30-min blocks
  - 10 AM, 10:30 AM, 11 AM, etc.
  - Gray out booked slots
  - Select one slot
**Step 3: Meeting Details**
- Meeting type: Google Meet / Zoom / Phone
- Timezone selector (auto-detect)
- Duration: 30 mins (fixed)
- Estimated end time: Display
**Step 4: Personal Information**
- Full name *
- Email *
- Phone number *
- Company name
- Budget range (optional)
- Message (optional)
**Step 5: Confirmation**
- Review all details
- "Confirm booking" button
- "Edit" option to go back
#### 9.2 Booking Confirmation
**After successful booking:**
 
**On-screen message:**
- "Booking confirmed!"
- Meeting details
- Calendar download button (.ics)
- Add to phone reminder
**Email confirmation:**
- Subject: "Your Consultation Scheduled - Ktux"
- Details: Date, time, meeting link
- Calendar attachment
- Reminder: 1 hour before
**Calendar integration:**
- Google Calendar sync
- Meeting link auto-generated (Google Meet)
- Send to: ktuxai@zohomail.in + attendee
**Reminders:**
- Email: 1 day before + 1 hour before
- SMS: Optional, if phone provided
- Slack notification: To team (with client details)
#### 9.3 UI Components
 
**Date Picker:**
- Current month displayed
- Navigation arrows
- Day names: M T W T F S S
- Disabled dates: Grayed out
- Selected date: Gold background
- Today: Subtle border
**Time Slots:**
- Grid of buttons: 2 columns (mobile) / 4 columns (desktop)
- Format: "10:00 AM"
- Selected: Gold background
- Booked: Gray, disabled
- Hover: Slight scale + shadow
**Timezone Selector:**
- Dropdown
- Auto-detect: "Your timezone: IST"
- Show offset: "UTC +5:30"
- Search available: Type to filter
**Button States:**
- Disabled: Gray, cursor: not-allowed
- Hover: Glow effect
- Loading: Spinner
- Active: Gold, white text
---
 
### 🔟 AI ASSISTANT PAGE (`/ai-assistant`)
 
**Purpose:** AI-powered lead qualification & site guidance
 
#### 10.1 Chat Widget
 
**Layout:** Full-page chat interface
 
**Chat Header:**
- "Ktux AI Assistant"
- "Powered by Claude"
- Status: "Online" (green dot)
- Close button
**Chat Messages:**
- Bot messages: Left aligned, dark bg
- User messages: Right aligned, gold bg
- Timestamp: Soft gray, Manrope 12px
- Avatar: Bot (K logo) / User (initials)
- Typing indicator: Animated dots
#### 10.2 AI Capabilities
 
**1. Project Recommendation**
- User input: "What do I need?"
- AI analyzes needs
- Recommends: Website + AI Automation combo
- Shows: Pricing estimate, timeline, features
- CTA: "Schedule Consultation" → Book page
**2. Pricing Estimate**
- User input: Questions about needs
- AI calculates: Based on scope
- Shows: Price range with breakdown
- Comparison: "vs competitors"
- CTA: "Get exact quote"
**3. Website Audit**
- User input: Provide website URL
- AI analyzes: Page speed, SEO, UX, accessibility
- Shows: Report with scores
- Recommendations: Top 3 improvements
- CTA: "Fix these issues"
**4. FAQ Bot**
- User asks common questions
- AI responds from knowledge base
- Suggests: Related questions
- Escalate: "Speak to human" option
**5. Lead Qualification**
- User input: Describe project
- AI asks qualifying questions
- Determines: Fit + budget alignment
- Shows: Customized packages
- CTA: "Book consultation"
#### 10.3 AI Conversation Examples
 
**Example 1: Website Consultation**
```
User: "I need a website for my real estate business"
AI: "Great! I'd love to help. Let me ask a few questions:
    1. What's your target market?
    2. What's your budget?"
 
User: "Luxury properties, ₹50K-100K budget"
AI: "Perfect! Based on your needs, I recommend:
    - Premium Website (₹65K/mo)
    - AI Chatbot for inquiries (₹10K/mo)
    
    This would help you:
    ✓ Showcase properties beautifully
    ✓ Qualify leads automatically
    ✓ Close deals faster
    
    Ready to start? [Book Consultation]"
```
 
**Example 2: Budget Planning**
```
User: "How much would a full website cost?"
AI: "Let's find the right package for you:
    - How many pages? (estimate)
    - Need e-commerce?
    - Need AI features?
    
    [Slider for pages]
    [Toggle for features]
    
    Your estimate: ₹65,000/month
    See breakdown → [View Details]"
```
 
**Example 3: Performance Audit**
```
User: "Audit: https://mysite.com"
AI: "[Analyzing your site...]
    
    AUDIT RESULTS:
    Page Speed: 45/100 ⚠️
    SEO: 62/100 ⚠️
    Mobile UX: 38/100 ❌
    Accessibility: 72/100 ✅
    
    Top Issues:
    1. Large image sizes (2.5MB)
    2. No meta descriptions
    3. Not mobile responsive
    
    Fix these → [Start Project]"
```
 
#### 10.4 Conversation Features
 
- **Context Awareness:** Remembers conversation history
- **Suggestions:** "Here are related questions..."
- **Quick Reply Buttons:** Common responses
- **File Sharing:** Upload wireframes, requirements
- **Escalation:** "Speak to a human" option
- **Export:** Save conversation as PDF
- **History:** Access past conversations (registered users)
#### 10.5 Chat Handoff
 
**When to escalate:**
- Complex requirements
- User explicitly asks to "speak to someone"
- Lead score > 80 (high value)
- Booking attempt
**Handoff message:**
"Thanks for chatting with me! I'm connecting you with a human agent who can discuss custom solutions. They'll be with you in 2-5 minutes."
 
**Actual handoff:**
- Queue system
- Show wait time
- Can leave message if offline
- Notification: SMS/Email to team
---
 
### 1️⃣1️⃣ LEAD MANAGEMENT DASHBOARD (`/dashboard`)
 
**Private page - requires login**
 
#### 11.1 Dashboard Overview
 
**Header:**
- "Leads Dashboard"
- Date range selector
- Filters
- Export button
**Key Metrics (Cards):**
 
```
┌─────────────────────┐
│ Total Leads         │
│ 347                 │ ← Number (Gold, large)
│ +15 this week       │ ← Trend (Green ▲)
└─────────────────────┘
 
┌─────────────────────┐
│ Conversion Rate     │
│ 24.5%               │
│ +2.3% from last mo  │
└─────────────────────┘
 
┌─────────────────────┐
│ Avg Response Time   │
│ 12 minutes          │
│ -3 min improvement  │
└─────────────────────┘
 
┌─────────────────────┐
│ Consultation Booked │
│ 85                  │
│ +8 this week        │
└─────────────────────┘
```
 
#### 11.2 Leads Table
 
**Columns:**
- Checkbox (select multiple)
- Name
- Email
- Phone
- Service Interested
- Status
- Lead Score
- Created Date
- Actions
**Leads Status:**
- New (Gray) - Just submitted
- Contacted (Blue) - Called/emailed
- Interested (Gold) - Expressed interest
- Consultation Booked (Green) - Scheduled
- Proposal Sent (Purple) - Quote sent
- Closed (Green checkmark) - Won/Lost
**Lead Score (AI-calculated):**
- 0-30: Low (red)
- 31-70: Medium (gold)
- 71-100: High (green)
**Factors:**
- Budget alignment
- Service fit
- Response speed
- Engagement
**Actions (per row):**
- View details
- Call (WhatsApp/Phone)
- Email
- Assign to team member
- Change status
- Delete
- Archive
#### 11.3 Filters
 
**Sidebar filters:**
- Status: Dropdown (checkboxes)
- Service: Checkboxes
- Budget: Range slider
- Lead Score: Range slider
- Created: Date range
- Assigned to: Dropdown
**Quick filters (chips):**
- "Hot Leads" - Score > 70
- "This Week" - Created last 7 days
- "Uncontacted" - Status = New
- "Ready to Close" - Score > 80 + consulted
#### 11.4 Lead Detail View (Modal/Sidebar)
 
**Open on: Click row or "View" button**
 
```
┌────────────────────────────────┐
│ Close [X]                      │
├────────────────────────────────┤
│ Name: John Doe                 │
│ Email: john@example.com        │
│ Phone: +91-XXXXX              │
│ Company: Acme Corp             │
│ Industry: Real Estate           │
│ Budget: ₹50K-100K              │
│ Timeline: 1-2 months           │
│ Services: Website Dev          │
│                                │
│ Lead Score: 87 ▲               │
│ Status: Interested             │
│ Assigned to: Rahul             │
│ Created: 2 days ago            │
│ Last contacted: Today          │
│                                │
│ Message:                       │
│ "Looking for a premium website"│
│                                │
│ [History]                      │
│ - Submitted form (2 days ago)  │
│ - Emailed proposal (1 day ago) │
│ - Opened email (Today 10 AM)   │
│                                │
│ [Call] [Email] [Assign]        │
│ [Change Status] [Delete]       │
└────────────────────────────────┘
```
 
#### 11.5 Analytics & Reports
 
**Dashboard tab:**
- Leads over time (line chart)
- Status distribution (pie chart)
- Service breakdown (bar chart)
- Budget distribution (histogram)
- Conversion funnel (waterfall)
**Reports tab:**
- Monthly summary
- Export PDF
- Email reports to team
- Custom date range
#### 11.6 Team Collaboration
 
**Features:**
- Assign leads to team members
- View assignment history
- Notes (private per user)
- @mentions to notify team
- Activity feed (who did what, when)
#### 11.7 Integrations
 
**Automated actions:**
- Lead submitted → Email notification
- New lead created → Slack message
- Status changed → Update Google Sheets
- Consultation booked → Add to Google Calendar
- Proposal sent → Email reminder (1 week)
---
 
## 🔐 BACKEND REQUIREMENTS
 
### API Endpoints
 
#### Leads Management
- `POST /api/v1/leads` - Create lead (from form)
- `GET /api/v1/leads` - List all leads (paginated, filterable)
- `GET /api/v1/leads/:id` - Get single lead
- `PATCH /api/v1/leads/:id` - Update lead
- `DELETE /api/v1/leads/:id` - Delete lead
- `PATCH /api/v1/leads/:id/status` - Change status
- `POST /api/v1/leads/:id/assign` - Assign to user
- `GET /api/v1/leads/analytics/summary` - Dashboard metrics
- `GET /api/v1/leads/export` - Export CSV
#### Authentication
- `POST /api/v1/auth/register` - Sign up
- `POST /api/v1/auth/login` - Log in
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - Log out
- `POST /api/v1/auth/reset-password` - Password reset
#### Blog
- `GET /api/v1/blog/posts` - List all posts (public)
- `GET /api/v1/blog/posts/:slug` - Get single post
- `POST /api/v1/blog/posts` - Create post (admin)
- `PATCH /api/v1/blog/posts/:id` - Update post
- `DELETE /api/v1/blog/posts/:id` - Delete post
- `GET /api/v1/blog/categories` - List categories
#### Case Studies
- `GET /api/v1/case-studies` - List all (public)
- `GET /api/v1/case-studies/:slug` - Get single
- `POST /api/v1/case-studies` - Create (admin)
- `PATCH /api/v1/case-studies/:id` - Update
- `DELETE /api/v1/case-studies/:id` - Delete
#### Consultations
- `GET /api/v1/consultations/availability` - Get available slots
- `POST /api/v1/consultations/book` - Book consultation
- `GET /api/v1/consultations` - List (user's consultations)
- `PATCH /api/v1/consultations/:id` - Reschedule/update
- `DELETE /api/v1/consultations/:id` - Cancel
#### Newsletter
- `POST /api/v1/newsletter/subscribe` - Subscribe
- `POST /api/v1/newsletter/unsubscribe` - Unsubscribe
#### AI Assistant
- `POST /api/v1/ai/chat` - Send message to AI
- `POST /api/v1/ai/audit` - Website audit
- `GET /api/v1/ai/estimate` - Pricing estimate
### Database Schema
 
**Leads Collection:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique per email),
  phone: String,
  company: String,
  industry: String (enum),
  serviceInterested: [String],
  budgetRange: String (enum),
  timeline: String (enum),
  message: String,
  leadScore: Number (0-100),
  status: String (enum: new, contacted, interested, booked, proposal, closed),
  assignedTo: ObjectId (User),
  createdAt: Date,
  updatedAt: Date,
  lastContacted: Date,
  source: String (form, ai-chat, website),
  conversionDetails: {
    consultationBooked: Boolean,
    bookingDate: Date,
    projectWon: Boolean,
    projectValue: Number
  }
}
```
 
**Case Studies Collection:**
```javascript
{
  _id: ObjectId,
  title: String,
  slug: String (unique),
  industryTag: String,
  overview: String,
  challenge: String,
  solution: String,
  results: {
    metric1: { label, value },
    metric2: { label, value },
    metric3: { label, value }
  },
  images: [String] (URLs),
  techStack: [String],
  clientName: String,
  clientReview: String,
  clientImage: String,
  createdAt: Date,
  updatedAt: Date,
  published: Boolean
}
```
 
**Blog Posts Collection:**
```javascript
{
  _id: ObjectId,
  title: String,
  slug: String (unique),
  excerpt: String,
  content: String (markdown/rich text),
  featuredImage: String,
  category: String,
  tags: [String],
  author: {
    name: String,
    bio: String,
    image: String,
    email: String
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String,
    ogDescription: String
  },
  readTime: Number (minutes),
  views: Number,
  published: Boolean,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date
}
```
 
**Consultations Collection:**
```javascript
{
  _id: ObjectId,
  leadId: ObjectId,
  service: String,
  proposedDateTime: Date,
  timezone: String,
  meetingType: String (google-meet, zoom, phone),
  meetingLink: String,
  status: String (scheduled, completed, cancelled, rescheduled),
  notes: String,
  confirmationEmailSent: Boolean,
  reminderEmailSent: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```
 
---
 
## 🎨 DESIGN TOKENS
 
### Colors
- **Primary (Near Black):** #09090B
- **Secondary (Warm White):** #FAFAF8
- **Accent (Gold):** #C9A227
- **Neutral (Soft Gray):** #71717A
- **Surface:** #18181B
- **Border:** #27272A
- **Success:** #22C55E
- **Warning:** #F59E0B
- **Error:** #EF4444
### Typography
- **Headings:** Geist (Bold, Regular)
- **Body:** Manrope (Regular, Bold)
- **Luxury Titles:** Instrument Serif
- **Monospace:** JetBrains Mono
### Spacing
- **8px Grid System**
- **Cards:** 24px padding
- **Sections:** 80px vertical
- **Hero:** 160px top
- **Max width:** 1400px
### Shadows
- **Soft:** 0 4px 12px rgba(0,0,0,0.1)
- **Medium:** 0 8px 24px rgba(0,0,0,0.15)
- **Strong:** 0 12px 32px rgba(0,0,0,0.2)
### Border Radius
- **Buttons:** 999px
- **Cards:** 24px
- **Sections:** 32px
---
 
## 📱 RESPONSIVE DESIGN
 
**Breakpoints:**
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px
**Key Changes:**
- Hero: 36px heading (mobile) / 56px (desktop)
- Grid: 1 column (mobile) / 2 (tablet) / 3-4 (desktop)
- Navigation: Hamburger (mobile) / Horizontal (desktop)
- Padding: 20px (mobile) / 40px (tablet) / 80px (desktop)
---
 
## 🔍 SEO & PERFORMANCE
 
### SEO Requirements
- Meta titles & descriptions (all pages)
- OpenGraph tags (for social sharing)
- Schema markup (organization, article, breadcrumb)
- Sitemap.xml generation
- robots.txt
- Canonical tags
- Structured data for FAQs
- Blog schema markup
### Performance Targets
- Lighthouse Score: > 90 (desktop), > 85 (mobile)
- PageSpeed: < 2 seconds (Time to First Contentful Paint)
- Cumulative Layout Shift: < 0.1
- Largest Contentful Paint: < 2.5s
- Image optimization: WebP format, lazy loading
- CSS/JS minification
- Code splitting (React)
- CDN for static assets (Cloudflare/Vercel)
---
 
## 🔒 SECURITY
 
- SSL/HTTPS (all pages)
- CORS configuration
- Rate limiting (API)
- Input validation (backend + frontend)
- SQL injection prevention
- XSS protection (DOMPurify)
- CSRF tokens on forms
- Secure headers (helmet.js)
- Password hashing (bcryptjs)
- JWT token security
- Environment variables (.env)
- No sensitive data in logs
- Regular security audits
---
 
## 📊 ANALYTICS & TRACKING
 
- Google Analytics 4
- Google Search Console integration
- SEO tracking (rank monitoring)
- Conversion tracking (lead submission, booking)
- Event tracking (button clicks, form submissions)
- Heatmap tracking (Clarity)
- User session recording (optional)
- Email open tracking
- Link click tracking
---
 
## 📧 EMAIL TEMPLATES
 
### Confirmation Emails
1. **Lead Confirmation**
   - Subject: "Thank You - We'll Be In Touch Soon"
   - Message: Thank you for inquiry, we'll contact within 24 hours
   - CTA: "View Our Work"
2. **Consultation Booking Confirmation**
   - Subject: "Your Consultation is Booked!"
   - Calendar attachment (.ics)
   - Meeting link
   - Add to calendar links
   - Reminder: 1 day + 1 hour before
3. **Newsletter Confirmation**
   - Subject: "Welcome to Ktux Newsletter"
   - Confirmation link (double opt-in)
### Transactional Emails
1. **Password Reset**
   - Subject: "Reset Your Password"
   - Secure reset link (1 hour expiry)
   - Never share old password
2. **Email Verification**
   - Subject: "Verify Your Email"
   - Verification link
### Marketing Emails
1. **Weekly Digest**
   - Latest blog posts
   - Upcoming offers
   - Unsubscribe link
---
 
## 🚀 TECH STACK
 
### Frontend
- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **API:** Axios with interceptors
- **State:** TanStack Query
- **Routing:** React Router v6
- **Animations:** GSAP, Framer Motion, Lenis
- **Icons:** Lucide React
- **Calendar:** React Big Calendar / FullCalendar
- **Rich Text:** TipTap / Slate
- **Email Capture:** Convertkit
### Backend
- **Runtime:** Node.js (LTS)
- **Framework:** Express 5 + TypeScript
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Authentication:** JWT + Passport (OAuth optional)
- **Validation:** Zod
- **Email:** Resend / SendGrid
- **Scheduling:** node-cron
- **Real-time:** Socket.io (if needed)
- **Logging:** Winston
- **Monitoring:** Sentry
- **File Storage:** Cloudinary
- **Payment:** Razorpay / Stripe
- **Calendar:** Google Calendar API
### Infrastructure
- **Hosting (Frontend):** Vercel / Netlify
- **Hosting (Backend):** Railway / Render / Digital Ocean
- **Database:** MongoDB Atlas
- **CDN:** Cloudflare / Vercel
- **DNS:** Namecheap / Google Domains
- **Email:** Resend / SendGrid
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry / LogRocket
---
 
## 📝 CONTENT REQUIREMENTS
 
### Homepage Content Needed
- 3-5 client testimonials (with video if possible)
- 6 featured case studies
- Founder bios
- 10-15 FAQ answers
### Blog Content
- 15-20 initial articles
- Author bios
- Blog categories
- Featured images
### Case Studies
- 10-15 detailed case studies
- Project screenshots/videos
- Client testimonials
- Results metrics
### Services Pages
- Service descriptions
- Pricing details
- Feature lists
- Process documentation
---
 
## 📋 DELIVERABLES CHECKLIST
 
✅ Responsive design (mobile-first)
✅ Performance optimized (LCP < 2.5s)
✅ SEO ready (meta tags, schema)
✅ Accessible (WCAG 2.1 AA)
✅ Security hardened (SSL, CORS, rate limiting)
✅ Lead management system
✅ Booking system (calendar integration)
✅ Blog/CMS capability
✅ Analytics tracking
✅ Email notifications
✅ Admin dashboard
✅ API documentation
✅ Deployment ready
✅ Monitoring setup (Sentry)
✅ Database schema designed
✅ Content ready
 
---
 
## 🎯 SUCCESS METRICS
 
**Phase 1 (First 3 months):**
- 50+ leads generated
- 15+ consultations booked
- 10+ case studies published
- 30+ blog articles
- 100+ website visitors/day
**Phase 2 (6 months):**
- 200+ leads generated
- 50+ consultations booked
- 20% conversion rate (consultation to project)
- 1000+ visitors/day
- 20+ blog articles/month
**Phase 3 (12 months):**
- 500+ leads generated
- 150+ consultations booked
- 30%+ conversion rate
- 5000+ visitors/day
- Organic traffic 60%+
---
 
## 📞 CONTACT & SUPPORT
 
- **Design Lead:** [Name]
- **Development Lead:** [Name]
- **Product Manager:** [Name]
- **Project Duration:** 8-12 weeks
- **Team Size:** 4-6 people
---
 
**Version 1.0 | Ready for Development**
**Last Updated: August 2026**
 
