import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Dna, 
  Settings, 
  Search, 
  ArrowRight, 
  Check, 
  FlaskConical, 
  Layers, 
  ShieldCheck, 
  Microscope, 
  Sliders, 
  GitMerge, 
  Target, 
  Syringe, 
  Activity,
  Workflow,
  Sparkles
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import FAQSection from '@/components/FAQSection';
import CommonCTA from '@/components/CommonCTA';

export const metadata: Metadata = {
  title: 'Development Services — Biologics Development & Process Sciences | Lambda CDMO',
  description: 'Lambda CDMO brings together cell line development, upstream and downstream process development, and analytical development to establish robust processes and support efficient tech transfer.',
};

const SUB_SERVICES = [
  {
    title: 'Cell Line Development',
    slug: 'cell-line',
    href: '/services/cell-line',
    icon: Dna,
    image: '/images/celldev.png',
    badge: 'Phase 01',
    description: 'High-producing, stable clone selection, monoclonality verification, and cGMP cell banking supporting scalable expression across mammalian host platforms.',
    capabilities: [
      'Gene synthesis, codon optimization & vector design',
      'Stable cell pool generation & single-cell cloning',
      'Monoclonality assurance with imaged proof',
      'Research Cell Bank (RCB) & Master Cell Bank (MCB) generation'
    ],
  },
  {
    title: 'Process Development',
    slug: 'process',
    href: '/services/process',
    icon: Settings,
    image: '/images/development.jpg',
    badge: 'Phase 02',
    description: 'Upstream bioreactor optimization and downstream chromatographic purification platforms built for seamless scale-up and high volumetric productivity.',
    capabilities: [
      'Media screening & fed-batch / perfusion optimization',
      'Multi-column chromatography purification development',
      'Viral clearance, inactivation & filtration studies',
      'Ultrafiltration / Diafiltration (UF/DF) & formulation'
    ],
  },
  {
    title: 'Analytical Development',
    slug: 'analytical',
    href: '/services/analytical',
    icon: Search,
    image: '/images/default_analytics.png',
    badge: 'Phase 03',
    description: 'Orthogonal method development, phase-appropriate qualification, and in-depth structural characterization for robust product understanding.',
    capabilities: [
      'HPLC / UPLC purity and charge/size variant methods',
      'Intact mass & peptide mapping by LC-MS/MS',
      'Potency bioassays & receptor binding characterization',
      'Forced degradation & stability-indicating method qualification'
    ],
  },
];

const DEVELOPMENT_PHASES = [
  {
    step: '01',
    title: 'Cell Line & Vector Engineering',
    desc: 'High-expression construct optimization, host platform transfection, and monoclonality verification.',
    icon: Dna,
  },
  {
    step: '02',
    title: 'Upstream Process Intensification',
    desc: 'Bioreactor parameter optimization (DoE), feeding regimens, and media optimization for high titer.',
    icon: FlaskConical,
  },
  {
    step: '03',
    title: 'Downstream Purification Platforms',
    desc: 'Chromatography resin screening, impurity clearance (HCP, HCD, aggregates), and robust viral filtration.',
    icon: Layers,
  },
  {
    step: '04',
    title: 'Analytical Method Qualification',
    desc: 'Development and phase-appropriate qualification of stability-indicating and release assays.',
    icon: Microscope,
  },
  {
    step: '05',
    title: 'Process Characterization & Scale-Up',
    desc: 'Identification of Critical Process Parameters (CPPs) and scale-up validation for tech transfer.',
    icon: Sliders,
  },
  {
    step: '06',
    title: 'GMP Technology Transfer',
    desc: 'Seamless transfer of qualified batch recipes and analytical methods into cGMP manufacturing suites.',
    icon: Workflow,
  },
];

