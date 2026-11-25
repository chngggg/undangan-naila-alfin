"use client";

import { motion } from "framer-motion";

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

/* Judul halaman: label kecil + judul serif + garis */
export function SectionTitle({ kicker, title, script, className = "" }) {
  return (
    <div className={`text-center ${className}`}>
      {kicker && (
        <p className="font-body text-[10px] uppercase tracking-luxe text-dusty">
          {kicker}
        </p>
      )}
      {script && (
        <p className="font-script text-3xl text-mahogany-soft/80 mt-3">{script}</p>
      )}
      {title && (
        <h2 className="font-title text-[26px] leading-tight text-mahogany mt-1">
          {title}
        </h2>
      )}
      <div className="mt-5 flex justify-center text-champagne">
        <span className="block h-px w-16 bg-gradient-to-r from-transparent via-champagne to-transparent" />
      </div>
    </div>
  );
}
