'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Microscope, Search, ShieldCheck, Scale, LineChart, FileCheck } from 'lucide-react';

const ANALYTICAL_STAGES = [
  {
    id: 1,
    title: 'SEC-UPLC Purity & Aggregation Analysis',
    subtitle: 'High-resolution size-exclusion chromatography resolving monomer purity and high-molecular-weight species',
    tag: 'Chromatography',
    metric: 'Purity (SEC): 99.4%',
    shortName: '1. SEC Purity',
  },
  {
    id: 2,
    title: 'LC-MS/MS Intact Mass & Peptide Mapping',
    subtitle: 'High-resolution QTOF mass spectrometry confirming sequence identity and post-translational modifications',
    tag: 'Mass Spectrometry',
    metric: 'Mass Error: < 3.5 ppm',
    shortName: '2. LC-MS/MS',
  },
  {
    id: 3,
    title: 'Cell-Based Potency & Functional Bioassays',
    subtitle: 'Reporter gene and ligand-binding assays demonstrating biological activity and mechanism of action',
    tag: 'Functional Bioassay',
    metric: 'Relative Potency: 104%',
    shortName: '3. Bioassays',
  },
  {
    id: 4,
    title: 'ICH Q2(R1) Method Validation & QC Release',
    subtitle: 'Full analytical method validation under ICH guidelines supporting IND/BLA dossier filings and cGMP release',
    tag: 'Quality Standard',
    metric: 'Compliance: ICH Q2 / 21 CFR',
    shortName: '4. Validation',
  },
];

