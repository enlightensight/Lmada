import type { PageTextSlot } from '@/lib/pageText';

const INDIA = 'facility&location/India';
const UK = 'facility&location/UK';

/** Default tiles of the "Inside the Facility" gallery on the Ahmedabad page. */
const INDIA_GALLERY_DEFAULTS: { name: string; image: string }[] = [
  { name: 'ÄKTA Process (Cytiva)', image: '/images/Akta%20Process%20(Cytiva).jpeg' },
  { name: 'Batch Centrifuge', image: '/images/Batch_Centrifuge.jpeg' },
  { name: 'ChromXact Chromatography Column', image: '/images/ChromXact_Chromatography_Column.jpeg' },
  { name: 'Spray Dryer', image: '/images/Spray_Dryer.jpeg' },
  { name: '2 × 7-Litre Fermenters', image: '/images/2X7_Litres_Fermenters.jpeg' },
];

/** Number of tiles in the "Inside the Facility" gallery (slots galleryItem1Name … galleryItemNImage). */
export const INDIA_GALLERY_TILE_COUNT = INDIA_GALLERY_DEFAULTS.length;

/**
 * Editable copy/media for the Overview and Facility & Location pages (OverviewLayout)
 * that has no field of its own on the page record.
 */
export const OVERVIEW_TEXT_SLOTS: PageTextSlot[] = [
  // ---- overview/careers ----------------------------------------------------
  // (the bottom call-to-action button is the record's own primaryCta field)
  {
    key: 'careersButtonText',
    pages: ['overview/careers'],
    label: 'Hero button label',
    default: 'Explore Open Roles',
    group: 'Hero button',
  },
  {
    key: 'careersButtonLink',
    pages: ['overview/careers'],
    label: 'Hero button link (careers portal URL)',
    default: 'https://careers.lambda-cro.com/go/CDMO/752444/',
    kind: 'link',
    group: 'Hero button',
  },

  // ---- overview/integrated ---------------------------------------------------
  {
    key: 'capabilitiesHeading',
    pages: ['overview/integrated'],
    label: 'Capabilities grid heading',
    default: 'Integrated Services',
    group: 'Capabilities grid',
  },
  {
    key: 'capabilitiesIntro',
    pages: ['overview/integrated'],
    label: 'Capabilities grid intro line',
    default: 'Seamless coordination across development, analytical characterization, and GMP manufacturing under one roof.',
    kind: 'longtext',
    group: 'Capabilities grid',
  },

  // ---- overview/quality ------------------------------------------------------
  {
    key: 'pillarsHeading',
    pages: ['overview/quality'],
    label: 'Pillars section heading',
    default: 'Quality & Regulatory Pillars',
    group: 'Pillars section',
  },

  // ---- shared labels ---------------------------------------------------------
  {
    key: 'bulletsLabel',
    pages: ['overview/quality', INDIA, UK],
    label: 'Label above section bullet lists',
    default: 'Key capabilities include:',
    group: 'Section labels',
  },

  // ---- facility&location/UK --------------------------------------------------
  {
    key: 'earlyStageHeading',
    pages: [UK],
    label: 'Biosimilar section: early-stage list heading',
    default: 'Early-Stage Development',
    group: 'Section labels',
  },
  {
    key: 'lateStageHeading',
    pages: [UK],
    label: 'Biosimilar section: late-stage list heading',
    default: 'Late-Stage Development',
    group: 'Section labels',
  },

  // ---- facility&location/India -----------------------------------------------
  {
    key: 'galleryHeading',
    pages: [INDIA],
    label: 'Equipment gallery heading',
    default: 'Inside the Facility',
    group: 'Equipment gallery',
  },
  {
    key: 'galleryIntro',
    pages: [INDIA],
    label: 'Equipment gallery intro line',
    default: 'Purpose-built process and analytical equipment supporting development through GMP manufacturing.',
    kind: 'longtext',
    group: 'Equipment gallery',
  },
  ...INDIA_GALLERY_DEFAULTS.flatMap((tile, i): PageTextSlot[] => [
    {
      key: `galleryItem${i + 1}Name`,
      pages: [INDIA],
      label: `Equipment gallery tile ${i + 1}: name`,
      default: tile.name,
      group: 'Equipment gallery',
    },
    {
      key: `galleryItem${i + 1}Image`,
      pages: [INDIA],
      label: `Equipment gallery tile ${i + 1}: image`,
      default: tile.image,
      kind: 'image',
      group: 'Equipment gallery',
    },
  ]),
  {
    key: 'formulationHeading',
    pages: [INDIA],
    label: 'Drug product section: formulation list heading',
    default: 'Formulation Development',
    group: 'Section labels',
  },
  {
    key: 'lyophilizationHeading',
    pages: [INDIA],
    label: 'Drug product section: lyophilization list heading',
    default: 'Lyophilization Development',
    group: 'Section labels',
  },
  {
    key: 'gmpManufacturingHeading',
    pages: [INDIA],
    label: 'Drug product section: clinical GMP list heading',
    default: 'Clinical GMP Manufacturing',
    group: 'Section labels',
  },
  {
    key: 'physicochemicalHeading',
    pages: [INDIA],
    label: 'Analytical section: physicochemical list heading',
    default: 'Physicochemical & Molecular Characterization',
    group: 'Section labels',
  },
  {
    key: 'structuralHeading',
    pages: [INDIA],
    label: 'Analytical section: structural list heading',
    default: 'Structural & Biophysical Characterization',
    group: 'Section labels',
  },
  {
    key: 'functionalHeading',
    pages: [INDIA],
    label: 'Analytical section: functional list heading',
    default: 'Functional & Cell-Based Analysis',
    group: 'Section labels',
  },
  {
    key: 'qtppHeading',
    pages: [INDIA],
    label: 'Analytical section: QTPP box heading',
    default: 'Quality Target Product Profile (QTPP) Alignment',
    group: 'Section labels',
  },
  {
    key: 'applicationsHeading',
    pages: [INDIA],
    label: 'Analytical section: applications heading',
    default: 'Selected Analytical Applications',
    group: 'Section labels',
  },
];
