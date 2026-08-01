import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SpecFlow from '@/components/SpecFlow';
import FacilityGallery from '@/components/FacilityGallery';
import { getStepIcon } from '@/lib/stepIcon';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface OverviewLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

const OVERVIEW_SLUGS = ['about', 'leadership', 'facility', 'integrated', 'quality', 'careers'];

function AccentHeading({ text, className = '' }: { text: string; className?: string }) {
  const [first, ...rest] = text.split(' ');
  return (
    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15] ${className}`}>
      <span className="text-black">{first}</span>
      {rest.length > 0 ? ` ${rest.join(' ')}` : ''}
    </h2>
  );
}

export default function OverviewLayout({ page, content }: OverviewLayoutProps) {
  const slugIndex = OVERVIEW_SLUGS.indexOf(page.slug);
  const flip = slugIndex % 2 === 1;
  const heroImage = page.image || '/images/hero_cleanroom.png';

  const narrative = (
    <>
      {content.sections.map((section, idx) => {
        if (section.dark) {
          // Blue quote / highlight block
          return (
            <section key={idx} className="px-6 py-12 md:py-20 bg-molecules">
              <div className="w-full">
                <Reveal>
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="w-14 h-14 mx-auto mb-8 rounded-[10px] bg-brand-yellow flex items-center justify-center">
                      <Quote className="w-7 h-7 text-black" />
                    </div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15] mb-6">
                      <span className="text-black">{section.title.split(' ')[0]}</span>
                      {` ${section.title.split(' ').slice(1).join(' ')}`}
                    </h3>
                    <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                      {section.text}
                    </p>
                    <div className="mt-8 h-1 w-16 mx-auto bg-brand-yellow rounded-full" />
                  </div>
                </Reveal>
              </div>
            </section>
          );
        }

        // Editorial alternating image + text row
        const imageRight = (idx % 2 === 1) !== flip;
        return (
          <div key={idx}>
            <section className={`px-6 py-12 md:py-20 ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
              <div className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                  <Reveal className={imageRight ? 'lg:order-2' : ''}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 border border-neutral-200 rounded-[10px] shadow-sm">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </Reveal>
                  <Reveal delay={0.1} className={imageRight ? 'lg:order-1' : ''}>
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-black leading-[1.15] mb-5">
                        {section.title}
                      </h3>
                      <div className="h-1 w-12 bg-brand-blue rounded-full mb-5" />
                      <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                        {section.text}
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
            {page.slug === 'facility' && idx === 0 && <FacilityGallery />}
          </div>
        );
      })}
    </>
  );

  const processBlock = content.processSteps.length > 0 && (
    <section className="px-6 py-12 md:py-20 border-y border-neutral-100">
      <div className="w-full">
        <Reveal>
          <div className="text-center mb-10 md:mb-14">
            <AccentHeading text="How We Work" />
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
              A structured engagement model that keeps every program transparent and on schedule.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.processSteps.map((step, idx) => {
            const StepIcon = getStepIcon(step.title);
            return (
              <Reveal key={idx} delay={idx * 0.08} className="h-full">
                <div className="h-full p-6 md:p-7 rounded-[10px] bg-neutral-50 border border-neutral-200 hover:border-brand-blue transition-colors duration-300">
                  <span className="inline-flex w-11 h-11 rounded-[10px] bg-brand-blue/10 border border-brand-blue/20 items-center justify-center mb-4">
                    <StepIcon className="w-6 h-6 text-brand-blue" />
                  </span>
                  <h3 className="text-lg font-semibold text-black mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{step.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );

  const advantagesBlock = content.advantages.length > 0 && (
    <section className="px-6 py-12 md:py-20">
      <div className="w-full">
        <Reveal>
          <div className="text-center mb-10 md:mb-14">
            <AccentHeading text="The Lambda Advantage" />
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.advantages.map((adv, idx) => {
            const blue = idx % 2 === 0;
            return (
              <Reveal key={idx} delay={idx * 0.08} className="h-full">
                <div className={`h-full p-7 rounded-[10px] shadow-sm hover:shadow-xl transition-all duration-300 ${blue ? 'bg-brand-blue hover:bg-brand-blue-hover' : 'bg-brand-yellow hover:bg-brand-yellow-hover'}`}>
                  <span className={`inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-semibold tracking-wider mb-5 ${blue ? 'bg-brand-yellow text-black' : 'bg-brand-blue text-white'}`}>
                    {adv.badge}
                  </span>
                  {adv.value && (
                    <div className={`text-3xl md:text-4xl font-semibold tracking-tight mb-2 ${blue ? 'text-white' : 'text-black'}`}>
                      {adv.value}
                    </div>
                  )}
                  {adv.title && (
                    <h3 className={`text-lg font-semibold mb-2 ${blue ? 'text-white' : 'text-black'}`}>
                      {adv.title}
                    </h3>
                  )}
                  <p className={`text-sm leading-relaxed ${blue ? 'text-white/80' : 'text-black/70'}`}>
                    {adv.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );

  const specsBlock = content.specs.length > 0 && (
    <section className="px-6 py-12 md:py-20">
      <div className="w-full">
        <Reveal>
          <div className="text-center mb-10 md:mb-14">
            <AccentHeading text="Key Facts" className="mb-4" />
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              Essential details about this aspect of Lambda CDMO, at a glance.
            </p>
          </div>
        </Reveal>
        <SpecFlow specs={content.specs} />
      </div>
    </section>
  );

  return (
    <>
      {/* HERO — editorial, light with dark text */}
      <section className="relative bg-molecules-hero overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="relative w-full px-6 pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8">
            <Link href="/" className="hover:text-brand-yellow transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">{page.category}</span>
            <span>/</span>
            <span className="text-brand-yellow">{page.slug}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {page.badge && (
                <span className="inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                  {page.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-black leading-[1.05]">
                <span className="text-black">{page.heading.split(' ')[0]}</span>
                {` ${page.heading.split(' ').slice(1).join(' ')}`}
              </h1>
              <p className="text-base text-neutral-600 leading-relaxed mt-6 max-w-xl">
                {page.description}
              </p>
            </div>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-white">
                <img
                  src={heroImage}
                  alt={page.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section order varies per slug so sibling pages don't look identical */}
      {flip ? (
        <>
          {narrative}
          {processBlock}
          {specsBlock}
          {advantagesBlock}
        </>
      ) : (
        <>
          {narrative}
          {processBlock}
          {advantagesBlock}
          {specsBlock}
        </>
      )}

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="px-6 py-12 md:py-20 border-t border-neutral-100">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <Reveal>
                  <AccentHeading text="Frequently Asked Questions" className="mb-4" />
                </Reveal>
              </div>
              <div className="lg:col-span-8">
                <Reveal delay={0.1}>
                  <div className="border border-neutral-200 bg-white rounded-[10px] p-6 md:p-10 shadow-sm">
                    <div className="flex flex-col gap-4">
                      {page.faqs.map((faq, idx) => (
                        <div key={idx} className="py-4 border-b border-neutral-100 last:border-0">
                          <h4 className="text-sm font-semibold text-black mb-2">{faq.question}</h4>
                          <p className="text-sm text-neutral-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-navy text-white px-6 py-12 md:py-20">
        <video src="/videos/Floating-Molecule-Video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-navy/50 pointer-events-none" />
        <div className="relative z-10 w-full text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] mb-6">
              <span className="text-white">Ready</span> to advance your biologics program?
            </h2>
            <p className="text-base text-white/70 max-w-2xl mx-auto mb-8">
              Connect with our scientific team to discuss your development and manufacturing requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-medium text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all"
              >
                Get in touch
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/overview/about"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
              >
                About Lambda CDMO
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
