// Illinois — FOUR original codes (1947): 312 (Chicago + collar), 815
// (northern band), 217 (center, then reaching both rivers), 618 (deep
// south). Then two boundary shuffles and the metro convergence:
//   1954: the Metro East (East St. Louis, Alton) moves 217 -> 618.
//   1957: 309 is born from BOTH neighbors — the western half of 815
//         (Quad Cities) merged with 217's northern part (Peoria,
//         Bloomington-Normal).
//   Nov 1989: 708 takes ALL the suburbs; 312 = city of Chicago.
//   1996: the 708 ring splits three ways — 847 north (Jan), 630 west
//         (Aug) — and in October 773 takes the city outside the Loop;
//         312 = downtown only.
// Overlays (statewide overlay complex since 2023): 224 on 847 (2002),
// 331 on 630 (2007), 779 on 815 (2007), 872 on BOTH 312 and 773 (Nov
// 2009), 447 on 217 (2021), 464 on 708 (Jan 2022), 861 on 309 (Feb
// 2023), 730 on 618 (Jul 2023).
//
// Metro shapes: the collar counties are real county regions (Lake ->
// 847, DuPage/Kane/Kendall -> 630, Cook -> 708) with MA-style `d` blobs
// painted above for the sub-county lines: 847's north-Cook strip (a
// second, label-less 847 region), 773's city L, and the 312 Loop
// square. Divider vertices shared: strip south edge = city north edge
// (y=214); the strip overshoots north into 847's own Lake county.
//
// Whole-county roughness calls: Will -> 815 (Joliet) although its east
// (708) and Naperville/Bolingbrook corners (630) disagree; McHenry ->
// 815 (Crystal Lake) despite an 847 sliver; Kane -> 630 (Aurora)
// although Elgin is really 847; Kendall rides with the metro family
// (312 -> 708 -> 630) throughout. The 1957 line inside 309 (which
// counties came from 815 vs 217) is approximated: Quad Cities block
// (Rock Island, Mercer, Henderson, Warren, Knox, Henry, Stark) from
// 815, the Peoria/Bloomington block from 217. Metro East move = Madison,
// St. Clair, Monroe.
import type { StateRegionList } from './types';
import type { ILCountyName } from '../counties/IL';

const C815 = [
  'Jo Daviess', 'Stephenson', 'Winnebago', 'Boone', 'McHenry', 'Carroll',
  'Ogle', 'Whiteside', 'Lee', 'DeKalb', 'Bureau', 'Putnam', 'LaSalle',
  'Grundy', 'Will', 'Kankakee', 'Livingston', 'Iroquois',
] as const satisfies readonly ILCountyName[];

// 309's two halves: the Quad Cities block came from 815, the
// Peoria/Bloomington block from 217 (both in the 1957 merge-split).
const NW309 = [
  'Rock Island', 'Mercer', 'Henderson', 'Warren', 'Knox', 'Henry',
  'Stark',
] as const satisfies readonly ILCountyName[];
const P309 = [
  'Peoria', 'Tazewell', 'Woodford', 'Marshall', 'Fulton', 'McDonough',
  'Mason', 'McLean',
] as const satisfies readonly ILCountyName[];

const C217 = [
  'Adams', 'Brown', 'Cass', 'Schuyler', 'Hancock', 'Pike', 'Scott',
  'Morgan', 'Menard', 'Sangamon', 'Logan', 'De Witt', 'Macon', 'Piatt',
  'Champaign', 'Vermilion', 'Ford', 'Douglas', 'Edgar', 'Coles', 'Clark',
  'Cumberland', 'Moultrie', 'Shelby', 'Christian', 'Montgomery',
  'Macoupin', 'Greene', 'Effingham',
] as const satisfies readonly ILCountyName[];

// East St. Louis side: 217 until the 1954 reassignment.
const METROEAST = [
  'Madison', 'St. Clair', 'Monroe',
] as const satisfies readonly ILCountyName[];

const C618 = [
  'Randolph', 'Perry', 'Jackson', 'Union', 'Alexander', 'Pulaski',
  'Massac', 'Johnson', 'Pope', 'Hardin', 'Gallatin', 'Saline',
  'Williamson', 'Franklin', 'Jefferson', 'Hamilton', 'White', 'Edwards',
  'Wabash', 'Richland', 'Lawrence', 'Wayne', 'Clay', 'Marion', 'Clinton',
  'Washington', 'Bond', 'Fayette', 'Crawford', 'Jasper', 'Jersey',
  'Calhoun',
] as const satisfies readonly ILCountyName[];

