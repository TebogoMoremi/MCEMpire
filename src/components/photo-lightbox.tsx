"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { photoSource, type PortfolioPhoto } from "@/services/portfolio";

export function PhotoLightbox({ photos, initial, onClose }: { photos: readonly PortfolioPhoto[]; initial: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(initial);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const move = (offset: number) => setIndex((current) => (current + offset + photos.length) % photos.length);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  const photo = photos[index];
  return <dialog ref={dialog} className="lightbox" aria-label="Photography viewer" onCancel={(event) => { event.preventDefault(); onClose(); }}
    onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}
    onTouchStart={(event) => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
    onTouchEnd={(event) => { const start = touch.current; touch.current = null; if (!start) return; const dx = event.changedTouches[0].clientX - start.x; const dy = event.changedTouches[0].clientY - start.y; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1); }}>
    <div className="lightbox-bar"><p aria-live="polite">{photo.title} · {index + 1} / {photos.length}</p><div className="carousel-controls"><button aria-label="Previous photograph" onClick={() => move(-1)}>←</button><button aria-label="Next photograph" onClick={() => move(1)}>→</button><button aria-label="Close photography viewer" onClick={onClose}>×</button></div></div>
    <div className="lightbox-image"><Image src={photoSource(photo)} alt={photo.alt} fill sizes="100vw" loading="eager" /></div>
    <a className="text-link" href={photoSource(photo)} target="_blank" rel="noopener noreferrer">View original photograph ↗</a>
  </dialog>;
}
