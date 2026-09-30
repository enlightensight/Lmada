import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Beaker, 
  Package, 
  ArrowRight, 
  Check, 
  Factory, 
  ShieldCheck, 
  Sparkles, 
  Eye, 
  Snowflake, 
  Truck, 
  Sliders, 
  CheckCircle2, 
  Building2,
  FileCheck2,
  Dna,
  Filter
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import FAQSection from '@/components/FAQSection';
import CommonCTA from '@/components/CommonCTA';

export const metadata: Metadata = {
  title: 'Manufacturing Services — cGMP Biomanufacturing & Clinical Supplies | Lambda CDMO',
  description: 'Lambda CDMO provides integrated manufacturing capabilities for biologics, supporting the transition from development into GMP drug substance and drug product manufacturing for clinical supplies.',
};

const MANUFACTURING_SUB_SERVICES = [
  {
    title: 'Drug Substance Manufacturing',
    slug: 'drug-substance',
    href: '/manufacturing/drug-substance',
    icon: Beaker,
    image: '/images/cdn/pexels-3938022.jpg',
    badge: 'cGMP DS Platform',
    description: 'Lambda CDMO provides cGMP drug substance manufacturing for biologics, supporting clinical development from First-in-Human (FIH) studies through later-phase programs.',
    capabilities: [
      'GMP seed train and production bioreactor operations',
      'Mammalian cell culture manufacturing',
      'Upstream and downstream processing',
      'Chromatographic purification and polishing'
    ],
  },
  {
    title: 'Drug Product Manufacturing',
    slug: 'drug-product',
    href: '/manufacturing/drug-product',
    icon: Package,
    image: '/images/insights/robotic_fill_finish.png',
    badge: 'Aseptic Fill-Finish',
    description: 'Lambda CDMO provides drug product manufacturing capabilities supporting the transition from bulk drug substance to finished clinical products across liquid and lyophilized forms.',
    capabilities: [
      'Formulation development and optimization',
      'Excipient compatibility studies',
      'GMP aseptic fill-finish operations',
      'Liquid and lyophilized dosage forms'
    ],
  },
];

const MANUFACTURING_WORKFLOW = [
  {
    step: '01',
    title: 'Technology Transfer & Scale-Up',
    desc: 'Formal gap assessment, scale-up modeling, and translation of laboratory recipes into cGMP master batch records.',
    icon: Sliders,
  },
  {
    step: '02',
    title: 'Raw Material & Cell Bank Release',
    desc: 'Compendial testing, vendor qualification, and strict chain-of-custody release for all single-use consumables and reagents.',
    icon: ShieldCheck,
  },
  {
    step: '03',
    title: 'cGMP Drug Substance Production',
    desc: 'Controlled seed train expansion, production bioreactor runs, harvest clarification, and multi-step column chromatography.',
    icon: Beaker,
  },
  {
    step: '04',
    title: 'Aseptic Fill-Finish & Lyophilization',
    desc: 'Grade A isolator automated filling, precision stoppering, capping, and optional cycle-optimized freeze-drying.',
    icon: Sparkles,
  },
  {
    step: '05',
    title: '100% Inspection & QC Testing',
    desc: 'Automated camera-based visual inspection, CCIT testing, in-process bioburden, sterility, and lot-release assays.',
    icon: Eye,
  },
  {
    step: '06',
    title: 'QP Release & Clinical Logistics',
    desc: 'Quality assurance batch review, Certificate of Analysis (CoA) generation, and temperature-monitored global shipment.',
    icon: Truck,
  },
];

const FACILITY_HIGHLIGHTS = [
  {
    value: '27,000',
    unit: 'sq. ft.',
    label: 'Campus Footprint',
    description: 'Purpose-built biologics development and GMP manufacturing campus in Ahmedabad, India.',
  },
  {
    value: '2x 200L',
    unit: 'Single-Use',
    label: 'Bioreactor Capacity',
    description: 'Flexible single-use bioreactor suites minimizing cross-contamination and turnaround times.',
  },
  {
    value: 'Grade A',
    unit: 'Isolator',
    label: 'Robotic Fill-Finish',
    description: 'Fully isolated automated filling line for vials, pre-filled syringes, and cartridges.',
  },
  {
    value: 'Global',
    unit: 'Compliant',
    label: 'Quality System',
    description: 'Aligned with US FDA (21 CFR Part 210/211/11), EMA Annex 1, WHO, and PMDA standards.',
  },
];

const MANUFACTURING_FAQS = [
  {
    question: 'What batch scales and filling formats are supported at the Ahmedabad facility?',
    answer: 'Our drug substance facility operates single-use bioreactors up to 2x 200L scale. Our drug product aseptic suite features an automated robotic isolator supporting liquid and lyophilized vials (2R to 50R), prefilled syringes (0.5 mL to 5 mL), and cartridges (1.5 mL to 3 mL).',
  },
  {
    question: 'How do you prevent cross-contamination during multi-product operations?',
    answer: 'We utilize dedicated single-use disposable flow paths across upstream, downstream, and fill-finish operations. Combined with Grade A/B/C cleanroom zoning, directional pressure differentials, and continuous environmental monitoring, product cross-contamination is eliminated.',
  },
  {
    question: 'What regulatory standards govern the manufacturing facility?',
    answer: 'The Ahmedabad manufacturing campus operates under a harmonized Quality Management System compliant with US FDA (21 CFR Part 210, 211, and Part 11), EMA cGMP (EudraLex Vol 4, Annex 1), PIC/S, and WHO cGMP guidelines.',
  },
  {
    question: 'Do you support lyophilization cycle development and clinical scale freeze-drying?',
    answer: 'Yes, we provide formulation screening, thermal characterization (Tg/Tcc), lyophilization cycle development, and clinical-scale freeze-drying with automated loading/unloading inside our barrier isolator system.',
  },
];

