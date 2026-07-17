// Wisconsin — TWO original codes (1947): 715 north, 414 the south
// (Milwaukee, Madison, Green Bay). The split tree, all on the 414 side:
//   1955: 608 takes the southwest (Madison, La Crosse, Janesville).
//   Jul 1997: 920 takes the east (Green Bay, Fox Valley, Sheboygan,
//         Fond du Lac); 414 keeps the Milwaukee metro.
//   Sep 1999: 262 takes the suburban ring (Waukesha, Kenosha, Racine,
//         Washington, Ozaukee, Walworth); 414 = Milwaukee County.
// 715 has never split. Overlays: 534 on 715 (2010); 274 on 920 and
// 353 on 608 (both 2023).
//
// Split counties on the 715/920 line assigned by county seat: Marinette
// (715-735) and Shawano (715-526) -> 715; Oconto (920-834), Outagamie
// (Appleton) and Waushara (Wautoma) -> 920. On the 920/608 line:
// Columbia (Portage, 608) -> 608 even though Columbus is 920; Jefferson
// (Watertown/Fort Atkinson, both 920) -> 920. A few slivers of Waukesha
// and Washington stayed 414 in 1999 — whole-county they're 262. The
// five groups tile all 72 counties exactly once.
// (Converted from the old affine-ported `d` diagonal to county lists.)
//
// Sources: the 715/534, 920/274, and 262 Wikipedia articles enumerate
// their counties; 608 = the remainder (Madison/La Crosse block).
import type { StateRegionList } from './types';
import type { WICountyName } from '../counties/WI';

const M715 = [
  'Ashland', 'Barron', 'Bayfield', 'Buffalo', 'Burnett', 'Chippewa',
  'Clark', 'Douglas', 'Dunn', 'Eau Claire', 'Florence', 'Forest',
  'Iron', 'Jackson', 'Langlade', 'Lincoln', 'Marathon', 'Marinette',
  'Menominee', 'Oneida', 'Pepin', 'Pierce', 'Polk', 'Portage', 'Price',
  'Rusk', 'St. Croix', 'Sawyer', 'Shawano', 'Taylor', 'Trempealeau',
  'Vilas', 'Washburn', 'Waupaca', 'Wood',
] as const satisfies readonly WICountyName[];

const M920 = [
  'Brown', 'Calumet', 'Dodge', 'Door', 'Fond du Lac', 'Green Lake',
  'Jefferson', 'Kewaunee', 'Manitowoc', 'Marquette', 'Oconto',
  'Outagamie', 'Sheboygan', 'Waushara', 'Winnebago',
] as const satisfies readonly WICountyName[];

const M608 = [
  'Adams', 'Columbia', 'Crawford', 'Dane', 'Grant', 'Green', 'Iowa',
  'Juneau', 'La Crosse', 'Lafayette', 'Monroe', 'Richland', 'Rock',
  'Sauk', 'Vernon',
] as const satisfies readonly WICountyName[];

const M262 = [
  'Kenosha', 'Ozaukee', 'Racine', 'Walworth', 'Washington', 'Waukesha',
] as const satisfies readonly WICountyName[];

const M414 = [
  'Milwaukee',
] as const satisfies readonly WICountyName[];

const regions: StateRegionList<WICountyName> = [
  // 715 = the north, unchanged since 1947.
  { code: '715', established: 1947, counties: M715,
    overlays: [{ code: '534', established: 2010 }] },

  // 1947-1955: 414 = everything south of the 715 line.
  { code: '414', established: 1947, retired: 1955,
    counties: [...M414, ...M262, ...M608, ...M920] },

  // 1955: the southwest goes 608.
  { code: '608', established: 1955, counties: M608,
    overlays: [{ code: '353', established: 2023 }] },
  { code: '414', established: 1955, retired: 1997,
    counties: [...M414, ...M262, ...M920] },

  // 1997: the east goes 920.
  { code: '920', established: 1997, counties: M920,
    overlays: [{ code: '274', established: 2023 }] },
  { code: '414', established: 1997, retired: 1999,
    counties: [...M414, ...M262] },

  // 1999: the suburban ring goes 262; 414 = Milwaukee County.
  { code: '262', established: 1999, counties: M262 },
  { code: '414', established: 1999, counties: M414, labelSize: 8 },
];

export default regions;
