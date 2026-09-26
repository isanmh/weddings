export default function QuoteSection() {
  return (
    <section id="quote" className="pt-24 pb-12 px-6 flex flex-col items-center justify-center relative z-10">
      <div
        className="max-w-3xl mx-auto text-center fade-up bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-[0_15px_40px_rgba(74,143,199,0.15)] border border-blue-100"
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-anchor-placement="top-center"
      >
        <i className="ph-fill ph-book-open text-4xl text-blueZ mb-6 block drop-shadow-sm"></i>
        <p className="font-arabic text-2xl md:text-3xl text-navy mb-6 leading-loose" dir="rtl">
          وَمِنْ ءَايَٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم
          مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَءَايَٰتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
        </p>
        <p className="font-body text-sm md:text-base text-gray-600 italic leading-relaxed">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu
          sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan
          sayang."
        </p>
        <p className="mt-4 font-serif font-bold text-navy">(QS. Ar-Rum: 21)</p>
      </div>
    </section>
  );
}
