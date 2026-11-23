import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Microscope, 
  Scale, 
  HeartPulse, 
  Bug, 
  ArrowRight, 
  Check,
  Target,
  Sliders,
  FlaskConical,
  Activity,
  ShieldCheck
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { getCapabilityIcon } from '@/components/icons/CapabilityIcons';
import Reveal from '@/components/Reveal';
import FAQSection from '@/components/FAQSection';
import CommonCTA from '@/components/CommonCTA';
import CardImageCarousel from '@/components/CardImageCarousel';
import DynamicSectionRenderer from '@/components/DynamicSectionRenderer';
import { getStoredPage } from '@/lib/pagesStorage';
import { makePageText } from '@/lib/pageText';
import { HUBS_TEXT_SLOTS } from '@/data/textSlots/hubs';
import type { CDMOPage } from '@/data/cdmoData';
import { pickIcon } from '@/components/icons/SiteIcon';

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('characterization', 'characterization', { previewDraft: isPreview, previewId: typeof resolvedSearchParams?.previewId === 'string' ? resolvedSearchParams.previewId : undefined });

  return {
    title: page?.metaTitle || page?.title || 'Analytical Characterization & Testing — Biologics Analytics | Lambda CDMO',
    description: page?.metaDesc || page?.description || 'Lambda CDMO provides analytical characterization and testing capabilities to support product understanding, process development, comparability, manufacturing, batch release, and stability assessment across biologics programs.',
  };
}

const ANALYTICAL_HERO_IMAGES = [
  '/images/Analytical/Octet.webp',
  '/images/Analytical/Orbitrap.webp',
  '/images/Analytical/Q ToF.webp',
  '/images/Analytical/Maurice.webp',
  '/images/Analytical/nanoDSF.webp',
  '/images/Analytical/UPLC.webp',
];

const DEFAULT_CHARACTERIZATION_SUB_SERVICES = [
  {
    title: 'Analytical Testing',
    slug: 'analytical-testing',
    href: '/characterization/analytical-testing',
    image: '/images/Analytical/UPLC.png',
    description: 'Reliable analytical testing for biologics drug substance and drug product, supporting in-process controls, batch release, stability programs, and regulatory compliance.',
    capabilities: [
      'Identity testing using peptide mapping, LC-MS, and immunological methods',
      'Purity and impurity analysis using SEC-HPLC, CE-SDS, and IEF',
      'Protein concentration analysis',
      'Potency testing using cell-based and ligand-binding assays'
    ],
  },
  {
    title: 'Physicochemical Characterization',
    slug: 'physicochemical',
    href: '/characterization/physicochemical-characterization',
    image: '/images/Analytical/Orbitrap.png',
    description: 'Comprehensive structural, molecular, and biophysical characterization to evaluate identity, purity, structural attributes, heterogeneity, stability, and product comparability.',
    capabilities: [
      'Primary structure analysis',
      'Intact mass and peptide mass analysis',
      'Disulfide bond characterization',
      'Glycan profiling'
    ],
  },
  {
    title: 'Bioassays & Immunogenicity Testing',
    slug: 'bioassays',
    href: '/characterization/bioassays-immunogenicity-testing',
    image: '/images/Analytical/Biacore 8K Plus.webp',
    description: 'Bioassay capabilities to evaluate biological activity, potency, binding, and functional properties of biologic products across development and manufacturing.',
    capabilities: [
      'Cell-based potency assays',
      'Reporter gene assays',
      'Binding assays',
      'ADCC and CDC functional assays'
    ],
  },
  {
    title: 'Microbiological Testing',
    slug: 'microbiological',
    href: '/characterization/microbiological-testing',
    image: '/images/Analytical/Microbiology Testing.webp',
    description: 'Controlled microbiological testing services supporting biologics manufacturing, environmental monitoring, bioburden reduction, and sterility assurance.',
    capabilities: [
      'Sterility testing',
      'Bioburden testing',
      'Bacterial endotoxin testing (BET)',
      'Environmental monitoring'
    ],
  },
];

// Fallback lifecycle block, used only when the page record is missing
const DEFAULT_LIFECYCLE_TITLE = 'Analytical Support Across the Development Lifecycle';
const DEFAULT_LIFECYCLE_TEXT = "Lambda CDMO's analytical capabilities support biologics programs from early product and reference characterization through process development, comparability, manufacturing, batch release, and stability assessment.";
const DEFAULT_LIFECYCLE_STEPS = [
  { step: 'Step 01', title: 'Reference Product Characterization', description: '' },
  { step: 'Step 02', title: 'Method Development & Qualification', description: '' },
  { step: 'Step 03', title: 'Product & Process Characterization', description: '' },
  { step: 'Step 04', title: 'Comparability / Analytical Similarity /Comparative Analytical Assessment', description: '' },
  { step: 'Step 05', title: 'In-Process & Release Testing', description: '' },
  { step: 'Step 06', title: 'Stability Assessment', description: '' },
];

