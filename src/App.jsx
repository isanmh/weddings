import { useEffect, useRef, useState } from "react";
import AOS from "aos";

import { LightboxProvider } from "./context/LightboxContext";
import Lightbox from "./components/Lightbox";
import Cover from "./components/Cover";
import HeroSoftBlue from "./components/HeroSoftBlue";
import QuoteSection from "./components/QuoteSection";
import CoupleProfile from "./components/CoupleProfile";
import EventSection from "./components/EventSection";
import GallerySection from "./components/GallerySection";
import VideoSection from "./components/VideoSection";
import GiftSection from "./components/GiftSection";
import RSVPSection from "./components/RSVPSection";
import ClosingSection from "./components/ClosingSection";
import FloatingNav from "./components/FloatingNav";
import AudioButton from "./components/AudioButton";
import { useLeaves } from "./hooks/useLeaves";

export default function App() {
  const [invitationOpen, setInvitationOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const leavesRef = useLeaves();

  // body class "locked" sebelum undangan dibuka, sama seperti versi HTML asli
  useEffect(() => {
    document.body.classList.add("locked", "relative");
  }, []);

  useEffect(() => {
    if (invitationOpen) {
      document.body.classList.remove("locked");
      document.body.classList.add("invitation-open");
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "auto";
      if (window.AOS) AOS.refresh();
    }
  }, [invitationOpen]);

  useEffect(() => {
    AOS.init({
      once: false,
      mirror: true,
      duration: 700,
      offset: 80,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <LightboxProvider>
      {/* audio background */}
      <audio ref={audioRef} src="/nadin.mp3" preload="auto" loop className="hidden"></audio>

      {/* daun berjatuhan di seluruh halaman */}
      <div ref={leavesRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0"></div>

      <Cover
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isOpen={invitationOpen}
        onOpenClick={() => {}}
        onOpened={() => setInvitationOpen(true)}
      />

      <main id="main-content" className="relative z-10 w-full bg-transparent pb-32">
        <HeroSoftBlue />
        <QuoteSection />
        <CoupleProfile />
        <EventSection />
        <GallerySection />
        <VideoSection />
        <GiftSection />
        <RSVPSection />
        <ClosingSection />

        <div className="py-10 pb-28 text-center text-xs text-gray-500 font-body">
          &copy; 2026 Ihsan & Ai Liana <i className="ph-fill ph-heart text-blue-400 mx-1"></i>
          <br />
          Made with <i className="ph-fill ph-heart text-red-500 mx-0.5"></i> by Ihsan
        </div>
      </main>

      <Lightbox />
      <FloatingNav />
      <AudioButton visible={invitationOpen} isPlaying={isPlaying} onToggle={toggleAudio} />
    </LightboxProvider>
  );
}
