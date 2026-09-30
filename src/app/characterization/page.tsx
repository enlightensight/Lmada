import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Microscope, 
  Scale, 
  HeartPulse, 
  Bug, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Activity, 
  Search, 
  FlaskConical, 
  Sparkles, 
  Layers, 
  LineChart, 
  Sliders,
  Atom,
  TestTubes
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import FAQSection from '@/components/FAQSection';
import CommonCTA from '@/components/CommonCTA';

export const metadata: Metadata = {
  title: 'Analytical Characterization & Testing — Biologics Analytics | Lambda CDMO',
  description: 'Lambda CDMO provides analytical characterization and testing capabilities to support product understanding, process development, comparability, manufacturing, batch release, and stability assessment across biologics programs.',
};

const CHARACTERIZATION_SUB_SERVICES = [
  {
    title: 'Analytical Testing',
    slug: 'analytical-testing',
    href: '/characterization/analytical-testing',
    icon: Microscope,
    image: '/images/default_scientist.jpg',
    badge: 'QC Testing & Release',
    description: 'Reliable analytical testing for biologics drug substance and drug product, supporting in-process controls, batch release, stability programs, and regulatory compliance.',
    capabilities: [
      'Identity testing using peptide mapping, LC-MS, and immunological methods',
      'Purity and impurity analysis using SEC-HPLC, CE-SDS, and IEF',
      'Protein concentration analysis',
      'Potency testing using cell-based and ligand-binding assays'
    ],
  },
  {
    title: 'Physicochemical Characterization',
    slug: 'physicochemical',
    href: '/characterization/physicochemical',
    icon: Scale,
    image: '/images/cdn/unsplash-1532187863486-abf9dbad1b69.jpg',
    badge: 'Structural & Biophysical',
    description: 'Comprehensive structural, molecular, and biophysical characterization to evaluate identity, purity, structural attributes, heterogeneity, stability, and product comparability.',
    capabilities: [
      'Primary structure analysis',
      'Intact mass and peptide mass analysis',
      'Disulfide bond characterization',
      'Glycan profiling'
    ],
  },
  {
    title: 'Bioassays & Immunogenicity Testing',
    slug: 'bioassays',
    href: '/characterization/bioassays',
    icon: HeartPulse,
    image: '/images/cdn/pexels-4033148.jpg',
    badge: 'Functional & Potency',
    description: 'Bioassay capabilities to evaluate biological activity, potency, binding, and functional properties of biologic products across development and manufacturing.',
    capabilities: [
      'Cell-based potency assays',
      'Reporter gene assays',
      'Binding assays',
      'ADCC and CDC functional assays'
    ],
  },
  {
    title: 'Microbiological Testing',
    slug: 'microbiological',
    href: '/characterization/microbiological',
    icon: Bug,
    image: '/images/cdn/unsplash-1576086213369-97a306d36557.jpg',
    badge: 'Microbiology QC',
    description: 'Controlled microbiological testing services supporting biologics manufacturing, environmental monitoring, bioburden reduction, and sterility assurance.',
    capabilities: [
      'Sterility testing',
      'Bioburden testing',
      'Bacterial endotoxin testing (BET)',
      'Environmental monitoring'
    ],
  },
];

const ANALYTICAL_PLATFORMS = [
  {
    name: 'High-Resolution Mass Spectrometry',
    desc: 'LC-MS/MS, Q-TOF, and Orbitrap systems for intact mass, peptide mapping, PTM identification, and host cell protein (HCP) identification.',
    icon: Microscope,
  },
  {
    name: 'Liquid Chromatography (HPLC / UPLC)',
    desc: 'Orthogonal separation modes: Size-Exclusion (SEC), Ion-Exchange (IEX), Hydrophobic Interaction (HIC), and Reversed-Phase (RP-HPLC).',
    icon: LineChart,
  },
  {
    name: 'Capillary Electrophoresis',
    desc: 'Automated CE-SDS (reducing / non-reducing) and imaged capillary isoelectric focusing (icIEF) for high-resolution charge and size heterogeneity.',
    icon: Activity,
  },
  {
    name: 'Biophysical Higher-Order Analysis',
    desc: 'Circular Dichroism (CD), Differential Scanning Calorimetry (DSC), Dynamic Light Scattering (DLS), and intrinsic fluorescence spectroscopy.',
    icon: Atom,
  },
  {
    name: 'Surface Plasmon Resonance & BLI',
    desc: 'Real-time kinetics (Ka, Kd, KD) and epitope binning utilizing Biacore SPR and Octet Bio-Layer Interferometry systems.',
    icon: Sliders,
  },
  {
    name: 'Cell-Based Potency & QC Bioassays',
    desc: 'MoA-reflective functional bioassays, ADCC / CDC reporter systems, apoptosis assays, and ligand-binding immunoassay platforms.',
    icon: TestTubes,
  },
];

const CHARACTERIZATION_FAQS = [
  {
    question: 'How does Lambda CDMO approach comparability and biosimilar similarity studies?',
    answer: 'We utilize a multi-tiered, orthogonal analytical characterization package comparing primary structure, higher-order structure, post-translational modifications (PTMs), charge/size heterogeneity, target binding kinetics, and functional bioassay potency against multiple reference product lots.',
  },
  {
    question: 'Are analytical methods qualified or validated according to ICH guidelines?',
    answer: 'Yes, all analytical methods are developed and validated in accordance with ICH Q2(R1) guidelines, covering specificity, linearity, accuracy, precision (repeatability and intermediate precision), range, limit of detection (LOD), and limit of quantitation (LOQ).',
  },
  {
    question: 'What stability conditions and programs are available for biologics?',
    answer: 'We offer ICH-compliant stability chambers covering real-time storage (5°C ± 3°C), accelerated storage (25°C/60% RH), stress testing (40°C/75% RH), and frozen/ultra-low storage (-20°C, -80°C) with validated stability-indicating methods.',
  },
  {
    question: 'Can you support forced degradation studies for critical quality attribute (CQA) identification?',
    answer: 'Yes, we perform structured forced degradation studies exposing molecules to thermal, pH (acid/base), oxidative, photolytic (ICH Q1B), and mechanical agitation stress to establish degradation pathways and validate method stability-indicating capability.',
  },
];

