// Iowa — THREE original codes (1947), vertical bands: 712 west (Sioux
// City, Council Bluffs), 515 central (Des Moines, Fort Dodge, Mason
// City), 319 east (Cedar Rapids, Davenport, Waterloo). 712 has never
// changed. The 2000s splits:
//   Jul 2000: 641 takes 515's rural ring — a horseshoe from Mason City
//         around through Marshalltown, Ottumwa, and Creston; 515 keeps
//         the Des Moines-Fort Dodge column.
//   Mar 2001: 563 takes 319's Mississippi band (Dubuque, Davenport,
//         Clinton, Decorah, Muscatine); 319 keeps Cedar Rapids, Iowa
//         City, Waterloo, Burlington. No overlays.
// (Converted from the old vertical-divider `d` shapes to county lists.)
//
// Lines by county seat / prefix: Toledo (Tama, 641-484), New Hampton
// (Chickasaw), Guthrie Center + Panora (Guthrie), Greenfield (Adair),
// Corning (Adams), Sigourney (Keokuk) -> 641; Allison (Butler,
// 319-267), Grundy Center (319-825), Anamosa (Jones), Keosauqua (Van
// Buren) -> 319; Tipton (Cedar, 563-886), Cresco (Howard), Muscatine
// -> 563; Estherville (Emmet), Emmetsburg (Palo Alto), Rockwell City
// (Calhoun), Bedford (Taylor) -> 712; Algona (Kossuth), Jefferson
// (Greene) -> 515. The five groups tile all 99 counties exactly once.
import type { StateRegionList } from './types';
import type { IACountyName } from '../counties/IA';

const M712 = [
  'Lyon', 'Osceola', 'Dickinson', 'Emmet', 'Sioux', 'O Brien', 'Clay',
  'Palo Alto', 'Plymouth', 'Cherokee', 'Buena Vista', 'Pocahontas',
  'Woodbury', 'Ida', 'Sac', 'Calhoun', 'Monona', 'Crawford', 'Carroll',
  'Harrison', 'Shelby', 'Audubon', 'Pottawattamie', 'Cass', 'Mills',
  'Montgomery', 'Fremont', 'Page', 'Taylor',
] as const satisfies readonly IACountyName[];

const M515 = [
  'Kossuth', 'Humboldt', 'Webster', 'Wright', 'Hamilton', 'Boone',
  'Greene', 'Story', 'Polk', 'Dallas', 'Madison', 'Warren',
] as const satisfies readonly IACountyName[];

const M641 = [
  'Winnebago', 'Worth', 'Mitchell', 'Hancock', 'Cerro Gordo', 'Floyd',
  'Chickasaw', 'Franklin', 'Hardin', 'Marshall', 'Tama', 'Jasper',
  'Poweshiek', 'Mahaska', 'Keokuk', 'Marion', 'Monroe', 'Wapello',
  'Jefferson', 'Davis', 'Appanoose', 'Wayne', 'Lucas', 'Clarke',
  'Decatur', 'Ringgold', 'Union', 'Adams', 'Adair', 'Guthrie',
] as const satisfies readonly IACountyName[];

const M563 = [
  'Howard', 'Winneshiek', 'Allamakee', 'Fayette', 'Clayton',
  'Delaware', 'Dubuque', 'Jackson', 'Clinton', 'Cedar', 'Scott',
  'Muscatine',
] as const satisfies readonly IACountyName[];

const M319 = [
  'Black Hawk', 'Bremer', 'Butler', 'Grundy', 'Buchanan', 'Benton',
  'Linn', 'Jones', 'Iowa', 'Johnson', 'Washington', 'Louisa', 'Henry',
  'Des Moines', 'Lee', 'Van Buren',
] as const satisfies readonly IACountyName[];

const regions: StateRegionList<IACountyName> = [
  // 712 = the west, unchanged since 1947.
  { code: '712', established: 1947, counties: M712 },

  // 1947-2000: 515 = the full central band, Minnesota to Missouri.
  { code: '515', established: 1947, retired: 2000,
    counties: [...M515, ...M641] },

  // 1947-2001: 319 = the full east.
  { code: '319', established: 1947, retired: 2001,
    counties: [...M319, ...M563] },

  // 2000: the rural horseshoe goes 641 (label pinned to Mahaska — the
  // wrap-around's bbox center falls in 515's column).
  { code: '641', established: 2000, counties: M641,
    labelX: 581.0, labelY: 234.1 },
  { code: '515', established: 2000, counties: M515 },

  // 2001: the Mississippi band goes 563.
  { code: '563', established: 2001, counties: M563 },
  { code: '319', established: 2001, counties: M319 },
];

export default regions;
