// Washington — 206 statewide (1947), then:
//   1957: 509 takes everything east of the Cascades (Spokane, Yakima,
//         Tri-Cities, Wenatchee); 206 = western Washington.
//   Jan 1995: 360 takes western Washington OUTSIDE the Puget Sound metro
//         (Olympia, Bellingham, Vancouver, Bremerton); 206 keeps
//         Seattle-Tacoma-Everett.
//   Apr 1997: 253 takes the Tacoma side, 425 the Eastside/south
//         Snohomish suburbs; 206 = Seattle proper.
// Overlay 564 covers western Washington in phases as codes exhaust:
// in service on 360 in Aug 2017, extended to 206 in June 2023 (253 and
// 425 are approved-if-needed only, so no overlay entries here yet).
//
// Whole-county roughness calls (the real metro boundaries cut King and
// Snohomish): King -> 206 although the Eastside (Bellevue, Redmond) is
// really 425 and the south end (Federal Way, Kent, Auburn) is 253;
// Snohomish -> 425 (Everett, Lynnwood) although its north half
// (Marysville, Stanwood) is really 360; Kitsap -> 360 (Bremerton)
// although Bainbridge Island kept 206. Keeping 206 = all of King (the
// MN 612=Hennepin move) avoids a Boston-style `d` sliver for Seattle.
import type { StateRegionList } from './types';
import type { WACountyName } from '../counties/WA';

// 509: east of the Cascades.
const E509 = [
  'Okanogan', 'Chelan', 'Douglas', 'Grant', 'Kittitas', 'Yakima',
  'Klickitat', 'Benton', 'Franklin', 'Adams', 'Lincoln', 'Ferry',
  'Stevens', 'Pend Oreille', 'Spokane', 'Whitman', 'Garfield',
  'Columbia', 'Walla Walla', 'Asotin',
] as const satisfies readonly WACountyName[];

// 360: western Washington outside the Puget Sound metro (a C around it).
const W360 = [
  'Whatcom', 'Skagit', 'Island', 'San Juan', 'Clallam', 'Jefferson',
  'Kitsap', 'Mason', 'Grays Harbor', 'Thurston', 'Pacific', 'Lewis',
  'Wahkiakum', 'Cowlitz', 'Skamania', 'Clark',
] as const satisfies readonly WACountyName[];

// The metro three (1997).
const M206 = ['King'] as const satisfies readonly WACountyName[];
const M253 = ['Pierce'] as const satisfies readonly WACountyName[];
const M425 = ['Snohomish'] as const satisfies readonly WACountyName[];

const regions: StateRegionList<WACountyName> = [
  // 1947-1957: one code for the whole state.
  { code: '206', established: 1947, retired: 1957 },

  // 1957: eastern Washington goes 509.
  { code: '509', established: 1957, counties: E509 },
  // 206 = western Washington; default label center falls in Puget Sound
  // at King's edge, so pin it south to Lewis County.
  { code: '206', established: 1957, retired: 1995,
    counties: [...W360, ...M206, ...M253, ...M425],
    labelX: 108, labelY: 55 },

  // 1995: everything outside Seattle-Tacoma-Everett goes 360 (564
  // overlay since 2017). Same Lewis County label pin for the C shape.
  { code: '360', established: 1995, counties: W360,
    labelX: 108, labelY: 55, labelSize: 10,
    overlays: [{ code: '564', established: 2017 }] },
  { code: '206', established: 1995, retired: 1997,
    counties: [...M206, ...M253, ...M425] },

  // 1997: Tacoma goes 253, the Eastside/south Snohomish 425; 206 =
  // Seattle (564 overlay since 2023).
  { code: '253', established: 1997, counties: M253, labelSize: 8 },
  { code: '425', established: 1997, counties: M425, labelSize: 8 },
  { code: '206', established: 1997, counties: M206, labelSize: 8,
    overlays: [{ code: '564', established: 2023 }] },
];

export default regions;
