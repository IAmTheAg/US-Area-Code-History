// California — THREE original codes (1947), encoded as three families:
//
// NORTH (916): originally Oregon-to-Fresno — the whole interior valley
// plus the north coast (nazip's stylized wedge misses that 707 and 209
// BOTH split from 916, so cities win over the diagram).
//   1958: 209 (Stockton..Fresno valley). 1959: 707 (north coast + wine
//   country). Nov 1997: 530 (everything north/east of Sacramento);
//   916 = Sacramento. Nov 1998: 559 (Fresno half of 209).
//   Overlays: 279 on 916 (2018), 350 on 209 (2022), 369 on 707 (2023),
//   837 on 530 (2025), 357 on 559 (2025).
//
// CENTER (415): the Bay + central coast, all county-clean.
//   1959: 408 (south bay + Monterey coast). Sep 1991: 510 (East Bay).
//   Aug 1997: 650 (Peninsula). 1998: 925 (inland East Bay, Mar) and
//   831 (Santa Cruz/Monterey/San Benito, Jul).
//   Overlays: 669 on 408 (2012), 628 on 415 (2015), 341 on 510 (2019).
//
// SOUTH (213): originally everything south of SLO..Death Valley.
//   1951: 714 (all of it except LA county + the 805 coast). 1957: 805
//   (Ventura/SB/SLO/Kern + LA county's north). Nov 1982: 619 (San Diego
//   to the NV border — all the desert). Jan 1984: 818 (San Fernando
//   Valley). 1991: 310 (Westside/South Bay). Nov 1992: 909 (Inland
//   Empire). 1997: 562 (Long Beach, Jan), 626 (San Gabriel Valley,
//   Jun), 760 (the desert + north SD county, Mar). 1998: 323 (LA
//   outside downtown, Jun), 949 (south Orange, Apr). 1999: 661
//   (Kern + Santa Clarita/Antelope Valley, Feb), 858 (NW San Diego,
//   Jun). Jul 2004: 951 (Riverside; 909 = San Bernardino).
//   Overlays: 424 on 310 (2006), 657 on 714 (2008), 747 on 818 (2009),
//   442 on 760 (2009), 820 on 805 (2018), 840 on 909 (2021), 738 on
//   213/323 (2024). MERGERS: 213/323 became one overlay complex in
//   2017, 619/858 in 2019 — encoded as mutual overlay entries.
//
// LA/OC/SD metros are `d` blobs over county bases (the Chicago
// pattern). ARRAY ORDER = PAINT ORDER and is deliberate: LA county
// base, then LA blobs, then the neighboring county bases (trimming
// blob overshoot at exact county lines), then the 949/858 blobs over
// their bases.
//
// Whole-county roughness calls: Placer/El Dorado/Yolo -> 530 by county
// seat (Auburn, Placerville, Woodland) though Roseville, El Dorado
// Hills and West Sacramento are really 916; Contra Costa -> 925 though
// its west shore (Richmond) is really 510; Riverside -> 951 and San
// Bernardino -> 909 whole, although their desert east (Palm Springs,
// Victorville, Barstow, Joshua Tree) has really been 619-then-760
// country since 1982 — the biggest accepted roughness on the map;
// Pomona (really 909) and Catalina (really 310) ride with the LA base;
// the 858/760 split of San Diego county is approximated by one
// NW-county 858 blob.
import type { StateRegionList } from './types';
import type { CACountyName } from '../counties/CA';

