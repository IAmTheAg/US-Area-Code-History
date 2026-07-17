// Louisiana — 504 statewide (1947), parishes not counties. The split tree:
//   1957: 318 takes the north and west (Shreveport, Monroe, Alexandria,
//         Lake Charles, Lafayette — "most of Louisiana west of the
//         Mississippi, Gulf to the Arkansas line"); 504 keeps the
//         southeast (New Orleans, Baton Rouge, Houma).
//   Aug 1998: 225 takes the Baton Rouge ten-parish area.
//   Oct 1999: 337 takes 318's southern half (Lafayette, Lake Charles,
//         Acadiana).
//   Feb 2001: 985 takes the ring around New Orleans — Houma/Thibodaux,
//         the river parishes, Hammond, and the north shore across Lake
//         Pontchartrain (Slidell, Covington, Bogalusa); 504 shrinks to
//         Orleans/Jefferson/St. Bernard/Plaquemines.
// Overlay: 457 on 318 (approved 2023, in service Sep 25, 2025 — the
// state's first overlay).
//
// Parish judgment calls: St. Mary is genuinely split (Franklin, the
// seat, is 337; Morgan City/Berwick/Patterson are 985) — the bulk is
// 985, and that also keeps history right (Morgan City was 504, never
// 318). Grand Isle (a Jefferson Parish coastal exclave) is really 985
// but rides with Jefferson -> 504 whole-parish. The five groups tile
// all 64 parishes exactly once.
//
// Sources: the 225 article enumerates its ten parishes; 985 and 337
// parish sets mapped from their articles' city lists; 318 = remainder.
import type { StateRegionList } from './types';
import type { LACountyName } from '../counties/LA';

const M504 = [
  'Orleans', 'Jefferson', 'St. Bernard', 'Plaquemines',
] as const satisfies readonly LACountyName[];

const M985 = [
  'St. Tammany', 'Tangipahoa', 'Washington', 'St. Charles',
  'St. John the Baptist', 'Lafourche', 'Terrebonne', 'Assumption',
  'St. Mary',
] as const satisfies readonly LACountyName[];

const M225 = [
  'Ascension', 'East Baton Rouge', 'East Feliciana', 'Iberville',
  'Livingston', 'Pointe Coupee', 'St. Helena', 'St. James',
  'West Baton Rouge', 'West Feliciana',
] as const satisfies readonly LACountyName[];

const M337 = [
  'Calcasieu', 'Cameron', 'Beauregard', 'Allen', 'Jefferson Davis',
  'Acadia', 'Vermilion', 'Lafayette', 'St. Landry', 'Evangeline',
  'St. Martin', 'Iberia',
] as const satisfies readonly LACountyName[];

const M318 = [
  'Caddo', 'Bossier', 'Webster', 'Claiborne', 'Union', 'Morehouse',
  'West Carroll', 'East Carroll', 'Madison', 'Richland', 'Ouachita',
  'Lincoln', 'Bienville', 'Jackson', 'Caldwell', 'Franklin', 'Tensas',
  'Concordia', 'Catahoula', 'LaSalle', 'Winn', 'Grant', 'Natchitoches',
  'Red River', 'De Soto', 'Sabine', 'Vernon', 'Rapides', 'Avoyelles',
] as const satisfies readonly LACountyName[];

const regions: StateRegionList<LACountyName> = [
  // 1947-1957: one code for the whole state.
  { code: '504', established: 1947, retired: 1957 },

  // 1957-1998: 504 = the southeast.
  { code: '504', established: 1957, retired: 1998,
    counties: [...M504, ...M985, ...M225] },

  // 1957-1999: 318 = everything else.
  { code: '318', established: 1957, retired: 1999,
    counties: [...M318, ...M337] },

  // 1998-2001: Baton Rouge goes 225; 504 keeps the NOLA orbit.
  { code: '225', established: 1998, counties: M225 },
  { code: '504', established: 1998, retired: 2001,
    counties: [...M504, ...M985] },

  // 1999: Acadiana goes 337; 318 = the north (overlaid by 457 in 2025).
  { code: '337', established: 1999, counties: M337 },
  { code: '318', established: 1999, counties: M318,
    overlays: [{ code: '457', established: 2025 }] },

  // 2001: 985 = the horseshoe around New Orleans (label pinned to
  // Terrebonne — the bbox center falls inside 504); 504 = the metro
  // (label pinned to Orleans — Plaquemines drags the bbox into the Gulf).
  { code: '985', established: 2001, counties: M985,
    labelX: 626.6, labelY: 507.9 },
  { code: '504', established: 2001, counties: M504,
    labelX: 645.1, labelY: 492.6, labelSize: 8 },
];

export default regions;
