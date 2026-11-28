"use client";

import { wedding } from "../data/wedding";
import { Reveal, SectionTitle } from "./ui/Reveal";
import { GoldDivider, TampukManggis, SectionDecor } from "./ui/Ornaments";
import { CornerFloral } from "./ui/PngOrnaments";

export default function EventDetails() {
  const { event, quote } = wedding;

  return (
    <section className="relative overflow-hidden bg-ivory px-5 pt-20 pb-24">
      <SectionDecor floral="none" />

      <div className="relative mx-auto max-w-[420px]">
        {/* QS. Ar-Rum : 21 — sesuai revisi customer, kotak ayat di atas judul */}
        <Reveal>
          <div className="rounded-[3px] border border-champagne/70 bg-cream/70 px-5 py-7 text-center shadow-[0_2px_18px_-10px_rgba(78,26,31,0.35)]">
            <p className="font-arabic text-[15px] leading-[2.2] text-mahogany/90" dir="rtl">
              {quote.arabic}
            </p>
            <div className="mt-5 flex justify-center text-champagne">
              <GoldDivider width={129} />
            </div>
            <p className="mt-5 font-couple text-[14px] italic leading-relaxed text-mahogany/75">
              {quote.translation}
            </p>
            <p className="mt-4 font-body text-[9px] uppercase tracking-luxe text-dusty">
              {quote.source}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-11">
          <SectionTitle kicker="Save The Date" script="Detail Acara" title="Insya Allah Diselenggarakan" />
        </Reveal>

        {/* Tanggal */}
        <Reveal delay={0.15}>
          <div className="mt-9 text-center">
            <p className="font-body text-[10px] uppercase tracking-luxe text-dusty">
              {event.dayLabel}
            </p>
            <div className="mt-3 flex items-center justify-center gap-4">
              <span className="font-title text-[54px] leading-none text-mahogany">
                26
              </span>
              <span className="flex flex-col items-start border-l border-champagne/70 pl-4 text-left">
                <span className="font-title text-[15px] uppercase tracking-wide-2 text-mahogany/80">
                  Desember
                </span>
                <span className="font-body text-[10px] uppercase tracking-luxe text-dusty">
                  2026
                </span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* Akad & Resepsi — dua kartu sejajar seperti referensi */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {[event.akad, event.resepsi].map((item, i) => (
            <Reveal key={item.label} delay={0.2 + i * 0.06}>
              <div className="h-full rounded-[4px] border border-champagne/70 bg-cream/80 px-3 py-5 text-center shadow-[0_2px_16px_-10px_rgba(78,26,31,0.35)]">
                <div className="flex justify-center text-champagne">
                  {i === 0 ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M4 20V12a8 8 0 0 1 16 0v8" />
                      <path d="M12 4v2M8 20v-5a4 4 0 0 1 8 0v5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="9" cy="14" r="5" />
                      <circle cx="15" cy="14" r="5" />
                      <path d="M9 6l1.5 2M15 6l-1.5 2" />
                    </svg>
                  )}
                </div>
                <p className="mt-3 font-body text-[9px] uppercase tracking-wide-2 text-dusty">
                  {item.label}
                </p>
                <p className="mt-1.5 font-title text-[13.5px] leading-snug text-mahogany">
                  {item.time}
                </p>
                <p className="mt-1 font-body text-[9px] text-mahogany/55">
                  26 Des 2026
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Lokasi */}
        <Reveal delay={0.3}>
          <div className="mt-4 rounded-[4px] border border-champagne/70 bg-cream/80 px-5 py-6 text-center shadow-[0_2px_16px_-10px_rgba(78,26,31,0.35)]">
            <p className="font-body text-[9px] uppercase tracking-luxe text-dusty">
              Lokasi Acara
            </p>
            <h3 className="mt-2 font-title text-[18px] text-mahogany">
              {event.venue}
            </h3>
            <p className="mx-auto mt-2 max-w-[290px] text-balance font-body text-[11px] leading-[1.9] text-mahogany/70">
              {event.address}
            </p>

            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-mahogany px-5 py-2.5 font-body text-[9.5px] uppercase tracking-wide-2 text-ivory shadow-[0_5px_16px_-6px_rgba(78,26,31,0.6)] transition-colors hover:bg-maroon-deep"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Lihat Lokasi
            </a>
          </div>
        </Reveal>

        {/* Peta */}
        <Reveal delay={0.35}>
          <div className="relative mt-4 overflow-hidden rounded-[4px] border border-champagne/70">
            <iframe
              title="Lokasi acara"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                event.mapsEmbed || event.mapsQuery
              )}&z=16&output=embed`}
              className="pointer-events-none h-[220px] w-full grayscale-[40%] sepia-[22%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-cream/10" />
          </div>
        </Reveal>
      </div>

      <CornerFloral
        side="right"
        variant="d"
        height="h-24"
        delay={0.3}
        anim="sway"
        inset="-right-10"
        className="opacity-70"
      />
    </section>
  );
}
