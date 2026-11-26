"use client";

import { useSyncExternalStore } from "react";

/* Nama tamu dibaca dari URL (?to=Nama) — SSR-safe, tanpa hydration mismatch.
   Dipakai di Cover, RSVP, dan buku tamu. */
const noopSubscribe = () => () => {};

export function useGuestName() {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to") || params.get("kepada");
      return to ? decodeURIComponent(to.replace(/\+/g, " ")) : "";
    },
    () => ""
  );
}
