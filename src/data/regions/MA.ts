// Massachusetts — 413 west / 617 east (1947); 508 split from 617 in July
// 1988 (617 kept metro Boston); September 1997 made it five: 978 (north,
// from 508) and 781 (Boston ring, from 617). All four eastern codes were
// overlaid in 2001: 351 on 978, 774 on 508, 339 on 781, 857 on 617.
// 413 has never split nor been overlaid.
//
// County-based since the county-map refactor: the 413/617 line is exactly
// the four western counties, so WEST/EAST county groups carry the 1947 and
// 1988 eras. The 1997 metro codes are nothing like county lines (978/781/
// 617 slice Middlesex/Essex/Norfolk), so those stay escape-hatch `d` blobs
// painted above the EAST base — 508 is one unchanging full-east region;
// whoever paints above it takes territory. The 978 band overshoots WEST
// past the real (jagged) Worcester county line; 413 is last in the array
// so it paints over that overshoot and keeps the true county boundary.
// Tight calls carried over from the old map (affine-ported blob coords):
// Salem 978 vs Lynn 781 (the y=152.1 band edge), Newton 617 vs Waltham
// 781, Framingham 508 vs Dedham 781 — that's the visual re-check list.
import type { StateRegionList } from './types';
import type { MACountyName } from '../counties/MA';

const WEST = [
  'Berkshire', 'Franklin', 'Hampshire', 'Hampden',
] as const satisfies readonly MACountyName[];

const EAST = [
  'Worcester', 'Middlesex', 'Essex', 'Suffolk', 'Norfolk', 'Bristol',
  'Plymouth', 'Barnstable', 'Dukes', 'Nantucket',
] as const satisfies readonly MACountyName[];

const regions: StateRegionList<MACountyName> = [
  // 1947-1988: 617 = everything east of the 413 line.
  { code: '617', established: 1947, retired: 1988, counties: EAST },

  // 1988-present: 508 owns the east; whoever paints above it takes territory.
  { code: '508', established: 1988, counties: EAST,
    labelX: 943.6, labelY: 166.7, labelSize: 8,
    overlays: [{ code: '774', established: 2001 }] },

  // 1988-1997: metro Boston stays 617 (painted above 508).
  { code: '617', established: 1988, retired: 1997,
    d: 'M940.6,152.1 L956.7,152.1 L956.7,161.4 L940.6,161.4 Z', labelX: 947.2, labelY: 156.4, labelSize: 8 },

  // 1997: the northern band goes 978 (from 508); west edge overshoots the
  // county line, 413 below repaints the overlap.
  { code: '978', established: 1997,
    d: 'M910,131.3 L976.9,131.3 L976.9,152.1 L910,152.1 Z', labelX: 935.3, labelY: 148.7, labelSize: 7,
    overlays: [{ code: '351', established: 2001 }] },

  // ...and the inner ring goes 781 (from 617), with the 617 core on top.
  { code: '781', established: 1997,
    d: 'M940.6,152.1 L956.7,152.1 L956.7,162.3 L940.6,162.3 Z', labelX: 947.8, labelY: 160.9, labelSize: 6,
    overlays: [{ code: '339', established: 2001 }] },
  { code: '617', established: 1997,
    d: 'M942.4,153.6 L953.1,153.6 L953.1,159.1 L942.4,159.1 Z', labelX: 947.8, labelY: 156.4, labelSize: 6,
    overlays: [{ code: '857', established: 2001 }] },

  // The four western counties, unchanged since 1947. Last in the array so
  // the real county boundary beats the metro blobs' western overshoot.
  { code: '413', established: 1947, counties: WEST },
];

export default regions;
