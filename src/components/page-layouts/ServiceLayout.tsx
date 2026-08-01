import Link from 'next/link';
import {
  ArrowRight,
  Activity,
  Beaker,
  Dna,
  FlaskConical,
  Microscope,
  Search,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import SpecFlow from '@/components/SpecFlow';
import { getStepIcon } from '@/lib/stepIcon';
import type { CDMOPage } from '@/data/cdmoData';
import type { PageContent } from '@/types/page';

interface ServiceLayoutProps {
  page: CDMOPage;
  content: PageContent;
}

const CAPABILITY_ICONS = [FlaskConical, Dna, Microscope, Activity, Search, Beaker];

export default function ServiceLayout({ page, content }: ServiceLayoutProps) {
  const [heroFirstWord, ...heroRest] = page.heading.split(' ');

  return (
    <>
      {/* HERO */}
      <section className="relative bg-molecules-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span>{page.category}</span>
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.05] mb-6">
                <span className="text-black">{heroFirstWord}</span> {heroRest.join(' ')}
              </h1>
              <p className="text-base text-neutral-600 leading-relaxed max-w-xl">
                {page.description}
              </p>
            </div>
            <Reveal>
              <div className="w-full aspect-[4/3] overflow-hidden rounded-[10px] border border-neutral-200/20 shadow-2xl bg-white">
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

      {/* CAPABILITY CARDS */}
      <section className="px-6 py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow block mb-4">Capabilities</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15]">
                <span className="text-black">Core</span> Capabilities
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4">
                Detailed service offerings engineered to move your biologics program forward.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.sections.map((section, idx) => {
              const Icon = CAPABILITY_ICONS[idx % CAPABILITY_ICONS.length];
              return (
                <Reveal key={idx} delay={idx * 0.1} className="h-full">
                  <div className="group h-full glass-card rounded-[10px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col">
                    {/* Photo header */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-white">
                      {section.image && (
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-[10px] bg-brand-yellow text-black text-[10px] font-bold uppercase tracking-wider shadow-md">
                        {String(idx + 1).padStart(2, '0')} — Capability
                      </span>
                    </div>
                    {/* Body */}
                    <div className="p-6 md:p-7 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-10 h-10 rounded-[10px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-brand-blue" />
                        </span>
                        <h3 className="text-lg font-semibold text-black group-hover:text-brand-blue transition-colors">
                          {section.title}
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed">
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

      {/* NUMBERED PROCESS TIMELINE */}
      <section className="px-6 py-12 md:py-20 border-y border-neutral-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow block mb-4">Workflow</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-black leading-[1.15] mb-4">
                <span className="text-black">Development</span> Workflow
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                A methodical path from molecular design to robust process definition, designed for smooth GMP transfer.
              </p>
            </div>

            <div className="lg:col-span-8 relative">
              <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-brand-blue/20" />
              <div className="flex flex-col gap-8">
                {content.processSteps.map((stepObj, idx) => {
                  const StepIcon = getStepIcon(stepObj.title);
                  return (
                    <Reveal key={idx} delay={idx * 0.08}>
                      <div className="relative flex gap-6 md:gap-8 items-start">
                        <div className="relative z-10 w-14 h-14 rounded-[10px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <StepIcon className="w-7 h-7 text-brand-blue" />
                        </div>
                      <div className="flex-1 glass-card rounded-[10px] p-6 shadow-sm">
                        <h3 className="text-xl font-semibold text-black mb-2">
                          {stepObj.title}
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {stepObj.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECS — biological workflow strip */}
      <section className="px-6 py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto">
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
        <section className="bg-molecules px-6 py-12 md:py-20">
          <div className="max-w-[1400px] mx-auto">
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
        <section className="px-6 py-12 md:py-20 border-y border-neutral-100">
          <div className="max-w-[1400px] mx-auto">
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
      <section className="relative overflow-hidden bg-brand-navy text-white px-6 py-12 md:py-20">
        <video src="/videos/Floating-Molecule-Video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-navy/50 pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
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
