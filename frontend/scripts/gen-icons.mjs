// Dependency-free brand-icon generator for Aura Manufacturers.
//
// Rasterizes the luxury cream/gold brand mark (a gold tote bag with a ring
// handle on a cream rounded tile) into real PNG binaries using only Node's
// built-in `zlib`, then packs the small sizes into a multi-resolution
// favicon.ico. No sharp/canvas/imagemagick required, so it is safe to run in
// CI and on any machine.
//
//   node scripts/gen-icons.mjs
//
// Re-run this whenever the brand mark below changes. Outputs are committed as
// static assets, so production never executes this script.

import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FRONTEND = join(__dirname, "..");
const APP = join(FRONTEND, "src", "app");
const PUBLIC = join(FRONTEND, "public");

// ---- Brand palette (from tailwind.config.ts) -----------------------------
const CREAM = [250, 247, 242]; // #FAF7F2  — light tile background
const GOLD = [201, 169, 97]; //  #C9A961  — brand gold (bag + handle fill)
const COGNAC = [92, 74, 51]; //   #5C4A33  — outline that defines the silhouette

// ---- Geometry, all in a 0..32 design space (matches icon.svg viewBox) -----
const VB = 32;

function roundRect(u, v, cx, cy, hx, hy, r) {
  const dx = Math.abs(u - cx) - hx + r;
  const dy = Math.abs(v - cy) - hy + r;
  const ox = Math.max(dx, 0);
  const oy = Math.max(dy, 0);
  return Math.hypot(ox, oy) + Math.min(Math.max(dx, dy), 0) - r <= 0;
}
// Half of a ring (the upper arc only) — used for the bag's loop handles.
const handle = (u, v, cx, cy, R, half) =>
  v <= cy + 0.2 && Math.abs(Math.hypot(u - cx, v - cy) - R) <= half;

// Signed distance to a simple polygon (negative = inside). Lets us draw the
// tapered shopping-bag body with a clean cognac outline by offsetting.
function polySDF(px, py, V) {
  let d = (px - V[0][0]) ** 2 + (py - V[0][1]) ** 2;
  let s = 1;
  const n = V.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const [vix, viy] = V[i];
    const [vjx, vjy] = V[j];
    const ex = vjx - vix,
      ey = vjy - viy;
    const wx = px - vix,
      wy = py - viy;
    const t = Math.max(0, Math.min(1, (wx * ex + wy * ey) / (ex * ex + ey * ey)));
    const bx = wx - ex * t,
      by = wy - ey * t;
    d = Math.min(d, bx * bx + by * by);
    const c1 = py >= viy,
      c2 = py < vjy,
      c3 = ex * wy > ey * wx;
    if ((c1 && c2 && c3) || (!c1 && !c2 && !c3)) s = -s;
  }
  return s * Math.sqrt(d);
}

// Tapered bag body: slightly wider at the bottom (a shopper/tote silhouette).
const BODY = [
  [9.4, 13.4], // top-left
  [22.6, 13.4], // top-right
  [24.0, 24.4], // bottom-right
  [8.0, 24.4], // bottom-left
];

// Returns the final RGBA (over transparent) for a point in design space.
// `tile` controls the background: "rounded" for favicons/tabs, "full" for
// maskable Android icons (full-bleed cream so the OS circle/squircle mask
// never clips into transparency).
function sample(u, v, tile) {
  const insideTile =
    tile === "full" ? true : roundRect(u, v, 16, 16, 15.0, 15.0, 6.4);
  if (!insideTile) return [0, 0, 0, 0];

  let c = CREAM;

  // Two loop handles rising from the bag's mouth (drawn first; the body
  // covers where they meet the rim). Two loops read unmistakably as a handbag.
  if (handle(u, v, 12.7, 13.4, 3.0, 1.2)) c = COGNAC; // outline
  if (handle(u, v, 19.3, 13.4, 3.0, 1.2)) c = COGNAC;
  if (handle(u, v, 12.7, 13.4, 3.0, 0.72)) c = GOLD; // fill
  if (handle(u, v, 19.3, 13.4, 3.0, 0.72)) c = GOLD;

  // Bag body: cognac outline offset, then gold fill on top.
  const sd = polySDF(u, v, BODY);
  if (sd <= 0.62) c = COGNAC;
  if (sd <= 0) c = GOLD;

  return [c[0], c[1], c[2], 255];
}

