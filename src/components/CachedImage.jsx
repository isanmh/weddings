import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  resolveImageSrc,
  fetchAndCacheGalleryImage,
} from "../hooks/galleryImageCache";

/**
 * <img> (via react-lazy-load-image-component) yang otomatis:
 * - hanya dimuat saat mendekati viewport (lazy load) supaya halaman ringan & cepat
 * - menampilkan efek blur-up halus selagi gambar asli dimuat
 * - memakai versi cache localStorage kalau sudah pernah dimuat (instan, tanpa network)
 * - mengambil & menyimpan cache baru di background kalau belum ada
 * - retry otomatis (maks 2x) kalau gagal dimuat, biar tidak "hilang-hilangan"
 *   saat koneksi lambat/putus-putus
 *
 * Props tambahan:
 * - visibleByDefault: lewati lazy-load (untuk gambar yang harus tampil instan,
 *   misalnya slide aktif di carousel atau foto yang sedang dibuka di lightbox)
 * - wrapperClassName: className untuk <span> pembungkus dari library ini
 *   (default "block w-full h-full" supaya ukurannya tetap mengikuti parent)
 */
export default function CachedImage({
  src,
  alt,
  className,
  wrapperClassName,
  style,
  onClick,
  maxRetries = 2,
  effect = "blur",
  threshold = 200,
  visibleByDefault = false,
  ...rest
}) {
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
    <LazyLoadImage
      key={src}
      src={currentSrc}
      alt={alt}
      effect={effect}
      threshold={threshold}
      visibleByDefault={visibleByDefault}
      className={className}
      wrapperClassName={wrapperClassName || "block w-full h-full"}
      style={style}
      onClick={onClick}
      onError={handleError}
      onLoad={handleLoad}
      {...rest}
    />
  );
}
