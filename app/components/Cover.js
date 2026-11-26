"use client";

import { motion } from "framer-motion";
import { wedding } from "../data/wedding";
import { OgeeArch, GoldDivider, AngsoDuo } from "./ui/Ornaments";
import { CornerFloral, WideFloral } from "./ui/PngOrnaments";

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
        {/* kertas + cahaya hangat */}
        <div className="absolute inset-0 paper" />
        <div className="absolute inset-0 bg-[radial-gradient(115%_72%_at_50%_24%,#fffdf8_0%,rgba(255,253,248,0)_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_100%,rgba(168,132,100,0.2)_0%,rgba(168,132,100,0)_58%)]" />

        {/* konten */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full max-w-[344px] flex-col items-center text-center"
          >
            <div className="relative w-full">
              <OgeeArch className="pointer-events-none absolute inset-0 h-full w-full text-mahogany/45" />

              <div className="relative flex flex-col items-center px-7 pt-14 pb-6">
                <p className="font-arabic text-[14px] leading-loose text-mahogany/90">
                  بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </p>

                <div className="mt-3 flex justify-center text-champagne">
                  <GoldDivider width={112} />
                </div>

                <p className="mt-4 font-body text-[8px] uppercase tracking-luxe text-dusty">
                  The Wedding Of
                </p>

                <h1 className="mt-1.5 font-script text-[46px] leading-[0.94] text-mahogany">
                  {bride.short}
                </h1>
                <span className="my-0.5 font-couple text-[14px] italic text-dusty/90">
                  &amp;
                </span>
                <h1 className="font-script text-[46px] leading-[0.94] text-mahogany">
                  {groom.short}
                </h1>

                <p className="mt-3 font-body text-[9px] uppercase tracking-wide-2 text-mahogany-soft">
                  {event.dateShort}
                </p>

                <div className="mt-3 flex justify-center text-champagne">
                  <GoldDivider width={92} />
                </div>

                <p className="mt-3 font-couple text-[13px] italic text-mahogany/65">
                  Together, in love, forever
                </p>

                <div className="mt-4 w-full border-t border-champagne/55 pt-4">
                  <p className="font-body text-[8px] uppercase tracking-wide-2 text-dusty">
                    Kepada Bapak / Ibu / Saudara
                  </p>
                  <p className="mt-1.5 font-title text-[14.5px] leading-snug text-mahogany">
                    {guest || "Tamu Undangan"}
                  </p>
                </div>

                <button
                  onClick={onOpen}
                  className="group mt-4 inline-flex items-center gap-2.5 rounded-full bg-mahogany px-7 py-3 font-body text-[9px] uppercase tracking-wide-2 text-ivory shadow-[0_6px_20px_-6px_rgba(78,26,31,0.6)] transition-all duration-500 hover:bg-maroon-deep active:scale-[0.98]"
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
            <div className="mt-5 flex flex-col items-center gap-1.5">
              <AngsoDuo className="h-4 w-10 text-dusty/45" />
              <p className="font-body text-[7.5px] uppercase tracking-luxe text-dusty/90">
                {bride.address.split(",").pop().trim()} ·{" "}
                {groom.address.split(",").pop().trim()}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ---- ornamen bunga saja ---- */}
        <CornerFloral side="left" height="h-48" delay={0.2} anim="sway" inset="-left-12" className="opacity-90" />
        <WideFloral
          side="right"
          variant="a"
          width="w-36"
          delay={0.6}
          anim="drift"
          className="-bottom-4 opacity-85"
        />

        {/* bingkai garis rambut */}
        <div className="pointer-events-none absolute inset-2.5 border border-mahogany/20" />
      </div>
    </motion.section>
  );
}
