import { withBase } from '@/lib/basePath';
import Link from 'next/link';
import {
  ArrowRight,
  Activity,
  Beaker,
  Dna,
  FlaskConical,
  Microscope,
  Search,
  Filter,
  Layers,
  FileCheck,
  ShieldCheck,
  Atom,
  Sliders,
  TestTubes,
  ShieldAlert,
  Droplets,
  LineChart,
  Award,
  Share2,
  Maximize2,
  Repeat,
  Zap,
  Workflow,
  GitMerge,
  type LucideIcon,
} from 'lucide-react';
import { getModalityIcon } from '@/components/icons/CapabilityIcons';
import Reveal from '@/components/Reveal';
import FAQSection from '@/components/FAQSection';
import PageCTA from '@/components/PageCTA';
import EquipmentCarousel from '@/components/EquipmentCarousel';
import DynamicSectionRenderer from '@/components/DynamicSectionRenderer';
import { getPageEquipment } from '@/data/equipmentData';
import type { CDMOPage, CDMOSection } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';
import { makePageText, slotsForPage } from '@/lib/pageText';
import { SERVICES_TEXT_SLOTS, MODALITIES_BLOCK_DEFAULTS } from '@/data/textSlots/services';
import { getHeroMedia, getSectionMedia, partitionSections, toCarouselItems } from './cmsMedia';
import { pickIcon } from '@/components/icons/SiteIcon';
import { getBulletSvgIcon, getBulletCapabilityIcon, getServiceSectionIcon } from '@/lib/autoIcons';

interface ServiceLayoutProps {
  page: CDMOPage;
  /** Kept for the shared layout signature; sections are read from the page record itself. */
  content?: PageContent;
}




