import Link from 'next/link';
import { ArrowRight, FlaskConical, ShieldCheck, Factory, Settings2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface ManufacturingLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

export default function ManufacturingLayout({ page, content }: ManufacturingLayoutProps) {
  // Per-slug accent: drug-substance = blue, drug-product = yellow
  const isSubstance = page.slug === 'drug-substance';
  const accentText = isSubstance ? 'text-brand-blue' : 'text-brand-yellow';
  const accentBox = isSubstance ? 'bg-brand-blue' : 'bg-brand-yellow';
  const accentIcon = isSubstance ? 'text-white' : 'text-black';
  // Accent for text sitting on blue sections (accentText would be blue-on-blue for drug-substance)
  const accentTextOnBlue = 'text-brand-yellow';

  const sectionIcons = [FlaskConical, ShieldCheck, Factory, Settings2];

  return (
    <>
      {/* HERO — blue industrial band with image + stats bar */}
      <section className="relative bg-brand-blue text-white overflow-hidden">
        <div className="relative max-w-[1400px] mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/50">{page.category}</span>
            <span>/</span>
            <span className="text-brand-yellow">{page.slug}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {page.badge && (
                <span className={`inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-semibold tracking-wider mb-6 ${
                  isSubstance
                    ? 'bg-white/10 text-white border border-white/30'
                    : 'bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30'
                }`}>
                  {page.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.05] mb-6">
                {page.heading}
              </h1>
              <p className="text-base text-white/70 leading-relaxed max-w-xl">
                {page.description}
              </p>
            </div>
            {page.image && (
              <Reveal>
                <div className="w-full aspect-[4/3] overflow-hidden rounded-[10px] border border-white/10 shadow-2xl">
                  <img
                    src={page.image}
                    alt={page.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            )}
          </div>
        </div>

        {/* STATS BAR — dark bar with big white numbers */}
        {content.stats.length > 0 && (
          <div className="border-t border-white/10">
            <div className="max-w-[1400px] mx-auto px-6 py-10 md:py-14">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
                {content.stats.map((stat, idx) => (
                  <Reveal key={idx} delay={idx * 0.08}>
                    <div className="sm:border-l sm:border-white/10 sm:pl-8 first:border-0 first:pl-0">
                      <span className="text-4xl md:text-5xl font-semibold text-white tracking-tight block">
                        {stat.value}
                      </span>
                      <span className={`text-[11px] font-bold uppercase tracking-wider block mt-3 ${accentTextOnBlue}`}>
                        {stat.label}
                      </span>
                      {stat.sublabel && (
                        <p className="text-xs text-white/70 leading-relaxed mt-2">{stat.sublabel}</p>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CAPABILITIES — split sections with accent icon boxes */}
      <section className="px-6 py-12 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className={`text-[11px] font-bold uppercase tracking-wider block mb-4 ${accentText}`}>
              Manufacturing capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
              <span className="text-brand-yellow">Built</span> for clinical-grade production
            </h2>
          </div>
          <div className="flex flex-col gap-12 md:gap-20">
            {content.sections.map((section, idx) => {
              const SectionIcon = sectionIcons[idx % sectionIcons.length];
              return (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="rounded-[10px] overflow-hidden border border-neutral-200 bg-neutral-100 aspect-[4/3] shadow-sm">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${accentBox}`}>
                          <SectionIcon className={`w-5 h-5 ${accentIcon}`} />
                        </div>
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${accentText}`}>
                          {String(idx + 1).padStart(2, '0')} — {idx % 2 === 0 ? 'Operations' : 'Quality'}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-black mb-4">
                        {section.title}
                      </h3>
                      <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                        {section.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPECS TABLE — blue header row, alternating rows */}
      {content.specs && content.specs.length > 0 && (
        <section className="px-6 py-12 md:py-20 bg-neutral-50 border-y border-neutral-100">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <span className={`text-[11px] font-bold uppercase tracking-wider block mb-4 ${accentText}`}>
                Equipment & specs
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                <span className="text-brand-yellow">Technical</span> operations summary
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
                Equipment, capacity, and environmental specifications that underpin clinical-grade manufacturing.
              </p>
            </div>
            <Reveal>
              <div className="max-w-4xl mx-auto rounded-[10px] border border-neutral-200 overflow-hidden shadow-sm">
                <div className="grid grid-cols-2 bg-brand-blue text-white">
                  <span className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider">Specification</span>
                  <span className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider">Detail</span>
                </div>
                {content.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-2 border-t border-neutral-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}
                  >
                    <span className="px-6 py-4 text-sm font-semibold text-black">{spec.label}</span>
                    <span className="px-6 py-4 text-sm text-neutral-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* PROCESS FLOW — horizontal step cards */}
      <section className="px-6 py-12 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className={`text-[11px] font-bold uppercase tracking-wider block mb-4 ${accentText}`}>
              Manufacturing workflow
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
              <span className="text-brand-yellow">From</span> process transfer to aseptic filling
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.processSteps.map((stepObj, idx) => (
              <Reveal key={idx} delay={idx * 0.08} className="h-full">
                <div className="relative h-full bg-white border border-neutral-200 rounded-[10px] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 ${accentBox}`} />
                  <span className={`text-4xl font-semibold tracking-tight block mb-4 ${accentText}`}>
                    {stepObj.step}
                  </span>
                  <h3 className="text-lg font-semibold text-black mb-2">{stepObj.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{stepObj.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES — blue / yellow cards */}
      {content.advantages && content.advantages.length > 0 && (
        <section className="px-6 py-12 md:py-20 bg-neutral-50 border-y border-neutral-100">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <span className={`text-[11px] font-bold uppercase tracking-wider block mb-4 ${accentText}`}>
                Why Lambda manufacturing
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                <span className="text-brand-yellow">Operational</span> advantages
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.advantages.map((adv, idx) => (
                <Reveal key={idx} delay={idx * 0.08} className="h-full">
                  <div className={`h-full rounded-[10px] p-7 shadow-sm hover:shadow-xl transition-all duration-300 ${
                    idx % 2 === 0 ? 'bg-brand-blue text-white' : 'bg-brand-yellow text-black'
                  }`}>
                    <span className={`inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-bold tracking-wider mb-5 ${
                      idx % 2 === 0 ? 'bg-brand-yellow text-black' : 'bg-brand-blue text-white'
                    }`}>
                      {adv.badge}
                    </span>
                    {adv.value && (
                      <span className="text-3xl md:text-4xl font-semibold tracking-tight block mb-3">
                        {adv.value}
                      </span>
                    )}
                    {adv.title && (
                      <h3 className="text-lg font-semibold mb-2">{adv.title}</h3>
                    )}
                    <p className={`text-sm leading-relaxed ${idx % 2 === 0 ? 'text-white/80' : 'text-black/70'}`}>
                      {adv.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="px-6 py-12 md:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <span className={`text-[11px] font-bold uppercase tracking-wider block mb-4 ${accentText}`}>
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                <span className="text-brand-yellow">Frequently</span> asked questions
              </h2>
            </div>
            <Reveal>
              <div className="max-w-3xl mx-auto rounded-[10px] border border-neutral-200 bg-neutral-50 p-6 md:p-10">
                <div className="flex flex-col">
                  {page.faqs.map((faq, idx) => (
                    <div key={idx} className="py-5 border-b border-neutral-200 last:border-0">
                      <div className="flex items-start gap-3">
                        <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${accentBox}`} />
                        <div>
                          <h4 className="text-sm font-semibold text-black mb-2">{faq.question}</h4>
                          <p className="text-sm text-neutral-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA — blue band */}
      <section className="bg-brand-blue text-white px-6 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] mb-6">
            <span className="text-brand-yellow">Ready</span> to advance your biologics program?
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
              href={isSubstance ? '/manufacturing/drug-product' : '/manufacturing/drug-substance'}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
            >
              {isSubstance ? 'Drug product' : 'Drug substance'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
