// Connecticut — 203 statewide (1947), split in August 1995: 203 kept the
// southwest (Fairfield + New Haven counties: Bridgeport, New Haven,
// Danbury, Waterbury, Meriden), 860 took the rest (Hartford, New London,
// Litchfield). Overlays: 475 on 203 in December 2009; 959 on 860 in
// August 2014 (approved 2009, postponed).
//
// County-based, with a CT quirk: the base map's "counties" here are the
// nine 2022 planning regions (the SVG was updated after CT retired county
// government), not the legacy eight counties the 1995 split followed.
// The mapping still works: 203 ≈ Western CT + Greater Bridgeport +
// Naugatuck Valley + South Central (the old Fairfield + New Haven turf);
// 860 gets the rest. Accepted roughness: the Naugatuck Valley region goes
// 203 for Waterbury although its northern towns (Bristol, Plymouth,
// Thomaston) are really 860.
import type { StateRegionList } from './types';
import type { CTCountyName } from '../counties/CT';

const M203 = [
  'Western Connecticut', 'Greater Bridgeport', 'Naugatuck Valley',
  'South Central Connecticut',
] as const satisfies readonly CTCountyName[];

const M860 = [
  'Northwest Hills', 'Capitol', 'Lower Connecticut River Valley',
  'Northeastern Connecticut', 'Southeastern Connecticut',
] as const satisfies readonly CTCountyName[];

const regions: StateRegionList<CTCountyName> = [
  // 1947-1995: one code for the whole state.
  { code: '203', established: 1947, retired: 1995 },

  // 1995-present: the split, each side later gaining an overlay.
  { code: '203', established: 1995, counties: M203,
    labelX: 909, labelY: 189.2, labelSize: 7,
    overlays: [{ code: '475', established: 2009 }] },
  { code: '860', established: 1995, counties: M860,
    labelX: 920.3, labelY: 174.3, labelSize: 8,
    overlays: [{ code: '959', established: 2014 }] },
];

export default regions;