// ---- NORTH: the 916 family ----
const C530 = [
  'Siskiyou', 'Modoc', 'Shasta', 'Lassen', 'Trinity', 'Tehama', 'Plumas',
  'Butte', 'Glenn', 'Colusa', 'Sutter', 'Yuba', 'Sierra', 'Nevada',
  'Placer', 'El Dorado', 'Yolo', 'Alpine',
] as const satisfies readonly CACountyName[];
const C916 = ['Sacramento'] as const satisfies readonly CACountyName[];
const C707 = [
  'Del Norte', 'Humboldt', 'Mendocino', 'Lake', 'Sonoma', 'Napa',
  'Solano',
] as const satisfies readonly CACountyName[];
const C209 = [
  'San Joaquin', 'Stanislaus', 'Merced', 'Tuolumne', 'Calaveras',
  'Amador', 'Mariposa',
] as const satisfies readonly CACountyName[];
const C559 = [
  'Fresno', 'Madera', 'Kings', 'Tulare',
] as const satisfies readonly CACountyName[];

// ---- CENTER: the 415 family ----
const C415 = ['San Francisco', 'Marin'] as const satisfies readonly CACountyName[];
const C650 = ['San Mateo'] as const satisfies readonly CACountyName[];
const C510 = ['Alameda'] as const satisfies readonly CACountyName[];
const C925 = ['Contra Costa'] as const satisfies readonly CACountyName[];
const C408 = ['Santa Clara'] as const satisfies readonly CACountyName[];
const C831 = [
  'Santa Cruz', 'Monterey', 'San Benito',
] as const satisfies readonly CACountyName[];

// ---- SOUTH: the 213 family ----
const CLA = ['Los Angeles'] as const satisfies readonly CACountyName[];
const C714 = ['Orange'] as const satisfies readonly CACountyName[];
const C619 = ['San Diego'] as const satisfies readonly CACountyName[];
const C760 = ['Imperial', 'Inyo', 'Mono'] as const satisfies readonly CACountyName[];
const C951 = ['Riverside'] as const satisfies readonly CACountyName[];
const C909 = ['San Bernardino'] as const satisfies readonly CACountyName[];
const C805 = [
  'Ventura', 'Santa Barbara', 'San Luis Obispo',
] as const satisfies readonly CACountyName[];
const C661 = ['Kern'] as const satisfies readonly CACountyName[];

// LA county blobs (mainland ~x 93-120, y 335-357; grid dividers y=345,
// y=349, x=107; everything overshoots the coast and gets clipped).
// North strip: Antelope Valley + Santa Clarita (805 until Feb 1999).
const NSTRIP_D = 'M92.5,334 L121,334 L121,345 L92.5,345 Z';
// San Fernando Valley/Burbank band.
const SFV_D = 'M92.5,345 L107,345 L107,349 L92.5,349 Z';
// San Gabriel Valley + eastern county (absorbs Pomona, really 909).
const SGV_D = 'M107,345 L121,345 L121,352 L110,352 L110,349 L107,349 Z';
// Westside + South Bay.
const WEST_D = 'M92.5,349 L105.6,349 L105.6,359 L92.5,359 Z';
// Long Beach / southeast county.
const SE_D = 'M105.6,354 L113,354 L113,359 L105.6,359 Z';
// Downtown (213 after 1998); the 323 county base shows as the ring.
const DTLA_D = 'M105.6,349.8 L107.6,349.8 L107.6,351.4 L105.6,351.4 Z';
// South Orange County (Irvine/Newport down the coast).
const SOC_D = 'M106,365.5 L119,362.5 L119,373 L106,373 Z';
// Northwest San Diego county (La Jolla/Del Mar side).
const NSD_D = 'M114,373.5 L125,373.5 L125,380 L114,380 Z';

