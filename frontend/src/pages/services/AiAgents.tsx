import { ServiceTemplate } from './ServiceTemplate';

export default function AiAgents() {
  return (
    <ServiceTemplate
      config={{
        title: 'Autonomous AI Agents',
        eyebrow: '24/7 Intelligent Automation',
        description:
          'Context-aware conversational AI agents and autonomous virtual assistants that triage customer inquiries, qualify leads, and execute business actions without delay.',
        icon: '🤖',
        accent: '24/7 ALWAYS ACTIVE',
        problems: [
          'High bounce rates & lost leads arriving outside business hours',
          'Sales team wasting 60%+ time on repetitive lead qualification',
          'Slow initial response times killing inbound conversion rates',
          'Customer support tickets piling up with repetitive FAQs',
          'Fragmented CRM data requiring manual copy-paste across tools',
          'Inability to scale customer operations without hiring more staff',
        ],
        workflow: [
          { step: '01', title: 'Omnichannel Inbound Signal', desc: 'Customer reaches out via Website, WhatsApp, Telegram, or Email.' },
          { step: '02', title: 'Context & Knowledge Retrieval', desc: 'Agent queries company docs, price sheets, and CRM data in milliseconds.' },
          { step: '03', title: 'Decision & Action Execution', desc: 'Agent answers inquiries, books Cal.com appointments, or collects lead details.' },
          { step: '04', title: 'CRM Sync & Team Hand-off', desc: 'Syncs lead status to CRM and alerts sales reps if human intervention is needed.' },
        ],
        benefits: [
          'Sub-second 24/7 conversational response time',
          'Instant lead qualification before booking sales calls',
          'Direct WhatsApp, Telegram, and CRM integration',
          'Zero hallucination with verified RAG knowledge bases',
          'Seamless human escalation for high-ticket clients',
          'Up to 80% reduction in customer support overhead',
        ],
        features: [
          'Multi-channel WhatsApp & Web deployment',
          'Custom RAG knowledge base & prompt engineering',
          'Autonomous calendar slot reservation & Cal.com sync',
          'Lead qualification logic & CRM record dispatch',
          'Human-in-the-loop escalation safeguards',
          'Real-time conversation logs & analytics dashboard',
          'Multi-language conversational support',
          'Ongoing prompt optimization & SLA maintenance',
        ],
        faqs: [
          {
            question: 'How do AI Agents prevent incorrect answers or hallucinations?',
            answer:
              'We use Retrieval-Augmented Generation (RAG) tied strictly to your approved company knowledge base, docs, and pricing sheets. The agent will only provide verified answers and politely escalate unverified queries to your human team.',
          },
          {
            question: 'Can the AI Agent connect to our WhatsApp and CRM?',
            answer:
              'Yes. We integrate directly with WhatsApp Business API, HubSpot, Zoho, Google Sheets, or custom PostgreSQL/MongoDB databases to automatically update records in real time.',
          },
          {
            question: 'What happens when a customer needs a real human?',
            answer:
              'The agent detects complex or high-priority intents and immediately notifies your team via WhatsApp, Email, or Slack with full conversation context.',
          },
          {
            question: 'How long does deployment take?',
            answer:
              'Most custom AI Agent deployments go from knowledge ingestion to live testing within 2 to 3 weeks.',
          },
        ],
      }}
    />
  );
}
