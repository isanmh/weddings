export default function ClosingSection() {
  return (
    <section
      className="py-24 px-6 text-center relative z-10 bg-gradient-to-b from-navy via-navy to-blue-900 text-white rounded-b-[3rem] shadow-[0_-10px_40px_rgba(34,87,122,0.4)] border-t border-blue-800/30"
      data-aos="fade-up"
      data-aos-duration="700"
    >
      <div className="max-w-2xl mx-auto fade-up">
        <p className="font-arabic text-xl md:text-2xl text-gold mb-4 leading-loose" dir="rtl">
          بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>
        <p className="text-xs md:text-sm text-gray-300 font-serif italic mb-2">
          "Semoga Allah memberkahimu, melimpahkan keberkahan atasmu, dan menghimpun kalian berdua dalam kebaikan."
        </p>
        <p className="text-[10px] md:text-xs text-blueSoft mb-8 tracking-wider">Sunan Abī Dāwud no. 2130</p>

        <div className="w-16 h-0.5 bg-gold/50 mx-auto mb-8"></div>

        <p className="font-body text-xs md:text-sm text-goldLight tracking-widest uppercase mb-3 font-semibold">
          Jazakumullahu khairan
        </p>
        <p className="font-body text-sm md:text-base text-blue-100 mb-10 leading-relaxed font-light">
          Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan
          doa restu.
        </p>

        <h2 className="font-script text-5xl md:text-6xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] mt-4">
          Ihsan & Ai Liana
        </h2>
        <p className="text-xs tracking-[0.3em] text-blueSoft font-serif mt-2">11 • 10 • 2026</p>
      </div>
    </section>
  );
}
