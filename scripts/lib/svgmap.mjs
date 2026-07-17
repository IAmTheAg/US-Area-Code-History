// Shared SVG-map parsing helpers for the codegen scripts.
// Used by extract-counties.mjs and port-regions.mjs.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../..',
);

// Census state FIPS code -> USPS id. County path ids in usa_counties.svg are
// "c" + state FIPS + county FIPS, which is how counties get attributed to
// states (the <g id="StateName"> labels are only used for logging — one of
// them is misspelled "Tennesse").
export const FIPS_TO_ID = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA', '08': 'CO',
  '09': 'CT', '10': 'DE', '11': 'DC', '12': 'FL', '13': 'GA', '15': 'HI',
  '16': 'ID', '17': 'IL', '18': 'IN', '19': 'IA', '20': 'KS', '21': 'KY',
  '22': 'LA', '23': 'ME', '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN',
  '28': 'MS', '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH',
  '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND', '39': 'OH',
  '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI', '45': 'SC', '46': 'SD',
  '47': 'TN', '48': 'TX', '49': 'UT', '50': 'VT', '51': 'VA', '53': 'WA',
  '54': 'WV', '55': 'WI', '56': 'WY',
};

export const ID_TO_NAME = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
  CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
  DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii',
  ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
  KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
  VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia',
  WI: 'Wisconsin', WY: 'Wyoming',
};

/**
 * Flatten an SVG path into an array of closed polylines ("rings", first
 * point NOT repeated at the end). Supports M/L/H/V/C/Z absolute+relative,
 * which covers both usa_counties.svg and the old states.ts paths. Curves
 * are sampled into line segments (fine at map scale; region shapes are
 * deliberately rough).
 */
