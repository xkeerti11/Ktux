import { useCallback, useState } from 'react';
import { sendChat } from '../lib/api/endpoints';
import type { ChatMessage } from '../lib/api/types';

const WELCOME: ChatMessage = { role: 'assistant', content: 'Hello! I\'m the KTUX AI, personally connected to our founder. 👋\n\nWe build complete digital projects from 0 to production — website, AI automation, security, everything — using cutting-edge AI tools. Just tell me your idea and we\'ll take it from there. What project are you looking to build?' };

export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [sessionId, setSessionId] = useState<string>();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const send = useCallback(async (content: string) => {
    const message = content.trim();
    if (!message || isPending) return;
    setError(false); setIsPending(true); setMessages((current) => [...current, { role: 'user', content: message }]);
    try { const result = await sendChat({ message, sessionId }); setSessionId(result.sessionId); setMessages((current) => [...current, { role: 'assistant', content: result.message, createdAt: new Date().toISOString() }]); }
    catch { setError(true); setMessages((current) => [...current, { role: 'assistant', content: 'I couldn’t reach the studio right now. Please try again or book a strategy call.' }]); }
    finally { setIsPending(false); }
  }, [isPending, sessionId]);
  const reset = useCallback(() => { setSessionId(undefined); setError(false); setMessages([WELCOME]); }, []);
  return { messages, isPending, error, send, reset };
}
