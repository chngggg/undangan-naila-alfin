-- ============================================================
--  SKEMA DATABASE UNDANGAN NAILA & ALFIN
--
--  Cara pakai:
--   1. Buka project Supabase kamu → menu "SQL Editor" → "New query"
--   2. Tempel SELURUH isi file ini
--   3. GANTI kata sandi di bagian ADMIN di bawah
--   4. Klik "Run"
--
--  Aman dijalankan berulang kali (pakai IF NOT EXISTS / OR REPLACE).
-- ============================================================


-- ------------------------------------------------------------
-- 1. TABEL RSVP
-- ------------------------------------------------------------
create table if not exists public.rsvp (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(trim(name)) between 1 and 120),
  attend     text not null check (attend in ('hadir', 'ragu', 'tidak')),
  guests     int  not null default 1 check (guests between 0 and 20),
  guest_slug text,
  created_at timestamptz not null default now()
);

create index if not exists rsvp_created_idx on public.rsvp (created_at desc);


-- ------------------------------------------------------------
-- 2. TABEL UCAPAN / BUKU TAMU
-- ------------------------------------------------------------
create table if not exists public.wishes (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(trim(name)) between 1 and 120),
  message    text not null check (char_length(trim(message)) between 1 and 1000),
  guest_slug text,
  created_at timestamptz not null default now()
);

create index if not exists wishes_created_idx on public.wishes (created_at desc);


-- ------------------------------------------------------------
-- 3. KEAMANAN (Row Level Security)
--    Tamu hanya boleh MENULIS. Membaca ucapan boleh (ditampilkan
--    di undangan). Membaca RSVP hanya lewat fungsi ber-sandi.
-- ------------------------------------------------------------
alter table public.rsvp   enable row level security;
alter table public.wishes enable row level security;

drop policy if exists "rsvp_insert_public"   on public.rsvp;
drop policy if exists "wishes_insert_public" on public.wishes;
drop policy if exists "wishes_read_public"   on public.wishes;

create policy "rsvp_insert_public"
  on public.rsvp for insert to anon, authenticated with check (true);

create policy "wishes_insert_public"
  on public.wishes for insert to anon, authenticated with check (true);

create policy "wishes_read_public"
  on public.wishes for select to anon, authenticated using (true);


-- ------------------------------------------------------------
-- 3b. HAK AKSES TABEL
--     Sejak 2025 Supabase TIDAK memberi izin otomatis ke role anon
--     untuk tabel baru. Tanpa blok ini, semua insert ditolak dengan
--     error 42501 "permission denied for table ...".
--
--     Perhatikan: rsvp hanya diberi INSERT (bukan SELECT), jadi tamu
--     tidak bisa membaca daftar kehadiran orang lain.
-- ------------------------------------------------------------
revoke all on public.rsvp   from anon, authenticated;
revoke all on public.wishes from anon, authenticated;

grant insert on public.rsvp to anon, authenticated;

grant insert, select on public.wishes to anon, authenticated;

grant usage on schema public to anon, authenticated;


-- ------------------------------------------------------------
-- 4. FUNGSI ADMIN
--    Halaman /admin/<sandi> memanggil fungsi ini. Kalau sandinya
--    salah, database menolak — jadi anon key yang ada di browser
--    tidak bisa dipakai untuk membaca data RSVP.
--
--    >>> GANTI 'ganti-sandi-ini' dengan sandi rahasia pilihanmu <<<
-- ------------------------------------------------------------
create or replace function public.admin_rsvp(pass text)
returns setof public.rsvp
language plpgsql
security definer
set search_path = public
as $$
begin
  if pass is distinct from 'nailaalfin2026' then
    raise exception 'unauthorized';
  end if;

  return query
    select * from public.rsvp order by created_at desc;
end;
$$;

revoke all on function public.admin_rsvp(text) from public;
grant execute on function public.admin_rsvp(text) to anon, authenticated;


-- ------------------------------------------------------------
-- 5. REKAP (opsional, untuk dilihat langsung di SQL Editor)
-- ------------------------------------------------------------
create or replace view public.rekap_rsvp as
select
  attend,
  count(*)                as jumlah_respon,
  coalesce(sum(guests),0) as jumlah_jiwa
from public.rsvp
group by attend;
