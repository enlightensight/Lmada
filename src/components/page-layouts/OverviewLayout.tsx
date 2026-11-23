import Link from 'next/link';
import {
  ArrowRight,
  Quote,
  ShieldCheck,
  Microscope,
  Factory,
  Dna,
  FileCheck,
  Users,
  Sliders,
  Filter,
  Search,
  Scale,
  Workflow,
  FlaskConical,
  Activity,
  Bug,
  ClipboardCheck,
  PackageCheck,
  Pipette,
  Lock,
  TrendingUp,
  Snowflake,
  ShieldAlert,
  Eye,
  Building2,
  Globe,
  Milestone,
  Maximize2,
  Award,
  Layers,
  Repeat,
  User,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Target,
  GitMerge,
  Syringe,
  GraduationCap,
  Briefcase,
  type LucideIcon,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import PillarCard from '@/components/PillarCard';
import FacilityGallery from '@/components/FacilityGallery';
import FAQSection from '@/components/FAQSection';
import DynamicSectionRenderer from '@/components/DynamicSectionRenderer';
import AboutHeroCarousel from '@/components/AboutHeroCarousel';
import FacilityHeroCarousel from '@/components/FacilityHeroCarousel';
import LondonHeroCarousel from '@/components/LondonHeroCarousel';
import CDMOLocationsMapSection from '@/components/CDMOLocationsMapSection';
import PageCTA from '@/components/PageCTA';
import EquipmentCarousel from '@/components/EquipmentCarousel';
import BiologicsWorkflowGraphic from '@/components/BiologicsWorkflowGraphic';
import BiologicsCircularGraphic from '@/components/BiologicsCircularGraphic';
import { getSectionEquipment, ALL_EQUIPMENT_ITEMS } from '@/data/equipmentData';
import { makePageText, slotsForPage } from '@/lib/pageText';
import { OVERVIEW_TEXT_SLOTS, INDIA_GALLERY_TILE_COUNT } from '@/data/textSlots/overview';
import type { CDMOPage, CDMOSection } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';
import { getListIcons, pickIcon } from '@/components/icons/SiteIcon';
import { parseFacilityListParagraph } from '@/lib/facilityList';

interface OverviewLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

const INLINE_LINK = /\[[^\]]+\]\([^)\s]+\)/;

/**
 * Renders CMS copy with the two inline marks editors can use:
 * `**bold**` and `[label](https://link)`.
 */
function renderFormattedText(text: string) {
  if (!text) return text;
  if (!text.includes('**') && !INLINE_LINK.test(text)) return text;
  const parts = text.split(/(\*\*.*?\*\*|\[[^\]]+\]\([^)\s]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-neutral-900 font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const external = /^https?:\/\//i.test(link[2]);
      return (
        <a
          key={i}
          href={link[2]}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="text-brand-blue hover:text-brand-blue-hover underline font-medium inline-flex items-center gap-1"
        >
          <span>{link[1]}</span>
          {external && <ExternalLink className="w-3.5 h-3.5 inline-block" />}
        </a>
      );
    }
    return part;
  });
}

const isVideoUrl = (url?: string) => Boolean(url && /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url));

/** Sections this layout renders with its own editorial image + text block. */
const isSplitSection = (sec: CDMOSection) => !sec.style || sec.style === 'feature-split';

/** Accent styling of the two pillar tiles on the quality page (first tile blue, second orange). */
const QUALITY_TILE_STYLES = [
  {
    icon: Globe,
    hover: 'hover:border-brand-blue/40',
    bar: 'from-brand-blue to-cyan-500',
    iconBox: 'bg-brand-blue/10 border border-brand-blue/20',
    iconColor: 'text-brand-blue',
  },
  {
    icon: ClipboardCheck,
    hover: 'hover:border-brand-orange/40',
    bar: 'from-brand-orange to-amber-500',
    iconBox: 'bg-brand-orange/10 border border-brand-orange/20',
    iconColor: 'text-brand-orange',
  },
];

const OVERVIEW_SLUGS = ['about', 'leadership', 'facility', 'integrated', 'quality', 'careers'];

