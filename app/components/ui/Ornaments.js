"use client";

/* ============================================================
   ORNAMEN — garis tipis, motif Jawa (kawung/parang) &
   motif Jambi (angso duo / tampuk manggis)
   Semua SVG inline, warna mengikuti currentColor.
   ============================================================ */

// ---- Mihrab arch: lengkungan mihrab untuk cover ----
export function MihrabArch({ className = "", stroke = "currentColor", closed = false }) {
  return (
    <svg
      viewBox="0 0 300 420"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M8 412V170C8 92 72 24 150 8c78 16 142 84 142 162v242"
        stroke={stroke}
        strokeWidth="1"
        opacity="0.55"
      />
      <path
        d="M22 412V172c0-70 57-132 128-146 71 14 128 76 128 146v240"
        stroke={stroke}
        strokeWidth="0.6"
        opacity="0.35"
      />
      {closed && (
        <>
          <path d="M8 412h284" stroke={stroke} strokeWidth="1" opacity="0.55" />
          <path d="M22 412h256" stroke={stroke} strokeWidth="0.6" opacity="0.3" />
        </>
      )}
      <path
        d="M150 2l4.5 5.5-4.5 5.5-4.5-5.5L150 2Z"
        stroke={stroke}
        strokeWidth="0.8"
        opacity="0.7"
      />
    </svg>
  );
}

// ---- Kawung: motif Jawa, dipakai sebagai ornamen pinggir ----
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

// ---- Parang: garis diagonal berulang (motif Jawa) ----
export function ParangBand({ className = "", opacity = 0.35 }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M-10 ${28 + i * 10} C 10 ${4 + i * 10}, 30 ${4 + i * 10}, 50 ${28 + i * 10} S 90 ${52 + i * 10}, 130 ${28 + i * 10}`}
          stroke="currentColor"
          strokeWidth="0.9"
          opacity={opacity}
        />
      ))}
    </svg>
  );
}

// ---- Tampuk Manggis: aksen Jambi, bentuk kuncup ----
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

// ---- Angso Duo: sepasang angsa, aksen Jambi ----
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

// ---- Divider: garis + diamond + daun kecil ----
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

// ---- Corner flourish: bunga garis tipis untuk sudut kartu ----
export function CornerFlourish({ className = "", flip = false }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6">
        <path d="M4 4c0 34 10 56 40 68" />
        <path d="M4 4c34 0 56 10 68 40" />
        <path d="M4 26c0 16 6 28 22 34" opacity="0.55" />
        <path d="M26 4c16 0 28 6 34 22" opacity="0.55" />
        <path d="M30 30c8-2 14 2 16 10-8 2-14-2-16-10Z" />
        <circle cx="52" cy="52" r="1.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

// ---- Ornamen sudut halaman (motif batik tipis) ----
export function PageCorner({ className = "", rotate = 0 }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <g stroke="currentColor" strokeWidth="0.7" opacity="0.4">
        <ellipse cx="40" cy="40" rx="16" ry="26" transform="rotate(-45 40 40)" />
        <ellipse cx="40" cy="40" rx="26" ry="16" transform="rotate(-45 40 40)" />
        <ellipse cx="74" cy="24" rx="12" ry="20" transform="rotate(-45 74 24)" />
        <ellipse cx="24" cy="74" rx="20" ry="12" transform="rotate(-45 24 74)" />
        <path d="M4 4c40 6 70 36 76 76" opacity="0.5" />
      </g>
    </svg>
  );
}

/* ============================================================
   BINGKAI DAUN BERGERAK
   Sulur batik Jawa (kawung/parang) + Jambi (angso duo/tampuk
   manggis) yang menggantung di tepi halaman dan bergoyang.
   ============================================================ */

/* satu daun: garis luar + tulang daun */
function Leaf({ x, y, r, scale = 1, alt = false, delay = 0, opacity = 0.9 }) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${r}) scale(${scale})`}
      className={alt ? "leaf-alt" : "leaf"}
      style={{ animationDelay: `${delay}s` }}
      opacity={opacity}
    >
      <path
        d="M0 0C9 -6 15 -16 14 -26C4 -24 -3 -14 0 0Z"
        fill="currentColor"
        opacity="0.22"
      />
      <path
        d="M0 0C9 -6 15 -16 14 -26C4 -24 -3 -14 0 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <path d="M0 0C4 -9 8 -17 13 -25" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
    </g>
  );
}

