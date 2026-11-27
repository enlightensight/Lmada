import { withBase } from '@/lib/basePath';
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Dna,
  Settings,
  FlaskConical,
  ArrowRight,
  Check
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
import { getServiceIcon } from '@/lib/autoIcons';

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('services', 'services', { previewDraft: isPreview, previewId: typeof resolvedSearchParams?.previewId === 'string' ? resolvedSearchParams.previewId : undefined });

  return {
    title: page?.metaTitle || page?.title || 'Development Services — Biologics Development & Process Sciences | Lambda CDMO',
    description: page?.metaDesc || page?.description || 'Lambda CDMO brings together cell line development, upstream and downstream process development, and analytical development to establish robust processes and support efficient tech transfer.',
  };
}

const UPSTREAM_HERO_IMAGES = [
  '/images/upstream/AMBR250.webp',
  '/images/upstream/Bioreactor_control.webp',
  '/images/upstream/Biosaftey_cabinet.webp',
  '/images/upstream/Carbon_di_Oxide_shaker_incubator.png',
  '/images/upstream/Cedex_automated_cell_counter.webp',
];

const DEFAULT_SUB_SERVICES = [
  {
    title: 'Cell Line Development',
    slug: 'cell-line',
    href: '/services/cell-line-development',
    image: '/images/celldev/CLD_Lab.webp',
    description: 'A well-characterized, productive cell line provides the foundation for a robust biologics manufacturing process across mammalian expression platforms.',
    capabilities: [
      'Gene construct design and optimization',
      'Expression vector design and construction',
      'Stable cell pool generation',
      'Single-cell cloning for establishment of monoclonality'
    ],
  },
  {
    title: 'Process Development',
    slug: 'process',
    href: '/services/process-development',
    image: '/images/upstream/AMBR250.webp',
    description: 'Upstream and downstream processes with a focus on product quality, process robustness, scalability, and manufacturability from bench to pilot scale.',
    capabilities: [
      'Media and feed optimization',
      'Shake flask and bioreactor process development',
      'DoE-based process optimization',
      'Cell culture process optimization'
    ],
  },
  {
    title: 'Analytical Development',
    slug: 'analytical',
    href: '/services/analytical-development',
    image: '/images/Analytical/UPLC.png',
    description: 'Analytical methods supporting product and process development, comparability, stability assessment, and regulatory requirements.',
    capabilities: [
      'Analytical method development',
      'Method optimization',
      'Method qualification',
      'Method validation'
    ],
  },
];

const DEFAULT_DEVELOPMENT_FAQS = [
  {
    question: 'What mammalian cell expression systems are supported at Lambda CDMO?',
    answer: 'We support standard CHO expression platforms (including CHO-K1, CHO-GS, and CHO-DG44) as well as HEK293 systems, offering flexible, royalty-free, and high-titer production options for global clinical development.',
  },
  {
    question: 'How do you ensure monoclonality during cell line development?',
    answer: 'Monoclonality is guaranteed through high-resolution single-cell printing and verified by multi-timepoint brightfield microscopic imaging, delivering comprehensive documentation and audit-ready monoclonality assurance reports for regulatory agencies (US FDA, EMA, PMDA).',
  },
  {
    question: 'How are development processes transferred into cGMP manufacturing?',
    answer: 'Our integrated operating model bridges process development directly with our cGMP manufacturing suites at Ahmedabad. Analytical methods, process control parameters, and operational batch records undergo structured technology transfer protocols, supported by joint cross-functional teams.',
  },
  {
    question: 'Can you support biosimilar development and comparative characterization?',
    answer: 'Yes, we provide end-to-end biosimilar development including originator fingerprinting, Quality Target Product Profile (QTPP) establishment, iterative process tuning to match glycan/charge profiles, and state-of-the-art comparative analytical similarity assessment.',
  },
];

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


