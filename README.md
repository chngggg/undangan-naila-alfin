# Undangan Pernikahan — Naila & Alfin

Undangan pernikahan digital (Next.js 16 + Tailwind CSS 4 + Framer Motion).
Mobile-first: dirancang untuk dibuka dari HP, di desktop tampil sebagai satu kolom di tengah.

Tanggal: **Sabtu, 26 Desember 2026** · Pondok Majapahit 1, Bandungrejo, Mranggen, Demak.
Live: <https://undangan-naila-alfin.vercel.app>

---

## 1. Menjalankan

```bash
cd ~/Project/undangan-naila-alfin
npm install        # sekali saja
npm run dev        # http://localhost:3000
```

Buka di HP lewat jaringan lokal: `http://<IP-komputer>:3000/?to=Nama%20Tamu`

Build produksi:

```bash
npm run build && npm start
```

Perintah lain:

| Perintah | Fungsi |
|---|---|
| `npm run lint` | cek aturan ESLint |
| `npm run guests` | buat `guest-links.csv` dari `guests.txt` |

---

## 2. Struktur file

```
app/
├─ layout.js              # font (Cormorant, Playfair, Great Vibes, Montserrat, Amiri) + metadata
├─ globals.css            # warna, motif batik, animasi ornamen
├─ page.js                # pintu masuk → <MainContent />
├─ data/
│  ├─ wedding.js          # ★ SEMUA DATA & TEKS UNDANGAN DI SINI
│  └─ image-versions.json # hash gambar (dibuat otomatis, jangan diedit)
├─ lib/
│  ├─ supabase.js         # klien Supabase + isDbReady
│  ├─ guestbook.js        # kirim/baca RSVP & buku tamu
│  ├─ images.js           # img("nama.png") → tambah ?v=<hash>
│  └─ useGuestName.js     # baca ?to= dari URL
├─ admin/[key]/
│  ├─ page.js             # /admin/<kata-sandi>
│  └─ AdminDashboard.js   # rekap RSVP + unduh CSV
└─ components/
   ├─ MainContent.js      # ★ perakit semua halaman
   ├─ Cover.js            # halaman 1 — cover (Bismillah + nama + tombol buka)
   ├─ Opening.js          # halaman 2 — salam & kalimat pembuka
   ├─ CoupleProfile.js    # halaman 3 — profil kedua mempelai
   ├─ EventDetails.js     # halaman 4 — QS. Ar-Rum 21, tanggal, akad, resepsi, peta
   ├─ Countdown.js        # halaman 5 — hitung mundur
   ├─ RSVP.js             # halaman 6 — konfirmasi kehadiran
   ├─ Wishes.js           # halaman 7 — buku tamu digital
   ├─ Gift.js             # halaman 8 — tanda kasih (rekening)
   ├─ Closing.js          # halaman 9 — doa penutup
   ├─ MusicPlayer.js      # tombol musik latar
   ├─ NavBar.js           # navigasi bawah
   └─ ui/
      ├─ Ornaments.js     # ornamen garis SVG (arch, pembatas, motif batik)
      ├─ PngOrnaments.js  # ornamen bunga PNG + animasi
      └─ Reveal.js        # animasi masuk + judul bagian
public/
├─ images/                # couple.png, bride.png, groom.png
│  └─ ornaments/          # 13 file bunga PNG yang dipakai
└─ audio/ini-abadi.mp3    # musik latar
scripts/
├─ gen-image-versions.mjs # hash gambar → image-versions.json
└─ gen-guest-links.mjs    # guests.txt → guest-links.csv
supabase/schema.sql       # tabel, hak akses, fungsi admin_rsvp
design-source/            # arsip: lembar clipart asli + skrip potong + ornamen cadangan
guests.txt                # daftar nama tamu (input)
guest-links.csv           # hasil npm run guests
panduan-bagikan-undangan.md  # kata-kata & tata cara menyebar undangan
```

Setiap halaman adalah komponen terpisah. `MainContent.js` hanya menyusun urutannya:

```js
const PAGES = [
  { id: "pembuka", Component: Opening },
  { id: "mempelai", Component: CoupleProfile },
  ...
];
```

---

## 3. Mengubah data undangan

Semua teks ada di `app/data/wedding.js` — tidak perlu menyentuh komponen.

| Bagian | Field |
|---|---|
| Nama & orang tua | `bride`, `groom` |
| Tanggal & jam | `event.isoDate`, `event.akad`, `event.resepsi` |
| Lokasi & peta | `event.venue`, `event.address`, `event.mapsUrl`, `event.mapsEmbed` |
| Ayat & doa | `quote`, `opening`, `intention`, `doa`, `closingVerse` |
| Rekening hadiah | `gifts` |
| Musik | `music` |

