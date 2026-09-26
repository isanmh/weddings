import { useEffect, useRef, useState } from "react";
import {
  resolveImageSrc,
  fetchAndCacheGalleryImage,
} from "../hooks/galleryImageCache";

/**
 * <img> yang otomatis:
 * - memakai versi cache localStorage kalau sudah pernah dimuat (instan, tanpa network)
 * - mengambil & menyimpan cache baru di background kalau belum ada
 * - retry otomatis (maks 2x) kalau gagal dimuat, biar tidak "hilang-hilangan"
 *   saat koneksi lambat/putus-putus
 */
export default function CachedImage({ src, alt, className, style, onClick, maxRetries = 2, ...rest }) {
  const [currentSrc, setCurrentSrc] = useState(() => resolveImageSrc(src));
  const attemptsRef = useRef(0);

  useEffect(() => {
    setCurrentSrc(resolveImageSrc(src));
    attemptsRef.current = 0;
    fetchAndCacheGalleryImage(src);
  }, [src]);

  const handleError = () => {
    attemptsRef.current += 1;
    if (attemptsRef.current > maxRetries) return;
    setTimeout(
      () => {
        setCurrentSrc(`${src}${src.includes("?") ? "&" : "?"}retry=${Date.now()}`);
      },
      500 * attemptsRef.current,
    );
  };

  const handleLoad = () => {
    attemptsRef.current = 0;
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      onClick={onClick}
      onError={handleError}
      onLoad={handleLoad}
      {...rest}
    />
  );
}
