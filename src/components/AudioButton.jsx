export default function AudioButton({ visible, isPlaying, onToggle }) {
  return (
    <button
      id="btn-audio"
      onClick={onToggle}
      className={`fixed top-6 right-6 w-12 h-12 rounded-full bg-navy/80 backdrop-blur-md text-goldLight border border-gold/30 shadow-[0_5px_15px_rgba(0,0,0,0.3)] z-[9000] flex items-center justify-center transition-transform hover:scale-110 ${
        visible ? "show" : "hidden"
      }`}
    >
      <i className={`ph-bold text-xl ${isPlaying ? "ph-music-notes animate-spin-slow" : "ph-speaker-slash"}`}></i>
    </button>
  );
}
