# Undangan Pernikahan — Naila & Alfin

Undangan pernikahan digital (Next.js 16 + Tailwind CSS 4 + Framer Motion).
Mobile-first: dirancang untuk dibuka dari HP, di desktop tampil sebagai satu kolom di tengah.

Tanggal: **Sabtu, 26 Desember 2026** · Pondok Majapahit 1, Bandungrejo, Mranggen, Demak.

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

---

## 2. Struktur file

```
app/
├─ layout.js              # font (Cormorant, Playfair, Great Vibes, Montserrat, Amiri) + metadata
├─ globals.css            # warna, motif batik, animasi
├─ page.js                # pintu masuk → <MainContent />
├─ data/wedding.js        # ★ SEMUA DATA & TEKS UNDANGAN DI SINI
├─ lib/guestbook.js       # penyimpanan RSVP + buku tamu (localStorage)
└─ components/
   ├─ MainContent.js      # ★ perakit semua halaman
   ├─ Cover.js            # halaman 1 — cover (Bismillah + ilustrasi pasangan)
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
      ├─ Ornaments.js     # ★ ornamen maroon-cream (bunga, lentera, masjid, lengkung, sulur)
      └─ Reveal.js        # animasi masuk + judul bagian
public/
├─ images/               # couple.png, bride.png, groom.png (ilustrasi mempelai)
└─ audio/music.mp3       # musik instrumental
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
- `event.mapsUrl` = link Google Maps yang dibuka tombol (sekarang
  `https://maps.app.goo.gl/NX8CH4v9frRY1EQa7`).
- `event.mapsEmbed` = koordinat `-7.020358,110.508686` untuk peta yang
  ditanam; ganti dengan koordinat lokasi bila titiknya berubah.
- `gifts` masih contoh — ganti nomor rekening/e-wallet asli sebelum dibagikan.

---

## 4. Ilustrasi mempelai, tema & musik

Ilustrasi mempelai sekarang memakai **file gambar** (bukan lagi digambar manual
dengan SVG), di `public/images/`:

| File | Dipakai di |
|---|---|
| `couple.png` | Halaman **Pembuka** — kedua mempelai berdampingan (full body) |
| `bride.png` | Kartu mempelai wanita (potret dalam lengkung) |
| `groom.png` | Kartu mempelai pria (potret dalam lengkung) |

Ketiganya **latar transparan** (PNG alpha), jadi menempel bersih di atas cream
tanpa kotak putih.

### Cara mengganti gambar

1. Timpa file di `public/images/` dengan nama yang sama.
2. **Restart server** (`Ctrl+C`, lalu `npm run dev` lagi).

Itu saja — versi cache ditangani otomatis (lihat di bawah).

**Kenapa harus restart?** Next.js menyimpan hasil optimasi gambar di
`.next/cache/images` dengan kunci **URL**, bukan isi file. Kalau kamu menimpa
`bride.png` tapi URL-nya tetap `/images/bride.png`, Next akan terus menyajikan
versi lama dari cache — inilah kenapa gambar barumu tidak muncul.

Supaya tidak kejadian lagi, setiap `npm run dev` dan `npm run build` menjalankan
`scripts/gen-image-versions.mjs` yang menghitung hash isi tiap gambar dan
menuliskannya ke `app/data/image-versions.json`. Komponen memuat gambar lewat
`img("bride.png")` (dari `app/lib/images.js`), sehingga URL menjadi
`/images/bride.png?v=<hash>`. Begitu isi file berubah, hash berubah, URL berubah,
cache otomatis basi.

### Ukuran gambar yang disarankan

Kartu mempelai menampilkan potret selebar **212 px** (≈424 px di layar retina),
jadi file idealnya **minimal 500 px lebar**. Kalau lebih kecil, gambarnya akan
terlihat agak lembut/blur karena dipaksa membesar.

| File | Ukuran ideal | Ukuran sekarang |
|---|---|---|
| `bride.png` | ≥ 500 × 800 px | 182 × 292 px |
| `groom.png` | ≥ 500 × 800 px | 138 × 241 px |
| `couple.png` | ≥ 700 × 700 px | 500 × 500 px |

Kalau gambarnya berlatar putih (bukan transparan), hapus latarnya dulu:

```bash
ffmpeg -i baru.jpg -vf "colorkey=0xFFFFFF:0.16:0.02" -frames:v 1 public/images/bride.png
```

### Tema maroon–cream

Palet mengikuti referensi kolase:

| Peran | Nilai |
|---|---|
| Kertas / latar | `ivory #fbf6ed`, `cream #f7efe3` |
| Tinta & aksen utama | `mahogany #6d2b31` (wine), `maroon-deep #4e1a1f` |
| Emas | `champagne #c6a15f` |
| Lembut | `dusty #9a5f5c`, `blush #b77f7c`, `sepia #c2a58e` |

Ubah di `app/globals.css` bagian `@theme`. Semua komponen membaca token ini, jadi
satu perubahan berlaku menyeluruh.

### Ornamen PNG (bunga, masjid, rumah adat)

File gambar ada di `public/images/ornaments/`, dipakai lewat
`app/components/ui/PngOrnaments.js`:

| File | Isi |
|---|---|
| `floral-tall.png` | Bunga tinggi (sudut halaman) |
| `floral-wide-a.png` / `floral-wide-b.png` | Semprot bunga mendatar |
| `mosque.png` | Masjid + bunga (siluet kaki halaman) |
| `pavilion.png` | Rumah adat bertingkat (aksen Jambi) |
| `lantern.png` | Lentera gantung |
| `medallion.png` | Medali arabesque (pengganti pembatas) |
| `arch.png` | Lengkung ogee emas |

