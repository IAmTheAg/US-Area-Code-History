// Colorado — 303 statewide (1947). The split tree:
//   Mar 1988: 719 takes the south (Colorado Springs, Pueblo, the San
//         Luis Valley, the southeast plains).
//   Apr 1995: 970 takes the north and west (Fort Collins, Greeley,
//         the mountains, the Western Slope); 303 keeps Denver-Boulder.
// Overlays on 303: 720 (1998), 983 (Jun 2022). Overlay on 970: 748
// (in service Jul 7, 2025). 719 has none.
//
// Lines by county seat: Leadville (Lake), Fairplay (Park), Cripple
// Creek (Teller), Burlington (Kit Carson), Cheyenne Wells (Cheyenne),
// Hugo (Lincoln), Eads (Kiowa) -> 719; Elizabeth/Kiowa-town (Elbert),
// Central City (Gilpin), Georgetown (Clear Creek) -> 303; Lake City
// (Hinsdale), Fort Morgan (Morgan), Akron (Washington), Wray (Yuma)
// -> 970. The three groups tile all 64 counties exactly once.
import type { StateRegionList } from './types';
import type { COCountyName } from '../counties/CO';

const M303 = [
  'Denver', 'Adams', 'Arapahoe', 'Douglas', 'Jefferson', 'Broomfield',
  'Boulder', 'Gilpin', 'Clear Creek', 'Elbert',
] as const satisfies readonly COCountyName[];

const M719 = [
  'El Paso', 'Teller', 'Park', 'Fremont', 'Custer', 'Chaffee', 'Lake',
  'Saguache', 'Mineral', 'Alamosa', 'Rio Grande', 'Conejos',
  'Costilla', 'Huerfano', 'Las Animas', 'Pueblo', 'Otero', 'Crowley',
  'Kiowa', 'Bent', 'Prowers', 'Baca', 'Cheyenne', 'Kit Carson',
  'Lincoln',
] as const satisfies readonly COCountyName[];

const M970 = [
  'Larimer', 'Weld', 'Morgan', 'Logan', 'Sedgwick', 'Phillips',
  'Washington', 'Yuma', 'Grand', 'Jackson', 'Routt', 'Moffat',
  'Rio Blanco', 'Garfield', 'Eagle', 'Summit', 'Pitkin', 'Mesa',
  'Delta', 'Montrose', 'Gunnison', 'Ouray', 'San Miguel', 'Dolores',
  'San Juan', 'Hinsdale', 'Montezuma', 'La Plata', 'Archuleta',
] as const satisfies readonly COCountyName[];

const regions: StateRegionList<COCountyName> = [
  // 1947-1988: one code for the whole state.
  { code: '303', established: 1947, retired: 1988 },

  // 1988-1995: 303 = everything but the south; its bbox center falls in
  // Park County (719), so the label is pinned to Eagle.
  { code: '303', established: 1988, retired: 1995,
    counties: [...M303, ...M970],
    labelX: 336.1, labelY: 263.7 },
  { code: '719', established: 1988, counties: M719 },

  // 1995: the north + west go 970 (label pinned to Garfield — the
  // wrap-around's bbox center lands in the Denver block).
  { code: '970', established: 1995, counties: M970,
    labelX: 312.2, labelY: 260.7,
    overlays: [{ code: '748', established: 2025 }] },
  { code: '303', established: 1995, counties: M303,
    overlays: [
      { code: '720', established: 1998 },
      { code: '983', established: 2022 },
    ] },
];

export default regions;
