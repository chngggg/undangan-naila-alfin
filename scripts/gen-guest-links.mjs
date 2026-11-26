// Membuat link undangan per tamu dari daftar nama.
//
// Cara pakai:
//   1. Tulis nama tamu di file `guests.txt`, satu nama per baris
//   2. Jalankan:  npm run guests
//   3. Hasilnya: `guest-links.csv` (bisa dibuka di Excel / Google Sheets)
//
// Ganti alamat dasar lewat argumen atau env:
//   npm run guests -- https://nailaalfin.my.id
//   BASE_URL=https://nailaalfin.my.id npm run guests

import fs from "node:fs";
import path from "node:path";

const BASE =
  process.argv[2] ||
  process.env.BASE_URL ||
  "https://undangan-naila-alfin.vercel.app";

const IN = path.join(process.cwd(), "guests.txt");
const OUT = path.join(process.cwd(), "guest-links.csv");

if (!fs.existsSync(IN)) {
  console.error(
    "guests.txt belum ada.\nBuat file itu dulu, isinya satu nama tamu per baris."
  );
  process.exit(1);
}

const names = fs
  .readFileSync(IN, "utf8")
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter((s) => s.length > 0 && !s.startsWith("#"));

if (names.length === 0) {
  console.error("guests.txt kosong.");
  process.exit(1);
}

const base = BASE.replace(/\/+$/, "");

/* CSV dengan BOM agar Excel membaca UTF-8 dengan benar */
const rows = [
  ["Nama Tamu", "Link Undangan"],
  ...names.map((name) => [name, `${base}/?to=${encodeURIComponent(name)}`]),
];

const csv = rows
  .map((cols) => cols.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))
  .join("\r\n");

fs.writeFileSync(OUT, "\uFEFF" + csv, "utf8");

console.log(`[guests] ${names.length} link dibuat → ${OUT}`);
console.log(`[guests] contoh: ${base}/?to=${encodeURIComponent(names[0])}`);
