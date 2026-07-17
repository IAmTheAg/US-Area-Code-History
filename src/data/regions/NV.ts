// Nevada — 702 statewide (1947). December 1998: 775 takes everything
// except Clark County (Las Vegas, Henderson, Mesquite, Laughlin). 725
// overlaid the 702 area in June 2014.
//
// First county-based state: the 1998 split follows the Clark County line
// exactly, so both regions are plain county lists — no drawn dividers.
// City checks are just county membership: Vegas/Henderson/Laughlin/Mesquite
// in Clark (702); Pahrump is Nye, Caliente is Lincoln — out (775).
import type { StateRegionList } from './types';
import type { NVCountyName } from '../counties/NV';

const regions: StateRegionList<NVCountyName> = [
  // 1947-1998: one code for the whole state.
  { code: '702', established: 1947, retired: 1998 },

  // 1998-present: 775 = all of Nevada except Clark County.
  { code: '775', established: 1998,
    counties: [
      'Carson City', 'Churchill', 'Douglas', 'Elko', 'Esmeralda', 'Eureka',
      'Humboldt', 'Lander', 'Lincoln', 'Lyon', 'Mineral', 'Nye', 'Pershing',
      'Storey', 'Washoe', 'White Pine',
    ],
    labelY: 230 },

  // 1998-present: 702 = Clark County; 725 overlay 2014.
  { code: '702', established: 1998,
    counties: ['Clark'],
    labelSize: 8,
    overlays: [{ code: '725', established: 2014 }] },
];

export default regions;
