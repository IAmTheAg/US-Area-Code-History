// Shared types for the per-state region files.
//
// Each state (plus DC) has its own file in this directory and is treated as
// its own little project: trace its regions, refine its dividers, and later
// encode its split/overlay history without touching any other state.
// index.ts ingests all of them.

export interface Overlay {
  code: string;
  /** Year the overlay entered service. */
  established: number;
  /** Year the overlay stopped (rare; absent = still active). */
  retired?: number;
}

export interface StateRegion<C extends string = string> {
  code: string;
  /** Year the code entered service. */
  established: number;
  /**
   * Year this region stopped existing in this form (exclusive: the region
   * renders for years < retired). When a region splits, retire it and add
   * the successor regions with established = the split year — regions are
   * immutable snapshots, they expire rather than change shape.
   */
  retired?: number;
  /**
   * Codes overlaid onto this region's territory, with their years. An
   * active overlay renders the region striped. Whether a code is an
   * original 1947 code comes from ORIGINAL_CODES in data/originalCodes.ts,
   * not from a flag here.
   */
  overlays?: Overlay[];
  /**
   * PREFERRED shape: the counties making up this region's territory, by
   * name (the keys of src/data/counties/<state>.ts, hold "q" in the app to
   * read the county under the cursor). Declare the state's list as
   * StateRegionList<XXCountyName> to get compile-time name checking.
   * Rendered as the union of the county shapes — no clipping, no divider
   * eyeballing, and the label defaults to the union's bbox center.
   * Layering still applies: regions later in the array paint on top, so a
   * base region can stay shapeless (whole state) or broad, with carve-outs
   * painted above. Mutually exclusive with `d`.
   */
  counties?: readonly C[];
  /**
   * ESCAPE HATCH shape for sub-county splits (metro areas): rough territory
   * outline in map coordinates. Convention: the shape may (and should)
   * overshoot the state border freely — into the ocean, into neighboring
   * states — because it is clipped to the exact state outline at render
   * time. Only the internal divider lines need eyeballing (hold "q" in the
   * app to read/copy map coordinates), and adjacent regions must share
   * their divider vertices exactly so there are no gaps or overlaps. Any
   * path commands are fine (curves welcome). Absent (and no counties) =
   * the region is the whole state.
   */
  d?: string;
  /** Label anchor override (required for `d` shapes; optional for county regions). */
  labelX?: number;
  labelY?: number;
  /** Label font size override for cramped regions (default 12). */
  labelSize?: number;
}

export type StateRegionList<C extends string = string> = StateRegion<C>[];

/** A region as seen by the app: a StateRegion plus the state it belongs to. */
export interface Region extends StateRegion {
  stateId: string;
}