export default function AnalyticalHeroAnimation() {
  const [activeStage, setActiveStage] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative w-full min-h-[460px] lg:min-h-[500px] bg-white rounded-[16px] border border-neutral-200/90 shadow-xl overflow-hidden flex flex-col justify-between p-5 sm:p-7 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Micro Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#0f2231_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Top Header & Live Telemetry Badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-[#00aeef] animate-pulse" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900">
            Orthogonal Analytical Architecture
          </span>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00aeef]/10 border border-[#00aeef]/25 text-[#00aeef] text-xs font-bold tracking-wide">
          <ShieldCheck className="w-3.5 h-3.5 text-[#f58634]" />
          <span>ICH Q2(R1) Validated</span>
        </div>
      </div>

      {/* Center Animated High-Res Analytical Stage (Scaled Up & Prominent) */}
      <div className="relative z-10 flex-1 my-4 flex items-center justify-center min-h-[220px]">
        <svg viewBox="0 0 440 240" className="w-full h-full max-h-[230px]" fill="none">
          <defs>
            <linearGradient id="chromPeakGradLarge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00aeef" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="impurityPeakGradLarge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f58634" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffedd5" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* MAIN UPLC/HPLC CHROMATOGRAM DISPLAY FRAME */}
          <rect x="20" y="15" width="400" height="195" rx="8" fill="#f8fcff" stroke="#00aeef" strokeWidth="2.5" />
          
          {/* Internal Grid Lines */}
          {[55, 95, 135, 175].map((y, idx) => (
            <line key={`h-${idx}`} x1="30" y1={y} x2="410" y2={y} stroke="#e0f2fe" strokeWidth="1.2" strokeDasharray="4 4" />
          ))}
          {[75, 135, 195, 255, 315, 375].map((x, idx) => (
            <line key={`v-${idx}`} x1={x} y1="25" x2={x} y2="190" stroke="#e0f2fe" strokeWidth="1.2" strokeDasharray="4 4" />
          ))}

          {/* Coordinate Axes */}
          <line x1="45" y1="25" x2="45" y2="190" stroke="#00aeef" strokeWidth="2.5" />
          <line x1="45" y1="190" x2="410" y2="190" stroke="#00aeef" strokeWidth="2.5" />

          {/* Axis Labels */}
          <text x="32" y="24" fill="#0f2231" fontSize="9" fontWeight="bold" fontFamily="monospace">mAU</text>
          <text x="375" y="202" fill="#0f2231" fontSize="9" fontWeight="bold" fontFamily="monospace">Time (min)</text>

          {/* STAGE 1: SEC-HPLC Monomer Peak & Impurities */}
          {(activeStage === 1 || activeStage === 4) && (
            <g>
              {/* Baseline curve with small HMW Aggregate Peak (Orange) */}
              <motion.path
                d="M 45 190 L 95 190 Q 115 190 125 160 Q 130 145 135 160 Q 145 190 170 190"
                fill="url(#impurityPeakGradLarge)"
                stroke="#f58634"
                strokeWidth="2.5"
              />
              <text x="110" y="138" fill="#f58634" fontSize="8" fontWeight="bold">HMW 0.4%</text>

              {/* Main Target Monomer Peak (Vibrant Blue, 99.4% Purity) */}
              <motion.path
                d="M 170 190 Q 200 190 220 50 Q 230 25 240 50 Q 260 190 295 190"
                fill="url(#chromPeakGradLarge)"
                stroke="#00aeef"
                strokeWidth="3.5"
                animate={{
                  d: [
                    "M 170 190 Q 200 190 220 50 Q 230 25 240 50 Q 260 190 295 190",
                    "M 170 190 Q 200 190 220 45 Q 230 20 240 45 Q 260 190 295 190",
                    "M 170 190 Q 200 190 220 50 Q 230 25 240 50 Q 260 190 295 190",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              />
              <text x="195" y="20" fill="#00aeef" fontSize="10" fontWeight="bold">Monomer 99.4% (RT 8.42m)</text>

              {/* Small LMW Fragment Peak (Orange) */}
              <motion.path
                d="M 295 190 Q 315 190 325 172 Q 330 160 335 172 Q 345 190 395 190"
                fill="url(#impurityPeakGradLarge)"
                stroke="#f58634"
                strokeWidth="2.5"
              />
              <text x="315" y="152" fill="#f58634" fontSize="8" fontWeight="bold">LMW 0.2%</text>

              {/* Scanning Retention Time Indicator Line */}
              <motion.line
                x1="45"
                y1="30"
                x2="45"
                y2="190"
                stroke="#f58634"
                strokeWidth="2"
                strokeDasharray="4 2"
                animate={{ x1: [45, 400, 45], x2: [45, 400, 45] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
              />
            </g>
          )}

          {/* STAGE 2: LC-MS/MS Mass Spectrum & Peptide Fingerprint */}
          {activeStage === 2 && (
            <g>
              {/* Mass Spectrum Vertical Spectral Lines */}
              {[
                { x: 80, h: 45, col: '#00aeef', label: 'b₂' },
                { x: 115, h: 80, col: '#f58634', label: 'y₃' },
                { x: 155, h: 125, col: '#00aeef', label: 'b₅' },
                { x: 195, h: 65, col: '#f58634', label: 'y₆' },
                { x: 240, h: 160, col: '#00aeef', label: 'Parent mAb [M+12H]¹²⁺' },
                { x: 285, h: 100, col: '#f58634', label: 'y₈' },
                { x: 325, h: 70, col: '#00aeef', label: 'b₉' },
                { x: 365, h: 40, col: '#f58634', label: 'y₁₁' },
              ].map((peak, idx) => (
                <g key={idx}>
                  <motion.line
                    x1={peak.x}
                    y1={190}
                    x2={peak.x}
                    y2={190 - peak.h}
                    stroke={peak.col}
                    strokeWidth={idx === 4 ? "4.5" : "3"}
                    strokeLinecap="round"
                    animate={{ y2: [190 - peak.h + 6, 190 - peak.h - 6, 190 - peak.h + 6] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: idx * 0.15 }}
                  />
                  <circle cx={peak.x} cy={190 - peak.h} r="4" fill={peak.col} />
                  <text
                    x={peak.x - (idx === 4 ? 45 : 10)}
                    y={190 - peak.h - 7}
                    fill={peak.col}
                    fontSize={idx === 4 ? "9" : "8"}
                    fontWeight="bold"
                  >
                    {peak.label}
                  </text>
                </g>
              ))}

              {/* High-accuracy envelope */}
              <text x="55" y="42" fill="#00aeef" fontSize="10" fontWeight="bold">Intact Mass Verification: 148,254.2 Da (Δ 1.8 ppm)</text>
            </g>
          )}

          {/* STAGE 3: Potency & Sigmoidal Bioassay Dose-Response Curve */}
          {activeStage === 3 && (
            <g>
              {/* Reference Standard Sigmoidal Curve (Blue) */}
              <motion.path
                d="M 55 178 C 145 178 190 145 225 100 C 260 55 300 45 400 45"
                stroke="#00aeef"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <text x="250" y="38" fill="#00aeef" fontSize="9" fontWeight="bold">Reference Standard (EC₅₀ = 1.18 nM)</text>

              {/* Sample Batch Sigmoidal Curve (Orange) */}
              <motion.path
                d="M 55 182 C 145 182 190 148 225 103 C 260 58 300 48 400 48"
                stroke="#f58634"
                strokeWidth="3"
                strokeDasharray="6 3"
                fill="none"
                strokeLinecap="round"
              />
              <text x="250" y="64" fill="#f58634" fontSize="9" fontWeight="bold">Batch Sample (Relative Potency = 104%)</text>

              {/* Data points along curve */}
              {[
                { x: 90, y: 178 },
                { x: 155, y: 168 },
                { x: 200, y: 130 },
                { x: 225, y: 100 },
                { x: 255, y: 70 },
                { x: 300, y: 48 },
                { x: 360, y: 45 },
              ].map((pt, idx) => (
                <motion.circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r="4.5"
                  fill="#00aeef"
                  stroke="#ffffff"
                  strokeWidth="2"
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6, delay: idx * 0.12 }}
                />
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* ACTIVE STAGE DESCRIPTION & PERFORMANCE METRIC (BIG & HIGH-VISIBILITY) */}
      <div className="relative z-10 bg-neutral-50/95 rounded-[12px] p-4 sm:p-5 border border-neutral-200/90 shadow-sm mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
          <span className="text-xs sm:text-sm font-bold uppercase text-[#f58634] tracking-wider">
            {ANALYTICAL_STAGES[activeStage - 1].tag}
          </span>
          <span className="inline-flex items-center text-xs sm:text-sm font-bold text-[#00aeef] bg-white px-3 py-1 rounded-full border border-[#00aeef]/30 shadow-xs">
            {ANALYTICAL_STAGES[activeStage - 1].metric}
          </span>
        </div>
        <h4 className="text-base sm:text-lg md:text-xl font-bold text-neutral-900 leading-snug">
          {ANALYTICAL_STAGES[activeStage - 1].title}
        </h4>
        <p className="text-xs sm:text-sm md:text-base text-neutral-700 leading-relaxed mt-1">
          {ANALYTICAL_STAGES[activeStage - 1].subtitle}
        </p>
      </div>

      {/* INTERACTIVE 4-STEP PROGRESS NAVIGATION BUTTONS (BIG & READABLE) */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-100">
        {ANALYTICAL_STAGES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStage(s.id)}
            className={`py-2.5 px-3 rounded-[10px] text-center transition-all duration-200 cursor-pointer text-xs sm:text-sm font-bold ${
              activeStage === s.id
                ? 'bg-[#00aeef] text-white shadow-md ring-2 ring-[#00aeef]/40'
                : 'bg-neutral-100/90 hover:bg-neutral-200 text-neutral-800 border border-neutral-200/80'
            }`}
          >
            <span className="truncate block">
              {s.shortName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
