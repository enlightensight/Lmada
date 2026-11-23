import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Building2, 
  Factory, 
  ArrowRight, 
  Check
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import CDMOLocationsMapSection from '@/components/CDMOLocationsMapSection';
import FacilityHeroCarousel from '@/components/FacilityHeroCarousel';
import FAQSection from '@/components/FAQSection';
import CommonCTA from '@/components/CommonCTA';
import DynamicSectionRenderer from '@/components/DynamicSectionRenderer';
import { getStoredPage } from '@/lib/pagesStorage';
import { makePageText } from '@/lib/pageText';
import { HUBS_TEXT_SLOTS } from '@/data/textSlots/hubs';
import type { CDMOPage } from '@/data/cdmoData';

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('facility&location', 'facility&location', { previewDraft: isPreview, previewId: typeof resolvedSearchParams?.previewId === 'string' ? resolvedSearchParams.previewId : undefined });

  return {
    title: page?.metaTitle || page?.title || 'Facility and Locations — Biologics Development & Manufacturing | Lambda CDMO',
    description: page?.metaDesc || page?.description || 'Lambda CDMO operates across Ahmedabad, India, and London, UK, bringing together complementary capabilities in biologics development, analytical sciences, process development, and GMP manufacturing.',
  };
}

interface CapabilityRow {
  capability: string;
  ahmedabad: string;
  london: string;
}

/**
 * Capability matrix rows come from the "matrixRows" text slot, one row per line:
 *   Capability | Ahmedabad column | London column
 * "✓" renders a tick, "—" (or an empty cell) a dash, any other text a label.
 */
function parseMatrixRows(raw: string): CapabilityRow[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [capability = '', ahmedabad = '', london = ''] = line.split('|').map((cell) => cell.trim());
      return { capability, ahmedabad, london };
    })
    .filter((row) => row.capability);
}
const isTick = (value: string) => /^(✓|✔|yes|y)$/i.test(value);
const isDash = (value: string) => value === '' || /^(—|–|-|no|n)$/i.test(value);

/** One entry of the locations section (`sections[].locations[]`). */
interface HubLocation {
  name?: string;
  tag?: string;
  city?: string;
  badge?: string;
  description?: string;
  image?: string;
  link?: string;
  href?: string;
  buttonText?: string;
  bullets?: string[];
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const DEFAULT_HERO_IMAGES = ['/images/uk/uksite.webp', '/images/ahmedabadsite.webp'];
const VIDEO_URL = /\.(mp4|webm|ogg|mov)$/i;

/** Hero media from the record: a video (heroVideo, or a video URL in image) or the image carousel (image first, then images[]). */
function resolveHeroMedia(page: CDMOPage | null, fallbackImages: string[]) {
  const imageIsVideo = Boolean(page?.image && VIDEO_URL.test(page.image));
  const video = page?.heroMediaType === 'image' ? '' : (page?.heroVideo || (imageIsVideo ? page?.image : '') || '');
  const gallery = (page?.images || []).filter(Boolean);
  const lead = page?.image && !imageIsVideo ? page.image : '';
  const images = lead && !gallery.includes(lead) ? [lead, ...gallery] : gallery;
  return { video, images: images.length > 0 ? images : fallbackImages };
}

const DEFAULT_FACILITY_FAQS = [
  {
    question: 'How do Lambda CDMO’s Ahmedabad and London facilities collaborate on a single program?',
    answer: 'Our multi-site model allows sponsors to initiate clone screening, analytical development, and early process characterisation in our London facility, followed by seamless technology transfer to our Ahmedabad cGMP suites for scale-up (up to 2 × 200 L single-use bioreactors) and automated isolator fill-finish.',
  },
  {
    question: 'What regulatory standards do the facilities comply with?',
    answer: 'Both facilities operate under a harmonized quality management system aligned with US FDA (21 CFR Part 210/211/11), EMA cGMP (EudraLex Volume 4, Annex 1), PMDA, and TGA requirements for global clinical and commercial submissions.',
  },
  {
    question: 'What filling and packaging formats are supported at the Ahmedabad GMP facility?',
    answer: 'The drug product platform in Ahmedabad features a robotic isolator filling line supporting vials, pre-filled syringes (PFS), and cartridges with automated visual inspection and secondary packaging capabilities.',
  },
  {
    question: 'Can sponsors visit or audit the facilities?',
    answer: 'Yes, we welcome sponsor on-site technical visits, vendor qualification audits, and remote virtual audits with full access to our quality management and batch release documentation.',
  },
];

export default async function FacilityAndLocationPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('facility&location', 'facility&location', { previewDraft: isPreview, previewId: typeof resolvedSearchParams?.previewId === 'string' ? resolvedSearchParams.previewId : undefined });

