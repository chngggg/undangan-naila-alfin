"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

import Cover from "./Cover";
import Opening from "./Opening";
import CoupleProfile from "./CoupleProfile";
import EventDetails from "./EventDetails";
import Countdown from "./Countdown";
import RSVP from "./RSVP";
import Wishes from "./Wishes";
import Gift from "./Gift";
import Closing from "./Closing";
import MusicPlayer from "./MusicPlayer";
import NavBar from "./NavBar";
import { useGuestName } from "../lib/useGuestName";

/* Urutan halaman undangan.
   Untuk menambah halaman: buat komponen di app/components,
   import di atas, lalu tambahkan satu baris di array PAGES. */
const PAGES = [
  { id: "pembuka", Component: Opening },
  { id: "mempelai", Component: CoupleProfile },
  { id: "acara", Component: EventDetails },
  { id: "countdown", Component: Countdown },
  { id: "rsvp", Component: RSVP },
  { id: "buku-tamu", Component: Wishes },
  { id: "hadiah", Component: Gift },
  { id: "penutup", Component: Closing },
];

export default function MainContent() {
  const [isOpen, setIsOpen] = useState(false);
  const guest = useGuestName();

  // Kunci scroll selama cover masih tampil
  useEffect(() => {
    document.body.style.overflow = isOpen ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative mx-auto min-h-screen w-full max-w-[560px] bg-cream lg:shadow-[0_24px_90px_-30px_rgba(74,42,38,0.45)]">
      <AnimatePresence mode="wait">
        {!isOpen && (
          <Cover key="cover" guest={guest} onOpen={() => setIsOpen(true)} />
        )}
      </AnimatePresence>

      <MusicPlayer active={isOpen} />
      <NavBar visible={isOpen} />

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full flex-col pb-20"
        >
          {PAGES.map(({ id, Component }) => (
            <section key={id} id={id} className="scroll-mt-0">
              <Component />
            </section>
          ))}
        </motion.div>
      )}
      </main>
    </MotionConfig>
  );
}
