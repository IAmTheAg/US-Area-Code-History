// Indiana — two original codes: 317 north (Indianapolis, and initially
// Gary/South Bend/Fort Wayne too) and 812 south (Evansville, Terre Haute,
// Bloomington, Columbus, New Albany). 1948: 219 takes the northern tier
// from 317. February 1, 1997: 765 takes everything in 317's band outside
// the inner Indianapolis metro — a PARTIAL donut: 765 wraps 317 on the
// west, north and east, but 317 (Morgan/Johnson/Shelby counties) still
// touches 812 directly on the south. 2002: 219 splits three ways — 219
// keeps the northwest (Gary, Michigan City, Valparaiso), 574 takes the
// north-center (South Bend, Elkhart, Warsaw, Logansport), 260 the
// northeast (Fort Wayne, Angola, Huntington). Overlays: 930 on 812
// (2015), 463 on 317 (March 15, 2016). 812's shape has never changed.
//
// Fully county-based; historical eras are unions of the six final groups
// (provenance: 574/260 split from 219, 765 from 317, so the 1948 tier =
// 219∪574∪260 and the 1948-97 317 band = 317∪765 exactly). The old
// polygon encoding's city calls all carry over as county calls:
// Brazil/Clay-812 vs Rockville/Parke-765; Greencastle/Putnam-765 vs
// Spencer/Owen-812; Martinsville/Morgan-317 vs Bloomington/Monroe-812;
// Franklin/Johnson-317 vs Columbus/Bartholomew-812; Rushville/Rush-765 vs
// Greensburg/Decatur-812; Brookville/Franklin-765 vs Lawrenceburg/
// Dearborn-812; Kentland/Newton-219 vs Fowler/Benton-765; KNOX puts
// Starke in 574 (with Monon/White and Winamac/Pulaski — the 574 belt dips
// south), while La Porte & Valparaiso hold 219; Peru/Miami-765 between
// Logansport/Cass-574 and Wabash-260; Portland/Jay-260 vs Winchester/
// Randolph-765; Noblesville/Hamilton-317 vs Anderson/Madison-765.
// Accepted whole-county roughness: Boone goes 317 for Zionsville although
// Lebanon is really 765 (the old blob split the county).
import type { StateRegionList } from './types';
import type { INCountyName } from '../counties/IN';

// The six present-day regions, named by their final code.
const M219 = [
  'Lake', 'Porter', 'LaPorte', 'Newton', 'Jasper',
] as const satisfies readonly INCountyName[];

const M574 = [
  'St. Joseph', 'Elkhart', 'Marshall', 'Kosciusko', 'Starke', 'Fulton',
  'Pulaski', 'Cass', 'White',
] as const satisfies readonly INCountyName[];

const M260 = [
  'LaGrange', 'Steuben', 'Noble', 'DeKalb', 'Allen', 'Whitley',
  'Huntington', 'Wabash', 'Wells', 'Adams', 'Jay',
] as const satisfies readonly INCountyName[];

const M317 = [
  'Marion', 'Hamilton', 'Boone', 'Hendricks', 'Morgan', 'Johnson',
  'Shelby', 'Hancock',
] as const satisfies readonly INCountyName[];

const M765 = [
  'Benton', 'Warren', 'Fountain', 'Vermillion', 'Parke', 'Putnam',
  'Montgomery', 'Tippecanoe', 'Carroll', 'Clinton', 'Tipton', 'Howard',
  'Miami', 'Grant', 'Blackford', 'Delaware', 'Madison', 'Henry', 'Wayne',
  'Randolph', 'Rush', 'Fayette', 'Union', 'Franklin',
] as const satisfies readonly INCountyName[];

const M812 = [
  'Sullivan', 'Greene', 'Knox', 'Daviess', 'Martin', 'Lawrence', 'Monroe',
  'Owen', 'Clay', 'Vigo', 'Orange', 'Washington', 'Jackson', 'Brown',
  'Bartholomew', 'Decatur', 'Jennings', 'Ripley', 'Dearborn', 'Ohio',
  'Switzerland', 'Jefferson', 'Scott', 'Clark', 'Floyd', 'Harrison',
  'Crawford', 'Perry', 'Spencer', 'Warrick', 'Vanderburgh', 'Posey',
  'Gibson', 'Pike', 'Dubois',
] as const satisfies readonly INCountyName[];

const regions: StateRegionList<INCountyName> = [
  // 1947-1948: 317 = the northern two-thirds.
  { code: '317', established: 1947, retired: 1948,
    counties: [...M219, ...M574, ...M260, ...M317, ...M765] },

  // 1947-present: 812 = the southern third, never reshaped; 930 overlay 2015.
  { code: '812', established: 1947, counties: M812,
    overlays: [{ code: '930', established: 2015 }] },

  // 1948-2002: 219 = the northern tier.
  { code: '219', established: 1948, retired: 2002,
    counties: [...M219, ...M574, ...M260] },

  // 1948-1997: 317 = the middle band (metro + future donut).
  { code: '317', established: 1948, retired: 1997,
    counties: [...M317, ...M765] },

  // 1997: 765 takes the partial donut; label pinned near Lafayette because
  // the donut's bbox center lands in the 317 hole.
  { code: '765', established: 1997, counties: M765,
    labelX: 682, labelY: 252, labelSize: 10 },
  { code: '317', established: 1997, counties: M317,
    overlays: [{ code: '463', established: 2016 }] },

  // 2002: the northern tier splits three ways.
  { code: '219', established: 2002, counties: M219 },
  { code: '574', established: 2002, counties: M574 },
  { code: '260', established: 2002, counties: M260 },
];

export default regions;
