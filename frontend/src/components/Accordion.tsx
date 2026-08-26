import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function Accordion({ items }: { items: Array<{ question: string; answer: string }> }) {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="accordion-list">{items.map((item, index) => <div className="accordion-item" key={item.question}>
    <button className="accordion-trigger" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}><span>{item.question}</span><ChevronDown size={17} className={open === index ? 'rotate-180' : ''} /></button>
    {open === index && <div className="accordion-answer">{item.answer}</div>}
  </div>)}</div>;
}
