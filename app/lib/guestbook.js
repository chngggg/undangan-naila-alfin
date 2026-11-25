// Penyimpanan sementara (localStorage) untuk RSVP & buku tamu.
// Ganti fungsi-fungsi ini dengan fetch ke API/database saat backend siap.

const KEY = "naila-alfin-guestbook";
export const GUESTBOOK_EVENT = "guestbook:update";

export function readGuestbook() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addGuestbookEntry(entry) {
  if (typeof window === "undefined") return [];
  const list = readGuestbook();
  const next = [
    {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      ...entry,
    },
    ...list,
  ].slice(0, 200);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(GUESTBOOK_EVENT));
  } catch {
    /* storage penuh / diblokir */
  }
  return next;
}

export function formatDateID(iso) {
  try {
    return new Date(iso).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}
