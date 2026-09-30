'use client';

import React from 'react';
import { 
  FlaskConical, 
  Snowflake, 
  Factory, 
  Activity, 
  Sparkles, 
  Cpu, 
  Scale, 
  Layers, 
  ShieldCheck, 
  Droplets, 
  Eye
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
  const cards = [
    {
      title: 'Formulation development',
      image: '/images/benefit_accelerate.png',
      icon: FlaskConical,
      items: [
        { name: 'Stability Incubation Chambers', icon: Activity },
        { name: 'Photostability Chambers', icon: Sparkles },
        { name: 'Filling Operations using Flexicon Pumps', icon: Cpu },
        { name: 'Thermal Characterization', icon: Scale },
        { name: 'Higher Order Structure (HOS) & Particle Size Distribution Analysis', icon: Layers },
        { name: 'Container Closure Integrity Testing', icon: ShieldCheck },
        { name: 'Residual Moisture Testing', icon: Droplets },
      ],
    },
    {
      title: 'Lyophilization development',
      image: '/images/CDMOblue.png',
      icon: Snowflake,
      items: [
        { 
          name: (
            <span>
              Development Lyophilizer <strong className="text-neutral-900 font-semibold">with 0.5 m² shelf area, Pirani sensors, and controlled nucleation</strong> to support optimization of drying cycles for lyophilized products.
            </span>
          ), 
          icon: Snowflake 
        },
      ],
    },
    {
      title: 'Clinical GMP manufacturing',
      image: '/images/hero_cleanroom.png',
      icon: Factory,
      items: [
        { name: 'Formulation Suite for Formulation and Filtration', icon: FlaskConical },
        { name: 'Isolator-Based Filling Line for RTU Vials, PFS, and Cartridges (~10,000 units per batch)', icon: ShieldCheck },
        { name: 'Visual Inspection Suite and secondary packaging suite', icon: Eye },
      ],
    },
  ];

  return (
    <section className="relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-gradient-to-b from-white via-slate-50/60 to-white border-b border-neutral-200/80 overflow-hidden">
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#00aeef_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.07] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-[1700px] mx-auto">
        {/* Section Header */}
        <Reveal>
          <div className="max-w-4xl mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-brand-navy leading-[1.15] mb-4">
              Drug Product Development &amp; Manufacturing
            </h2>
            <div className="space-y-2.5 text-[15px] sm:text-[16px] md:text-[17px] text-slate-700 leading-relaxed font-normal">
              <p>
                The drug product platform supports <strong className="text-neutral-900 font-semibold">formulation, process development, lyophilization, and clinical GMP manufacturing</strong>.
              </p>
              <p>
                <strong className="text-neutral-900 font-semibold">Development capabilities.</strong> The drug product filling line is isolator based with robotic operations minimizing operator handling and ensuring a high degree of aseptic compliance. The line has a nominal ability to process 10,000 units in a batch in vial, PFS or cartridge formats. The facility also has a visual inspection suite with manual inspection setup, and a suite for secondary packaging primarily for bulk packaging of filled units.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Capability Pillars Layout: Left = Formulation (vertical), Right = Lyophilization & GMP stacked horizontally */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Left Column: Formulation Development (Vertical Card) */}
          <div className="lg:col-span-5 flex flex-col">
            <Reveal delay={0.12} className="h-full flex flex-col">
              <div className="group h-full bg-white rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-neutral-200/90 flex flex-col">
                {/* Photo header */}
                <div className="relative aspect-[16/10] overflow-hidden shrink-0">
                  <img
                    src={cards[0].image}
                    alt={cards[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-brand-navy/10 to-transparent" />
                </div>

                {/* Body */}
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-[10px] bg-brand-blue/10 border border-brand-blue/25 flex items-center justify-center shrink-0 text-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue group-hover:shadow-md group-hover:shadow-brand-blue/20 transition-all duration-300 shadow-xs">
                      {React.createElement(cards[0].icon, { className: "w-5 h-5 transition-transform duration-300 group-hover:scale-110" })}
                    </div>
                    <h3 className="text-xl font-semibold text-black group-hover:text-brand-blue transition-colors leading-snug">
                      {cards[0].title}
                    </h3>
                  </div>

                  {/* Feature items */}
                  <ul className="border-t border-neutral-100 pt-2 flex-1">
                    {cards[0].items.map((item, i) => {
                      const ItemIcon = item.icon;
                      return (
                        <li key={i} className="border-b border-neutral-100 last:border-0 py-2.5">
                          <div className="flex items-start gap-3 text-sm font-medium text-neutral-700">
                            <div className="w-8 h-8 rounded-[8px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:border-brand-blue transition-colors duration-200 mt-0.5">
                              <ItemIcon className="w-4 h-4 text-brand-blue group-hover:text-white transition-colors duration-200" />
                            </div>
                            <div className="text-[14px] text-slate-700 leading-snug font-normal">
                              {item.name}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Lyophilization & GMP Manufacturing Stacked Horizontally */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 justify-between">
            {/* Card 2: Lyophilization development */}
            <Reveal delay={0.2} className="flex-1 flex flex-col">
              <div className="group h-full bg-white rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-neutral-200/90 flex flex-col sm:flex-row">
                {/* Photo */}
                <div className="relative w-full sm:w-2/5 md:w-5/12 min-h-[190px] sm:min-h-full overflow-hidden shrink-0">
                  <img
                    src={cards[1].image}
                    alt={cards[1].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-brand-navy/60 sm:from-transparent sm:to-brand-navy/20 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-7 flex flex-col flex-1 justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-[10px] bg-brand-blue/10 border border-brand-blue/25 flex items-center justify-center shrink-0 text-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue group-hover:shadow-md group-hover:shadow-brand-blue/20 transition-all duration-300 shadow-xs">
                      {React.createElement(cards[1].icon, { className: "w-5 h-5 transition-transform duration-300 group-hover:scale-110" })}
                    </div>
                    <h3 className="text-xl font-semibold text-black group-hover:text-brand-blue transition-colors leading-snug">
                      {cards[1].title}
                    </h3>
                  </div>

                  <ul className="border-t border-neutral-100 pt-3">
                    {cards[1].items.map((item, i) => {
                      const ItemIcon = item.icon;
                      return (
                        <li key={i} className="py-1">
                          <div className="flex items-start gap-3 text-sm font-medium text-neutral-700">
                            <div className="w-8 h-8 rounded-[8px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:border-brand-blue transition-colors duration-200 mt-0.5">
                              <ItemIcon className="w-4 h-4 text-brand-blue group-hover:text-white transition-colors duration-200" />
                            </div>
                            <div className="text-[14px] text-slate-700 leading-relaxed font-normal">
                              {item.name}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Card 3: Clinical GMP manufacturing */}
            <Reveal delay={0.28} className="flex-1 flex flex-col">
              <div className="group h-full bg-white rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-neutral-200/90 flex flex-col sm:flex-row">
                {/* Photo */}
                <div className="relative w-full sm:w-2/5 md:w-5/12 min-h-[190px] sm:min-h-full overflow-hidden shrink-0">
                  <img
                    src={cards[2].image}
                    alt={cards[2].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-brand-navy/60 sm:from-transparent sm:to-brand-navy/20 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-7 flex flex-col flex-1 justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-[10px] bg-brand-blue/10 border border-brand-blue/25 flex items-center justify-center shrink-0 text-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue group-hover:shadow-md group-hover:shadow-brand-blue/20 transition-all duration-300 shadow-xs">
                      {React.createElement(cards[2].icon, { className: "w-5 h-5 transition-transform duration-300 group-hover:scale-110" })}
                    </div>
                    <h3 className="text-xl font-semibold text-black group-hover:text-brand-blue transition-colors leading-snug">
                      {cards[2].title}
                    </h3>
                  </div>

                  <ul className="border-t border-neutral-100 pt-2">
                    {cards[2].items.map((item, i) => {
                      const ItemIcon = item.icon;
                      return (
                        <li key={i} className="border-b border-neutral-100 last:border-0 py-2.5">
                          <div className="flex items-start gap-3 text-sm font-medium text-neutral-700">
                            <div className="w-8 h-8 rounded-[8px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:border-brand-blue transition-colors duration-200 mt-0.5">
                              <ItemIcon className="w-4 h-4 text-brand-blue group-hover:text-white transition-colors duration-200" />
                            </div>
                            <div className="text-[14px] text-slate-700 leading-snug font-normal">
                              {item.name}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
