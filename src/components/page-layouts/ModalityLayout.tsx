import Link from 'next/link';
import { ArrowRight, Dna, Atom, FlaskConical, Microscope } from 'lucide-react';
import Reveal from '@/components/Reveal';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface ModalityLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

const capabilityIcons = [Dna, Atom, FlaskConical, Microscope];

// Floating stat chip positions around the hero image — one preset picked per slug
const chipPositionPresets = [
  ['-top-5 -left-4 md:-left-8', 'top-1/3 -right-4 md:-right-8', '-bottom-6 left-1/4'],
  ['-top-6 right-6', '-bottom-5 -left-4 md:-left-8', 'top-1/2 -right-4 md:-right-8'],
  ['-bottom-6 right-8', '-top-5 -right-4 md:-right-8', 'top-1/4 -left-4 md:-left-8'],
];

function rotate<T>(arr: T[], by: number): T[] {
  if (arr.length === 0) return arr;
  const shift = by % arr.length;
  return [...arr.slice(shift), ...arr.slice(0, shift)];
}

export default function ModalityLayout({ page, content }: ModalityLayoutProps) {
  // Deterministic per-slug variation so sibling modality pages don't look identical
  const slugHash = page.slug.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const chipPositions = chipPositionPresets[slugHash % chipPositionPresets.length];
  const capabilitySections = rotate(content.sections, slugHash);
  const specAccentIndex = content.specs.length > 0 ? slugHash % content.specs.length : -1;

  const [firstWord, ...restWords] = page.heading.split(' ');
  const heroChips = content.stats.slice(0, 3);

  return (
    <>
      {/* HERO — molecule-focused: large rounded image with floating yellow stat chips */}
      <section className="relative bg-brand-blue text-white overflow-hidden">
        <div className="relative max-w-[1400px] mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/50 mb-10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">{page.category}</span>
            <span>/</span>
            <span className="text-white">{page.slug}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              {page.badge && (
                <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-brand-yellow text-black mb-6">
                  {page.badge}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
                <span className="text-brand-yellow">{firstWord}</span>{' '}
                {restWords.join(' ')}
              </h1>
              <p className="text-base text-white/70 leading-relaxed max-w-xl mb-10">
                {page.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] bg-brand-yellow hover:bg-brand-yellow-hover text-black font-medium text-sm uppercase tracking-wider shadow-md hover:shadow active:scale-95 transition-all"
                >
                  Discuss your molecule
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href="/overview/facility"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
                >
                  Explore the facility
                </Link>
              </div>
            </div>

            {page.image && (
              <Reveal>
                <div className="relative px-4 md:px-8 py-6">
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-[10px] border border-white/10 shadow-2xl">
                    <img
                      src={page.image}
                      alt={page.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {heroChips.map((stat, idx) => (
                    <div
                      key={idx}
                      className={`absolute ${chipPositions[idx % chipPositions.length]} bg-brand-yellow text-black rounded-[10px] px-4 py-3 shadow-xl`}
                    >
                      <span className="block text-xl font-semibold tracking-tight leading-none">{stat.value}</span>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider mt-1 text-black/70">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* PLATFORM CAPABILITIES — all-blue cards, yellow on hover (like home modality cards) */}
      <section className="px-6 py-12 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">Platform</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                <span className="text-brand-yellow">Integrated</span> Capabilities for This Modality
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
                Development, analytical, and manufacturing capabilities tailored to the molecule.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilitySections.map((section, idx) => {
              const Icon = capabilityIcons[idx % capabilityIcons.length];
              return (
                <Reveal key={idx} delay={idx * 0.05} className="h-full">
                  <div className="group h-full bg-brand-blue hover:bg-brand-yellow rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    {section.image && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-[10px] bg-brand-yellow group-hover:bg-brand-blue flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                          <Icon className="w-5 h-5 text-brand-blue group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-black transition-colors duration-300">{section.title}</h3>
                      </div>
                      <p className="text-sm text-white/80 group-hover:text-black/70 leading-relaxed transition-colors duration-300">{section.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SPECS GRID — one yellow accent card per page, position varies by slug */}
      {content.specs && content.specs.length > 0 && (
        <section className="px-6 py-12 md:py-20 bg-neutral-50 border-y border-neutral-100">
          <div className="max-w-[1400px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">Platform Summary</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  <span className="text-brand-yellow">Technical</span> Scope
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
                  Expression systems, manufacturing scope, and analytical support tailored to the modality.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.specs.map((spec, idx) => {
                const isAccent = idx === specAccentIndex;
                return (
                  <Reveal key={idx} delay={idx * 0.05} className="h-full">
                    <div
                      className={`h-full rounded-[10px] p-6 shadow-sm transition-all duration-300 hover:shadow-xl ${
                        isAccent
                          ? 'bg-brand-yellow text-black'
                          : 'bg-white border border-neutral-200'
                      }`}
                    >
                      <span className={`text-[11px] font-bold uppercase tracking-wider block mb-3 ${isAccent ? 'text-black/60' : 'text-brand-blue'}`}>
                        {spec.label}
                      </span>
                      <span className={`text-lg font-semibold leading-snug ${isAccent ? 'text-black' : 'text-black'}`}>
                        {spec.value}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS — numbered pathway with blue step chips */}
      <section className="px-6 py-12 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">Process</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                <span className="text-brand-yellow">Development</span> Pathway
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.processSteps.slice(0, 4).map((stepObj, idx) => (
              <Reveal key={idx} delay={idx * 0.05} className="h-full">
                <div className="h-full bg-white border border-neutral-200 rounded-[10px] p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="w-10 h-10 rounded-[10px] bg-brand-blue flex items-center justify-center mb-4">
                    <span className="text-sm font-semibold text-white">{stepObj.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">{stepObj.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{stepObj.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS — yellow band with blue stat cards (home Why-Lambda pattern) */}
      {content.stats && content.stats.length > 0 && (
        <section className="px-6 py-12 md:py-20 bg-brand-yellow">
          <div className="max-w-[1400px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  Platform Metrics
                </h2>
                <p className="text-sm sm:text-base text-black/70 leading-relaxed max-w-2xl mx-auto mt-4">
                  Performance markers for this modality platform.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {content.stats.map((stat, idx) => (
                <Reveal key={idx} delay={idx * 0.08} className="h-full">
                  <div className="bg-brand-blue rounded-[10px] p-6 md:p-8 h-full flex flex-col justify-center text-center shadow-sm hover:shadow-xl transition-all duration-300">
                    <span className="text-3xl md:text-4xl font-semibold text-white tracking-tight">{stat.value}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80 mt-2">{stat.label}</span>
                    {stat.sublabel && <p className="text-xs text-white/70 mt-3 leading-relaxed">{stat.sublabel}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="px-6 py-12 md:py-20 bg-neutral-50 border-y border-neutral-100">
          <div className="max-w-[1400px] mx-auto">
            <Reveal>
              <div className="text-center mb-10 md:mb-14">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block mb-4">FAQ</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                  <span className="text-brand-yellow">Frequently</span> Asked Questions
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="max-w-3xl mx-auto border border-neutral-200 bg-white rounded-[10px] p-6 md:p-10 shadow-sm">
                <div className="flex flex-col gap-4">
                  {page.faqs.map((faq, idx) => (
                    <div key={idx} className="py-4 border-b border-neutral-100 last:border-0">
                      <h4 className="text-sm font-semibold text-brand-blue mb-2">{faq.question}</h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-brand-blue text-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15] mb-6">
              <span className="text-brand-yellow">Ready</span> to Advance Your Biologics Program?
            </h2>
            <p className="text-base text-white/70 max-w-2xl mx-auto mb-10">
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
                href="/modalities/mabs"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[10px] border border-white/40 text-white hover:bg-white hover:text-brand-blue font-medium text-sm uppercase tracking-wider transition-all"
              >
                Explore modalities
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
