// Florida — 305 statewide (1947), then fifty years of shedding:
//   1953: 813 takes the western peninsula, Pasco down to Collier plus the
//         inland tier (Tampa, St. Pete, Lakeland, Ft. Myers).
//   1965: 904 takes northern Florida (Jacksonville, Tallahassee,
//         Pensacola, Gainesville, Daytona).
//   1988: 407 takes east-central Florida from 305 (Orlando, Space Coast,
//         Treasure Coast, Palm Beach).
//   1995: three at once — 941 from 813 in May (Manatee down to Collier +
//         the inland counties), 954 from 305 in September (Broward), 352
//         from 904 in December (Gainesville/Ocala; some sources say 1996,
//         the article text says 1995).
//   May 1996: 561 from 407 (Palm Beach + Treasure Coast).
//   Jun 1997: 850 from 904 (the panhandle through Tallahassee, out to
//         Madison/Taylor).
//   1999: 727 from 813 in February (Pinellas, west Pasco); 863 from 941
//         (the inland tier: Polk, Hardee, Highlands, DeSoto, Okeechobee,
//         Glades, Hendry). Nov 1999: 321 enters as an overlay on ALL of
//         407 ("3-2-1 liftoff", petitioned by a Space Coast resident).
//   Oct 2000: Brevard is carved out of 407 as pure-321; 321 stays an
//         overlay on the Orlando counties (new 321 assignments there were
//         frozen in 2003, but the overlay formally remains).
//   Feb 2001: 386 from 904 — NONCONTIGUOUS: Daytona side (Volusia,
//         Flagler, Putnam) + Lake City side (Columbia, Hamilton,
//         Suwannee, Lafayette, Union); encoded as two 386 regions so
//         each blob gets a label. 904 = Jacksonville country.
//   2002: 772 from 561 in February (Treasure Coast; 561 = Palm Beach);
//         239 from 941 in March (Lee, Collier; 941 = Manatee, Sarasota,
//         Charlotte).
// Overlays: 786 on 305 (Mar 1998; Monroe added 2001), 754 on 954 (first
// numbers Apr 2002), 321 on 407 (1999), 689 on 407 (Jun 2019), 448 on
// 850 (Jun 2021), 656 on 813 (Feb 2022), 645 on 305/786 (Aug 2023), 728
// on 561 (Mar 2023), 324 on 904 (Feb 2024).
//
// Whole-county roughness calls: Monroe rides with 305 (the Keys/Key
// West) although its Everglades mainland went to 239 in 2002; Pasco ->
// 813 (Dade City, Zephyrhills) although its western coast (New Port
// Richey) is really 727; Putnam -> 386 (Palatka) although it's really
// split three ways (386/904/352); the sub-county slivers of 386 in
// north Alachua, of 407 in Lake/Volusia, and of 863 in Hillsborough/
// St. Lucie are ignored.
import type { StateRegionList } from './types';
import type { FLCountyName } from '../counties/FL';

// The 904 family (all 904 from 1965; before that, 305).
const F850 = [
  'Escambia', 'Santa Rosa', 'Okaloosa', 'Walton', 'Holmes', 'Washington',
  'Bay', 'Jackson', 'Calhoun', 'Gulf', 'Liberty', 'Gadsden', 'Franklin',
  'Leon', 'Wakulla', 'Jefferson', 'Madison', 'Taylor',
] as const satisfies readonly FLCountyName[];
const F904 = [
  'Duval', 'Nassau', 'Baker', 'St. Johns', 'Clay', 'Bradford',
] as const satisfies readonly FLCountyName[];
const F386W = [
  'Columbia', 'Hamilton', 'Suwannee', 'Lafayette', 'Union',
] as const satisfies readonly FLCountyName[];
const F386E = [
  'Volusia', 'Flagler', 'Putnam',
] as const satisfies readonly FLCountyName[];
const F352 = [
  'Alachua', 'Marion', 'Levy', 'Gilchrist', 'Dixie', 'Citrus',
  'Hernando', 'Sumter', 'Lake',
] as const satisfies readonly FLCountyName[];

// The 813 family (all 813 from 1953; before that, 305).
const F813 = ['Hillsborough', 'Pasco'] as const satisfies readonly FLCountyName[];
const F727 = ['Pinellas'] as const satisfies readonly FLCountyName[];
const F941 = [
  'Manatee', 'Sarasota', 'Charlotte',
] as const satisfies readonly FLCountyName[];
const F863 = [
  'Polk', 'Hardee', 'Highlands', 'DeSoto', 'Okeechobee', 'Glades',
  'Hendry',
] as const satisfies readonly FLCountyName[];
const F239 = ['Lee', 'Collier'] as const satisfies readonly FLCountyName[];

// The east-coast 305 family.
const F407 = [
  'Orange', 'Seminole', 'Osceola',
] as const satisfies readonly FLCountyName[];
const F321 = ['Brevard'] as const satisfies readonly FLCountyName[];
const F561 = ['Palm Beach'] as const satisfies readonly FLCountyName[];
const F772 = [
  'Indian River', 'St. Lucie', 'Martin',
] as const satisfies readonly FLCountyName[];
const F954 = ['Broward'] as const satisfies readonly FLCountyName[];
const F305 = ['Miami-Dade', 'Monroe'] as const satisfies readonly FLCountyName[];

