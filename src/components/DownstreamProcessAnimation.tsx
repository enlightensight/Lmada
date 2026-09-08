'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// DETAILED VECTOR SVG ILLUSTRATIONS
// ==========================================

// 1. CLARIFICATION VESSEL
function ClarificationIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 100 130" className="w-20 h-28 sm:w-24 sm:h-32 transition-transform duration-300" fill="none">
      {/* Top Stirrer Drive Mount */}
      <rect x="42" y="4" width="16" height="12" rx="2" fill="#00aeef" stroke="#00aeef" strokeWidth="1.5" />
      <rect x="46" y="0" width="8" height="5" rx="1" fill="#0099d0" />
      
      {/* Main Glass Vessel Body */}
      <path
        d="M20 20 H80 V88 C80 105 66 118 50 118 C34 118 20 105 20 88 Z"
        fill="#f0f9ff"
        stroke="#00aeef"
        strokeWidth="3"
      />

      {/* Blue Liquid Fill */}
      <path
        d="M21.5 54 H78.5 V88 C78.5 103.5 65.5 116 50 116 C34.5 116 21.5 103.5 21.5 88 Z"
        fill="#bae6fd"
        fillOpacity="0.85"
      />

      {/* Vessel Rim / Flange */}
      <rect x="16" y="18" width="68" height="6" rx="2" fill="#00aeef" />

      {/* Central Impeller Shaft */}
      <line x1="50" y1="16" x2="50" y2="88" stroke="#00aeef" strokeWidth="3" strokeLinecap="round" />
      
      {/* Impeller Blades */}
      <circle cx="50" cy="88" r="4" fill="#f58634" />
      <path d="M42 86 Q50 83 58 86" stroke="#f58634" strokeWidth="3" strokeLinecap="round" />

      {/* Floating Liquid Bubbles */}
      <motion.circle
        cx="34"
        cy="70"
        r="2.5"
        fill="white"
        fillOpacity="0.8"
        animate={{ y: active ? [-2, -8, -2] : [0, -4, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="65"
        cy="66"
        r="3"
        fill="white"
        fillOpacity="0.8"
        animate={{ y: active ? [-1, -7, -1] : [0, -3, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2.3, delay: 0.4, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="40"
        cy="78"
        r="2"
        fill="white"
        fillOpacity="0.9"
        animate={{ y: active ? [-2, -6, -2] : [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, delay: 0.7, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="60"
        cy="76"
        r="2"
        fill="white"
        fillOpacity="0.9"
        animate={{ y: active ? [-1, -5, -1] : [0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 2.1, delay: 0.2, ease: 'easeInOut' }}
      />

      {/* Settling Orange Particles / Cells */}
      <motion.circle
        cx="32"
        cy="94"
        r="3"
        fill="#f58634"
        animate={{ scale: active ? [1, 1.25, 1] : [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
      <motion.circle
        cx="44"
        cy="96"
        r="3.5"
        fill="#f58634"
        animate={{ scale: active ? [1, 1.2, 1] : [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.7, delay: 0.2 }}
      />
      <motion.circle
        cx="56"
        cy="97"
        r="3.5"
        fill="#f58634"
        animate={{ scale: active ? [1, 1.2, 1] : [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, delay: 0.5 }}
      />
      <motion.circle
        cx="68"
        cy="93"
        r="3"
        fill="#f58634"
        animate={{ scale: active ? [1, 1.25, 1] : [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }}
      />
      <circle cx="38" cy="103" r="3" fill="#f58634" />
      <circle cx="48" cy="106" r="3.5" fill="#f58634" />
      <circle cx="60" cy="104" r="3" fill="#f58634" />
      <circle cx="50" cy="112" r="3.5" fill="#f58634" />

      {/* Harvest Drain Valve & Line */}
      <path
        d="M74 98 L86 103 V118"
        stroke="#00aeef"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="73" y="95" width="6" height="6" rx="1" fill="#00aeef" />
    </svg>
  );
}

// 2. CAPTURE COLUMN
function CaptureIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 80 130" className="w-18 h-28 sm:w-20 sm:h-32 transition-transform duration-300" fill="none">
      {/* Top Inlet Tubing */}
      <path d="M40 8 V18" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 8 H56 V16" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />
      
      {/* Top Cap */}
      <rect x="22" y="18" width="36" height="10" rx="3" fill="#00aeef" />
      
      {/* Main Glass Tube */}
      <rect x="26" y="28" width="28" height="74" fill="#f8fcff" stroke="#00aeef" strokeWidth="2.5" />

      {/* Resin Bed Matrix & Captured Product (Orange Dots) */}
      <g>
        <motion.circle cx="34" cy="38" r="2.5" fill="#f58634" animate={{ scale: active ? [1, 1.3, 1] : [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} />
        <motion.circle cx="46" cy="42" r="2.5" fill="#f58634" animate={{ scale: active ? [1, 1.3, 1] : [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.6, delay: 0.2 }} />
        <motion.circle cx="38" cy="48" r="3" fill="#f58634" animate={{ scale: active ? [1, 1.3, 1] : [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} />
        <motion.circle cx="44" cy="56" r="2.5" fill="#f58634" animate={{ scale: active ? [1, 1.3, 1] : [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.7, delay: 0.1 }} />
        <motion.circle cx="33" cy="62" r="2.5" fill="#f58634" animate={{ scale: active ? [1, 1.3, 1] : [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} />
        <motion.circle cx="46" cy="68" r="3" fill="#f58634" animate={{ scale: active ? [1, 1.3, 1] : [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.5 }} />
        <motion.circle cx="36" cy="76" r="2.5" fill="#f58634" animate={{ scale: active ? [1, 1.3, 1] : [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.6, delay: 0.2 }} />
        <motion.circle cx="45" cy="84" r="3" fill="#f58634" animate={{ scale: active ? [1, 1.3, 1] : [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.6 }} />
        <motion.circle cx="34" cy="90" r="2.5" fill="#f58634" animate={{ scale: active ? [1, 1.3, 1] : [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} />
        <motion.circle cx="42" cy="94" r="2.5" fill="#f58634" animate={{ scale: active ? [1, 1.3, 1] : [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.7, delay: 0.3 }} />
      </g>

      {/* Bottom Cap */}
      <rect x="22" y="102" width="36" height="10" rx="3" fill="#00aeef" />

      {/* Bottom Outlet Tubing */}
      <path d="M40 112 V120" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 120 Q56 120 56 128" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 3. INTERMEDIATE PURIFICATION DUAL COLUMNS
function IntermediateIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 90 130" className="w-20 h-28 sm:w-24 sm:h-32 transition-transform duration-300" fill="none">
      {/* Top & Bottom Interconnecting Bridge Tubing */}
      <path
        d="M26 22 V14 H64 V22"
        stroke="#00aeef"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M26 108 V116 H64 V108"
        stroke="#00aeef"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Column 1 */}
      <rect x="16" y="22" width="20" height="7" rx="2" fill="#00aeef" />
      <rect x="18" y="29" width="16" height="72" fill="#f0f9ff" stroke="#00aeef" strokeWidth="2" />
      <rect x="16" y="101" width="20" height="7" rx="2" fill="#00aeef" />

      {/* Column 1 particles (denser at top) */}
      <circle cx="23" cy="38" r="1.5" fill="#00aeef" />
      <circle cx="29" cy="40" r="1.5" fill="#00aeef" />
      <circle cx="26" cy="46" r="1.8" fill="#00aeef" />
      <circle cx="22" cy="52" r="1.5" fill="#00aeef" />
      <circle cx="28" cy="58" r="1.5" fill="#00aeef" />
      <circle cx="25" cy="65" r="1.5" fill="#00aeef" />
      <circle cx="24" cy="74" r="1.5" fill="#00aeef" />
      <circle cx="27" cy="85" r="1.5" fill="#00aeef" />

      {/* Column 2 */}
      <rect x="54" y="22" width="20" height="7" rx="2" fill="#00aeef" />
      <rect x="56" y="29" width="16" height="72" fill="#f0f9ff" stroke="#00aeef" strokeWidth="2" />
      <rect x="54" y="101" width="20" height="7" rx="2" fill="#00aeef" />

      {/* Column 2 purified particles (evenly distributed) */}
      <motion.g animate={{ opacity: active ? [0.6, 1, 0.6] : 0.8 }} transition={{ repeat: Infinity, duration: 1.6 }}>
        <circle cx="61" cy="42" r="1.8" fill="#00aeef" />
        <circle cx="67" cy="46" r="1.5" fill="#00aeef" />
        <circle cx="64" cy="54" r="1.8" fill="#00aeef" />
        <circle cx="61" cy="62" r="1.5" fill="#00aeef" />
        <circle cx="67" cy="68" r="1.8" fill="#00aeef" />
        <circle cx="63" cy="76" r="1.5" fill="#00aeef" />
        <circle cx="65" cy="86" r="1.8" fill="#00aeef" />
        <circle cx="62" cy="92" r="1.5" fill="#00aeef" />
      </motion.g>
    </svg>
  );
}

// 4. POLISHING COLUMN
function PolishingIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 80 130" className="w-18 h-28 sm:w-20 sm:h-32 transition-transform duration-300" fill="none">
      {/* Top Inlet Nozzle */}
      <path d="M40 10 V20" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 10 H48 V16" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />

      {/* Top Cap */}
      <rect x="24" y="20" width="32" height="9" rx="3" fill="#00aeef" />

      {/* Main Column Body */}
      <rect x="27" y="29" width="26" height="72" fill="#f8fcff" stroke="#00aeef" strokeWidth="2.5" />

      {/* Diagonal Fine Resolution Stripes Pattern */}
      <g stroke="#00aeef" strokeWidth="2" strokeLinecap="round">
        <line x1="28" y1="38" x2="38" y2="29" />
        <line x1="28" y1="48" x2="48" y2="29" />
        <line x1="28" y1="58" x2="52" y2="34" />
        <line x1="28" y1="68" x2="52" y2="44" />
        <line x1="28" y1="78" x2="52" y2="54" />
        <line x1="28" y1="88" x2="52" y2="64" />
        <line x1="28" y1="98" x2="52" y2="74" />
        <line x1="36" y1="100" x2="52" y2="84" />
        <line x1="46" y1="100" x2="52" y2="94" />
      </g>

      {/* Active Polishing Sheen / Pulse */}
      {active && (
        <motion.rect
          x="28"
          y="30"
          width="24"
          height="70"
          fill="url(#polishGlow)"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}

      {/* Bottom Cap */}
      <rect x="24" y="101" width="32" height="9" rx="3" fill="#00aeef" />

      {/* Bottom Outlet */}
      <path d="M40 110 V122" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// 5. CONCENTRATION & DIAFILTRATION (TFF CASSETTE)
function ConcentrationIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 100 130" className="w-22 h-28 sm:w-26 sm:h-32 transition-transform duration-300" fill="none">
      {/* Top Recirculation Manifold Pipe */}
      <path d="M30 16 H74 V40" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48 16 V26" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Permeate Collection Spout on Right with Droplet */}
      <path d="M74 38 V66" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="71" y="38" width="6" height="6" rx="1" fill="#00aeef" />
      
      {/* Falling Orange Droplet */}
      <motion.path
        d="M74 72 C71 78 69 82 69 86 C69 91 71.5 94 74 94 C76.5 94 79 91 79 86 C79 82 77 78 74 72 Z"
        fill="#f58634"
        animate={{ y: active ? [0, 6, 0] : [0, 3, 0], scale: active ? [1, 1.15, 1] : [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      />

      {/* Top Header Plate */}
      <rect x="20" y="26" width="48" height="12" rx="3" fill="#00aeef" stroke="#00aeef" strokeWidth="2" />
      
      {/* Filter Membrane Cassette Housing */}
      <rect x="22" y="38" width="44" height="62" fill="#f0f9ff" stroke="#00aeef" strokeWidth="2.5" />
      
      {/* Vertical Hollow Fiber Membrane Channels */}
      <line x1="28" y1="39" x2="28" y2="99" stroke="#00aeef" strokeWidth="2" />
      <line x1="34" y1="39" x2="34" y2="99" stroke="#00aeef" strokeWidth="2" />
      <line x1="40" y1="39" x2="40" y2="99" stroke="#00aeef" strokeWidth="2" />
      <line x1="46" y1="39" x2="46" y2="99" stroke="#00aeef" strokeWidth="2" />
      <line x1="52" y1="39" x2="52" y2="99" stroke="#00aeef" strokeWidth="2" />
      <line x1="58" y1="39" x2="58" y2="99" stroke="#00aeef" strokeWidth="2" />

      {/* Bottom Header Plate */}
      <rect x="20" y="100" width="48" height="12" rx="3" fill="#00aeef" stroke="#00aeef" strokeWidth="2" />

      {/* Bottom Drain Pipe */}
      <path d="M32 112 V122 H44 V112" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 6. FINAL FORMULATION VIAL
function FinalFormulationIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 90 130" className="w-20 h-28 sm:w-22 sm:h-32 transition-transform duration-300" fill="none">
      {/* Top Cap */}
      <rect x="30" y="8" width="30" height="12" rx="3" fill="#00aeef" stroke="#00aeef" strokeWidth="2" />
      <line x1="38" y1="12" x2="38" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="12" x2="45" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="12" x2="52" y2="16" stroke="white" strokeWidth="2" strokeLinecap="round" />

      {/* Vial Neck */}
      <rect x="34" y="20" width="22" height="8" fill="#e0f2fe" stroke="#00aeef" strokeWidth="2" />

      {/* Main Vial Body */}
      <path
        d="M24 34 Q24 28 34 28 H56 Q66 28 66 34 V114 Q66 120 56 120 H34 Q24 120 24 114 Z"
        fill="#f8fcff"
        stroke="#00aeef"
        strokeWidth="3"
      />

      {/* Formulation Liquid Fill Line */}
      <path
        d="M26 62 H64 V114 Q64 118 56 118 H34 Q26 118 26 114 Z"
        fill="#bae6fd"
        fillOpacity="0.4"
      />
      <line x1="26" y1="62" x2="64" y2="62" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Central Orange Verified Seal with Checkmark */}
      <motion.g
        animate={{ scale: active ? [1, 1.12, 1] : [1, 1.04, 1] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <circle cx="45" cy="80" r="14" stroke="#f58634" strokeWidth="3" fill="white" />
        <path
          d="M39 80.5 L43 84.5 L51 76"
          stroke="#f58634"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </svg>
  );
}

// Arrow connector between stages
function ConnectingArrow({ active }: { active: boolean }) {
  return (
    <div className="hidden lg:flex items-center justify-center w-8 sm:w-10 flex-shrink-0 pt-10">
      <motion.svg
        viewBox="0 0 32 24"
        className="w-7 h-6 text-[#00aeef]"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ x: active ? [0, 4, 0] : [0, 2, 0], opacity: active ? 1 : 0.8 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      >
        <line x1="4" y1="12" x2="26" y2="12" />
        <polyline points="18 4 26 12 18 20" />
      </motion.svg>
    </div>
  );
}

// ==========================================
// STAGES DATA
// ==========================================

const DOWNSTREAM_STAGES = [
  {
    id: 1,
    stepNumber: '1',
    title: 'CLARIFICATION',
    icon: ClarificationIcon,
    bullets: ['Remove cells and debris', 'Clarified harvest obtained'],
  },
  {
    id: 2,
    stepNumber: '2',
    title: 'CAPTURE',
    icon: CaptureIcon,
    bullets: ['Isolate and concentrate target product', 'High binding capacity resin'],
  },
  {
    id: 3,
    stepNumber: '3',
    title: 'INTERMEDIATE PURIFICATION',
    icon: IntermediateIcon,
    bullets: ['Remove impurities', 'Polish the product', 'Improved purity'],
  },
  {
    id: 4,
    stepNumber: '4',
    title: 'POLISHING',
    icon: PolishingIcon,
    bullets: ['Achieve final purity', 'Ensure product quality and safety'],
  },
  {
    id: 5,
    stepNumber: '5',
    title: 'CONCENTRATION & DIAFILTRATION',
    icon: ConcentrationIcon,
    bullets: ['Concentrate product', 'Buffer exchange', 'Remove residual impurities'],
  },
  {
    id: 6,
    stepNumber: '6',
    title: 'FINAL FORMULATION',
    icon: FinalFormulationIcon,
    bullets: ['Sterile filtration', 'Final product formulation', 'Ready for fill/finish'],
  },
];

export default function DownstreamProcessAnimation() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-cycle through the 6 stages in a continuous purification loop
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 6 ? 1 : prev + 1));
    }, 3200);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div
      className="w-full bg-white rounded-[12px] p-4 sm:p-6 lg:p-8 select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* DESKTOP / TABLET HORIZONTAL 6-STAGE ROADMAP */}
      <div className="hidden lg:flex items-start justify-between gap-1 xl:gap-2">
        {DOWNSTREAM_STAGES.map((stage, idx) => {
          const IconComp = stage.icon;
          const isActive = activeStep === stage.id;

          return (
            <React.Fragment key={stage.id}>
              <motion.div
                onClick={() => setActiveStep(stage.id)}
                className={`flex-1 flex flex-col items-center cursor-pointer transition-all duration-300 p-2 sm:p-3 rounded-[10px] ${
                  isActive
                    ? 'bg-blue-50/60 ring-1 ring-[#00aeef]/40 shadow-xs'
                    : 'hover:bg-neutral-50/80'
                }`}
                whileHover={{ y: -4 }}
              >
                {/* Stage Heading */}
                <h4 className="text-sm xl:text-base font-bold text-neutral-900 tracking-tight text-center mb-4 min-h-[42px] flex items-center justify-center">
                  <span>
                    <span className="text-[#00aeef] mr-1">{stage.stepNumber}.</span>
                    {stage.title}
                  </span>
                </h4>

                {/* Illustrated Animated SVG Icon */}
                <div className="relative my-2 flex items-center justify-center min-h-[135px]">
                  <IconComp active={isActive} />
                </div>

                {/* Bullet Points */}
                <ul className="mt-4 space-y-2 w-full text-left">
                  {stage.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs xl:text-sm text-neutral-800 font-medium leading-snug">
                      <span className="w-2 h-2 rounded-full bg-[#f58634] shrink-0 mt-1" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Connecting Arrow between stages */}
              {idx < DOWNSTREAM_STAGES.length - 1 && (
                <ConnectingArrow active={activeStep === stage.id || activeStep === stage.id + 1} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* MOBILE / TABLET RESPONSIVE GRID (2 or 3 columns on smaller viewports) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:hidden gap-4 sm:gap-6">
        {DOWNSTREAM_STAGES.map((stage) => {
          const IconComp = stage.icon;
          const isActive = activeStep === stage.id;

          return (
            <motion.div
              key={stage.id}
              onClick={() => setActiveStep(stage.id)}
              className={`flex flex-col items-center p-4 rounded-[10px] border transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-blue-50/60 border-[#00aeef]/50 shadow-sm'
                  : 'bg-neutral-50/50 border-neutral-200/80 hover:border-neutral-300'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <h4 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight text-center mb-3">
                <span className="text-[#00aeef] mr-1">{stage.stepNumber}.</span>
                {stage.title}
              </h4>

              <div className="my-2 flex items-center justify-center min-h-[125px]">
                <IconComp active={isActive} />
              </div>

              <ul className="mt-3 space-y-2 w-full text-left">
                {stage.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-sm text-neutral-800 font-medium leading-snug">
                    <span className="w-2 h-2 rounded-full bg-[#f58634] shrink-0 mt-1" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
