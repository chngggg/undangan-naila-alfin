"use client";

import { WideFloral } from "./PngOrnaments";

/* ============================================================
   ORNAMEN GARIS — SVG inline, warna mengikuti currentColor.
   Hanya yang masih dipakai halaman undangan:
     KawungBand · TampukManggis · AngsoDuo · Divider
     MosqueSkyline · GoldDivider · LaceCorner · OgeeArch
     SectionDecor
   Motif batik: kawung/parang (Jawa), angso duo & tampuk manggis
   (Jambi).
   ============================================================ */

export function KawungBand({ className = "", opacity = 0.5 }) {
  return (
    <svg
      viewBox="0 0 240 24"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} transform={`translate(${i * 40}, 0)`}>
          <ellipse cx="20" cy="12" rx="9" ry="6" stroke="currentColor" strokeWidth="0.8" opacity={opacity} />
          <ellipse cx="20" cy="12" rx="4" ry="2.5" stroke="currentColor" strokeWidth="0.6" opacity={opacity * 0.8} />
          <circle cx="0" cy="12" r="1" fill="currentColor" opacity={opacity} />
          <circle cx="40" cy="12" r="1" fill="currentColor" opacity={opacity} />
        </g>
      ))}
    </svg>
  );
}

export function TampukManggis({ className = "", opacity = 0.6 }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="0.9" opacity={opacity}>
        <path d="M40 8c0 10-6 16-14 18 8 2 14 8 14 18 0-10 6-16 14-18-8-2-14-8-14-18Z" />
        <path d="M40 44v22" />
        <path d="M40 52c-6 0-10-3-12-8M40 52c6 0 10-3 12-8" />
        <circle cx="40" cy="44" r="1.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function AngsoDuo({ className = "", opacity = 0.55 }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="0.9" opacity={opacity} strokeLinecap="round">
        <path d="M28 62c0-14 8-22 20-22 8 0 14 4 14 11 0 6-4 10-10 10-4 0-7-2-7-5" />
        <path d="M62 51c2-4 6-6 10-6" />
        <path d="M92 62c0-14-8-22-20-22-8 0-14 4-14 11 0 6 4 10 10 10 4 0 7-2 7-5" />
        <path d="M58 51c-2-4-6-6-10-6" />
        <path d="M18 68h84" opacity="0.5" />
      </g>
    </svg>
  );
}

export function Divider({ className = "", width = 180 }) {
  return (
    <svg
      viewBox="0 0 200 16"
      width={width}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 8h78" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />
      <path d="M122 8h78" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />
      <path d="M100 2l6 6-6 6-6-6 6-6Z" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="86" cy="8" r="1.4" fill="currentColor" opacity="0.7" />
      <circle cx="114" cy="8" r="1.4" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function MosqueSkyline({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 90"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <g fill="currentColor">
        <path d="M40 90V64c0-9 8-16 18-16s18 7 18 16v26Z" />
        <path d="M58 46c0-6-2-10-2-10s-2 4-2 10Z" />
        <path d="M92 90V44h6v46Z" />
        <path d="M95 44c0-5-3-8-3-8s-3 3-3 8Z" />
        <path d="M150 90V52c0-14 14-26 32-26s32 12 32 26v38Z" />
        <path d="M182 26c0-8-2-13-2-13s-2 5-2 13Z" />
        <path d="M250 90V62c0-10 9-18 20-18s20 8 20 18v28Z" />
        <path d="M310 90V40h7v50Z" />
        <path d="M313.5 40c0-6-3-9-3-9s-3 3-3 9Z" />
        <path d="M348 90V68c0-8 7-14 15-14s15 6 15 14v22Z" />
      </g>
    </svg>
  );
}

export function GoldDivider({ className = "", width = 180 }) {
  return (
    <svg
      viewBox="0 0 200 18"
      width={width}
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path d="M0 9h74" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      <path d="M126 9h74" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      <path d="M100 2l7 7-7 7-7-7 7-7Z" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="100" cy="9" r="2" fill="currentColor" />
      <circle cx="84" cy="9" r="1.5" fill="currentColor" opacity="0.75" />
      <circle cx="116" cy="9" r="1.5" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

export function LaceCorner({ className = "", rotate = 0 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      fill="none"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <g stroke="currentColor" strokeWidth="0.7" opacity="0.55">
        <path d="M4 4c34 0 62 12 80 34" />
        <path d="M4 4c0 34 12 62 34 80" />
        <path d="M4 22c26 2 48 14 62 34" opacity="0.6" />
        <path d="M22 4c2 26 14 48 34 62" opacity="0.6" />
        <circle cx="46" cy="46" r="3" />
        <path d="M30 30c8-4 14 2 12 10-8 2-14-2-12-10Z" opacity="0.7" />
      </g>
    </svg>
  );
}

export function OgeeArch({ className = "" }) {
  return (
    <svg
      viewBox="0 0 300 470"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
      fill="none"
    >
      {/* garis luar */}
      <path
        d="M7 463V212C7 170 25 141 55 119C85 97 116 66 150 11c34 55 65 86 95 108 30 22 48 51 48 93v251"
        stroke="currentColor"
        strokeWidth="1.3"
        opacity="0.8"
      />
      {/* garis dalam */}
      <path
        d="M21 463V216c0-37 16-63 44-84 30-22 62-53 85-100 23 47 55 78 85 100 28 21 44 47 44 84v247"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.5"
      />
      {/* alas */}
      <path d="M7 463h286" stroke="currentColor" strokeWidth="1.3" opacity="0.8" />
      <path d="M21 463h258" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />
      {/* puncak */}
      <path d="M150 0l5 7-5 7-5-7 5-7Z" stroke="currentColor" strokeWidth="0.9" opacity="0.9" />
      <circle cx="150" cy="24" r="1.6" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function SectionDecor({
  className = "",
  floral = "left",
  frame = true,
  tone = "light",
  variant = "a",
  floralSize = "w-36",
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {isDark ? (
        /* latar gelap: cukup pendar champagne hangat, jangan ditimpa krem */
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(198,161,95,0.24),transparent_62%)]" />
      ) : (
        <>
          {/* cahaya atas + vignette bawah */}
          <div className="absolute inset-0 bg-[radial-gradient(115%_70%_at_50%_0%,#fffdf9_0%,rgba(255,253,249,0)_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(95%_65%_at_50%_100%,rgba(176,142,110,0.16)_0%,rgba(176,142,110,0)_62%)]" />
        </>
      )}

      {/* semprot bunga PNG (hanya di latar terang) */}
      {floral !== "none" && !isDark && (
        <WideFloral
          side={floral}
          variant={variant}
          width={floralSize}
          delay={0.25}
          className="-bottom-10 opacity-80"
        />
      )}

      {/* bingkai garis rambut */}
      {frame && (
        <div
          className={`absolute inset-3 border ${
            isDark ? "border-champagne/20" : "border-mahogany/12"
          }`}
        />
      )}
    </div>
  );
}
