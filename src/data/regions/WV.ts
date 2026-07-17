// West Virginia — 304 statewide since 1947, never split. 681 overlaid
// statewide on March 28, 2009 (the whole state is one 304/681 region).
import type { StateRegionList } from './types';

const regions: StateRegionList = [
  { code: '304', established: 1947,
    overlays: [{ code: '681', established: 2009 }] },
];

export default regions;
