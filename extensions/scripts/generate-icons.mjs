import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Pixel art bitmaps ───────────────────────────────────────────────────────

// 5×7 font — used for 48px and 128px icons
const FONT_5x7 = {
  E: [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
  ],
  A: [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
  ],
  X: [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,0,1,0],
    [0,0,1,0,0],
    [0,1,0,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
  ],
};

// 3×5 font — used for 16px icon
const FONT_3x5 = {
  E: [
    [1,1,1],
    [1,0,0],
    [1,1,1],
    [1,0,0],
    [1,1,1],
  ],
  A: [
    [0,1,0],
    [1,0,1],
    [1,1,1],
    [1,0,1],
    [1,0,1],
  ],
  X: [
    [1,0,1],
    [1,0,1],
    [0,1,0],
    [1,0,1],
    [1,0,1],
  ],
};

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Returns true if (px, py) is inside a rounded rectangle */
function inRoundedRect(px, py, w, h, r) {
  const cx = Math.max(r, Math.min(w - 1 - r, px));
  const cy = Math.max(r, Math.min(h - 1 - r, py));
  const dx = px - cx;
  const dy = py - cy;
  return dx * dx + dy * dy <= r * r;
}

// ── Icon configs ─────────────────────────────────────────────────────────────

const CONFIGS = [
  { size: 128, scale: 4, font: FONT_5x7, cols: 5, rows: 7, gap: 8,  radius: 22 },
  { size:  48, scale: 2, font: FONT_5x7, cols: 5, rows: 7, gap: 4,  radius:  9 },
  { size:  16, scale: 1, font: FONT_3x5, cols: 3, rows: 5, gap: 1,  radius:  3 },
];

// ── Colours ───────────────────────────────────────────────────────────────────
// Emerald-500 (#10b981)
const BG_R = 16, BG_G = 185, BG_B = 129;

// ── Generate ──────────────────────────────────────────────────────────────────

const outDir = path.resolve(__dirname, '..', 'public', 'icons');
fs.mkdirSync(outDir, { recursive: true });

for (const { size, scale, font, cols, rows, gap, radius } of CONFIGS) {
  const lw = cols * scale;   // letter width in pixels
  const lh = rows * scale;   // letter height in pixels

  const totalW = 3 * lw + 2 * gap;
  const ox = Math.floor((size - totalW) / 2);  // x offset
  const oy = Math.floor((size - lh)    / 2);   // y offset

  const png = new PNG({ width: size, height: size, colorType: 6 });

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;

      if (!inRoundedRect(x, y, size, size, radius)) {
        png.data[i] = png.data[i+1] = png.data[i+2] = png.data[i+3] = 0;
        continue;
      }

      // Check each letter
      let hit = false;
      for (let ci = 0; ci < 3 && !hit; ci++) {
        const lx = ox + ci * (lw + gap);
        const bitmap = font[['E','A','X'][ci]];
        if (x >= lx && x < lx + lw && y >= oy && y < oy + lh) {
          const bx = Math.floor((x - lx) / scale);
          const by = Math.floor((y - oy) / scale);
          if (bitmap[by]?.[bx]) hit = true;
        }
      }

      if (hit) {
        // White text
        png.data[i] = png.data[i+1] = png.data[i+2] = 255;
      } else {
        // Emerald background
        png.data[i]   = BG_R;
        png.data[i+1] = BG_G;
        png.data[i+2] = BG_B;
      }
      png.data[i+3] = 255;
    }
  }

  const buf = PNG.sync.write(png);
  const file = path.join(outDir, `icon${size}.png`);
  fs.writeFileSync(file, buf);
  console.log(`✓ icon${size}.png`);
}

console.log(`\nIcons written to public/icons/`);
