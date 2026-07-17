// Utah — 801 statewide (1947). September 1997: 435 takes everything
// outside the Wasatch Front; 801 keeps the metro corridor (Salt Lake
// City, Ogden, Provo). 385 overlaid the 801 area in 2009 (permissive
// dialing ran from mid-2008; NANPA's formal in-service date is March 29,
// 2009 — kept as 2009).
//
// County-based since the county-map port: the 1997 split is exactly the
// five Wasatch Front counties (Weber, Davis, Morgan, Salt Lake, Utah),
// so both regions are plain county lists — no drawn dividers. City
// checks are county membership: SLC/Ogden/Provo in (801); Brigham City
// (Box Elder), Logan (Cache), Tooele, Park City (Summit), Heber City
// (Wasatch), Nephi (Juab) out (435). Improvement over the old stylized
// blob: 801 now correctly includes Morgan and the rural east of Weber/
// Utah counties.
import type { StateRegionList } from './types';
import type { UTCountyName } from '../counties/UT';

const M801 = [
  'Weber', 'Davis', 'Morgan', 'Salt Lake', 'Utah',
] as const satisfies readonly UTCountyName[];

const M435 = [
  'Box Elder', 'Cache', 'Rich', 'Summit', 'Wasatch', 'Daggett',
  'Duchesne', 'Uintah', 'Tooele', 'Juab', 'Sanpete', 'Carbon', 'Emery',
  'Grand', 'Millard', 'Sevier', 'Piute', 'Wayne', 'Beaver', 'Iron',
  'Garfield', 'Kane', 'Washington', 'San Juan',
] as const satisfies readonly UTCountyName[];

const regions: StateRegionList<UTCountyName> = [
  // 1947-1997: one code for the whole state.
  { code: '801', established: 1947, retired: 1997 },

  // 1997-present: 435 = everything outside the Wasatch Front.
  { code: '435', established: 1997, counties: M435 },

  // 1997-present: 801 = the Wasatch Front; 385 overlay 2009.
  { code: '801', established: 1997, counties: M801, labelSize: 7,
    overlays: [{ code: '385', established: 2009 }] },
];

export default regions;