export default function ServiceLayout({ page }: ServiceLayoutProps) {
  const t = makePageText(page, SERVICES_TEXT_SLOTS);
  // Editable copy where the page has a slot registered; the stock wording anywhere else.
  const pageSlotKeys = new Set(slotsForPage(page, SERVICES_TEXT_SLOTS).map((slot) => slot.key));
  const slotText = (key: string, fallback: string) => (pageSlotKeys.has(key) ? t(key) : fallback);
  const isProcess = page.slug === 'process' || page.slug === 'process-development';
  const isAnalytical = page.slug === 'analytical' || page.slug === 'analytical-development';
  const isCellLine = page.slug === 'cell-line' || page.slug === 'cell-line-development';

  const hidePointerIcons = isProcess || isAnalytical;
  const hideHeaderIcons = isAnalytical;

  // Hero media comes from the page record: a video, the `images` carousel, or the single `image`.
  const { video: heroVideo, slides: heroSlides } = getHeroMedia(page);
  // Only used when the record holds no hero media at all.
  const fallbackHeroEquipment = !heroVideo && heroSlides.length === 0 ? getPageEquipment(page.slug) : null;

  // Every section of the record renders once: feature-split sections as capability cards below,
  // any other style through DynamicSectionRenderer just before the FAQ block.
  const { split: splitSections, other: otherSections } = partitionSections(page);

  const tagline = 'We find it';
  const taglineAt = page.heading.indexOf(tagline);

  const renderBullets = (section: CDMOSection, gridClass: string) => {
    if (!section.bullets || section.bullets.length === 0) return null;
    return (
      <div className={section.text ? "pt-5 border-t border-neutral-100" : ""}>
        {section.bulletsTitle && (
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 block mb-3">
            {section.bulletsTitle}
          </span>
        )}
        <div className={gridClass}>
          {section.bullets.map((b: string, bIdx: number) => {
            // An icon chosen in the admin panel wins over the client SVGs and the automatic icon
            const chosenIcon = pickIcon(page.itemIcons, b, null) as LucideIcon | null;
            const svgIcon = !chosenIcon && isCellLine ? getBulletSvgIcon(b) : null;
            const BulletIcon = chosenIcon || getBulletCapabilityIcon(b, bIdx);
            return (
              <div
                key={bIdx}
                className="group/pill flex items-center gap-3.5 p-3.5 rounded-[8px] bg-neutral-50 border border-neutral-200/70 hover:border-brand-yellow hover:bg-white transition-all duration-200"
              >
                {!hidePointerIcons && (
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover/pill:bg-brand-yellow group-hover/pill:border-brand-yellow transition-colors duration-200 p-2">
                    {svgIcon ? (
                      <img
                        src={withBase(svgIcon)}
                        alt=""
                        aria-hidden="true"
                        // The client SVGs have a fixed blue stroke; brightness(0) turns them black on hover like the other icons
                        className="w-5 h-5 object-contain transition-[filter] duration-200 group-hover/pill:brightness-0"
                      />
                    ) : (
                      <BulletIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-brand-blue group-hover/pill:text-black transition-colors duration-200" />
                    )}
                  </div>
                )}
                <span className="text-sm sm:text-base font-medium text-neutral-900 leading-snug group-hover/pill:text-black">
                  {b}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-molecules-hero overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8">
            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">{page.category}</span>
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
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05]">
                {taglineAt >= 0 ? (
                  <>
                    <span className="text-neutral-900">{page.heading.slice(0, taglineAt).trim()}</span>
                    <br />
                    <span>{page.heading.slice(taglineAt).trim()}</span>
                  </>
                ) : (
                  <>
                    <span className="text-neutral-900">{page.heading.split(' ')[0]}</span>
                    {` ${page.heading.split(' ').slice(1).join(' ')}`}
                  </>
                )}
              </h1>
              <div className="text-[17px] text-slate-500 font-normal leading-relaxed mt-6 max-w-2xl space-y-3">
                {page.description.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </div>
            <Reveal delay={0.1} className="w-full">
              {heroVideo ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-neutral-950">
                  <video
                    src={withBase(heroVideo)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover brightness-[1.05] contrast-[1.03]"
                  />
                </div>
              ) : heroSlides.length > 1 ? (
                <EquipmentCarousel items={toCarouselItems(heroSlides)} sectionTitle={page.heading} />
              ) : fallbackHeroEquipment && fallbackHeroEquipment.length > 0 ? (
                <EquipmentCarousel items={fallbackHeroEquipment} sectionTitle={page.heading} />
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-white">
                  <img
                    src={withBase(heroSlides[0] || '/images/hero_cleanroom.png')}
                    alt={page.title}
                    className="w-full h-full object-cover brightness-[1.05] contrast-[1.03]"
                  />
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* TECHNICAL FOCUS AREAS — HORIZONTAL SECTIONS WITH KEY CAPABILITIES ICONS */}
      {splitSections.length > 0 && (
      <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="flex flex-col gap-10 md:gap-14">
            {splitSections.map((section, idx) => {
              const AutoIcon = getServiceSectionIcon(section.title || '', idx);
              const Icon = pickIcon(page.itemIcons, section.title || '', AutoIcon) as LucideIcon;

              const imageRight = idx % 2 === 1;
              const { video, slides } = getSectionMedia(section);
              const hasMedia = Boolean(video) || slides.length > 0;

              const header = (
                <div className="flex items-center gap-3 mb-4">
                  {!hideHeaderIcons && (
                    <span className="w-11 h-11 rounded-[10px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-brand-blue" />
                    </span>
                  )}
                  <h3 className="text-2xl sm:text-3xl font-light md:font-normal tracking-tight text-neutral-900">
                    {section.title}
                  </h3>
                </div>
              );

              const subtitle = section.subtitle ? (
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block mb-3">
                  {section.subtitle}
                </span>
              ) : null;

              const media =
                slides.length > 1 ? (
                  <EquipmentCarousel items={toCarouselItems(slides)} sectionTitle={section.title} />
                ) : video ? (
                  <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-neutral-950 border border-neutral-200 shadow-sm">
                    <video
                      src={withBase(video)}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover brightness-[1.05] contrast-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-neutral-100 border border-neutral-200/90 shadow-inner group">
                    {slides[0] && (
                      <img
                        src={withBase(slides[0])}
                        alt={section.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[1.05] contrast-[1.03]"
                      />
                    )}
                  </div>
                );

              const mediaContent = (
                <>
                  {header}
                  {subtitle}
                  {section.text && (
                    <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed mb-6">
                      {section.text}
                    </p>
                  )}
                  {renderBullets(section, 'grid grid-cols-1 sm:grid-cols-2 gap-3.5')}
                </>
              );

              return (
                <Reveal key={section.id || idx} delay={idx * 0.08}>
                  {!hasMedia ? (
                    <div className="bg-white border border-neutral-200/80 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                      {/* Header */}
                      {header}

                      {subtitle}

                      {section.text && (
                        <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed w-full max-w-none mb-6">
                          {section.text}
                        </p>
                      )}

                      {renderBullets(section, 'grid grid-cols-1 md:grid-cols-2 gap-3.5')}

                      {section.footerText && (
                        <div className="mt-6 p-4 rounded-[8px] bg-neutral-50 border border-neutral-200/80 text-sm sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                          {section.footerText}
                        </div>
                      )}
                    </div>
                  ) : isProcess ? (
                    /* Process Development: columns follow reading order (carousel first on even cards, copy first on odd cards) */
                    <div className="bg-white border border-neutral-200/80 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${section.footerText ? 'mb-8' : ''}`}>
                        {!imageRight && <div className="lg:col-span-5">{media}</div>}
                        <div className="lg:col-span-7">{mediaContent}</div>
                        {imageRight && <div className="lg:col-span-5">{media}</div>}
                      </div>

                      {section.footerText && (
                        <div className="mb-6 p-4 rounded-[8px] bg-neutral-50 border border-neutral-200/80 text-sm sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                          {section.footerText}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white border border-neutral-200/80 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                        {/* Image Box */}
                        <div className={`lg:col-span-5 ${imageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                          {media}
                        </div>

                        {/* Content Box */}
                        <div className={`lg:col-span-7 ${imageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                          {mediaContent}
                        </div>

                      </div>

                      {section.footerText && (
                        <div className="mt-6 p-4 rounded-[8px] bg-neutral-50 border border-neutral-200/80 text-sm sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                          {section.footerText}
                        </div>
                      )}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* APPLICABLE MODALITIES */}
      {page.applicableModalities && page.applicableModalities.length > 0 && (
        <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/70 border-t border-neutral-200/80">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-2.5">
                  {slotText('modalitiesEyebrow', MODALITIES_BLOCK_DEFAULTS.eyebrow)}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  {slotText('modalitiesHeading', MODALITIES_BLOCK_DEFAULTS.heading)}
                </h2>
                <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-none md:whitespace-nowrap mx-auto mt-3">
                  {slotText('modalitiesIntro', MODALITIES_BLOCK_DEFAULTS.intro)}
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {page.applicableModalities.map((modality, mIdx) => {
                const ModIcon = pickIcon(page.itemIcons, modality.title || '', getModalityIcon(modality.title || ''));
                return (
                  <Reveal key={mIdx} delay={mIdx * 0.05} className="flex h-full">
                    <Link
                      href={modality.link || '#'}
                      className="group flex flex-col justify-between w-full h-full bg-white border border-neutral-200/80 rounded-[10px] p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-brand-yellow transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-200 mb-6">
                        <ModIcon className="w-6 h-6 text-brand-blue group-hover:text-black transition-colors duration-200" />
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 group-hover:text-brand-blue transition-colors duration-200 leading-snug">
                          {modality.title}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-blue group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Sections of any other style (added in the admin panel) */}
      {otherSections.length > 0 && (
        <div className="divide-y divide-neutral-100 border-t border-neutral-200">
          {otherSections.map((sec, idx) => (
            <DynamicSectionRenderer itemIcons={page.itemIcons}
              key={sec.id || idx}
              section={sec}
              index={idx}
              pageSlug={page.slug}
              category={page.category}
            />
          ))}
        </div>
      )}

      {/* FAQ Accordion (Bottom Section) */}
      {page.faqs && page.faqs.length > 0 && (
        <FAQSection
          faqs={page.faqs}
          title={page.faqTitle || 'Frequently Asked Questions'}
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
