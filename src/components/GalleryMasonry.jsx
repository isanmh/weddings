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
            className="relative mb-3 md:mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(74,143,199,0.18)] cursor-pointer group"
            data-aos="fade-up"
            data-aos-duration="450"
            data-aos-easing="ease-out-cubic"
            data-aos-delay={i * 50}
            onClick={() => open(momentImages, i, "masonry")}
          >
            <CachedImage
              src={img.src}
              alt={img.alt}
              wrapperClassName="block w-full"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay gelap halus + ikon zoom-in, penanda foto bisa diperbesar */}
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/85 backdrop-blur-sm shadow-md flex items-center justify-center text-navy opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none">
              <i className="ph-bold ph-magnifying-glass-plus text-base md:text-lg"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
