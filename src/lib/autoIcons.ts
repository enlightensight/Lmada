/**
 * Which icon each point, card, step and heading shows when the editor has not chosen one.
 *
 * Every page layout and the admin editor use these rules, so the editor always shows the
 * same icon as the live page. `getSlotIcon(page, slot)` adds the editor's own choice
 * (page.itemIcons) on top. When a layout changes how it picks an icon, change it here.
 */
import {
  Activity,
  ArrowRightLeft,
  Atom,
  Award,
  Beaker,
  BookOpen,
  Boxes,
  Bug,
  Building2,
  Calendar,
  ClipboardCheck,
  Clock,
  Dna,
  Droplets,
  ExternalLink,
  Eye,
  Factory,
  FileCheck,
  FileDown,
  FileText,
  Filter,
  FlaskConical,
  Gauge,
  GitMerge,
  Globe,
  HeartPulse,
  HelpCircle,
  Layers,
  LineChart,
  Lock,
  Maximize2,
  Microscope,
  Milestone,
  Newspaper,
  Package,
  PackageCheck,
  Pipette,
  Repeat,
  Scale,
  Search,
  Settings,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Snowflake,
  Sparkles,
  Syringe,
  Target,
  TestTubes,
  TrendingUp,
  Truck,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { CDMOPage, CDMOSection } from '@/data/cdmoData';
import { getCapabilityIcon, getModalityIcon, CellClusterIcon } from '@/components/icons/CapabilityIcons';
import { HOME_ADVANTAGE_ICONS } from '@/components/icons/homeAdvantageIcons';
import { iconFromRef, pickIcon, type IconComponent } from '@/components/icons/SiteIcon';

// Map icon strings to Lucide components
export const ICON_MAP: Record<string, LucideIcon> = {
  FlaskConical,
  Factory,
  Microscope,
  Dna,
  Activity,
  HeartPulse,
  Bug,
  ShieldCheck,
  Gauge,
  BookOpen,
  FileText,
  Globe,
  Users,
  Building2,
  Search,
  Settings,
  Package,
  Scale,
  Calendar,
  Newspaper,
  FileDown,
  Beaker,
  Layers,
  Sparkles,
  Zap,
  Target,
  GitMerge,
  Syringe,
  Boxes,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Droplets,
  LineChart,
  Atom,
  Clock
};

export function resolveIcon(name?: string, fallback: LucideIcon = Sparkles): LucideIcon {
  if (!name) return fallback;
  // Accepts admin icon references too ("draw:VialIcon", "lucide:Factory", "/uploads/icon.svg")
  return ICON_MAP[name] || (iconFromRef(name) as unknown as LucideIcon) || fallback;
}

export const CAPABILITY_ICONS = [FlaskConical, Dna, Microscope, Activity, Search, Beaker];

export function getBulletSvgIcon(text: string): string | null {
  const lower = text.toLowerCase();
  // These points keep their own line icons (document, microscope, test tubes): the client's cryovial and
  // clone-screening drawings are for cell bank generation and clone screening, not for these.
  if (lower.includes('documentation') || lower.includes('image-based') || lower.includes('gmp-compliant')) {
    return null;
  }
  // Stable cell pools use the drawn cell cluster (getBulletCapabilityIcon), not the culture-flask drawing.
  if (lower.includes('stable cell pool') || lower.includes('pool generation')) return null;
  if (lower.includes('cell culture')) {
    return '/images/cell culture.svg';
  }
  if (lower.includes('high-throughput') || lower.includes('clone screening')) {
    return '/images/High-Throughput Clone Screening.svg';
  }
  if (lower.includes('cho-k1') || lower.includes('cho-s') || lower.includes('host cell') || lower.includes('host platform')) {
    return '/images/Host cell line.svg';
  }
  if (lower.includes('rcb') || lower.includes('mcb') || lower.includes('cell bank') || lower.includes('cryovial')) {
    return '/images/cell banking - cryovial.svg';
  }
  if (lower.includes('single-cell') || lower.includes('monoclonality') || lower.includes('cloning')) {
    return '/images/single cell cloning.svg';
  }
  return null;
}

export function getBulletCapabilityIcon(text: string, index: number) {
  const lower = text.toLowerCase();
  if (lower.includes('gene construct') || lower.includes('codon') || lower.includes('gene synthesis')) return Dna;
  if (lower.includes('vector') || lower.includes('construct')) return Workflow;
  if (lower.includes('stable cell pool') || lower.includes('pool generation')) return CellClusterIcon as unknown as typeof FlaskConical;
  if (lower.includes('single-cell') || lower.includes('monoclonality')) return Microscope;
  if (lower.includes('high-throughput') || lower.includes('selection')) return Sliders;
  if (lower.includes('monitoring') || lower.includes('metabolite')) return LineChart;
  if (lower.includes('growth') || lower.includes('product quality')) return ShieldCheck;
  if (lower.includes('productivity') || lower.includes('assessment')) return Activity;
  if (lower.includes('research cell bank') || lower.includes('rcb')) return TestTubes;
  if (lower.includes('master cell bank') || lower.includes('mcb') || lower.includes('cgmp')) return Award;
  if (lower.includes('documentation') || lower.includes('regulatory') || lower.includes('submissions') || lower.includes('validation') || lower.includes('qualification')) return FileCheck;
  if (lower.includes('media') || lower.includes('feed')) return FlaskConical;
  if (lower.includes('bioreactor') || lower.includes('shake flask')) return TestTubes;
  if (lower.includes('doe') || lower.includes('optimization') || lower.includes('characterization')) return Sliders;
  if (lower.includes('cell culture') || lower.includes('clone') || lower.includes('cell line')) return Dna;
  if (lower.includes('intensification') || lower.includes('perfusion') || lower.includes('atf') || lower.includes('fed-batch')) return Repeat;
  if (lower.includes('glycosylation')) return Atom;
  if (lower.includes('resin') || lower.includes('screening')) return Search;
  if (lower.includes('affinity') || lower.includes('chromatography')) return Filter;
  if (lower.includes('anion') || lower.includes('cation') || lower.includes('ion exchange') || lower.includes('mixed-mode')) return Layers;
  if (lower.includes('hydrophobic')) return Droplets;
  if (lower.includes('virus') || lower.includes('viral')) return ShieldAlert;
  if (lower.includes('ultrafiltration') || lower.includes('diafiltration') || lower.includes('uf/df') || lower.includes('filtration')) return Filter;
  if (lower.includes('impurity') || lower.includes('clearance')) return ShieldCheck;
  if (lower.includes('formulation')) return Beaker;
  if (lower.includes('lc-ms') || lower.includes('mass spec')) return Microscope;
  if (lower.includes('electrophoresis') || lower.includes('capillary')) return LineChart;
  if (lower.includes('elisa')) return TestTubes;
  if (lower.includes('identity') || lower.includes('purity') || lower.includes('testing')) return Search;
  if (lower.includes('hplc') || lower.includes('uplc') || lower.includes('ce-sds') || lower.includes('ief')) return LineChart;
  if (lower.includes('potency') || lower.includes('binding') || lower.includes('cell-based') || lower.includes('assay')) return Activity;
  if (lower.includes('forced degradation') || lower.includes('stability')) return ShieldCheck;
  if (lower.includes('reference standard')) return Award;
  if (lower.includes('transfer') || lower.includes('tech transfer')) return Share2;
  if (lower.includes('comparability') || lower.includes('biosimilar')) return GitMerge;
  if (lower.includes('support')) return Workflow;
  if (lower.includes('method development') || lower.includes('method')) return FileCheck;
  if (lower.includes('scalability') || lower.includes('scale-up')) return Maximize2;

  const fallbacks = [Dna, Workflow, FlaskConical, Microscope, Sliders, Activity, TestTubes, Award, FileCheck];
  return fallbacks[index % fallbacks.length];
}

export function getOverviewCapabilityIcon(text: string, index: number) {
  const lower = text.toLowerCase();

  // 1. Specific Scientific & Laboratory Modalities
  if (lower.includes('europe') || lower.includes('india') || lower.includes('across india')) return Globe;
  if (lower.includes('novum') || lower.includes('bioanalytical') || lower.includes('partner') || lower.includes('one roof')) return Users;
  if (lower.includes('cell line') || lower.includes('clone') || lower.includes('gene construct') || lower.includes('expression system') || lower.includes('molecule-specific')) return Dna;
  if (lower.includes('microbiolog') || lower.includes('endotoxin') || lower.includes('bioburden') || lower.includes('sterility') || lower.includes('mycoplasma')) return Bug;
  if (lower.includes('bioassay') || lower.includes('immunogen') || lower.includes('potency') || lower.includes('cell-based') || lower.includes('adcc')) return Activity;
  if (lower.includes('integrated biologics') || lower.includes('upstream and downstream') || lower.includes('process development') || lower.includes('workflow')) return Workflow;
  if (lower.includes('analytical development') || lower.includes('physicochemical') || lower.includes('characterization') || lower.includes('lc-ms') || lower.includes('sec-hplc') || lower.includes('comparability')) return Microscope;

  // 2. Drug Substance vs Drug Product Manufacturing
  if (lower.includes('drug product') || lower.includes('fill-finish') || lower.includes('vials') || lower.includes('pfs') || lower.includes('cartridges') || lower.includes('filling line')) return PackageCheck;
  if (lower.includes('drug substance') || lower.includes('upstream production suites') || lower.includes('200l') || lower.includes('bioreactor capacity') || lower.includes('clinical gmp') || lower.includes('gmp manufacturing') || lower.includes('clinical supply')) return Factory;

  // 3. Quality & Batch Release & Compliance
  if (lower.includes('batch release') || lower.includes('quality control') || lower.includes('qc batch') || lower.includes('coa release')) return ClipboardCheck;
  if (lower.includes('data integrity') || lower.includes('ip protection') || lower.includes('21 cfr')) return Lock;
  if (lower.includes('product quality') || lower.includes('quality framework') || lower.includes('integrated qms') || lower.includes('audit') || lower.includes('compliance systems') || lower.includes('quality and compliance')) return ShieldCheck;
  if (lower.includes('continuous improvement') || lower.includes('advancement') || lower.includes('robustness') || lower.includes('manufacturability')) return TrendingUp;
  if (lower.includes('transparent') || lower.includes('project management') || lower.includes('governance')) return FileCheck;
  if (lower.includes('scientific excellence') || lower.includes('peer-reviewed') || lower.includes('awards')) return Award;

  // 4. Equipment & Facility Specifics
  if (lower.includes('ambr') || lower.includes('media/feed')) return FlaskConical;
  if (lower.includes('scale') || lower.includes('linear scale') || lower.includes('intermediate suite')) return Sliders;
  if (lower.includes('50l sus') || lower.includes('single-use')) return Layers;
  if (lower.includes('perfusion') || lower.includes('fed-batch')) return Repeat;
  if (lower.includes('liquid handling') || lower.includes('microliter') || lower.includes('resin screening')) return Pipette;
  if (lower.includes('chromatography') || lower.includes('purification') || lower.includes('column') || lower.includes('pcc')) return Filter;
  if (lower.includes('lyophil') || lower.includes('nucleation') || lower.includes('freeze')) return Snowflake;
  if (lower.includes('viral') || lower.includes('segregat') || lower.includes('grade c')) return ShieldAlert;
  if (lower.includes('visual inspection') || lower.includes('secondary packaging') || lower.includes('inspection suite')) return Eye;
  if (lower.includes('qtpp') || lower.includes('analytical sciences workflow')) return Search;
  if (lower.includes('regulatory') || lower.includes('fda') || lower.includes('ema') || lower.includes('pmda') || lower.includes('tga') || lower.includes('cmc')) return Scale;
  if (lower.includes('campus') || lower.includes('facility') || lower.includes('infrastructure') || lower.includes('27,000 sqft') || lower.includes('35,000') || lower.includes('sqft')) return Building2;
  if (lower.includes('global') || lower.includes('market')) return Globe;
  if (lower.includes('phase-aligned') || lower.includes('lifecycle')) return Milestone;
  if (lower.includes('scalable') || lower.includes('capacity')) return Maximize2;

  // Diverse Fallback Array of Real Scientific Symbols
  const distinctScientificIcons = [
    Dna,
    Workflow,
    Microscope,
    Factory,
    PackageCheck,
    Activity,
    Bug,
    ClipboardCheck,
    FlaskConical,
    Filter,
    Snowflake,
    Scale,
  ];
  return distinctScientificIcons[index % distinctScientificIcons.length];
}

export function getServiceIcon(title: string, index: number) {
  const t = title.toLowerCase();
  if (t.includes('cell')) return Dna;
  if (t.includes('process')) return Settings;
  if (t.includes('analytical') || t.includes('testing')) return FlaskConical;
  if (index === 0) return Dna;
  if (index === 1) return Settings;
  return FlaskConical;
}

// Icons for the workflow steps, by position
export const WORKFLOW_ICONS = [FlaskConical, Sliders, Filter, Sparkles, Eye, Package, Truck];

export function getManufacturingIcon(title: string, index: number) {
  const t = title.toLowerCase();
  if (t.includes('substance') || t.includes('bioreactor')) return Beaker;
  if (t.includes('product') || t.includes('fill') || t.includes('finish')) return Package;
  return index === 0 ? Beaker : Package;
}

// Fallback icons for lifecycle steps, by position (used only when a step has no drawn icon of its own)
export const LIFECYCLE_ICONS = [Target, Sliders, FlaskConical, Scale, Activity, ShieldCheck];

// Icons for the hero quick-jump buttons, by position
export const JUMP_ICONS = [Microscope, Scale, HeartPulse, Bug];

export function getCharacterizationIcon(title: string, index: number) {
  const t = title.toLowerCase();
  if (t.includes('testing')) return Microscope;
  if (t.includes('physico')) return Scale;
  if (t.includes('bioassay') || t.includes('immun')) return HeartPulse;
  if (t.includes('microbio')) return Bug;
  const icons = [Microscope, Scale, HeartPulse, Bug];
  return icons[index % icons.length];
}

export function WorkflowIconFallback(idx: number): LucideIcon {
  const icons: LucideIcon[] = [FlaskConical, Settings, ShieldCheck, Factory];
  return icons[idx % icons.length] || FlaskConical;
}

/* ───────────────────────────── shared helpers ───────────────────────────── */

/** Heading icon of an image + text section on the development service pages. */
export function getServiceSectionIcon(title: string, index: number): LucideIcon {
  const titleLower = (title || '').toLowerCase();
  return titleLower.includes('upstream')
    ? FlaskConical
    : titleLower.includes('downstream')
      ? Filter
      : titleLower.includes('analytical')
        ? Microscope
        : titleLower.includes('cell line') || titleLower.includes('clone')
          ? Dna
          : titleLower.includes('formulation')
            ? Beaker
            : CAPABILITY_ICONS[index % CAPABILITY_ICONS.length];
}

/** Icons of the pillar cards on the integrated page and of the tiles on the quality page, by position. */
export const INTEGRATED_PILLAR_ICONS: LucideIcon[] = [Workflow, ShieldCheck];
export const QUALITY_TILE_ICONS: LucideIcon[] = [Globe, ClipboardCheck];
/** Fallback icons of the three home page service cards, by position. */
export const HOME_SERVICE_CARD_ICONS: LucideIcon[] = [FlaskConical, Factory, Microscope];

const isSplit = (section?: CDMOSection) => Boolean(section) && (!section!.style || section!.style === 'feature-split');

/* ───────────────────────────── the editor-facing rules ───────────────────────────── */

export type IconSlotKind =
  | 'sectionBullet'
  | 'sectionHeading'
  | 'sectionSecondaryHeading'
  | 'capability'
  | 'bioassay'
  | 'immunogenicity'
  | 'technology'
  | 'modality'
  | 'card'
  | 'cardItem'
  | 'step'
  | 'advantage'
  | 'textListItem';

export interface IconSlot {
  kind: IconSlotKind;
  /** The item's text; also the key of the editor's choice in page.itemIcons. */
  text: string;
  /** Position of the item in its list. For section headings: the section's position among the image + text sections. */
  index: number;
  /** The whole list the item belongs to (lists show icons only when every item has one). */
  list?: string[];
  /** The section the item belongs to, and its position in page.sections. */
  section?: CDMOSection;
  sectionIndex?: number;
  /** A stored icon name on the card/step/item itself ("FlaskConical", "draw:VialIcon"). */
  storedIcon?: string;
}

const keyOf = (page: Pick<CDMOPage, 'category' | 'slug'>) => `${(page.category || '').toLowerCase()}/${(page.slug || '').toLowerCase()}`;

/** Index of a section among the page's image + text sections (how layouts number them). */
export function splitPosition(page: CDMOPage, sectionIndex?: number): number {
  if (sectionIndex === undefined) return -1;
  const sections = page.sections || [];
  if (!isSplit(sections[sectionIndex])) return -1;
  return sections.slice(0, sectionIndex).filter((s) => isSplit(s)).length;
}

/** A list shows icons only when every point resolves to one (editor choice or automatic). */
function listIcon(page: CDMOPage, slot: IconSlot): IconComponent | null {
  const list = slot.list && slot.list.length ? slot.list : [slot.text];
  const complete = list.every((t) => pickIcon(page.itemIcons, t, getCapabilityIcon(t)));
  return complete ? getCapabilityIcon(slot.text) : null;
}

/** Icons of cards, steps and card items drawn by the generic section renderer. */
function rendererIcon(slot: IconSlot): IconComponent | null {
  if (slot.kind === 'step') return resolveIcon(slot.storedIcon, WorkflowIconFallback(slot.index));
  if (slot.kind === 'card') return resolveIcon(slot.storedIcon, FlaskConical);
  if (slot.kind === 'cardItem') return resolveIcon(slot.storedIcon, Dna);
  return null;
}

/**
 * The icon the live page shows for an item when the editor has not chosen one, or null when the
 * page shows no icon there (some designs have no icon for a given item).
 */
export function getAutoIcon(page: CDMOPage, slot: IconSlot): IconComponent | null {
  const key = keyOf(page);
  const category = (page.category || '').toLowerCase();
  const slug = (page.slug || '').toLowerCase();
  const isHub = slug === category;

  // ── Home page
  if (category === 'home') {
    if (slot.kind === 'advantage') return HOME_ADVANTAGE_ICONS[slot.index % HOME_ADVANTAGE_ICONS.length];
    if (slot.kind === 'card' && slot.section?.id === 'home-services')
      return resolveIcon(slot.storedIcon, HOME_SERVICE_CARD_ICONS[slot.index % HOME_SERVICE_CARD_ICONS.length]);
    if (slot.kind === 'cardItem' && slot.section?.id === 'home-services') return resolveIcon(slot.storedIcon, Dna);
    if (slot.section && ['home-map', 'home-services', 'home-modalities', 'home-advantage', 'home-insights'].includes(slot.section.id || '')) return null;
    return rendererIcon(slot);
  }

  // ── Category hub pages
  if (isHub && category === 'services') {
    if (slot.kind === 'card') return getServiceIcon(slot.text, slot.index);
    return rendererIcon(slot);
  }
  if (isHub && category === 'manufacturing') {
    if (slot.kind === 'card') return getManufacturingIcon(slot.text, slot.index);
    if (slot.kind === 'step' && slot.section?.style === 'process-steps') return WORKFLOW_ICONS[slot.index % WORKFLOW_ICONS.length];
    return rendererIcon(slot);
  }
  if (isHub && category === 'characterization') {
    if (slot.kind === 'card') return getCharacterizationIcon(slot.text, slot.index);
    if (slot.kind === 'step' && slot.section?.style === 'process-steps')
      return getCapabilityIcon(slot.text) || LIFECYCLE_ICONS[slot.index % LIFECYCLE_ICONS.length];
    return rendererIcon(slot);
  }
  if (isHub) return rendererIcon(slot);

  // ── Development service pages
  if (category === 'services') {
    const hidePointerIcons = slug === 'process' || slug === 'analytical';
    const hideHeaderIcons = slug === 'analytical';
    if (slot.kind === 'sectionBullet') {
      if (hidePointerIcons || !isSplit(slot.section)) return null;
      const svg = slug === 'cell-line' ? getBulletSvgIcon(slot.text) : null;
      return svg ? iconFromRef(svg) : getBulletCapabilityIcon(slot.text, slot.index);
    }
    if (slot.kind === 'sectionHeading') {
      if (hideHeaderIcons || !isSplit(slot.section)) return null;
      return getServiceSectionIcon(slot.text, slot.index);
    }
    if (slot.kind === 'modality') return getModalityIcon(slot.text);
    return rendererIcon(slot);
  }

  // ── Manufacturing, characterization and modality pages: drawn icons for capability lists
  if (category === 'manufacturing' || category === 'characterization' || category === 'modalities') {
    if (['capability', 'bioassay', 'immunogenicity', 'technology'].includes(slot.kind)) return listIcon(page, slot);
    if (category === 'manufacturing' && slot.kind === 'sectionBullet' && isSplit(slot.section)) return listIcon(page, slot);
    if (category === 'manufacturing' && slug === 'drug-substance' && isSplit(slot.section)) {
      const s = slot.section!;
      const hasMedia = Boolean(s.image || s.video || (s.images && s.images.length));
      if (!hasMedia && slot.kind === 'sectionHeading') return ArrowRightLeft;
      if (!hasMedia && slot.kind === 'sectionSecondaryHeading') return FlaskConical;
    }
    return rendererIcon(slot);
  }

  // ── Overview and facility pages
  if (category === 'overview' || category === 'facility&location') {
    if (key === 'overview/integrated') {
      if (slot.kind === 'capability') return listIcon(page, slot);
      if (slot.kind === 'sectionHeading' && isSplit(slot.section) && slot.index < 2) return INTEGRATED_PILLAR_ICONS[slot.index];
    }
    if (key === 'overview/quality') {
      if (slot.kind === 'sectionHeading' && isSplit(slot.section) && slot.index < 2) return QUALITY_TILE_ICONS[slot.index];
    }
    if (slot.kind === 'textListItem' && (slug === 'india' || slug === 'facility') && slot.sectionIndex === 0)
      return getOverviewCapabilityIcon(slot.text, slot.index);
    return rendererIcon(slot);
  }

  // ── Insights and custom pages: the generic section renderer
  return rendererIcon(slot);
}

/** The icon the live page shows for an item: the editor's choice, else the automatic icon. */
export function getSlotIcon(page: CDMOPage, slot: IconSlot): IconComponent | null {
  return pickIcon(page.itemIcons, slot.text, getAutoIcon(page, slot));
}

/** Whether the page's design draws an icon for this kind of item at all (list items may be waiting for one). */
export function slotHasIconSpot(page: CDMOPage, slot: IconSlot): boolean {
  if (getAutoIcon(page, slot) || iconFromRef(page.itemIcons?.[slot.text.replace(/\s+/g, ' ').trim()])) return true;
  // List items: the spot exists even while some items lack an icon (the list then shows plain markers)
  const category = (page.category || '').toLowerCase();
  const listKinds: IconSlotKind[] = ['capability', 'bioassay', 'immunogenicity', 'technology'];
  if (listKinds.includes(slot.kind) && ['manufacturing', 'characterization', 'modalities'].includes(category)) return true;
  if (slot.kind === 'capability' && keyOf(page) === 'overview/integrated') return true;
  if (slot.kind === 'sectionBullet' && category === 'manufacturing' && isSplit(slot.section)) return true;
  return false;
}