// Chicagoland (original 312, then the 708 ring years).
const METRO = [
  'Cook', 'Lake', 'DuPage', 'Kane', 'Kendall',
] as const satisfies readonly ILCountyName[];
const C630 = ['DuPage', 'Kane', 'Kendall'] as const satisfies readonly ILCountyName[];

// City of Chicago (all of it 312 1989-96, then 773 outside the Loop):
// an L along the lakeshore, wider up north, trailing south along the
// lake; overshoots east into Lake Michigan. North edge y=214 is shared
// with the 847 strip above it.
const CITY_D = 'M661,214 L670,214 L670,224.5 L664,224.5 L664,221.5 L661,221.5 Z';
// The Loop: painted above the city L.
const LOOP_D = 'M664.6,215.7 L668,215.7 L668,217.4 L664.6,217.4 Z';
// 847's north-Cook strip (Evanston..Palatine): overshoots north into
// Lake county (also 847) and east into the lake.
const NSTRIP_D = 'M654.5,209.5 L670,209.5 L670,214 L654.5,214 Z';

const regions: StateRegionList<ILCountyName> = [
  // 1947-1957: 815 owns the northwest out to the Quad Cities.
  { code: '815', established: 1947, retired: 1957,
    counties: [...C815, ...NW309] },
  // 1947-1954: 217 reaches from Peoria down over the Metro East.
  { code: '217', established: 1947, retired: 1954,
    counties: [...C217, ...P309, ...METROEAST] },
  { code: '618', established: 1947, retired: 1954, counties: C618 },

  // 1954: East St. Louis and Alton move to 618 (730 overlay 2023).
  { code: '618', established: 1954,
    counties: [...C618, ...METROEAST],
    overlays: [{ code: '730', established: 2023 }] },
  { code: '217', established: 1954, retired: 1957,
    counties: [...C217, ...P309] },

  // 1957: 309 = west half of 815 + north end of 217 (861 overlay 2023).
  { code: '309', established: 1957,
    counties: [...NW309, ...P309],
    overlays: [{ code: '861', established: 2023 }] },
  { code: '815', established: 1957, counties: C815,
    overlays: [{ code: '779', established: 2007 }] },
  { code: '217', established: 1957, counties: C217,
    overlays: [{ code: '447', established: 2021 }] },

  // 1947-1989: 312 = Chicago plus the collar counties.
  { code: '312', established: 1947, retired: 1989, counties: METRO },

  // 1989: 708 takes the whole suburban ring; the city stays 312 (the
  // `d` blob below, painted above this base).
  { code: '708', established: 1989, retired: 1996, counties: METRO },

  // 1996: the ring splits — 847 north (Lake county + the Cook strip),
  // 630 west, 708 keeps south/west Cook (464 overlay 2022).
  { code: '847', established: 1996, counties: ['Lake'], labelSize: 7,
    overlays: [{ code: '224', established: 2002 }] },
  { code: '630', established: 1996, counties: C630, labelSize: 7,
    labelX: 655.1, labelY: 219.6,
    overlays: [{ code: '331', established: 2007 }] },
  { code: '708', established: 1996, counties: ['Cook'], labelSize: 6,
    labelX: 658, labelY: 222.5,
    overlays: [{ code: '464', established: 2022 }] },

  // --- metro `d` blobs, painted above the county bases ---

  // 847's north-Cook strip: label-less (the Lake county region above
  // carries the 847 label); same overlay so the stripes-free blue matches.
  { code: '847', established: 1996, d: NSTRIP_D,
    overlays: [{ code: '224', established: 2002 }] },

  // 1989-1996: the city is all 312.
  { code: '312', established: 1989, retired: 1996, d: CITY_D,
    labelX: 662.9, labelY: 219.3, labelSize: 6 },

  // 1996: 773 = the city outside the Loop; 312 = the Loop (both gain
  // the 872 overlay in Nov 2009).
  { code: '773', established: 1996, d: CITY_D,
    labelX: 662.9, labelY: 219.3, labelSize: 5,
    overlays: [{ code: '872', established: 2009 }] },
  { code: '312', established: 1996, d: LOOP_D,
    labelX: 665.8, labelY: 216.5, labelSize: 5,
    overlays: [{ code: '872', established: 2009 }] },
];

export default regions;
