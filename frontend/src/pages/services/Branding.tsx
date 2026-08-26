import { ServiceTemplate } from './ServiceTemplate';

export default function Branding() {
  return (
    <ServiceTemplate
      config={{
        title: 'Brand Identity & Design Systems',
        eyebrow: 'Luxury Digital Positioning',
        description:
          'Distinctive visual identities, logo architecture, typography guidelines, and design systems crafted to command premium pricing and establish industry authority.',
        icon: '💎',
        accent: 'BESPOKE LUXURY IDENTITY',
        problems: [
          'Generic visual presence that looks like a commodity freelancer or template',
          'Inconsistent logos, fonts, and colors across social media, pitch decks, and website',
          'Inability to justify premium pricing due to weak visual perceived value',
          'Disjointed design assets making marketing collateral slow and painful to produce',
          'Forgettable brand aesthetics in crowded, competitive modern markets',
          'Lack of a cohesive UI design system for developers to build clean software',
        ],
        workflow: [
          { step: '01', title: 'Brand Strategy & Market Positioning', desc: 'Analyzing competitors, defining your luxury differentiator and core brand ethos.' },
          { step: '02', title: 'Visual Identity & Monogram', desc: 'Crafting bespoke typography, logos, color palettes, and texture guidelines.' },
          { step: '03', title: 'Design System & Component Library', desc: 'Tokens, UI components, typography hierarchy, and digital asset kit.' },
          { step: '04', title: 'Collateral & Brand Guidelines Book', desc: 'Delivery of comprehensive brand guidelines, pitch deck templates, and social kits.' },
        ],
        benefits: [
          'Command premium pricing with a luxury, high-trust visual presence',
          'Complete brand consistency across web, mobile, social, and print',
          'Comprehensive design system tokens ready for instant engineering hand-off',
          'Memorable monogram, wordmark, and favicon assets in all SVG/PNG formats',
          'Comprehensive brand guidelines manual for internal and external marketing teams',
          'Distinctive differentiation from competitors relying on generic templates',
        ],
        features: [
          'Primary logo, wordmark & responsive icon monograms',
          'Curated color palettes with dark mode & accessible contrast tokens',
          'Typography pairing hierarchy (Heading, Body, Mono, Luxury Serifs)',
          'Comprehensive Brand Guidelines PDF & Figma design system file',
          'Social media kit (avatars, headers, post templates)',
          'Business stationery (cards, letterheads, invoice templates)',
          'Component design tokens ready for React & CSS integration',
          'Full vector source files (SVG, AI, EPS, Figma)',
        ],
        faqs: [
          {
            question: 'What deliverables do we receive at the end of the project?',
            answer:
              'You receive full source vector files (Figma, SVG, PNG, PDF), complete logo suite, color palette tokens, typography rules, social media kits, and an extensive Brand Guidelines manual.',
          },
          {
            question: 'Can this branding be used directly in web development?',
            answer:
              'Yes. We build all brand assets with digital-first tokens (CSS variables, React components, Tailwind tokens) so your engineering team can build with 100% fidelity.',
          },
          {
            question: 'How long does the branding process take?',
            answer:
              'A complete brand identity sprint typically takes 2 to 3 weeks from initial mood board exploration to final vector asset delivery.',
          },
          {
            question: 'Do we own 100% of the commercial rights to our branding?',
            answer:
              'Yes. You receive 100% full commercial ownership and copyright of all delivered assets and source files.',
          },
        ],
      }}
    />
  );
}
