const navItems = [
  { href: "#cover-screen", icon: "ph-fill ph-house", scrollTop: true },
  { href: "#profile", icon: "ph-fill ph-users" },
  { href: "#event", icon: "ph-fill ph-calendar-heart" },
  { href: "#gallery", icon: "ph-fill ph-image" },
  { href: "#gift", icon: "ph-fill ph-gift" },
];

export default function FloatingNav() {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-navy/85 backdrop-blur-xl rounded-full px-6 py-3 z-[9000] flex justify-between items-center shadow-[0_10px_40px_rgba(34,87,122,0.5)] border border-blueSoft/30 transition-transform duration-300">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => {
            if (item.scrollTop) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex flex-col items-center text-gray-300 hover:text-goldLight transition w-10 hover:-translate-y-1"
        >
          <i className={`${item.icon} text-xl`}></i>
        </a>
      ))}
    </nav>
  );
}
