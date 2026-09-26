import GalleryMasonry from "./GalleryMasonry";
import GalleryCarousel3D from "./GalleryCarousel3D";

export default function GallerySection() {
  return (
    <section id="gallery" className="py-20 px-6 relative z-10" data-aos="fade-up" data-aos-duration="700">
      <div className="max-w-5xl mx-auto text-center fade-up">
        <i className="ph-light ph-camera-rotate text-5xl md:text-6xl text-blueZ mb-4 block drop-shadow-sm"></i>
        <h2 className="font-script text-5xl md:text-6xl text-navy mb-4 drop-shadow-sm">Galeri Momen</h2>
        <p className="font-body text-sm md:text-base text-gray-600 mb-12">
          Potret kebahagiaan kami berdua menuju hari istimewa.
        </p>
      </div>

      <GalleryMasonry />
      <GalleryCarousel3D />
    </section>
  );
}
