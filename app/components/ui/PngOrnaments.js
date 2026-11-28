"use client";

import Image from "next/image";
import { img } from "../../lib/images";

/* ============================================================
   ORNAMEN PNG — set bunga cat air (revisi customer).
   Semua file ada di public/images/ornaments/.
   Berkas cadangan yang tidak dipakai: design-source/ornamen-cadangan/

   Cara pakai:
     <Ornament name="bloom-bouquet-a" anim="sway" className="h-56 w-auto" />

   `anim`: none | sway | float | drift | breathe | flutter
   `delay`: detik, supaya gerakannya tidak serempak
   ============================================================ */

/* ukuran asli tiap file — dipakai agar rasio tidak gepeng */
const ASSETS = {
  /* buket besar */
  "bloom-bouquet-a": { w: 358, h: 380 },
  "bloom-bouquet-b": { w: 346, h: 304 },
  "bloom-bouquet-c": { w: 376, h: 366 },
  "bloom-bouquet-d": { w: 359, h: 380 },
  /* semprot mendatar */
  "bloom-spray-a": { w: 352, h: 159 },
  "bloom-spray-b": { w: 347, h: 159 },
  "bloom-spray-c": { w: 375, h: 157 },
  "bloom-spray-d": { w: 353, h: 159 },
  /* bunga & tangkai tunggal */
  "bloom-maroon": { w: 120, h: 170 },
  "berry-pink": { w: 116, h: 185 },
  "berry-cream": { w: 121, h: 183 },
  "berry-red": { w: 100, h: 185 },
  "cluster-c": { w: 140, h: 188 },
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

/* Bunga tunggal — aksen kecil di dekat judul atau sudut kartu. */
export function Bloom({
  name = "bloom-maroon",
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
   name: berry-pink | berry-cream | berry-red */
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

/* Rumpun kecil — pengisi ruang kosong. */
export function Cluster({
  name = "cluster-c",
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