/* sulur dengan beberapa daun — dipakai berulang di tepi */
export function LeafVine({ className = "", flip = false, seed = 0 }) {
  const leaves = [
    { x: 26, y: 60, r: -28, s: 1.0 },
    { x: 46, y: 118, r: 34, s: 0.85 },
    { x: 20, y: 168, r: -18, s: 1.1 },
    { x: 44, y: 226, r: 40, s: 0.8 },
    { x: 24, y: 282, r: -34, s: 0.95 },
    { x: 46, y: 340, r: 26, s: 0.9 },
    { x: 22, y: 396, r: -22, s: 1.0 },
    { x: 44, y: 452, r: 38, s: 0.82 },
  ];

  return (
    <svg
      viewBox="0 0 70 500"
      fill="none"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g className="vine-breathe" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.75">
        <path d="M34 -10C34 60 22 120 34 180C46 240 34 300 34 360C34 420 22 460 34 510" />
        <path d="M34 74C24 66 14 62 4 64" opacity="0.6" />
        <path d="M34 190C44 182 54 178 64 180" opacity="0.6" />
        <path d="M34 306C24 298 14 294 4 296" opacity="0.6" />
        <path d="M34 420C44 412 54 408 64 410" opacity="0.6" />
      </g>
      {leaves.map((l, i) => (
        <Leaf
          key={i}
          x={l.x}
          y={l.y}
          r={l.r}
          scale={l.s}
          alt={i % 2 === 0}
          delay={(seed + i * 0.7) % 5}
          opacity={i % 3 === 0 ? 0.95 : 0.8}
        />
      ))}
    </svg>
  );
}

/* bunga kecil (tampuk manggis) yang ikut bergoyang */
export function HangingBloom({ className = "", delay = 0 }) {
  return (
    <svg
      viewBox="0 0 40 90"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ animationDelay: `${delay}s` }}
    >
      <g className="leaf" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <path d="M20 0v54" opacity="0.7" />
        <path d="M20 54c0-10-6-16-13-18 7-2 13-8 13-18 0 10 6 16 13 18-7 2-13 8-13 18Z" />
        <circle cx="20" cy="54" r="1.8" fill="currentColor" stroke="none" />
        <path d="M20 66c-4 2-6 6-6 10M20 66c4 2 6 6 6 10" opacity="0.6" />
      </g>
    </svg>
  );
}

/* Bingkai penuh: sulur kiri-kanan + bunga gantung di tepi */
export function BatikLeafFrame({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <LeafVine className="absolute -left-3 top-[6%] h-[46%] w-14 text-dusty/60" seed={0} />
      <LeafVine className="absolute -left-4 bottom-[8%] h-[40%] w-14 text-champagne/80" flip seed={1.4} />
      <LeafVine className="absolute -right-3 top-[14%] h-[42%] w-14 text-champagne/80" flip seed={2.2} />
      <LeafVine className="absolute -right-4 bottom-[4%] h-[44%] w-14 text-dusty/60" seed={3.1} />
      <HangingBloom className="absolute left-1 top-0 h-16 w-7 text-champagne/70" delay={0.4} />
      <HangingBloom className="absolute right-2 top-0 h-20 w-8 text-dusty/60" delay={1.6} />
    </div>
  );
}

/* ============================================================
   ORNAMEN MAROON–CREAM (mengikuti referensi kolase)
   Bunga, lentera gantung, siluet masjid, lengkung berenda.
   ============================================================ */

/* satu kuntum bunga: kelopak bertumpuk + inti emas */
function Bloom({ cx, cy, r, fill, fill2, core = "#c6a15f", petals = 6 }) {
  return (
    <g>
      {Array.from({ length: petals }, (_, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy - r * 0.52}
          rx={r * 0.52}
          ry={r * 0.72}
          transform={`rotate(${(360 / petals) * i} ${cx} ${cy})`}
          fill={fill}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.44} fill={fill2} opacity="0.9" />
      <circle cx={cx} cy={cy} r={r * 0.16} fill={core} />
    </g>
  );
}

/* satu daun */
function LeafShape({ x, y, r, s = 1, fill }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0C10 -6 17 -18 15 -30C4 -27 -4 -15 0 0Z" fill={fill} opacity="0.92" />
      <path
        d="M0 0C4 -10 9 -19 14 -28"
        fill="none"
        stroke="#fbf6ed"
        strokeWidth="0.9"
        opacity="0.45"
      />
    </g>
  );
}

