"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { adminListRsvp } from "../../lib/guestbook";
import { isDbReady } from "../../lib/supabase";

const ATTEND_LABEL = { hadir: "Hadir", ragu: "Masih ragu", tidak: "Tidak hadir" };
const ATTEND_TONE = {
  hadir: "bg-[#eaf3e6] text-[#3f6b35] border-[#c6ddbe]",
  ragu: "bg-[#fdf3e2] text-[#8a6420] border-[#ecd9b4]",
  tidak: "bg-[#f7e8e6] text-[#8c3a33] border-[#e6c6c2]",
};

function Stat({ label, value, tone = "" }) {
  return (
    <div className={`rounded-lg border px-3 py-3 text-center ${tone || "border-champagne/60 bg-white"}`}>
      <p className="text-[10px] uppercase tracking-wide text-mahogany/60">{label}</p>
      <p className="mt-1 font-title text-[24px] leading-none text-mahogany">{value}</p>
    </div>
  );
}

export default function AdminDashboard({ password }) {
  const [rows, setRows] = useState([]);
  const [state, setState] = useState(isDbReady ? "loading" : "error");
  const [error, setError] = useState(
    isDbReady
      ? ""
      : "Database belum dikonfigurasi. Isi kunci Supabase di environment variables."
  );
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("semua");

  const load = useCallback(async () => {
    const res = await adminListRsvp(password);
    if (!res.ok) {
      setError(res.error || "Gagal memuat data.");
      setState("error");
      return;
    }
    setRows(res.data);
    setState("ready");
  }, [password]);

  const refresh = useCallback(() => {
    setState("loading");
    load();
  }, [load]);

  useEffect(() => {
    if (!isDbReady) return;
    let alive = true;
    adminListRsvp(password).then((res) => {
      if (!alive) return;
      if (!res.ok) {
        setError(res.error || "Gagal memuat data.");
        setState("error");
        return;
      }
      setRows(res.data);
      setState("ready");
    });
    return () => {
      alive = false;
    };
  }, [password]);

  const stats = useMemo(() => {
    const hadir = rows.filter((r) => r.attend === "hadir");
    const tidak = rows.filter((r) => r.attend === "tidak");
    const ragu = rows.filter((r) => r.attend === "ragu");
    return {
      total: rows.length,
      hadir: hadir.length,
      tidak: tidak.length,
      ragu: ragu.length,
      jiwa: hadir.reduce((s, r) => s + (Number(r.guests) || 0), 0),
    };
  }, [rows]);

  const shown = useMemo(() => {
    return rows.filter((r) => {
      if (filter !== "semua" && r.attend !== filter) return false;
      if (!q.trim()) return true;
      return r.name?.toLowerCase().includes(q.trim().toLowerCase());
    });
  }, [rows, q, filter]);

  const downloadCsv = () => {
    const head = ["Nama", "Kehadiran", "Jumlah Tamu", "Waktu"];
    const body = shown.map((r) => [
      r.name,
      ATTEND_LABEL[r.attend] || r.attend,
      r.guests ?? 0,
      new Date(r.created_at).toLocaleString("id-ID"),
    ]);
    const csv = [head, ...body]
      .map((cols) =>
        cols.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")
      )
      .join("\r\n");

    /* BOM supaya Excel membaca UTF-8 dengan benar */
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvp-naila-alfin-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#f7efe3] px-4 py-8 text-mahogany">
      <div className="mx-auto max-w-[760px]">
        <header className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-dusty">
            Rekap Kehadiran
          </p>
          <h1 className="mt-1 font-title text-[26px] leading-tight">
            Naila &amp; Alfin
          </h1>
          <p className="mt-1 text-[12px] text-mahogany/60">
            Sabtu, 26 Desember 2026 · Pondok Majapahit 1, Demak
          </p>
        </header>

        {state === "loading" && (
          <p className="py-16 text-center text-[12px] uppercase tracking-wide text-dusty">
            Memuat data…
          </p>
        )}

        {state === "error" && (
          <div className="rounded-lg border border-[#e6c6c2] bg-[#f7e8e6] px-5 py-6 text-center">
            <p className="font-title text-[16px] text-[#8c3a33]">{error}</p>
            {isDbReady && (
              <button
                onClick={refresh}
                className="mt-4 rounded-full bg-mahogany px-5 py-2 text-[10px] uppercase tracking-wide text-ivory"
              >
                Coba lagi
              </button>
            )}
          </div>
        )}

        {state === "ready" && (
          <>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              <Stat label="Total Respon" value={stats.total} />
              <Stat
                label="Hadir"
                value={stats.hadir}
                tone="border-[#c6ddbe] bg-[#eaf3e6]"
              />
              <Stat
                label="Tidak Hadir"
                value={stats.tidak}
                tone="border-[#e6c6c2] bg-[#f7e8e6]"
              />
              <Stat
                label="Masih Ragu"
                value={stats.ragu}
                tone="border-[#ecd9b4] bg-[#fdf3e2]"
              />
              <Stat label="Total Jiwa" value={stats.jiwa} />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari nama…"
                className="min-w-[160px] flex-1 rounded-md border border-mahogany/20 bg-white px-3 py-2 text-[12px] outline-none focus:border-champagne"
              />
              <div className="flex gap-1">
                {["semua", "hadir", "ragu", "tidak"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-md border px-3 py-2 text-[10px] uppercase tracking-wide transition-colors ${
                      filter === f
                        ? "border-mahogany bg-mahogany text-ivory"
                        : "border-mahogany/20 bg-white text-mahogany/70"
                    }`}
                  >
                    {f === "semua" ? "Semua" : ATTEND_LABEL[f]}
                  </button>
                ))}
              </div>
              <button
                onClick={downloadCsv}
                className="rounded-md border border-mahogany/20 bg-white px-3 py-2 text-[10px] uppercase tracking-wide text-mahogany hover:bg-mahogany hover:text-ivory"
              >
                Unduh Excel
              </button>
              <button
                onClick={refresh}
                className="rounded-md border border-mahogany/20 bg-white px-3 py-2 text-[10px] uppercase tracking-wide text-mahogany hover:bg-mahogany hover:text-ivory"
              >
                Segarkan
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg border border-champagne/60 bg-white">
              {shown.length === 0 ? (
                <p className="py-12 text-center text-[12px] text-mahogany/50">
                  Belum ada data yang cocok.
                </p>
              ) : (
                <ul className="divide-y divide-champagne/40">
                  {shown.map((r) => (
                    <li key={r.id} className="flex items-start gap-3 px-4 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-title text-[14px]">{r.name}</p>
                        <p className="mt-0.5 text-[10px] text-mahogany/50">
                          {new Date(r.created_at).toLocaleString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-[9px] uppercase tracking-wide ${
                          ATTEND_TONE[r.attend] || "border-mahogany/20 bg-cream text-mahogany/70"
                        }`}
                      >
                        {ATTEND_LABEL[r.attend] || r.attend}
                      </span>
                      <span className="w-12 shrink-0 text-right text-[12px] tabular-nums text-mahogany/70">
                        {r.guests ? `${r.guests} org` : "—"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="mt-4 text-center text-[10px] text-mahogany/40">
              Menampilkan {shown.length} dari {rows.length} respon
            </p>
          </>
        )}
      </div>
    </main>
  );
}
