// Membuat versi (hash) untuk setiap gambar di public/images (termasuk subfolder).
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

/* Telusuri folder secara rekursif; kunci = path relatif terhadap public/images,
   mis. "bride.png" atau "ornaments/floral-tall.png". */
function walk(dir, base = "") {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(abs, rel));
    else if (EXT.test(entry.name)) out.push({ rel, abs });
  }
  return out;
}

const files = walk(IMAGE_DIR).sort((a, b) => a.rel.localeCompare(b.rel));
const versions = {};

for (const { rel, abs } of files) {
  const buf = fs.readFileSync(abs);
  versions[rel] = crypto.createHash("md5").update(buf).digest("hex").slice(0, 10);
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(versions, null, 2) + "\n");

console.log(`[images] ${files.length} gambar, versi diperbarui:`);
for (const [name, hash] of Object.entries(versions)) {
  console.log(`  ${name} → ${hash}`);
}