Catatan:

- `event.isoDate` dipakai countdown. Format: `2026-12-26T08:00:00+07:00`.
- `event.mapsUrl` = link Google Maps yang dibuka tombol
  (`https://maps.app.goo.gl/NX8CH4v9frRY1EQa7`).
- `event.mapsEmbed` = koordinat `-7.020358,110.508686` untuk peta yang ditanam;
  ganti dengan koordinat lokasi bila titiknya berubah.
- `intention` memakai spasi tak-terputus (`\u00A0`) pada tanggal supaya
  `26 Desember 2026` tidak terpotong ke baris berikutnya.

---

## 4. Gambar & musik

### Ilustrasi mempelai

File gambar di `public/images/`, ketiganya berlatar transparan (PNG alpha) jadi
menempel bersih di atas cream tanpa kotak putih.

| File | Dipakai di |
|---|---|
| `couple.png` | Halaman **Pembuka** — kedua mempelai berdampingan (full body) |
| `bride.png` | Kartu mempelai wanita (potret dalam lengkung) |
| `groom.png` | Kartu mempelai pria (potret dalam lengkung) |

**Cara mengganti:** timpa file dengan nama yang sama, lalu restart server.

Kenapa harus restart? Next.js menyimpan hasil optimasi gambar di
`.next/cache/images` dengan kunci **URL**, bukan isi file. Supaya tidak nyangkut,
setiap `npm run dev` dan `npm run build` menjalankan `scripts/gen-image-versions.mjs`
yang menghitung hash isi tiap gambar ke `app/data/image-versions.json`. Komponen
memuat gambar lewat `img("bride.png")` sehingga URL menjadi
`/images/bride.png?v=<hash>` — begitu isi file berubah, URL ikut berubah dan cache
otomatis basi.

Ukuran yang disarankan: kartu mempelai menampilkan potret selebar **212 px**
(≈424 px di layar retina), jadi file idealnya **minimal 500 px lebar**.

| File | Ukuran ideal | Ukuran sekarang |
|---|---|---|
| `bride.png` | ≥ 500 × 800 px | 182 × 292 px |
| `groom.png` | ≥ 500 × 800 px | 138 × 241 px |
| `couple.png` | ≥ 700 × 700 px | 500 × 500 px |

Kalau gambar baru berlatar putih, hapus latarnya dulu:

```bash
ffmpeg -i baru.jpg -vf "colorkey=0xFFFFFF:0.16:0.02" -frames:v 1 public/images/bride.png
```

### Musik

`public/audio/ini-abadi.mp3` — Perunggu, *Ini Abadi* (instrumental), 112 kbps,
3,2 MB. Path-nya diatur di `wedding.js` (`export const music`).

Musik diputar setelah tamu menekan **Buka Undangan** (itu gesture yang dibutuhkan
browser untuk mengizinkan audio), dengan fade-in 2,6 detik agar tidak menyembur
mendadak. Tombol di kanan atas untuk menjeda.

Untuk mengganti lagu: taruh file baru di `public/audio/`, lalu ubah `music` di
`wedding.js`. Nama file sebaiknya tanpa spasi dan tanda kurung.

---

## 5. Tema, ornamen & animasi

### Palet

| Peran | Nilai |
|---|---|
| Kertas / latar | `ivory #fbf6ed`, `cream #f7efe3` |
| Tinta & aksen utama | `mahogany #6d2b31`, `maroon-deep #4e1a1f` |
| Emas | `champagne #c6a15f` |
| Lembut | `dusty #9a5f5c`, `blush #b77f7c`, `sepia #c2a58e` |

Ubah di `app/globals.css` bagian `@theme`. Semua komponen membaca token ini, jadi
satu perubahan berlaku menyeluruh.

Font: nama mempelai **Cormorant Garamond**, judul **Playfair Display**, dekoratif
**Great Vibes**, detail acara **Montserrat**, Arab **Amiri**.

### Ornamen bunga (PNG)

File di `public/images/ornaments/`, dipakai lewat `app/components/ui/PngOrnaments.js`.
Semua dipotong dari lembar clipart customer; latar dibuat transparan.

| File | Isi |
|---|---|
| `bloom-bouquet-a.png` … `-d.png` | Empat buket besar (sudut halaman / cover) |
| `bloom-spray-a.png` … `-d.png` | Empat semprot mendatar (kaki halaman) |
| `bloom-maroon.png` | Bunga burgundy tunggal |
| `berry-pink.png`, `berry-cream.png`, `berry-red.png` | Tangkai buah beri (menggantung) |
| `cluster-c.png` | Rumpun kecil pengisi sudut |

