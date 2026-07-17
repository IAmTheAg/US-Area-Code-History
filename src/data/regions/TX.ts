// Texas — FOUR original codes (1947): 214 (Dallas + the north/northeast),
// 512 (Austin/San Antonio + everything south), 713 (Houston + the
// southeast), 915 (everything west). Twelve splits later:
//   1953: 817 (Fort Worth, Waco, Wichita Falls) from 214.
//   1957: 806 (the Panhandle + South Plains) from 915.
//   Mar 1983: 409 (a horseshoe around Houston) from 713.
//   Nov 1990: 903 (northeast: Tyler, Texarkana, Sherman) from 214.
//   Nov 1992: 210 (San Antonio + the border) from 512.
//   1996: the metro splits — 972 (Sep) takes everything in the Dallas
//         NPA outside Dallas County; 281 (Nov) takes Houston outside
//         Beltway 8 (the one sub-county line in Texas, hence the one
//         `d` blob).
//   May 1997: 254 (Waco) and 940 (Wichita Falls/Denton) from 817,
//         which keeps Fort Worth. Jul 1997: 830 (the Hill Country ring)
//         and 956 (Laredo + the Valley) from 210, which keeps Bexar.
//   Feb 1999: 361 (Corpus Christi/coastal bend) from 512.
//   Feb 2000: 936 (Conroe/Huntsville/Nacogdoches) and 979 (Bryan-
//         College Station/coast) from 409, which keeps Beaumont+Galveston.
//   Apr 2003: 325 (Abilene/San Angelo) and 432 (Midland/Odessa/Big
//         Bend) from 915, which keeps El Paso.
// Overlay complexes: Houston's 713/281 boundary was erased Jan 1999
// when 832 arrived (346 in 2014, 621 in 2025); Dallas's 214/972
// boundary was erased mid-1999 when 469 arrived (945 in 2021). Both
// metros keep their geographic 1996 regions here with the overlay
// codes attached to each side — the full each-code-everywhere merger
// is noted but not drawn (a four-way mutual overlay label is soup).
// Other overlays: 682 on 817 (2000), 430 on 903 (2003), 737 on 512
// (2013), 726 on 210 (2017).
//
// Whole-county roughness calls (county seat wins): Montgomery -> 936
// (Conroe; The Woodlands is really 281/832), Denton -> 940 (Denton;
// Lewisville/Frisco-side is really 972/214), Johnson/Parker/Hood ->
// 817 (Cleburne, Weatherford, Granbury), Navarro/Freestone/Leon -> 903
// (Corsicana, Fairfield, Centerville), Brazoria/Waller -> 979
// (Angleton, Hempstead; Pearland is really 281), Eastland/Stephens ->
// 254, Reagan -> 325 (Big Lake), Dawson/Borden -> 806 (Lamesa, Gail),
// Karnes -> 830 (Karnes City), Jim Hogg -> 361 (Hebbronville).
import type { StateRegionList } from './types';
import type { TXCountyName } from '../counties/TX';

// ---- the 915 family (west) ----
const C806 = [
  'Dallam', 'Sherman', 'Hansford', 'Ochiltree', 'Lipscomb', 'Hartley',
  'Moore', 'Hutchinson', 'Roberts', 'Hemphill', 'Oldham', 'Potter',
  'Carson', 'Gray', 'Wheeler', 'Deaf Smith', 'Randall', 'Armstrong',
  'Donley', 'Collingsworth', 'Parmer', 'Castro', 'Swisher', 'Briscoe',
  'Hall', 'Childress', 'Bailey', 'Lamb', 'Hale', 'Floyd', 'Motley',
  'Cottle', 'Cochran', 'Hockley', 'Lubbock', 'Crosby', 'Dickens',
  'King', 'Yoakum', 'Terry', 'Lynn', 'Garza', 'Kent', 'Dawson',
  'Borden',
] as const satisfies readonly TXCountyName[];
const C915 = [
  'El Paso', 'Hudspeth', 'Culberson',
] as const satisfies readonly TXCountyName[];
const C432 = [
  'Loving', 'Winkler', 'Ector', 'Midland', 'Martin', 'Howard',
  'Glasscock', 'Upton', 'Crane', 'Ward', 'Reeves', 'Pecos',
  'Jeff Davis', 'Presidio', 'Brewster', 'Terrell', 'Andrews', 'Gaines',
] as const satisfies readonly TXCountyName[];
const C325 = [
  'Fisher', 'Nolan', 'Mitchell', 'Scurry', 'Jones', 'Shackelford',
  'Taylor', 'Callahan', 'Coleman', 'Brown', 'Comanche', 'Mills',
  'San Saba', 'McCulloch', 'Menard', 'Mason', 'Llano', 'Kimble',
  'Sutton', 'Schleicher', 'Crockett', 'Reagan', 'Irion', 'Sterling',
  'Coke', 'Runnels', 'Concho', 'Tom Green',
] as const satisfies readonly TXCountyName[];