export function flattenPath(d, curveSamples = 4) {
  const toks = d.match(/[A-Za-z]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  const rings = [];
  let cur = [];
  let x = 0, y = 0, sx = 0, sy = 0;
  let cmd = null;
  let i = 0;
  const num = () => {
    const v = Number(toks[i++]);
    if (Number.isNaN(v)) throw new Error(`bad number near token ${i} in path`);
    return v;
  };
  const closeRing = () => {
    if (cur.length >= 3) rings.push(cur);
    cur = [];
  };
  while (i < toks.length) {
    const t = toks[i];
    if (/^[A-Za-z]$/.test(t)) {
      cmd = t;
      i++;
      if (cmd === 'Z' || cmd === 'z') {
        closeRing();
        x = sx; y = sy;
        cmd = null;
      }
      continue;
    }
    if (cmd === 'M' || cmd === 'm') {
      const dx = num(), dy = num();
      if (cmd === 'm') { x += dx; y += dy; } else { x = dx; y = dy; }
      closeRing(); // an unclosed previous subpath still counts as a ring
      sx = x; sy = y;
      cur = [[x, y]];
      cmd = cmd === 'm' ? 'l' : 'L'; // subsequent pairs are implicit linetos
    } else if (cmd === 'L' || cmd === 'l') {
      const dx = num(), dy = num();
      if (cmd === 'l') { x += dx; y += dy; } else { x = dx; y = dy; }
      cur.push([x, y]);
    } else if (cmd === 'H' || cmd === 'h') {
      const v = num();
      x = cmd === 'h' ? x + v : v;
      cur.push([x, y]);
    } else if (cmd === 'V' || cmd === 'v') {
      const v = num();
      y = cmd === 'v' ? y + v : v;
      cur.push([x, y]);
    } else if (cmd === 'C' || cmd === 'c') {
      let c1x = num(), c1y = num(), c2x = num(), c2y = num(), ex = num(), ey = num();
      if (cmd === 'c') { c1x += x; c1y += y; c2x += x; c2y += y; ex += x; ey += y; }
      for (let k = 1; k <= curveSamples; k++) {
        const s = k / curveSamples, m = 1 - s;
        cur.push([
          m * m * m * x + 3 * m * m * s * c1x + 3 * m * s * s * c2x + s * s * s * ex,
          m * m * m * y + 3 * m * m * s * c1y + 3 * m * s * s * c2y + s * s * s * ey,
        ]);
      }
      x = ex; y = ey;
    } else {
      throw new Error(`unsupported path command "${cmd}"`);
    }
  }
  closeRing();
  return rings;
}

const fmt = (n) => {
  const r = Math.round(n * 100) / 100;
  return Object.is(r, -0) ? '0' : String(r);
};

/** Serialize rings back to a compact path: M + implicit linetos + Z per ring. */
export function ringsToPath(rings) {
  return rings
    .map((ring) => {
      // Rounding can create consecutive duplicate points; drop them.
      const pts = [];
      for (const [px, py] of ring) {
        const p = `${fmt(px)} ${fmt(py)}`;
        if (p !== pts[pts.length - 1]) pts.push(p);
      }
      if (pts.length > 1 && pts[0] === pts[pts.length - 1]) pts.pop();
      if (pts.length < 3) return null;
      return `M${pts.join(' ')}Z`;
    })
    .filter(Boolean)
    .join('');
}

/** Signed area of a ring (positive = one winding, sign is irrelevant to callers). */
export function ringArea(ring) {
  let a = 0;
  for (let i = 0; i < ring.length; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    a += x1 * y2 - x2 * y1;
  }
  return a / 2;
}

export function bboxOfRings(ringLists) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const rings of ringLists) {
    for (const ring of rings) {
      for (const [x, y] of ring) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
}

/**
 * Parse usa_counties.svg. Returns:
 *   { viewBox: {w, h}, states: Map<stateId, Array<{fips, name, rings}>> }
 * The counties layer's translate(0 .10698) is baked into the coordinates.
 * County `name` is the <title> minus its ", XX" state suffix.
 */
export function parseCountiesSvg(svgPath = path.join(REPO_ROOT, 'usa_counties.svg')) {
  const svg = fs.readFileSync(svgPath, 'utf8');

  const wh = svg.match(/<svg width="([\d.]+)" height="([\d.]+)"/);
  if (!wh) throw new Error('could not read svg width/height');
  const viewBox = { w: Number(wh[1]), h: Number(wh[2]) };

  const tr = svg.match(/<g id="counties" transform="translate\(([-\d.]+) ([-\d.]+)\)">/);
  if (!tr) throw new Error('could not find the counties group / its transform');
  const tx = Number(tr[1]), ty = Number(tr[2]);

  const states = new Map();
  const pathRe = /<path\b[^>]*\bid="c(\d{5})"[^>]*>\s*<title>([^<]+)<\/title>/g;
  for (const m of svg.matchAll(pathRe)) {
    const [tag, fips, title] = [m[0], m[1], m[2]];
    const dm = tag.match(/\bd="([^"]+)"/);
    if (!dm) throw new Error(`county c${fips} has no d attribute`);
    const stateId = FIPS_TO_ID[fips.slice(0, 2)];
    if (!stateId) throw new Error(`unknown state FIPS in c${fips}`);
    // A handful of source titles use underscores ("New_Hanover, NC").
    const name = title.replace(/,\s*[A-Z]{2}$/, '').replace(/_/g, ' ');
    const rings = flattenPath(dm[1]).map((ring) =>
      ring.map(([x, y]) => [x + tx, y + ty]),
    );
    if (!states.has(stateId)) states.set(stateId, []);
    const list = states.get(stateId);
    if (list.some((c) => c.name === name)) {
      throw new Error(`duplicate county name "${name}" in ${stateId}`);
    }
    list.push({ fips: `c${fips}`, name, rings });
  }
  if (states.size !== 51) {
    throw new Error(`expected 51 states+DC, got ${states.size}`);
  }
  return { viewBox, states };
}

/** Parse the OLD states.ts (us.svg era) into Map<stateId, rings>. */
export function parseOldStatesTs(tsPath) {
  const src = fs.readFileSync(tsPath, 'utf8');
  const states = new Map();
  const re = /\{ id: "([A-Z]{2})", name: "[^"]+", d: "([^"]+)" \}/g;
  for (const m of src.matchAll(re)) {
    states.set(m[1], flattenPath(m[2]));
  }
  return states;
}
