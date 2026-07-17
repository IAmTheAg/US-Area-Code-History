// Oregon — 503 statewide (1947). 1995: 541 takes everything outside the
// northwest corner (Eugene, Bend, Medford, the coast below Cascade Head,
// the gorge from Cascade Locks east); 503 keeps Portland metro, Salem and
// the north coast (Astoria, Tillamook). Overlays: 971 on 503 (2000),
// 458 on 541 (2010). Two regions, four codes.
//
// Geometry: affine lat/lon fit anchored to the SW/SE 42nd-parallel
// corners, the NE Snake/46N tripoint and the Wallula corner where the
// border leaves the Columbia; residuals ~0.4 but the conic curvature
// shifts the far NW ~5 units east of the drawn outline — divider and
// cities shift together, so sidedness holds. OR bbox: x 161-289,
// y 82-190. 541 is a full-state base rect with the 503 corner painted
// above it (MA 508-style).
//
// The 1995 divider, coast to Columbia: coast (176.5,103.1) between
// Tillamook-503 (182.9,95.7) and Lincoln City-541 (178.1,105.0) ->
// (186.0,108.7) -> (192.9,112.5) south of Salem/Dallas-503, north of
// Albany/Corvallis-541 -> (204.8,117.7) keeping the Santiam canyon
// (Stayton, Mill City, Detroit - all 503) north -> up the Cascades
// (209.0,108.9) -> crosses the Columbia at (209.9,98.0), east of
// Portland (200.0,98.9), west of Cascade Locks-541 (212.2,98.8).
// Known miss: Government Camp (212.6,106.7) is really 503 but lands
// 541-side; ski village, accepted.
import type { StateRegionList } from './types';

const regions: StateRegionList = [
  // 1947-1995: one code for the whole state.
  { code: '503', established: 1947, retired: 1995 },

  // 1995-present: 541 = full-state base (everything outside the NW corner,
  // which paints above it); 458 overlay 2010.
  { code: '541', established: 1995,
    d: 'M42.1,48.8 L202.7,48.8 L202.7,187.2 L42.1,187.2 Z',
    labelX: 114.4, labelY: 115.2,
    overlays: [{ code: '458', established: 2010 }] },

  // 1995-present: 503 = the northwest corner, painted above 541; 971
  // overlay 2000.
  { code: '503', established: 1995,
    d: 'M56.1,77.5 L66.8,80.9 L77.7,87.4 L85.6,91.7 L99.2,97.7 L104,87.6 L105.1,75.1 L106,68.9 L106.3,61.4 L97.2,54.5 L80,52.2 L61.6,68.2 Z',
    labelX: 89.1, labelY: 83.1, labelSize: 9,
    overlays: [{ code: '971', established: 2000 }] },
];

export default regions;
