import DOMPurify from 'dompurify';

export function formatAiMessage(content: string): string {
  if (!content) return '';

  let html = content
    // Replace headings: ### Heading
    .replace(/^### (.*$)/gim, '<h4 style="margin: 8px 0 4px; font-size: 14px; font-weight: 800; color: #FFFFFF;">$1</h4>')
    // Replace headings: ## Heading
    .replace(/^## (.*$)/gim, '<h3 style="margin: 10px 0 4px; font-size: 15px; font-weight: 900; color: #FFFFFF;">$1</h3>')
    // Replace bold: **text**
    .replace(/\*\*(.*?)\*\*/gim, '<strong style="color: #FFFFFF; font-weight: 700;">$1</strong>')
    // Replace italic: *text*
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Replace markdown links: [text](url)
    .replace(
      /\[(.*?)\]\((.*?)\)/gim,
      '<a href="$2" style="color: #22C55E; font-weight: 700; text-decoration: underline;" target="_blank" rel="noreferrer noopener">$1</a>'
    )
    // Replace bullet points: - item or * item
    .replace(/^\s*[-*]\s+(.*$)/gim, '<li style="margin-left: 14px; color: #E4E4E7;">$1</li>')
    // Replace line breaks
    .replace(/\n/g, '<br />');

  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['target', 'rel', 'style'],
    ADD_TAGS: ['h3', 'h4', 'strong', 'em', 'a', 'li', 'br'],
  });
}
