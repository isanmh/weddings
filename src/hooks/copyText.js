import Swal from "sweetalert2";

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    Swal.fire({ icon: "success", title: "Berhasil!", text: "Tersalin: " + text, timer: 2000, showConfirmButton: false });
  } catch (e) {
    Swal.fire({ icon: "info", title: "Salin Manual", text: "Silakan salin manual: " + text, confirmButtonText: "Oke" });
  }
  document.body.removeChild(ta);
}

export function copyText(text) {
  const value = (text || "").trim();
  if (!value) {
    Swal.fire({ icon: "warning", title: "Kosong", text: "Tidak ada teks untuk disalin." });
    return;
  }

  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        Swal.fire({ icon: "success", title: "Berhasil!", text: "Tersalin: " + value, timer: 2000, showConfirmButton: false });
      })
      .catch(() => fallbackCopy(value));
  } else {
    fallbackCopy(value);
  }
}
