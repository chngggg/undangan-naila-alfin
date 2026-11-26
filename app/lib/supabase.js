// Klien Supabase untuk browser.
//
// Nilai di bawah adalah "publishable key" (anon key). Kunci ini MEMANG
// dirancang untuk ditaruh di browser dan boleh terlihat publik — sama seperti
// Google Maps API key. Keamanan data tidak bergantung pada kerahasiaan kunci
// ini, melainkan pada:
//
//   1. Row Level Security (RLS) di database:
//      - tabel `rsvp`   → tamu hanya boleh INSERT, TIDAK boleh SELECT
//        (jadi tidak ada tamu yang bisa membaca kehadiran orang lain)
//      - tabel `wishes` → tamu boleh INSERT & SELECT (ucapan memang
//        ditampilkan di halaman buku tamu)
//   2. Fungsi `admin_rsvp(pass)` yang butuh kata sandi untuk membaca rekap.
//
// Yang TIDAK boleh ada di file ini: "service_role key" / password database.
// Kunci itu melewati semua RLS, jadi tidak dipakai di proyek ini sama sekali.
//
// Bisa juga di-override lewat environment variable (mis. kalau project
// Supabase dipindah ke akun lain):
//   NEXT_PUBLIC_SUPABASE_URL
//   NEXT_PUBLIC_SUPABASE_ANON_KEY

import { createClient } from "@supabase/supabase-js";

const DEFAULT_URL = "https://tzywrpczchgldrspnwrz.supabase.co";
const DEFAULT_KEY = "sb_publishable_LXE1oVZheslGCSjfsOEA9g_9WDXjgjk";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_KEY;

export const isDbReady = Boolean(url && anonKey);

export const supabase = isDbReady
  ? createClient(url, anonKey, {
      auth: { persistSession: false },
    })
  : null;