// Render an RGBA buffer of side `size`, supersampled for clean antialiasing.
function render(size, { maskable = false } = {}) {
  const tile = maskable ? "full" : "rounded";
  // Maskable icons need a safe-zone: shrink the mark to ~70% around centre.
  const scale = maskable ? 0.7 : 1;
  const ss = Math.max(1, Math.min(4, Math.floor(1024 / size))); // subsamples/axis
  const buf = Buffer.alloc(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let rA = 0,
        gA = 0,
        bA = 0,
        aA = 0;
      for (let sy = 0; sy < ss; sy++) {
        for (let sx = 0; sx < ss; sx++) {
          let u = ((x + (sx + 0.5) / ss) / size) * VB;
          let v = ((y + (sy + 0.5) / ss) / size) * VB;
          if (scale !== 1) {
            u = 16 + (u - 16) / scale;
            v = 16 + (v - 16) / scale;
          }
          const [r, g, b, a] = sample(u, v, tile);
          // Premultiply so edges don't darken/fringe when averaged.
          rA += (r * a) / 255;
          gA += (g * a) / 255;
          bA += (b * a) / 255;
          aA += a;
        }
      }
      const n = ss * ss;
      const a = aA / n;
      const i = (y * size + x) * 4;
      if (a > 0) {
        buf[i] = Math.round((rA / n / a) * 255);
        buf[i + 1] = Math.round((gA / n / a) * 255);
        buf[i + 2] = Math.round((bA / n / a) * 255);
      }
      buf[i + 3] = Math.round(a);
    }
  }
  return buf;
}

// ---- Minimal PNG encoder (8-bit RGBA, no external deps) -------------------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "latin1");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}
function encodePNG(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type RGBA
  // 10,11,12 = compression/filter/interlace = 0
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0; // filter: None
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ---- ICO packer (embeds PNG entries; supported by all modern targets) -----
function encodeICO(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);
  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  const blobs = [];
  entries.forEach((e, idx) => {
    const o = idx * 16;
    dir[o] = e.size >= 256 ? 0 : e.size; // width
    dir[o + 1] = e.size >= 256 ? 0 : e.size; // height
    dir[o + 2] = 0; // palette
    dir[o + 3] = 0; // reserved
    dir.writeUInt16LE(1, o + 4); // colour planes
    dir.writeUInt16LE(32, o + 6); // bits per pixel
    dir.writeUInt32LE(e.png.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += e.png.length;
    blobs.push(e.png);
  });
  return Buffer.concat([header, dir, ...blobs]);
}

// ---- Build everything ------------------------------------------------------
mkdirSync(PUBLIC, { recursive: true });
const png = (size, opts) => encodePNG(size, render(size, opts));

const write = (p, buf) => {
  writeFileSync(p, buf);
  console.log(`  ${(buf.length / 1024).toFixed(1).padStart(7)} KB  ${p}`);
};

console.log("Generating brand icons…");

// favicon.ico — multi-resolution (16/32/48), classic browsers + Google Search.
write(
  join(APP, "favicon.ico"),
  encodeICO([16, 32, 48].map((size) => ({ size, png: png(size) }))),
);

// App Router file conventions (auto-linked by Next).
write(join(APP, "icon.png"), png(96)); //   general PNG favicon fallback
write(join(APP, "apple-icon.png"), png(180)); // iOS home screen

// PWA / Android home-screen icons referenced by manifest.ts.
write(join(PUBLIC, "icon-192.png"), png(192));
write(join(PUBLIC, "icon-512.png"), png(512));
write(join(PUBLIC, "icon-maskable-512.png"), png(512, { maskable: true }));

console.log("Done.");
