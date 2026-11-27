import { withBase } from '@/lib/basePath';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import FAQSection from '@/components/FAQSection';
import PageCTA from '@/components/PageCTA';
import EquipmentCarousel from '@/components/EquipmentCarousel';
import AboutHeroCarousel from '@/components/AboutHeroCarousel';
import DynamicSectionRenderer from '@/components/DynamicSectionRenderer';
import { getPageEquipment } from '@/data/equipmentData';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';
import { makePageText, slotsForPage } from '@/lib/pageText';
import { SERVICES_TEXT_SLOTS } from '@/data/textSlots/services';
import { getHeroMedia, getRenderableSections } from './cmsMedia';
import { getListIcons, pickIcon } from '@/components/icons/SiteIcon';

interface CharacterizationLayoutProps {
  page: CDMOPage;
  /** Kept for the shared layout signature; sections are read from the page record itself. */
  content?: PageContent;
}

function splitHeading(heading: string) {
  const words = heading.replace(/\.$/, '').split(' ');
  return { first: words[0], rest: words.slice(1).join(' ') };
}

export default function CharacterizationLayout({ page }: CharacterizationLayoutProps) {
  const heroHeading = splitHeading(page.heading);
  const t = makePageText(page, SERVICES_TEXT_SLOTS);
  // Editable copy where the page has a slot registered; the stock wording anywhere else.
  const pageSlotKeys = new Set(slotsForPage(page, SERVICES_TEXT_SLOTS).map((slot) => slot.key));
  const slotText = (key: string, fallback: string) => (pageSlotKeys.has(key) ? t(key) : fallback);

  // Hero media comes from the page record: a video, the `images` carousel, or the single `image`.
  const { video: heroVideo, slides: heroSlides } = getHeroMedia(page);
  // Only used when the record holds no hero media at all.
  const fallbackHeroEquipment = !heroVideo && heroSlides.length === 0 ? getPageEquipment(page.slug) : null;

  // This layout has no section block of its own: every section of the record is drawn with
  // DynamicSectionRenderer just before the FAQ block.
  const sections = getRenderableSections(page);

  // Drawn icons per capability point. A list gets icons only when every point in it has its own.
  const capabilityIcons = getListIcons(page.capabilities || [], page.itemIcons);
  const bioassayIcons = getListIcons(page.bioassayCapabilities || [], page.itemIcons);
  const immunogenicityIcons = getListIcons(page.immunogenicityCapabilities || [], page.itemIcons);
  const technologyIcons = getListIcons(
    (page.analyticalTechnologies || []).map((tech) => (typeof tech === 'string' ? tech : tech.name))
  , page.itemIcons);

  return (
    <>
      {/* HERO — dark lab bench */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-14 md:pt-20 md:pb-18">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">{page.category}</span>
            <span>/</span>
            <span className="text-black">{page.title ? page.title.split('—')[0].split('|')[0].trim() : page.slug.replace(/-/g, ' ')}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {page.badge && (
                <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                  {page.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05]">
                <span className="text-neutral-900">{heroHeading.first}</span> {heroHeading.rest}
              </h1>
              <div className="text-[17px] text-slate-500 font-normal leading-relaxed max-w-xl mt-6 space-y-4">
                {page.description.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
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
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : heroSlides.length > 0 ? (
                <AboutHeroCarousel images={heroSlides} />
              ) : fallbackHeroEquipment && fallbackHeroEquipment.length > 0 ? (
                <EquipmentCarousel items={fallbackHeroEquipment} sectionTitle={page.heading} />
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-white">
                  <img
                    src={withBase("/images/hero_cleanroom.png")}
                    alt={page.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* CAPABILITIES CHECKLIST GRID (Analytical Testing, Physicochemical, Microbiological) */}
      {page.capabilities && page.capabilities.length > 0 && page.slug !== 'bioassays' && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/60 border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  {slotText('capabilitiesHeading', 'Capabilities')}
                </h2>
              </div>
            </Reveal>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {page.capabilities.map((cap, idx) => {
                const Icon = capabilityIcons?.[idx];
                return (
                  <Reveal key={idx} delay={idx * 0.03} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] flex">
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
          </div>
        </section>
      )}

      {/* BIOASSAYS & IMMUNOGENICITY TESTING SECTIONS */}
      {page.slug === 'bioassays' && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/60 border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto space-y-16">
            {/* Bioassay Capabilities */}
            {page.bioassayCapabilities && page.bioassayCapabilities.length > 0 && (
              <div>
                <Reveal>
                  <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                      {slotText('bioassayHeading', 'Bioassay Capabilities')}
                    </h2>
                  </div>
                </Reveal>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  {page.bioassayCapabilities.map((cap, idx) => {
                    const Icon = bioassayIcons?.[idx];
                    return (
                      <Reveal key={idx} delay={idx * 0.03} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] flex">
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
              </div>
            )}

            {/* Immunogenicity Testing */}
            {page.immunogenicityCapabilities && page.immunogenicityCapabilities.length > 0 && (
              <div>
                <Reveal>
                  <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                      {slotText('immunogenicityHeading', 'Immunogenicity Testing')}
                    </h2>
                  </div>
                </Reveal>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  {page.immunogenicityCapabilities.map((cap, idx) => {
                    const Icon = immunogenicityIcons?.[idx];
                    return (
                      <Reveal key={idx} delay={idx * 0.03} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] flex">
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
              </div>
            )}

            {/* Footer Note Callout */}
            {page.footerNote && (
              <Reveal>
                <div className="bg-white border border-neutral-200/80 rounded-[12px] p-6 sm:p-8 lg:p-10 shadow-xs text-center max-w-6xl xl:max-w-none mx-auto">
                  <p className="text-[15px] sm:text-[16px] xl:text-[17px] text-slate-600 font-normal leading-relaxed lg:whitespace-nowrap">
                    {page.footerNote}
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ANALYTICAL TECHNOLOGIES SECTION (Physicochemical) */}
      {page.analyticalTechnologies && page.analyticalTechnologies.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-white border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  {slotText('technologiesHeading', 'Analytical Technologies')}
                </h2>
              </div>
            </Reveal>

            <div className="flex flex-wrap justify-center gap-5 max-w-6xl mx-auto">
              {page.analyticalTechnologies.map((tech, tIdx) => {
                const title = typeof tech === 'string' ? tech : tech.name;
                const desc = typeof tech === 'string' ? '' : tech.description;
                const category = typeof tech === 'string' ? '' : tech.category;
                const TechIcon = technologyIcons?.[tIdx];

                return (
                  <Reveal key={tIdx} delay={tIdx * 0.05} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)] flex">
                    <div className="group w-full h-full bg-neutral-50/60 border border-neutral-200/80 rounded-[10px] p-6 shadow-xs hover:shadow-xl hover:border-brand-yellow hover:bg-white transition-all duration-300 flex flex-col justify-between">
                      <div>
                        {(TechIcon || category) && (
                          <div className="flex items-center justify-between gap-3 mb-4">
                            {TechIcon ? (
                              <div className="w-11 h-11 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 text-brand-blue group-hover:bg-brand-yellow group-hover:border-brand-yellow group-hover:text-black transition-colors duration-200">
                                <TechIcon className="w-5 h-5" />
                              </div>
                            ) : (
                              <span />
                            )}
                            {category && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 group-hover:bg-brand-yellow/30 group-hover:text-neutral-900 transition-colors">
                                {category}
                              </span>
                            )}
                          </div>
                        )}

                        <h3 className="text-lg font-semibold text-neutral-900 leading-snug group-hover:text-brand-blue transition-colors mb-2">
                          {title}
                        </h3>
                        {desc && (
                          <p className="text-sm text-neutral-600 leading-relaxed">
                            {desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Sections of the page record (added in the admin panel) */}
      {sections.length > 0 && (
        <div className="divide-y divide-neutral-100 border-t border-neutral-200">
          {sections.map((sec, idx) => (
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
