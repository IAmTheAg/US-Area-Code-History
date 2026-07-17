// Missouri — TWO original codes (1947): 314 east (St. Louis, plus
// Columbia/Jefferson City), 816 west (Kansas City, Springfield). Both
// metros then shed their hinterlands in the 90s:
//   1950: 417 takes the southwest (Springfield, Joplin, later Branson)
//         from 816.
//   Jan 1996: 573 takes eastern MO outside metro St. Louis (Columbia,
//         Jefferson City, Rolla, Cape Girardeau, the Bootheel).
//   Oct 1997: 660 takes 816's rural north and east (Maryville,
//         Kirksville, Marshall, Sedalia, Warrensburg); 816 = KC metro
//         + St. Joseph.
//   1999: 636 takes the St. Louis exurban ring (St. Charles, Jefferson
//         Co., Franklin, Warren, Lincoln); 314 = St. Louis city +
//         county.
// Overlays: 557 on 314 (2022); 235 on 573 (2023); 975 on 816 (approved
// back in 2001, suspended for two decades, finally live Oct 2023).
// 417 and 660 and 636 have no overlays.
// (Converted from the old vertical-divider `d` shapes to county lists.)
//
// The 1947 314/816 line is approximated by today's (314+636+573) vs
// (816+660+417) boundary — sources put Columbia/Jeff City on the 314
// side, consistent with them being 573 now. Only the 636 article
// enumerates counties; the other lines are county-seat checks, notably:
// Lexington (Lafayette), Warrensburg (Johnson), Clinton (Henry), Butler
// (Bates), Gallatin (Daviess), Paris (Monroe) -> 660; Hamilton
// (Caldwell), Maysville (DeKalb), Savannah (Andrew) -> 816; Osceola
// (St. Clair), Nevada (Vernon), Stockton (Cedar), Alton (Oregon),
// Houston (Texas) -> 417; Versailles (Morgan), California (Moniteau),
// Camdenton (Camden), Waynesville (Pulaski), Shelbina (Shelby), Canton
// (Lewis) -> 573. 636's High Hill/Jonesburg nibble of Montgomery stays
// 573 whole-county. The six groups tile all 115 shapes exactly once.
import type { StateRegionList } from './types';
import type { MOCountyName } from '../counties/MO';

const M314 = [
  'St. Louis', 'St. Louis Co.',
] as const satisfies readonly MOCountyName[];

const M636 = [
  'St. Charles', 'Jefferson', 'Warren', 'Franklin', 'Lincoln',
] as const satisfies readonly MOCountyName[];

const M816 = [
  'Jackson', 'Clay', 'Platte', 'Cass', 'Ray', 'Clinton', 'Caldwell',
  'Buchanan', 'Andrew', 'DeKalb',
] as const satisfies readonly MOCountyName[];

const M660 = [
  'Atchison', 'Nodaway', 'Holt', 'Worth', 'Gentry', 'Harrison',
  'Mercer', 'Putnam', 'Schuyler', 'Scotland', 'Clark', 'Knox', 'Adair',
  'Macon', 'Randolph', 'Monroe', 'Chariton', 'Linn', 'Livingston',
  'Grundy', 'Daviess', 'Sullivan', 'Carroll', 'Saline', 'Lafayette',
  'Johnson', 'Henry', 'Bates', 'Benton', 'Pettis', 'Cooper', 'Howard',
] as const satisfies readonly MOCountyName[];

const M417 = [
  'Jasper', 'Newton', 'McDonald', 'Barry', 'Lawrence', 'Stone',
  'Taney', 'Christian', 'Greene', 'Webster', 'Douglas', 'Ozark',
  'Wright', 'Texas', 'Howell', 'Oregon', 'Dade', 'Barton', 'Vernon',
  'Cedar', 'St. Clair', 'Polk', 'Dallas', 'Hickory', 'Laclede',
] as const satisfies readonly MOCountyName[];

const M573 = [
  'Boone', 'Callaway', 'Cole', 'Moniteau', 'Morgan', 'Miller',
  'Camden', 'Pulaski', 'Maries', 'Osage', 'Gasconade', 'Montgomery',
  'Audrain', 'Pike', 'Ralls', 'Marion', 'Shelby', 'Lewis', 'Phelps',
  'Dent', 'Crawford', 'Washington', 'St. Francois', 'Ste. Genevieve',
  'Perry', 'Madison', 'Iron', 'Reynolds', 'Shannon', 'Carter',
  'Ripley', 'Butler', 'Wayne', 'Bollinger', 'Cape Girardeau', 'Scott',
  'Stoddard', 'Mississippi', 'New Madrid', 'Pemiscot', 'Dunklin',
] as const satisfies readonly MOCountyName[];

const regions: StateRegionList<MOCountyName> = [
  // 1947-1996: 314 = the east.
  { code: '314', established: 1947, retired: 1996,
    counties: [...M314, ...M636, ...M573] },

  // 1947-1950: 816 = the west, Springfield included.
  { code: '816', established: 1947, retired: 1950,
    counties: [...M816, ...M660, ...M417] },

  // 1950: the southwest goes 417.
  { code: '417', established: 1950, counties: M417 },
  { code: '816', established: 1950, retired: 1997,
    counties: [...M816, ...M660] },

  // 1996: eastern MO outside metro St. Louis goes 573.
  { code: '573', established: 1996, counties: M573,
    overlays: [{ code: '235', established: 2023 }] },
  { code: '314', established: 1996, retired: 1999,
    counties: [...M314, ...M636] },

  // 1997: 816's rural north goes 660; 816 = KC metro + St. Joseph.
  { code: '660', established: 1997, counties: M660 },
  { code: '816', established: 1997, counties: M816,
    overlays: [{ code: '975', established: 2023 }] },

  // 1999: the exurban ring goes 636; 314 = St. Louis city + county.
  { code: '636', established: 1999, counties: M636 },
  { code: '314', established: 1999, counties: M314, labelSize: 8,
    overlays: [{ code: '557', established: 2022 }] },
];

export default regions;
