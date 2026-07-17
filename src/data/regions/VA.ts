// Virginia — 703 statewide (1947), a single-code state in the original
// plan, now ten codes. The split tree:
//   Jun 1973: 804 takes the eastern two-thirds (Richmond, Hampton Roads,
//         Charlottesville, Lynchburg, Danville, Eastern Shore); 703 keeps
//         the north and west, Arlington down to the TN/KY border.
//   Jul 1995: 540 takes everything outside inner Northern Virginia
//         (Winchester, Harrisonburg, Roanoke, Blacksburg, the southwest,
//         AND Fredericksburg); 703 shrinks to the NoVA core.
//   Jul 1996: 757 takes Hampton Roads + the Eastern Shore; 804 keeps
//         Richmond, the Northern Neck, the Middle Peninsula, and the
//         south-central piedmont.
//   Mar 2000: 571 overlays 703 (Virginia's first overlay).
//   Jun 2001: 434 takes 804's south-central piedmont (Charlottesville,
//         Lynchburg, Danville, South Boston, Emporia).
//   Sep 2001: 276 takes 540's southwest corner (Bristol, Wytheville,
//         Galax, Martinsville).
//   2022: 826 overlays 540 (May); 948 overlays 757 (May).
//   Feb 2024: 686 overlays 804.
//
// All splits follow county/independent-city lines closely enough for
// whole-county encoding. "Portions of" counties from the wiki pages are
// assigned whole to the side holding the county seat / bulk: Fauquier,
// Stafford, Loudoun-west edges -> their main code; Bedford Co. -> 540
// (Bedford city is 540; 434 only nips in); Greene -> 434 (Stanardsville,
// Ruckersville); Louisa -> 540 (town of Louisa); Albemarle -> 434
// (Charlottesville); Cumberland/Dinwiddie/Prince George/Sussex -> 804;
// Southampton + Franklin city -> 757; Surry -> 757 (Surry CH is 757-294).
// Independent cities are separate shapes in counties/VA.ts ("Fairfax" =
// the city, "Fairfax Co." = the county, etc.).
//
// Sources: each code's Wikipedia article enumerates its counties/cities
// (276 and 540/826 fully; 434 and 757/948 mostly); 804 = the remainder,
// checked against the Richmond/Northern Neck/Middle Peninsula description.
import type { StateRegionList } from './types';
import type { VACountyName } from '../counties/VA';

// The present-day regions, named by final code. Together these six groups
// tile the state's 133 county/city shapes exactly once.
const M703 = [
  'Arlington', 'Fairfax Co.', 'Loudoun', 'Prince William',
  'Alexandria', 'Fairfax', 'Falls Church', 'Manassas', 'Manassas Park',
] as const satisfies readonly VACountyName[];

const M540 = [
  'Alleghany', 'Augusta', 'Bath', 'Bedford Co.', 'Botetourt', 'Clarke',
  'Craig', 'Culpeper', 'Fauquier', 'Floyd', 'Franklin Co.', 'Frederick',
  'Giles', 'Highland', 'King George', 'Louisa', 'Madison', 'Montgomery',
  'Orange', 'Page', 'Pulaski', 'Rappahannock', 'Roanoke Co.',
  'Rockbridge', 'Rockingham', 'Shenandoah', 'Spotsylvania', 'Stafford',
  'Warren',
  'Buena Vista', 'Covington', 'Fredericksburg', 'Harrisonburg',
  'Lexington', 'Radford', 'Roanoke', 'Salem', 'Staunton', 'Waynesboro',
  'Winchester',
] as const satisfies readonly VACountyName[];

const M276 = [
  'Bland', 'Buchanan', 'Carroll', 'Dickenson', 'Grayson', 'Henry', 'Lee',
  'Patrick', 'Russell', 'Scott', 'Smyth', 'Tazewell', 'Washington',
  'Wise', 'Wythe',
  'Bristol', 'Galax', 'Martinsville', 'Norton',
] as const satisfies readonly VACountyName[];

const M804 = [
  'Amelia', 'Caroline', 'Charles City', 'Chesterfield', 'Cumberland',
  'Dinwiddie', 'Essex', 'Gloucester', 'Goochland', 'Hanover', 'Henrico',
  'King William', 'King and Queen', 'Lancaster', 'Mathews', 'Middlesex',
  'New Kent', 'Northumberland', 'Powhatan', 'Prince George',
  'Richmond Co.', 'Sussex', 'Westmoreland',
  'Colonial Heights', 'Hopewell', 'Petersburg', 'Richmond',
] as const satisfies readonly VACountyName[];

const M434 = [
  'Albemarle', 'Amherst', 'Appomattox', 'Brunswick', 'Buckingham',
  'Campbell', 'Charlotte', 'Fluvanna', 'Greene', 'Greensville',
  'Halifax', 'Lunenburg', 'Mecklenburg', 'Nelson', 'Nottoway',
  'Pittsylvania', 'Prince Edward',
  'Charlottesville', 'Danville', 'Emporia', 'Lynchburg',
] as const satisfies readonly VACountyName[];

const M757 = [
  'Accomack', 'Isle of Wight', 'James City', 'Northampton',
  'Southampton', 'Surry', 'York',
  'Chesapeake', 'Franklin', 'Hampton', 'Newport News', 'Norfolk',
  'Poquoson', 'Portsmouth', 'Suffolk', 'Virginia Beach', 'Williamsburg',
] as const satisfies readonly VACountyName[];

const regions: StateRegionList<VACountyName> = [
  // 1947-1973: one code for the whole state.
  { code: '703', established: 1947, retired: 1973 },

  // 1973-1995: 703 = the north and west; label pinned to Rockbridge —
  // the crescent's bbox center falls outside the state.
  { code: '703', established: 1973, retired: 1995,
    counties: [...M703, ...M540, ...M276],
    labelX: 820.9, labelY: 291.0 },

  // 1973-1996: 804 = the eastern two-thirds, Danville to the Eastern Shore.
  { code: '804', established: 1973, retired: 1996,
    counties: [...M804, ...M434, ...M757] },

  // 1995: 540 takes everything outside the NoVA core (same crescent
  // problem as 1973-95 703 — label pinned to Rockbridge).
  { code: '703', established: 1995, counties: M703,
    overlays: [{ code: '571', established: 2000 }] },
  { code: '540', established: 1995, retired: 2001,
    counties: [...M540, ...M276],
    labelX: 820.9, labelY: 291.0 },

  // 1996: 757 = Hampton Roads + Eastern Shore; its bbox center is in the
  // Chesapeake Bay, so the label is pinned to Suffolk.
  { code: '804', established: 1996, retired: 2001,
    counties: [...M804, ...M434] },
  { code: '757', established: 1996, counties: M757,
    labelX: 874.5, labelY: 305.9,
    overlays: [{ code: '948', established: 2022 }] },

  // 2001: 276 (southwest corner, from 540) and 434 (south-central
  // piedmont, from 804; label pinned to Prince Edward — the bbox center
  // lands in 804's Cumberland notch).
  { code: '540', established: 2001, counties: M540,
    overlays: [{ code: '826', established: 2022 }] },
  { code: '276', established: 2001, counties: M276 },
  { code: '804', established: 2001, counties: M804,
    overlays: [{ code: '686', established: 2024 }] },
  { code: '434', established: 2001, counties: M434,
    labelX: 840.4, labelY: 300.7 },
];

export default regions;
