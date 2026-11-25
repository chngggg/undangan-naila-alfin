"use client";

import { wedding, gifts } from "../data/wedding";
import { Reveal, SectionTitle } from "./ui/Reveal";
import { KawungBand, TampukManggis } from "./ui/Ornaments";
import { useState } from "react";

export default function Gift() {
  const [copied, setCopied] = useState(null);

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section className="relative overflow-hidden bg-cream px-5 py-20">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 text-mahogany/[0.06] pattern-parang" />

      <div className="relative mx-auto max-w-[420px]">
        <Reveal>
          <SectionTitle kicker="Wedding Gift" script="Tanda Kasih" title="Kirim Hadiah" />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-[320px] text-center font-body text-[11px] leading-[1.9] text-mahogany/65">
            Doa restu Anda adalah hadiah terindah. Namun jika ingin memberi tanda
            kasih, kami sediakan kanal berikut.
          </p>
        </Reveal>

        <div className="mt-7 space-y-3">
          {gifts.map((g, i) => (
            <Reveal key={`${g.name}-${i}`} delay={0.15 + i * 0.06}>
              <div className="rounded-[4px] border border-champagne/70 bg-ivory/90 px-5 py-4 shadow-[0_2px_16px_-10px_rgba(78,26,31,0.35)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-body text-[9px] uppercase tracking-wide-2 text-dusty">
                      {g.type}
                    </p>
                    <p className="mt-1 font-title text-[15px] text-mahogany">
                      {g.name}
                    </p>
                    <p className="mt-1.5 font-body text-[15px] tabular-nums tracking-wide text-mahogany/85">
                      {g.number}
                    </p>
                    <p className="mt-1 font-body text-[10px] text-mahogany/55">
                      a.n. {g.holder}
                    </p>
                  </div>
                  <button
                    onClick={() => copy(g.number, `${g.name}-${i}`)}
                    className="shrink-0 rounded-full border border-mahogany/30 px-3 py-1.5 font-body text-[8.5px] uppercase tracking-wide-2 text-mahogany transition-colors hover:bg-mahogany hover:text-ivory"
                  >
                    {copied === `${g.name}-${i}` ? "Tersalin" : "Salin"}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col items-center gap-2">
            <TampukManggis className="h-8 w-8 text-dusty/45" />
            <KawungBand className="h-4 w-28 text-champagne/70" />
            <p className="font-couple text-[14px] italic text-mahogany/60">
              {wedding.thanks}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
