// Georgia — 404 statewide (1947), then the great 404 retreat: north half
// (1954) -> metro Atlanta (1992) -> inside the I-285 Perimeter (1995).
// The split tree:
//   Jul 1954: 912 takes everything "from Macon southward" (Savannah,
//         Albany, Valdosta, Macon); 404 keeps the north half.
//   May 1992: 706 takes the north outside metro Atlanta — a horseshoe
//         wrapping the metro: Rome/Dalton NW, the mountains, Athens NE,
//         plus the Augusta and Columbus lobes. (BellSouth briefly put
//         some exurbs in 706, then handed them back to 404 in spring
//         1993 after complaints — sub-year wiggle, not encoded.)
//   Aug 1995: 770 takes the metro outside the Perimeter; 404 shrinks to
//         roughly inside I-285 — sub-county, so 404 is a `d` blob
//         painted above the county-based 770. Never merged since:
//         404 = ITP, 770 = OTP to this day.
//   Jan 1998: 678 overlays BOTH 404 and 770 (first GA overlay).
//   Aug 2000: 912 three-way split — 478 takes middle GA (Macon),
//         229 takes the southwest (Albany, Valdosta), 912 keeps the
//         southeast (Savannah, Brunswick).
//   Sep 2005: 762 overlays 706 (assigned Jun 2005, permissive Sep 3).
//   Feb 2010: 470 overlays 404/770 (assigned back in 2001, sat unused).
//   Mar 2022: 943 overlays 404/770.
//   (565 overlay of 912 approved May 2025, not yet in service — add it
//   when it launches, expected ~2027.)
//
// Partial counties (the wiki lists mark many "(part)") assigned whole by
// county seat: Dawson (Dawsonville), Oconee (Watkinsville), Heard
// (Franklin), Meriwether (Greenville), Upson (Thomaston), Burke
// (Waynesboro), Pickens (Jasper) -> 706; Jefferson (Louisville), Jenkins
// (Millen), Emanuel (Swainsboro), Pulaski (Hawkinsville) -> 478; Dooly
// (Vienna), Echols, Telfair (McRae) -> 229; Hall (Gainesville) -> 770.
// The five groups tile all 159 counties exactly once.
//
// Sources: each code's Wikipedia article enumerates its counties; the
// 404 article carries the retreat timeline. nazip.png anchors 1947.
import type { StateRegionList } from './types';
import type { GACountyName } from '../counties/GA';

// Present-day regions, named by final code. 404 has no county list —
// inside-the-Perimeter is the `d` blob below.
const M706 = [
  'Banks', 'Burke', 'Catoosa', 'Chattahoochee', 'Chattooga', 'Clarke',
  'Columbia', 'Dade', 'Dawson', 'Elbert', 'Fannin', 'Floyd', 'Franklin',
  'Gilmer', 'Glascock', 'Gordon', 'Greene', 'Habersham', 'Hancock',
  'Harris', 'Hart', 'Heard', 'Jackson', 'Jasper', 'Lincoln', 'Lumpkin',
  'Madison', 'McDuffie', 'Meriwether', 'Morgan', 'Murray', 'Muscogee',
  'Oconee', 'Oglethorpe', 'Pickens', 'Putnam', 'Rabun', 'Richmond',
  'Stephens', 'Talbot', 'Taliaferro', 'Towns', 'Troup', 'Union', 'Upson',
  'Walker', 'Warren', 'White', 'Whitfield', 'Wilkes',
] as const satisfies readonly GACountyName[];

const M478 = [
  'Baldwin', 'Bibb', 'Bleckley', 'Crawford', 'Dodge', 'Emanuel',
  'Houston', 'Jefferson', 'Jenkins', 'Johnson', 'Jones', 'Laurens',
  'Macon', 'Monroe', 'Peach', 'Pulaski', 'Taylor', 'Twiggs',
  'Washington', 'Wilkinson',
] as const satisfies readonly GACountyName[];

