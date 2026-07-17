// Ohio — FOUR original codes (1947), one per corner: 216 NE (Cleveland,
// Akron, Youngstown), 419 NW (Toledo, Lima, Mansfield), 614 SE (Columbus
// and all of the southeast), 513 SW (Cincinnati, Dayton). Each metro then
// shed its ring; 419 never split:
//   Mar 1996: 330 takes Akron/Canton/Youngstown from 216.
//   Sep 1996: 937 takes Dayton/Springfield and the west from 513.
//   Aug 1997: 440 takes the ring around Cleveland (Lorain, Lake, Geauga,
//         Ashtabula); 216 = Cuyahoga.
//   Nov 1997: 740 takes central/southeastern Ohio; 614 = Franklin.
// Overlays: 234 on 330 (Oct 2000), 567 on 419 (2002), 220 on 740 (Apr
// 2015), 380 on 614 (2016), 326 on 937 (Mar 2020; "326" = DAO for
// DAyton Ohio, as "937" spelled YES), 283 on 513 (2023), 436 on 440
// (Mar 2024). 216 is Ohio's only region with no overlay yet.
//
// Whole-county roughness calls: Cuyahoga -> 216 although its far-east
// suburbs are really 440; Erie/Huron -> 419 (Sandusky, Norwalk) and
// Trumbull -> 330 (Warren) despite 440 slivers; Hardin -> 419 (Kenton);
// Madison, Fayette, Ross, Scioto, Marion, Morrow -> 740 by county seat
// (London, Washington C.H., Chillicothe, Portsmouth, Marion, Mt Gilead)
// though 937/614 nibble their edges; Warren/Clermont -> 513 (Lebanon,
// Batavia); Adams/Brown -> 937 (West Union, Georgetown).
import type { StateRegionList } from './types';
import type { OHCountyName } from '../counties/OH';

// NW: 419/567, never split.
const C419 = [
  'Williams', 'Fulton', 'Lucas', 'Ottawa', 'Defiance', 'Henry', 'Wood',
  'Sandusky', 'Erie', 'Paulding', 'Putnam', 'Hancock', 'Seneca', 'Huron',
  'Van Wert', 'Allen', 'Hardin', 'Wyandot', 'Crawford', 'Richland',
  'Ashland', 'Mercer', 'Auglaize', 'Morrow',
] as const satisfies readonly OHCountyName[];

// NE: the 216 family.
const C216 = ['Cuyahoga'] as const satisfies readonly OHCountyName[];
const C440 = [
  'Lorain', 'Lake', 'Geauga', 'Ashtabula',
] as const satisfies readonly OHCountyName[];
const C330 = [
  'Summit', 'Stark', 'Mahoning', 'Trumbull', 'Portage', 'Medina',
  'Wayne', 'Holmes', 'Tuscarawas', 'Carroll', 'Columbiana',
] as const satisfies readonly OHCountyName[];

// Center/SE: the 614 family.
const C614 = ['Franklin'] as const satisfies readonly OHCountyName[];
const C740 = [
  'Delaware', 'Knox', 'Marion', 'Licking', 'Fairfield', 'Pickaway',
  'Madison', 'Fayette', 'Ross', 'Hocking', 'Perry', 'Muskingum',
  'Coshocton', 'Guernsey', 'Noble', 'Morgan', 'Athens', 'Washington',
  'Belmont', 'Monroe', 'Harrison', 'Jefferson', 'Meigs', 'Gallia',
  'Lawrence', 'Jackson', 'Vinton', 'Scioto', 'Pike',
] as const satisfies readonly OHCountyName[];

// SW: the 513 family.
const C513 = [
  'Hamilton', 'Butler', 'Warren', 'Clermont',
] as const satisfies readonly OHCountyName[];
const C937 = [
  'Montgomery', 'Greene', 'Clark', 'Miami', 'Darke', 'Preble', 'Shelby',
  'Champaign', 'Logan', 'Union', 'Clinton', 'Highland', 'Adams', 'Brown',
] as const satisfies readonly OHCountyName[];

const regions: StateRegionList<OHCountyName> = [
  // 1947-present: 419 = the northwest, split-free (567 overlay 2002).
  { code: '419', established: 1947, counties: C419,
    overlays: [{ code: '567', established: 2002 }] },

  // 1947-1996: 216 = the whole northeast.
  { code: '216', established: 1947, retired: 1996,
    counties: [...C216, ...C440, ...C330] },

  // Mar 1996: Akron/Canton/Youngstown go 330 (234 overlay 2000).
  { code: '330', established: 1996, counties: C330,
    overlays: [{ code: '234', established: 2000 }] },
  { code: '216', established: 1996, retired: 1997,
    counties: [...C216, ...C440] },

  // Aug 1997: the Cleveland ring goes 440 (436 overlay 2024; label
  // pinned to Ashtabula — the arc's bbox center falls on Cuyahoga).
  { code: '440', established: 1997, counties: C440,
    labelX: 782, labelY: 205.3, labelSize: 7,
    overlays: [{ code: '436', established: 2024 }] },
  { code: '216', established: 1997, counties: C216, labelSize: 7 },

  // 1947-1997: 614 = Columbus and the whole southeast.
  { code: '614', established: 1947, retired: 1997,
    counties: [...C614, ...C740] },

  // Nov 1997: the center/southeast goes 740 (220 overlay 2015); 614 =
  // Franklin (380 overlay 2016).
  { code: '740', established: 1997, counties: C740,
    overlays: [{ code: '220', established: 2015 }] },
  { code: '614', established: 1997, counties: C614, labelSize: 7,
    overlays: [{ code: '380', established: 2016 }] },

  // 1947-1996: 513 = the whole southwest.
  { code: '513', established: 1947, retired: 1996,
    counties: [...C513, ...C937] },

  // Sep 1996: Dayton/Springfield and the west go 937 (326 overlay
  // 2020); 513 = Cincinnati's corner (283 overlay 2023).
  { code: '937', established: 1996, counties: C937,
    overlays: [{ code: '326', established: 2020 }] },
  { code: '513', established: 1996, counties: C513, labelSize: 8,
    overlays: [{ code: '283', established: 2023 }] },
];

export default regions;
