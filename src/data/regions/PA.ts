// Pennsylvania — FOUR original codes (1947): 215 (Philadelphia + SE),
// 412 (Pittsburgh + SW), 717 (the wide center + NE), 814 (Erie/Altoona
// west, which never split). Three ring-sheds, then overlays everywhere
// (all seven NPAs are overlay complexes today):
//   Jan 1994: 610 takes the outer southeast (Allentown, Bethlehem,
//         Reading, Chester/Delaware counties); 215 = Philly + Bucks +
//         Montgomery.
//   Feb 1998: 724 takes southwestern PA outside Allegheny.
//   Dec 1998: 570 takes the northeast (Scranton, Wilkes-Barre,
//         Williamsport); 717 = Harrisburg/Lancaster/York country.
// Overlays: 267 on 215 (Jul 1997), 484 on 610 (Jun 1999), 878 on BOTH
// 412 and 724 (2001), 272 on 570 (2013), 223 on 717 (2017), 445 on
// 215/267 (Feb 2018), 582 on 814 (2021), 835 on 610/484 (Sep 2022 —
// first planned for 2001, withdrawn 2005, revived 2021).
//
// Whole-county roughness calls: Montgomery/Bucks -> 215 although their
// north/west edges are really 610; Potter -> 814 (Coudersport) while
// Tioga/Clinton -> 570 (Wellsboro, Lock Haven); Mercer -> 724 (Sharon);
// the 215/610 slivers of Lehigh and Berks are ignored.
import type { StateRegionList } from './types';
import type { PACountyName } from '../counties/PA';

// SE: the 215 family.
const C215 = [
  'Philadelphia', 'Bucks', 'Montgomery',
] as const satisfies readonly PACountyName[];
const C610 = [
  'Delaware', 'Chester', 'Berks', 'Lehigh', 'Northampton',
] as const satisfies readonly PACountyName[];

// Center/NE: the 717 family.
const C717 = [
  'Lancaster', 'York', 'Adams', 'Cumberland', 'Perry', 'Dauphin',
  'Lebanon', 'Franklin', 'Fulton', 'Juniata', 'Mifflin',
] as const satisfies readonly PACountyName[];
const C570 = [
  'Lackawanna', 'Luzerne', 'Wyoming', 'Susquehanna', 'Bradford',
  'Sullivan', 'Wayne', 'Pike', 'Monroe', 'Carbon', 'Schuylkill',
  'Columbia', 'Montour', 'Northumberland', 'Snyder', 'Union',
  'Lycoming', 'Clinton', 'Tioga',
] as const satisfies readonly PACountyName[];

// West: 814 (split-free) and the 412 family.
const C814 = [
  'Erie', 'Crawford', 'Warren', 'McKean', 'Potter', 'Forest', 'Venango',
  'Clarion', 'Jefferson', 'Elk', 'Cameron', 'Clearfield', 'Centre',
  'Blair', 'Huntingdon', 'Bedford', 'Somerset', 'Cambria',
] as const satisfies readonly PACountyName[];
const C412 = ['Allegheny'] as const satisfies readonly PACountyName[];
const C724 = [
  'Mercer', 'Lawrence', 'Beaver', 'Butler', 'Armstrong', 'Indiana',
  'Westmoreland', 'Washington', 'Greene', 'Fayette',
] as const satisfies readonly PACountyName[];

const regions: StateRegionList<PACountyName> = [
  // 1947-present: 814 = the western third, split-free (582 ov. 2021).
  { code: '814', established: 1947, counties: C814,
    overlays: [{ code: '582', established: 2021 }] },

  // 1947-1994: 215 = the whole southeast.
  { code: '215', established: 1947, retired: 1994,
    counties: [...C215, ...C610] },
  // 1994: the outer ring goes 610 (484 ov. 1999; 835 ov. 2022; label
  // pinned to Chester — the ring's bbox center falls on Montgomery);
  // 215 = Philly + Bucks + Montgomery (267 ov. 1997, 445 ov. 2018).
  { code: '610', established: 1994, counties: C610,
    labelX: 869, labelY: 229.5, labelSize: 7,
    overlays: [
      { code: '484', established: 1999 },
      { code: '835', established: 2022 },
    ] },
  { code: '215', established: 1994, counties: C215, labelSize: 6,
    overlays: [
      { code: '267', established: 1997 },
      { code: '445', established: 2018 },
    ] },

  // 1947-1998: 412 = the whole southwest.
  { code: '412', established: 1947, retired: 1998,
    counties: [...C412, ...C724] },
  // Feb 1998: the Pittsburgh ring goes 724; 412 = Allegheny. 878
  // overlays BOTH since 2001 (724's label pinned to Westmoreland —
  // the ring's bbox center falls on Allegheny).
  { code: '724', established: 1998, counties: C724,
    labelX: 810, labelY: 238, labelSize: 7,
    overlays: [{ code: '878', established: 2001 }] },
  { code: '412', established: 1998, counties: C412, labelSize: 6,
    overlays: [{ code: '878', established: 2001 }] },

  // 1947-1998: 717 = the center plus the northeast.
  { code: '717', established: 1947, retired: 1998,
    counties: [...C717, ...C570] },
  // Dec 1998: the northeast goes 570 (272 ov. 2013); 717 =
  // Harrisburg/Lancaster/York (223 ov. 2017).
  { code: '570', established: 1998, counties: C570,
    overlays: [{ code: '272', established: 2013 }] },
  { code: '717', established: 1998, counties: C717,
    overlays: [{ code: '223', established: 2017 }] },
];

export default regions;
