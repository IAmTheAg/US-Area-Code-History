// Nebraska — 402 statewide (1947). 1954: 308 takes the west (North
// Platte, Grand Island, Kearney, Scottsbluff, McCook); 402 keeps the east
// (Omaha, Lincoln, Norfolk, Columbus, Hastings) PLUS the north-central
// tier (Valentine, Ainsworth, O'Neill — Cherry through Holt counties are
// 402 despite being far west). 531 overlaid the 402 area in 2011.
//
// Geometry: affine lat/lon fit anchored to the five straight-line border
// corners (NW, both panhandle-notch corners, SW of the notch, SE Rulo);
// residuals <0.8. NE bbox: x 459-595, y 195-257.
//
// The 1954 divider is a stair-step (simplified county lines), north to
// south: (503.4,208.8) down from the SD line at lon -101.3 (Valentine-402
// east, Gordon-308 west) -> east shelf at lat 42.3 to (541.6,208.4)
// (Ainsworth/O'Neill-402 north, Thedford/Burwell-308 south) -> south to
// (540.8,225) (Ord-308 west, Albion/Neligh-402 east) -> east to
// (559,224.8) (Genoa-308 south, Columbus-402 east) -> south to
// (558.5,234.7) (Osceola & York-402 east) -> west to (549.2,234.8)
// (Central City-308 north, Aurora-402 south) -> south to (548.8,241.4)
// (Grand Island-308 west) -> west to (541.5,241.5) -> south to the KS
// line (Hastings & Red Cloud-402 east, Kearney/Minden/Franklin-308 west).
import type { StateRegionList } from './types';

const regions: StateRegionList = [
  // 1947-1954: one code for the whole state.
  { code: '402', established: 1947, retired: 1954 },

  // 1954-present: 308 = the west, left of the staircase.
  { code: '308', established: 1954,
    d: 'M434.9,180.3 L433.7,207.8 L476.3,207.3 L475.4,227.3 L495.8,227.1 L495.2,239 L484.8,239.1 L484.4,247.1 L476.2,247.2 L475,274.7 L379.6,271.9 L379.6,185.1 Z',
    labelX: 435.5, labelY: 228.5, labelSize: 11 },

  // 1954-present: 402 = the east + north-central tier; 531 overlay 2011.
  { code: '402', established: 1954,
    d: 'M434.9,180.3 L433.7,207.8 L476.3,207.3 L475.4,227.3 L495.8,227.1 L495.2,239 L484.8,239.1 L484.4,247.1 L476.2,247.2 L475,274.7 L541.6,271.9 L541.6,215.3 L519.2,192.3 L496.9,185.1 Z',
    labelX: 508, labelY: 228.5, labelSize: 11,
    overlays: [{ code: '531', established: 2011 }] },
];

export default regions;
