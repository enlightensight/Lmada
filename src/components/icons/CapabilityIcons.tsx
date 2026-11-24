import React from 'react';

/**
 * Hand-drawn line icons for individual capability points.
 *
 * One style for the whole set: 24x24 grid, 1.75 stroke, round caps and joins, no fills except
 * small accents (a selected well, a droplet, a bead). Each icon shows the actual object, method
 * or step the point is about, so a point never gets a loosely related stock icon.
 *
 * To cover a new kind of point: draw an icon here and add a rule to RULES at the bottom.
 */

export type CapabilityIcon = (props: { className?: string }) => React.ReactElement;

function Svg({ className = 'w-6 h-6', children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

const dot = { fill: 'currentColor', stroke: 'none' } as const;
const AXES = 'M3.5 3.5v17h17';

/* ───────────────────────────── Cells, expression, culture ───────────────────────────── */

/** A cell with its nucleus and a "selected" tick: cell line development and clone selection. */
export const CellLineIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="9.5" cy="9.5" r="6.5" />
    <circle cx="9" cy="9.5" r="2.3" />
    <circle cx="12.6" cy="6.6" r="0.6" {...dot} />
    <circle cx="17.5" cy="17.5" r="4" />
    <path d="M15.8 17.6l1.2 1.2 2.2-2.5" />
  </Svg>
);

/** A multi-well plate with one well picked out: clone screening. */
export const CloneScreeningIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.2" />
    {[8.6, 12, 15.4].map((y) =>
      [6.4, 10.1, 13.9, 17.6].map((x) => {
        const picked = x === 13.9 && y === 12;
        return <circle key={`${x}-${y}`} cx={x} cy={y} r={picked ? 1.35 : 1.05} fill={picked ? 'currentColor' : 'none'} strokeWidth="1.3" />;
      })
    )}
  </Svg>
);

/** A shake flask with culture and cells: mammalian cell culture. */
export const CellCultureIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M9 3h6" />
    <path d="M10 3v5.6L4.9 17.9A2.1 2.1 0 0 0 6.7 21h10.6a2.1 2.1 0 0 0 1.8-3.1L14 8.6V3" />
    <path d="M7.4 13.6h9.2" />
    <circle cx="9.8" cy="17.3" r="0.75" {...dot} />
    <circle cx="13.6" cy="16.6" r="0.75" {...dot} />
    <circle cx="11.9" cy="18.9" r="0.75" {...dot} />
  </Svg>
);

/** A cell secreting protein: mammalian expression platforms. */
export const ExpressionCellIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="9" cy="12" r="6.5" />
    <circle cx="8" cy="12" r="2.3" />
    <path d="M15.4 9.3l1.7-.9M15.8 12h2M15.4 14.7l1.7.9" />
    <circle cx="19.4" cy="7.2" r="1.1" {...dot} />
    <circle cx="20.4" cy="12" r="1.1" {...dot} />
    <circle cx="19.4" cy="16.8" r="1.1" {...dot} />
  </Svg>
);

/** A plasmid with its inserted gene: recombinant protein expression. */
export const PlasmidIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="8" />
    <path d="M16 5.07A8 8 0 0 1 20 12" strokeWidth="4" strokeLinecap="butt" />
    <path d="M8.5 12h6.5" />
    <path d="M13.2 10.2L15 12l-1.8 1.8" />
  </Svg>
);

/* ───────────────────────────── Process equipment ───────────────────────────── */

/** A stirred-tank bioreactor with motor, shaft and impeller: upstream / bioreactor operations. */
export const BioreactorIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="10" y="2" width="4" height="3" rx="0.8" />
    <path d="M5.5 7.5h13" />
    <path d="M6.5 7.5v9.5a4 4 0 0 0 4 4h3a4 4 0 0 0 4-4V7.5" />
    <path d="M12 5v11" />
    <path d="M8.8 16h6.4" />
    <path d="M8.8 14.6v2.8M15.2 14.6v2.8" />
    <path d="M6.5 11h2.2M15.3 11h2.2" />
  </Svg>
);

/** A chromatography column with resin bands and an eluting drop: purification. */
export const ChromatographyColumnIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M12 2v2.2" />
    <path d="M8 4.2h8M8 16.8h8" />
    <path d="M9.2 4.2v12.6M14.8 4.2v12.6" />
    <path d="M9.2 8.2h5.6M9.2 11h5.6" />
    <path d="M12 16.8v1.6" />
    <path d="M12 19.6c.8 1 1.2 1.6 1.2 2.1a1.2 1.2 0 0 1-2.4 0c0-.5.4-1.1 1.2-2.1z" fill="currentColor" strokeWidth="1" />
  </Svg>
);

/** A bioreactor feeding a column: upstream and downstream processing. */
export const ProcessTrainIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M2.5 9h7" />
    <path d="M3.2 9v7a2.8 2.8 0 0 0 5.6 0V9" />
    <path d="M6 5.5v8.3" />
    <path d="M4.6 13.8h2.8" />
    <path d="M4.8 5.5h2.4" />
    <path d="M11.2 12.5h3.3" />
    <path d="M13.2 11.2l1.3 1.3-1.3 1.3" />
    <path d="M16.6 6.5h5M16.6 18.5h5" />
    <path d="M17.6 6.5v12M20.6 6.5v12" />
    <path d="M17.6 10.5h3M17.6 14.5h3" />
  </Svg>
);

/** A jacketed production tank on legs: drug substance manufacturing. */
export const TankIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M10.3 2.5h3.4M12 2.5V4" />
    <path d="M6 6.7a6 2.7 0 0 1 12 0v9.3a6 2.7 0 0 1-12 0z" />
    <path d="M6 6.7a6 2.7 0 0 0 12 0" />
    <path d="M7.8 18v3.2M16.2 18v3.2" />
    <path d="M12 18.7v2.5" />
    <path d="M9.5 12.2h5" />
  </Svg>
);

/** Three vessels of growing size under a rising arrow: scale-up. */
export const ScaleUpIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="2.5" y="15.5" width="4" height="5" rx="1" />
    <rect x="8.5" y="12" width="5.2" height="8.5" rx="1.2" />
    <rect x="15.7" y="7.5" width="5.8" height="13" rx="1.4" />
    <path d="M3 11l8.2-6.2" />
    <path d="M7.4 4.2h4v4" />
  </Svg>
);

