"use client";

import { useEffect, useState } from "react";
import { Reveal, SectionTitle } from "./ui/Reveal";
import { Divider, SectionDecor } from "./ui/Ornaments";
import {
  addGuestbookEntry,
  readGuestbook,
  formatDateID,
  GUESTBOOK_EVENT,
} from "../lib/guestbook";

const LABEL = { hadir: "Hadir", ragu: "Masih ragu", tidak: "Tidak hadir" };

export default function Wishes() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name: "", message: "" });

  useEffect(() => {
    const sync = () => setList(readGuestbook());
    sync();
    window.addEventListener(GUESTBOOK_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(GUESTBOOK_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    addGuestbookEntry({
      name: form.name.trim(),
      message: form.message.trim(),
      attend: null,
      guests: 0,
      kind: "wish",
    });
    setForm({ name: "", message: "" });
  };

  return (
    <section className="relative overflow-hidden bg-ivory px-5 pt-20 pb-36">
      <SectionDecor floral="right" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />

      <div className="relative mx-auto max-w-[420px]">
        <Reveal>
          <SectionTitle kicker="Guest Book" script="Buku Tamu" title="Ucapan & Doa" />
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={submit}
            className="mt-9 rounded-[3px] border border-mahogany/15 bg-cream/50 px-5 py-6"
          >
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama Anda"
              required
              className="w-full rounded-[4px] border border-mahogany/20 bg-ivory px-3.5 py-2.5 font-body text-[12px] text-mahogany placeholder:text-dusty/70 outline-none transition-colors focus:border-champagne focus:bg-white"
            />
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
              rows={4}
              required
              className="mt-3 w-full resize-none rounded-[4px] border border-mahogany/20 bg-ivory px-3.5 py-2.5 font-body text-[12px] leading-relaxed text-mahogany placeholder:text-dusty/70 outline-none transition-colors focus:border-champagne focus:bg-white"
            />
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-mahogany px-5 py-3 font-body text-[10px] uppercase tracking-wide-2 text-ivory shadow-[0_5px_18px_-6px_rgba(78,26,31,0.6)] transition-all hover:bg-maroon-deep active:scale-[0.99]"
            >
              Kirim Ucapan
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex items-center justify-between">
            <p className="font-body text-[9px] uppercase tracking-wide-2 text-dusty">
              {list.length > 0 ? `${list.length} Ucapan` : "\u00a0"}
            </p>
            <Divider width={110} className="text-champagne" />
          </div>
        </Reveal>

        <div className="mt-4 space-y-3">
          {list.length === 0 && (
            <p className="py-6 text-center font-couple text-[14px] italic text-mahogany/50">
              Jadilah yang pertama mengirim doa.
            </p>
          )}

          {list.map((item) => (
            <div
              key={item.id}
              className="rounded-[3px] border border-mahogany/10 bg-cream/60 px-4 py-3.5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-title text-[13px] text-mahogany">{item.name}</p>
                <p className="shrink-0 font-body text-[8px] uppercase tracking-wide-2 text-dusty/80">
                  {formatDateID(item.createdAt)}
                </p>
              </div>
              {item.message && (
                <p className="mt-1.5 font-body text-[11.5px] leading-[1.85] text-mahogany/70">
                  {item.message}
                </p>
              )}
              {item.kind === "rsvp" && (
                <p className="mt-1.5 font-body text-[9px] uppercase tracking-wide-2 text-champagne">
                  {LABEL[item.attend] || item.attend}
                  {item.guests ? ` · ${item.guests} orang` : ""}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