export default async function DevelopmentServicesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isPreview = resolvedSearchParams?.preview === 'true';
  const page = getStoredPage('services', 'services', { previewDraft: isPreview, previewId: typeof resolvedSearchParams?.previewId === 'string' ? resolvedSearchParams.previewId : undefined });

  const badge = page?.badge || 'DEVELOPMENT SERVICES';
  const heading = page?.heading || 'Development Designed for Manufacturing';
  const hero = resolveHeroMedia(page, UPSTREAM_HERO_IMAGES);
  const t = makePageText(page ?? ({ category: 'services', slug: 'services' } as CDMOPage), HUBS_TEXT_SLOTS);
  // Breadcrumb label: the part of the page title before the "—" (same convention as the detail pages)
  const breadcrumbLabel = page?.title?.split('—')[0].split('|')[0].trim() || 'Development Services';

  const descriptionParagraphs = page?.description
    ? page.description.split('\n\n').filter(Boolean)
    : [
      'Lambda CDMO brings together cell line development, upstream and downstream process development, and analytical development to establish robust processes, generate meaningful development data, and support efficient technology transfer into GMP manufacturing.',
      'Our development approach spans early-stage development through process characterization and technology transfer, with capabilities supporting monoclonal antibodies, bispecific antibodies, biosimilars, recombinant proteins, peptides, and other biologic modalities.'
    ];

  // Service cards: the bespoke cards section (by id, else the first section that has cards)
  const sections = page?.sections || [];
  const cardsSection = sections.find((s) => s.id === 'sec-services-pillars') || sections.find((s) => s.cards && s.cards.length > 0);
  const renderedCards = (cardsSection?.cards && cardsSection.cards.length > 0)
    ? cardsSection.cards.map((card, idx) => {
      const title = card.title || DEFAULT_SUB_SERVICES[idx]?.title || `Service ${idx + 1}`;
      return {
        title,
        slug: card.title?.toLowerCase().replace(/\s+/g, '-') || `service-${idx + 1}`,
        href: card.link || card.href || DEFAULT_SUB_SERVICES[idx]?.href || '/services',
        image: card.image || DEFAULT_SUB_SERVICES[idx]?.image || '/images/celldev/CLD_Lab.webp',
        description: card.description || DEFAULT_SUB_SERVICES[idx]?.description || '',
        capabilities: (card.bullets && card.bullets.length > 0) ? card.bullets : (DEFAULT_SUB_SERVICES[idx]?.capabilities || []),
        // Short label for the hero quick-jump button
        jumpLabel: card.badge || title,
        buttonText: card.buttonText || `Explore ${title}`,
      };
    })
    : DEFAULT_SUB_SERVICES.map((card) => ({ ...card, jumpLabel: card.title, buttonText: `Explore ${card.title}` }));

  // Any other section (added in the admin panel) renders generically before the FAQ block
  const extraSections = sections.filter((s) => s !== cardsSection);

  const faqs = (page?.faqs && page.faqs.length > 0) ? page.faqs : DEFAULT_DEVELOPMENT_FAQS;

  return (
    <main className="min-h-screen bg-white">
      {isPreview && (
        <div className="bg-amber-500 text-black text-xs font-bold px-4 py-2 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-sm">
          <span>⚠️ You are viewing an UNPUBLISHED DRAFT PREVIEW of the Services Hub Page. Regular visitors see the live published version.</span>
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

              {/* Dynamic Text */}
              <div className="space-y-4 text-[16px] sm:text-[17px] text-slate-600 font-normal leading-relaxed mt-6 max-w-2xl">
                {descriptionParagraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Quick Jump Buttons — one per service card (label = card tag, link = card link) */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {renderedCards.map((service, idx) => {
                  const JumpIcon = pickIcon(page?.itemIcons, service.title, getServiceIcon(service.title, idx)) as LucideIcon;
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
                      <video src={withBase(hero.video)} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <CardImageCarousel
                      images={hero.images}
                      alt={page?.title || 'Lambda CDMO Biologics Development Services'}
                      aspectRatio="aspect-[4/3]"
                    />
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CORE DEVELOPMENT PILLARS — CARDS */}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {renderedCards.map((service, idx) => {
              const ServiceIcon = pickIcon(page?.itemIcons, service.title, getServiceIcon(service.title, idx)) as LucideIcon;
              return (
                <Reveal key={service.slug || idx} delay={idx * 0.1}>
                  <div className="group h-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
                    {/* Header Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                      <Image
                        src={withBase(service.image)}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[1.05] contrast-[1.03]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent" />

                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5 text-white">
                        <div className="w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center shrink-0 shadow-sm">
                          <ServiceIcon className="w-4 h-4" />
                        </div>
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                      <div>
                        <p className="text-[14px] text-slate-600 leading-relaxed mb-6 font-normal">
                          {service.description}
                        </p>

                        {service.capabilities && service.capabilities.length > 0 && (
                          <div className="border-t border-neutral-100 pt-4 mb-6">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block mb-3">
                              {t('cardsBulletsLabel')}
                            </span>
                            <ul className="space-y-2.5">
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
