'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BiologicsWorkflowGraphic() {
  const steps = [
    {
      id: 1,
      title: 'Cell Line\nDevelopment',
      color: '#00a0e9',
      bgColor: '#e8f7fd',
      position: 'top',
      icon: (
        // DNA double helix
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9 text-white">
          <path d="M2 15c6.667-6 13.333 0 20-6" />
          <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
          <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
          <path d="M17 6l-2.5-2.5" />
          <path d="M14 8l-1-1" />
          <path d="M7 18l2.5 2.5" />
          <path d="M3.5 14.5l.5.5" />
          <path d="M20 9.5l.5.5" />
          <path d="M6.5 12.5l1 1" />
          <path d="M16.5 10.5l1 1" />
          <path d="M10 16l-1-1" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Upstream &\nDownstream Process\nDevelopment',
      color: '#f37021',
      bgColor: '#fef3ea',
      position: 'bottom',
      icon: (
        // Bioreactor vessel with agitator/gear
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9 text-white">
          <path d="M7 4h10v12a5 5 0 0 1-10 0V4z" />
          <path d="M12 2v4" />
          <path d="M10 2h4" />
          <path d="M12 6v8" />
          <path d="M9 12h6" />
          <path d="M10 14h4" />
          <circle cx="18.5" cy="11.5" r="2.5" />
          <path d="M18.5 8v1m0 5v1m-2.5-3.5h1m5 0h1" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Analytical\nCharacterization &\nTesting',
      color: '#00a0e9',
      bgColor: '#e8f7fd',
      position: 'top',
      icon: (
        // Microscope with molecular ring
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9 text-white">
          <path d="M6 18h8" />
          <path d="M3 22h14" />
          <path d="M9 14a5 5 0 0 0 5-5V4H7v5a5 5 0 0 0 2 5z" />
          <path d="M10 2h1" />
          <circle cx="18" cy="17" r="3.5" />
          <path d="M18 15v4m-2-2h4" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Drug Substance &\nDrug Product\nManufacturing',
      color: '#f37021',
      bgColor: '#fef3ea',
      position: 'bottom',
      icon: (
        // Factory facility with medicine vial
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9 text-white">
          <path d="M3 21h12V10l-4 3V7l-4 3V4L3 7v14z" />
          <path d="M5 14h2" />
          <path d="M5 17h2" />
          <rect x="16" y="9" width="6" height="12" rx="1.5" />
          <path d="M17.5 6h3" />
          <path d="M19 6v3" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'Clinical\nDevelopment',
      color: '#00a0e9',
      bgColor: '#e8f7fd',
      position: 'top',
      icon: (
        // Clipboard medical cross with clinical team
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-9 sm:h-9 text-white">
          <rect x="3" y="3" width="11" height="18" rx="2" />
          <path d="M6 7h5m-5 4h5" />
          <path d="M8.5 13.5v3m-1.5-1.5h3" />
          <circle cx="18" cy="12" r="2.5" />
          <path d="M15 19a3 3 0 0 1 6 0" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-full select-none py-4">
      {/* DESKTOP / TABLET HORIZONTAL WORKFLOW VIEW */}
      <div className="hidden md:block w-full">
        <div className="relative grid grid-cols-5 gap-3 items-center">
          
          {/* TOP ROW: Speech bubbles for 1, 3, 5 */}
          <div className="col-span-5 grid grid-cols-5 gap-3 items-end mb-3">
            {steps.map((step) => {
              if (step.position === 'top') {
                return (
                  <motion.div
                    key={`top-${step.id}`}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-end relative"
                  >
                    <div 
                      style={{ backgroundColor: step.bgColor }}
                      className="w-full rounded-2xl px-3 py-3.5 shadow-sm text-center flex items-center justify-center min-h-[76px] transition-all relative border border-transparent hover:border-[#b3e5fc]"
                    >
                      <span className="text-[13px] sm:text-[14px] font-bold text-neutral-800 leading-snug whitespace-pre-line">
                        {step.title}
                      </span>
                      {/* Downward triangle caret pointing to the circle */}
                      <div 
                        style={{ borderTopColor: step.bgColor }}
                        className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-t-[10px]" 
                      />
                    </div>
                  </motion.div>
                );
              }
              return <div key={`empty-top-${step.id}`} className="min-h-[76px]" />;
            })}
          </div>

          {/* MIDDLE ROW: Connecting road + 5 Circles */}
          <div className="col-span-5 relative py-2 flex items-center justify-between">
            {/* Horizontal orange dashed track road connecting all circles */}
            <div className="absolute inset-x-8 h-4 bg-[#f8b88b] rounded-full flex items-center justify-around px-4 shadow-inner pointer-events-none">
              <div className="w-full border-t-2 border-dashed border-white opacity-90" />
            </div>

            {/* 5 Circular Nodes */}
            <div className="w-full grid grid-cols-5 gap-3 relative z-10">
              {steps.map((step) => (
                <div key={`circle-${step.id}`} className="flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    style={{ backgroundColor: step.color }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg cursor-pointer ring-4 ring-white"
                  >
                    {step.icon}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM ROW: Speech bubbles for 2, 4 */}
          <div className="col-span-5 grid grid-cols-5 gap-3 items-start mt-3">
            {steps.map((step) => {
              if (step.position === 'bottom') {
                return (
                  <motion.div
                    key={`bottom-${step.id}`}
                    whileHover={{ y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-start relative"
                  >
                    <div 
                      style={{ backgroundColor: step.bgColor }}
                      className="w-full rounded-2xl px-3 py-3.5 shadow-sm text-center flex items-center justify-center min-h-[76px] transition-all relative border border-transparent hover:border-[#ffe0b2]"
                    >
                      {/* Upward triangle caret pointing to the circle */}
                      <div 
                        style={{ borderBottomColor: step.bgColor }}
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-b-[10px]" 
                      />
                      <span className="text-[13px] sm:text-[14px] font-bold text-neutral-800 leading-snug whitespace-pre-line">
                        {step.title}
                      </span>
                    </div>
                  </motion.div>
                );
              }
              return <div key={`empty-bottom-${step.id}`} className="min-h-[76px]" />;
            })}
          </div>

        </div>
      </div>

      {/* MOBILE STACKED VIEW */}
      <div className="block md:hidden">
        <div className="relative pl-6 space-y-4 before:absolute before:top-4 before:bottom-4 before:left-8 before:w-1 before:bg-gradient-to-b before:from-[#00a0e9] before:via-[#f37021] before:to-[#00a0e9]">
          {steps.map((step) => (
            <div key={`mob-${step.id}`} className="relative flex items-center gap-4">
              <div 
                style={{ backgroundColor: step.color }}
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-md ring-4 ring-white z-10"
              >
                <div className="scale-75 text-white">
                  {step.icon}
                </div>
              </div>
              <div 
                style={{ backgroundColor: step.bgColor }}
                className="flex-1 p-3.5 rounded-2xl shadow-xs"
              >
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug whitespace-pre-line">
                  {step.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
