"use client";

import { useState } from "react";
import { Reveal, SectionTitle } from "./ui/Reveal";
import { SectionDecor } from "./ui/Ornaments";
import { submitRsvp } from "../lib/guestbook";
import { useGuestName } from "../lib/useGuestName";

const ATTEND = [
  { key: "hadir", label: "Hadir" },
  { key: "ragu", label: "Masih Ragu" },
  { key: "tidak", label: "Tidak Hadir" },
];

export default function RSVP() {
  const guest = useGuestName();
  const [form, setForm] = useState({ attend: "hadir", guests: "1" });
  /* draft === null berarti kolom nama belum disentuh → ikut nama tamu di link */
  const [draft, setDraft] = useState(null);
  const name = draft ?? guest;
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || status === "sending") return;

    setStatus("sending");
    setError("");

    const res = await submitRsvp({
      name,
      attend: form.attend,
      guests: form.guests,
      guestSlug: guest,
    });

    if (!res.ok) {
      setStatus("error");
      setError(
        res.error?.includes("fetch")
          ? "Koneksi bermasalah. Coba lagi ya."
          : "Gagal mengirim. Coba lagi ya."
      );
      return;
    }

    setStatus("done");
    setDraft("");
    setForm({ attend: "hadir", guests: "1" });
  };

  const inputCls =
    "w-full rounded-[4px] border border-mahogany/25 bg-ivory px-3.5 py-2.5 font-body text-[12px] text-mahogany placeholder:text-dusty/70 outline-none transition-colors focus:border-champagne focus:bg-white";

  const busy = status === "sending";

  return (
    <section className="relative overflow-hidden bg-cream px-5 pt-20 pb-28">
      <SectionDecor floral="left" variant="d" />

      <div className="relative mx-auto max-w-[420px]">
        <Reveal>
          <SectionTitle kicker="Confirmation" script="RSVP" title="Konfirmasi Kehadiran" />
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            className="mt-9 rounded-[4px] border border-champagne/70 bg-ivory/90 px-5 py-6 shadow-[0_2px_18px_-10px_rgba(78,26,31,0.35)]"
          >
            <label
              htmlFor="rsvp-name"
              className="block font-body text-[9px] uppercase tracking-wide-2 text-mahogany/70"
            >
              Nama
            </label>
            <input
              id="rsvp-name"
              type="text"
              value={name}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Nama Anda"
              required
              disabled={busy}
              className={`mt-2 ${inputCls}`}
            />

            <p className="mt-5 font-body text-[9px] uppercase tracking-wide-2 text-mahogany/70">
              Kehadiran
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2" role="group" aria-label="Kehadiran">
              {ATTEND.map((opt) => {
                const active = form.attend === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setForm({ ...form, attend: opt.key })}
                    disabled={busy}
                    className={`rounded-[4px] border px-1 py-2.5 font-body text-[10px] transition-all ${
                      active
                        ? "border-mahogany bg-mahogany text-ivory shadow-[0_3px_12px_-6px_rgba(78,26,31,0.6)]"
                        : "border-mahogany/25 bg-cream/60 text-mahogany/80"
                    }`}
                    aria-pressed={active}
                  >
                    {active && <span aria-hidden="true">✓ </span>}
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {form.attend !== "tidak" && (
              <div className="mt-5">
                <label
                  htmlFor="rsvp-guests"
                  className="block font-body text-[9px] uppercase tracking-wide-2 text-mahogany/70"
                >
                  Jumlah Tamu
                </label>
                <select
                  id="rsvp-guests"
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  disabled={busy}
                  className={`mt-2 ${inputCls}`}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} orang
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-6 w-full rounded-full bg-mahogany px-5 py-3 font-body text-[10px] uppercase tracking-wide-2 text-ivory shadow-[0_5px_18px_-6px_rgba(78,26,31,0.6)] transition-all hover:bg-maroon-deep active:scale-[0.99] disabled:opacity-70"
            >
              {busy ? "Mengirim..." : "Kirim Konfirmasi"}
            </button>

            {status === "done" && (
              <p
                role="status"
                className="mt-4 text-center font-couple text-[13px] italic text-mahogany/75"
              >
                Terima kasih, konfirmasi Anda sudah tercatat.
              </p>
            )}

            {status === "error" && (
              <p role="alert" className="mt-4 text-center font-body text-[10.5px] text-dusty">
                {error}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
