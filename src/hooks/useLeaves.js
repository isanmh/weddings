import { useEffect, useRef } from "react";

/**
 * Membuat elemen ".leaf" (daun berjatuhan) di dalam container yang di-ref.
 * countOverride: jumlah daun tetap; kalau tidak diisi, otomatis 22 (desktop) / 12 (mobile).
 */
export function useLeaves(countOverride) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const leafCount = countOverride ?? (window.innerWidth > 768 ? 22 : 12);
    const leaves = [];

    for (let i = 0; i < leafCount; i++) {
      const leaf = document.createElement("div");
      leaf.classList.add("leaf");
      leaf.style.left = Math.random() * 100 + "vw";
      leaf.style.animationDuration = Math.random() * 6 + 10 + "s";
      leaf.style.animationDelay = Math.random() * 10 + "s";
      const size = Math.random() * 14 + 10;
      leaf.style.width = size + "px";
      leaf.style.height = size + "px";
      container.appendChild(leaf);
      leaves.push(leaf);
    }

    return () => {
      leaves.forEach((leaf) => leaf.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return containerRef;
}
