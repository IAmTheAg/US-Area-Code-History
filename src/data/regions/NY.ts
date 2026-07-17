// New York — FIVE original codes (1947): 212 (the five boroughs PLUS Long
// Island — researched and kept from the old stub: 516 didn't exist until
// 1951; Wikipedia's list-page claim that 516 came from 914 is wrong for
// our purposes, don't re-litigate), 914 (lower Hudson), 518 (Albany/North
// Country), 315 (central), 716 (west). Then:
//   1951: 516 = Long Island (Nassau + Suffolk), from 212.
//   Jan 1954: 607 (Southern Tier) — NOT an original — from BOTH parents:
//         the southern part of 315 and the eastern part of 716.
//   Sep 1984: 718 = Brooklyn/Queens/Staten Island; 212 keeps
//         Manhattan + the Bronx.
//   1992: the Bronx moves 212 -> 718 (its own era), and 917 overlays the
//         WHOLE city — both 212 and 718.
//   1999: 646 overlays 212 (Jul), 347 overlays 718 (Oct), and 631 splits
//         Suffolk from 516 (Nov).
//   Jun 2000: 845 = mid-Hudson; 914 keeps Westchester only.
//   Nov 2001: 585 = Rochester and the Genesee Valley, from 716.
// Later overlays (dates verified against Wikipedia, several differ from
// folklore): 929 on 718 (Apr 2011 — not 2010), 934 on 631 (Jun 2016),
// 680 on 315 + 332 on 212 (Mar/Jun 2017), 838 on 518 (Sep 2017),
// 329 on 845 + 363 on 516 (Mar 2023), 624 on 716 (Nov 2023), and
// 465 on 718 (Jun 18, 2026 — in service as of this writing).
// allcodes.ts only knows 16 NY codes; the 2016+ overlays are encoded
// anyway.
//
// Whole-county roughness calls (county seat wins): Ontario -> 585
// (Canandaigua) although Geneva on its east edge is really 315; Yates ->
// 315 (Penn Yan) although its south (Dundee) is 607; Wayne -> 315
// (Lyons/Newark) although its Rochester-suburb west edge is 585;
// Allegany -> 585 (Wellsville, Belmont) although Alfred is 607; Steuben
// -> 607 (Corning, Bath, Hornell) although its northwest corner
// (Wayland/Cohocton) is 585; Cortland/Chenango/Otsego -> 607 (Cortland,
// Norwich, Oneonta) although their northern edges are 315; St. Lawrence
// -> 315 (Canton/Potsdam/Massena) although 518 holds an eastern sliver;
// Fulton/Hamilton -> 518 (Johnstown, Lake Pleasant) despite 315 slivers;
// Delaware -> 607 (Delhi/Walton) despite 845 corners; Dutchess/Ulster ->
// 845 (Poughkeepsie/Kingston) despite 518 slivers up north; Sullivan ->
// 845 (Monticello) despite a 607 western sliver. Which of 607's counties
// came from 716 vs 315 in 1954 is approximated: the western third
// (Steuben/Schuyler/Chemung) from 716, the rest from 315.
// City checks that land right: Ithaca (Tompkins), Binghamton (Broome),
// Elmira (Chemung), Oneonta (Otsego) = 607; Watertown (Jefferson),
// Utica (Oneida), Seneca Falls (Seneca) = 315; Poughkeepsie (Dutchess)
// = 845; White Plains (Westchester) = 914; Niagara Falls (Niagara) =
// 716; Canandaigua (Ontario) = 585.
import type { StateRegionList } from './types';
import type { NYCountyName } from '../counties/NY';

// ---- the 716 family (west) ----
const C716 = [
  'Erie', 'Niagara', 'Chautauqua', 'Cattaraugus',
] as const satisfies readonly NYCountyName[];
const C585 = [
  'Monroe', 'Orleans', 'Genesee', 'Wyoming', 'Livingston', 'Allegany',
  'Ontario',
] as const satisfies readonly NYCountyName[];
// 607's two halves: the western third came from 716, the rest from 315
// (both in the Jan 1954 split).
const W607 = [
  'Steuben', 'Schuyler', 'Chemung',
] as const satisfies readonly NYCountyName[];

// ---- the 315 family (central) ----
const E607 = [
  'Tompkins', 'Cortland', 'Chenango', 'Broome', 'Tioga', 'Delaware',
  'Otsego',
] as const satisfies readonly NYCountyName[];
const C315 = [
  'St. Lawrence', 'Jefferson', 'Lewis', 'Oswego', 'Oneida', 'Herkimer',
  'Madison', 'Onondaga', 'Cayuga', 'Seneca', 'Wayne', 'Yates',
] as const satisfies readonly NYCountyName[];

// ---- the northeast (never split) ----
const C518 = [
  'Albany', 'Clinton', 'Columbia', 'Essex', 'Franklin', 'Fulton',
  'Greene', 'Hamilton', 'Montgomery', 'Rensselaer', 'Saratoga',
  'Schenectady', 'Schoharie', 'Warren', 'Washington',
] as const satisfies readonly NYCountyName[];

