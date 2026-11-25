"use client";

import { useEffect, useState } from "react";
import { wedding } from "../data/wedding";
import { Reveal, SectionTitle } from "./ui/Reveal";
import { MosqueSkyline, SectionDecor } from "./ui/Ornaments";

function diff(target) {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

function Cell({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[68px] w-[62px] items-center justify-center rounded-[4px] border border-champagne/80 bg-ivory/90 shadow-[0_2px_14px_-8px_rgba(78,26,31,0.5)]">
        <span className="absolute inset-x-2 top-0 h-px bg-champagne/60" />
        <span className="font-title text-[26px] tabular-nums leading-none text-mahogany">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 font-body text-[8.5px] uppercase tracking-wide-2 text-dusty">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const target = new Date(wedding.event.isoDate).getTime();
    const tick = () => setTime(diff(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-cream px-5 py-20"
    >
      <SectionDecor floral="left" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 text-mahogany/[0.07] pattern-parang" />
      <MosqueSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-mahogany/[0.09]" />

      <div className="relative mx-auto max-w-[420px]">
        <Reveal>
          <SectionTitle kicker="Counting The Days" script="Menuju Hari Bahagia" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 flex justify-center gap-2.5 sm:gap-4">
            {time ? (
              <>
                <Cell value={time.days} label="Hari" />
                <Cell value={time.hours} label="Jam" />
                <Cell value={time.minutes} label="Menit" />
                <Cell value={time.seconds} label="Detik" />
              </>
            ) : (
              <>
                <Cell value={0} label="Hari" />
                <Cell value={0} label="Jam" />
                <Cell value={0} label="Menit" />
                <Cell value={0} label="Detik" />
              </>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 text-center font-couple text-[15px] italic text-mahogany/70">
            {time
              ? "Kami menantikan kehadiran dan doa restu Anda."
              : wedding.event.dateLabel}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
