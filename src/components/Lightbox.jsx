import { useRef } from "react";
import { useLightbox } from "../context/LightboxContext";
import CachedImage from "./CachedImage";

export default function Lightbox() {
  const { isOpen, images, index, close, next, prev } = useLightbox();
  const touchStart = useRef({ x: 0, y: 0 });

  if (!isOpen || !images.length) return null;
  const current = images[index];

  const onTouchStart = (e) => {
    if (!e.touches?.[0]) return;
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e) => {
    const t = e.changedTouches?.[0];
    if (!t) return;
    const deltaX = t.clientX - touchStart.current.x;
    const deltaY = t.clientY - touchStart.current.y;
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      deltaX < 0 ? next() : prev();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99999] bg-navy/90 backdrop-blur-md flex items-center justify-center p-4"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        onClick={close}
        className="absolute top-6 right-6 text-white text-3xl bg-white/10 hover:bg-white/25 w-12 h-12 rounded-full flex items-center justify-center transition"
        aria-label="Tutup"
      >
        <i className="ph-bold ph-x"></i>
      </button>
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white text-2xl bg-white/10 hover:bg-white/25 w-11 h-11 rounded-full flex items-center justify-center transition"
        aria-label="Foto sebelumnya"
      >
        <i className="ph-bold ph-caret-left"></i>
      </button>
      <CachedImage
        src={current.src}
        alt={current.alt || `Momen ${index + 1}`}
        className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-blueSoft/30"
      />
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white text-2xl bg-white/10 hover:bg-white/25 w-11 h-11 rounded-full flex items-center justify-center transition"
        aria-label="Foto berikutnya"
      >
        <i className="ph-bold ph-caret-right"></i>
      </button>
    </div>
  );
}
