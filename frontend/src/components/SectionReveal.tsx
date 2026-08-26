import type { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function SectionReveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: .45, delay, ease: [0.25, 0.1, 0.25, 1] }}>{children}</motion.div>;
}
