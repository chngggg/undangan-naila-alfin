# Panduan Membagikan Undangan — Naila & Alfin

Link undangan: **https://undangan-naila-alfin.vercel.app**

---

## 1. Template kata-kata WhatsApp

### A. Untuk keluarga & tetua (formal)

```
Assalamu'alaikum Warahmatullahi Wabarakatuh

Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
menyelenggarakan walimatul ursy putra-putri kami:

  Naila Lajja Zulfa Faza, S.Si
  putri Bapak Saiful Munir (Alm) & Ibu Anisah, S.Pd.I

  Alfin Ilhamy, S.Pd
  putra Bapak Muhammad Darmaji (Alm) & Ibu Jama'ah

yang Insya Allah dilaksanakan pada:

  Sabtu, 26 Desember 2026
  Akad Nikah  : 08.00 WIB
  Resepsi     : 10.00 – 12.00 WIB
  Pondok Majapahit 1
  RT.07/RW.04 Blok R5, Bandungrejo, Mranggen, Demak

Merupakan suatu kehormatan dan kebahagiaan bagi kami
apabila Bapak/Ibu/Saudara berkenan hadir dan memberikan
doa restu.

Detail undangan:
{LINK}

Terima kasih atas doa dan restunya.

Wassalamu'alaikum Warahmatullahi Wabarakatuh

Kami yang berbahagia,
Keluarga Bapak Saiful Munir & Keluarga Bapak Muhammad Darmaji
```

### B. Untuk teman & kerabat (hangat, tidak kaku)

```
Assalamu'alaikum semuaa 👋

Alhamdulillah, kami akan menikah! 🤍

  Naila & Alfin
  Sabtu, 26 Desember 2026
  Pondok Majapahit 1, Mranggen, Demak

Akad 08.00 WIB · Resepsi 10.00–12.00 WIB

Doa restunya ya, dan kalau berkenan hadir kami sangat senang.
Detail lengkapnya (lokasi, RSVP, ucapan) ada di sini:

{LINK}

Terima kasih banyak 🤍
```

### C. Versi pendek (untuk grup / status)

```
Bismillah 🤍

Naila & Alfin
Sabtu, 26 Desember 2026
Akad 08.00 · Resepsi 10.00–12.00 WIB
Pondok Majapahit 1, Bandungrejo, Mranggen, Demak

Undangan lengkap:
{LINK}
```

### D. Susulan (untuk yang belum membalas, kirim H-10)

```
Assalamu'alaikum Bapak/Ibu {NAMA},

Menjelang hari bahagia kami pada 26 Desember 2026,
kami ingin memastikan kembali kehadiran Bapak/Ibu.

Apabila berkenan hadir, mohon konfirmasi melalui tautan
di bawah ini agar kami dapat mempersiapkan tempat duduk
dan konsumsi dengan baik:

{LINK}

Terima kasih banyak atas perhatian dan doanya 🤍

Naila & Alfin
```

### E. Ucapan terima kasih setelah acara (H+1)

```
Assalamu'alaikum Warahmatullahi Wabarakatuh

Alhamdulillah, acara pernikahan kami telah berlangsung
dengan lancar atas izin Allah SWT.

Terima kasih kepada Bapak/Ibu/Saudara yang telah hadir,
mengirimkan doa, serta memberikan tanda kasih. Mohon maaf
apabila ada kekurangan dalam penyambutan.

Semoga Allah membalas kebaikan Bapak/Ibu/Saudara semua.

Naila & Alfin
```

---

## 2. Cara membuat link per tamu

Supaya nama tamu muncul otomatis di cover dan form RSVP
sudah terisi, setiap tamu diberi link sendiri:

```
https://undangan-naila-alfin.vercel.app/?to=Bapak%20Yanto
```

### Cara otomatis (untuk banyak tamu)

1. Buka file `guests.txt` di folder project
2. Tulis nama tamu, **satu nama per baris**
3. Jalankan di terminal:

```bash
npm run guests
```

4. Akan muncul file `guest-links.csv` berisi dua kolom:
   **Nama Tamu** dan **Link Undangan**
5. Buka di Excel / Google Sheets, lalu copy link-nya

### Cara manual (untuk 1–5 tamu)

Ganti bagian `Nama` di link. Spasi ditulis `%20`:

