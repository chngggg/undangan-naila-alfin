"use client";

import Image from "next/image";
import { img } from "../../lib/images";

/* ============================================================
   ORNAMEN PNG — set bunga cat air baru (revisi customer),
   plus masjid, rumah adat, lentera, dan medali.

   Semua file ada di public/images/ornaments/.

   Cara pakai:
     <Ornament name="bloom-bouquet-a" anim="sway" className="h-56 w-auto" />

   `anim`: none | sway | float | drift | breathe | flutter
   `delay`: detik, supaya gerakannya tidak serempak
   ============================================================ */

/* ukuran asli tiap file — dipakai agar rasio tidak gepeng */
const ASSETS = {
  /* buket besar (baris 1 lembar asli) */
  "bloom-bouquet-a": { w: 358, h: 380 },
  "bloom-bouquet-b": { w: 346, h: 304 },
  "bloom-bouquet-c": { w: 376, h: 366 },
  "bloom-bouquet-d": { w: 359, h: 380 },
  /* semprot mendatar (baris 2) */
  "bloom-spray-a": { w: 352, h: 159 },
  "bloom-spray-b": { w: 347, h: 159 },
  "bloom-spray-c": { w: 375, h: 157 },
  "bloom-spray-d": { w: 353, h: 159 },
  /* bunga tunggal (baris 3) */
  "bloom-cream": { w: 187, h: 182 },
  "bloom-burgundy": { w: 171, h: 182 },
  "bloom-blush": { w: 143, h: 160 },
  "bloom-rose": { w: 175, h: 180 },
  "sprig-gold": { w: 169, h: 185 },
  "berry-pink": { w: 116, h: 185 },
  "berry-cream": { w: 121, h: 183 },
  "berry-red": { w: 100, h: 185 },
  /* aksen kecil (baris 4) */
  "cluster-a": { w: 161, h: 196 },
  "leaf-gold": { w: 135, h: 197 },
  "cluster-b": { w: 157, h: 191 },
  "bud-arch-cream": { w: 140, h: 195 },
  "bud-arch-pink": { w: 152, h: 191 },
  "leaf-large": { w: 128, h: 185 },
  "bloom-single": { w: 133, h: 188 },
  "bloom-maroon": { w: 120, h: 170 },
  "cluster-c": { w: 140, h: 188 },
  /* non-bunga */
  mosque: { w: 760, h: 460 },
  pavilion: { w: 648, h: 524 },
  arch: { w: 264, h: 292 },
  medallion: { w: 168, h: 160 },
  lantern: { w: 72, h: 216 },
};

export function Ornament({
  name,
  alt = "",
  className = "",
  sizes = "220px",
  anim = "none",
  delay = 0,
  priority = false,
  blend = true,
}) {
  const a = ASSETS[name];
  if (!a) return null;

  const animCls = anim === "none" ? "" : `orn-${anim}`;

  return (
    <Image
      src={img(`ornaments/${name}.png`)}
      alt={alt}
      width={a.w}
      height={a.h}
      sizes={sizes}
      priority={priority}
      aria-hidden={alt ? undefined : true}
      className={`${blend ? "png-orn" : ""} ${animCls} ${className}`}
      style={{ "--orn-delay": `${delay}s` }}
    />
  );
}

/* ---- komposisi siap pakai ---- */

/* Buket bunga di sudut — dipakai cover & halaman lain.
   variant: a | b | c | d  (empat buket berbeda dari lembar asli) */
export function CornerFloral({
  side = "left",
  variant = "a",
  className = "",
  anim = "sway",
  delay = 0.2,
  height = "h-56",
  inset = null,
}) {
  const pos = inset || (side === "left" ? "-left-6" : "-right-6");
  return (
    <Ornament
      name={`bloom-bouquet-${variant}`}
      anim={anim}
      delay={delay}
      sizes="240px"
      className={`pointer-events-none absolute bottom-0 ${height} w-auto opacity-95 ${pos} ${
        side === "right" ? "-scale-x-100" : ""
      } ${className}`}
    />
  );
}

/* Semprot bunga mendatar — untuk kaki halaman.
   variant: a | b | c | d */
export function WideFloral({
  side = "right",
  variant = "a",
  className = "",
  anim = "drift",
  delay = 0.3,
  width = "w-52",
}) {
  return (
    <Ornament
      name={`bloom-spray-${variant}`}
      anim={anim}
      delay={delay}
      sizes="260px"
      className={`pointer-events-none absolute bottom-0 ${width} h-auto opacity-95 ${
        side === "left" ? "-left-6" : "-right-6"
      } ${side === "right" ? "-scale-x-100" : ""} ${className}`}
    />
  );
}

/* Bunga tunggal — aksen kecil di dekat judul atau sudut kartu.
   name: bloom-cream | bloom-burgundy | bloom-blush | bloom-rose |
         bloom-single | bloom-maroon */
export function Bloom({
  name = "bloom-cream",
  className = "",
  anim = "float",
  delay = 0.4,
  width = "w-12",
}) {
  return (
    <Ornament
      name={name}
      anim={anim}
      delay={delay}
      sizes="120px"
      className={`pointer-events-none ${width} h-auto ${className}`}
    />
  );
}

/* Tangkai buah beri — menggantung, jadi poros putarnya di atas.
   name: berry-pink | berry-cream | berry-red | sprig-gold */
export function BerrySprig({
  name = "berry-pink",
  className = "",
  anim = "flutter",
  delay = 0.5,
  height = "h-20",
}) {
  return (
    <Ornament
      name={name}
      anim={anim}
      delay={delay}
      sizes="90px"
      className={`pointer-events-none ${height} w-auto ${className}`}
    />
  );
}

/* Rumpun kecil / daun — pengisi ruang kosong.
   name: cluster-a | cluster-b | cluster-c | leaf-gold | leaf-large |
         bud-arch-cream | bud-arch-pink */
export function Cluster({
  name = "cluster-a",
  className = "",
  anim = "float",
  delay = 0.6,
  width = "w-16",
}) {
  return (
    <Ornament
      name={name}
      anim={anim}
      delay={delay}
      sizes="120px"
      className={`pointer-events-none ${width} h-auto ${className}`}
    />
  );
}

/* Masjid — dipakai sebagai siluet di kaki halaman */
export function MosqueArt({
  className = "",
  anim = "breathe",
  delay = 0.4,
  width = "w-64",
}) {
  return (
    <Ornament
      name="mosque"
      anim={anim}
      delay={delay}
      sizes="260px"
      className={`pointer-events-none ${width} h-auto ${className}`}
    />
  );
}

/* Rumah adat — aksen budaya Jambi */
export function PavilionArt({
  className = "",
  anim = "breathe",
  delay = 0.5,
  width = "w-40",
}) {
  return (
    <Ornament
      name="pavilion"
      anim={anim}
      delay={delay}
      sizes="180px"
      className={`pointer-events-none ${width} h-auto ${className}`}
    />
  );
}

/* Medali arabesque — pengganti pembatas emas */
export function MedallionArt({
  className = "",
  anim = "float",
  delay = 0.6,
  width = "w-14",
}) {
  return (
    <Ornament
      name="medallion"
      anim={anim}
      delay={delay}
      sizes="80px"
      className={`pointer-events-none ${width} h-auto ${className}`}
    />
  );
}

/* Lentera gantung */
export function LanternArt({
  className = "",
  anim = "sway",
  delay = 0.2,
  height = "h-24",
}) {
  return (
    <Ornament
      name="lantern"
      anim={anim}
      delay={delay}
      sizes="80px"
      className={`pointer-events-none ${height} w-auto ${className}`}
    />
  );
}
