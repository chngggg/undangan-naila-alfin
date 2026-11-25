"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { wedding } from "../data/wedding";
import { img } from "../lib/images";
import { Reveal } from "./ui/Reveal";
import {
  GoldDivider,
  FloralCluster,
  Lantern,
  MosqueSkyline,
  TampukManggis,
  KawungBand,
} from "./ui/Ornaments";

export default function Opening() {
  const { opening, intention, event } = wedding;

  return (
    <section className="relative overflow-hidden bg-ivory px-6 pt-16 pb-16">
      {/* latar bertekstur + renda */}
      <div className="pointer-events-none absolute inset-0 pattern-lace opacity-[0.06]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ivory to-transparent" />
      <KawungBand className="pointer-events-none absolute inset-x-0 top-2 h-3 w-full text-mahogany/10" />

      {/* lentera gantung */}
      <Lantern
        className="pointer-events-none absolute left-3 top-0 h-24 w-8 text-champagne/70"
        delay={0.3}
      />
      <Lantern
        className="pointer-events-none absolute right-4 top-0 h-32 w-10 text-champagne/60"
        delay={1.5}
      />

      <div className="relative mx-auto max-w-[400px] text-center">
        <Reveal>
          <p className="font-arabic text-[17px] leading-loose text-mahogany/85">
            السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </p>
          <p className="mt-3 font-body text-[10px] uppercase tracking-wide-2 text-dusty">
            Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </p>
        </Reveal>

        {/* ---- ilustrasi kedua mempelai ---- */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-5 w-full max-w-[318px]"
        >
          <div className="pointer-events-none absolute inset-x-10 bottom-3 h-8 rounded-[50%] bg-mahogany/15 blur-2xl" />
          <Image
            src={img("couple.png")}
            alt="Ilustrasi Naila & Alfin"
            width={500}
            height={500}
            sizes="(max-width: 560px) 318px, 318px"
            priority
            className="relative h-auto w-full"
          />
          <div className="mt-1 flex items-center justify-center gap-3 text-champagne">
            <span className="block h-px w-10 bg-champagne/70" />
            <TampukManggis className="h-4 w-4 text-dusty/60" />
            <span className="block h-px w-10 bg-champagne/70" />
          </div>
        </motion.div>

        <Reveal delay={0.1} className="mt-7">
          <p className="font-couple text-[17px] leading-relaxed text-mahogany-soft">
            {opening}
          </p>
          <p className="mt-4 font-body text-[11.5px] leading-[1.95] text-mahogany/75">
            {intention}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 flex justify-center text-champagne">
          <GoldDivider width={170} />
        </Reveal>

        <Reveal delay={0.2} className="mt-6">
          <div className="mx-auto flex max-w-[300px] items-center justify-center gap-4">
            <TampukManggis className="h-8 w-8 text-dusty/50" />
            <p className="font-body text-[9px] uppercase tracking-luxe text-dusty">
              {event.dateLabel}
            </p>
            <TampukManggis className="h-8 w-8 text-dusty/50" />
          </div>
        </Reveal>
      </div>

      {/* bunga sudut + siluet masjid */}
      <FloralCluster className="pointer-events-none absolute -bottom-8 -left-10 h-40 w-40 opacity-90" />
      <FloralCluster
        className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 opacity-90"
        flip
        variant={1}
      />
      <MosqueSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-14 w-full text-mahogany/[0.08]" />
    </section>
  );
}
