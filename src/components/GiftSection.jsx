import { LazyLoadImage } from "react-lazy-load-image-component";
import { copyText } from "../hooks/copyText";

function BankCard({ name, account, chipId, aos, delay }) {
  return (
    <div
      className="bank-card relative overflow-hidden rounded-[26px] p-5 md:p-6 shadow-[0_20px_45px_rgba(30,41,59,0.18)] border border-white/60 text-left transition-transform min-h-[210px] flex flex-col justify-between"
      style={{
        background:
          "linear-gradient(135deg, #f5f7f9 0%, #e6e9ed 45%, #f0f2f5 100%)",
      }}
      data-aos={aos}
      data-aos-delay={delay}
      data-aos-duration="700"
    >
      {/* dekorasi diagonal */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-gray-300/50 to-transparent rotate-45 rounded-3xl pointer-events-none"></div>
      <div
        className="absolute right-0 bottom-0 w-28 h-28 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(100, 116, 139, 0.35) 1px, transparent 1px)",
          backgroundSize: "7px 7px",
          WebkitMaskImage:
            "linear-gradient(to top left, black 20%, transparent 70%)",
          maskImage: "linear-gradient(to top left, black 20%, transparent 70%)",
        }}
      ></div>

      {/* baris atas: chip & logo bank */}
      <div className="relative z-10 flex items-start justify-between">
        <svg width="46" height="36" viewBox="0 0 48 38" fill="none">
          <defs>
            <linearGradient id={chipId} x1="0" y1="0" x2="48" y2="38">
              <stop stopColor="#f7e8b0" />
              <stop offset="0.5" stopColor="#d4af5a" />
              <stop offset="1" stopColor="#b8860b" />
            </linearGradient>
          </defs>
          <rect
            x="1"
            y="1"
            width="46"
            height="36"
            rx="8"
            fill={`url(#${chipId})`}
            stroke="#a97a1f"
            strokeWidth="1"
          />
          <line x1="16" y1="1" x2="16" y2="37" stroke="#a97a1f" />
          <line x1="32" y1="1" x2="32" y2="37" stroke="#a97a1f" />
          <line x1="1" y1="12" x2="47" y2="12" stroke="#a97a1f" />
          <line x1="1" y1="25" x2="47" y2="25" stroke="#a97a1f" />
          <path d="M16 12 Q24 19 32 12" stroke="#a97a1f" fill="none" />
          <path d="M16 25 Q24 18 32 25" stroke="#a97a1f" fill="none" />
        </svg>
        <div className="flex items-center gap-1.5">
          <LazyLoadImage
            src={`${import.meta.env.BASE_URL}img/bca.svg`}
            alt="Logo BCA"
            effect="opacity"
            threshold={200}
            className="w-20 h-20"
          />
        </div>
      </div>

      {/* baris bawah: nama, nomor rekening & tombol copy */}
      <div className="relative z-10 flex items-end justify-between gap-3 mt-8">
        <div className="min-w-0">
          <p className="font-bold text-gray-800 text-sm md:text-base mb-1 truncate">
            {name}
          </p>
          <p className="font-extrabold text-gray-900 text-lg md:text-2xl tracking-wide font-mono">
            {account}
          </p>
        </div>
        <button
          onClick={() => copyText(account)}
          className="flex-shrink-0 flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white text-xs md:text-sm font-semibold px-3.5 py-2.5 rounded-xl transition-all shadow-md"
          aria-label={`Salin nomor rekening ${name}`}
        >
          <i className="ph-bold ph-copy-simple text-base"></i> Copy
        </button>
      </div>
    </div>
  );
}

const ALAMAT_KADO =
  "Penerima: AI LIANA NURAENI\nJalan Bojong,Kp Bojong, RT.24/RW.3, Ds Salebu, Kec Mangunreja, Kab Tasikmalaya, Jawa Barat\nPatokan: MTs Al-Hidayah Salebu";

export default function GiftSection() {
  return (
    <section
      id="gift"
      className="py-20 px-6 relative z-10 text-center bg-white/50 backdrop-blur-sm border-y border-blue-100"
      data-aos="fade-up"
      data-aos-duration="700"
    >
      <div className="max-w-4xl mx-auto fade-up">
        <i className="ph-light ph-gift text-5xl md:text-6xl text-blue-600 mb-4 drop-shadow-sm"></i>
        <h2 className="font-script text-5xl text-navy mb-4">
          Amplop Digital & Kado
        </h2>
        <p className="font-body text-sm md:text-base text-gray-600 mb-10 max-w-xl mx-auto">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun,
          jika ingin memberikan tanda kasih, dapat melalui transfer atau
          mengirim kado fisik.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-10">
          <BankCard
            name="IHSAN MIFTAHUL HUDA"
            account="2832362752"
            chipId="chipGrad1"
            aos="fade-down-right"
            delay="150"
          />
          <BankCard
            name="AI LIANA NURAENI"
            account="1093162114"
            chipId="chipGrad2"
            aos="fade-down-left"
            delay="150"
          />

          <div
            className="gift-card p-6 rounded-2xl shadow-[0_15px_30px_rgba(74,143,199,0.15)] border border-blue-100 text-left transition-transform flex flex-col justify-between md:col-span-2"
            style={{ background: "white" }}
            data-aos="zoom-in"
            data-aos-delay="150"
            data-aos-duration="700"
          >
            <div>
              <h4 className="font-sans font-bold text-xl text-navy mb-1">
                Kirim Kado Fisik
              </h4>
              <p className="text-xs text-gray-500 mb-2 font-body">
                Alamat Penerima:
              </p>
              <p className="text-xs text-navy font-semibold mb-3 leading-relaxed whitespace-pre-line">
                {ALAMAT_KADO}
              </p>
            </div>
            <button
              onClick={() => copyText(ALAMAT_KADO)}
              className="w-full text-blue-700 hover:text-white hover:bg-blue-600 text-xs font-semibold flex items-center justify-center gap-1 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200 transition-all shadow-sm"
            >
              <i className="ph-bold ph-copy"></i> Salin Alamat
            </button>
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://wa.me/6282317214230?text=Halo%20kak!%20Aku%20udah%20kirim%20kado%2Famplop%20digital%20nih%20buat%20pernikahan%20Kak%20Ihsan%20dan%20Ai%20Liana%20%F0%9F%8E%89%20Semoga%20berkenan%20ya%2C%20makasih%20banyak!%20%F0%9F%99%8F%F0%9F%98%81"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold px-6 py-3 rounded-full hover:from-emerald-600 hover:to-blue-600 transition-all shadow-[0_10px_25px_rgba(16,185,129,0.35)] hover:scale-105 active:scale-95 cursor-pointer border border-emerald-300/50"
          >
            <i className="ph-bold ph-whatsapp-logo text-xl"></i>
            Konfirmasi Kado via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
