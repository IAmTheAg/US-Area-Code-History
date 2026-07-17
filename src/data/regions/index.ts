// Ingests the per-state region files (one per state + DC) and exposes the
// combined view the app renders from. Add or refine a state's regions in its
// own file; nothing here needs to change.
import type { Region, StateRegionList } from './types';
import { COUNTIES_BY_STATE } from '../counties';

import AK from './AK';
import AL from './AL';
import AR from './AR';
import AZ from './AZ';
import CA from './CA';
import CO from './CO';
import CT from './CT';
import DC from './DC';
import DE from './DE';
import FL from './FL';
import GA from './GA';
import HI from './HI';
import IA from './IA';
import ID from './ID';
import IL from './IL';
import IN from './IN';
import KS from './KS';
import KY from './KY';
import LA from './LA';
import MA from './MA';
import MD from './MD';
import ME from './ME';
import MI from './MI';
import MN from './MN';
import MO from './MO';
import MS from './MS';
import MT from './MT';
import NC from './NC';
import ND from './ND';
import NE from './NE';
import NH from './NH';
import NJ from './NJ';
import NM from './NM';
import NV from './NV';
import NY from './NY';
import OH from './OH';
import OK from './OK';
import OR from './OR';
import PA from './PA';
import RI from './RI';
import SC from './SC';
import SD from './SD';
import TN from './TN';
import TX from './TX';
import UT from './UT';
import VA from './VA';
import VT from './VT';
import WA from './WA';
import WI from './WI';
import WV from './WV';
import WY from './WY';

const STATE_FILES: Record<string, StateRegionList> = {
  AK, AL, AR, AZ, CA, CO, CT, DC, DE, FL, GA, HI, IA, ID, IL, IN, KS, KY,
  LA, MA, MD, ME, MI, MN, MO, MS, MT, NC, ND, NE, NH, NJ, NM, NV, NY, OH,
  OK, OR, PA, RI, SC, SD, TN, TX, UT, VA, VT, WA, WI, WV, WY,
};

export type { Region, StateRegion } from './types';

export const REGIONS: Region[] = Object.entries(STATE_FILES).flatMap(
  ([stateId, regions]) => regions.map((r) => ({ ...r, stateId })),
);

/** stateId -> its regions. States with no region data yet are absent. */
export const REGIONS_BY_STATE: Map<string, Region[]> = new Map();
for (const region of REGIONS) {
  const list = REGIONS_BY_STATE.get(region.stateId) ?? [];
  list.push(region);
  REGIONS_BY_STATE.set(region.stateId, list);
}

// Sanity check for county-based states, so complex timelines don't rely on
// eyeballing: in every era where a state is drawn purely from county lists,
// the active regions must tile the state — each county in exactly one
// region. Eras with an escape-hatch `d` shape are skipped (there, paint
// order rules and overshoot is deliberate). Warnings only; the map still
// renders whatever it's given.
for (const [stateId, regions] of REGIONS_BY_STATE) {
  if (!regions.some((r) => r.counties)) continue;
  const allCounties = Object.keys(COUNTIES_BY_STATE[stateId] ?? {});
  const eras = [...new Set(regions.flatMap((r) => [r.established, r.retired ?? -1]))]
    .filter((y) => y > 0);
  for (const year of eras) {
    const active = regions.filter(
      (r) => r.established <= year && (r.retired === undefined || year < r.retired),
    );
    if (active.some((r) => r.d)) continue;
    if (active.length <= 1) continue; // a single shapeless region = whole state
    if (active.some((r) => !r.counties)) {
      console.warn(
        `regions: ${stateId} in ${year}: a shapeless (whole-state) region is active alongside shaped ones — it will not render`,
      );
      continue;
    }
    const seen = new Map<string, number>();
    for (const r of active) {
      for (const county of r.counties ?? []) seen.set(county, (seen.get(county) ?? 0) + 1);
    }
    const missing = allCounties.filter((c) => !seen.has(c));
    const dupes = [...seen].filter(([, n]) => n > 1).map(([c]) => c);
    if (missing.length) {
      console.warn(`regions: ${stateId} in ${year}: counties in no region: ${missing.join(', ')}`);
    }
    if (dupes.length) {
      console.warn(`regions: ${stateId} in ${year}: counties in several regions: ${dupes.join(', ')}`);
    }
  }
}
