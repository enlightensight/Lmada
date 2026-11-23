import Link from 'next/link';
import Reveal from '@/components/Reveal';
import AboutHeroCarousel from '@/components/AboutHeroCarousel';
import FAQSection from '@/components/FAQSection';
import DynamicSectionRenderer from '@/components/DynamicSectionRenderer';
import PageCTA from '@/components/PageCTA';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';
import { getListIcons, pickIcon } from '@/components/icons/SiteIcon';

interface ModalityLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

export default function ModalityLayout({ page, content }: ModalityLayoutProps) {
  const [firstWord, ...restWords] = page.heading.split(' ');

  const capabilityIcons = getListIcons(page.capabilities || [], page.itemIcons);

  return (
    <>
      {/* HERO — molecule-focused: large rounded image with floating yellow stat chips */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-14 md:pt-20 md:pb-18">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-10">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">{page.category}</span>
            <span>/</span>
            <span className="text-black">{page.title ? page.title.split('—')[0].split('|')[0].trim() : page.slug.replace(/-/g, ' ')}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              {page.badge && (
                <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                  {page.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05] mb-6">
                <span className="text-neutral-900">{firstWord}</span>{' '}
                {restWords.join(' ')}
              </h1>
              <div className="text-[17px] text-slate-500 font-normal leading-relaxed max-w-xl space-y-4">
                {page.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <Reveal delay={0.1} className="w-full">
              {page.images && page.images.length > 1 ? (
                <AboutHeroCarousel images={page.images} />
              ) : (page.heroVideo || (page.image && /\.(mp4|webm|ogg|mov)$/i.test(page.image))) ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-neutral-950">
                  <video
                    src={page.heroVideo || page.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : page.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-[#000a1c]">
                  <img
                    src={page.image}
                    alt={page.title}
                    className="w-full h-full object-fill"
                    style={{ objectFit: 'fill' }}
                  />
                </div>
              ) : null}
            </Reveal>
          </div>
        </div>
      </section>

      {/* PLATFORM CAPABILITIES — dedicated capability checklist grid with research symbols */}
      {page.capabilities && page.capabilities.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/60 border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  Platform Capabilities
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {page.capabilities.map((cap, idx) => {
                // A drawn icon per point, but only when every point on the page has its own
                const Icon = capabilityIcons?.[idx];
                return (
                  <Reveal key={idx} delay={idx * 0.04} className="h-full">
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

      {/* PLATFORM SUMMARY / FOOTER NOTE SECTION */}
      {page.footerNote && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 bg-white border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="bg-neutral-50/80 border border-neutral-200/80 rounded-[12px] p-6 sm:p-8 lg:p-10 shadow-xs">
                <div className="w-full space-y-2 text-[15px] sm:text-[16px] xl:text-[17px] text-slate-600 font-normal leading-relaxed">
                  {page.footerNote.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="lg:whitespace-nowrap">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQ Accordion (Bottom Section) */}
      {/* Sections added in the admin panel */}
      {(page.sections || [])
        .filter((sec) => sec.style !== 'faq-accordion')
        .map((sec, idx) => (
          <DynamicSectionRenderer itemIcons={page.itemIcons} key={sec.id || idx} section={sec} index={idx} pageSlug={page.slug} category={page.category} />
        ))}

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
      <PageCTA page={page} />
    </>
  );
}
