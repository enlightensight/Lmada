'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ==========================================
// DETAILED VECTOR SVG ILLUSTRATIONS (UPSTREAM)
// ==========================================

// 1. CELL LINE DEVELOPMENT (Petri Dish with Clonal Cell Cluster)
function CellLineIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 110 130" className="w-22 h-28 sm:w-26 sm:h-32 transition-transform duration-300" fill="none">
      {/* Outer Petri Dish Rim */}
      <circle cx="55" cy="65" r="46" stroke="#00aeef" strokeWidth="3" fill="#f8fcff" />
      <circle cx="55" cy="65" r="40" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="4 2" fill="#e0f2fe" fillOpacity="0.4" />
      <circle cx="55" cy="65" r="34" stroke="#00aeef" strokeWidth="2.5" fill="#bae6fd" fillOpacity="0.6" />

      {/* Center Cell Cluster */}
      <g>
        {/* Central Core Cell */}
        <motion.g
          animate={{ scale: active ? [1, 1.15, 1] : [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <circle cx="55" cy="65" r="9" fill="#00aeef" stroke="#0099d0" strokeWidth="2" />
          <circle cx="55" cy="65" r="4" fill="#0f2231" />
        </motion.g>

        {/* Surrounding Ring of Cells */}
        {[
          { cx: 43, cy: 55, r: 7.5, delay: 0.1 },
          { cx: 57, cy: 51, r: 7, delay: 0.2 },
          { cx: 68, cy: 60, r: 7.5, delay: 0.3 },
          { cx: 67, cy: 73, r: 7, delay: 0.4 },
          { cx: 53, cy: 79, r: 7.5, delay: 0.5 },
          { cx: 41, cy: 70, r: 7, delay: 0.6 },
        ].map((cell, idx) => (
          <motion.g
            key={idx}
            animate={{
              scale: active ? [1, 1.12, 1] : [1, 1.04, 1],
              opacity: [0.85, 1, 0.85],
            }}
            transition={{ repeat: Infinity, duration: 2, delay: cell.delay, ease: 'easeInOut' }}
          >
            <circle cx={cell.cx} cy={cell.cy} r={cell.r} fill="#00aeef" stroke="#0099d0" strokeWidth="1.5" />
            <circle cx={cell.cx} cy={cell.cy} r={cell.r * 0.45} fill="#0f2231" />
          </motion.g>
        ))}

        {/* Outer Clonal Division Buds (Orange Accents) */}
        <motion.circle
          cx="71"
          cy="48"
          r="3"
          fill="#f58634"
          animate={{ scale: active ? [1, 1.3, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        />
        <motion.circle
          cx="37"
          cy="81"
          r="2.5"
          fill="#f58634"
          animate={{ scale: active ? [1, 1.3, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 1.6, delay: 0.3 }}
        />
      </g>
    </svg>
  );
}

// 2. MEDIA DEVELOPMENT (Basal Media Bottle with Liquid & Graduations)
function MediaDevIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 85 130" className="w-18 h-28 sm:w-20 sm:h-32 transition-transform duration-300" fill="none">
      {/* Top Blue Cap with Ridges */}
      <rect x="28" y="10" width="28" height="14" rx="3" fill="#00aeef" stroke="#00aeef" strokeWidth="1.5" />
      <line x1="34" y1="14" x2="34" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="14" x2="42" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="14" x2="50" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

      {/* Bottle Neck */}
      <rect x="33" y="24" width="18" height="8" fill="#f0f9ff" stroke="#00aeef" strokeWidth="2" />

      {/* Main Bottle Body */}
      <path
        d="M20 38 Q20 32 30 32 H54 Q64 32 64 38 V112 Q64 120 54 120 H30 Q20 120 20 112 Z"
        fill="#f8fcff"
        stroke="#00aeef"
        strokeWidth="3"
      />

      {/* Basal Media Liquid Fill */}
      <motion.path
        d="M22 64 Q32 61 42 64 T62 64 V112 Q62 118 54 118 H30 Q22 118 22 112 Z"
        fill="#bae6fd"
        fillOpacity="0.8"
        animate={{ d: active ? "M22 62 Q32 65 42 62 T62 62 V112 Q62 118 54 118 H30 Q22 118 22 112 Z" : "M22 64 Q32 61 42 64 T62 64 V112 Q62 118 54 118 H30 Q22 118 22 112 Z" }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />

      {/* Measurement Graduations */}
      <line x1="48" y1="74" x2="58" y2="74" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="84" x2="58" y2="84" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="94" x2="58" y2="94" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />
      <line x1="52" y1="104" x2="58" y2="104" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />

      {/* Floating Nutrient Bubbles */}
      <motion.circle cx="30" cy="80" r="2" fill="white" animate={{ y: active ? [-2, -6, -2] : 0 }} transition={{ repeat: Infinity, duration: 1.6 }} />
      <motion.circle cx="36" cy="98" r="2.5" fill="white" animate={{ y: active ? [-2, -8, -2] : 0 }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }} />
      <motion.circle cx="42" cy="88" r="1.8" fill="white" animate={{ y: active ? [-1, -5, -1] : 0 }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }} />
    </svg>
  );
}

// 3. FEED STRATEGY DEVELOPMENT (Dual Feed Bottles)
function FeedStrategyIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 100 130" className="w-22 h-28 sm:w-24 sm:h-32 transition-transform duration-300" fill="none">
      {/* Bottle 1: Smaller Nutrient Feed */}
      <g>
        <rect x="14" y="36" width="20" height="10" rx="2" fill="#00aeef" stroke="#00aeef" strokeWidth="1.5" />
        <line x1="19" y1="39" x2="19" y2="43" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="39" x2="24" y2="43" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="29" y1="39" x2="29" y2="43" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

        <path
          d="M8 50 Q8 46 16 46 H32 Q40 46 40 50 V114 Q40 120 32 120 H16 Q8 120 8 114 Z"
          fill="#f8fcff"
          stroke="#00aeef"
          strokeWidth="2.5"
        />
        <path
          d="M9.5 74 H38.5 V114 Q38.5 118.5 32 118.5 H16 Q9.5 118.5 9.5 114 Z"
          fill="#bae6fd"
          fillOpacity="0.8"
        />
        <line x1="26" y1="84" x2="34" y2="84" stroke="#00aeef" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="26" y1="94" x2="34" y2="94" stroke="#00aeef" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="26" y1="104" x2="34" y2="104" stroke="#00aeef" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Bottle 2: Larger Feed Flask */}
      <g>
        <rect x="56" y="16" width="26" height="12" rx="2.5" fill="#00aeef" stroke="#00aeef" strokeWidth="1.5" />
        <line x1="62" y1="20" x2="62" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="69" y1="20" x2="69" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="76" y1="20" x2="76" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

        <path
          d="M48 32 Q48 28 58 28 H80 Q90 28 90 32 V112 Q90 120 80 120 H58 Q48 120 48 112 Z"
          fill="#f8fcff"
          stroke="#00aeef"
          strokeWidth="3"
        />
        <motion.path
          d="M49.5 56 Q60 54 70 56 T88.5 56 V112 Q88.5 118.5 80 118.5 H58 Q49.5 118.5 49.5 112 Z"
          fill="#bae6fd"
          fillOpacity="0.85"
          animate={{ opacity: active ? [0.75, 1, 0.75] : 0.85 }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        />
        <line x1="74" y1="68" x2="84" y2="68" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />
        <line x1="74" y1="80" x2="84" y2="80" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />
        <line x1="74" y1="92" x2="84" y2="92" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />
        <line x1="74" y1="104" x2="84" y2="104" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />

        {/* Animated Feed Droplet / Molecule */}
        <motion.circle
          cx="62"
          cy="76"
          r="2.5"
          fill="white"
          animate={{ y: active ? [-2, -6, -2] : 0 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </g>
    </svg>
  );
}

// 4. BIOREACTOR PARAMETER OPTIMIZATION (Bioreactor + Controller Unit)
function BioreactorOptIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 115 130" className="w-24 h-28 sm:w-28 sm:h-32 transition-transform duration-300" fill="none">
      {/* Top Headplate & Agitator Motor */}
      <rect x="30" y="8" width="12" height="12" rx="2" fill="#00aeef" stroke="#00aeef" strokeWidth="1.5" />
      <rect x="14" y="20" width="44" height="8" rx="2" fill="#00aeef" />

      {/* Bioreactor Glass Vessel */}
      <path
        d="M18 28 H54 V96 C54 108 46 116 36 116 C26 116 18 108 18 96 Z"
        fill="#f0f9ff"
        stroke="#00aeef"
        strokeWidth="3"
      />

      {/* Liquid Cell Culture Fill */}
      <path
        d="M19.5 48 H52.5 V96 C52.5 106.5 45.5 114.5 36 114.5 C26.5 114.5 19.5 106.5 19.5 96 Z"
        fill="#bae6fd"
        fillOpacity="0.8"
      />

      {/* Impeller Shaft & Marine Blades */}
      <line x1="36" y1="20" x2="36" y2="82" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 80 Q36 76 44 80" stroke="#f58634" strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="80" r="3" fill="#f58634" />

      {/* Aeration Micro-bubbles (Rising) */}
      <motion.circle cx="28" cy="62" r="2" fill="white" animate={{ y: active ? [-2, -10, -2] : 0, opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.6 }} />
      <motion.circle cx="44" cy="58" r="2.5" fill="white" animate={{ y: active ? [-1, -8, -1] : 0, opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1.9, delay: 0.3 }} />
      <motion.circle cx="33" cy="70" r="1.8" fill="white" animate={{ y: active ? [-2, -7, -2] : 0 }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.5 }} />

      {/* Control Cable Connector */}
      <path d="M54 90 H64 V82 H68" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Digital Control Tower / Tower Unit */}
      <rect x="68" y="32" width="30" height="74" rx="4" fill="#f8fcff" stroke="#00aeef" strokeWidth="2.5" />

      {/* Digital LCD Screen with Curve Graph */}
      <rect x="73" y="38" width="20" height="24" rx="2" fill="#bae6fd" stroke="#00aeef" strokeWidth="1.5" />
      <motion.path
        d="M75 54 Q79 46 83 50 T91 44"
        stroke="#00aeef"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        animate={{ pathLength: active ? [0.6, 1, 0.6] : 1 }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      {/* Keypad Buttons */}
      <circle cx="77" cy="72" r="2" fill="#00aeef" />
      <circle cx="88" cy="72" r="2" fill="#00aeef" />
      <circle cx="77" cy="80" r="2" fill="#00aeef" />
      <circle cx="88" cy="80" r="2" fill="#00aeef" />
      <circle cx="77" cy="88" r="2" fill="#00aeef" />
      <circle cx="88" cy="88" r="2" fill="#00aeef" />
      <rect x="75" y="94" width="16" height="5" rx="1" fill="#f58634" />
    </svg>
  );
}

