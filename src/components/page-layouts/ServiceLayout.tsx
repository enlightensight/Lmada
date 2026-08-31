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
  Sparkles,
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
  Workflow
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import SpecFlow from '@/components/SpecFlow';
import IntegratedTimeline from '@/components/IntegratedTimeline';
import DownstreamProcessAnimation from '@/components/DownstreamProcessAnimation';
import UpstreamProcessAnimation from '@/components/UpstreamProcessAnimation';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface ServiceLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

const CAPABILITY_ICONS = [FlaskConical, Dna, Microscope, Activity, Search, Beaker];

function getBulletCapabilityIcon(text: string, index: number) {
  const lower = text.toLowerCase();
  if (lower.includes('codon') || lower.includes('gene synthesis')) return Dna;
  if (lower.includes('vector') || lower.includes('construct')) return Workflow;
  if (lower.includes('stable cell pool') || lower.includes('pool generation')) return FlaskConical;
  if (lower.includes('single-cell') || lower.includes('screening')) return Microscope;
  if (lower.includes('high-throughput') || lower.includes('selection')) return Sliders;
  if (lower.includes('productivity') || lower.includes('assessment')) return Activity;
  if (lower.includes('research cell bank') || lower.includes('rcb')) return TestTubes;
  if (lower.includes('master cell bank') || lower.includes('mcb') || lower.includes('cgmp')) return Award;
  if (lower.includes('documentation') || lower.includes('regulatory') || lower.includes('submissions') || lower.includes('validation') || lower.includes('qualification')) return FileCheck;
  if (lower.includes('media') || lower.includes('feed')) return FlaskConical;
  if (lower.includes('bioreactor') || lower.includes('shake flask')) return TestTubes;
  if (lower.includes('doe') || lower.includes('characterization')) return Sliders;
  if (lower.includes('cell culture') || lower.includes('clone') || lower.includes('cell line')) return Dna;
  if (lower.includes('intensification') || lower.includes('perfusion')) return Repeat;
  if (lower.includes('affinity') || lower.includes('chromatography') || lower.includes('uf/df') || lower.includes('filtration')) return Filter;
  if (lower.includes('ion exchange') || lower.includes('mixed-mode')) return Layers;
  if (lower.includes('hydrophobic')) return Droplets;
  if (lower.includes('viral')) return ShieldAlert;
  if (lower.includes('formulation')) return Beaker;
  if (lower.includes('identity') || lower.includes('purity') || lower.includes('testing')) return Search;
  if (lower.includes('hplc') || lower.includes('ce-sds') || lower.includes('ief')) return LineChart;
  if (lower.includes('potency') || lower.includes('binding') || lower.includes('cell-based')) return Activity;
  if (lower.includes('forced degradation') || lower.includes('stability')) return ShieldCheck;
  if (lower.includes('reference standard')) return Award;
  if (lower.includes('transfer')) return Share2;
  if (lower.includes('scalability')) return Maximize2;

  const fallbacks = [Dna, Workflow, FlaskConical, Microscope, Sliders, Activity, TestTubes, Award, FileCheck];
  return fallbacks[index % fallbacks.length];
}

