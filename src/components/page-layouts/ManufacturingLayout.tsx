import Link from 'next/link';
import {
  FlaskConical,
  ArrowRightLeft,
  type LucideIcon,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import PillarCard from '@/components/PillarCard';
import FAQSection from '@/components/FAQSection';
import PageCTA from '@/components/PageCTA';
import EquipmentCarousel from '@/components/EquipmentCarousel';
import DynamicSectionRenderer from '@/components/DynamicSectionRenderer';
import { getPageEquipment } from '@/data/equipmentData';
import type { CDMOPage, CDMOSection } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';
import { makePageText, slotsForPage } from '@/lib/pageText';
import { SERVICES_TEXT_SLOTS, DRUG_PRODUCT_CAROUSEL_SLIDE_COUNT } from '@/data/textSlots/services';
import { getHeroMedia, getSectionMedia, partitionSections, toCarouselItems } from './cmsMedia';
import { getListIcons, pickIcon } from '@/components/icons/SiteIcon';

interface ManufacturingLayoutProps {
  page: CDMOPage;
  /** Kept for the shared layout signature; sections are read from the page record itself. */
  content?: PageContent;
}

export default function ManufacturingLayout({ page }: ManufacturingLayoutProps) {
  // Drawn icons per capability point. The list gets icons only when every point has its own.
  const capabilityIcons = getListIcons(page.capabilities || [], page.itemIcons);
  const t = makePageText(page, SERVICES_TEXT_SLOTS);
  // Editable copy where the page has a slot registered; the stock wording anywhere else.
  const pageSlotKeys = new Set(slotsForPage(page, SERVICES_TEXT_SLOTS).map((slot) => slot.key));
  const slotText = (key: string, fallback: string) => (pageSlotKeys.has(key) ? t(key) : fallback);

  // Per-slug accent: drug-substance = blue, drug-product = yellow
  const isSubstance = page.slug === 'drug-substance';
  const isProduct = page.slug === 'drug-product';

  // Hero media comes from the page record: a video, the `images` carousel, or the single `image`.
  const { video: heroVideo, slides: heroSlides } = getHeroMedia(page);
  // Only used when the record holds no hero media at all.
  const fallbackHeroEquipment = !heroVideo && heroSlides.length === 0 ? getPageEquipment(page.slug) : null;

  // Drug Product capabilities card: carousel photos are "additional page content" slots.
  const capabilityCardSlides = isProduct
    ? Array.from({ length: DRUG_PRODUCT_CAROUSEL_SLIDE_COUNT }, (_, i) => slotText(`capabilitiesImage${i + 1}`, '')).filter(Boolean)
    : [];

  // Every section of the record renders once: feature-split sections in the block below,
  // any other style through DynamicSectionRenderer just before the FAQ block.
  const { split: splitSections, other: otherSections } = partitionSections(page);

  const renderSectionSubtitle = (section: CDMOSection) =>
    section.subtitle ? (
      <span className="text-xs font-bold uppercase tracking-wider text-brand-orange block mb-3">
        {section.subtitle}
      </span>
    ) : null;

  const renderSectionBullets = (section: CDMOSection, className = '') => {
    if (!section.bullets || section.bullets.length === 0) return null;
    const bulletIcons = getListIcons(section.bullets, page.itemIcons);
    return (
      <div className={className}>
        {section.bulletsTitle && (
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 block mb-3">
            {section.bulletsTitle}
          </span>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {section.bullets.map((b: string, bIdx: number) => {
            const Icon = bulletIcons?.[bIdx];
            return (
              <div
                key={bIdx}
                className="group/pill flex items-center gap-3.5 p-3.5 rounded-[8px] bg-neutral-50 border border-neutral-200/70 hover:border-brand-yellow hover:bg-white transition-all duration-200"
              >
                {Icon ? (
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 text-brand-blue group-hover/pill:bg-brand-yellow group-hover/pill:border-brand-yellow group-hover/pill:text-black transition-colors duration-200">
                    <Icon className="w-5 h-5" />
                  </div>
                ) : (
                  <span aria-hidden="true" className="w-1 self-stretch min-h-5 rounded-full bg-brand-blue/70 group-hover/pill:bg-brand-yellow transition-colors duration-200 shrink-0" />
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
      {/* HERO — light industrial band with image + stats bar */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">{page.category}</span>
            <span>/</span>
            <span className="text-brand-yellow">{page.title ? page.title.split('—')[0].split('|')[0].trim() : page.slug.replace(/-/g, ' ')}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {page.badge && (
                <span className={`inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-semibold tracking-wider mb-6 ${
                  isSubstance
                    ? 'bg-black/5 text-black border border-black/20'
                    : 'bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30'
                }`}>
                  {page.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05] mb-6">
                {page.heading}
              </h1>
              <div className="text-[17px] text-slate-500 font-normal leading-relaxed max-w-xl space-y-3">
                {page.description.split('\n\n').map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </div>
            <Reveal className="w-full">
              {heroVideo ? (
                <div className="w-full aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-2xl bg-neutral-950 relative">
                  <video
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : heroSlides.length > 1 ? (
                <EquipmentCarousel items={toCarouselItems(heroSlides)} sectionTitle={page.heading} />
              ) : fallbackHeroEquipment && fallbackHeroEquipment.length > 0 ? (
                <EquipmentCarousel items={fallbackHeroEquipment} sectionTitle={page.heading} />
              ) : (
                <div className="w-full aspect-[4/3] rounded-[10px] border border-neutral-200/90 shadow-xl overflow-hidden relative group">
                  <img
                    src={heroSlides[0] || '/images/hero_cleanroom.png'}
                    alt={page.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
            </Reveal>
          </div>
        </div>

      </section>

      {/* MANUFACTURING CAPABILITIES CHECKLIST GRID WITH RESEARCH SYMBOLS */}
      {page.capabilities && page.capabilities.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/60 border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            {!isProduct && (
              <Reveal>
                <div className="text-center mb-10 md:mb-14">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                    {slotText('capabilitiesHeading', 'Manufacturing Capabilities')}
                  </h2>
                  <p className="text-[15px] sm:text-[16px] xl:text-[17px] text-slate-500 font-normal leading-relaxed max-w-5xl xl:max-w-none lg:whitespace-nowrap mx-auto mt-4">
                    {slotText(
                      'capabilitiesIntro',
                      `cGMP cleanroom workflows, validated containment, and precision production systems for ${page.title.split('—')[0].trim()}.`
                    )}
                  </p>
                </div>
              </Reveal>
            )}

            {isProduct ? (
              <Reveal>
                <div className="bg-white border border-neutral-200/80 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* Left Image Box */}
                    <div className="lg:col-span-5">
                      <EquipmentCarousel items={toCarouselItems(capabilityCardSlides)} sectionTitle="Drug Product & Formulation Equipment" />
                    </div>

                    {/* Right Content Box */}
                    <div className="lg:col-span-7">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-light md:font-normal tracking-tight text-neutral-900 mb-6 leading-tight">
                          {slotText('capabilitiesHeading', 'Formulation Development & Drug Product Manufacturing Capabilities')}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {page.capabilities.map((cap, idx) => {
                            const Icon = capabilityIcons?.[idx];
                            return (
                              <div
                                key={idx}
                                className="group/pill flex items-center gap-3.5 p-3.5 rounded-[8px] bg-neutral-50 border border-neutral-200/70 hover:border-brand-yellow hover:bg-white transition-all duration-200"
                              >
                                {Icon ? (
                                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 text-brand-blue group-hover/pill:bg-brand-yellow group-hover/pill:border-brand-yellow group-hover/pill:text-black transition-colors duration-200">
                                    <Icon className="w-5 h-5" />
                                  </div>
                                ) : (
                                  <span aria-hidden="true" className="w-1 self-stretch min-h-5 rounded-full bg-brand-blue/70 group-hover/pill:bg-brand-yellow transition-colors duration-200 shrink-0" />
                                )}
                                <span className="text-sm sm:text-base font-medium text-neutral-900 leading-snug group-hover/pill:text-black">
                                  {cap}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </Reveal>
            ) : (
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {page.capabilities.map((cap, idx) => {
                  const Icon = capabilityIcons?.[idx];
                  return (
                    <Reveal key={idx} delay={idx * 0.03} className={`w-full sm:w-[calc(50%-12px)] ${page.slug === 'drug-substance' ? 'lg:w-[calc(33.333%-16px)]' : 'lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]'} flex`}>
                      <div className="group w-full h-full bg-white border border-neutral-200/80 rounded-[10px] p-6 shadow-sm hover:shadow-lg hover:border-brand-yellow transition-all duration-300 flex items-center gap-4">
                        {Icon ? (
                          <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 text-brand-blue group-hover:bg-brand-yellow group-hover:border-brand-yellow group-hover:text-black transition-colors duration-300">
                            <Icon className="w-6 h-6" />
                          </div>
                        ) : (
                          <span aria-hidden="true" className="w-1 self-stretch min-h-5 rounded-full bg-brand-blue/70 group-hover:bg-brand-yellow transition-colors duration-200 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-semibold text-neutral-900 leading-snug group-hover:text-brand-blue transition-colors duration-300">
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
      )}

      {/* CAPABILITIES — feature-split sections (pillar tiles on Drug Substance, media + copy otherwise) */}
      {splitSections.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
          <div className="w-full max-w-[1700px] mx-auto">
            <div className="flex flex-col gap-12 md:gap-20">
              {splitSections.map((section, idx) => {
                const { video, slides } = getSectionMedia(section);
                const hasMedia = Boolean(video) || slides.length > 0;
                const hasSecondary = Boolean(section.secondaryTitle || section.secondaryText);

                return (
                  <Reveal key={section.id || idx} delay={idx * 0.05}>
                    {isSubstance && !hasMedia ? (
                      <>
                        {renderSectionSubtitle(section)}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                          {/* Tile 1: section title + text */}
                          <PillarCard icon={pickIcon(page.itemIcons, section.title || '', ArrowRightLeft) as LucideIcon} title={section.title} text={section.text} accent="blue" />

                          {/* Tile 2: section secondary title + text */}
                          {hasSecondary && (
                            <PillarCard
                              icon={pickIcon(page.itemIcons, section.secondaryTitle || '', FlaskConical) as LucideIcon}
                              title={section.secondaryTitle || ''}
                              text={section.secondaryText}
                              accent="orange"
                            />
                          )}
                        </div>
                        {renderSectionBullets(section, 'mt-8')}
                      </>
                    ) : (
                      <div className={`grid grid-cols-1 ${hasMedia ? 'lg:grid-cols-2' : ''} gap-8 lg:gap-16 items-center`}>
                        {hasMedia && (
                          <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                            {slides.length > 1 ? (
                              <EquipmentCarousel items={toCarouselItems(slides)} sectionTitle={section.title} />
                            ) : video ? (
                              <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-neutral-950 border border-neutral-200 shadow-sm">
                                <video
                                  src={video}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="relative rounded-[10px] overflow-hidden border border-neutral-200 bg-neutral-100 aspect-[4/3] shadow-sm flex items-center justify-center">
                                <img
                                  src={slides[0]}
                                  alt={section.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        )}
                        <div className={`${hasMedia && idx % 2 === 1 ? 'lg:order-1' : ''} space-y-6 md:space-y-8`}>
                          <div>
                            {renderSectionSubtitle(section)}
                            <h3 className="text-2xl md:text-3xl font-light md:font-normal tracking-tight text-neutral-900 mb-3 sm:mb-4">
                              {section.title}
                            </h3>
                            {section.text && (
                              <p className="text-[15px] md:text-[17px] text-slate-500 font-normal leading-relaxed">
                                {section.text}
                              </p>
                            )}
                          </div>

                          {renderSectionBullets(section)}

                          {hasSecondary && (
                            <div className="pt-6 border-t border-neutral-100">
                              {section.secondaryTitle && (
                                <h3 className="text-2xl md:text-3xl font-light md:font-normal tracking-tight text-neutral-900 mb-3 sm:mb-4">
                                  {section.secondaryTitle}
                                </h3>
                              )}
                              {section.secondaryText && (
                                <p className="text-[15px] md:text-[17px] text-slate-500 font-normal leading-relaxed">
                                  {section.secondaryText}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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
