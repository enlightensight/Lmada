'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Sparkles, Filter, Droplets, Gauge, ShieldCheck } from 'lucide-react';

const PROCESS_STAGES = [
  {
    id: 1,
    tabLabel: 'Bioreactor Control',
    fullTitle: 'Bioreactor Parameter Optimization & Kinetics',
    subtitle: 'Automated DO, pH, temperature, and agitation cascade control in single-use bioreactor trains maintaining tight physiological homeostasis.',
    tag: 'Stage 01',
    metric: 'DO Control: 40.0% ± 2.0%',
  },
  {
    id: 2,
    tabLabel: 'Fed-Batch Perfusion',
    fullTitle: 'Fed-Batch Nutrient Feeding & Perfusion Intensification',
    subtitle: 'Dynamic feeding strategies and alternating tangential flow (ATF) perfusion sustaining high viable cell densities and culture longevity.',
    tag: 'Stage 02',
    metric: 'VCD: 32×10⁶ cells/mL',
  },
  {
    id: 3,
    tabLabel: 'Affinity Chromatography',
    fullTitle: 'Affinity Capture & Multi-Modal IEX Chromatography',
    subtitle: 'High-binding Protein A capture followed by bind-elute CIEX and flow-through AIEX yielding >99.5% host cell protein (HCP) clearance.',
    tag: 'Stage 03',
    metric: 'HCP Clearance: >99.5%',
  },
  {
    id: 4,
    tabLabel: 'UF/DF Formulation',
    fullTitle: 'UF/DF & Tangential Flow Final Bulk Formulation',
    subtitle: 'Tangential flow ultrafiltration and diafiltration buffer exchange formulating bulk drug substance with >88.5% total step recovery.',
    tag: 'Stage 04',
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
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = PROCESS_STAGES[activeStage - 1];

  return (
    <div
      className="relative w-full min-h-[490px] md:min-h-[520px] bg-white rounded-[16px] border border-neutral-200/90 shadow-xl overflow-hidden flex flex-col justify-between p-5 sm:p-7 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Micro Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#0f2231_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Top Header & Live Telemetry Badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f58634] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#f58634]" />
          </span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900">
            Bioprocess Development Train
          </span>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f58634]/10 border border-[#f58634]/25 text-[#f58634] text-xs font-bold tracking-wide">
          <Activity className="w-3.5 h-3.5 text-[#00aeef]" />
          <span>Continuous Scalability</span>
        </div>
      </div>

      {/* Center Animated Bioprocess Engine */}
      <div className="relative z-10 flex-1 my-3 flex items-center justify-center min-h-[240px]">
        <svg viewBox="0 0 440 240" className="w-full h-full max-h-[250px]" fill="none">
          <defs>
            <linearGradient id="liquidGradLarge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#00aeef" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="resinGradLarge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00aeef" />
              <stop offset="50%" stopColor="#f58634" />
              <stop offset="100%" stopColor="#00aeef" />
            </linearGradient>
            <filter id="processGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ======================================================== */}
          {/* UPSTREAM BIOREACTOR (Left Area - Stages 1 & 2 Focus)     */}
          {/* ======================================================== */}
          <g transform="translate(45, 20)" opacity={activeStage === 1 || activeStage === 2 ? 1 : 0.7}>
            {/* Stage 1/2 Active Aura */}
            {(activeStage === 1 || activeStage === 2) && (
              <circle cx="46" cy="90" r="60" fill="#00aeef" fillOpacity="0.1" />
            )}

            {/* Agitator Motor Top */}
            <rect x="36" y="0" width="20" height="16" rx="3" fill="#00aeef" />
            <rect x="18" y="16" width="56" height="10" rx="3" fill="#0f2231" />

            {/* Glass Vessel Shell */}
            <path
              d="M 20 26 H 72 V 125 C 72 140 62 150 46 150 C 30 150 20 140 20 125 Z"
              fill="#f8fcff"
              stroke="#00aeef"
              strokeWidth={activeStage === 1 || activeStage === 2 ? "3.5" : "2.5"}
            />

            {/* Culture Liquid Fill with Dynamic Wave */}
            <motion.path
              d="M 22 52 Q 34 48 46 52 T 70 52 V 125 C 70 137.5 61 147.5 46 147.5 C 31 147.5 22 137.5 22 125 Z"
              fill="url(#liquidGradLarge)"
              animate={{
                d: [
                  "M 22 52 Q 34 48 46 52 T 70 52 V 125 C 70 137.5 61 147.5 46 147.5 C 31 147.5 22 137.5 22 125 Z",
                  "M 22 49 Q 34 55 46 49 T 70 49 V 125 C 70 137.5 61 147.5 46 147.5 C 31 147.5 22 137.5 22 125 Z",
                  "M 22 52 Q 34 48 46 52 T 70 52 V 125 C 70 137.5 61 147.5 46 147.5 C 31 147.5 22 137.5 22 125 Z",
                ],
              }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            />

            {/* Impeller Central Shaft */}
            <line x1="46" y1="26" x2="46" y2="114" stroke="#00aeef" strokeWidth="3" strokeLinecap="round" />
            
            {/* Marine Impeller Blades (Animated Rotation) */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: activeStage === 1 ? 1.2 : 2, ease: 'linear' }}
              style={{ transformOrigin: '46px 110px' }}
            >
              <circle cx="46" cy="110" r="4" fill="#f58634" />
              <path d="M 32 107 Q 46 103 60 107" stroke="#f58634" strokeWidth="3.5" strokeLinecap="round" />
            </motion.g>

            {/* Stage 1: Oxygen / DO Aeration Micro-bubbles (Rising vigorously) */}
            {[
              { cx: 34, cy: 105, r: 2.5, delay: 0 },
              { cx: 56, cy: 98, r: 3, delay: 0.3 },
              { cx: 38, cy: 78, r: 2.2, delay: 0.6 },
              { cx: 52, cy: 72, r: 2.6, delay: 0.9 },
            ].map((b, i) => (
              <motion.circle
                key={i}
                cx={b.cx}
                cy={b.cy}
                r={b.r}
                fill="#ffffff"
                animate={{ y: [-2, -32, -2], opacity: [0.3, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, delay: b.delay, ease: 'easeOut' }}
              />
            ))}

            {/* Stage 2: Dense Cell Biomass Accumulation */}
            {activeStage === 2 && (
              <g>
                {[
                  { cx: 32, cy: 80, r: 4 },
                  { cx: 58, cy: 84, r: 4.5 },
                  { cx: 40, cy: 125, r: 4 },
                  { cx: 55, cy: 122, r: 4.5 },
                  { cx: 46, cy: 70, r: 3.5 },
                ].map((c, i) => (
                  <motion.circle
                    key={i}
                    cx={c.cx}
                    cy={c.cy}
                    r={c.r}
                    fill="#f58634"
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                  />
                ))}
              </g>
            )}

            <text x="46" y="165" textAnchor="middle" fill="#0f2231" fontSize="8" fontWeight="bold">
              Bioreactor 50L - 2,000L
            </text>
          </g>

          {/* ======================================================== */}
          {/* INTER-STAGE FLOW PIPE WITH LIQUID PARTICLES              */}
          {/* ======================================================== */}
          <g>
            <path
              d="M 125 125 H 190 V 75 H 230"
              stroke="#00aeef"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Flow Pulses */}
            {[0, 0.4, 0.8].map((delay, idx) => (
              <motion.circle
                key={idx}
                r="4.5"
                fill="#f58634"
                animate={{
                  offsetDistance: ['0%', '100%'],
                }}
                transition={{ repeat: Infinity, duration: 2.2, delay, ease: 'linear' }}
              >
                <animateMotion
                  path="M 125 125 H 190 V 75 H 230"
                  dur="2.2s"
                  repeatCount="indefinite"
                  begin={`${delay}s`}
                />
              </motion.circle>
            ))}
          </g>

          {/* ======================================================== */}
          {/* DIGITAL PROCESS DASHBOARD & PLC MONITOR (Center Area)     */}
          {/* ======================================================== */}
          <g transform="translate(195, 45)">
            <rect x="0" y="0" width="90" height="110" rx="6" fill="#f8fcff" stroke="#00aeef" strokeWidth="2.5" />
            
            {/* Screen Area */}
            <rect x="7" y="7" width="76" height="45" rx="3" fill="#0f2231" />
            
            {/* Real-Time Waveform Graph */}
            <motion.path
              d="M 12 34 Q 26 18 40 30 T 68 22 T 80 26"
              stroke="#00aeef"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              animate={{ pathOffset: [0, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
            />
            <motion.path
              d="M 12 38 Q 26 32 40 36 T 68 30 T 80 34"
              stroke="#f58634"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Readout Values */}
            <text x="10" y="68" fill="#0f2231" fontSize="9" fontWeight="bold" fontFamily="monospace">
              DO: 40.0%
            </text>
            <text x="10" y="82" fill="#0f2231" fontSize="9" fontWeight="bold" fontFamily="monospace">
              pH: 7.10
            </text>
            <text x="10" y="96" fill="#f58634" fontSize="9" fontWeight="bold" fontFamily="monospace">
              Yield: 88.5%
            </text>
            <circle cx="76" cy="85" r="5" fill="#00aeef" />
          </g>

          {/* ======================================================== */}
          {/* DOWNSTREAM CHROMATOGRAPHY COLUMN (Right - Stage 3 & 4)   */}
          {/* ======================================================== */}
          <g transform="translate(305, 25)" opacity={activeStage === 3 || activeStage === 4 ? 1 : 0.7}>
            {/* Stage 3/4 Active Aura */}
            {(activeStage === 3 || activeStage === 4) && (
              <rect x="15" y="15" width="46" height="140" rx="8" fill="#f58634" fillOpacity="0.08" />
            )}

            {/* Top Column Flange */}
            <rect x="18" y="0" width="40" height="12" rx="3" fill="#0f2231" stroke="#00aeef" strokeWidth="2" />
            <line x1="38" y1="12" x2="38" y2="22" stroke="#00aeef" strokeWidth="3.5" />

            {/* Glass Chromatography Column Tube */}
            <rect x="20" y="22" width="36" height="125" rx="4" fill="#f8fcff" stroke="#00aeef" strokeWidth={activeStage === 3 ? "3.5" : "2.5"} />

            {/* Resin Bead Matrix Packing */}
            <rect x="23.5" y="32" width="29" height="105" rx="2" fill="url(#resinGradLarge)" fillOpacity="0.45" />

            {/* Gradient Separation Bands */}
            <motion.rect
              x="23.5"
              y="44"
              width="29"
              height="18"
              fill="#00aeef"
              fillOpacity="0.85"
              animate={{ y: [40, 85, 40] }}
              transition={{ repeat: Infinity, duration: activeStage === 3 ? 2.5 : 3.5, ease: 'easeInOut' }}
            />
            <motion.rect
              x="23.5"
              y="68"
              width="29"
              height="12"
              fill="#f58634"
              fillOpacity="0.85"
              animate={{ y: [62, 110, 62] }}
              transition={{ repeat: Infinity, duration: activeStage === 3 ? 2.5 : 3.5, ease: 'easeInOut', delay: 0.4 }}
            />

            {/* Bottom Column Flange & Outlet */}
            <line x1="38" y1="147" x2="38" y2="157" stroke="#00aeef" strokeWidth="3.5" />
            <rect x="18" y="157" width="40" height="12" rx="3" fill="#0f2231" stroke="#00aeef" strokeWidth="2" />

            {/* Stage 4: Purified Collection Droplet */}
            <motion.path
              d="M 38 174 Q 42 182 38 188 Q 34 182 38 174 Z"
              fill="#00aeef"
              animate={{ y: [0, 14, 0], scale: [0.9, 1.3, 0.9] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
            />

            <text x="38" y="200" textAnchor="middle" fill="#0f2231" fontSize="8" fontWeight="bold">
              {activeStage === 4 ? 'UF/DF Drug Bulk' : 'Chromatography Column'}
            </text>
          </g>
        </svg>
      </div>

      {/* Stage Narrative Callout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 bg-neutral-50/95 rounded-[12px] p-4 sm:p-5 border border-neutral-200/90 shadow-sm mb-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
            <span className="text-xs sm:text-sm font-bold uppercase text-[#f58634] tracking-wider">
              {current.tag}
            </span>
            <span className="inline-flex items-center text-xs sm:text-sm font-bold text-[#00aeef] bg-white px-3 py-1 rounded-full border border-[#00aeef]/30 shadow-xs">
              {current.metric}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
            {current.fullTitle}
          </h4>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-1">
            {current.subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Interactive 4-Stage Progress Navigation Buttons */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-2 border-t border-neutral-100">
        {PROCESS_STAGES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStage(s.id)}
            className={`px-3 py-2.5 rounded-[10px] text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
              activeStage === s.id
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-md ring-2 ring-neutral-900/20'
                : 'bg-white/90 hover:bg-neutral-100 text-neutral-700 border-neutral-200/90'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-0.5">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${activeStage === s.id ? 'text-[#f58634]' : 'text-neutral-400'}`}>
                {s.tag}
              </span>
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  activeStage === s.id ? 'bg-[#f58634]' : 'bg-neutral-300'
                }`}
              />
            </div>
            <span className="text-xs sm:text-[13px] font-semibold leading-tight truncate w-full">
              {s.tabLabel}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

