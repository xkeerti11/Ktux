export function sanitizeContent(input: string | undefined | null): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<(iframe|object|embed|svg|link|meta)[\s\S]*?>[\s\S]*?<\/\1>/gi, '')
    .replace(/<(iframe|object|embed|svg|link|meta)[^>]*>/gi, '')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '');
}