const SUPPORTED_MODALITIES = [
  {
    title: 'Monoclonal Antibodies',
    href: '/modalities/mabs',
    desc: 'Platform processes for IgG1, IgG2, and IgG4 mAbs with high yield and critical quality attribute control.',
    icon: Target,
  },
  {
    title: 'Bispecific Antibodies',
    href: '/modalities/bispecifics',
    desc: 'Addressing complex chain pairing, heterodimer purification, and structural integrity.',
    icon: GitMerge,
  },
  {
    title: 'Antibody-Drug Conjugates (ADCs)',
    href: '/modalities/adcs',
    desc: 'Conjugation process development, Drug-to-Antibody Ratio (DAR) profiling, and linker chemistry.',
    icon: Syringe,
  },
  {
    title: 'Proteins & Peptides',
    href: '/modalities/proteins-peptides',
    desc: 'Recombinant proteins, fusion proteins, and synthetic peptides tailored for stability and potency.',
    icon: Dna,
  },
];

const DEVELOPMENT_FAQS = [
  {
    question: 'What mammalian cell expression systems are supported at Lambda CDMO?',
    answer: 'We support standard CHO expression platforms (including CHO-K1, CHO-GS, and CHO-DG44) as well as HEK293 systems, offering flexible, royalty-free, and high-titer production options for global clinical development.',
  },
  {
    question: 'How do you ensure monoclonality during cell line development?',
    answer: 'Monoclonality is guaranteed through high-resolution single-cell printing and verified by multi-timepoint brightfield microscopic imaging, delivering comprehensive documentation and audit-ready monoclonality assurance reports for regulatory agencies (US FDA, EMA, PMDA).',
  },
  {
    question: 'How are development processes transferred into cGMP manufacturing?',
    answer: 'Our integrated operating model bridges process development directly with our cGMP manufacturing suites at Ahmedabad. Analytical methods, process control parameters, and operational batch records undergo structured tech transfer protocols, supported by joint cross-functional teams.',
  },
  {
    question: 'Can you support biosimilar development and comparative characterization?',
    answer: 'Yes, we provide end-to-end biosimilar development including originator fingerprinting, Quality Target Product Profile (QTPP) establishment, iterative process tuning to match glycan/charge profiles, and state-of-the-art comparative analytical similarity assessment.',
  },
];

