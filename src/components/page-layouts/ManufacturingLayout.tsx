import Link from 'next/link';
import { 
  ArrowRight, 
  FlaskConical, 
  ShieldCheck, 
  Factory, 
  Settings2,
  Dna,
  Filter,
  Eye,
  FileCheck2,
  Sparkles,
  Package,
  Snowflake,
  Timer,
  Sliders,
  Truck
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import FAQSection from '@/components/FAQSection';
import CommonCTA from '@/components/CommonCTA';
import EquipmentCarousel from '@/components/EquipmentCarousel';
import AboutHeroCarousel from '@/components/AboutHeroCarousel';
import { getPageEquipment, getSectionEquipment, DRUG_PRODUCT_EQUIPMENT, ALL_EQUIPMENT_ITEMS } from '@/data/equipmentData';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface ManufacturingLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

function getMfgCapabilityIcon(text: string, index: number) {
  const lower = text.toLowerCase();
  if (lower.includes('seed train') || lower.includes('bioreactor') || lower.includes('cell culture')) return Dna;
  if (lower.includes('upstream') || lower.includes('downstream')) return FlaskConical;
  if (lower.includes('chromatographic') || lower.includes('purification') || lower.includes('filtration') || lower.includes('uf/df')) return Filter;
  if (lower.includes('in-process') || lower.includes('monitoring') || lower.includes('visual inspection')) return Eye;
  if (lower.includes('batch record') || lower.includes('documentation') || lower.includes('batch release')) return FileCheck2;
  if (lower.includes('chain of custody') || lower.includes('chain of identity') || lower.includes('sample management')) return ShieldCheck;
  if (lower.includes('clinical supply') || lower.includes('phase')) return Factory;
  if (lower.includes('formulation') || lower.includes('excipient')) return FlaskConical;
  if (lower.includes('aseptic') || lower.includes('fill-finish')) return Sparkles;
  if (lower.includes('lyophilized') || lower.includes('lyophilization')) return Snowflake;
  if (lower.includes('vial') || lower.includes('container') || lower.includes('packaging') || lower.includes('labelling')) return Package;
  if (lower.includes('stability')) return Timer;
  
  const fallbacks = [Factory, FlaskConical, Filter, ShieldCheck, Package, Sparkles];
  return fallbacks[index % fallbacks.length];
}

export default function ManufacturingLayout({ page, content }: ManufacturingLayoutProps) {
  const heroEquipment = getPageEquipment(page.slug);

  // Per-slug accent: drug-substance = blue, drug-product = yellow
  const isSubstance = page.slug === 'drug-substance';
  const isProduct = page.slug === 'drug-product';
  const isMfgCustomHero = isProduct;
  const customHeroImage = '/images/menufacturing.png';

  const accentText = isSubstance ? 'text-brand-blue' : 'text-brand-yellow';
  const accentBox = isSubstance ? 'bg-brand-blue' : 'bg-brand-yellow';
  const accentIcon = isSubstance ? 'text-white' : 'text-black';
  // Accent for text sitting on blue sections (accentText would be blue-on-blue for drug-substance)
  const accentTextOnBlue = 'text-brand-yellow';

  const sectionIcons = [FlaskConical, ShieldCheck, Factory, Settings2];

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
              {isMfgCustomHero ? (
                <div className="w-full aspect-[4/3] rounded-[10px] border border-neutral-200/90 shadow-xl overflow-hidden relative group">
                  <img
                    src={customHeroImage}
                    alt={page.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ) : page.images && page.images.length > 1 ? (
                <AboutHeroCarousel images={page.images} />
              ) : heroEquipment && heroEquipment.length > 0 ? (
                <EquipmentCarousel items={heroEquipment} sectionTitle={page.heading} />
              ) : (page.heroVideo || (page.image && /\.(mp4|webm|ogg|mov)$/i.test(page.image))) ? (
                <div className="w-full aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-2xl bg-neutral-950 relative">
                  <video
                    src={page.heroVideo || page.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-2xl bg-white relative">
                  <img
                    src={page.image || '/images/hero_cleanroom.png'}
                    alt={page.title}
                    className="w-full h-full object-cover"
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
            {page.slug !== 'drug-product' && (
              <Reveal>
                <div className="text-center mb-10 md:mb-14">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                    Manufacturing Capabilities
                  </h2>
                  <p className="text-[15px] sm:text-[16px] xl:text-[17px] text-slate-500 font-normal leading-relaxed max-w-5xl xl:max-w-none lg:whitespace-nowrap mx-auto mt-4">
                    cGMP cleanroom workflows, validated containment, and precision production systems for {page.title.split('—')[0].trim()}.
                  </p>
                </div>
              </Reveal>
            )}

            {page.slug === 'drug-product' ? (
              <Reveal>
                <div className="bg-white border border-neutral-200/80 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Left Image Box */}
                    <div className="lg:col-span-5">
                      <EquipmentCarousel items={DRUG_PRODUCT_EQUIPMENT} sectionTitle="Drug Product & Formulation Equipment" />
                    </div>

                    {/* Right Content Box */}
                    <div className="lg:col-span-7">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-light md:font-normal tracking-tight text-neutral-900 mb-6 leading-tight">
                          Formulation Development &amp; Drug Product Manufacturing Capabilities
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {page.capabilities.map((cap, idx) => {
                            const Icon = getMfgCapabilityIcon(cap, idx);
                            return (
                              <div
                                key={idx}
                                className="group/pill flex items-center gap-3.5 p-3.5 rounded-[8px] bg-neutral-50 border border-neutral-200/70 hover:border-brand-yellow hover:bg-white transition-all duration-200"
                              >
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover/pill:bg-brand-yellow group-hover/pill:border-brand-yellow transition-colors duration-200">
                                  <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-brand-blue group-hover/pill:text-black transition-colors duration-200" />
                                </div>
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
                  const Icon = getMfgCapabilityIcon(cap, idx);
                  return (
                    <Reveal key={idx} delay={idx * 0.03} className={`w-full sm:w-[calc(50%-12px)] ${page.slug === 'drug-substance' ? 'lg:w-[calc(33.333%-16px)]' : 'lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]'} flex`}>
                      <div className="group w-full h-full bg-white border border-neutral-200/80 rounded-[10px] p-6 shadow-sm hover:shadow-lg hover:border-brand-yellow transition-all duration-300 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300">
                          <Icon className="w-6 h-6 text-brand-blue group-hover:text-black transition-colors duration-300" />
                        </div>
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

      {/* CAPABILITIES — split sections with accent icon boxes */}
      {page.slug !== 'drug-product' && content.sections && content.sections.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
          <div className="w-full max-w-[1700px] mx-auto">
            <div className="flex flex-col gap-12 md:gap-20">
              {content.sections
                .filter((s: any) => s.style !== 'faq-accordion' && !s.id?.includes('faq') && s.title !== 'Frequently Asked Questions')
                .map((section: any, idx: number) => {
                const SectionIcon = sectionIcons[idx % sectionIcons.length];
                return (
                  <Reveal key={idx} delay={idx * 0.05}>
                    {isSubstance ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                        {/* Tile 1: Seamless Development to GMP Transfer */}
                        <div className="bg-white border border-neutral-200/80 rounded-[12px] p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                          <h3 className="text-2xl sm:text-3xl font-light md:font-normal tracking-tight text-neutral-900 mb-4 leading-snug">
                            {section.title}
                          </h3>
                          <p className="text-[16px] sm:text-[17px] text-slate-500 font-normal leading-relaxed">
                            {section.text}
                          </p>
                        </div>

                        {/* Tile 2: Single-Use Bioreactor Production Suites */}
                        <div className="bg-white border border-neutral-200/80 rounded-[12px] p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                          <h3 className="text-2xl sm:text-3xl font-light md:font-normal tracking-tight text-neutral-900 mb-4 leading-snug">
                            {section.secondaryTitle || 'Single-Use Bioreactor Production Suites'}
                          </h3>
                          <p className="text-[16px] sm:text-[17px] text-slate-500 font-normal leading-relaxed">
                            {section.secondaryText}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                          {(() => {
                            if (section.images && section.images.length > 1) {
                              return <AboutHeroCarousel images={section.images} />;
                            }
                            const isVideo = section.mediaType === 'video' || /\.(mp4|webm|ogg|mov)$/i.test(section.video || section.image || '');
                            if (isVideo && (section.video || section.image)) {
                              return (
                                <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-neutral-950 border border-neutral-200 shadow-sm">
                                  <video
                                    src={section.video || section.image}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              );
                            }
                            const equipmentItems = getSectionEquipment(section.title, page.slug);
                            if (section.images && section.images.length > 1) {
                              return (
                                <EquipmentCarousel
                                  items={section.images.map((img: string, i: number) => {
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
                              );
                            }
                            if (equipmentItems && equipmentItems.length > 0) {
                              return <EquipmentCarousel items={equipmentItems} sectionTitle={section.title} />;
                            }
                            return (
                              <div className="relative rounded-[10px] overflow-hidden border border-neutral-200 bg-neutral-100 aspect-[4/3] shadow-sm flex items-center justify-center">
                                <img
                                  src={section.image}
                                  alt={section.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            );
                          })()}
                        </div>
                        <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''} space-y-6 md:space-y-8`}>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-light md:font-normal tracking-tight text-neutral-900 mb-3 sm:mb-4">
                              {section.title}
                            </h3>
                            <p className="text-[15px] md:text-[17px] text-slate-500 font-normal leading-relaxed">
                              {section.text}
                            </p>
                          </div>

                          {(section.secondaryTitle || section.secondaryText) && (
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

      {/* CTA */}
      <CommonCTA />
    </>
  );
}
