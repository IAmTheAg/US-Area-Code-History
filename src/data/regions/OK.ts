// Oklahoma — 405 statewide (1947). The split tree:
//   Jan 1953: 918 takes the northeast quadrant (Tulsa, Bartlesville,
//         Muskogee, McAlester, Poteau).
//   Nov 1997: 580 takes the south and west — a C-shape from the
//         panhandle through Enid, Lawton, Ardmore, Durant to Idabel;
//         405 keeps central OK (OKC, Stillwater, Shawnee, Chickasha).
// Overlays: 539 on 918 (2011, the state's first); 572 on 405 (2021).
//
// The wiki articles list cities only, so the lines are county-seat
// checks: Ponca City (Kay), Perry (Noble), Ada (Pontotoc), Sulphur
// (Murray), Watonga (Blaine), Weatherford (Custer), Durant (Bryan),
// Hugo (Choctaw), Idabel (McCurtain) -> 580; Stillwater (Payne),
// Chickasha (Grady), Anadarko (Caddo), Pauls Valley (Garvin),
// Holdenville (Hughes) -> 405; McAlester (Pittsburg), Wilburton
// (Latimer), Poteau (Le Flore), Okemah (Okfuskee), Pawhuska (Osage)
// -> 918. The three groups tile all 77 counties exactly once.
import type { StateRegionList } from './types';
import type { OKCountyName } from '../counties/OK';

const M918 = [
  'Tulsa', 'Osage', 'Washington', 'Nowata', 'Craig', 'Ottawa',
  'Delaware', 'Mayes', 'Rogers', 'Wagoner', 'Cherokee', 'Adair',
  'Sequoyah', 'Muskogee', 'McIntosh', 'Okmulgee', 'Creek', 'Pawnee',
  'Okfuskee', 'Haskell', 'Pittsburg', 'Latimer', 'Le Flore',
] as const satisfies readonly OKCountyName[];

const M405 = [
  'Oklahoma', 'Cleveland', 'Canadian', 'McClain', 'Grady', 'Caddo',
  'Garvin', 'Logan', 'Kingfisher', 'Payne', 'Lincoln', 'Pottawatomie',
  'Seminole', 'Hughes',
] as const satisfies readonly OKCountyName[];

const M580 = [
  'Cimarron', 'Texas', 'Beaver', 'Harper', 'Woods', 'Alfalfa', 'Grant',
  'Kay', 'Woodward', 'Major', 'Garfield', 'Noble', 'Ellis', 'Dewey',
  'Blaine', 'Custer', 'Roger Mills', 'Beckham', 'Washita', 'Kiowa',
  'Greer', 'Harmon', 'Jackson', 'Tillman', 'Comanche', 'Cotton',
  'Stephens', 'Jefferson', 'Carter', 'Love', 'Marshall', 'Johnston',
  'Murray', 'Pontotoc', 'Coal', 'Atoka', 'Bryan', 'Choctaw',
  'Pushmataha', 'McCurtain',
] as const satisfies readonly OKCountyName[];

const regions: StateRegionList<OKCountyName> = [
  // 1947-1953: one code for the whole state.
  { code: '405', established: 1947, retired: 1953 },

  // 1953: Tulsa's northeast quadrant goes 918.
  { code: '918', established: 1953, counties: M918,
    overlays: [{ code: '539', established: 2011 }] },
  { code: '405', established: 1953, retired: 1997,
    counties: [...M405, ...M580] },

  // 1997: the south + west C-shape goes 580.
  { code: '580', established: 1997, counties: M580 },
  { code: '405', established: 1997, counties: M405,
    overlays: [{ code: '572', established: 2021 }] },
];

export default regions;