/* rangkaian bunga sudut — maroon, blush, cream, emas */
export function FloralCluster({ className = "", flip = false, variant = 0 }) {
  const maroon = "#6d2b31";
  const maroonDeep = "#4e1a1f";
  const blush = "#b77f7c";
  const cream = "#f2e2cd";
  const gold = "#c6a15f";
  const green = "#7d8471";

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* tangkai & sulur */}
      <g fill="none" stroke={green} strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
        <path d="M2 6C36 30 58 58 70 92" />
        <path d="M2 6C44 14 76 34 94 62" />
        <path d="M24 22C32 50 38 78 36 106" opacity="0.7" />
        <path d="M70 92C84 110 90 132 88 152" opacity="0.7" />
        <path d="M94 62C112 72 124 88 128 108" opacity="0.6" />
      </g>

      {/* daun */}
      <LeafShape x={34} y={34} r={-34} s={1.1} fill={green} />
      <LeafShape x={58} y={52} r={26} s={0.95} fill="#8c927f" />
      <LeafShape x={26} y={62} r={-12} s={0.9} fill={green} />
      <LeafShape x={80} y={80} r={44} s={1.0} fill="#8c927f" />
      <LeafShape x={46} y={94} r={-46} s={0.85} fill={green} />
      <LeafShape x={100} y={48} r={12} s={0.85} fill={green} />
      <LeafShape x={82} y={118} r={30} s={0.8} fill="#8c927f" />

      {/* bunga */}
      {variant === 0 ? (
        <>
          <Bloom cx={70} cy={92} r={32} fill={maroon} fill2={maroonDeep} />
          <Bloom cx={100} cy={62} r={23} fill={blush} fill2="#a06b68" />
          <Bloom cx={36} cy={46} r={19} fill={cream} fill2="#e8d5bd" core={gold} />
          <Bloom cx={90} cy={130} r={16} fill={maroon} fill2={maroonDeep} petals={5} />
          <Bloom cx={120} cy={98} r={12} fill={blush} fill2="#a06b68" petals={5} />
        </>
      ) : (
        <>
          <Bloom cx={74} cy={86} r={29} fill={blush} fill2="#a06b68" />
          <Bloom cx={42} cy={58} r={21} fill={maroon} fill2={maroonDeep} />
          <Bloom cx={104} cy={104} r={18} fill={cream} fill2="#e8d5bd" core={gold} />
          <Bloom cx={56} cy={120} r={14} fill={maroon} fill2={maroonDeep} petals={5} />
          <Bloom cx={112} cy={62} r={11} fill={cream} fill2="#e8d5bd" petals={5} />
        </>
      )}

      {/* kuncup & titik emas */}
      <ellipse cx="134" cy="76" rx="5" ry="8" transform="rotate(24 134 76)" fill={maroon} opacity="0.9" />
      <ellipse cx="18" cy="76" rx="4.5" ry="7" transform="rotate(-30 18 76)" fill={maroon} opacity="0.9" />
      <g fill={gold} opacity="0.75">
        <circle cx="126" cy="120" r="2" />
        <circle cx="28" cy="30" r="2" />
        <circle cx="96" cy="148" r="1.8" />
      </g>
    </svg>
  );
}

/* lentera gantung emas (ikut bergoyang) */
export function Lantern({ className = "", delay = 0 }) {
  return (
    <svg
      viewBox="0 0 60 180"
      className={className}
      aria-hidden="true"
      style={{ animationDelay: `${delay}s` }}
    >
      <g className="leaf" stroke="currentColor" fill="none" strokeWidth="1.1" strokeLinejoin="round">
        <path d="M30 0v40" opacity="0.6" />
        <path d="M19 52c0-5 5-9 11-9s11 4 11 9v3H19Z" fill="currentColor" opacity="0.3" />
        <path d="M19 55h22l6 9-6 5H19l-6-5z" fill="currentColor" opacity="0.16" />
        <path d="M15 69h30v38c0 11-7 19-15 19s-15-8-15-19z" fill="currentColor" opacity="0.12" />
        <path d="M15 69h30M15 107h30" opacity="0.55" />
        <path d="M23 74v30M30 72v34M37 74v30" opacity="0.3" />
        <path d="M24 126h12l-3 7h-6z" fill="currentColor" opacity="0.25" />
        <path d="M30 133v12" opacity="0.45" />
        <circle cx="30" cy="150" r="4.5" opacity="0.5" />
        <path d="M30 155v14" opacity="0.3" />
      </g>
    </svg>
  );
}

/* siluet masjid untuk kaki halaman */
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

/* lengkung berenda untuk cover & kartu */
export function OrnateArch({ className = "", scallop = true }) {
  return (
    <svg
      viewBox="0 0 300 460"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M6 454V182C6 96 72 26 150 8c78 18 144 88 144 174v272"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.75"
      />
      <path
        d="M18 454V184c0-78 60-142 132-158 72 16 132 80 132 158v270"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.5"
      />
      <path d="M6 454h288" stroke="currentColor" strokeWidth="1.2" opacity="0.75" />
      <path d="M18 454h264" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />
      <path d="M150 0l6 8-6 8-6-8 6-8Z" stroke="currentColor" strokeWidth="0.9" opacity="0.85" />
      <path d="M132 24h36" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      {scallop && (
        <path
          d="M18 434q9-10 18 0t18 0 18 0 18 0 18 0 18 0 18 0 18 0 18 0 18 0 18 0 18 0 18 0 18 0"
          stroke="currentColor"
          strokeWidth="0.7"
          opacity="0.5"
        />
      )}
    </svg>
  );
}

/* pembatas emas dengan permata */
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

/* sudut renda tipis */
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

