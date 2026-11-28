# Bahan mentah ornamen

Folder ini **tidak ikut ter-deploy** — Next.js hanya menyajikan isi `public/`.
Isinya bahan supaya revisi ornamen tidak perlu memotong ulang dari nol.

| File | Isi |
|---|---|
| `lembar-clipart-asli.png` | Lembar clipart dari customer (1536 × 1024, 4 baris) |
| `potong-ornamen.py` | Skrip pemotong: alpha dari jarak warna + hapus halo putih |
| `ornamen-cadangan/` | 17 PNG hasil potong yang belum dipakai |

## Memakai salah satu cadangan

1. Pindahkan file ke `public/images/ornaments/`:

   ```bash
   mv design-source/ornamen-cadangan/bloom-cream.png public/images/ornaments/
   ```

2. Daftarkan ukuran aslinya di `ASSETS` (`app/components/ui/PngOrnaments.js`):

   ```js
   "bloom-cream": { w: 187, h: 182 },
   ```

3. Pakai di komponen:

   ```jsx
   <Bloom name="bloom-cream" width="w-12" />
   ```

4. `npm run dev` — hash gambar dibuat ulang otomatis.

## Memotong ulang dari lembar asli

```bash
python3 design-source/potong-ornamen.py
```

Skrip ini menulis langsung ke `public/images/ornaments/`. Perhatikan:

- Butuh Pillow (`python3 -c "import PIL"`).
- Kotak potong tiap elemen ada di list `BOXES` — sesuaikan kalau lembarnya berganti.
- Latar lembarnya krem bertekstur, bukan transparan asli. Karena itu alpha dihitung
  dari **jarak warna terhadap warna kertas** (median piksel tepi), bukan flood fill —
  flood fill meninggalkan bintik putih dan halo yang baru terlihat setelah
  ditempel di latar maroon.
- Selalu cek hasilnya di **dua latar**: maroon `#4e1a1f` dan ivory `#fbf6ed`.
  Maroon memperlihatkan sisa putih; ivory memperlihatkan tepi kotak yang kasar.

## Isi `ornamen-cadangan/`

| File | Isi |
|---|---|
| `bloom-cream.png` | Bunga krem tunggal |
| `bloom-burgundy.png` | Bunga burgundy tunggal |
| `bloom-blush.png` | Bunga blush kecil |
| `bloom-rose.png` | Bunga rose tunggal |
| `bloom-single.png` | Bunga krem dengan daun |
| `sprig-gold.png` | Tangkai daun emas |
| `leaf-gold.png` | Ranting daun emas |
| `leaf-large.png` | Daun emas besar |
| `cluster-a.png`, `cluster-b.png` | Rumpun bunga kecil |
| `bud-arch-cream.png`, `bud-arch-pink.png` | Tangkai kuncup melengkung |
| `mosque.png` | Masjid + bunga (siluet) |
| `pavilion.png` | Rumah adat bertingkat (aksen Jambi) |
| `lantern.png` | Lentera gantung |
| `medallion.png` | Medali arabesque |
| `arch.png` | Lengkung ogee emas |
