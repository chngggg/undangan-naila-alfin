"use client";

import { wedding } from "../data/wedding";
import { Reveal } from "./ui/Reveal";
import {
  GoldDivider,
  AngsoDuo,
  KawungBand,
  MosqueSkyline,
  SectionDecor,
} from "./ui/Ornaments";
import { Ornament, BerrySprig } from "./ui/PngOrnaments";

export default function Closing() {
  const { bride, groom, closingVerse, thanks, hashtag } = wedding;

  return (
    <section
      className="relative overflow-hidden bg-maroon-deep px-6 pb-24 pt-20 text-cream"
    >
      <SectionDecor floral="none" tone="dark" frame={false} />

      <div className="relative mx-auto max-w-[400px] text-center">
        <Reveal>
          <p className="font-arabic text-[17px] leading-[2.1] text-champagne" dir="rtl">
            {closingVerse}
          </p>
          <p className="mx-auto mt-4 max-w-[300px] text-balance font-body text-[10px] leading-relaxed tracking-wide text-cream/65">
            Barakallahu lakuma wa baraka &apos;alaikuma wa jama&apos;a bainakuma fii khair.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex justify-center text-champagne/80">
          <GoldDivider width={150} />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 font-body text-[11px] leading-[2] text-cream/75">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara berkenan hadir dan memberikan doa restu.
          </p>
          <p className="mt-4 font-body text-[11px] leading-[2] text-cream/60">
            {thanks}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-10 font-body text-[9px] uppercase tracking-luxe text-cream/45">
            Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="relative mt-10 inline-block px-8 py-6">
            <p className="font-body text-[9px] uppercase tracking-luxe text-cream/50">
              Kami yang berbahagia
            </p>
            <p className="mt-3 font-script text-[38px] leading-tight text-cream">
              {bride.short}
              <span className="mx-2 align-middle font-couple text-[17px] italic text-champagne/80">
                &amp;
              </span>
              {groom.short}
            </p>
            <p className="mt-2 font-body text-[8.5px] uppercase tracking-wide-2 text-cream/45">
              Beserta Keluarga Besar
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col items-center gap-3">
            <AngsoDuo className="h-8 w-16 text-champagne/40" />
            <p className="font-script text-[22px] text-champagne/85">{hashtag}</p>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-10 flex flex-col items-center gap-2">
            <KawungBand className="h-4 w-32 text-champagne/40" />
            <p className="font-body text-[8px] uppercase tracking-luxe text-cream/45">
              Naila &amp; Alfin · 2026
            </p>
          </div>
        </Reveal>
      </div>

      <MosqueSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-champagne/[0.10]" />

      {/* bunga di latar maroon — warna burgundy-nya menyatu dengan latar */}
      <Ornament
        name="bloom-bouquet-c"
        anim="sway"
        delay={0.4}
        sizes="220px"
        className="png-orn-lift absolute -left-10 top-0 h-40 w-auto opacity-85"
      />
      <Ornament
        name="bloom-spray-d"
        anim="drift"
        delay={0.9}
        sizes="200px"
        className="png-orn-lift absolute -right-8 bottom-16 h-auto w-32 opacity-55 -scale-x-100"
      />
      <BerrySprig
        name="berry-pink"
        height="h-16"
        delay={1.4}
        anim="flutter"
        className="png-orn-lift absolute -right-1 top-0 opacity-60"
      />
    </section>
  );
}
