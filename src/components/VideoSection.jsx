export default function VideoSection() {
  return (
    <section
      id="video"
      className="py-20 px-6 relative z-10 bg-gradient-to-b from-blue-50 to-white rounded-3xl mx-6 shadow-[0_10px_40px_rgba(34,87,122,0.15)] border border-blue-100"
      data-aos="fade-up"
      data-aos-duration="700"
    >
      <div className="max-w-4xl mx-auto text-center fade-up">
        <i className="ph-light ph-play-circle text-5xl md:text-6xl text-blue-600 mb-4 drop-shadow-sm"></i>
        <h2 className="font-script text-5xl md:text-6xl text-navy mb-4 drop-shadow-sm">Momen Spesial Kami</h2>
        <p className="font-body text-sm md:text-base text-gray-600 mb-12 max-w-xl mx-auto">
          Saksikan momen-momen indah persiapan menuju hari istimewa kami.
        </p>

        <div className="relative w-full max-w-3xl mx-auto">
          <div className="relative bg-white rounded-3xl shadow-[0_15px_40px_rgba(34,87,122,0.2)] overflow-hidden border border-blue-100 video-wrapper">
            <iframe
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                minWidth: "100%",
                minHeight: "100%",
                width: "auto",
                height: "auto",
              }}
              src="https://youtube.com/embed/UKbV22Zm10c?si=Z6OIrSPLZz79L9wM&autoplay=1&mute=1&rel=0&loop=1&playlist=UKbV22Zm10c"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
