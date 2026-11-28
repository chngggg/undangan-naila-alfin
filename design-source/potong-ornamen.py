#!/usr/bin/env python3
"""Potong lembar clipart bunga menjadi PNG transparan per elemen.

Latar lembar: putih netral 244-252 bertekstur + pola kotak-kotak samar.
Karena warna krem kelopak sangat dekat dengan latar, flood fill rapuh.
Yang dipakai: alpha dari jarak warna terhadap latar (soft threshold),
lalu warna di-unpremultiply dari putih supaya tidak ada halo.
"""
import os
from PIL import Image, ImageFilter

SRC = "/home/chengking/.hermes/cache/documents/native-inputs/4964ff477c7a439e98388f33a3ce4af663fd44ace5cee9f2ca97557a4b2fe5da/img_aae297a73f6c.png"
OUT = "/home/chengking/Project/undangan-naila-alfin/public/images/ornaments"

BOXES = [
    ("bloom-bouquet-a", 10, 11, 374, 397),
    ("bloom-bouquet-b", 389, 11, 741, 397),
    ("bloom-bouquet-c", 760, 11, 1142, 397),
    ("bloom-bouquet-d", 1161, 11, 1526, 397),
    ("bloom-spray-a", 14, 419, 372, 584),
    ("bloom-spray-b", 391, 419, 744, 584),
    ("bloom-spray-c", 762, 419, 1143, 584),
    ("bloom-spray-d", 1166, 419, 1525, 584),
    ("bloom-cream", 17, 600, 210, 791),
    ("bloom-burgundy", 236, 600, 413, 791),
    ("bloom-blush", 437, 600, 586, 791),
    ("bloom-rose", 613, 600, 794, 791),
    ("sprig-gold", 822, 600, 997, 791),
    ("berry-pink", 1043, 600, 1165, 791),
    ("berry-cream", 1208, 600, 1335, 791),
    ("berry-red", 1394, 600, 1500, 791),
    ("cluster-a", 10, 804, 177, 1010),
    ("leaf-gold", 194, 804, 335, 1010),
    ("cluster-b", 354, 804, 517, 1010),
    ("bud-arch-cream", 542, 804, 688, 1010),
    ("bud-arch-pink", 722, 804, 880, 1010),
    ("leaf-large", 913, 804, 1047, 1010),
    ("bloom-single", 1072, 804, 1211, 1010),
    ("bloom-maroon", 1229, 804, 1355, 1010),
    ("cluster-c", 1381, 804, 1527, 1010),
]

INSET = 3
T0, T1 = 12.0, 34.0        # rentang jarak warna -> alpha


def bg_color(crop):
    """Warna latar = median piksel tepi (dibulatkan)."""
    w, h = crop.size
    px = crop.load()
    vals = []
    for x in range(0, w, 2):
        vals += [px[x, 0], px[x, h - 1]]
    for y in range(0, h, 2):
        vals += [px[0, y], px[w - 1, y]]
    chans = sorted(v[i] for v in vals for i in range(3))
    med = chans[len(chans) // 2]
    return (med, med, med)


def soft_alpha(crop, bg):
    w, h = crop.size
    px = crop.load()
    a = Image.new("L", (w, h))
    ap = a.load()
    span = T1 - T0
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            d = max(abs(r - bg[0]), abs(g - bg[1]), abs(b - bg[2]))
            if d <= T0:
                ap[x, y] = 0
            elif d >= T1:
                ap[x, y] = 255
            else:
                t = (d - T0) / span
                ap[x, y] = int(255 * (t * t * (3 - 2 * t)))   # smoothstep
    return a


def unpremultiply(crop, alpha):
    """c = (c - 255*(1-a)) / a  — buang sisa putih di piksel semi-transparan."""
    out = crop.copy()
    op = out.load()
    ap = alpha.load()
    w, h = crop.size
    for y in range(h):
        for x in range(w):
            a = ap[x, y] / 255.0
            if a <= 0.04:
                op[x, y] = (0, 0, 0)
            elif a < 0.97:
                r, g, b = op[x, y]
                k = 255.0 * (1.0 - a)
                op[x, y] = (
                    max(0, min(255, round((r - k) / a))),
                    max(0, min(255, round((g - k) / a))),
                    max(0, min(255, round((b - k) / a))),
                )
    return out


def main():
    sheet = Image.open(SRC).convert("RGB")
    total = 0
    for name, x0, y0, x1, y1 in BOXES:
        crop = sheet.crop((x0 + INSET, y0 + INSET, x1 - INSET, y1 - INSET))
        bg = bg_color(crop)
        alpha = soft_alpha(crop, bg)
        rgb = unpremultiply(crop, alpha)

        img = rgb.convert("RGBA")
        img.putalpha(alpha)

        bb = alpha.point(lambda v: 255 if v > 10 else 0).getbbox()
        if bb:
            img = img.crop((max(0, bb[0] - 1), max(0, bb[1] - 1),
                            min(img.width, bb[2] + 1), min(img.height, bb[3] + 1)))

        path = os.path.join(OUT, f"{name}.png")
        img.save(path, optimize=True)
        kb = os.path.getsize(path) / 1024
        total += kb
        print(f"{name:18s} {img.size[0]:4d}x{img.size[1]:<4d} {kb:6.1f} KB  bg={bg[0]}")
    print(f"total {total/1024:.2f} MB")


if __name__ == "__main__":
    main()
