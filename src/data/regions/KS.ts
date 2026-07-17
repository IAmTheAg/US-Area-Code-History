// Kansas — TWO original codes (1947): 913 north, 316 south (the line
// ran roughly along K-4/K-96, Colorado to Missouri). The split tree:
//   Jul 1997: 785 takes northern Kansas outside the KC metro (Topeka,
//         Manhattan, Salina, Hays); 913 shrinks to the six KC-side
//         counties.
//   Feb 2001: 620 takes southern Kansas outside the Wichita metro
//         (Hutchinson, Dodge City, Garden City, Emporia, Pittsburg);
//         316 shrinks to the Wichita doughnut hole. No overlays.
// (Converted from the old horizontal-divider `d` shapes to county lists.)
//
// Judgment calls: 316 really keeps only parts of Butler/Harvey/Kingman/
// Reno/Sumner — whole-county, El Dorado (Butler) and Newton (Harvey)
// are 316, so those two stay; Hutchinson (Reno), Kingman, and
// Wellington (Sumner) are 620, so those go. 785's partial counties by
// seat: Doniphan (Troy) and Jefferson (Oskaloosa) -> 785; Coffey
// (Burlington), Lyon (Emporia), Morris (Council Grove), McPherson ->
// 620. The Elwood 913 sliver in Doniphan rides with 785. The four
// groups tile all 105 counties exactly once.
//
// Sources: the 913 and 785 Wikipedia articles enumerate their counties;
// 316 from its article's kept-county note; 620 = the remainder.
import type { StateRegionList } from './types';
import type { KSCountyName } from '../counties/KS';

const M913 = [
  'Wyandotte', 'Johnson', 'Leavenworth', 'Miami', 'Linn', 'Atchison',
] as const satisfies readonly KSCountyName[];

const M785 = [
  'Anderson', 'Brown', 'Cheyenne', 'Clay', 'Cloud', 'Decatur',
  'Dickinson', 'Doniphan', 'Douglas', 'Ellis', 'Ellsworth', 'Franklin',
  'Geary', 'Gove', 'Graham', 'Jackson', 'Jefferson', 'Jewell',
  'Lincoln', 'Logan', 'Marshall', 'Mitchell', 'Nemaha', 'Ness',
  'Norton', 'Osage', 'Osborne', 'Ottawa', 'Phillips', 'Pottawatomie',
  'Rawlins', 'Republic', 'Riley', 'Rooks', 'Rush', 'Russell', 'Saline',
  'Shawnee', 'Sheridan', 'Sherman', 'Smith', 'Thomas', 'Trego',
  'Wabaunsee', 'Wallace', 'Washington',
] as const satisfies readonly KSCountyName[];

const M316 = [
  'Sedgwick', 'Butler', 'Harvey',
] as const satisfies readonly KSCountyName[];

const M620 = [
  'Allen', 'Barber', 'Barton', 'Bourbon', 'Chase', 'Chautauqua',
  'Cherokee', 'Clark', 'Coffey', 'Comanche', 'Cowley', 'Crawford',
  'Edwards', 'Elk', 'Finney', 'Ford', 'Grant', 'Gray', 'Greeley',
  'Greenwood', 'Hamilton', 'Harper', 'Haskell', 'Hodgeman', 'Kearny',
  'Kingman', 'Kiowa', 'Labette', 'Lane', 'Lyon', 'Marion', 'McPherson',
  'Meade', 'Montgomery', 'Morris', 'Morton', 'Neosho', 'Pawnee',
  'Pratt', 'Reno', 'Rice', 'Scott', 'Seward', 'Stafford', 'Stanton',
  'Stevens', 'Sumner', 'Wichita', 'Wilson', 'Woodson',
] as const satisfies readonly KSCountyName[];

const regions: StateRegionList<KSCountyName> = [
  // 1947-1997: 913 = the northern half.
  { code: '913', established: 1947, retired: 1997,
    counties: [...M913, ...M785] },

  // 1947-2001: 316 = the southern half.
  { code: '316', established: 1947, retired: 2001,
    counties: [...M316, ...M620] },

  // 1997: 785 takes the north outside KC; 913's column of six gets its
  // label pinned to Johnson County.
  { code: '785', established: 1997, counties: M785 },
  { code: '913', established: 1997, counties: M913,
    labelX: 544.0, labelY: 291.4, labelSize: 9 },

  // 2001: 620 takes the south outside the Wichita doughnut hole.
  { code: '620', established: 2001, counties: M620 },
  { code: '316', established: 2001, counties: M316 },
];

export default regions;
