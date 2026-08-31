'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Dna, Microscope } from 'lucide-react';

function BioreactorIcon({ className = "w-7 h-7 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="7" width="14" height="12" rx="4" />
      <path d="M12 2v5" />
      <path d="M9 2h6" />
      <path d="M12 7v7" />
      <path d="M9 14h6" />
      <path d="M2 10h3" />
      <path d="M19 14h3" />
      <path d="M7 19v3" />
      <path d="M17 19v3" />
    </svg>
  );
}

function ManufacturingVialIcon({ className = "w-7 h-7 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 20V9l4 3V9l4 3V6l5 4v10H2z" />
      <rect x="16" y="11" width="6" height="9" rx="1.5" />
      <path d="M17 9h4" />
      <path d="M17.5 11V9" />
      <path d="M20.5 11V9" />
    </svg>
  );
}

function ClinicalIcon({ className = "w-7 h-7 text-white" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="4" width="10" height="16" rx="2" />
      <path d="M7 2h4a1 1 0 0 1 1 1v1H6V3a1 1 0 0 1 1-1z" />
      <path d="M7 9h4" />
      <path d="M9 7v4" />
      <circle cx="17.5" cy="11.5" r="2.5" />
      <path d="M14.5 19a3.5 3.5 0 0 1 6 0" />
    </svg>
  );
}

const TIMELINE_STEPS = [
  {
    id: 1,
    title: 'Cell Line Development',
    position: 'top' as const,
    color: '#00aeef',
    bgClass: 'bg-[#00aeef]',
    bubbleBg: 'bg-[#e7f5fd]',
    bubbleBorder: 'border-[#c4e5f7]',
    arrowColor: 'border-t-[#c4e5f7]',
    hoverBorder: 'hover:border-[#00aeef]',
    link: '/services/cell-line',
    icon: Dna,
  },
  {
    id: 2,
    title: 'Upstream & Downstream Process Development',
    position: 'bottom' as const,
    color: '#f58634',
    bgClass: 'bg-[#f58634]',
    bubbleBg: 'bg-[#fff4e8]',
    bubbleBorder: 'border-[#fedcb8]',
    arrowColor: 'border-b-[#fedcb8]',
    hoverBorder: 'hover:border-[#f58634]',
    link: '/services/process',
    icon: BioreactorIcon,
  },
  {
    id: 3,
    title: 'Analytical Characterization & Testing',
    position: 'top' as const,
    color: '#00aeef',
    bgClass: 'bg-[#00aeef]',
    bubbleBg: 'bg-[#e7f5fd]',
    bubbleBorder: 'border-[#c4e5f7]',
    arrowColor: 'border-t-[#c4e5f7]',
    hoverBorder: 'hover:border-[#00aeef]',
    link: '/services/analytical',
    icon: Microscope,
  },
  {
    id: 4,
    title: 'Drug Substance & Drug Product Manufacturing',
    position: 'bottom' as const,
    color: '#f58634',
    bgClass: 'bg-[#f58634]',
    bubbleBg: 'bg-[#fff4e8]',
    bubbleBorder: 'border-[#fedcb8]',
    arrowColor: 'border-b-[#fedcb8]',
    hoverBorder: 'hover:border-[#f58634]',
    link: '/manufacturing/drug-substance',
    icon: ManufacturingVialIcon,
  },
  {
    id: 5,
    title: 'Clinical Development',
    position: 'top' as const,
    color: '#00aeef',
    bgClass: 'bg-[#00aeef]',
    bubbleBg: 'bg-[#e7f5fd]',
    bubbleBorder: 'border-[#c4e5f7]',
    arrowColor: 'border-t-[#c4e5f7]',
    hoverBorder: 'hover:border-[#00aeef]',
    link: '/contact',
    icon: ClinicalIcon,
  },
];

