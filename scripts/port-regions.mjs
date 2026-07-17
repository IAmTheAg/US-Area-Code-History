// One-shot migration: rescale every hand-drawn region shape and label in
// src/data/regions/*.ts from the old us.svg coordinate space (viewBox
// 0 0 1000 589) to the usa_counties.svg space (viewBox 0 0 989.98 627.07).
//
//   node scripts/port-regions.mjs        (run from app/)
//
// The mapping is a per-state affine fit: old state bbox -> new state bbox.
// Region shapes are deliberately rough, so a bbox fit is plenty; expect the
// usual per-state visual check with the year slider afterwards. Coordinates
// quoted in comments (city checks etc.) are NOT rewritten and go stale.
//
// MUST run while src/data/states.ts still holds the OLD outlines — that is
// where the old bboxes come from. Run this before extract-counties.mjs.

import fs from 'node:fs';
import path from 'node:path';
import {
  REPO_ROOT,
  parseCountiesSvg,
  parseOldStatesTs,
  bboxOfRings,
} from './lib/svgmap.mjs';

const STATES_TS = path.join(REPO_ROOT, 'app/src/data/states.ts');
const REGIONS_DIR = path.join(REPO_ROOT, 'app/src/data/regions');

const statesSrc = fs.readFileSync(STATES_TS, 'utf8');
if (!statesSrc.includes("'0 0 1000 589'") && !statesSrc.includes('0 0 1000 589')) {
  console.error(
    'states.ts is not in the old us.svg coordinate space (viewBox 0 0 1000 589).\n' +
      'Regions were probably already ported — refusing to transform them twice.',
  );
  process.exit(1);
}

const oldStates = parseOldStatesTs(STATES_TS);
const { states: newStates } = parseCountiesSvg();

const fits = new Map();
for (const [id, rings] of oldStates) {
  if (!newStates.has(id)) continue;
  const o = bboxOfRings([rings]);
  const n = bboxOfRings(newStates.get(id).map((c) => c.rings));
  const sane =
    [o.minX, o.minY, n.minX, n.minY].every(Number.isFinite) &&
    [o.w, o.h, n.w, n.h].every((v) => Number.isFinite(v) && v > 0);
  if (!sane) {
    console.error(`${id}: degenerate bbox (old ${JSON.stringify(o)}, new ${JSON.stringify(n)}) — aborting before touching any file.`);
    process.exit(1);
  }
  fits.set(id, {
    fx: (x) => n.minX + ((x - o.minX) * n.w) / o.w,
    fy: (y) => n.minY + ((y - o.minY) * n.h) / o.h,
    sx: n.w / o.w,
    sy: n.h / o.h,
  });
}

const round1 = (v) => String(Math.round(v * 10) / 10);
const NUM = String.raw`-?\d+(?:\.\d+)?`;

let filesChanged = 0;
for (const file of fs.readdirSync(REGIONS_DIR).sort()) {
  const id = file.replace(/\.ts$/, '');
  if (!/^[A-Z]{2}$/.test(id)) continue;
  const fit = fits.get(id);
  if (!fit) {
    console.warn(`${id}: no bbox fit available, skipped`);
    continue;
  }
  const src = fs.readFileSync(path.join(REGIONS_DIR, file), 'utf8');
  let touched = 0;
  const out = src
    .replace(/d: '([^']*)'/g, (m, d) => {
      touched++;
      const nd = d.replace(
        new RegExp(`(${NUM}),(${NUM})`, 'g'),
        (_, x, y) => `${round1(fit.fx(Number(x)))},${round1(fit.fy(Number(y)))}`,
      );
      return `d: '${nd}'`;
    })
    .replace(new RegExp(`labelX: (${NUM})`, 'g'), (m, x) => {
      touched++;
      return `labelX: ${round1(fit.fx(Number(x)))}`;
    })
    .replace(new RegExp(`labelY: (${NUM})`, 'g'), (m, y) => {
      touched++;
      return `labelY: ${round1(fit.fy(Number(y)))}`;
    });
  if (touched) {
    fs.writeFileSync(path.join(REGIONS_DIR, file), out);
    filesChanged++;
    console.log(
      `${id}: ${touched} values rescaled (scale x${fit.sx.toFixed(3)} y${fit.sy.toFixed(3)})`,
    );
  }
}
console.log(`\n${filesChanged} region files ported.`);
