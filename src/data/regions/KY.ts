// Kentucky — 502 statewide (1947). 1954: 606 takes the eastern half (as
// far west as Lexington and the Cincinnati suburbs). 1999: both halves
// split again — 270 takes the west (Bowling Green, Paducah, Owensboro,
// Elizabethtown) leaving 502 the Louisville/Frankfort core, and 859 takes
// 606's populous northwest (Lexington, Covington/Northern Kentucky)
// leaving 606 the rural Eastern Coalfield (deliberately: sparing the
// poorest counties a number change). Overlay: 364 on 270 (March 2014).
// NOT on the map: 761 (502 overlay) was approved by the KY PSC in August
// 2025 but is not yet in service — add it when it goes live.
//
// County lists: 502's 13 counties and 859's 19 are straight from their
// Wikipedia articles; 606/270 assembled from city checks (Maysville/
// Mason, Somerset/Pulaski, Stanford/Lincoln, Monticello/Wayne, Albany/
// Clinton, Augusta/Bracken all 606; Lebanon/Marion, Hodgenville/Larue,
// Campbellsville/Taylor, Russell Springs/Russell, Burkesville/Cumberland
// all 270). Provenance cross-checks: Georgetown is 502 today so Scott
// stayed 502-lineage through 1954 (859 only split from 606); Springfield
// is 859 today so Washington rode the 606 side from 1954. Wiki notes 502
// really splits Hardin and Meade — whole-county they go 270 (their seats
// Elizabethtown and Brandenburg are 270).
import type { StateRegionList } from './types';
import type { KYCountyName } from '../counties/KY';

// The four present-day regions, named by their final code.
const M502 = [
  'Jefferson', 'Oldham', 'Trimble', 'Henry', 'Carroll', 'Owen', 'Franklin',
  'Shelby', 'Spencer', 'Bullitt', 'Nelson', 'Anderson', 'Scott',
] as const satisfies readonly KYCountyName[];

const M859 = [
  'Boone', 'Bourbon', 'Boyle', 'Campbell', 'Clark', 'Fayette', 'Gallatin',
  'Garrard', 'Grant', 'Harrison', 'Jessamine', 'Kenton', 'Madison',
  'Mercer', 'Montgomery', 'Nicholas', 'Pendleton', 'Washington',
  'Woodford',
] as const satisfies readonly KYCountyName[];

const M606 = [
  'Greenup', 'Boyd', 'Carter', 'Lewis', 'Mason', 'Fleming', 'Rowan',
  'Elliott', 'Lawrence', 'Bath', 'Menifee', 'Morgan', 'Johnson', 'Martin',
  'Magoffin', 'Floyd', 'Pike', 'Knott', 'Letcher', 'Perry', 'Breathitt',
  'Wolfe', 'Lee', 'Owsley', 'Estill', 'Powell', 'Jackson', 'Clay',
  'Leslie', 'Harlan', 'Bell', 'Knox', 'Laurel', 'Whitley', 'McCreary',
  'Wayne', 'Pulaski', 'Rockcastle', 'Lincoln', 'Casey', 'Clinton',
  'Bracken', 'Robertson',
] as const satisfies readonly KYCountyName[];

const M270 = [
  'Ballard', 'Carlisle', 'Hickman', 'Fulton', 'McCracken', 'Graves',
  'Marshall', 'Calloway', 'Livingston', 'Lyon', 'Trigg', 'Christian',
  'Todd', 'Logan', 'Simpson', 'Allen', 'Warren', 'Barren', 'Monroe',
  'Metcalfe', 'Cumberland', 'Adair', 'Russell', 'Green', 'Taylor',
  'Marion', 'Larue', 'Hart', 'Edmonson', 'Butler', 'Grayson',
  'Breckinridge', 'Meade', 'Hardin', 'Hancock', 'Daviess', 'Ohio',
  'Muhlenberg', 'McLean', 'Henderson', 'Webster', 'Hopkins', 'Caldwell',
  'Crittenden', 'Union',
] as const satisfies readonly KYCountyName[];

const regions: StateRegionList<KYCountyName> = [
  // 1947-1954: one code for the whole state.
  { code: '502', established: 1947, retired: 1954 },

  // 1954-1999: 502 keeps the west, 606 takes the east.
  { code: '502', established: 1954, retired: 1999,
    counties: [...M502, ...M270] },
  { code: '606', established: 1954, retired: 1999,
    counties: [...M606, ...M859] },

  // 1999: four-way Kentucky. 364 overlaid 270 in 2014. 859's label is
  // pinned to Lexington — its bbox center falls in Scott County (502),
  // which 859 horseshoes around.
  { code: '502', established: 1999, counties: M502 },
  { code: '270', established: 1999, counties: M270,
    overlays: [{ code: '364', established: 2014 }] },
  { code: '859', established: 1999, counties: M859,
    labelX: 730, labelY: 299.1 },
  { code: '606', established: 1999, counties: M606 },
];

export default regions;