export default function DevelopmentServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-molecules-hero overflow-hidden px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 border-b border-neutral-100">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="relative w-full max-w-[1700px] mx-auto pt-16 pb-12 md:pt-20 md:pb-16">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-neutral-500 mb-8">
            <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-500">Services</span>
            <span>/</span>
            <span className="text-brand-orange">Development Services</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Badge: Orange Uppercase */}
              <span className="inline-block px-3.5 py-1.5 rounded-[10px] text-[11px] uppercase font-bold tracking-wider bg-brand-orange text-white mb-6 shadow-xs">
                DEVELOPMENT SERVICES
              </span>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.08]">
                <span className="text-neutral-900">Development Designed for Manufacturing</span>
              </h1>

              {/* Exact Text from Specification */}
              <div className="space-y-4 text-[16px] sm:text-[17px] text-slate-600 font-normal leading-relaxed mt-6 max-w-2xl">
                <p>
                  Lambda CDMO brings together cell line development, upstream and downstream process development, and analytical development to establish robust processes, generate meaningful development data, and support efficient technology transfer into GMP manufacturing.
                </p>
                <p>
                  Our development approach spans early-stage development through process characterization and technology transfer, with capabilities supporting monoclonal antibodies, bispecific antibodies, biosimilars, recombinant proteins, peptides, and other biologic modalities.
                </p>
              </div>

              {/* Quick Jump Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/services/cell-line"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Dna className="w-4 h-4" />
                  <span>Cell Line Dev</span>
                </Link>
                <Link
                  href="/services/process"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-neutral-900 hover:bg-brand-orange text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Settings className="w-4 h-4" />
                  <span>Process Dev</span>
                </Link>
                <Link
                  href="/services/analytical"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] border border-neutral-300 hover:border-brand-blue hover:text-brand-blue text-neutral-800 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <Search className="w-4 h-4" />
                  <span>Analytical Dev</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-white group">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src="/images/development.jpg"
                      alt="Lambda CDMO Biologics Development Services"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-orange mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Integrated Platform</span>
                      </div>
                      <p className="text-sm font-medium text-white/90">
                        Gene-to-GMP pipeline unifying clone engineering, process sciences, and analytical testing.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CORE DEVELOPMENT PILLARS — 3 CARDS */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-molecules border-b border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-4">
                Three Integrated Pillars of Biologics Development
              </h2>
              <div className="h-1 w-16 bg-brand-orange rounded-full mx-auto mb-5" />
              <p className="text-[15px] sm:text-[17px] text-slate-600 font-normal leading-relaxed">
                From initial sequence construct to cGMP-ready manufacturing recipes, our multidisciplinary teams work under a unified quality management framework.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {SUB_SERVICES.map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <Reveal key={service.slug} delay={idx * 0.1}>
                  <div className="group h-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
                    {/* Header Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-brand-navy backdrop-blur-xs shadow-xs">
                          {service.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2.5 text-white">
                        <div className="w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center shrink-0 shadow-sm">
                          <ServiceIcon className="w-4 h-4" />
                        </div>
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                      <div>
                        <p className="text-[14px] text-slate-600 leading-relaxed mb-6 font-normal">
                          {service.description}
                        </p>

                        <div className="border-t border-neutral-100 pt-4 mb-6">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block mb-3">
                            Key Capabilities
                          </span>
                          <ul className="space-y-2.5">
                            {service.capabilities.map((cap, cIdx) => (
                              <li key={cIdx} className="flex items-start gap-2.5 text-[13.5px] text-neutral-700 font-normal">
                                <div className="w-4 h-4 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                </div>
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-neutral-100">
                        <Link
                          href={service.href}
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-50 hover:bg-brand-orange text-neutral-900 hover:text-white font-semibold text-xs uppercase tracking-wider transition-all group/btn shadow-2xs"
                        >
                          <span>Explore {service.title}</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* STEP-BY-STEP DEVELOPMENT LIFECYCLE */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-white border-b border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <Reveal>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-blue block mb-3">
                Lifecycle Approach
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-4">
                Structured Development Flow to Clinical Readiness
              </h2>
              <div className="h-1 w-16 bg-brand-blue rounded-full mx-auto mb-5" />
              <p className="text-[15px] sm:text-[17px] text-slate-600 font-normal leading-relaxed">
                A disciplined, data-driven framework designed to reduce timelines, de-risk scale-up, and ensure regulatory compliance at each milestone.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEVELOPMENT_PHASES.map((phase, pIdx) => {
              const PhaseIcon = phase.icon;
              return (
                <Reveal key={phase.step} delay={pIdx * 0.08}>
                  <div className="p-6 rounded-2xl border border-neutral-200/80 bg-gradient-to-br from-white to-slate-50/50 hover:border-brand-blue/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black text-brand-orange/30 group-hover:text-brand-orange font-mono">
                          {phase.step}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                          <PhaseIcon className="w-5 h-5" />
                        </div>
                      </div>
                      <h4 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                        {phase.title}
                      </h4>
                      <p className="text-sm text-slate-600 font-normal leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUPPORTED MODALITIES SECTION */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-molecules border-b border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <Reveal>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                Broad Therapeutic Breadth
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-4">
                Capabilities Across Multiple Biologic Modalities
              </h2>
              <div className="h-1 w-16 bg-brand-orange rounded-full mx-auto mb-5" />
              <p className="text-[15px] sm:text-[17px] text-slate-600 font-normal leading-relaxed">
                Whether advancing standard monoclonal antibodies or next-generation engineered formats, our development platform is tailored to your target molecule.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUPPORTED_MODALITIES.map((mod, mIdx) => {
              const ModIcon = mod.icon;
              return (
                <Reveal key={mod.title} delay={mIdx * 0.08}>
                  <Link
                    href={mod.href}
                    className="group p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs hover:shadow-xl hover:border-brand-orange/50 transition-all duration-300 flex flex-col justify-between h-full hover:-translate-y-1 cursor-pointer"
                  >
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                        <ModIcon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-neutral-900 group-hover:text-brand-orange transition-colors mb-2">
                        {mod.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                        {mod.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-brand-orange pt-3 border-t border-neutral-100">
                      <span>View Modality</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <FAQSection faqs={DEVELOPMENT_FAQS} />

      {/* CTA */}
      <CommonCTA />
    </main>
  );
}
