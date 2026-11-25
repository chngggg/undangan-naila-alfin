/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Gambar di public/images dimuat dengan ?v=<hash> supaya cache otomatis
    // basi setiap kali file diganti. Tanpa ini Next.js menolak query string.
    // (search sengaja tidak diisi agar query apa pun diterima.)
    localPatterns: [{ pathname: "/images/**" }],
  },
};

export default nextConfig;
