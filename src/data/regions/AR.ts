// Arkansas — 501 statewide (1947). The split tree:
//   Apr 1997: 870 takes the east, south, and most of the north
//         (Jonesboro, Pine Bluff, Texarkana, El Dorado, the Delta) —
//         a C-shape around central AR; 501 keeps the center + northwest.
//   Jan 2002: 479 takes the northwest (Fayetteville, Fort Smith,
//         Russellville); 501 shrinks to Little Rock/Hot Springs/Conway.
// Overlay: 327 on 870 (in service Feb 2024).
//
// Split counties assigned whole: Carroll (Berryville; Eureka Springs is
// the 479 sliver) -> 870; Pope (Russellville) -> 479; Cleburne (Heber
// Springs) -> 501 — the 870 article's prefix-derived list bleeds into
// both. Clark (Arkadelphia, 870-246) -> 870. The three groups tile all
// 75 counties exactly once.
//
// Sources: the 479 and 501 Wikipedia articles enumerate their counties;
// 870 = the remainder, cross-checked against its prefix table.
import type { StateRegionList } from './types';
import type { ARCountyName } from '../counties/AR';

const M479 = [
  'Benton', 'Crawford', 'Franklin', 'Johnson', 'Logan', 'Madison',
  'Polk', 'Pope', 'Scott', 'Sebastian', 'Washington', 'Yell',
] as const satisfies readonly ARCountyName[];

const M501 = [
  'Cleburne', 'Conway', 'Faulkner', 'Garland', 'Hot Spring', 'Lonoke',
  'Perry', 'Pulaski', 'Saline', 'Van Buren', 'White',
] as const satisfies readonly ARCountyName[];

const M870 = [
  'Arkansas', 'Ashley', 'Baxter', 'Boone', 'Bradley', 'Calhoun',
  'Carroll', 'Chicot', 'Clark', 'Clay', 'Cleveland', 'Columbia',
  'Craighead', 'Crittenden', 'Cross', 'Dallas', 'Desha', 'Drew',
  'Fulton', 'Grant', 'Greene', 'Hempstead', 'Howard', 'Independence',
  'Izard', 'Jackson', 'Jefferson', 'Lafayette', 'Lawrence', 'Lee',
  'Lincoln', 'Little River', 'Marion', 'Miller', 'Mississippi',
  'Monroe', 'Montgomery', 'Nevada', 'Newton', 'Ouachita', 'Phillips',
  'Pike', 'Poinsett', 'Prairie', 'Randolph', 'Searcy', 'Sevier',
  'Sharp', 'St. Francis', 'Stone', 'Union', 'Woodruff',
] as const satisfies readonly ARCountyName[];

const regions: StateRegionList<ARCountyName> = [
  // 1947-1997: one code for the whole state.
  { code: '501', established: 1947, retired: 1997 },

  // 1997-2002: 501 = the center + northwest.
  { code: '501', established: 1997, retired: 2002,
    counties: [...M501, ...M479] },

  // 1997: 870 = the C-shape around it; label pinned to Woodruff — the
  // bbox center falls inside 501.
  { code: '870', established: 1997, counties: M870,
    labelX: 612.0, labelY: 375.6,
    overlays: [{ code: '327', established: 2024 }] },

  // 2002: the northwest goes 479.
  { code: '479', established: 2002, counties: M479 },
  { code: '501', established: 2002, counties: M501 },
];

export default regions;
