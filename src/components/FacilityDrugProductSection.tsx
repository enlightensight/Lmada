'use client';

import React from 'react';
import { 
  Syringe, 
  FlaskConical, 
  Snowflake, 
  Factory, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  PackageCheck,
  Eye,
  Check
} from 'lucide-react';
import Reveal from '@/components/Reveal';

interface FacilityDrugProductSectionProps {
  section?: {
    title: string;
    text: string;
    image?: string;
    formulationBullets?: string[];
    lyophilizationBullets?: string[];
    gmpManufacturingBullets?: string[];
  } | null;
}

export default function FacilityDrugProductSection({ section }: FacilityDrugProductSectionProps) {
  const formulationItems = section?.formulationBullets || [
    'Stability Incubation Chambers',
    'Photostability Chambers',
    'Filling Operations using Flexicon Pumps',
    'Thermal Characterization',
    'Higher Order Structure (HOS) & Particle Size Distribution Analysis',
    'Container Closure Integrity Testing',
    'Residual Moisture Testing',
  ];

  const lyophilizationItems = section?.lyophilizationBullets || [
    'Development Lyophilizer with 0.5 m² shelf area, Pirani sensors, and controlled nucleation to support optimization of drying cycles for lyophilized products.',
  ];

  const gmpManufacturingItems = section?.gmpManufacturingBullets || [
    'Formulation Suite for Formulation and Filtration',
    'Isolator-Based Filling Line for RTU Vials, PFS, and Cartridges (~10,000 units per batch)',
    'Visual Inspection Suite and secondary packaging suite',
  ];

  return (
    <section className="relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-gradient-to-b from-white via-slate-50/60 to-white border-b border-neutral-200/80 overflow-hidden">
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#00aeef_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.07] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[1700px] mx-auto">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-black leading-[1.15] mb-5">
              Drug Product Development & Manufacturing
            </h2>
            <div className="h-1 w-12 bg-brand-blue rounded-full mb-5" />
            <p className="text-[17px] md:text-[19px] text-neutral-600 font-normal leading-relaxed">
              The drug product platform supports formulation, process development, lyophilization, and clinical GMP manufacturing.
            </p>
          </div>
        </Reveal>

        {/* Hero Highlight Card: Isolator-Based Robotic Filling Line & Inspection Suites */}
        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] text-neutral-900 p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl mb-12 group">
            {/* Ambient Glows */}
            <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-60 h-60 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight leading-snug mb-3.5">
                  Development capabilities.
                </h3>
                <p className="text-slate-600 text-[15px] sm:text-base leading-relaxed mb-6 font-normal">
                  The drug product filling line is isolator based with robotic operations minimizing operator handling and ensuring a high degree of aseptic compliance. The line has a nominal ability to process 10,000 units in a batch in vial, PFS or cartridge formats. The facility also has a visual inspection suite with manual inspection setup, and a suite for secondary packaging primarily for bulk packaging of filled units.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  <span className="px-3 py-1.5 rounded-lg bg-white/95 border border-slate-200 text-slate-700 text-xs font-medium shadow-xs">
                    ⚡ 10,000 Units / Batch
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/95 border border-slate-200 text-slate-700 text-xs font-medium shadow-xs">
                    🤖 Robotic Isolator Line
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/95 border border-slate-200 text-slate-700 text-xs font-medium shadow-xs">
                    💉 Vials • PFS • Cartridges
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/95 border border-slate-200 text-slate-700 text-xs font-medium shadow-xs">
                    🔍 Manual Visual Inspection Suite
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/95 border border-slate-200 text-slate-700 text-xs font-medium shadow-xs">
                    📦 Secondary Bulk Packaging
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-4 text-center shadow-xs hover:shadow-md hover:border-brand-blue/50 transition-all">
                  <Cpu className="w-7 h-7 text-brand-blue mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-neutral-900">10k</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Nominal Batch Size</div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-4 text-center shadow-xs hover:shadow-md hover:border-brand-orange/50 transition-all">
                  <ShieldCheck className="w-7 h-7 text-brand-orange mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-neutral-900">Grade A</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Aseptic Isolator</div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-4 text-center shadow-xs hover:shadow-md hover:border-brand-blue/50 transition-all">
                  <Syringe className="w-7 h-7 text-brand-blue mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-neutral-900">3 Formats</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Vials / PFS / Cartridges</div>
                </div>
                <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-4 text-center shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all">
                  <PackageCheck className="w-7 h-7 text-emerald-600 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-bold text-neutral-900">Bulk Pack</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Secondary Packaging</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3 Capability Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Pillar 1: Formulation Development */}
          <Reveal delay={0.12} className="h-full">
            <div className="h-full bg-white rounded-[14px] border border-neutral-200/90 shadow-sm hover:shadow-lg hover:border-cyan-500/50 transition-all duration-300 p-6 sm:p-7 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500" />
              
              <div className="flex items-center gap-3.5 mb-5 mt-1">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:border-cyan-600 transition-colors">
                  <FlaskConical className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight leading-snug">
                    Formulation development
                  </h3>
                  <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">
                    Stability & Characterization
                  </span>
                </div>
              </div>

              <p className="text-sm text-neutral-600 mb-5 leading-relaxed">
                Comprehensive formulation screening, container closure compatibility, and physical stability assessments.
              </p>

              <div className="border-t border-neutral-100 pt-4 flex-1">
                <ul className="space-y-3">
                  {formulationItems.map((item, idx) => (
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

          {/* Pillar 2: Lyophilization Development */}
          <Reveal delay={0.16} className="h-full">
            <div className="h-full bg-white rounded-[14px] border border-neutral-200/90 shadow-sm hover:shadow-lg hover:border-cyan-500/50 transition-all duration-300 p-6 sm:p-7 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500" />
              
              <div className="flex items-center gap-3.5 mb-5 mt-1">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:border-cyan-600 transition-colors">
                  <Snowflake className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight leading-snug">
                    Lyophilization development
                  </h3>
                  <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">
                    Freeze-Drying Cycle Design
                  </span>
                </div>
              </div>

              <p className="text-sm text-neutral-600 mb-5 leading-relaxed">
                Cycle optimization and formulation robustness for sensitive biologic modalities.
              </p>

              <div className="border-t border-neutral-100 pt-4 flex-1 flex flex-col justify-between">
                <ul className="space-y-3 mb-6">
                  {lyophilizationItems.map((item, idx) => (
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

                <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-neutral-100">
                  <div className="bg-slate-50 border border-slate-200/70 rounded-[8px] p-2.5 text-center">
                    <span className="block text-sm font-bold text-cyan-600">0.5 m²</span>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Shelf Area</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/70 rounded-[8px] p-2.5 text-center">
                    <span className="block text-sm font-bold text-cyan-600">Pirani</span>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Precision Sensors</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/70 rounded-[8px] p-2.5 text-center">
                    <span className="block text-sm font-bold text-cyan-600">Controlled</span>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Nucleation Tech</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/70 rounded-[8px] p-2.5 text-center">
                    <span className="block text-sm font-bold text-cyan-600">Cycle DoE</span>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Pillar 3: Clinical GMP Manufacturing */}
          <Reveal delay={0.2} className="h-full">
            <div className="h-full bg-white rounded-[14px] border border-neutral-200/90 shadow-sm hover:shadow-lg hover:border-cyan-500/50 transition-all duration-300 p-6 sm:p-7 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500" />
              
              <div className="flex items-center gap-3.5 mb-5 mt-1">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:border-cyan-600 transition-colors">
                  <Factory className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight leading-snug">
                    Clinical GMP manufacturing
                  </h3>
                  <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">
                    Aseptic Fill & Finish
                  </span>
                </div>
              </div>

              <p className="text-sm text-neutral-600 mb-5 leading-relaxed">
                State-of-the-art cleanroom suites supporting multi-format sterile filling and clinical batch supply.
              </p>

              <div className="border-t border-neutral-100 pt-4 flex-1">
                <ul className="space-y-4">
                  {gmpManufacturingItems.map((item, idx) => (
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

                <div className="mt-6 pt-5 border-t border-neutral-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-3">
                    Supported Packaging Formats
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-[8px] bg-slate-100 text-neutral-800 text-xs font-semibold border border-slate-200">
                      RTU Vials (2R - 50R)
                    </span>
                    <span className="px-3 py-1.5 rounded-[8px] bg-slate-100 text-neutral-800 text-xs font-semibold border border-slate-200">
                      Pre-Filled Syringes (PFS)
                    </span>
                    <span className="px-3 py-1.5 rounded-[8px] bg-slate-100 text-neutral-800 text-xs font-semibold border border-slate-200">
                      Cartridges (1.5mL - 3.0mL)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
