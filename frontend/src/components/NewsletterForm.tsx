import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { client } from '../lib/api/client';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setState('loading');
    try { await client.post('/newsletter/subscribe', { email: email.trim(), source: 'website', consent: true }); setState('success'); setEmail(''); }
    catch { setState('error'); }
  };
  if (state === 'success') return <div className="newsletter-success"><Check size={18} /> You’re on the list. Welcome to the dispatch.</div>;
  return <form className="newsletter-form" onSubmit={submit}>
    <label className="sr-only" htmlFor="newsletter-email">Email address</label>
    <input id="newsletter-email" className="form-field" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" aria-invalid={state === 'error'} />
    <button className="button button-primary" type="submit" disabled={state === 'loading'}>{state === 'loading' ? <Loader2 className="spin" size={16} /> : <ArrowRight size={16} />} <span>Subscribe</span></button>
    {state === 'error' && <span className="form-error">Please try again with a valid email.</span>}
  </form>;
}
