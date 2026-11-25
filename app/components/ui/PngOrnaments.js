"use client";

import Image from "next/image";
import { img } from "../../lib/images";

/* ============================================================
   ORNAMEN PNG — bunga cat air, masjid, rumah adat, lentera,
   medali. Semua file ada di public/images/ornaments/.

   Cara pakai:
     <Ornament name="floral-tall" anim="sway" className="h-56 w-auto ..." />

   `anim`: none | sway | float | drift | breathe
   `delay`: detik, supaya gerakannya tidak serempak
   ============================================================ */

/* ukuran asli tiap file — dipakai agar rasio tidak gepeng */
const ASSETS = {
  "floral-tall": { w: 556, h: 984 },
  "floral-wide-a": { w: 780, h: 471 },
  "floral-wide-b": { w: 780, h: 382 },
  mosque: { w: 760, h: 460 },
  pavilion: { w: 648, h: 524 },
  arch: { w: 264, h: 292 },
  medallion: { w: 168, h: 160 },
  "floral-top": { w: 180, h: 288 },
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
      className={`h-auto w-auto ${blend ? "png-orn" : ""} ${animCls} ${className}`}
      style={{ "--orn-delay": `${delay}s` }}
    />
  );
}

/* ---- komposisi siap pakai ---- */

/* Bunga tinggi di satu sudut — dipakai cover & halaman lain */
export function CornerFloral({
  side = "left",
  className = "",
  anim = "sway",
  delay = 0.2,
  height = "h-56",
  inset = null,
}) {
  const pos = inset || (side === "left" ? "-left-6" : "-right-6");
  return (
    <Ornament
      name="floral-tall"
      anim={anim}
      delay={delay}
      sizes="200px"
      className={`pointer-events-none absolute bottom-0 ${height} w-auto opacity-95 ${pos} ${
        side === "right" ? "-scale-x-100" : ""
      } ${className}`}
    />
  );
}

/* Semprot bunga mendatar — untuk kaki halaman */
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
      name={variant === "a" ? "floral-wide-a" : "floral-wide-b"}
      anim={anim}
      delay={delay}
      sizes="240px"
      className={`pointer-events-none absolute bottom-0 ${width} h-auto opacity-95 ${
        side === "left" ? "-left-6" : "-right-6"
      } ${side === "right" ? "-scale-x-100" : ""} ${className}`}
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
