import { useEffect, useState } from "react";
import { GAS_URL } from "../config";

const PAGE_SIZE = 10;

export default function WishesList({ reloadKey }) {
  const [status, setStatus] = useState("loading"); // loading | ready | empty | error | unconfigured
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!GAS_URL || GAS_URL.includes("MASUKKAN_URL")) {
      setStatus("unconfigured");
      return;
    }

    let cancelled = false;
    setStatus("loading");

    fetch(GAS_URL)
      .then((res) => res.json())
      .then((result) => {
        if (cancelled) return;
        if (result.status === "success" && Array.isArray(result.data)) {
          // urutkan descending berdasarkan waktu pengisian RSVP paling akhir
          const data = result.data.slice().sort((a, b) => {
            const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
            const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
            return timeB - timeA;
          });
          setMessages(data);
          setPage(1);
          setStatus(data.length ? "ready" : "empty");
        } else {
          setMessages([]);
          setStatus("empty");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  if (status === "unconfigured") {
    return <p className="text-center text-gray-400 text-sm italic py-4">Database ucapan belum terhubung.</p>;
  }
  if (status === "loading") {
    return <p className="text-center text-gray-400 text-sm py-4 animate-pulse">Memuat ucapan...</p>;
  }
  if (status === "error") {
    return <p className="text-center text-red-400 text-sm py-4">Gagal memuat daftar ucapan.</p>;
  }
  if (status === "empty") {
    return <p className="text-center text-gray-400 text-sm py-4">Belum ada ucapan.</p>;
  }

  const totalPages = Math.max(1, Math.ceil(messages.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const slice = messages.slice(start, start + PAGE_SIZE);

  return (
    <>
      <div className="max-h-[350px] overflow-y-auto pr-2 space-y-4">
        {slice.map((msg, i) => {
          const dateObj = msg.timestamp ? new Date(msg.timestamp) : new Date();
          const dateStr = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
          const isHadir = (msg.kehadiran || "").toLowerCase() === "hadir";
          const badgeColor = isHadir
            ? "bg-blue-100 text-blue-700 border-blue-200"
            : "bg-red-50 text-red-600 border-red-100";
          const jumlahTamuLabel = msg.jumlah_tamu || msg.jumlahTamu || "-";

          return (
            <div key={`${msg.nama}-${start + i}`} className="bg-blue-50/40 p-4 rounded-2xl border border-blue-100/50 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-serif font-bold text-navy text-[15px]">{msg.nama || "-"}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${badgeColor}`}>{msg.kehadiran || "-"}</span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full font-bold border bg-blue-50 text-blue-700 border-blue-200">
                    {jumlahTamuLabel}
                  </span>
                </div>
              </div>
              <p className="text-sm mb-3 leading-relaxed font-light text-gray-600">{msg.ucapan || ""}</p>
              <div className="flex items-center justify-start">
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <i className="ph-fill ph-clock"></i> {dateStr}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-sm mt-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className={`px-2 py-1 rounded bg-gray-100 ${currentPage <= 1 ? "opacity-50" : ""}`}
          >
            Prev
          </button>
          <div className="flex items-center gap-1 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-2 py-1 rounded ${p === currentPage ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className={`px-2 py-1 rounded bg-gray-100 ${currentPage >= totalPages ? "opacity-50" : ""}`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
