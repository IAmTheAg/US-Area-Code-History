// Nebraska — 402 statewide (1947). 1954: 308 takes the west (North
// Platte, Grand Island, Kearney, Scottsbluff, McCook); 402 keeps the east
// (Omaha, Lincoln, Norfolk, Columbus, Hastings) PLUS the north-central
// tier (Valentine, Ainsworth, O'Neill — Cherry through Holt counties are
// 402 despite being far west). 531 overlaid the 402 area in 2011.
//
// County-based since the county-map port: the old drawn stair-step was
// already simplified county lines, so the town research maps straight
// onto counties. Both sides of every old divider call check out:
// Valentine (Cherry) 402 vs Gordon (Sheridan) 308; Ainsworth (Brown) and
// O'Neill (Holt) 402 vs Thedford (Thomas), Burwell (Garfield) and
// Ericson (Wheeler) 308; Albion (Boone) and Neligh (Antelope) 402 vs Ord
// (Valley) 308; Columbus (Platte) 402 vs Genoa (Nance) 308; Osceola
// (Polk), York and Aurora (Hamilton) 402 vs Central City (Merrick) and
// Grand Island (Hall) 308; Hastings (Adams) and Red Cloud (Webster) 402
// vs Kearney (Buffalo), Minden (Kearney) and Franklin 308.
import type { StateRegionList } from './types';
import type { NECountyName } from '../counties/NE';

const M308 = [
  'Sioux', 'Dawes', 'Box Butte', 'Sheridan', 'Scotts Bluff', 'Morrill',
  'Garden', 'Banner', 'Kimball', 'Cheyenne', 'Deuel', 'Grant', 'Hooker',
  'Thomas', 'Arthur', 'McPherson', 'Logan', 'Keith', 'Perkins',
  'Lincoln', 'Chase', 'Hayes', 'Frontier', 'Dundy', 'Hitchcock',
  'Red Willow', 'Furnas', 'Gosper', 'Dawson', 'Custer', 'Blaine', 'Loup',
  'Garfield', 'Wheeler', 'Valley', 'Greeley', 'Sherman', 'Howard',
  'Merrick', 'Nance', 'Hall', 'Buffalo', 'Kearney', 'Phelps', 'Harlan',
  'Franklin',
] as const satisfies readonly NECountyName[];

const M402 = [
  'Keya Paha', 'Boyd', 'Cherry', 'Brown', 'Rock', 'Holt', 'Knox',
  'Cedar', 'Dixon', 'Dakota', 'Thurston', 'Wayne', 'Pierce', 'Antelope',
  'Madison', 'Stanton', 'Cuming', 'Burt', 'Washington', 'Dodge',
  'Colfax', 'Platte', 'Boone', 'Douglas', 'Sarpy', 'Saunders', 'Butler',
  'Polk', 'York', 'Hamilton', 'Seward', 'Lancaster', 'Cass', 'Otoe',
  'Saline', 'Fillmore', 'Clay', 'Adams', 'Webster', 'Nuckolls', 'Thayer',
  'Jefferson', 'Gage', 'Johnson', 'Nemaha', 'Pawnee', 'Richardson',
] as const satisfies readonly NECountyName[];

const regions: StateRegionList<NECountyName> = [
  // 1947-1954: one code for the whole state.
  { code: '402', established: 1947, retired: 1954 },

  // 1954-present: 308 = the west.
  { code: '308', established: 1954, counties: M308, labelSize: 11 },

  // 1954-present: 402 = the east + north-central tier; 531 overlay 2011.
  // (Label pinned east — the union bbox center falls in 308's Hall notch.)
  { code: '402', established: 1954, counties: M402,
    labelX: 508, labelY: 228.5, labelSize: 11,
    overlays: [{ code: '531', established: 2011 }] },
];

export default regions;