const regions: StateRegionList<CACountyName> = [
  // ======== NORTH ========
  // 1947-1958: 916 runs Oregon to Fresno.
  { code: '916', established: 1947, retired: 1958,
    counties: [...C530, ...C916, ...C707, ...C209, ...C559] },
  // 1958: the valley goes 209.
  { code: '209', established: 1958, retired: 1998,
    counties: [...C209, ...C559] },
  { code: '916', established: 1958, retired: 1959,
    counties: [...C530, ...C916, ...C707] },
  // 1959: the north coast goes 707 (369 overlay 2023).
  { code: '707', established: 1959, counties: C707,
    overlays: [{ code: '369', established: 2023 }] },
  { code: '916', established: 1959, retired: 1997,
    counties: [...C530, ...C916] },
  // Nov 1997: the rural north goes 530 (837 overlay 2025); 916 =
  // Sacramento (279 overlay 2018).
  { code: '530', established: 1997, counties: C530,
    overlays: [{ code: '837', established: 2025 }] },
  { code: '916', established: 1997, counties: C916, labelSize: 6,
    overlays: [{ code: '279', established: 2018 }] },
  // Nov 1998: the Fresno half of 209 goes 559 (357 overlay 2025);
  // 209 keeps Stockton/Modesto (350 overlay 2022).
  { code: '559', established: 1998, counties: C559,
    overlays: [{ code: '357', established: 2025 }] },
  { code: '209', established: 1998, counties: C209,
    overlays: [{ code: '350', established: 2022 }] },

  // ======== CENTER (Bay Area, all county lines) ========
  // 1947-1959: 415 = Bay + central coast.
  { code: '415', established: 1947, retired: 1959,
    counties: [...C415, ...C650, ...C510, ...C925, ...C408, ...C831] },
  // 1959: the south bay + Monterey coast go 408.
  { code: '408', established: 1959, retired: 1998,
    counties: [...C408, ...C831] },
  { code: '415', established: 1959, retired: 1991,
    counties: [...C415, ...C650, ...C510, ...C925],
    labelX: 60, labelY: 257, labelSize: 8 },
  // Sep 1991: the East Bay goes 510.
  { code: '510', established: 1991, retired: 1998,
    counties: [...C510, ...C925], labelSize: 7 },
  { code: '415', established: 1991, retired: 1997,
    counties: [...C415, ...C650], labelSize: 7 },
  // Aug 1997: the Peninsula goes 650; 415 = SF + Marin (628 ov. 2015).
  { code: '650', established: 1997, counties: C650, labelSize: 5 },
  { code: '415', established: 1997, counties: C415, labelSize: 6,
    overlays: [{ code: '628', established: 2015 }] },
  // 1998: inland East Bay goes 925; 510 = Alameda (341 ov. 2019);
  // the Monterey coast goes 831; 408 = Santa Clara (669 ov. 2012).
  { code: '925', established: 1998, counties: C925, labelSize: 5 },
  { code: '510', established: 1998, counties: C510, labelSize: 5,
    overlays: [{ code: '341', established: 2019 }] },
  { code: '831', established: 1998, counties: C831, labelSize: 8 },
  { code: '408', established: 1998, counties: C408, labelSize: 6,
    overlays: [{ code: '669', established: 2012 }] },

  // ======== SOUTH (paint order matters from here) ========
  // 1947-1951: 213 = everything south of SLO..Death Valley.
  { code: '213', established: 1947, retired: 1951,
    counties: [...CLA, ...C714, ...C619, ...C760, ...C951, ...C909,
      ...C805, ...C661] },
  // 1951-1957: 213 keeps LA + the future-805 coast.
  { code: '213', established: 1951, retired: 1957,
    counties: [...CLA, ...C805, ...C661] },

  // LA county base: 213 until the 1998 city split, then 323 (the ring
  // and east county; 213/738 join as overlays 2017/2024).
  { code: '213', established: 1957, retired: 1998, counties: CLA,
    labelX: 106, labelY: 350.5, labelSize: 6 },
  { code: '323', established: 1998, counties: CLA,
    labelX: 109.3, labelY: 350.8, labelSize: 5,
    overlays: [
      { code: '213', established: 2017 },
      { code: '738', established: 2024 },
    ] },

  // --- LA blobs above the base ---
  // North strip: 805 (1957-99), then 661 (label-less; the county-group
  // labels sit in Ventura/Kern).
  { code: '805', established: 1957, retired: 1999, d: NSTRIP_D },
  { code: '661', established: 1999, d: NSTRIP_D },
  // Jan 1984: San Fernando Valley goes 818 (747 overlay 2009).
  { code: '818', established: 1984, d: SFV_D,
    labelX: 99.5, labelY: 347, labelSize: 5,
    overlays: [{ code: '747', established: 2009 }] },
  // Jun 1997: San Gabriel Valley goes 626.
  { code: '626', established: 1997, d: SGV_D,
    labelX: 113, labelY: 347.3, labelSize: 5 },
  // Nov 1991: Westside/South Bay go 310 (424 overlay 2006).
  { code: '310', established: 1991, d: WEST_D,
    labelX: 98, labelY: 352.5, labelSize: 5,
    overlays: [{ code: '424', established: 2006 }] },
  // Jan 1997: Long Beach corner goes 562.
  { code: '562', established: 1997, d: SE_D,
    labelX: 109.5, labelY: 356, labelSize: 5 },
  // Jun 1998: downtown keeps 213 (323/738 overlays 2017/2024).
  { code: '213', established: 1998, d: DTLA_D,
    labelX: 106.6, labelY: 350.6, labelSize: 4,
    overlays: [
      { code: '323', established: 2017 },
      { code: '738', established: 2024 },
    ] },

  // --- neighbors painted after the LA blobs (exact county lines trim
  // the blob overshoot) ---
  // 1951-1982: 714 = the whole south/east.
  { code: '714', established: 1951, retired: 1982,
    counties: [...C714, ...C619, ...C760, ...C951, ...C909] },
  // 1982-1992: 714 = Orange + Inland Empire.
  { code: '714', established: 1982, retired: 1992,
    counties: [...C714, ...C951, ...C909] },
  // Nov 1982: 619 = San Diego to the NV border.
  { code: '619', established: 1982, retired: 1997,
    counties: [...C619, ...C760] },
  // The 805 coast: Kern until the Feb 1999 661 split (820 ov. 2018).
  { code: '805', established: 1957, retired: 1999,
    counties: [...C805, ...C661] },
  { code: '805', established: 1999, counties: C805,
    overlays: [{ code: '820', established: 2018 }] },
  { code: '661', established: 1999, counties: C661 },
  // 714 = Orange county from Nov 1992 (657 overlay 2008)...
  { code: '714', established: 1992, counties: C714,
    labelX: 110.5, labelY: 361.5, labelSize: 5,
    overlays: [{ code: '657', established: 2008 }] },
  // ...with south OC going 949 in Apr 1998 (blob above the base).
  { code: '949', established: 1998, d: SOC_D,
    labelX: 112.5, labelY: 369, labelSize: 5 },
  // Mar 1997: the desert leaves; 619 = San Diego county (merged with
  // 858 into one overlay complex 2019).
  { code: '619', established: 1997, counties: C619,
    labelX: 124, labelY: 385.5, labelSize: 6,
    overlays: [{ code: '858', established: 2019 }] },
  // Jun 1999: NW San Diego goes 858 (mutual overlay since 2019).
  { code: '858', established: 1999, d: NSD_D,
    labelX: 119.5, labelY: 376.5, labelSize: 5,
    overlays: [{ code: '619', established: 2019 }] },
  // Inland Empire: 909 from Nov 1992, Riverside side 951 from Jul 2004
  // (840 overlays 909 in 2021); painted after the metro blobs.
  { code: '909', established: 1992, retired: 2004,
    counties: [...C951, ...C909],
    labelX: 124, labelY: 357.5, labelSize: 6 },
  { code: '951', established: 2004, counties: C951,
    labelX: 127, labelY: 367, labelSize: 5 },
  { code: '909', established: 2004, counties: C909,
    labelX: 122, labelY: 356.5, labelSize: 5,
    overlays: [{ code: '840', established: 2021 }] },
  // Mar 1997: 760 = Imperial/Inyo/Mono (442 overlay 2009).
  { code: '760', established: 1997, counties: C760,
    overlays: [{ code: '442', established: 2009 }] },
];

export default regions;
