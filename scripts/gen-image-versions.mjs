// Membuat versi (hash) untuk setiap gambar di public/images.
// Dijalankan otomatis sebelum `npm run dev` dan `npm run build`.
//
// Kenapa perlu: Next.js menyimpan hasil optimasi gambar di .next/cache/images
// dengan kunci berdasarkan URL — bukan isi file. Kalau kamu menimpa
// public/images/bride.png dengan file baru, URL-nya tetap sama, jadi Next
// terus menyajikan versi lama dari cache. Dengan menambahkan ?v=<hash>,
// URL berubah setiap kali isi file berubah, sehingga cache otomatis basi.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const IMAGE_DIR = path.join(process.cwd(), "public", "images");
const OUT_FILE = path.join(process.cwd(), "app", "data", "image-versions.json");
const EXT = /\.(png|jpe?g|webp|avif)$/i;

if (!fs.existsSync(IMAGE_DIR)) {
  console.log("[images] public/images belum ada, dilewati.");
  process.exit(0);
}

const files = fs.readdirSync(IMAGE_DIR).filter((f) => EXT.test(f)).sort();
const versions = {};

for (const file of files) {
  const buf = fs.readFileSync(path.join(IMAGE_DIR, file));
  versions[file] = crypto.createHash("md5").update(buf).digest("hex").slice(0, 10);
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(versions, null, 2) + "\n");

console.log("[images] versi gambar diperbarui:");
for (const [name, hash] of Object.entries(versions)) {
  console.log(`  ${name} → ${hash}`);
}
