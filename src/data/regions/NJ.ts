// New Jersey — 201 statewide (1947). 1956: 609 takes the south (Trenton,
// Camden, Atlantic City, the shore below Barnegat); 201 keeps the north.
// June 1991: 908 splits from 201, taking the central band (Warren,
// Hunterdon, Somerset, Union, Middlesex, Monmouth, northern Ocean).
// 1997 doubles the map: January — 732 splits from 908 (the eastern half:
// Middlesex, Monmouth, northern Ocean: New Brunswick, Toms River); June —
// 973 splits from 201 (everything west of Bergen/Hudson: Newark, Paterson,
// Morristown, Sussex), 201 keeps only the Bergen/Hudson strip (Hackensack,
// Jersey City). June 1999: 856 splits from 609 (southwest: Camden, Cherry
// Hill, Vineland, Salem). Overlays: 551 on 201, 862 on 973, 848 on 732
// (all December 2001); 640 on 609 (September 2018). 908 and 856 have never
// been overlaid. End state: 6 regions, 10 codes.
//
// Geometry: affine lat/lon fit anchored to outline vertices (Port Jervis
// corner 900.2,170.5; Cape May tip 910.5,219.3; Sandy Hook 916.5,186;
// Perth Amboy notch 912.0,186.1). NJ bbox: x 896-918, y 170.5-219.3.
// 609 is one immutable full-south shape with 856 painted above it from
// 1999 (the MA 508/978 layering trick); the north uses true snapshots
// since every parent shrank to a real successor.
//
// Divider lines (shared vertices, overshoot past the drawn border):
// A (1956, 201|609): Delaware R. just N of Trenton (903.2,191.6) ->
//   Princeton/New Brunswick gap (907.3,188.8) -> (913.5,194.5) -> coast
//   between Toms River and Barnegat (917.3,199.2).
// B (1991, 201|908): Water Gap (896.9,178.9) -> Netcong tripoint
//   (902.7,179.7) -> Morris/Somerset (905.5,184.2) -> Essex/Union
//   (910.6,182.7) -> Newark Bay junction J (912.8,181.8).
// C (1997, 973|201): NY border (910.3,173.5) -> J (912.8,181.8).
// D (1997, 908|732): Arthur Kill (912.4,184.0) -> (908.1,185.2) ->
//   (908.2,187.6) -> meets A at (907.3,188.8).
// E (1999, 856|609): Delaware R. at Palmyra (904.2,197.7) -> Mt Laurel/
//   Medford gap (906.5,199.9) -> (908.0,204.5) -> (907.6,209.0) -> Cape
//   May peninsula base (909.8,214.4).
//
// Tight city calls verified (map coords from the affine fit):
//   Newark 912.0,181.1 (973) vs Elizabeth 911.8,182.7 (908) — line B splits
//   a 1.6-unit gap; Paterson 910.9,177.5 (973) vs Ridgewood 911.4,176.1 and
//   Hackensack 913.1,177.7 (201) on line C; Plainfield 909.0,184.3 (908) vs
//   Piscataway/Woodbridge (732) on line D; Princeton 906.8,190.4 (609) vs
//   New Brunswick 909.2,187.0 (732); Toms River 916.3,196.6 (732) vs
//   Barnegat 915.9,201.0 (609); Mt Laurel 905.7,199.3 + Marlton (856) vs
//   Medford 906.9,199.8 (609); Hammonton 908.8,204.9 (609) vs Vineland
//   906.3,208.6 (856). Both barrier-island slivers (Island Beach, LBI)
//   fall south of line A -> 609; Seaside Heights is really 732 but is a
//   sub-unit sliver, accepted roughness.
import type { StateRegionList } from './types';

