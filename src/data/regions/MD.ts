// Maryland — 301 statewide (1947); ONE split ever, then only overlays:
//   Oct 1991: 410 takes the east — Baltimore metro (Baltimore City/Co.,
//         Anne Arundel, Carroll, Howard, Harford, Calvert) plus the whole
//         Eastern Shore; 301 keeps the western panhandle, the DC suburbs,
//         and Southern Maryland (Charles, St. Mary's).
//   1997: both sides overlaid — 240 on 301 (June), 443 on 410 (July).
//   Mar 2012: 667 overlays 410/443.
//   2023: 227 overlays 301/240.
// The real 301/410 line splits Carroll, Howard, and a sliver of eastern
// Frederick; whole-county they go with their bulk (Carroll/Howard -> 410,
// Frederick -> 301). Calvert is 410 despite being Southern Maryland.
//
// Both regions' bbox centers land badly (301's on the 410 line, 410's in
// the Chesapeake Bay), so labels are pinned: 301 to Frederick County (the
// hinge between its panhandle and DC lobes), 410 to Queen Anne's.
//
// Source: the 410/443/667 Wikipedia article enumerates the counties.
import type { StateRegionList } from './types';
import type { MDCountyName } from '../counties/MD';

const M301 = [
  'Garrett', 'Allegany', 'Washington', 'Frederick', 'Montgomery',
  "Prince George's", 'Charles', "St. Mary's",
] as const satisfies readonly MDCountyName[];

const M410 = [
  'Baltimore City', 'Baltimore Co.', 'Anne Arundel', 'Calvert', 'Carroll',
  'Howard', 'Harford', 'Cecil', 'Kent', "Queen Anne's", 'Caroline',
  'Talbot', 'Dorchester', 'Wicomico', 'Somerset', 'Worcester',
] as const satisfies readonly MDCountyName[];

const regions: StateRegionList<MDCountyName> = [
  // 1947-1991: one code for the whole state.
  { code: '301', established: 1947, retired: 1991 },

  // 1991: the only split Maryland ever did; overlays pile on after.
  { code: '301', established: 1991, counties: M301,
    labelX: 849.5, labelY: 246.1,
    overlays: [
      { code: '240', established: 1997 },
      { code: '227', established: 2023 },
    ] },
  { code: '410', established: 1991, counties: M410,
    labelX: 874.3, labelY: 251.3,
    overlays: [
      { code: '443', established: 1997 },
      { code: '667', established: 2012 },
    ] },
];

export default regions;
