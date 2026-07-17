// Michigan — THREE original codes (1947), per the 313/517/616 articles:
//   313 = the southeastern quadrant (Metro Detroit, Flint, southern Thumb),
//   517 = the rest of the eastern Lower Peninsula (Lansing, Tri-Cities,
//         the NE Lower up to the Straits),
//   616 = the western Lower Peninsula PLUS the whole Upper Peninsula.
// Then the shed-rings-until-11-codes saga:
//   1961: 906 takes the entire UP from 616.
//   Dec 1993: 810 takes 313's north (Oakland, Macomb, Genesee, Lapeer,
//         St. Clair, Sanilac — Flint + southern Thumb).
//   1997: 248 takes Oakland from 810 (May); 734 takes Ann Arbor, Monroe
//         and western/downriver Wayne from 313 (Dec).
//   Jun 1999: 231 takes the NW Lower (Muskegon..Traverse City..Petoskey)
//         from 616.
//   2001: 989 takes 517's center/north + Thumb (Tri-Cities, Mt. Pleasant,
//         Alpena, Bad Axe) in April; 586 takes Macomb from 810 (Sep).
//   Jul 2002: 269 takes the SW corner (Kalamazoo, Battle Creek, Benton
//         Harbor) from 616.
// Overlays: 947 on 248 (in service 2002); 679 on 313 (Nov 2025).
//
// Whole-county roughness calls: Wayne stays 313 although its western/
// downriver cities (Livonia, Canton, Taylor) are really 734; Livingston
// rides with 517 (Howell) although Brighton is 810; Shiawassee goes 989
// (Owosso) though its south edge is 810/517; Allegan and Barry go 269
// (Allegan, Hastings) though their Holland/616 fringes disagree;
// Montcalm goes 616 (Greenville) though Stanton-area exchanges are 989.
// The 517 article says its area "was later expanded to include Jackson"
// but no source gives a year, so Jackson is 517 from 1947 here.
// (Rewritten from the old three-box `d` port to county lists.)
import type { StateRegionList } from './types';
import type { MICountyName } from '../counties/MI';

// 906 (the whole UP; 616's northern arm until 1961).
const UP = [
  'Gogebic', 'Ontonagon', 'Houghton', 'Keweenaw', 'Baraga', 'Iron',
  'Marquette', 'Dickinson', 'Menominee', 'Delta', 'Alger', 'Schoolcraft',
  'Luce', 'Mackinac', 'Chippewa',
] as const satisfies readonly MICountyName[];

// The 313 family (original 313 = all five groups).
const M313 = ['Wayne'] as const satisfies readonly MICountyName[];
const M734 = ['Washtenaw', 'Monroe'] as const satisfies readonly MICountyName[];
const M248 = ['Oakland'] as const satisfies readonly MICountyName[];
const M586 = ['Macomb'] as const satisfies readonly MICountyName[];
const M810 = [
  'Genesee', 'Lapeer', 'St. Clair', 'Sanilac',
] as const satisfies readonly MICountyName[];

// The 517 family.
const M517 = [
  'Ingham', 'Eaton', 'Clinton', 'Jackson', 'Hillsdale', 'Branch',
  'Lenawee', 'Livingston',
] as const satisfies readonly MICountyName[];
const M989 = [
  'Saginaw', 'Bay', 'Midland', 'Isabella', 'Gratiot', 'Shiawassee',
  'Clare', 'Gladwin', 'Arenac', 'Iosco', 'Ogemaw', 'Roscommon',
  'Crawford', 'Oscoda', 'Alcona', 'Alpena', 'Montmorency',
  'Presque Isle', 'Otsego', 'Huron', 'Tuscola',
] as const satisfies readonly MICountyName[];

// The 616 family (original 616 = these three groups + UP).
const M616 = [
  'Kent', 'Ottawa', 'Ionia', 'Montcalm',
] as const satisfies readonly MICountyName[];
const M231 = [
  'Muskegon', 'Oceana', 'Newaygo', 'Mecosta', 'Lake', 'Mason', 'Osceola',
  'Manistee', 'Wexford', 'Missaukee', 'Benzie', 'Grand Traverse',
  'Leelanau', 'Kalkaska', 'Antrim', 'Charlevoix', 'Emmet', 'Cheboygan',
] as const satisfies readonly MICountyName[];
const M269 = [
  'Berrien', 'Cass', 'Van Buren', 'St. Joseph', 'Kalamazoo', 'Calhoun',
  'Barry', 'Allegan',
] as const satisfies readonly MICountyName[];

const regions: StateRegionList<MICountyName> = [
  // 1947-1961: 616's L (west Lower + UP); bbox center falls in Lake
  // Michigan, so the label is pinned to the mid western Lower.
  { code: '616', established: 1947, retired: 1961,
    counties: [...M616, ...M231, ...M269, ...UP],
    labelX: 697, labelY: 168 },

  // 1961: the UP goes 906; 616 = the western Lower Peninsula.
  { code: '906', established: 1961, counties: UP },
  { code: '616', established: 1961, retired: 1999,
    counties: [...M616, ...M231, ...M269] },

  // 1999: the NW Lower goes 231.
  { code: '231', established: 1999, counties: M231 },
  { code: '616', established: 1999, retired: 2002,
    counties: [...M616, ...M269] },

  // 2002: the SW corner goes 269; 616 = Grand Rapids country.
  { code: '269', established: 2002, counties: M269 },
  { code: '616', established: 2002, counties: M616 },

  // 1947-2001: 517 = the eastern Lower outside the southeast.
  { code: '517', established: 1947, retired: 2001,
    counties: [...M517, ...M989] },

  // 2001: the center/north + Thumb go 989; 517 = Lansing country.
  { code: '989', established: 2001, counties: M989 },
  { code: '517', established: 2001, counties: M517 },

  // 1947-1993: 313 = the southeastern quadrant.
  { code: '313', established: 1947, retired: 1993,
    counties: [...M313, ...M734, ...M248, ...M586, ...M810], labelSize: 10 },

  // 1993: Flint + the northern suburbs + southern Thumb go 810.
  { code: '810', established: 1993, retired: 1997,
    counties: [...M810, ...M248, ...M586], labelSize: 9 },
  { code: '313', established: 1993, retired: 1997,
    counties: [...M313, ...M734], labelSize: 9 },

  // 1997: Oakland goes 248 (947 overlay 2002); Ann Arbor/Monroe side
  // goes 734; 313 = Wayne (679 overlay 2025).
  { code: '248', established: 1997, counties: M248, labelSize: 6,
    overlays: [{ code: '947', established: 2002 }] },
  { code: '810', established: 1997, retired: 2001,
    counties: [...M810, ...M586], labelSize: 9 },
  { code: '734', established: 1997, counties: M734, labelSize: 8 },
  { code: '313', established: 1997, counties: M313, labelSize: 6,
    overlays: [{ code: '679', established: 2025 }] },

  // 2001: Macomb goes 586; 810 = Flint/Thumb.
  { code: '586', established: 2001, counties: M586, labelSize: 6 },
  { code: '810', established: 2001, counties: M810, labelSize: 9 },
];

export default regions;
