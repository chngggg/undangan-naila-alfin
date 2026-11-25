// Helper untuk memuat gambar dari public/images dengan versi (cache-busting).
//
// Pemakaian:
//   import { img } from "../lib/images";
//   <Image src={img("bride.png")} ... />
//
// `?v=` diisi hash isi file oleh scripts/gen-image-versions.mjs, jadi setiap
// kali gambar diganti, URL-nya ikut berubah dan cache Next.js tidak nyangkut.

import versions from "../data/image-versions.json";

export function img(name) {
  const v = versions?.[name];
  return v ? `/images/${name}?v=${v}` : `/images/${name}`;
}