const M229 = [
  'Baker', 'Ben Hill', 'Berrien', 'Brooks', 'Calhoun', 'Clay',
  'Colquitt', 'Cook', 'Crisp', 'Decatur', 'Dooly', 'Dougherty', 'Early',
  'Echols', 'Grady', 'Irwin', 'Lanier', 'Lee', 'Lowndes', 'Marion',
  'Miller', 'Mitchell', 'Quitman', 'Randolph', 'Schley', 'Seminole',
  'Stewart', 'Sumter', 'Telfair', 'Terrell', 'Thomas', 'Tift', 'Turner',
  'Webster', 'Wilcox', 'Worth',
] as const satisfies readonly GACountyName[];

const M912 = [
  'Appling', 'Atkinson', 'Bacon', 'Brantley', 'Bryan', 'Bulloch',
  'Camden', 'Candler', 'Charlton', 'Chatham', 'Clinch', 'Coffee',
  'Effingham', 'Evans', 'Glynn', 'Jeff Davis', 'Liberty', 'Long',
  'McIntosh', 'Montgomery', 'Pierce', 'Screven', 'Tattnall', 'Toombs',
  'Treutlen', 'Ware', 'Wayne', 'Wheeler',
] as const satisfies readonly GACountyName[];

// The 25-county metro: 770 outside the Perimeter, 404 blob inside.
const METRO = [
  'Barrow', 'Bartow', 'Butts', 'Carroll', 'Cherokee', 'Clayton', 'Cobb',
  'Coweta', 'DeKalb', 'Douglas', 'Fayette', 'Forsyth', 'Fulton',
  'Gwinnett', 'Hall', 'Haralson', 'Henry', 'Lamar', 'Newton', 'Paulding',
  'Pike', 'Polk', 'Rockdale', 'Spalding', 'Walton',
] as const satisfies readonly GACountyName[];

// Metro-Atlanta overlays land on both sides of the Perimeter.
const METRO_OVERLAYS = [
  { code: '678', established: 1998 },
  { code: '470', established: 2010 }, // assigned 2001, in service Feb 2010
  { code: '943', established: 2022 },
];

const regions: StateRegionList<GACountyName> = [
  // 1947-1954: one code for the whole state.
  { code: '404', established: 1947, retired: 1954 },

  // 1954-1992: 404 = the north half.
  { code: '404', established: 1954, retired: 1992,
    counties: [...METRO, ...M706] },

  // 1954-2000: 912 = everything from Macon southward.
  { code: '912', established: 1954, retired: 2000,
    counties: [...M478, ...M229, ...M912] },

  // 1992-1995: 404 = metro Atlanta only.
  { code: '404', established: 1992, retired: 1995, counties: METRO },

  // 1992: the 706 horseshoe (its bbox center luckily lands in its own
  // eastern arm, Morgan County — default label works).
  { code: '706', established: 1992, counties: M706,
    overlays: [{ code: '762', established: 2005 }] },

  // 1995: 770 = the metro; the 404 Perimeter blob paints above it. Label
  // pinned to Coweta — the default center is downtown, under the blob.
  { code: '770', established: 1995, counties: METRO,
    labelX: 737.8, labelY: 406.9,
    overlays: METRO_OVERLAYS },

  // 2000: the 912 three-way split.
  { code: '478', established: 2000, counties: M478 },
  { code: '229', established: 2000, counties: M229 },
  { code: '912', established: 2000, counties: M912 },

  // 1995: 404 = roughly inside I-285, an octagon on downtown Atlanta
  // (the Fulton/DeKalb junction), painted last so it wins hover.
  { code: '404', established: 1995,
    d: 'M746.8,396.5 L745.8,398.8 L743.5,399.8 L741.2,398.8 L740.2,396.5 L741.2,394.2 L743.5,393.2 L745.8,394.2 Z',
    labelX: 743.5, labelY: 396.5, labelSize: 7,
    overlays: METRO_OVERLAYS },
];

export default regions;
