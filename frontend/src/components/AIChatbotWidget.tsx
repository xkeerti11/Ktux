import { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, Send, X, RotateCcw, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAiChat } from '../hooks/useAiChat';
import { formatAiMessage } from '../lib/renderMarkdown';

const QUICK_ACTIONS = [
  'Website Speed & Tech',
  'View Pricing & ROI',
  'AI Agent Capabilities',
  'Book Strategy Call',
];

export function AIChatbotWidget() {
  const [open, setOpen] = useState(false);
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
      {open && (
        <section className="chat-widget glass" aria-label="KTUX AI Concierge">
          <header className="chat-header">
            <div className="chat-agent">
              <span className="chat-avatar">
                <Bot size={19} />
              </span>
              <span>
                <strong>KTUX CONCIERGE</strong>
                <small>
                  <i /> Online · Founder AI Assistant
                </small>
              </span>
            </div>
            <div className="chat-actions">
              <button className="icon-button" aria-label="Reset chat" onClick={reset}>
                <RotateCcw size={15} />
              </button>
              <button className="icon-button" aria-label="Close chat" onClick={() => setOpen(false)}>
                <X size={17} />
              </button>
            </div>
          </header>

          <div className="chat-stream">
            {messages.map((message, index) => (
              <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>
                <span className="chat-message-avatar">
                  {message.role === 'assistant' ? <Bot size={14} /> : 'U'}
                </span>
                <div>
                  <div
                    className="chat-bubble"
                    dangerouslySetInnerHTML={{
                      __html: formatAiMessage(message.content),
                    }}
                  />
                  <time>
                    {message.createdAt
                      ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : 'Now'}
                  </time>
                </div>
              </div>
            ))}
            {isPending && (
              <div className="chat-message assistant">
                <span className="chat-message-avatar">
                  <Bot size={14} />
                </span>
                <div className="chat-bubble typing">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
            <div ref={bottom} />
          </div>

          <div className="chat-quick-actions">
            {QUICK_ACTIONS.map((action) => (
              <button key={action} onClick={() => submit(action)} disabled={isPending}>
                {action}
              </button>
            ))}
          </div>

          <div className="chat-input-row">
            <input
              aria-label="Message KTUX AI"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  submit();
                }
              }}
              placeholder="Ask about website speed, AI agents, pricing..."
            />
            <button
              className="chat-send"
              aria-label="Send message"
              disabled={!input.trim() || isPending}
              onClick={() => submit()}
            >
              <Send size={16} />
            </button>
          </div>

          <Link className="chat-full-link" to="/ai-assistant" onClick={() => setOpen(false)}>
            Open full assistant <ArrowUpRight size={13} />
          </Link>
        </section>
      )}

      <button
        className={`chat-launcher ${open ? 'active' : ''}`}
        aria-label={open ? 'Close AI concierge' : 'Open AI concierge'}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <X size={22} />
        ) : (
          <>
            <MessageCircle size={21} />
            <span className="chat-online-dot" />
          </>
        )}
      </button>
    </>
  );
}
