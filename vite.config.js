import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Untuk GitHub Pages di repo project (bukan repo "username.github.io"):
// isi base dengan "/nama-repo-kamu/". Kalau repo-nya "username.github.io"
// (situs akun), biarkan "/" saja.
export default defineConfig({
  base: "/weddings/",
  plugins: [react()],
  server: {
    port: 5173,
  },
});
