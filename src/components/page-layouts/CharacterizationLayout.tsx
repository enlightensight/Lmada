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
  Atom,
  Layers,
  Filter,
  Syringe,
  Sparkles,
  Droplets,
  TestTubes,
  Gauge,
  PackageCheck
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import FAQSection from '@/components/FAQSection';
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

function getCharCapabilityIcon(text: string, index: number) {
  const lower = text.toLowerCase();
  if (lower.includes('peptide mapping') || lower.includes('primary structure') || lower.includes('mass analysis')) return Dna;
  if (lower.includes('sec-hplc') || lower.includes('ce-sds') || lower.includes('ief') || lower.includes('purity')) return Filter;
  if (lower.includes('potency') || lower.includes('adcc') || lower.includes('cdc') || lower.includes('bioassay')) return Activity;
  if (lower.includes('concentration') || lower.includes('water')) return Droplets;
  if (lower.includes('stability') || lower.includes('forced degradation') || lower.includes('stress')) return ShieldCheck;
  if (lower.includes('endotoxin') || lower.includes('lal') || lower.includes('bet') || lower.includes('mycoplasma') || lower.includes('microbial') || lower.includes('bioburden')) return Bug;
  if (lower.includes('sterility') || lower.includes('particulate')) return Sparkles;
  if (lower.includes('batch release') || lower.includes('regulatory') || lower.includes('standard qualification')) return FileCheck;
  if (lower.includes('disulfide') || lower.includes('glycan')) return Atom;
  if (lower.includes('charge variant') || lower.includes('aggregation') || lower.includes('fragmentation') || lower.includes('higher-order')) return Layers;
  if (lower.includes('comparability') || lower.includes('biosimilar')) return Scale;
  if (lower.includes('reporter gene') || lower.includes('binding') || lower.includes('mechanism-of-action')) return HeartPulse;
  if (lower.includes('anti-drug antibody') || lower.includes('ada') || lower.includes('neutralizing') || lower.includes('immunogenicity')) return Shield;
  if (lower.includes('environmental monitoring')) return Gauge;
  if (lower.includes('container closure')) return PackageCheck;
  if (lower.includes('identity') || lower.includes('lc-ms') || lower.includes('immunological')) return Microscope;
  
  const fallbacks = [Microscope, Scale, HeartPulse, Bug, FlaskConical, Beaker, ShieldCheck, Dna];
  return fallbacks[index % fallbacks.length];
}

function splitHeading(heading: string) {
  const words = heading.replace(/\.$/, '').split(' ');
  return { first: words[0], rest: words.slice(1).join(' ') };
}

export default function CharacterizationLayout({ page, content }: CharacterizationLayoutProps) {
  const icons = SLUG_ICONS[page.slug] ?? SLUG_ICONS['analytical-testing'];
  const heroHeading = splitHeading(page.heading);

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
            <span className="text-brand-yellow">{page.slug}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {page.badge && (
                <span className="inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                  {page.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.05]">
                <span className="text-neutral-900">{heroHeading.first}</span> {heroHeading.rest}
              </h1>
              <p className="text-[17px] text-slate-500 font-normal leading-relaxed max-w-xl mt-6">
                {page.description}
              </p>
            </div>
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-white">
                <img
                  src={page.image || '/images/hero_cleanroom.png'}
                  alt={page.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CAPABILITIES CHECKLIST GRID WITH RESEARCH SYMBOLS */}
      {page.capabilities && page.capabilities.length > 0 && page.slug !== 'bioassays' && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 bg-neutral-50/60 border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  <span className="text-neutral-900">Analytical</span> & Testing Scope
                </h2>
                <p className="text-[15px] sm:text-[17px] text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto mt-4">
                  Validated methodologies, qualified instrumentation, and cGMP-compliant testing suites for {page.title.split('—')[0].trim()}.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {page.capabilities.map((cap, idx) => {
                const Icon = getCharCapabilityIcon(cap, idx);
                return (
                  <Reveal key={idx} delay={idx * 0.03} className="h-full">
                    <div className="group h-full bg-white border border-neutral-200/80 rounded-[10px] p-6 shadow-sm hover:shadow-lg hover:border-brand-yellow transition-all duration-300 flex items-center gap-4">
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
          </div>
        </section>
      )}

      {/* CAPABILITY CARDS */}
      {page.slug === 'bioassays' ? (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15]">
                  <span className="text-neutral-900">Orthogonal</span> Methods for Comprehensive Characterization
                </h2>
              </div>
            </Reveal>

            {/* Bioassays: Technical Focus Cards */}
            <div className="flex flex-col gap-10 md:gap-14">
              {content.sections.map((section, idx) => {
                const Icon = icons[idx % icons.length];
                const imageRight = idx % 2 === 1;

                return (
                  <Reveal key={idx} delay={idx * 0.08}>
                    <div className="bg-white border border-neutral-200/80 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* Image Box */}
                        <div className={`lg:col-span-5 ${imageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                          <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-white border border-neutral-200/90 shadow-inner group">
                            {section.image && (
                              <img
                                src={section.image}
                                alt={section.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            )}
                          </div>
                        </div>

                        {/* Content Box */}
                        <div className={`lg:col-span-7 ${imageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                          <div className="flex items-center gap-3 mb-4">
                            <span className="w-11 h-11 rounded-[10px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-brand-blue" />
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-semibold text-black">
                              {section.title}
                            </h3>
                          </div>

                          <p className="text-[15px] sm:text-[17px] text-neutral-600 leading-relaxed mb-6">
                            {section.text}
                          </p>

                          {section.bullets && section.bullets.length > 0 && (
                            <div className="pt-5 border-t border-neutral-100">
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 block mb-3">
                                Key Capabilities
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {section.bullets.map((b, bIdx) => {
                                  const BulletIcon = getCharCapabilityIcon(b, bIdx);
                                  return (
                                    <div
                                      key={bIdx}
                                      className="group/pill flex items-center gap-3.5 p-3.5 rounded-[8px] bg-neutral-50 border border-neutral-200/70 hover:border-brand-yellow hover:bg-white transition-all duration-200"
                                    >
                                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover/pill:bg-brand-yellow group-hover/pill:border-brand-yellow transition-colors duration-200">
                                        <BulletIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-brand-blue group-hover/pill:text-black transition-colors duration-200" />
                                      </div>
                                      <span className="text-sm sm:text-base font-medium text-neutral-900 leading-snug group-hover/pill:text-black">
                                        {b}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        /* Analytical Testing, Physicochemical, Microbiological: Centered big first image & below content */
        content.sections && content.sections.length > 0 && (
          <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
            <div className="w-full max-w-5xl mx-auto">
              <Reveal>
                <div className="group glass-card rounded-[14px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200/80">
                  {content.sections[0].image && (
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/8] w-full overflow-hidden bg-neutral-100">
                      <img
                        src={content.sections[0].image}
                        alt={content.sections[0].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-8 sm:p-10 md:p-12 text-center max-w-3xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4 tracking-tight leading-snug group-hover:text-brand-blue transition-colors duration-300">
                      {content.sections[0].title}
                    </h3>
                    <p className="text-[17px] sm:text-[19px] text-neutral-600 leading-relaxed">
                      {content.sections[0].text}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )
      )}



      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <FAQSection faqs={page.faqs} />
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-navy text-white px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
        <video src="/videos/Floating-Molecule-Video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-navy/50 pointer-events-none" />
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight leading-[1.15] mb-6">
            <span className="text-white">Ready</span> to Advance Your Biologics Program?
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
            <a
              href="/virtual-tour/00%20MAIN%20BUILDING/index.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
            >
              Virtual Tour
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
