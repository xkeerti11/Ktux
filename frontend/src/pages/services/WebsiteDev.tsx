import { ServiceTemplate } from './ServiceTemplate';

export default function WebsiteDev() {
  return (
    <ServiceTemplate
      config={{
        title: 'Premium Website Development',
        eyebrow: 'High-Converting Digital Flagships',
        description:
          'Sub-second loading, SEO-engineered, luxury web platforms built with React, TypeScript, and modern CMS admin panels to turn visitors into qualified clients.',
        icon: '💻',
        accent: '< 1.2S LOAD SPEED',
        problems: [
          'Slow website loading taking 5+ seconds, losing 50%+ of mobile traffic',
          'Generic WordPress/Wix templates that fail to convey authority or luxury',
          'Poor mobile responsiveness with broken buttons and clumsy navigation',
          'Invisible on Google Search due to zero structured data or technical SEO',
          'No lead capture mechanism or automated consultation scheduling',
          'Difficult content management requiring developers for simple text changes',
        ],
        workflow: [
          { step: '01', title: 'UX Strategy & Wireframing', desc: 'Conversion architecture, user journeys, and high-intent CTA hierarchy.' },
          { step: '02', title: 'Bespoke UI Design System', desc: 'Luxury typography, obsidian color harmony, and custom micro-animations.' },
          { step: '03', title: 'Full-Stack Engineering', desc: 'Clean TypeScript, React, Vite, server-side APIs, and database integration.' },
          { step: '04', title: 'SEO Audit & Deployment', desc: 'Core Web Vitals 95+, schema markup, DNS setup, and zero-downtime launch.' },
        ],
        benefits: [
          'Sub-1.2 second load times for maximum conversion and low bounce rate',
          'Rank higher on Google from day one with built-in Schema & Technical SEO',
          'Intuitive Admin CMS to update copy, images, and blogs with zero code',
          'Seamless booking wizard and instant WhatsApp/CRM lead capture',
          '100% bespoke luxury aesthetics tailored to your industry authority',
          'Enterprise-grade security with rate-limiting, SSL, and CSP protection',
        ],
        features: [
          'Custom React & TypeScript front-end architecture',
          'Intuitive Admin Dashboard & Content Management System (CMS)',
          'Automated Cal.com / Calendar consultation scheduling integration',
          'Technical SEO, JSON-LD Schema & OpenGraph social cards',
          'Atomic slot lock & anti-collision booking logic',
          'Payment gateway integration (Stripe, Razorpay, LemonSqueezy)',
          '95+ Google PageSpeed & Core Web Vitals optimization',
          '90-day post-launch warranty & performance monitoring',
        ],
        faqs: [
          {
            question: 'Will I be able to update website content on my own?',
            answer:
              'Yes. Every website includes a secure, intuitive admin panel and CMS where you can create blog posts, change text, swap images, and view leads without writing any code.',
          },
          {
            question: 'How fast will the website load?',
            answer:
              'We target sub-1.2 second load times and 90+ scores on Google PageSpeed Insights through code-splitting, asset compression, and modern web architecture.',
          },
          {
            question: 'Is SEO included in the website build?',
            answer:
              'Yes. Technical SEO is baked into the foundation: semantic HTML5 tags, meta titles, descriptions, OpenGraph tags, sitemap.xml, robots.txt, and structured JSON-LD schemas.',
          },
          {
            question: 'Do you provide hosting and maintenance?',
            answer:
              'Yes. We handle cloud deployment on high-performance CDNs (Netlify/Vercel/AWS) and provide post-launch maintenance, security patches, and scaling support.',
          },
        ],
      }}
    />
  );
}
