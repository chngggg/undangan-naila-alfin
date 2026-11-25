"use client";

import { motion } from "framer-motion";
import { wedding } from "../data/wedding";
import {
  OrnateArch,
  GoldDivider,
  FloralCluster,
  Lantern,
  MosqueSkyline,
  KawungBand,
  AngsoDuo,
} from "./ui/Ornaments";

export default function Cover({ onOpen, guest }) {
  const { bride, groom, event } = wedding;

  return (
    <motion.section
      key="cover"
      className="fixed inset-0 z-50 flex justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative h-full w-full max-w-[560px] overflow-hidden bg-cream lg:shadow-[0_24px_90px_-30px_rgba(78,26,31,0.55)]">
        {/* kertas + renda */}
        <div className="absolute inset-0 paper" />
        <div className="absolute inset-0 pattern-lace opacity-[0.07]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,253,247,0.92),transparent_62%)]" />

        {/* pita batik atas & bawah */}
        <div className="absolute inset-x-0 top-0 h-12 text-mahogany opacity-[0.13] pattern-kawung" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cream via-cream/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream via-cream/60 to-transparent" />

        {/* lentera gantung */}
        <Lantern className="absolute left-4 top-0 h-28 w-9 text-champagne/75" delay={0.2} />
        <Lantern className="absolute right-5 top-0 h-36 w-11 text-champagne/65" delay={1.2} />

        {/* konten */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pt-16 pb-5">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full max-w-[322px] flex-col items-center text-center"
          >
            <div className="relative w-full">
              <OrnateArch className="pointer-events-none absolute inset-0 h-full w-full text-champagne/85" />

              <div className="relative flex flex-col items-center px-9 pt-16 pb-14">
                <p className="font-arabic text-[15px] leading-loose text-mahogany/90">
                  بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </p>

                <div className="mt-4 flex justify-center text-champagne">
                  <GoldDivider width={120} />
                </div>

                <p className="mt-5 font-body text-[8.5px] uppercase tracking-luxe text-dusty">
                  The Wedding Of
                </p>

                <h1 className="mt-2 font-couple text-[37px] leading-[1.05] text-mahogany">
                  {bride.short}
                  <span className="mx-1.5 font-script text-[25px] align-middle text-dusty">
                    &
                  </span>
                  {groom.short}
                </h1>

                <p className="mt-3 font-body text-[9.5px] uppercase tracking-wide-2 text-mahogany-soft">
                  {event.dateShort}
                </p>

                <div className="mt-6 w-full border-t border-champagne/60 pt-4">
                  <p className="font-body text-[8.5px] uppercase tracking-wide-2 text-dusty">
                    Kepada Bapak / Ibu / Saudara
                  </p>
                  <p className="mt-1.5 font-title text-[15px] leading-snug text-mahogany">
                    {guest || "Tamu Undangan"}
                  </p>
                </div>

                <button
                  onClick={onOpen}
                  className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-mahogany px-7 py-3 font-body text-[9.5px] uppercase tracking-wide-2 text-ivory shadow-[0_6px_20px_-6px_rgba(78,26,31,0.6)] transition-all duration-500 hover:bg-maroon-deep active:scale-[0.98]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
                    <path d="m3.5 6.5 8.5 6 8.5-6" />
                  </svg>
                  Buka Undangan
                </button>
              </div>
            </div>

            {/* penutup bawah */}
            <div className="mt-7 flex flex-col items-center gap-2">
              <AngsoDuo className="h-5 w-11 text-dusty/45" />
              <p className="font-body text-[8px] uppercase tracking-luxe text-dusty/90">
                {bride.address.split(",").pop().trim()} ·{" "}
                {groom.address.split(",").pop().trim()}
              </p>
            </div>
          </motion.div>
        </div>

        {/* bunga sudut bawah */}
        <FloralCluster className="pointer-events-none absolute -bottom-10 -left-12 h-36 w-36 opacity-95" />
        <FloralCluster
          className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 opacity-95"
          flip
          variant={1}
        />
        <MosqueSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full text-mahogany/[0.1]" />

        {/* garis tepi tipis */}
        <div className="pointer-events-none absolute inset-3 border border-mahogany/15" />
        <div className="pointer-events-none absolute inset-0">
          <KawungBand className="absolute left-0 top-3 h-3.5 w-full text-mahogany/10" />
        </div>
      </div>
    </motion.section>
  );
}