// ---- the 214 family (north) ----
const C903 = [
  'Bowie', 'Cass', 'Marion', 'Harrison', 'Panola', 'Gregg', 'Upshur',
  'Camp', 'Titus', 'Morris', 'Red River', 'Lamar', 'Delta', 'Hopkins',
  'Franklin', 'Wood', 'Rains', 'Van Zandt', 'Smith', 'Cherokee',
  'Rusk', 'Anderson', 'Henderson', 'Hunt', 'Fannin', 'Grayson',
  'Navarro', 'Freestone', 'Leon',
] as const satisfies readonly TXCountyName[];
const CDAL = ['Dallas'] as const satisfies readonly TXCountyName[];
const C972 = [
  'Collin', 'Rockwall', 'Ellis', 'Kaufman',
] as const satisfies readonly TXCountyName[];
const C817 = [
  'Tarrant', 'Johnson', 'Parker', 'Hood',
] as const satisfies readonly TXCountyName[];
const C940 = [
  'Denton', 'Cooke', 'Montague', 'Wise', 'Jack', 'Clay', 'Wichita',
  'Archer', 'Baylor', 'Wilbarger', 'Hardeman', 'Foard', 'Knox',
  'Haskell', 'Throckmorton', 'Stonewall', 'Young', 'Palo Pinto',
] as const satisfies readonly TXCountyName[];
const C254 = [
  'McLennan', 'Bell', 'Coryell', 'Bosque', 'Hill', 'Hamilton', 'Erath',
  'Somervell', 'Eastland', 'Falls', 'Limestone', 'Milam', 'Stephens',
] as const satisfies readonly TXCountyName[];

// ---- the 512 family (south) ----
const C512 = [
  'Travis', 'Williamson', 'Hays', 'Bastrop', 'Caldwell', 'Burnet',
  'Lampasas',
] as const satisfies readonly TXCountyName[];
const C210 = ['Bexar'] as const satisfies readonly TXCountyName[];
const C830 = [
  'Val Verde', 'Kinney', 'Edwards', 'Real', 'Kerr', 'Bandera', 'Medina',
  'Uvalde', 'Maverick', 'Zavala', 'Dimmit', 'La Salle', 'Frio',
  'Atascosa', 'Wilson', 'Guadalupe', 'Comal', 'Kendall', 'Gillespie',
  'Blanco', 'Gonzales', 'Karnes',
] as const satisfies readonly TXCountyName[];
const C956 = [
  'Webb', 'Zapata', 'Starr', 'Hidalgo', 'Cameron', 'Willacy',
] as const satisfies readonly TXCountyName[];
const C361 = [
  'Nueces', 'San Patricio', 'Aransas', 'Refugio', 'Calhoun', 'Victoria',
  'Goliad', 'Bee', 'Live Oak', 'McMullen', 'Duval', 'Jim Wells',
  'Kleberg', 'Kenedy', 'Brooks', 'Jim Hogg', 'DeWitt', 'Lavaca',
  'Jackson',
] as const satisfies readonly TXCountyName[];

// ---- the 713 family (southeast) ----
const CHOU = ['Harris', 'Fort Bend'] as const satisfies readonly TXCountyName[];
const C409 = [
  'Chambers', 'Galveston', 'Hardin', 'Jasper', 'Jefferson', 'Newton',
  'Orange', 'Polk', 'Sabine', 'Trinity', 'Tyler',
] as const satisfies readonly TXCountyName[];
const C936 = [
  'Montgomery', 'Walker', 'San Jacinto', 'Liberty', 'Houston',
  'Angelina', 'Nacogdoches', 'Shelby', 'San Augustine', 'Grimes',
  'Madison',
] as const satisfies readonly TXCountyName[];
const C979 = [
  'Brazos', 'Robertson', 'Burleson', 'Lee', 'Washington', 'Fayette',
  'Austin', 'Waller', 'Colorado', 'Wharton', 'Matagorda', 'Brazoria',
] as const satisfies readonly TXCountyName[];

// Houston inside Beltway 8 (713 after Nov 1996) — central Harris.
const HOUCORE_D = 'M528,495.5 L541,495.5 L541,505.5 L528,505.5 Z';

const HOU_OVERLAYS = [
  { code: '832', established: 1999 },
  { code: '346', established: 2014 },
  { code: '621', established: 2025 },
];
const DFW_OVERLAYS = [
  { code: '469', established: 1999 },
  { code: '945', established: 2021 },
];

