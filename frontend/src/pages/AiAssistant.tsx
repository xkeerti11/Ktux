import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Bot, Link as LinkIcon, MessageCircle, RotateCcw, Send, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAiChat } from '../hooks/useAiChat';
import { formatAiMessage } from '../lib/renderMarkdown';

const actions = [
  'Website Speed & Tech',
  'View Pricing & ROI',
  'AI Agent Capabilities',
  'Case Studies & Portfolio',
  'Book Strategy Call',
];

export default function AiAssistant() {
  const [input, setInput] = useState('');
  const bottom = useRef<HTMLDivElement>(null);
  const { messages, isPending, send, reset } = useAiChat();

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPending]);

  const submit = (value = input) => {
    if (!value.trim()) return;
    send(value);
    setInput('');
  };

  return (
    <>
      <Helmet>
        <title>AI Concierge & Architecture Consultant — KTUX Studio</title>
        <meta
          name="description"
          content="Consult with the KTUX Studio AI Architect about web speed, autonomous AI agents, workflow automation, and custom sprint pricing."
        />
      </Helmet>

      <div className="assistant-page">
        <header className="assistant-header">
          <div className="site-container assistant-header-inner">
            <div className="assistant-title">
              <span className="chat-avatar">
                <Bot size={21} />
              </span>
              <span>
                <span className="eyebrow">KTUX Intelligence</span>
                <strong>Founder AI Concierge</strong>
                <small>
                  <i /> Online · High-Conversion Sales Architect
                </small>
              </span>
            </div>
            <button className="button button-ghost" onClick={reset}>
              <RotateCcw size={15} /> New conversation
            </button>
          </div>
        </header>

        <main className="assistant-main">
          <div className="assistant-stream">
            {messages.map((message, index) => (
              <div className={`assistant-message ${message.role}`} key={index}>
                <span className="assistant-avatar">
                  {message.role === 'assistant' ? <Bot size={16} /> : 'U'}
                </span>
                <div className="assistant-message-content">
                  <div
                    className="assistant-bubble"
                    dangerouslySetInnerHTML={{
                      __html: formatAiMessage(message.content),
                    }}
                  />
                  <small>
                    {message.createdAt
                      ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : 'Now'}
                  </small>
                </div>
              </div>
            ))}
            {isPending && (
              <div className="assistant-message">
                <span className="assistant-avatar">
                  <Bot size={16} />
                </span>
                <div className="assistant-bubble typing">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
            <div ref={bottom} />
          </div>
        </main>

        <footer className="assistant-composer">
          <div className="site-container">
            <div className="assistant-actions">
              {actions.map((action) => (
                <button key={action} disabled={isPending} onClick={() => submit(action)}>
                  <Sparkles size={13} /> {action}
                </button>
              ))}
            </div>
            <div className="assistant-input">
              <textarea
                aria-label="Message KTUX AI"
                rows={1}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    submit();
                  }
                }}
                placeholder="Ask about website development, autonomous AI agents, pricing, or case studies..."
              />
              <button
                aria-label="Send message"
                disabled={!input.trim() || isPending}
                onClick={() => submit()}
              >
                <Send size={18} />
              </button>
            </div>
            <div className="assistant-footer-note">
              <span>
                <MessageCircle size={12} /> Your conversation is private to this session.
              </span>
              <Link to="/book-consultation">
                Prefer a human conversation? <LinkIcon size={12} />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
