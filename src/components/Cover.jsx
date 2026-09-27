import { useEffect, useMemo, useState } from "react";
import { useLeaves } from "../hooks/useLeaves";

const BASE_URL = import.meta.env.BASE_URL;

export default function Cover({
  audioRef,
  setIsPlaying,
  onOpened,
  isOpen,
  isExiting,
  onOpenClick,
}) {
  const coverLeavesRef = useLeaves(window.innerWidth > 768 ? 16 : 9);

  const guestName = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("to") || "Tamu Undangan";
  }, []);

  const [exitStart, setExitStart] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    onOpenClick();
    setExitStart(true);

    // aktifkan sound background otomatis (memakai gesture klik user)
    const audioPlayer = audioRef.current;
    if (audioPlayer) {
      audioPlayer
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    setTimeout(() => {
      onOpened();
      setTimeout(() => setHidden(true), 850);
    }, 120);
  };

  if (hidden) return null;

  return (
    <div
      id="cover-screen"
      className={`fixed inset-0 w-full h-full z-[9999] flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-blue-50 via-sky-50 to-blue-50 ${
        exitStart ? "cover-exit-start" : ""
      } ${isOpen ? "cover-exit" : ""}`}
    >
      {/* ELEGANT FLORAL BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${BASE_URL}img/bdg/9.webp)`,
        }}
      ></div>

      {/* DAUN BERJATUHAN DI COVER */}
      <div
        ref={coverLeavesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-[12]"
      ></div>

      {/* ORNAMENTAL CHERRY BLOSSOMS - TOP */}
      <div className="absolute top-0 left-0 w-full h-32 pointer-events-none z-10 opacity-40">
        <svg
          viewBox="0 0 1200 150"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <g fill="#4a8fc7" opacity="0.9">
            <circle cx="100" cy="80" r="8" />
            <circle cx="150" cy="50" r="6" />
            <circle cx="200" cy="100" r="7" />
            <circle cx="400" cy="40" r="8" />
            <circle cx="450" cy="90" r="6" />
            <circle cx="500" cy="60" r="7" />
            <circle cx="700" cy="70" r="8" />
            <circle cx="750" cy="30" r="6" />
            <circle cx="800" cy="100" r="7" />
            <circle cx="1000" cy="50" r="8" />
            <circle cx="1050" cy="90" r="6" />
            <circle cx="1100" cy="60" r="7" />
          </g>
        </svg>
      </div>

      {/* KONTEN COVER */}
      <div
        id="cover-content"
        className="relative z-20 text-center px-4 w-full max-w-md mx-auto flex flex-col items-center justify-center h-full py-4 my-auto"
      >
        <div className="w-full bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(74,143,199,0.25)] border border-blue-200/50">
          <p className="font-script text-xl md:text-2xl text-sky-600 mb-2">
            Wedding Invitation
          </p>
          <p className="text-xs md:text-sm font-serif text-sky-500 tracking-widest mb-4 font-bold">
            11 · 10 · 26
          </p>

          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-1 text-blue-900 drop-shadow-sm">
            Ihsan
          </h1>
          <span className="font-script text-3xl md:text-4xl text-sky-500 block mb-2">
            &
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-blue-900 drop-shadow-sm">
            Ai Liana
          </h1>

          <p className="text-sm md:text-base font-serif text-blue-800 font-semibold mb-4">
            Minggu, 11 Oktober 2026
          </p>

          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto mb-6"></div>

          <p className="text-[10px] md:text-xs text-sky-600 font-body font-medium mb-2">
            Kepada Yth.
          </p>
          <div className="inline-block mb-5 max-w-xs">
            <p className="font-serif text-base md:text-lg text-blue-900 font-bold">
              {guestName}
            </p>
          </div>
          <p className="text-xs md:text-sm text-sky-600 font-body mb-6">
            di tempat
          </p>

          <button
            type="button"
            onClick={handleOpen}
            className="group relative bg-gradient-to-r from-blue-500 to-sky-500 text-white font-bold text-sm md:text-base px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:from-blue-600 hover:to-sky-600 transition-all mx-auto shadow-[0_10px_25px_rgba(74,143,199,0.35)] hover:scale-105 active:scale-95 cursor-pointer z-50 border border-blue-300/50"
          >
            <span>Buka Undangan</span>
            <i className="ph-bold ph-arrow-down text-lg pointer-events-none"></i>
          </button>
        </div>
      </div>

      {/* ORNAMENTAL CHERRY BLOSSOMS - BOTTOM */}
      <div className="absolute bottom-0 right-0 w-40 md:w-56 h-40 md:h-56 pointer-events-none z-10 opacity-50">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#4a8fc7" opacity="0.7">
            <circle cx="180" cy="20" r="6" />
            <circle cx="150" cy="40" r="5" />
            <circle cx="170" cy="60" r="6" />
            <circle cx="190" cy="100" r="7" />
            <circle cx="160" cy="120" r="5" />
            <circle cx="175" cy="150" r="6" />
            <circle cx="140" cy="170" r="5" />
            <circle cx="160" cy="190" r="6" />
          </g>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-40 md:w-56 h-40 md:h-56 pointer-events-none z-10 opacity-40 transform scale-x-[-1]">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#4a8fc7" opacity="0.7">
            <circle cx="180" cy="20" r="6" />
            <circle cx="150" cy="40" r="5" />
            <circle cx="170" cy="60" r="6" />
            <circle cx="190" cy="100" r="7" />
            <circle cx="160" cy="120" r="5" />
            <circle cx="175" cy="150" r="6" />
            <circle cx="140" cy="170" r="5" />
            <circle cx="160" cy="190" r="6" />
          </g>
        </svg>
      </div>
    </div>
  );
}
