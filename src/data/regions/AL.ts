// Alabama — 205 statewide (1947). The split tree:
//   Jan 1995: 334 takes the southern half (Montgomery, Mobile, Dothan,
//         Auburn); 205 keeps the north.
//   Mar 1998: 256 takes the north and east (Huntsville, the Shoals,
//         Gadsden, Anniston); 205 shrinks to central-west
//         (Birmingham, Tuscaloosa).
//   Jun 2001: 251 takes the southwest corner (Mobile, Baldwin).
// Overlays: 938 on 256 (Jul 2010, Alabama's first); 659 on 205
// (Oct 2019); 483 on 334 (in service Feb 26, 2026).
//
// Partial counties assigned whole by county seat: Etowah (Gadsden),
// Franklin (Russellville), Calhoun (Anniston), Talladega, Tallapoosa
// (Alexander City), Randolph (Wedowee) -> 256; Blount (Oneonta),
// St. Clair (Pell City), Winston (Double Springs), Chilton (Clanton),
// Choctaw (Butler) -> 205; Elmore (Wetumpka), Wilcox (Camden) -> 334;
// 251's "parts of six other counties" -> Clarke (Grove Hill), Monroe
// (Monroeville), Escambia (Brewton), Conecuh (Evergreen) by seat.
// The four groups tile all 67 counties exactly once.
//
// Sources: the 205/659 and 256/938 Wikipedia articles enumerate their
// counties; 251 = Mobile/Baldwin/Washington + seat checks; 334 = the
// remainder (matches its Montgomery/Dothan/Auburn/Phenix City metros).
import type { StateRegionList } from './types';
import type { ALCountyName } from '../counties/AL';

const M205 = [
  'Bibb', 'Blount', 'Chilton', 'Choctaw', 'Fayette', 'Greene', 'Hale',
  'Jefferson', 'Lamar', 'Marion', 'Perry', 'Pickens', 'St. Clair',
  'Shelby', 'Sumter', 'Tuscaloosa', 'Walker', 'Winston',
] as const satisfies readonly ALCountyName[];

const M256 = [
  'Calhoun', 'Cherokee', 'Clay', 'Cleburne', 'Colbert', 'Coosa',
  'Cullman', 'DeKalb', 'Etowah', 'Franklin', 'Jackson', 'Lauderdale',
  'Lawrence', 'Limestone', 'Madison', 'Marshall', 'Morgan', 'Randolph',
  'Talladega', 'Tallapoosa',
] as const satisfies readonly ALCountyName[];

const M334 = [
  'Autauga', 'Barbour', 'Bullock', 'Butler', 'Chambers', 'Coffee',
  'Covington', 'Crenshaw', 'Dale', 'Dallas', 'Elmore', 'Geneva',
  'Henry', 'Houston', 'Lee', 'Lowndes', 'Macon', 'Marengo',
  'Montgomery', 'Pike', 'Russell', 'Wilcox',
] as const satisfies readonly ALCountyName[];

const M251 = [
  'Mobile', 'Baldwin', 'Washington', 'Clarke', 'Monroe', 'Escambia',
  'Conecuh',
] as const satisfies readonly ALCountyName[];

const regions: StateRegionList<ALCountyName> = [
  // 1947-1995: one code for the whole state.
  { code: '205', established: 1947, retired: 1995 },

  // 1995-1998: 205 = the northern half.
  { code: '205', established: 1995, retired: 1998,
    counties: [...M205, ...M256] },

  // 1995-2001: 334 = the southern half, Mobile included.
  { code: '334', established: 1995, retired: 2001,
    counties: [...M334, ...M251] },

  // 1998: 256 takes the north and east; its L-shape bends around 205,
  // so the label is pinned to Marshall County.
  { code: '205', established: 1998, counties: M205,
    overlays: [{ code: '659', established: 2019 }] },
  { code: '256', established: 1998, counties: M256,
    labelX: 705.6, labelY: 387.5,
    overlays: [{ code: '938', established: 2010 }] },

  // 2001: 251 takes the southwest corner.
  { code: '334', established: 2001, counties: M334,
    overlays: [{ code: '483', established: 2026 }] },
  { code: '251', established: 2001, counties: M251 },
];

export default regions;
