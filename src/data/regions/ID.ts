// Idaho — 208 statewide since 1947, never split (one of the last
// single-code states; number pooling staved off exhaustion from 2002).
// 986 overlaid statewide in 2017, forming the 208/986 overlay complex.
import type { StateRegionList } from './types';

const regions: StateRegionList = [
  { code: '208', established: 1947,
    overlays: [{ code: '986', established: 2017 }] },
];

export default regions;
