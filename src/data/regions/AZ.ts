// Arizona — 602 statewide (1947). March 1995: 520 takes everything except
// metro Phoenix (602 keeps the Maricopa urban blob). March 1, 1999: the
// blob splits three ways — 623 West Valley (Glendale, Peoria, Surprise,
// Buckeye), 602 a narrow central strip (city of Phoenix), 480 East Valley
// (Scottsdale, Tempe, Mesa, Chandler, Apache Junction). June 23, 2001: 928
// splits from 520, taking the north PLUS the western strip down to Yuma
// and the eastern mining strip (Safford, Clifton) — 520 keeps the
// southeast (Tucson, Nogales, Sierra Vista, Casa Grande). September 12,
// 2023: the 480/602/623 boundaries were ELIMINATED — the three codes now
// form one overlay complex over the whole metro, modeled here as a single
// region 602 with 480 + 623 as overlays from 2023.
//
// Hybrid since the county-map port: the 2001-era 928/520 line is county-
// clean (928 even gets Maricopa as its base, so rural Maricopa —
// Wickenburg, Gila Bend — correctly renders 928), while metro Phoenix
// stays the stylized escape-hatch rectangle x 205.3-233.1, y 378.7-398.9
// painted above the county layers (the 602/623/480 lines are hopelessly
// sub-county; the blob also swallows Apache Junction from Pinal, which is
// right). Inside it the 1999-2023 bands are vertical cuts at x=217.6 and
// x=220.8 (Glendale 623 | Phoenix 602 | Tempe 480).
// Whole-county roughness calls: Gila -> 928 (Globe, Payson, San Carlos)
// although Miami is really 520; Greenlee -> 928 (Clifton) although its
// south (Duncan) leans 520; Pinal -> 520 (Casa Grande, Florence — and,
// fixed by the port, Superior, which the old drawn divider lost to 928).
// The 1995-2001 statewide 520 era stays shapeless with the 602 blob
// painted above.
import type { StateRegionList } from './types';
import type { AZCountyName } from '../counties/AZ';

// 928's base includes Maricopa: the metro blob paints above it, leaving
// the county's rural fringe correctly 928.
const M928 = [
  'Mohave', 'Coconino', 'Yavapai', 'Navajo', 'Apache', 'Gila', 'La Paz',
  'Yuma', 'Graham', 'Greenlee', 'Maricopa',
] as const satisfies readonly AZCountyName[];

const M520 = [
  'Pima', 'Pinal', 'Santa Cruz', 'Cochise',
] as const satisfies readonly AZCountyName[];

const regions: StateRegionList<AZCountyName> = [
  // 1947-1995: one code for the whole state.
  { code: '602', established: 1947, retired: 1995 },

  // 1995-2001: 520 = everything outside metro Phoenix (blob painted above).
  { code: '520', established: 1995, retired: 2001,
    labelX: 238.9, labelY: 426.5 },

  // 2001-present: 928 = north + west + east strip (Maricopa base under
  // the blob); 520 = the southeast.
  { code: '928', established: 2001, counties: M928 },
  { code: '520', established: 2001, counties: M520 },

  // 1995-1999: metro Phoenix stays 602 (painted above the county layers).
  { code: '602', established: 1995, retired: 1999,
    d: 'M205.3,378.7 L233.1,378.7 L233.1,398.9 L205.3,398.9 Z',
    labelX: 219.2, labelY: 389.1, labelSize: 9 },

  // 1999-2023: the three-way metro split (vertical bands, labels staggered).
  { code: '623', established: 1999, retired: 2023,
    d: 'M205.3,378.7 L217.6,378.7 L217.6,398.9 L205.3,398.9 Z',
    labelX: 211.1, labelY: 385.1, labelSize: 7 },
  { code: '602', established: 1999, retired: 2023,
    d: 'M217.6,378.7 L220.8,378.7 L220.8,398.9 L217.6,398.9 Z',
    labelX: 219.2, labelY: 390.2, labelSize: 6 },
  { code: '480', established: 1999, retired: 2023,
    d: 'M220.8,378.7 L233.1,378.7 L233.1,398.9 L220.8,398.9 Z',
    labelX: 227.3, labelY: 385.1, labelSize: 7 },

  // 2023-present: boundaries eliminated — one metro overlay complex.
  { code: '602', established: 2023,
    d: 'M205.3,378.7 L233.1,378.7 L233.1,398.9 L205.3,398.9 Z',
    labelX: 219.2, labelY: 389.1, labelSize: 8,
    overlays: [
      { code: '480', established: 2023 },
      { code: '623', established: 2023 },
    ] },
];

export default regions;
