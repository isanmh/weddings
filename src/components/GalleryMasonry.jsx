import { useLightbox } from "../context/LightboxContext";
import { momentImages } from "../data/galleryData";
import CachedImage from "./CachedImage";

export default function GalleryMasonry() {
  const { open } = useLightbox();

  return (
    <div className="max-w-6xl mx-auto mb-16">
      <h3 className="font-serif text-xl md:text-2xl text-navy mb-6 text-center">Kilas Balik Kebersamaan</h3>
      <div className="columns-2 sm:columns-3 md:columns-4 gap-3 md:gap-4">
        {momentImages.map((img, i) => (
          <div
            key={img.src}
            className="mb-3 md:mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(74,143,199,0.18)] cursor-pointer group"
            data-aos="fade-up"
            data-aos-duration="450"
            data-aos-easing="ease-out-cubic"
            data-aos-delay={i * 50}
            onClick={() => open(momentImages, i, "masonry")}
          >
            <CachedImage
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