// ---- the Hudson Valley ----
const WESTCHESTER = ['Westchester'] as const satisfies readonly NYCountyName[];
const MIDHUDSON = [
  'Rockland', 'Orange', 'Putnam', 'Dutchess', 'Ulster', 'Sullivan',
] as const satisfies readonly NYCountyName[];

// ---- the city + Long Island (the boroughs are counties) ----
const MANHATTAN = ['New York'] as const satisfies readonly NYCountyName[];
const BRONX = ['Bronx'] as const satisfies readonly NYCountyName[];
const OUTER3 = [
  'Kings', 'Queens', 'Richmond',
] as const satisfies readonly NYCountyName[];
const NASSAU = ['Nassau'] as const satisfies readonly NYCountyName[];
const SUFFOLK = ['Suffolk'] as const satisfies readonly NYCountyName[];

const regions: StateRegionList<NYCountyName> = [
  // ---- west ----
  // 1947-1954: 716 runs from Buffalo past Rochester to Elmira.
  { code: '716', established: 1947, retired: 1954,
    counties: [...C716, ...C585, ...W607] },
  // 1954-2001: Elmira/Corning gone to 607; Rochester still 716.
  { code: '716', established: 1954, retired: 2001,
    counties: [...C716, ...C585] },
  // 2001: 585 = Rochester + the Genesee Valley; 716 keeps Buffalo,
  // Niagara Falls, Jamestown, Olean (624 overlay 2023).
  { code: '716', established: 2001, counties: C716, labelSize: 9,
    overlays: [{ code: '624', established: 2023 }] },
  { code: '585', established: 2001, counties: C585, labelSize: 9 },

  // ---- central ----
  // 1947-1954: 315 runs from Watertown down to Binghamton.
  { code: '315', established: 1947, retired: 1954,
    counties: [...C315, ...E607] },
  // 1954-present: the Southern Tier gone to 607 (680 overlay 2017).
  { code: '315', established: 1954, counties: C315,
    overlays: [{ code: '680', established: 2017 }] },
  // 1954-present: 607 = the Southern Tier + Finger Lakes south.
  { code: '607', established: 1954, counties: [...W607, ...E607],
    labelSize: 9 },

  // ---- northeast: never split ----
  { code: '518', established: 1947, counties: C518,
    overlays: [{ code: '838', established: 2017 }] },

  // ---- Hudson Valley ----
  // 1947-2000: 914 = Westchester up through the Catskills.
  { code: '914', established: 1947, retired: 2000,
    counties: [...WESTCHESTER, ...MIDHUDSON], labelSize: 8 },
  // 2000: 845 takes the mid-Hudson (329 overlay 2023)...
  { code: '845', established: 2000, counties: MIDHUDSON, labelSize: 7,
    overlays: [{ code: '329', established: 2023 }] },
  // ...and 914 keeps Westchester only.
  { code: '914', established: 2000, counties: WESTCHESTER, labelSize: 5 },

  // ---- the city + Long Island ----
  // 1947-1951: 212 = the five boroughs AND Long Island.
  { code: '212', established: 1947, retired: 1951,
    counties: [...MANHATTAN, ...BRONX, ...OUTER3, ...NASSAU, ...SUFFOLK],
    labelSize: 6 },
  // 1951-1999: 516 = Long Island.
  { code: '516', established: 1951, retired: 1999,
    counties: [...NASSAU, ...SUFFOLK], labelSize: 5 },
  // 1951-1984: 212 = the five boroughs.
  { code: '212', established: 1951, retired: 1984,
    counties: [...MANHATTAN, ...BRONX, ...OUTER3], labelSize: 5 },
  // 1984-1992: 718 = Brooklyn/Queens/Staten Island; 212 keeps
  // Manhattan + the Bronx.
  { code: '718', established: 1984, retired: 1992, counties: OUTER3,
    labelSize: 4 },
  { code: '212', established: 1984, retired: 1992,
    counties: [...MANHATTAN, ...BRONX],
    labelX: 902.7, labelY: 202, labelSize: 4 },
  // 1992: the Bronx joins 718; 917 overlays the whole city, then each
  // side gains its own overlays (347/929/465 vs 646/332).
  { code: '718', established: 1992, counties: [...OUTER3, ...BRONX],
    labelSize: 4,
    overlays: [
      { code: '917', established: 1992 },
      { code: '347', established: 1999 },
      { code: '929', established: 2011 },
      { code: '465', established: 2026 },
    ] },
  { code: '212', established: 1992, counties: MANHATTAN, labelSize: 4,
    overlays: [
      { code: '917', established: 1992 },
      { code: '646', established: 1999 },
      { code: '332', established: 2017 },
    ] },
  // 1999: 631 = Suffolk (934 overlay 2016); 516 keeps Nassau (363
  // overlay 2023).
  { code: '516', established: 1999, counties: NASSAU, labelSize: 4,
    overlays: [{ code: '363', established: 2023 }] },
  { code: '631', established: 1999, counties: SUFFOLK, labelSize: 5,
    overlays: [{ code: '934', established: 2016 }] },
];

export default regions;