Komponen siap pakai:

```jsx
import { CornerFloral, WideFloral, Bloom, BerrySprig, Cluster } from "./ui/PngOrnaments";

<CornerFloral side="left" variant="a" height="h-44" delay={0.2} anim="sway" />
<WideFloral side="right" variant="c" width="w-40" anim="drift" />
<Bloom name="bloom-maroon" width="w-12" anim="float" />
<BerrySprig name="berry-pink" height="h-16" anim="flutter" />
<Cluster name="cluster-c" width="w-14" anim="float" />
```

Properti `Ornament` (komponen dasar):

| Prop | Nilai | Keterangan |
|---|---|---|
| `name` | nama file tanpa `.png` | wajib, harus terdaftar di `ASSETS` |
| `anim` | `none` `sway` `float` `drift` `breathe` `flutter` | jenis gerakan |
| `delay` | detik | biar tidak serempak |
| `sizes` | mis. `"200px"` | petunjuk ukuran untuk `next/image` |
| `blend` | `true` / `false` | pakai filter `.png-orn` |

> **Satu ukuran, satu tempat.** Jangan menambahkan `h-auto w-auto` di kelas dasar
> komponen — kalau ada `h-48` dari pemanggil, dua utility itu bertabrakan dan
> pemenangnya tergantung urutan CSS. Ukuran hanya ditentukan di pemanggil.

### Animasi ornamen

Pola dua lapis di `globals.css`:

1. `ornBloom` — muncul halus (naik + membesar) saat halaman dibuka
2. lalu gerakan berulang: `ornSway` / `ornFloat` / `ornDrift` / `ornBreathe` /
   `ornFlutter` (khusus tangkai beri, poros putarnya di ujung atas)

`ornBloom` **hanya** menganimasikan `transform`, tidak `opacity` — kalau opacity
ikut dianimasikan dengan `fill-mode: both`, nilai akhirnya mengunci dan semua
kelas `opacity-*` diabaikan.

`prefers-reduced-motion` **tidak** mematikan animasi — hanya diperlambat, supaya
undangan tetap terasa hidup di HP yang mengaktifkan "kurangi gerakan".

### Ornamen garis (SVG)

Garis arsitektural yang harus ikut warna teks, di `app/components/ui/Ornaments.js`:

| Komponen | Bentuk |
|---|---|
| `OgeeArch` | Lengkung ogee/Moorish berujung runcing (cover) |
| `GoldDivider` | Pembatas emas dengan permata |
| `KawungBand` | Pita motif kawung (Jawa) |
| `TampukManggis` | Motif tampuk manggis (Jambi) |
| `AngsoDuo` | Motif angso duo (Jambi) |
| `Divider` | Garis pemisah tipis |
| `LaceCorner` | Sudut renda tipis |
| `MosqueSkyline` | Siluet masjid untuk kaki halaman gelap |
| `SectionDecor` | Latar seragam untuk semua halaman |

#### `SectionDecor` — latar seragam tiap halaman

```jsx
<SectionDecor floral="left" />                              // halaman terang
<SectionDecor floral="none" tone="dark" frame={false} />     // halaman maroon
```

Yang ditambahkan: vignette hangat (terang) atau pendar champagne (gelap), satu
semprot bunga PNG di sudut, dan bingkai garis rambut.

| Prop | Nilai | Efek |
|---|---|---|
| `floral` | `"left"` / `"right"` / `"none"` | sisi penempatan bunga |
| `frame` | `true` / `false` | tampilkan bingkai garis |
| `tone` | `"light"` / `"dark"` | warna latar untuk halaman maroon |
| `variant` | `"a"` / `"b"` / `"c"` / `"d"` | pilihan semprot bunga |
| `floralSize` | kelas lebar, mis. `"w-36"` | ukuran semprot |

Pemakaian sekarang: `floral="right"` di Pembuka, `floral="left"` di Mempelai &
RSVP, `floral="none"` di Acara (agar peta tidak tertutup), dan
`floral="none" tone="dark"` di Penutup.

### Ornamen cadangan

`design-source/` menyimpan bahan mentah supaya revisi ornamen tidak perlu memotong
ulang dari nol. Folder ini **tidak ikut ter-deploy** (hanya `public/` yang
disajikan).

```
design-source/
├─ lembar-clipart-asli.png     # lembar asli dari customer
├─ potong-ornamen.py           # skrip pemotong (alpha + hapus halo putih)
└─ ornamen-cadangan/           # 17 PNG yang belum dipakai
```

Kalau mau memakai salah satu cadangan: pindahkan ke `public/images/ornaments/`,
daftarkan ukurannya di `ASSETS` (`PngOrnaments.js`), lalu pakai seperti biasa.