| Tamu | Link |
|---|---|
| Bapak Yanto | `.../?to=Bapak%20Yanto` |
| Ibu Siti & Keluarga | `.../?to=Ibu%20Siti%20%26%20Keluarga` |
| Mas Budi | `.../?to=Mas%20Budi` |

Tanda `&` harus ditulis `%26` agar tidak terpotong.

---

## 3. Tata cara membagikan — urutan yang disarankan

### H-30 s/d H-21 (26 Nov – 5 Des) — Gelombang pertama

Bagikan ke **keluarga inti dan kerabat dekat** lebih dulu.

- Kirim satu per satu lewat WhatsApp pribadi, bukan grup
- Pakai Template A (formal) untuk tetua, Template B untuk teman
- Tujuannya: menangkap error lebih awal — kalau ada link rusak
  atau nama salah, hanya sedikit orang yang melihat

### H-21 s/d H-14 (5 – 12 Des) — Gelombang kedua

Kirim ke **teman, rekan kerja, dan tetangga**.

- Tetap pakai chat pribadi
- Boleh mulai bikin grup WhatsApp kecil per angkatan/keluarga
  untuk menaruh link-nya

### H-14 (12 Des) — Grup & status

- Posting Template C di grup-grup yang relevan
- Pasang di status WhatsApp / Instagram Story
- **Jangan** broadcast ke kontak yang tidak dikenal dekat

### H-10 (16 Des) — Cek RSVP

- Buka halaman admin: `/admin/<kata-sandi>`
- Lihat siapa yang belum membalas
- Kirim Template D ke mereka satu per satu

### H-3 (23 Des) — Pengingat terakhir

Kirim ulang link ke yang sudah bilang hadir, sertakan:

```
Reminder: acara Sabtu, 26 Desember 2026
Akad 08.00 WIB · Resepsi 10.00–12.00 WIB
Pondok Majapahit 1, Bandungrejo, Mranggen, Demak
Lokasi: https://maps.app.goo.gl/NX8CH4v9frRY1EQa7
```

### H+1 (27 Des) — Ucapan terima kasih

Kirim Template E.

---

## 4. Checklist sebelum kirim pertama

Lakukan sekali, sebelum membagikan ke siapa pun:

- [ ] Buka link di HP sendiri — cover muncul, nama tamu benar
- [ ] Tekan **Buka Undangan** — halaman pembuka muncul
- [ ] Cek halaman **Acara** — tanggal, jam, alamat benar
- [ ] Tekan **Lihat Lokasi** — Google Maps membuka lokasi yang benar
- [ ] Isi **RSVP** pakai nama sendiri — muncul "Terima kasih"
- [ ] Cek halaman admin — RSVP tadi **benar-benar masuk**
- [ ] Kirim ucapan di **Buku Tamu** — muncul di daftar
- [ ] Coba di HP orang lain (bukan HP kamu) — pastikan tetap normal
- [ ] Matikan WiFi, pakai data seluler — pastikan tetap terbuka

---

## 5. Hal yang perlu dihindari

**Jangan broadcast ke semua kontak sekaligus.**
WhatsApp bisa menandai akun sebagai spam, dan link-nya
berisiko diblokir. Kirim manual, atau pakai fitur
"Kirim ke banyak" maksimal 5–10 nomor per sesi.

**Jangan pakai link pendek (bit.ly dll).**
Tamu sering curiga dengan link pendek. Link Vercel sudah
cukup pendek dan terlihat resmi.

**Jangan kirim tanpa nama tamu.**
Undangan yang menyebut nama tamu jauh lebih dihargai
daripada link polos. Ini juga yang membuat RSVP lebih
akurat.

**Jangan kirim tengah malam.**
Kirim pagi (07.00–09.00) atau setelah maghrib
(18.30–20.30) — saat orang biasanya membuka HP.

**Jangan lupa cek RSVP berkala.**
Buka halaman admin seminggu sekali. Kalau Supabase
gratis sedang tidur, buka dashboard-nya agar aktif lagi.

---

## 6. Cara kirim ke banyak nomor (opsional)

Kalau tamu lebih dari 100 dan ingin otomatis:

1. Siapkan daftar nomor di Excel (format: 628xxx)
2. Gunakan WhatsApp Business → **Pesan Template**
   atau aplikasi pihak ketiga seperti Wati / Qontak
3. **Jangan** pakai script bot tidak resmi — nomor bisa diblokir

Untuk acara pernikahan, cara manual dengan 20–30 pesan
per hari biasanya sudah cukup dan terasa lebih personal.
