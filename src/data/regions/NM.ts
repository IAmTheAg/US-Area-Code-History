// New Mexico — 505 statewide (1947), and just ONE split, sixty years
// in: Oct 2007, 575 takes everything outside the northwest quadrant
// (Las Cruces, Roswell, Carlsbad, Clovis, Alamogordo, Silver City —
// and, up north, Taos and Raton); 505 keeps Albuquerque, Santa Fe,
// Farmington, Gallup. No overlays.
//
// Lines by county seat: Taos (575-758), Raton/Colfax, Santa Rosa/
// Guadalupe, Socorro (575-835) -> 575; Las Vegas/San Miguel (505-425),
// Española/Rio Arriba, Estancia+Moriarty/Torrance -> 505. The two
// groups tile all 33 counties exactly once.
import type { StateRegionList } from './types';
import type { NMCountyName } from '../counties/NM';

const M505 = [
  'San Juan', 'McKinley', 'Cibola', 'Bernalillo', 'Sandoval',
  'Valencia', 'Santa Fe', 'Los Alamos', 'Rio Arriba', 'San Miguel',
  'Torrance',
] as const satisfies readonly NMCountyName[];

const M575 = [
  'Taos', 'Colfax', 'Union', 'Mora', 'Harding', 'Quay', 'Guadalupe',
  'De Baca', 'Curry', 'Roosevelt', 'Chaves', 'Eddy', 'Lea', 'Lincoln',
  'Otero', 'Doña Ana', 'Sierra', 'Socorro', 'Catron', 'Grant', 'Luna',
  'Hidalgo',
] as const satisfies readonly NMCountyName[];

const regions: StateRegionList<NMCountyName> = [
  // 1947-2007: one code for the whole state — one of the last original
  // codes to cover its entire original territory.
  { code: '505', established: 1947, retired: 2007 },

  // 2007: 575 wraps the east and south (label pinned to Chaves — the
  // L-shape's bbox center falls in 505's Torrance County).
  { code: '505', established: 2007, counties: M505 },
  { code: '575', established: 2007, counties: M575,
    labelX: 361.6, labelY: 413.2 },
];

export default regions;
