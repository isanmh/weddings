# Undangan Pernikahan — Ihsan & Ai Liana 11.10.2026 (React + Vite)
Link Undangan : https://github.com/isanmh/weddings <br><br>
Hasil konversi dari file HTML satu-file ke project **React + Vite** yang terstruktur per komponen. <br><br>
Jika ingin melihat versi Html, CSS, JS bisa dilihat di : <br>
Github : <a href="https://github.com/isanmh/wedding" target="_blank">https://github.com/isanmh/wedding (Versi Native html,css,js)</a><br>
Hosting Pages : <a href="https://github.com/isanmh/wedding" target="_blank">https://github.com/isanmh/wedding (Versi Native html,css,js)</a>

## 1. Install dependency

```bash
npm install
```

## 2. Jalankan mode development

```bash
npm run dev
```

Buka `http://localhost:5173`.

## 3. WAJIB: tambahkan aset (gambar, audio, logo)

Project ini **tidak menyertakan file gambar/audio asli** (tidak ikut ter-upload). Salin semua aset ke folder `public/` dengan struktur yang sama seperti path yang dipakai di kode:

```
public/
  nadin.mp3
  img/
    ihsan.webp
    ai.webp
    bca.svg
    bdg/        (1.webp, 3.webp, 4.webp, ... 9.webp)
    lamaran/    (l03.webp, l1.webp, ... l7.webp)
    grt/        (1.webp, 2.webp, ... 18.webp)
```

Semua path gambar didaftarkan terpusat di `src/data/galleryData.js` — kalau nama file kamu beda, cukup edit file itu saja.

## 4. Konfigurasi RSVP (Google Apps Script)

Edit `src/config.js`, isi `GAS_URL` dengan URL Web App Google Apps Script kamu sendiri (yang menyimpan & mengembalikan data ucapan/RSVP).

## 5. Build untuk produksi

```bash
npm run build
```

Hasil build ada di folder `dist/`, tinggal di-upload ke hosting statis mana pun (Netlify, Vercel, GitHub Pages, cPanel, dll).

## 6. Deploy ke GitHub Pages

Bisa, karena `dist/` isinya HTML/CSS/JS statis murni. Dua hal yang perlu disiapkan:

1. **Base path** — di `vite.config.js`, ganti `base: "/nama-repo-kamu/"` sesuai nama repo GitHub kamu (contoh: kalau repo-nya `undangan-ihsan-ai-liana`, isi `"/undangan-ihsan-ai-liana/"`). Kalau repo kamu bernama `username.github.io` (situs akun, bukan project), biarkan `base: "/"`.
2. **Aktifkan GitHub Pages** di repo: Settings → Pages → Source pilih **GitHub Actions**.

Workflow otomatis sudah disiapkan di `.github/workflows/deploy.yml` — begitu kamu push ke branch `main`, GitHub Actions otomatis `npm install`, `npm run build`, lalu deploy folder `dist/` ke Pages. Tidak perlu build manual atau push folder `dist/` sendiri.

Setelah deploy pertama selesai (cek tab **Actions** di repo), situsnya tayang di:
```
https://<username>.github.io/<nama-repo>/
```

## Struktur folder penting

```
src/
  App.jsx                     -> merangkai semua section
  context/LightboxContext.jsx -> state global untuk modal foto (lightbox)
  hooks/
    useCountdown.js           -> hitung mundur ke tanggal acara
    useLeaves.js               -> animasi daun berjatuhan
    galleryImageCache.js      -> cache gambar via localStorage + retry
    copyText.js                -> util salin ke clipboard (rekening/alamat)
  components/
    Cover.jsx                 -> layar pembuka undangan
    HeroSoftBlue.jsx / QuoteSection.jsx
    CoupleProfile.jsx         -> profil kedua mempelai
    EventSection.jsx          -> countdown + detail acara + peta
    GallerySection.jsx        -> pembungkus galeri
      GalleryMasonry.jsx      -> "Kilas Balik Kebersamaan" (grid masonry)
      GalleryCarousel3D.jsx   -> "Momen Pilihan" (carousel 3D infinite)
    VideoSection.jsx
    GiftSection.jsx           -> amplop digital, kado, konfirmasi WA
    RSVPSection.jsx + WishesList.jsx -> form RSVP & buku tamu
    ClosingSection.jsx
    FloatingNav.jsx / AudioButton.jsx
    Lightbox.jsx / CachedImage.jsx
```

## Catatan konversi

- Semua logika vanilla JS asli (buka undangan, autoplay audio, AOS, countdown,
  carousel 3D infinite, cache galeri, RSVP, paginasi ucapan, disable "Jumlah
  Tamu") sudah dipindahkan menjadi React state/hooks — tidak ada lagi
  manipulasi DOM manual (`document.getElementById`, dst).
- Tailwind CSS di-setup lewat PostCSS (bukan CDN) supaya production build
  ter-optimasi (purge class yang tidak dipakai).
- Fitur pemutar YouTube API tersembunyi (untuk trik autoplay) di versi asli
  sengaja **tidak** dibawa karena redundan dengan `<audio>` background yang
  sudah ada — kalau tetap dibutuhkan, tinggal bilang, nanti saya tambahkan
  sebagai hook terpisah.
