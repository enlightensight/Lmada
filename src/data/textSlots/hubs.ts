import type { PageTextSlot } from '@/lib/pageText';

const SERVICE_HUBS = ['services/services', 'manufacturing/manufacturing', 'characterization/characterization'];
const FACILITY_HUB = ['facility&location/facility&location'];

/**
 * Capability matrix rows on the Facility & Locations hub, one row per line:
 *   Capability | Ahmedabad column | London column
 * "✓" renders a tick, "—" (or an empty cell) renders a dash, any other text renders as a label.
 */
export const FACILITY_MATRIX_ROWS_DEFAULT = [
  'Cell Line Development | ✓ | Clone Screening',
  'Upstream Process Development | ✓ | ✓',
  'Downstream Process Development | ✓ | ✓',
  'Analytical Development & Characterization | ✓ | ✓',
  'Biosimilar Development | ✓ | ✓',
  'Drug Product Development | ✓ | —',
  'GMP Manufacturing | ✓ | —',
  'Process Characterization | ✓ | ✓',
  'Technology Transfer Support | ✓ | ✓',
].join('\n');

export const HUBS_TEXT_SLOTS: PageTextSlot[] = [
  // ── Development / Manufacturing / Characterization hubs ────────────────────
  {
    key: 'cardsBulletsLabel',
    pages: SERVICE_HUBS,
    label: 'Label above each card\'s bullet list',
    default: 'Key Capabilities',
    group: 'Service cards',
  },

  // ── Facility & Locations hub ───────────────────────────────────────────────
  {
    key: 'heroButton1Label',
    pages: FACILITY_HUB,
    label: 'Hero button 1 label (links to location 1)',
    default: 'Ahmedabad Facility',
    group: 'Hero',
  },
  {
    key: 'heroButton2Label',
    pages: FACILITY_HUB,
    label: 'Hero button 2 label (links to location 2)',
    default: 'London Facility',
    group: 'Hero',
  },
  {
    key: 'matrixHeading',
    pages: FACILITY_HUB,
    label: 'Capabilities matrix heading',
    default: 'Complementary Capabilities Across Two Locations',
    group: 'Capabilities matrix',
  },
  {
    key: 'matrixIntro',
    pages: FACILITY_HUB,
    label: 'Capabilities matrix intro paragraph',
    default:
      'Complementary capabilities across Ahmedabad and London enable Lambda CDMO to support biologics programs across development, characterization, manufacturing, and clinical supply.',
    kind: 'longtext',
    group: 'Capabilities matrix',
  },
  {
    key: 'matrixCapabilityHeader',
    pages: FACILITY_HUB,
    label: 'Capabilities matrix: first column header',
    default: 'Capability',
    group: 'Capabilities matrix',
  },
  {
    key: 'matrixRows',
    pages: FACILITY_HUB,
    label:
      'Capabilities matrix rows, one per line as "Capability | Ahmedabad | London" (✓ = tick, — = not available, other text = label)',
    default: FACILITY_MATRIX_ROWS_DEFAULT,
    kind: 'longtext',
    group: 'Capabilities matrix',
  },
  {
    key: 'matrixFootnote',
    pages: FACILITY_HUB,
    label: 'Capabilities matrix footnote',
    default: 'Cross-facility recipe compatibility & technology transfer assured',
    group: 'Capabilities matrix',
  },
  {
    key: 'matrixLink1Label',
    pages: FACILITY_HUB,
    label: 'Capabilities matrix footer link 1 label (links to location 1)',
    default: 'View Ahmedabad Details',
    group: 'Capabilities matrix',
  },
  {
    key: 'matrixLink2Label',
    pages: FACILITY_HUB,
    label: 'Capabilities matrix footer link 2 label (links to location 2)',
    default: 'View London Details',
    group: 'Capabilities matrix',
  },
];