/** A membrane cassette with cross-flow and permeate: ultrafiltration / diafiltration. */
export const TffIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="3" y="6" width="18" height="10" rx="1.6" />
    <path d="M3 11.5h18" strokeDasharray="1.8 2" />
    <path d="M6 8.7h9.5" />
    <path d="M14.2 7.4l1.4 1.3-1.4 1.3" />
    <path d="M12 13.5v7" />
    <path d="M10.5 19l1.5 1.5 1.5-1.5" />
  </Svg>
);

/** A filter funnel holding back particles: purification and impurity clearance. */
export const FilterIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M3.5 4.5h17l-6.6 7.9V18l-3.8 2.5v-8.1z" />
    <circle cx="9.3" cy="7.3" r="0.7" {...dot} />
    <circle cx="12.6" cy="7.6" r="0.7" {...dot} />
    <circle cx="15.2" cy="6.9" r="0.7" {...dot} />
  </Svg>
);

/** Three sliders set to different levels: process optimization. */
export const TuningIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M6 3.5v8.7M6 17v3.5" />
    <circle cx="6" cy="14.6" r="2.3" />
    <path d="M12 3.5v2M12 10.3v10.2" />
    <circle cx="12" cy="7.9" r="2.3" />
    <path d="M18 3.5v6.2M18 14.5v6" />
    <circle cx="18" cy="12.1" r="2.3" />
  </Svg>
);

/** A media bottle being topped up with a feed drop: media and feed optimization. */
export const MediaFeedIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M6.5 3h6" />
    <path d="M7.5 3v3.2L5 9.4V19a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V9.4l-2.5-3.2V3" />
    <path d="M5 13.5h9" />
    <path d="M18.5 5.2c1.5 1.9 2.3 3.1 2.3 4.2a2.3 2.3 0 0 1-4.6 0c0-1.1.8-2.3 2.3-4.2z" />
    <path d="M18.5 14.5v4M16.5 16.5h4" />
  </Svg>
);

/** A monitor showing a live trend: in-process control and process monitoring. */
export const MonitoringIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="3" y="4" width="18" height="12.5" rx="1.8" />
    <path d="M12 16.5v3.5M8.5 20h7" />
    <path d="M6 12.5l2.6-3.2 2.6 2.4 2.6-4 2.2 2.6 2-1.4" />
  </Svg>
);

/** A process document handed from one site to the next: technology transfer. */
export const TechTransferIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="2.3" y="7" width="6.6" height="10" rx="1.3" />
    <path d="M4.3 10.4h2.6M4.3 12.9h2.6" />
    <rect x="15.1" y="7" width="6.6" height="10" rx="1.3" />
    <path d="M17 12.3l1.1 1.1 1.8-2.1" />
    <path d="M10.8 10h2.6" />
    <path d="M12.4 8.8l1.2 1.2-1.2 1.2" />
    <path d="M13.2 14h-2.6" />
    <path d="M11.6 12.8L10.4 14l1.2 1.2" />
  </Svg>
);

/* ───────────────────────────── Drug product ───────────────────────────── */

/** A filled, stoppered vial: drug product manufacturing. */
export const VialIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="8.3" y="2.5" width="7.4" height="3.2" rx="0.9" />
    <path d="M10 5.7v2.1M14 5.7v2.1" />
    <path d="M10 7.8c-1.6.6-2.6 1.7-2.6 3.2V19a2.2 2.2 0 0 0 2.2 2.2h4.8a2.2 2.2 0 0 0 2.2-2.2v-8c0-1.5-1-2.6-2.6-3.2" />
    <path d="M7.4 13.6h9.2" />
    <path d="M10 17.4h4" />
  </Svg>
);

/** A beaker being stirred: formulation development. */
export const FormulationIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M5.5 4h13" />
    <path d="M7 4v13.5a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V4" />
    <path d="M7 11h10" />
    <path d="M10.4 1.8l1.6 13.4" />
    <path d="M14.2 14.4h2.8M15.2 17.2h1.8" />
  </Svg>
);

/** Two test tubes compared side by side: excipient compatibility studies. */
export const TestTubesIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M4.3 3.5h5.4M14.3 3.5h5.4" />
    <path d="M5.2 3.5v14.6a1.8 1.8 0 0 0 3.6 0V3.5" />
    <path d="M15.2 3.5v14.6a1.8 1.8 0 0 0 3.6 0V3.5" />
    <path d="M5.2 12h3.6M15.2 8.5h3.6" />
    <path d="M10.9 10.4h2.2M10.9 13h2.2" />
  </Svg>
);

/** A filling needle dosing into a vial: aseptic fill-finish. */
export const FillingIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M9.3 2h5.4M12 2v5.3" />
    <path d="M12 8.6c.9 1.1 1.3 1.8 1.3 2.4a1.3 1.3 0 0 1-2.6 0c0-.6.4-1.3 1.3-2.4z" fill="currentColor" strokeWidth="1" />
    <path d="M8.4 14.2h7.2" />
    <path d="M9.3 14.2v1.7c-1.1.5-1.8 1.3-1.8 2.4v1.1a1.9 1.9 0 0 0 1.9 1.9h5.2a1.9 1.9 0 0 0 1.9-1.9v-1.1c0-1.1-.7-1.9-1.8-2.4v-1.7" />
    <path d="M7.5 18.6h9" />
  </Svg>
);

/** A liquid vial next to a vial holding a freeze-dried cake: liquid and lyophilized dosage forms. */
export const DosageFormsIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="3.6" y="4.5" width="5.8" height="2.5" rx="0.7" />
    <path d="M4.7 7v1.5C3.6 9 3 9.8 3 10.9V18a1.8 1.8 0 0 0 1.8 1.8h3.4A1.8 1.8 0 0 0 10 18v-7.1c0-1.1-.6-1.9-1.7-2.4V7" />
    <path d="M3 13.2h7" />
    <rect x="14.6" y="4.5" width="5.8" height="2.5" rx="0.7" />
    <path d="M15.7 7v1.5c-1.1.5-1.7 1.3-1.7 2.4V18a1.8 1.8 0 0 0 1.8 1.8h3.4A1.8 1.8 0 0 0 21 18v-7.1c0-1.1-.6-1.9-1.7-2.4V7" />
    <rect x="15.3" y="14.6" width="4.4" height="3.6" rx="0.9" fill="currentColor" stroke="none" />
  </Svg>
);