export default function IntegratedTimeline() {
  return (
    <section className="relative px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 md:py-24 bg-white border-y border-neutral-100 overflow-hidden">
      {/* Subtle Background Molecule grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#00aeef_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative w-full max-w-[1700px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold uppercase tracking-wider text-brand-orange block mb-3"
          >
            Integrated Lifecycle
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.15] max-w-4xl mx-auto"
          >
            Integrated biologics development, manufacturing and clinical support
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto mt-4"
          >
            An end-to-end continuum connecting cell line engineering, process scale-up, analytical rigor, and cGMP supply to accelerate clinical milestones.
          </motion.p>
        </div>

        {/* ================= DESKTOP / TABLET HORIZONTAL ROADMAP ================= */}
        <div className="hidden md:block relative max-w-6xl mx-auto py-6">
          
          {/* TOP ROW: Bubbles for Steps 1, 3, 5 */}
          <div className="grid grid-cols-5 gap-4 lg:gap-6 items-end mb-6">
            {TIMELINE_STEPS.map((step, idx) => {
              if (step.position !== 'top') {
                return <div key={step.id} className="h-24" aria-hidden="true" />;
              }

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <Link href={step.link} className="w-full">
                    <div
                      className={`relative w-full ${step.bubbleBg} border ${step.bubbleBorder} ${step.hoverBorder} rounded-[14px] p-4 lg:p-5 shadow-xs hover:shadow-lg transition-all duration-300 min-h-[86px] flex items-center justify-center text-center`}
                    >
                      <span className="text-xs lg:text-sm font-semibold text-neutral-900 leading-snug group-hover:text-black">
                        {step.title}
                      </span>

                      {/* Downward Pointer Triangle */}
                      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[#c4e5f7]" />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-[#e7f5fd]" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* MIDDLE ROW: The Highway / Road Track + 5 Circular Nodes */}
          <div className="relative py-4 my-2 flex items-center">
            {/* The Road Strip */}
            <div className="absolute left-0 right-0 h-9 bg-[#d0eef7] rounded-full border border-[#b6e4f1] overflow-hidden flex items-center z-0 shadow-inner">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="w-full h-full origin-left flex items-center"
              >
                {/* White dashed highway stripe */}
                <div className="w-full border-t-2 border-dashed border-white/90 scale-y-110" />
              </motion.div>
            </div>

            {/* 5 Circular Nodes Grid */}
            <div className="relative z-10 w-full grid grid-cols-5 gap-4 lg:gap-6">
              {TIMELINE_STEPS.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2 + idx * 0.12,
                    }}
                    className="flex justify-center"
                  >
                    <Link
                      href={step.link}
                      className="group relative flex items-center justify-center"
                      title={step.title}
                    >
                      {/* Pulse ring on hover */}
                      <div
                        className="absolute inset-0 rounded-full scale-100 group-hover:scale-130 opacity-0 group-hover:opacity-40 transition-all duration-300 pointer-events-none"
                        style={{ backgroundColor: step.color }}
                      />

                      {/* Main Node Circle */}
                      <div
                        className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full ${step.bgClass} border-4 border-white shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex items-center justify-center relative z-10`}
                      >
                        <IconComponent className="w-8 h-8 lg:w-9 lg:h-9 text-white transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* BOTTOM ROW: Bubbles for Steps 2, 4 */}
          <div className="grid grid-cols-5 gap-4 lg:gap-6 items-start mt-6">
            {TIMELINE_STEPS.map((step, idx) => {
              if (step.position !== 'bottom') {
                return <div key={step.id} className="h-24" aria-hidden="true" />;
              }

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <Link href={step.link} className="w-full">
                    <div
                      className={`relative w-full ${step.bubbleBg} border ${step.bubbleBorder} ${step.hoverBorder} rounded-[14px] p-4 lg:p-5 shadow-xs hover:shadow-lg transition-all duration-300 min-h-[86px] flex items-center justify-center text-center`}
                    >
                      {/* Upward Pointer Triangle */}
                      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-[#fedcb8]" />
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[9px] border-b-[#fff4e8]" />

                      <span className="text-xs lg:text-sm font-semibold text-neutral-900 leading-snug group-hover:text-black">
                        {step.title}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ================= MOBILE VIEW (RESPONSIVE VERTICAL ROADMAP) ================= */}
        <div className="block md:hidden relative max-w-md mx-auto py-4">
          {/* Vertical Road Track */}
          <div className="absolute left-7 top-6 bottom-6 w-7 bg-[#d0eef7] rounded-full border border-[#b6e4f1] overflow-hidden flex justify-center z-0 shadow-inner">
            <div className="h-full border-l-2 border-dashed border-white" />
          </div>

          <div className="flex flex-col gap-6 relative z-10">
            {TIMELINE_STEPS.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-center gap-4"
                >
                  {/* Node Circle */}
                  <Link href={step.link} className="shrink-0 group">
                    <div
                      className={`w-14 h-14 rounded-full ${step.bgClass} border-4 border-white shadow-md flex items-center justify-center group-hover:scale-105 transition-transform`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </Link>

                  {/* Speech Bubble */}
                  <Link href={step.link} className="flex-1">
                    <div
                      className={`relative ${step.bubbleBg} border ${step.bubbleBorder} ${step.hoverBorder} rounded-[12px] p-3.5 shadow-xs hover:shadow-md transition-all flex items-center`}
                    >
                      {/* Left pointer */}
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-[#c4e5f7]" />
                      <span className="text-xs sm:text-sm font-semibold text-neutral-900 leading-tight">
                        {step.title}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