// Fallback icons for lifecycle steps, by position (used only when a step has no drawn icon of its own)
const LIFECYCLE_ICONS = [Target, Sliders, FlaskConical, Scale, Activity, ShieldCheck];

// Icons for the hero quick-jump buttons, by position
const JUMP_ICONS = [Microscope, Scale, HeartPulse, Bug];

// Desktop column count follows the number of steps
const LIFECYCLE_GRID_COLS: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  7: 'lg:grid-cols-7',
  8: 'lg:grid-cols-8',
};

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

const DEFAULT_CHARACTERIZATION_FAQS = [
  {
    question: 'How does Lambda CDMO approach comparability and biosimilar similarity studies?',
    answer: 'We utilize a multi-tiered, orthogonal analytical characterization package comparing primary structure, higher-order structure, post-translational modifications (PTMs), charge/size heterogeneity, target binding kinetics, and functional bioassay potency against multiple reference product lots.',
  },
  {
    question: 'Are analytical methods qualified or validated according to ICH guidelines?',
    answer: 'Yes, all analytical methods are developed and validated in accordance with ICH Q2(R1) guidelines, covering specificity, linearity, accuracy, precision (repeatability and intermediate precision), range, limit of detection (LOD), and limit of quantitation (LOQ).',
  },
  {
    question: 'What stability conditions and programs are available for biologics?',
    answer: 'We offer ICH-compliant stability chambers covering real-time storage (5°C ± 3°C), accelerated storage (25°C/60% RH), stress testing (40°C/75% RH), and frozen/ultra-low storage (-20°C, -80°C) with validated stability-indicating methods.',
  },
  {
    question: 'Can you support forced degradation studies for critical quality attribute (CQA) identification?',
    answer: 'Yes, we perform structured forced degradation studies exposing molecules to thermal, pH (acid/base), oxidative, photolytic (ICH Q1B), and mechanical agitation stress to establish degradation pathways and validate method stability-indicating capability.',
  },
];

function getCharacterizationIcon(title: string, index: number) {
  const t = title.toLowerCase();
  if (t.includes('testing')) return Microscope;
  if (t.includes('physico')) return Scale;
  if (t.includes('bioassay') || t.includes('immun')) return HeartPulse;
  if (t.includes('microbio')) return Bug;
  const icons = [Microscope, Scale, HeartPulse, Bug];
  return icons[index % icons.length];
}

export default async function AnalyticalCharacterizationPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('characterization', 'characterization', { previewDraft: isPreview, previewId: typeof resolvedSearchParams?.previewId === 'string' ? resolvedSearchParams.previewId : undefined });

  const badge = page?.badge || 'ANALYTICAL CHARACTERIZATION AND TESTING';
  const heading = page?.heading || 'Analytical Insights that Advance Biologics Development';
  const hero = resolveHeroMedia(page, ANALYTICAL_HERO_IMAGES);
  const t = makePageText(page ?? ({ category: 'characterization', slug: 'characterization' } as CDMOPage), HUBS_TEXT_SLOTS);
  // Breadcrumb label: the part of the page title before the "—" (same convention as the detail pages)
  const breadcrumbLabel = page?.title?.split('—')[0].split('|')[0].trim() || 'Analytical Characterization and Testing';

  const descriptionParagraphs = page?.description
    ? page.description.split('\n\n').filter(Boolean)
    : [
        'Lambda CDMO provides analytical characterization and testing capabilities to support product understanding, process development, comparability, manufacturing, batch release, and stability assessment across biologics programs.',
        'Our analytical platform combines physicochemical, molecular, structural, biophysical, functional, and microbiological testing to generate data across development and manufacturing.'
      ];

  // Service cards: the bespoke cards section (by id, else the first section that has cards)
  const sections = page?.sections || [];
  const cardsSection = sections.find((s) => s.id === 'sec-char-pillars') || sections.find((s) => s.cards && s.cards.length > 0);
  const renderedCards = (cardsSection?.cards && cardsSection.cards.length > 0)
    ? cardsSection.cards.map((card, idx) => {
        const title = card.title || DEFAULT_CHARACTERIZATION_SUB_SERVICES[idx]?.title || `Capability ${idx + 1}`;
        return {
          title,
          slug: card.title?.toLowerCase().replace(/\s+/g, '-') || `cap-${idx + 1}`,
          href: card.link || card.href || DEFAULT_CHARACTERIZATION_SUB_SERVICES[idx]?.href || '/characterization',
          image: card.image || DEFAULT_CHARACTERIZATION_SUB_SERVICES[idx]?.image || '/images/Analytical/UPLC.png',
          description: card.description || DEFAULT_CHARACTERIZATION_SUB_SERVICES[idx]?.description || '',
          capabilities: (card.bullets && card.bullets.length > 0) ? card.bullets : (DEFAULT_CHARACTERIZATION_SUB_SERVICES[idx]?.capabilities || []),
          // Short label for the hero quick-jump button
          jumpLabel: card.badge || title,
          buttonText: card.buttonText || `Explore ${title}`,
        };
      })
    : DEFAULT_CHARACTERIZATION_SUB_SERVICES.map((card) => ({ ...card, jumpLabel: card.title, buttonText: `Explore ${card.title}` }));

  // Lifecycle block: the bespoke process-steps section (by id, else the first process-steps section)
  const lifecycleSection = sections.find((s) => s.id === 'sec-char-lifecycle')
    || sections.find((s) => s !== cardsSection && (s.style === 'process-steps' || (s.steps && s.steps.length > 0)));
  const lifecycleTitle = page ? (lifecycleSection?.title || '') : DEFAULT_LIFECYCLE_TITLE;
  const lifecycleText = page ? (lifecycleSection?.text || '') : DEFAULT_LIFECYCLE_TEXT;
  const lifecycleSteps = page ? (lifecycleSection?.steps || []) : DEFAULT_LIFECYCLE_STEPS;
  const showLifecycle = page ? Boolean(lifecycleSection) : true;

  // Any other section (added in the admin panel) renders generically before the FAQ block
  const extraSections = sections.filter((s) => s !== cardsSection && s !== lifecycleSection);

  const faqs = (page?.faqs && page.faqs.length > 0) ? page.faqs : DEFAULT_CHARACTERIZATION_FAQS;

  return (
    <main className="min-h-screen bg-white">
      {isPreview && (
        <div className="bg-amber-500 text-black text-xs font-bold px-4 py-2 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-sm">
          <span>⚠️ You are viewing an UNPUBLISHED DRAFT PREVIEW of the Characterization Hub Page. Regular visitors see the live published version.</span>
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
            <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">Services</span>
            <span>/</span>
            <span className="text-brand-orange">{breadcrumbLabel}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Badge: Orange Uppercase */}
              <span className="inline-block px-3.5 py-1.5 rounded-[10px] text-[11px] uppercase font-bold tracking-wider bg-brand-orange text-white mb-6 shadow-xs">
                {badge}
              </span>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.08]">
                <span className="text-neutral-900">{heading}</span>
              </h1>

              {/* Text */}
              <div className="space-y-4 text-[16px] sm:text-[17px] text-slate-600 font-normal leading-relaxed mt-6 max-w-2xl">
                {descriptionParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Quick Jump Buttons — one per service card (label = card tag, link = card link) */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {renderedCards.map((service, idx) => {
                  const JumpIcon = pickIcon(page?.itemIcons, service.title, JUMP_ICONS[idx % JUMP_ICONS.length]) as LucideIcon;
                  const isOrange = idx % 2 === 1;
                  return (
                    <Link
                      key={`${service.slug}-${idx}`}
                      href={service.href}
                      className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-neutral-900 ${isOrange ? 'hover:bg-brand-orange' : 'hover:bg-brand-blue'} text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all`}
                    >
                      <JumpIcon className={`w-4 h-4 ${isOrange ? 'text-brand-orange' : 'text-brand-blue'} group-hover:text-white transition-colors`} />
                      <span>{service.jumpLabel}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-white group">
                  {hero.video ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                      <video src={hero.video} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <CardImageCarousel
                      images={hero.images}
                      alt={page?.title || 'Lambda CDMO Analytical Characterization and Testing'}
                      aspectRatio="aspect-[4/3]"
                    />
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ANALYTICAL SUPPORT ACROSS THE DEVELOPMENT LIFECYCLE — the "process-steps" section of the page record */}
      {showLifecycle && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-20 bg-white border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            {(lifecycleTitle || lifecycleSection?.subtitle || lifecycleText) && (
              <Reveal>
                <div className="text-center mb-12 md:mb-16">
                  {lifecycleSection?.subtitle && (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-3 block">
                      {lifecycleSection.subtitle}
                    </span>
                  )}
                  {lifecycleTitle && (
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                      {lifecycleTitle}
                    </h2>
                  )}
                  {lifecycleText && (
                    <p className="text-[15px] sm:text-[16px] lg:text-[16.5px] text-slate-600 font-normal leading-relaxed w-full max-w-none mx-auto mt-4 whitespace-normal lg:whitespace-nowrap">
                      {lifecycleText}
                    </p>
                  )}
                </div>
              </Reveal>
            )}

            {/* Stepped Lifecycle Flow */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${LIFECYCLE_GRID_COLS[lifecycleSteps.length] || 'lg:grid-cols-6'} gap-4 lg:gap-3.5`}>
              {lifecycleSteps.map((item, idx) => {
                // Drawn icon matched to the step's subject; stock icon by position as a fallback
                const IconComponent = pickIcon(page?.itemIcons, item.title || '', getCapabilityIcon(item.title || '') || LIFECYCLE_ICONS[idx % LIFECYCLE_ICONS.length]) as LucideIcon;
                return (
                  <Reveal key={idx} delay={idx * 0.05} className="h-full">
                    <div className="group h-full bg-neutral-50/80 border border-neutral-200/80 hover:border-brand-blue rounded-[12px] p-5 flex flex-col items-center text-center shadow-xs hover:shadow-xl hover:bg-white transition-all duration-300">
                      {item.step && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-4 bg-white px-2.5 py-0.5 rounded-full border border-neutral-200/60 group-hover:border-brand-blue/30 group-hover:text-brand-blue transition-colors">
                          {item.step}
                        </span>
                      )}

                      {/* ICON CONTAINER */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[16px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mb-4 group-hover:bg-brand-blue group-hover:scale-105 transition-all duration-300">
                        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-brand-blue group-hover:text-white transition-colors duration-300" />
                      </div>

                      <h3 className="text-sm sm:text-base font-semibold text-neutral-900 leading-snug group-hover:text-brand-blue transition-colors flex-1 flex items-center justify-center">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-[13px] text-slate-600 font-normal leading-relaxed mt-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4 CORE CHARACTERIZATION & TESTING PILLARS */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-molecules border-b border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          {/* Optional section header — only shown when the cards section has a heading, tag or intro text */}
          {cardsSection && (cardsSection.title || cardsSection.subtitle || cardsSection.text) && (
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                {cardsSection.subtitle && (
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-3 block">
                    {cardsSection.subtitle}
                  </span>
                )}
                {cardsSection.title && (
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                    {cardsSection.title}
                  </h2>
                )}
                {cardsSection.text && (
                  <p className="text-[15px] sm:text-[16px] text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mt-4">
                    {cardsSection.text}
                  </p>
                )}
              </div>
            </Reveal>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {renderedCards.map((service, idx) => {
              const ServiceIcon = pickIcon(page?.itemIcons, service.title, getCharacterizationIcon(service.title, idx)) as LucideIcon;
              return (
                <Reveal key={service.slug || idx} delay={idx * 0.1}>
                  <div className="group h-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
                    {/* Header Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/20 to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-white">
                        <div className="w-9 h-9 rounded-lg bg-brand-orange text-white flex items-center justify-center shrink-0 shadow-sm">
                          <ServiceIcon className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                      <div>
                        <p className="text-[14.5px] text-slate-600 leading-relaxed mb-6 font-normal">
                          {service.description}
                        </p>

                        {service.capabilities && service.capabilities.length > 0 && (
                          <div className="border-t border-neutral-100 pt-5 mb-6">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block mb-3.5">
                              {t('cardsBulletsLabel')}
                            </span>
                            <ul className="space-y-3">
                              {service.capabilities.map((cap, cIdx) => (
                                <li key={cIdx} className="flex items-start gap-2.5 text-[13.5px] text-neutral-700 font-normal">
                                  <div className="w-4 h-4 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  </div>
                                  <span>{cap}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-neutral-100">
                        <Link
                          href={service.href}
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-50 hover:bg-brand-orange text-neutral-900 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all group/btn shadow-2xs"
                        >
                          <span>{service.buttonText}</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
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

      {/* FAQS */}
      <FAQSection 
        faqs={faqs} 
        title={page?.faqTitle}
        subtitle={page?.faqSubtitle}
        buttonText={page?.faqButtonText}
        buttonLink={page?.faqButtonLink}
      />

      {/* CTA */}
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
