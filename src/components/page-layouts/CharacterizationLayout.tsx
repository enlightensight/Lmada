import Link from 'next/link';
import {
  ArrowRight,
  Check,
  FlaskConical,
  Search,
  FileCheck,
  Scale,
  Dna,
  Microscope,
  HeartPulse,
  Activity,
  ShieldCheck,
  Bug,
  Beaker,
  Shield,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface CharacterizationLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

// Per-slug lab icon sets so sibling pages feel distinct
const SLUG_ICONS: Record<string, typeof FlaskConical[]> = {
  'analytical-testing': [FlaskConical, Search, FileCheck],
  physicochemical: [Scale, Dna, Microscope],
  bioassays: [HeartPulse, Activity, ShieldCheck],
  microbiological: [Bug, Beaker, Shield],
};

const SLUG_ORDER = ['analytical-testing', 'physicochemical', 'bioassays', 'microbiological'];

function splitHeading(heading: string) {
  const words = heading.replace(/\.$/, '').split(' ');
  return { first: words[0], rest: words.slice(1).join(' ') };
}

export default function CharacterizationLayout({ page, content }: CharacterizationLayoutProps) {
  const slugIndex = Math.max(0, SLUG_ORDER.indexOf(page.slug));
  const icons = SLUG_ICONS[page.slug] ?? SLUG_ICONS['analytical-testing'];
  const heroHeading = splitHeading(page.heading);

  return (
    <>
      {/* HERO — dark lab bench */}
      <section className="relative bg-brand-blue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/50 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/50">{page.category}</span>
            <span>/</span>
            <span className="text-brand-yellow">{page.slug}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              {page.badge && (
                <span className="inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                  {page.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
                <span className="text-brand-yellow">{heroHeading.first}</span> {heroHeading.rest}
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base text-white/70 leading-relaxed">
                {page.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Cover Image */}
      {page.image && (
        <section className="max-w-[1400px] mx-auto px-6 py-12">
          <Reveal>
            <div className="w-full aspect-[21/9] overflow-hidden rounded-[10px] border-2 border-brand-yellow bg-neutral-100 shadow-lg">
              <img
                src={page.image}
                alt={page.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* CAPABILITY CARDS — lab icon squares, arrangement varies per slug */}
      <section className="bg-white px-6 py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">Capabilities</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                <span className="text-brand-yellow">Orthogonal</span> Methods for Comprehensive Characterization
              </h2>
            </div>
          </Reveal>

          {slugIndex === 1 ? (
            /* Physicochemical: horizontal lab-bench rows */
            <div className="flex flex-col gap-6">
              {content.sections.map((section, idx) => {
                const Icon = icons[idx % icons.length];
                return (
                  <Reveal key={idx} delay={idx * 0.05}>
                    <div className="group h-full bg-white border border-neutral-200 rounded-[10px] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 md:grid-cols-12">
                      <div className="md:col-span-4 relative aspect-[16/10] md:aspect-auto overflow-hidden bg-neutral-100">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="md:col-span-8 p-6 md:p-8 flex items-start gap-5">
                        <div className="w-16 h-16 bg-brand-blue rounded-[10px] border-2 border-brand-yellow flex items-center justify-center flex-shrink-0">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-black mb-2">{section.title}</h3>
                          <p className="text-sm text-neutral-600 leading-relaxed">{section.text}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-2 ${slugIndex === 3 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6`}>
              {content.sections.map((section, idx) => {
                const Icon = icons[idx % icons.length];
                if (slugIndex === 2) {
                  /* Bioassays: icon-led cards, image at the bottom */
                  return (
                    <Reveal key={idx} delay={idx * 0.05}>
                      <div className="group h-full bg-white border border-neutral-200 rounded-[10px] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                        <div className="p-6 md:p-8 flex-1">
                          <div className="w-16 h-16 bg-brand-blue rounded-[10px] border-2 border-brand-yellow flex items-center justify-center mb-5">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-black mb-2">{section.title}</h3>
                          <p className="text-sm text-neutral-600 leading-relaxed">{section.text}</p>
                        </div>
                        <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                          <img
                            src={section.image}
                            alt={section.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </Reveal>
                  );
                }
                if (slugIndex === 3) {
                  /* Microbiological: staggered two-column cards with offset rhythm */
                  return (
                    <Reveal key={idx} delay={idx * 0.05} className={idx % 2 === 1 ? 'lg:mt-12' : ''}>
                      <div className="group h-full bg-white border border-neutral-200 rounded-[10px] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                          <img
                            src={section.image}
                            alt={section.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute bottom-4 left-4 w-14 h-14 bg-brand-yellow rounded-[10px] border-2 border-brand-blue flex items-center justify-center">
                            <Icon className="w-7 h-7 text-brand-blue" />
                          </div>
                        </div>
                        <div className="p-6 md:p-8">
                          <h3 className="text-lg font-semibold text-black mb-2">{section.title}</h3>
                          <p className="text-sm text-neutral-600 leading-relaxed">{section.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                }
                /* Analytical Testing (default): image top with centered overlapping icon square */
                return (
                  <Reveal key={idx} delay={idx * 0.05}>
                    <div className="group h-full bg-white border border-neutral-200 rounded-[10px] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 md:p-8 pt-0 flex-1 flex flex-col items-center text-center">
                        <div className="w-16 h-16 -mt-8 mb-5 bg-brand-blue rounded-[10px] border-2 border-brand-yellow flex items-center justify-center relative z-10">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-black mb-2">{section.title}</h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">{section.text}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ZIG-ZAG PROCESS FLOW */}
      <section className="bg-neutral-50 border-y border-neutral-100 px-6 py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">Workflow</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                <span className="text-brand-yellow">Method</span> Development to QA Release
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
                We follow a structured path from target assessment through validated analytical release.
              </p>
            </div>
          </Reveal>

          <div className="relative max-w-4xl mx-auto">
            {/* Center spine (desktop) / left spine (mobile) */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 md:-translate-x-1/2" />

            <div className="flex flex-col gap-8 md:gap-12">
              {content.processSteps.map((stepObj, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <Reveal key={idx} delay={idx * 0.05}>
                    <div className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Step node */}
                      <div className="absolute left-5 md:left-1/2 top-6 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-[10px] bg-brand-yellow border-2 border-brand-blue flex items-center justify-center z-10">
                        <span className="text-sm md:text-base font-semibold text-black">{stepObj.step}</span>
                      </div>
                      {/* Card */}
                      <div className={`ml-14 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-14' : 'md:pl-14'}`}>
                        <div className="bg-white border border-neutral-200 rounded-[10px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 md:p-8">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-2">
                            Step {stepObj.step}
                          </span>
                          <h3 className="text-xl font-semibold text-black mb-2">{stepObj.title}</h3>
                          <p className="text-sm text-neutral-600 leading-relaxed">{stepObj.text}</p>
                        </div>
                      </div>
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* STATS — yellow bench band with blue stat cards */}
      <section className="bg-brand-yellow px-6 py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                Quality Attributes and Performance
              </h2>
              <p className="text-sm sm:text-base text-black/70 leading-relaxed max-w-2xl mx-auto mt-4">
                Data integrity, resolution, and compliance benchmarks that support regulatory confidence.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {content.stats.map((stat, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="bg-brand-blue rounded-[10px] p-6 md:p-8 text-center h-full flex flex-col justify-center shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-semibold text-white tracking-tight">{stat.value}</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-white/80 mt-1">{stat.label}</div>
                  {stat.sublabel && <p className="text-xs text-white/70 mt-2 leading-relaxed">{stat.sublabel}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS — method sheet */}
      {content.specs && content.specs.length > 0 && (
        <section className="bg-white px-6 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">Method Sheet</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  <span className="text-brand-yellow">Platform</span> Specifications
                </h2>
              </div>
            </Reveal>
            <Reveal>
              <div className="border border-neutral-200 bg-neutral-50 rounded-[10px] p-6 md:p-10 shadow-sm">
                <div className="flex flex-col gap-4">
                  {content.specs.map((spec, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 border-b border-neutral-200 last:border-0">
                      <span className="text-sm font-semibold text-black mb-1 sm:mb-0">{spec.label}</span>
                      <span className="text-sm text-neutral-600 text-left sm:text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ADVANTAGES — checklist with yellow check icons */}
      {content.advantages && content.advantages.length > 0 && (
        <section className="bg-neutral-50 border-y border-neutral-100 px-6 py-12 md:py-20">
          <div className="max-w-[1400px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">Why Lambda</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  <span className="text-brand-yellow">Analytical</span> Confidence Built on Expertise
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.advantages.map((adv, idx) => (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className="h-full bg-white border border-neutral-200 rounded-[10px] shadow-sm hover:shadow-xl transition-all duration-300 p-6 md:p-8">
                    <div className="w-12 h-12 bg-brand-yellow rounded-[10px] flex items-center justify-center mb-5">
                      <Check className="w-6 h-6 text-black" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-blue block mb-3">{adv.badge}</span>
                    {adv.value ? (
                      <span className="text-3xl font-semibold tracking-tight text-black block mb-3">{adv.value}</span>
                    ) : (
                      <h3 className="text-xl font-semibold tracking-tight text-black mb-3">{adv.title}</h3>
                    )}
                    <p className="text-sm text-neutral-600 leading-relaxed">{adv.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="bg-white px-6 py-12 md:py-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">FAQ</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  <span className="text-brand-yellow">Frequently</span> Asked Questions
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="border border-neutral-200 bg-neutral-50 rounded-[10px] p-6 md:p-10 shadow-sm">
                  <div className="flex flex-col gap-4">
                    {page.faqs.map((faq, idx) => (
                      <div key={idx} className="py-4 border-b border-neutral-200 last:border-0">
                        <h4 className="text-sm font-semibold text-black mb-2">{faq.question}</h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-brand-blue text-white px-6 py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] mb-6">
            <span className="text-brand-yellow">Ready</span> to Advance Your Biologics Program?
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
              href="/overview/facility"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
            >
              Explore our facility
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
