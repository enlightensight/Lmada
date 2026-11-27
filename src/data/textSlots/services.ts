import type { PageTextSlot } from '@/lib/pageText';

/** Service pages that show the "Applicable Modalities" block (i.e. hold `applicableModalities` cards). */
const MODALITIES_PAGES = ['services/cell-line'];
const DRUG_SUBSTANCE = 'manufacturing/drug-substance';
const DRUG_PRODUCT = 'manufacturing/drug-product';

/** Stock wording of the "Applicable Modalities" block (slot defaults, and the copy on pages without the slots). */
export const MODALITIES_BLOCK_DEFAULTS = {
  eyebrow: 'Therapeutic Scope',
  heading: 'Applicable Modalities',
  intro: 'Our mammalian cell line development platform supports a comprehensive range of complex biologic modalities.',
};

/** Default slides of the equipment carousel inside the Drug Product capabilities card. */
const DRUG_PRODUCT_CAROUSEL_DEFAULTS = [
  '/images/Drugproductdev/FDL Lab.webp',
  '/images/Drugproductdev/Lyophilizer in FDL Lab.webp',
  '/images/Drugproductdev/Cooling Chamber in FDL Lab.webp',
];

/** Number of slides in the Drug Product capabilities carousel (slots capabilitiesImage1 … capabilitiesImageN). */
export const DRUG_PRODUCT_CAROUSEL_SLIDE_COUNT = DRUG_PRODUCT_CAROUSEL_DEFAULTS.length;

/**
 * Editable copy/media for the Services, Manufacturing and Characterization detail pages
 * (ServiceLayout, ManufacturingLayout, CharacterizationLayout) that has no field of its own
 * on the page record.
 */
export const SERVICES_TEXT_SLOTS: PageTextSlot[] = [
  // ---- services/cell-line : "Applicable Modalities" block ------------------------------------
  {
    key: 'modalitiesEyebrow',
    pages: MODALITIES_PAGES,
    label: 'Applicable modalities: small label above the heading',
    default: MODALITIES_BLOCK_DEFAULTS.eyebrow,
    group: 'Applicable modalities section',
  },
  {
    key: 'modalitiesHeading',
    pages: MODALITIES_PAGES,
    label: 'Applicable modalities: heading',
    default: MODALITIES_BLOCK_DEFAULTS.heading,
    group: 'Applicable modalities section',
  },
  {
    key: 'modalitiesIntro',
    pages: MODALITIES_PAGES,
    label: 'Applicable modalities: intro line',
    default: MODALITIES_BLOCK_DEFAULTS.intro,
    kind: 'longtext',
    group: 'Applicable modalities section',
  },

  // ---- manufacturing/drug-substance ---------------------------------------------------------
  {
    key: 'capabilitiesHeading',
    pages: [DRUG_SUBSTANCE],
    label: 'Capabilities grid heading',
    default: 'Manufacturing Capabilities',
    group: 'Capabilities grid',
  },
  {
    key: 'capabilitiesIntro',
    pages: [DRUG_SUBSTANCE],
    label: 'Capabilities grid intro line',
    default: 'cGMP cleanroom workflows, validated containment, and precision production systems for Drug Substance Manufacturing.',
    kind: 'longtext',
    group: 'Capabilities grid',
  },

  // ---- manufacturing/drug-product -----------------------------------------------------------
  {
    key: 'capabilitiesHeading',
    pages: [DRUG_PRODUCT],
    label: 'Capabilities card heading',
    default: 'Formulation Development & Drug Product Manufacturing Capabilities',
    group: 'Capabilities card',
  },
  ...DRUG_PRODUCT_CAROUSEL_DEFAULTS.map(
    (image, i): PageTextSlot => ({
      key: `capabilitiesImage${i + 1}`,
      pages: [DRUG_PRODUCT],
      label: `Capabilities card carousel: photo ${i + 1}`,
      default: image,
      kind: 'image',
      group: 'Capabilities card',
    })
  ),

  // ---- characterization/* ---------------------------------------------------------------------
  {
    key: 'capabilitiesHeading',
    pages: ['characterization/analytical-testing', 'characterization/physicochemical', 'characterization/microbiological'],
    label: 'Capabilities grid heading',
    default: 'Capabilities',
    group: 'Capabilities grid',
  },
  {
    key: 'technologiesHeading',
    pages: ['characterization/physicochemical'],
    label: 'Analytical technologies grid heading',
    default: 'Analytical Technologies',
    group: 'Analytical technologies grid',
  },
  {
    key: 'bioassayHeading',
    pages: ['characterization/bioassays'],
    label: 'Bioassay capabilities grid heading',
    default: 'Bioassay Capabilities',
    group: 'Bioassay and immunogenicity grids',
  },
  {
    key: 'immunogenicityHeading',
    pages: ['characterization/bioassays'],
    label: 'Immunogenicity testing grid heading',
    default: 'Immunogenicity Testing',
    group: 'Bioassay and immunogenicity grids',
  },
];
