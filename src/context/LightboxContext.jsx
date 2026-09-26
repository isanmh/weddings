import { createContext, useContext, useMemo, useRef, useState, useCallback } from "react";

const LightboxContext = createContext(null);

export function LightboxProvider({ children }) {
  const [state, setState] = useState({
    isOpen: false,
    images: [],
    index: 0,
    source: "featured", // "featured" | "masonry" | "profile"
  });

  // dipakai carousel 3D "Momen Pilihan" untuk menyinkronkan posisi slide
  // ketika pengguna geser foto di dalam lightbox
  const featuredSyncRef = useRef(null);
  const registerFeaturedSync = useCallback((fn) => {
    featuredSyncRef.current = fn;
  }, []);

  const goTo = useCallback((nextIndex) => {
    setState((prev) => {
      if (!prev.images.length) return prev;
      const total = prev.images.length;
      const idx = ((nextIndex % total) + total) % total;
      if (prev.source === "featured" && featuredSyncRef.current) {
        featuredSyncRef.current(idx);
      }
      return { ...prev, index: idx };
    });
  }, []);

  const open = useCallback((images, index, source = "featured") => {
    if (!images || !images.length) return;
    setState({ isOpen: true, images, index: index >= 0 ? index : 0, source });
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = "auto";
  }, []);

  const next = useCallback(() => goTo(state.index + 1), [goTo, state.index]);
  const prev = useCallback(() => goTo(state.index - 1), [goTo, state.index]);

  const value = useMemo(
    () => ({ ...state, open, close, next, prev, goTo, registerFeaturedSync }),
    [state, open, close, next, prev, goTo, registerFeaturedSync],
  );

  return <LightboxContext.Provider value={value}>{children}</LightboxContext.Provider>;
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox harus dipakai di dalam <LightboxProvider>");
  return ctx;
}
