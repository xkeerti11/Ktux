import { ServiceTemplate } from './ServiceTemplate';

export default function AiAutomation() {
  return (
    <ServiceTemplate
      config={{
        title: 'Custom AI Automation & Workflows',
        eyebrow: 'Operations & Process Engineering',
        description:
          'End-to-end automation pipelines that connect your lead capture, CRM, payment systems, and internal tools to eliminate repetitive manual work by 80%.',
        icon: '⚡',
        accent: '80% MANUAL OPS SAVINGS',
        problems: [
          'Manual copy-pasting data between spreadsheets, email, and CRM',
          'Missed lead follow-ups due to slow human response loops',
          'Disconnected software stacks creating data silos and billing errors',
          'Hours wasted each week generating invoices and status reports',
          'Repetitive onboarding tasks dragging down employee velocity',
          'Inability to scale operational volume without hiring back-office headcount',
        ],
        workflow: [
          { step: '01', title: 'Trigger Event Capture', desc: 'New lead form, payment webhook, or inbound email event detected.' },
          { step: '02', title: 'AI Extraction & Validation', desc: 'LLM parses unformatted text, validates data integrity, and enriches records.' },
          { step: '03', title: 'Multi-App Synchronization', desc: 'Instantly updates CRM, fires WhatsApp confirmation, and provisions accounts.' },
          { step: '04', title: 'Automated Reporting', desc: 'Daily/weekly operational performance summaries dispatched to leadership.' },
        ],
        benefits: [
          '80% reduction in manual data processing and administration',
          'Instant sub-second lead ingestion and automated WhatsApp follow-ups',
          'Zero human data-entry errors and duplicate record issues',
          'Seamless connection between Stripe, WhatsApp, CRM, and Databases',
          'Lower operational overhead while increasing client capacity',
          'Real-time automated KPI dashboards and instant notifications',
        ],
        features: [
          'Custom webhook & API pipeline engineering',
          'Automated WhatsApp & Email nurturing sequences',
          'CRM pipeline automation (HubSpot, Zoho, Salesforce, Notion)',
          'AI document & invoice parsing with structured JSON output',
          'Automated billing, invoicing & payment reconciliation',
          'Fail-safe retry queues & error monitoring alerting',
          'Custom internal Slack/Discord operation bots',
          'Quarterly workflow audit & optimization SLA',
        ],
        faqs: [
          {
            question: 'Will AI automation replace our existing tools?',
            answer:
              'No. We connect and orchestrate your existing tools (CRM, WhatsApp, Email, Sheets, Accounting software) so they talk to each other automatically without requiring you to switch platforms.',
          },
          {
            question: 'How secure is our business data during automated processing?',
            answer:
              'All data pipelines use enterprise-grade encryption (TLS in transit, AES-256 at rest) with strict API authentication and zero unauthorized third-party data retention.',
          },
          {
            question: 'What happens if a third-party API goes down?',
            answer:
              'Our automation architecture includes built-in retry queues and error notification webhooks to ensure zero data loss during external vendor outages.',
          },
          {
            question: 'How quickly will we see an ROI on workflow automation?',
            answer:
              'Most clients reclaim 20+ hours of team capacity and eliminate manual backlog within the very first month of deployment.',
          },
        ],
      }}
    />
  );
}
