// North Carolina — 704 statewide (1947). The split tree:
//   1954: 919 takes the central+east (Winston-Salem eastward); 704 keeps
//         Charlotte and the west (= today's 704 ∪ 828).
//   1993: 910 splits from 919 — the famous fan: Piedmont Triad + Sandhills
//         + SE coast (Winston-Salem, Greensboro, Fayetteville, Wilmington),
//         the lobes connected only by the Sandhills tendril.
//   Dec 1997: 336 splits from 910 and takes the Triad/northwest lobe; 910
//         keeps the southeast (unusually, the LESS populated side kept the
//         old code).
//   Mar 1998: 252 splits from 919 — the northeast (Rocky Mount, Greenville,
//         New Bern, Outer Banks).
//   1998: 828 splits from 704 — mountains and foothills (Asheville,
//         Hickory); 704 keeps metro Charlotte.
// Overlays: 980 on 704 (permissive 5/1/2000 per allcodes — the wiki's 2001
// is the mandatory-dialing date); 984 on 919 (permissive Sep 2011,
// in-service/mandatory spring 2012 — encoded 2012); 743 on 336 (2015);
// 472 on 910 (Oct 2023 after delays from Feb 2023 — the wiki list's
// "October 7, 2022" contradicts the NCUC timeline, went with 2023).
//
// Fully county-based; every region is set algebra on the six final-era
// groups below. Because 336 came from 910 came from 919, provenance forces
// e.g. Wilkes/Surry/Ashe (336 today) to have been 919 in 1954 — the 1954
// line really did leave only the west/southwest to 704.
// County judgment calls (dominant code wins the county): Goldsboro keeps
// Wayne in TRIANGLE-919; Henderson/Warrenton put Vance/Warren in 252 (per
// the sources); Kinston puts Lenoir in 252; Dunn puts Harnett in 910;
// Troy puts Montgomery in 910; Roxboro puts Person in 336; Boone keeps
// Watauga in 828 while Ashe/Alleghany go 336; Taylorsville puts Alexander
// in 828 (Hickory metro) while Statesville keeps Iredell in 704. Jones
// (between New Bern 252 and Jacksonville 910) went 252 — tight.
import type { StateRegionList } from './types';
import type { NCCountyName } from '../counties/NC';

// The six present-day regions, named by their final code.
const M704 = [
  'Mecklenburg', 'Union', 'Anson', 'Stanly', 'Cabarrus', 'Rowan', 'Iredell',
  'Lincoln', 'Gaston', 'Cleveland',
] as const satisfies readonly NCCountyName[];

const M828 = [
  'Cherokee', 'Clay', 'Graham', 'Macon', 'Swain', 'Jackson', 'Haywood',
  'Transylvania', 'Henderson', 'Polk', 'Buncombe', 'Madison', 'Yancey',
  'Mitchell', 'Avery', 'Watauga', 'Caldwell', 'Burke', 'McDowell',
  'Rutherford', 'Catawba', 'Alexander',
] as const satisfies readonly NCCountyName[];

const M336 = [
  'Alleghany', 'Ashe', 'Wilkes', 'Surry', 'Stokes', 'Rockingham', 'Caswell',
  'Person', 'Yadkin', 'Davie', 'Forsyth', 'Guilford', 'Alamance',
  'Davidson', 'Randolph',
] as const satisfies readonly NCCountyName[];

const M919 = [
  'Wake', 'Durham', 'Orange', 'Chatham', 'Lee', 'Johnston', 'Franklin',
  'Granville', 'Wayne',
] as const satisfies readonly NCCountyName[];

const M252 = [
  'Vance', 'Warren', 'Halifax', 'Northampton', 'Hertford', 'Gates',
  'Camden', 'Pasquotank', 'Perquimans', 'Chowan', 'Currituck', 'Dare',
  'Tyrrell', 'Washington', 'Bertie', 'Martin', 'Edgecombe', 'Nash',
  'Wilson', 'Pitt', 'Greene', 'Beaufort', 'Hyde', 'Craven', 'Pamlico',
  'Carteret', 'Jones', 'Lenoir',
] as const satisfies readonly NCCountyName[];

const M910 = [
  'Onslow', 'New Hanover', 'Brunswick', 'Pender', 'Duplin', 'Columbus',
  'Bladen', 'Robeson', 'Cumberland', 'Hoke', 'Scotland', 'Richmond',
  'Moore', 'Montgomery', 'Harnett', 'Sampson',
] as const satisfies readonly NCCountyName[];

const regions: StateRegionList<NCCountyName> = [
  // 1947-1954: one code for the whole state.
  { code: '704', established: 1947, retired: 1954 },

  // 1954-1998: 704 = Charlotte and everything west.
  { code: '704', established: 1954, retired: 1998,
    counties: [...M704, ...M828] },

  // 1954-1993: 919 = Winston-Salem eastward.
  { code: '919', established: 1954, retired: 1993,
    counties: [...M336, ...M919, ...M252, ...M910] },

  // 1993-1997: the 910 fan (Triad + Sandhills + SE coast); label pinned to
  // the Cumberland lobe so it doesn't ride the thin tendril next to 919.
  { code: '910', established: 1993, retired: 1997,
    counties: [...M336, ...M910],
    labelX: 843, labelY: 356, labelSize: 11 },
  { code: '919', established: 1993, retired: 1998,
    counties: [...M919, ...M252] },

  // Dec 1997: 336 takes the Triad lobe; 910 keeps the southeast.
  { code: '336', established: 1997, counties: M336,
    overlays: [{ code: '743', established: 2015 }] },
  { code: '910', established: 1997, counties: M910,
    overlays: [{ code: '472', established: 2023 }] },

  // 1998: 252 takes the northeast; 919 shrinks to the Triangle.
  { code: '252', established: 1998, counties: M252 },
  { code: '919', established: 1998, counties: M919,
    overlays: [{ code: '984', established: 2012 }] },

  // 1998: 828 takes the mountains; 704 shrinks to metro Charlotte.
  { code: '828', established: 1998, counties: M828 },
  { code: '704', established: 1998, counties: M704,
    overlays: [{ code: '980', established: 2000 }] },
];

export default regions;
