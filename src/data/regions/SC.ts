// South Carolina — 803 statewide (1947). December 1995: 864 takes the
// Upstate (Greenville, Spartanburg, Anderson, Greenwood). March 1998: 843
// takes the coastal plain / Lowcountry + Pee Dee (Charleston, Myrtle
// Beach, Florence, Hilton Head, Beaufort), leaving 803 the Midlands
// (Columbia, Rock Hill, Aiken, Sumter, Orangeburg). Overlays, one per
// region: 854 on 843 (2015), 839 on 803 (2020), 821 on 864 (2024).
// Three regions ever, six codes.
//
// County-based since the county-map port (both splits follow county
// lines). Town checks carried over from the old drawn-divider research:
// Gaffney (Cherokee) 864 vs Rock Hill (York) 803; Camden (Kershaw) and
// Bishopville (Lee) 803 vs Hartsville (Darlington) and Pageland
// (Chesterfield) 843; Sumter/Manning (Clarendon) 803 vs Kingstree
// (Williamsburg) 843; St. George (Dorchester) 843 vs Orangeburg 803;
// Allendale + Hampton 803 vs Walterboro (Colleton) and Ridgeland
// (Jasper) 843. Saluda -> 864 (the town is 864) — the old polygon's
// known miss, fixed by the port. Whole-county roughness: Newberry and
// Edgefield -> 803 (their county seats) although their 864-side fringes
// disagree.
import type { StateRegionList } from './types';
import type { SCCountyName } from '../counties/SC';

const M864 = [
  'Oconee', 'Pickens', 'Anderson', 'Greenville', 'Spartanburg',
  'Cherokee', 'Union', 'Laurens', 'Abbeville', 'Greenwood', 'McCormick',
  'Saluda',
] as const satisfies readonly SCCountyName[];

const M843 = [
  'Horry', 'Georgetown', 'Charleston', 'Berkeley', 'Dorchester',
  'Colleton', 'Beaufort', 'Jasper', 'Williamsburg', 'Florence', 'Marion',
  'Dillon', 'Marlboro', 'Darlington', 'Chesterfield',
] as const satisfies readonly SCCountyName[];

const M803 = [
  'York', 'Chester', 'Lancaster', 'Fairfield', 'Kershaw', 'Lee',
  'Sumter', 'Clarendon', 'Richland', 'Lexington', 'Newberry',
  'Edgefield', 'Aiken', 'Barnwell', 'Bamberg', 'Orangeburg', 'Calhoun',
  'Allendale', 'Hampton',
] as const satisfies readonly SCCountyName[];

const regions: StateRegionList<SCCountyName> = [
  // 1947-1995: one code for the whole state.
  { code: '803', established: 1947, retired: 1995 },

  // 1995-present: 864 = Upstate; 821 overlay 2024.
  { code: '864', established: 1995, counties: M864, labelSize: 9,
    overlays: [{ code: '821', established: 2024 }] },

  // 1995-1998: 803 = everything below the Upstate.
  { code: '803', established: 1995, retired: 1998,
    counties: [...M803, ...M843], labelSize: 10 },

  // 1998-present: 803 = the Midlands (839 overlay 2020), 843 = the
  // coastal plain (854 overlay 2015).
  { code: '803', established: 1998, counties: M803, labelSize: 10,
    overlays: [{ code: '839', established: 2020 }] },
  { code: '843', established: 1998, counties: M843, labelSize: 10,
    overlays: [{ code: '854', established: 2015 }] },
];

export default regions;
