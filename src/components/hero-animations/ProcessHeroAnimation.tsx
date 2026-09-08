'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Factory, Activity, Gauge, Sparkles, Filter, Droplets } from 'lucide-react';

const PROCESS_STAGES = [
  {
    id: 1,
    title: 'Bioreactor Parameter Optimization',
    subtitle: 'Automated DO, pH, temperature, and agitation control in single-use bioreactor systems',
    tag: 'Upstream Phase',
    metric: 'DO Control: 40.0% ± 2.0%',
  },
  {
    id: 2,
    title: 'Fed-Batch & Nutrient Perfusion',
    subtitle: 'Optimized feed strategies delivering high viable cell densities and extended culture longevity',
    tag: 'Cell Culture',
    metric: 'VCD: 32×10⁶ cells/mL',
  },
  {
    id: 3,
    title: 'Affinity & IEX Chromatography',
    subtitle: 'Multi-column purification yielding high-purity monomer with low host-cell impurity levels',
    tag: 'Downstream Capture',
    metric: 'HCP Clearance: >99.5%',
  },
  {
    id: 4,
    title: 'UF/DF & Formulation Scaffolding',
    subtitle: 'Tangential flow ultrafiltration and buffer exchange into target drug substance matrix',
    tag: 'Final Formulation',
    metric: 'Overall Recovery: >88.5%',
  },
];

