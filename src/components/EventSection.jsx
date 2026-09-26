import { useCountdown } from "../hooks/useCountdown";

const TARGET_DATE = "Oct 11, 2026 08:00:00";

export default function EventSection() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  const timeBoxes = [
    { label: "Hari", value: days },
    { label: "Jam", value: hours },
    { label: "Menit", value: minutes },
    { label: "Detik", value: seconds },
  ];

  return (
    <section
      id="event"
      className="py-20 px-6 bg-gradient-to-b from-navy to-navyLight text-white flex flex-col items-center relative z-10 mt-10 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(34,87,122,0.3)] border-t border-blueSoft/30"
      data-aos="fade-up"
      data-aos-duration="700"
    >
      <div className="fade-up w-full max-w-5xl mx-auto text-center">
        {/* Countdown Timer */}
        <div className="mb-16 fade-up">
          <p className="font-script text-4xl text-gold mb-6 drop-shadow-lg">Menghitung Hari</p>
          <div className="flex justify-center gap-3 md:gap-6" data-aos="zoom-out" data-aos-delay="150" data-aos-duration="700">
            {timeBoxes.map((box) => (
              <div
                key={box.label}
                className="glass-dark w-16 h-20 md:w-24 md:h-28 rounded-2xl flex flex-col items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
              >
                <span className="font-serif text-2xl md:text-4xl text-gold font-bold">{box.value}</span>
                <span className="text-[9px] md:text-xs text-blue-200 uppercase tracking-widest mt-1">{box.label}</span>
              </div>
            ))}
          </div>
        </div>

        <i className="ph-light ph-calendar-heart text-5xl md:text-6xl text-blueSoft mb-4 block"></i>
        <h2 className="font-script text-5xl md:text-7xl mb-12 drop-shadow-md" data-aos="zoom-in" data-aos-delay="150" data-aos-duration="700">
          Detail Acara
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-4xl mx-auto mb-16 fade-up">
          <div
            className="bg-navy/80 p-8 rounded-3xl border border-blueSoft/30 shadow-[0_15px_30px_rgba(74,143,199,0.15)] relative overflow-hidden group hover:border-gold/50 hover:scale-105 transition-all duration-300"
            data-aos="fade-left"
            data-aos-delay="150"
            data-aos-duration="700"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blueSoft/10 rounded-bl-full -z-0"></div>
            <h3 className="font-serif text-2xl md:text-3xl text-gold mb-4 relative z-10">
              <b>Akad Nikah</b>
            </h3>
            <p className="mb-2 text-sm md:text-base text-gray-200 relative z-10">
              <i className="ph-fill ph-calendar-blank text-blueSoft mr-2"></i>
              Minggu, 11 Oktober 2026
            </p>
            <p className="mb-2 text-sm md:text-base text-gray-200 relative z-10">
              <i className="ph-fill ph-clock text-blueSoft mr-2"></i> 10.00 WIB
            </p>
            <p className="text-gray-200 text-xs md:text-sm mb-4 leading-relaxed font-medium">
              <i className="ph-bold ph-map-pin text-blueSoft mr-1 text-sm"></i>
              Gedung Bumdes Salebu
            </p>
          </div>

          <div
            className="bg-navy/80 p-8 rounded-3xl border border-blueSoft/30 shadow-[0_15px_30px_rgba(74,143,199,0.15)] relative overflow-hidden group hover:border-blue-400/50 hover:scale-105 transition-all duration-300"
            data-aos="fade-right"
            data-aos-delay="150"
            data-aos-duration="700"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400/10 rounded-br-full -z-0"></div>
            <h3 className="font-serif text-2xl md:text-3xl text-gold mb-4 relative z-10">
              <b>Resepsi</b>
            </h3>
            <p className="mb-2 text-sm md:text-base text-gray-200 relative z-10">
              <i className="ph-fill ph-calendar-blank text-blueSoft mr-2"></i>
              Minggu, 11 Oktober 2026
            </p>
            <p className="mb-2 text-sm md:text-base text-gray-200 relative z-10">
              <i className="ph-fill ph-clock text-blueSoft mr-2"></i> 11.00 - 15.00 WIB
            </p>
            <p className="text-gray-200 text-xs md:text-sm mb-4 leading-relaxed font-medium">
              <i className="ph-bold ph-map-pin text-blueSoft mr-1 text-sm"></i>
              Gedung Bumdes Salebu
            </p>
          </div>
        </div>

        <div className="mb-6 fade-up">
          <h3 className="font-serif text-2xl md:text-3xl text-gold mb-6 drop-shadow-md">
            <b>Lokasi Acara</b>
          </h3>

          <div className="relative max-w-4xl mx-auto">
            <div
              className="bg-white/10 p-2 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm border border-blueSoft/30 fade-up"
              data-aos="zoom-in"
              data-aos-delay="150"
              data-aos-duration="700"
            >
              <iframe
                title="Lokasi Gedung Bumdes Salebu"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.199464016629!2d108.0649161!3d-7.373953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f55d692a021f3%3A0xd31bb4235449937e!2sGedung%20Bumdes%20Salebu!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="350"
                style={{ border: 0, borderRadius: "1.25rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Location Card - Desktop */}
            <div
              className="hidden md:block absolute bottom-6 left-6 w-80 bg-white/95 backdrop-blur-sm border border-blueSoft/30 rounded-2xl p-5 shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-blue-400/50 transition-all duration-300 z-20"
              data-aos="zoom-in"
              data-aos-delay="150"
              data-aos-duration="700"
            >
              <h4 className="font-sans text-lg md:text-xl text-navy font-bold mb-3">
                <b>Gedung Bumdes Salebu</b>
              </h4>
              <p className="text-gray-700 text-xs md:text-sm mb-4 leading-relaxed font-medium">
                <i className="ph-bold ph-map-pin text-blueSoft mr-1 text-sm"></i>
                Salebu, Kec. Mangunreja, Kab. Tasikmalaya
              </p>
              <a
                href="https://maps.app.goo.gl/9E7wXC2dEybcpE6aA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white text-sm font-bold px-4 py-2 rounded-lg hover:from-blue-600 hover:to-sky-600 transition-all shadow-[0_8px_20px_rgba(74,143,199,0.3)] hover:scale-105 active:scale-95"
              >
                <i className="ph-bold ph-map-pin text-base"></i> Buka Maps
              </a>
            </div>

            {/* Location Card - Mobile */}
            <div
              className="md:hidden absolute bottom-6 left-4 right-4 w-auto bg-white/95 backdrop-blur-sm border border-blueSoft/30 rounded-2xl p-5 shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-blue-400/50 transition-all duration-300 z-20"
              data-aos="zoom-in"
              data-aos-delay="150"
              data-aos-duration="700"
            >
              <h4 className="font-sans text-lg text-navy font-bold mb-3">
                <b>Gedung Bumdes Salebu</b>
              </h4>
              <p className="text-gray-700 text-xs sm:text-sm mb-4 leading-relaxed font-medium">
                <i className="ph-bold ph-map-pin text-blueSoft mr-1 text-sm"></i>
                Salebu, Kec. Mangunreja, Kab. Tasikmalaya
              </p>
              <a
                href="https://maps.app.goo.gl/9E7wXC2dEybcpE6aA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white text-sm font-bold px-4 py-2 rounded-lg hover:from-blue-600 hover:to-sky-600 transition-all shadow-[0_8px_20px_rgba(74,143,199,0.3)] hover:scale-105 active:scale-95"
              >
                <i className="ph-bold ph-map-pin text-base"></i> Buka Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