  const badge = page?.badge || 'Facility & Locations';
  const heading = page?.heading || 'Biologics Development and Manufacturing Across India and Europe';
  const descriptionParagraphs = page?.description
    ? page.description.split('\n\n').filter(Boolean)
    : [
        'Lambda CDMO operates across Ahmedabad, India, and London, UK, bringing together complementary capabilities in biologics development, analytical sciences, process development, and GMP manufacturing.',
        'Our facilities support with a strong focus, different aspects of biologics development, with Ahmedabad providing an integrated development and GMP manufacturing platform and London providing specialized biologics development and analytical capabilities, for drug substance process development and process characterisation.'
      ];

  const faqs = (page?.faqs && page.faqs.length > 0) ? page.faqs : DEFAULT_FACILITY_FAQS;

  const hero = resolveHeroMedia(page, DEFAULT_HERO_IMAGES);
  const t = makePageText(page ?? ({ category: 'facility&location', slug: 'facility&location' } as CDMOPage), HUBS_TEXT_SLOTS);
  // Breadcrumb label: the part of the page title before the "—" (same convention as the detail pages)
  const breadcrumbLabel = page?.title?.split('—')[0].split('|')[0].trim() || 'Facility & Locations';

  // Locations (globe) section: by id, else by style, else the first section that has locations[]
  const sections = page?.sections || [];
  const locationsSection = sections.find((s) => s.id === 'sec-facility-locations')
    || sections.find((s) => s.style === 'dual-locations-map' || s.style === 'locations-map')
    || sections.find((s) => Array.isArray(s.locations) && s.locations.length > 0);
  const showLocations = page ? Boolean(locationsSection) : true;
  // Entries come from locations[]; a section edited as "locations-map" cards (title/description/…) works too
  const locations: HubLocation[] = Array.isArray(locationsSection?.locations) && locationsSection.locations.length > 0
    ? locationsSection.locations
    : (locationsSection?.cards || []).map((card) => ({
        name: card.title,
        description: card.description,
        badge: card.badge,
        image: card.image,
        link: card.link || card.href,
        buttonText: card.buttonText,
        bullets: card.bullets,
      }));
  const mapCards = locations.slice(0, 2).map((loc) => ({
    title: loc.name,
    tabLabel: loc.tag,
    pinLabel: loc.city,
    description: loc.description,
    image: loc.image,
    link: loc.link || loc.href,
    buttonText: loc.buttonText,
    bullets: loc.bullets,
    secondaryButtonText: loc.secondaryButtonText,
    secondaryButtonLink: loc.secondaryButtonLink,
  }));
  const mapTitle = locationsSection?.title || '';
  const mapText = locationsSection?.text || locationsSection?.subtitle || '';

  const location1Link = locations[0]?.link || locations[0]?.href || '/facility&location/India';
  const location2Link = locations[1]?.link || locations[1]?.href || '/facility&location/UK';
  const matrixRows = parseMatrixRows(t('matrixRows'));

  // Any other section (added in the admin panel) renders generically before the FAQ block
  const extraSections = sections.filter((s) => s !== locationsSection);

