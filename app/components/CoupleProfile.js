"use client";

import Image from "next/image";
import { wedding } from "../data/wedding";
import { img } from "../lib/images";
import { Reveal, SectionTitle } from "./ui/Reveal";
import {
  GoldDivider,
  LaceCorner,
  TampukManggis,
  SectionDecor,
} from "./ui/Ornaments";
import { MedallionArt, WideFloral } from "./ui/PngOrnaments";

/* potret dalam lengkung berenda */
function ArchPortrait({ src, alt }) {
  return (
    <div className="relative mx-auto w-full max-w-[214px]">
      <div className="relative aspect-[182/292] overflow-hidden rounded-t-[999px] rounded-b-[10px] border border-champagne/70 bg-cream-deep/50">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="214px"
          className="object-contain"
        />
        <div className="pointer-events-none absolute inset-0 rounded-t-[999px] rounded-b-[10px] shadow-[inset_0_0_0_5px_rgba(251,246,237,0.65)]" />
      </div>
      <LaceCorner className="pointer-events-none absolute -left-2 -top-2 h-10 w-10 text-champagne/70" />
      <LaceCorner
        className="pointer-events-none absolute -right-2 -top-2 h-10 w-10 text-champagne/70"
        rotate={90}
      />
      <div className="mt-3 flex items-center justify-center gap-2 text-champagne">
        <span className="block h-px w-8 bg-champagne/70" />
        <TampukManggis className="h-4 w-4 text-dusty/60" />
        <span className="block h-px w-8 bg-champagne/70" />
      </div>
    </div>
  );
}

function PersonCard({ person, role, side }) {
  const isBride = side === "bride";
  const file = isBride ? "bride.png" : "groom.png";

  return (
    <Reveal className="relative">
      <div className="relative mx-auto flex max-w-[300px] flex-col items-center px-2">
        <ArchPortrait src={img(file)} alt={person.full} />

        <div className="mt-4 text-center">
          <p className="font-body text-[9px] uppercase tracking-luxe text-dusty">
            {role}
          </p>
          <h3 className="mt-2 text-balance font-title text-[23px] leading-tight text-mahogany sm:min-h-[2.4em]">
            {person.full}
          </h3>

          <div className="mt-3 flex items-center justify-center gap-2 text-champagne">
            <span className="h-px w-6 bg-champagne" />
            <TampukManggis className="h-4 w-4 text-dusty/60" />
            <span className="h-px w-6 bg-champagne" />
          </div>

          <p className="mt-3 font-body text-[9.5px] uppercase tracking-wide-2 text-dusty">
            {person.order} dari
          </p>
          <p className="mt-1.5 font-couple text-[15.5px] leading-relaxed text-mahogany-soft">
            {person.father}
            <br />
            <span className="text-mahogany-soft/80">&amp;</span> {person.mother}
          </p>

          <p className="mt-3.5 inline-flex items-center gap-1.5 font-body text-[10px] text-mahogany/65">
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {person.address}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function CoupleProfile() {
  const { bride, groom } = wedding;

  return (
    <section className="relative overflow-hidden bg-cream px-5 pt-20 pb-32">
      <SectionDecor floral="left" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-rule" />

      <div className="relative mx-auto max-w-[720px]">
        <Reveal>
          <SectionTitle
            kicker="Bride & Groom"
            script="The Couple"
            title="Dua Hati, Satu Tujuan"
          />
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-[1fr_auto_1fr] sm:items-start sm:gap-0">
          <PersonCard person={bride} role="Mempelai Wanita" side="bride" />

          <Reveal
            delay={0.15}
            className="flex items-center justify-center py-1 sm:h-full sm:pt-24"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="h-8 w-px bg-gradient-to-b from-transparent to-champagne sm:h-14" />
              <MedallionArt width="w-12" delay={0.35} anim="float" />
              <span className="h-8 w-px bg-gradient-to-t from-transparent to-champagne sm:h-14" />
            </div>
          </Reveal>

          <PersonCard person={groom} role="Mempelai Pria" side="groom" />
        </div>

        <Reveal delay={0.1} className="mt-9 flex justify-center text-champagne">
          <GoldDivider width={150} />
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-[420px] text-center font-couple text-[15px] italic leading-relaxed text-mahogany/75">
            &ldquo;{wedding.doa}&rdquo;
          </p>
        </Reveal>
      </div>

      <WideFloral side="right" variant="b" width="w-40" delay={0.5} anim="drift" className="opacity-80" />
    </section>
  );
}