export default function AnalyticalCharacterizationPage() {
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
            <span className="text-brand-orange">Analytical Characterization and Testing</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Badge: Orange Uppercase */}
              <span className="inline-block px-3.5 py-1.5 rounded-[10px] text-[11px] uppercase font-bold tracking-wider bg-brand-orange text-white mb-6 shadow-xs">
                ANALYTICAL CHARACTERIZATION AND TESTING
              </span>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.08]">
                <span className="text-neutral-900">Analytical Insights that Advance Biologics Development</span>
              </h1>

              {/* Exact Text from Specification */}
              <div className="space-y-4 text-[16px] sm:text-[17px] text-slate-600 font-normal leading-relaxed mt-6 max-w-2xl">
                <p>
                  Lambda CDMO provides analytical characterization and testing capabilities to support <strong className="text-neutral-900 font-semibold">product understanding, process development, comparability, manufacturing, batch release, and stability assessment</strong> across biologics programs.
                </p>
                <p>
                  Our analytical platform combines <strong className="text-neutral-900 font-semibold">physicochemical, molecular, structural, biophysical, functional, and microbiological testing</strong> to generate data across development and manufacturing.
                </p>
              </div>

              {/* Quick Jump Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/characterization/analytical-testing"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Microscope className="w-4 h-4" />
                  <span>Analytical Testing</span>
                </Link>
                <Link
                  href="/characterization/physicochemical"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-neutral-900 hover:bg-brand-orange text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Scale className="w-4 h-4" />
                  <span>Physicochemical</span>
                </Link>
                <Link
                  href="/characterization/bioassays"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-neutral-300 hover:border-brand-orange hover:text-brand-orange text-neutral-800 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <HeartPulse className="w-4 h-4" />
                  <span>Bioassays & ADA</span>
                </Link>
                <Link
                  href="/characterization/microbiological"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-neutral-300 hover:border-brand-blue hover:text-brand-blue text-neutral-800 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <Bug className="w-4 h-4" />
                  <span>Microbiology</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-white group">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src="/images/default_analytics.png"
                      alt="Lambda CDMO Analytical Characterization and Testing"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-orange mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Comprehensive Analytics</span>
                      </div>
                      <p className="text-sm font-medium text-white/90">
                        Orthogonal physicochemical, biophysical, bioassay, and microbiological analytical sciences.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CORE CHARACTERIZATION & TESTING PILLARS */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-molecules border-b border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <Reveal>
            <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-orange block mb-3">
                Analytical Suite
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-4">
                Four Pillars of Analytical Characterization & Testing
              </h2>
              <div className="h-1 w-16 bg-brand-orange rounded-full mx-auto mb-5" />
              <p className="text-[15px] sm:text-[17px] text-slate-600 font-normal leading-relaxed">
                Integrated analytical methods providing rigorous insight into purity, potency, structure, and microbiological quality from early development to commercial release.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CHARACTERIZATION_SUB_SERVICES.map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <Reveal key={service.slug} delay={idx * 0.1}>
                  <div className="group h-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
                    {/* Header Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-brand-navy backdrop-blur-xs shadow-xs">
                          {service.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-white">
                        <div className="w-9 h-9 rounded-lg bg-brand-orange text-white flex items-center justify-center shrink-0 shadow-sm">
                          <ServiceIcon className="w-4 h-4" />
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                      <div>
                        <p className="text-[14.5px] text-slate-600 leading-relaxed mb-6 font-normal">
                          {service.description}
                        </p>

                        <div className="border-t border-neutral-100 pt-5 mb-6">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 block mb-3.5">
                            Key Capabilities
                          </span>
                          <ul className="space-y-3">
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

      {/* STATE-OF-THE-ART ANALYTICAL TECHNOLOGIES */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-white border-b border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <Reveal>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-blue block mb-3">
                Instrumentation & Platforms
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-4">
                Advanced Analytical Technologies
              </h2>
              <div className="h-1 w-16 bg-brand-blue rounded-full mx-auto mb-5" />
              <p className="text-[15px] sm:text-[17px] text-slate-600 font-normal leading-relaxed">
                State-of-the-art instrument fleet supporting orthogonal characterization, molecular fingerprinting, and regulatory-grade data packages.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANALYTICAL_PLATFORMS.map((plat, pIdx) => {
              const PlatIcon = plat.icon;
              return (
                <Reveal key={plat.name} delay={pIdx * 0.08}>
                  <div className="p-6 rounded-2xl border border-neutral-200/80 bg-gradient-to-br from-white to-slate-50/50 hover:border-brand-blue/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                        <PlatIcon className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                        {plat.name}
                      </h4>
                      <p className="text-sm text-slate-600 font-normal leading-relaxed">
                        {plat.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <FAQSection faqs={CHARACTERIZATION_FAQS} />

      {/* CTA */}
      <CommonCTA />
    </main>
  );
}