  return (
    <main className="min-h-screen bg-white">
      {isPreview && (
        <div className="bg-amber-500 text-black text-xs font-bold px-4 py-2 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-sm">
          <span>⚠️ You are viewing an UNPUBLISHED DRAFT PREVIEW of the Facility & Locations Hub Page. Regular visitors see the live published version.</span>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 border-b border-neutral-100">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        
        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-12 md:pt-20 md:pb-16">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8">
            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brand-yellow">{breadcrumbLabel}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                {badge}
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05]">
                {heading}
              </h1>

              <div className="space-y-4 text-[17px] text-slate-600 font-normal leading-relaxed mt-6 max-w-xl">
                {descriptionParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Quick Facility Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href={location1Link}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-brand-orange hover:bg-brand-orange-hover text-black font-semibold text-xs uppercase tracking-wider shadow-sm transition-all group"
                >
                  <Factory className="w-4 h-4" />
                  <span>{t('heroButton1Label')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={location2Link}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold text-xs uppercase tracking-wider shadow-sm transition-all group"
                >
                  <Building2 className="w-4 h-4" />
                  <span>{t('heroButton2Label')}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <Reveal delay={0.1}>
              {hero.video ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-neutral-900">
                  <video src={hero.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                </div>
              ) : (
                <FacilityHeroCarousel images={hero.images} alt={page?.title} />
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MAP SECTION WITH UK & INDIA HIGHLIGHTED */}
      {showLocations && (
        <CDMOLocationsMapSection
          hideHeader={!mapTitle && !mapText}
          title={mapTitle}
          subtitle={mapText || null}
          cards={mapCards}
        />
      )}

      {/* COMPLEMENTARY CAPABILITIES ACROSS TWO LOCATIONS — MATRIX TABLE */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-molecules border-b border-neutral-100">
        <div className="w-full max-w-[1600px] mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-16 w-full max-w-none mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-4 whitespace-normal lg:whitespace-nowrap">
                {t('matrixHeading')}
              </h2>
              <div className="h-1 w-16 bg-brand-yellow rounded-full mx-auto mb-5" />
              <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-slate-600 font-normal leading-relaxed w-full max-w-none mx-auto whitespace-normal lg:whitespace-nowrap">
                {t('matrixIntro')}
              </p>
            </div>
          </Reveal>

          {/* TABLE CONTAINER */}
          <Reveal delay={0.1}>
            <div className="bg-white border border-neutral-200/90 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-neutral-50 via-slate-50 to-neutral-50 border-b border-neutral-200">
                      <th className="py-5 px-6 sm:px-8 text-sm sm:text-base font-bold text-neutral-900 w-1/2">
                        {t('matrixCapabilityHeader')}
                      </th>
                      <th className="py-5 px-6 sm:px-8 text-center border-l border-neutral-200/80 w-1/4">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xs uppercase font-semibold text-brand-orange tracking-wider">{locations[0]?.badge || 'India Facility'}</span>
                          <span className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-1.5 mt-0.5">
                            <Factory className="w-4 h-4 text-brand-orange shrink-0" />
                            <span>{locations[0]?.city || 'Ahmedabad'}</span>
                          </span>
                        </div>
                      </th>
                      <th className="py-5 px-6 sm:px-8 text-center border-l border-neutral-200/80 w-1/4">
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-xs uppercase font-semibold text-brand-blue tracking-wider">{locations[1]?.badge || 'UK Innovation Hub'}</span>
                          <span className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-1.5 mt-0.5">
                            <Building2 className="w-4 h-4 text-brand-blue shrink-0" />
                            <span>{locations[1]?.city || 'London'}</span>
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {matrixRows.map((row, idx) => (
                      <tr 
                        key={idx}
                        className={`transition-colors hover:bg-blue-50/40 ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50/40'
                        }`}
                      >
                        {/* Capability Name */}
                        <td className="py-4.5 px-6 sm:px-8 text-sm sm:text-[15px] font-medium text-neutral-900">
                          {row.capability}
                        </td>

                        {/* Ahmedabad Column */}
                        <td className="py-4.5 px-6 sm:px-8 text-center border-l border-neutral-100">
                          {isTick(row.ahmedabad) ? (
                            <div className="w-7 h-7 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange flex items-center justify-center mx-auto shadow-xs">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          ) : isDash(row.ahmedabad) ? (
                            <span className="text-neutral-400 font-bold text-lg select-none">
                              —
                            </span>
                          ) : (
                            <span className="text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-md">
                              {row.ahmedabad}
                            </span>
                          )}
                        </td>

                        {/* London Column */}
                        <td className="py-4.5 px-6 sm:px-8 text-center border-l border-neutral-100">
                          {isTick(row.london) ? (
                            <div className="w-7 h-7 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue flex items-center justify-center mx-auto shadow-xs">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          ) : isDash(row.london) ? (
                            <span className="text-neutral-400 font-bold text-lg select-none">
                              —
                            </span>
                          ) : (
                            <span className="inline-block text-xs sm:text-sm font-semibold text-brand-blue bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-md shadow-xs">
                              {row.london}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Actions */}
              <div className="p-6 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{t('matrixFootnote')}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={location1Link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange hover:underline"
                  >
                    <span>{t('matrixLink1Label')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-neutral-300">|</span>
                  <Link
                    href={location2Link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:underline"
                  >
                    <span>{t('matrixLink2Label')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ADDITIONAL CMS SECTIONS (added in the admin panel) */}
      {extraSections.map((sec, i) => (
        <DynamicSectionRenderer itemIcons={page?.itemIcons}
          key={sec.id || `extra-${i}`}
          section={sec}
          index={i}
          pageSlug={page?.slug}
          category={page?.category}
        />
      ))}

      {/* FAQS SECTION */}
      <FAQSection 
        faqs={faqs}
        title={page?.faqTitle}
        subtitle={page?.faqSubtitle}
        buttonText={page?.faqButtonText}
        buttonLink={page?.faqButtonLink}
      />

      {/* CTA SECTION */}
      <CommonCTA 
        title={page?.ctaTitle}
        subtitle={page?.ctaSubtitle}
        primaryButtonText={page?.primaryCta?.text}
        primaryButtonHref={page?.primaryCta?.link}
        secondaryButtonText={page?.secondaryCta?.text}
        secondaryButtonHref={page?.secondaryCta?.link}
      />
    </main>
  );
}
