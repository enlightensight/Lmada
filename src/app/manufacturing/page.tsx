import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Beaker, 
  Package, 
  ArrowRight, 
  Check,
  FlaskConical,
  Sliders,
  Filter,
  Sparkles,
  Eye,
  Truck
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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
import { WORKFLOW_ICONS, getManufacturingIcon } from '@/lib/autoIcons';

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('manufacturing', 'manufacturing', { previewDraft: isPreview, previewId: typeof resolvedSearchParams?.previewId === 'string' ? resolvedSearchParams.previewId : undefined });

  return {
    title: page?.metaTitle || page?.title || 'Manufacturing Services — cGMP Biomanufacturing & Clinical Supplies | Lambda CDMO',
    description: page?.metaDesc || page?.description || 'Lambda CDMO provides integrated manufacturing capabilities for biologics, supporting the transition from development into GMP drug substance and drug product manufacturing for clinical supplies.',
  };
}

const MANUFACTURING_HERO_IMAGES = [
  '/images/manufacturing/1-gmp-production-bioreactor.webp',
  '/images/manufacturing/2-gmp-seed-bioreactor.webp',
  '/images/downstream_GMP/300X300 Axichrom column(DSP25-0222).png',
  '/images/Stainless Steel NBD1 Control Cabinet.webp',
  '/images/upstream_GMP/50 L Single use mixer (SUM)(DSP25-0106).png',
  '/images/downstream_GMP/Automated TFF system with SUM(DSP25-0117).png',
  '/images/downstream_GMP/AKTA Pilot Chromatography system(DSP25-0116).png',
  '/images/Drugproductdev/Lyophilizer in FDL Lab.png',
];

const DEFAULT_MANUFACTURING_SUB_SERVICES = [
  {
    title: 'Drug Substance Manufacturing',
    slug: 'drug-substance',
    href: '/manufacturing/drug-substance-manufacturing',
    image: '/images/upstream_GMP/GMP Production bioreactor.png',
    description: 'Lambda CDMO provides cGMP drug substance manufacturing for biologics, supporting clinical development from First-in-Human (FIH) studies through later-phase programs.',
    capabilities: [
      'GMP seed train and production bioreactor operations',
      'Mammalian cell culture manufacturing',
      'Upstream and downstream processing',
      'Chromatographic purification and polishing'
    ],
  },
  {
    title: 'Drug Product Manufacturing',
    slug: 'drug-product',
    href: '/manufacturing/drug-product-manufacturing',
    image: '/images/insights/robotic_fill_finish.png',
    description: 'Lambda CDMO provides drug product manufacturing capabilities supporting the transition from bulk drug substance to finished clinical products across liquid and lyophilized forms.',
    capabilities: [
      'Formulation development and optimization',
      'Excipient compatibility studies',
      'GMP aseptic fill-finish operations',
      'Liquid and lyophilized dosage forms'
    ],
  },
];

// Fallback workflow, used only when the page record is missing
const DEFAULT_WORKFLOW_TITLE = 'From Bulk Drug Substance to Clinical Supply';
const DEFAULT_WORKFLOW_STEPS = [
  { step: 'Step 01', title: 'Drug Substance', description: '' },
  { step: 'Step 02', title: 'Formulation', description: '' },
  { step: 'Step 03', title: 'Filtration', description: '' },
  { step: 'Step 04', title: 'Aseptic Fill-Finish', description: '' },
  { step: 'Step 05', title: 'Inspection', description: '' },
  { step: 'Step 06', title: 'Packaging', description: '' },
  { step: 'Step 07', title: 'Clinical Supply', description: '' },
];


