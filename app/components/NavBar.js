"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { id: "mempelai", label: "Mempelai", icon: "M12 20s-7-4.6-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.6C19 15.4 12 20 12 20Z" },
  { id: "acara", label: "Acara", icon: "M4 7h16v13H4zM8 3v4M16 3v4" },
  { id: "rsvp", label: "RSVP", icon: "M5 4h14v16l-7-4-7 4z" },
  { id: "buku-tamu", label: "Ucapan", icon: "M4 5h16v10H8l-4 4z" },
  { id: "hadiah", label: "Hadiah", icon: "M4 9h16v11H4zM4 9l2-4h5v4M20 9l-2-4h-5v4" },
];

export default function NavBar({ visible }) {
  const [active, setActive] = useState("mempelai");

  useEffect(() => {
    const ids = [...ITEMS.map((i) => i.id), "penutup"];
    const onScroll = () => {
      let current = "mempelai";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = id;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto max-w-[560px] px-4 pb-3">
        <div className="flex items-center justify-between rounded-full border border-champagne/60 bg-ivory/85 px-2 py-1.5 shadow-[0_-4px_24px_rgba(74,42,38,0.1)] backdrop-blur-md">
          {ITEMS.map((item) => {
            const on = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`flex flex-1 flex-col items-center gap-1 rounded-full px-1 py-1.5 transition-colors ${
                  on ? "text-mahogany" : "text-mahogany/55"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[15px] w-[15px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={on ? "1.6" : "1.2"}
                  strokeLinejoin="round"
                >
                  <path d={item.icon} />
                </svg>
                <span className="font-body text-[7.5px] uppercase tracking-wide-2">
                  {item.label}
                </span>
                <span
                  className={`h-px w-4 transition-all ${
                    on ? "bg-champagne" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