---

## 6. Menambah halaman baru

1. Buat file di `app/components/`, misal `Video.js`:

```js
"use client";
import { SectionTitle } from "./ui/Reveal";

export default function Video() {
  return (
    <section className="bg-ivory px-5 py-20">
      <SectionTitle kicker="Our Story" script="Video" title="Cerita Kami" />
      {/* isi halaman */}
    </section>
  );
}
```

2. Daftarkan di `MainContent.js`:

```js
import Video from "./Video";
...
const PAGES = [ ..., { id: "video", Component: Video } ];
```

3. (Opsional) tambahkan tombol navigasi di `NavBar.js` → array `ITEMS`.

---

## 7. Link tamu

Nama tamu otomatis muncul di cover:

```
https://undangan-naila-alfin.vercel.app/?to=Bapak%20Yanto
```

Spasi boleh ditulis `%20` atau `+`. Nama yang mengandung `&` harus ditulis `%26`.

---

## 8. RSVP & buku tamu (database)

Data disimpan di **Supabase** (Postgres). Tanpa kunci Supabase, aplikasi otomatis
memakai `localStorage` sebagai mode demo — berguna untuk mencoba tampilan, tetapi
data hanya terlihat di HP pengunjung itu sendiri.

### 8.1 Menyiapkan Supabase

1. Daftar di [supabase.com](https://supabase.com) → **New project**
2. Buka **SQL Editor → New query**, tempel isi `supabase/schema.sql`
   - ganti `'ganti-sandi-ini'` dengan kata sandi admin pilihanmu
   - klik **Run**
3. Buka **Project Settings → API**, salin dua nilai:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> `anon key` aman dipakai di browser. Proyek ini **tidak** memakai
> `service_role key` sama sekali.

### 8.2 Memasang kunci

Lokal — buat `.env.local`:

```bash
cp .env.local.example .env.local
# lalu isi dua nilai tadi
```

Produksi — Vercel → project → **Settings → Environment Variables**, tambahkan dua
variabel yang sama, lalu **Redeploy**.

### 8.3 Halaman admin

```
https://undangan-naila-alfin.vercel.app/admin/<kata-sandi>
```

Isinya: statistik (total respon, hadir, tidak hadir, masih ragu, total jiwa),
pencarian nama, filter, dan tombol **Unduh Excel** (CSV yang bisa dibuka Excel
atau Google Sheets).

Kata sandi dicek **di dalam database** lewat fungsi `admin_rsvp(pass text)`.
Artinya `anon key` yang ada di browser tidak bisa dipakai membaca data RSVP tanpa
tahu sandinya. Halaman ini juga ditandai `noindex` agar tidak muncul di Google.

### 8.4 Struktur tabel

| Tabel | Kolom |
|---|---|
| `rsvp` | `id`, `name`, `attend` (`hadir`/`ragu`/`tidak`), `guests`, `guest_slug`, `created_at` |
| `wishes` | `id`, `name`, `message`, `guest_slug`, `created_at` |

`guest_slug` menyimpan nama tamu dari link `?to=` — berguna untuk mencocokkan
respon dengan daftar undangan yang kamu kirim.

Tabel `rsvp` sengaja **hanya boleh INSERT** (tanpa SELECT) supaya data tamu tidak
bisa dibaca siapa pun lewat `anon key`. Jangan mengubah `Prefer: return=minimal`
pada insert RSVP — memakai `return=representation` akan gagal dengan error `42501`.

### 8.5 Membuat link per tamu

1. Tulis nama tamu di `guests.txt`, satu per baris
2. Jalankan:

```bash
npm run guests
# atau dengan domain sendiri:
npm run guests -- https://nailaalfin.my.id
```

3. Hasilnya `guest-links.csv` — kolom **Nama Tamu** dan **Link Undangan**,
   siap ditempel ke WhatsApp.

### 8.6 Catatan Supabase gratis

Project gratis Supabase **tidur setelah 7 hari tanpa aktivitas**. Kalau tidur,
RSVP berhenti sampai kamu buka dashboard dan restore. Selama undangan aktif dan
ada yang membuka, ini biasanya tidak terjadi — tapi kalau mau aman, buka
dashboard Supabase seminggu sekali.

---

## 9. Deploy

Push ke GitHub → Vercel otomatis build dan deploy (repo:
`github.com/chngggg/undangan-naila-alfin`).

```bash
git add -A && git commit -m "..." && git push
```

Jangan lupa menambahkan dua environment variable Supabase di dashboard Vercel
sebelum deploy pertama.

---

## 10. Membagikan undangan

Kata-kata siap kirim dan tata cara penyebaran ada di
`panduan-bagikan-undangan.md`.