export default function ServiceLayout({ page, content }: ServiceLayoutProps) {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-12 md:pt-20 md:pb-16">
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200 shadow-lg bg-white p-3 sm:p-5 flex items-center justify-center">
                <img
                  src={page.image || '/images/hero_cleanroom.png'}
                  alt={page.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* KEY CAPABILITIES (Rendered directly below Hero for Analytical Development) */}
      {page.slug === 'analytical' && page.capabilities && page.capabilities.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 bg-white border-b border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-12">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow block mb-3">Core Scope</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  <span className="text-black">Key</span> Capabilities
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-3">
                  Comprehensive analytical testing, assay validation, and characterization platforms supporting biologics across development and QC release.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {page.capabilities.map((cap, cIdx) => {
                const CapIcon = getBulletCapabilityIcon(cap, cIdx);
                const isLastAndOdd = cIdx === page.capabilities!.length - 1 && page.capabilities!.length % 2 === 1;
                return (
                  <Reveal key={cIdx} delay={cIdx * 0.05} className={isLastAndOdd ? 'sm:col-span-2' : ''}>
                    <div className="group flex items-center gap-4 p-4 sm:p-5 rounded-[10px] bg-neutral-50/80 border border-neutral-200/80 hover:border-brand-yellow hover:bg-white hover:shadow-md transition-all duration-300 h-full">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-200">
                        <CapIcon className="w-5 h-5 text-brand-blue group-hover:text-black transition-colors duration-200" />
                      </div>
                      <span className="text-sm sm:text-base font-medium text-neutral-800 leading-snug group-hover:text-black">
                        {cap}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TECHNICAL FOCUS AREAS — HORIZONTAL SECTIONS WITH KEY CAPABILITIES ICONS */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
        <div className="w-full max-w-[1700px] mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow block mb-4">Deep Dives</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                <span className="text-black">Technical</span> Focus Areas
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
                Detailed service offerings engineered to move your biologics program forward.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10 md:gap-14">
            {content.sections.map((section, idx) => {
              const Icon = section.title.toLowerCase().includes('upstream')
                ? FlaskConical
                : section.title.toLowerCase().includes('downstream')
                ? Filter
                : section.title.toLowerCase().includes('analytical')
                ? Microscope
                : section.title.toLowerCase().includes('cell line') || section.title.toLowerCase().includes('clone')
                ? Dna
                : section.title.toLowerCase().includes('formulation')
                ? Beaker
                : CAPABILITY_ICONS[idx % CAPABILITY_ICONS.length];

              const isUpstreamProcess = page.slug === 'process' && section.title.toLowerCase().includes('upstream');
              const isDownstreamProcess = page.slug === 'process' && section.title.toLowerCase().includes('downstream');
              const imageRight = idx % 2 === 1;

              return (
                <Reveal key={idx} delay={idx * 0.08}>
                  {isUpstreamProcess ? (
                    <div className="bg-white border border-neutral-200/80 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-11 h-11 rounded-[10px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-brand-blue" />
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-semibold text-black">
                          {section.title}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 max-w-4xl">
                        {section.text}
                      </p>

                      {section.bullets && section.bullets.length > 0 && (
                        <div className="pt-5 pb-8 border-t border-neutral-100">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block mb-3">
                            Key Capabilities
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {section.bullets.map((b, bIdx) => {
                              const BulletIcon = getBulletCapabilityIcon(b, bIdx);
                              return (
                                <div
                                  key={bIdx}
                                  className="group/pill flex items-center gap-3 p-3 rounded-[8px] bg-neutral-50 border border-neutral-200/70 hover:border-brand-yellow hover:bg-white transition-all duration-200"
                                >
                                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover/pill:bg-brand-yellow group-hover/pill:border-brand-yellow transition-colors duration-200">
                                    <BulletIcon className="w-4 h-4 text-brand-blue group-hover/pill:text-black transition-colors duration-200" />
                                  </div>
                                  <span className="text-xs font-medium text-neutral-800 leading-snug group-hover/pill:text-black">
                                    {b}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 6-Stage Upstream Process Interactive Animation */}
                      <div className="pt-6 border-t border-neutral-100">
                        <UpstreamProcessAnimation />
                      </div>
                    </div>
                  ) : isDownstreamProcess ? (
                    <div className="bg-white border border-neutral-200/80 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-11 h-11 rounded-[10px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-brand-blue" />
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-semibold text-black">
                          {section.title}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 max-w-4xl">
                        {section.text}
                      </p>

                      {section.bullets && section.bullets.length > 0 && (
                        <div className="pt-5 pb-8 border-t border-neutral-100">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block mb-3">
                            Key Capabilities
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {section.bullets.map((b, bIdx) => {
                              const BulletIcon = getBulletCapabilityIcon(b, bIdx);
                              return (
                                <div
                                  key={bIdx}
                                  className="group/pill flex items-center gap-3 p-3 rounded-[8px] bg-neutral-50 border border-neutral-200/70 hover:border-brand-yellow hover:bg-white transition-all duration-200"
                                >
                                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover/pill:bg-brand-yellow group-hover/pill:border-brand-yellow transition-colors duration-200">
                                    <BulletIcon className="w-4 h-4 text-brand-blue group-hover/pill:text-black transition-colors duration-200" />
                                  </div>
                                  <span className="text-xs font-medium text-neutral-800 leading-snug group-hover/pill:text-black">
                                    {b}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 6-Stage Downstream Purification Interactive Animation */}
                      <div className="pt-6 border-t border-neutral-100">
                        <DownstreamProcessAnimation />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white border border-neutral-200/80 rounded-[10px] p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* Image Box */}
                        <div className={`lg:col-span-5 ${imageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                          <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden bg-white border border-neutral-200/90 p-4 sm:p-5 flex items-center justify-center shadow-inner group">
                            {section.image && (
                              <img
                                src={section.image}
                                alt={section.title}
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
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

                          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
                            {section.text}
                          </p>

                          {section.bullets && section.bullets.length > 0 && (
                            <div className="pt-5 border-t border-neutral-100">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block mb-3">
                                Key Capabilities
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {section.bullets.map((b, bIdx) => {
                                  const BulletIcon = getBulletCapabilityIcon(b, bIdx);
                                  return (
                                    <div
                                      key={bIdx}
                                      className="group/pill flex items-center gap-3 p-3 rounded-[8px] bg-neutral-50 border border-neutral-200/70 hover:border-brand-yellow hover:bg-white transition-all duration-200"
                                    >
                                      <div className="w-8 h-8 rounded-full bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover/pill:bg-brand-yellow group-hover/pill:border-brand-yellow transition-colors duration-200">
                                        <BulletIcon className="w-4 h-4 text-brand-blue group-hover/pill:text-black transition-colors duration-200" />
                                      </div>
                                      <span className="text-xs font-medium text-neutral-800 leading-snug group-hover/pill:text-black">
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
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTEGRATED TIMELINE */}
      <IntegratedTimeline />

      {/* SPECS — biological workflow strip */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
        <div className="w-full max-w-[1700px] mx-auto">
          {content.specs && content.specs.length > 0 && (
            <>
              <Reveal>
                <div className="text-center mb-10 md:mb-14">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow block mb-4">Impact</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                    <span className="text-black">Key</span> Parameters
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
                    Performance metrics that define our development approach and de-risk your program.
                  </p>
                </div>
              </Reveal>
              <SpecFlow specs={content.specs} />
            </>
          )}
        </div>
      </section>

      {/* ADVANTAGES */}
      {content.advantages && content.advantages.length > 0 && (
        <section className="bg-molecules px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
          <div className="w-full max-w-[1700px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  The Lambda Edge
                </h2>
                <p className="text-sm sm:text-base text-black/70 leading-relaxed max-w-2xl mx-auto mt-4">
                  What sets our {page.category === 'services' ? 'development services' : page.category} apart.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.advantages.map((adv, idx) => (
                <Reveal key={idx} delay={idx * 0.08} className="h-full">
                  <div className="h-full bg-brand-blue rounded-[10px] p-7 shadow-sm hover:shadow-xl transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-[10px] text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-4">
                      {adv.badge}
                    </span>
                    {adv.value && (
                      <div className="text-3xl font-semibold text-white tracking-tight mb-2">{adv.value}</div>
                    )}
                    {adv.title && (
                      <h3 className="text-lg font-semibold text-white mb-2">{adv.title}</h3>
                    )}
                    <p className="text-sm text-white/80 leading-relaxed">{adv.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20 border-y border-neutral-100">
          <div className="w-full max-w-[1700px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow block mb-4">FAQ</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  <span className="text-black">Common</span> Questions
                </h2>
              </div>
              <div className="lg:col-span-8">
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
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-navy text-white px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
        <video src="/videos/Floating-Molecule-Video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-navy/50 pointer-events-none" />
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
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
              href="/services/cell-line"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
