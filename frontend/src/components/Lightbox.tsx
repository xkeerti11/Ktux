import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function Lightbox({ images, index, onClose, onChange }: { images: string[]; index: number; onClose: () => void; onChange: (index: number) => void }) {
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); if (event.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length); if (event.key === 'ArrowRight') onChange((index + 1) % images.length); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [images.length, index, onChange, onClose]);
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image gallery" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <button className="icon-button lightbox-close" aria-label="Close gallery" onClick={onClose}><X size={20} /></button>
    {images.length > 1 && <button className="icon-button lightbox-prev" aria-label="Previous image" onClick={() => onChange((index - 1 + images.length) % images.length)}><ChevronLeft /></button>}
    <img src={images[index]} alt={`Gallery image ${index + 1}`} />
    {images.length > 1 && <button className="icon-button lightbox-next" aria-label="Next image" onClick={() => onChange((index + 1) % images.length)}><ChevronRight /></button>}
  </div>;
}