/** A vial and a prefilled syringe: primary container systems. */
export const ContainersIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="3.3" y="6" width="6.2" height="2.6" rx="0.7" />
    <path d="M4.5 8.6v1.5c-1.1.5-1.8 1.3-1.8 2.5V19a1.9 1.9 0 0 0 1.9 1.9h3.6A1.9 1.9 0 0 0 10.1 19v-6.4c0-1.2-.7-2-1.8-2.5V8.6" />
    <path d="M2.7 14.6h7.4" />
    <path d="M14.9 2.5h4.2M17 2.5v3.7" />
    <path d="M13.9 6.2h6.2" />
    <rect x="14.9" y="6.2" width="4.2" height="10" rx="0.8" />
    <path d="M14.9 9.4h1.6M14.9 12h1.6" />
    <path d="M17 16.2v5.3" />
  </Svg>
);

/** A snowflake: lyophilization (freeze-drying) cycle development. */
export const LyophilizationIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 12 12)`}>
        <path d="M12 12V3" />
        <path d="M9.9 5.1L12 7.1l2.1-2" />
      </g>
    ))}
  </Svg>
);

/** A magnifier over a vial: visual inspection. */
export const InspectionIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="10.5" cy="10.5" r="7" />
    <path d="M15.6 15.6l5.4 5.4" />
    <rect x="8.7" y="6.6" width="3.6" height="1.7" rx="0.5" strokeWidth="1.4" />
    <rect x="8.2" y="9.4" width="4.6" height="5.2" rx="1" strokeWidth="1.4" />
    <path d="M9.4 8.3v1.1M11.6 8.3v1.1" strokeWidth="1.4" />
  </Svg>
);

/** A carton carrying a barcode label: labelling and secondary packaging. */
export const PackagingIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M3 8l2.6-4.5h12.8L21 8" />
    <rect x="3" y="8" width="18" height="12.5" rx="1.5" />
    <path d="M12 3.5V8" />
    <rect x="6" y="12" width="7.5" height="5" rx="0.7" strokeWidth="1.4" />
    <path d="M7.8 13.5v2M9.3 13.5v2M10.5 13.5v2M11.8 13.5v2" strokeWidth="1.1" />
  </Svg>
);

/** A storage chamber with samples on its shelves: stability storage and sample management. */
export const StabilityChamberIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="4.5" y="2.5" width="15" height="19" rx="2" />
    <path d="M4.5 9h15M4.5 15.5h15" />
    <rect x="7.3" y="5.3" width="2.2" height="3.7" rx="0.5" strokeWidth="1.3" />
    <rect x="11.2" y="5.3" width="2.2" height="3.7" rx="0.5" strokeWidth="1.3" />
    <rect x="7.3" y="11.8" width="2.2" height="3.7" rx="0.5" strokeWidth="1.3" />
    <rect x="14.5" y="11.8" width="2.2" height="3.7" rx="0.5" strokeWidth="1.3" />
    <path d="M16.8 18.5h0.01" strokeWidth="2.2" />
  </Svg>
);

/** A shipper box marked with a medical cross: clinical supply manufacturing. */
export const ClinicalSupplyIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M9.5 6.5V4h5v2.5" />
    <rect x="3.5" y="6.5" width="17" height="14" rx="1.6" />
    <path d="M3.5 10.5h17" />
    <path d="M12 13v5M9.5 15.5h5" />
  </Svg>
);

/* ───────────────────────────── Antibodies and molecules ───────────────────────────── */

/** A Y-shaped antibody with its light chains: monoclonal antibody development. */
export const AntibodyIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M12 21.5v-8" />
    <path d="M12 13.5L6.8 6.5M12 13.5l5.2-7" />
    <path d="M8.4 12.8L4.2 7.2M15.6 12.8l4.2-5.6" />
  </Svg>
);

/** An antibody whose two arms bind two different targets: bispecific antibodies. */
export const BispecificAntibodyIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M12 21.500v-8" />
    <path d="M12 13.500L7.400 7.600M12 13.500l4.600-5.900" />
    <path d="M8.700 13L5.300 8.600M15.300 13l3.400-4.400" />
    <circle cx="5.200" cy="4.800" r="2.300" />
    <rect x="16.500" y="2.500" width="4.600" height="4.600" rx="0.800" {...dot} />
  </Svg>
);

/** A chain folded back on itself: recombinant proteins. */
export const RecombinantProteinIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M4.500 6.500C7 3 11.500 3.500 11.500 7c0 3.500-5.500 3-5 6.500.500 4 5 4 7.500 1.500s1-5.500 4.500-6 3.500 5 1 8.500" />
    <circle cx="4.500" cy="6.500" r="1.700" {...dot} />
    <circle cx="19.500" cy="17.500" r="1.700" {...dot} />
  </Svg>
);

/** A mammalian cell with a plus: other biologics made in mammalian cells. */
export const OtherBiologicsIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="9.500" cy="9.500" r="6.500" />
    <circle cx="9" cy="9.500" r="2.300" />
    <circle cx="12.600" cy="6.600" r="0.600" {...dot} />
    <circle cx="17.500" cy="17.500" r="4" />
    <path d="M17.500 15.600v3.800M15.600 17.500h3.800" />
  </Svg>
);

/** An antibody carrying payloads on linkers: conjugation process development. */
export const ConjugationIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M12 21.5v-7.5" />
    <path d="M12 14L7.6 8.2M12 14l4.4-5.8" />
    <path d="M7.6 8.2L6 6.2M16.4 8.2L18 6.2" />
    <circle cx="4.9" cy="4.7" r="1.9" {...dot} />
    <circle cx="19.1" cy="4.7" r="1.9" {...dot} />
    <path d="M12 17.6h4.6" />
    <circle cx="18.6" cy="17.6" r="1.9" {...dot} />
  </Svg>
);

/** A histogram of loaded species: drug-to-antibody ratio (DAR) characterization. */
export const DistributionIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M2.8 20.5h18.4" />
    <rect x="3.8" y="16" width="2.5" height="4.5" rx="0.5" />
    <rect x="7.3" y="11" width="2.5" height="9.5" rx="0.5" />
    <rect x="10.8" y="5" width="2.5" height="15.5" rx="0.5" />
    <rect x="14.3" y="10" width="2.5" height="10.5" rx="0.5" />
    <rect x="17.8" y="15" width="2.5" height="5.5" rx="0.5" />
  </Svg>
);

/** A single molecule clumping into a cluster: aggregation analysis. */
export const AggregationIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="5.8" cy="6.2" r="2.8" />
    <path d="M9.4 9.4l2.4 2.4" />
    <path d="M11.9 9.4v2.4H9.5" />
    <circle cx="15.8" cy="12.4" r="2.8" />
    <circle cx="19" cy="17.4" r="2.6" />
    <circle cx="13.4" cy="17.6" r="2.8" />
  </Svg>
);

/** A ring molecule with substituents: structural / physicochemical characterization. */
export const StructureIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M12 7l4.33 2.5v5L12 17l-4.33-2.5v-5z" />
    <path d="M9.6 10.7v2.6" />
    <path d="M16.33 9.5l2.6-1.5M7.67 14.5l-2.6 1.5M12 7V4.2" />
    <circle cx="20.1" cy="7.3" r="1.4" />
    <circle cx="3.9" cy="16.7" r="1.4" />
    <circle cx="12" cy="2.9" r="1.2" {...dot} />
  </Svg>
);

/** A zig-zag chain of residues: peptide development. */
export const PeptideChainIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M3.8 15.5l4.1-7 4.1 7 4.1-7 4.1 7" />
    <circle cx="3.8" cy="15.5" r="1.9" {...dot} />
    <circle cx="7.9" cy="8.5" r="1.9" {...dot} />
    <circle cx="12" cy="15.5" r="1.9" {...dot} />
    <circle cx="16.1" cy="8.5" r="1.9" {...dot} />
    <circle cx="20.2" cy="15.5" r="1.9" {...dot} />
  </Svg>
);

/** Residues read off in order along a ruler: primary structure (sequence) analysis. */
export const SequenceIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M4.5 8.5h15" />
    <circle cx="4.5" cy="8.5" r="1.9" {...dot} />
    <circle cx="9.5" cy="8.5" r="1.9" {...dot} />
    <circle cx="14.5" cy="8.5" r="1.9" {...dot} />
    <circle cx="19.5" cy="8.5" r="1.9" {...dot} />
    <path d="M2.8 17.5h18.4" />
    <path d="M4.5 14.5v3M9.5 15.5v2M14.5 14.5v3M19.5 15.5v2" />
  </Svg>
);

/** Two chains joined by a bridge: disulfide bond characterization. */
export const DisulfideIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M6 3c-2.4 3 2.4 6 0 9s2.4 6 0 9" />
    <path d="M18 3c2.4 3-2.4 6 0 9s-2.4 6 0 9" />
    <path d="M7.8 12h8.4" />
    <circle cx="6" cy="12" r="1.8" {...dot} />
    <circle cx="18" cy="12" r="1.8" {...dot} />
  </Svg>
);

/** A branched sugar tree in standard glycan symbols: glycan profiling. */
export const GlycanIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="10.3" y="17.6" width="3.4" height="3.4" rx="0.4" {...dot} />
    <rect x="10.3" y="12.4" width="3.4" height="3.4" rx="0.4" {...dot} />
    <path d="M12 17.6v-1.8M12 12.4v-1.2" />
    <circle cx="12" cy="9.4" r="1.8" />
    <path d="M10.7 8.2L8.6 6.4M13.3 8.2l2.1-1.8" />
    <circle cx="7.3" cy="5.2" r="1.8" />
    <circle cx="16.7" cy="5.2" r="1.8" />
  </Svg>
);

/** A positive and a negative species: charge variant analysis. */
export const ChargeIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="7" cy="12" r="4.7" />
    <path d="M7 9.8v4.4M4.8 12h4.4" />
    <circle cx="17" cy="12" r="4.7" />
    <path d="M14.8 12h4.4" />
  </Svg>
);

/** A coiled helix: higher-order structure characterization. */
export const HelixIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M2.5 12h1.4M20.1 12h1.4" />
    <ellipse cx="6.3" cy="12" rx="2.4" ry="5.5" />
    <ellipse cx="10.1" cy="12" rx="2.4" ry="5.5" />
    <ellipse cx="13.9" cy="12" rx="2.4" ry="5.5" />
    <ellipse cx="17.7" cy="12" rx="2.4" ry="5.5" />
  </Svg>
);

/* ───────────────────────────── Analytical methods ───────────────────────────── */

/** A chromatogram trace on axes: analytical characterization, purity, HPLC. */
export const ChromatogramIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d={AXES} />
    <path d="M6 17.5c1.6 0 1.5-10 3-10s1.4 10 3 10c1.3 0 1.2-5.5 2.5-5.5s1.2 5.5 2.5 5.5h2" />
  </Svg>
);

/** A stick spectrum: mass analysis, LC-MS. */
export const MassSpectrumIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d={AXES} />
    <path d="M7 20.5v-5M10 20.5V7.5M13 20.5v-9M16 20.5v-3.5M18.8 20.5V11" />
  </Svg>
);

/** A dose-response curve with data points: potency. */
export const DoseResponseIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d={AXES} />
    <path d="M6 17.5c5 0 6-10.5 13.5-10.5" />
    <circle cx="8.6" cy="17" r="1" {...dot} />
    <circle cx="12.5" cy="12.4" r="1" {...dot} />
    <circle cx="16.6" cy="7.7" r="1" {...dot} />
  </Svg>
);

/** A melting curve with its midpoint marked: thermal unfolding (nano-DSF). */
export const MeltCurveIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d={AXES} />
    <path d="M6 17.5c5 0 6-10.5 13.5-10.5" />
    <path d="M12.6 5v15" strokeDasharray="1.6 2" strokeWidth="1.4" />
    <circle cx="12.6" cy="12.3" r="1.5" {...dot} />
  </Svg>
);

/** A binding and release curve: SPR / Octet interaction analysis. */
export const SensorgramIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d={AXES} />
    <path d="M5.5 17.5H8c1.3-6 3.7-9 6.6-9.5 1.3 4 3.2 6 5.9 6.8" />
    <path d="M14.6 5.5v2.2" strokeWidth="1.4" />
  </Svg>
);

/** A spectrum with absorption dips: FTIR. */
export const IrSpectrumIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d={AXES} />
    <path d="M5.5 7h2.3c1 0 1 8.5 2 8.5s1-8.5 2-8.5h1.6c1 0 1 5 2 5s1-5 2-5h3.1" />
  </Svg>
);

/** Two traces laid over each other: comparability and analytical similarity. */
export const OverlayIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d={AXES} />
    <path d="M5.5 17.5c2.6 0 2.6-9.5 5.2-9.5s2.6 9.5 5.2 9.5H20" />
    <path d="M7.6 17.5c2.6 0 2.6-8 5.2-8s2.6 8 5.2 8" strokeDasharray="1.7 2" strokeWidth="1.5" />
  </Svg>
);

/** A capillary looping between two buffer vials: capillary electrophoresis. */
export const CapillaryIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="2.8" y="13.5" width="5.4" height="7.5" rx="1.1" />
    <rect x="15.8" y="13.5" width="5.4" height="7.5" rx="1.1" />
    <path d="M5.5 17V8.5a6.5 6.5 0 0 1 13 0V17" />
    <path d="M10.6 5.5h2.8" strokeWidth="3" strokeLinecap="butt" />
    <path d="M2.8 16.6h5.4M15.8 16.6h5.4" strokeWidth="1.3" />
  </Svg>
);

/** A light wave with a rotation arrow: circular dichroism. */
export const CircularDichroismIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M2.5 16.5c1.6-4.4 3.2-4.4 4.8 0s3.2 4.4 4.8 0 3.2-4.4 4.8 0 3.2 4.4 4.6.4" />
    <path d="M15.4 6.4a3.6 3.6 0 1 1-1.1-2.6" />
    <path d="M14.9 2.2l-.4 1.9-1.9-.4" />
  </Svg>
);

/** A cluster of cells, each with its nucleus: stable cell pool generation. */
export const CellClusterIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="8" cy="8.500" r="4.200" />
    <circle cx="16.200" cy="7.800" r="3.600" />
    <circle cx="11.500" cy="16.300" r="4.300" />
    <circle cx="18.800" cy="15.600" r="3" />
    <circle cx="7.300" cy="8.900" r="1.200" {...dot} />
    <circle cx="16.600" cy="7.300" r="1" {...dot} />
    <circle cx="12.200" cy="16.800" r="1.200" {...dot} />
    <circle cx="18.600" cy="15.800" r="0.900" {...dot} />
  </Svg>
);

/** A DNA strand whose gene is expressed into a glowing signal: reporter gene assays. */
export const GeneExpressionIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M3.500 3c0 4.500 6.500 4.500 6.500 9s-6.500 4.500-6.500 9" />
    <path d="M10 3c0 4.500-6.500 4.500-6.500 9s6.500 4.500 6.500 9" />
    <path d="M4.600 4.800h4.300M3.800 12h5.900M4.600 19.200h4.300" strokeWidth="1.400" />
    <path d="M12.300 12h4.600" />
    <path d="M15.200 10.300l1.700 1.700-1.700 1.700" />
    <circle cx="20.300" cy="12" r="1.700" {...dot} />
    <path d="M20.300 7.300v1.400M20.300 15.300v1.400" />
  </Svg>
);

/** A light beam passing through a cuvette: protein concentration. */
export const CuvetteIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="8.5" y="3.5" width="7" height="17" rx="1.1" />
    <path d="M8.5 9h7" />
    <path d="M1.8 14.2h4.4" />
    <path d="M4.9 12.8l1.4 1.4-1.4 1.4" />
    <path d="M17.6 14.2h4.6" strokeDasharray="1.5 2" />
  </Svg>
);

/** A fingerprint: identity testing. */
export const FingerprintIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M5 16.5c-.3-7 1.6-12 7-12s7.300 5 7 12" />
    <path d="M8.300 19.5c-.4-6-.2-11.500 3.700-11.500s4.100 5.500 3.700 11.500" />
    <path d="M12 11.500v9" />
    <path d="M5.500 20c-.2-.7-.3-1.300-.4-2" />
  </Svg>
);

/** A molecule examined under a magnifying glass: identity testing. */
export const MoleculeLensIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="10" cy="10" r="7" />
    <path d="M15.100 15.100l5.900 5.900" />
    <path d="M10 6.800l2.800 1.600v3.200L10 13.200l-2.800-1.600V8.400z" strokeWidth="1.400" />
    <circle cx="10" cy="6.800" r="1" {...dot} />
    <circle cx="12.800" cy="11.600" r="1" {...dot} />
    <circle cx="7.200" cy="11.600" r="1" {...dot} />
  </Svg>
);

/** A field of particles under a lens: particulate matter testing. */
export const ParticulateIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="10.5" cy="10.5" r="7" />
    <path d="M15.6 15.6l5.4 5.4" />
    <circle cx="8" cy="8.6" r="1.2" {...dot} />
    <circle cx="12.4" cy="7.6" r="0.75" {...dot} />
    <circle cx="12.6" cy="12.4" r="1.5" {...dot} />
    <circle cx="8.3" cy="13" r="0.75" {...dot} />
  </Svg>
);

/* ───────────────────────────── Stability and stress ───────────────────────────── */

/** A thermometer with a stress bolt: forced degradation and stress studies. */
export const ThermalStressIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M7.500 13.300V5a2.200 2.200 0 0 1 4.400 0v8.300a4.200 4.200 0 1 1-4.400 0z" />
    <path d="M9.700 8.500v6.500" />
    <circle cx="9.700" cy="16.900" r="1.700" {...dot} />
    <path d="M19 3.500l-3 5h3.500l-3 5" />
  </Svg>
);

/** A vial watched over time: stability testing. */
export const StabilityTimeIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="3.300" y="3.500" width="5.800" height="2.500" rx="0.700" />
    <path d="M4.400 6v1.500c-1.100.5-1.700 1.300-1.700 2.400V17a1.800 1.800 0 0 0 1.800 1.800h2" />
    <path d="M8 6v1.500c1.100.5 1.700 1.300 1.700 2.400" />
    <path d="M2.700 12.500h5.300" />
    <circle cx="15.800" cy="15" r="5.700" />
    <path d="M15.800 11.800V15l2.200 1.500" />
  </Svg>
);

/* ───────────────────────────── Bioassays and immunogenicity ───────────────────────────── */

/** A cell giving off a signal: cell-based assays. */
export const CellAssayIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="14" r="6.500" />
    <circle cx="12" cy="14" r="2.300" />
    <path d="M12 2.500v2.500M6.200 4.200l1.400 2.100M17.800 4.200l-1.400 2.100" />
  </Svg>
);

/** A well glowing with light: reporter gene (luminescence) assays. */
export const ReporterIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M4.500 10h15" />
    <path d="M6 10v5a6 6 0 0 0 12 0v-5" />
    <circle cx="12" cy="15.300" r="2.300" {...dot} />
    <path d="M12 2.500v3.500M6.800 3.800l1.500 3M17.200 3.800l-1.500 3" />
  </Svg>
);

/** An antibody holding a target on each arm: binding assays. */
export const AntibodyBindingIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M12 21.500v-7" />
    <path d="M12 14.500L8.200 9.500M12 14.500l3.800-5" />
    <path d="M9 14.200L5.800 10M15 14.200l3.200-4.200" />
    <circle cx="6.300" cy="6" r="2.800" />
    <circle cx="17.700" cy="6" r="2.800" />
  </Svg>
);

/** An effector cell linked to a target cell that is breaking up: ADCC and CDC assays. */
export const CellKillingIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="6.300" cy="13.500" r="4.200" />
    <circle cx="6.300" cy="13.500" r="1.300" {...dot} />
    <path d="M10.500 13.500h2" />
    <path d="M12.500 13.500l1.500-1.600M12.500 13.500l1.500 1.600" />
    <circle cx="18" cy="13.500" r="3.700" strokeDasharray="2 1.900" />
    <path d="M18 6.200v1.800M21.800 8.300l-1.200 1.300M14.200 8.300l1.200 1.300" />
  </Svg>
);

/** A signal passed from node to node: mechanism-of-action assays. */
export const PathwayIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="4.500" r="2.200" />
    <circle cx="6" cy="12" r="2.200" />
    <circle cx="18" cy="12" r="2.200" />
    <circle cx="12" cy="19.500" r="2.200" {...dot} />
    <path d="M10.600 6.300L7.400 10.200M13.400 6.300l3.200 3.900" />
    <path d="M7.400 13.800l3.200 3.900M16.600 13.800l-3.200 3.900" />
  </Svg>
);

/** A vial marked with a star: reference standard / reference product. */
export const ReferenceIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="4.500" y="6.500" width="6.400" height="2.700" rx="0.800" />
    <path d="M5.700 9.200v1.600c-1.200.5-1.900 1.400-1.900 2.700V19a2 2 0 0 0 2 2h3.800a2 2 0 0 0 2-2v-5.500c0-1.300-.7-2.200-1.900-2.700V9.200" />
    <path d="M3.800 15.200h7.800" />
    <path d="M17.500 2.800L18.500 5.500 21.300 5.600 19.100 7.400 19.900 10.200 17.500 8.600 15.100 10.200 15.900 7.400 13.700 5.600 16.500 5.500Z" />
  </Svg>
);

/** A second antibody binding to the drug antibody: anti-drug antibody (ADA) screening. */
export const AdaScreenIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M8.500 21.500v-6.500" />
    <path d="M8.500 15L4.300 9.500M8.500 15l4.200-5.500" />
    <path d="M20.500 2.800l-2.800 3.600" />
    <path d="M17.700 6.400l-4.300.300M17.700 6.400l.700 4.300" />
    <circle cx="12.700" cy="9.500" r="1.300" {...dot} />
  </Svg>
);

/** A dilution series across four tubes: titration. */
export const TitrationIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    {[3.200, 8.200, 13.200, 18.200].map((x, i) => (
      <g key={x}>
        <path d={`M${x - 0.700} 4.500h4.200`} />
        <path d={`M${x} 4.500v13a1.400 1.400 0 0 0 2.800 0v-13`} />
        <path d={`M${x} ${8 + i * 2.800}h2.800`} />
      </g>
    ))}
  </Svg>
);

/** An antibody blocking the drug from reaching its target: neutralizing antibody assays. */
export const NeutralizeIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M2.300 12h4.700" />
    <path d="M7 12l3.300-3M7 12l3.300 3" />
    <circle cx="11.300" cy="12" r="1.400" {...dot} />
    <circle cx="17.700" cy="12" r="4.300" />
    <path d="M14.700 9l6 6" />
  </Svg>
);

/** An immune cell with its receptors out: immunogenicity risk assessment. */
export const ImmuneCellIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="13" r="4.800" />
    <circle cx="12" cy="13" r="1.600" {...dot} />
    <path d="M12 8.200V5.700M12 5.700l-1.700-2M12 5.700l1.700-2" />
    <path d="M16.200 15.400l2.100 1.200M18.300 16.600l2.300-.200M18.300 16.600l1 2.100" />
    <path d="M7.800 15.400l-2.100 1.200M5.700 16.600l-2.300-.200M5.700 16.600l-1 2.100" />
  </Svg>
);

/** A clipboard with a medical cross: support for clinical development. */
export const ClinicalClipboardIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="5" y="4.500" width="14" height="16.500" rx="2" />
    <rect x="9" y="2.500" width="6" height="3.700" rx="1" />
    <path d="M12 10.200v6M9 13.200h6" />
  </Svg>
);

/* ───────────────────────────── Microbiology ───────────────────────────── */

/** A microbe crossed out: sterility testing. */
export const SterilityIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="9" />
    <rect x="7.800" y="9.600" width="8.400" height="4.800" rx="2.400" />
    <path d="M5.700 5.700l12.600 12.600" />
  </Svg>
);

/** A culture plate with colonies: bioburden testing. */
export const PetriDishIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="8.400" cy="9.400" r="1.400" {...dot} />
    <circle cx="13.400" cy="7.700" r="1" {...dot} />
    <circle cx="15.800" cy="12.600" r="1.600" {...dot} />
    <circle cx="10" cy="14.600" r="1.300" {...dot} />
    <circle cx="14" cy="16.600" r="0.900" {...dot} />
  </Svg>
);

/** A sample filtered through a membrane onto a plate where colonies grow: bioburden testing. */
export const MembraneFiltrationIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M4.500 3.500h15l-5 6.300h-5z" />
    <path d="M10.300 9.800v2.400h3.400V9.800" />
    <circle cx="12" cy="14.600" r="0.900" {...dot} />
    <ellipse cx="12" cy="19" rx="8" ry="2.600" />
    <circle cx="8.800" cy="19.200" r="0.800" {...dot} />
    <circle cx="12.800" cy="18.500" r="0.800" {...dot} />
    <circle cx="15.600" cy="19.500" r="0.700" {...dot} />
  </Svg>
);

/** A Petri dish (rim and lid) with colonies of different sizes: microbial limit testing. */
export const PetriColoniesIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="7.200" strokeWidth="1.100" />
    <circle cx="9" cy="9.300" r="1.500" {...dot} />
    <circle cx="13.900" cy="8.200" r="0.900" {...dot} />
    <circle cx="15.300" cy="12.600" r="1.700" {...dot} />
    <circle cx="9.600" cy="14.300" r="1.100" {...dot} />
    <circle cx="13.300" cy="16" r="0.800" {...dot} />
    <circle cx="11.800" cy="11.600" r="0.600" {...dot} />
  </Svg>
);

/** A bacterium shedding endotoxin: bacterial endotoxin testing. */
export const EndotoxinIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <g transform="rotate(-25 10 14)">
      <rect x="3.500" y="10.300" width="13" height="7.400" rx="3.700" />
      <path d="M7.500 14h0.010M11 14h0.010" strokeWidth="2.200" />
    </g>
    <circle cx="15.500" cy="5" r="1.100" {...dot} />
    <circle cx="19.300" cy="7.800" r="1.100" {...dot} />
    <circle cx="20.300" cy="12.500" r="1.100" {...dot} />
    <path d="M4.500 19.500c-1 .300-1.600 1-2 2" />
  </Svg>
);

/** Air drawn across a settle plate: environmental monitoring. */
export const AirMonitoringIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M2.500 6.500h9.300a2.300 2.300 0 1 0-2.300-2.300" />
    <path d="M2.500 10.500h16.300a2.300 2.300 0 1 1-2.300 2.300" />
    <ellipse cx="11" cy="18.700" rx="7.500" ry="2.600" />
    <circle cx="7.500" cy="14.300" r="0.800" {...dot} />
    <circle cx="11.500" cy="15.200" r="0.800" {...dot} />
  </Svg>
);

/** Tiny organisms found under a lens: mycoplasma detection. */
export const MycoplasmaIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="10.500" cy="10.500" r="7" />
    <path d="M15.600 15.600l5.400 5.400" />
    <circle cx="8.200" cy="9" r="1.500" strokeWidth="1.400" />
    <circle cx="12.300" cy="8" r="1.100" strokeWidth="1.400" />
    <circle cx="11.300" cy="12.700" r="1.700" strokeWidth="1.400" />
  </Svg>
);

/** Colonies counted against a limit line: microbial limit testing. */
export const MicrobialLimitIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.300 9.800h17.400" strokeDasharray="2 2.100" />
    <circle cx="8.600" cy="13.800" r="1.300" {...dot} />
    <circle cx="13" cy="16" r="1.100" {...dot} />
    <circle cx="15.600" cy="13" r="1.400" {...dot} />
  </Svg>
);

/** A water point with a sample drop: water and utility testing. */
export const WaterTestingIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M3.500 3.500v6" />
    <path d="M3.500 6.500h8.500a3.500 3.500 0 0 1 3.500 3.500v1.500" />
    <path d="M8 6.500V3.500M6 3.500h4" />
    <path d="M13.300 11.500h4.400" />
    <path d="M15.500 14c1.700 2.100 2.500 3.400 2.500 4.600a2.500 2.500 0 0 1-5 0c0-1.200.800-2.500 2.500-4.600z" />
  </Svg>
);

/* ───────────────────────────── Quality and documentation ───────────────────────────── */

/** A shield with a tick: product quality. */
export const QualityShieldIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M12 2.800l7.500 2.800v5.600c0 4.600-3 8.300-7.500 10-4.500-1.700-7.500-5.400-7.500-10V5.600z" />
    <path d="M8.700 11.800l2.300 2.300 4.300-4.700" />
  </Svg>
);

/** A clipboard with entries ticked off: batch record review and documentation. */
export const BatchRecordIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="5" y="4.500" width="14" height="16.500" rx="2" />
    <rect x="9" y="2.500" width="6" height="3.700" rx="1" />
    <path d="M8.500 10.500h7M8.500 13.300h4" />
    <path d="M9 17l1.500 1.500 3-3.300" />
  </Svg>
);

/** A document carrying a seal: batch release (certificate of analysis). */
export const CertificateIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M11 21.500H7a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2h7l4.500 4.500v3.500" />
    <path d="M14 2.500V7h4.500" />
    <path d="M8 10.500h5M8 13.500h2.500" />
    <circle cx="16.300" cy="15.700" r="3.200" />
    <path d="M14.600 18.400l-.700 3.100 2.400-1.300 2.400 1.300-.700-3.100" />
  </Svg>
);

/** Two interlocked links: chain of identity and chain of custody. */
export const ChainLinksIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <rect x="2.300" y="8.300" width="11.400" height="7.400" rx="3.700" />
    <rect x="10.300" y="8.300" width="11.400" height="7.400" rx="3.700" />
  </Svg>
);

/** A folder of approved documents: regulatory submissions. */
export const DossierIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M3 7a2 2 0 0 1 2-2h4.200l2 2.500H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 13.600l2.100 2.100 4.100-4.400" />
  </Svg>
);

/* ───────────────────────────── Analytical lifecycle steps ───────────────────────────── */

/** A method's chromatogram passed with a tick: method development and qualification. */
export const MethodQualificationIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M3.500 3.500v13.500h9" />
    <path d="M5.500 14c1.300 0 1.300-8 2.600-8s1.300 8 2.600 8c.900 0 .900-3.600 1.800-3.600" />
    <circle cx="17.500" cy="17.500" r="4" />
    <path d="M15.800 17.600l1.200 1.200 2.200-2.500" />
  </Svg>
);

/** A molecule tied to the vessel that makes it: product and process characterization. */
export const ProductProcessIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M7.500 3.500l3.460 2v4L7.500 11.500 4.040 9.500v-4z" />
    <path d="M10.960 5.500l2-1.200" />
    <circle cx="14.200" cy="3.700" r="1.200" {...dot} />
    <path d="M7.500 11.500v4a2 2 0 0 0 2 2h1.600" />
    <path d="M10 16.300l1.200 1.200-1.200 1.200" />
    <path d="M13.300 13.500h8.200" />
    <path d="M14.300 13.500v4.300a3.100 3.100 0 0 0 6.200 0v-4.300" />
    <path d="M17.400 10.800v6.700M16 17.500h2.800" />
  </Svg>
);

/** A sample tube cleared with a tick: in-process and release testing. */
export const SampleReleaseIcon: CapabilityIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M4.800 3h7.400" />
    <path d="M6 3v13.800a2.500 2.500 0 0 0 5 0V3" />
    <path d="M6 10.500h5" />
    <circle cx="8.500" cy="14.300" r="0.700" {...dot} />
    <circle cx="17.500" cy="17.500" r="4" />
    <path d="M15.800 17.600l1.200 1.200 2.200-2.500" />
    <path d="M15 5.500h5M15 9h3.500" />
  </Svg>
);

/* ───────────────────────────── Which icon belongs to which point ───────────────────────────── */

/**
 * Rules are checked in order against the point's text, most specific first, so the wording can
 * be edited in the CMS without losing the icon as long as the subject stays the same.
 */
const RULES: [RegExp, CapabilityIcon][] = [
  // manufacturing and supply
  [/technology transfer/i, TechTransferIcon],
  [/batch release/i, CertificateIcon],
  [/batch record/i, BatchRecordIcon],
  [/chain of (identity|custody)/i, ChainLinksIcon],
  [/clinical supply manufactur/i, ClinicalSupplyIcon],
  [/drug substance and drug product manufactur/i, VialIcon],
  [/^drug substance manufactur/i, TankIcon],
  [/^drug product manufactur/i, VialIcon],
  [/ultrafiltration|diafiltration|uf\s*\/\s*df/i, TffIcon],
  [/in-process (&|and) release|^release testing/i, SampleReleaseIcon],
  [/process monitoring|in-process/i, MonitoringIcon],
  [/upstream and downstream/i, ProcessTrainIcon],
  [/bioreactor/i, BioreactorIcon],

  // drug product
  [/formulation/i, FormulationIcon],
  [/excipient|compatibility stud/i, TestTubesIcon],
  [/fill-?finish|aseptic/i, FillingIcon],
  [/dosage forms?/i, DosageFormsIcon],
  [/primary container/i, ContainersIcon],
  [/lyophili[sz]ation/i, LyophilizationIcon],
  [/visual inspection/i, InspectionIcon],
  [/label+ing|packaging/i, PackagingIcon],
  [/stability storage/i, StabilityChamberIcon],

  // cell line, expression and process development
  [/clone screening/i, CloneScreeningIcon],
  [/stable cell pool|cell pool generation/i, CellClusterIcon],
  [/cell line development/i, CellLineIcon],
  [/expression platforms?/i, ExpressionCellIcon],
  [/recombinant protein expression/i, PlasmidIcon],
  [/cell culture/i, CellCultureIcon],
  [/media and feed|media\s*\/\s*feed/i, MediaFeedIcon],
  [/scale-?up/i, ScaleUpIcon],
  [/^upstream process/i, BioreactorIcon],
  [/^downstream process/i, ChromatographyColumnIcon],
  [/^process (development and )?optimi[sz]ation/i, TuningIcon],
  [/impurity clearance/i, FilterIcon],
  [/chromatograph|purification/i, ChromatographyColumnIcon],

  // antibodies and conjugates
  [/conjugation/i, ConjugationIcon],
  [/drug-to-antibody|\bDAR\b/i, DistributionIcon],
  [/monoclonal antibody development/i, AntibodyIcon],
  [/peptide development/i, PeptideChainIcon],

  // immunogenicity
  [/anti-drug antibody|\(ADA\) screening/i, AdaScreenIcon],
  [/titration/i, TitrationIcon],
  [/neutrali[sz]ing/i, NeutralizeIcon],
  [/immunogenicity (risk )?assessment/i, ImmuneCellIcon],
  [/clinical development/i, ClinicalClipboardIcon],

  // bioassays
  [/reporter gene/i, GeneExpressionIcon],
  [/\bADCC\b|\bCDC\b/i, CellKillingIcon],
  [/mechanism-of-action/i, PathwayIcon],
  [/^binding assays?/i, AntibodyBindingIcon],
  [/cell-based potency|in vitro bioassays for functional/i, CellAssayIcon],
  [/potency/i, DoseResponseIcon],
  [/reference (standard|product)/i, ReferenceIcon],

  // microbiology
  [/endotoxin/i, EndotoxinIcon],
  [/sterility/i, SterilityIcon],
  [/bioburden/i, MembraneFiltrationIcon],
  [/environmental monitoring/i, AirMonitoringIcon],
  [/mycoplasma/i, MycoplasmaIcon],
  [/microbial limit/i, PetriColoniesIcon],
  [/water/i, WaterTestingIcon],
  [/particulate/i, ParticulateIcon],

  // physicochemical methods and attributes
  [/identity testing/i, MoleculeLensIcon],
  [/primary structure/i, SequenceIcon],
  [/disulfide/i, DisulfideIcon],
  [/glycan/i, GlycanIcon],
  [/charge variant/i, ChargeIcon],
  [/aggregation/i, AggregationIcon],
  [/higher-order structure/i, HelixIcon],
  [/forced degradation/i, ThermalStressIcon],
  [/comparability|similarity/i, OverlayIcon],
  [/regulatory submission/i, DossierIcon],
  [/concentration/i, CuvetteIcon],
  [/stability testing/i, StabilityTimeIcon],
  [/product quality/i, QualityShieldIcon],
  [/capillary/i, CapillaryIcon],
  [/circular dichroism/i, CircularDichroismIcon],
  [/\bFTIR\b/i, IrSpectrumIcon],
  [/\bDSF\b/i, MeltCurveIcon],
  [/\bSPR\b|octet|binding analysis/i, SensorgramIcon],
  [/mass analysis|intact mass|^LC-MS/i, MassSpectrumIcon],
  [/structural and functional|physicochemical characteri[sz]ation/i, StructureIcon],
  [/purity and impurity|analytical (development|characteri[sz]ation)|HPLC|UPLC/i, ChromatogramIcon],

  // analytical lifecycle steps
  [/method development/i, MethodQualificationIcon],
  [/product (&|and) process characteri[sz]ation/i, ProductProcessIcon],
  [/stability/i, StabilityTimeIcon],

  // broad service areas (overview pages)
  [/^bioassays?\b/i, CellAssayIcon],
  [/microbiolog/i, PetriDishIcon],
];

export function getCapabilityIcon(text: string): CapabilityIcon | null {
  const rule = RULES.find(([pattern]) => pattern.test(text));
  return rule ? rule[1] : null;
}

/**
 * Icons for a whole list of points, or `null` when any point has no icon of its own.
 * A list is shown either fully with icons or fully without, never half and half.
 */
export function getCapabilityIconsForList(points: string[]): CapabilityIcon[] | null {
  if (points.length === 0) return null;
  const icons = points.map(getCapabilityIcon);
  return icons.every(Boolean) ? (icons as CapabilityIcon[]) : null;
}

/**
 * Icon for a molecule type (modality cards): mAbs, bispecifics, ADCs, proteins, peptides.
 * Anything else made in mammalian cells gets the generic "cell plus" icon.
 */
export function getModalityIcon(title: string): CapabilityIcon {
  if (/bispecific|bifunctional/i.test(title)) return BispecificAntibodyIcon;
  if (/ADCs?|conjugate/i.test(title)) return ConjugationIcon;
  if (/monoclonal|mAbs?|antibod/i.test(title)) return AntibodyIcon;
  if (/peptide/i.test(title)) return PeptideChainIcon;
  if (/protein|recombinant/i.test(title)) return RecombinantProteinIcon;
  return OtherBiologicsIcon;
}
