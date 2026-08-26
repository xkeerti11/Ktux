import { ServiceTemplate } from './ServiceTemplate';

export default function AiUgcAds() {
  return (
    <ServiceTemplate
      config={{
        title: 'AI UGC Video Ads & Content Engines',
        eyebrow: 'High-ROAS Marketing Systems',
        description:
          'Hyper-realistic AI user-generated content (UGC) video ads engineered for Meta, TikTok, and Instagram to slash ad production costs by 90% and scale conversion.',
        icon: '🎬',
        accent: '3-5X HIGHER CTR',
        problems: [
          'High production costs paying ₹25K–₹1L+ per traditional UGC creator video',
          'Slow turnaround times (2-4 weeks) making ad testing sluggish and expensive',
          'Ad creative fatigue draining return on ad spend (ROAS) after 10 days',
          'Inconsistent creator delivery quality, lighting, and script execution',
          'Difficulty scaling localized video ads across multi-language markets',
          'Lack of variation to perform rapid A/B testing on marketing hooks',
        ],
        workflow: [
          { step: '01', title: 'Hook & Script Strategy', desc: 'Direct-response copywriting tailored to your high-converting product angles.' },
          { step: '02', title: 'AI Avatar & Voice Synthesis', desc: 'Selection of hyper-realistic AI creators, natural accents, and audio cadence.' },
          { step: '03', title: 'Multi-Hook Variation Batch', desc: 'Generating 10+ hook and CTA variations in 48 hours for rapid A/B testing.' },
          { step: '04', title: 'Ad Performance Scaling', desc: 'Identifying top-performing creatives to iterate and scale winning ROAS.' },
        ],
        benefits: [
          '90% cost reduction compared to traditional UGC agencies and creator fees',
          'Rapid 48-to-72-hour turnaround for continuous ad pipeline testing',
          '3x to 5x higher click-through rates (CTR) with high-retention visual hooks',
          'Infinite scalability with multi-language and demographic targeting',
          'Zero scheduling delays, creator dropouts, or reshoot costs',
          'Ready-to-upload formats optimized for Reels, TikTok, and YouTube Shorts',
        ],
        features: [
          'Custom direct-response video scriptwriting',
          'Hyper-realistic AI actor avatars & natural voice synthesis',
          'Dynamic captions, B-roll overlays & trend sound design',
          'Multiple hook variations per ad concept for A/B testing',
          'Vertical 9:16 and square 1:1 format exports',
          'Multi-language translation & localized voice dubbing',
          'Ad account creative strategy & performance audit',
          'Monthly recurring creative refresh packages',
        ],
        faqs: [
          {
            question: 'Do AI UGC ads look natural and authentic?',
            answer:
              'Yes. We use cutting-edge generative video models with natural micro-expressions, conversational pacing, authentic lighting, and dynamic captions that blend natively into social feeds.',
          },
          {
            question: 'How fast can we receive our first batch of ads?',
            answer:
              'Once scripts and angles are approved, the complete batch of video creatives is rendered and delivered within 48 to 72 hours.',
          },
          {
            question: 'Can we generate ads in multiple languages?',
            answer:
              'Yes. We can generate identical creative angles in Hindi, English, Spanish, and 20+ global languages with localized lip-sync and tone.',
          },
          {
            question: 'What platforms are these ads formatted for?',
            answer:
              'All videos are exported in high-bitrate 9:16 vertical MP4 format with burned-in animated captions, ready for Meta Ads (Instagram/Facebook), TikTok Ads, and YouTube Shorts.',
          },
        ],
      }}
    />
  );
}
