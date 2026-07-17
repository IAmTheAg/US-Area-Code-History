// Mississippi — 601 statewide (1947). The split tree:
//   1997: 228 takes the three Gulf Coast counties (Biloxi, Gulfport,
//         Pascagoula).
//   1999: 662 takes the northern half (Memphis suburbs, Oxford, Tupelo,
//         Starkville/Columbus, the Delta, down through Yazoo City);
//         601 keeps central/south (Jackson, Meridian, Hattiesburg).
// Overlays: 769 on 601 (2005, the state's first); 471 on 662 (in
// service Jan 30, 2026).
//
// The 601/662 line from the 662 article's city list mapped to counties
// (Yazoo City, Lexington, Belzoni, Kosciusko, Louisville, Macon,
// Greenville all -> 662). Three counties no source names, assigned by
// neighborhood: Tippah (Ripley, on the TN border, surrounded by 662)
// -> 662; Sharkey and Issaquena (lower Delta, Rolling Fork; cluster
// with the 662 Delta towns) -> 662; Kemper (De Kalb, Meridian's
// sphere) -> 601. The three groups tile all 82 counties exactly once.
import type { StateRegionList } from './types';
import type { MSCountyName } from '../counties/MS';

const M228 = [
  'Hancock', 'Harrison', 'Jackson',
] as const satisfies readonly MSCountyName[];

const M662 = [
  'DeSoto', 'Marshall', 'Benton', 'Tippah', 'Alcorn', 'Tishomingo',
  'Tunica', 'Tate', 'Panola', 'Lafayette', 'Union', 'Pontotoc', 'Lee',
  'Prentiss', 'Itawamba', 'Coahoma', 'Quitman', 'Yalobusha', 'Calhoun',
  'Chickasaw', 'Monroe', 'Bolivar', 'Sunflower', 'Leflore',
  'Tallahatchie', 'Grenada', 'Carroll', 'Montgomery', 'Webster', 'Clay',
  'Lowndes', 'Oktibbeha', 'Choctaw', 'Washington', 'Humphreys',
  'Holmes', 'Attala', 'Winston', 'Noxubee', 'Yazoo', 'Sharkey',
  'Issaquena',
] as const satisfies readonly MSCountyName[];

const M601 = [
  'Adams', 'Amite', 'Claiborne', 'Clarke', 'Copiah', 'Covington',
  'Forrest', 'Franklin', 'George', 'Greene', 'Hinds', 'Jasper',
  'Jefferson', 'Jefferson Davis', 'Jones', 'Kemper', 'Lamar',
  'Lauderdale', 'Lawrence', 'Leake', 'Lincoln', 'Madison', 'Marion',
  'Neshoba', 'Newton', 'Pearl River', 'Perry', 'Pike', 'Rankin',
  'Scott', 'Simpson', 'Smith', 'Stone', 'Walthall', 'Warren', 'Wayne',
  'Wilkinson',
] as const satisfies readonly MSCountyName[];

const regions: StateRegionList<MSCountyName> = [
  // 1947-1997: one code for the whole state.
  { code: '601', established: 1947, retired: 1997 },

  // 1997-1999: 601 = everything but the coast.
  { code: '601', established: 1997, retired: 1999,
    counties: [...M601, ...M662] },
  { code: '228', established: 1997, counties: M228, labelSize: 8 },

  // 1999: 662 takes the north.
  { code: '601', established: 1999, counties: M601,
    overlays: [{ code: '769', established: 2005 }] },
  { code: '662', established: 1999, counties: M662,
    overlays: [{ code: '471', established: 2026 }] },
];

export default regions;
