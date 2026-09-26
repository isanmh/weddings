// ===== Utilitas cache gambar galeri (localStorage) + retry otomatis =====
// Supaya thumbnail/foto tidak "hilang-hilangan" saat koneksi lambat/putus-putus:
// 1) Sekali berhasil dimuat, gambar disimpan sebagai data URL di localStorage
//    sehingga kunjungan/perpindahan berikutnya tidak perlu request ulang ke server.
// 2) Jika gambar gagal dimuat (event error), otomatis dicoba ulang beberapa kali
//    (lihat komponen <CachedImage />).
const GALLERY_CACHE_PREFIX = "galimg:";
const GALLERY_CACHE_MAX_BYTES = 450 * 1024; // ~450KB/gambar, jaga kuota localStorage

export function getCachedGalleryImage(src) {
  try {
    return localStorage.getItem(GALLERY_CACHE_PREFIX + src);
  } catch (e) {
    return null;
  }
}

function setCachedGalleryImage(src, dataUrl) {
  try {
    localStorage.setItem(GALLERY_CACHE_PREFIX + src, dataUrl);
  } catch (e) {
    // localStorage kemungkinan penuh, biarkan saja & lanjut pakai network seperti biasa
  }
}

export function fetchAndCacheGalleryImage(src) {
  if (getCachedGalleryImage(src)) return;
  fetch(src)
    .then((res) => (res.ok ? res.blob() : Promise.reject()))
    .then((blob) => {
      if (blob.size > GALLERY_CACHE_MAX_BYTES) return;
      const reader = new FileReader();
      reader.onload = () => setCachedGalleryImage(src, reader.result);
      reader.readAsDataURL(blob);
    })
    .catch(() => {
      /* gagal cache tidak masalah, gambar tetap tampil dari network */
    });
}

export function resolveImageSrc(src) {
  return getCachedGalleryImage(src) || src;
}
