"use client";

import { useEffect, useRef, useState } from "react";
import { music } from "../data/wedding";

export default function MusicPlayer({ active }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Coba autoplay begitu undangan dibuka (dipicu gesture user di Cover)
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !active) return;
    el.volume = 0.45;
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [active]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={music} loop preload="none" />
      <button
        onClick={toggle}
        aria-label={playing ? "Matikan musik" : "Nyalakan musik"}
        className={`fixed right-[max(1rem,calc(50vw-264px))] top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-champagne/70 bg-ivory/80 text-mahogany shadow-[0_4px_18px_rgba(74,42,38,0.12)] backdrop-blur transition-all duration-500 hover:bg-ivory ${
          active ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span
          className={`absolute inset-[3px] rounded-full border border-champagne/40 ${
            playing ? "animate-[spin_9s_linear_infinite]" : ""
          }`}
        />
        {playing ? (
          <svg viewBox="0 0 24 24" className="relative h-4 w-4" fill="currentColor">
            <rect x="7" y="6" width="2.6" height="12" rx="1" />
            <rect x="14.4" y="6" width="2.6" height="12" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="relative h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M9 18V7l9-2v11" />
            <circle cx="7" cy="18" r="2.2" />
            <circle cx="16" cy="16" r="2.2" />
          </svg>
        )}
      </button>
    </>
  );
}
