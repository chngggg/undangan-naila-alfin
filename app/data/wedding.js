// ============================================================
// SEMUA DATA UNDANGAN ADA DI SINI — cukup ubah file ini saja
// ============================================================

export const wedding = {
  // ---------- Pengantin ----------
  bride: {
    short: "Naila",
    full: "Naila Lajja Zulfa Faza, S.Si",
    order: "Putri",
    father: "Bapak Saiful Munir (Alm)",
    mother: "Ibu Anisah, S.Pd.I",
    address: "Bandungrejo, Mranggen, Demak",
    origin: "Jawa",
  },
  groom: {
    short: "Alfin",
    full: "Alfin Ilhamy, S.Pd",
    order: "Putra",
    father: "Bapak Muhammad Darmaji (Alm)",
    mother: "Ibu Jama'ah",
    address: "Tebo, Jambi",
    origin: "Jambi",
  },

  // ---------- Acara ----------
  // tanggal dalam format ISO, waktu lokal WIB (UTC+7)
  event: {
    isoDate: "2026-12-26T08:00:00+07:00",
    dateLabel: "Sabtu, 26 Desember 2026",
    dayLabel: "Sabtu",
    dateShort: "26 . 12 . 2026",
    akad: { label: "Akad Nikah", time: "08.00 WIB" },
    resepsi: { label: "Resepsi", time: "10.00 – 12.00 WIB" },
    venue: "Pondok Majapahit 1",
    address: "RT.07/RW.04 Blok R5, Bandungrejo, Mranggen, Demak",
    mapsQuery:
      "Pondok Majapahit 1, Bandungrejo, Mranggen, Demak, Jawa Tengah",
    mapsUrl: "https://maps.app.goo.gl/NX8CH4v9frRY1EQa7",
    mapsEmbed: "-7.020358,110.508686",
  },

  // ---------- Teks ----------
  quote: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    latin:
      "Wa min āyātihī an khalaqa lakum min anfusikum azwājal litaskunū ilayhā wa ja'ala baynakum mawaddataw wa raḥmah.",
    translation:
      "\"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu dapat ketenangan hati dan menjadikan di antaramu rasa kasih dan sayang.\"",
    source: "QS. Ar-Rum: 21",
  },
  opening:
    "Maha Suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan.",
  intention:
    "Ya Allah, perkenankanlah kami menyatukan langkah dan izinkan kami menikahkan putra putri kami pada 26 Desember 2026.",
  doa: "Semoga Allah memberkahimu dan memberkahi atasmu serta mengumpulkan kamu berdua dalam kebaikan.",
  closingVerse:
    "بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
  thanks: "Terima kasih atas doa dan restu yang diberikan kepada kami.",
  hashtag: "#NailaAlfinForever",
};

// Ganti dengan nomor rekening / e-wallet kalian
export const gifts = [
  {
    type: "Transfer Bank",
    name: "BRI",
    number: "043501046433501",
    holder: "Alfin Ilhamy",
  },
  {
    type: "Transfer Bank",
    name: "Mandiri",
    number: "1350023076910",
    holder: "Naila Lajja Zulfa Faza",
  },
];

export const music = "/audio/music.mp3";
