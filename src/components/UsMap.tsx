import { useState, useRef, useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { MAP_VIEWBOX, STATES } from '../data/states';
import { COUNTIES_BY_STATE } from '../data/counties';
import { REGIONS_BY_STATE, type Region } from '../data/regions';
import type { Overlay } from '../data/regions/types';
import { ALL_CODES } from '../data/allcodes';
import { ORIGINAL_CODES } from '../data/originalCodes';
import './UsMap.css';

interface ViewBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

const [, , MAP_W, MAP_H] = MAP_VIEWBOX.split(' ').map(Number);
const FULL_VIEW: ViewBox = { x: 0, y: 0, w: MAP_W, h: MAP_H };
const ASPECT = FULL_VIEW.w / FULL_VIEW.h;
const ZOOM_MS = 500;
const ZOOM_PAD = 0.3; // padding around a zoomed state, as a fraction of its size
const MIN_VIEW_W = 110; // never zoom tighter than this (keeps small states sane)
const DC_DOT = { x: 858.3, y: 258.2, r: 4.5 }; // DC is invisible at national scale

interface TooltipState {
  x: number;
  y: number;
  stateId: string;
  /** Set when hovering a sub-state region shape. */
  code?: string;
}

interface CoordBadge {
  sx: number; // container-relative screen position
  sy: number;
  mx: number; // map (viewBox) coordinates
  my: number;
  county?: string; // "Clark, NV" — the county under the cursor
}

interface LabelSpot {
  x: number;
  y: number;
  fontSize: number;
}

// Bounding-box centers land in water or odd corners for some shapes; nudge
// them as fractions of the bbox (default is 0.5/0.5).
const LABEL_TWEAKS: Record<string, { fx?: number; fy?: number }> = {
  AK: { fx: 0.55, fy: 0.4 }, // bbox includes the Aleutians
  FL: { fx: 0.62, fy: 0.45 }, // bbox includes the panhandle
  HI: { fx: 0.35, fy: 0.35 },
  ID: { fy: 0.62 },
  LA: { fx: 0.35, fy: 0.4 },
  MD: { fx: 0.42 },
  VA: { fx: 0.55 },
};

const MIN_LABEL_SIZE = 10; // skip labels on shapes smaller than this (DC)

// States that ever have a region with an escape-hatch `d` shape (superset
// over all years, used for static clipPath defs). County-based regions need
// no clipping — county shapes already tile the state exactly.
const SHAPED_STATES = new Set(
  [...REGIONS_BY_STATE.entries()]
    .filter(([, regions]) => regions.some((r) => r.d))
    .map(([stateId]) => stateId),
);

// All county borders as one non-interactive path (drawn above region fills).
const COUNTY_LINES_D = Object.values(COUNTIES_BY_STATE)
  .flatMap((byName) => Object.values(byName))
  .join('');

// Fill per code (`stateId:code` -> css color), so neighboring same-color
// regions stay distinguishable. Codes are indexed by order of first
// appearance in the state's file (≈ chronological), separately per color
// class (original green / later blue) — a shade is only ever wasted on a
// code of the other class, never on a same-color neighbor. The index walks
// four well-separated lightness steps (i % 4: codes introduced together —
// usually adjacent — differ maximally) and drifts the hue a notch every
// four codes, giving 16 distinct-but-family-matched fills per class; even
// code-heavy states (FL: 15 blues) get no repeats. i=0 reproduces the old
// base colors (#c0d3e9 / #cde0c6).
const CODE_FILLS = new Map<string, string>();
{
  // Five lightness anchors, cycled; every five codes the "band" advances,
  // shifting hue and saturation together (toward gray-purple, then vivid-
  // teal, ...). Codes sharing a lightness step are 5 apart in introduction
  // order AND sit in different bands, so their tints still separate.
  const LIGHTNESS = [83, 72, 90, 66, 78];
  const HUE_DRIFT = [0, 22, -18, 40];
  const SAT_DRIFT = [0, -11, 9, -7];
  const fill = (baseHue: number, baseSat: number, i: number) => {
    const band = Math.floor(i / 5) % 4;
    return `hsl(${baseHue + HUE_DRIFT[band]}, ${baseSat + SAT_DRIFT[band]}%, ${LIGHTNESS[i % 5]}%)`;
  };
  for (const [stateId, regions] of REGIONS_BY_STATE) {
    const originals: string[] = [];
    const laters: string[] = [];
    for (const r of regions) {
      const group = ORIGINAL_CODES.has(r.code) ? originals : laters;
      if (!group.includes(r.code)) group.push(r.code);
    }
    originals.forEach((code, i) => CODE_FILLS.set(`${stateId}:${code}`, fill(103, 30, i)));
    laters.forEach((code, i) => CODE_FILLS.set(`${stateId}:${code}`, fill(212, 47, i)));
  }
}

/** True if the region has its own shape (isn't "the whole state"). */
const hasShape = (r: Region) => Boolean(r.d || r.counties);

// The concatenated path of a county-based region, cached (region lists are
// static, so cache keys are stable).
const countiesPathCache = new Map<string, string>();
function countiesPath(stateId: string, names: readonly string[]): string {
  const key = `${stateId}:${names.join('|')}`;
  let d = countiesPathCache.get(key);
  if (d === undefined) {
    const byName = COUNTIES_BY_STATE[stateId] ?? {};
    d = names
      .map((name) => {
        const p = byName[name];
        if (!p) console.warn(`UsMap: unknown county "${name}" in ${stateId}`);
        return p ?? '';
      })
      .join('');
    countiesPathCache.set(key, d);
  }
  return d;
}

/** Resolved render shape of a region with its own geometry. */
function regionShape(stateId: string, region: Region): { d: string; clip: boolean } | null {
  if (region.d) return { d: region.d, clip: true };
  if (region.counties) return { d: countiesPath(stateId, region.counties), clip: false };
  return null;
}

// Point-in-county lookup for the "q" coordinate tool: parses every county's
// polyline path once, on first use (the generated paths are "M x y x y ...Z"
// only). Even-odd ray casting; a county's islands are separate rings.
interface CountyHit {
  stateId: string;
  name: string;
  bbox: [number, number, number, number];
  rings: number[][]; // flat [x0, y0, x1, y1, ...] per ring
}
let countyHitIndex: CountyHit[] | null = null;
function countyAt(x: number, y: number): CountyHit | undefined {
  if (!countyHitIndex) {
    countyHitIndex = [];
    for (const [stateId, byName] of Object.entries(COUNTIES_BY_STATE)) {
      for (const [name, d] of Object.entries(byName)) {
        const rings = d
          .split('M')
          .filter(Boolean)
          .map((seg) => (seg.match(/-?[\d.]+/g) ?? []).map(Number));
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const ring of rings) {
          for (let i = 0; i + 1 < ring.length; i += 2) {
            if (ring[i] < minX) minX = ring[i];
            if (ring[i] > maxX) maxX = ring[i];
            if (ring[i + 1] < minY) minY = ring[i + 1];
            if (ring[i + 1] > maxY) maxY = ring[i + 1];
          }
        }
        countyHitIndex.push({ stateId, name, bbox: [minX, minY, maxX, maxY], rings });
      }
    }
  }
  for (const county of countyHitIndex) {
    const [minX, minY, maxX, maxY] = county.bbox;
    if (x < minX || x > maxX || y < minY || y > maxY) continue;
    let inside = false;
    for (const ring of county.rings) {
      const n = ring.length / 2;
      for (let i = 0, j = n - 1; i < n; j = i++) {
        const xi = ring[i * 2], yi = ring[i * 2 + 1];
        const xj = ring[j * 2], yj = ring[j * 2 + 1];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
    }
    if (inside) return county;
  }
  return undefined;
}

// Label spot for county-based regions: bbox center of the county union
// (generated county paths are plain "M x y x y ... Z" polylines).
const countyLabelCache = new Map<string, LabelSpot>();
function countyLabelSpot(stateId: string, region: Region): LabelSpot {
  const key = `${stateId}:${region.counties!.join('|')}`;
  let spot = countyLabelCache.get(key);
  if (spot === undefined) {
    const nums = countiesPath(stateId, region.counties!).match(/-?[\d.]+/g) ?? [];
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let i = 0; i + 1 < nums.length; i += 2) {
      const x = Number(nums[i]);
      const y = Number(nums[i + 1]);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    spot = {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
      fontSize: Math.max(8, Math.min(15, Math.min(maxX - minX, maxY - minY) * 0.3)),
    };
    countyLabelCache.set(key, spot);
  }
  return spot;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface UsMapProps {
  year: number;
  testMode?: boolean;
  onTestModeChange?: (on: boolean) => void;
}

export default function UsMap({ year, testMode = false, onTestModeChange }: UsMapProps) {
  const [view, setView] = useState<ViewBox>(FULL_VIEW);
  const [zoomed, setZoomed] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [labelSpots, setLabelSpots] = useState<Record<string, LabelSpot>>({});
  const [qHeld, setQHeld] = useState(false);
  const [zHeld, setZHeld] = useState(false);
  const [coordBadge, setCoordBadge] = useState<CoordBadge | null>(null);
  const [copied, setCopied] = useState(false);
  // Test mode: guesses and check results keyed by region key
  // (stateId for whole-state regions, `${stateId}:${code}` for shaped ones).
  const [guesses, setGuesses] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, 'right' | 'wrong' | 'partial'>>({});
  const [editing, setEditing] = useState<{ key: string; sx: number; sy: number } | null>(null);
  const [draft, setDraft] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef(new Map<string, SVGPathElement>());
  const viewRef = useRef<ViewBox>(FULL_VIEW);
  const rafRef = useRef(0);
  const copiedTimer = useRef(0);

  // Regions and overlays visible at the selected year.
  const activeByState = useMemo(() => {
    const map = new Map<string, Region[]>();
    for (const [stateId, regions] of REGIONS_BY_STATE) {
      const active = regions.filter(
        (r) => r.established <= year && (r.retired === undefined || year < r.retired),
      );
      if (active.length) map.set(stateId, active);
    }
    return map;
  }, [year]);

  // Data-entry marker: a state gets a red outline while allcodes.ts lists
  // an active code for it that the region data doesn't mention yet (as a
  // region or an overlay). Single-code-forever states pass automatically.
  const todoStates = useMemo(() => {
    const covered = new Map<string, Set<string>>();
    for (const [stateId, regions] of REGIONS_BY_STATE) {
      const codes = new Set<string>();
      for (const r of regions) {
        codes.add(r.code);
        for (const o of r.overlays ?? []) codes.add(o.code);
      }
      covered.set(stateId, codes);
    }
    const todo = new Set<string>();
    for (const info of Object.values(ALL_CODES)) {
      if (info.status !== 'active') continue;
      const codes = covered.get(info.region);
      if (codes && !codes.has(info.code)) todo.add(info.region);
    }
    return todo;
  }, []);

  const activeOverlays = useCallback(
    (region: Region): Overlay[] =>
      (region.overlays ?? []).filter(
        (o) => o.established <= year && (o.retired === undefined || year < o.retired),
      ),
    [year],
  );

  // Fill encodes data about the code: washed green = original code,
  // washed blue = later code, stripes = an ORIGINAL code with an overlay
  // on top. A later-code region with overlays stays solid blue — the
  // stripes only mark original-plus-overlay.
  const fillFor = useCallback(
    (region: Region): { className: string; style?: React.CSSProperties } => {
      const original = ORIGINAL_CODES.has(region.code);
      if (original && activeOverlays(region).length) {
        // Inline style because a CSS class fill would override the pattern.
        return { className: '', style: { fill: 'url(#stripes-og)' } };
      }
      const fill = CODE_FILLS.get(`${region.stateId}:${region.code}`);
      return {
        className: original ? ' original' : ' later',
        style: fill ? { fill } : undefined,
      };
    },
    [activeOverlays],
  );

  // In test mode all data coloring is off; results paint right/wrong/gray.
  const testFill = useCallback(
    (key: string): string => {
      const result = results[key];
      if (result === 'right') return ' test-right';
      if (result === 'wrong') return ' test-wrong';
      if (result === 'partial') return ' test-partial';
      return '';
    },
    [results],
  );

  const regionFill = useCallback(
    (key: string, region: Region): { className: string; style?: React.CSSProperties } =>
      testMode ? { className: testFill(key) } : fillFor(region),
    [testMode, testFill, fillFor],
  );

  // Reset test state whenever test mode toggles.
  useEffect(() => {
    setGuesses({});
    setResults({});
    setEditing(null);
    setDraft('');
  }, [testMode]);

  useLayoutEffect(() => {
    const spots: Record<string, LabelSpot> = {};
    for (const [id, el] of pathRefs.current) {
      const box = el.getBBox();
      if (Math.min(box.width, box.height) < MIN_LABEL_SIZE) continue;
      const { fx = 0.5, fy = 0.5 } = LABEL_TWEAKS[id] ?? {};
      spots[id] = {
        x: box.x + box.width * fx,
        y: box.y + box.height * fy,
        fontSize: Math.max(8, Math.min(15, Math.min(box.width, box.height) * 0.3)),
      };
    }
    setLabelSpots(spots);
  }, []);

  // Hold "q" to read map coordinates under the cursor; click to copy them.
  // Hold "z" and click to zoom in further, centered on the cursor.
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.repeat) return;
      if (e.key.toLowerCase() === 'q') setQHeld(true);
      if (e.key.toLowerCase() === 'z') setZHeld(true);
    };
    const up = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'q') {
        setQHeld(false);
        setCoordBadge(null);
      }
      if (e.key.toLowerCase() === 'z') setZHeld(false);
    };
    const blur = () => {
      setQHeld(false);
      setZHeld(false);
      setCoordBadge(null);
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', blur);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', blur);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(copiedTimer.current), []);

  const animateTo = useCallback((target: ViewBox) => {
    cancelAnimationFrame(rafRef.current);
    const from = viewRef.current;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ZOOM_MS);
      const e = easeInOutCubic(t);
      const v: ViewBox = {
        x: from.x + (target.x - from.x) * e,
        y: from.y + (target.y - from.y) * e,
        w: from.w + (target.w - from.w) * e,
        h: from.h + (target.h - from.h) * e,
      };
      viewRef.current = v;
      setView(v);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const zoomOut = useCallback(() => {
    setZoomed(null);
    animateTo(FULL_VIEW);
  }, [animateTo]);

  const toggleZoom = (stateId: string) => {
    if (zoomed === stateId) {
      zoomOut();
      return;
    }
    const el = pathRefs.current.get(stateId);
    if (!el) return;
    const b = el.getBBox();
    const pad = Math.max(b.width, b.height) * ZOOM_PAD;
    let x = b.x - pad;
    let y = b.y - pad;
    let w = b.width + pad * 2;
    let h = b.height + pad * 2;
    if (w / h > ASPECT) {
      const nh = w / ASPECT;
      y -= (nh - h) / 2;
      h = nh;
    } else {
      const nw = h * ASPECT;
      x -= (nw - w) / 2;
      w = nw;
    }
    if (w < MIN_VIEW_W) {
      const nh = MIN_VIEW_W / ASPECT;
      x -= (MIN_VIEW_W - w) / 2;
      y -= (nh - h) / 2;
      w = MIN_VIEW_W;
      h = nh;
    }
    setZoomed(stateId);
    animateTo({ x, y, w, h });
  };

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') zoomOut();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomed, zoomOut]);

  // z+click: halve the view around the cursor (down to a metro-reading
  // floor); Escape or a background click still resets.
  const handleZoomInClick = (e: React.MouseEvent) => {
    if (!zHeld) return;
    e.stopPropagation();
    const svg = svgRef.current;
    const matrix = svg?.getScreenCTM();
    if (!svg || !matrix) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(matrix.inverse());
    const cur = viewRef.current;
    const w = Math.max(cur.w / 2, 8);
    const h = w / ASPECT;
    setZoomed((z) => z ?? 'point');
    animateTo({ x: p.x - w / 2, y: p.y - h / 2, w, h });
  };

  const handleMove = useCallback((e: React.MouseEvent, stateId: string, code?: string) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, stateId, code });
  }, []);

  const clearHover = useCallback(() => {
    setHovered(null);
    setTooltip(null);
  }, []);

  // Click behavior: normally zoom; in test mode open the answer input
  // (shift-click still zooms so tiny regions stay reachable).
  const handleRegionClick = (e: React.MouseEvent, stateId: string, key: string) => {
    if (qHeld) return;
    if (!testMode || e.shiftKey) {
      toggleZoom(stateId);
      return;
    }
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDraft(guesses[key] ?? '');
    setEditing({ key, sx: e.clientX - rect.left, sy: e.clientY - rect.top });
  };

  const commitDraft = () => {
    if (!editing) return;
    const key = editing.key;
    setGuesses((g) => {
      const next = { ...g };
      if (draft) next[key] = draft;
      else delete next[key];
      return next;
    });
    // A changed answer goes back to "unchecked" gray.
    setResults((r) => {
      if (!(key in r)) return r;
      const next = { ...r };
      delete next[key];
      return next;
    });
    setEditing(null);
    setDraft('');
  };

  const regionForKey = useCallback(
    (key: string): Region | undefined => {
      if (key.includes(':')) {
        const [stateId, code] = key.split(':');
        return (activeByState.get(stateId) ?? []).find((r) => r.code === code && hasShape(r));
      }
      const list = activeByState.get(key) ?? [];
      return list.length === 1 && !hasShape(list[0]) ? list[0] : undefined;
    },
    [activeByState],
  );

  // Guesses may name overlays with slashes ("203/475"), order-insensitive.
  // right = exactly the region's full code set; wrong = nothing correct;
  // partial = something correct but not the complete set.
  const runCheck = () => {
    const next: Record<string, 'right' | 'wrong' | 'partial'> = {};
    for (const [key, guess] of Object.entries(guesses)) {
      const region = regionForKey(key);
      if (!region) continue;
      const accepted = new Set([region.code, ...(region.overlays ?? [])
        .filter((o) => o.established <= year && (o.retired === undefined || year < o.retired))
        .map((o) => o.code)]);
      const guessed = new Set(guess.split('/').filter(Boolean));
      const hits = [...guessed].filter((c) => accepted.has(c)).length;
      next[key] =
        hits === 0
          ? 'wrong'
          : hits === accepted.size && guessed.size === accepted.size
            ? 'right'
            : 'partial';
    }
    setResults(next);
  };

  const handleSvgMove = (e: React.MouseEvent) => {
    if (!qHeld) return;
    const svg = svgRef.current;
    const rect = containerRef.current?.getBoundingClientRect();
    const matrix = svg?.getScreenCTM();
    if (!svg || !rect || !matrix) return;
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(matrix.inverse());
    const county = countyAt(p.x, p.y);
    setCoordBadge({
      sx: e.clientX - rect.left,
      sy: e.clientY - rect.top,
      mx: p.x,
      my: p.y,
      county: county && `${county.name}, ${county.stateId}`,
    });
  };

  const handleCoordCopy = (e: React.MouseEvent) => {
    if (!qHeld || !coordBadge) return;
    e.stopPropagation(); // keep the click from zooming
    navigator.clipboard?.writeText(`${coordBadge.mx.toFixed(1)},${coordBadge.my.toFixed(1)}`);
    setCopied(true);
    window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => setCopied(false), 900);
  };

  // Counter-scale labels so they only grow mildly on screen while zoomed in.
  const zoomScale = FULL_VIEW.w / view.w;
  const labelScale = Math.pow(zoomScale, 0.55);

  const hoveredState = STATES.find((s) => s.id === tooltip?.stateId);
  const hoveredRegions = hoveredState ? activeByState.get(hoveredState.id) : undefined;

  const hoverOutline = (() => {
    if (!hovered) return null;
    if (hovered === 'DC') {
      return (
        <circle
          cx={DC_DOT.x}
          cy={DC_DOT.y}
          r={DC_DOT.r}
          className="usmap-hover-outline"
          vectorEffect="non-scaling-stroke"
        />
      );
    }
    if (hovered.includes(':')) {
      const [stateId, code] = hovered.split(':');
      // All same-code shapes, so noncontiguous codes (FL's 386) outline whole.
      const shapes = (activeByState.get(stateId) ?? [])
        .filter((r) => r.code === code)
        .map((r) => regionShape(stateId, r))
        .filter((s): s is NonNullable<typeof s> => s !== null);
      if (!shapes.length) return null;
      return (
        <>
          {shapes.map((shape, i) => (
            <g key={i} clipPath={shape.clip ? `url(#clip-${stateId})` : undefined}>
              <path d={shape.d} className="usmap-hover-outline" vectorEffect="non-scaling-stroke" />
            </g>
          ))}
        </>
      );
    }
    const state = STATES.find((s) => s.id === hovered);
    if (!state) return null;
    return <path d={state.d} className="usmap-hover-outline" vectorEffect="non-scaling-stroke" />;
  })();

  return (
    <div className="usmap-container" ref={containerRef}>
      <svg
        ref={svgRef}
        viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
        className="usmap-svg"
        role="img"
        aria-label="Map of the United States"
        onMouseMove={handleSvgMove}
        onClickCapture={(e) => {
          handleCoordCopy(e);
          handleZoomInClick(e);
        }}
        onClick={(e) => {
          if (zoomed && e.target === e.currentTarget) zoomOut();
        }}
      >
        <defs>
          {STATES.filter((s) => SHAPED_STATES.has(s.id)).map((s) => (
            <clipPath id={`clip-${s.id}`} key={s.id}>
              <path d={s.d} />
            </clipPath>
          ))}
          {/* Overlay stripes: base color of the region + a blue overlay band. */}
          <pattern
            id="stripes-og"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="7" height="7" fill="#cde0c6" />
            <rect width="3.5" height="7" fill="#c0d3e9" />
          </pattern>
        </defs>

        {STATES.map((state) => {
          const active = activeByState.get(state.id) ?? [];
          const whole = active.length === 1 && !hasShape(active[0]) ? active[0] : undefined;
          const fill = whole
            ? regionFill(state.id, whole)
            : { className: testMode ? testFill(state.id) : '' };
          return (
            <path
              key={state.id}
              id={state.id}
              d={state.d}
              ref={(el) => {
                if (el) pathRefs.current.set(state.id, el);
                else pathRefs.current.delete(state.id);
              }}
              className={`usmap-state${fill.className}${hovered === state.id ? ' hovered' : ''}${zoomed === state.id ? ' zoomed-here' : ''}`}
              style={fill.style}
              vectorEffect="non-scaling-stroke"
              onMouseEnter={() => setHovered(state.id)}
              onMouseLeave={clearHover}
              onMouseMove={(e) => handleMove(e, state.id)}
              onClick={(e) => handleRegionClick(e, state.id, state.id)}
            />
          );
        })}

        {/* Sub-state region shapes, in array order (later paints on top).
            Escape-hatch `d` shapes are clipped to the state outline; county
            unions need no clip. */}
        {STATES.map((state) => {
          const shaped = (activeByState.get(state.id) ?? []).filter(hasShape);
          if (!shaped.length) return null;
          return (
            <g key={`regions-${state.id}`}>
              {shaped.map((region, i) => {
                const shape = regionShape(state.id, region)!;
                // Interaction key: shared by same-code siblings (the two
                // 386 blobs hover/answer as one). React key: unique — key
                // collisions leave ghost nodes behind on year changes.
                const key = `${state.id}:${region.code}`;
                const fill = regionFill(key, region);
                return (
                  <path
                    key={`${key}#${i}`}
                    d={shape.d}
                    clipPath={shape.clip ? `url(#clip-${state.id})` : undefined}
                    className={`usmap-state${shape.clip ? '' : ' county-shape'}${fill.className}${hovered === key ? ' hovered' : ''}${zoomed === state.id ? ' zoomed-here' : ''}`}
                    style={fill.style}
                    vectorEffect="non-scaling-stroke"
                    onMouseEnter={() => setHovered(key)}
                    onMouseLeave={clearHover}
                    onMouseMove={(e) => handleMove(e, state.id, region.code)}
                    onClick={(e) => handleRegionClick(e, state.id, key)}
                  />
                );
              })}
            </g>
          );
        })}

        {/* County borders, purely cosmetic. */}
        <path d={COUNTY_LINES_D} className="usmap-countylines" vectorEffect="non-scaling-stroke" />

        {/* Redraw shaped states' outer border at full strength above the regions. */}
        {STATES.filter(
          (s) => (activeByState.get(s.id) ?? []).some(hasShape),
        ).map((state) => (
          <path
            key={`outline-${state.id}`}
            d={state.d}
            className="usmap-outline"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Red outline = this state's code history isn't encoded yet. */}
        {STATES.filter((s) => todoStates.has(s.id)).map((state) => (
          <path
            key={`todo-${state.id}`}
            d={state.d}
            className="usmap-todo-outline"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        <circle
          cx={DC_DOT.x}
          cy={DC_DOT.y}
          r={DC_DOT.r}
          className={`usmap-dc-dot${testMode ? testFill('DC') : ' original'}${hovered === 'DC' ? ' hovered' : ''}${zoomScale > 4 ? ' hidden' : ''}`}
          vectorEffect="non-scaling-stroke"
          onMouseEnter={() => setHovered('DC')}
          onMouseLeave={clearHover}
          onMouseMove={(e) => handleMove(e, 'DC')}
          onClick={(e) => handleRegionClick(e, 'DC', 'DC')}
        />

        {STATES.map((state) => {
          const active = activeByState.get(state.id) ?? [];
          return active.map((region, i) => {
            let x: number, y: number, fontSize: number, key: string;
            if (region.counties) {
              const spot = countyLabelSpot(state.id, region);
              x = region.labelX ?? spot.x;
              y = region.labelY ?? spot.y;
              fontSize = region.labelSize ?? spot.fontSize;
              key = `${state.id}:${region.code}`;
            } else if (region.d) {
              if (region.labelX === undefined || region.labelY === undefined) return null;
              x = region.labelX;
              y = region.labelY;
              fontSize = region.labelSize ?? 12;
              key = `${state.id}:${region.code}`;
            } else {
              if (active.length !== 1) return null;
              const spot = labelSpots[state.id];
              if (!spot) return null;
              x = spot.x;
              y = spot.y;
              fontSize = spot.fontSize;
              key = state.id;
            }
            let text: string;
            if (testMode) {
              // Never show the answers; show what the user typed.
              const guess = guesses[key];
              if (!guess) return null;
              text = guess;
            } else {
              const overlays = activeOverlays(region);
              text = [region.code, ...overlays.map((o) => o.code)].join('/');
              if (overlays.length) fontSize *= 0.72;
            }
            return (
              <text
                key={`label-${key}#${i}`}
                x={x}
                y={y}
                fontSize={fontSize / labelScale}
                className="usmap-code-label"
              >
                {text}
              </text>
            );
          });
        })}

        {hoverOutline}
      </svg>

      <div className="usmap-testpanel">
        <button
          type="button"
          className={`usmap-testbtn${testMode ? ' active' : ''}`}
          onClick={() => onTestModeChange?.(!testMode)}
        >
          {testMode ? 'Exit test' : 'Test'}
        </button>
        {testMode && (
          <>
            <button type="button" className="usmap-testbtn check" onClick={runCheck}>
              Check
            </button>
            <span className="usmap-testhint">
              click a region, type its code(s)
              <br />
              e.g. 203 or 203/475
              <br />
              (shift-click zooms)
            </span>
          </>
        )}
      </div>

      {editing && (
        <input
          className="usmap-test-input"
          style={{ left: editing.sx, top: editing.sy + 10 }}
          autoFocus
          maxLength={11}
          value={draft}
          onChange={(e) => {
            const v = e.target.value.replace(/[^\d/]/g, '').slice(0, 11);
            setDraft(v);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitDraft();
            if (e.key === 'Escape') {
              setEditing(null);
              setDraft('');
            }
          }}
          onBlur={commitDraft}
        />
      )}

      {tooltip && hoveredState && !qHeld && !editing && (() => {
        if (testMode) {
          return (
            <div
              className="usmap-tooltip"
              style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}
            >
              <strong>{hoveredState.name}</strong>
            </div>
          );
        }
        // A specific code when hovering a region shape or a single-code state.
        const region =
          (tooltip.code
            ? hoveredRegions?.find((r) => r.code === tooltip.code)
            : hoveredRegions?.length === 1
              ? hoveredRegions[0]
              : undefined);
        const overlays = region ? activeOverlays(region) : [];
        const info = region ? ALL_CODES[region.code] : undefined;
        return (
          <div
            className="usmap-tooltip"
            style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}
          >
            <strong>{hoveredState.name}</strong>
            <span className="usmap-tooltip-sub">
              {region
                ? overlays.length
                  ? `${region.code} + ${overlays
                      .map((o) => `${o.code} overlay (${o.established})`)
                      .join(' + ')}`
                  : region.code
                : hoveredRegions
                  ? hoveredRegions.map((r) => r.code).join(', ')
                  : 'no codes'}
            </span>
            {info && <span className="usmap-tooltip-desc">{info.description}</span>}
            {overlays.map((o) =>
              ALL_CODES[o.code] ? (
                <span key={o.code} className="usmap-tooltip-desc">
                  {o.code}: {ALL_CODES[o.code].description}
                </span>
              ) : null,
            )}
          </div>
        );
      })()}
      {qHeld && coordBadge && (
        <div
          className="usmap-coord-badge"
          style={{ left: coordBadge.sx + 14, top: coordBadge.sy + 14 }}
        >
          {coordBadge.mx.toFixed(1)}, {coordBadge.my.toFixed(1)}
          {coordBadge.county && <span className="usmap-coord-county">{coordBadge.county}</span>}
          <span className="usmap-coord-sub">{copied ? 'copied!' : 'click to copy'}</span>
        </div>
      )}
    </div>
  );
}