// Desktop column count follows the number of steps
const WORKFLOW_GRID_COLS: Record<number, string> = {
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

const DEFAULT_MANUFACTURING_FAQS = [
  {
    question: 'What batch scales and filling formats are supported at the Ahmedabad facility?',
    answer: 'Our drug substance facility operates single-use bioreactors up to 2 × 200 L scale. Our drug product aseptic suite features an automated robotic isolator supporting liquid and lyophilized vials (2R to 50R), prefilled syringes (0.5 mL to 5 mL), and cartridges (1.5 mL to 3 mL).',
  },
  {
    question: 'How do you prevent cross-contamination during multi-product operations?',
    answer: 'We utilize dedicated single-use disposable flow paths across upstream, downstream, and fill-finish operations. Combined with Grade A/B/C cleanroom zoning, directional pressure differentials, and continuous environmental monitoring, product cross-contamination is eliminated.',
  },
  {
    question: 'What regulatory standards govern the manufacturing facility?',
    answer: 'The Ahmedabad manufacturing facility operates under a harmonized Quality Management System compliant with US FDA (21 CFR Part 210, 211, and Part 11), EMA cGMP (EudraLex Vol 4, Annex 1), PIC/S, and WHO cGMP guidelines.',
  },
  {
    question: 'Do you support lyophilization cycle development and clinical scale freeze-drying?',
    answer: 'Yes, we provide formulation screening, thermal characterization (Tg/Tcc), lyophilization cycle development, and clinical-scale freeze-drying with automated loading/unloading inside our barrier isolator system.',
  },
];


export default async function ManufacturingServicesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('manufacturing', 'manufacturing', { previewDraft: isPreview, previewId: typeof resolvedSearchParams?.previewId === 'string' ? resolvedSearchParams.previewId : undefined });

  const badge = page?.badge || 'MANUFACTURING SERVICES';
  const heading = page?.heading || 'From Process Development to Clinical Manufacturing. Delivered with Confidence.';
  const hero = resolveHeroMedia(page, MANUFACTURING_HERO_IMAGES);
  const t = makePageText(page ?? ({ category: 'manufacturing', slug: 'manufacturing' } as CDMOPage), HUBS_TEXT_SLOTS);
  // Breadcrumb label: the part of the page title before the "—" (same convention as the detail pages)
  const breadcrumbLabel = page?.title?.split('—')[0].split('|')[0].trim() || 'Manufacturing Services';

  const descriptionParagraphs = page?.description
    ? page.description.split('\n\n').filter(Boolean)
    : [
        'Manufacturing success depends on process consistency, product quality, and effective technology transfer. Lambda CDMO provides integrated manufacturing capabilities for biologics, supporting the transition from development into GMP drug substance and drug product manufacturing for clinical supplies.',
        'Our manufacturing operations at Ahmedabad, India bring together process, analytical, manufacturing, and quality functions to support controlled execution, consistent product quality, and regulatory requirements across clinical programs.'
      ];

  // Service cards: the bespoke cards section (by id, else the first section that has cards)
  const sections = page?.sections || [];
  const cardsSection = sections.find((s) => s.id === 'sec-manufacturing-pillars') || sections.find((s) => s.cards && s.cards.length > 0);
  const renderedCards = (cardsSection?.cards && cardsSection.cards.length > 0)
    ? cardsSection.cards.map((card, idx) => {
        const title = card.title || DEFAULT_MANUFACTURING_SUB_SERVICES[idx]?.title || `Capability ${idx + 1}`;
        return {
          title,
          slug: card.title?.toLowerCase().replace(/\s+/g, '-') || `cap-${idx + 1}`,
          href: card.link || card.href || DEFAULT_MANUFACTURING_SUB_SERVICES[idx]?.href || '/manufacturing',
          image: card.image || DEFAULT_MANUFACTURING_SUB_SERVICES[idx]?.image || '/images/upstream_GMP/GMP Production bioreactor.png',
          description: card.description || DEFAULT_MANUFACTURING_SUB_SERVICES[idx]?.description || '',
          capabilities: (card.bullets && card.bullets.length > 0) ? card.bullets : (DEFAULT_MANUFACTURING_SUB_SERVICES[idx]?.capabilities || []),
          // Short label for the hero quick-jump button
          jumpLabel: card.badge || title,
          buttonText: card.buttonText || `Explore ${title}`,
        };
      })
    : DEFAULT_MANUFACTURING_SUB_SERVICES.map((card) => ({ ...card, jumpLabel: card.title, buttonText: `Explore ${card.title}` }));

  // Workflow block: the bespoke process-steps section (by id, else the first process-steps section)
  const workflowSection = sections.find((s) => s.id === 'sec-manufacturing-workflow')
    || sections.find((s) => s !== cardsSection && (s.style === 'process-steps' || (s.steps && s.steps.length > 0)));
  const workflowTitle = page ? (workflowSection?.title || '') : DEFAULT_WORKFLOW_TITLE;
  const workflowSteps = page ? (workflowSection?.steps || []) : DEFAULT_WORKFLOW_STEPS;
  const showWorkflow = page ? Boolean(workflowSection) : true;

  // Any other section (added in the admin panel) renders generically before the FAQ block
  const extraSections = sections.filter((s) => s !== cardsSection && s !== workflowSection);

  const faqs = (page?.faqs && page.faqs.length > 0) ? page.faqs : DEFAULT_MANUFACTURING_FAQS;

  return (
    <main className="min-h-screen bg-white">
      {isPreview && (
        <div className="bg-amber-500 text-black text-xs font-bold px-4 py-2 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-sm">
          <span>⚠️ You are viewing an UNPUBLISHED DRAFT PREVIEW of the Manufacturing Hub Page. Regular visitors see the live published version.</span>
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
                  const JumpIcon = pickIcon(page?.itemIcons, service.title, getManufacturingIcon(service.title, idx)) as LucideIcon;
                  const isOrange = idx % 2 === 1;
                  return (
                    <Link
                      key={`${service.slug}-${idx}`}
                      href={service.href}
                      className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-neutral-900 ${isOrange ? 'hover:bg-brand-orange' : 'hover:bg-brand-blue'} text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all`}
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
                      alt={page?.title || 'Lambda CDMO cGMP Biomanufacturing Facility'}
                      aspectRatio="aspect-[4/3]"
                    />
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* MANUFACTURING PILLARS — 2 LARGE CARDS */}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {renderedCards.map((service, idx) => {
              const ServiceIcon = pickIcon(page?.itemIcons, service.title, getManufacturingIcon(service.title, idx)) as LucideIcon;
              return (
                <Reveal key={service.slug || idx} delay={idx * 0.12}>
                  <div className="group h-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
                    {/* Header Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/25 to-transparent" />
                      
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
                                <li key={cIdx} className="flex items-start gap-2.5 text-[14px] text-neutral-700 font-normal">
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
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-brand-orange text-white font-semibold text-xs uppercase tracking-wider transition-all group/btn shadow-xs"
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

      {/* MANUFACTURING PROCESS FLOW — the "process-steps" section of the page record */}
      {showWorkflow && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-20 bg-white border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            {(workflowTitle || workflowSection?.subtitle || workflowSection?.text) && (
              <Reveal>
                <div className="text-center mb-10 md:mb-14">
                  {workflowSection?.subtitle && (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange mb-3 block">
                      {workflowSection.subtitle}
                    </span>
                  )}
                  {workflowTitle && (
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                      {workflowTitle}
                    </h2>
                  )}
                  {workflowSection?.text && (
                    <p className="text-[15px] sm:text-[16px] text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mt-4">
                      {workflowSection.text}
                    </p>
                  )}
                </div>
              </Reveal>
            )}

            {/* Big Icons Stepped Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${WORKFLOW_GRID_COLS[workflowSteps.length] || 'lg:grid-cols-7'} gap-4 lg:gap-3.5`}>
              {workflowSteps.map((item, idx) => {
                const IconComponent = pickIcon(page?.itemIcons, item.title || '', WORKFLOW_ICONS[idx % WORKFLOW_ICONS.length]) as LucideIcon;
                return (
                  <Reveal key={idx} delay={idx * 0.04} className="h-full">
                    <div className="group h-full bg-neutral-50/80 border border-neutral-200/80 hover:border-brand-blue rounded-[12px] p-5 flex flex-col items-center text-center shadow-xs hover:shadow-xl hover:bg-white transition-all duration-300">
                      {item.step && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-3 bg-white px-2.5 py-0.5 rounded-full border border-neutral-200/60 group-hover:border-brand-blue/30 group-hover:text-brand-blue transition-colors">
                          {item.step}
                        </span>
                      )}

                      {/* BIG ICON */}
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-[16px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 mb-4 group-hover:bg-brand-blue group-hover:scale-105 transition-all duration-300">
                        <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 text-brand-blue group-hover:text-white transition-colors duration-300" />
                      </div>

                      <h3 className="text-base sm:text-lg font-semibold text-neutral-900 leading-snug group-hover:text-brand-blue transition-colors">
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