const regions: StateRegionList<FLCountyName> = [
  // 1947-1953: one code for the whole state.
  { code: '305', established: 1947, retired: 1953 },

  // 1953: the western peninsula goes 813; 305 keeps the rest (its bbox
  // center falls in the Gulf, so the label is pinned near Orlando).
  { code: '813', established: 1953, retired: 1995,
    counties: [...F813, ...F727, ...F941, ...F863, ...F239] },
  { code: '305', established: 1953, retired: 1965,
    counties: [...F850, ...F904, ...F386W, ...F386E, ...F352,
      ...F407, ...F321, ...F561, ...F772, ...F954, ...F305],
    labelX: 820, labelY: 512 },

  // 1965: northern Florida goes 904 (label pinned east — the panhandle
  // L puts the bbox center in the Gulf's big bend).
  { code: '904', established: 1965, retired: 1995,
    counties: [...F850, ...F904, ...F386W, ...F386E, ...F352],
    labelX: 786, labelY: 475 },
  { code: '305', established: 1965, retired: 1988,
    counties: [...F407, ...F321, ...F561, ...F772, ...F954, ...F305],
    labelX: 844, labelY: 548 },

  // 1988: east-central Florida goes 407 (bbox center falls in
  // Okeechobee County, which is 813's — pin to Orange).
  { code: '407', established: 1988, retired: 1996,
    counties: [...F407, ...F321, ...F561, ...F772],
    labelX: 824, labelY: 512 },
  { code: '305', established: 1988, retired: 1995,
    counties: [...F954, ...F305], labelSize: 9 },

  // 1995, May: Manatee-to-Collier + the inland tier go 941.
  { code: '941', established: 1995, retired: 1999,
    counties: [...F941, ...F863, ...F239] },
  { code: '813', established: 1995, retired: 1999,
    counties: [...F813, ...F727], labelSize: 8 },

  // 1995, September: Broward goes 954 (754 overlay 2002); 305 =
  // Miami-Dade + the Keys (786 overlay 1998, 645 added 2023).
  { code: '954', established: 1995, counties: F954, labelSize: 6,
    overlays: [{ code: '754', established: 2002 }] },
  { code: '305', established: 1995, counties: F305, labelSize: 7,
    overlays: [
      { code: '786', established: 1998 },
      { code: '645', established: 2023 },
    ] },

  // 1995, December: Gainesville/Ocala go 352.
  { code: '352', established: 1995, counties: F352 },
  { code: '904', established: 1995, retired: 1997,
    counties: [...F850, ...F904, ...F386W, ...F386E],
    labelX: 786, labelY: 475 },

  // 1996: Palm Beach + Treasure Coast go 561; 407 = Orlando + Space
  // Coast, overlaid by 321 from Nov 1999.
  { code: '561', established: 1996, retired: 2002,
    counties: [...F561, ...F772], labelSize: 8 },
  { code: '407', established: 1996, retired: 2000,
    counties: [...F407, ...F321], labelSize: 8,
    overlays: [{ code: '321', established: 1999 }] },

  // 1997: the panhandle goes 850 (448 overlay 2021).
  { code: '850', established: 1997, counties: F850,
    overlays: [{ code: '448', established: 2021 }] },
  { code: '904', established: 1997, retired: 2001,
    counties: [...F904, ...F386W, ...F386E] },

  // 1999: Pinellas goes 727; 813 = Tampa (656 overlay 2022); the
  // inland tier goes 863; 941 = the coast + Ft. Myers/Naples.
  { code: '727', established: 1999, counties: F727, labelSize: 6 },
  { code: '813', established: 1999, counties: F813, labelSize: 8,
    overlays: [{ code: '656', established: 2022 }] },
  { code: '863', established: 1999, counties: F863 },
  { code: '941', established: 1999, retired: 2002,
    counties: [...F941, ...F239], labelSize: 8 },

  // 2000: Brevard is carved out of 407 as pure 321; the 321 overlay
  // stays on the Orlando counties, joined by 689 in 2019.
  { code: '321', established: 2000, counties: F321, labelSize: 7 },
  { code: '407', established: 2000, counties: F407, labelSize: 6,
    overlays: [
      { code: '321', established: 2000 },
      { code: '689', established: 2019 },
    ] },

  // 2001: 386 splits from 904 in two disconnected pieces (Daytona +
  // Lake City); 904 = Jacksonville country (324 overlay 2024).
  { code: '386', established: 2001, counties: F386E, labelSize: 8 },
  { code: '386', established: 2001, counties: F386W, labelSize: 8 },
  { code: '904', established: 2001, counties: F904, labelSize: 8,
    overlays: [{ code: '324', established: 2024 }] },

  // 2002: the Treasure Coast goes 772; 561 = Palm Beach (728 overlay
  // 2023); Ft. Myers/Naples go 239; 941 = Sarasota country.
  { code: '772', established: 2002, counties: F772, labelSize: 7 },
  { code: '561', established: 2002, counties: F561, labelSize: 6,
    overlays: [{ code: '728', established: 2023 }] },
  { code: '239', established: 2002, counties: F239, labelSize: 8 },
  { code: '941', established: 2002, counties: F941, labelSize: 8 },
];

export default regions;
