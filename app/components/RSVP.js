"use client";

import { useState } from "react";
import { Reveal, SectionTitle } from "./ui/Reveal";
import { addGuestbookEntry } from "../lib/guestbook";

const ATTEND = [
  { key: "hadir", label: "Hadir" },
  { key: "ragu", label: "Masih Ragu" },
  { key: "tidak", label: "Tidak Hadir" },
];

export default function RSVP() {
  const [form, setForm] = useState({ name: "", attend: "hadir", guests: "1" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addGuestbookEntry({
      name: form.name.trim(),
      attend: form.attend,
      guests: form.attend === "tidak" ? 0 : Number(form.guests),
      message: "",
      kind: "rsvp",
    });
    setSent(true);
    setForm({ name: "", attend: "hadir", guests: "1" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputCls =
    "w-full rounded-[4px] border border-mahogany/20 bg-ivory px-3.5 py-2.5 font-body text-[12px] text-mahogany placeholder:text-dusty/70 outline-none transition-colors focus:border-champagne focus:bg-white";

  return (
    <section className="relative overflow-hidden bg-cream px-5 py-20">
      <div className="pointer-events-none absolute inset-0 pattern-kawung opacity-[0.05]" />

      <div className="relative mx-auto max-w-[420px]">
        <Reveal>
          <SectionTitle kicker="Confirmation" script="RSVP" title="Konfirmasi Kehadiran" />
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            className="mt-9 rounded-[4px] border border-champagne/70 bg-ivory/90 px-5 py-6 shadow-[0_2px_18px_-10px_rgba(78,26,31,0.35)]"
          >
            <label className="block font-body text-[9px] uppercase tracking-wide-2 text-dusty">
              Nama
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama Anda"
              required
              className={`mt-2 ${inputCls}`}
            />

            <p className="mt-5 font-body text-[9px] uppercase tracking-wide-2 text-dusty">
              Kehadiran
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {ATTEND.map((opt) => {
                const active = form.attend === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setForm({ ...form, attend: opt.key })}
                    className={`rounded-[4px] border px-1 py-2.5 font-body text-[10px] transition-all ${
                      active
                        ? "border-mahogany bg-mahogany text-ivory shadow-[0_3px_12px_-6px_rgba(78,26,31,0.6)]"
                        : "border-mahogany/20 bg-cream/60 text-mahogany/65"
                    }`}
                    aria-pressed={active}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {form.attend !== "tidak" && (
              <div className="mt-5">
                <label className="block font-body text-[9px] uppercase tracking-wide-2 text-dusty">
                  Jumlah Tamu
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
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
              className="mt-6 w-full rounded-full bg-mahogany px-5 py-3 font-body text-[10px] uppercase tracking-wide-2 text-ivory shadow-[0_5px_18px_-6px_rgba(78,26,31,0.6)] transition-all hover:bg-maroon-deep active:scale-[0.99]"
            >
              Kirim Konfirmasi
            </button>

            {sent && (
              <p className="mt-4 text-center font-couple text-[13px] italic text-mahogany/70">
                Terima kasih, konfirmasi Anda sudah tercatat.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
