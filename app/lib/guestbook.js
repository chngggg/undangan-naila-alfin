// ============================================================
// LAPISAN DATA RSVP & BUKU TAMU
//
// Ada dua mode:
//
// 1. MODE DATABASE (dipakai kalau .env.local berisi kunci Supabase)
//    Data tersimpan di server → semua tamu melihat daftar ucapan yang sama,
//    dan kamu bisa melihat semua RSVP lewat halaman admin.
//
// 2. MODE DEMO (kalau kunci belum ada)
//    Data hanya tersimpan di localStorage HP masing-masing. Berguna untuk
//    mencoba tampilan sebelum database disiapkan.
//
// Semua fungsi di bawah mengembalikan Promise, jadi pemanggilnya wajib await.
// ============================================================

import { supabase, isDbReady } from "./supabase";

const KEY = "naila-alfin-guestbook";

/* ---------- util ---------- */

export function formatDateID(iso) {
  try {
    return new Date(iso).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function readLocal() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeLocal(entry) {
  const next = [
    {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      created_at: new Date().toISOString(),
      ...entry,
    },
    ...readLocal(),
  ].slice(0, 200);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage penuh / diblokir */
  }
  return next;
}

/* ---------- RSVP ---------- */

export async function submitRsvp({ name, attend, guests, guestSlug }) {
  const payload = {
    name: name.trim(),
    attend,
    guests: attend === "tidak" ? 0 : Number(guests) || 1,
    guest_slug: guestSlug || null,
  };

  if (!isDbReady) {
    writeLocal({ ...payload, kind: "rsvp" });
    return { ok: true, mode: "local" };
  }

  const { error } = await supabase.from("rsvp").insert(payload);
  if (error) return { ok: false, error: error.message };
  return { ok: true, mode: "db" };
}

/* ---------- Buku tamu / ucapan ---------- */

export async function listWishes(limit = 100) {
  if (!isDbReady) {
    return readLocal()
      .filter((x) => x.kind === "wish")
      .map((x) => ({
        id: x.id,
        name: x.name,
        message: x.message,
        created_at: x.created_at,
      }));
  }

  const { data, error } = await supabase
    .from("wishes")
    .select("id,name,message,created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return data || [];
}

export async function submitWish({ name, message, guestSlug }) {
  const payload = {
    name: name.trim(),
    message: message.trim(),
    guest_slug: guestSlug || null,
  };

  if (!isDbReady) {
    writeLocal({ ...payload, kind: "wish" });
    return { ok: true, mode: "local" };
  }

  const { data, error } = await supabase
    .from("wishes")
    .insert(payload)
    .select("id,name,message,created_at")
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, mode: "db", data };
}

/* ---------- Admin ---------- */

export async function adminListRsvp(password) {
  if (!isDbReady) return { ok: false, error: "Database belum dikonfigurasi." };

  const { data, error } = await supabase.rpc("admin_rsvp", { pass: password });
  if (error) {
    return {
      ok: false,
      error: error.message?.includes("unauthorized")
        ? "Kata sandi salah."
        : error.message,
    };
  }
  return { ok: true, data: data || [] };
}
