import { useLightbox } from "../context/LightboxContext";
import { profileImages } from "../data/galleryData";
import CachedImage from "./CachedImage";

function ProfileCard({ index, name, parents, instagram, aos, delay }) {
  const { open } = useLightbox();
  const photo = profileImages[index];

  return (
    <div className="relative w-full md:w-2/5" data-aos={aos} data-aos-duration="800" data-aos-delay={delay}>
      {/* Foto profil melayang di atas card */}
      <div className="relative z-10 mx-auto -mb-14 w-32 h-32 md:w-40 md:h-40">
        <div
          className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-[0_15px_35px_rgba(30,41,59,0.25)] ring-2 ring-blue-100 cursor-zoom-in group"
          onClick={() => open(profileImages, index, "profile")}
        >
          <CachedImage
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="text-center bg-white/80 backdrop-blur-sm pt-16 pb-6 px-6 rounded-3xl shadow-[0_10px_30px_rgba(74,143,199,0.15)] border border-blue-100">
        <h2 className="font-script text-4xl md:text-5xl text-navy mb-2 leading-tight drop-shadow-sm">{name}</h2>
        <p className="text-xs md:text-sm text-gray-500 font-body leading-relaxed mb-4">
          {parents.role}
          <br />
          <span className="font-serif text-gray-800 text-sm md:text-base font-semibold">{parents.names}</span>
        </p>
        <a
          href={instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-4 py-2 rounded-full shadow-md hover:opacity-90 hover:scale-105 transition-all"
        >
          <i className="ph-bold ph-instagram-logo text-base"></i>
          {instagram.handle}
        </a>
      </div>
    </div>
  );
}

export default function CoupleProfile() {
  return (
    <section id="profile" className="py-16 px-6 relative z-10" data-aos="fade-up" data-aos-duration="700">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="font-arabic text-3xl md:text-4xl text-navy mb-4"
          data-aos="zoom-in"
          data-aos-delay="150"
          data-aos-duration="700"
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </h2>

        <p
          className="font-body text-sm md:text-base text-gray-700 mt-12 mb-12 leading-relaxed max-w-2xl mx-auto bg-white/50 p-4 rounded-xl shadow-[0_5px_20px_rgba(74,143,199,0.1)]"
          data-aos="zoom-in"
          data-aos-delay="150"
          data-aos-duration="700"
        >
          Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud menyelenggarakan acara pernikahan
          kami:
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-16">
          <ProfileCard
            index={0}
            name="Ihsan Miftahul Huda, S.T"
            parents={{ role: "Mempelai pria merupakan putra kedua dari", names: "Bapak H. Nana Subarna & Ibu Hj. Popon Rohayati" }}
            instagram={{ url: "https://www.instagram.com/isanz_mh", handle: "@isanz_mh" }}
            aos="fade-left"
            delay={0}
          />

          <div className="font-script text-5xl md:text-6xl text-blueZ fade-up drop-shadow-md md:mt-16">&</div>

          <ProfileCard
            index={1}
            name="Ai Liana Nuraeni"
            parents={{ role: "Mempelai wanita merupakan putri pertama dari", names: "Bapak Ajat Sudrajat & Ibu Yuyun Yulinda" }}
            instagram={{ url: "https://instagram.com/ailiananuraeni", handle: "@ailiananuraeni" }}
            aos="fade-right"
            delay={150}
          />
        </div>
      </div>
    </section>
  );
}
