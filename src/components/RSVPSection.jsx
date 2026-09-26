import { useState } from "react";
import { GAS_URL } from "../config";
import WishesList from "./WishesList";

const initialForm = { nama: "", kehadiran: "", jumlah_tamu: "0", ucapan: "" };

export default function RSVPSection() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: "", color: "" });
  const [reloadKey, setReloadKey] = useState(0);

  const jumlahTamuDisabled = !(form.kehadiran === "Hadir" || form.kehadiran === "Belum Pasti");

  const handleKehadiranChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      kehadiran: value,
      jumlah_tamu: value === "Hadir" || value === "Belum Pasti" ? prev.jumlah_tamu : "0",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!GAS_URL || GAS_URL.includes("MASUKKAN_URL")) {
      alert("URL Google Apps Script belum di-setting!");
      return;
    }

    setSubmitting(true);
    setStatusMsg({ text: "", color: "" });

    try {
      const response = await fetch(GAS_URL, {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "text/plain;charset=utf-8" },
      });
      const result = await response.json();

      if (result.status === "success") {
        setStatusMsg({ text: result.message || "Terima kasih! Ucapan berhasil dikirim.", color: "#2563eb" });
        setForm(initialForm);
        setReloadKey((k) => k + 1);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setStatusMsg({ text: error?.message || "Gagal mengirim pesan, coba lagi nanti.", color: "red" });
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatusMsg({ text: "", color: "" }), 5000);
    }
  };

  return (
    <section id="rsvp" className="py-20 px-6 relative z-10" data-aos="fade-up" data-aos-duration="700">
      <div className="max-w-2xl mx-auto fade-up">
        <div className="text-center mb-10">
          <h2 className="font-script text-5xl md:text-6xl text-navy mb-2">Buku Tamu</h2>
          <p className="text-gray-500 text-sm md:text-base font-body">Kirimkan doa dan konfirmasi kehadiran Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_15px_40px_rgba(74,143,199,0.12)] border border-blue-100 font-body">
          <div className="mb-5">
            <label className="block text-sm font-semibold text-navy mb-2" htmlFor="nama">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              required
              value={form.nama}
              onChange={(e) => setForm((p) => ({ ...p, nama: e.target.value }))}
              className="w-full px-4 py-3 bg-blue-50/30 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
              placeholder="Nama Anda"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-navy mb-2" htmlFor="kehadiran">
              Kehadiran
            </label>
            <select
              id="kehadiran"
              required
              value={form.kehadiran}
              onChange={handleKehadiranChange}
              className="w-full px-4 py-3 bg-blue-50/30 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Pilih konfirmasi kehadiran...
              </option>
              <option value="Hadir">Hadir</option>
              <option value="Belum Pasti">Masih Belum Pasti</option>
              <option value="Tidak Hadir">Tidak Hadir (Maaf)</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-navy mb-2" htmlFor="jumlah-tamu">
              Jumlah Tamu
            </label>
            <select
              id="jumlah-tamu"
              required
              disabled={jumlahTamuDisabled}
              value={form.jumlah_tamu}
              onChange={(e) => setForm((p) => ({ ...p, jumlah_tamu: e.target.value }))}
              className={`w-full px-4 py-3 bg-blue-50/30 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition appearance-none cursor-pointer ${
                jumlahTamuDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <option value="0" disabled>
                Pilih jumlah tamu...
              </option>
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
              <option value="3">3 Orang</option>
              <option value="4">4 Orang</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-navy mb-2" htmlFor="ucapan">
              Ucapan & Doa
            </label>
            <textarea
              id="ucapan"
              rows="4"
              required
              value={form.ucapan}
              onChange={(e) => setForm((p) => ({ ...p, ucapan: e.target.value }))}
              className="w-full px-4 py-3 bg-blue-50/30 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition resize-none"
              placeholder="Tulis doa terbaik Anda untuk kami..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-navy to-blue-800 text-white font-bold py-4 rounded-xl hover:from-blue-800 hover:to-navy transition-all shadow-[0_10px_20px_rgba(34,87,122,0.3)] flex justify-center items-center gap-2 hover:scale-[1.02] disabled:opacity-70"
          >
            {submitting ? (
              <>
                <i className="ph-bold ph-spinner animate-spin text-lg"></i> Mengirim...
              </>
            ) : (
              <>
                <i className="ph-bold ph-paper-plane-tilt text-lg"></i> Kirim Ucapan
              </>
            )}
          </button>
          {statusMsg.text && (
            <p className="mt-4 text-center text-sm font-semibold" style={{ color: statusMsg.color }}>
              {statusMsg.text}
            </p>
          )}
        </form>

        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_10px_30px_rgba(74,143,199,0.1)] border border-blue-100 p-6 font-body">
          <h3 className="font-serif font-bold text-navy text-xl border-b border-blue-100 pb-3 mb-4 flex items-center gap-2">
            <i className="ph-fill ph-chats-circle text-blue-600"></i> Ucapan Masuk
          </h3>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-500">Daftar ucapan pengunjung</div>
          </div>
          <WishesList reloadKey={reloadKey} />
        </div>
      </div>
    </section>
  );
}
