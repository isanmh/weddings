export default function HeroSoftBlue() {
  return (
    <section id="hero-soft-blue" className="pt-12 pb-8 px-6 flex flex-col items-center justify-center relative z-10">
      <div
        className="max-w-4xl w-full mx-auto text-center bg-gradient-to-b from-blue-50/80 via-blue-100/60 to-white/40 p-8 md:p-12 rounded-3xl shadow-[0_15px_40px_rgba(34,87,122,0.06)] border border-blue-100"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <p className="font-arabic text-2xl md:text-3xl text-blueZ mb-3 leading-loose" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>
        <p className="font-body text-xs md:text-sm uppercase tracking-widest text-blueZ/70 mb-2">WALIMATUL ‘URSY</p>
        <h2 className="font-script text-5xl md:text-6xl text-blueZ leading-tight mb-2">Ihsan & Ai Liana</h2>
        <p className="font-body text-sm md:text-base text-blueZ/80 max-w-2xl mx-auto leading-relaxed mb-6">
          Dengan memohon rahmat dan rida Allah Subhanahu wa Ta'ala, kami bermaksud menyelenggarakan pernikahan dan
          mengundang Bapak/Ibu/Saudara/i untuk hadir serta memberikan doa terbaik.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4 w-full">
          <div className="text-center px-4 py-2 rounded-lg border border-blue-100 bg-white/60 w-full sm:w-auto">
            <p className="text-xs text-blueZ">Minggu</p>
            <p className="font-serif text-2xl text-blueZ font-bold">11</p>
            <p className="text-xs text-blueZ">Oktober 2026</p>
          </div>

          <a
            href="#event"
            aria-label="Lihat Detail Acara"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-sky-500 text-white font-bold px-6 py-3 rounded-full hover:from-blue-600 hover:to-sky-600 transition-all shadow-[0_10px_25px_rgba(74,143,199,0.35)] hover:scale-105 active:scale-95 cursor-pointer z-50 border border-blue-300/50"
          >
            <i className="ph-fill ph-calendar-check text-lg"></i>
            <span>Lihat Detail Acara</span>
          </a>
        </div>
      </div>
    </section>
  );
}