// 5. PROCESS CHARACTERIZATION (DoE 3D Factorial Cube with Optimal Points)
function DoEIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 110 130" className="w-22 h-28 sm:w-26 sm:h-32 transition-transform duration-300" fill="none">
      {/* 3D Coordinate Axes with Arrowheads */}
      <path d="M18 100 V18" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="14,24 18,18 22,24" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 100 H100" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />
      <polyline points="94,96 100,100 94,104" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* 3D Cube Factorial Wireframe */}
      {/* Front Face */}
      <rect x="32" y="52" width="38" height="38" fill="#f0f9ff" fillOpacity="0.6" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="3 3" />
      
      {/* 3D Depth Lines */}
      <line x1="32" y1="52" x2="52" y2="34" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="70" y1="52" x2="90" y2="34" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="70" y1="90" x2="90" y2="72" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="32" y1="90" x2="52" y2="72" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Back Face Lines */}
      <line x1="52" y1="34" x2="90" y2="34" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="90" y1="34" x2="90" y2="72" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="52" y1="72" x2="90" y2="72" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="52" y1="34" x2="52" y2="72" stroke="#00aeef" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Experimental Design Points (Blue Nodes) */}
      <circle cx="32" cy="52" r="3.5" fill="#00aeef" />
      <circle cx="70" cy="52" r="4.5" fill="#00aeef" />
      <circle cx="52" cy="34" r="3.5" fill="#00aeef" />
      <circle cx="90" cy="72" r="4" fill="#00aeef" />
      <circle cx="52" cy="72" r="3.5" fill="#00aeef" />
      <circle cx="70" cy="90" r="4" fill="#00aeef" />

      {/* Optimal Response Highlighting Points (Orange Nodes) */}
      <motion.circle
        cx="32"
        cy="90"
        r="5"
        fill="#f58634"
        animate={{ scale: active ? [1, 1.35, 1] : [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
      <motion.circle
        cx="90"
        cy="34"
        r="5"
        fill="#f58634"
        animate={{ scale: active ? [1, 1.35, 1] : [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
      />
    </svg>
  );
}

// 6. PERFORMANCE EVALUATION (Quality Checklist Report with Pie Chart)
function PerformanceEvalIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 95 130" className="w-20 h-28 sm:w-24 sm:h-32 transition-transform duration-300" fill="none">
      {/* Top Clipboard Clip */}
      <rect x="36" y="8" width="24" height="10" rx="3" fill="#00aeef" stroke="#00aeef" strokeWidth="1.5" />
      <circle cx="48" cy="13" r="2.5" fill="white" />

      {/* Main Clipboard Board */}
      <rect x="18" y="16" width="60" height="98" rx="6" fill="#f8fcff" stroke="#00aeef" strokeWidth="3" />

      {/* Circular Performance Chart (Pie Chart) */}
      <g transform="translate(48, 52)">
        {/* Blue Segment */}
        <path d="M0,0 L0,-16 A16,16 0 1,1 -15.2,5 Z" fill="#00aeef" />
        {/* Orange Segment (High Yield slice) */}
        <motion.path
          d="M0,0 L-15.2,5 A16,16 0 0,1 0,-16 Z"
          fill="#f58634"
          animate={{ scale: active ? [1, 1.12, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 1.7 }}
        />
        <circle cx="0" cy="0" r="4" fill="white" />
      </g>

      {/* Data Metric Lines */}
      <line x1="68" y1="42" x2="72" y2="42" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="48" x2="74" y2="48" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="54" x2="72" y2="54" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="60" x2="74" y2="60" stroke="#00aeef" strokeWidth="2" strokeLinecap="round" />

      {/* Verification Checkmark Line 1 */}
      <g>
        <motion.path
          d="M26 80 L31 85 L40 75"
          stroke="#00aeef"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ opacity: active ? [0.7, 1, 0.7] : 1 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <line x1="46" y1="80" x2="68" y2="80" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Verification Checkmark Line 2 */}
      <g>
        <motion.path
          d="M26 98 L31 103 L40 93"
          stroke="#00aeef"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ opacity: active ? [0.7, 1, 0.7] : 1 }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
        />
        <line x1="46" y1="98" x2="68" y2="98" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />
      </g>
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
// UPSTREAM STAGES DATA
// ==========================================

const UPSTREAM_STAGES = [
  {
    id: 1,
    stepNumber: '1',
    title: 'CELL LINE DEVELOPMENT',
    icon: CellLineIcon,
    bullets: ['Select and develop high-performing cell lines', 'Ensure genetic stability and productivity'],
  },
  {
    id: 2,
    stepNumber: '2',
    title: 'MEDIA DEVELOPMENT',
    icon: MediaDevIcon,
    bullets: ['Optimize basal media components', 'Enhance cell growth and productivity'],
  },
  {
    id: 3,
    stepNumber: '3',
    title: 'FEED STRATEGY DEVELOPMENT',
    icon: FeedStrategyIcon,
    bullets: ['Design fed-batch strategies', 'Improve yields and process efficiency'],
  },
  {
    id: 4,
    stepNumber: '4',
    title: 'BIOREACTOR PARAMETER OPTIMIZATION',
    icon: BioreactorOptIcon,
    bullets: ['Optimize key parameters (pH, DO, temp, agitation)', 'Enhance cell growth and product titer'],
  },
  {
    id: 5,
    stepNumber: '5',
    title: 'PROCESS CHARACTERIZATION (DoE)',
    icon: DoEIcon,
    bullets: ['Use Design of Experiments (DoE) to understand process variables', 'Identify critical process parameters (CPPs)'],
  },
  {
    id: 6,
    stepNumber: '6',
    title: 'PERFORMANCE EVALUATION',
    icon: PerformanceEvalIcon,
    bullets: ['Evaluate key performance attributes (KPAs)', 'Establish robust and reliable processes'],
  },
];

export default function UpstreamProcessAnimation() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-cycle through the 6 stages in a continuous upstream loop
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
        {UPSTREAM_STAGES.map((stage, idx) => {
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
                <h4 className="text-xs xl:text-sm font-bold text-neutral-900 tracking-tight text-center mb-4 min-h-[38px] flex items-center justify-center">
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
                <ul className="mt-4 space-y-1.5 w-full text-left">
                  {stage.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-1.5 text-[11px] xl:text-xs text-neutral-700 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f58634] shrink-0 mt-1" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Connecting Arrow between stages */}
              {idx < UPSTREAM_STAGES.length - 1 && (
                <ConnectingArrow active={activeStep === stage.id || activeStep === stage.id + 1} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* MOBILE / TABLET RESPONSIVE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:hidden gap-4 sm:gap-6">
        {UPSTREAM_STAGES.map((stage) => {
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
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 tracking-tight text-center mb-3">
                <span className="text-[#00aeef] mr-1">{stage.stepNumber}.</span>
                {stage.title}
              </h4>

              <div className="my-2 flex items-center justify-center min-h-[125px]">
                <IconComp active={isActive} />
              </div>

              <ul className="mt-3 space-y-1.5 w-full text-left">
                {stage.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-1.5 text-xs text-neutral-700 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f58634] shrink-0 mt-1" />
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
