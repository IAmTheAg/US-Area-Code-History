// Minnesota — TWO original codes (1947): 612 as a southeastern bubble
// (Twin Cities, Rochester, St. Cloud), 218 wrapping the north AND down
// the western edge to Iowa (nazip.png shows the dip; the 507 article
// confirms 507 came "from the southwestern portion of 218 and the
// southern portion of 612"). Then 612 shed rings until it was just
// Minneapolis:
//   1954: 507 takes the southern tier (Rochester, Mankato, Austin,
//         Winona + the SW that had been 218); the western strip that
//         was 218 moves to 612's side in the same redraw.
//   Mar 1996: 320 takes the central third outside the metro (St.
//         Cloud, Willmar, Alexandria, Morris).
//   Jul 1998: 651 takes St. Paul and the east metro.
//   Feb 2000: 763 (northwest metro) and 952 (southwest metro) split
//         off; 612 = Minneapolis (Hennepin).
// Overlay: 924 on 507 (2024).
//
// Whole-county calls in the metro (the real lines cut through
// Hennepin/Dakota): Hennepin -> 612 (Bloomington/Edina are really
// 952); Dakota -> 651 (Burnsville/Lakeville are really 952); Anoka,
// Sherburne (Elk River), Wright (Buffalo/Monticello), Isanti
// (Cambridge, 763-689) -> 763; Carver, Scott -> 952. Elsewhere by
// seat: Pine City (Pine, 320-629), Granite Falls (Yellow Medicine),
// Traverse (Wheaton, 320-563) -> 320; Red Wing (Goodhue) and Wabasha
// (651-565) -> 651; Gaylord (Sibley) -> 507; Wadena (218-631), Elbow
// Lake (Grant), Fergus Falls (Otter Tail) -> 218. The 1947-54 western
// 218 dip is approximated by the SD-border strip (Traverse..Yellow
// Medicine + Lincoln..Nobles). The seven groups tile all 87 counties
// exactly once.
// (Converted from the old quadrant `d` shapes to county lists.)
import type { StateRegionList } from './types';
import type { MNCountyName } from '../counties/MN';

const M218 = [
  'Kittson', 'Roseau', 'Lake of the Woods', 'Marshall', 'Pennington',
  'Red Lake', 'Polk', 'Norman', 'Mahnomen', 'Clearwater', 'Beltrami',
  'Koochiching', 'St. Louis', 'Lake', 'Cook', 'Itasca', 'Cass',
  'Crow Wing', 'Aitkin', 'Carlton', 'Hubbard', 'Becker', 'Clay',
  'Wilkin', 'Otter Tail', 'Wadena', 'Grant',
] as const satisfies readonly MNCountyName[];

const M320 = [
  'Stearns', 'Benton', 'Morrison', 'Mille Lacs', 'Kanabec', 'Pine',
  'Meeker', 'McLeod', 'Renville', 'Kandiyohi', 'Swift', 'Chippewa',
  'Lac qui Parle', 'Yellow Medicine', 'Big Stone', 'Stevens', 'Pope',
  'Douglas', 'Todd', 'Traverse',
] as const satisfies readonly MNCountyName[];

const M507 = [
  'Rock', 'Nobles', 'Jackson', 'Martin', 'Faribault', 'Freeborn',
  'Mower', 'Fillmore', 'Houston', 'Winona', 'Olmsted', 'Dodge',
  'Steele', 'Waseca', 'Blue Earth', 'Nicollet', 'Le Sueur', 'Rice',
  'Brown', 'Watonwan', 'Cottonwood', 'Murray', 'Pipestone', 'Lyon',
  'Lincoln', 'Redwood', 'Sibley',
] as const satisfies readonly MNCountyName[];

const M651 = [
  'Ramsey', 'Washington', 'Dakota', 'Chisago', 'Goodhue', 'Wabasha',
] as const satisfies readonly MNCountyName[];

const M763 = [
  'Anoka', 'Sherburne', 'Wright', 'Isanti',
] as const satisfies readonly MNCountyName[];

const M952 = [
  'Carver', 'Scott',
] as const satisfies readonly MNCountyName[];

const M612 = [
  'Hennepin',
] as const satisfies readonly MNCountyName[];

// The 1947-54 western dip: today's SD-border counties rode with 218
// until the 1954 redraw (rough — the true line is not documented).
const SW507 = [
  'Lincoln', 'Lyon', 'Pipestone', 'Murray', 'Rock', 'Nobles',
] as const satisfies readonly MNCountyName[];
const W320 = [
  'Traverse', 'Big Stone', 'Stevens', 'Swift', 'Lac qui Parle',
  'Chippewa', 'Yellow Medicine',
] as const satisfies readonly MNCountyName[];

const E507 = M507.filter((n) => !(SW507 as readonly string[]).includes(n));
const E320 = M320.filter((n) => !(W320 as readonly string[]).includes(n));
const METRO = [...M612, ...M651, ...M763, ...M952] as const;

const regions: StateRegionList<MNCountyName> = [
  // 1947-1954: 218 = the north plus the western dip.
  { code: '218', established: 1947, retired: 1954,
    counties: [...M218, ...SW507, ...W320] },
  { code: '612', established: 1947, retired: 1954,
    counties: [...E507, ...E320, ...METRO] },

  // 1954: the southern tier goes 507; 218 settles on today's line.
  { code: '218', established: 1954, counties: M218 },
  { code: '507', established: 1954, counties: M507,
    overlays: [{ code: '924', established: 2024 }] },
  { code: '612', established: 1954, retired: 1996,
    counties: [...M320, ...METRO] },

  // 1996: the central third goes 320.
  { code: '320', established: 1996, counties: M320 },
  { code: '612', established: 1996, retired: 1998, counties: METRO },

  // 1998: St. Paul's side goes 651 (label pinned to Dakota — the
  // column's bbox center falls just outside).
  { code: '651', established: 1998, counties: M651,
    labelX: 571.8, labelY: 157.1, labelSize: 8 },
  { code: '612', established: 1998, retired: 2000,
    counties: [...M612, ...M763, ...M952] },

  // 2000: 763 north metro, 952 south metro, 612 = Minneapolis.
  { code: '763', established: 2000, counties: M763, labelSize: 8 },
  { code: '952', established: 2000, counties: M952, labelSize: 8 },
  { code: '612', established: 2000, counties: M612, labelSize: 7 },
];

export default regions;
