// Oregon — 503 statewide (1947). 1995: 541 takes everything outside the
// northwest corner; 503 keeps Portland metro, Salem and the north coast
// (Astoria, Tillamook). Overlays: 971 on 503 (2000), 458 on 541 (2010).
// Two regions, four codes.
//
// County-based since the county-map port: 503 = the nine NW counties
// (Clatsop, Columbia, Tillamook, Washington, Multnomah, Clackamas,
// Yamhill, Polk, Marion). City checks from the old drawn divider all
// carry over as county membership: Tillamook and Dallas (Polk) 503 vs
// Lincoln City and Albany/Corvallis (Linn/Benton) 541; the Santiam
// canyon (Stayton, Detroit — Marion) 503; Cascade Locks (Hood River)
// 541. The port fixes the old known miss: Government Camp (Clackamas)
// now correctly renders 503. Accepted roughness the other way: Marion's
// far-east high Cascades and odd 541 pockets inside metro counties are
// painted 503 wholesale.
import type { StateRegionList } from './types';
import type { ORCountyName } from '../counties/OR';

const M503 = [
  'Clatsop', 'Columbia', 'Tillamook', 'Washington', 'Multnomah',
  'Clackamas', 'Yamhill', 'Polk', 'Marion',
] as const satisfies readonly ORCountyName[];

const M541 = [
  'Lincoln', 'Benton', 'Linn', 'Lane', 'Douglas', 'Coos', 'Curry',
  'Josephine', 'Jackson', 'Klamath', 'Lake', 'Harney', 'Malheur',
  'Baker', 'Wallowa', 'Union', 'Grant', 'Wheeler', 'Crook', 'Deschutes',
  'Jefferson', 'Umatilla', 'Morrow', 'Gilliam', 'Sherman', 'Wasco',
  'Hood River',
] as const satisfies readonly ORCountyName[];

const regions: StateRegionList<ORCountyName> = [
  // 1947-1995: one code for the whole state.
  { code: '503', established: 1947, retired: 1995 },

  // 1995-present: 541 = everything outside the NW corner; 458 overlay 2010.
  { code: '541', established: 1995, counties: M541,
    overlays: [{ code: '458', established: 2010 }] },

  // 1995-present: 503 = the northwest corner; 971 overlay 2000.
  { code: '503', established: 1995, counties: M503, labelSize: 9,
    overlays: [{ code: '971', established: 2000 }] },
];

export default regions;