const regions: StateRegionList<TXCountyName> = [
  // ======== WEST: the 915 family ========
  { code: '915', established: 1947, retired: 1957,
    counties: [...C915, ...C432, ...C325, ...C806] },
  // 1957: the Panhandle goes 806.
  { code: '806', established: 1957, counties: C806 },
  { code: '915', established: 1957, retired: 2003,
    counties: [...C915, ...C432, ...C325] },
  // Apr 2003: Abilene/San Angelo go 325, the Permian/Big Bend 432;
  // 915 = El Paso's corner.
  { code: '325', established: 2003, counties: C325 },
  { code: '432', established: 2003, counties: C432 },
  { code: '915', established: 2003, counties: C915 },

  // ======== NORTH: the 214 family ========
  { code: '214', established: 1947, retired: 1953,
    counties: [...CDAL, ...C972, ...C903, ...C817, ...C940, ...C254] },
  // 1953: Fort Worth and the northwest go 817.
  { code: '817', established: 1953, retired: 1997,
    counties: [...C817, ...C940, ...C254] },
  { code: '214', established: 1953, retired: 1990,
    counties: [...CDAL, ...C972, ...C903] },
  // Nov 1990: the northeast goes 903 (430 overlay 2003).
  { code: '903', established: 1990, counties: C903,
    overlays: [{ code: '430', established: 2003 }] },
  { code: '214', established: 1990, retired: 1996,
    counties: [...CDAL, ...C972] },
  // Sep 1996: everything outside Dallas County goes 972; the 1999
  // merger adds 469 (and later 945) over both sides.
  { code: '972', established: 1996, counties: C972,
    labelX: 512, labelY: 423, labelSize: 5, overlays: DFW_OVERLAYS },
  { code: '214', established: 1996, counties: CDAL, labelSize: 5,
    overlays: DFW_OVERLAYS },
  // May 1997: Waco goes 254, Wichita Falls/Denton 940; 817 = Fort
  // Worth country (682 overlay 2000).
  { code: '254', established: 1997, counties: C254 },
  { code: '940', established: 1997, counties: C940 },
  { code: '817', established: 1997, counties: C817, labelSize: 6,
    overlays: [{ code: '682', established: 2000 }] },

  // ======== SOUTH: the 512 family ========
  { code: '512', established: 1947, retired: 1992,
    counties: [...C512, ...C210, ...C830, ...C956, ...C361] },
  // Nov 1992: San Antonio + the border go 210.
  { code: '210', established: 1992, retired: 1997,
    counties: [...C210, ...C830, ...C956] },
  { code: '512', established: 1992, retired: 1999,
    counties: [...C512, ...C361], labelX: 488, labelY: 490 },
  // Jul 1997: the Hill Country ring goes 830, Laredo + the Valley 956;
  // 210 = Bexar (726 overlay 2017).
  { code: '830', established: 1997, counties: C830 },
  { code: '956', established: 1997, counties: C956,
    labelX: 472, labelY: 578 },
  { code: '210', established: 1997, counties: C210, labelSize: 6,
    overlays: [{ code: '726', established: 2017 }] },
  // Feb 1999: the coastal bend goes 361; 512 = Austin (737 ov. 2013).
  { code: '361', established: 1999, counties: C361 },
  { code: '512', established: 1999, counties: C512, labelSize: 7,
    overlays: [{ code: '737', established: 2013 }] },

  // ======== SOUTHEAST: the 713 family ========
  { code: '713', established: 1947, retired: 1983,
    counties: [...CHOU, ...C409, ...C936, ...C979] },
  // Mar 1983: the horseshoe around Houston goes 409.
  { code: '409', established: 1983, retired: 2000,
    counties: [...C409, ...C936, ...C979], labelX: 545, labelY: 480 },
  // Feb 2000: the horseshoe splits three ways.
  { code: '936', established: 2000, counties: C936 },
  { code: '979', established: 2000, counties: C979,
    labelX: 513, labelY: 490 },
  { code: '409', established: 2000, counties: C409 },
  // Houston: 713 alone until Nov 1996, then 281 outside Beltway 8 with
  // the 713 core blob painted above; the Jan 1999 merger adds
  // 832/346/621 over both sides.
  { code: '713', established: 1983, retired: 1996, counties: CHOU },
  { code: '281', established: 1996, counties: CHOU,
    labelX: 526, labelY: 509.5, labelSize: 5, overlays: HOU_OVERLAYS },
  { code: '713', established: 1996, d: HOUCORE_D,
    labelX: 534.5, labelY: 500.5, labelSize: 5, overlays: HOU_OVERLAYS },
];

export default regions;
