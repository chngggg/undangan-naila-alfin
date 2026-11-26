"use client";

import { useCallback, useEffect, useState } from "react";
import { Reveal, SectionTitle } from "./ui/Reveal";
import { Divider, SectionDecor } from "./ui/Ornaments";
import { listWishes, submitWish, formatDateID } from "../lib/guestbook";
import { useGuestName } from "../lib/useGuestName";

export default function Wishes() {
  const guest = useGuestName();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  /* draft === null berarti kolom nama belum disentuh → ikut nama tamu di link */
  const [draft, setDraft] = useState(null);
  const name = draft ?? guest;
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | error

  const refresh = useCallback(async () => {
    const data = await listWishes();
    setList(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    let alive = true;
    listWishes().then((data) => {
      if (!alive) return;
      setList(data);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || status === "sending") return;

    setStatus("sending");
    const res = await submitWish({
      name,
      message,
      guestSlug: guest,
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    /* tampilkan langsung tanpa menunggu refresh */
    if (res.data) {
      setList((prev) => [res.data, ...prev]);
    } else {
      refresh();
    }

    setMessage("");
    setDraft(null);
    setStatus("idle");
  };

  const inputCls =
    "w-full rounded-[4px] border border-mahogany/25 bg-ivory px-3.5 py-2.5 font-body text-[12px] text-mahogany placeholder:text-dusty/70 outline-none transition-colors focus:border-champagne focus:bg-white";

  const busy = status === "sending";

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
            className="mt-9 rounded-[3px] border border-mahogany/20 bg-cream/50 px-5 py-6"
          >
            <label htmlFor="wish-name" className="sr-only">
              Nama
            </label>
            <input
              id="wish-name"
              type="text"
              value={name}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Nama Anda"
              required
              disabled={busy}
              className={inputCls}
            />
            <label htmlFor="wish-message" className="sr-only">
              Ucapan dan doa
            </label>
            <textarea
              id="wish-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
              rows={4}
              required
              disabled={busy}
              className={`mt-3 resize-none leading-relaxed ${inputCls}`}
            />
            <button
              type="submit"
              disabled={busy}
              className="mt-4 w-full rounded-full bg-mahogany px-5 py-3 font-body text-[10px] uppercase tracking-wide-2 text-ivory shadow-[0_5px_18px_-6px_rgba(78,26,31,0.6)] transition-all hover:bg-maroon-deep active:scale-[0.99] disabled:opacity-70"
            >
              {busy ? "Mengirim..." : "Kirim Ucapan"}
            </button>

            {status === "error" && (
              <p role="alert" className="mt-3 text-center font-body text-[10.5px] text-dusty">
                Gagal mengirim. Periksa koneksi lalu coba lagi.
              </p>
            )}
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
          {loading && (
            <p className="py-6 text-center font-body text-[10px] uppercase tracking-wide-2 text-dusty/70">
              Memuat ucapan…
            </p>
          )}

          {!loading && list.length === 0 && (
            <p className="py-6 text-center font-couple text-[14px] italic text-mahogany/60">
              Jadilah yang pertama mengirim doa.
            </p>
          )}

          {list.map((item) => (
            <div
              key={item.id}
              className="rounded-[3px] border border-mahogany/15 bg-cream/60 px-4 py-3.5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-title text-[13px] text-mahogany">{item.name}</p>
                <p className="shrink-0 font-body text-[8px] uppercase tracking-wide-2 text-dusty/80">
                  {formatDateID(item.created_at)}
                </p>
              </div>
              <p className="mt-1.5 whitespace-pre-line font-body text-[11.5px] leading-[1.85] text-mahogany/75">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