export default function ProcessHeroAnimation() {
  const [activeStage, setActiveStage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 3800);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative w-full aspect-[4/3] min-h-[380px] bg-white rounded-[14px] border border-neutral-200/90 shadow-lg overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Micro Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#0f2231_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* Top Header & Live Telemetry Badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f58634] animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-800">
            Bioprocess Development Train
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f58634]/10 border border-[#f58634]/20 text-[#f58634] text-[10px] font-semibold tracking-wide">
          <Activity className="w-3 h-3 text-[#00aeef]" />
          <span>Real-Time Scalability</span>
        </div>
      </div>

      {/* Center Animated Bioprocess Engine */}
      <div className="relative z-10 flex-1 my-3 flex items-center justify-center">
        <svg viewBox="0 0 420 220" className="w-full h-full max-h-[190px]" fill="none">
          <defs>
            <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00aeef" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="resinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00aeef" />
              <stop offset="50%" stopColor="#f58634" />
              <stop offset="100%" stopColor="#00aeef" />
            </linearGradient>
          </defs>

          {/* UPSTREAM BIOREACTOR (Left Area) */}
          <g transform="translate(45, 25)">
            {/* Agitator Motor Top */}
            <rect x="36" y="0" width="16" height="14" rx="2" fill="#00aeef" />
            <rect x="20" y="14" width="48" height="8" rx="2" fill="#0f2231" />

            {/* Glass Vessel Shell */}
            <path
              d="M 22 22 H 66 V 110 C 66 122 58 130 44 130 C 30 130 22 122 22 110 Z"
              fill="#f8fcff"
              stroke="#00aeef"
              strokeWidth="2.5"
            />

            {/* Culture Liquid Fill with Dynamic Wave */}
            <motion.path
              d="M 23.5 45 Q 34 42 44 45 T 64.5 45 V 110 C 64.5 120.5 57.5 128.5 44 128.5 C 30.5 128.5 23.5 120.5 23.5 110 Z"
              fill="url(#liquidGrad)"
              animate={{
                d: [
                  "M 23.5 45 Q 34 42 44 45 T 64.5 45 V 110 C 64.5 120.5 57.5 128.5 44 128.5 C 30.5 128.5 23.5 120.5 23.5 110 Z",
                  "M 23.5 43 Q 34 47 44 43 T 64.5 43 V 110 C 64.5 120.5 57.5 128.5 44 128.5 C 30.5 128.5 23.5 120.5 23.5 110 Z",
                  "M 23.5 45 Q 34 42 44 45 T 64.5 45 V 110 C 64.5 120.5 57.5 128.5 44 128.5 C 30.5 128.5 23.5 120.5 23.5 110 Z",
                ],
              }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            />

            {/* Impeller Central Shaft */}
            <line x1="44" y1="22" x2="44" y2="100" stroke="#00aeef" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Marine Impeller Blades (Animated Rotation) */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              style={{ transformOrigin: '44px 96px' }}
            >
              <circle cx="44" cy="96" r="3" fill="#f58634" />
              <path d="M 32 94 Q 44 91 56 94" stroke="#f58634" strokeWidth="3" strokeLinecap="round" />
            </motion.g>

            {/* Oxygen / DO Aeration Micro-bubbles (Rising) */}
            {[
              { cx: 34, cy: 90, r: 2, delay: 0 },
              { cx: 52, cy: 85, r: 2.5, delay: 0.3 },
              { cx: 38, cy: 68, r: 1.8, delay: 0.6 },
              { cx: 48, cy: 62, r: 2.2, delay: 0.9 },
            ].map((b, i) => (
              <motion.circle
                key={i}
                cx={b.cx}
                cy={b.cy}
                r={b.r}
                fill="#ffffff"
                animate={{ y: [-2, -24, -2], opacity: [0.3, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: b.delay, ease: 'easeOut' }}
              />
            ))}
          </g>

          {/* INTER-STAGE FLOW PIPE WITH LIQUID PARTICLES */}
          <g>
            <path
              d="M 115 115 H 180 V 70 H 220"
              stroke="#00aeef"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Flow Pulses */}
            {[0, 0.4, 0.8].map((delay, idx) => (
              <motion.circle
                key={idx}
                r="4"
                fill="#f58634"
                animate={{
                  offsetDistance: ['0%', '100%'],
                }}
                transition={{ repeat: Infinity, duration: 2.2, delay, ease: 'linear' }}
              >
                <animateMotion
                  path="M 115 115 H 180 V 70 H 220"
                  dur="2.2s"
                  repeatCount="indefinite"
                  begin={`${delay}s`}
                />
              </motion.circle>
            ))}
          </g>

          {/* DIGITAL PROCESS DASHBOARD & PLC MONITOR */}
          <g transform="translate(190, 45)">
            <rect x="0" y="0" width="80" height="95" rx="4" fill="#f8fcff" stroke="#00aeef" strokeWidth="2" />
            
            {/* Screen Area */}
            <rect x="6" y="6" width="68" height="38" rx="2" fill="#0f2231" />
            
            {/* Real-Time Waveform Graph */}
            <motion.path
              d="M 10 30 Q 22 16 34 26 T 58 20 T 70 24"
              stroke="#00aeef"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              animate={{ pathOffset: [0, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
            />
            <motion.path
              d="M 10 34 Q 22 28 34 32 T 58 26 T 70 30"
              stroke="#f58634"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Readout Values */}
            <text x="8" y="58" fill="#0f2231" fontSize="8" fontWeight="bold" fontFamily="monospace">DO: 40%</text>
            <text x="8" y="70" fill="#0f2231" fontSize="8" fontWeight="bold" fontFamily="monospace">pH: 7.10</text>
            <text x="8" y="82" fill="#f58634" fontSize="8" fontWeight="bold" fontFamily="monospace">Yield: 88%</text>
            <circle cx="68" cy="74" r="4" fill="#00aeef" />
          </g>

          {/* DOWNSTREAM CHROMATOGRAPHY COLUMN (Right Area) */}
          <g transform="translate(290, 30)">
            {/* Top Column Flange */}
            <rect x="18" y="0" width="34" height="10" rx="2" fill="#0f2231" stroke="#00aeef" strokeWidth="1.5" />
            <line x1="35" y1="10" x2="35" y2="18" stroke="#00aeef" strokeWidth="3" />

            {/* Glass Chromatography Column Tube */}
            <rect x="20" y="18" width="30" height="110" rx="3" fill="#f8fcff" stroke="#00aeef" strokeWidth="2.5" />

            {/* Resin Bead Matrix Packing */}
            <rect x="23" y="28" width="24" height="90" rx="2" fill="url(#resinGrad)" fillOpacity="0.4" />

            {/* Gradient Separation Bands */}
            <motion.rect
              x="23"
              y="38"
              width="24"
              height="16"
              fill="#00aeef"
              fillOpacity="0.8"
              animate={{ y: [35, 75, 35] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            />
            <motion.rect
              x="23"
              y="58"
              width="24"
              height="10"
              fill="#f58634"
              fillOpacity="0.8"
              animate={{ y: [55, 95, 55] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.4 }}
            />

            {/* Bottom Column Flange & Outlet */}
            <line x1="35" y1="128" x2="35" y2="136" stroke="#00aeef" strokeWidth="3" />
            <rect x="18" y="136" width="34" height="10" rx="2" fill="#0f2231" stroke="#00aeef" strokeWidth="1.5" />

            {/* Purified Collection Droplet */}
            <motion.path
              d="M 35 150 Q 38 156 35 160 Q 32 156 35 150 Z"
              fill="#00aeef"
              animate={{ y: [0, 10, 0], scale: [0.9, 1.2, 0.9] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            />
          </g>
        </svg>
      </div>

      {/* Active Stage Description & Real-Time Performance Metric */}
      <div className="relative z-10 bg-neutral-50/90 rounded-[10px] p-3 border border-neutral-200/70 mb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase font-bold text-[#f58634] tracking-wider">
            {PROCESS_STAGES[activeStage - 1].tag}
          </span>
          <span className="text-[11px] font-bold text-[#00aeef]">
            {PROCESS_STAGES[activeStage - 1].metric}
          </span>
        </div>
        <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 leading-tight">
          {PROCESS_STAGES[activeStage - 1].title}
        </h4>
        <p className="text-[11px] text-neutral-600 leading-normal mt-0.5">
          {PROCESS_STAGES[activeStage - 1].subtitle}
        </p>
      </div>

      {/* Interactive 4-Step Progress Navigation Dots */}
      <div className="relative z-10 grid grid-cols-4 gap-1.5 pt-1 border-t border-neutral-100">
        {PROCESS_STAGES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStage(s.id)}
            className={`py-1.5 px-1 rounded-[6px] text-center transition-all cursor-pointer ${
              activeStage === s.id
                ? 'bg-[#f58634] text-white font-semibold shadow-xs'
                : 'bg-neutral-100/70 hover:bg-neutral-200/70 text-neutral-600 text-[10px]'
            }`}
          >
            <span className="text-[10px] tracking-tight truncate block">
              {s.id}. {s.title.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