const regions: StateRegionList = [
  // 1947-1956: one code for the whole state.
  { code: '201', established: 1947, retired: 1956 },

  // 1956-1991: 201 keeps everything north of line A.
  { code: '201', established: 1956, retired: 1991,
    d: 'M880.6,217.8 L887.8,217.9 L892.3,214.7 L899,221.2 L903.1,226.6 L905.5,229.2 L907.2,224.1 L906.1,192 L877.9,190.9 Z',
    labelX: 890.9, labelY: 205.8, labelSize: 10 },

  // 1956-present: 609 south of line A, unchanged shape; 856 paints over its
  // southwest from 1999 (below), 640 overlays the remainder from 2018.
  { code: '609', established: 1956,
    d: 'M880.6,217.8 L887.8,217.9 L892.3,214.7 L899,221.2 L903.1,226.6 L905.5,229.2 L907.2,233.2 L898.5,252.7 L876.8,248.1 L876.8,224.1 Z',
    labelX: 895.8, labelY: 232.1, labelSize: 9,
    overlays: [{ code: '640', established: 2018 }] },

  // 1991-1997: 908 takes the band between lines A and B; 201 keeps north of B.
  { code: '201', established: 1991, retired: 1997,
    d: 'M878.4,202.9 L881,203.4 L887.3,204.3 L890.3,209.4 L895.9,207.7 L898.3,206.7 L899.6,208.1 L905,209.2 L905,192 L877.9,190.9 Z',
    labelX: 890.9, labelY: 204.1, labelSize: 10 },
  { code: '908', established: 1991, retired: 1997,
    d: 'M878.4,202.9 L881,203.4 L887.3,204.3 L890.3,209.4 L895.9,207.7 L898.3,206.7 L899.6,208.1 L906.1,210.4 L907.2,224.1 L905.5,229.2 L903.1,226.6 L899,221.2 L892.3,214.7 L887.8,217.9 L880.6,217.8 Z',
    labelX: 888.7, labelY: 210.9, labelSize: 9 },

  // 1997-present: the north in its final shape.
  // 973 = north of B, west of C (Newark, Paterson, Morristown, Sussex).
  { code: '973', established: 1997,
    d: 'M878.4,202.9 L881,203.4 L887.3,204.3 L890.3,209.4 L895.9,207.7 L898.3,206.7 L895.5,197.2 L894.8,194.1 L878.9,190.9 Z',
    labelX: 889.3, labelY: 201.2, labelSize: 9,
    overlays: [{ code: '862', established: 2001 }] },
  // 201 = the Bergen/Hudson strip east of C (Hackensack, Jersey City).
  { code: '201', established: 1997,
    d: 'M894.8,194.1 L895.5,197.2 L898.3,206.7 L899.6,208.1 L905,209.2 L905,192 Z',
    labelX: 897.8, labelY: 200.6, labelSize: 6,
    overlays: [{ code: '551', established: 2001 }] },
  // 908 = west of D (Warren, Hunterdon, Somerset, Union: Elizabeth).
  { code: '908', established: 1997,
    d: 'M878.4,202.9 L881,203.4 L887.3,204.3 L890.3,209.4 L895.9,207.7 L898.3,206.7 L899.6,208.1 L900.1,209.4 L897.8,209.2 L893.2,210.6 L893.3,213.3 L892.3,214.7 L887.8,217.9 L880.6,217.8 Z',
    labelX: 886, labelY: 211.5, labelSize: 8 },
  // 732 = east of D, north of A (New Brunswick, Freehold, Toms River).
  { code: '732', established: 1997,
    d: 'M900.1,209.4 L897.8,209.2 L893.2,210.6 L893.3,213.3 L892.3,214.7 L899,221.2 L903.1,226.6 L905.5,229.2 L907.2,224.1 L906.1,210.4 Z',
    labelX: 899.3, labelY: 216.6, labelSize: 7,
    overlays: [{ code: '848', established: 2001 }] },

  // 1999-present: 856 painted above 609 (Camden, Cherry Hill, Vineland, Salem).
  { code: '856', established: 1999,
    d: 'M883.8,224.3 L888.9,224.9 L891.4,227.4 L893.1,232.7 L892.6,237.8 L895,244 L895.2,246.4 L876.8,246.4 L876.8,224.1 Z',
    labelX: 887.1, labelY: 234.4, labelSize: 8 },
];

export default regions;
