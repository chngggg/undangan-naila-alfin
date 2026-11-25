import {
  Cormorant_Garamond,
  Playfair_Display,
  Great_Vibes,
  Montserrat,
  Amiri,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const vibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "The Wedding of Naila & Alfin — 26 Desember 2026",
  description:
    "Undangan pernikahan Naila Lajja Zulfa Faza & Alfin Ilhamy. Sabtu, 26 Desember 2026 di Pondok Majapahit 1, Mranggen, Demak.",
  openGraph: {
    title: "The Wedding of Naila & Alfin",
    description: "Sabtu, 26 Desember 2026 · Pondok Majapahit 1, Demak",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#f5ede2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${playfair.variable} ${vibes.variable} ${montserrat.variable} ${amiri.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