function getOverviewCapabilityIcon(text: string, index: number) {
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


function AccentHeading({ text, className = '' }: { text: string; className?: string }) {
  const [first, ...rest] = text.split(' ');
  return (
    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] ${className}`}>
      <span className="text-neutral-900">{first}</span>
      {rest.length > 0 ? ` ${rest.join(' ')}` : ''}
    </h2>
  );
}

export default function OverviewLayout({ page, content }: OverviewLayoutProps) {
  const slugIndex = OVERVIEW_SLUGS.indexOf(page.slug);
  const flip = slugIndex % 2 === 1;
  const slugLower = (page.slug || '').toLowerCase();
  const isAbout = page.slug === 'about';
  const isIntegrated = page.slug === 'integrated';
  const isLeadership = page.slug === 'leadership';
  const isCareers = page.slug === 'careers';
  const isQuality = page.slug === 'quality' || page.slug === 'quality-and-compliance';
  const isIndia = slugLower === 'india';
  const isUK = slugLower === 'uk' || slugLower === 'london';

  // ---- Editable copy that has no field of its own on the record ("text slots") ----
  const t = makePageText(page, OVERVIEW_TEXT_SLOTS);
  const slotKeys = new Set(slotsForPage(page, OVERVIEW_TEXT_SLOTS).map((s) => s.key));
  /** Slot text when this page registers the slot, otherwise the given fallback. */
  const tx = (key: string, fallback = '') => (slotKeys.has(key) ? t(key) : fallback);

  const bulletsLabel = tx('bulletsLabel', 'Key capabilities include:');
  const careersLabel = tx('careersButtonText', 'Explore Open Roles');
  const careersHref = tx('careersButtonLink', 'https://careers.lambda-cro.com/go/CDMO/752444/');

  // ---- Hero media: page.images (2+ = carousel, 1 = single), else page.heroVideo / page.image ----
  const heroSlides = (page.images || []).filter(Boolean);
  const heroMedia = heroSlides.length === 1 ? heroSlides[0] : page.heroVideo || page.image || '';
  const heroIsVideo = isVideoUrl(heroMedia) || (heroSlides.length !== 1 && Boolean(page.heroVideo));
  const heroImage = heroMedia || '/images/hero_cleanroom.png';
  // The integrated and Ahmedabad pages show their hero graphic uncropped inside a white card.
  const heroContain = isIntegrated || isIndia;

  // ---- Which block renders which section -------------------------------------------------
  // Bespoke blocks are picked by id / style / position (never by title alone, an editor may
  // retitle a section). Remaining image + text sections use this layout's editorial rows;
  // everything else goes through DynamicSectionRenderer just above the FAQ.
  const sections: CDMOSection[] = page.sections || [];
  const splitIdx = sections.map((sec, i) => (isSplitSection(sec) ? i : -1)).filter((i) => i >= 0);

  let aboutIntroIdx = -1;
  let aboutMapIdx = -1;
  if (isAbout) {
    aboutIntroIdx = sections.findIndex((sec) => sec.id === 'sec-about-biologics');
    if (aboutIntroIdx < 0 && splitIdx.length > 0) aboutIntroIdx = splitIdx[0];
    aboutMapIdx = sections.findIndex((sec) => sec.style === 'locations-map');
  }

  // Integrated page: the first two image + text sections are the two pillar cards.
  const pillarIdx = isIntegrated ? splitIdx.slice(0, 2) : [];

  // Quality page: first two image + text sections are the pillar tiles, the third is the
  // regulatory block with the roadmap graphic.
  const qualityTileIdx = isQuality ? splitIdx.slice(0, 2) : [];
  const qualityRegulatoryIdx = isQuality && splitIdx.length > 2 ? splitIdx[2] : -1;

  let leaderIdx = -1;
  if (isLeadership) {
    leaderIdx = sections.findIndex((sec) => sec.style === 'leadership-grid' || sec.id === 'sec-leadership-team');
    if (leaderIdx < 0) {
      leaderIdx = sections.findIndex(
        (sec) =>
          sec.style === 'cards-grid' &&
          (sec.title?.toLowerCase().includes('leadership') || sec.title?.toLowerCase().includes('executive'))
      );
    }
  }

  const bespokeIdx = new Set<number>(
    [aboutIntroIdx, aboutMapIdx, ...pillarIdx, ...qualityTileIdx, qualityRegulatoryIdx, leaderIdx].filter((i) => i >= 0)
  );
  const usesEditorialRows = !isAbout && !isIntegrated && !isQuality;
  const narrativeIdx = usesEditorialRows ? splitIdx.filter((i) => !bespokeIdx.has(i)) : [];
  const genericIdx = sections.map((_, i) => i).filter((i) => !bespokeIdx.has(i) && !narrativeIdx.includes(i));

  // Editorial rows read the enriched copy (same order as page.sections) so a section without
  // any media still gets a placeholder image.
  const narrativeSections = narrativeIdx.map((i) => content.sections[i] ?? sections[i]);

  const facilityGallery = isIndia ? (
    <FacilityGallery
      heading={t('galleryHeading')}
      intro={t('galleryIntro')}
      items={Array.from({ length: INDIA_GALLERY_TILE_COUNT }, (_, i) => ({
        name: t(`galleryItem${i + 1}Name`),
        image: t(`galleryItem${i + 1}Image`),
      }))}
    />
  ) : (
    <FacilityGallery />
  );

  const narrative = (
    <>
      {narrativeSections.map((section: any, idx: number) => {
        if (section.dark) {
          // Blue quote / highlight block
          return (
            <section key={idx} className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-molecules">
              <div className="w-full max-w-[1700px] mx-auto">
                <Reveal>
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="w-14 h-14 mx-auto mb-8 rounded-[10px] bg-brand-yellow flex items-center justify-center">
                      <Quote className="w-7 h-7 text-black" />
                    </div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-6">
                      <span className="text-neutral-900">{section.title.split(' ')[0]}</span>
                      {` ${section.title.split(' ').slice(1).join(' ')}`}
                    </h3>
                    <p className="text-[17px] md:text-[19px] text-slate-500 font-normal leading-relaxed">
                      {section.text}
                    </p>
                    {isCareers ? (
                      <div className="mt-8">
                        <a
                          href={careersHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all group/btn"
                        >
                          <span>{careersLabel}</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    ) : (
                      <div className="mt-8 h-1 w-16 mx-auto bg-brand-yellow rounded-full" />
                    )}
                  </div>
                </Reveal>
              </div>
            </section>
          );
        }

        // Editorial alternating image + text row
        const imageRight = (section as any).imageSide
          ? (section as any).imageSide === 'right'
          : (idx % 2 === 1) !== flip;
        const isRoadmap = Boolean(
          section.image && (section.image.includes('roadmap') || section.image.includes('regulatory_cmc'))
        );
        const isDiagram = Boolean(
          section.image &&
          (section.image.endsWith('.svg') ||
            section.image.includes('gene_construct') ||
            isRoadmap) &&
          !section.image.includes('teamwork') &&
          !section.image.includes('CDMOblue')
        );

        const equipmentItems = getSectionEquipment(section.title, page.slug);
        // CMS-managed photo carousel (section.images). The title-matched equipment list above
        // is only a fallback for sections that have no photos of their own.
        const sectionImages: string[] = (section.images || []).filter(Boolean);

        const isFacilityCapacitySection = (isIndia || page.slug === 'facility') && idx === 0;

        if (isFacilityCapacitySection) {
          const displayTitle: string = section.title || '';
          const paragraphs: string[] = (section.text || '').split('\n\n').filter(Boolean);

          const parsed = paragraphs.map((para: string) => ({ para, list: parseFacilityListParagraph(para) }));
          const leadParagraphs = parsed.filter((p) => !p.list).map((p) => p.para);
          const listBlocks = parsed.flatMap((p) => (p.list ? [p.list] : []));
          const eyebrow = (section.subtitle || '').replace(/^\d+\s*[—–-]\s*/, '');
          const titleParts = displayTitle.split(/(\d[\d,]*\s*sq\.?\s*ft\.?)/i);

          return (
            <div key={idx}>
              <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-14 md:py-24 bg-neutral-50/60 border-b border-neutral-100">
                <div className="w-full max-w-[1700px] mx-auto">
                  <Reveal>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 lg:items-end">
                      <div className="lg:col-span-7">
                        {eyebrow && (
                          <div className="flex items-center gap-3 mb-5">
                            <span className="h-px w-8 bg-brand-orange" />
                            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-orange">
                              {eyebrow}
                            </span>
                          </div>
                        )}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] text-balance">
                          {titleParts.map((part: string, i: number) =>
                            i % 2 === 1 ? (
                              <span key={i} className="text-brand-blue whitespace-nowrap">{part}</span>
                            ) : (
                              part
                            )
                          )}
                        </h2>
                      </div>
                      {leadParagraphs.length > 0 && (
                        <div className="lg:col-span-5 space-y-4 text-[16px] md:text-[18px] text-neutral-600 leading-relaxed lg:border-l lg:border-neutral-200 lg:pl-8">
                          {leadParagraphs.map((para: string, pIdx: number) => (
                            <p key={pIdx}>{renderFormattedText(para)}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </Reveal>

                  {listBlocks.length > 0 && (
                    <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
                      {listBlocks.map((block, bIdx) => {
                        const paired = listBlocks.length === 2;
                        const span = !paired ? 'lg:col-span-12' : bIdx === 0 ? 'lg:col-span-7' : 'lg:col-span-5';

                        if (bIdx === 0) {
                          return (
                            <Reveal key={bIdx} className={span}>
                              <div className="h-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 md:p-10">
                                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-6">
                                  {block.intro}
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {block.items.map((item, iIdx) => {
                                    const Icon = pickIcon(page.itemIcons, item, getOverviewCapabilityIcon(item, iIdx)) as LucideIcon;
                                    const isOddLast = block.items.length % 2 === 1 && iIdx === block.items.length - 1;
                                    return (
                                      <li
                                        key={iIdx}
                                        className={`flex items-center gap-4 rounded-xl border border-neutral-200/80 bg-neutral-50/70 px-4 py-4 ${isOddLast ? 'sm:col-span-2' : ''}`}
                                      >
                                        <span className="shrink-0 w-11 h-11 rounded-[10px] bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                                          <Icon className="w-5 h-5" strokeWidth={1.75} />
                                        </span>
                                        <span className="text-[16px] md:text-[17px] font-medium text-neutral-900 leading-snug">
                                          {item}
                                        </span>
                                      </li>
                                    );
                                  })}
                                </ul>
                                {block.outro && (
                                  <p className="mt-6 text-[15px] text-neutral-600 leading-relaxed">{block.outro}</p>
                                )}
                              </div>
                            </Reveal>
                          );
                        }

                        return (
                          <Reveal key={bIdx} className={span}>
                            <div className="h-full rounded-2xl border border-brand-blue/20 bg-brand-blue/[0.06] p-6 sm:p-8 md:p-10 flex flex-col">
                              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-navy-muted mb-6">
                                {block.intro}
                              </p>
                              <ul className="divide-y divide-brand-blue/15">
                                {block.items.map((item, iIdx) => (
                                  <li key={iIdx} className="flex items-start gap-3 py-3.5 first:pt-0">
                                    <CheckCircle2 className="shrink-0 w-5 h-5 mt-0.5 text-brand-blue" strokeWidth={1.75} />
                                    <span className="text-[16px] md:text-[17px] font-medium text-brand-navy leading-snug">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                              {block.outro && (
                                <p className="mt-auto pt-6 text-[15px] text-brand-navy-muted leading-relaxed">
                                  {block.outro}
                                </p>
                              )}
                            </div>
                          </Reveal>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>
              {(page.slug === 'facility' || isIndia) && idx === 0 && facilityGallery}
            </div>
          );
        }

        return (
          <div key={idx}>
            <section className={`px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
              <div className="w-full max-w-[1700px] mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 ${section.qtppText ? 'items-start' : 'items-center'}`}>
                  <Reveal className={imageRight ? 'lg:order-2' : ''}>
                    {sectionImages.length > 0 ? (
                      <EquipmentCarousel
                        items={sectionImages.map((img: string, i: number) => {
                          const match = (equipmentItems || []).find((eq) => eq.src === img) ||
                            ALL_EQUIPMENT_ITEMS.find((eq) => eq.src === img);
                          return match || {
                            src: img,
                            title: `${section.title} Equipment ${i + 1}`,
                            subtitle: `${section.title} instrumentation suite.`,
                            tag: 'Equipment'
                          };
                        })}
                        sectionTitle={section.title}
                      />
                    ) : equipmentItems && equipmentItems.length > 0 ? (
                      <EquipmentCarousel items={equipmentItems} sectionTitle={section.title} />
                    ) : (section.video || (section.mediaType === 'video' && section.image) || (section.image && /\.(mp4|webm|ogg|mov)$/i.test(section.image))) ? (
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950 border border-neutral-200 rounded-[10px] shadow-sm">
                        <video
                          src={section.video || section.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : isCareers ? (
                      <a
                        href={careersHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative aspect-[4/3] overflow-hidden bg-neutral-100 border border-neutral-200 rounded-[10px] shadow-sm group cursor-pointer"
                      >
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-5 py-2.5 rounded-[8px] bg-brand-yellow text-black font-bold text-xs uppercase tracking-wider shadow-xl flex items-center gap-2">
                            <span>Open Careers Portal</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </a>
                    ) : (
                      <div
                        className={`relative ${isRoadmap
                          ? 'aspect-[1717/804] w-full bg-white p-2 sm:p-4'
                          : isDiagram
                            ? 'aspect-[4/3] bg-white p-3 sm:p-5'
                            : 'aspect-[4/3] bg-neutral-100'
                          } overflow-hidden border border-neutral-200 rounded-[10px] shadow-sm flex items-center justify-center`}
                      >
                        <img
                          src={section.image}
                          alt={section.title}
                          className={`w-full h-full ${isDiagram ? 'object-contain' : 'object-cover'
                            } transition-transform duration-700 hover:scale-105`}
                        />
                      </div>
                    )}

                    {/* Move paragraph below slideshow for better alignment */}
                    {section.qtppText && (
                      <div className="mt-6 bg-slate-50/90 rounded-[12px] border border-neutral-200/80 p-5 sm:p-6 shadow-xs">
                        <div className="flex items-center gap-2.5 mb-2.5">
                          <div className="w-7 h-7 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
                            <Target className="w-4 h-4" />
                          </div>
                          <h4 className="text-base font-bold text-neutral-900 tracking-tight">
                            {tx('qtppHeading', 'Quality Target Product Profile (QTPP) Alignment')}
                          </h4>
                        </div>
                        <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed font-normal">
                          {renderFormattedText(section.qtppText)}
                        </p>
                      </div>
                    )}
                  </Reveal>
                  <Reveal delay={0.1} className={imageRight ? 'lg:order-1' : ''}>
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-black leading-[1.15] mb-5">
                        {section.title}
                      </h3>
                      <div className="h-1 w-12 bg-brand-blue rounded-full mb-5" />
                      <div className="space-y-3.5 text-[15px] md:text-[17px] text-neutral-600 leading-relaxed">
                        {(section.text || '').split('\n\n').map((para: string, pIdx: number) => (
                          <p key={pIdx}>{renderFormattedText(para)}</p>
                        ))}
                      </div>

                      {/* Standard Single Bullets List */}
                      {section.bullets && section.bullets.length > 0 && (
                        <div className="mt-6 pt-5 border-t border-neutral-200/70">
                          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3.5">
                            {(section as any).bulletsTitle || bulletsLabel}
                          </span>
                          <ul className="space-y-2.5">
                            {section.bullets.map((bullet: string, bIdx: number) => (
                              <li key={bIdx} className="flex items-start gap-2.5">
                                <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                </div>
                                <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                  {renderFormattedText(bullet)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Early Stage & Late Stage Split Bullets */}
                      {section.earlyStageBullets && section.lateStageBullets && (
                        <div className="mt-6 pt-5 border-t border-neutral-200/70 space-y-6">
                          <div>
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                              {tx('earlyStageHeading', 'Early-Stage Development')}
                            </span>
                            <ul className="space-y-2.5">
                              {section.earlyStageBullets.map((bullet: string, bIdx: number) => (
                                <li key={bIdx} className="flex items-start gap-2.5">
                                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                  </div>
                                  <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                    {renderFormattedText(bullet)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                              {tx('lateStageHeading', 'Late-Stage Development')}
                            </span>
                            <ul className="space-y-2.5">
                              {section.lateStageBullets.map((bullet: string, bIdx: number) => (
                                <li key={bIdx} className="flex items-start gap-2.5">
                                  <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                  </div>
                                  <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                    {renderFormattedText(bullet)}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* Formulation, Lyophilization & Clinical GMP Bullets */}
                      {(section.formulationBullets || section.lyophilizationBullets || section.gmpManufacturingBullets) && (
                        <div className="mt-6 pt-5 border-t border-neutral-200/70 space-y-6">
                          {section.formulationBullets && section.formulationBullets.length > 0 && (
                            <div>
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                                {tx('formulationHeading', 'Formulation Development')}
                              </span>
                              <ul className="space-y-2.5">
                                {section.formulationBullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                    </div>
                                    <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                      {renderFormattedText(bullet)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {section.lyophilizationBullets && section.lyophilizationBullets.length > 0 && (
                            <div>
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                                {tx('lyophilizationHeading', 'Lyophilization Development')}
                              </span>
                              <ul className="space-y-2.5">
                                {section.lyophilizationBullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                    </div>
                                    <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                      {renderFormattedText(bullet)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {section.gmpManufacturingBullets && section.gmpManufacturingBullets.length > 0 && (
                            <div>
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                                {tx('gmpManufacturingHeading', 'Clinical GMP Manufacturing')}
                              </span>
                              <ul className="space-y-2.5">
                                {section.gmpManufacturingBullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                    </div>
                                    <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                      {renderFormattedText(bullet)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Analytical Physicochemical, Structural & Functional Bullets */}
                      {(section.physicochemicalBullets || section.structuralBullets || section.functionalBullets) && (
                        <div className="mt-6 pt-5 border-t border-neutral-200/70 space-y-6">
                          {section.physicochemicalBullets && section.physicochemicalBullets.length > 0 && (
                            <div>
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                                {tx('physicochemicalHeading', 'Physicochemical & Molecular Characterization')}
                              </span>
                              <ul className="space-y-2.5">
                                {section.physicochemicalBullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                    </div>
                                    <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                      {renderFormattedText(bullet)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {section.structuralBullets && section.structuralBullets.length > 0 && (
                            <div>
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                                {tx('structuralHeading', 'Structural & Biophysical Characterization')}
                              </span>
                              <ul className="space-y-2.5">
                                {section.structuralBullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                    </div>
                                    <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                      {renderFormattedText(bullet)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {section.functionalBullets && section.functionalBullets.length > 0 && (
                            <div>
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                                {tx('functionalHeading', 'Functional & Cell-Based Analysis')}
                              </span>
                              <ul className="space-y-2.5">
                                {section.functionalBullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx} className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                                    </div>
                                    <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                      {renderFormattedText(bullet)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {(section as any).footerText && (
                        <p className="mt-5 text-[15px] md:text-[17px] text-neutral-600 leading-relaxed">
                          {renderFormattedText((section as any).footerText)}
                        </p>
                      )}
                      {isCareers && (
                        <div className="mt-7">
                          <a
                            href={careersHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all group/btn"
                          >
                            <span>{careersLabel}</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      )}
                    </div>
                  </Reveal>
                </div>

                {/* Selected Analytical Applications Showcase */}
                {section.applications && section.applications.length > 0 && (
                  <div className="mt-14 md:mt-20 pt-10 border-t border-neutral-200/80">
                    <Reveal delay={0.1}>
                      <div>
                        <div className="text-center max-w-2xl mx-auto mb-8">
                          {/* Applications & Modalities orange tag removed as requested */}
                          <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                            {tx('applicationsHeading', 'Selected Analytical Applications')}
                          </h4>
                          <div className="h-1 w-12 bg-brand-blue rounded-full mx-auto mt-3" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {section.applications.map((app: any, aIdx: number) => (
                            <div
                              key={aIdx}
                              className="bg-white rounded-[12px] border border-neutral-200/80 p-6 shadow-xs hover:shadow-md hover:border-brand-blue/40 transition-all flex flex-col"
                            >
                              <h5 className="text-base font-bold text-neutral-900 mb-2">
                                {app.title}
                              </h5>
                              <p className="text-[14px] text-neutral-600 leading-relaxed flex-1">
                                {app.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  </div>
                )}
              </div>
            </section>
            {(page.slug === 'facility' || isIndia) && idx === 0 && facilityGallery}
          </div>
        );
      })}
    </>
  );



  return (
    <>
      {/* HERO — editorial, light with dark text */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8">
            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">{page.category === 'facility&location' ? 'Facility & Location' : page.category}</span>
            <span>/</span>
            <span className="text-brand-yellow">{page.title ? page.title.split('—')[0].split('|')[0].trim() : page.slug.replace(/-/g, ' ')}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {page.badge && (
                <span className="inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                  {page.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05]">
                <span className="text-neutral-900">{page.heading.split(' ')[0]}</span>
                {` ${page.heading.split(' ').slice(1).join(' ')}`}
              </h1>
              <div className="space-y-4 text-[17px] text-slate-500 font-normal leading-relaxed mt-6 max-w-xl">
                {page.description.split('\n\n').map((para: string, pIdx: number) => (
                  <p key={pIdx}>{renderFormattedText(para)}</p>
                ))}
              </div>
              {isCareers && (
                <div className="mt-8">
                  <a
                    href={careersHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-[10px] bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm uppercase tracking-wider shadow-md hover:shadow-lg active:scale-95 transition-all group/btn"
                  >
                    <span>{careersLabel}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>
            <Reveal delay={0.1}>
              {heroSlides.length > 1 ? (
                isUK ? (
                  <LondonHeroCarousel images={heroSlides} alt={page.title} />
                ) : isIndia || page.slug === 'facility' ? (
                  <FacilityHeroCarousel images={heroSlides} alt={page.title} />
                ) : (
                  <AboutHeroCarousel
                    images={heroSlides.map((src, i) => ({
                      src,
                      alt: `${page.title} image ${i + 1}`,
                      title: `Facility View ${i + 1}`,
                    }))}
                  />
                )
              ) : heroIsVideo ? (
                <div className={`relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg ${isAbout ? 'bg-brand-navy' : 'bg-neutral-950'}`}>
                  <video
                    src={heroMedia}
                    aria-label={page.title}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : heroContain ? (
                <div className="relative w-full rounded-2xl border border-neutral-200/90 shadow-xl bg-white p-6 sm:p-8 md:p-10 flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroImage}
                    alt={page.title || 'Biologics Development & Manufacturing — From Gene to Clinic'}
                    className="w-full h-auto max-h-[520px] object-contain"
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-white">
                  <img
                    src={heroImage}
                    alt={page.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT: INTRO (graphic + copy) */}
      {isAbout && aboutIntroIdx >= 0 && (() => {
        const intro = sections[aboutIntroIdx];
        const introMedia = intro.video || intro.image || intro.images?.[0] || '';
        const paragraphs = (intro.text || '').split('\n\n').filter(Boolean);

        return (
          <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-white border-b border-neutral-100">
            <div className="w-full max-w-[1700px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <Reveal>
                  {isVideoUrl(introMedia) ? (
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950 border border-neutral-200 rounded-[10px] shadow-sm">
                      <video
                        src={introMedia}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : introMedia ? (
                    <BiologicsWorkflowGraphic src={introMedia} />
                  ) : null}
                </Reveal>
                <Reveal delay={0.1}>
                  <div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-5">
                      {intro.title}
                    </h2>
                    <div className="h-1 w-12 bg-brand-blue rounded-full mb-6" />

                    <div className="space-y-4 text-[15px] md:text-[17px] text-neutral-600 leading-relaxed font-normal">
                      {paragraphs.map((p: string, pIdx: number) => (
                        <p key={pIdx}>{renderFormattedText(p)}</p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ABOUT: GLOBAL REACH & CDMO LOCATIONS MAP */}
      {isAbout && aboutMapIdx >= 0 && (
        <CDMOLocationsMapSection
          title={sections[aboutMapIdx].title || undefined}
          subtitle={sections[aboutMapIdx].subtitle || sections[aboutMapIdx].text || null}
          cards={sections[aboutMapIdx].cards}
        />
      )}

      {/* INTEGRATED DEVELOPMENT TO MANUFACTURING: 2-COLUMN SIDE-BY-SIDE CARDS */}
      {pillarIdx.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-white border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              {pillarIdx.map((secIdx, n) => {
                const sec = sections[secIdx];
                return (
                  <Reveal key={sec.id || secIdx} delay={n === 0 ? 0.05 : 0.1} className="h-full">
                    <PillarCard
                      icon={pickIcon(page.itemIcons, sec.title || '', n === 0 ? Workflow : ShieldCheck) as LucideIcon}
                      title={sec.title}
                      text={sec.text}
                      accent={n === 0 ? 'blue' : 'orange'}
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CAPABILITIES LIST (page.capabilities) */}
      {page.capabilities && page.capabilities.length > 0 && !isQuality && page.slug !== 'facility' && !isIndia && !isUK && !isLeadership && (() => {
        const capHeading = tx('capabilitiesHeading', 'Core Lifecycle Capabilities');
        const [capFirstWord, ...capOtherWords] = capHeading.split(' ');
        const capIntro = tx(
          'capabilitiesIntro',
          'Seamless coordination across development, analytical characterization, and GMP manufacturing under one roof.'
        );

        // Drawn icons per capability point; the list gets icons only when every point has its own
        const capabilityIcons = getListIcons((page.capabilities || []) as string[], page.itemIcons);

        return (
          <section className="relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/60 border-b border-neutral-100 overflow-hidden">
            <div className="relative z-10 w-full max-w-[1700px] mx-auto">
              <Reveal>
                <div className="text-center mb-10 md:mb-14">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                    <span className="text-black">{capFirstWord}</span>
                    {capOtherWords.length > 0 ? ` ${capOtherWords.join(' ')}` : ''}
                  </h2>
                  {capIntro && (
                    <p className={`text-[15px] sm:text-[16px] xl:text-[17px] text-neutral-600 leading-relaxed max-w-5xl xl:max-w-none ${isIntegrated ? 'md:whitespace-nowrap' : ''} mx-auto mt-4`}>
                      {capIntro}
                    </p>
                  )}
                </div>
              </Reveal>

              {isIntegrated ? (
                <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
                  {page.capabilities.map((cap: any, idx: number) => {
                    const Icon = capabilityIcons?.[idx];
                    return (
                      <Reveal key={idx} delay={idx * 0.04} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex">
                        <div className="group w-full h-full bg-white border border-neutral-200/80 rounded-[10px] p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-brand-yellow transition-all duration-300 flex items-center gap-4">
                          {Icon ? (
                            <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 text-brand-blue group-hover:text-black group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300">
                              <Icon className="w-6 h-6" />
                            </div>
                          ) : (
                            <span aria-hidden="true" className="w-1 self-stretch min-h-5 rounded-full bg-brand-blue/70 group-hover:bg-brand-yellow transition-colors duration-200 shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg font-semibold text-neutral-900 leading-snug group-hover:text-black transition-colors duration-300">
                              {cap}
                            </h4>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-3.5 max-w-4xl mx-auto">
                  {page.capabilities.map((cap: any, idx: number) => {
                    const Icon = capabilityIcons?.[idx];
                    return (
                      <Reveal key={idx} delay={idx * 0.04}>
                        <div className="group w-full bg-white border border-neutral-200/80 rounded-[10px] p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-brand-yellow transition-all duration-300 flex items-center gap-4 sm:gap-5">
                          {Icon ? (
                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 text-brand-blue group-hover:text-black group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300">
                              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                          ) : (
                            <span aria-hidden="true" className="w-1 self-stretch min-h-5 rounded-full bg-brand-blue/70 group-hover:bg-brand-yellow transition-colors duration-200 shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg font-semibold text-neutral-900 leading-snug group-hover:text-black transition-colors duration-300">
                              {cap}
                            </h4>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* LEADERSHIP PROFILES GRID (cards of the leadership-grid section) */}
      {leaderIdx >= 0 && (() => {
        const leaderSec = sections[leaderIdx];
        // Card fields as the admin "leadership" editor stores them:
        // title = name, link = job title, badge = function, step = experience, icon = credentials.
        const leaders = (leaderSec.cards || []).map((c) => ({
          name: c.title,
          title: c.link || c.href || '',
          role: c.badge || '',
          image: c.image || '',
          experienceBadge: c.step || '',
          credentials: c.icon || '',
          bio: c.description ? c.description.split('\n\n').filter(Boolean) : [],
        }));
        const secSubtitle = leaderSec.text || leaderSec.subtitle || '';

        return (
          <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-white border-b border-neutral-100">
            <div className="w-full max-w-[1700px] mx-auto">
              <Reveal>
                <div className="text-center mb-12 md:mb-16">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                    {leaderSec.title}
                  </h2>
                  {secSubtitle && (
                    <p className="text-[15px] sm:text-[16px] xl:text-[17px] text-slate-500 font-normal leading-relaxed max-w-5xl xl:max-w-none lg:whitespace-nowrap mx-auto mt-4">
                      {secSubtitle}
                    </p>
                  )}
                </div>
              </Reveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10 items-stretch">
                {leaders.map((leader, idx: number) => (
                  <Reveal key={idx} delay={idx * 0.08} className="h-full">
                    <div className="group h-full bg-white border border-neutral-200/90 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                      {/* Top subtle accent bar */}
                      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-blue to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div>
                        {/* Top Row: Photo & Header Info */}
                        <div className="flex flex-col sm:flex-row gap-6 items-start mb-5">
                          {/* Real Portrait Photograph Container */}
                          {leader.image && (
                            <div className="relative w-full sm:w-48 h-64 sm:h-56 rounded-xl overflow-hidden shadow-md border border-slate-200/90 bg-slate-100 shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={encodeURI(leader.image)}
                                alt={leader.name}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl pointer-events-none" />
                            </div>
                          )}

                          {/* Title & Metadata */}
                          <div className="flex flex-col flex-1">
                            {leader.role && (
                              <span className="inline-flex items-center self-start px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-brand-orange/10 text-brand-orange border border-brand-orange/20 mb-2">
                                {leader.role}
                              </span>
                            )}

                            <h3 className="text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-brand-blue transition-colors mb-1">
                              {leader.name}
                            </h3>

                            <p className="text-xs sm:text-sm font-semibold text-brand-blue uppercase tracking-wider mb-3 leading-snug">
                              {leader.title}
                            </p>

                            {leader.experienceBadge && (
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                                  <Award className="w-3.5 h-3.5 text-brand-orange" />
                                  <span>{leader.experienceBadge}</span>
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Credentials Callout */}
                        {leader.credentials && (
                          <div className="mb-4 p-3 sm:p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                            <GraduationCap className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                            <span className="leading-snug">{leader.credentials}</span>
                          </div>
                        )}

                        {/* Bio Paragraphs */}
                        <div className="space-y-3 text-[14px] sm:text-[14.5px] text-slate-600 leading-relaxed font-normal">
                          {leader.bio.map((para: string, pIdx: number) => (
                            <p key={pIdx}>{para}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* QUALITY: DUAL PILLAR TILES (first two sections of the page) */}
      {qualityTileIdx.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-white border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.15] mb-4">
                  {tx('pillarsHeading', 'Quality & Regulatory Pillars')}
                </h2>
                <div className="h-1 w-12 bg-brand-blue rounded-full mx-auto" />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              {qualityTileIdx.map((secIdx, n) => {
                const sec = sections[secIdx];
                const tile = QUALITY_TILE_STYLES[n % QUALITY_TILE_STYLES.length];
                const TileIcon = pickIcon(page.itemIcons, sec.title || '', tile.icon) as LucideIcon;
                return (
                  <Reveal key={sec.id || secIdx} delay={n === 0 ? 0.05 : 0.1} className="h-full">
                    <div className={`group h-full bg-slate-50/80 border border-neutral-200/90 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs hover:shadow-xl ${tile.hover} transition-all duration-300 flex flex-col justify-start relative overflow-hidden`}>
                      <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${tile.bar} opacity-80`} />
                      <div className="flex items-center gap-3.5 mb-6">
                        <div className={`w-12 h-12 rounded-xl ${tile.iconBox} flex items-center justify-center ${tile.iconColor} shrink-0`}>
                          <TileIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                          {sec.title}
                        </h3>
                      </div>

                      <div className="space-y-4 text-[15px] sm:text-[16px] text-neutral-600 leading-relaxed font-normal">
                        {(sec.text || '').split('\n\n').filter(Boolean).map((para: string, pIdx: number) => (
                          <p key={pIdx}>{renderFormattedText(para)}</p>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* QUALITY: REGULATORY AFFAIRS SUPPORT (third section) - copy + bullets beside the roadmap graphic */}
      {qualityRegulatoryIdx >= 0 && (() => {
        const reg = sections[qualityRegulatoryIdx];
        const regParagraphs = (reg.text || '').split('\n\n').filter(Boolean);
        const regBullets = (reg.bullets || []).filter(Boolean);
        const regMedia = reg.video || reg.image || reg.images?.[0] || '';

        return (
          <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/60 border-b border-neutral-100">
            <div className="w-full max-w-[1700px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
                {/* Left Column: Regulatory Content & Capabilities */}
                <Reveal delay={0.05} className="lg:col-span-5 xl:col-span-4">
                  <div>
                    {reg.subtitle && (
                      <span className="inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-bold tracking-wider bg-brand-blue/10 text-brand-blue border border-brand-blue/20 mb-4">
                        {reg.subtitle}
                      </span>
                    )}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.15] mb-5">
                      {reg.title}
                    </h2>
                    <div className="h-1 w-12 bg-brand-blue rounded-full mb-6" />
                    {regParagraphs.map((para: string, pIdx: number) => (
                      <p
                        key={pIdx}
                        className={`text-[15px] sm:text-[16px] xl:text-[17px] text-neutral-600 leading-relaxed font-normal ${pIdx === regParagraphs.length - 1 ? 'mb-8' : 'mb-4'}`}
                      >
                        {renderFormattedText(para)}
                      </p>
                    ))}

                    {regBullets.length > 0 && (
                      <div className="pt-6 border-t border-neutral-200/80">
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-4">
                          {reg.bulletsTitle || bulletsLabel}
                        </span>
                        <ul className="space-y-3">
                          {regBullets.map((cap: string, cIdx: number) => (
                            <li key={cIdx} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                              </div>
                              <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                                {renderFormattedText(cap)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Reveal>

                {/* Right Column: Full-Bleed Roadmap Graphic Card */}
                {regMedia && (
                  <Reveal delay={0.1} className="lg:col-span-7 xl:col-span-8">
                    <div className="relative w-full rounded-2xl border border-neutral-200/90 shadow-xl bg-white p-1.5 sm:p-2.5 md:p-3 overflow-hidden flex items-center justify-center">
                      {isVideoUrl(regMedia) ? (
                        <video
                          src={regMedia}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-auto block object-contain rounded-xl"
                        />
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={regMedia}
                          alt={`${reg.title} — CMC Biologics Roadmap`}
                          className="w-full h-auto block object-contain rounded-xl drop-shadow-xs"
                        />
                      )}
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Editorial image + text rows (facility pages, careers, extra sections on leadership) */}
      {narrative}

      {/* Any other section an editor adds renders generically */}
      {genericIdx.map((secIdx) => (
        <DynamicSectionRenderer itemIcons={page.itemIcons}
          key={sections[secIdx].id || secIdx}
          section={sections[secIdx]}
          index={secIdx}
          pageSlug={page.slug}
          category={page.category}
        />
      ))}

      {/* FAQ Accordion (Bottom Section) */}
      {page.faqs && page.faqs.length > 0 && (
        <FAQSection
          faqs={page.faqs}
          title={page.faqTitle || (page.category === 'home' ? 'Common Questions' : 'Frequently Asked Questions')}
          subtitle={page.faqSubtitle || 'Answers to key questions regarding our biologics development platform, regulatory alignment, and facility infrastructure.'}
          buttonText={page.faqButtonText}
          buttonLink={page.faqButtonLink}
        />
      )}

      {/* CTA (page record: ctaTitle, ctaSubtitle, primaryCta, secondaryCta) */}
      <PageCTA page={page} />
    </>
  );
}
