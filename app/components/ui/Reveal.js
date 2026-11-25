"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "./Ornaments";

/* Wrapper animasi masuk yang lembut (fade + naik sedikit) */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Judul halaman — mengikuti referensi:
   label kecil · judul script besar · subjudul italic · pembatas emas */
export function SectionTitle({ kicker, title, script, className = "" }) {
  return (
    <div className={`text-center ${className}`}>
      {kicker && (
        <p className="font-body text-[9px] uppercase tracking-luxe text-dusty">
          {kicker}
        </p>
      )}
      {script && (
        <p className="mt-2 font-script text-[40px] leading-none text-mahogany">
          {script}
        </p>
      )}
      {title && (
        <h2 className="mt-3 font-couple text-[15px] italic leading-snug text-mahogany-soft/90">
          {title}
        </h2>
      )}
      <div className="mt-4 flex justify-center text-champagne">
        <GoldDivider width={152} />
      </div>
    </div>
  );
}
