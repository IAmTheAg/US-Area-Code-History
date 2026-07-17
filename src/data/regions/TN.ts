// Tennessee — 901 statewide (1947); it was a SINGLE-code state in the
// original plan (615 is NOT an original code — originalCodes.ts agrees).
// The split tree:
//   1954: 615 flash-cut for everything east of the Tennessee River's
//         western bend; 901 keeps West Tennessee (Memphis, Jackson).
//   Sep 1995: 423 takes the east (Chattanooga, Knoxville, Tri-Cities) —
//         the state's first new code in 41 years.
//   Sep 1997: 931 takes the 28-county Middle Tennessee horseshoe;
//         615 shrinks to Nashville (Davidson) + 12 surrounding counties.
//   Nov 1999: 865 ("VOL") takes Knoxville and its 8 neighbors — leaving
//         423 NON-CONTIGUOUS: a Tri-Cities/upper-east lobe and a
//         Chattanooga lobe, joined only through 865. County lists don't
//         care; the two lobes are just one region here (423N + 423S).
//   2001: 731 takes West Tennessee outside metro Memphis; 901 keeps
//         Shelby/Tipton/Fayette.
// Overlays: 629 on 615 (mandatory Feb 2015); 729 on 423 (2025, mandatory
// ten-digit Aug 5, 2025).
//
// Sources: wiki 931 and 865 articles enumerate their counties (28 and 9);
// 615 = Davidson + 12 ring counties (DeKalb/Smithville and Dickson city
// checks put both in 615). 423/731/901 assembled from city checks:
// Tazewell/Claiborne, LaFollette/Campbell, Oneida/Scott, Wartburg/Morgan
// all 423-north; Dunlap/Sequatchie 423-south (wiki notes 423 really nips
// into Van Buren too — whole-county it stays 931 per the 931 list);
// Savannah/Hardin 731 vs Waynesboro/Wayne 931; Covington/Tipton and
// Somerville/Fayette 901 vs Ripley/Lauderdale 731.
import type { StateRegionList } from './types';
import type { TNCountyName } from '../counties/TN';

// The present-day regions, named by final code (423 split into its lobes).
const M901 = [
  'Shelby', 'Tipton', 'Fayette',
] as const satisfies readonly TNCountyName[];

const M731 = [
  'Lake', 'Obion', 'Weakley', 'Henry', 'Dyer', 'Gibson', 'Carroll',
  'Benton', 'Lauderdale', 'Crockett', 'Haywood', 'Madison', 'Henderson',
  'Decatur', 'Chester', 'McNairy', 'Hardeman', 'Hardin',
] as const satisfies readonly TNCountyName[];

const M615 = [
  'Davidson', 'Cheatham', 'Dickson', 'Robertson', 'Sumner', 'Macon',
  'Trousdale', 'Smith', 'Wilson', 'DeKalb', 'Cannon', 'Rutherford',
  'Williamson',
] as const satisfies readonly TNCountyName[];

const M931 = [
  'Bedford', 'Clay', 'Coffee', 'Cumberland', 'Fentress', 'Franklin',
  'Giles', 'Grundy', 'Hickman', 'Houston', 'Humphreys', 'Jackson',
  'Lawrence', 'Lewis', 'Lincoln', 'Marshall', 'Maury', 'Montgomery',
  'Moore', 'Overton', 'Perry', 'Pickett', 'Putnam', 'Stewart',
  'Van Buren', 'Warren', 'Wayne', 'White',
] as const satisfies readonly TNCountyName[];

const M865 = [
  'Anderson', 'Blount', 'Grainger', 'Jefferson', 'Knox', 'Loudon',
  'Roane', 'Sevier', 'Union',
] as const satisfies readonly TNCountyName[];

const M423N = [
  'Sullivan', 'Washington', 'Carter', 'Johnson', 'Unicoi', 'Greene',
  'Hawkins', 'Hancock', 'Hamblen', 'Cocke', 'Claiborne', 'Campbell',
  'Scott', 'Morgan',
] as const satisfies readonly TNCountyName[];

const M423S = [
  'Hamilton', 'Bradley', 'Polk', 'McMinn', 'Monroe', 'Meigs', 'Rhea',
  'Bledsoe', 'Sequatchie', 'Marion',
] as const satisfies readonly TNCountyName[];

const regions: StateRegionList<TNCountyName> = [
  // 1947-1954: one code for the whole state.
  { code: '901', established: 1947, retired: 1954 },

  // 1954-2001: 901 = West Tennessee.
  { code: '901', established: 1954, retired: 2001,
    counties: [...M901, ...M731] },

  // 1954-1995: 615 = everything east of the river bend.
  { code: '615', established: 1954, retired: 1995,
    counties: [...M615, ...M931, ...M865, ...M423N, ...M423S] },

  // 1995-1999: 423 = East Tennessee (still contiguous, includes Knoxville).
  { code: '423', established: 1995, retired: 1999,
    counties: [...M423N, ...M423S, ...M865] },
  { code: '615', established: 1995, retired: 1997,
    counties: [...M615, ...M931] },

  // 1997: the Middle Tennessee horseshoe; label pinned to Coffee County —
  // the horseshoe's bbox center falls in Rutherford (615).
  { code: '931', established: 1997, counties: M931,
    labelX: 707.7, labelY: 360.8 },
  { code: '615', established: 1997, counties: M615,
    overlays: [{ code: '629', established: 2015 }] },

  // 1999: 865 pops out of 423's middle, leaving it two-lobed. 423's label
  // is pinned to the Chattanooga lobe (its bbox center falls inside 865).
  { code: '423', established: 1999,
    counties: [...M423N, ...M423S],
    labelX: 724.6, labelY: 365.6,
    overlays: [{ code: '729', established: 2025 }] },
  { code: '865', established: 1999, counties: M865 },

  // 2001: 731 takes West Tennessee outside metro Memphis.
  { code: '731', established: 2001, counties: M731 },
  { code: '901', established: 2001, counties: M901 },
];

export default regions;