Komponen siap pakai:

```jsx
import { CornerFloral, WideFloral, MosqueArt, PavilionArt, MedallionArt, LanternArt } from "./ui/PngOrnaments";

<CornerFloral side="left" height="h-52" delay={0.2} anim="sway" />
<WideFloral side="right" variant="a" width="w-40" anim="drift" />
<MosqueArt width="w-56" anim="breathe" />
<PavilionArt width="w-24" anim="breathe" />
<MedallionArt width="w-12" anim="float" />
<LanternArt height="h-20" anim="sway" />
```

Properti `Ornament` (komponen dasar):

| Prop | Nilai | Keterangan |
|---|---|---|
| `name` | nama file tanpa `.png` | wajib |
| `anim` | `none` `sway` `float` `drift` `breathe` | jenis gerakan |
| `delay` | detik | biar tidak serempak |
| `sizes` | mis. `"200px"` | petunjuk ukuran untuk `next/image` |
| `blend` | `true` / `false` | pakai filter `.png-orn` |

#### Animasi ornamen

Semua ornamen memakai pola dua lapis di `globals.css`:

1. `ornBloom` — muncul halus (fade + naik + membesar sedikit) saat halaman dibuka
2. lalu salah satu gerakan berulang: `ornSway`, `ornFloat`, `ornDrift`, `ornBreathe`

`prefers-reduced-motion` **tidak** mematikan animasi — hanya diperlambat
supaya undangan tetap terasa hidup di HP yang mengaktifkan "kurangi gerakan".

### Ornamen garis (SVG)

Untuk garis arsitektural yang harus ikut warna teks, masih ada set SVG di
`app/components/ui/Ornaments.js`:

| Komponen | Bentuk |
|---|---|
| `OgeeArch` | Lengkung ogee/Moorish berujung runcing, garis ganda (cover) |
| `ArabesqueCorner` | Panel lattice geometris padat untuk sudut atas cover |
| `Filigree` | Lengkung filigri untuk sudut bawah halaman |
| `SectionDecor` | **Satu komponen latar untuk semua halaman** (lihat di bawah) |
| `GoldDivider` | Pembatas emas dengan permata |
| `LaceCorner` | Sudut renda tipis |
| `BatikLeafFrame` | Sulur batik bergerak di tepi (kawung/parang + tampuk manggis) |

#### `SectionDecor` — latar seragam tiap halaman

Setiap section cukup memanggil satu baris:

```jsx
<SectionDecor floral="left" />
```

Yang otomatis ditambahkan: vignette hangat, semprot bunga PNG di satu sudut,
filigri di sudut berlawanan, bingkai garis rambut + renda di dua sudut atas.

Opsi:

| Prop | Nilai | Efek |
|---|---|---|
| `floral` | `"left"` / `"right"` / `"none"` | sisi penempatan bunga |
| `frame` | `true` / `false` | tampilkan bingkai garis |
| `tone` | `"light"` / `"dark"` | warna ornamen untuk latar gelap |
| `variant` | `"a"` / `"b"` | pilihan semprot bunga |

Contoh pemakaian: `floral="right"` di Pembuka, `floral="left"` di Mempelai &
RSVP, `floral="none"` di Acara (agar peta tidak tertutup), dan
`floral="none" tone="dark" frame={false}` di Penutup (latar maroon).

Latar juga memakai `.pattern-lace` (lattice geometris Islam) dan `.gold-rule`
(garis emas) dari `globals.css`.

Musik: ganti `public/audio/music.mp3` (atau ubah path `music` di `wedding.js`).

---

## 5. Menambah halaman baru

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

## 6. Link tamu

Nama tamu otomatis muncul di cover:

```
https://domain-kalian.com/?to=Bapak%20Yanto
```

Spasi boleh ditulis `%20` atau `+`.

---

## 7. RSVP & buku tamu

Saat ini disimpan di `localStorage` browser (`app/lib/guestbook.js`) — cukup untuk demo,
tetapi **hanya terlihat di perangkat pengunjung itu sendiri**.

Untuk data yang benar-benar terkumpul, ganti 3 fungsi di `guestbook.js`
(`readGuestbook`, `addGuestbookEntry`, `GUESTBOOK_EVENT`) dengan panggilan API,
misalnya Supabase / Firebase / Google Sheets. Struktur data yang dipakai:

```js
{ id, createdAt, name, attend, guests, message, kind }
```

---

## 8. Deploy

Paling mudah lewat Vercel:

```bash
npx vercel        # atau push ke GitHub lalu import di vercel.com
```

Gratis untuk domain `*.vercel.app`; bisa juga dipasang domain sendiri.

---

## 9. Palet & font

| Peran | Nilai |
|---|---|
| Background | `ivory #fcf9f3`, `cream #f5ede2` |
| Teks & motif | `mahogany #4a2a26` |
| Aksen | `champagne #dfc7a9` |
| Bunga/aksen lembut | `nude #e7d6c7`, `dusty #997868` |

Nama mempelai: Cormorant Garamond · Judul: Playfair Display ·
Dekoratif: Great Vibes · Detail acara: Montserrat · Arab: Amiri.

Ubah di `app/globals.css` bagian `@theme`.
