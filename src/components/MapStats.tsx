import { ALL_CODES } from '../data/allcodes';
import { REGIONS } from '../data/regions';
import './MapStats.css';

// Codes with any current assignment, geographic or not (drops the one retired
// code, 627, and the one listed as unassigned, 976).
const inUse = Object.values(ALL_CODES).filter(
  (c) => c.status !== 'retired' && c.status !== 'unassigned',
);

export default function MapStats({ year }: { year: number }) {
  // Distinct codes visible on the map at the selected year, overlays included.
  const onMap = new Set<string>();
  for (const region of REGIONS) {
    if (region.established > year || (region.retired !== undefined && year >= region.retired)) {
      continue;
    }
    onMap.add(region.code);
    for (const o of region.overlays ?? []) {
      if (o.established <= year && (o.retired === undefined || year < o.retired)) {
        onMap.add(o.code);
      }
    }
  }

  return (
    <div className="mapstats">
      <div className="mapstats-item">
        <span className="mapstats-value">
          {inUse.length} <small>/ 1000</small>
        </span>
        <span className="mapstats-label">
          possible codes in use today ({(inUse.length / 10).toFixed(1)}%)
        </span>
      </div>
      <div className="mapstats-item">
        <span className="mapstats-value">
          {onMap.size} <small>/ {inUse.length}</small>
        </span>
        <span className="mapstats-label">in-use codes on the map in {year}</span>
      </div>
    </div>
  );
}