export default function ManufacturingServicesPage() {
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
            <span className="text-brand-orange">Manufacturing Services</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Badge: Orange Uppercase */}
              <span className="inline-block px-3.5 py-1.5 rounded-[10px] text-[11px] uppercase font-bold tracking-wider bg-brand-orange text-white mb-6 shadow-xs">
                MANUFACTURING SERVICES
              </span>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.08]">
                <span className="text-neutral-900">From Process Development to Clinical Manufacturing.</span> Delivered with Confidence.
              </h1>

              {/* Exact Text from Specification */}
              <div className="space-y-4 text-[16px] sm:text-[17px] text-slate-600 font-normal leading-relaxed mt-6 max-w-2xl">
                <p>
                  Manufacturing success depends on process consistency, product quality, and effective technology transfer. Lambda CDMO provides integrated manufacturing capabilities for biologics, supporting the transition from development into <strong className="text-neutral-900 font-semibold">GMP drug substance and drug product manufacturing for clinical supplies.</strong>
                </p>
                <p>
                  Our manufacturing operations at Ahmedabad, India bring together process, analytical, manufacturing, and quality functions to support controlled execution, consistent product quality, and regulatory requirements across clinical programs.
                </p>
              </div>

              {/* Quick Jump Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/manufacturing/drug-substance"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Beaker className="w-4 h-4" />
                  <span>Drug Substance</span>
                </Link>
                <Link
                  href="/manufacturing/drug-product"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-neutral-900 hover:bg-brand-orange text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <Package className="w-4 h-4" />
                  <span>Drug Product</span>
                </Link>
                <Link
                  href="/facility&location/India"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] border border-neutral-300 hover:border-brand-orange hover:text-brand-orange text-neutral-800 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <Factory className="w-4 h-4" />
                  <span>Ahmedabad Facility</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-white group">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src="/images/hero_cleanroom.png"
                      alt="Lambda CDMO cGMP Biomanufacturing Facility"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-orange mb-1">
                        <Factory className="w-3.5 h-3.5" />
                        <span>Ahmedabad Campus</span>
                      </div>
                      <p className="text-sm font-medium text-white/90">
                        Integrated cGMP drug substance and robotic isolator fill-finish manufacturing suites.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* MANUFACTURING PILLARS — 2 LARGE CARDS */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-molecules border-b border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {MANUFACTURING_SUB_SERVICES.map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <Reveal key={service.slug} delay={idx * 0.12}>
                  <div className="group h-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
                    {/* Header Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/25 to-transparent" />
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
                              <li key={cIdx} className="flex items-start gap-2.5 text-[14px] text-neutral-700 font-normal">
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
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-brand-orange text-white font-semibold text-xs uppercase tracking-wider transition-all group/btn shadow-xs"
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

      {/* FACILITY STATS & SPECS */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-20 bg-white border-b border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITY_HIGHLIGHTS.map((item, idx) => (
              <Reveal key={item.label} delay={idx * 0.08}>
                <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-brand-blue/30 hover:bg-white hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight font-mono">
                        {item.value}
                      </span>
                      <span className="text-xs font-bold text-brand-orange uppercase">
                        {item.unit}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900 mb-2">
                      {item.label}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* END-TO-END CLINICAL MANUFACTURING WORKFLOW */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-molecules border-b border-neutral-100">
        <div className="w-full max-w-[1700px] mx-auto">
          <Reveal>
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-blue block mb-3">
                Execution Workflow
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light md:font-normal tracking-tight text-neutral-900 leading-[1.15] mb-4">
                Controlled Execution from Ingestion to QP Release
              </h2>
              <div className="h-1 w-16 bg-brand-blue rounded-full mx-auto mb-5" />
              <p className="text-[15px] sm:text-[17px] text-slate-600 font-normal leading-relaxed">
                Every manufacturing batch follows rigorous cGMP quality oversight, electronic data integrity protocols, and phase-appropriate regulatory documentation.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MANUFACTURING_WORKFLOW.map((wf, wIdx) => {
              const WfIcon = wf.icon;
              return (
                <Reveal key={wf.step} delay={wIdx * 0.08}>
                  <div className="p-6 rounded-2xl border border-neutral-200/80 bg-white hover:border-brand-orange/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black text-brand-orange/30 font-mono">
                          {wf.step}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                          <WfIcon className="w-5 h-5" />
                        </div>
                      </div>
                      <h4 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                        {wf.title}
                      </h4>
                      <p className="text-sm text-slate-600 font-normal leading-relaxed">
                        {wf.desc}
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
      <FAQSection faqs={MANUFACTURING_FAQS} />

      {/* CTA */}
      <CommonCTA />
    </main>
  );
}
