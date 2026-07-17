// District of Columbia — 202 since 1947, never split; 771 overlaid the
// whole district in November 2021 (202/771 overlay complex).
import type { StateRegionList } from './types';

const regions: StateRegionList = [
  { code: '202', established: 1947,
    overlays: [{ code: '771', established: 2021 }] },
];

export default regions;
