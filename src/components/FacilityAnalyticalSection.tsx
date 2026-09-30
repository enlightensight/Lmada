'use client';

import React from 'react';
import { 
  Microscope, 
  Activity, 
  Layers, 
  Dna, 
  Target, 
  ShieldCheck, 
  Workflow, 
  GitMerge, 
  Syringe, 
  TestTubes,
  Check, 
  Sparkles,
  Zap,
  CheckCircle2,
  Atom
} from 'lucide-react';
import Reveal from '@/components/Reveal';

interface FacilityAnalyticalSectionProps {
  section?: {
    title: string;
    text: string;
    physicochemicalBullets?: string[];
    structuralBullets?: string[];
    functionalBullets?: string[];
    qtppText?: string;
    applications?: { title: string; description: string }[];
  } | null;
}

export default function FacilityAnalyticalSection({ section }: FacilityAnalyticalSectionProps) {
  const physicochemicalItems = section?.physicochemicalBullets || [
    'Chromatographic analysis using UHPLC and UPLC',
    'Capillary electrophoresis and image capillary electrophoresis',
    'LC-MS for mass spectrometry-based characterization',
    'RT-PCR for molecular analysis',
    'Automated liquid handling and high-throughput sample processing',
  ];

  const structuralItems = section?.structuralBullets || [
    'Primary, secondary, and higher-order structure characterization',
    'Circular dichroism spectroscopy',
    'FTIR',
    'Nano-DSF for thermal stability characterization',
    'Protein interaction and binding analysis',
    'Assessment of protein structure, purity, and thermal properties',
  ];

  const functionalItems = section?.functionalBullets || [
    'SPR and Octet for protein interaction and binding analysis',
    'Flow cytometry',
    'Multimode plate readers',
    'Cell-based and functional assays',
    'Assessment of biological activity and functional properties',
  ];

  const qtppText = section?.qtppText || 
    'Our analytical sciences platform supports biologics programs by aligning analytical strategies with the Quality Target Product Profile (QTPP) and providing data for characterization and decision-making across cell line, process, drug product, and manufacturing activities. The platform supports product understanding, batch release, and stability assessment through physicochemical, structural, biophysical, molecular, and functional characterization.';

  const applications = section?.applications || [
    {
      title: 'Biosimilars',
      description: 'High-throughput single clone identification and selection, reference product characterization, analytical similarity assessment, and product quality evaluation.',
    },
    {
      title: 'Bispecifics & ADCs',
      description: 'Physicochemical and functional characterization supporting assessment of structural attributes, conjugation-related attributes, and biological activity.',
    },
    {
      title: 'Across Development & Manufacturing',
      description: 'Analytical support from initial clone screening and process development through DS/DP batch release and stability studies.',
    },
  ];

  return (
    <section className="relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-white border-b border-neutral-200/80 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f223108_1px,transparent_1px),linear-gradient(to_bottom,#0f223108_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[1700px] mx-auto">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-brand-navy leading-[1.15] mb-4">
              Analytical Development &amp; Characterization
            </h2>
            <p className="text-[15px] sm:text-[16px] md:text-[17px] text-slate-700 font-normal leading-relaxed">
              Our analytical sciences platform supports biologics development and manufacturing through <strong className="text-neutral-900 font-semibold">physicochemical, structural, and functional characterization</strong>.
            </p>
          </div>
        </Reveal>

        {/* 3 Core Characterization Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-16">
          {/* Pillar 1: Physicochemical & Molecular Characterization */}
          <Reveal delay={0.08} className="h-full">
            <div className="h-full bg-slate-50/70 rounded-[14px] border border-neutral-200/90 shadow-sm hover:shadow-lg hover:border-cyan-500/50 transition-all duration-300 p-6 sm:p-7 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500" />
              
              <div className="flex items-center gap-3.5 mb-5 mt-1">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:border-cyan-600 transition-colors">
                  <Activity className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight leading-snug">
                    Physicochemical & Molecular Characterization
                  </h3>
                </div>
              </div>

              <div className="border-t border-neutral-200/70 pt-4 flex-1">
                <ul className="space-y-3">
                  {physicochemicalItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-cyan-600" />
                      </div>
                      <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Pillar 2: Structural & Biophysical Characterization */}
          <Reveal delay={0.12} className="h-full">
            <div className="h-full bg-slate-50/70 rounded-[14px] border border-neutral-200/90 shadow-sm hover:shadow-lg hover:border-cyan-500/50 transition-all duration-300 p-6 sm:p-7 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500" />
              
              <div className="flex items-center gap-3.5 mb-5 mt-1">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:border-cyan-600 transition-colors">
                  <Microscope className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight leading-snug">
                    Structural & Biophysical Characterization
                  </h3>
                </div>
              </div>

              <div className="border-t border-neutral-200/70 pt-4 flex-1">
                <ul className="space-y-3">
                  {structuralItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-cyan-600" />
                      </div>
                      <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Pillar 3: Functional & Cell-Based Analysis */}
          <Reveal delay={0.16} className="h-full">
            <div className="h-full bg-slate-50/70 rounded-[14px] border border-neutral-200/90 shadow-sm hover:shadow-lg hover:border-cyan-500/50 transition-all duration-300 p-6 sm:p-7 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500" />
              
              <div className="flex items-center gap-3.5 mb-5 mt-1">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:border-cyan-600 transition-colors">
                  <Target className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight leading-snug">
                    Functional & Cell-Based Analysis
                  </h3>
                </div>
              </div>

              <div className="border-t border-neutral-200/70 pt-4 flex-1">
                <ul className="space-y-3">
                  {functionalItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-cyan-600" />
                      </div>
                      <span className="text-[14px] sm:text-[15px] font-medium text-neutral-800 leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* QTPP Alignment Framework Section */}
        <Reveal delay={0.2}>
          <div className="max-w-4xl mx-auto text-center mb-16 pt-2">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-brand-orange" />
            </div>
            <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider block mb-2">
              Quality Target Product Profile (QTPP) Integration
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight leading-snug mb-5">
              Data-Driven Continuity Across Every Lifecycle Phase
            </h3>
            <p className="text-[16px] md:text-[18px] text-neutral-600 font-normal leading-relaxed mb-8 max-w-3xl mx-auto">
              {qtppText}
            </p>

            {/* Lifecycle Stage Flow Cards with Research Medical Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 max-w-4xl mx-auto">
              {/* Phase 01 */}
              <div className="group bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-4 sm:p-5 text-center shadow-xs hover:shadow-lg hover:border-brand-blue/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center cursor-default">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue group-hover:shadow-md group-hover:shadow-brand-blue/25 transition-all duration-300 mb-2.5 shadow-2xs">
                  <Dna className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-brand-orange text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-1">
                  Phase 01
                </span>
                <span className="text-neutral-900 text-xs sm:text-[13px] font-semibold leading-snug group-hover:text-brand-blue transition-colors">
                  Cell Line & Upstream
                </span>
              </div>

              {/* Phase 02 */}
              <div className="group bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-4 sm:p-5 text-center shadow-xs hover:shadow-lg hover:border-brand-blue/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center cursor-default">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue group-hover:shadow-md group-hover:shadow-brand-blue/25 transition-all duration-300 mb-2.5 shadow-2xs">
                  <TestTubes className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-brand-orange text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-1">
                  Phase 02
                </span>
                <span className="text-neutral-900 text-xs sm:text-[13px] font-semibold leading-snug group-hover:text-brand-blue transition-colors">
                  Downstream Process
                </span>
              </div>

              {/* Phase 03 */}
              <div className="group bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-4 sm:p-5 text-center shadow-xs hover:shadow-lg hover:border-brand-blue/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center cursor-default">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue group-hover:shadow-md group-hover:shadow-brand-blue/25 transition-all duration-300 mb-2.5 shadow-2xs">
                  <Syringe className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-brand-orange text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-1">
                  Phase 03
                </span>
                <span className="text-neutral-900 text-xs sm:text-[13px] font-semibold leading-snug group-hover:text-brand-blue transition-colors">
                  Drug Product (DP)
                </span>
              </div>

              {/* Phase 04 */}
              <div className="group bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-4 sm:p-5 text-center shadow-xs hover:shadow-lg hover:border-brand-blue/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center cursor-default">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue group-hover:shadow-md group-hover:shadow-brand-blue/25 transition-all duration-300 mb-2.5 shadow-2xs">
                  <ShieldCheck className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <span className="text-brand-orange text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block mb-1">
                  Phase 04
                </span>
                <span className="text-neutral-900 text-xs sm:text-[13px] font-semibold leading-snug group-hover:text-brand-blue transition-colors">
                  Release & Stability
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Selected Analytical Applications Section */}
        <Reveal delay={0.24}>
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-black leading-tight mb-4">
                Selected Analytical Applications
              </h3>
              <div className="h-1 w-12 bg-brand-blue rounded-full mx-auto mb-4" />
              <p className="text-[15px] text-neutral-600">
                Specialized characterization strategies tailored to challenging therapeutic modalities and lifecycle milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {applications.map((app, idx) => {
                const Icon = idx === 0 ? Layers : idx === 1 ? Atom : Workflow;

                return (
                  <div 
                    key={idx} 
                    className="bg-slate-50/80 rounded-[14px] border border-neutral-200/80 p-6 sm:p-7 shadow-xs hover:shadow-lg hover:border-cyan-500/40 hover:bg-white transition-all duration-300 flex flex-col group"
                  >
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-11 h-11 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 text-cyan-600" />
                      </div>
                      <h4 className="text-lg font-bold text-neutral-900 tracking-tight leading-snug">
                        {app.title}
                      </h4>
                    </div>
                    <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed flex-1">
                      {app.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
