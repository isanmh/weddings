import { useEffect, useRef, useState, useCallback } from "react";
import { useLightbox } from "../context/LightboxContext";
import { momenPilihanImages } from "../data/galleryData";
import CachedImage from "./CachedImage";

const AUTOPLAY_INTERVAL = 5000;
const AUTOPLAY_RESUME_DELAY = 4500;
const total = momenPilihanImages.length;

// Hitung transform tiap slide berdasar jarak melingkar (circular distance) ke slide aktif,
// sehingga carousel benar-benar infinite: bisa diputar ke arah manapun tanpa pernah "mentok".
function getSlideStyle(i, activeIndex) {
  let diff = i - activeIndex;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;

  const absDiff = Math.abs(diff);
  let translateX, scale, rotateY, zIndex, opacity, blurPx;

  if (absDiff === 0) {
    translateX = 0;
    scale = 1;
    rotateY = 0;
    zIndex = 30;
    opacity = 1;
    blurPx = 0;
  } else if (absDiff === 1) {
    translateX = diff > 0 ? 58 : -58;
    scale = 0.74;
    rotateY = diff > 0 ? -32 : 32;
    zIndex = 20;
    opacity = 0.85;
    blurPx = 1;
  } else if (absDiff === 2) {
    translateX = diff > 0 ? 100 : -100;
    scale = 0.55;
    rotateY = diff > 0 ? -42 : 42;
    zIndex = 10;
    opacity = 0.45;
    blurPx = 2;
  } else {
    translateX = diff > 0 ? 132 : -132;
    scale = 0.4;
    rotateY = diff > 0 ? -42 : 42;
    zIndex = 0;
    opacity = 0;
    blurPx = 2;
  }

  return {
    transform: `translate(-50%, -50%) translateX(${translateX}%) scale(${scale}) rotateY(${rotateY}deg)`,
    zIndex,
    opacity,
    filter: blurPx ? `blur(${blurPx}px)` : "none",
    pointerEvents: absDiff <= 2 ? "auto" : "none",
    transformStyle: "preserve-3d",
    backfaceVisibility: "hidden",
    transition: "transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 700ms ease, filter 700ms ease",
  };
}

export default function GalleryCarousel3D() {
  const { open, registerFeaturedSync } = useLightbox();
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef(null);
  const autoplayRef = useRef(null);
  const resumeRef = useRef(null);
  const dragRef = useRef({ dragging: false, startX: 0, moved: false });

  const goTo = useCallback((index) => {
    setActiveIndex(((index % total) + total) % total);
  }, []);

  // supaya lightbox bisa menyinkronkan posisi carousel saat foto digeser di dalam modal
  useEffect(() => {
    registerFeaturedSync((index) => setActiveIndex(index));
    return () => registerFeaturedSync(null);
  }, [registerFeaturedSync]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_INTERVAL);
  }, [stopAutoplay]);

  const pauseThenResume = useCallback(() => {
    stopAutoplay();
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(startAutoplay, AUTOPLAY_RESUME_DELAY);
  }, [stopAutoplay, startAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
      if (resumeRef.current) clearTimeout(resumeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSlideClick = (i) => {
    if (dragRef.current.moved) return;
    if (i === activeIndex) {
      open(momenPilihanImages, activeIndex, "featured");
    } else {
      goTo(i);
      pauseThenResume();
    }
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = { dragging: true, startX: e.clientX, moved: false };
    stopAutoplay();
    stageRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.dragging) return;
    if (Math.abs(e.clientX - dragRef.current.startX) > 6) dragRef.current.moved = true;
  };

  const endDrag = (clientX) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const deltaX = clientX - dragRef.current.startX;
    const threshold = 40;
    if (deltaX <= -threshold) goTo(activeIndex + 1);
    else if (deltaX >= threshold) goTo(activeIndex - 1);
    pauseThenResume();
    setTimeout(() => {
      dragRef.current.moved = false;
    }, 0);
  };

  return (
    <div className="max-w-5xl mx-auto text-center">
      <h3 className="font-serif text-xl md:text-2xl text-navy mb-6" data-aos="fade-up" data-aos-duration="700">
        Momen Pilihan
      </h3>

      <div className="relative">
        <div
          ref={stageRef}
          className="relative w-full aspect-[3/4] sm:aspect-[16/9] mx-auto overflow-hidden select-none touch-pan-y"
          style={{ perspective: "1400px" }}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={(e) => endDrag(e.clientX)}
          onPointerCancel={() => (dragRef.current.dragging = false)}
          onPointerLeave={() => dragRef.current.dragging && endDrag(dragRef.current.startX)}
        >
          <div className="absolute inset-0">
            {momenPilihanImages.map((img, i) => (
              <div
                key={img.src}
                className="moment-3d-slide absolute top-1/2 left-1/2 w-[68%] sm:w-[46%] h-[86%] sm:h-[92%] rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(30,41,59,0.35)] cursor-pointer bg-gray-200"
                style={getSlideStyle(i, activeIndex)}
                onClick={() => handleSlideClick(i)}
              >
                <CachedImage
                  src={img.src}
                  alt={img.alt}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : undefined}
                  visibleByDefault={i === 0}
                  className="w-full h-full object-cover pointer-events-none"
                />
                {/* Badge "Lihat" + ikon zoom, hanya muncul di slide yang sedang aktif */}
                {i === activeIndex && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-navy/70 backdrop-blur-sm text-white text-xs md:text-sm font-semibold px-3.5 py-1.5 rounded-full shadow-lg pointer-events-none animate-pulse">
                    <i className="ph-bold ph-magnifying-glass-plus text-sm md:text-base"></i>
                    <span>Lihat</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            goTo(activeIndex - 1);
            pauseThenResume();
          }}
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/85 backdrop-blur-sm shadow-lg flex items-center justify-center text-navy hover:bg-white hover:scale-110 transition-all"
          aria-label="Foto sebelumnya"
        >
          <i className="ph-bold ph-caret-left text-xl"></i>
        </button>
        <button
          type="button"
          onClick={() => {
            goTo(activeIndex + 1);
            pauseThenResume();
          }}
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/85 backdrop-blur-sm shadow-lg flex items-center justify-center text-navy hover:bg-white hover:scale-110 transition-all"
          aria-label="Foto berikutnya"
        >
          <i className="ph-bold ph-caret-right text-xl"></i>
        </button>
      </div>
    </div>
  );
}
