// New Jersey — 201 statewide (1947). 1956: 609 takes the south (Trenton,
// Camden, Atlantic City, the shore below Barnegat); 201 keeps the north.
// June 1991: 908 splits from 201, taking the central band (Warren,
// Hunterdon, Somerset, Union, Middlesex, Monmouth, northern Ocean).
// 1997 doubles the map: January — 732 splits from 908 (the eastern half:
// Middlesex, Monmouth, northern Ocean: New Brunswick, Toms River); June —
// 973 splits from 201 (everything west of Bergen/Hudson: Newark, Paterson,
// Morristown, Sussex), 201 keeps only the Bergen/Hudson strip (Hackensack,
// Jersey City). June 1999: 856 splits from 609 (southwest: Camden, Cherry
// Hill, Vineland, Salem). Overlays: 551 on 201, 862 on 973, 848 on 732
// (all December 2001); 640 on 609 (September 2018). 908 and 856 have never
// been overlaid. End state: 6 regions, 10 codes.
//
// County-based since the county-map port — every divider is county-clean
// EXCEPT the 1956 line across Ocean County (Toms River stayed 201 ->
// 908 -> 732; Barnegat/LBI/Tuckerton went 609 and stayed there). Ocean
// rides whole-county with the 732 lineage, and one label-less 609 `d`
// sliver (established 1956, never retired, 640-overlaid like the rest of
// 609) paints over its southern strip in every era. Only the sliver's
// north edge matters — it reuses the old ported line-A vertices
// (899,221.2) -> (903.1,226.6), south of Toms River, north of Barnegat —
// the rest overshoots into the Atlantic and into Burlington/Atlantic
// counties, which are 609/640 anyway (same code + overlay, so the
// overpaint is invisible and hover still answers 609).
// City checks by county membership: Newark (Essex) + Paterson (Passaic)
// 973 vs Hackensack/Ridgewood (Bergen) + Jersey City (Hudson) 201;
// Elizabeth + Plainfield (Union) 908 vs Piscataway/Woodbridge/New
// Brunswick (Middlesex) 732; Trenton + Princeton (Mercer) 609; Cherry
// Hill (Camden) + Vineland (Cumberland) + Salem 856 vs Hammonton
// (Atlantic) 609. Whole-county roughness: Burlington -> 609 (county seat
// Mount Holly) although its Camden-suburb edge (Mt Laurel, Marlton,
// Moorestown) is really 856 — the old drawn line E had those right;
// accepted to keep the south county-clean.
import type { StateRegionList } from './types';
import type { NJCountyName } from '../counties/NJ';

const BERGEN_HUDSON = [
  'Bergen', 'Hudson',
] as const satisfies readonly NJCountyName[];
const N973 = [
  'Sussex', 'Passaic', 'Morris', 'Essex',
] as const satisfies readonly NJCountyName[];
const C908 = [
  'Warren', 'Hunterdon', 'Somerset', 'Union',
] as const satisfies readonly NJCountyName[];
// Ocean whole-county: its southern strip is repainted 609 by the sliver.
const C732 = [
  'Middlesex', 'Monmouth', 'Ocean',
] as const satisfies readonly NJCountyName[];
const S609 = [
  'Mercer', 'Burlington', 'Atlantic', 'Cape May',
] as const satisfies readonly NJCountyName[];
const SW856 = [
  'Camden', 'Gloucester', 'Salem', 'Cumberland',
] as const satisfies readonly NJCountyName[];

// Southern Ocean County, 609 since 1956: north edge = the old ported
// 1956 line A across Ocean; everything else overshoots into the ocean
// and into 609 counties.
const SOUTH_OCEAN_D =
  'M896.9,219.7 L899,221.2 L903.1,226.6 L905.5,229.2 L907,232 L903,237 L893,236 L894.5,222.6 Z';

const regions: StateRegionList<NJCountyName> = [
  // 1947-1956: one code for the whole state.
  { code: '201', established: 1947, retired: 1956 },

  // 1956-1991: 201 = everything north of line A (southern Ocean carved
  // out by the 609 sliver below).
  { code: '201', established: 1956, retired: 1991,
    counties: [...BERGEN_HUDSON, ...N973, ...C908, ...C732],
    labelX: 890.9, labelY: 205.8, labelSize: 10 },

  // 1956-1999: 609 = the whole south.
  { code: '609', established: 1956, retired: 1999,
    counties: [...S609, ...SW856], labelSize: 9 },

  // 1991-1997: 908 takes the central band; 201 keeps the northeast.
  { code: '201', established: 1991, retired: 1997,
    counties: [...BERGEN_HUDSON, ...N973], labelSize: 10 },
  { code: '908', established: 1991, retired: 1997,
    counties: [...C908, ...C732],
    labelX: 888.7, labelY: 210.9, labelSize: 9 },

  // 1997-present: the north in its final shape.
  { code: '973', established: 1997, counties: N973, labelSize: 9,
    overlays: [{ code: '862', established: 2001 }] },
  { code: '201', established: 1997, counties: BERGEN_HUDSON,
    labelX: 897.8, labelY: 200.6, labelSize: 6,
    overlays: [{ code: '551', established: 2001 }] },
  { code: '908', established: 1997, counties: C908, labelSize: 8 },
  { code: '732', established: 1997, counties: C732, labelSize: 7,
    overlays: [{ code: '848', established: 2001 }] },

  // 1999-present: 856 = the southwest; 609 keeps the rest (640 overlay
  // 2018).
  { code: '609', established: 1999, counties: S609, labelSize: 9,
    overlays: [{ code: '640', established: 2018 }] },
  { code: '856', established: 1999, counties: SW856, labelSize: 8 },

  // Southern Ocean stayed 609 through every era: label-less sliver
  // painted above the county layers (matching 640 overlay so the fill
  // never disagrees with the county 609).
  { code: '609', established: 1956, d: SOUTH_OCEAN_D,
    overlays: [{ code: '640', established: 2018 }] },
];

export default regions;
