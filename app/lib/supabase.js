// Klien Supabase untuk browser.
//
// Isi dua variabel ini di .env.local (dan di Vercel → Settings → Environment Variables):
//   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
//
// anon key AMAN dipakai di browser — itu kunci publik yang memang dirancang
// untuk itu. Yang tidak boleh bocor adalah "service_role key", dan kunci itu
// tidak dipakai di proyek ini sama sekali.
//
// Kalau variabel belum diisi, `isDbReady` bernilai false dan aplikasi otomatis
// memakai localStorage supaya undangan tetap bisa dipakai (mode demo).

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isDbReady = Boolean(url && anonKey);

export const supabase = isDbReady
  ? createClient(url, anonKey, {
      auth: { persistSession: false },
    })
  : null;
